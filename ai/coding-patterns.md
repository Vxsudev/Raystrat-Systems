# Coding Patterns — Raystrat Systems Website

Authored 2026-09-06, for `raystrat-emergent-site-takeover`. The prior
version of this file (reauthored 2026-07-26 for the Node 1/2/3 Three.js/
GSAP/CSS-Modules stack) described infrastructure this capability deletes
in full — restoring it would be as wrong as restoring the `a28cc84`
Genkit/Firebase version it itself replaced. This version describes only
what is actually true of the app as replaced by the approved Emergent
build, verified against the real source, not carried forward from either
prior version. Where something is a known gap rather than a shipped
behaviour, it is labelled as a limitation, not described as implemented.

## Stack

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript** (strict mode)
- **Plain CSS** — a single `app/globals.css` holding CSS custom-property
  design tokens (`--bg`, `--bg-alt`, `--ink`, `--muted`, `--muted-2`,
  `--line`, `--line-strong`, `--accent`, `--accent-ink`, `--radius`,
  `--container`, `--header-h`, `--anchor-offset`) plus plain selectors. No
  CSS Modules, no Tailwind, no Radix, no styled-components, no CSS-in-JS.
- **yarn** (`yarn.lock` is the source of truth — `npm install` resolves a
  different dependency tree against the same `package.json` and must not
  be used; this is the exact issue the archive's own `HANDOFF.md`
  documented, not a hypothetical).
- **next/og** (`ImageResponse`) for the four metadata-image routes
  (`icon`, `apple-icon`, `opengraph-image`, `twitter-image`) — file
  convention, zero extra dependency, same device the prior stack used.
- **Google Fonts via a `<link>` tag** in `app/layout.tsx` (Figtree), not
  `next/font`. **Known limitation, not a pattern to follow elsewhere**: a
  render-blocking request with no self-hosting, disclosed by the archive's
  own `HANDOFF.md` §8 and not fixed by this capability (out of scope —
  directive required an import + adapt, not a rebuild).

## Directory structure (established, do not reorganise)

- `app/page.tsx`, `app/ai-solutions/page.tsx`,
  `app/forward-deployed-engineering/page.tsx` — the three routes, each a
  server component exporting route-level `metadata`.
- `app/layout.tsx` — root layout: `metadataBase`, the `robots` meta gate
  (see Runtime Contracts), Google Fonts `<link>` tags, imports
  `./globals.css`.
- `app/components/` — **nested inside `app/`, not repo-root
  `components/`**. This is a deliberate preservation of the Emergent
  app's own internal layout (recon: `ai/recon/raystrat-emergent-site-
  takeover.md` §5), not an oversight — do not move it to match the old
  Node 1/2/3 repo-root `components/` convention.
  - `SiteHeader.tsx` — `"use client"` (mobile-menu open state,
    `usePathname()` for `aria-current="page"` on the active nav link).
  - `SiteFooter.tsx` — server component, no client state.
  - `ContactForm.tsx` — `"use client"` (form state, honeypot ref, timing
    ref, `fetch("/enquiry/submit")`).
- `app/lib/site.ts` — shared constants only: `SITE_URL`, `IS_PRODUCTION`,
  `PUBLIC_EMAIL`, `LINKEDIN_URL`, `INDEXABLE_ROUTES`. No logic.
- `app/enquiry/submit/route.ts` — the one Route Handler; see Runtime
  Contracts Contract 2 for its full behaviour.
- `app/sitemap.ts`, `app/robots.ts` — Next.js file-convention metadata
  routes, both derived from `app/lib/site.ts`'s constants.
- `middleware.ts` — **repo root**, not inside `app/`. Matcher is exactly
  the three page routes (deliberately excludes `/robots.txt` and
  `/sitemap.xml`).
- `app/{icon,apple-icon,opengraph-image,twitter-image}.tsx` — recoloured
  during this capability to the site's real tokens (`--ink #0f0f0e` /
  `--accent #2743d4`) and, for the OG/Twitter pair, the real homepage
  eyebrow/H1 copy in place of the retired tagline — a disclosed judgement
  call (recon §7), not part of the archive as supplied.

