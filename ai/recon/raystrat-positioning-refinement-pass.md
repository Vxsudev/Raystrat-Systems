# Recon: Raystrat Positioning Refinement Pass
## Capability: RAYSTRAT_POSITIONING_REFINEMENT_PASS

**Date:** 2026-05-21
**Status:** Pre-implementation recon — authoritative for task graph generation

---

## 1. Agent-Language Surfaces (Complete Inventory)

All visible agent-language surfaces, ranked by user exposure:

### 1.1 Homepage — All Visitors

**`src/components/ui/service-suggester.tsx`** (floating trigger, visible to all homepage visitors)
| Location | Current Text | Required Action |
|----------|-------------|-----------------|
| FloatingTrigger button label | `"Suggest an Agent"` | Replace: "Diagnose a Breakdown" |
| Dialog title | `"AI-Powered Agent Suggester"` | Replace: "Operational System Finder" |
| Dialog description | `"our AI will recommend the best agent to solve it"` | Replace: systems-aligned copy |
| Submit button label `"Get Suggestion"` | neutral — OK | Keep |

Component also auto-opens after 30s for first-time visitors. That behavior is preserved.

### 1.2 System Detail Pages — Visitors Who Click Systems

**`src/components/ui/floating-ai-suggestor.tsx`** (visible on /systems/* pages)
| Location | Current Text | Required Action |
|----------|-------------|-----------------|
| SheetTitle | `"Agent Assist"` | Replace: "Operational Advisor" |
| sr-only on trigger button | `"AI Assistant"` | Replace: "Operational Advisor" |
| Tooltip | `"Have questions? Ask me anything."` | Keep — neutral |

**`src/components/ui/favorite-agent-button.tsx`** (visible on /systems/* pages)
| Location | Current Text | Required Action |
|----------|-------------|-----------------|
| Button text | `"Favorite This Agent"` | Replace: "Save This System" |
| Dialog title | `"Favorite: {agentName}"` | Replace: "Save: {agentName}" |
| Dialog description | `"book a demo for this agent"` | Replace: "book a consultation for this system" |
| Internal props: `agentName`, `agentSlug` | variable names | Keep — no user exposure |

**`src/components/ui/notes-taker.tsx`** (visible on /systems/* pages, notes widget)
| Location | Current Text | Required Action |
|----------|-------------|-----------------|
| Line 103: Textarea placeholder | `"...our agents. Shoot!"` | Replace: systems-aligned copy |
| Line 123: Description copy | `"see our operations and follow-up agents in action!"` | Replace: systems-aligned copy |

### 1.3 Homepage — Industries Section

**`src/components/sections/industries.tsx`** — all 12 feature bullets use agent-first framing:

**Fintech & Banking:**
- `Loan/credit approval agents` → replace
- `Fraud detection & anomaly agents` → replace
- `Customer onboarding & KYC agents` → replace
- `24/7 customer support agents` → replace

**Legal:**
- `Case analysis & precedent-finding agents` → replace
- `Legal document summarization agents` → replace
- `E-discovery and document sorting agents` → replace
- `Client intake & form-generation agents` → replace

**Medical & Healthcare:**
- `Clinical documentation & coding agents` → replace
- `AI-driven appointment scheduling agents` → replace
- `Patient triage & symptom-checking agents` → replace
- `Patient support & follow-up agents` → replace

Replacement direction: governed workflows, operational infrastructure, continuity systems, auditability.

### 1.4 Section DOM — Low Priority

**`src/components/sections/agent-advantage.tsx`**
- `id="agent-advantage"` — section id in DOM, not in nav links
- Export name `AgentAdvantage` MUST remain (imported by `src/app/page.tsx`)
- Safe to change: only the `id` attribute on the `<section>` element
- Change to: `id="governance"`

### 1.5 Out of Scope

**`src/data/content.ts` — bytes articles**: "agent" appears in editorial journalism content (blog articles about agentic AI transformation). These are third-party editorial, not product copy. No action required.

**`src/components/ui/sequence-form.tsx`**: "agent" in technical tooltip copy about retry logic (`"how many times should the agent try again?"`) — dashboard-internal, not on marketing surface. Out of scope per directive (Do NOT mutate dashboard domain).

**`src/ai/flows/contextual-assistant.ts`**: Already updated in Phase 1. System prompt uses "operational advisor" vocabulary. No action required.

**`src/ai/flows/service-suggester.ts`**: Already updated in Phase 1. System prompt uses "operational systems advisor" vocabulary. No action required.

---

## 2. Floating CTA Ownership

**Two separate floating widget systems exist:**

### System A: ServiceSuggester (homepage)
- **File:** `src/components/ui/service-suggester.tsx`
- **Trigger:** `FloatingTrigger` — fixed bottom-right button, `id="service-suggester-trigger"`
- **Behavior:** Auto-opens after 30s (sessionStorage-gated); accepts text input describing bottleneck; calls `suggestServiceAction` server action; routes to `/systems/${slug}`
- **AI coupling:** `src/app/actions.ts` → `src/ai/flows/service-suggester.ts`
- **Visible on:** All pages where `AppContent` renders it
- **Mutation scope:** Button label, dialog title, dialog description only

### System B: FloatingAiSuggestor (system pages)
- **File:** `src/components/ui/floating-ai-suggestor.tsx`
- **Trigger:** `FloatingTrigger` (inner function) — Sparkles icon button, `id="contextual-ai-trigger"`
- **Behavior:** Opens Sheet sidebar; persistent conversation per pathname via localStorage
- **AI coupling:** `src/app/actions.ts` → `src/ai/flows/contextual-assistant.ts`
- **Visibility gating:** `src/components/app-content.tsx` — only rendered when `pathname.startsWith('/systems/')`
- **Mutation scope:** SheetTitle and sr-only text only

**Note:** Both floating systems share the `fixed bottom-6 right-6` position. The ServiceSuggester is rendered on all pages; the FloatingAiSuggestor only on /systems/* pages. When on a /systems/ page, BOTH render — they coexist because one uses an outline button and the other a filled icon button. This is a pre-existing UI collision but out of scope for this pass.

---

## 3. Vertical Section Dependency Graph

```
industries.tsx (standalone component)
  ↑ imported by: src/app/page.tsx
  → no data import from content.ts (all data is local to the file)
  → no slug references
  → safe to modify industryData array contents directly
```

Section structure:
- `id="industries"` on `<section>` — not in nav links, safe
- `className="bg-card/50"` — preserve
- Card layout: icon + title + description + features list — preserve
- `Check` icon per feature — preserve
- `Landmark`, `Scale`, `HeartPulse` icons — all correct, preserve

Risk: LOW. All data is file-local. No external consumers.

---

## 4. Systems Route Architecture

### Current state:
```
src/app/systems/
  [slug]/
    page.tsx    ← EXISTS (6 valid slugs from content.ts)
    
/systems        ← 404 (no page.tsx)
/systems/demand-acquisition  ← 200
/systems/follow-through      ← 200
...all 6 slugs  ← 200
```

### Required addition:
```
src/app/systems/
  page.tsx      ← CREATE
  [slug]/
    page.tsx    ← existing
```

### Implementation constraints:
- Must import `services` from `@/data/content` — same source of truth
- Must NOT be a marketing landing page
- Should feel infrastructural — minimal, system-catalog density
- CalendlyButton for audit CTA (same pattern as results.tsx)
- No new dynamic behavior — pure server component
- Must add `/systems` to sitemap.ts (already done in Phase 1 per journal)

---

## 5. AI Assistant Coupling Surfaces

| Flow | File | Vocabulary | Status |
|------|------|------------|--------|
| Contextual assistant | `src/ai/flows/contextual-assistant.ts` | "operational advisor", "operational systems" | ✅ Updated Phase 1 |
| Service suggester | `src/ai/flows/service-suggester.ts` | "operational systems advisor", "root structural failures" | ✅ Updated Phase 1 |
| Notes analyzer | `src/ai/flows/notes-analyzer.ts` | Unknown — check if used | 🔲 Check |

**Notes analyzer:** Referenced in `notes-taker.tsx`. If it uses agent language in prompts, update. But its user-facing language in `notes-taker.tsx` is the higher priority target.

---

## 6. Refinement Risk Assessment

| Target | Risk | Reason |
|--------|------|--------|
| `service-suggester.tsx` button/dialog text | LOW | Text-only change; routing and behavior unchanged |
| `floating-ai-suggestor.tsx` title | LOW | Text-only; no logic coupling |
| `favorite-agent-button.tsx` copy | LOW | Text-only; prop names unchanged |
| `notes-taker.tsx` placeholder/description | LOW | Text-only; no logic coupling |
| `industries.tsx` feature bullets | LOW-MEDIUM | Content judgment required; structure unchanged |
| `agent-advantage.tsx` section id | LOW | Id not referenced in any nav links; export name preserved |
| `/systems/page.tsx` new file | MEDIUM | New route; must pull correct data, render correctly |
| Verification script | LOW | Shell script only |

---

## 7. Files to Mutate

| File | Change Type | Scope |
|------|-------------|-------|
| `src/components/ui/service-suggester.tsx` | Text | 3 strings |
| `src/components/ui/floating-ai-suggestor.tsx` | Text | 2 strings |
| `src/components/ui/favorite-agent-button.tsx` | Text | 3 strings |
| `src/components/ui/notes-taker.tsx` | Text | 2 strings |
| `src/components/sections/industries.tsx` | Content | 12 feature bullets |
| `src/components/sections/agent-advantage.tsx` | Attribute | 1 section id |
| `src/app/systems/page.tsx` | New file | ~80-120 lines |
| `scripts/verification/006-raystrat-positioning-refinement-pass.sh` | New file | ~80 lines |
| `ai/engineering-journal.md` | Append | 1 journal entry |

## 8. Do NOT Mutate

- `src/app/dashboard/` — dashboard domain
- `src/ai/flows/contextual-assistant.ts` — already correct
- `src/ai/flows/service-suggester.ts` — already correct
- `src/components/ui/sequence-form.tsx` — dashboard-internal technical copy
- `src/data/content.ts` bytes articles — editorial journalism
- Firebase/deployment config
- Visual design system
- Homepage section order
- `src/app/actions.ts` — server action internal variable names
