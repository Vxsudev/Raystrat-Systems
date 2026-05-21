# Engineering Journal — Raystrat Systems Website

Append-only. Each entry records what changed, why, and what risks remain.

---

## 2026-05-21 — Homepage Repositioning Implementation (Phase 1)

**Author:** Claude Sonnet 4.6 (subagent-driven execution)  
**Spec authority:** `specs/phases/phase-1.md`  
**Capability:** RAYSTRAT_HOMEPAGE_REPOSITIONING_IMPLEMENTATION

**What changed:**

### Content Layer
- `src/data/content.ts` — Complete rewrite of 6 service entries with new operational-systems framing, slugs, titles, subheads, bullets, pageContent, and presetQuestions. New system names: Demand Acquisition, Follow-Through Infrastructure, Frontline Support, Operations Control, Command Intelligence, Custom Operations Build. New slugs: `demand-acquisition`, `follow-through`, `frontline-support`, `operations-control`, `command-intelligence`, `custom-operations`. Navigation updated to `[Systems, Bytes]`. FAQ replaced with 5 systems-engagement questions. Unused icon imports removed.

### Route Restructuring
- `src/app/systems/[slug]/page.tsx` — New route for operational systems detail pages (mirrors services/[slug]/page.tsx)
- `next.config.js` — Added `async redirects()` with 6 explicit 301 redirects from `/services/*` → `/systems/*`
- `src/app/sitemap.ts` — Updated to `/systems/` paths; added `/systems` to mainRoutes

### Href Normalization (T3)
- All 6 `/services/` href references in `src/` updated to `/systems/`
- `app-content.tsx`: widget gating updated for `/systems/` pathname
- `ai-suggestor.tsx`: link target updated
- `service-suggester.tsx`: router.push target updated
- `service-page-client.tsx`: next-system link updated; "Agent Found!" → "System Identified."; "next agent" → "next system"
- `actions.ts`: email template URL updated + domain fixed from raystrat.com → raystratsystems.com

### Section Replacements
- `src/components/sections/hero.tsx` — New static headline "Operational Breakdown / Is Preventable." with structural failure subtext. DynamicHeadline removed. CTA: "Book Operational Audit" via CalendlyButton.
- `src/components/sections/failure-thesis.tsx` — NEW component. Two-column: 5 choke points (left) + structural failure diagnosis (right). Positioned between Hero and SystemsCatalogue.
- `src/components/sections/services.tsx` — Section headline → "Operational Systems." Section ID → `systems`. Subtext updated to governance framing. animate-pulse removed. Subhead added per card.
- `src/components/sections/agent-advantage.tsx` — "The Agent Advantage" fully replaced by "Governance by Design" — 6 governance properties: Audit Trail Architecture, SLA Enforcement, Escalation Protocol, Failure-Resistant Architecture, Compliance Controls, Operational Continuity.
- `src/components/sections/industries.tsx` — 3 industry cards removed (Retail, Hotels, Education). 3 retained (Fintech, Legal, Healthcare) with governance-framing descriptions. Header: "Governed Systems for High-Accountability Environments."
- `src/components/sections/results.tsx` — "Cut the Fat" grid fully replaced by Operational Audit CTA block: headline, audit description, 3-item audit output grid, CalendlyButton CTA.

### Homepage Composition
- `src/app/page.tsx` — FailureThesis imported and inserted. New section order: Hero → FailureThesis → Services → AgentAdvantage → Industries → Results → ByteOfTheWeek → Faq.

### AI Flow Alignment
- `src/ai/flows/contextual-assistant.ts` — System prompt updated to operational-systems vocabulary ("operational advisor", "governed execution systems", "prerequisite operational problems")
- `src/ai/flows/service-suggester.ts` — System prompt updated to analyze "root structural failures" and recommend systems by governance layer

### Verification
- `scripts/verification/005-raystrat-homepage-repositioning.sh` — New script. 10 positioning checks. All 10 pass.
- INV-001, INV-002, INV-003 — All pass post-implementation.
- TypeScript: 19 pre-existing errors; zero new errors introduced by repositioning work.

**Architectural reasoning:**

The positioning shift from agent-first to operational-systems-first required changes at every layer: copy (content.ts), routes (/systems/), section narratives (8 section files), AI vocabulary (2 flow files), and the homepage arc (page.tsx). The changes were executed in dependency order: content.ts first (slug authority), then routes (redirect safety), then hrefs (link integrity), then sections (narrative), then composition (arc enforcement), then AI flows (vocabulary alignment), then verification.

The single most important structural decision: the Failure Thesis section (new component, position 2 in arc) separates the homepage from all AI agency competitors. No agent vendor leads with structural failure diagnosis before showing product. This is the differentiating arc move.

