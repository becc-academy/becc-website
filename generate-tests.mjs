#!/usr/bin/env node

/**
 * Test Generator Script for BECC Monorepo
 * 
 * This script automatically generates test files for TypeScript components
 * by analyzing their structure and creating appropriate test stubs.
 * 
 * Usage:
 *   node generate-tests.mjs                  # Generate tests for all packages
 *   node generate-tests.mjs --scope=ui       # Generate tests only for @becc/ui
 *   node generate-tests.mjs --scope=website  # Generate tests only for website app
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGES_DIR = path.resolve(__dirname, 'packages');
const APPS_DIR = path.resolve(__dirname, 'apps');

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};

  for (const arg of args) {
    if (arg.startsWith('--scope=')) {
      result.scope = arg.split('=')[1];
    }
  }

  return result;
}

/**
 * Find all TypeScript files in a directory
 */
function findTsxFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, dist, and test directories
      if (!['node_modules', 'dist', '.turbo', '__tests__', 'tests'].includes(file)) {
        findTsxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Skip test files and config files
      if (!file.endsWith('.test.tsx') && 
          !file.endsWith('.test.ts') && 
          !file.endsWith('.spec.tsx') && 
          !file.endsWith('.spec.ts') && 
          !file.includes('config') && 
          file !== 'vite-env.d.ts') {
        fileList.push(filePath);
      }
    }
  }

  return fileList;
}

/**
 * Analyze a TypeScript file and extract component information
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, path.extname(filePath));

  // Extract exports
  const exports = [];
  
  // Check for export const/function
  const exportRegex = /export\s+(?:const|function)\s+(\w+)/g;
  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    const isComponent = /^[A-Z]/.test(name) && content.includes(`${name}: React.FC`);
    exports.push({
      name,
      type: isComponent ? 'component' : 'function',
      isDefault: false
    });
  }

  // Check for export type/interface
  const typeRegex = /export\s+(?:type|interface)\s+(\w+)/g;
  while ((match = typeRegex.exec(content)) !== null) {
    exports.push({
      name: match[1],
      type: match[0].includes('type') ? 'type' : 'interface',
      isDefault: false
    });
  }

  // Check for default export
  if (content.includes('export default')) {
    exports.push({
      name: fileName,
      type: 'component',
      isDefault: true
    });
  }

  // Extract props interface
  const props = [];
  const propsInterfaceRegex = new RegExp(`interface\\s+${fileName}Props\\s*{([^}]+)}`, 's');
  const propsMatch = content.match(propsInterfaceRegex);
  
  if (propsMatch) {
    const propsContent = propsMatch[1];
    const propLines = propsContent.split('\n').filter(line => line.trim());
    
    for (const line of propLines) {
      const propRegex = /(\w+)(\?)?:\s*([^;]+)/;
      const propMatch = line.match(propRegex);
      if (propMatch) {
        props.push({
          name: propMatch[1],
          type: propMatch[3].trim(),
          required: !propMatch[2]
        });
      }
    }
  }

  // Detect React patterns
  const hasState = content.includes('useState');
  const hasEffects = content.includes('useEffect');
  const hasCallbacks = content.includes('useCallback') || content.includes('onClick') || content.includes('onSubmit');

  if (exports.length === 0) {
    return null;
  }

  return {
    name: fileName,
    filePath,
    exports,
    props,
    hasState,
    hasEffects,
    hasCallbacks
  };
}

/**
 * Generate test content for a component
 */
