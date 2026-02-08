# Theme System - Complete Folder Structure

```
theme-system/                              # Root directory
│
├── src/                                   # Source code
│   ├── types.ts                          # Core type definitions
│   ├── parse-value.ts                    # Value parsing utilities
│   ├── resolve-node.ts                   # Theme reference resolution
│   ├── build-css-vars.ts                 # CSS variables generator
│   ├── build-tailwind-config.ts          # Tailwind config builder
│   ├── build-tailwind-css.ts             # CSS file writer
│   ├── build-tailwind-ts.ts              # TypeScript config writer
│   ├── demo-theme.ts                     # Example/demo theme
│   └── index.ts                          # Main barrel export
│
├── tests/                                 # Test suite
│   └── index.test.ts                     # Unit & integration tests
│
├── scripts/                               # Build & generation scripts
│   └── generate-theme.ts                 # Theme generation script
│
├── examples/                              # Framework integration examples
│   ├── nextjs/                           # Next.js example files
│   │   ├── lib-themes-brand.ts          # Theme definition example
│   │   ├── tailwind.config.ts           # Tailwind config example
│   │   ├── app-globals.css              # Global styles example
│   │   ├── app-layout.tsx               # Root layout example
│   │   ├── app-page.tsx                 # Page component example
│   │   └── lib-hooks-useTheme.ts        # Theme hook example
│   ├── vite/                             # Vite integration (TODO)
│   └── vue/                              # Vue 3 integration (TODO)
│
├── docs/                                  # Documentation
│   ├── API.md                            # API reference
│   ├── GUIDE.md                          # Usage guide (TODO)
│   └── INTEGRATION.md                    # Framework integration (TODO)
│
├── .github/                               # GitHub configuration
│   └── workflows/                        # CI/CD workflows (TODO)
│
├── dist/                                  # Compiled output (generated)
│   ├── index.js                          # Compiled JavaScript
│   ├── index.d.ts                        # Type definitions
│   ├── *.js                              # Compiled module files
│   └── *.d.ts                            # Type definitions
│
├── node_modules/                          # Dependencies (auto-generated)
│
├── .eslintrc.json                         # ESLint configuration
├── .gitignore                             # Git ignore rules
├── package.json                           # Project metadata & scripts
├── tsconfig.json                          # TypeScript configuration
├── vitest.config.ts                       # Vitest configuration
└── README.md                              # Project documentation


## Directory Details

### src/
Contains all source code for the theme system library.

**Files:**
- `types.ts` - Type definitions (Theme, TokenMap, ValueNode, etc.)
- `parse-value.ts` - Utility to parse value strings
- `resolve-node.ts` - Utility to resolve theme references
- `build-css-vars.ts` - CSS variable generation
- `build-tailwind-config.ts` - Tailwind config generation
- `build-tailwind-css.ts` - CSS file writer
- `build-tailwind-ts.ts` - TypeScript config writer
- `demo-theme.ts` - Example theme for reference
- `index.ts` - Main export file (barrel export)


### tests/
Contains test files for the library.

**Files:**
- `index.test.ts` - Unit and integration tests (20+ test cases)


### scripts/
Contains executable scripts for build and generation tasks.

**Files:**
- `generate-theme.ts` - Script to generate theme CSS and config files


### examples/nextjs/
Next.js integration examples showing how to use the theme system.

**Files:**
- `lib-themes-brand.ts` - Example theme definition
- `tailwind.config.ts` - Tailwind configuration using generated theme
- `app-globals.css` - Global CSS importing theme
- `app-layout.tsx` - Root layout with dark mode support
- `app-page.tsx` - Example page component
- `lib-hooks-useTheme.ts` - Hook for theme management

**Usage:**
Copy/adapt these files to your Next.js project:
```
your-nextjs-app/
├── lib/
│   ├── themes/brand.ts (from lib-themes-brand.ts)
│   ├── generated/tailwind-theme.ts (generated)
│   └── hooks/useTheme.ts (from lib-hooks-useTheme.ts)
├── app/
│   ├── globals.css (from app-globals.css)
│   ├── layout.tsx (from app-layout.tsx)
│   └── page.tsx (from app-page.tsx)
└── tailwind.config.ts (from tailwind.config.ts)
```


### docs/
Documentation files.

**Files:**
- `API.md` - Complete API reference with examples
- `GUIDE.md` - Usage guide and best practices (TODO)
- `INTEGRATION.md` - Framework-specific integration guides (TODO)


### Configuration Files

**package.json**
- Project metadata
- Dependencies (node-fetch, dev dependencies for testing)
- NPM scripts (build, test, generate:theme, lint, etc.)

**tsconfig.json**
- Strict TypeScript configuration
- ES2020 target
- Module path aliases
- Output directory: dist/

**vitest.config.ts**
- Test runner configuration
- Test glob pattern: tests/**/*.test.ts
- Coverage setup

**.eslintrc.json**
- TypeScript linting rules
- Recommended rules enabled
- Custom rules for unused vars, type safety

**.gitignore**
- Excludes node_modules, dist, build
- Excludes generated files (theme.css, tailwind-theme.ts)
- Excludes IDE and environment files

**README.md**
- Project overview
- Installation instructions
- Quick start guide
- API reference summary
- Framework integration links
- Best practices


## File Relationships

### Theme Generation Flow
```
src/types.ts (defines Theme interface)
    ↓
