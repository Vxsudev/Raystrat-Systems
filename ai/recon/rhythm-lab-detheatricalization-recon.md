# Recon — Rhythm-Lab De-theatricalization Pass

**Capability:** `RHYTHM_LAB_DETHEATRICALIZATION_PASS`
**Branch:** `feature/rhythm-lab-detheatricalization`
**Mode:** RECON (no mutations)
**Date:** 2026-05-22
**Author:** Claude Opus 4.7 (1M context)

---

## 1 — Read Authority

The current homepage and supporting surfaces — landed by `HOMEPAGE_DESIGN_V2` (b68ed4b) and `HOMEPAGE_PDF_EXACT_MATCH` (7c32173) — successfully broke the "flat whitepaper" problem by introducing rhythm, asymmetry, monospace registers, and a documentary register.

However, the same passes also introduced a *fictional runtime semantic layer* on top of the marketing surface. This layer presents Raystrat as a *deployed SaaS platform with running telemetry*, which it is not. It poses a procurement-trust risk: any enterprise architect, compliance lead, or technical evaluator inspecting these surfaces sees plausibly-fabricated operational state and revises their assessment of the institution downward.

The directive's distinction is the right one:

- **Architectural editorial** — preserve.
- **Fictional enterprise platform** — remove.

This recon enumerates every surface where the second register has been introduced, classifies risk, and proposes faithful replacements. **No production code is mutated in this phase.**

---

## 2 — Inventory of Findings

### CATEGORY 1 — Fake-Live Runtime Semantics (RISK: HIGH)

**Surface:** `src/components/sections/governance.tsx` — bottom dark panel ("Audit Stream")

| Element | Current | Why it fails |
|---|---|---|
| Panel header | `/var/log/raystrat/audit.stream` | Fictional filepath implies running production system with log file on disk |
| `tail -f` text | Decorative chrome | Fictional command-line theater — implies someone is following a live log feed |
| `LIVE` pill | Green-on-green pill, with `system-pulse-dot` animation | Direct claim of live operational telemetry; signal of running platform |
| `system-pulse-dot` | Continuous animated box-shadow ring | Decorative runtime cosplay |
| `setInterval(…, 2400ms)` | Rotates new "log" entries every 2.4s | Simulates live runtime telemetry — the exact pattern the directive forbids |
| `audit-row-anim` | Shimmer-in animation on rotated entries | Reinforces the "events arriving in real time" illusion |
| Outcome pills | `RESOLVED / ESCALATED / DISQUALIFIED` colored | Reads as dashboard color-coded runtime status |

**Surface:** `src/components/ui/system-pulse.tsx` (mounted in header)

| Element | Current | Why it fails |
|---|---|---|
| Live UTC clock | `setInterval(…, 1000ms)` ticking `SYS · 14:23:07 UTC` | Implies running platform with live clock |
| Green pulse dot | `bg-green-500` + `system-pulse-dot` ring | "Status indicator" theater |
| Title attribute | `All deployed systems nominal` | Fake-live platform status claim |

**Surface:** `src/components/footer.tsx`

| Element | Current | Why it fails |
|---|---|---|
| `STATUS · ALL SYSTEMS NOMINAL` | Green dot + status string in footer utility row | The directive names this exact phrase as forbidden |

---

### CATEGORY 2 — Fictional Deployment Scale Metrics (RISK: HIGH — procurement-critical)

**Surface:** `src/data/content.ts` `heroMeta` + `src/components/sections/hero.tsx` `HeroMetaRow`

| Metric | Current | Why it fails |
|---|---|---|
| Deployed Systems | `147` | Fictional count of deployments; no basis |
| Audit Trail Entries | `12.4M` | Fabricated runtime volume |
| SLA Compliance | `99.94%` | Fabricated SLA telemetry |
| Avg. Failure Detection | `<2.3 min` | Fabricated runtime measurement |

These are exactly the "fake scale metrics" the directive forbids. They will be read by any technical evaluator as either (a) implausible for a firm of this stage, or (b) a procurement red flag if literally true and unverifiable.

