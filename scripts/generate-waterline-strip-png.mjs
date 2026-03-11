#!/usr/bin/env node
/**
 * Exports waterline-strip SVG(s) to PNG for email use.
 * Outputs:
 *   - assets/backgrounds/waterline-strip.png (1024×56)
 *   - assets/backgrounds/waterline-strip-wide.png (3072×56)
 * Uses Sharp first; falls back to Puppeteer if Sharp fails (e.g. missing SVG support).
 * Run: pnpm run generate:waterline-strip-png
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const backgroundsDir = join(projectRoot, 'assets', 'backgrounds');

const STRIP = {
  svg: join(backgroundsDir, 'waterline-strip.svg'),
  png: join(backgroundsDir, 'waterline-strip.png'),
  width: 1024,
  height: 56,
};
const WIDE = {
  svg: join(backgroundsDir, 'waterline-strip-wide.svg'),
  png: join(backgroundsDir, 'waterline-strip-wide.png'),
  width: 3072,
  height: 56,
};

async function exportWithSharp(svgPath, pngPath, width, height) {
  const svgBuffer = readFileSync(svgPath);
  await sharp(svgBuffer)
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(pngPath);
}

async function exportWithPuppeteer(svgPath, pngPath, width, height) {
  const fileUrl = 'file://' + svgPath.replace(/\\/g, '/');
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 5000 });
    const clip = await page.evaluate((w, h) => {
      return { x: 0, y: 0, width: w, height: h };
    }, width, height);
    await page.screenshot({ path: pngPath, type: 'png', clip });
  } finally {
    await browser.close();
  }
}

async function exportSvgToPng(svgPath, pngPath, width, height) {
  if (!existsSync(svgPath)) {
    throw new Error(`SVG not found: ${svgPath}`);
  }
  try {
    await exportWithSharp(svgPath, pngPath, width, height);
  } catch (err) {
    console.warn(`Sharp failed (${err.message}), using Puppeteer...`);
    await exportWithPuppeteer(svgPath, pngPath, width, height);
  }
}

async function main() {
  await exportSvgToPng(STRIP.svg, STRIP.png, STRIP.width, STRIP.height);
  console.log(`Written: assets/backgrounds/waterline-strip.png (${STRIP.width}×${STRIP.height})`);

  await exportSvgToPng(WIDE.svg, WIDE.png, WIDE.width, WIDE.height);
  console.log(`Written: assets/backgrounds/waterline-strip-wide.png (${WIDE.width}×${WIDE.height})`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
