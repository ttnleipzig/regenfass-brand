# Logos

This directory contains official Regenfass logos in various formats, organised by variant.

## Directory structure

| Directory | Description |
|-----------|-------------|
| `horizontal/` | Logo with Regenfass text adjacent to icon (horizontal layout); light and dark for different backgrounds |
| `solo/` | Icon only (no wordmark); light and card-solid variants; PNG sizes for web/manifest |
| `tabler/` | Vector icon-only logos built from Tabler Icons; light and dark per concept |
| `venitus/` | Regenfass with Venitus wordmark (on request); light and dark |
| `a-venitus-company/` | “A Venitus Company” lockup (horizontal); light and dark |

## File formats

- **SVG** – Scalable vector graphics (preferred for web and print)
- **PNG** – Raster (e.g. fixed sizes, email, favicon, PWA icons)

## Available logos

### Horizontal (`horizontal/`)

| File | Format | Use |
|------|--------|-----|
| `regenfass-horizontal-dark.svg` | SVG | Dark backgrounds |
| `regenfass-horizontal-light.svg` | SVG | Light backgrounds |
| `regenfass-horizontal-light-200x50.png` | PNG | Fixed size (e.g. 200×50) |
| `regenfass-horizontal-light-hr.png` | PNG | High resolution |

Use **dark** on dark backgrounds and **light** on light backgrounds.

### Solo / icon (`solo/`)

| File | Format | Description |
|------|--------|-------------|
| `regenfass-logo.png` | PNG | Source asset (500×500); do not use directly for deliverables |
| `regenfass-solo-light.svg` | SVG | Icon-only, light (references PNG) |
| `regenfass-solo-light-card-solid.svg` | SVG | Icon on solid navy (#1E2A45); e.g. cards |
| `regenfass-solo-light.png` | PNG | Icon-only, light (500×500) |
| `regenfass-solo-light-100.png` | PNG | 100×100 (e.g. email signature) |
| `regenfass-solo-light-192.png` | PNG | 192×192 (PWA / manifest) |
| `regenfass-solo-light-512.png` | PNG | 512×512 (PWA / manifest) |
| `regenfass-solo-light-hr.png` | PNG | High resolution |

Solo **dark** (for light backgrounds) is available on request.

### Tabler icon logos (`tabler/`)

Vector SVG logos composed from [Tabler Icons](https://tabler.io/icons) (MIT). Use when a scalable, icon-library-consistent mark is preferred (e.g. favicons, small UI icons, or design systems that already use Tabler).

| File | Description |
|------|-------------|
| `regenfass-tabler-concept1-icon-light.svg` | Barrel + droplet (light: turquoise `#00BCD4` for dark backgrounds) |
| `regenfass-tabler-concept1-icon-dark.svg` | Barrel + droplet (dark: `#0B2649` for light backgrounds) |
| `regenfass-tabler-concept2-icon-light.svg` | Bucket-droplet (light) |
| `regenfass-tabler-concept2-icon-dark.svg` | Bucket-droplet (dark) |
| `regenfass-tabler-concept3-icon-light.svg` | Cloud-rain + barrel (light) |
| `regenfass-tabler-concept3-icon-dark.svg` | Cloud-rain + barrel (dark) |

Use **light** on dark backgrounds and **dark** on light backgrounds. All icons use a 24×24 viewBox and scale with CSS or `width`/`height`.

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

- `logos/horizontal/regenfass-horizontal-dark.svg`, `regenfass-horizontal-light.svg`
- `logos/solo/regenfass-solo-light.svg`, `regenfass-solo-light.png`, `regenfass-solo-light-192.png`, `regenfass-solo-light-512.png`, `regenfass-solo-light-card-solid.svg`
- `logos/tabler/regenfass-tabler-concept1-icon-light.svg`, `regenfass-tabler-concept1-icon-dark.svg`, and concept2/concept3 variants

(and similarly for other files in the subdirectories.)