---

### CATEGORY 3 — Versioning Theater (RISK: MEDIUM)

| Surface | Current | Why it fails |
|---|---|---|
| `src/components/sections/hero.tsx` `HeroStatusPanel` | `V4.2.1` chrome stamp | Implies a versioned SaaS release; Raystrat is not a versioned product |
| `src/components/footer.tsx` | `v4.2.1 · BUILD-2026.05.21` | Same — fake product release semantics |

The directive explicitly names `V4.2.1` and `BUILD-2026…` as forbidden.

---

### CATEGORY 4 — Fake Operational Status (RISK: HIGH)

**Surface:** `src/components/sections/hero.tsx` `HeroStatusPanel`

| Element | Current | Why it fails |
|---|---|---|
| Top-bar chrome | `● ● ●  DEPLOYED.SYSTEMS · PROD  V4.2.1` | Window-chrome + PROD + version stamp = fake software window |
| Five system rows | 5 systems with fake uptime values (`720h 00m`, `733h 11m`, etc.) | Direct fabrication of operational state for non-existent deployments |
| `GOVERNED` pills | `bg-green-950 text-green-400 border-green-800` | SaaS-dashboard color-coded status indicator |
| `WATCH` pill | `bg-amber-950 text-amber-400 border-amber-800` | Same — amber severity badge |

This panel is the single most theatrical surface on the site. It is the buyer's *first* impression and it claims a runtime topology that does not exist.

---

### CATEGORY 5 — Severity-Color Badges (RISK: MEDIUM)

**Surface:** `src/components/sections/failure-mode-registry.tsx`

| Element | Current | Why it fails |
|---|---|---|
| `CRITICAL` badge | `bg-red-950 text-red-400 border-red-800` | Dashboard-style severity color-coding |
| `HIGH` badge | `bg-amber-950 text-amber-400 border-amber-800` | Same |
| `MEDIUM` badge | `bg-slate-800 text-slate-300 border-slate-600` | Same |

Severity classification is a legitimate document concept; the *visual treatment* is the issue — it imports observability-tool color semantics into what should read as a written registry.

---

### CATEGORY 6 — Mode Switcher (Dev-Tool Cosplay) (RISK: MEDIUM)

**Surface:** `src/components/ui/tweaks-panel.tsx`, rendered on `src/app/page.tsx`

The floating mode switcher (Ledger / Editorial / Blueprint) is a design-time exploration tool, not a customer feature. Its presence on the public marketing surface is:

- Confusing — a procurement officer does not know what the switcher controls or why they would use it
- Theatrical — implies the site has user-configurable "modes," which a documentary/editorial site does not need
- A development artifact leaking into production

Two acceptable dispositions:
- (a) Gate behind `NODE_ENV !== 'production'` so it only renders in development
- (b) Remove entirely

Pick (a) — it preserves the design surface for future passes without exposing it to buyers.

The mode-related CSS (`body.mode-editorial`, `body.mode-blueprint`) is harmless if the switcher is gated to dev — the body class is only applied by the panel and would never reach a buyer's session. Keep the CSS; gate the panel.

---

### CATEGORY 7 — Choke Point Status Pills (RISK: MEDIUM)

**Surface:** `src/components/sections/failure-thesis.tsx`

| Element | Current | Why it fails |
|---|---|---|
| `⏵ GOVERNED` pill on each choke point row | `border-primary/40 text-primary` per-row pill | The failure-thesis is a *diagnostic* surface — "here are the five points where execution breaks." Adding a "GOVERNED" pill to each row collapses diagnosis into status — it reads as "all five choke points are currently governed in your business," which is the exact opposite of the section's argument |

This pill is a *content* error, not just a visual one. The section's argument is *these are where things break without governance.* The pill says *governed.* The two contradict each other.

Replace with: a neutral, non-status affordance (e.g., a small arrow / numeric index / "/05" position indicator) or remove entirely.

---

### CATEGORY 8 — Audit Seed Library (RISK: MEDIUM)

**Surface:** `src/data/content.ts` `auditSeed` (14 entries)

