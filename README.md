# BECC Monorepo

A professional full-stack monorepo for BECC's web applications including the main website, School Management System, and Learning Management System.

## 🏗️ Architecture Overview

This monorepo contains:

- **Frontend**: TypeScript + React + Vite applications
- **Backend**: Django REST Framework APIs (separate repository/services)
- **Shared Packages**: Common utilities, types, and configurations

## 📁 Project Structure

```
becc-monorepo/
├── apps/
│   ├── website/                 # Main BECC website (React + Vite)
│   ├── school-management/       # School Management System (coming soon)
│   └── learning-management/     # Learning Management System (coming soon)
├── packages/
│   ├── shared/                  # Shared utilities and types
│   ├── ui/                      # Shared UI components (coming soon)
│   └── config/                  # Shared configurations
├── .husky/                      # Git hooks
├── .vscode/                     # VSCode settings
└── ...configuration files
```

## ✨ Features

- ✅ **TypeScript** with strict mode enabled
- ✅ **React 18** with Vite for lightning-fast development
- ✅ **pnpm** workspaces for efficient dependency management
- ✅ **Turbo** for optimized monorepo builds and caching
- ✅ **ESLint** with professional rules and configurations
- ✅ **Prettier** for consistent code formatting
- ✅ **Conventional Commits** with Commitlint
- ✅ **Husky** for Git hooks
- ✅ **Import aliases** (@/\*) configured
- ✅ **Import sorting** automatically enforced
- ✅ **Arrow functions** enforced via ESLint
- ✅ **camelCase** naming conventions
- ✅ **Strict TypeScript** configuration

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 8.0.0 (Package manager)
- **Git** for version control
- **VSCode** (recommended) with recommended extensions

### Installation Steps

#### 1. Clone the Repository

```bash
git clone git@github.com:becc-academy/becc-website.git
cd becc-website
```

#### 2. Install pnpm (if not already installed)

```bash
# Using npm
npm install -g pnpm

# Or using Homebrew (macOS)
brew install pnpm

# Verify installation
pnpm --version
```

#### 3. Install Dependencies

```bash
# Make sure NODE_ENV is not set to production
unset NODE_ENV

# Install all dependencies for all workspaces
pnpm install

# This will:
# - Install root dependencies
# - Install dependencies for all apps in apps/
# - Install dependencies for all packages in packages/
# - Setup Git hooks automatically
```

#### 4. Verify Setup

```bash
# Check if everything is installed correctly
pnpm --version
node --version

# List all workspaces
pnpm list --depth=0
```

## 🛠️ Development Workflow

### Running Applications

#### Start the Website App

```bash
# Option 1: Run from root directory
pnpm --filter @becc/website dev

# Option 2: Navigate to app directory
cd apps/website
pnpm dev

# The app will be available at http://localhost:3000
```

#### Run All Apps (when you have multiple)

```bash
# From root directory - runs all apps in parallel
pnpm dev
```

### Building Applications

```bash
# Build all apps for production
pnpm build

# Build specific app
pnpm --filter @becc/website build

# Preview production build
cd apps/website
pnpm preview
```

### Code Quality Commands

```bash
# Lint all code (ESLint)
pnpm lint

# Lint and auto-fix issues
pnpm lint --fix

# Format all code (Prettier)
pnpm format

# Check if code is formatted
pnpm format:check

# Type check all TypeScript code
pnpm type-check

# Run all checks before committing
pnpm lint && pnpm type-check && pnpm format:check
```

### Cleaning Build Artifacts

```bash
# Clean all build outputs and caches
pnpm clean

# Clean and reinstall everything
pnpm clean && pnpm install
```

## 📖 Working with the Monorepo

### Understanding Workspaces

This project uses **pnpm workspaces**. Each app and package is a separate workspace with its own `package.json`.

#### Adding Dependencies

```bash
# Add dependency to root (for tooling like ESLint, Prettier)
pnpm add -D -w <package-name>

# Add dependency to specific app
pnpm --filter @becc/website add <package-name>

# Add dev dependency to specific app
pnpm --filter @becc/website add -D <package-name>

# Add shared package to an app
cd apps/website
pnpm add @becc/shared@workspace:*
```

#### Running Commands in Specific Workspaces

```bash
# Run dev in website app
pnpm --filter @becc/website dev

# Run build in all apps
pnpm --filter "./apps/*" build

# Run lint in shared package
pnpm --filter @becc/shared lint
```

### Project Navigation

```
Root Directory (becc-website/)
│
├── apps/                        # All applications
│   └── website/                 # Website application
│       ├── src/                 # Source code
│       │   ├── components/      # Reusable UI components
│       │   ├── pages/           # Page components (routes)
│       │   ├── hooks/           # Custom React hooks
│       │   ├── utils/           # Utility functions
│       │   ├── types/           # TypeScript type definitions
│       │   ├── assets/          # Static assets (images, fonts)
│       │   ├── styles/          # CSS/SCSS files
│       │   ├── App.tsx          # Main app component
│       │   └── main.tsx         # Application entry point
│       ├── public/              # Public static files
│       ├── index.html           # HTML template
│       ├── vite.config.ts       # Vite configuration
│       ├── tsconfig.json        # TypeScript config
│       └── package.json         # App dependencies
│
├── packages/                    # Shared packages
│   ├── shared/                  # Shared utilities and types
│   │   └── src/
│   │       ├── utils/           # Utility functions
│   │       ├── types/           # Shared TypeScript types
│   │       └── constants/       # Shared constants
│   ├── ui/                      # Shared UI components (future)
│   └── config/                  # Shared configurations
│
└── Configuration Files
    ├── package.json             # Root package.json (workspace config)
    ├── pnpm-workspace.yaml      # Workspace definition
    ├── turbo.json               # Turbo build configuration
    ├── tsconfig.base.json       # Base TypeScript config
    ├── .eslintrc.cjs            # ESLint rules
    ├── .prettierrc              # Prettier configuration
    ├── commitlint.config.cjs    # Commit message rules
    └── .husky/                  # Git hooks
```

