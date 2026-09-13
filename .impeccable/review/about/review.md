# About consolidation verification

13 September 2026. Verdict: ready for review; not deployed.

- Original content comparison: all six experience records and all three biography paragraphs match exactly.
- All five assignments are under Defijn, newest start first; 18 contribution bullets retained.
- Astro check: 0 errors, 0 warnings, 1 pre-existing analytics-script hint.
- Production build: successful. Final clean output contains four valid 301 redirect rules.
- Chromium widths: 320, 390, 760, 768, 1024, 1440px. No horizontal outliers or interactive targets below 44px.
- Desktop and mobile screenshots reviewed, including the introduction and assignment timeline.
- Both old routes and trailing-slash variants return 301 to `/about`.
- Legacy project/story anchors and the new Experience anchor land with visible spacing above the target.
- Home → About#experience uses ClientRouter; About → Contact → About updates metadata and active navigation correctly.
- Keyboard focus and activation work; normal/reduced motion and no-JavaScript reading work.
- Contact form is present; no form submission or delivery was performed because contact logic was unchanged.

The mechanical design check identified advisory typography differences from the
homepage scale; the intentional About reading scale is now documented in
DESIGN.md. Pre-existing unrelated homepage/navigation style advisories were not
used to expand the scope. The final user refinement keeps Home visible on every screen and removes all
other rail identity elements and the mobile top bar.

Preview builds should start from cleared generated output: the current adapter
can append `_redirects` entries during incremental rebuilds. The final build's
four-rule file was verified after removing the earlier generated files.

An existing `/favicon.svg` reference still returns 404; the existing `.ico`
fallback remains available. This was not introduced by the About change.
