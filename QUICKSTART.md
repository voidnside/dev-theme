# Quick Start Guide

Get up and running with the Theme System in 5 minutes.

## Installation

```bash
npm install @myorg/theme-system
```

## 1️⃣ Create Your Theme (5 min)

Create `lib/themes/brand.ts`:

```typescript
import type { Theme } from '@myorg/theme-system';

export const brandTheme: Theme = {
  name: 'brand',
  base: {
    palette: {
      primary: '#0070f3',
      success: '#17c950',
      error: '#f81ce5',
      white: '#ffffff',
      black: '#000000',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
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

## 2️⃣ Generate Files (1 min)

Create `scripts/generate-theme.ts`:

```typescript
#!/usr/bin/env node
import { buildTailwindCss, buildTailwindTs } from '@myorg/theme-system';
import { brandTheme } from '../lib/themes/brand';

buildTailwindCss(brandTheme, './styles/theme.css');
buildTailwindTs(brandTheme, './lib/generated/tailwind-theme.ts');

console.log('✅ Theme generated!');
```

Run it:

```bash
npx tsx scripts/generate-theme.ts
```

This creates:
- `styles/theme.css` - CSS variables
- `lib/generated/tailwind-theme.ts` - Tailwind config

## 3️⃣ Update Tailwind Config (1 min)

Edit `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import { themeTailwind } from './lib/generated/tailwind-theme';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: themeTailwind.colors,
      spacing: themeTailwind.spacing,
      sizes: themeTailwind.sizes,
      zIndex: themeTailwind.zIndex,
    },
  },
};

export default config;
```

## 4️⃣ Import Theme CSS (1 min)

Edit `app/globals.css`:

```css
@import './theme.css';

body {
  background-color: var(--color-background);
  color: var(--color-text);
  transition: background-color 0.3s ease;
}

.dark {
  background-color: var(--color-background);
  color: var(--color-text);
}
```

## 5️⃣ Use in Components (1 min)

In your React/Next.js components:

```tsx
// Using Tailwind classes
<div className="bg-background text-text">
  <h1 className="text-primary font-bold">Hello</h1>
  <button className="bg-primary text-white px-spacing-md py-spacing-sm">
    Click me
  </button>
</div>

// Using CSS variables
<div style={{
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text)',
  padding: 'var(--space-md)',
}}>
  CSS Variables
</div>
```

## 🎯 Done!

You now have:
- ✅ Type-safe theme definition
- ✅ Generated CSS variables
- ✅ Tailwind CSS integration
- ✅ Light/dark mode support
- ✅ Responsive spacing tokens

## 📦 Update package.json

Add this script:

```json
{
  "scripts": {
    "dev": "npm run generate:theme && next dev",
    "build": "npm run generate:theme && next build",
    "generate:theme": "tsx scripts/generate-theme.ts"
  }
}
```

Now run:

```bash
npm run dev
# Generates theme before starting dev server
```

## 🎨 Common Customizations

### Add More Colors

```typescript
palette: {
  primary: '#0070f3',
  secondary: '#7928ca',
  neutral: '#888888',
  // Add more...
},
```

### Add Typography Tokens

```typescript
// Extend ThemeBaseTokens by adding to base:
size: {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
},
```

### Add Custom Token Categories

```typescript
// Extend theme with custom tokens:
const theme: Theme & { opacity?: Record<string, string> } = {
  // ... existing theme
  opacity: {
    10: '0.1',
    20: '0.2',
    50: '0.5',
  },
};
```

## 🧪 Testing Your Theme

Generate and check the CSS:

```typescript
import { generateThemeCss } from '@myorg/theme-system';
import { brandTheme } from './lib/themes/brand';

const css = generateThemeCss(brandTheme);
console.log(css);
// See the generated CSS output
```

## 🚀 Next Steps

1. **Customize your theme** - Add more colors, spacing, etc.
2. **Create theme components** - Use CSS variables in components
3. **Enable dark mode** - Implement theme toggle
4. **Share your theme** - Package and distribute

See the complete [examples/nextjs](./examples/nextjs/) for a full working project.

## 📚 Learn More

- [API Reference](./docs/API.md)
- [Folder Structure](./FOLDER_STRUCTURE.md)
- [Next.js Example](./examples/nextjs/)

## ❓ Common Issues

### "Module not found" error

Make sure you ran:
```bash
npm install @myorg/theme-system
```

### CSS not loading

Check that you're importing the generated CSS:
```css
@import './theme.css';
```

### Tailwind classes not working

Verify `tailwind.config.ts` extends with `themeTailwind`:
```typescript
colors: themeTailwind.colors,
spacing: themeTailwind.spacing,
```

## 💡 Tips

- **Rebuild on changes** - Add generation to your dev server startup
- **Version control** - Gitignore generated files, commit theme definitions
- **Team sharing** - Package theme as npm module for team use
- **Type safety** - Leverage TypeScript for theme definitions

## 🎉 You're ready!

Start building beautiful, themeable applications with type-safe design tokens.