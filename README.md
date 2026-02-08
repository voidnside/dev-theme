# Theme System

A comprehensive design token management system for generating CSS variables and Tailwind CSS configurations from a single source of truth.

## ✨ Features

- **Type-safe** - Full TypeScript support with strict type checking
- **Single source of truth** - Define your design system once
- **CSS Variables** - Auto-generate CSS custom properties
- **Tailwind integration** - Generate Tailwind config from tokens
- **Light/Dark mode** - Built-in theme mode support
- **Error handling** - Validation for palette references and values
- **Framework agnostic** - Works with Next.js, Vue, Vite, and more

## 📦 Installation

```bash
npm install @myorg/theme-system
# or
yarn add @myorg/theme-system
```

## 🚀 Quick Start

### 1. Define Your Theme

```typescript
import type { Theme } from '@myorg/theme-system';

export const myTheme: Theme = {
  name: 'my-theme',
  base: {
    palette: {
      primary: '#0070f3',
      white: '#ffffff',
      black: '#000000',
    },
    spacing: {
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
    },
    size: {
      small: '2rem',
      medium: '2.5rem',
      large: '3rem',
    },
    zIndex: {
      dropdown: '1000',
      modal: '1400',
    },
    container: {
      sm: '40rem',
      md: '64rem',
      lg: '80rem',
    },
  },
  light: {
    bg: {
      background: 'white palette',
      text: 'black palette',
      primary: 'primary palette',
    },
  },
  dark: {
    bg: {
      background: 'black palette',
      text: 'white palette',
      primary: 'primary palette',
    },
  },
};
```

### 2. Generate Outputs

```typescript
import { buildTailwindCss, buildTailwindTs } from '@myorg/theme-system';
import { myTheme } from './my-theme';

// Generate CSS variables file
buildTailwindCss(myTheme, './styles/theme.css');

// Generate TypeScript Tailwind config
buildTailwindTs(myTheme, './lib/tailwind-theme.ts');
```

### 3. Use in Your Project

```typescript
import { themeTailwind } from './lib/tailwind-theme';

// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: themeTailwind.colors,
      spacing: themeTailwind.spacing,
      sizes: themeTailwind.sizes,
      zIndex: themeTailwind.zIndex,
    },
  },
};
```

## 📁 Project Structure

```
theme-system/
├── src/                           # Source code
│   ├── types.ts                   # Type definitions
│   ├── parse-value.ts            # Value parsing utilities
│   ├── resolve-node.ts           # Node resolution
│   ├── build-css-vars.ts         # CSS generation
│   ├── build-tailwind-config.ts  # Tailwind config builder
│   ├── build-tailwind-css.ts     # CSS file writer
│   ├── build-tailwind-ts.ts      # TS config writer
│   ├── demo-theme.ts             # Example theme
│   └── index.ts                  # Barrel exports
│
├── tests/                         # Test suite
│   └── index.test.ts             # Integration tests
│
├── scripts/                       # Build and generation scripts
│   └── generate-theme.ts         # Theme generation script
│
├── examples/                      # Framework examples
│   ├── nextjs/                   # Next.js integration
│   │   ├── lib-themes-brand.ts
│   │   ├── tailwind.config.ts
│   │   ├── app-globals.css
│   │   ├── app-layout.tsx
│   │   ├── app-page.tsx
│   │   └── lib-hooks-useTheme.ts
│   ├── vite/                     # Vite integration
│   └── vue/                      # Vue 3 integration
│
├── docs/                         # Documentation
│   ├── API.md                    # API reference
│   ├── GUIDE.md                  # Usage guide
│   └── INTEGRATION.md            # Framework integration
│
├── .github/                      # GitHub configuration
│   └── workflows/                # CI/CD workflows
│
├── package.json                  # Project metadata
├── tsconfig.json                 # TypeScript config
├── vitest.config.ts             # Test configuration
├── .eslintrc.json               # Linting rules
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## 🔧 API Reference

### Types

#### `Theme<Palette>`

The main theme interface defining all design tokens.

```typescript
interface Theme {
  name: string;
  base: ThemeBaseTokens & { palette: Palette };
  light: ThemeModeTokens<Palette>;
  dark: ThemeModeTokens<Palette>;
}
```

### Functions

#### CSS Generation

```typescript
// Generate CSS variables from theme
buildCssVars(theme: Theme): string

