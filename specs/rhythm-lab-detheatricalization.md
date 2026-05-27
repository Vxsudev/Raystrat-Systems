# Spec: Rhythm-Lab De-theatricalization Pass

## Status
approved

## Phase
phase-visual-system

## Capability

Remove the fictional-runtime / fake-enterprise-platform semantic layer that was introduced on top of the rhythm work by `HOMEPAGE_DESIGN_V2` (b68ed4b) and `HOMEPAGE_PDF_EXACT_MATCH` (7c32173), while preserving the rhythm system, asymmetric layouts, documentary register, monospace eyebrow discipline, and schematic diagrams that those passes correctly delivered.

The site must remain *architecturally editorial* and *operationally serious* — it must NOT continue to read as a *deployed SaaS platform with live telemetry*. The current state poses a procurement-trust risk: any enterprise architect, compliance lead, or technical evaluator examining the surface will read the fabricated runtime claims (`DEPLOYED.SYSTEMS · PROD`, `V4.2.1`, `LIVE` audit stream, `147 deployed systems / 12.4M audit entries / 99.94% SLA`, `STATUS · ALL SYSTEMS NOMINAL`) as either implausible or, if literally true and unverifiable, as a red flag.

Work is isolated on branch `feature/rhythm-lab-detheatricalization`. All existing verification scripts (004–017) must continue to pass after every task; the new verification script `018-rhythm-lab-detheatricalization.sh` must pass before merge.

Recon authority: `ai/recon/rhythm-lab-detheatricalization-recon.md` (10 categories of findings, risk matrix, preservation invariants, replacement lexicon).

---

## Anti-Theater Constraints (must hold for every task)

The following patterns are forbidden in every file this spec touches:

- Fake-live runtime semantics: `LIVE`, `tail -f`, `/var/log/`, `ALL SYSTEMS NOMINAL`, `All deployed systems nominal`, `DEPLOYED.SYSTEMS`, `PROD\b` (as a status chrome), `SYS · HH:MM:SS UTC` live clock
- Fictional release versioning: `V4.2.1` chrome, `v4.2.1 · BUILD-…`
- Fictional scale metrics: any uses of `147`, `12.4M`, `99.94%`, `<2.3 min` as runtime-attributed values
- Runtime simulation via `setInterval`: no setInterval that rotates fabricated audit/log/telemetry entries
- Color-coded dashboard chrome: `bg-green-950/700/500 text-green-400` patterns on status pills; `bg-amber-950 text-amber-400`; `bg-red-950 text-red-400` — these may stay as part of accessible status iconography in other contexts (e.g., form errors) but MUST NOT be used as runtime-state badges
- Decorative runtime animations: `system-pulse-dot`, `audit-row-anim`, `sys-pulse`
- Live UTC clocks
- Green pulse / status dots tied to "system status" semantics
- The `TweaksPanel` mode switcher MUST be gated to non-production environments

The following patterns from prior phases continue to hold and must not regress:
- No `animate-pulse/ping/bounce/spin`
- No `bg-gradient-*`, `from-*`, `via-*`, `to-*`
- No `backdrop-blur-*`
- No `shadow-2xl`
- No hover `scale-*` or `rotate-*`
- `transition-colors duration-150` only
- `rounded-md` standard
- Primary `hsl(214 98% 40%)`
- Structure bg `hsl(220 24% 12%)`

---

## Preservation Invariants (must hold)

1. Section arc on `src/app/page.tsx`: Hero → FailureThesis → Services → Governance → Industries → Results → FailureModeRegistry → Contact → ByteOfTheWeek → FAQ
2. Asymmetric two-column hero layout (`grid-cols-[1.15fr_1fr]`) preserved; right column receives a schematic reference exhibit (not removed, not collapsed)
3. Documentary panels: FailureModeRegistry table, Services 2-col grid, Industries stacked rows, Governance 6-property block, Contact OUT-01/02/03 grid
4. Schematic diagrams: `ChokeDiagram`, `GovernanceLayerDiagram`, `DeploymentLifecycleDiagram`, `FrontlineSupportArchitectureDiagram`, `FailureModeRegistryPreview` — files unchanged
5. Monospace eyebrows (`font-mono text-xs uppercase tracking-widest`) on every section
6. System codes (`SYS-01 · DEMAND`…), segment codes (`SEG-01 · FINTECH`…), Q-codes (`Q.01`…), byte codes (`B-01`…), audit-deliverable codes (`OUT-01/02/03`) — all preserved
7. Raystrat blue used as semantic accent only — no fill backgrounds
8. The `/rhythm-lab` exploratory page (`src/app/rhythm-lab/page.tsx`) — already in correct register; left untouched
9. Audit-deliverables data (`OUT-01/02/03` in `auditDeliverables`) — preserved as engagement deliverables (not runtime entries)
10. The Header → Footer chrome and structural separators

