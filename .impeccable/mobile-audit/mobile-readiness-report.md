# Mobile-readiness audit

Date: 2026-09-13

## Scope

- Routes: Home, Biography, Experience, Contact
- 34 widths: 320, 360, 390, 430, 479, 480, 481, 519, 520, 521, 639, 640, 641, 759, 760, 761, 799, 800, 801, 859, 860, 861, 899, 900, 901, 979, 980, 981, 1024, 1070, 1071, 1072, 1180, 1181px
- 136 route-width states and 60 representative full-page screenshots
- Chromium with mobile viewport and touch emulation; no physical-device or iOS Safari run
- Checks: page and section overflow, unclipped bounds, heading reflow, touch-target geometry, mobile-dock bounds and obstruction, and 320px touch interaction

## Verdict

Not fully mobile/tablet ready. Phone layouts are mostly stable, but the Home hero clips at 320px and 521–859px. Home and Experience create document-level horizontal overflow in landscape/tablet ranges.

## Section matrix

| Route | Section | Result | Width evidence |
|---|---|---|---|
| Home | Hero | Fail | Statement lines exceed and are clipped at 320px and 521–859px |
| Home | Method preview | Fail | Document overflow begins at 861px and remains through 1070px |
| Home | Work index | Fail | Desktop grid overflows from 981px through at least 1072px; passes at 1180px |
| Home | Thinking | Pass | No section overflow or clipping at tested widths |
| Home | Closing | Pass | No section overflow or fixed-dock obstruction |
| Biography | Page hero | Pass | Stable from 320–1181px |
| Biography | Story | Pass | Stable from 320–1181px |
| Biography | Modes | Pass | Stable from 320–1181px |
| Biography | Principles | Pass | Stable from 320–1181px |
| Biography | CTA | Pass | Stable and unobstructed |
| Experience | Page hero | Pass | Stable from 320–1181px |
| Experience | Project index | Fail | Three-column grid overflows from 901px through at least 1072px; passes at 900px and 1180px |
| Experience | CTA | Pass | Stable and unobstructed |
| Contact | Page hero | Minor | Italic headline extends 1.9px beyond the 320px viewport |
| Contact | Contact context | Pass | Stable from 320–1181px |
| Contact | Form | Pass | Stable from 320–1181px and not hidden by the dock |

## Prioritized findings

### P1 — Home statement clips across a common width band

At 520px the smaller headline rule fits. At 521px the 20vw rule resumes and each statement line grows to about 751px, exceeding the available field until 860px. The Home wrapper clips the excess, so the central proposition loses visible letters.

Location: src/pages/index.astro, the max-width 860px and max-width 520px statement rules.

Recommendation: keep a fit-safe clamp across the full stacked range, or size against the hero container rather than the viewport.

### P1 — Home tablet breakpoint gap creates horizontal page scroll

The stacked and scrollable method treatment ends at 860px. At 861px the fixed 528px method sequence re-enters the desktop grid before enough space exists. At 981px the Work intro also returns to its desktop grid and extends beyond the viewport. The route still overflows at 1024 and 1072px; it is clear again at 1180px.

Location: src/pages/index.astro, the max-width 860px method rules and max-width 980px section-intro rules.

Recommendation: retain the stacked/scrollable treatment longer and ensure every grid track can shrink with minmax(0, 1fr).

### P1 — Experience project grid re-enters too early

At 900px the two-column project row fits. At 901px the three-column template with 11rem, 22rem, and 22rem minimums returns, pushing detail copy beyond the viewport. It remains broken at 1024 and 1072px and passes at 1180px.

Location: src/pages/experience/index.astro, project-row and the max-width 900px breakpoint.

Recommendation: extend the compact project layout through the width required by the three minimum tracks, or replace fixed minimums with shrink-safe tracks.

### P2 — Touch targets are visually clear but vertically undersized

Measured heights include: top monogram 21px, mobile dock links 25–27px, mode buttons 26px, social links 30px, and several CTA links 25–37px. Width and spacing help, but these are below the 44px mobile comfort target; the monogram is also below the 24px WCAG target dimension unless its spacing exception applies.

Location: src/components/Navigation.astro and action rules in the page styles.

Recommendation: apply a minimum block size of 44px to navigation, mode controls, and primary actions while preserving the current visual density.

### P3 — Contact headline has a 320px glyph overhang

The Contact headline ends at 321.9px in a 320px viewport. Body clipping prevents page-level scrolling but can shave the italic glyph edge.

Location: src/pages/contact/index.astro, mobile page-hero heading.

Recommendation: slightly reduce the narrowest heading size/tracking or provide a fit-safe max-width rule.

## Positive findings

- The fixed mobile dock stays inside the viewport and never overlaps the last actionable element.
- Mobile body padding provides 92px of bottom clearance against a 40–42px dock.
- The 320px engineering-mode tap updates aria-pressed and all variable-axis values.
- A synthesized tap on Contact navigates successfully through Astro client routing.
- No clipped form fields, missing sections, or fixed-width failures were found on Biography.
- The implementation detector found no responsive or accessibility antipatterns; its findings were design-token advisories only.

## Evidence

- Machine-readable measurements: report.json
- Tablet/landscape measurements: landscape/report.json
- Representative screenshots: route-width PNG files in this directory and landscape/
