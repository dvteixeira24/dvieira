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

Desktop pages reserve a fixed cream identity rail on the left. Content begins after that rail and uses a consistent fluid gutter. Large type occupies the dominant field while metadata, evidence, and actions sit in narrower aligned columns.

At 760px and below, the rail becomes a compact cream monogram bar and a fixed amber bottom dock. Route grids collapse into direct reading stacks, the body gains safe bottom padding, and nonessential measurement annotations may disappear. The Experience project grid stays compact through 1100px; desktop grids return only once their minimum tracks fit without overflow. On Home, selected project evidence is folded into the dark approach sequence instead of repeated in a separate index. Horizontal scrolling is allowed only for deliberately linear controls such as the engineering mode strip and method sequence. Primary controls and navigation links preserve a minimum 44 × 44px interaction area.

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

- **Desktop:** Fixed Heritage Cream rail with monogram, Newsreader identity copy, vertical links, and a grayscale portrait anchor. Amber identifies hover and current route.
- **Mobile:** Compact cream monogram bar plus a fixed four-link Heritage Amber bottom dock. The current route becomes a cream paper insert.

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