src/demo-theme.ts (example Theme)
    ↓
src/build-css-vars.ts (uses Theme → generates CSS)
    ├── uses: src/resolve-node.ts
    └── generates: CSS string
    ↓
src/build-tailwind-css.ts (writes CSS to file)


src/build-tailwind-config.ts (uses Theme → generates config object)
    ↓
src/build-tailwind-ts.ts (writes config to TypeScript file)
    ↓
examples/nextjs/tailwind.config.ts (imports generated config)
```

### Main Export Flow
```
src/index.ts (barrel export)
    ├── exports all types from src/types.ts
    ├── exports functions from src/parse-value.ts
    ├── exports functions from src/resolve-node.ts
    ├── exports functions from src/build-css-vars.ts
    ├── exports functions from src/build-tailwind-config.ts
    ├── exports functions from src/build-tailwind-css.ts
    ├── exports functions from src/build-tailwind-ts.ts
    └── exports demoTheme from src/demo-theme.ts
```


## Getting Started

### 1. Install Dependencies
```bash
cd theme-system
npm install
```

### 2. Build the Library
```bash
npm run build
```
Creates: `dist/` folder with compiled JavaScript and types

### 3. Run Tests
```bash
npm test
```

### 4. Generate Example Outputs
```bash
npm run generate:theme
```

### 5. Use in Another Project
```bash
npm install ./path/to/theme-system
# or for development
npm link
```

Then in your project:
```typescript
import { buildTailwindCss, buildTailwindTs } from '@myorg/theme-system';
```


## Development Workflow

### Making Changes
1. Edit files in `src/`
2. Run `npm run type-check` to verify types
3. Run `npm test` to ensure nothing breaks
4. Run `npm run lint` to check code style

### Adding Features
1. Add types to `src/types.ts`
2. Add implementation in appropriate file
3. Add tests to `tests/index.test.ts`
4. Export from `src/index.ts`
5. Document in `docs/API.md`

### Building for Distribution
```bash
npm run build      # Compile to dist/
npm run type-check # Verify types
npm test           # Run tests
npm run lint       # Check style
npm publish        # Publish to npm
```


## Generated Files (not in repo)

These files are generated and should be in `.gitignore`:

```
dist/                                    # Compiled output
node_modules/                            # Dependencies

# In Next.js example project:
styles/theme.css                        # Generated CSS
lib/generated/tailwind-theme.ts         # Generated TypeScript
```


## IDE Setup

### VS Code
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.enablePromptUseWorkspaceTypeScriptSdk": true
}
```

### Extensions
- TypeScript Vue Plugin
- ESLint
- Prettier
- Tailwind CSS IntelliSense


## Contributing

When contributing:
1. Follow the structure guidelines
2. Keep related functions together
3. Export from `index.ts`
4. Add tests for new functionality
5. Update documentation
6. Follow code style (run `npm run lint`)