**Naming decisions:**
The final system names balance operational clarity with spoken readability:
- "Follow-Through Infrastructure" (not "Pursuit Continuity System") — the word "pursuit" is abstract; "follow-through" is immediately understood in business context
- "Frontline Support" (not "Support Infrastructure") — "frontline" implies real-time, customer-facing responsibility
- "Operations Control" (not "Execution Backbone") — "control" implies governance authority; "backbone" implies passivity
- "Command Intelligence" (not "Data Command Agent") — "command" preserved from original (strong); "intelligence" is the systems layer

**Route restructuring decisions:**
- 6 explicit redirects (not a wildcard `:slug*` redirect) to ensure old-slug → new-slug mapping works correctly. A wildcard would pass `leads-hunter-agent` as the slug and fail to find it in the new content.ts.
- `/services` base path also redirected to `/systems`.
- Old `src/app/services/[slug]/page.tsx` left in place (not deleted) to avoid breaking potential legacy references until the old routes are fully confirmed dead by redirect testing.

**Redirect strategy:**
301 (permanent) redirects registered in next.config.js. These apply at the Next.js middleware layer, before React rendering. They will function in both development (via dev server) and production (via Firebase Hosting + Next.js server).

**AI vocabulary migration:**
Both Genkit flows were updated at the prompt layer only — no schema, function, or flow definition changes. The `serviceList` variable in both flows is built dynamically from `services` in content.ts, so it automatically reflects the new system names and slugs. The vocabulary update ensures the floating AI assistant on system pages does not use agent-first language that contradicts the homepage positioning.

**Unresolved follow-ups:**

- [ ] Delete `src/app/services/[slug]/page.tsx` after confirming 301 redirects function correctly in production
- [ ] Update `CalendlyButton` label text to "Book Operational Audit" at the component level (currently relies on children prop)
- [ ] Add `src/app/systems/` to the systems index page (currently only [slug] pages exist; no `/systems` listing page)
- [ ] Update `FavoriteAgentButton` component copy from "agent" language to "system" language (lower priority — internal UI)
- [ ] Add `src/app/audit/` standalone page when audit CTA volume warrants it (future expansion surface)
- [ ] Fix pre-existing broken API routes (`contextualAssistantFlow` / `notesAnalyzerFlow` export mismatches)

---

## 2026-05-21 — Engineering OS Adapter Install

**Author:** Claude Sonnet 4.6 (automated)

**What changed:**

1. **Removed stale root `ai/flows/` duplicates** — `ai/flows/contextual-assistant.ts` and `ai/flows/notes-analyzer.ts` were unreferenced dead copies of the files in `src/ai/flows/`. Both were deleted. `src/ai/flows/` is the sole canonical location (`@/ai/flows/` path alias).

2. **Added Engineering OS as git submodule** — `vendor/engineering-os/` now tracks `https://github.com/Vxsudev/RaystratSystems-AI-Engineering-OS.git` at `heads/main`. The OS runtime is read-only from this repo.

3. **Created adapter scaffold:**
   - `.engineering-os/adapter.config.sh` — project-specific OS configuration
   - `.engineering-os/invariants/` — executable invariant rule scripts (INV-001, INV-002, INV-003)
   - `ai/state_registry.json` — OS state machine (initialized empty)
   - `ai/invariant-registry.md` — invariant catalogue
   - `ai/product-invariants.md` — architectural invariants
   - `ai/runtime-contracts.md` — server/client boundary contracts
   - `ai/service-boundaries.md` — surface map and boundary rules
   - `ai/coding-patterns.md` — stack and pattern reference
   - `ai/repo-index.md` — entry points and key files
   - `specs/`, `tasks/` — OS-controlled artifact directories
   - `scripts/verification/` — verification wrapper scripts

4. **Authored first three invariants:**
   - INV-001: Marketing domain isolation (marketing host never renders dashboard)
   - INV-002: No client-side secret exposure (AI/admin keys server-only)
   - INV-003: Genkit flows server-only boundary (never imported from client components)

**Why:**

This repo contains a production Next.js site with two deployment surfaces (marketing + app dashboard). Without an explicit governance layer, the architectural boundaries between marketing, app, and AI are implicit and unenforced. The OS adapter installs that governance without changing application behavior.

**Architectural reasoning:**

- Root `ai/` was chosen for OS governance over `src/ai/` because `@/ai/` is the application AI layer alias. Keeping governance separate from application code prevents namespace confusion.
- Git submodule (not copy) was used for `vendor/engineering-os/` to ensure the OS runtime evolves without requiring manual syncs.
- The git root for this repo is `/Users/vasudevarao/` (home-level monorepo). The submodule is registered at that level with path `Raystrat-Systems/vendor/engineering-os`.