---

## Task 1 — Remove SystemPulse (header live clock + green dot)

**Files:**
- `src/components/header.tsx`
- `src/components/ui/system-pulse.tsx` (delete)
- `src/app/globals.css` (delete `.system-pulse-dot` + `@keyframes system-pulse-ring`)

**Changes:**
1. In `header.tsx`: remove the `import { SystemPulse }` line and the `<SystemPulse />` render on line 144 (`{!isDashboard && <SystemPulse />}`)
2. Delete the file `src/components/ui/system-pulse.tsx`
3. In `globals.css`: delete the `.system-pulse-dot { ... }` rule, the `@keyframes system-pulse-ring` block, and the comment header `/* System pulse — bespoke ring pulse for live indicators... */`

**Rationale:** The component implements three forbidden patterns simultaneously: a live UTC clock (live-tense), a green pulse dot ("system status indicator"), and a tooltip claiming `All deployed systems nominal`. No reformulation preserves any of these without theater. The component is deleted.

---

## Task 2 — De-theatricalize Footer (remove ALL SYSTEMS NOMINAL + version chrome)

**Files:**
- `src/components/footer.tsx`

**Changes:**
1. In the bottom utility row, remove the `STATUS · ALL SYSTEMS NOMINAL` paragraph (lines 113–116) and the surrounding `<div className="inline-flex items-center gap-4">` wrapper if it now contains only `<ThemeToggle />`; render `<ThemeToggle />` directly
2. Change the copyright line from `© Raystrat Systems · Operational Systems Engineering · v4.2.1 · BUILD-2026.05.21` to `© {year} Raystrat Systems · Operational Systems Engineering` (where `{year}` is computed via `new Date().getFullYear()`)
3. Keep the dark structural surface, the three-column institutional spine, the logo lockup, and the institutional doctrine sentence intact

**Rationale:** The directive explicitly names `ALL SYSTEMS NOMINAL`, `V4.2.1`, and `BUILD-2026…` as forbidden. The copyright line should communicate institutional identity, not fictional release semantics.

---

## Task 3 — Replace HeroStatusPanel with HeroSurfaceReference + drop HeroMetaRow + fictional heroMeta

**Files:**
- `src/components/sections/hero.tsx`
- `src/data/content.ts` (remove `heroMeta` export)

**Changes:**

3a. In `hero.tsx`, remove the entire `STATUS_ROWS` array, the `pillClass()` helper, the `HeroStatusPanel` function, and the `HeroMetaRow` function. Remove the `import { heroMeta }` line.

3b. Add a new `HeroSurfaceReference()` function that renders the asymmetric-right-column exhibit as a SCHEMATIC reference to the five operational surfaces. Shape:

```
┌─ schematic header bar (no PROD, no version) ─────────────────┐
│ OPERATIONAL SURFACES — SCHEMATIC REFERENCE                   │
└──────────────────────────────────────────────────────────────┘
01  Demand Acquisition       Signal qualification, source attribution
02  Pursuit                  Follow-through governance, SLA continuity
03  Frontline Resolution     Tier-routed resolution, escalation context
04  Operations               Routine execution under audit
05  Command Intelligence     Reporting freshness, lineage-verified
└─ footer label: Schematic — not runtime status ──────────────┘
```

Visual treatment:
- `border border-border rounded-md bg-card p-4`
- Header bar: `font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground` — text reads `OPERATIONAL SURFACES · SCHEMATIC REFERENCE` (no `PROD`, no `V4.2.1`)
- Five rows: `grid grid-cols-[24px_1fr_auto_auto]` or `[24px_1fr]` (drop the uptime + status columns entirely)
  - Index `01–05` in `font-mono text-xs text-muted-foreground`
  - Surface name in `text-sm font-semibold text-foreground`
  - Concise property statement in `text-xs text-muted-foreground`
- Footer label: `mt-3 pt-3 border-t border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground` — text reads `Schematic reference · not runtime telemetry`
- No pills, no colored backgrounds, no uptime values, no version stamp, no window-chrome dots

