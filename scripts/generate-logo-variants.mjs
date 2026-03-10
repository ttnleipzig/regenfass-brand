#!/usr/bin/env node
/**
 * Logo Variants Generator
 * Generates all logo variants from a single source PNG (assets/logos/solo/regenfass-logo.png).
 * Output: solo (PNG sizes + SVG with embedded image, card-solid), horizontal (SVG + PNGs).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const SOURCE_PNG = join(projectRoot, 'assets', 'logos', 'solo', 'regenfass-logo.png');
const SOLO_DIR = join(projectRoot, 'assets', 'logos', 'solo');
const HORIZONTAL_DIR = join(projectRoot, 'assets', 'logos', 'horizontal');

const NAVY = '#0B2649';
const NAVY_THEME = '#1E2A45';
const WHITE = '#FFFFFF';

const SOLO_SIZES = [
  { name: 'regenfass-solo-light.png', width: null, height: null },
  { name: 'regenfass-solo-light-192.png', width: 192, height: 192 },
  { name: 'regenfass-solo-light-512.png', width: 512, height: 512 },
  { name: 'regenfass-solo-light-100.png', width: 100, height: 100 },
  { name: 'regenfass-solo-light-hr.png', width: null, height: null },
];

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

/**
 * Generate solo PNG variants from source
 */
async function generateSoloPngs(sourceBuffer) {
  ensureDir(SOLO_DIR);
  const image = sharp(sourceBuffer);
  const meta = await image.metadata();
  const w = meta.width || 512;
  const h = meta.height || 512;

  for (const spec of SOLO_SIZES) {
    const outPath = join(SOLO_DIR, spec.name);
    if (spec.width == null) {
      if (spec.name === 'regenfass-solo-light.png') {
        copyFileSync(SOURCE_PNG, outPath);
      } else {
        await sharp(sourceBuffer).png().toFile(outPath);
      }
      console.log(`  ${spec.name} (original size)`);
    } else {
      await sharp(sourceBuffer)
        .resize(spec.width, spec.height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outPath);
      console.log(`  ${spec.name} (${spec.width}×${spec.height})`);
    }
  }
}

/**
 * SVG that embeds the PNG (for regenfass-solo-light.svg)
 */
async function generateSoloLightSvg(sourceBuffer) {
  const meta = await sharp(sourceBuffer).metadata();
  const w = meta.width || 512;
  const h = meta.height || 512;
  const base64 = sourceBuffer.toString('base64');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image width="${w}" height="${h}" href="data:image/png;base64,${base64}"/>
</svg>
`;
  const outPath = join(SOLO_DIR, 'regenfass-solo-light.svg');
  writeFileSync(outPath, svg.trim(), 'utf8');
  console.log('  regenfass-solo-light.svg');
}

/**
 * SVG with solid navy background + embedded PNG (for cards)
 */
async function generateSoloCardSolidSvg(sourceBuffer) {
  const meta = await sharp(sourceBuffer).metadata();
  const w = meta.width || 512;
  const h = meta.height || 512;
  const base64 = sourceBuffer.toString('base64');
  const size = Math.max(w, h);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${NAVY_THEME}"/>
  <image x="${(size - w) / 2}" y="${(size - h) / 2}" width="${w}" height="${h}" href="data:image/png;base64,${base64}"/>
</svg>
`;
  const outPath = join(SOLO_DIR, 'regenfass-solo-light-card-solid.svg');
  writeFileSync(outPath, svg.trim(), 'utf8');
  console.log('  regenfass-solo-light-card-solid.svg');
}

/**
 * Export solo card-solid SVG to PNG (512x512)
 */
async function generateSoloCardSolidPng() {
  const svgPath = join(SOLO_DIR, 'regenfass-solo-light-card-solid.svg');
  const svg = readFileSync(svgPath);
  await sharp(svg)
    .resize(512, 512, { fit: 'contain' })
    .png()
    .toFile(join(SOLO_DIR, 'regenfass-solo-light-card-solid.png'));
  console.log('  regenfass-solo-light-card-solid.png');
}