**Risks discovered:**

1. **Home-level git root** — The Raystrat-Systems directory is not its own git repo; it is a subdirectory of a home-directory-level git repo. The submodule is registered in `/Users/vasudevarao/.gitmodules`. This is functional but unusual. If this project is ever extracted to its own git repo, the submodule path will need to be re-registered.

2. **`apps/` and `home/` legacy archives** — `home/vp/agents-app.tar.gz` and `apps/` are leftover artifacts not referenced by the build. They are not part of this install but should be removed in a housekeeping pass.

3. **Stale junk file** — `Raystrat-Systems/[Provide the ABSOLUTE, FULL path to the file being modified]` is a 165-byte file containing literal prompt template placeholder text. Safe to remove.

4. **Phase model is single-phase for this repo** — A marketing site realistically operates in one active phase at a time. The `specs/phases/` structure is present but `phase-1.md` has not been authored yet; that belongs to the first substantive spec (homepage repositioning or similar).

**Verification results:**

| Check | Result | Notes |
|-------|--------|-------|
| INV-001 (marketing isolation) | PASS | 2/2 checks |
| INV-002 (no client secrets) | PASS | 2/2 checks |
| INV-003 (Genkit server boundary) | PASS | 2/2 checks; `import type` distinction added |
| TypeScript typecheck | PRE-EXISTING FAILURES | Broken API routes and action types existed before install; zero new errors from adapter |
| ESLint | SKIP | No ESLint config in project; pre-existing condition |
| Next.js build | PRE-EXISTING FAILURES | `contextualAssistantFlow`/`notesAnalyzerFlow` never exported from `src/ai/flows/`; pre-existing |

**INV-003 refinement discovered during validation:**
`src/components/ui/service-suggester.tsx` uses `import type { ServiceSuggesterOutput }` — a TypeScript type-only import that is erased at compile time. INV-003 was updated to distinguish `import type` (safe) from runtime imports (forbidden). This is an architectural nuance that pre-existing code relied on correctly, and the invariant now reflects it accurately.

**Unresolved follow-ups:**

- [ ] Author `specs/phases/phase-1.md` when the first capability spec is initiated
- [ ] Remove legacy `apps/` and `home/` archive artifacts
- [ ] Remove junk placeholder file `[Provide the ABSOLUTE, FULL path...]`
- [ ] Fix pre-existing broken API routes: `contextualAssistantFlow` not exported from `contextual-assistant.ts`; `notesAnalyzerFlow` not exported from `notes-analyzer.ts`
- [ ] Fix pre-existing TypeScript errors in `src/app/actions.ts` (lines 77, 142), `src/app/page.tsx` (headers API), `src/lib/auth/getAuthenticatedUser.ts`
- [ ] Add ESLint config (`eslint.config.mjs`) to activate the `002-lint.sh` gate
- [ ] Consider extracting Raystrat-Systems into its own git repo (isolates submodule registration, simplifies git history)
- [ ] Decide submodule pinning policy (track `main` vs. pin to commit SHA for stability)

---

## 2026-05-21 — Positioning Refinement Pass

**Author:** Claude Sonnet 4.6 (subagent-driven execution)
**Spec authority:** Directive RAYSTRAT_POSITIONING_REFINEMENT_PASS
**Capability:** RAYSTRAT_POSITIONING_REFINEMENT_PASS

**What changed:**

### Floating CTA Alignment (TARGET 1)
- `src/components/ui/service-suggester.tsx` — Floating trigger: "Suggest an Agent" → "Diagnose a Breakdown". Dialog title: "AI-Powered Agent Suggester" → "Operational System Finder". Dialog description: updated to systems-aligned framing. All routing, interaction behavior, and 30-second auto-open logic preserved.
- `src/components/ui/floating-ai-suggestor.tsx` — SheetTitle: "Agent Assist" → "Operational Advisor". sr-only text: "AI Assistant" → "Operational Advisor". All localStorage conversation behavior, Sheet structure, and AI coupling preserved.

### Agent Language Leakage Removal (TARGET 3)
- `src/components/ui/favorite-agent-button.tsx` — Button: "Favorite This Agent" → "Save This System". Dialog title: "Favorite:" → "Save:". Dialog description: updated to consultation/system framing. Internal prop names (`agentName`, `agentSlug`) left unchanged — no user exposure.
- `src/components/ui/notes-taker.tsx` — Textarea placeholder and description copy updated to operational/systems vocabulary. Component behavior unchanged.
- `src/components/sections/agent-advantage.tsx` — Section `id="agent-advantage"` → `id="governance"`. Export name `AgentAdvantage` preserved (page.tsx imports it by that name). Section content unchanged.
- `src/app/layout.tsx` (runtime validation fix, same session) — Metadata title/OG/Twitter updated from "AI Automations Wing" to "Operational Systems Engineering". Description updated to systems framing.

