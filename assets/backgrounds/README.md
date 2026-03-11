# Backgrounds

Brand background assets for Regenfass.

## Waterline (email footer)

- **waterline-strip.svg** – Single-tile strip (1024×56): wave + water on white background, no transparent gaps. Building block for the wide version.
- **waterline-strip-wide.svg** – Wide strip (3072×56) with the wave repeated 3× horizontally. Used in the standard email footer so the waterline repeats without relying on CSS `repeat-x` (which many email clients ignore). Rendered as one image at `width: 100%`.
- **waterline-strip.png** (1024×56) and **waterline-strip-wide.png** (3072×56) – PNG exports for email clients that prefer PNG over SVG. Generate both with:

  ```bash
  pnpm run generate:waterline-strip-png
  ```