Each entry reads as live runtime telemetry:
- `Signal scored above qualification threshold — record advanced to pursuit.`
- `Cadence step 3/6 executed via WhatsApp; awaiting response window.`
- `Anomaly detected: 14d reply-rate trending −12% vs. baseline.`

These are excellent operational examples *in a schematic governance artifact*. They are not appropriate as a rotating live feed, because the rotation transforms them from *illustrative* into *simulated runtime*.

Disposition: keep the entries; remove the rotation. Present them as a static schematic audit-trail excerpt with a clear "Schematic — Audit Trail Format" disclosure label.

---

### CATEGORY 9 — Operational Prose with Live-Tense Framing (RISK: LOW)

Selected phrases across surfaces that read as *running platform* language and should be re-framed as *deployment-shape* or *governance-property* language:

| Surface | Current | Replacement direction |
|---|---|---|
| `results.tsx` H2 | "Measured against deployment baseline." | "Operational ranges across deployments." |
| `results.tsx` lede | "Every metric is logged continuously against defined SLA targets." | "Each engagement defines SLA targets; metrics are logged against them." |
| `results.tsx` metrics | Four `2–5×` / `+10–25%` etc. boxes with no framing | Add explicit "Illustrative range across past deployments" disclosure |
| `governance.tsx` dark band title | "/var/log/raystrat/audit.stream" + tail-f + LIVE | "Audit Trail — Entry Format · Schematic" (no path, no tail-f, no LIVE) |
| `governance.tsx` prose | "Every action executed by a deployed system is logged…" | Keep — this is a governance property statement, not a live-tense claim |
| `hero.tsx` HeroStatusPanel sub-chrome | `DEPLOYED.SYSTEMS · PROD` | `OPERATIONAL ARCHETYPES · SCHEMATIC` (or remove panel entirely — see C4) |

These are tone-level edits — preserving the operational seriousness while removing the "this is running right now" implication.

---

### CATEGORY 10 — Outcome Color Coding in Audit Panel (RISK: MEDIUM)

In `governance.tsx`, the outcome column uses:
- `text-green-400` for `RESOLVED`
- `text-amber-400` for `ESCALATED`
- `text-white/50` for `DISQUALIFIED`

Once the live rotation is removed and the panel becomes a static schematic, the colored outcomes still read as dashboard chrome. Recommend a monochrome treatment: monospace outcome label, no color, with `RESOLVED` / `ESCALATED` / `DISQUALIFIED` differentiated by tracking / weight only. The structural information (three outcome classes) is preserved without the observability-tool register.

---

## 3 — Risk Classification Matrix

| Category | Procurement Risk | Replacement Cost | Priority |
|---|---|---|---|
| C1 — Fake live runtime semantics | HIGH | LOW | P0 |
| C2 — Fictional deployment scale metrics | HIGH (top) | LOW | P0 |
| C3 — Versioning theater | MEDIUM | LOW | P0 |
| C4 — HeroStatusPanel fake op-state | HIGH | MEDIUM | P0 |
| C5 — Severity-color badges | MEDIUM | LOW | P1 |
| C6 — Mode switcher in prod | MEDIUM | LOW | P1 |
| C7 — Choke point GOVERNED pills | MEDIUM | LOW | P1 |
| C8 — Audit seed rotation | MEDIUM | LOW | P1 |
| C9 — Live-tense prose | LOW | LOW | P2 |
| C10 — Outcome color coding | MEDIUM | LOW | P1 |

P0 = ship in this pass. P1 = ship in this pass. P2 = ship in this pass (small).

All categories are in scope for this single pass — there is no benefit to deferring any of them, and all share the same procurement-trust failure mode.

---

## 4 — Preservation Invariants

The following MUST be preserved through this pass:

