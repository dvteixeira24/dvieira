---
name: Daniel Vieira Teixeira Portfolio
description: A printed proof sheet where engineering precision is set in ink on textured newsprint.
colors:
  newsprint: "#f6f1e5"
  newsprint-deep: "#e9e2d3"
  stock: "#fbf7ec"
  ink: "#0a0a09"
  working-gray: "#55524a"
  rule-gray: "#b6b0a1"
  rule-ink: "#6e6a5e"
  spot-ultramarine: "#1f3ccc"
  spot-soft: "#dbe1ff"
  spot-on-dark: "#93a7ff"
  press-black: "#121211"
  rule-on-dark: "#565655"
  copy-on-dark: "#d0cbc3"
  error-red: "#b02418"
  success-green: "#16583a"
typography:
  display:
    fontFamily: "Anybody, Arial Narrow, sans-serif"
    fontSize: "clamp(4.5rem, 9.7vw, 11rem)"
    fontWeight: 330
    lineHeight: 0.79
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 74, 'wght' 330"
  home-backend-display:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "min(11.5cqw, 8rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Anybody, Arial Narrow, sans-serif"
    fontSize: "clamp(3.8rem, 7.2vw, 8.4rem)"
    fontWeight: 320
    lineHeight: 0.82
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 74, 'wght' 320"
  editorial-title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2rem, 3.6vw, 4.2rem)"
    fontWeight: 670
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  reading:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.12rem, 1.3vw, 1.28rem)"
    fontWeight: 420
    lineHeight: 1.7
  body:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.35vw, 1.35rem)"
    fontWeight: 370
    lineHeight: 1.45
    fontVariation: "'wdth' 82, 'wght' 370"
  label:
    fontFamily: "Anybody, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "0.16em"
    fontVariation: "'wdth' 76, 'wght' 650"
rounded:
  none: "0px"
  circle: "50%"
spacing:
  compact: "0.5rem"
  control-y: "1rem"
  page-gutter: "clamp(1.25rem, 2.5vw, 2.75rem)"
  touch-target: "2.75rem"
  section-block: "clamp(5rem, 10vw, 10rem)"
components:
  action-system:
    backgroundColor: "transparent"
    textColor: "{colors.spot-ultramarine}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 0 0.8rem"
  action-printed:
    backgroundColor: "{colors.spot-ultramarine}"
    textColor: "{colors.stock}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.1rem 0.85rem"
  field-printed:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0 0.9rem"
  tag-paper:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.45rem 0.65rem 0.35rem"
  portrait-plate:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.editorial-title}"
    rounded: "{rounded.none}"
    padding: "0"
---

# Design System: Daniel Vieira Teixeira Portfolio

## Overview

**Creative North Star: "The Printed Proof Sheet"**

The portfolio is a press proof from an engineering studio: newsprint stock, halftone ink, hairline rules, registration marks, and dense type. Its systems layer makes Daniel's reasoning legible; its printed layer makes the work feel authored rather than templated.

Anybody is the engineering instrument. Newsreader is the reading voice. The halftone portrait is the only photograph on the site and the only place where ink is anything but solid: it is a plate, not a medallion. Ultramarine is a single spot colour, used for system state and the second impression of the plate.

**Key Characteristics:**

- Newsprint stock and press black form the persistent canvas; the paper carries a fine grain at a fixed scale.
- Spot ultramarine marks system state; it is the only accent colour in the interface.
- Anybody carries engineering structure; Newsreader carries reading copy and the person.
- The halftone portrait appears as a square plate on Home, About, and Contact, with a misregistered second impression.
- Wide layouts are asymmetric and measured; small screens become direct stacks with an ink bottom dock and a printed masthead.

## Colors

The palette is a press run: one paper, one ink, one spot colour.

### Primary

- **Spot Ultramarine:** Active modes, focus, links, system state, and the plate's misregistration.
- **Spot Soft:** Pale companion for quiet feedback on stock.
- **Spot On Dark:** The ultramarine adjusted for ink surfaces; use it for small text and rules on press black.

### Secondary

- **Stock:** Raised paper inserts — navigation rail, the contact card, the About introduction.
- **Press Black:** Inverse bands, the contact field, code blocks, and the closing invitation.

