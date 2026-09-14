---
name: Daniel Vieira Teixeira Portfolio
description: An editorial systems portfolio where engineering precision meets a warm, personal material signature.
colors:
  signal-ultramarine: "#244bd8"
  signal-soft: "#dce3ff"
  paper-blush: "#f7eae8"
  paper-deep: "#e8e5de"
  registration-ink: "#0c0d0d"
  working-gray: "#5f5f5f"
  rule-gray: "#b0b0ad"
  heritage-amber: "#ffc078"
  heritage-amber-ink: "#884000"
  heritage-cream: "#fff4e6"
  heritage-charcoal: "#141414"
  heritage-rule: "#5d554c"
  error-red: "#bb271a"
  success-green: "#175b3b"
typography:
  display:
    fontFamily: "Anybody, Arial Narrow, sans-serif"
    fontSize: "clamp(4.5rem, 9.7vw, 11rem)"
    fontWeight: 330
    lineHeight: 0.79
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 74, 'wght' 330"
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
    textColor: "{colors.signal-ultramarine}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 0 0.8rem"
  action-tactile:
    backgroundColor: "{colors.heritage-amber}"
    textColor: "{colors.registration-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.1rem 0.85rem"
  field-editorial:
    backgroundColor: "{colors.heritage-cream}"
    textColor: "{colors.registration-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.6rem 0 1.2rem"
  tag-paper:
    backgroundColor: "{colors.heritage-cream}"
    textColor: "{colors.registration-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.45rem 0.65rem 0.35rem"
---

# Design System: Daniel Vieira Teixeira Portfolio

## Overview

**Creative North Star: "The Human Systems Proof Sheet"**

The portfolio is a precise editorial artifact from an engineering studio: warm proofing stock, dense type, registration marks, axis labels, and hairline rules. Its systems layer makes Daniel's reasoning legible; its restored heritage layer makes the work feel personal and authored.

Anybody is the engineering instrument. Newsreader is a limited human countervoice. The original grayscale portrait, warm cream paper, amber invitations, and charcoal photographic texture appear selectively at identity and contact moments rather than becoming a global theme.

**Key Characteristics:**

- Paper Blush and Registration Ink form the persistent systems canvas.
- Signal Ultramarine marks system state; Heritage Amber marks person, invitation, and connection.
- Anybody carries engineering structure; Newsreader supplies human and editorial emphasis.
- Portrait, texture, cream inserts, and tactile offsets are deliberate identity moments.
- Wide layouts are asymmetric and measured; small screens become direct stacks with an amber bottom dock.

## Colors

The palette separates machine logic from human invitation.

### Primary

- **Signal Ultramarine:** Active engineering modes, focus, state, technical emphasis, and structural progress.
- **Signal Soft:** Pale companion for quiet system feedback.

### Secondary

- **Heritage Amber:** Tactile fills, portrait offsets, navigation state, and accents on dark surfaces.
- **Heritage Amber Ink:** Accessible amber-colored text on Paper Blush and Heritage Cream.

### Tertiary

- **Heritage Cream:** Warm navigation, biography, contact, and paper-insert surfaces.
- **Heritage Charcoal:** Base for selective textured identity and contact fields.
- **Heritage Rule:** Warm divider where gray would feel too technical.

### Neutral

- **Paper Blush:** Default page and control canvas.
- **Paper Deep:** Secondary paper tone.
- **Registration Ink:** Primary text, strongest rules, and inverse systems fields.
- **Working Gray:** Supporting copy and axis notation.
- **Rule Gray:** Hairline borders and measurement guides.

### Named Rules

**The Two-Signal Rule.** Ultramarine encodes systems and state. Amber encodes person, invitation, and connection. Do not swap their jobs.

## Typography

**Display Font:** Anybody with Arial Narrow and sans-serif fallbacks  
**Body Font:** Anybody with system-ui and sans-serif fallbacks  
**Human / Editorial Font:** Newsreader with Georgia and serif fallbacks  
**Label Font:** Anybody

**Character:** Anybody feels engineered through variable width and weight. Newsreader introduces warmth and biography without softening the surrounding technical precision.

