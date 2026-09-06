# Raystrat Systems — Website (PRD)

## Original Problem
Build a clean, professional homepage for Raystrat Systems, modeled on the content
structure, commercial logic and visual simplicity of a.team. Raystrat builds
customer-specific AI systems and provides forward-deployed engineering. Deliver one
complete, responsive homepage as a working preview before building additional pages.

## Stack / Architecture
- Next.js 15 (App Router) + TypeScript + React 18. No backend, no database.
- Project at /app/frontend (supervisor `frontend` runs `next dev` on :3000).
- Plain CSS (app/globals.css) with CSS variables. Google Font: Figtree (system fallback).
- Backend supervisor intentionally unused/FATAL — not needed for this static site.

## Design
- Light, neutral A.Team-style theme: white/off-white sections, near-black ink,
  one restrained blue accent (#2743d4) for eyebrows/step numbers/focus.
- Text wordmark "Raystrat Systems". No stock photos, no fabricated proof, no logos/testimonials.

## Implemented (2026-06)
- Homepage sections: Hero, The customer problem (2 cards), The offer (AI Solutions +
  Forward-Deployed Engineering cards), What the systems do (4 requirements),
  How we work (4 steps), Final action / contact form, Footer.
- Sticky header with desktop nav + accessible mobile menu (aria-expanded).
- In-page anchor navigation with smooth scroll + scroll-margin for sticky header.
- Contact form (Name, Work email, Company, What are you trying to solve?) with
  labels, client-side validation, aria-invalid/aria-describedby, aria-live status.
- Form is PREVIEW-ONLY: valid submit shows an honest "not sent or stored" notice — no false success.
- SEO/social metadata (title, description, OpenGraph, Twitter) in layout.tsx.
- Responsive; no horizontal overflow at 1920 or 390. Tested: 41/41 UI checks passed.

## Content refinement (2026-06, iteration 2)
- Replaced all homepage copy with user-supplied text: Hero, The problem, The offer (two
  columns with divider, each with "Discuss Your Project" link), Where AI can help (3
  applications, replaces old requirements grid), The enduring value, How we work (4 steps),
  Final action. No "illustrative" disclaimer label (user choice).
- Layout: open columns + dividers instead of bordered cards; section padding reduced
  (88px desktop / 60px mobile); h2 max-width for shorter heading lines.
- Header/footer/mobile CTA label -> "Discuss Your Project". Hero eyebrow kept.
- Wordmark home link scrolls to top via JS + closes mobile menu; `[id]{scroll-margin-top}`
  and `scroll-padding-top` prevent sticky-header overlap on all anchors.
- Tested: 53/53 frontend checks passed (/app/test_reports/iteration_2.json).

## AI Solutions page (2026-06, iteration 3)
- New route `/ai-solutions` (`app/ai-solutions/page.tsx`), static server component with
  route-specific metadata (title/description/canonical/OpenGraph).
- Sections (user-supplied copy, verbatim): Hero (Discuss Your Project + Explore Applications),
  The delivery problem, Applications (Reporting and review / Company knowledge / Document
  workflows — each with a small static flow line, e.g. Source files → Checks → Draft report →
  Human review, plus a "Define before building" line), Business context, Deliverables
  (definition-list layout, 4 items), Engagement (4 steps), Buyer questions (native
  `<details>/<summary>`, answers always in markup), Final action CTA -> `/#contact`.
- No A.Team metrics/customers/timelines, no prices/deadlines/guarantees, no imagery or
  fake interfaces. Reuses homepage typography, palette, buttons, dividers and spacing.
- Shared nav/footer extracted: `components/SiteFooter.tsx` (used by both pages); `SiteHeader`
  now uses next/link cross-page hrefs: `/`, `/ai-solutions`, `/#forward-deployed`,
  `/#how-we-work`, `/#contact` (+ aria-current on active route).
- Homepage: only change is hero secondary CTA -> `/ai-solutions` and shared footer. Copy unchanged.
- Tested: 62/62 frontend checks passed (/app/test_reports/iteration_3.json) — direct load/refresh,
  cross-page navigation, anchor offsets, keyboard-accessible questions, no overflow at 1920/390/320.

## Forward-Deployed Engineering page (2026-06, iteration 4)
- New route `/forward-deployed-engineering` (`app/forward-deployed-engineering/page.tsx`), static, with
  route-specific title/description/canonical/OpenGraph. User copy verbatim, 8 sections: Hero (Discuss Your
  Project -> /#contact, How We Work -> #engagement), Why forward deployment (split/prose), The work we take on
  (definition list, 5 items), How we work with your team (split/prose), Engagement (`ol.sequence` — horizontal
  dotted rail at desktop, vertical rail ≤900px), Choosing the engagement (two `.offer` columns: Explore AI
  Solutions -> /ai-solutions, Discuss Your Project -> /#contact, + overlap note), Questions (details/summary,
  5 items), Closing (eyebrow "Discuss your project", CTA -> /#contact). No new form.
- Eyebrows only where the brief supplied them (hero, closing); other sections use headings alone.
- Header/footer nav: Forward-Deployed Engineering -> `/forward-deployed-engineering` on all pages. Homepage
  `#forward-deployed` anchor preserved; homepage offer column link renamed "Explore Forward-Deployed
  Engineering →" -> `/forward-deployed-engineering` (user choice). All "Discuss Your Project" links -> form.
- AI Solutions fixes: final eyebrow "Final action" -> "Discuss your project"; `.flow` lists stack vertically
  with "↓" connectors at ≤700px (no wrapped arrows).
- Tested: all checks passed (/app/test_reports/iteration_4.json) — direct load/refresh, 3-page navigation,
  contact-link offsets, keyboard FAQ, focus states, heading order, 1920/390/320, no overflow, regressions.

## Launch readiness — contacts, enquiry delivery, indexing (2026-06, iteration 5)
- Contact details (shared footer, so present on all three pages): `founder@raystratsystems.com`
  as a mailto link + LinkedIn `https://www.linkedin.com/company/raystrat-systems` (new tab).
  Private recipient `vp@raystrat.com` lives ONLY in `frontend/.env` (`ENQUIRY_TO_EMAIL`) and is
  verified absent from all rendered HTML/client JS.
- Enquiry delivery: server-side Next.js route handler `POST /enquiry/submit`
  (`app/enquiry/submit/route.ts`). NOT under `/api` because the platform ingress reroutes
  `/api/*` to port 8001. Uses the Resend REST API directly (no SDK), key server-side only.
  Server validation (required fields, email regex, length caps 120/254/160/4000, min 10 chars),
  honeypot field `website` + <2.5s timing rejection (422), in-memory IP rate limit 3 per 15 min
  (429) counted only on requests that pass validation+spam checks. Fixed recipient server-side,
  visitor email used as `reply_to` only. Success returned only when Resend accepts.
- Form UX: `ContactForm` posts JSON, keeps all typed values on any failure, shows honest error
  (`contact-form-error-status`), success only on `{ok:true}` (`contact-form-status`).
- DELIVERY IS BLOCKED by an explicit kill switch: `ENQUIRY_DELIVERY_ENABLED=false` in
  `/app/frontend/.env`. Even with a key present the endpoint returns 503 `not_configured` and the
  homepage keeps the "not yet switched on" note, so the notice cannot disappear before delivery is
  proven. Setup required: (1) verify `raystratsystems.com` in Resend using a `send` subdomain
  (records: MX + SPF TXT on `send`, DKIM TXT on `resend._domainkey`, optional DMARC on `_dmarc`) —
  raystratsystems.com DNS only, root MX/SPF untouched, raystrat.com never touched; (2) create a
  sending-only API key; (3) set `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL=enquiries@send.raystratsystems.com`
  (or the verified sender chosen), then flip `ENQUIRY_DELIVERY_ENABLED=true` ONLY after the Resend
  domain status reads "verified" and one labelled test send is accepted and confirmed received.
- GitHub: remote `origin https://github.com/Vxsudev/Raystrat-Systems` (branch `main`), pushed via
  the chat "Save to GitHub" button. `.gitignore` line 4 `.env*` — confirmed `frontend/.env` is
  ignored, so no secret is ever committed.
- SEO: `app/sitemap.ts` -> `/sitemap.xml` with exactly the 3 `https://raystratsystems.com` URLs.
  `app/robots.ts` env-aware: production allows crawling + `Sitemap:`/`Host:`; preview allows
  crawling (so crawlers can READ the noindex) and omits the sitemap. `middleware.ts` sets
  `X-Robots-Tag: noindex, nofollow` on the 3 page routes in preview only; layout metadata sets
  meta robots noindex/nofollow/nocache in preview and index/follow in production. Canonicals for
  all three pages point at production `https://raystratsystems.com` (`metadataBase` fixed from
  the old `raystrat.systems`). Toggle with `SITE_ENV=preview|production` in `frontend/.env`.
- Known nit: homepage canonical renders without trailing slash while sitemap root has one
  (Next normalises the link tag). Same resource; non-blocking.
- Tested: `/app/test_reports/iteration_5.json` — 9/9 endpoint tests, 20+ UI checks, 100% pass,
  no regressions at 1920/390/320.

## Not connected / decisions to confirm
- Email delivery blocked pending Resend API key + verified sender under raystratsystems.com.
- Inbox receipt NOT yet confirmed (provider acceptance ≠ delivery); a labelled test send is
  required once credentials are in place.
- Do not publish to production domain / do not touch existing repo, DNS until reviewed.

## Backlog (after review)
- P1: Configure Resend key + verified sender, then run one labelled test enquiry and confirm receipt.
- P2: Add authentic proof (logos/case studies) only when supplied.
- P3: Dedicated "How We Work" page (currently a homepage anchor).