## Established patterns

### 1. Content is the archive's, verbatim

Every word of copy on all three routes was verified against the actual
archive source during `raystrat-emergent-site-takeover`, not paraphrased.
Do not rewrite copy for a future capability without the same explicit
authority a copy change would require on any other capability.

### 2. Server/client boundary is minimal and explicit

Exactly two client components exist (`SiteHeader.tsx`, `ContactForm.tsx`),
both `"use client"` at the top of the file, both client-only because of
genuine interactivity (menu toggle + active-route styling; form state +
fetch), not by default. Every page component and `SiteFooter.tsx` is a
plain server component. Adding a new client component should be justified
the same way — real interactivity, not convenience.

### 3. Environment variables are read at module scope, server-side only

`SITE_ENV`, `ENQUIRY_DELIVERY_ENABLED`, `RESEND_API_KEY`,
`ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` — none prefixed `NEXT_PUBLIC_`,
none reach the browser bundle, all read directly via `process.env.X` at
module scope in server-only files (`app/lib/site.ts`,
`app/enquiry/submit/route.ts`, `app/layout.tsx`). Because they're read at
module scope, **the server must be restarted after changing any of them**
— Next.js does not hot-reload `.env` files. This is an established fact
about this app, not a suggestion.

### 4. The enquiry endpoint is the only server-side logic in the app

Full contract in `ai/runtime-contracts.md` Contract 2. Any future change
to validation limits, spam gating, or the delivery provider should update
that contract alongside the code, not just the code.

### 5. Verification wrappers are additive, numbered, and self-contained

Same convention as the prior (Node 1/2/3) version of this file, still
accurate: `001`–`004` are stack-wide (typecheck/lint/build/invariants);
capability-specific wrappers are `005+` and self-contained. `005`/`006`/
`007` (Node 1) are relocated to `scripts/verification/_legacy/` — they
assert facts about the deleted app and must not be un-retired without a
capability that restores what they check. `011` is this capability's own
wrapper; a new capability should add its own numbered wrapper rather than
editing `011`'s assertions.

### 6. No secrets, no fabricated evidence, no invented copy

Nothing under `app/components/` or any `page.tsx`/`layout.tsx` reads a
non-`NEXT_PUBLIC_` environment variable. No testimonials, case studies,
client names, or metrics exist anywhere in the copy (enforced by
`INV-004`) — none should be added without being supplied and true.

## Known limitations (disclosed, not implemented, not to be treated as done)

- **In-memory rate limiting** (`app/enquiry/submit/route.ts`) is
  per-process: resets on restart, does not hold across multiple instances
  or serverless invocations. Acceptable at current traffic; would need a
  shared store (e.g. Upstash/Redis) to scale out. Not fixed by this
  capability — HANDOFF.md's own disclosure, carried forward, not
  resolved.
- **No `next.config.js`, no security headers** (CSP, HSTS,
  `Referrer-Policy`, `Permissions-Policy`). Not present. Not added.
- **No `error.tsx` or `not-found.tsx`** — a bad URL gets the stock
  Next.js 404. Not present. Not added.
- **No automated accessibility audit has ever been run**, though the
  markup uses semantic landmarks, labelled inputs, `aria-invalid`/
  `aria-describedby`, `aria-live` status regions, and native `<details>`
  for FAQs. The markup patterns exist; the audit does not.
- **Email delivery has never been proven end-to-end.** No message has
  ever been sent through Resend from this codebase; `ENQUIRY_DELIVERY_
  ENABLED` has never been `true` outside a disabled/local state. Do not
  describe delivery as working — only as implemented-but-unproven.
- **Canonical-vs-sitemap trailing-slash inconsistency on the root URL** —
  a known, harmless, disclosed cosmetic mismatch (Next.js normalises the
  `<link rel="canonical">` tag without a trailing slash; the sitemap's
  root entry has one). Same resource either way.
