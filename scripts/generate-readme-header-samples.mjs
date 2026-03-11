#!/usr/bin/env node
/**
 * README Header Sample Banner Generator
 * Generates sample README header banners (1200×200) in Regenfass brand:
 * embedded 5.svg background, dark overlay, Regenfass logo, system UI font stack title.
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import sharp from 'sharp';
import {
  header,
  success,
  error,
  info,
  warn,
} from './misc-cli-utils.mjs';
import { getProjectRoot } from './config-loader.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = getProjectRoot();

const README_HEADER_SPECS = { width: 1200, height: 200 };
const TEMPLATE_SVG_PATH = join(projectRoot, 'assets', 'readme-header.svg');
const HORIZONTAL_LOGO_PATH = join(projectRoot, 'assets', 'logos', 'horizontal', 'regenfass-horizontal-dark.svg');

/** Logo href used in template (relative to assets/). Samples in examples/github/ need a different path. */
const LOGO_HREF_TEMPLATE = 'logos/horizontal/regenfass-horizontal-dark.svg';
const LOGO_HREF_FOR_SAMPLES = '../../assets/logos/horizontal/regenfass-horizontal-dark.svg';

function extractTemplateParts() {
  if (existsSync(TEMPLATE_SVG_PATH)) {
    const raw = readFileSync(TEMPLATE_SVG_PATH, 'utf8');
    const defs = raw.match(/<defs>[\s\S]*?<\/defs>/)?.[0] ?? '';
    const background = raw.match(/<!-- Background:[\s\S]*?-->\s*([\s\S]*?)\s*<!-- Regenfass logo/)?.[1]?.trim() ?? '';
    const overlay = raw.match(/<!-- Dark overlay[\s\S]*?-->\s*([\s\S]*?)\s*<!-- Regenfass logo/i)?.[1]?.trim() ?? '';
    const logo = raw.match(/<!-- Regenfass logo[\s\S]*?-->\s*([\s\S]*?)\s*<!-- Title/)?.[1]?.trim() ?? '';

    if (defs && background && logo) {
      return { defs, background, overlay: overlay || '', logo };
    }
  }

  warn(`Template SVG not found or incomplete at ${TEMPLATE_SVG_PATH}. Falling back to a generated dark-blue header.`);
  const fallbackLogo = existsSync(HORIZONTAL_LOGO_PATH)
    ? readFileSync(HORIZONTAL_LOGO_PATH, 'utf8')
        .replace(/<\?xml[\s\S]*?\?>\s*/i, '')
        .replace(/^[\s\S]*?<svg[^>]*>/, '')
        .replace(/<\/svg>\s*$/, '')
        .replace(/<rect[^>]*fill="#0B2649"[^>]*\/?>/i, '')
        .trim()
    : '<text x="64" y="32" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#FFFFFF">Regenfass</text>';

  return {
    defs: `<defs>
    <linearGradient id="readmeOverlay" x1="0" x2="1" y1="0" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#0B2649" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#1E2A45" stop-opacity="0.55"/>
    </linearGradient>
  </defs>`,
    background: '<rect width="1200" height="200" fill="#0B2649"/>',
    overlay: '<rect width="1200" height="200" fill="url(#readmeOverlay)"/>',
    logo: `<g transform="translate(40, 20)">${fallbackLogo}</g>`,
  };
}

/**
 * Build full README header SVG (1200×200) with Regenfass brand: background, overlay, logo, title.
 * @param {string} title - Title text (HTML-escape before passing)
 * @param {{ fixLogoHrefForSamples?: boolean }} [opts] - If true, logo href is set for SVGs in examples/github/
 * @returns {string} SVG string
 */
function buildReadmeHeaderSvg(title, opts = {}) {
  const { defs, background, overlay, logo } = extractTemplateParts();
  let logoBlock = logo;
  if (opts.fixLogoHrefForSamples && logo.includes(LOGO_HREF_TEMPLATE)) {
    logoBlock = logo.replace(new RegExp(LOGO_HREF_TEMPLATE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), LOGO_HREF_FOR_SAMPLES);
  }
  const overlayBlock = overlay ? `  <!-- Dark overlay for contrast -->\n  ${overlay}\n  ` : '';
  return `<svg width="1200" height="200" viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <!-- Background: current README header template -->
  ${background}
${overlayBlock}  <!-- Regenfass logo -->
  ${logoBlock}
  <!-- Title (system UI stack) -->
  <text x="40" y="130" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">${title}</text>
  <!-- Accent line (brand accent as in OG) -->
  <rect x="40" y="148" width="200" height="4" fill="#00BCD4"/>
</svg>
`;
}

const EXAMPLE_REPOSITORIES = [
  { id: 'web-app', title: 'Web Application' },
  { id: 'api-service', title: 'API Service' },
  { id: 'mobile-app', title: 'Mobile App' },
  { id: 'cli-tool', title: 'CLI Tool' },
  { id: 'library', title: 'JavaScript Library' },
  { id: 'documentation', title: 'Documentation' },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function generateSampleBanners() {
  const outputDir = join(projectRoot, 'examples', 'github');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  info('Generating sample README header banners from the current Regenfass README template...');
  info(`Output directory: ${outputDir}`);

  // Update default template used by generate-readme-header.mjs
  const defaultTemplatePath = join(projectRoot, 'assets', 'readme-header.svg');
  const defaultSvg = buildReadmeHeaderSvg(escapeXml('Corporate Identity & Corporate Design'));
  writeFileSync(defaultTemplatePath, defaultSvg, 'utf8');
  success(`Updated default template: ${defaultTemplatePath}`);

  for (const repo of EXAMPLE_REPOSITORIES) {
    try {
      const svgContent = buildReadmeHeaderSvg(escapeXml(repo.title), { fixLogoHrefForSamples: true });
      const svgPath = join(outputDir, `sample-readme-header-${repo.id}.svg`);
      writeFileSync(svgPath, svgContent, 'utf8');
      success(`Generated SVG: ${svgPath}`);

      const pngPath = join(outputDir, `sample-readme-header-${repo.id}.png`);
      const pngBuffer = await sharp(Buffer.from(svgContent))
        .resize(README_HEADER_SPECS.width, README_HEADER_SPECS.height, {
          fit: 'contain',
          background: { r: 27, g: 38, b: 73 },
        })
        .png()
        .toBuffer();
      writeFileSync(pngPath, pngBuffer);
      const fileSizeMB = pngBuffer.length / (1024 * 1024);
      success(`Generated PNG: ${pngPath} (${fileSizeMB.toFixed(2)} MB)`);
    } catch (err) {
      error(`Failed to generate banner for ${repo.id}: ${err.message}`);
    }
  }
}

async function main() {
  try {
    header('README Header Sample Banner Generator', 'Regenfass brand: current template, current logo, system UI stack');
    await generateSampleBanners();
    success('Sample banner generation completed!');
    info(`Generated ${EXAMPLE_REPOSITORIES.length} sample banners in examples/github/`);
  } catch (err) {
    error(`Error: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] === currentFile || process.argv[1].endsWith('generate-readme-header-samples.mjs')) {
  main().catch((err) => {
    console.error('Unhandled error:', err);
    process.exit(1);
  });
}

export { buildReadmeHeaderSvg, generateSampleBanners, EXAMPLE_REPOSITORIES, README_HEADER_SPECS };