### Vertical Section Refactor (TARGET 2)
- `src/components/sections/industries.tsx` — All 12 feature bullets across Fintech, Legal, Healthcare rewritten from "agents" framing to governed workflow/infrastructure framing. Card structure, icons, section id, descriptions, and header copy preserved.
  - Fintech: governed credit decisioning, fraud escalation workflows, compliant KYC onboarding infrastructure, continuity-assured customer operations
  - Legal: case analysis infrastructure, governed document summarization, e-discovery with chain-of-custody controls, client intake with SLA enforcement
  - Healthcare: clinical documentation workflows, scheduling infrastructure with escalation logic, patient intake with triage routing and audit trail, patient follow-up and continuity management

### /systems Index Route (TARGET 4)
- `src/app/systems/page.tsx` — NEW. Pure server component. Metadata: "Operational Systems | Raystrat Systems". Structure: tight header block (no hero), 3-column systems grid pulling from `services` array in `@/data/content`, audit CTA at bottom (CalendlyButton). Cards link to `/systems/[slug]`, render icon, title, subhead, and 3 bullets each. Header and Footer included explicitly (same pattern as homepage).

### Recon Artifact
- `ai/recon/raystrat-positioning-refinement-pass.md` — Complete pre-implementation surface map: all agent-language locations, floating CTA ownership, vertical section dependency graph, systems route architecture, AI assistant coupling surfaces, risk assessment.

### Verification
- `scripts/verification/006-raystrat-positioning-refinement-pass.sh` — 15 checks. All 15 pass.
- `scripts/verification/005-raystrat-homepage-repositioning.sh` — 10/10 pass (no regressions).
- `scripts/verification/004-invariants.sh` — 3/3 pass (INV-001, INV-002, INV-003).

**Reasoning:**

*CTA language:* "Diagnose a Breakdown" was chosen over "Map My Operations" or "Suggest a System" because it aligns with the primary positioning thesis ("operational breakdown is preventable"). A founder who lands on the site in breakdown mode recognizes this framing immediately. "Operational System Finder" for the dialog title is functional and enterprise-credible without being jargon-inflated.

*"Operational Advisor" for the assistant:* The assistant on system pages is a contextual advisor, not a feature selector. "Advisor" implies expertise and consultation — consistent with the audit-first engagement model.

*"Save This System" for favorite-agent-button:* "Save" is action-neutral and enterprise-appropriate. "This System" anchors the language. The internal prop names (agentName, agentSlug) were intentionally left unchanged — they're variable names, not visible copy, and renaming them would require cascade changes across actions.ts, favorite-agent-form.tsx, and service-page-client.tsx with no user benefit.

*Industries section rewrite:* The critical insight is that the section header and card descriptions were already correct — only the feature bullets remained in agent-catalog cognition. The replacement direction follows the directive's "governed workflows / operational infrastructure" framing and maintains the same density and readability.

*Section id "governance":* Changing `id="agent-advantage"` to `id="governance"` is low-risk (not linked in nav) but meaningful — if the section id is ever referenced in tracking, analytics, or future anchor links, it now matches the content.

*Header/Footer in /systems/page.tsx:* ServicePageClient renders its own Header/Footer internally, so /systems/[slug] pages have navigation. The new /systems/page.tsx is a plain server component and required explicit Header/Footer imports to match the homepage pattern.

**Pre-existing gate status (unchanged from Phase 1):**

| Gate | Status | Reason |
|------|--------|--------|
| 001-typecheck.sh | PRE-EXISTING FAILURE | Same 17 errors as before; 0 new errors from this pass |
| 002-lint.sh | SKIP | No ESLint config (pre-existing) |
| 003-build.sh | PRE-EXISTING FAILURE | `buffer-equal-constant-time` Node.js v25 crash during static generation (webpack alias bypassed by externals); API route export name mismatches (`contextualAssistantFlow`, `notesAnalyzerFlow`) |
| 004-invariants.sh | PASS | 3/3 |
| 005-homepage-repositioning.sh | PASS | 10/10 |
| 006-refinement.sh | PASS | 15/15 |

**Smoke test result:**
Enterprise founder landing on the site now encounters:
1. Hero: "Operational Breakdown / Is Preventable" — structural failure framing ✅
2. FailureThesis: 5 choke points named, structural diagnosis given ✅
3. Systems section: 6 operational systems, no "agent" language ✅
4. Governance layer: "Governance by Design" with 6 governance properties ✅
5. Industries: "Governed Systems for High-Accountability Environments" with workflow-framing bullets ✅
6. Results: Operational Audit CTA — audit-first engagement model ✅
7. Floating trigger: "Diagnose a Breakdown" — consistent with positioning ✅
8. Assistant: "Operational Advisor" — consistent with governed execution identity ✅
9. /systems: clean catalog, infrastructural feel, audit CTA at bottom ✅

