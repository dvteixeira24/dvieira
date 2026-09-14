---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/about/index.astro","src/pages/contact/index.astro","src/layouts/Layout.astro","src/components/Navigation.astro","src/components/HeroModes.astro","src/lib/hero-modes.ts"]
---

# Homepage redesign

## Scope and mode

Experience mode. Primary target is the homepage; About, contact, shared layout, and navigation inherit the same world.

## Audience, job, and action

Prospective freelance clients should understand Daniel’s problem-solving approach, see credible evidence across frontend, backend, QA, and reliability, then start a project conversation. Preserve all factual experience and the working contact pipeline.

## Chosen concept

Variable Engineer / Systems Sequence. Approved comp: `.impeccable/mocks/variable-engineer-03.png`. The memorable moment is a four-line statement whose discipline noun, font treatment, process cues, and evidence change together as the active engineering mode changes. “Same approach.” and the row geometry remain stable.

## Direction contract

THESIS: Different systems require different interventions, but Daniel’s reasoning remains consistent. Refuse the standard portrait hero followed by skill cards.

OWN-WORLD: Near-white stock, dense black type, one electric ultramarine signal, registration marks, hairline rules, axis labels, and squared typographic controls.

STORY: Meet Daniel, understand the four-mode approach, inspect selected interventions as problem-to-outcome narratives, then make contact.

FIRST VIEWPORT: The shared navigation frames “Different interfaces. Same approach.” across four lines in the initial Frontend state. The four-role selector and Pause cycle control run above; the active role’s explanation, capabilities, and linked assignment sit at right on desktop. Start a project anchors the lower-right.

FORM: Interactive variable-font specimen, chosen challenger from position four of the grounded/candidate field; seed `a5bc24f5`.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Approved heritage bridge

The 2026 proof-sheet structure remains primary. Restore the old site's personal material layer through Newsreader as the human voice, warm amber and cream for identity and contact, the original grayscale portrait, selective use of the charcoal photographic texture, tactile navigation, and warm paper inserts. Blue remains the system/state signal; amber means person, invitation, and connection. Do not restore the old card-everything layout, global texture, or glass container. Desktop keeps the identity rail; mobile may reinterpret the original amber dock.

## Responsive hero refinement

The hero uses flow layout in three states: mobile through 760px with a two-by-two mode selector and stacked explanation, tablet from 761–1200px with a full-width specimen and two-column explanation below, and desktop from 1201px with a separate explanation track. Semantic process cues replace the Wdth readouts in reserved caption space beneath each word: left-aligned from 761px, including Backend’s word inset, to clear the role loom; mobile keeps its bottom-right placement. Headline size follows its container. All roles share four stable line heights, and overlapping panels reserve the tallest explanation’s space, so mode changes do not move the footer. All four modes and their transitions must fit without clipping.


## Homepage animation pass

Three effects approved for implementation: a one-time hero line-mask reveal,
scroll-driven progress through Define / Explore / Build / Deploy, and restrained
portrait depth. The hero is the focal moment; timeline progress explains sequence;
portrait movement adds a small tactile response. No added scroll pinning or
continuous effects. Keep all four engineering modes functional, preserve user
readout offsets and section spacing, and support touch, keyboard, reduced motion,
no JavaScript, and Astro route cleanup.


## Role loom extension

A fine Signal Ultramarine WebGL thread field sits behind the readable hero
statement and changes with the existing five-second engineering-mode selector.
Frontend is a responsive surface, Backend forms braided channels, QA becomes a
tension mesh, and Reliability closes into a loop. The field is supporting
systems evidence: preserve the proof-sheet composition, headline contrast, mode
controls, and reasoning copy above it.

Cap device-pixel ratio and pause drawing while the hero is offscreen or the
document is hidden. Reduced motion renders the selected role state immediately
without ambient movement. If WebGL is unavailable, hide the field and retain the
complete hero. Reinitialize and dispose observers, animation frames, shaders,
buffers, and listeners across Astro client navigation.

## About consolidation

The experience action now reads “View experience” and targets `/about#experience`.
About replaces Biography and Experience in shared navigation. Its Read surface
is recorded in `src-pages-about-index-astro.md`; preserve the homepage approach
and motion when updating shared components.

## Hero field motion refinement

The role loom now moves continuously through larger traveling surface waves,
rotating braids, moving mesh ripples, and an undulating reliability loop. A wider
three-axis sway makes depth visible between mode changes. Preserve the existing
ultramarine opacity, headline layering, geometry budget, and 1.2-second morph.
Reduced motion freezes ambient motion; offscreen and hidden states pause drawing.

## Bold ink and moving paper refinement

The fine background thread field is superseded by 33 depth-weighted triangle
ribbons, reduced to 17 on phones. Difference blending crosses the display headline
in blue-on-blush and amber-on-ink, with controls and supporting copy above it.
The existing role shapes, responsive composition, and 1.2-second morph remain.
A low-contrast, deterministically generated marbled fiber canvas sits underneath;
its 48-second drift is desktop-only. Static reduced-motion states and offscreen
pausing apply to both layers. Display and navigation text are non-selectable;
biography, contact information, and editable fields retain selection.


## Four discipline states

This homepage extension stays within the blush drafting paper, blue system signal,
and Anybody / Newsreader world. Backend deliberately adds self-hosted Fragment
Mono only for its headline and process annotations; it does not change global
body, navigation, or editorial typography. `src/lib/hero-modes.ts` is the content
source and `HeroModes.astro` owns the state controller.

| Mode | Discipline noun | Type and visual treatment | Process cues | Explanation and evidence |
| --- | --- | --- | --- | --- |
| Frontend | interfaces. | Expressive Anybody widths and weights, italic “Same,” fine layout rules | Layout / Hierarchy / Interaction / Feedback | Make complexity clear: readable data interfaces and realtime updates; investment research platform at `/about#project-02`. |
| Backend | services. | Lowercase Fragment Mono, numbered rows, dashed routing rules, alternating blue lines | Request / Validate / Transform / Deliver | Connect the moving parts: services, integrations, and document workflows; property appraisal platform at `/about#project-06`. |
| QA | scenarios. | Uniform upright Anybody, inspection rules, open squares, corner marks | Inputs / Boundaries / Journeys / Regression | Question every assumption: manual regression and automated journeys before release; automation and reliability at `/about#project-03`. |
| Reliability | conditions. | Heavy Anybody, blue “Same approach.”, continuous rules, quiet signal dots | Observe / Diagnose / Recover / Improve | Keep the whole system in view: Sentry, uptime and delivery monitoring, and production feedback; automation and reliability at `/about#project-03`. |

Open QA squares and Reliability dots are illustrative marks, not test results or
live status. Preserve the existing RoleLoom geometry and renderer; the shared
`.home[data-mode]` coordinates it with the headline and explanation.

Rotate every five seconds only while the hero is visible and idle. Pause cycle /
Resume cycle explicitly controls playback. Role selection and keyboard focus hold
the current state until resumed; mouse hover temporarily suspends the cycle.
Offscreen and hidden-document states suspend it. Reduced motion starts on a static
Frontend state and removes typography transitions while retaining manual mode
selection and explicit resume. Without JavaScript, the full Frontend explanation
and evidence remain available and mode buttons stay disabled.

Pressed buttons identify the selected role and control its explanation panel.
Only that panel is visible and accessible; automatic changes use no live region.
Keep fixed headline row heights and reserve the tallest panel at each breakpoint.
Initialize through `astro:page-load`; dispose the interval, intersection observer,
and event listeners before an Astro page swap or reinitialization. Research and
implementation rationale remain in `docs/hero-modes.md`.
