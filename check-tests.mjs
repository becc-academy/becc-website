#!/usr/bin/env node

/**
 * Pre-commit Test Checker (Cross-platform compatible)
 * 
 * Ensures that every TypeScript/TSX file has a corresponding test file
 * before allowing commits. Works on Windows, macOS, and Linux.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = __dirname;

// Files to exclude from test requirement
const EXCLUDE_PATTERNS = [
  /\.config\.(ts|js|mjs|cjs)$/,
  /\.d\.ts$/,
  /vite-env\.d\.ts$/,
  /index\.(ts|tsx)$/,
  /main\.(ts|tsx)$/,
  /App\.(ts|tsx)$/,
  /types\.(ts|tsx)$/,
  /constants\.(ts|tsx)$/,
  /styles\.(ts|tsx)$/,
  /utils\.(ts|tsx)$/,
];

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  'dist',
  'build',
  '.turbo',
  'coverage',
  '__tests__',
  'tests',
  '.husky',
  '.github',
  'packages/ui', // Exclude shared UI components from test requirements
];

/**
 * Get staged TypeScript/TSX files (cross-platform)
 */
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
      cwd: ROOT_DIR,
    });

    return output
      .split(/\r?\n/) // Handle both Windows (CRLF) and Unix (LF) line endings
      .filter(file => file.trim())
      .filter(file => file.match(/\.(ts|tsx)$/))
      .filter(file => !file.includes('.test.') && !file.includes('.spec.'))
      .map(file => path.resolve(ROOT_DIR, file));
  } catch (error) {
    console.error('❌ Failed to get staged files:', error.message);
    return [];
  }
}

/**
 * Check if file should be excluded from test requirement
 */
function shouldExclude(filePath) {
  // Normalize path separators for cross-platform compatibility
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  
  // Check if file is in excluded directory
  if (EXCLUDE_DIRS.some(dir => relativePath.includes(dir))) {
    return true;
  }

  // Check if file matches excluded patterns
  const fileName = path.basename(filePath);
  if (EXCLUDE_PATTERNS.some(pattern => pattern.test(fileName))) {
    return true;
  }

  return false;
}

/**
 * Find corresponding test file
 */
function findTestFile(filePath) {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const nameWithoutExt = fileName.replace(/\.(ts|tsx)$/, '');

  // Possible test file names
  const testFiles = [
    path.join(dir, `${nameWithoutExt}.test.ts`),
    path.join(dir, `${nameWithoutExt}.test.tsx`),
    path.join(dir, `${nameWithoutExt}.spec.ts`),
    path.join(dir, `${nameWithoutExt}.spec.tsx`),
    path.join(dir, '__tests__', `${nameWithoutExt}.test.ts`),
    path.join(dir, '__tests__', `${nameWithoutExt}.test.tsx`),
    path.join(dir, '__tests__', `${nameWithoutExt}.spec.ts`),
    path.join(dir, '__tests__', `${nameWithoutExt}.spec.tsx`),
  ];

  return testFiles.find(testFile => fs.existsSync(testFile));
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Checking for required test files...\n');

  const stagedFiles = getStagedFiles();

  if (stagedFiles.length === 0) {
    console.log('✅ No TypeScript files to check\n');
    process.exit(0);
  }

  const missingTests = [];

  for (const file of stagedFiles) {
    if (!fs.existsSync(file)) {
      continue;
    }

    if (shouldExclude(file)) {
      const displayPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
      console.log(`⏭️  Skipping ${displayPath} (excluded)`);
      continue;
    }

    const testFile = findTestFile(file);
    const displayPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
    
    if (!testFile) {
      missingTests.push(file);
      console.log(`❌ Missing test: ${displayPath}`);
    } else {
      console.log(`✅ Has test: ${displayPath}`);
    }
  }

  console.log('');

  if (missingTests.length > 0) {
    console.error('❌ COMMIT BLOCKED: The following files are missing tests:\n');
    missingTests.forEach(file => {
      const displayPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
      console.error(`   - ${displayPath}`);
    });
    console.error('\n💡 Generate tests with: node generate-tests.mjs --scope=<package>\n');
    process.exit(1);
  }

  console.log('✅ All required test files exist!\n');
  process.exit(0);
}

main();
