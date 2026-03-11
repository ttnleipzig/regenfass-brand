# Brand Colours

This directory contains the official Regenfass brand colour palette, including developer files and visual swatches.

**Note**: Assets are distributed as ZIP archives only. Individual files are not available for download. Download the complete colour assets as part of the [latest release ZIP](https://github.com/ttnleipzig/regenfass-brand/releases).

## Available Files

| File Name              | Format | Description                                                  | Download                                                                                        |
|------------------------|--------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `colors.css`           | CSS    | CSS variables for web projects                               | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/colors.css)             |
| `colors.json`          | JSON   | HEX, RGB, and CMYK values for JavaScript/TypeScript projects | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/colors.json)            |
| `tailwind.config.js`   | JS     | Tailwind CSS theme configuration for colours                 | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/tailwind.config.js)     |

### Colour Swatches

**Primary Brand Colours:**

| File Name                   | Format | Colour                  | Download                                                                                              |
|-----------------------------|--------|------------------------|--------------------------------------------------------------------------------------------------------|
| `swatches/dark-blue.svg`    | SVG    | Dark Blue (#0B2649)    | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/dark-blue.svg)       |
| `swatches/green.svg`       | SVG    | Green (#22C55E)        | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/green.svg)            |
| `swatches/turquoise.svg`    | SVG    | Turquoise (#00BCD4)    | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/turquoise.svg)        |
| `swatches/complement.svg`   | SVG    | Complement (#E11D48)   | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/complement.svg)       |

**Neutral Colours:**

| File Name                   | Format | Colour                  | Download                                                                                              |
|-----------------------------|--------|------------------------|--------------------------------------------------------------------------------------------------------|
| `swatches/white.svg`        | SVG    | White (#FFFFFF)        | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/white.svg)            |
| `swatches/dark-gray.svg`    | SVG    | Dark Grey (#333333)    | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/dark-gray.svg)        |

**Extended Palette (Legacy/Selection Colours):**

| File Name                   | Format | Colour                  | Download                                                                                              |
|-----------------------------|--------|------------------------|--------------------------------------------------------------------------------------------------------|
| `swatches/aqua.svg`         | SVG    | Aqua (#00FFDC)         | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/aqua.svg)            |
| `swatches/aqua-medium.svg`  | SVG    | Aqua Medium (#00BFA5)  | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/aqua-medium.svg)     |
| `swatches/aqua-dark.svg`    | SVG    | Aqua Dark (#006B5F)    | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/aqua-dark.svg)       |
| `swatches/navy.svg`         | SVG    | Navy (#1E2A45)         | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/navy.svg)            |
| `swatches/navy-medium.svg`  | SVG    | Navy Medium (#2F4169) | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/navy-medium.svg)      |
| `swatches/navy-light.svg`   | SVG    | Navy Light (#5A6B8C)  | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/navy-light.svg)      |
| `swatches/fuchsia.svg`      | SVG    | Fuchsia (#FF008F)      | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/fuchsia.svg)         |
| `swatches/fuchsia-medium.svg` | SVG | Fuchsia Medium (#BF006B) | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/fuchsia-medium.svg)  |
| `swatches/fuchsia-light.svg` | SVG  | Fuchsia Light (#800047)  | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/colors/swatches/fuchsia-light.svg)    |

## Primary Brand Colours

The Regenfass brand uses three primary colours for a consistent visual identity: Dark Blue, Green, and Turquoise (with Pantone 533 C, 354 C, 319 C for print), plus a complementary accent (Rose/Red).

### Primary Colours
| Colour    | Hex       | RGB                | Description                                    |
|----------|-----------|--------------------|------------------------------------------------|
| Dark Blue | `#0B2649` | `rgb(11, 38, 73)`  | Primary dark; trust, professionalism          |
| Green    | `#22C55E` | `rgb(34, 197, 94)` | Accent; energy, call-to-action                 |
| Turquoise | `#00BCD4` | `rgb(0, 188, 212)` | Accent; clarity, innovation                    |
| Complement | `#E11D48` | `rgb(225, 29, 72)` | Complementary accent; contrast, secondary CTAs |

**JSON keys** (in `colors.json`): `selection.darkBlue`, `selection.green`, `selection.turquoise`, `selection.complement` (each with `hex`, `rgb`, `pantone`, `usage`, and `shades` where applicable). The `primary` object is set to Dark Blue (#0B2649). Legacy keys `selection.aqua`, `selection.navy`, `selection.fuchsia` remain for backwards compatibility. For Tailwind, extend your theme with e.g. `darkBlue: '#0B2649'`, `green: '#22C55E'`, `turquoise: '#00BCD4'`, `complement: '#E11D48'` when consuming this palette.

### Text colours

| Colour                                          | Hex       | RGB                  | Usage                          |
|------------------------------------------------|-----------|----------------------|--------------------------------|
| ![White](swatches/white.svg) White             | `#FFFFFF` | `rgb(255, 255, 255)` | Text colour on white background |
| ![Dark Grey](swatches/dark-gray.svg) Dark Grey | `#333333` | `rgb(51, 51, 51)`    | Text colour on white background |

## Usage

### For Developers

**CSS Example**:

```css
@import './colors.css';

.button {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}
```

**JavaScript/TypeScript Example**:

```javascript
import colors from './colors.json';

const primaryColor = colors.primary.hex;
```

**Tailwind CSS Example**:

```javascript
// In your tailwind.config.js
const colorsConfig = require('./assets/colors/tailwind.config.js');

module.exports = {
  ...colorsConfig,
  // Your other Tailwind config
};
```

Or import just the colours:

```javascript
// In your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: require('./assets/colors/tailwind.config.js').theme.extend.colors,
    },
  },
};
```

**Usage in HTML/Tailwind classes** (use primary brand colour utilities when available):

```html
<!-- Primary brand colours (Dark Blue, Green, Turquoise) -->
<div class="bg-primary text-secondary">Primary background</div>
<div class="bg-secondary text-primary">Secondary background</div>

<!-- Inline HEX when custom utilities are not yet configured -->
<div style="background-color: #0B2649; color: white;">Dark Blue background</div>
<div style="background-color: #22C55E; color: white;">Green accent</div>
<div style="background-color: #00BCD4; color: white;">Turquoise accent</div>

<!-- Neutral colours -->
<div class="text-gray-dark">Dark grey text</div>
<div class="text-gray-medium">Medium grey text</div>
<div class="bg-gray-light">Light grey background</div>
```

### For Designers

- Use the SVG swatches in `swatches/` directory for visual reference
- Import `.ase` (Adobe Swatch Exchange) files into Adobe Creative Cloud applications when available
- Refer to the Colour palette guidelines for complete specifications

## Colour Specifications

Brand colours are documented with:

- **Hex values** – For digital/web use (#0B2649, #22C55E, #00BCD4, #E11D48)
- **RGB values** – For digital displays
- **Pantone codes** – For print/screen printing (533 C, 354 C, 319 C, 1925 C)
- **CMYK** – Use Pantone solid coated or convert as needed for print

## Colour Usage

- **Primary colours** – Dark Blue, Green, Turquoise for major elements and accents; Complement for secondary contrast
- **Text colours** – White on dark backgrounds; dark grey on light backgrounds
- **Accessibility** – Ensure colour combinations meet WCAG contrast requirements

## Adding New Colours

When adding new colours to the palette:

1. Update the colour definition files (CSS, JSON)
2. Add SVG swatch to `swatches/` directory
3. Ensure the colour meets accessibility contrast requirements
4. Update the Colour palette guidelines documentation
5. Generate new palette reference images if needed

**Note**: SCSS files are no longer maintained. Use CSS variables or JSON for your projects.

---

*For detailed colour usage guidelines, see [COLOR_PALETTE.md](../guidelines/COLOR_PALETTE.md)*