/**
 * Horizontal logo SVG: icon + "Regenfass" text. Dark = light text on dark bg, Light = dark text (transparent bg).
 */
async function generateHorizontalSvgs(sourceBuffer) {
  ensureDir(HORIZONTAL_DIR);
  const meta = await sharp(sourceBuffer).metadata();
  const iw = meta.width || 512;
  const ih = meta.height || 512;
  const base64 = sourceBuffer.toString('base64');
  const iconHeight = 48;
  const iconWidth = (iw / ih) * iconHeight;
  const textX = iconWidth + 16;
  const fontSize = 28;
  const svgWidth = Math.ceil(iconWidth + 16 + 180);
  const svgHeight = iconHeight;

  const darkSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <rect width="${svgWidth}" height="${svgHeight}" fill="${NAVY}"/>
  <image x="0" y="0" width="${iconWidth}" height="${iconHeight}" href="data:image/png;base64,${base64}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${textX}" y="${fontSize + 4}" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="600" fill="${WHITE}">Regenfass</text>
</svg>
`;
  const lightSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <image x="0" y="0" width="${iconWidth}" height="${iconHeight}" href="data:image/png;base64,${base64}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${textX}" y="${fontSize + 4}" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="600" fill="${NAVY}">Regenfass</text>
</svg>
`;

  writeFileSync(join(HORIZONTAL_DIR, 'regenfass-horizontal-dark.svg'), darkSvg.trim(), 'utf8');
  writeFileSync(join(HORIZONTAL_DIR, 'regenfass-horizontal-light.svg'), lightSvg.trim(), 'utf8');
  console.log('  regenfass-horizontal-dark.svg');
  console.log('  regenfass-horizontal-light.svg');
}

const HORIZONTAL_PNG_BACKGROUND = { r: 0, g: 0, b: 0, alpha: 0 };

/**
 * Export one horizontal SVG to PNG (200x50 and high-res)
 */
async function exportHorizontalSvgToPng(svgPath, baseName) {
  const svg = readFileSync(svgPath);
  const outDir = dirname(svgPath);
  await sharp(svg)
    .resize(200, 50, { fit: 'contain', background: HORIZONTAL_PNG_BACKGROUND })
    .png()
    .toFile(join(outDir, `${baseName}-200x50.png`));
  console.log(`  ${baseName}-200x50.png`);

  const meta = await sharp(svg).metadata();
  const scale = 2;
  await sharp(svg)
    .resize((meta.width || 250) * scale, (meta.height || 50) * scale, { fit: 'contain', background: HORIZONTAL_PNG_BACKGROUND })
    .png()
    .toFile(join(outDir, `${baseName}-hr.png`));
  console.log(`  ${baseName}-hr.png`);
}

/**
 * Export horizontal SVGs (dark and light) to PNG (200x50 and high-res each)
 */
async function generateHorizontalPngs() {
  await exportHorizontalSvgToPng(join(HORIZONTAL_DIR, 'regenfass-horizontal-dark.svg'), 'regenfass-horizontal-dark');
  await exportHorizontalSvgToPng(join(HORIZONTAL_DIR, 'regenfass-horizontal-light.svg'), 'regenfass-horizontal-light');
}

async function main() {
  if (!existsSync(SOURCE_PNG)) {
    throw new Error(`Source not found: ${SOURCE_PNG}`);
  }
  const sourceBuffer = readFileSync(SOURCE_PNG);
  console.log('Generating solo variants...');
  await generateSoloPngs(sourceBuffer);
  await generateSoloLightSvg(sourceBuffer);
  await generateSoloCardSolidSvg(sourceBuffer);
  await generateSoloCardSolidPng();
  console.log('Generating horizontal variants...');
  await generateHorizontalSvgs(sourceBuffer);
  await generateHorizontalPngs();
  console.log('Done.');
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exitCode = 1;
});
