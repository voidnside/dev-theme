# API Reference

Complete API documentation for the Theme System.

## Types

### `Theme<Palette>`

The main theme interface defining all design tokens.

```typescript
interface Theme<Palette extends Record<string, string> = Record<string, string>> {
  name: string;
  base: ThemeBaseTokens & { palette: Palette };
  light: ThemeModeTokens<Palette>;
  dark: ThemeModeTokens<Palette>;
}
```

**Example:**

```typescript
const theme: Theme = {
  name: 'my-theme',
  base: {
    palette: { primary: '#0070f3', white: '#fff' },
    spacing: { sm: '0.5rem', md: '1rem' },
    size: { small: '2rem', medium: '2.5rem' },
    zIndex: { modal: '1400', dropdown: '1000' },
    container: { sm: '40rem', md: '64rem' },
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

### `ThemeBaseTokens`

Base design tokens that apply to all modes.

```typescript
interface ThemeBaseTokens {
  palette: TokenMap<string>;      // Color definitions
  spacing: TokenMap<string>;      // Spacing scale
  size: TokenMap<string>;         // Component sizes
  zIndex: TokenMap<string>;       // Z-index layering
  container: TokenMap<string>;    // Container widths
}
```

### `ThemeModeTokens<Palette>`

Mode-specific tokens for light/dark theme variations.

```typescript
interface ThemeModeTokens<Palette extends Record<string, string>> {
  bg: TokenMap<`${keyof Palette & string} palette`>;
}
```

The `bg` property maps semantic token names to palette color references.

### `TokenMap<T>`

Generic map type for token collections.

```typescript
type TokenMap<T = string> = Record<string, T>;
```

### `ValueNode`

Parsed representation of a theme value.

```typescript
type ValueNode =
  | { kind: 'palette'; ref: string; value: number }
  | { kind: 'px' | 'rem' | 'em' | 'base' | 'innerGutter' | 'absolute'; value: number };
```

### `TailwindThemeConfig`

Tailwind CSS theme configuration shape.

```typescript
interface TailwindThemeConfig {
  colors: TokenMap<string>;
  spacing: TokenMap<string>;
  sizes: TokenMap<string>;
  zIndex: TokenMap<string>;
}
```

## Functions

### CSS Generation

#### `buildCssVars(theme: Theme): string`

Generate CSS variables from a theme definition.

**Returns:** CSS string with `:root`, `.dark`, and `@theme` blocks.

**Example:**

```typescript
import { buildCssVars } from '@myorg/theme-system';

const css = buildCssVars(myTheme);
console.log(css);
// :root {
//   --mode-background: var(--color-white);
// }
// ...
```

#### `buildTailwindCss(theme: Theme, outputPath: string): void`

Generate and write CSS variables to a file.

**Parameters:**
- `theme` - Theme configuration
- `outputPath` - Output path relative to cwd

**Example:**

```typescript
import { buildTailwindCss } from '@myorg/theme-system';

buildTailwindCss(myTheme, './styles/theme.css');
// Output: ✅ Generated CSS variables at /absolute/path/styles/theme.css
```

#### `generateThemeCss(theme: Theme): string`

Generate CSS without writing to file.

**Returns:** CSS string

**Example:**

```typescript
import { generateThemeCss } from '@myorg/theme-system';

const css = generateThemeCss(myTheme);
// Use css string directly
```

### Tailwind Configuration

#### `buildTailwindConfig(theme: Theme): TailwindThemeConfig`

Build Tailwind CSS theme configuration object.

**Returns:** Configuration object with colors, spacing, sizes, zIndex.

**Example:**

```typescript
import { buildTailwindConfig } from '@myorg/theme-system';

const config = buildTailwindConfig(myTheme);
// {
//   colors: { primary: 'var(--palette-primary)', ... },
//   spacing: { sm: 'var(--spacing-sm)', ... },
//   ...
// }
```

#### `buildTailwindTs(theme: Theme, outputPath: string): void`

Generate and write Tailwind config as TypeScript.

**Parameters:**
- `theme` - Theme configuration
- `outputPath` - Output path relative to cwd

**Example:**

```typescript
import { buildTailwindTs } from '@myorg/theme-system';