3c. In the hero's main return, the right column now renders `<HeroSurfaceReference />` instead of `<HeroStatusPanel />`. The `<HeroMetaRow />` invocation below the CTA is removed entirely.

3d. In `content.ts`, delete the `heroMeta` export (the `[{ k: 'Deployed Systems', v: '147' }, …]` array).

**Rationale:** The HeroStatusPanel is the most theatrical surface on the site — it claims a runtime topology that does not exist (`DEPLOYED.SYSTEMS · PROD`, fake uptime hours, GOVERNED/WATCH pills, `V4.2.1`). Replacing it with a schematic-labeled reference exhibit preserves the asymmetric two-column hero layout while removing the runtime cosplay. The `heroMeta` row (147 / 12.4M / 99.94% / <2.3min) is removed entirely — there is no faithful version of these numbers at this stage; better to add nothing than to add fabricated quantitative claims that erode procurement trust.

---

## Task 4 — Convert Governance audit panel from "live stream" to static schematic

**Files:**
- `src/components/sections/governance.tsx`
- `src/app/globals.css` (delete `audit-row-anim` keyframe)
- `src/data/content.ts` (`auditSeed` — keep, but rotation is removed)

**Changes:**

4a. In `governance.tsx`, remove the `'use client'` directive, the `useEffect`/`useState`/`useRef` imports, the `Entry` type, and the entire client-side runtime state (`entries`, `seedRef`, the two `useEffect` blocks with `setInterval(…, 2400)`). The component becomes a server component.

4b. Replace the dark-band panel body with a static schematic exhibit:
- Panel header: replace `/var/log/raystrat/audit.stream` with the text `Audit Trail — Entry Format`; remove the `tail -f` text; replace the `LIVE` pill with a `SCHEMATIC` tag (`font-mono text-[10px] uppercase tracking-widest text-white/60 border border-white/20 rounded-md px-2 py-0.5`, no green, no pulse, no dot)
- Body: render the first 4–6 entries from `auditSeed` *statically* (no rotation). Each row carries `ts` (an illustrative timestamp formatted `00:00:00`-style, not real-time), `sys` code, `ev` event description, and `out` outcome
- Outcome column: monochrome treatment — `RESOLVED` / `ESCALATED` / `DISQUALIFIED` in `font-mono text-[10px] uppercase tracking-[0.12em]` without green/amber/white-tinted color coding; differentiate by weight only (`text-white/90` for RESOLVED, `text-white/70` for ESCALATED, `text-white/50` for DISQUALIFIED) — no `text-green-400`, no `text-amber-400`
- Footer: add a small `font-mono text-[10px] uppercase tracking-widest text-white/40 border-t border-white/10 px-5 py-2.5 mt-1` label reading `Schematic representation — engagement-specific audit-trail entries are produced continuously at runtime under the governance layer`

4c. Use synthetic illustrative timestamps (e.g., `00:00:00`, `00:00:04`, `00:00:09`, `00:00:13`) so it is unmistakable that the values are schematic, not real-time clocks. Do NOT use `new Date()` anywhere in the component.

4d. In `globals.css`, delete the `.audit-row-anim` rule and the `@keyframes audit-row-in` block.

4e. In `governance.tsx` row classes, remove the `audit-row-anim` class reference.

**Rationale:** The directive specifies "no decorative command-line theater" and "no fake telemetry counters." The panel's structural value (showing audit-trail entry format) is preserved; the simulated live feed is replaced with a static schematic exhibit.

---

## Task 5 — Monochrome severity treatment in FailureModeRegistry

**Files:**
- `src/components/sections/failure-mode-registry.tsx`

**Changes:**
1. Remove the `pillClass()` helper function entirely
2. Replace the colored severity badges with a uniform monochrome treatment:
   - `<span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{fm.severity}</span>` (no border, no background, no color tier)
3. Optionally retain a subtle visual hint for severity ordering via weight only: `CRITICAL` → `text-foreground font-semibold`, `HIGH` → `text-foreground`, `MEDIUM` → `text-muted-foreground` (no color)

**Rationale:** Severity classification is a legitimate document property; the dashboard color treatment is the theater. Monochrome typographic weighting preserves the structural information without importing observability-tool register.

---

## Task 6 — Gate TweaksPanel to non-production environments

**Files:**
- `src/app/page.tsx`

**Changes:**
1. Replace the unconditional `<TweaksPanel />` render with a conditional: `{process.env.NODE_ENV !== 'production' && <TweaksPanel />}`

