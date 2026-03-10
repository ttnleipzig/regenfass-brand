# Typography Guidelines

## Type System

Typography is a key component of our visual identity. The Regenfass brand uses the **system UI font stack** for headings and body text. No external font loading (e.g. Google Fonts) is required.

## Primary typography: system UI stack

**Font stack** (headings and body):

```css
ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
```

- **Usage**: Headings, body text, and UI across the brand site.
- **Line height**: 1.4
- **Weights**: 400 (regular) for body, 600 (semibold) for headings and emphasis.

### CSS variables (in `app/styles.css`)

```css
--font-heading: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--font-body: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--line-height-body: 1.4;
```

## Type Scale

### Desktop/Web

```plaintext
H1: 48px / 3rem (Bold)
H2: 40px / 2.5rem (Bold)
H3: 32px / 2rem (Medium)
H4: 24px / 1.5rem (Medium)
H5: 20px / 1.25rem (Medium)
H6: 16px / 1rem (Medium)

Body Large: 18px / 1.125rem (Regular)
Body: 16px / 1rem (Regular)
Body Small: 14px / 0.875rem (Regular)
Caption: 12px / 0.75rem (Regular)
```

### Mobile

```plaintext
H1: 36px / 2.25rem (Bold)
H2: 32px / 2rem (Bold)
H3: 28px / 1.75rem (Medium)
H4: 20px / 1.25rem (Medium)
H5: 18px / 1.125rem (Medium)
H6: 16px / 1rem (Medium)

Body: 16px / 1rem (Regular)
Body Small: 14px / 0.875rem (Regular)
Caption: 12px / 0.75rem (Regular)
```

## Line Height

```plaintext
Headings and body: 1.4 (--line-height-body)
```

## Usage Guidelines

### Headings

- Use heading hierarchy (H1 → H2 → H3, etc.) semantically
- H1 should appear once per page/document
- Don't skip heading levels
- Use semibold (600) for primary headings
- Keep headings concise and clear

### Body Text

- Use 16px as the base font size for readability
- Maintain comfortable line length (45–75 characters per line)
- Line height 1.4 for consistent readability
- Align text left for better readability (avoid justified text in digital)

### Emphasis

- **Bold (600)**: Use for strong emphasis
- *Italic*: Use for subtle emphasis or citations
- Avoid underlining except for links
- Don't use all caps for large blocks of text

## Accessibility

- Minimum font size: 16px for body text
- Ensure sufficient color contrast (see Color Palette)
- Use relative units (rem, em) for better scaling
- Test readability with screen readers
- Maintain clear visual hierarchy

## Optional font files

Optional font files (e.g. for PDF or print) may be stored in `assets/fonts/`. The brand site does not load them by default. See [FONT_LICENSES.md](../FONT_LICENSES.md) for any third-party font licenses.
