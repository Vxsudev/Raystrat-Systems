# Task: Implement homepage design V2 — all frontend components

## Parent Spec
specs/homepage-design-v2.md

## Phase
phase-visual-system

## Status
done

## Layer
frontend

## Description
Implement all components from the Claude Design handoff bundle into the Next.js
homepage. Source files at `/tmp/ui-work/project/` (sections.jsx, styles.css, data.js).

Components to implement in order:

1. **SystemPulse** — `src/components/ui/system-pulse.tsx`
   Client component. `useEffect` 1s interval. Displays `HH:MM:SS UTC`. Green
   pulse dot via Tailwind `bg-green-500 rounded-full w-2 h-2` + CSS animation
   (or inline style opacity pulse). Render in site header alongside nav.

2. **HeroStatusPanel** — augment `src/components/sections/hero.tsx`
   Five rows (DMND/PRSU/FRNT/OPS/CMND) with live uptimes. `useMemo` for initial
   uptime values, `useEffect` 5s tick randomizing ±0.0001%. Pill badges using
   CSS custom props: `--pill-ok`, `--pill-warn`, `--pill-crit` (oklch).
   Grid: `grid-cols-[18px_1fr_auto_auto]`.

3. **HeroMetaRow** — within hero, below lede paragraph
   Four stat blocks inline: `147` Deployed Systems | `12.4M` Audit Trail Entries |
   `99.94%` SLA Compliance | `<2.3 min` Avg. Failure Detection.
   Monospace values via `font-mono`, labels in `text-xs text-muted-foreground`.
   Dividers via `border-r border-border` on all but last.

4. **ChokeDiagram** — augment `src/components/sections/choke-points.tsx`
   or create new `src/components/ui/choke-diagram.tsx` if section is complex.
   `useState(activeId: string | null)`. SVG nodes plotted at:
   `cx = x/100 * (width-120) + 60`, `cy = y/100 * (height-80) + 40`
   where x/y from choke point data (0..100 coords). Polyline connecting nodes
   in order. Click a choke-point list row → set activeId. Active node:
   `fill="hsl(214 98% 40%)"`. Inactive: `fill="hsl(220 24% 18%)"`.
   Detail text appears below diagram when active.

5. **AuditTicker** — augment `src/components/sections/governance.tsx`
   Dark panel (`bg-[hsl(220_24%_12%)]`). Pre-seed 8 entries on mount from
   `auditSeed` data. `setInterval(2400)` rotates a new entry (shift oldest,
   push newest). Row grid: `grid-cols-[110px_90px_1fr_90px]`. Timestamp:
   `new Date().toISOString().slice(11,19)`. Outcome pill: `ok` green,
   `esc` amber, `disq` slate. Fade gradient on bottom via `::after` (CSS
   or Tailwind `from-transparent to-[hsl(220_24%_12%)]`).

6. **FailureModeRegistry** — augment `src/components/sections/failure-thesis.tsx`
   Table with cols: `grid-cols-[70px_200px_1fr_120px]`. Six FM rows from data.
   Severity pill: `crit` → `bg-red-950 text-red-400 border border-red-800`,
   `high` → amber, `med` → slate. Monospace IDs (`font-mono text-xs`).

7. **AuditCTA deliverable cards** — augment `src/components/sections/contact.tsx`
   Three cards (OUT-01/02/03) inside CTA. Dark structure bg. Each card:
   `border border-border/20 p-4 rounded-md`. Monospace ID badge top-left,
   title `font-semibold`, desc `text-sm text-muted-foreground`.

8. **FAQ accordion** — augment `src/components/sections/faq.tsx`
   `useState(openIndex: number | null)`. Toggle open/close. Expand via
   `grid-template-rows: 0fr → 1fr` with `transition: grid-template-rows 150ms ease`.
   Inner div `overflow-hidden min-h-0`. No `max-height` hacks. Single open at once.

9. **Mode switcher Tweaks panel** — `src/components/ui/tweaks-panel.tsx`
   Small floating panel (top-right, fixed). Three mode buttons: Ledger | Editorial |
   Blueprint. `useState(mode)` sets `document.body.className` to
   `mode-ledger` | `mode-editorial` | `mode-blueprint`. Add CSS overrides to
   `src/app/globals.css` per the design:
   - `.mode-editorial`: headline font-size `8vw`, status panel `display:none`,
     systems grid `grid-cols-1`, evidence `grid-cols-2`
   - `.mode-blueprint`: body bg engineering-paper (SVG data-uri grid),
     hero headline becomes `display()` function syntax via `::before`/`::after`,
     all borders `border-style: dashed`, corner brackets on key containers

### Anti-theater constraints
Apply to ALL new/modified component files. Fail CI if any appear:
- No `animate-pulse`, `animate-ping`, `animate-bounce`, `animate-spin`
- No `bg-gradient-*`, `from-*`, `via-*`, `to-*` gradient Tailwind classes
- No `backdrop-blur-*`
- No `shadow-2xl`
- No hover `scale-*` or `rotate-*`

## Acceptance Criteria
- [ ] SystemPulse renders live UTC clock in header with green pulse dot
- [ ] HeroStatusPanel shows 5 system rows with live uptime pills
- [ ] HeroMetaRow shows 4 stats with monospace values and dividers
- [ ] ChokeDiagram SVG renders all 5 nodes; click on row highlights node + shows detail
- [ ] AuditTicker pre-seeds 8 entries and rotates a new entry every 2400ms
- [ ] FailureModeRegistry table renders 6 rows with sev badges
- [ ] AuditCTA shows 3 deliverable cards (OUT-01/02/03)
- [ ] FAQ accordion opens/closes with CSS grid-rows transition, single-open
- [ ] Mode switcher panel present; Ledger/Editorial/Blueprint classes apply to body
- [ ] `npm run typecheck` exits 0
- [ ] No anti-theater patterns in any new file

## Files Likely Affected
- `src/components/ui/system-pulse.tsx` (new)
- `src/components/ui/tweaks-panel.tsx` (new)
- `src/components/ui/choke-diagram.tsx` (new, or inline in section)
- `src/components/sections/hero.tsx` (augment: status panel + meta row)
- `src/components/sections/choke-points.tsx` (augment: wire ChokeDiagram)
- `src/components/sections/governance.tsx` (augment: AuditTicker)
- `src/components/sections/failure-thesis.tsx` (augment: FM registry)
- `src/components/sections/contact.tsx` (augment: deliverable cards)
- `src/components/sections/faq.tsx` (augment: accordion)
- `src/components/layout/header.tsx` (augment: SystemPulse)
- `src/app/globals.css` (add mode overrides)
- `src/app/page.tsx` (wire TweaksPanel if needed)

## Blocked By
- none
