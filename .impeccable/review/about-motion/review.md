# About motion verification

- Astro check: zero errors and warnings; existing Layout script hint remains.
- Production build: passed; clean output has four redirect rules.
- Chromium: 390px mobile and 1440px desktop, normal motion and live reduced-motion changes.
- Timeline fills halfway at the halfway reading position, reverses with scrolling, and resolves correctly for deep links.
- Keyboard arrow feedback, Experience anchor, and two Home/About client-navigation cycles passed.
- No JavaScript: all 18 contributions, biography, contact action, and Experience anchor work at 320px.
- No horizontal overflow or browser errors. Desktop and mobile captures reviewed.
- Mechanical design check: only existing documented About type-scale advisories.

Run `.impeccable/scripts/verify-about-motion.cjs` using a Node runtime with Playwright available; set ABOUT_PREVIEW_URL to the production preview URL.
