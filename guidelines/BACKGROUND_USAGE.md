# Background Usage

## Overview

Regenfass wallpaper backgrounds use a repeating Tabler-style raindrop pattern. They are intended for brand surfaces that need a recognizable visual texture without becoming noisy or distracting.

Available variants:

- `assets/backgrounds/5.svg` – dark blue wallpaper
- `assets/backgrounds/5-dark.svg` – dark blue wallpaper optimized for dark-brand applications
- `assets/backgrounds/5-orange.svg` – orange wallpaper
- `assets/backgrounds/5-turquoise.svg` – turquoise wallpaper

## Recommended Use

Use these backgrounds for:

- avatar backplates
- hero sections
- social media backgrounds
- presentation title slides
- section headers and cover art

Use the dark blue variants when text or logos need maximum readability. Use orange and turquoise for campaign accents, promo assets, or theme-based variants.

## Color Rules

- `darkBlue` is the default brand wallpaper.
- `orange` is for high-energy accent moments, not for every page.
- `turquoise` is for lighter, more technical, or innovation-focused touchpoints.
- Keep one wallpaper color dominant per surface.
- Do not mix multiple wallpaper colors in the same component unless the asset is explicitly designed for that.

## Composition Rules

- Keep the wallpaper behind content, not on top of it.
- Preserve enough empty space around logos and headings.
- If text sits directly on the wallpaper, use a dark overlay or solid container where needed.
- Do not stretch the pattern non-proportionally.
- Prefer cover/crop behavior over distortion.

## Contrast And Accessibility

- Verify text contrast before shipping.
- On dark blue wallpapers, prefer white text or the light horizontal logo.
- On orange and turquoise wallpapers, check logo contrast carefully and switch to a dark or white variant as needed.
- For long-form reading areas, place content on solid panels instead of directly on the pattern.

## Do

- Use the wallpaper as a recognisable background texture.
- Reuse the official SVG assets instead of recreating the pattern manually.
- Scale the wallpaper proportionally.
- Keep the pattern subtle so portraits, logos, and headings stay primary.

## Do Not

- recolor the pattern ad hoc
- add shadows, bevels, or 3D effects to the droplets
- animate the wallpaper in standard brand usage
- place dense body copy directly on top of the texture
- combine the wallpaper with unrelated illustration styles

## Implementation Notes

- Preferred format: SVG
- The pattern is tile-based and repeatable like wallpaper.
- Raster exports should be generated from the official SVG source.
- If a generator references a wallpaper asset, keep the path stable and update docs when adding a new variant.