**Rationale:** The mode switcher is a design exploration tool, not a customer feature. Its presence on the production marketing surface confuses procurement readers. Gating to dev/preview environments preserves the design surface for future passes without exposing it. The CSS overrides (`body.mode-editorial`, etc.) remain in globals.css harmlessly — they only activate when the body class is set, which now only happens in non-prod.

---

## Task 7 — Remove choke-point GOVERNED pill from FailureThesis

**Files:**
- `src/components/sections/failure-thesis.tsx`

**Changes:**
1. Remove the `⏵ GOVERNED` pill `<span>` from each choke-point row (the `<span className="border border-primary/40 text-primary text-xs px-2 py-0.5 rounded-md font-mono self-center">⏵ GOVERNED</span>` element)
2. Change the row grid template from `grid-cols-[32px_1fr_auto]` to `grid-cols-[32px_1fr]` to accommodate the removal
3. Keep the active-row highlight (`bg-primary/5`) and hover affordance (`hover:bg-muted/40`)

**Rationale:** The Failure Thesis section's argument is *these five points are where execution breaks without governance*. Attaching a `GOVERNED` status pill to each row contradicts the diagnostic argument — it implies the five surfaces are currently governed, which is the opposite claim. The pill is content-level theater, not just visual theater.

---

## Task 8 — Re-frame Results section to deployment-shape language

**Files:**
- `src/components/sections/results.tsx`

**Changes:**
1. Section H2: change `Measured against deployment baseline.` → `Operational ranges across deployments.`
2. Section lede: change `Every metric is logged continuously against defined SLA targets.` → `Each engagement defines SLA targets at deployment. Ranges shown are operational examples across engagements; engagement-specific values are produced at the operational audit.`
3. Above or below the metric tile grid, add a clear disclosure label: `<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Illustrative ranges · not runtime telemetry</p>`
4. Keep the four metric tiles (`2–5×`, `+10–25%`, `30–60`, `~56`) — their numeric values are framed as *ranges across deployments* and now read as illustrative under the disclosure label
5. Keep the `sr-only` mounts for `<FailureModeRegistryPreview />` and `<DeploymentLifecycleDiagram />` — they preserve the institutional record without adding visible runtime theater

**Rationale:** The numeric values themselves are ranges (not point estimates), which is already faithful. The framing is what needed correction — "measured continuously" implied a deployed measurement platform. The new framing makes it explicit that these are operational examples, not live readings.

---

## Task 9 — Verification script

**Files:**
- `scripts/verification/018-rhythm-lab-detheatricalization.sh` (new)

The script must:

