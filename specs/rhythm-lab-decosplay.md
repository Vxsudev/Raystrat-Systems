# Spec: Rhythm-Lab De-Cosplay / De-Hype Reduction Pass

## Status
approved

## Phase
phase-visual-system

## Capability

Strip remaining fake-enterprise theater, pseudo-runtime cosplay, and decorative schematic noise from the Raystrat homepage. Delete sections that simulate operational evidence that does not exist; revert over-editorialized layouts to grounded operational card architecture; remove decorative diagrams. Target register: *quiet institutional confidence* — a real systems-engineering company, not a sci-fi operating system, startup AI landing page, or concept-design exploration.

Branch: `rhythm-lab-decosplay-pass`. Recon: `ai/recon/rhythm-lab-decosplay-recon.md`.

Where no real deployment evidence exists, the site must NOT simulate it.

## Anti-Theater Constraints (carried from prior phases — must not regress)

No `animate-pulse/ping/bounce/spin`, no `bg-gradient-*`, no `backdrop-blur-*`, no `shadow-2xl`, no hover `scale-*`/`rotate-*`, no fake-live semantics (LIVE/tail -f/ALL SYSTEMS NOMINAL/DEPLOYED.SYSTEMS/version chrome), `transition-colors duration-150` only, `rounded-md` standard, primary `hsl(214 98% 40%)`, structure `hsl(220 24% 12%)`.

## Tasks

### Task 1 — Hero cleanup
`src/components/sections/hero.tsx`. Remove `HeroSurfaceReference` schematic panel, `/05`, all above-the-fold schematic/runtime framing. Right column becomes a restrained documentary text block (no border, no mono chrome labels, no diagram). Keep headline/body/CTA structure, typography, spacing. Hero reads typography-first, editorial, severe, minimal.

### Task 2 — Five Choke Points: remove pipeline diagram
`src/components/sections/failure-thesis.tsx` + delete `src/components/ui/choke-diagram.tsx`. Remove `ChokeDiagram` mount and `SCHEMATIC.V1 · OPERATIONAL PIPELINE` footer. Convert the choke-point list to a static documentary list (remove `useState`/interactive button). Keep list structure, typography hierarchy, spacing. Reads as operational diagnosis, not interactive process visualization.

### Task 3 — Six Operational Systems: revert card architecture
`src/components/sections/services.tsx`. Revert to the Phase B (`9156713`) card grid: 3-column responsive grid of `Card` primitives with `service.icon`, title, subhead, `Check`-bulleted features, "View System →" link. Keep current color system and spacing discipline. Cards feel deployable/productized/operational — not editorial essay slabs.

### Task 4 — Remove "Audit Trail — Entry Format"
`src/components/sections/governance.tsx`. Delete the dark `bg-[hsl(220_24%_12%)]` audit-trail exhibit panel entirely (no replacement). Keep the 6-property "Governance by design" grid. Remove now-orphaned `auditSeed` import.

### Task 5 — High-Accountability Environments: revert layout
`src/components/sections/industries.tsx`. Revert to Phase B (`9156713`) card grid: 3-column `Card` primitives with industry icon, title, description, `Check`-bulleted features. Keep section premise, documentary tone, spacing. No essay slabs.

### Task 6 — Remove Operational Evidence
Delete `src/components/sections/results.tsx`. Remove its import and `<Results />` mount from `src/app/page.tsx`. Diagram component files (`FailureModeRegistryPreview`, `DeploymentLifecycleDiagram`) are retained (still mounted on `/audit`).

### Task 7 — Remove Failure Mode Registry
Delete `src/components/sections/failure-mode-registry.tsx`. Remove its import and `<FailureModeRegistry />` mount from `src/app/page.tsx`. Remove dead `failureRegistry` export from `src/data/content.ts`.

### Task 8 — Bytes: revert to restrained layout
`src/components/sections/byte-of-the-week.tsx`. Revert to `0674de8` restrained 2-col structure. Remove giant metadata sidecard, fake publication framing, "Operational Intelligence" label, oversized `B-XX` emphasis. Keep current visual language, typography, spacing, palette. Reads as institutional writing archive / engineering essays.

### Task 9 — Cleanup
`src/data/content.ts` (remove `auditSeed`, `failureRegistry`), `src/app/globals.css` (remove dead `mode-*` selectors referencing removed `#results`/`#evidence`/`.hero-status-panel`), `src/app/page.tsx` (final 8-section order). Verify no orphaned imports/components.

### Task 10 — Verification
New `scripts/verification/019-rhythm-lab-decosplay.sh` asserting: results.tsx + failure-mode-registry.tsx + choke-diagram.tsx absent; no Results/FailureModeRegistry/ChokeDiagram references in page/sections; governance has no audit-trail dark panel; Services/Industries use Card grid; Bytes has no metadata sidecard; auditSeed/failureRegistry removed; section arc = 8; preservation of contact/faq/governance-grid. Reconcile stale checks in 010/012/014/016/017 to new doctrine. Run lint + build + typecheck.

## Verification
`npm run lint`, `npm run build`, `npm run typecheck` (pre-existing baseline only); script 019 green; regression suite reconciled.

## Stop Condition
Sections removed/reverted; build green; no fake runtime theater remains; homepage reads institutional, not performative; no orphaned imports/dead CSS; mobile integrity preserved.