### Hierarchy

- **Display:** Large variable Anybody for route heroes and the systems specimen.
- **Headline:** Condensed Anybody for major section transitions.
- **Editorial title:** Newsreader for project names, personal emphasis, and biography or contact moments.
- **Body:** Readable Anybody for narrative evidence and explanation.
- **Label:** Compact uppercase Anybody for indices, coordinates, and controls.

### Named Rules

**The Two-Voice Rule.** Anybody explains the system; Newsreader reveals the person. Keep Newsreader sparse enough that the distinction remains meaningful.

## Layout

Desktop pages reserve a fixed cream navigation rail on the left. Content begins after that rail and uses a consistent fluid gutter. Large type occupies the dominant field while metadata, evidence, and actions sit in narrower aligned columns.

At 760px and below, the rail becomes a fixed amber bottom dock, with no top bar. Route grids collapse into direct reading stacks, the body gains safe bottom padding, and nonessential measurement annotations may disappear. About uses a compact identity/description introduction followed by a Defijn employment summary and a vertical assignment timeline. Dates occupy a narrow column on desktop and move above assignment titles at 760px and below. On Home, selected project evidence is folded into the dark approach sequence instead of repeated in a separate index. Horizontal scrolling is allowed only for deliberately linear controls such as the engineering mode strip and method sequence. Primary controls and navigation links preserve a minimum 44 × 44px interaction area.

**The Editorial Grid Rule.** Asymmetry must remain aligned to shared rules and columns; it should feel measured, never accidental.

## Elevation & Depth

The system is flat by default. Depth comes from paper-versus-ink inversion, one-pixel rules, fixed navigation, and selective charcoal texture. Hard offset shadows are a narrow heritage exception for controls and identity objects that should feel physically handled.

### Shadow Vocabulary

- **Tactile small:** Three- to four-pixel hard offsets on compact navigation and social stamps.
- **Tactile medium:** Five- to eight-pixel hard offsets on portrait medallions, warm contact cards, and primary amber actions.

### Named Rules

**The Tactile Exception Rule.** Never apply offset shadows to ordinary content rows or ambient surfaces.

## Shapes

Controls, fields, tags, rows, and inverse panels are square with zero radius. Borders are normally one-pixel hairlines. Circles are reserved for system-state dots, timeline nodes, registration marks, and the grayscale portrait medallion.

## Components

### Buttons and action links

- **System action:** Transparent, blue, square, and underlined; use for technical or structural navigation.
- **Tactile action:** Amber fill, ink text, square corners, and a hard ink offset; use for contact and invitation.
- **Hover / Focus:** Use short positional or color feedback and retain the global visible blue focus outline.

### Inputs and fields

- **Style:** Oversized square fields on a Heritage Cream paper insert with strong ink underlines.
- **Focus:** Shift the underline to Signal Ultramarine and retain a visible outline.
- **Error:** Use Error Red plus explicit field text; never rely on color alone.

### Tags

- **Style:** Compact square paper labels with tracked uppercase Anybody.

### Navigation

- **Desktop:** Fixed Heritage Cream rail containing only Home, About, and Contact links. Amber identifies hover and current route.
- **Mobile:** A fixed three-link Heritage Amber bottom dock (Home, About, Contact), with no top bar or reserved top space. The current route becomes a cream paper insert.

### Indexed narrative rows

Use metadata, a large premise, and problem-to-intervention evidence separated by space and hairlines, not generic filled cards. Warm cream may appear on hover.

### Inverse mode panels

Use Heritage Charcoal with the original texture, cream copy, and visible grid borders. Blue remains the system-state response.

### Variable-type specimen

The stable phrase changes Anybody width and weight in response to an explicit engineering mode. Preserve readable semantics and reduced-motion behavior.

### Portrait medallion

Use the original portrait in grayscale, circularly cropped with a cream rim and amber hard offset. It anchors identity; it does not replace the reasoning-led hero.

### Warm contact card

Place the functional form on a square Heritage Cream insert over a textured charcoal field. Preserve the existing contact pipeline and visible validation states.