1. **Rhythm system** — alternating `bg-secondary` / `bg-background` / `bg-[hsl(var(--structure))]` sections; `border border-border` rounded-md panels; documentary spacing
2. **Section arc** — Hero → FailureThesis → Services → Governance → Industries → Results → FailureModeRegistry → Contact → ByteOfTheWeek → FAQ
3. **Asymmetric Hero composition** — `grid-cols-[1.15fr_1fr]` two-column hero (the *layout* is fine; the *panel content* is the problem). After C4 implementation, replace the right column with a **schematic reference** (e.g., schematic of the five operational surfaces) rather than a fake live status panel.
4. **Documentary tables** — FailureModeRegistry table structure, services 2-col grid, industries stacked rows — all preserved
5. **Schematic diagrams** — `ChokeDiagram`, `GovernanceLayerDiagram`, `DeploymentLifecycleDiagram`, `FrontlineSupportArchitectureDiagram`, `FailureModeRegistryPreview` — all preserved
6. **Audit deliverables** — `OUT-01 / OUT-02 / OUT-03` in Contact section — these are correct (engagement-deliverable references, not runtime claims) — preserve
7. **System codes** — `SYS-01 · DEMAND` etc. in Services, `SEG-01 · FINTECH` etc. in Industries, `Q.01` in FAQ, `B-XX` in ByteOfTheWeek — all preserved (these are exhibit labels, not runtime identifiers)
8. **Monospace eyebrow register** — preserved across all sections
9. **Raystrat blue as semantic accent only** — preserved
10. **Rhythm-lab page itself** — already in the correct register; not in scope (the directive named "rhythm-lab" surfaces — but on inspection the rhythm-lab page is the *clean* exemplar; the theater is in the *production* surfaces that absorbed the rhythm work plus the subsequent design-v2 + pdf-exact-match passes)

---

## 5 — Replacement Lexicon

| Replace | With |
|---|---|
| `DEPLOYED.SYSTEMS · PROD` | `OPERATIONAL ARCHETYPES · SCHEMATIC` (or remove) |
| `V4.2.1` / `v4.2.1 · BUILD-…` | `SCHEMATIC REFERENCE` / `EXHIBIT REFERENCE` / remove |
| `LIVE` | `SCHEMATIC` |
| `tail -f` | (remove) |
| `/var/log/raystrat/audit.stream` | `Audit Trail — Entry Format` |
| `ALL SYSTEMS NOMINAL` | (remove footer status row entirely; copyright row alone is sufficient) |
| `All deployed systems nominal` (title attribute) | (remove SystemPulse component) |
| `Deployed Systems: 147` | (remove or convert to qualitative claim) |
| `Audit Trail Entries: 12.4M` | (remove) |
| `SLA Compliance: 99.94%` | (remove) |
| `Avg. Failure Detection: <2.3 min` | (remove) |
| `GOVERNED` / `WATCH` pills with colored backgrounds | `GOVERNED` / `WATCH` as bordered monochrome tags (or remove if panel is removed) |
| Color-coded severity badges | Monochrome severity labels — `CRITICAL` / `HIGH` / `MEDIUM` in font-mono with no color background |
| `Measured against deployment baseline.` | `Operational ranges across deployments.` |
| `Every metric is logged continuously against defined SLA targets.` | `Each engagement defines SLA targets; metrics are logged against them.` |
| Live UTC clock in header | (remove SystemPulse) |
| Green pulse dots | (remove) |
| Audit log rotation `setInterval` | (remove; render schematic 4–6 entries statically with disclosure label) |
| `audit-row-anim` shimmer | (remove keyframe) |
| `system-pulse-dot` ring animation | (remove keyframe and class) |
| Choke-point `⏵ GOVERNED` pill | Remove (the section is diagnosing failure modes, not asserting governance) |

---

## 6 — Proposed Implementation Plan (preview — formalized in spec)

**One sequenced wave, ten tracks. All P0/P1/P2 ship together. No phased deferral.**

