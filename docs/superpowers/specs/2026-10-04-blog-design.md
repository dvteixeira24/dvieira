# Blog Design Spec

- Date: 2026-10-04
- Status: Approved for planning
- Scope: Add a `/blog` section to the existing Astro 6 site at `dvieira.dev`

## Summary

Add a public blog to the existing portfolio site, authored as markdown files in
the repo and edited through a git-based CMS web UI, with GitHub-backed reader
comments. Build only the thin rendering shell in Astro; buy the two hard,
ongoing concerns (the editor and the comments) from free, git-native services.

## Background

The site is an Astro 6 application in `output: 'server'` mode, deployed to
Cloudflare Workers via `@astrojs/cloudflare`. It is intentionally vanilla Astro
(scoped SCSS, no React/Vue/Svelte), uses Astro Actions + hCaptcha + a Durable
Object rate limiter + Telegram for the contact form, and has three content
routes (`/`, `/about`, `/contact`). The author (Daniel) is a software engineer
who works directly in this repo on the `master` branch.

## Locked Decisions

1. **Editor — Sveltia CMS** (actively-maintained, drop-in successor to Decap CMS).
   Markdown stays in the repo; the `/admin` page edits those same files and
   commits back to GitHub. Auth via a GitHub personal access token (quick start)
   or an OAuth client (multi-user) — no Netlify Identity, no self-hosted git
   gateway.
2. **Comments — Giscus.** GitHub Discussions-backed, zero infrastructure, no
   moderation/spam burden. Readers sign in with GitHub.
3. **Rendering — prerendered blog routes.** Blog pages are static (`prerender =
   true`) while the rest of the site stays server-rendered. Posts only change on
   a markdown commit, which redeploys anyway, so static output is faster and
   cacheable.

## Architecture

```
Markdown files (src/content/blog/*.md)  <-- Sveltia CMS writes these via GitHub
        |
        v
Astro Content Collections (src/content.config.ts)
        |
        +-- /blog           (index: list posts, newest first)
        +-- /blog/[slug]    (post: rendered markdown + Giscus widget)
        +-- /rss.xml        (RSS feed)
        +-- /admin          (Sveltia CMS UI, static)
```

No new server-side actions, no database, no new Durable Objects. Giscus and
Sveltia are both client-side/static; their state lives in GitHub.

## Content Model

Frontmatter schema (validated with `z` from `astro:content`):

| Field         | Type       | Required | Notes                                   |
| ------------- | ---------- | -------- | --------------------------------------- |
| `title`       | string     | yes      | Post title                              |
| `description` | string     | yes      | Used for SEO meta + index cards         |
| `pubDate`     | date       | yes      | Publish date (sorts the index)          |
| `updated`     | date       | no       | Last meaningful edit                    |
| `tags`        | string[]   | no       | Displayed on the post; no tag pages yet |
| `cover`       | image      | no       | Optional hero image                     |
| `draft`       | boolean    | no       | Hidden from production builds           |
| `body`        | markdown   | yes      | Post content                            |

Slug derives from the filename. Draft posts are filtered from the index and
from `getStaticPaths` in production (`import.meta.env.PROD`).

Cover images are uploaded by the CMS to `public/images/` and referenced by URL
path (a deliberate, documented exception to the `src/assets` import rule, since
CMS uploads are dynamic).

## Routes and Files

New files:

- `src/content.config.ts` — `blog` collection definition (glob loader + zod schema).
- `src/content/blog/.gitkeep` (and later, real posts).
- `src/pages/blog/index.astro` — post list (`prerender = true`).
- `src/pages/blog/[slug].astro` — post page (`prerender = true`,
  `getStaticPaths`, Giscus widget).
- `src/pages/rss.xml.ts` — RSS via `@astrojs/rss` (`prerender = true`).
- `src/components/BlogPostCard.astro` — reusable list item.
- `src/components/Giscus.astro` — comment widget (client script + mount).
- `src/lib/giscus.ts` — public giscus config values (repo, IDs, category).
- `src/lib/blog.ts` — shared helpers (sorted/published post query).
- `public/admin/config.yml` — Sveltia CMS config.
- `public/admin/index.html` — Sveltia CMS entry (loads from CDN).

Modified files:

- `src/components/Navigation.astro` — add `/blog` link.
- `src/components/SEO.astro` — emit `BlogPosting` JSON-LD on post pages.
- `astro.config.mjs` — add blog routes to the sitemap `indexablePaths` list.
- `package.json` — add `@astrojs/rss` dependency.
- `README.md`, `AGENTS.md` — document the new conventions and required config.

