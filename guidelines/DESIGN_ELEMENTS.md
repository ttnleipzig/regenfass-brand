# Design Elements & Webdesign

Guidelines for buttons, background overlays, borders, and image treatments to keep Regenfass’s digital and print materials consistent.

## Buttons

### Primary button (CTA)

Use for main calls-to-action (e.g. “Contact”, “Learn more”).

- **Font:** System UI stack (see [TYPOGRAPHY.md](TYPOGRAPHY.md)), weight 600, 13px.
- **Background / border:** `#FF5722` (Orange).
- **Text:** White (`#FFFFFF`).
- **Border radius:** 4px.
- **Padding:** 10px 20px (top/bottom, left/right).
- **Letter spacing:** 1px.
- **Shadow:** `0px 0px 10px 0px rgba(0,0,0,0.2)`.
- **Hover:** Background and border white; text `#FF5722`.

Example CSS:

```css
.button {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-weight: 600;
  font-size: 13px;
  background-color: #FF5722;
  border-color: #FF5722;
  color: #FFFFFF;
  border-radius: 4px;
  display: inline-block;
  padding: 10px 20px;
  letter-spacing: 1px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
}
.button:hover {
  background-color: #FFFFFF;
  border-color: #FFFFFF;
  color: #FF5722;
}
```

## Background overlay

For hero or full-bleed image areas with a brand overlay:

- **Base:** Image as background.
- **Overlay:** Linear gradient from `#00BCD4` (Turquoise) to `#0B2649` (Dark Blue).
- **Angle:** 290°.
- **Opacity:** 93% (stops at 0 and 100).
- **Locations:** 0 and 100.

Use this overlay so imagery keeps a consistent CI look (e.g. on the Regenfass website).

## Two-tone headings (zweifarbige Überschriften)

For headings where the first part uses the base colour and the second part uses an accent (e.g. white + aqua on dark background):

- Use a normal heading (e.g. `h2`) with the section’s text colour (e.g. `text-white` on dark).
- Wrap the part that should stand out in `<span class="heading-accent">…</span>`.

**Example (dark background):**

```html
<h2 class="font-heading text-2xl font-bold text-white">
  Subscribe to the <span class="heading-accent">update newsletters</span>
</h2>
```

On dark backgrounds (e.g. `bg-navy-900`, hero), `.heading-accent` uses the accessible aqua tone; on light backgrounds it uses aqua-50.

## Borders

For dividers or framed content:

- **Thickness:** 4pt.
- **Colours:** `#FF5722` (Orange) or `#00BCD4` (Turquoise).

Use one of these two colours only; avoid other border colours for brand elements.

## Photoshop: CI background images

For a consistent CI background style in Photoshop (e.g. hero images with gradient):

1. Add a **gradient fill layer** (e.g. on the bottom right or as needed).
2. **Gradient colours:** From `#00BCD4` to `#0B2649` (double-click the colour stops and enter the HEX values).
3. **Colour stops:** Set each stop to **93% opacity**. Locations 0 and 100.
4. **Layer opacity:** Set the gradient fill layer itself to **70%** opacity.

This matches the overlay described in “Background overlay” and keeps print/digital assets aligned.

## Install page style

Used on [install.regenfass.eu](https://install.regenfass.eu/) and available for installer, docs, or optional sub-pages that should share the same visual language. All patterns use the Regenfass palette (navy, aqua/turquoise, fuchsia).

### When to use

- Installer or “Get started” flows.
- Documentation or product sub-pages that should feel consistent with the web installer.

### Components and classes

| Element | Class(es) | Notes |
|--------|-----------|--------|
| **Gradient title** | `.gradient-text-title` | Main headings: navy → aqua-tint gradient, clipped to text. |
| **Gradient accent** | `.gradient-text-accent` | Inline highlights: aqua gradient. |
| **Section indicator** | `.section-indicator` + `.section-indicator-ping` | Small aqua dot; add the ping class for animation. |
| **Collapsible block** | `.card-install` or `.details-card` | Use on `<details>`. Light aqua-tint bg, navy-tinted shadow, chevron rotates on open. |
| **Primary button** | `.btn-install` or `.btn-gradient-primary` | Aqua gradient, navy text, focus ring. |
| **Page wrapper** | `.install-style-page` | Max width, padding, inset shadow. Add `.light` (navy-tint bg) or `.dark` (navy bg) for theme. |
| **Hero gradient title** | `.hero-gradient-title` | Add to the hero section (e.g. `<header class="hero-section hero-gradient-title">`) so the main heading uses the gradient title style. Best on a light or contrasting background. |

### CSS variables

- `--shadow-page-inset-light`: Inset shadow for light install-style pages (navy tint).
- `--shadow-page-inset-dark`: Inset shadow for dark install-style pages.

Defined in the brand app’s `app/styles.css` (`@theme` and `@layer components`). Typography uses the system UI stack; colour and layout patterns are aligned with the install page.

## Related

- [COLOR_PALETTE.md](COLOR_PALETTE.md) – Brand colours (HEX, RGB, Pantone).
- [TYPOGRAPHY.md](TYPOGRAPHY.md) – Typeface and weights.
