# About page enhancements

## Direction

Preserve the compact editorial reading experience, factual copy, legacy anchors,
and cream/amber/ultramarine palette. No additional image assets are needed.

## Implementation

1. Place each existing assignment specialty beside its date on desktop and above
   the assignment title on mobile.
2. Add two compact SVG workflow illustrations: intake/backend/document generation
   and invoice-row matching. Label these as illustrations, not product captures.
3. Animate the diagrams once per page initialization on desktop: a connector trace,
   with a short row-alignment prelude for matching. Maximum sequence: 700ms.
   Keep the surrounding text and diagram geometry visible. Mobile, reduced-motion,
   and no-JavaScript versions use completed static diagrams.
4. Emphasize the existing foundation/range sentence without rewriting the biography.
5. Give the contact action a cream stamp and hard offset, with a 120ms press
   response and retained keyboard focus/color feedback.

## Validation

Run Astro check and production build. Inspect desktop and mobile together; verify
natural scrolling, legacy anchors, route re-entry, reduced motion, no JavaScript,
and the contact link. Keep animations within the existing GSAP cleanup lifecycle.

## Completed validation

- `pnpm astro check`: zero errors and warnings; one existing Layout script hint.
- `pnpm build`: passed.
- Browser checks passed at 1440px and 390px, with reduced motion and without
  JavaScript. Confirmed two completed diagrams, five specialty captions, all six
  legacy project IDs, no horizontal overflow, keyboard contact navigation, route
  re-entry, and a direct project anchor. No browser runtime errors.
- Inspected desktop and mobile screenshots of the introduction, diagrams, and
  closing invitation. Captures are in `.impeccable/review/about-enhancements/`.