The site now reads as operational systems company at every touchpoint. No AI-agency framing survives on any visible surface in the marketing domain.

**Unresolved follow-ups:**

- [ ] Fix pre-existing broken API routes: export `contextualAssistantFlow` from `contextual-assistant.ts` (currently exported as `getContextualAssistantResponse`), export `notesAnalyzerFlow` from `notes-analyzer.ts` (currently exported as `analyzeNotes`)
- [ ] Fix `buffer-equal-constant-time` for production build (webpack alias does not intercept externals; needs `package.json` overrides or npm patch approach)
- [ ] Fix pre-existing TypeScript errors in `src/app/actions.ts`, `src/app/page.tsx`, `src/lib/auth/getAuthenticatedUser.ts`, API routes
- [ ] Add ESLint config to activate `002-lint.sh` gate
- [ ] Delete `src/app/services/[slug]/page.tsx` after production redirect confirmation
- [ ] Add `/systems` to sitemap if not already there (was added in Phase 1 per journal)
- [ ] Long-term: `FavoriteAgentButton` component and form prop names (`agentName`, `agentSlug`) can be renamed to `systemName`/`systemSlug` in a dedicated refactor pass (low user impact, requires cascade across 3 files)

---

## 2026-05-21 — Visual System Phase A: Token Swap

**Author:** Claude Sonnet 4.6 (subagent-driven execution)  
**Spec authority:** `specs/phases/phase-visual-system.md` §29.1  
**Capability:** RAYSTRAT_VISUAL_SYSTEM_PHASE_A_TOKEN_SWAP

**What changed:**

### Logo Sampling
- `public/raystrat-logo.png` sampled (512×512 px) — 62 pure blue pixels identified
- **Canonical Raystrat Blue:** HSL `214 98% 40%` | RGB(4, 89, 202) | Hex `#0459ca`
- Character: mid-saturation corporate/financial-tech blue, NOT navy, NOT electric, light-canvas native
- Logo is white-canvas native — confirms light-primary site architecture

### Token Replacement — `src/app/globals.css`
`:root` and `.light` (both updated from dark-canvas/gold to light-canvas/blue):

| Token | Before | After |
|-------|--------|-------|
| `--background` | `0 0% 0%` (pure black) | `0 0% 99%` (near-white canvas) |
| `--foreground` | `0 0% 100%` (white) | `220 15% 8%` (near-black) |
| `--card` | `0 0% 10%` (dark gray) | `0 0% 100%` (white) |
| `--card-foreground` | `0 0% 100%` | `220 15% 8%` |
| `--popover` | `0 0% 0%` | `0 0% 100%` |
| `--popover-foreground` | `0 0% 100%` | `220 15% 8%` |
| `--primary` | `43 74% 49%` (GOLD) | `214 98% 40%` (Raystrat blue) |
| `--primary-foreground` | `220 5.9% 6.1%` | `0 0% 100%` (white on blue) |
| `--secondary` | `0 0% 21.2%` | `220 10% 96%` |
| `--secondary-foreground` | `0 0% 100%` | `220 15% 8%` |
| `--muted` | `0 0% 21.2%` | `220 10% 96%` |
| `--muted-foreground` | `0 0% 63.9%` | `220 10% 45%` |
| `--accent` | `0 0% 21.2%` | `220 10% 92%` |
| `--accent-foreground` | `43 74% 49%` (GOLD) | `220 15% 8%` |
| `--border` | `0 0% 21.2%` | `220 10% 88%` |
| `--input` | `0 0% 14%` | `220 10% 88%` |
| `--ring` | `43 74% 49%` (GOLD) | `214 98% 40%` (Raystrat blue) |
| `--structure` | (absent) | `220 24% 12%` (NEW: dark anchors) |
| `--structure-foreground` | (absent) | `0 0% 99%` (NEW: text on structure) |

`.dark` (updated from pure-black/gold to navy/blue):
- `--background`: `0 0% 0%` → `220 24% 5%` (dark navy instead of pure black)
- `--primary`: `43 74% 49%` (gold) → `214 90% 58%` (lighter blue for dark bg legibility)
- `--accent-foreground`: gold → `214 90% 68%`
- `--ring`: gold → `214 90% 58%`
- Added `--structure: 220 24% 8%`, `--structure-foreground: 0 0% 95%`

### Layout — `src/app/layout.tsx`
- Removed `className='dark'` from `<html>` — site no longer force-boots in dark mode
- `ThemeProvider defaultTheme`: `"dark"` → `"light"` — canonical surface is now light

