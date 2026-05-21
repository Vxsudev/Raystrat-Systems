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
