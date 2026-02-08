/**
 * Generic list type for theme tokens
 */
export type TokenMap<T = string> = Record<string, T>;

/**
 * Base tokens that define the core design system
 */
export interface ThemeBaseTokens {
    palette: TokenMap<string>;
    spacing: TokenMap<string>;
    size: TokenMap<string>;
    zIndex: TokenMap<string>;
    container: TokenMap<string>;
}

/**
 * Mode-specific tokens for light/dark mode
 */
export interface ThemeModeTokens<Palette extends Record<string, string> = Record<string, string>> {
    bg: TokenMap<`${keyof Palette & string} palette`>;
}

/**
 * Complete theme definition
 */
export interface Theme<Palette extends Record<string, string> = Record<string, string>> {
    name: string;
    base: ThemeBaseTokens & { palette: Palette };
    light: ThemeModeTokens<Palette>;
    dark: ThemeModeTokens<Palette>;
}

/**
 * Parsed value node for resolving theme references
 */
export type ValueNode =
    | { kind: 'palette'; ref: string; value: number }
    | { kind: 'px' | 'rem' | 'em' | 'base' | 'innerGutter' | 'absolute'; value: number };

/**
 * Tailwind config shape
 */
export interface TailwindThemeConfig {
    colors: TokenMap<string>;
    spacing: TokenMap<string>;
    sizes: TokenMap<string>;
    zIndex: TokenMap<string>;
}