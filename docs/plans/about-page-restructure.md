# Biography and Experience consolidation

Status: approved, implemented, and validated on 13 September 2026.
Prepared: 13 September 2026.

## Decision and purpose

Combine Biography and Experience into **About**, at `/about`.

About is a familiar navigation label that accommodates both the person and their
professional record. Keep **Experience** as the prominent section heading and
`/about#experience` as its direct destination. “Profile” is a reasonable
alternative but less conversational; “Career” would understate the personal
introduction. About is the recommended choice for implementation.

The primary audience remains prospective freelance clients evaluating Daniel's
range and ability to deliver. This is a Read surface within the existing
portfolio: introduce the person briefly, substantiate the introduction with
experience, and provide a direct path to contact.

Confirmed by Daniel: **all five project assignments were through Defijn**.
Represent one overarching employer role with five assignments underneath it.
Do not present these as six unrelated employers or sequential jobs.

## Sitemap and navigation

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Positioning, engineering approach, selected evidence |
| About | `/about` | Short biography and professional experience |
| Contact | `/contact` | Start a project conversation |

- Replace Biography and Experience with one About link in the shared navigation.
- Mobile dock: Home / About / Contact. Retain existing touch targets and safe-area spacing.
- Desktop: show Home / About / Contact in the rail. Final refinement removes the monogram, name, location, and portrait from navigation.
- Change the homepage's “View selected experience” link to **View experience**, pointing directly to `/about#experience`.
- Keep a visible **View experience ↓** anchor in the About introduction, so visitors can skip directly to the professional record.
- Keep one closing contact invitation using Biography's existing “Have a complicated product problem?” / “Let's untangle it” copy.

This is a navigation and route consolidation. The repository currently has no
XML sitemap integration or public sitemap file. Adding a new sitemap generator
is not required for this change; if one is introduced later, list only the three
canonical content routes, excluding the retired URLs.

## Content retention map

| Existing content | Treatment on About |
| --- | --- |
| Biography `.story` description | Keep all three paragraphs as the core introduction; only light editorial changes if agreed |
| Daniel's full name, title, Cape Town location | Keep as compact identity information |
| Existing grayscale portrait | Keep once in the content introduction; reuse the existing asset and treatment |
| Biography oversized headline and separate lede | Replace with a compact “About Daniel” heading; their message already exists in the description |
| “A wider view of the system.” | Retain as the description subheading |
| “Five+ years / SaaS delivery / One connected view” margin note | Remove the repeated callout; the description already carries the experience claim |
| “Four modes. No silos.” and four skills panels | Remove the standalone section; retain relevant technical evidence in the description and assignment details |
| “The code matters. So does the context.” principles | Remove the standalone section; working approach is already covered on Home |
| Experience's Defijn entry | Keep as the parent employment summary, including its three contribution bullets |
| Experience's five assignment entries | Keep every date, role, project title, premise, contribution bullet, and existing tag |
| Experience's large hero | Remove; the combined page needs one introduction |
| Experience's four mode jump links | Replace with the single direct Experience anchor; chronological assignments become the main structure |
| Two closing CTAs | Consolidate into one closing contact invitation |

Do not create another page to house the removed skills/principles sections. Their
existing source remains in version history. Preserve useful facts through the
description and existing experience evidence without reproducing the whole biography.

### Description to carry forward

Source: `src/pages/biography/index.astro`, `.story-copy`. Preserve this copy for
the initial implementation; the existing experience-duration statement is not
being independently updated in this restructure.

> I'm Daniel Vieira Teixeira, a full-stack software engineer with more than five years of experience building SaaS products in fast-moving, client-facing teams.
>
> My foundation is TypeScript. My value is range: responsive React interfaces, backend integrations, real-time features, automated testing, CI quality gates, observability, and the production work that keeps a useful product useful.
>
> I like assignments where the brief is still tangled. I clarify the constraint, find the layer with the most leverage, and move between disciplines until the system behaves better for the people who depend on it.

## Page structure

1. **Compact introduction.** H1 “About Daniel”, full name, professional title,
   location, a supporting portrait, and the description headed “A wider view of
   the system.” Place the description in the introduction itself rather than
   below a separate full-height hero. Include the Experience jump link.
