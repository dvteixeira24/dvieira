# Homepage hero: four engineering states

The original hero changed variable-font widths and abstract ribbon geometry, but its `Wdth` labels described the font rather than the work. The new states retain the blush paper, blue system signal, four-line composition, and “Same approach.” thesis while making each discipline legible through three coordinated layers: the headline, its process annotations, and a short explanation grounded in an existing assignment.

| Mode | Headline | Visual treatment | Information conveyed | Evidence |
| --- | --- | --- | --- | --- |
| Frontend | Different interfaces. Same approach. | Expressive Anybody width/weight contrast and italic “Same”; fine layout annotations; the existing moving surface | Layout, hierarchy, interaction, feedback; making dense data understandable | Investment research platform, `/about#project-02` |
| Backend | Different services. Same approach. | Self-hosted Fragment Mono, lowercase type, line numbers, dashed routing rules, blue alternating lines; the existing braided channels | Request, validate, transform, deliver; connecting services and document workflows | Property appraisal platform, `/about#project-06` |
| QA | Different scenarios. Same approach. | Uniform upright type, ruled inspection rows, open check squares and corner registration marks; the existing stress mesh | Inputs, boundaries, journeys, regression; testing assumptions before release | Automation and reliability, `/about#project-03` |
| Reliability | Different conditions. Same approach. | Heavier, consistent-width type, blue “Same approach.”, continuous annotation rules and quiet signal dots; the existing closed loop | Observe, diagnose, recover, improve; monitoring and production feedback | Automation and reliability, `/about#project-03` |

QA concerns confidence before a release; Reliability concerns understanding and supporting the system in production. The QA squares are open inspection marks, not fabricated test results. The Reliability signal dots are decorative, not a live health status. No uptime percentage, latency value, coverage percentage, or other unsupported metric is shown.

## Interaction

- Rotate every five seconds while the hero is visible and the visitor is not interacting with it.
- Provide an explicit pause/resume control. Selecting a role holds that role until the visitor requests rotation again.
- Mouse hover temporarily suspends rotation; keyboard focus stops it until explicitly resumed.
- Reduced motion starts paused and removes typography transitions. Role selection remains available.
- Preserve the same four line heights and reserve the tallest information panel's space so role changes do not move the footer.
- From 761px, process annotations align left beneath their corresponding word, including Backend’s word inset, to clear the role loom; mobile retains its bottom-right captions.
- Keep only the active information panel visible and accessible. Do not announce automatic changes through a live region.
- Without JavaScript, show the complete Frontend state with its evidence and contact paths. Controls remain disabled.
- Reinitialize through `astro:page-load`; dispose timers, observers, and listeners on `astro:before-swap`.

## Research and decisions

[W3C carousel guidance](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) recommends an explicit rotation control, pausing on hover, and stopping when keyboard focus enters rotating content. Those interaction principles apply to this automatically changing hero even though the selector uses pressed buttons rather than carousel navigation.

[Google SRE's monitoring chapter](https://sre.google/sre-book/monitoring-distributed-systems/) explains monitoring in terms of observable system behavior. This informed the distinction between QA and Reliability; Daniel's actual Sentry, uptime-alert, and delivery-monitoring experience supplies the visible claims. Adding a synthetic operational dashboard would imply evidence the portfolio does not have.

[Astro's client navigation lifecycle](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events) supports initializing on page load and disposing page-specific effects before swaps. Current guidance was checked through Context7.

Fragment Mono is self-hosted with its [SIL Open Font License](../public/font/FragmentMono-OFL.txt), sourced from the [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/fragmentmono). It is a homepage Backend exception to the established Anybody / Newsreader typography system, explicitly answering the request for a technical-looking face.

Implementation: `src/components/HeroModes.astro`; role content: `src/lib/hero-modes.ts`. The existing `RoleLoom.astro` continues to observe the shared `.home[data-mode]` state.
