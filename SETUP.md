# BECC Monorepo Setup Guide

## ✅ What Has Been Set Up

Your professional TypeScript React Vite monorepo is now ready! Here's what's been configured:

### 1. **Monorepo Structure**

- ✅ pnpm workspace configuration
- ✅ Turbo for build optimization
- ✅ Organized apps/ and packages/ structure
- ✅ Ready for multiple applications

### 2. **TypeScript Configuration**

- ✅ Strict mode enabled
- ✅ Path aliases (@/\*) configured
- ✅ Shared base configuration
- ✅ Individual configs per package

### 3. **Code Quality Tools**

- ✅ ESLint with professional rules
  - Arrow functions enforced
  - camelCase naming conventions
  - Import ordering (alphabetical + grouped)
  - TypeScript strict rules
  - React best practices
- ✅ Prettier for code formatting
- ✅ Import sorting configured

### 4. **Git Hooks & Commit Standards**

- ✅ Husky for Git hooks
- ✅ Commitlint for conventional commits
- ✅ Lint-staged for pre-commit linting
- ✅ Pre-commit hook (runs linting)
- ✅ Commit-msg hook (validates commits)

### 5. **Development Tools**

- ✅ VSCode settings configured
- ✅ Recommended extensions list
- ✅ EditorConfig for consistency

### 6. **Website App (Main Application)**

- ✅ React 18 + Vite 5 configured
- ✅ React Router setup
- ✅ Sample homepage created
- ✅ Professional folder structure
- ✅ Ready for development

### 7. **Shared Packages**

- ✅ @becc/shared - Common utilities and types
- ✅ @becc/config - Shared configurations
- ✅ Ready for cross-app code sharing

## 🚀 Next Steps

### 1. Install Dependencies (If Not Already Done)

```bash
# Make sure NODE_ENV is not set to production
unset NODE_ENV

# Install all dependencies
pnpm install
```

### 2. Start Development

```bash
# Start the website app
pnpm --filter @becc/website dev

# Or use turbo to run all dev servers
pnpm dev
```

The website will be available at `http://localhost:3000`

### 3. Test the Setup

```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Type check all code
pnpm type-check

# Build all apps
pnpm build
```

### 4. Test Git Hooks

```bash
# Make a change to any file
echo "// test" >> apps/website/src/App.tsx

# Stage the change
git add .

# Try to commit (should run linting)
git commit -m "test: verify git hooks"

# If commit message doesn't follow convention, it will be rejected
# Try with proper format:
git commit -m "test: verify git hooks and linting"
```

### 5. Add More Apps

When ready to add School Management or Learning Management systems:

```bash
# Navigate to apps directory
cd apps

# Copy the website structure
cp -r website school-management

# Update package.json name
cd school-management
# Edit package.json: change name to "@becc/school-management"

# Add specific dependencies
pnpm add [your-dependencies]
```

## 📋 Available Commands

### Root Level

- `pnpm dev` - Run all apps in dev mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all code
- `pnpm format` - Format all code
- `pnpm format:check` - Check formatting
- `pnpm type-check` - Type check all code
- `pnpm test` - Run all tests
- `pnpm clean` - Clean all build artifacts

### Per-App Commands

```bash
# Run commands in specific apps
pnpm --filter @becc/website dev
pnpm --filter @becc/website build
pnpm --filter @becc/website lint
pnpm --filter @becc/website type-check
```

## 🎯 Coding Standards Reminder

### Function Style (Enforced by ESLint)

```typescript
// ✅ Good - Arrow function
const myFunction = (param: string): string => {
  return param.toUpperCase();
};

// ❌ Bad - Regular function
function myFunction(param: string): string {
  return param.toUpperCase();
}
```

### Naming Conventions (Enforced by ESLint)

```typescript
// ✅ Good
const userName = 'John';
const USER_ROLE = 'admin';
interface IUser {
  name: string;
}
type TStatus = 'active' | 'inactive';

// ❌ Bad
const UserName = 'John'; // PascalCase for variable
const user_role = 'admin'; // snake_case
interface User {
  name: string;
} // Missing I prefix
```

### Import Order (Automatic)

```typescript
// Imports are automatically sorted in this order:
import React from 'react'; // 1. External (React first)

import { someUtil } from 'lodash'; // 2. Other external

import { helper } from '@/utils'; // 3. Internal (@/ aliases)

import { Component } from '../Component'; // 4. Parent/sibling

import type { IUser } from './types'; // 5. Type imports
```

### Commit Message Format

```bash
# Format: <type>(<scope>): <subject>

✅ Good examples:
git commit -m "feat(website): add hero section to homepage"
git commit -m "fix(auth): resolve login validation error"
git commit -m "docs: update installation guide"
git commit -m "refactor(shared): optimize date formatting utility"

❌ Bad examples:
git commit -m "added stuff"
git commit -m "Fixed bug"
git commit -m "WIP"
```

## 🔧 Configuration Files Reference

- `pnpm-workspace.yaml` - Workspace configuration
- `turbo.json` - Turbo build configuration
- `.eslintrc.cjs` - ESLint rules
- `.prettierrc` - Prettier configuration
- `commitlint.config.cjs` - Commit lint rules
- `.lintstagedrc.cjs` - Pre-commit linting
- `tsconfig.base.json` - Base TypeScript config
- `.husky/` - Git hooks

## 📚 Additional Resources

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🐛 Troubleshooting

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
unset NODE_ENV
pnpm install
```

### Husky Hooks Not Working

```bash
# Reinstall husky
pnpm add -D husky
pnpm exec husky install
```

### ESLint Errors

```bash
# Auto-fix what can be fixed
pnpm lint --fix

# Or per app
pnpm --filter @becc/website lint --fix
```

### Type Errors

```bash
# Check types
pnpm type-check

# Rebuild TypeScript
pnpm build
```

## ✨ You're All Set!

Your monorepo is ready for professional development. Start coding with confidence knowing that:

- Code quality is automatically enforced
- Imports are automatically organized
- Commits follow professional standards
- TypeScript catches errors early
- Everything is optimized for monorepo workflows

Happy coding! 🚀