### Neutral

- **Newsprint:** Default page canvas, carrying the fine paper grain.
- **Newsprint Deep:** Secondary paper tone.
- **Ink:** Primary text, strongest rules, and inverse systems fields.
- **Working Gray:** Supporting copy and axis notation.
- **Rule Gray / Rule Ink:** Hairline borders and measurement guides; Rule Ink for tags and diagram detail.
- **Rule On Dark / Copy On Dark:** Divider and supporting-copy tones for Press Black surfaces.

### Named Rules

**The Single Spot Rule.** Ultramarine is the only accent in the interface. It encodes state, focus, and the plate's second impression. Nothing else is allowed to become a second accent.

**The No Sepia Rule.** Warmth comes from the paper and the halftone; never tint the interface brown, kraft, or sepia, and never apply a global texture that reads as grime.

## Typography

**Display Font:** Anybody with Arial Narrow and sans-serif fallbacks  
**Reading Font:** Newsreader with Georgia and serif fallbacks  
**UI / Body Font:** Anybody with system-ui and sans-serif fallbacks  
**Editorial Font:** Newsreader  
**Label Font:** Anybody

**Homepage Backend Exception:** Self-hosted Fragment Mono with monospace fallback, confined to the Backend headline and process annotations.

**Character:** Anybody feels engineered through variable width and weight. Newsreader is where the site is read: biography, post bodies, premises, and plate captions.

### Hierarchy

- **Display:** Large variable Anybody for route heroes and the systems specimen.
- **Headline:** Condensed Anybody for major section transitions.
- **Editorial title:** Newsreader for project names, assignment titles, and plate captions.
- **Reading:** Newsreader for continuous prose — About biography, blog bodies, and introductions.
- **Body:** Anybody for short evidence lines, interface copy, and lists.
- **Label:** Compact uppercase Anybody for indices, coordinates, and controls.

### Named Rules

**The Reading Rule.** Anything the visitor reads continuously is set in Newsreader. Anything they scan, operate, or measure stays in Anybody.

**The Two-Voice Rule.** Anybody explains the system; Newsreader reveals the person. Keep the distinction visible — an inline Anybody run inside a serif paragraph is a deliberate signal, not a slip.

**The Backend Face Exception Rule.** Fragment Mono is confined to the homepage Backend headline and process annotations. Frontend, QA, and Reliability retain Anybody with distinct role-specific treatments; Newsreader keeps its established editorial role.

## Layout

Desktop pages reserve a fixed stock navigation rail on the left. Content begins after that rail and uses a consistent fluid gutter. Large type occupies the dominant field while metadata, evidence, and actions sit in narrower aligned columns.

At 760px and below, the rail becomes a fixed ink bottom dock, and Home opens with a printed masthead instead of a footer plate. Route grids collapse into direct reading stacks, the body gains safe bottom padding, and nonessential measurement annotations may disappear. About uses a compact identity/description introduction followed by a Defijn employment summary and a vertical assignment timeline. Dates occupy a narrow column on desktop and move above assignment titles at 760px and below. On Home, selected project evidence is folded into the dark approach sequence instead of repeated in a separate index. Horizontal scrolling is allowed only for deliberately linear controls such as the engineering mode strip and method sequence. Primary controls and navigation links preserve a minimum 44 × 44px interaction area.

**The Editorial Grid Rule.** Asymmetry must remain aligned to shared rules and columns; it should feel measured, never accidental.

**The Dock Clearance Rule.** Fixed bottom navigation must never end a page over content: the document keeps bottom padding for the dock, and a full-height hero moves its identity block above it.

## Elevation & Depth

The system is flat by default. Depth comes from paper-versus-ink inversion, one-pixel rules, fixed navigation, and the paper grain. Hard offset shadows are a printed register: a second impression of one object, not ambient depth.

### Shadow Vocabulary

- **Register small:** Three- to four-pixel hard offsets on compact navigation and social stamps.
- **Register medium:** Five- to eight-pixel hard offsets on the portrait plate, the contact card, and primary actions.

### Named Rules

**The Register Rule.** An offset exists to suggest a second pass through the press: it is either ink under stock or spot under ink. Never blur it, never apply it to ordinary content rows.

