# Logos

This directory contains official Regenfass logos in various formats, organised by variant.

## Directory structure

| Directory | Description |
|-----------|-------------|
| `horizontal/` | Logo with Regenfass text adjacent to icon (horizontal layout); light and dark for different backgrounds |
| `solo/` | Icon only (no wordmark); light and card-solid variants; PNG sizes for web/manifest |
| `tabler/` | Main logo (single vector icon); source for generated solo and horizontal variants |
| `venitus/` | Regenfass with Venitus wordmark (on request); light and dark |
| `a-venitus-company/` | “A Venitus Company” lockup (horizontal); light and dark |

## File formats

- **SVG** – Scalable vector graphics (preferred for web and print)
- **PNG** – Raster (e.g. fixed sizes, email, favicon, PWA icons)

## Available logos

### Horizontal (`horizontal/`)

Generated from the main logo (run `pnpm run generate:logos`). Icon + “Regenfass” wordmark.

| File | Format | Use |
|------|--------|-----|
| `regenfass-horizontal-dark.svg` | SVG | Dark backgrounds |
| `regenfass-horizontal-dark-200x50.png` | PNG | Fixed size (e.g. 200×50) |
| `regenfass-horizontal-dark-hr.png` | PNG | High resolution |
| `regenfass-horizontal-light.svg` | SVG | Light backgrounds |
| `regenfass-horizontal-light-200x50.png` | PNG | Fixed size (e.g. 200×50) |
| `regenfass-horizontal-light-hr.png` | PNG | High resolution |

Use **dark** on dark backgrounds and **light** on light backgrounds.

### Solo / icon (`solo/`)

Solo and card-solid variants are **generated** from the main logo in `tabler/regenfass-tabler-concept2-icon-light.svg` (run `pnpm run generate:logos`).

| File | Format | Description |
|------|--------|-------------|
| `regenfass-solo-light.svg` | SVG | Icon-only, light (embedded raster from main logo) |
| `regenfass-solo-light-card-solid.svg` | SVG | Icon on solid navy (#1E2A45); e.g. cards |
| `regenfass-solo-light-card-solid.png` | PNG | Card-solid at 512×512 |
| `regenfass-solo-light.png` | PNG | Icon-only, light |
| `regenfass-solo-light-100.png` | PNG | 100×100 (e.g. email signature) |
| `regenfass-solo-light-192.png` | PNG | 192×192 (PWA / manifest) |
| `regenfass-solo-light-512.png` | PNG | 512×512 (PWA / manifest) |
| `regenfass-solo-light-hr.png` | PNG | High resolution |

Solo **dark** (for light backgrounds) is available on request.

### Main logo / Tabler icon (`tabler/`)

**Single main logo:** [Tabler Icons](https://tabler.io/icons) (MIT) bucket-droplet, light variant. Bucket turquoise (#00BCD4), droplet brand green (#22C55E). Used site-wide for favicon, footer, manifest, and alternate icons. **Source for all generated solo and horizontal assets** (see `scripts/generate-logo-variants.mjs`).

| File | Description |
|------|-------------|
| `regenfass-tabler-concept2-icon-light.svg` | Main logo (24×24 viewBox); use on dark backgrounds |

Use this icon for favicon, app icons, and any icon-only placement. Scale with CSS or `width`/`height`.

### Venitus (`venitus/`)

Regenfass-specific Venitus wordmark lockups (light/dark, SVG/PNG) are available on request. Contact the brand team.

### A Venitus Company (`a-venitus-company/`)

Regenfass-specific "A Venitus Company" horizontal lockups (dark/light) are available on request. Contact the brand team.

## Usage guidelines

- Maintain clear space around the logo.
- Do not distort, rotate, or modify the logo.
- Choose the variant that matches your background (dark vs light).
- Prefer SVG for scalability; use PNG when a raster asset is required (e.g. email, favicon).
- See [LOGO_USAGE.md](../../guidelines/LOGO_USAGE.md) in the guidelines folder for detailed usage.

## Paths in the built app

Assets are served from the `assets` folder (e.g. Vite `publicDir: 'assets'`). In the built brand site, logo URLs use subpaths such as:

- **Main logo:** `logos/tabler/regenfass-tabler-concept2-icon-light.svg` (favicon, footer, manifest, alternate icons; source for generated assets)
- `logos/horizontal/regenfass-horizontal-dark.svg`, `regenfass-horizontal-light.svg` (generated from main logo)
- `logos/solo/regenfass-solo-light.svg`, `regenfass-solo-light.png`, `regenfass-solo-light-192.png`, `regenfass-solo-light-512.png`, `regenfass-solo-light-card-solid.svg` (generated from main logo)

(and similarly for other files in the subdirectories.)
