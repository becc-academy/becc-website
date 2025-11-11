# Test Setup Guide

This guide explains how to set up and run tests in the BECC monorepo.

## Test Stack

- **Vitest** - Fast unit test framework for Vite projects
- **React Testing Library** - For testing React components
- **@testing-library/user-event** - For simulating user interactions
- **@testing-library/jest-dom** - Custom matchers for DOM assertions

## Installation

Install testing dependencies:

```bash
# At the root of the monorepo
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8 -w
```

## Test Generator

We've created an automated test generator that analyzes your TypeScript files and creates test stubs with appropriate assertions based on the component structure.

### Usage

```bash
# Generate tests for all packages
node generate-tests.mjs

# Generate tests only for UI package
node generate-tests.mjs --scope=ui

# Generate tests only for website app
node generate-tests.mjs --scope=website

# Generate tests for specific scope
node generate-tests.mjs --scope=shared
node generate-tests.mjs --scope=school-management
node generate-tests.mjs --scope=learning-management
```

### What the Generator Does

The test generator:

1. **Analyzes component structure**
   - Detects exported components, functions, and types
   - Identifies component props and their types
   - Detects React patterns (state, effects, callbacks)

2. **Generates appropriate tests**
   - Basic rendering tests
   - Props validation tests
   - User interaction tests (for components with callbacks)
   - State management tests (for stateful components)
   - Side effect tests (for components with useEffect)
   - Accessibility tests
   - Snapshot tests

3. **Creates default props**
   - Automatically generates mock data for required props
   - Uses appropriate defaults based on prop types

## Running Tests

Add these scripts to your root `package.json`:

```json
{
  "scripts": {
    "test": "turbo run test",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch",
    "generate:tests": "node generate-tests.mjs"
  }
}
```

Then you can run:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage

# Generate test files
pnpm generate:tests
```

## Package-Specific Setup

### For @becc/ui Package

Add to `packages/ui/package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "vitest": "^1.2.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "@vitest/coverage-v8": "^1.2.0",
    "jsdom": "^23.0.1"
  }
}
```

Create `packages/ui/vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '../../vitest.setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### For Website App

Add to `apps/website/package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "vitest": "^1.2.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "@vitest/coverage-v8": "^1.2.0",
    "jsdom": "^23.0.1"
  }
}
```

Create `apps/website/vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '../../vitest.setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Writing Tests

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing with Props

```typescript
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  const defaultProps = {
    siteName: 'BECC Academy',
    navLinks: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' }
    ]
  };

  it('should render site name', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('BECC Academy')).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should mark active link', () => {
    render(<Header {...defaultProps} />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('active'); // Adjust based on your implementation
  });
});
```

### Testing State Changes

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('should update input values', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John Doe');
    
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should submit form with correct data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      // ... other fields
    });
  });
});
```

### Testing Async Operations

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { DataComponent } from './DataComponent';

describe('DataComponent', () => {
  it('should load and display data', async () => {
    render(<DataComponent />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/data loaded/i)).toBeInTheDocument();
    });
  });
});
```

## Test Coverage

Generate coverage reports:

```bash
pnpm test:coverage
```

This will create a coverage report in `coverage/` directory. Open `coverage/index.html` to view detailed coverage information.

### Coverage Thresholds

You can set minimum coverage thresholds in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the user sees and does
   - Avoid testing internal state or implementation details

2. **Use Semantic Queries**
   - Prefer `getByRole`, `getByLabelText`, `getByText`
   - Avoid `getByTestId` unless necessary

3. **Test Accessibility**
   - Ensure components are keyboard navigable
   - Check for proper ARIA attributes
   - Test with screen readers in mind

4. **Keep Tests Simple**
   - One concept per test
   - Use descriptive test names
   - Arrange-Act-Assert pattern

5. **Mock External Dependencies**
   - Mock API calls
   - Mock external libraries when needed
   - Use `vi.fn()` for callbacks

6. **Snapshot Testing**
   - Use sparingly for stable components
   - Review snapshot changes carefully
   - Update snapshots with `pnpm test -- -u`

## Continuous Integration

Add to your CI pipeline:

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## Troubleshooting

### Tests Not Finding Modules

Make sure your `tsconfig.json` includes the test files:

```json
{
  "include": ["src", "**/*.test.ts", "**/*.test.tsx"]
}
```

### CSS Import Errors

Add to `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    css: true,
  },
});
```

### Type Errors in Tests

Create `vitest.d.ts`:

```typescript
/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
