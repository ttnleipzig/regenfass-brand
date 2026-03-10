#!/usr/bin/env node
/**
 * Generates Open Graph banner PNGs for all pages (1200×630).
 * SVG is not displayed by many platforms; output is PNG only.
 * Template: solid dark blue background (#0B2649), Regenfass logo,
 * brand typography (system UI stack), title/subtitle/tag, page-specific graphic.
 */

import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "assets", "banner", "opengraph");
const LOGO_SVG_PATH = join(__dirname, "..", "assets", "logos", "horizontal", "regenfass-horizontal-dark.svg");

/** Brand dark blue (dunkelblau) – used as full background. */
const BG_DARK_BLUE = "#0B2649";
const bgStyle = "";
const bgGraphic = `<rect width="1200" height="630" fill="${BG_DARK_BLUE}"/>`;

/** Brand typography: system UI stack (see app/styles.css, guidelines/TYPOGRAPHY.md). Quotes escaped for SVG attributes. */
const FONT_STACK =
  'ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;';

/** Logo height in banner (px). Original asset is 48px tall. */
const LOGO_HEIGHT = 72;

/**
 * Load Regenfass logo from assets/logos/horizontal/regenfass-horizontal-dark.svg.
 * Strips the background rect so the logo sits on the banner background; returns SVG inner content
 * scaled to LOGO_HEIGHT for embedding in the banner.
 */
function getRegenfassLogoEmbed() {
  const raw = readFileSync(LOGO_SVG_PATH, "utf8");
  const inner = raw
    .replace(/<\?xml[\s\S]*?\?>\s*/i, "")
    .replace(/<svg[\s\S]*?>\s*/i, "")
    .replace(/\s*<\/svg>\s*$/i, "")
    .trim();
  const withoutRect = inner.replace(/<rect[^>]*width="244"[^>]*\/>\s*/i, "").trim();
  const scale = LOGO_HEIGHT / 48;
  return `<g transform="translate(100, 80) scale(${scale})">
    <svg width="244" height="48" viewBox="0 0 244 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${withoutRect}</svg>
  </g>`;
}

let LOGO_EMBED;
try {
  LOGO_EMBED = getRegenfassLogoEmbed();
} catch (err) {
  console.error("Failed to load Regenfass logo from", LOGO_SVG_PATH, err.message);
  process.exit(1);
}

/** Page-specific decorative graphic (right side). Only pages with a dedicated visual get one; others use only the solid dark blue background. */
function getPageGraphic(key) {
  switch (key) {
    case "index":
      return "";
    case "colors":
      return `
  <!-- Color swatches (primary palette) -->
  <rect x="850" y="150" width="100" height="100" rx="16" fill="#0B2649"/>
  <rect x="970" y="150" width="100" height="100" rx="16" fill="#FF5722"/>
  <rect x="1090" y="150" width="100" height="100" rx="16" fill="#00BCD4"/>`;
    case "fonts":
      return `
  <!-- Typography sample -->
  <text x="900" y="200" font-family="${FONT_STACK}" font-size="120" font-weight="700" fill="#00BCD4" opacity="0.2">Aa</text>
  <text x="900" y="400" font-family="${FONT_STACK}" font-size="80" font-weight="400" fill="#FF5722" opacity="0.2">Aa</text>`;
    case "avatars":
      return `
  <!-- Avatar examples -->
  <rect x="800" y="200" width="120" height="120" fill="#00BCD4" rx="8"/>
  <rect x="940" y="200" width="120" height="120" fill="#1E2A45" rx="8"/>
  <rect x="800" y="340" width="120" height="120" fill="#FF5722" rx="8"/>
  <rect x="940" y="340" width="120" height="120" fill="#00BCD4" rx="8" opacity="0.7"/>`;
    default:
      return "";
  }
}