| Track | Files touched | Outcome |
|---|---|---|
| T1 | `header.tsx`, `system-pulse.tsx` (delete), `globals.css` | Remove SystemPulse from header; delete component file; delete `.system-pulse-dot` class and `@keyframes system-pulse-ring` |
| T2 | `footer.tsx` | Remove "STATUS · ALL SYSTEMS NOMINAL" row; remove `v4.2.1 · BUILD-…` versioning string; replace with single copyright line |
| T3 | `hero.tsx`, `content.ts` (`heroMeta`) | Replace `HeroStatusPanel` with `HeroSurfaceReference` (schematic exhibit of the 5 operational surfaces — names + concise governance property, no uptime, no PROD chrome); remove `HeroMetaRow`; remove `heroMeta` from `content.ts` |
| T4 | `governance.tsx`, `globals.css`, `content.ts` (`auditSeed`) | Convert dark-band audit panel from live-rotation to static schematic excerpt; remove `tail -f` / `LIVE` / `/var/log/...` / fictional filepath; remove `setInterval` rotation; render fixed 4-entry exhibit with `AUDIT TRAIL — ENTRY FORMAT · SCHEMATIC` header; remove `audit-row-anim`; remove color-coded outcomes (monochrome treatment) |
| T5 | `failure-mode-registry.tsx` | Replace colored severity badges with monochrome `font-mono` tags |
| T6 | `tweaks-panel.tsx` (or call site) | Gate to `process.env.NODE_ENV !== 'production'` |
| T7 | `failure-thesis.tsx` | Remove `⏵ GOVERNED` per-row pill (diagnostic surface, not status surface) |
| T8 | `results.tsx` | Rewrite H2 + lede; add "Illustrative ranges across deployments" disclosure framing; the four metric tiles stay but their framing changes |
| T9 | (none — already correct) | `auditDeliverables` (`OUT-01/02/03`), system codes, segment codes, byte codes — all preserved |
| T10 | `scripts/verification/018-rhythm-lab-detheatricalization.sh` | New verification script; forbids LIVE/PROD/ALL SYSTEMS NOMINAL/tail -f/SystemPulse/heroMeta/audit rotation; asserts preservation of rhythm/diagrams/section arc/asymmetric hero |

Note: verification script number `018` (not `015` as the directive suggested) because `015–017` are already taken (`015-rhythm-lab-archetypes`, `016-homepage-design-v2`, `017-homepage-pdf-exact-match`). The verification number is sequential.

---

## 7 — Open Questions (resolved-in-spec, recorded here for trace)

| Question | Recon disposition |
|---|---|
| Replace HeroStatusPanel or remove the right column entirely? | **Replace** — a schematic reference exhibit (5 operational surfaces) preserves the asymmetric two-column hero layout while removing the runtime cosplay |
| Keep HeroMetaRow with qualitative metrics or remove? | **Remove** — there is no faithful version of "147 deployed systems" at this stage; better to add nothing than to add fictional or weak quantitative claims |
| Convert `LIVE` → `SCHEMATIC` or remove the audit panel entirely? | **Convert** — the panel is structurally valuable (it shows audit-trail format); only the live-feed semantic must go |
| Keep `setInterval` rotation with explicit "Schematic — illustrative rotation" label? | **No** — any rotation reads as live; static is the only safe register |
| Add a global "Schematic" / "Illustrative" badge near each artifact? | **Yes** — already present for many; standardize on `font-mono text-xs uppercase tracking-widest` for `SCHEMATIC` labels |
| Audit-deliverable IDs (`OUT-01/02/03`) — keep notation? | **Keep** — these reference deliverable artifact codes, not runtime entities |
| Severity tier classification (CRITICAL / HIGH / MEDIUM) — keep concept? | **Keep** — it is a legitimate registry property; only the color treatment changes |

---

## 8 — Recon Confidence

- File inventory: complete (all 12 section files + header + footer + system-pulse + tweaks-panel + globals.css + content.ts read)
- Theater-pattern detection: complete (grep + direct read across `src/`)
- Replacement direction: defined for every flagged element
- Risk classification: deliberate (HIGH = procurement-blocking, MEDIUM = trust-eroding, LOW = tone)
- Implementation plan: enumerated, sequenced, scoped
- Preservation invariants: explicit (10 named, with reasoning)

**RECON COMPLETE — READY FOR SPEC AUTHORING.**
