# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is prospective freelance clients evaluating Daniel Vieira
Teixeira for software engineering work. They need to understand quickly whether
he can take ownership of ambiguous, technically complex problems and deliver
reliable outcomes.

## Product Purpose

This personal portfolio introduces Daniel, demonstrates his problem-solving
approach through real experience, and creates a direct path to starting a
freelance conversation. Success means a qualified prospective client understands
how Daniel thinks, trusts his engineering range, and contacts him.

## Positioning

Daniel combines frontend craft, full-stack delivery, quality engineering, and
production reliability. The portfolio should make that systems-level approach
legible rather than presenting an undifferentiated list of technologies.

## Operating Context

Visitors are likely assessing Daniel alongside other independent engineers or
small agencies. They may arrive from GitHub, LinkedIn, a referral, or a direct
introduction and need a concise but credible view of his work before making
contact.

## Capabilities and Constraints

- The site is an Astro 6 application rendered on Cloudflare Workers.
- The contact workflow uses Astro Actions, hCaptcha, a Durable Object rate
  limiter, and Telegram delivery; that functionality must remain intact.
- The frontend intentionally uses Astro components, scoped SCSS, and vanilla
  client-side JavaScript rather than a component framework.
- The site must remain responsive, accessible, fast, and resilient to reduced
  motion preferences.
- Reorganizing information is in scope when it improves hierarchy and the path
  to contact, but factual claims and experience details must not be invented.

## Brand Commitments

- Use the name Daniel Vieira Teixeira.
- Preserve Cape Town, South Africa as the stated location.
- Preserve the existing GitHub and LinkedIn destinations.
- The visual direction should feel current for 2026 and take inspiration from
  the editorial confidence, typography, pacing, and interaction craft seen on
  Awwwards-featured portfolios.

## Evidence on Hand

- A portrait at `src/assets/profiled.jpg`.
- Career summary and skill inventory in `src/pages/biography/index.astro`.
- Six experience and project entries in `src/pages/experience/index.astro`.
- GitHub and LinkedIn profile links in `src/pages/contact/index.astro`.
- No client testimonials, named client logos, quantified outcomes, dedicated
  case-study imagery, or public project links are currently available. Future
  work must not fabricate them.

## Product Principles

- Show the reasoning behind the work, not only the tools used.
- Earn trust through specificity and restraint rather than unsupported claims.
- Make the path from interest to contact immediate and low-friction.
- Let technical quality—speed, accessibility, and reliability—reinforce the
  portfolio's message.
- Treat mobile as a first-class reading and contact experience.

## Accessibility & Inclusion

Use semantic structure, visible focus states, sufficient contrast, keyboard-safe
interactions, and reduced-motion fallbacks. Core information and contact actions
must remain available without animation.
