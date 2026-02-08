import { describe, it, expect, beforeEach } from 'vitest';
import type { Theme } from '../src/types';
import {
    buildCssVariables,
    buildTailwindConfig,
    parseValue,
    resolveNode,
    validatePaletteReferences,
} from '../src';

describe('Theme System', () => {
    let testTheme: Theme;

    beforeEach(() => {
        testTheme = {
            name: 'test-theme',
            base: {
                palette: {
                    primary: '#0070f3',
                    white: '#ffffff',
                    black: '#000000',
                    gray: '#888888',
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
    });

    describe('parseValue', () => {
        it('should parse palette references', () => {
            const result = parseValue('black palette');
            expect(result).toEqual({ kind: 'palette', ref: 'black', value: 1 });
        });

        it('should parse rem units', () => {
            const result = parseValue('1 rem');
            expect(result).toEqual({ kind: 'rem', value: 1 });
        });

        it('should parse px units', () => {
            const result = parseValue('16 px');
            expect(result).toEqual({ kind: 'px', value: 16 });
        });

        it('should parse em units', () => {
            const result = parseValue('1.5 em');
            expect(result).toEqual({ kind: 'em', value: 1.5 });
        });

        it('should throw on invalid unit', () => {
            expect(() => parseValue('1 xyz')).toThrow();
        });

        it('should throw on non-numeric value', () => {
            expect(() => parseValue('abc px')).toThrow();
        });
    });

    describe('resolveNode', () => {
        it('should resolve palette references', () => {
            const result = resolveNode(testTheme, 'primary palette');
            expect(result).toBe('#0070f3');
        });

        it('should return non-reference values as-is', () => {
            const result = resolveNode(testTheme, '1rem');
            expect(result).toBe('1rem');
        });

        it('should throw on invalid palette reference', () => {
            expect(() => resolveNode(testTheme, 'nonexistent palette')).toThrow();
        });
    });

    describe('validatePaletteReferences', () => {
        it('should validate existing palette references', () => {
            expect(() => {
                validatePaletteReferences(testTheme, 'primary palette');
            }).not.toThrow();
        });

        it('should throw on invalid palette references', () => {
            expect(() => {
                validatePaletteReferences(testTheme, 'nonexistent palette');
            }).toThrow();
        });

        it('should not throw on non-palette values', () => {
            expect(() => {
                validatePaletteReferences(testTheme, '1rem');
            }).not.toThrow();
        });

        it('should include field name in error message', () => {
            expect(() => {
                validatePaletteReferences(testTheme, 'missing palette', 'light.bg.custom');
            }).toThrow('light.bg.custom');
        });
    });

    describe('buildTailwindConfig', () => {
        it('should generate tailwind config from theme', () => {
            const config = buildTailwindConfig(testTheme);

            expect(config.colors).toBeDefined();
            expect(config.spacing).toBeDefined();
            expect(config.sizes).toBeDefined();
            expect(config.zIndex).toBeDefined();
        });

        it('should include palette colors in config', () => {
            const config = buildTailwindConfig(testTheme);

            expect(config.colors.primary).toBe('var(--palette-primary)');
            expect(config.colors.white).toBe('var(--palette-white)');
            expect(config.colors.black).toBe('var(--palette-black)');
        });

        it('should include spacing values in config', () => {
            const config = buildTailwindConfig(testTheme);

            expect(config.spacing.sm).toBe('var(--spacing-sm)');
            expect(config.spacing.md).toBe('var(--spacing-md)');
            expect(config.spacing.lg).toBe('var(--spacing-lg)');
        });

        it('should include sizes in config', () => {
            const config = buildTailwindConfig(testTheme);

            expect(config.sizes.small).toBe('var(--size-small)');
            expect(config.sizes.medium).toBe('var(--size-medium)');
            expect(config.sizes['container-sm']).toBe('var(--container-sm)');
        });

        it('should include z-index values in config', () => {
            const config = buildTailwindConfig(testTheme);

            expect(config.zIndex.dropdown).toBe('var(--zIndex-dropdown)');
            expect(config.zIndex.modal).toBe('var(--zIndex-modal)');
        });
    });

    describe('buildCssVars', () => {
        it('should generate CSS variables from theme', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain(':root {');
            expect(css).toContain('.dark {');
            expect(css).toContain('@theme {');
        });

        it('should include palette colors in CSS', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain('--color-primary: #0070f3;');
            expect(css).toContain('--color-white: #ffffff;');
            expect(css).toContain('--color-black: #000000;');
        });

        it('should include spacing in CSS', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain('--space-sm: 0.5rem;');
            expect(css).toContain('--space-md: 1rem;');
            expect(css).toContain('--space-lg: 2rem;');
        });

        it('should include sizes in CSS', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain('--size-small: 2rem;');
            expect(css).toContain('--size-medium: 2.5rem;');
            expect(css).toContain('--size-large: 3rem;');
        });

        it('should include z-index in CSS', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain('--z-dropdown: 1000;');
            expect(css).toContain('--z-modal: 1400;');
        });

        it('should include containers in CSS', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain('--container-sm: 40rem;');
            expect(css).toContain('--container-md: 64rem;');
            expect(css).toContain('--container-lg: 80rem;');
        });

        it('should set light mode variables in :root', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain(':root {');
            expect(css).toContain('--mode-background: var(--color-white);');
            expect(css).toContain('--mode-text: var(--color-black);');
        });

        it('should set dark mode variables in .dark', () => {
            const css = buildCssVariables(testTheme);

            expect(css).toContain('.dark {');
            expect(css).toContain('--mode-background: var(--color-black);');
            expect(css).toContain('--mode-text: var(--color-white);');
        });

        it('should throw on invalid palette references', () => {
            // Use type assertion to bypass strict type checking for this test
            const invalidTheme = {
                ...testTheme,
                light: {
                    bg: {
                        background: 'nonexistent palette',
                        text: 'black palette',
                        primary: 'primary palette',
                    },
                },
            } as Theme;

            expect(() => buildCssVariables(invalidTheme)).toThrow();
        });
    });

    describe('theme validation', () => {
        it('should reject themes with missing palette references in light mode', () => {
            const invalidTheme = {
                ...testTheme,
                light: {
                    bg: {
                        background: 'missing palette',
                        text: 'black palette',
                        primary: 'primary palette',
                    },
                },
            } as Theme;

            expect(() => buildCssVariables(invalidTheme)).toThrow();
        });

        it('should reject themes with missing palette references in dark mode', () => {
            const invalidTheme = {
                ...testTheme,
                dark: {
                    bg: {
                        background: 'missing palette',
                        text: 'white palette',
                        primary: 'primary palette',
                    },
                },
            } as Theme;

            expect(() => buildCssVariables(invalidTheme)).toThrow();
        });

        it('should accept valid themes', () => {
            expect(() => buildCssVariables(testTheme)).not.toThrow();
            expect(() => buildTailwindConfig(testTheme)).not.toThrow();
        });
    });
});