## Shapes

Controls, fields, tags, rows, and inverse panels are square with zero radius. Borders are normally one-pixel hairlines. Circles are reserved for system-state dots, timeline nodes, and registration marks. The portrait is a square plate.

## Texture

Two generated grains carry the material layer, both at a fixed physical scale so they never stretch with the viewport:

- **Paper grain:** black at 3.5% alpha, tiled at 256px over the newsprint canvas and stock inserts.
- **Ink grain:** white at 5% alpha, tiled at 256px over press-black surfaces, giving the dark bands a printed tooth without a photographic pattern.

A single scan, the ink pull, sits once on Contact at 12% behind the form. Use a scan only where it cannot tile and never behind body copy.

## Components

### Buttons and action links

- **System action:** Transparent, ultramarine, square, and underlined; use for technical or structural navigation.
- **Printed action:** Ultramarine fill, stock text, square corners, and an ink register offset; use for the single next step on a surface.
- **Hover / Focus:** Short positional or color feedback; retain the global visible ultramarine focus outline.

### Inputs and fields

- **Style:** Square fields on a stock insert with strong ink underlines. The typed value is set large; the placeholder is a small working note above the rule, never a display line.
- **Focus:** Shift the underline to ultramarine and retain a visible outline.
- **Error:** Use Error Red plus explicit field text; never rely on color alone.
- **Captcha:** Set the widget in its own paper well so its white frame does not flash against the ink field.

### Tags

- **Style:** Compact square labels with tracked uppercase Anybody, hairline Rule Ink border, and no fill.

### Navigation

- **Desktop:** Fixed Stock rail containing Home, About, Blog, and Contact links. The current route is an ink block with stock text and an ultramarine dot.
- **Mobile:** A fixed ink dock (Home, About, Blog, Contact) with stock text. The current route becomes a stock insert with ink text.

### Indexed narrative rows

Use metadata, a large premise, and problem-to-intervention evidence separated by space and hairlines, not generic filled cards. Stock may appear on hover.

### Inverse mode panels

Use Press Black with the white ink grain, stock copy, and visible grid borders. Ultramarine remains the system-state response; use Spot On Dark for small text and rules.

### Variable-type specimen

The homepage keeps “Different … Same approach.” across four stable rows while the discipline noun, typography, process cues, and evidence panel change together. Frontend uses expressive Anybody contrast; Backend uses lowercase Fragment Mono, numbered rows, and dashed routing rules; QA uses uniform upright Anybody and inspection marks; Reliability uses heavier Anybody, continuous rules, and decorative signal dots. The process cues describe the work instead of exposing font-width values.

`HeroModes.astro` controls these states from the authoritative content in `src/lib/hero-modes.ts`. Its shared home `data-mode` also drives the existing role loom. Reserve the tallest explanation panel and fixed row heights so rotation does not move surrounding content. The five-second cycle runs only while visible and idle: mouse hover temporarily suspends it; role selection or keyboard focus holds the current mode until Resume cycle. Reduced motion starts paused and removes type transitions; the complete Frontend state remains readable without JavaScript. Initialize on `astro:page-load` and dispose timers, observers, and listeners on `astro:before-swap`.

### Portrait plate

The halftone portrait is the only photograph on the site. It is a square plate — never a circle, never filtered, never on a stock chip — with a misregistered ultramarine impression offset horizontally behind it. The source is cut out with alpha, so the ink sits directly on the paper.

- **Home:** 56px masthead plate on phones, where the fixed dock would otherwise cover the hero footer. Desktop and tablet carry no portrait in the hero.
- **About:** 320–420px plate leading the introduction column, with the name, role, and location set under a hairline.
- **Blog post:** 48px byline plate beside the author line.

### Contact card

Place the functional form on a square Stock insert over the ink field. Preserve the existing contact pipeline and visible validation states. The contact surface is the one place a scanned ink pull appears, and it stays behind the form.

### Reading matter

Blog index rows, post bodies, and the About biography are reading surfaces: Newsreader, 62–66ch measure, 1.6–1.7 line height. A post opens with a Newsreader drop cap and a byline plate.

## Do's and Don'ts

### Do:

- Do use ultramarine for system state, focus, links, and the plate's second impression.
- Do use Newsreader for anything read continuously and Anybody for anything scanned or operated.
- Do keep the paper grain at its fixed 256px scale and the dark grain at low alpha.
- Do keep the portrait a square plate with a horizontal misregistration.
- Do maintain visible keyboard focus, reduced motion, and direct mobile reading order.
- Do keep primary interactive targets at least 44px in both dimensions.

### Don't:

- Don't introduce a second accent colour; warmth comes from the stock, not from amber.
- Don't turn the portfolio back into a centered portrait hero or generic skill-card grid.
- Don't add rounded containers, pills, gradients, glass effects, or soft ambient shadows.
- Don't stretch or tile photographic textures at viewport scale, and don't tint the site kraft or sepia.
- Don't apply texture behind body copy or put an offset shadow on ordinary content rows.
- Don't hide essential content or contact actions behind animation or pointer-only interaction.


## Homepage motion

The homepage has two authored effects: a brief horizontal mask reveal across
its four headline words on the first home visit in a client session, and an
ultramarine timeline rule with milestone fills driven by natural page scrolling.
The hero footer itself does not move.

The headline settles within 770ms. Returning to Home or changing motion
preferences does not replay the entrance. Font-mode controls retain their
existing width/weight transitions. Width readouts clamp to the specimen edge;
mobile readouts use the reserved caption space to clear the widest words. The timeline keeps its four descriptions
visible and uses a native, keyboard-focusable horizontal scroller when narrow.
It is excluded from the shared fade-and-rise reveal observer.

Reduced motion shows the headline and completed timeline immediately. Default
HTML/CSS remains readable without JavaScript. GSAP
lives in the homepage's bundled client script, initializes on `astro:page-load`,
and reverts its contexts, ScrollTriggers, and pointer listeners on
`astro:before-swap`. Media-query changes clean up and reconfigure effects.


## Thinking field

The homepage approach section carries a second, quieter print artefact: the
halftone portrait, screened into paper-coloured dots on press black and pinned
to the section's left edge for the length of its scroll. It is decorative
(`aria-hidden`, `pointer-events: none`) and never sits behind the reading
column: a right-hand mask clears it before the evidence list.

The pointer pushes nearby dots outward with a squared falloff and a little
inertia; they spring back with a damped overshoot. Phones, reduced motion, and
no-JavaScript get the static plate. The mask is a 29 KB 1-bit PNG in
`public/images/`, generated by `scripts/build-thinking-mask.mjs`. The client
resamples it onto a 2.8px halftone grid, draws the static plate once to an
offscreen canvas, and simulates only the dot subset inside the pointer well.
The layer stays at `z-index: -1` inside the section's isolated stacking context
so headings, rules, and links keep their contrast and hit areas.


## About and experience

About at `/about` combines the retained three-paragraph biography description
with one Defijn employment summary and five assignments, newest start first.
The stock introduction keeps a large halftone portrait plate and an Experience
jump link. The biography is set in Newsreader; the professional record uses
visible dates, restrained timeline markers, serif assignment titles, and
expanded contribution lists. There are no
separate skills or principles panels. Essential About content uses no entrance
reveal; it remains immediately readable on direct and anchor navigation.

The desktop rail and mobile dock contain Home, About, Blog, and Contact links.
There is no site-wide top bar; the mobile hero opens with a printed masthead
holding the portrait, name, and role. Existing legacy project anchors
remain stable, and `/biography` and `/experience` permanently redirect to About.


### About reading scale

The compact About surface uses a smaller reading scale than the homepage:

| Element | Size |
| --- | --- |
| About title | `clamp(3.5rem, 6vw, 6rem)` |
| Description heading | `clamp(2rem, 3.2vw, 3rem)` |
| Description body | `clamp(1.12rem, 1.25vw, 1.3rem)` Newsreader |
| Experience heading | `clamp(2.75rem, 5vw, 5rem)` |
| Employer title | `clamp(2.25rem, 3.5vw, 3.5rem)` |
| Assignment group | `clamp(1.35rem, 2vw, 1.75rem)` |
| Assignment title | `clamp(2rem, 3.1vw, 3rem)` |
| Assignment premise | `clamp(1.15rem, 1.55vw, 1.5rem)` |
| Role / contribution body | `1rem` |
| Dates / actions | `0.9rem` / `0.95rem` |
| Portrait name / details | `1.35rem` / `0.85rem` |
| Assignment mode / tags | `0.8rem` / `0.75rem` |
| Closing invitation | `clamp(1.5rem, 2.5vw, 2.5rem)` |