const PAGES = [
  {
    key: "index",
    title: "Corporate Identity",
    titleLine2: "&amp; Corporate Design",
    subtitle: "Brand assets, logos, colors, fonts, and guidelines",
    tag: null,
    accentColor: "#00BCD4",
  },
  {
    key: "fundamentals",
    title: "Fundamentals",
    titleLine2: null,
    subtitle: "Logos, colors, typography, icons, and backgrounds",
    tag: null,
    accentColor: "#00BCD4",
  },
  {
    key: "logos",
    title: "Logos",
    titleLine2: null,
    subtitle: "All official logo variants and formats",
    tag: "Horizontal • Single • Icon",
    accentColor: "#00BCD4",
  },
  {
    key: "colors",
    title: "Brand Colors",
    titleLine2: null,
    subtitle: "Official color palette and specifications",
    tag: "Dark Blue • Orange • Turquoise",
    accentColor: "#00BCD4",
  },
  {
    key: "fonts",
    title: "Typography",
    titleLine2: null,
    subtitle: "Brand fonts and typography guidelines",
    tag: "System UI font stack",
    accentColor: "#00BCD4",
  },
  {
    key: "backgrounds",
    title: "Backgrounds",
    titleLine2: null,
    subtitle: "Background graphics for hero, 16:9, banner, and web app – preview and SVG download",
    tag: "Hero • 16:9 • Banner • Web App",
    accentColor: "#00BCD4",
  },
  {
    key: "implementations",
    title: "Implementations",
    titleLine2: null,
    subtitle: "Applications and products built from brand fundamentals",
    tag: "Business Cards • Templates • More",
    accentColor: "#00BCD4",
  },
  {
    key: "avatars",
    title: "Avatars",
    titleLine2: null,
    subtitle: "Square avatar graphics with cut-out portraits and brand colors",
    tag: "Square Format • Brand Colors • Cut-out Portraits",
    accentColor: "#FF5722",
  },
  {
    key: "business-cards",
    title: "Business Cards",
    titleLine2: null,
    subtitle: "Digital presentation of official business cards",
    tag: "vCard • QR Code • Brand Identity",
    accentColor: "#00BCD4",
  },
  {
    key: "impressum",
    title: "Impressum",
    titleLine2: null,
    subtitle: "Legal notice and company information",
    tag: "Regenfass • Frankfurt am Main",
    accentColor: "#00BCD4",
  },
];

function buildSvg(page) {
  const graphic = getPageGraphic(page.key);
  const subtitleY = page.titleLine2 ? 450 : 380;
  const tagY = page.titleLine2 ? 450 : 440;
  const accentY = page.titleLine2 ? 480 : (page.tag ? 460 : 440);
  const titleY2 = page.titleLine2 ? 380 : 320;
  const titleY1 = 320;

  const titleBlock =
    page.titleLine2
      ? `<text x="100" y="${titleY1}" font-family="${FONT_STACK}" font-size="64" font-weight="700" fill="#FFFFFF">${page.title}</text>
  <text x="100" y="${titleY2}" font-family="${FONT_STACK}" font-size="64" font-weight="700" fill="#FFFFFF">${page.titleLine2}</text>`
      : `<text x="100" y="${titleY1}" font-family="${FONT_STACK}" font-size="72" font-weight="700" fill="#FFFFFF">${page.title}</text>`;

  const subtitleEl = `<text x="100" y="${subtitleY}" font-family="${FONT_STACK}" font-size="28" font-weight="400" fill="#E8E8E8">${page.subtitle}</text>`;
  const tagEl =
    page.tag &&
    `<text x="100" y="${tagY}" font-family="${FONT_STACK}" font-size="24" font-weight="400" fill="#00BCD4">${page.tag}</text>`;
  const accentEl = `<rect x="100" y="${accentY}" width="200" height="4" fill="${page.accentColor}"/>`;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${bgStyle}
  </defs>
  <!-- Background: solid dark blue (dunkelblau) -->
  ${bgGraphic}
${graphic}
  <!-- Regenfass logo (from assets/logos/horizontal/regenfass-horizontal-dark.svg) -->
  ${LOGO_EMBED}
  <!-- Title (below logo) -->
  ${titleBlock}
  <!-- Subtitle -->
  ${subtitleEl}
${tagEl ? `  ${tagEl}\n` : ""}  <!-- Accent line -->
  ${accentEl}
</svg>
`;
}

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const page of PAGES) {
    const svgContent = buildSvg(page);
    const pngPath = join(OUT_DIR, `${page.key}.png`);
    const svgBuffer = Buffer.from(svgContent);
    await sharp(svgBuffer)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "fill" })
      .png()
      .toFile(pngPath);
    console.log("Wrote", pngPath);
  }
  console.log("Done. Generated", PAGES.length, "OG banners (PNG).");
}

main().catch((err) => {
  console.error("generate-og-banners error:", err.message);
  process.exit(1);
});