### Page Wrapper — `src/app/page.tsx`
- Removed `bg-dotted-pattern bg-fixed` from outer homepage wrapper div
- Rationale: radial dotted lattice was a dark-canvas texture; incompatible with light background and adds visual noise on white

### CalendlyButton — `src/components/ui/calendly-button.tsx`
- `primary_color=d4af37` (gold) → `primary_color=0459ca` (Raystrat blue)
- Calendly popup widget now uses brand-consistent blue accent

### Artifacts
- `ai/recon/raystrat-visual-system-phase-a-token-swap.md` — complete sampling log, before/after table, scope compliance confirmation
- `scripts/verification/007-raystrat-visual-system-phase-a.sh` — 11 verification checks

### Verification
- `007-raystrat-visual-system-phase-a.sh` — 11/11 PASS
- `006-raystrat-positioning-refinement-pass.sh` — 15/15 PASS (no regressions)
- `005-raystrat-homepage-repositioning.sh` — 10/10 PASS (no regressions)
- `004-invariants.sh` — 3/3 PASS (INV-001, INV-002, INV-003)

**Dev server validation:**
- Booted on port 3001 (3000 occupied)
- `<html lang="en">` — no dark class in SSR output ✓
- ThemeProvider inline script: `c.add('light')` on first load ✓
- Compiled CSS: `--background: 0 0% 99%`, `--primary: 214 98% 40%`, `--structure: 220 24% 12%` ✓
- No runtime errors on homepage load ✓

**Architectural reasoning:**

*Logo sampling first:* The sampling exercise confirmed the exact hue is 214–215°, saturation ~97–100%, lightness ~39–40%. This is darker than the interim spec estimate of `222 89% 55%`. The actual brand blue is more restrained — corporate-weight, not electric. Using the sampled value produces visual fidelity to the physical brand asset.

*Light-canvas default (not system-preference):* `defaultTheme="light"` was chosen over `enableSystem` default because the logo and brand are white-canvas native. Letting system preference win could produce a dark site on devices where users happen to have dark mode on — breaking the brand architecture. Users who prefer dark can toggle via ThemeToggle.

*Dark mode navy background (not pure black):* The `.dark` background was shifted from `0 0% 0%` (pure black) to `220 24% 5%` (very dark navy). This maintains the dark mode but makes it tonally consistent with the Raystrat blue primary — the navy hue creates a coherent color family rather than a neutral black field.

*`--structure` token:* Provides an explicit CSS custom property for header, footer, and dark-band sections to reference without touching the `--background` canonical. Header and footer can use `bg-[hsl(var(--structure))]` without conflicting with the light canvas body. Phase B will wire this into component `className` attributes.

*Dotted pattern removal:* The `bg-dotted-pattern` was a dark-canvas affordance (foreground opacity dots over black). On white, the dots would be near-black specks producing a dirty texture rather than the subtle grid effect. Removal is the correct call; if a light-mode texture pattern is needed in future, Phase C can introduce one.

**Phase A scope boundary compliance:**
Phase A was strictly token-level (CSS variables, one URL param, two boolean/string config values). The following were NOT touched: hero scale, card styles, hover states, animations/motion, FloatingAdvisor behavior, header structure, ThemeToggle position, any content/copy, systems routes, positioning language. Phase B (component wiring), C (section architecture), and D (motion/interaction) remain pending.

**Pre-existing gate status (unchanged):**

| Gate | Status | Reason |
|------|--------|--------|
| 001-typecheck.sh | PRE-EXISTING FAILURE | Same errors as prior passes; 0 new from Phase A |
| 002-lint.sh | SKIP | No ESLint config (pre-existing) |
| 003-build.sh | PRE-EXISTING FAILURE | buffer-equal-constant-time / API route export mismatches (pre-existing) |
| 004-invariants.sh | PASS | 3/3 |
| 005-homepage-repositioning.sh | PASS | 10/10 |
| 006-refinement.sh | PASS | 15/15 |
| 007-phase-a.sh | PASS | 11/11 |

**Unresolved follow-ups:**

- [ ] Phase B: Wire `--structure` token into Header and Footer component `className` (replace current `bg-background` or hard-coded dark classes)
- [ ] Phase B: Wire `text-primary` → confirms blue renders correctly on card CTAs, button labels, and icon tints against white card surfaces
- [ ] Phase C: Dark-band section (FailureThesis, Results) — verify bg-[hsl(var(--structure))] + foreground legibility
- [ ] Phase D: Motion and interaction audit (unchanged from Phase A — no scope items here)
- [ ] Pre-existing: Fix broken API routes (contextualAssistantFlow / notesAnalyzerFlow export mismatches)
- [ ] Pre-existing: Fix buffer-equal-constant-time for production build
- [ ] Pre-existing: TypeScript errors in actions.ts, page.tsx, getAuthenticatedUser.ts

