# DV cut icon

The canonical mark is a condensed D opened by an ascending diagonal. The cut
suggests the V through negative space; the open counter keeps it readable at
16 px. The curved bowl retains a typographic character beside the site's
hard-edged editorial layout.

## Artwork

- `dv-cut-black.svg`: editable vector master, matching site ink (`#080909`).
- `dv-cut-cream.svg` and `dv-cut-blue.svg`: single-colour variants.
- `dv-cut-reversed.svg`: cream on ink, square avatar treatment.
- `dv-cut-master.pdf`: vector PDF, 512-point square, transparent background.
- `exploration.svg` / `exploration.png`: six related constructions and size proofs.
- `dv-cut-preview.png`: 512 px proof of the selected mark.

The SVGs contain closed paths, without fonts, linked resources, filters, or
external dependencies. Edit the canonical geometry in `scripts/generate-icons.mjs`
and run `pnpm exec node scripts/generate-icons.mjs` to regenerate every export.
The script uses Astro's existing Sharp dependency and does not run on the Worker.

## Application assets

`public/favicon.svg` switches from ink to cream with the browser's colour scheme.
PNG and ICO fallbacks use a flat paper background for contrast in either browser
theme. The ICO contains 16, 32, and 48 px bitmap entries. PNG proofs also include
24 and 64 px. Apple uses an opaque 180 px image; the manifest references opaque
192 and 512 px images plus a separate 512 px maskable asset. The shared layout
supplies these links on every content route. The manifest keeps browser display
mode; this update does not add offline behavior.

## Clear space

The master uses a 16-unit artboard with the mark inside a 12-unit square and
2 units of clear space on every side. Preserve that minimum clear space for
standalone use. The maskable export reduces the full artboard to 62.5% so the
entire mark fits inside the central safe circle. Let the operating system apply
its icon mask; do not bake rounded corners, shadows, or gradients into the art.

Recognition depends on silhouette, not accent colour. Reserve registration
marks and other fine detail for surrounding compositions rather than the icon.
