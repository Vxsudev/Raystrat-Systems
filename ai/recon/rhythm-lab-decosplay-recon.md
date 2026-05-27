# Recon + Mutation Plan — Rhythm-Lab De-Cosplay / De-Hype Reduction Pass

**Capability:** `RHYTHM_LAB_DECOSPLAY_PASS`
**Branch:** `rhythm-lab-decosplay-pass`
**Predecessor:** `feature/rhythm-lab-detheatricalization` (committed; this branch forks from it)
**Mode:** RECON → MUTATION PLAN → IMPLEMENTATION → VERIFICATION
**Date:** 2026-05-22
**Author:** Claude Opus 4.6

---

## 1 — Intent

The detheatricalization pass (prior) removed *fake-live runtime semantics* (telemetry rotation, LIVE pills, fake uptime, version chrome). It preserved the schematic diagrams, registries, and operational-evidence metrics as "trust evidence."

This pass goes further. The principal's judgment: those preserved artifacts are themselves *cosplay* — decorative systems-fiction that makes the site read as a "designed concept system" rather than a "real institutional operating surface." Where no real deployment evidence exists, the site must not *simulate* it.

The pass **deletes** three sections outright, **reverts** three section layouts to grounded card architecture, and **strips** decorative diagrams/chrome from two more. Target emotion: *quiet institutional confidence* — not *"look at our cool governance UI."*

---

## 2 — Doctrine Tension (explicit)

This directive **reverses** parts of prior ratified phases:

| Prior phase | Added | This pass |
|---|---|---|
| D1 (Governance Proof Foundation) | GovernanceLayerDiagram, FailureModeRegistryPreview, FrontlineSupport diagram | Homepage mounts of the FM registry preview removed (results.tsx deleted); diagram component files retained for `/audit` + `/systems` |
| D2 (Auditability) | AuditTrailEntryPreview, DeploymentLifecycleDiagram on homepage | Homepage Audit-Trail panel deleted; lifecycle diagram homepage mount deleted (canonical `/audit` mount retained) |
| Homepage-design-v2 / pdf-exact-match | Operational Evidence metrics, Failure Mode Registry standalone, ChokeDiagram, audit ticker, hero status panel | All deleted or reverted |

**Resolution:** The principal owns positioning. `/audit` (Phase E) remains the canonical home for the deployment-lifecycle diagram and failure-mode registry preview — those component files are **not** deleted, only their homepage mounts. This keeps the trust-evidence available on the dedicated engagement surface while removing it from the homepage scroll, which is the principal's explicit instruction. Regression scripts that asserted homepage mounts (010/012/014/016/017) are reconciled to the new doctrine (same precedent as D2.5 → 012/013).

---

## 3 — Affected Surface Map

| # | Directive section | Homepage component | Action |
|---|---|---|---|
| 1 | Hero cleanup | `hero.tsx` | Remove `HeroSurfaceReference` schematic panel + `/05` + chrome; right column → restrained documentary text block (no border, no mono labels); typography-first |
| 2 | Five choke points | `failure-thesis.tsx` + `ui/choke-diagram.tsx` | Remove `ChokeDiagram` mount + `SCHEMATIC.V1 · OPERATIONAL PIPELINE` footer; make choke-point list static/documentary (drop `useState`/`button`); **delete** `choke-diagram.tsx` (orphaned) |
| 3 | Six operational systems | `services.tsx` | Revert to Phase B (`9156713`) card grid: 3-col `Card` primitives, `service.icon`, `Check` bullets, "View System →"; keep current palette/spacing |
| 4 | Remove Audit Trail — Entry Format | `governance.tsx` | **Delete** the dark `bg-[hsl(220_24%_12%)]` audit-trail exhibit panel (the second `<div>`); keep the 6-property "Governance by design" grid; orphan `auditSeed` |
| 5 | High-accountability environments | `industries.tsx` | Revert to Phase B (`9156713`) card grid: 3-col `Card` primitives, industry icons, `Check` bullets; keep documentary tone |
| 6 | Remove Operational Evidence | `results.tsx` | **Delete file**; remove import + `<Results />` from `page.tsx`. Diagram components survive (used on `/audit`) |
| 7 | Remove Failure Mode Registry | `failure-mode-registry.tsx` | **Delete file**; remove import + `<FailureModeRegistry />` from `page.tsx`; remove dead `failureRegistry` data |
| 8 | Bytes | `byte-of-the-week.tsx` | Revert to `0674de8` restrained 2-col; remove giant metadata sidecard / `Operational Intelligence` / oversized `B-XX` emphasis; keep palette/typography |

