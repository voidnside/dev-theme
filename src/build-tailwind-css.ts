import fs from 'fs';
import path from 'path';
import type { Theme } from './types';
import { buildCssVariables } from './build-css-variables';

/**
 * Generate and write theme CSS variables to a file
 * @param theme - Theme configuration
 * @param outputPath - Path where CSS file will be written (relative to cwd)
 */
export function buildTailwindCss(theme: Theme, outputPath: string): void {
  const fullPath = path.resolve(process.cwd(), outputPath);
  
  // Create directory if it doesn't exist
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const css = buildCssVariables(theme);
  fs.writeFileSync(fullPath, css, 'utf-8');
  
  console.log(`✅ Generated CSS variables at ${fullPath}`);
}

/**
 * Generate theme CSS variables without writing to file
 * @param theme - Theme configuration
 * @returns CSS string
 */
export function generateThemeCss(theme: Theme): string {
  return buildCssVariables(theme);
}