2. **Experience** (`id="experience"`). Introduce Defijn as the overarching role:
   “Software Engineer / Full Stack”, “2021 — Present”. Preserve its premise,
   three contribution bullets, and tags in a concise summary. Follow with an
   explicit **Selected assignments at Defijn** subheading and an ordered timeline.
3. **Contact invitation.** One closing action to `/contact`.

Experience should occupy most of the page. Avoid minimum viewport heights or
large empty blocks that delay the description or the first timeline entry.
The retained Biography contribution is the description plus compact identity
and portrait, not its original sequence of large sections.

### Timeline order and stable anchors

Show assignments in reverse order of start date. Overlapping dates remain
visible and are expected within the parent employment role.

| Position | Existing anchor | Assignment / role | Existing period |
| --- | --- | --- | --- |
| Parent role | `project-01` | Defijn — Software Engineer / Full Stack | 2021 — Present |
| 1 | `project-06` | Property appraisal platform — Full Stack Developer | Feb 2026 — Present |
| 2 | `project-05` | Invoice matching system — Full Stack Developer | Nov 2025 — Jan 2026 |
| 3 | `project-04` | Carbon credit visualisation — Frontend Developer | Aug 2025 — Nov 2025 |
| 4 | `project-03` | Automation and reliability — QA Engineer | Jun 2025 — Dec 2025 |
| 5 | `project-02` | Investment research platform — Frontend Developer | Jul 2021 — Jun 2025 |

Keep existing IDs stable even when display order changes. Omit the old visible
01–06 counters to avoid confusing order with identifier. Each assignment should
show its date, role, project title, premise, three contribution bullets, and
existing tags. Keep all details expanded; five entries do not require filters,
tabs, carousels, or accordions.

Use a vertical timeline with dates in a narrow column and content in a wider
column on larger screens. On mobile, place dates above each title in a single
column, with restrained timeline markers. Dates and hierarchy must communicate
the relationship without depending on the decorative line.

## Visual and interaction constraints

- Preserve the current Anybody / Newsreader typography, paper/cream surfaces,
  amber identity accents, ultramarine state accents, and editorial rules.
- Use the portrait as a supporting identity element; keep the description and
  timeline dominant. No new image generation or visual-world redesign is needed.
- Use one H1 and a logical heading hierarchy: description and Experience as H2;
  Defijn and assignment-group headings beneath; assignment titles beneath their group.
- Use a semantic ordered list for assignments. Keep content readable without
  JavaScript, animation, hovering, or horizontal scrolling.
- Preserve keyboard focus, minimum 44px interactive targets, reduced-motion
  behavior, and the current route state in shared navigation.
- Keep anchor scroll spacing. There is no mobile top bar. The bottom dock must not
  cover content or the closing CTA.
- No new animation is needed. Review shared reveal selectors if classes change;
  ordinary reading and anchor navigation must work after client-side navigation.

## URL migration and metadata

- Permanently redirect `/biography` and `/experience` to `/about` using HTTP 301
  responses, with trailing-slash variants resolving consistently and no loops.
- Use a redirect destination without a forced fragment. Preserve existing
  `project-01` through `project-06` anchors on About and verify legacy links such
  as `/experience#project-03` land on the corresponding assignment in the browser.
  New internal experience links go directly to `/about#experience`.
- Keep `story-title` on the retained description heading for the existing
  `/biography#story-title` destination. Removed section anchors do not represent
  retained sections and should not be advertised as supported deep links.
- Use the document title **About | Daniel Vieira Teixeira**.
- Add an About description and self-canonical URL:
  `https://dvieira.dev/about`. Proposed description: “Meet Daniel Vieira Teixeira,
  a full-stack software engineer in Cape Town. Explore his background and
  frontend, backend, quality, and reliability experience at Defijn.”
- The shared layout currently accepts only a title and has no canonical or meta
  description. If adding optional metadata props there, emit About metadata only
  for About; never default every route's canonical to `/about`.
- Do not leave duplicate Biography or Experience content pages indexed alongside About.

## Implementation sequence

