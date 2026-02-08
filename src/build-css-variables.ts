import type { Theme } from './types';
import { resolveCssValue, validatePaletteReferences } from './resolve-node';

/**
 * Generate CSS variables from a theme definition
 * Creates @theme block with all design tokens and light/dark mode support
 */
export function buildCssVariables(theme: Theme): string {
  // Validate all palette references
  validateThemePaletteReferences(theme);

  // Light mode CSS variables
  const lightCss = Object.entries(theme.light.bg)
    .map(([k, v]) => {
      const colorRef = v.split(/\s+/)[0];
      return `  --mode-${k}: var(--color-${colorRef});`;
    })
    .join('\n');

  // Dark mode CSS variables
  const darkCss = Object.entries(theme.dark.bg)
    .map(([k, v]) => {
      const colorRef = v.split(/\s+/)[0];
      return `  --mode-${k}: var(--color-${colorRef});`;
    })
    .join('\n');

  // All theme variables
  const themeVars: string[] = [];

  // Palette colors
  for (const [k, v] of Object.entries(theme.base.palette)) {
    themeVars.push(`  --color-${k}: ${v};`);
  }

  // Semantic color aliases
  for (const semantic of Object.keys(theme.light.bg)) {
    themeVars.push(`  --color-${semantic}: var(--mode-${semantic});`);
  }

  // Spacing
  for (const [k, v] of Object.entries(theme.base.spacing)) {
    themeVars.push(`  --space-${k}: ${resolveCssValue(theme, v)};`);
  }

  // Sizes
  for (const [k, v] of Object.entries(theme.base.size)) {
    themeVars.push(`  --size-${k}: ${resolveCssValue(theme, v)};`);
  }

  // Z-index
  for (const [k, v] of Object.entries(theme.base.zIndex)) {
    themeVars.push(`  --z-${k}: ${resolveCssValue(theme, v)};`);
  }

  // Containers
  for (const [k, v] of Object.entries(theme.base.container)) {
    themeVars.push(`  --container-${k}: ${resolveCssValue(theme, v)};`);
  }

  return `
:root {
${lightCss}
}

.dark {
${darkCss}
}

@theme {
${themeVars.join('\n')}
}
  `.trim();
}

/**
 * Validate all palette references in theme
 */
function validateThemePaletteReferences(theme: Theme): void {
  // Check light mode
  for (const [field, value] of Object.entries(theme.light.bg)) {
    validatePaletteReferences(theme, value, `light.bg.${field}`);
  }

  // Check dark mode
  for (const [field, value] of Object.entries(theme.dark.bg)) {
    validatePaletteReferences(theme, value, `dark.bg.${field}`);
  }

  // Check other token categories
  for (const [field, value] of Object.entries(theme.base.spacing)) {
    validatePaletteReferences(theme, value, `base.spacing.${field}`);
  }

  for (const [field, value] of Object.entries(theme.base.size)) {
    validatePaletteReferences(theme, value, `base.size.${field}`);
  }
}