A. Assert forbidden patterns are absent across `src/` (use `! grep -rn …`):
1. `\bLIVE\b` not in `src/components/sections/` or `src/components/ui/` (no `LIVE` status badges)
2. `tail -f` not present anywhere in `src/`
3. `/var/log/` not present anywhere in `src/`
4. `ALL SYSTEMS NOMINAL` not present anywhere in `src/`
5. `DEPLOYED\.SYSTEMS` not present anywhere in `src/`
6. `\bv?4\.2\.1\b` not present anywhere in `src/`
7. `BUILD-2026` not present anywhere in `src/`
8. `system-pulse-dot` not present anywhere in `src/`
9. `audit-row-anim` not present anywhere in `src/`
10. `setInterval` not present in `src/components/sections/governance.tsx`
11. `setInterval` not present in `src/components/ui/` *for system-pulse-style live indicators* (other UI components may use intervals legitimately — the check targets `system-pulse.tsx` non-existence rather than a global `setInterval` ban; assert file `src/components/ui/system-pulse.tsx` does not exist)
12. `heroMeta` not present in `src/data/content.ts`
13. `HeroStatusPanel` not present in `src/components/sections/hero.tsx`
14. `HeroMetaRow` not present in `src/components/sections/hero.tsx`
15. `STATUS_ROWS` not present in `src/components/sections/hero.tsx`
16. `⏵ GOVERNED` not present in `src/components/sections/failure-thesis.tsx`
17. `bg-green-950|bg-amber-950|bg-red-950` not present in `src/components/sections/` (dashboard cosplay color treatment forbidden in sections)
18. `text-green-400|text-amber-400|text-red-400` not present in `src/components/sections/governance.tsx` (the audit panel's monochrome treatment)
19. `setInterval` not present in `src/components/sections/governance.tsx`
20. `new Date(` not present in `src/components/sections/governance.tsx` (no real-time clocks)

B. Assert preservation invariants (use `grep -q` or file existence checks):
21. `src/app/page.tsx` contains the 10 section imports in order (Hero, FailureThesis, Services, Governance, Industries, Results, FailureModeRegistry, Contact, ByteOfTheWeek, Faq)
22. `src/components/diagrams/` contains 5 files (no diagrams removed)
23. `src/components/sections/` contains the 12 expected section files
24. `src/components/sections/hero.tsx` contains `HeroSurfaceReference` (the replacement component)
25. `src/components/sections/hero.tsx` contains the `grid-cols-[1.15fr_1fr]` asymmetric two-column layout
26. `src/components/sections/governance.tsx` contains the substring `SCHEMATIC` (replacement label)
27. `src/components/sections/governance.tsx` contains the substring `Audit Trail — Entry Format`
28. `src/components/footer.tsx` contains `© ` and `Raystrat Systems · Operational Systems Engineering` (clean copyright line)
29. `src/app/page.tsx` contains the `NODE_ENV !== 'production'` gate around `TweaksPanel`
30. The `--primary: 214 98% 40%` token is preserved in `globals.css`
31. The `--structure: 220 24% 12%` token is preserved in `globals.css`
32. `src/app/rhythm-lab/page.tsx` exists and is unchanged

C. Pass on green, fail on any single check; output `PASS X/Y` with line-by-line `[OK]`/`[FAIL]` markers consistent with other 010-017 scripts.

---

## Task 10 — Engineering journal entry

**Files:**
- `ai/engineering-journal.md` (append)

After all tasks pass, append an entry titled `Entry 2026-05-22 — RHYTHM_LAB_DETHEATRICALIZATION` with:
- recon findings summary (10 categories)
- track-by-track change log
- terminology removals + replacement table
- procurement-trust rationale
- institutional positioning logic (why architectural-editorial register matters)
- before/after semantic strategy
- verification counts (script 018 + regression 004–017)
- pre-existing gate status (typecheck / build — unchanged)

---

## Task Sequencing

Tasks 1–8 are largely independent at the file level (different files except for shared `globals.css` and `content.ts` edits). Recommended order:

1. Task 1 (header + system-pulse delete)
2. Task 2 (footer)
3. Task 3 (hero + heroMeta)
4. Task 4 (governance panel)
5. Task 5 (failure-mode-registry)
6. Task 6 (tweaks-panel gate)
7. Task 7 (failure-thesis pill)
8. Task 8 (results re-frame)
9. Task 9 (verification script)
10. Task 10 (journal)

Tasks 1, 4 share `globals.css` — group their CSS deletions in a single pass.
Tasks 3, 4 share `content.ts` — group their data edits in a single pass.

---

## GO / NO-GO Conditions

GO:
- recon artifact authored (`ai/recon/rhythm-lab-detheatricalization-recon.md`) ✓
- spec authored (this file) ✓
- branch `feature/rhythm-lab-detheatricalization` created ✓
- preservation invariants explicit ✓
- replacement lexicon defined ✓
- per-task scope defined with files and line-level changes ✓
- verification script scope defined ✓

NO-GO (cancel and re-spec) if:
- the asymmetric hero layout cannot be preserved with the replacement schematic exhibit (would require larger redesign)
- removing `heroMeta` causes a downstream type error that propagates beyond a single section
- the static schematic audit-trail panel cannot be rendered without `'use client'` AND there is structural value in keeping the component server-side (acceptable to keep `'use client'` if needed; no rotation either way)

No NO-GO conditions are expected to materialize.

---

## Verification

After implementation:
1. Run `bash scripts/verification/018-rhythm-lab-detheatricalization.sh` — must pass all checks
2. Run the regression suite 004–017 — must pass without new failures
3. Run `npm run typecheck` — must not introduce new TypeScript errors beyond the pre-existing baseline
4. Visual inspection on dev server (port 3000/3001) — hero, governance band, footer, failure thesis: all read as architectural-editorial, no fake-live semantics remain

---

## Stop Condition

Stop only when:
- All 10 tasks complete
- Verification script 018 passes
- Regression suite 004–017 passes
- TypeScript baseline unchanged
- Engineering journal entry appended
- No fictional runtime semantics remain on any production surface
- Rhythm system + asymmetric layouts + documentary register + schematic diagrams all preserved
- Final surface reads as **architectural editorial**, not **fictional enterprise platform**