## Authoring (Sveltia CMS)

- `public/admin/index.html` loads the Sveltia CMS bundle from its CDN and points
  to `config.yml`.
- `config.yml` sets `backend: { name: github, repo: dvteixeira24/dvieira, branch:
  master }`, `media_folder: public/images`, `public_folder: /images`, and a
  single `blog` collection with `folder: src/content/blog`.
- Authentication: a solo author signs in with a GitHub personal access token
  ("Sign in with Token" — token stays in the browser); a multi-user setup uses an
  OAuth app + a deployed OAuth client (Sveltia CMS Authenticator). PKCE auth is
  not yet supported by GitHub/Sveltia.
- The admin page is not linked from public navigation; it is reached directly at
  `/admin`.

## Comments (Giscus)

- A `Giscus.astro` component embeds the giscus client script on post pages with
  `data-repo`, `data-repo-id`, `data-category`, `data-category-id`.
- Requires the user to: enable GitHub Discussions on the repo, install the
  giscus GitHub App, and choose an announcement category. The four resulting IDs
  are public (not secrets) and live in `src/lib/giscus.ts`.
- If the IDs are unset, the widget renders nothing and a silent
  "comments unavailable" note is shown (graceful degradation).

## RSS

- `@astrojs/rss` feed at `/rss.xml`, listing published posts newest-first with
  title, description, permalink, and pubDate. Linked from the blog index (and
  optionally the site `<head>`).

## SEO, Sitemap, and Navigation Integration

Per the repo's "update these together" convention:

- Add `/blog` to `Navigation.astro`.
- In `astro.config.mjs`, add `/blog` to `indexablePaths` and broaden the sitemap
  `filter` to also include prerendered `/blog/*` post paths (generated via
  `getStaticPaths`). Keep `/rss.xml` out of the sitemap (it is a feed endpoint,
  not a content page — linked from the blog index and `<head>` instead).
- Extend `SEO.astro` to emit `BlogPosting` (headline, description, datePublished,
  author → Person) for `/blog/[slug]` pages.
- Each page passes a unique `title` and `description` to `Layout.astro`.

## Design and Accessibility

- Match the existing visual language: `--paper`/`--ink`/`--signal` tokens,
  `--font-human` (Newsreader) for long-form reading, `--font-display` (Anybody)
  for headings, the existing reveal-unit motion (with reduced-motion fallbacks).
- Blog body is a comfortable measure (~65ch) with readable type, clear hierarchy,
  and semantic HTML (`<article>`, `<h1>`, `<time>`, `<a>`).
- The Giscus widget is keyboard- and screen-reader-accessible out of the box;
  confirm contrast and focus states.
- Final visual polish runs through the impeccable skill during implementation.

## Error Handling and Edge Cases

- Empty blog (no posts): index shows a friendly empty state, still valid HTML.
- Draft filtering: production builds exclude `draft: true`; a dev-only badge
  marks drafts locally.
- Missing cover image: render text-only card.
- Giscus unconfigured: degrade gracefully (no error, no broken iframe).
- Invalid frontmatter: caught at build/type-check time by the zod schema.

## Testing

There is no test suite in this repo. For this change:

- Add minimal Node-based tests for pure helpers in `src/lib/blog.ts` (sorting,
  draft filtering, slug/permalink building) using `node:test` + `node --test`,
  matching the existing `src/lib/contact/dev-bypass.test.mjs` convention.
- `pnpm astro check` and `pnpm build` are the primary correctness gates (they
  catch Workers-incompatible imports and schema errors).
- Manually verify `/blog`, a post page, `/rss.xml`, `/admin`, and the Giscus
  widget against `pnpm dev` and `pnpm build` + `pnpm preview`.

## Out of Scope (initial)

- Tag index pages, search, pagination, and related-posts (add later if needed).
- Comment moderation UI (Giscus uses GitHub's native moderation).
- Migrating existing content (no blog posts exist yet).
- A separate `blog/` deployment; the blog is a route inside this app.

## Follow-ups (user actions, not code)

1. Enable Discussions + install the giscus App; capture the four IDs.
2. Generate a GitHub personal access token for the Sveltia CMS sign-in (Contents
   read/write), or deploy the Sveltia CMS Authenticator + OAuth app for multi-user.
3. Deploy and submit `/rss.xml` + `/sitemap-index.xml` to search consoles.