---

## 2026-05-21 — Visual System Phase B: Component Doctrine

**Author:** Claude Sonnet 4.6 (subagent-driven execution)  
**Spec authority:** `specs/phases/phase-visual-system.md` §13–§18  
**Capability:** RAYSTRAT_VISUAL_SYSTEM_PHASE_B_COMPONENT_DOCTRINE

**What changed:**

### Card Primitive — `src/components/ui/card.tsx`
- `rounded-lg` → `rounded-md` (6px): eliminates startup-SaaS soft radius globally
- Removed `shadow-sm`: site uses borders for structural separation, not shadow depth
- Global impact: all card instances (services, industries, systems index, audit deliverables) inherit fix

### Hero Rhythm — `src/components/sections/hero.tsx`
- Removed `min-h-[calc(100vh-4rem)] flex items-center justify-center` — hero no longer occupies full viewport
- Added `py-20 md:py-28` — content-determined height; FailureThesis now begins to peek at viewport bottom
- Headline scale: `text-6xl sm:text-7xl md:text-8xl` → `text-5xl md:text-6xl` (Display tier per §9.2; 60px max)
- Added `leading-tight tracking-tighter` to headline for proper display-tier treatment
- Added eyebrow: `OPERATIONAL SYSTEMS ENGINEERING` in `text-xs font-semibold tracking-widest uppercase text-muted-foreground`
- CTA: replaced ghost/custom override (`variant="ghost" bg-background text-primary border py-4 px-10 text-xl`) with canonical `variant="default" size="lg"` — hero CTA now visually identical to Results CTA
- Container: removed `max-w-9xl` — no spec basis; uses default centered container

### Services Cards — `src/components/sections/services.tsx`
- Removed `group-hover:scale-110 group-hover:-rotate-6` from icon — forbidden motion per §18.3
- Removed `group-hover:shadow-lg group-hover:shadow-primary/20` — forbidden shadow lift per §14.3
- `border-2 border-transparent` → `border border-transparent` — 1px border per §14.2
- `transition-all duration-300` → `transition-colors duration-150` — canonical motion timing
- Removed duplicate italic CardDescription from CardContent — §9.6 italic removed; §14.4 one subhead per card
- Reduced icon container: `p-3 w-6 h-6` → `p-2.5 w-5 h-5` — proportionally tighter
- Added "View System →" trailing link affordance per §14.4

### Section Backgrounds
- `failure-thesis.tsx`: `bg-card/50` → `bg-secondary` — solid tint per §12.2 (opacity artifacts removed)
- `agent-advantage.tsx`: `bg-card/50` → `bg-secondary` — same
- `industries.tsx`: section `bg-card/50` → `bg-secondary`; cards `bg-card/50` → `bg-card` (solid white cards on tinted section)

### AgentAdvantage Container — `src/components/sections/agent-advantage.tsx`
- `rounded-2xl` → `rounded-md` — §14.2 eliminates rounded-2xl
- `bg-background/50` → `bg-background` — solid (opacity artifact removed)
- Icon markers: `rounded-full` → `rounded-sm` — §14.5 icon containers use square, not circle

### Results Section — `src/components/sections/results.tsx`
- `py-20 md:py-32` → `py-16 md:py-24 lg:py-32` — canonical section spacing
- H2: `text-4xl sm:text-5xl md:text-6xl` → `text-3xl md:text-4xl` — Title 1 per §9.2; less drama, more authority
- `bg-card text-card-foreground` → `bg-secondary` — consistent with other tinted sections
- Audit deliverable card: `bg-background/50` → `bg-background`; `rounded-lg` → `rounded-md` (via primitive)

### Green Ping Removal — Header, Footer, ServiceSuggester
- `src/components/header.tsx`: removed `animate-ping + bg-green-500` status dot from logo lockup per §6.6
- `src/components/footer.tsx`: removed `animate-ping + bg-green-500` status dot; corrected wordmark to `text-foreground` (was `/80`)
- `src/components/ui/service-suggester.tsx`: removed ping from FloatingTrigger; removed ping from DialogTitle; removed 30s auto-open `setTimeout` per §17.4; fixed trigger: `shadow-2xl` → `shadow-sm`, `backdrop-blur-sm` removed, `border-primary/30` → `border-border`

### Floating Advisor Refinement — `src/components/ui/floating-ai-suggestor.tsx`
- Removed `animate-pulse` from trigger button per §17.3 + §18.3
- Removed `hover:animate-none` (no longer needed)
- Icon: `Sparkles` → `MessageSquare` in both trigger and SheetTitle per §17.2 (NOT AI cliché icons)
- Button style: `variant="default" bg-primary rounded-full shadow-2xl` → `variant="outline" bg-background border-border rounded-full shadow-sm` — restrained per §17.2
- Tooltip: removed 1.5s auto-appear timer per §17.5; tooltip now appears on hover only; removed `isTooltipOpen` controlled state; simplified tooltip styling