These deliberate surface sizes keep the biography compact and the expanded
experience easy to scan without inheriting oversized homepage display spacing.

### About motion

The foundation/range statement receives an authored animation:
an ultramarine underline draws once per client session when the statement reaches the
reading area. The sequence lasts 600ms and all text remains visible. The portrait,
name, Experience heading, timeline tracks, markers, action arrows, and contact
stamp remain static. Each selected assignment fades in and settles upward by
16px over 600ms with expo-out easing when its row reaches 85% of the viewport,
once per page visit. Dates and content arrive together. Already-visible rows and
restored deep links stay readable immediately; reduced motion and no JavaScript
show all assignment content without an entrance and the completed underline. The About script uses scoped GSAP contexts, media queries,
ScrollTrigger, and ClientRouter cleanup.


### About assignment illustrations and contact detail

Assignment specialty captions sit with the date in the desktop margin and above
assignment titles on mobile. The integration and invoice assignments include
compact SVG workflow illustrations from `AssignmentDiagram.astro`; their captions
explicitly identify them as illustrations. The diagrams have no internal motion;
they enter with their assignment content.

The closing contact action is a static stock stamp on the ink footer, with a
four-pixel ultramarine register offset and color-only hover, focus, and active feedback.

### Hero role loom motion

The WebGL field uses 33 triangle ribbons (17 on phones), with screen-space widths
of 1.6–3.2 pixels according to depth. Traveling waves for Frontend, twisting braids
for Backend, stress ripples for QA, and an undulating Reliability loop retain the
1.2-second role morph. The field crosses the display headline with difference
blending: warm source ink reads as electric blue over newsprint and ultramarine over black.
Controls, reasoning copy, and the hero footer sit above the field.

`HeroPaper.astro` provides static drafting paper on the newsprint base.
One-pixel-radius ink dots sit on a 32px grid at 12% opacity (28px
on phones). Elliptical masks clear the pattern behind the headline and role loom;
phones use one broad central clearing. Four 9px registration crosses sit at the
outer edges at 10% opacity, reduced to two on phones. The background has no canvas,
client script, or animation and remains visible without JavaScript.
The unchanged ribbon renderer stops scheduling frames offscreen or while hidden;
reduced motion redraws only for a role, size, or visibility change. No WebGL leaves
the full hero and drafting paper available.

Display specimen text, navigation, mode controls, and decorative width readouts
are non-selectable. Biography, contact details, and form editing retain selection.


## Hero caption spacing and type transitions

Process captions follow each word in normal flow with a 1rem desktop gap and
0.5rem mobile gap. Trim the word's cap-to-baseline text box, with a 0.2em allowance
for the descenders in “approach.”; mobile captions remain right-aligned. Desktop
QA dividers follow the readouts with the same 1rem gap above and below each caption,
rather than attaching to the reserved row bottom. All modes
reserve the same row height so switching cannot move the explanation or footer.

Mode changes use a 620ms GSAP transition with a restrained 35ms offset per row.
Matching faces interpolate their variable width and weight; changing words,
italics, and Fragment Mono use registered, scaled impressions with a short
crossfade. Temporary copies are hidden from accessibility and removed on completion.
Repeated selections settle the previous transition before starting the next;
resize, reduced motion, and Astro navigation clean up the motion context. No
additional animation dependency or permanent duplicate headline is introduced.


## Desktop hero height budget

Above 1200px, the full-width hero reserves vertical space for the mode controls,
caption bands, and profile/contact footer. Headline size is bounded by both its
container width and the viewport height, keeping the footer in the first screen
at standard desktop sizes. Compact outer gaps and padding support shorter laptop
windows; all four modes use identical row heights. The 3rem type-size floor lets
very short or enlarged-text windows scroll naturally rather than hiding content.
Tablet and mobile retain their existing stacked composition.
