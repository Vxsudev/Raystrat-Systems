# Spec: Homepage Design V2 — Design Bundle Implementation

## Status
approved

## Phase
phase-visual-system

## Capability

Implement the homepage redesign from the Claude Design handoff bundle at
`/tmp/ui-work/project/` into the Next.js codebase. The design introduces
governed visual architecture with three rendering modes (Ledger, Editorial,
Blueprint), novel interactive components, and a structured data presentation
pattern aligned with the institutional positioning.

This is a frontend-only change. No data model, API, or routing changes.
All components target the existing homepage (`src/app/page.tsx`) and its
section components under `src/components/sections/`.

## Data Model Changes
none

## API Surface
none

## Frontend Surface

### Components to implement

**SystemPulse** (`src/components/ui/system-pulse.tsx`)
Live UTC clock in the site header. `useEffect` + 1s interval. Green pulse dot.
Format: `HH:MM:SS UTC`. Client component.

**HeroStatusPanel** (`src/components/sections/hero.tsx` — augment)
Five live system uptime rows rendered inside the hero. `useMemo` for computed
uptimes, 5s tick interval. Pill badges: `ok` (green oklch), `warn` (amber),
`crit` (red). Grid layout: 18px icon | 1fr name | auto uptime | auto pill.

**ChokeDiagram** (`src/components/sections/choke-points.tsx` — new or augment)
Interactive SVG schematic of the five operational choke points. Nodes plotted at
`(x% * (W−120) + 60, y% * (H−80) + 40)` using coordinates from data.
Polyline connecting nodes in index order. Click/hover a row → highlights node
with brand blue fill and shows detail text. `useState(activeId)`.

**AuditTicker** (`src/components/sections/governance.tsx` — augment)
Dark-panel live audit log. Pre-seeded with 8 backfill entries on mount,
then rotating new entries every 2400ms via `setInterval`. Four-column row
grid: timestamp (110px) | system code (90px) | event (1fr) | outcome pill (90px).
Outcome pill styles: `ok` green, `esc` amber, `disq` slate.

**FailureModeRegistry** (`src/components/sections/failure-thesis.tsx` — augment)
Replace or supplement testimonial block with a structured FM registry table.
Columns: ID (70px) | Function (200px) | Failure Mode (1fr) | Severity (120px).
Severity badges: `crit` red, `high` amber, `med` slate.

**HeroMetaRow** (within hero section)
Four stat blocks in the hero: Deployed Systems 147 | Audit Trail Entries 12.4M |
SLA Compliance 99.94% | Avg. Failure Detection <2.3 min. Monospace values,
label below, border-right separators.

**Updated Governance Section**
Six governance properties in a 3-col grid with 1px gap borders (background
color trick, not box-shadow). Dark `--structure` background with subtle radial
dot overlay.

**AuditCTA Block** (`src/components/sections/contact.tsx` — augment)
Three deliverable cards (OUT-01/02/03) inside the CTA block. Dark structure
background, 2-col layout. Cards: `OUT-01 Operational Gap Map`, `OUT-02 Failure
Mode Registry`, `OUT-03 System Architecture Proposal`.

**FAQ Accordion**
CSS `grid-template-rows: 0fr → 1fr` transition (150ms ease) for open/close.
`useState(openIndex)` — single-open accordion. No `max-height` hacks.

### Mode system (optional — Tweaks panel or body class)

Three visual modes surfaced via a toggle panel (top-right, small):
- **Ledger** (default): dense, utilitarian, all interactive components visible.
- **Editorial**: `font-size: 8vw` headline, status panel hidden, systems as
  long-form list with chapter indices.
- **Blueprint**: engineering-paper grid background, mono headline as function
  call, dashed borders with corner bracket pseudo-elements.

Mode stored in `useState` and applied as `body` class: `mode-ledger` (default),
`mode-editorial`, `mode-blueprint`. CSS overrides in `globals.css`.

### Anti-theater constraints (must not regress)

- No `animate-pulse`, `animate-ping`, `animate-bounce`, `animate-spin`
- No `bg-gradient-*`, `from-*`, `via-*`, `to-*` Tailwind gradient classes
- No `backdrop-blur-*`
- No `shadow-2xl`
- No hover `scale-*` or `rotate-*`
- `transition-colors duration-150` only — no motion beyond color transitions
- `rounded-md` standard; no `rounded-2xl` or `rounded-full` on containers
- Primary: `hsl(214 98% 40%)` — no deviations
- Structure bg: `hsl(220 24% 12%)` — no deviations

### Token fidelity

All color values from `src/app/globals.css` CSS variables. No inline color
literals. Typography: Space Grotesk display, Inter body, JetBrains Mono data.

## Verification

Script `scripts/verification/016-homepage-design-v2.sh` must pass:

- SystemPulse renders in header
- HeroStatusPanel present in hero section
- ChokeDiagram SVG interactive (active state via click)
- AuditTicker running (entries rotate)
- HeroMetaRow four stats present
- FailureModeRegistry table present
- AuditCTA three deliverable cards present
- FAQ accordion functional
- Mode switching via body class works (ledger/editorial/blueprint)
- Anti-theater: none of the banned patterns in any new component file
- No TypeScript errors (`npm run typecheck`)
- No build errors (`npm run build`)
- Prior regressions: 001-015 all pass