## Do's and Don'ts

### Do:

- Do use Ultramarine for system state and technical focus.
- Do use Amber and Cream for person, invitation, connection, and tactile contact.
- Do build engineering hierarchy with Anybody and reserve Newsreader for the human countervoice.
- Do keep texture selective and preserve accessible contrast.
- Do maintain visible keyboard focus, reduced motion, and direct mobile reading order.
- Do keep primary interactive targets at least 44px in both dimensions.

### Don't:

- Don't turn the portfolio back into a centered portrait hero or generic skill-card grid.
- Don't add rounded containers, pills, gradients, glass effects, or ambient soft shadows.
- Don't apply texture globally or offset shadows to ordinary content surfaces.
- Don't swap the semantic jobs of blue and amber.
- Don't hide essential content or contact actions behind animation or pointer-only interaction.


## Homepage motion

The homepage has three authored effects: a brief horizontal mask reveal across
its four headline words on the first home visit in a client session; an
ultramarine timeline rule and milestone fills driven by natural page scrolling;
and a portrait tilt limited to five degrees and two pixels of travel on a fine
mouse pointer. The portrait frame and caption remain stationary.

The headline settles within 770ms. Returning to Home or changing motion
preferences does not replay the entrance. Font-mode controls retain their
existing width/weight transitions. Width readouts clamp to the specimen edge;
mobile readouts use the reserved caption space to clear the widest words. The timeline keeps its four descriptions
visible and uses a native, keyboard-focusable horizontal scroller when narrow.
It is excluded from the shared fade-and-rise reveal observer.

Reduced motion shows the headline and completed timeline immediately and removes
portrait movement. Default HTML/CSS remains readable without JavaScript. GSAP
lives in the homepage's bundled client script, initializes on `astro:page-load`,
and reverts its contexts, ScrollTriggers, and pointer listeners on
`astro:before-swap`. Media-query changes clean up and reconfigure effects.


## About and experience

About at `/about` combines the retained three-paragraph biography description
with one Defijn employment summary and five assignments, newest start first.
The cream introduction keeps a supporting grayscale portrait and an Experience
jump link. The professional record uses visible dates, restrained timeline
markers, serif assignment titles, and expanded contribution lists. There are no
separate skills or principles panels. Essential About content uses no entrance
reveal; it remains immediately readable on direct and anchor navigation.

The desktop rail and mobile dock contain only Home, About, and Contact links.
The monogram, name, location, portrait, and mobile top bar have been removed. Existing legacy project anchors
remain stable, and `/biography` and `/experience` permanently redirect to About.


### About reading scale

The compact About surface uses a smaller reading scale than the homepage:

| Element | Size |
| --- | --- |
| About title | `clamp(3.5rem, 6vw, 6rem)` |
| Description heading | `clamp(2rem, 3.2vw, 3rem)` |
| Description body | `clamp(1rem, 1.25vw, 1.2rem)` |
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
an amber underline draws once per client session when the statement reaches the
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

The closing contact action is a static cream stamp on the amber footer, with a
four-pixel hard ink offset and color-only hover, focus, and active feedback.

### Hero role loom motion

The WebGL field uses 33 triangle ribbons (17 on phones), with screen-space widths
of 1.6–3.2 pixels according to depth. Traveling waves for Frontend, twisting braids
for Backend, stress ripples for QA, and an undulating Reliability loop retain the
1.2-second role morph. The field crosses the display headline with difference
blending: warm source ink reads as electric blue over blush and amber over black.
Controls, reasoning copy, and the hero footer sit above the field.

`HeroPaper.astro` bakes a deterministic, domain-warped marbled fiber texture once
per browser session. It sits beneath the hero at low contrast and drifts over
48 seconds on desktop. Phones and reduced-motion users see static paper. The
ribbon renderer stops scheduling frames offscreen or while hidden; reduced motion
redraws only for a role, size, or visibility change. Both components respect Astro
client navigation. No WebGL leaves the full hero and static paper available.

Display specimen text, navigation, mode controls, and decorative width readouts
are non-selectable. Biography, contact details, and form editing retain selection.