buildTailwindTs(myTheme, './lib/tailwind-theme.ts');
// Generates: export const themeTailwind = { ... }
```

#### `generateTailwindConfig(theme: Theme): TailwindThemeConfig`

Generate Tailwind config in memory.

**Returns:** Configuration object

**Example:**

```typescript
import { generateTailwindConfig } from '@myorg/theme-system';

const config = generateTailwindConfig(myTheme);
```

### Value Parsing

#### `parseValue(input: string): ValueNode`

Parse a value string into a ValueNode for resolution.

**Parameters:**
- `input` - Value string (e.g., "1 rem", "black palette")

**Returns:** Parsed ValueNode

**Supported Units:**
- Palette: `palette`
- Pixels: `px`, `pixel`, `pixels`
- Root em: `rem`, `root`
- Em: `em`, `parent`
- Base spacing: `base`, `spacing`
- Inner gutter: `innerGutter`, `inner gutter`
- Absolute: `abs`, `absolute`

**Example:**

```typescript
import { parseValue } from '@myorg/theme-system';

parseValue('black palette');
// { kind: 'palette', ref: 'black', value: 1 }

parseValue('1 rem');
// { kind: 'rem', value: 1 }

parseValue('16 px');
// { kind: 'px', value: 16 }
```

#### `resolveValueNode(node: ValueNode): string`

Resolve a parsed ValueNode to a CSS value.

**Parameters:**
- `node` - Parsed ValueNode

**Returns:** CSS value string

**Example:**

```typescript
import { resolveValueNode } from '@myorg/theme-system';

const node = parseValue('1.5 rem');
resolveValueNode(node);
// '1.5rem'
```

### Node Resolution

#### `resolveNode(theme: Theme, value: string): string`

Resolve a theme value reference to its actual value.

**Parameters:**
- `theme` - Theme configuration
- `value` - Value string that may contain palette references

**Returns:** Resolved value

**Throws:** Error if palette reference not found

**Example:**

```typescript
import { resolveNode } from '@myorg/theme-system';

resolveNode(theme, 'primary palette');
// '#0070f3'

resolveNode(theme, '1rem');
// '1rem'
```

#### `resolveCssValue(theme: Theme, value: string): string`

Resolve a value that might contain theme references.

**Parameters:**
- `theme` - Theme configuration
- `value` - Value string

**Returns:** Resolved value

**Example:**

```typescript
import { resolveCssValue } from '@myorg/theme-system';

resolveCssValue(theme, 'white palette');
// '#ffffff'

resolveCssValue(theme, 'var(--color-primary)');
// 'var(--color-primary)'
```

#### `validatePaletteReferences(theme: Theme, value: string, fieldName?: string): void`

Validate that palette references exist in the theme.

**Parameters:**
- `theme` - Theme configuration
- `value` - Value string to validate
- `fieldName` - Optional field name for error context

**Throws:** Error if palette reference not found

**Example:**

```typescript
import { validatePaletteReferences } from '@myorg/theme-system';

validatePaletteReferences(theme, 'primary palette');
// ✓ No error

validatePaletteReferences(theme, 'missing palette', 'light.bg.background');
// ✗ Error: Invalid palette reference "missing" in light.bg.background
```

## Exported Items

### Types
- `Theme`
- `ThemeBaseTokens`
- `ThemeModeTokens`
- `TokenMap`
- `ValueNode`
- `TailwindThemeConfig`

### Functions
- `parseValue`
- `resolveValueNode`
- `resolveNode`
- `resolveCssValue`
- `validatePaletteReferences`
- `buildCssVars`
- `buildTailwindConfig`
- `buildTailwindCss`
- `generateThemeCss`
- `buildTailwindTs`
- `generateTailwindConfig`

### Constants
- `demoTheme` - Example theme configuration