function generateTestContent(info) {
  const componentExports = info.exports.filter(e => e.type === 'component');
  
  if (componentExports.length === 0) {
    return generateUtilityTestContent(info);
  }

  const mainComponent = componentExports[0];
  const testSuites = [];

  // Generate imports
  const imports = [
    `import { render, screen } from '@testing-library/react';`,
    `import { describe, it, expect, vi } from 'vitest';`,
    `import { ${mainComponent.name} } from './${info.name}';`
  ];

  if (info.hasCallbacks) {
    imports.push(`import userEvent from '@testing-library/user-event';`);
  }

  // Generate default props
  const requiredProps = info.props.filter(p => p.required);
  const defaultProps = [];
  
  for (const prop of requiredProps) {
    if (prop.type.includes('string')) {
      defaultProps.push(`  ${prop.name}: 'Test ${prop.name}',`);
    } else if (prop.type.includes('number')) {
      defaultProps.push(`  ${prop.name}: 0,`);
    } else if (prop.type.includes('boolean')) {
      defaultProps.push(`  ${prop.name}: false,`);
    } else if (prop.type.includes('[]')) {
      defaultProps.push(`  ${prop.name}: [],`);
    } else if (prop.type.includes('{')) {
      defaultProps.push(`  ${prop.name}: {},`);
    } else if (prop.type.includes('() =>')) {
      defaultProps.push(`  ${prop.name}: vi.fn(),`);
    } else {
      defaultProps.push(`  ${prop.name}: undefined as any,`);
    }
  }

  // Basic rendering test
  testSuites.push(`
describe('${mainComponent.name}', () => {
  const defaultProps = {
${defaultProps.join('\n')}
  };

  it('should render without crashing', () => {
    const { container } = render(<${mainComponent.name} {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with all required props', () => {
    render(<${mainComponent.name} {...defaultProps} />);
    // TODO: Add assertions for rendered content
    // expect(screen.getByText(/test/i)).toBeInTheDocument();
  });`);

  // Optional props test
  const optionalProps = info.props.filter(p => !p.required);
  if (optionalProps.length > 0) {
    testSuites.push(`
  it('should render with optional props', () => {
    const props = {
      ...defaultProps,
      // TODO: Add optional props here
    };
    render(<${mainComponent.name} {...props} />);
    // TODO: Add assertions
  });`);
  }

  // Callback tests
  if (info.hasCallbacks) {
    testSuites.push(`
  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const mockCallback = vi.fn();
    const props = {
      ...defaultProps,
      // TODO: Add callback props
      // onClick: mockCallback,
    };
    
    render(<${mainComponent.name} {...props} />);
    
    // TODO: Simulate user interaction
    // const button = screen.getByRole('button');
    // await user.click(button);
    
    // expect(mockCallback).toHaveBeenCalledTimes(1);
  });`);
  }

  // State tests
  if (info.hasState) {
    testSuites.push(`
  it('should manage internal state correctly', () => {
    render(<${mainComponent.name} {...defaultProps} />);
    // TODO: Add state-related assertions
  });`);
  }

  // Effect tests
  if (info.hasEffects) {
    testSuites.push(`
  it('should handle side effects', async () => {
    render(<${mainComponent.name} {...defaultProps} />);
    // TODO: Add effect-related assertions
    // You may need to use waitFor for async effects
  });`);
  }

  // Accessibility test
  testSuites.push(`
  it('should be accessible', () => {
    const { container } = render(<${mainComponent.name} {...defaultProps} />);
    // TODO: Add accessibility assertions
    // You can use jest-axe for comprehensive a11y testing
  });`);

  // Snapshot test
  testSuites.push(`
  it('should match snapshot', () => {
    const { container } = render(<${mainComponent.name} {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });`);

  testSuites.push(`\n});`);

  return `${imports.join('\n')}\n${testSuites.join('\n')}\n`;
}

/**
 * Generate test content for utility functions
 */
function generateUtilityTestContent(info) {
  const functionExports = info.exports.filter(e => e.type === 'function' || e.type === 'const');
  
  if (functionExports.length === 0) {
    return '// No testable exports found\n';
  }

  const imports = [
    `import { describe, it, expect } from 'vitest';`,
    `import { ${functionExports.map(e => e.name).join(', ')} } from './${info.name}';`
  ];

  const testSuites = [];

  for (const func of functionExports) {
    testSuites.push(`
describe('${func.name}', () => {
  it('should be defined', () => {
    expect(${func.name}).toBeDefined();
  });

  it('should handle valid input', () => {
    // TODO: Add test cases with valid input
    // const result = ${func.name}(validInput);
    // expect(result).toBe(expectedOutput);
  });

  it('should handle edge cases', () => {
    // TODO: Add edge case tests
  });

  it('should handle invalid input gracefully', () => {
    // TODO: Add tests for error handling
  });
});`);
  }

  return `${imports.join('\n')}\n${testSuites.join('\n')}\n`;
}

/**
 * Generate test file for a component
 */
function generateTestFile(info) {
  const testDir = path.dirname(info.filePath);
  const testFileName = `${info.name}.test.tsx`;
  const testFilePath = path.join(testDir, testFileName);

  // Skip if test file already exists
  if (fs.existsSync(testFilePath)) {
    console.log(`⏭️  Skipping ${info.name} (test already exists)`);
    return;
  }

  const testContent = generateTestContent(info);
  fs.writeFileSync(testFilePath, testContent);
  console.log(`✅ Generated test for ${info.name}`);
}

/**
 * Process a directory
 */
function processDirectory(dir, packageName) {
  console.log(`\n📦 Processing ${packageName}...\n`);

  const files = findTsxFiles(dir);
  let generatedCount = 0;

  for (const file of files) {
    const info = analyzeFile(file);
    if (info) {
      generateTestFile(info);
      generatedCount++;
    }
  }

  console.log(`\n✨ Generated ${generatedCount} test files for ${packageName}\n`);
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 BECC Test Generator\n');

  const args = parseArgs();
  const scope = args.scope?.toLowerCase();

  // Skip packages/ui - no test generation for shared UI components
  if (scope === 'ui') {
    console.log('\n⏭️  Skipping @becc/ui (excluded from test generation)\n');
  }

  if (scope === 'shared' || !scope) {
    const sharedDir = path.join(PACKAGES_DIR, 'shared', 'src');
    if (fs.existsSync(sharedDir)) {
      processDirectory(sharedDir, '@becc/shared');
    }
  }

  if (scope === 'website' || !scope) {
    const websiteDir = path.join(APPS_DIR, 'website', 'src');
    if (fs.existsSync(websiteDir)) {
      processDirectory(websiteDir, '@becc/website');
    }
  }

  if (scope === 'school-management' || !scope) {
    const schoolDir = path.join(APPS_DIR, 'school-management', 'src');
    if (fs.existsSync(schoolDir)) {
      processDirectory(schoolDir, '@becc/school-management');
    }
  }

  if (scope === 'learning-management' || !scope) {
    const lmsDir = path.join(APPS_DIR, 'learning-management', 'src');
    if (fs.existsSync(lmsDir)) {
      processDirectory(lmsDir, '@becc/learning-management');
    }
  }

  console.log('🎉 Test generation complete!\n');
}

main();
