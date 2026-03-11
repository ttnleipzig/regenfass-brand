# Brand Fonts

The Regenfass brand uses the **system UI font stack** for headings and body text. No external font loading (e.g. Google Fonts) is required.

## Primary typography: system UI stack

**Font stack** (used for both headings and body in `app/styles.css`):

```css
ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
```

- **Usage**: Headings and body text across the brand site and implementations.
- **Line height**: 1.4
- **No licence required**: System and generic fonts only; no external font files needed for web.

### CSS variables (in `app/styles.css`)

```css
--font-heading: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--font-body: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--line-height-body: 1.4;
```

## Optional: font files in this directory

This directory can hold **optional** font files (e.g. for PDF generation, print, or projects that require a specific typeface). The brand site does not load them by default.

- If you add font files, use a structure like: `[font-family]/[weight]/[style].woff2` (or `.ttf`/`.otf` for PDF tools).
- Document any added fonts and their licences in the project’s [FONT_LICENSES.md](../../FONT_LICENSES.md).

## Typography guidelines

- **Headings and body**: Same system UI stack; use font-weight 400 for body, 600 for headings/emphasis.
- **Line height**: 1.4 for consistent readability.
- **Accessibility**: Prefer at least 16px for body text.

For full typography guidelines, see [guidelines/TYPOGRAPHY.md](../guidelines/TYPOGRAPHY.md) and [app/fundamentals/fonts.html](../../app/fundamentals/fonts.html).
