# Husky Git Hooks Setup

This project uses Husky to enforce code quality standards before commits and pushes.

## What's Enforced

### Pre-Commit Checks (runs before `git commit`)

1. **ESLint** - Code linting with auto-fix
2. **Prettier** - Code formatting
3. **Import Sorting** - Automatic import organization with `eslint-plugin-simple-import-sort`
4. **Test File Requirement** - Every TypeScript/TSX file must have a corresponding test file

### Pre-Push Checks (runs before `git push`)

1. **All Tests** - All test suites must pass

### Commit Message Validation

1. **Conventional Commits** - Commit messages must follow conventional commit format

## Git Hooks Overview

### `pre-commit`
Runs `lint-staged` which:
- Fixes ESLint errors automatically
- Formats code with Prettier
- Sorts imports alphabetically
- Checks for missing test files

**Files checked**: Only staged files (`.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.md`, `.css`, `.scss`)

### `pre-push`
Runs all tests before pushing to remote:
- `pnpm test` - Runs entire test suite
- Blocks push if any test fails

### `commit-msg`
Validates commit message format using commitlint:
- Enforces conventional commit format
- Examples:
  - ✅ `feat: add new button component`
  - ✅ `fix: resolve navigation bug`
  - ✅ `docs: update README`
  - ❌ `added stuff` (rejected)

## Test File Requirements

### Files That Require Tests

All `.ts` and `.tsx` files **except**:
- `*.config.ts/js/mjs/cjs` - Configuration files
- `*.d.ts` - Type definition files
- `vite-env.d.ts` - Vite environment types
- `index.ts/tsx` - Index/barrel files
- `main.ts/tsx` - Entry point files
- `App.ts/tsx` - Root App component
- `types.ts/tsx` - Type definition files
- `constants.ts/tsx` - Constants files
- `styles.ts/tsx` - Style files
- `utils.ts/tsx` - Utility files

### Files in Excluded Directories

Files in these directories don't require tests:
- `node_modules/`
- `dist/`, `build/`
- `.turbo/`
- `coverage/`
- `__tests__/`, `tests/`
- `.husky/`, `.github/`

### Test File Naming

Tests can be named:
- `ComponentName.test.ts`
- `ComponentName.test.tsx`
- `ComponentName.spec.ts`
- `ComponentName.spec.tsx`

Tests can be in:
- Same directory as source file
- `__tests__/` subdirectory

### Example Structure

```
src/
├── components/
│   ├── Button.tsx               ✅ Requires test
│   ├── Button.test.tsx          ✅ Test file
│   ├── Header.tsx               ✅ Requires test
│   └── __tests__/
│       └── Header.test.tsx      ✅ Test file
├── utils.ts                     ⏭️ Excluded
├── types.ts                     ⏭️ Excluded
└── index.ts                     ⏭️ Excluded
```

## Import Sorting Rules

Imports are automatically sorted in this order:

1. **Side effect imports**
   ```typescript
   import './styles.css';
   ```

2. **React and external packages**
   ```typescript
   import React from 'react';
   import { useState } from 'react';
   import axios from 'axios';
   ```

3. **Internal packages** (`@becc/*`)
   ```typescript
   import { Header, Footer } from '@becc/ui';
   import { utils } from '@becc/shared';
   ```

4. **Parent imports**
   ```typescript
   import { something } from '../../utils';
   ```

5. **Sibling imports**
   ```typescript
   import { helper } from './helper';
   ```

6. **Style imports**
   ```typescript
   import './styles.css';
   ```

## Bypassing Hooks (Not Recommended)

In rare cases, you can bypass hooks:

```bash
# Skip pre-commit hooks
git commit --no-verify

# Skip pre-push hooks
git push --no-verify
```

**⚠️ Warning**: Only use `--no-verify` in emergencies. These checks exist to maintain code quality.

## Troubleshooting

### Hook Not Running

If hooks aren't running:

```bash
# Reinstall Husky
pnpm prepare

# Check hook files exist
ls -la .husky/
```

### Windows-Specific Issues

Husky should work on Windows with Git Bash or WSL. If you have issues:

1. Make sure you're using Git Bash (comes with Git for Windows)
2. Or use WSL (Windows Subsystem for Linux)
3. Check that hooks are executable:
   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/pre-push
   chmod +x .husky/commit-msg
   ```

### Test Check Failing

If the test checker blocks your commit:

```bash
# Generate missing tests
node generate-tests.mjs --scope=ui
node generate-tests.mjs --scope=website

# Or generate for specific file
# (manually create test file next to source file)
```

### ESLint Errors

If ESLint can't auto-fix:

```bash
# Run ESLint manually to see errors
pnpm lint

# Fix manually, then commit
```

### Test Failures on Push

If tests fail on push:

```bash
# Run tests locally
pnpm test

# Fix failing tests
# Then try push again
```

## Setup for New Contributors

After cloning the repository:

```bash
# Install dependencies (includes Husky setup)
pnpm install

# Husky will automatically set up hooks
```

That's it! Hooks are automatically configured.

## Configuration Files

### `.husky/pre-commit`
```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### `.husky/pre-push`
```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Running pre-push checks..."
pnpm test || exit 1
```

### `.husky/commit-msg`
```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

### `.lintstagedrc.cjs`
```javascript
module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
    () => 'node check-tests.mjs',
  ],
  '*.{json,md,css,scss}': [
    'prettier --write',
  ],
};
```

## Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Good commits
git commit -m "feat: add login button component"
git commit -m "fix: resolve header navigation bug"
git commit -m "docs: update component usage guide"
git commit -m "test: add tests for Button component"
git commit -m "refactor: simplify authentication logic"
git commit -m "chore: update dependencies"

# With scope
git commit -m "feat(ui): add new Card component"
git commit -m "fix(website): resolve routing issue"

# With body
git commit -m "feat: add user authentication

- Add login form
- Implement JWT validation
- Add protected routes"
```

## Benefits

✅ **Consistent Code Style** - Prettier ensures uniform formatting
✅ **Clean Imports** - Automatic import sorting and organization
✅ **Prevent Bugs** - ESLint catches common errors
✅ **Test Coverage** - Ensures all components are tested
✅ **Quality Commits** - Conventional commits improve changelog
✅ **Prevent Broken Code** - Tests must pass before push

## Performance

- **Pre-commit**: Only checks staged files (fast, ~1-5 seconds)
- **Pre-push**: Runs all tests (slower, depends on test count)

## Disable Temporarily (Development)

If you need to disable hooks temporarily during development:

```bash
# Disable pre-commit for one commit
git commit -m "WIP: work in progress" --no-verify

# Re-enable automatically on next commit (normal)
git commit -m "feat: completed feature"
```

## Summary

This setup ensures:
1. ✅ All code is properly formatted and linted
2. ✅ All TypeScript files have corresponding tests
3. ✅ All tests pass before pushing
4. ✅ Commit messages follow conventions
5. ✅ Works cross-platform (Windows, macOS, Linux)

**Result**: Higher code quality, fewer bugs, better collaboration! 🚀
