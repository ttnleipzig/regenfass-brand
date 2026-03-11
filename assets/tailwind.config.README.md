# Tailwind CSS Configuration

This directory contains the complete Tailwind CSS theme configuration for Regenfass brand assets, including both colors and fonts.

## Available Files

| File Name            | Description                                          | Location                                                                    |
|----------------------|------------------------------------------------------|-----------------------------------------------------------------------------|
| `tailwind.config.js` | Complete Tailwind CSS config (colors + fonts)       | [View](https://github.com/ttnleipzig/regenfass-brand/blob/main/assets/tailwind.config.js) |
| Colors only          | Colors-only Tailwind config                         | [View](../colors/tailwind.config.js)                                        |
| Fonts only           | Fonts-only Tailwind config                          | [View](../fonts/tailwind.config.js)                                         |

## Quick Start

### Option 1: Use Complete Configuration

Copy the complete configuration file to your project:

```bash
cp assets/tailwind.config.js tailwind.config.js
```

Then install Tailwind CSS if you haven't already:

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

### Option 2: Merge with Existing Config

If you already have a `tailwind.config.js`, you can merge the theme extensions:

```javascript
// tailwind.config.js
const regenfassConfig = require('./assets/tailwind.config.js');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      ...regenfassConfig.theme.extend,
      // Your custom extensions
    },
  },
  plugins: [],
};
```

### Option 3: Import Specific Parts

Import only what you need:

```javascript
// tailwind.config.js
const colorsConfig = require('./assets/colors/tailwind.config.js');
const fontsConfig = require('./assets/fonts/tailwind.config.js');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: colorsConfig.theme.extend.colors,
      fontFamily: fontsConfig.theme.extend.fontFamily,
      fontWeight: fontsConfig.theme.extend.fontWeight,
      fontSize: fontsConfig.theme.extend.fontSize,
    },
  },
  plugins: [],
};
```

## Usage Examples

### Colors

```html
<!-- Selection colors -->
<div class="bg-aqua text-white">Aqua background</div>
<div class="bg-aqua-medium">Aqua medium</div>
<div class="bg-aqua-dark">Aqua dark</div>

<div class="bg-navy text-white">Navy background</div>
<div class="bg-navy-medium text-white">Navy medium</div>
<div class="bg-navy-light text-white">Navy light</div>

<div class="bg-fuchsia text-white">Fuchsia background</div>
<div class="bg-fuchsia-medium text-white">Fuchsia medium</div>
<div class="bg-fuchsia-light text-white">Fuchsia light</div>

<!-- Primary brand colors -->
<div class="bg-primary text-secondary">Primary background</div>
<div class="bg-secondary text-primary">Secondary background</div>

<!-- Neutral colors -->
<div class="text-gray-dark">Dark gray text</div>
<div class="text-gray-medium">Medium gray text</div>
<div class="bg-gray-light">Light gray background</div>
```

### Fonts

```html
<!-- Font families -->
<h1 class="font-heading">Heading (system UI stack)</h1>
<p class="font-body">Body text (system UI stack)</p>

<!-- Font weights -->
<div class="font-heading-light">Light (300)</div>
<div class="font-heading-regular">Regular (400)</div>
<div class="font-heading-medium">Medium (500)</div>
<div class="font-heading-bold">Bold (700)</div>

<div class="font-body-regular">Regular (400)</div>
<div class="font-body-semibold">Semibold (600)</div>

<!-- Type scale (Desktop) -->
<h1 class="text-h1-desktop">H1 Desktop</h1>
<h2 class="text-h2-desktop">H2 Desktop</h2>
<p class="text-body-desktop">Body Desktop</p>

<!-- Type scale (Mobile) -->
<h1 class="text-h1-mobile">H1 Mobile</h1>
<h2 class="text-h2-mobile">H2 Mobile</h2>
<p class="text-body-mobile">Body Mobile</p>
```

### Combined Example

```html
<div class="bg-aqua text-white font-heading font-heading-bold text-h1-desktop">
  Brand Heading
</div>

<p class="text-gray-dark font-body font-body-regular text-body-desktop">
  Body text with proper styling
</p>
```

## Available Color Classes

### Selection Colors
- `bg-aqua`, `bg-aqua-medium`, `bg-aqua-dark`
- `text-aqua`, `text-aqua-medium`, `text-aqua-dark`
- `bg-navy`, `bg-navy-medium`, `bg-navy-light`
- `text-navy`, `text-navy-medium`, `text-navy-light`
- `bg-fuchsia`, `bg-fuchsia-medium`, `bg-fuchsia-light`
- `text-fuchsia`, `text-fuchsia-medium`, `text-fuchsia-light`

### Primary Brand Colors
- `bg-primary`, `text-primary`
- `bg-secondary`, `text-secondary`

### Neutral Colors
- `bg-gray-dark`, `text-gray-dark`
- `bg-gray-medium`, `text-gray-medium`
- `bg-gray-light`, `text-gray-light`

## Available Font Classes

### Font Families
- `font-heading` - System UI stack (for headings)
- `font-body` - System UI stack (for body text)
- `font-hanken-grotesk` - Direct font family name
- `font-source-sans-3` - Direct font family name

### Font Weights
- `font-heading-light` (300)
- `font-heading-regular` (400)
- `font-heading-medium` (500)
- `font-heading-bold` (700)
- `font-body-regular` (400)
- `font-body-semibold` (600)

### Type Scale (Desktop)
- `text-h1-desktop` (48px, Bold)
- `text-h2-desktop` (40px, Bold)
- `text-h3-desktop` (32px, Medium)
- `text-h4-desktop` (24px, Medium)
- `text-h5-desktop` (20px, Medium)
- `text-h6-desktop` (16px, Medium)
- `text-body-large-desktop` (18px, Regular)
- `text-body-desktop` (16px, Regular)
- `text-body-small-desktop` (14px, Regular)
- `text-caption-desktop` (12px, Regular)

### Type Scale (Mobile)
- `text-h1-mobile` (36px, Bold)
- `text-h2-mobile` (32px, Bold)
- `text-h3-mobile` (28px, Medium)
- `text-h4-mobile` (20px, Medium)
- `text-h5-mobile` (18px, Medium)
- `text-h6-mobile` (16px, Medium)
- `text-body-mobile` (16px, Regular)
- `text-body-small-mobile` (14px, Regular)
- `text-caption-mobile` (12px, Regular)

## Fonts

The brand uses the **system UI font stack**; no external font loading is required. In your Tailwind/HTML, use the same stack as in `app/styles.css`:

```css
--font-heading: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--font-body: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

Optional font files (e.g. for PDF) may be stored in `assets/fonts/`. See [fonts/README.md](../fonts/README.md) and [TYPOGRAPHY.md](../guidelines/TYPOGRAPHY.md).

## Documentation

For more detailed information:

- **Colors**: See [colors/README.md](../colors/README.md) and [COLOR_PALETTE.md](../guidelines/COLOR_PALETTE.md)
- **Fonts**: See [fonts/README.md](../fonts/README.md) and [TYPOGRAPHY.md](../guidelines/TYPOGRAPHY.md)

---

*Part of the [Regenfass Corporate Identity](https://github.com/ttnleipzig/regenfass-brand) assets*
