import type { Theme, TailwindThemeConfig } from './types';

/**
 * Build Tailwind CSS theme configuration from theme tokens
 * Converts theme tokens to CSS custom property references
 */
export function buildTailwindConfig(theme: Theme): TailwindThemeConfig {
  const colors: Record<string, string> = {};
  const spacing: Record<string, string> = {};
  const sizes: Record<string, string> = {};
  const zIndex: Record<string, string> = {};

  // Process all base token categories
  Object.entries(theme.base).forEach(([category, tokens]) => {
    if (typeof tokens !== 'object' || tokens === null) return;

    Object.entries(tokens).forEach(([key]) => {
      const varName = `var(--${category}-${key})`;

      switch (category) {
        case 'palette':
          colors[key] = varName;
          break;
        case 'spacing':
          spacing[key] = varName;
          break;
        case 'size':
          sizes[key] = varName;
          break;
        case 'zIndex':
          zIndex[key] = varName;
          break;
        case 'container':
          sizes[`container-${key}`] = varName;
          break;
        default:
          break;
      }
    });
  });

  return { colors, spacing, sizes, zIndex };
}