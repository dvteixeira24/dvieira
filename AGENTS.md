# AGENTS.md

Guidance for AI coding agents (and humans) working in this repository. Keep it short, current, and practical — update it when conventions change.

## Project Overview

Personal resume / portfolio site built with **Astro 6** in **server output** mode, deployed to **Cloudflare Workers** via `@astrojs/cloudflare`. The contact page uses **Astro Actions** for server-side form handling, with **hCaptcha** verification, a **Durable Object** rate limiter, and **Telegram** delivery.

- **Runtime**: Cloudflare Workers (NOT Node.js) — code runs on V8 with Workers APIs.
- **Frontend**: Astro `.astro` components, scoped SCSS, vanilla JS islands (no React/Vue/Svelte).
- **Server**: Astro Actions in `src/actions/`, custom Worker entry in `src/worker.ts` (with the rate-limiter Durable Object class).
- **Package manager**: `pnpm` only. Do not introduce `npm` or `yarn` lockfiles.

## Commands

Run from the project root.

| Command                       | What it does                                     |
| ----------------------------- | ------------------------------------------------ |
| `pnpm install`                | Install dependencies                             |
| `pnpm dev`                    | Astro dev server at `http://localhost:4321`      |
| `pnpm build`                  | Build to `./dist/`                               |
| `pnpm preview`                | Preview the production build locally             |
| `pnpm astro check`            | Type-check `.astro` and TS files                 |
| `pnpm astro -- --help`        | Astro CLI help                                   |
| `pnpm wrangler ...`           | Cloudflare CLI (e.g. `secret put`, `tail`)       |

Always run `pnpm astro check` after making changes to `.astro` or `.ts` files. There is no test suite, no ESLint, and no Vitest yet.

## Project Structure

```
src/
  actions/         # Astro Actions (server-only). All server-side form/API logic lives here.
    index.ts       # Exports `server.contact.submit` action
  assets/          # Imported via Astro's image pipeline (use `import x from '../assets/...'`)
  components/      # Reusable .astro components (presentational)
  layouts/         # Page layouts (Layout.astro defines fonts, color tokens, ClientRouter)
  lib/             # Pure helpers (no Astro imports). Group by feature, e.g. `lib/contact/`.
  pages/           # File-based routing (`pages/contact/index.astro` -> `/contact`)
  env.d.ts         # Declares `cloudflare:workers` env type
  worker.ts        # Worker entry + Durable Object classes
public/            # Served as-is at site root (favicon, fonts)
wrangler.jsonc     # Worker config: bindings, routes, DO migrations
astro.config.mjs   # `output: 'server'`, Cloudflare adapter
.dev.vars          # Local dev secrets — gitignored, never commit
```

## Code Style

Prettier config is in `package.json` and is the source of truth. Match it:

- 4-space indent, no tabs
- Single quotes, no semicolons, trailing commas everywhere
- `arrowParens: 'avoid'` (e.g. `value => value.trim()`)
- `prettier-plugin-astro` formats `.astro` files
- For editor/tool compatibility, keep an explicit Prettier override for Astro files:

```json
"overrides": [
    {
        "files": "*.astro",
        "options": {
            "parser": "astro"
        }
    }
]
```

TypeScript:

- Strict TypeScript everywhere; prefer explicit types on exported functions and action handlers.
- Use `z` from `astro/zod` (already a transitive dep) inside actions instead of adding a separate `zod` dependency.
- For runtime env access in Workers, import `env` from `cloudflare:workers` and cast to the `Env` interface defined in `src/worker.ts`.

Comments: only explain non-obvious intent or constraints. Don't narrate what the code does.

## Astro Conventions

- **Content routes**: Home (`/`), About (`/about`), and Contact (`/contact`). Shared navigation contains only Home, About, and Contact; there is no monogram, rail identity content, or mobile top bar. About owns the biography description and Defijn experience timeline. All five assignments belong to Defijn. Keep `project-01` through `project-06` IDs stable; `/biography` and `/experience` are permanent redirects configured in `astro.config.mjs`.

