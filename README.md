# BECC Monorepo

A professional TypeScript React Vite monorepo for BECC's web applications including the main website, School Management System, and Learning Management System.

## 🏗️ Project Structure

```
becc-monorepo/
├── apps/
│   ├── website/                 # Main BECC website
│   ├── school-management/       # School Management System (coming soon)
│   └── learning-management/     # Learning Management System (coming soon)
├── packages/
│   ├── shared/                  # Shared utilities and types
│   ├── ui/                      # Shared UI components (coming soon)
│   └── config/                  # Shared configurations
└── ...config files
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
- ✅ **Import aliases** (@/*) configured
- ✅ **Import sorting** automatically enforced
- ✅ **Arrow functions** enforced via ESLint
- ✅ **camelCase** naming conventions
- ✅ **Strict TypeScript** configuration

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install pnpm globally if you haven't
npm install -g pnpm

# Install dependencies
pnpm install

# Setup Git hooks
pnpm prepare
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter @becc/website dev

# Build all apps
pnpm build

# Lint all code
pnpm lint

# Format all code
pnpm format

# Type check all code
pnpm type-check
```

## 📝 Coding Standards

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

## 🔧 Workspace Commands

### Website App

```bash
cd apps/website
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Lint code
pnpm type-check # Type check
```

### Shared Package

```bash
cd packages/shared
pnpm lint       # Lint code
pnpm type-check # Type check
```

## 📦 Adding New Apps

1. Create a new directory in `apps/`
2. Initialize with `package.json`
3. Configure TypeScript with `tsconfig.json`
4. Set up Vite config if needed
5. Add to workspace commands in root `package.json`

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

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the coding standards
4. Commit using conventional commits
5. Push and create a pull request

## 🤝 Support

For support, please open an issue in the repository.