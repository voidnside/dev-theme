import fs from 'fs';
import path from 'path';
import type { Theme } from './types';
import { buildTailwindConfig } from './build-tailwind-config';

/**
 * Generate and write Tailwind theme config as TypeScript
 * Creates a const export that can be used in tailwind.config.ts
 */
export function buildTailwindTs(theme: Theme, outputPath: string): void {
  const fullPath = path.resolve(process.cwd(), outputPath);
  
  // Create directory if it doesn't exist
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const config = buildTailwindConfig(theme);

  const content = `// Auto-generated from theme tokens
// Do not edit manually

export const themeTailwind = ${JSON.stringify(config, null, 2)} as const;
`;

  fs.writeFileSync(fullPath, content, 'utf-8');
  
  console.log(`✅ Generated Tailwind config at ${fullPath}`);
}

/**
 * Generate Tailwind config object without writing to file
 */
export function generateTailwindConfig(theme: Theme) {
  return buildTailwindConfig(theme);
}