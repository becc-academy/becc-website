# Contributing to BECC Monorepo

Thank you for your interest in contributing to the BECC project! This document provides guidelines and standards for contributing to this monorepo.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Conventions](#coding-conventions)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/becc-website.git
cd becc-website

# Add upstream remote
git remote add upstream https://github.com/becc-academy/becc-website.git
```

### 2. Install Dependencies

```bash
unset NODE_ENV
pnpm install
```

### 3. Create a Branch

```bash
# Create a feature branch
git checkout -b feat/your-feature-name

# Or a bugfix branch
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes

Follow the coding conventions and commit guidelines below.

## 🔄 Development Workflow

### 1. Keep Your Fork Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

### 2. Work on Your Branch

```bash
# Make sure you're on your feature branch
git checkout feat/your-feature-name

# Make changes, then stage them
git add .

# Commit with conventional commit format
git commit -m "feat(website): add user profile page"

# Push to your fork
git push origin feat/your-feature-name
```

### 3. Before Submitting

```bash
# Run all quality checks
pnpm lint
pnpm type-check
pnpm format:check
pnpm build

# Fix any issues
pnpm lint --fix
pnpm format
```

## 📝 Coding Conventions

### TypeScript Guidelines

#### 1. Use Strict Types

```typescript
// ✅ Good - Explicit types
const calculateTotal = (price: number, quantity: number): number => {
  return price * quantity;
};

interface IUserData {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad - Implicit any
const calculateTotal = (price, quantity) => {
  return price * quantity;
};
```

#### 2. No `any` Types

```typescript
// ✅ Good - Use proper types or unknown
const parseData = <T>(data: unknown): T => {
  return JSON.parse(data as string) as T;
};

// ❌ Bad - Using any
const parseData = (data: any): any => {
  return JSON.parse(data);
};
```

#### 3. Use Type Aliases and Interfaces Properly

```typescript
// ✅ Good - Interface for objects (prefix with I)
interface IUser {
  id: string;
  name: string;
}

// ✅ Good - Type alias for unions, primitives (prefix with T)
type TStatus = 'active' | 'inactive' | 'pending';
type TUserId = string;

// ❌ Bad - No prefix
interface User {
  id: string;
}
```

### Naming Conventions

#### 1. Variables and Functions - camelCase

```typescript
// ✅ Good
const userName = 'John Doe';
const isUserActive = true;
const getUserById = (id: string): IUser => { /* ... */ };

// ❌ Bad
const UserName = 'John Doe';
const is_user_active = true;
const GetUserById = (id: string): IUser => { /* ... */ };
```

#### 2. Constants - UPPER_CASE

```typescript
// ✅ Good
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.becc.com';

// ❌ Bad
const maxRetryAttempts = 3;
const apiBaseUrl = 'https://api.becc.com';
```

#### 3. React Components - PascalCase

```typescript
// ✅ Good
const UserProfile = (): JSX.Element => { /* ... */ };
const NavigationBar = (): JSX.Element => { /* ... */ };

// ❌ Bad
const userProfile = (): JSX.Element => { /* ... */ };
const navigation_bar = (): JSX.Element => { /* ... */ };
```

#### 4. Files and Folders

```bash
# ✅ Good
src/
├── components/
│   ├── UserProfile/
│   │   ├── index.tsx           # Component file
│   │   └── UserProfile.module.css
│   └── NavigationBar/
├── pages/
│   ├── HomePage.tsx            # Page components
│   └── AboutPage.tsx
└── utils/
    ├── formatDate.ts           # Utility files
    └── validateEmail.ts

# ❌ Bad
src/
├── Components/                 # Don't capitalize folders
├── user-profile.tsx            # Use PascalCase for components
└── format_date.ts              # Use camelCase for utilities
```

### Function Style - Arrow Functions

```typescript
// ✅ Good - Arrow functions
const addNumbers = (a: number, b: number): number => {
  return a + b;
};

const fetchUserData = async (userId: string): Promise<IUser> => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json() as Promise<IUser>;
};

// ❌ Bad - Regular function declarations
function addNumbers(a: number, b: number): number {
  return a + b;
}

function fetchUserData(userId: string): Promise<IUser> {
  // ...
}
```

### Import Organization

Imports are automatically sorted by ESLint, but follow this order:

```typescript
// 1. React and core libraries (external)
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// 2. Other external dependencies
import axios from 'axios';
import { format } from 'date-fns';

// 3. Internal packages (@becc/*)
import { formatDate, APP_NAME } from '@becc/shared';

// 4. Internal modules with @ alias
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

// 5. Relative imports
import { helper } from '../utils/helper';
import { LocalComponent } from './LocalComponent';

// 6. Type imports (last)
import type { IUser } from '@/types';
import type { TStatus } from './types';
```

### React Component Structure

```typescript
// Good component structure
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

import type { IUser } from '@/types';

interface IUserProfileProps {
  userId: string;
  onUpdate?: (user: IUser) => void;
}

const UserProfile = ({ userId, onUpdate }: IUserProfileProps): JSX.Element => {
  // 1. Hooks
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // 2. Effects
  useEffect(() => {
    // Fetch user data
  }, [userId]);

  // 3. Event handlers
  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = (): void => {
    // Save logic
    onUpdate?.(user);
  };

  // 4. Early returns
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 5. Main render
  return (
    <div>
      <h1>{user.name}</h1>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
};

export default UserProfile;
```

### Code Comments

Only add comments when necessary to explain **why**, not **what**.

```typescript
// ✅ Good - Explains why
// Using setTimeout to debounce to avoid excessive API calls
const debouncedSearch = setTimeout(() => {
  searchUsers(query);
}, 300);

// ❌ Bad - States the obvious
// Set the user name
const userName = 'John';

// ❌ Bad - Redundant
// This function adds two numbers
const add = (a: number, b: number): number => a + b;
```

## 📦 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) format. All commits **MUST** follow this format or they will be rejected by the commit hook.

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring (neither fixes a bug nor adds a feature)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: CI/CD configuration changes
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scope

Scope should be the app or package name:
- `website`
- `school-management`
- `shared`
- `ui`
- `config`

### Examples

#### Good Commits

```bash
# Feature
git commit -m "feat(website): add user authentication flow"

# Bug fix
git commit -m "fix(website): resolve login redirect issue"

# Documentation
git commit -m "docs: update contributing guidelines"

# Refactor
git commit -m "refactor(shared): optimize date formatting utility"

# Performance
git commit -m "perf(website): lazy load images on homepage"

# Build
git commit -m "build: update vite to version 5.0.0"

# With body and footer
git commit -m "feat(website): add user profile page

Implement user profile page with:
- Avatar upload
- Profile information editing
- Activity history

Closes #123"
```

#### Bad Commits (Will be rejected)

```bash
# ❌ Missing type
git commit -m "add user profile"

# ❌ Wrong case
git commit -m "Feat: add user profile"

# ❌ Missing scope
git commit -m "feat: add profile"

# ❌ Period at end
git commit -m "feat(website): add user profile."

# ❌ Vague message
git commit -m "fix: fix stuff"

# ❌ Not descriptive
git commit -m "feat(website): update"
```

### Commit Message Guidelines

1. **Use imperative mood**: "add" not "added" or "adds"
2. **Be specific**: Describe what changed and why
3. **Keep subject line under 100 characters**
4. **Reference issues**: Use "Closes #123" or "Fixes #456"
5. **Break changes**: Add "BREAKING CHANGE:" in footer

## 🔍 Pull Request Process

### 1. Before Creating PR

Ensure your code passes all checks:

```bash
# Run all checks
pnpm lint
pnpm type-check
pnpm format:check
pnpm build

# Fix any issues
pnpm lint --fix
pnpm format
```

### 2. PR Title Format

Use the same format as commit messages:

```
feat(website): add user authentication flow
fix(shared): resolve date formatting bug
docs: update installation guide
```

### 3. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added user authentication
- Updated login page UI
- Added JWT token handling

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Tested on different browsers

## Related Issues
Closes #123
Fixes #456

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project conventions
- [ ] Self-reviewed the code
- [ ] Added/updated comments for complex logic
- [ ] Updated documentation
- [ ] No new warnings or errors
- [ ] Added tests that prove fix/feature works
```

### 4. Review Process

1. Submit your PR
2. Wait for automated checks to pass
3. Address review comments
4. Request re-review after making changes
5. PR will be merged by maintainers once approved

### 5. After Merge

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull upstream main

# Delete your feature branch (optional)
git branch -d feat/your-feature-name
```

## 🧪 Testing Guidelines

### Writing Tests

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';

import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('should render user name', () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should handle edit click', () => {
    const handleEdit = jest.fn();
    render(<UserProfile userId="123" onEdit={handleEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(handleEdit).toHaveBeenCalled();
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific app
pnpm --filter @becc/website test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

## 📚 Documentation

### Code Documentation

- Document complex algorithms and business logic
- Add JSDoc comments for public APIs
- Keep README and SETUP files updated
- Document breaking changes

### JSDoc Example

```typescript
/**
 * Formats a date according to the specified format
 * 
 * @param date - The date to format
 * @param format - The format string (default: 'yyyy-MM-dd')
 * @returns Formatted date string
 * 
 * @example
 * ```typescript
 * formatDate(new Date(), 'MM/dd/yyyy')
 * // Returns: "11/07/2024"
 * ```
 */
export const formatDate = (date: Date, format = 'yyyy-MM-dd'): string => {
  // Implementation
};
```

## 🔒 Security

- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Review dependencies for vulnerabilities
- Report security issues privately to maintainers

## ❓ Questions?

- 💬 Open a [GitHub Discussion](https://github.com/becc-academy/becc-website/discussions)
- 📧 Email: dev@becc.com
- 📖 Check [README.md](README.md) and [SETUP.md](SETUP.md)

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Contributing!** 🎉
