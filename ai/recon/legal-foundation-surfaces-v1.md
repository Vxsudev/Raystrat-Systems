# Recon — Legal Foundation Surfaces v1

**Capability:** `LEGAL_FOUNDATION_SURFACES_V1`
**Branch:** `feature/legal-foundation-surfaces`
**Date:** 2026-05-28
**State target:** RECON_READY → SPEC_LOCKED → TASK_GRAPH_LOCKED → EXECUTION_ACTIVE → VERIFICATION_REQUIRED → RELEASE_APPROVED

## Goal

Publish production-ready **Privacy** and **Terms** surfaces and reintroduce **only**
Privacy + Terms into the footer, with restrained institutional presentation. Cookie
consent banner is intentionally deferred. No regression to the homepage authority pass.

---

## 1. This is a *partial resurfacing*, governed by an existing deferral

`ai/deferred/deferred-public-trust-surfaces.md` (capability
`HIDE_DEFERRED_LEGAL_TRUST_SURFACES`) deliberately hid six surfaces from the footer:
**Documentation, Privacy, Terms, Trust, Principal, Continuity**. Privacy + Terms were
`#` placeholders with no route files. The doc defines explicit resurfacing conditions
(real content, legal review, bounded claims, intentional footer re-enable).

This capability resurfaces **Privacy + Terms only**. The other four
(Documentation, Trust, Principal, Continuity) **remain deferred**.

**Consequence — gate reconciliation required:**
`scripts/verification/022-hide-deferred-legal-trust-surfaces.sh` currently asserts the
footer references *none* of the six surfaces (Section A loops all six). Once Privacy +
Terms are restored to the footer, that assertion will FAIL for those two. 022 must be
updated so its footer-absence loop covers only the still-deferred four, while Privacy +
Terms move to a "now published / route exists" assertion. The deferred registry doc must
likewise be updated to mark Privacy + Terms RESURFACED (other four still hidden). 022's
Section D greps the doc for all six names — keep all six named (two with resurfaced status).

---

## 2. Route structure & template reuse

`src/app/` routes: `audit/ bytes/ continuity/ dashboard/ documentation/ login/ principal/
rhythm-lab/ services/ signup/ systems/`. No `privacy/` or `terms/` directory exists.

**Reusable template:** `src/app/principal/page.tsx` is the canonical restrained documentary
page. Pattern:
```
<div className="flex flex-col min-h-screen">
  <Header /> <main className="flex-1">
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container"><div className="max-w-2xl"> … </div></div>
    </section>
  </main> <Footer />
</div>
```
Tokens in use:
- Eyebrow: `text-xs font-semibold tracking-widest uppercase text-primary`
- H1: `text-3xl font-headline font-bold tracking-tighter md:text-4xl`
- Body: `text-foreground/80 leading-relaxed`
- `@tailwindcss/typography` is enabled (`tailwind.config.ts` plugins) — available for prose,
  but existing pages style manually. Legal pages will use a restrained manual hierarchy
  (max-w width, section headings, plain body) for documentary feel; no prose chrome.

Each page exports `metadata: Metadata` (title `… | Raystrat Systems`, description).
Marketing-domain isolation (INV-001): pages render Header/Footer only — safe without a
session, like `principal`. No AuthProvider, no Firebase client bootstrap (layout note).

**Floating widgets:** `src/components/app-content.tsx` gates `FloatingAiSuggestor` to
`/systems/`, `FloatingNoteTaker` to `/bytes/`. Legal routes get neither — clean by default.
No change needed.

---

## 3. Footer placement (restrained, near brand)

`src/components/footer.tsx`: brand block (top), then a 2-col grid (Systems / Engage,
`sm:grid-cols-2`), then a bottom utility bar (`© … Operational Systems Engineering` +
`ThemeToggle`, `font-mono text-xs`). The `legalLinks` array + "Legal" column were removed
by the prior deferral (grid is no longer `md:grid-cols-3`).

**Decision:** reintroduce Privacy + Terms as two low-noise inline links in the **bottom
utility bar**, beside the copyright line — not as a third grid column. This is the most
restrained, institutional placement, near the brand/copyright, and keeps the footer grid
at 2 columns (preserving 022's grid-rebalance assertion). Do **not** restore the old
`legalLinks` array name or a "Legal" heading column.

Mobile: bottom bar is already `flex-col gap-2 md:flex-row` — the two links sit in their own
row on mobile, copyright above, ThemeToggle below; renders cleanly with no layout change
beyond the inline link group.

---

## 4. Cookie strategy — deferred (no banner)

No adtech/retargeting/advanced-analytics stack present. A consent popup would be premature
compliance theater. Decision: embed a minimal cookie disclosure **section inside the Privacy
page** (no dedicated `/cookies` route — architecture does not benefit from one). Document the
banner as deferred infrastructure in `ai/deferred/cookie-consent-banner.md` with triggering
conditions (ads, retargeting, advanced analytics, EU-specific compliance expansion).

---

## 5. Content sourcing (no fabrication)

- Company: **Raystrat Systems**; operates from **India** (governing law = India).
- Principal: **Vasudev** (per `src/app/principal/page.tsx`).
- Public contact: **team@raystratsystems.com** (established public address in `content.ts`).
- Operational providers to disclose (factual, from `coding-patterns.md` /
  `runtime-contracts.md`): **Firebase** (Auth, Firestore, Functions, Hosting),
  **Google GenAI / Genkit** (server-side AI flows), **SendGrid** (transactional email),
  hosting/infrastructure (Firebase App Hosting / Google Cloud).
- **No** registered entity suffix (Pvt Ltd / LLP), GSTIN, or postal address exists in the
  codebase → do NOT invent one. Identify as "Raystrat Systems" operating from India.

**Banned (per boot directive):** invented certifications, GDPR cosplay, fake DPO,
"military-grade security", uptime/zero-risk/outcome guarantees, fiduciary/regulatory
accreditation claims, compliance badges.

---

## 6. SEO / sitemap

`src/app/sitemap.ts` enumerates routes explicitly. Add `/privacy` and `/terms` as low-priority
monthly entries. `robots.ts` allows indexing site-wide; legal pages may be indexed (standard).

---

## 7. Verification plan (→ `scripts/verification/023-legal-foundation-surfaces.sh`)

Assert: privacy + terms route files exist; footer contains Privacy + Terms links (+ hrefs
`/privacy`, `/terms`); deferred four (Documentation, Trust, Principal, Continuity) remain
absent from footer; no cookie banner/popup component mounted; no banned trust/security
language or fake compliance claims in the new pages; required Privacy + Terms sections
present; governing-law=India in Terms; cookie disclosure present in Privacy; footer still
renders brand/Systems/Engage; grid still 2-col. Plus: reconcile 022, run 001 typecheck /
003 build / full numeric regression suite, and (best-effort) route 200 checks.

## Stop condition

Privacy + Terms routes exist and are production-ready; footer legal links restored minimally;
cookie popup intentionally absent (documented); build + verification suite green; no visual
regression to the homepage authority pass.
