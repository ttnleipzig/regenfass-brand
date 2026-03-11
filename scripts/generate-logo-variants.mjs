#!/usr/bin/env node
/**
 * Logo Variants Generator
 * Generates all logo variants from the main logo SVG (assets/logos/tabler/regenfass-tabler-concept2-icon-light.svg).
 * Output:
 * - solo: PNG sizes + SVG with embedded image, card-solid SVG + PNG
 * - horizontal: dark/light SVG + PNGs each: 200x50, hr
 * - vertical: dark/light SVG (icon above wordmark)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const SOURCE_SVG = join(projectRoot, 'assets', 'logos', 'tabler', 'regenfass-tabler-concept2-icon-light.svg');
const SOLO_DIR = join(projectRoot, 'assets', 'logos', 'solo');
const HORIZONTAL_DIR = join(projectRoot, 'assets', 'logos', 'horizontal');
const VERTICAL_DIR = join(projectRoot, 'assets', 'logos', 'vertical');

/** Rendered icon size used as source for solo/horizontal (square). */
const SOURCE_RENDER_SIZE = 512;

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
      await sharp(sourceBuffer).png().toFile(outPath);
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

/** Wordmark text (lowercase) and horizontal logo layout. */
const WORDMARK = 'regenfass';
const HORIZONTAL_TEXT_WIDTH = 120; /* less space to the right */

/**
 * Horizontal logo SVG: icon + wordmark text. Dark = light text, Light = dark text; both have transparent background.
 */
async function generateHorizontalSvgs(sourceBuffer) {
  ensureDir(HORIZONTAL_DIR);
  const meta = await sharp(sourceBuffer).metadata();
  const iw = meta.width || 512;
  const ih = meta.height || 512;
  const base64 = sourceBuffer.toString('base64');
  const iconHeight = 48;
  const iconWidth = (iw / ih) * iconHeight;
  const textX = iconWidth + 12;
  const fontSize = 28;
  const rightPaddingEm = 1; /* 1em inner spacing on the right */
  const svgWidth = Math.ceil(iconWidth + 12 + HORIZONTAL_TEXT_WIDTH) + fontSize * rightPaddingEm;
  const svgHeight = iconHeight;

  const darkSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <image x="0" y="0" width="${iconWidth}" height="${iconHeight}" href="data:image/png;base64,${base64}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${textX}" y="${fontSize + 4}" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="200" fill="${WHITE}">${WORDMARK}</text>
</svg>
`;
  const lightSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <image x="0" y="0" width="${iconWidth}" height="${iconHeight}" href="data:image/png;base64,${base64}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${textX}" y="${fontSize + 4}" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="200" fill="${NAVY}">${WORDMARK}</text>
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

/**
 * Vertical logo SVGs: icon above wordmark text (stacked). Dark = white text, Light = navy text.
 */
async function generateVerticalSvgs(sourceBuffer) {
  ensureDir(VERTICAL_DIR);
  const meta = await sharp(sourceBuffer).metadata();
  const iw = meta.width || 512;
  const ih = meta.height || 512;
  const base64 = sourceBuffer.toString('base64');

  const iconHeight = 144;
  const iconWidth = (iw / ih) * iconHeight;
  const textFontSize = 16;
  const verticalSpacing = 8;

  const svgWidth = Math.ceil(Math.max(iconWidth + 24, HORIZONTAL_TEXT_WIDTH));
  const svgHeight = Math.ceil(iconHeight + verticalSpacing + textFontSize + 12);

  const iconX = (svgWidth - iconWidth) / 2;
  const iconY = 4;
  const textX = 18; // text further left
  const textY = iconHeight + verticalSpacing + textFontSize / 2;

  const verticalDarkSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <image x="${iconX}" y="${iconY}" width="${iconWidth}" height="${iconHeight}" href="data:image/png;base64,${base64}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${textX}" y="${textY}" font-family="system-ui, sans-serif" font-size="${textFontSize}" font-weight="200" text-anchor="start" fill="${WHITE}">${WORDMARK}</text>
</svg>
`;

  const verticalLightSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <image x="${iconX}" y="${iconY}" width="${iconWidth}" height="${iconHeight}" href="data:image/png;base64,${base64}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${textX}" y="${textY}" font-family="system-ui, sans-serif" font-size="${textFontSize}" font-weight="200" text-anchor="start" fill="${NAVY}">${WORDMARK}</text>
</svg>
`;

  writeFileSync(join(VERTICAL_DIR, 'regenfass-vertical-dark.svg'), verticalDarkSvg.trim(), 'utf8');
  writeFileSync(join(VERTICAL_DIR, 'regenfass-vertical-light.svg'), verticalLightSvg.trim(), 'utf8');
  console.log('  regenfass-vertical-dark.svg');
  console.log('  regenfass-vertical-light.svg');
}

async function main() {
  if (!existsSync(SOURCE_SVG)) {
    throw new Error(`Source not found: ${SOURCE_SVG}`);
  }
  const svgBuffer = readFileSync(SOURCE_SVG);
  let sourceBuffer;
  try {
    sourceBuffer = await sharp(svgBuffer)
      .resize(SOURCE_RENDER_SIZE, SOURCE_RENDER_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  } catch (err) {
    throw new Error(`Failed to render SVG to PNG (Sharp/libvips may need SVG support): ${err.message}`);
  }
  console.log('Generating solo variants...');
  await generateSoloPngs(sourceBuffer);
  await generateSoloLightSvg(sourceBuffer);
  await generateSoloCardSolidSvg(sourceBuffer);
  await generateSoloCardSolidPng();
  console.log('Generating horizontal variants...');
  await generateHorizontalSvgs(sourceBuffer);
  await generateHorizontalPngs();
  console.log('Generating vertical variants...');
  await generateVerticalSvgs(sourceBuffer);
  console.log('Done.');
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  if (err.stack) console.error(err.stack);
  process.exitCode = 1;
});