**Kept untouched (not in directive):** `contact.tsx`, `faq.tsx`, the Governance 6-property grid, `/audit`, `/systems`, `agent-advantage.tsx`, all `src/components/diagrams/*` component files.

---

## 4 — Orphan / Dead-Code Analysis

| Symbol | Current users | After pass | Disposition |
|---|---|---|---|
| `auditSeed` (content.ts) | `governance.tsx` (audit panel) | none | Remove from content.ts |
| `failureRegistry` (content.ts) | none (already dead) | none | Remove from content.ts |
| `chokePoints` (content.ts) | `choke-diagram.tsx`, `failure-thesis.tsx` list | `failure-thesis.tsx` list only | **Keep** (list still uses id/ix/name/desc) |
| `ChokeDiagram` / `choke-diagram.tsx` | `failure-thesis.tsx` | none | **Delete** component file |
| `FailureModeRegistryPreview` | `/audit`, `results.tsx` | `/audit` only | Keep component (homepage mount removed via results.tsx delete) |
| `DeploymentLifecycleDiagram` | `/audit`, `results.tsx` | `/audit` only | Keep component |
| `auditDeliverables` (content.ts) | `contact.tsx`, content.ts | `contact.tsx` | Keep |
| `metrics` (local in results.tsx) | results.tsx | — | Deleted with file |

**Dead CSS (globals.css mode overrides):** selectors referencing removed surfaces — `.hero-status-panel` (already removed last pass), `#results`, `#evidence` — to be cleaned. The `#systems` grid selector still applies (Services keeps a grid) — keep but verify class names match the reverted grid.

---

## 5 — New Homepage Section Order (after pass)

```
1. Hero               (typography-first; restrained right text block)
2. FailureThesis      (static documentary list — no diagram)
3. Services           (grounded card grid — Phase B architecture)
4. Governance         (6-property grid ONLY — audit panel deleted)
5. Industries         (grounded card grid — Phase B architecture)
6. Contact            (unchanged)
7. ByteOfTheWeek      (restrained prior layout)
8. Faq                (unchanged)
```

Deleted from scroll: **Operational Evidence**, **Failure Mode Registry**.

Scroll cadence check: 8 sections (down from 10). Alternating rhythm preserved — Hero(bg) → FailureThesis(bg) → Services(bg) → Governance(bg+light) → Industries(secondary) → Contact(structure-dark) → Bytes(secondary) → FAQ(bg). The dark Contact band + secondary Bytes provide the lower-page rhythm previously carried by Results/FM. No giant dead-zone introduced because two sections are removed cleanly (not blanked).

---

## 6 — Mutation Sequence

1. T1 hero.tsx — rewrite (typography-first)
2. T2 failure-thesis.tsx — static list; delete choke-diagram.tsx
3. T3 services.tsx — revert to card grid
4. T4 governance.tsx — delete audit panel
5. T5 industries.tsx — revert to card grid
6. T6 delete results.tsx + page import
7. T7 delete failure-mode-registry.tsx + page import
8. T8 byte-of-the-week.tsx — revert layout
9. content.ts — remove auditSeed + failureRegistry
10. globals.css — clean dead mode selectors
11. page.tsx — final section order
12. 019 verification script + regression reconcile
13. lint + build + typecheck
14. journal + commit

---

## 7 — Verification Targets (per directive)

1. Deleted sections fully removed (results, failure-mode-registry, audit-trail panel, choke-diagram) — no source references
2. No orphaned imports/components (grep page.tsx + dead-symbol sweep)
3. No dead CSS/tokens (mode selectors cleaned)
4. Spacing rhythm intact (section py preserved)
5. Scroll cadence intentional (8-section alternating bg)
6. No giant dead-zones (hero right = text, not empty void)
7. Mobile integrity (card grids stack; hero single-column on mobile)
8. `npm run lint`, `npm run build`, `npm run typecheck` — green / pre-existing-baseline only

Plus new script `019-rhythm-lab-decosplay.sh` asserting deletions + reverts, and reconciliation of stale checks in 010/012/014/016/017.

**RECON COMPLETE — PROCEEDING TO SPEC + IMPLEMENTATION.**