// Generate and write CSS to file
buildTailwindCss(theme: Theme, outputPath: string): void

// Generate CSS in memory
generateThemeCss(theme: Theme): string
```

#### Tailwind Configuration

```typescript
// Build Tailwind config object
buildTailwindConfig(theme: Theme): TailwindThemeConfig

// Generate and write config to file
buildTailwindTs(theme: Theme, outputPath: string): void

// Generate config in memory
generateTailwindConfig(theme: Theme): TailwindThemeConfig
```

#### Value Parsing

```typescript
// Parse value string
parseValue(input: string): ValueNode

// Resolve parsed value
resolveValueNode(node: ValueNode): string

// Resolve theme value
resolveNode(theme: Theme, value: string): string

// Validate palette references
validatePaletteReferences(theme: Theme, value: string, fieldName?: string): void
```

## 🎨 Generated CSS Example

```css
:root {
  --mode-background: var(--color-white);
  --mode-text: var(--color-black);
}

.dark {
  --mode-background: var(--color-black);
  --mode-text: var(--color-white);
}

@theme {
  --color-primary: #0070f3;
  --color-white: #ffffff;
  --color-black: #000000;
  
  --color-background: var(--mode-background);
  --color-text: var(--mode-text);
  
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  
  --size-small: 2rem;
  --size-medium: 2.5rem;
  --size-large: 3rem;
  
  --z-dropdown: 1000;
  --z-modal: 1400;
  
  --container-sm: 40rem;
  --container-md: 64rem;
  --container-lg: 80rem;
}
```

## 🚀 Framework Integration

### Next.js

See `examples/nextjs/` for a complete Next.js integration example.

Quick setup:

```bash
# 1. Generate theme files
npm run generate:theme

# 2. Import generated CSS in globals.css
@import './theme.css';

# 3. Use in tailwind.config.ts
import { themeTailwind } from './lib/generated/tailwind-theme';
```

### Vite

See `examples/vite/` for Vite integration.

### Vue 3

See `examples/vue/` for Vue integration.

## 📝 Value Formats

### Palette References

```typescript
base: {
  palette: { primary: '#0070f3', white: '#ffffff' },
  // ...
},
light: {
  bg: {
    background: 'white palette',    // Resolves to '#ffffff'
    text: 'primary palette',        // Resolves to '#0070f3'
  },
}
```

### Spacing Units

```typescript
spacing: {
  sm: '0.5 rem',        // CSS rem units
  md: '8 px',           // CSS pixels
  lg: '1 em',           // CSS em units
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 🔍 Linting & Type Checking

```bash
# Type check
npm run type-check

# Lint
npm run lint
```

## 📚 Best Practices

1. **Use semantic token names** - `primary`, `background`, `text` instead of `color1`, `color2`
2. **Keep palette simple** - Palette contains primitives, light/dark modes handle semantics
3. **Group related tokens** - Organize by category (spacing, size, etc.)
4. **Validate early** - Run generation during build to catch issues
5. **Generate on build** - Add to your build process to keep outputs in sync
6. **Version control** - Commit theme definitions, gitignore generated files
7. **Use type safety** - Leverage TypeScript for theme definitions

## 🐛 Troubleshooting

### Error: Palette color "X" not found

Check:
- Spelling of the color name
- Color exists in `base.palette`
- Color is referenced in light/dark mode `bg` values

### Generated files are empty

Verify:
- Theme object is properly defined
- All required fields present in `ThemeBaseTokens`
- Light and dark mode tokens specified

### Tailwind classes not working

Check:
- Generated CSS imported before Tailwind
- Tailwind config extends with generated theme config
- CSS file in correct location

## 📖 Documentation

- [API Reference](./docs/API.md)
- [Usage Guide](./docs/GUIDE.md)
- [Framework Integration](./docs/INTEGRATION.md)

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 👤 Author

Your Name

## 🙏 Acknowledgments

Built with TypeScript, Tailwind CSS, and best practices from the design systems community.