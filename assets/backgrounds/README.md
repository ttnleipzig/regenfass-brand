# Backgrounds

Brand background assets for Regenfass.

## Waterline (email footer)

- **waterline-strip.svg** – Single-tile strip (1024×56): wave + water on white background, no transparent gaps. Building block for the wide version.
- **waterline-strip-wide.svg** – Wide strip (3072×56) with the wave repeated 3× horizontally. Used in the standard email footer so the waterline repeats without relying on CSS `repeat-x` (which many email clients ignore). Rendered as one image at `width: 100%`.
- **waterline-strip.png** – PNG of the single tile for clients that need PNG. Generate with `pnpm run generate:waterline-strip-png`.
