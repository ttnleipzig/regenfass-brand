#!/usr/bin/env node
/**
 * Exports assets/backgrounds/waterline-strip.svg to PNG for email use.
 * Output: assets/backgrounds/waterline-strip.png (1024×56, transparent background).
 * Run: pnpm run generate:waterline-strip-png
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const svgPath = join(projectRoot, 'assets', 'backgrounds', 'waterline-strip.svg');
const outPath = join(projectRoot, 'assets', 'backgrounds', 'waterline-strip.png');

const WIDTH = 1024;
const HEIGHT = 56;

async function main() {
  if (!existsSync(svgPath)) {
    throw new Error(`SVG not found: ${svgPath}`);
  }
  const svgBuffer = readFileSync(svgPath);
  await sharp(svgBuffer)
    .resize(WIDTH, HEIGHT, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log(`Written: assets/backgrounds/waterline-strip.png (${WIDTH}×${HEIGHT})`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