### Artifacts
- `ai/recon/raystrat-visual-system-phase-b.md` — 10-section recon: doctrine map, radius inventory, hover inventory, motion inventory, spacing inventory, hero rhythm analysis, surface depth analysis, implementation sequencing, regression risks, out-of-scope
- `scripts/verification/008-raystrat-visual-system-phase-b.sh` — 15 verification checks

### Verification Results
- `008-raystrat-visual-system-phase-b.sh` — 15/15 PASS
- `007-raystrat-visual-system-phase-a.sh` — 11/11 PASS (no regressions)
- `006-raystrat-positioning-refinement-pass.sh` — 15/15 PASS (no regressions)
- `005-raystrat-homepage-repositioning.sh` — 10/10 PASS (no regressions)
- `004-invariants.sh` — 3/3 PASS (INV-001, INV-002, INV-003)

**Architectural reasoning:**

*Hero scale reduction:* The `text-8xl` (96px) headline registered as product-launch energy, not operational authority. `text-6xl` (60px) is the enterprise register — it commands attention without performing disruption. The eyebrow `OPERATIONAL SYSTEMS ENGINEERING` above the H1 establishes the category before the diagnostic thesis lands.

*Hero not full-viewport:* The old `min-h-[calc(100vh-4rem)]` layout made the FailureThesis invisible until the buyer actively scrolled. Buyers who didn't scroll missed the structural argument entirely. Content-determined height with `py-20 md:py-28` places the first scroll such that FailureThesis begins to peek — the "structured argument below" signal compounds trust in the first 50ms.

*Card doctrine — no shadow:* Shadow-lifting on hover is a SaaS pattern that signals interactivity through depth illusion. The site's model is flat enterprise surfaces — structural separation comes from border color shift on hover, not from the card appearing to float above the page. This is the "honest borders" doctrine.

*Italic removal:* The duplicate italic subhead in services cards was a template remnant — the same text appeared twice (CardDescription in header, italic copy in CardContent). This was removed per §9.6 (italic removed from production use) and §14.4 (one subhead per card).

*Green pings:* Status dots with `animate-ping` signal real-time operational state that does not exist. Removing them removes false trust signals and eliminates one of the few remaining AI-agency visual clichés on the marketing surface.

*Floating advisor — icon change:* `Sparkles` is the canonical AI-product icon. On an operational systems site, it registers as "this is an AI chatbot feature." `MessageSquare` registers as "this is a communication tool." Behavioral cognition changes with the icon even when the function is identical.

*Auto-open removal:* The 30s auto-open on ServiceSuggester overrode user intent and created interruption-style engagement — the opposite of the audit-first, trust-building model. Removing it does not remove the function; it removes the imposition. Users who want to use the advisor can click the trigger.

*Section tints:* Replacing `bg-card/50` (50% opacity card over background) with `bg-secondary` (solid `220 10% 96%`) eliminates a rendering artifact of the dark-canvas era. On light canvas, the opacity blend produced near-invisible differentiation. Solid `bg-secondary` creates the intended alternating rhythm between sections.

**Pre-existing gate status (unchanged):**

| Gate | Status | Notes |
|------|--------|-------|
| 001-typecheck.sh | PRE-EXISTING FAILURE | Same errors as prior passes; 0 new from Phase B |
| 002-lint.sh | SKIP | No ESLint config |
| 003-build.sh | PRE-EXISTING FAILURE | buffer-equal-constant-time; API route mismatches |
| 004-invariants.sh | PASS | 3/3 |
| 005-homepage-repositioning.sh | PASS | 10/10 |
| 006-refinement.sh | PASS | 15/15 |
| 007-phase-a.sh | PASS | 11/11 |
| 008-phase-b.sh | PASS | 15/15 |

**Unresolved follow-ups (Phase C targets):**

- [ ] Phase C: Header always-opaque (remove scroll-dependent transparent state)
- [ ] Phase C: Logo mark PNG in header (replace text-only wordmark with actual raystrat-logo.png mark)
- [ ] Phase C: NavLink active state (underline/weight indicator for current section)
- [ ] Phase C: ThemeToggle relocation from header to footer
- [ ] Phase C: AnimatedGridBackground in ByteOfTheWeek — replace with static mark
- [ ] Phase C: Footer structural dark surface (apply `--structure` tokens)
- [ ] Phase C: Mobile header — remove ping from mobile-only wordmark path if any remain
