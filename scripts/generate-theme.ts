#!/usr/bin/env node

import { buildTailwindCss, buildTailwindTs, demoTheme } from '../src/index';

/**
 * Theme generation script
 * Run with: npm run generate:theme
 * Or directly: npx tsx scripts/generate-theme.ts
 */

async function generateTheme() {
  try {
    console.log('🎨 Generating theme files...\n');

    // Generate CSS variables file
    buildTailwindCss(demoTheme, './styles/theme.css');

    // Generate TypeScript config for Tailwind
    buildTailwindTs(demoTheme, './lib/generated/tailwind-theme.ts');

    console.log('\n✨ Theme generation completed successfully!');
  } catch (error) {
    console.error('❌ Theme generation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateTheme();
}

export { generateTheme };