### Backend Integration (Django)

The backend services are built with Django and Django REST Framework. When integrating:

1. **API Configuration**: Update `.env` files with Django API endpoints
2. **Environment Variables**: Use `VITE_API_URL` prefix for Vite apps
3. **CORS**: Ensure Django CORS settings allow your frontend origins
4. **Authentication**: Implement token-based auth (JWT recommended)

Example `.env` configuration:

```env
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000
```

- 📝 Coding Standards

### TypeScript Rules

- Strict mode enabled
- No explicit `any` types
- Explicit return types recommended
- No unused variables or parameters
- All array access is checked

### Naming Conventions

- **Variables & Functions**: `camelCase`
- **Types & Interfaces**: `PascalCase`
- **Interfaces**: Prefix with `I` (e.g., `IUser`)
- **Type Aliases**: Prefix with `T` (e.g., `TStatus`)
- **Constants**: `UPPER_CASE`

### Function Style

- Arrow functions preferred
- Use `const` for function declarations
- Example: `const myFunction = (): ReturnType => { ... }`

### Import Order

Imports are automatically sorted in the following order:

1. Built-in Node modules
2. External dependencies
3. Internal packages
4. Parent/sibling imports
5. Index imports
6. Type imports

### Commit Convention

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

Examples:

```bash
git commit -m "feat(website): add homepage hero section"
git commit -m "fix(auth): resolve login validation issue"
git commit -m "docs: update installation instructions"
```

## 🎯 Common Development Tasks

### Creating a New Component

```bash
cd apps/website/src/components
mkdir MyComponent
touch MyComponent/index.tsx
touch MyComponent/MyComponent.module.css
```

```typescript
// MyComponent/index.tsx
interface IMyComponentProps {
  title: string;
  onAction: () => void;
}

const MyComponent = ({ title, onAction }: IMyComponentProps): JSX.Element => {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onAction}>Click Me</button>
    </div>
  );
};

export default MyComponent;
```

### Creating a New Page

```bash
cd apps/website/src/pages
touch AboutPage.tsx
```

```typescript
// AboutPage.tsx
const AboutPage = (): JSX.Element => {
  return (
    <div>
      <h1>About BECC</h1>
      <p>Welcome to our about page</p>
    </div>
  );
};

export default AboutPage;
```

Then add route in `App.tsx`:

```typescript
import AboutPage from '@/pages/AboutPage';

// In routes
<Route path="/about" element={<AboutPage />} />
```

### Adding API Integration

```bash
# Create API utility
cd apps/website/src/utils
touch api.ts
```

```typescript
// api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json() as Promise<T>;
};
```

### Working Across Packages

If you need shared utilities:

```typescript
// In apps/website/src/SomePage.tsx
import { formatDate, APP_NAME } from '@becc/shared';

const displayDate = formatDate(new Date());
const appTitle = APP_NAME;
```

## 📦 Adding New Applications

To add a new app (e.g., School Management System):

```bash
# 1. Create app directory
mkdir -p apps/school-management

# 2. Copy structure from website
cp -r apps/website/* apps/school-management/

# 3. Update package.json
cd apps/school-management
# Edit package.json: change "name" to "@becc/school-management"

# 4. Update vite.config.ts port if needed
# Change server.port to 3001 to avoid conflicts

# 5. Install dependencies
cd ../..
pnpm install

# 6. Start the new app
pnpm --filter @becc/school-management dev
```

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool
- **pnpm** - Package manager
- **Turbo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit linting
- **React Router** - Routing

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

#### Dependencies Not Installing

```bash
rm -rf node_modules pnpm-lock.yaml apps/*/node_modules packages/*/node_modules
unset NODE_ENV
pnpm install
```

#### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000
# Or change port in vite.config.ts
```

#### Type Errors

```bash
# Rebuild TypeScript
pnpm type-check
# Check individual app
pnpm --filter @becc/website type-check
```

#### Git Hooks Not Working

```bash
# Reinstall husky
rm -rf .husky
pnpm add -D husky
pnpm exec husky install
# Recreate hooks as shown in SETUP.md
```

#### ESLint/Prettier Conflicts

```bash
# Format first, then lint
pnpm format
pnpm lint --fix
```

## 👥 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:

- Code style and conventions
- Commit message format
- Pull request process
- Development workflow

Quick contribution steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes following our coding standards
4. Commit using conventional commits (`git commit -m "feat(website): add amazing feature"`)
5. Push to your fork (`git push origin feat/amazing-feature`)
6. Open a Pull Request

## 📚 Additional Documentation

- [SETUP.md](SETUP.md) - Detailed setup and configuration guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guidelines and conventions
- [Turbo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [Django REST Framework](https://www.django-rest-framework.org/) (for backend)

## 🤝 Support

- 📧 Email: support@becc.com
- 🐛 Issues: [GitHub Issues](https://github.com/becc-academy/becc-website/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/becc-academy/becc-website/discussions)

## 📄 License

See [LICENSE](LICENSE) file for details.

---

**Happy Coding!** 🚀 Built with ❤️ by the BECC Team