1. Recheck the working tree. Existing edits were present at planning time in
   `AGENTS.md`, `DESIGN.md`, the homepage surface brief, Navigation, Layout, and
   Home. Preserve those edits and make focused changes on top of them.
2. Add `src/pages/about/index.astro`. Carry over the description and portrait;
   structure Defijn separately from its five assignments. A local parent object
   plus an assignments array is sufficient; preserve the current content data
   without introducing a CMS or new dependency.
3. Implement the compact introduction and accessible vertical timeline in scoped
   SCSS, reusing existing tokens and styles. Preserve legacy IDs.
4. Update `src/components/Navigation.astro` and the homepage experience link.
   Check active state for the accepted slash policy and navigation via ClientRouter.
5. Add the two permanent redirects in `astro.config.mjs` and retire the old page
   files in the same change, so page routes cannot conflict with redirects.
   Verify the appropriate Astro 6 / Cloudflare redirect configuration against
   current documentation at implementation time using Context7 if available.
6. Update `src/layouts/Layout.astro` for optional metadata and any necessary
   reveal-selector adjustment; keep changes limited to the new page's needs.
7. Update `PRODUCT.md` source references, `DESIGN.md` navigation/timeline notes,
   and `.impeccable/surfaces/src-pages-index-astro.md` related routes. Add an About
   surface brief recording this page's Read mode and approved structure.
8. Update actively used capture/audit route lists under `.impeccable/scripts/`
   for About and its sections. Leave historical captures and explicitly old-site
   scripts as historical evidence.
9. Run the checks below and review the complete diff. Deployment is a separate
   action; this brief prepares implementation, not publication.

## Acceptance checks

- Navigation exposes only Home, About, Contact on mobile and desktop. There is
  no monogram, name, location, portrait, or mobile top bar in navigation. No live navigation links use retired routes.
- About contains the three biography paragraphs, compact identity and portrait,
  one Defijn parent role, all five assignments, and one closing contact CTA.
- All six original records' dates, roles, premises, eighteen contribution bullets,
  and tags remain accounted for. No invented outcomes, dates, or employer changes.
- Assignment order is newest-start-first; Defijn's parent relationship is explicit.
- The page reads naturally at 320px, 390px, tablet, and wide desktop widths, with
  no accidental horizontal overflow and no content obscured by fixed navigation.
- Direct About entry, Home → About, About → Contact → About, keyboard navigation,
  reduced motion, and JavaScript-disabled reading work. Experience anchors scroll
  to visible headings after both direct loading and client-side navigation.
- Production preview confirms 301 status and final destination for both retired
  routes, checks slash variants, and verifies legacy fragments in a browser.
- About has the correct title, description, and canonical. Home and Contact
  do not accidentally inherit About metadata.
- Run `pnpm astro check` and `pnpm build`; inspect redirects using `pnpm preview`.
  Contact action code is outside this change; its form should remain functional.

## Decisions for continuation

The Defijn grouping is confirmed. Daniel approved this plan for implementation,
including About naming, the retention map, chronological order, and composition.
No further factual input was needed for the agreed structure.
Do not infer approval to rewrite the retained description or revise employment dates.


## Implementation result

Implemented in `src/pages/about/index.astro`; navigation, homepage action,
metadata, redirects, project guidance, and active audit route lists are updated.
All three biography paragraphs and all six experience records were compared
against the original source and match exactly. All five assignments are grouped
under Defijn and displayed newest first.

Validation: `pnpm astro check` reports zero errors and zero warnings (one existing
analytics-script hint); `pnpm build` succeeds. Browser checks cover widths 320,
390, 760, 768, 1024, and 1440px, HTTP 301 redirects for both slash variants,
legacy fragments, active navigation, client-side transitions, metadata isolation,
keyboard focus, normal/reduced motion, and reading without JavaScript.

See `.impeccable/review/about/verification.json` and the accompanying screenshots.
The final clean build contains exactly four generated redirect rules. The site
has not been deployed.

Documentation checked for the implementation:
[Astro redirect configuration](https://v6.docs.astro.build/en/reference/configuration-reference/#redirects).
Context7 tools were unavailable in this session.