- **Server output**: This site is `output: 'server'`. Pages are rendered on the Worker by default. Mark a page `export const prerender = true` only if it has zero per-request logic and no action results to read.
- **Dynamic pages with actions** (e.g. `src/pages/contact/index.astro`) MUST set `export const prerender = false` so `Astro.getActionResult(...)` works.
- **View transitions**: `Layout.astro` includes `<ClientRouter />`. Bundled module scripts run once across client-side navigations. Client scripts with package imports must use a bundled `<script>` and initialize from `astro:page-load`; clean up page-specific effects on `astro:before-swap` (see the homepage GSAP script). Use `<script is:inline data-astro-rerun>` for plain inline scripts that must re-run on navigation. Keep initialization idempotent because `window` state persists between navigations. See `src/pages/contact/index.astro` for the hCaptcha pattern (idempotent init, removes prior listeners).
- **Styles**: prefer scoped `<style lang="scss">` per component. Global styles live in `Layout.astro` under `<style is:global lang="scss">`. Reuse existing CSS custom properties (`--color-*`, `--font-*`) instead of hardcoding values.
- **Assets**: import images from `src/assets/` and use the resulting `.src`. Don't reference them by raw path.
- **Public env**: only variables prefixed with `PUBLIC_` are exposed to client code via `import.meta.env`.

- **About illustrations**: `AssignmentDiagram.astro` supplies two labeled SVG workflow illustrations. Assignment specialty captions sit beside dates on desktop and above titles on mobile. Diagrams have no internal motion. Assignment dates and content reveal together once per visit through the About page GSAP lifecycle; reduced-motion and no-JavaScript paths stay visible, and already-visible rows skip the entrance.

## Animations / GSAP

- Use GSAP only in client-side scripts; never import or execute GSAP in server/action code.
- Register plugins explicitly, e.g. `gsap.registerPlugin(ScrollTrigger)`.
- With `<ClientRouter />`, initialize page-specific animations from `astro:page-load`.
- Use `gsap.context(...)` scoped to a root element and call `ctx.revert()` before re-initializing or tearing down page-specific animations.
- For responsive animations, prefer `gsap.matchMedia()` and clean up custom event listeners in returned cleanup functions.
- If DOM/layout changes affect ScrollTrigger measurements, call `ScrollTrigger.refresh(true)`.
- Respect `prefers-reduced-motion`; skip or simplify non-essential motion for reduced-motion users.

- **Hero materials**: `RoleLoom.astro` draws triangle ribbons with screen-space thickness and difference blending above the display headline. Keep controls and supporting copy above the graphic. `HeroPaper.astro` renders a static CSS drafting-paper dot grid with faint edge registration marks and masks behind the headline and loom; it has no canvas or client script. The role loom stops drawing offscreen/hidden and renders reduced-motion role changes on demand.
- **Text selection**: Display specimen text, navigation, mode controls, and decorative readouts are non-selectable. Keep biography, contact details, and editable fields selectable.

## Astro Actions (Server-Side)

All server-side form and API logic goes in `src/actions/index.ts` under the `server` export. Pattern:

```ts
import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro/zod'
import { env } from 'cloudflare:workers'
import type { Env } from '../worker'

export const server = {
    feature: {
        doThing: defineAction({
            accept: 'form', // or 'json'
            input: z.object({ /* ... */ }),
            handler: async (input, context) => {
                const runtimeEnv = env as Env
                // ...
                if (badInput) {
                    throw new ActionError({
                        code: 'BAD_REQUEST',
                        message: 'Generic, user-safe message.',
                    })
                }
                return { success: true }
            },
        }),
    },
}
```

Rules of thumb:

- **Never leak internals in error messages**. Use a single generic message constant for user-facing errors; log details server-side only.
- **Always validate with zod**. Trim and normalize strings inside the schema (see `contactFormSchema`).
- **Use `context.request`** for headers (e.g. `CF-Connecting-IP`); do not trust client-supplied IPs.
- **Read action results** in the page with `Astro.getActionResult(actions.feature.doThing)` and `isInputError(...)` for field-level errors.
- **Forms** should `POST` to `actions.feature.doThing` and use `novalidate` to let the action drive validation messaging.

## Cloudflare Workers Conventions

