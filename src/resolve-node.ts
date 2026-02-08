import type { Theme } from './types';

/**
 * Resolve a theme value reference to its actual value
 * Handles references like "black palette" by looking up in theme.base.palette
 * @example
 * resolveNode(theme, "black palette") // "#000"
 * resolveNode(theme, "1rem") // "1rem"
 */
export function resolveNode(theme: Theme, value: string): string {
  // Check if it's a palette reference: "colorName palette"
  if (value.includes('palette')) {
    const ref = value.split(/\s+/)[0];
    
    if (!theme.base.palette[ref]) {
      throw new Error(`Palette color "${ref}" not found in theme`);
    }
    
    return theme.base.palette[ref];
  }
  
  // Return as-is if not a reference
  return value;
}

/**
 * Resolve a value that might contain theme references
 * @example
 * resolveCssValue(theme, "black palette") // "#000"
 * resolveCssValue(theme, "var(--color-primary)") // "var(--color-primary)"
 */
export function resolveCssValue(theme: Theme, value: string): string {
  if (value.includes('palette')) {
    return resolveNode(theme, value);
  }
  return value;
}

/**
 * Validate that all palette references in a value exist in the theme
 */
export function validatePaletteReferences(
  theme: Theme,
  value: string,
  fieldName?: string
): void {
  if (value.includes('palette')) {
    const ref = value.split(/\s+/)[0];
    
    if (!theme.base.palette[ref]) {
      const context = fieldName ? ` in ${fieldName}` : '';
      throw new Error(
        `Invalid palette reference "${ref}"${context}. Available colors: ${Object.keys(
          theme.base.palette
        ).join(', ')}`
      );
    }
  }
}