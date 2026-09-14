---
version: 1
slug: "src-pages-about-index-astro"
primary_target: "src/pages/about/index.astro"
related_targets: ["src/pages/index.astro","src/components/Navigation.astro","src/layouts/Layout.astro","astro.config.mjs"]
---

# About Daniel

## Scope and mode

Read mode within the existing Human Systems Proof Sheet world. Prospective
clients should understand Daniel's background, inspect his professional record,
and start a conversation. Approved brief: `docs/plans/about-page-restructure.md`.

## Content and hierarchy

Compact cream introduction: About Daniel, original portrait, name/title/location,
the three retained description paragraphs, and a View experience anchor.
Experience follows as the main body: one Defijn role (2021 — Present), then five
assignments in reverse start-date order. Daniel confirmed all five were through
Defijn. Preserve all existing roles, dates, premises, contribution bullets, tags,
and legacy project IDs. Close with one contact invitation.

## Layout and behavior

Desktop uses separate identity and description columns, then a vertical timeline
with dates beside expanded assignment content. Mobile uses a direct stack, dates
above titles, modest timeline markers, and modest anchor spacing above headings.
No tabs, filters, accordions, or content entrance animation. Keep native list semantics,
visible keyboard focus, reduced-motion support, and reading without JavaScript.

## Visual authority

Reuse Anybody for structure, Newsreader for personal and assignment titles,
cream/paper surfaces, amber identity accents, and ultramarine focus. Keep the
portrait supporting rather than dominant. The timeline carries the page's weight.

## Routes

Home / About / Contact. Old Biography and Experience routes permanently redirect
to About. New experience links point to `/about#experience`; legacy `project-01`
through `project-06` and `story-title` anchors remain valid on About.


## Final navigation refinement

Both desktop rail and mobile dock contain only Home, About, and Contact. Remove
all rail identity content and the mobile top bar; do not reserve empty top space.
The portrait, name, and location in the About page content remain intact.

## Motion refinement

The foundation/range statement receives the page's only authored animation: an
amber underline draws once per client session when it reaches the reading area.
The portrait, name, Experience heading, timeline, markers, diagrams, action
arrows, and contact stamp remain static. Reduced-motion and no-JavaScript paths
show the completed underline and preserve all content and legacy anchors.


### About assignment illustrations and contact detail

Assignment specialty captions sit with the date in the desktop margin and above
assignment titles on mobile. The integration and invoice assignments include
compact SVG workflow illustrations from `AssignmentDiagram.astro`; their captions
explicitly identify them as illustrations. The diagrams remain static at every
viewport and motion preference.

The closing contact action is a static cream stamp on the amber footer, with a
four-pixel hard ink offset and color-only hover, focus, and active feedback.