- **Worker entry** is `src/worker.ts`. It re-exports `handle` from `@astrojs/cloudflare/handler` and any Durable Object classes referenced in `wrangler.jsonc`.
- **Bindings** declared in `wrangler.jsonc` must also appear on the `Env` interface in `src/worker.ts`. Update both together.
- **Durable Objects**: each new DO class needs a binding in `wrangler.jsonc`, an entry in `migrations`, an export from `src/worker.ts`, and a typed field on `Env`.
- **Compatibility**: `nodejs_compat` is enabled, but prefer Web/Workers APIs (`fetch`, `crypto.subtle`, `URLSearchParams`) over Node built-ins. Don't import `node:*` modules unless there's no Workers-native alternative.
- **Astro 6 / adapter v13**: `astro dev` and `astro preview` run on Cloudflare `workerd`; treat dev/preview runtime issues as Workers compatibility issues, not Node issues.
- **Local production checks**: use `pnpm build` followed by `pnpm preview` when checking production-like Workers behavior locally. For redirect verification, stop the previous preview and clear generated `dist/` output before rebuilding; the current adapter can append duplicate `_redirects` rules to existing output.
- **Types**: if Cloudflare bindings change, regenerate/check Worker types with `pnpm wrangler types` and update the `Env` interface.
- **Routes**: production traffic is bound to `https://dvieira.dev/*` via `wrangler.jsonc`.

## Secrets & Configuration

- Local development secrets live in `.dev.vars` (gitignored). Never commit it, never paste its contents into chat or code.
- Production secrets are set with `pnpm wrangler secret put NAME`. Public values can go in `wrangler.jsonc` under `vars`.
- Required vars (see README): `HCAPTCHA_SECRET`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `PUBLIC_HCAPTCHA_SITE_KEY`. Optional: `CONTACT_ALLOW_DEV_CAPTCHA_BYPASS`.
- When adding a new secret, update: `Env` interface (`src/worker.ts`), README "Required variables" table, and `.dev.vars` locally.

## Security Guardrails

The contact pipeline already implements: honeypot field, disposable-domain block, IP + email rate limiting (Durable Object), hCaptcha verification, masked logging. When extending it:

- Keep the honeypot (`website` field) and reject any non-empty value.
- Don't log raw email addresses or message bodies; use `maskEmail` and a short truncated preview.
- Don't echo zod error details to the user for the contact action — return the generic message and let `isInputError` surface field hints only for explicitly user-friendly schemas.
- Any new outbound `fetch` from a handler must tolerate failure without throwing the user-facing flow into a 500 if delivery is best-effort (see `sendToTelegram`).

## Things to Avoid

- Don't add React/Vue/Svelte/Solid integrations unless explicitly requested — the site is intentionally vanilla Astro + light JS.
- Don't switch the package manager or lockfile format.
- Don't introduce Node-only libraries (e.g. `fs`, `crypto` from Node) into action handlers; they won't run on Workers.
- Don't add a separate top-level `zod` dependency; use `astro/zod`.
- Don't disable `security.checkOrigin` in `astro.config.mjs`.
- Don't add tracking/analytics scripts without an explicit ask.

## When You're Done

Before declaring a change complete:

1. `pnpm astro check` passes with no new errors.
2. `pnpm build` succeeds (catches Workers-incompatible imports).
3. If you touched the contact action, manually exercise `/contact` against `pnpm dev` with `CONTACT_ALLOW_DEV_CAPTCHA_BYPASS=true` in `.dev.vars`.
4. Update this file if you've changed a convention, added a binding, or introduced a new top-level pattern.

## Brand Icons

- The canonical DV-cut geometry and export pipeline live in `scripts/generate-icons.mjs`; run `pnpm exec node scripts/generate-icons.mjs` after editing it. Editable SVG/PDF masters and the exploration sheet live in `brand/`.
- Favicon and app icon files live in `public/` and are linked from `Layout.astro` and `site.webmanifest`. Keep the adaptive SVG, opaque PNG/ICO fallbacks, Apple icon, and separate maskable export in sync. See `brand/README.md` for clear space and palette.

## SEO

- `src/components/SEO.astro` wraps `astro-seo` through `Layout.astro`. Supply a unique title and description per page; canonical and social URLs resolve against `site` in `astro.config.mjs`, without query strings or trailing slashes (except `/`).
- `@astrojs/sitemap` uses the explicit `indexablePaths` list in `astro.config.mjs` for server-rendered pages. Add new public content routes there; keep redirects, endpoints, and noindex pages out.
- `src/pages/robots.txt.ts` is prerendered and points to `/sitemap-index.xml`. The shared SEO component emits Person, WebSite, and page JSON-LD, and reuses the existing portrait for social previews. Keep schema claims aligned with visible page content.
