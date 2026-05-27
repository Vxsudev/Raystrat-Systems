# Spec: Hero Reposition + Above-the-Fold De-theatricalization

## Status
approved

## Phase
phase-visual-system

## Capability

Convert the homepage hero from consulting-thesis / operational-philosophy energy into clear business-category communication with severe institutional restraint. The hero must immediately answer "What does Raystrat actually do?" without TED-talk rhetoric, manifesto tone, startup-AI language, or decorative systems cosplay.

Branch: `rhythm-lab-decosplay-pass` (continuation). Single file: `src/components/sections/hero.tsx`.

## Hard Content Replacement (exact copy — do not rewrite or embellish)

DELETE the two right-column paragraphs ("Raystrat engineers governed execution systems…" and "Each engagement begins with an operational audit…").

REPLACE hero copy:
- **Headline:** `Systems That Run the Business`
- **Subheadline:** `Raystrat builds systems for sales, support, operations, and reporting — so execution doesn't depend on memory, spreadsheets, or manual follow-through.`

## Required Structure

Two-column asymmetric institutional layout.
- LEFT: headline + subheadline + restrained CTA row.
- RIGHT: ONE compact operational descriptor block only — max 2–3 short operational statements, low visual emphasis, at most a subtle 1px keyline. No boxes/runtime panels, no fake metadata, no counters, no metrics, no deployment numbers, no schematic references, no "operational surfaces", no fake governance UI. Reads as "supporting operational context," not "interactive system panel."

## CTA Rules
- Primary: `Book Operational Audit` (no decorative arrow)
- Secondary: `View Systems`
- Restrained, institutional, calm monochrome/blue. No oversized/glow behavior.

## Visual Restraint
FORBIDDEN above the fold: SVG diagrams, runtime simulations, fake telemetry, mode switchers, schematic references, animated infra motifs, floating panels, decorative "architectural" UI, fake audit artifacts, fake runtime states, excessive card segmentation, dashboard energy.
ALLOWED: typography, spacing rhythm, subtle keylines, documentary hierarchy, restrained monochrome structure.

## Spacing / Rhythm
Hero should breathe like an institutional paper cover page — increase whitespace around the headline cluster, reduce density, typography dominates over UI.

## Responsive
- Desktop: asymmetric layout preserved, strong headline dominance.
- Tablet: controlled collapse, no awkward giant whitespace gaps.
- Mobile: documentary stack, calm rhythm, no giant centered startup hero.

## Verification
`scripts/verification/020-hero-reposition.sh`:
- banned prior copy removed ("Operational Breakdown", "Is Preventable", "governed execution systems for businesses", "Each engagement begins with an operational audit", "don't fail because people aren't trying")
- exact-match new headline + subheadline present
- no SVG / counters / metrics / schematic wording above the fold (in hero.tsx)
- CTA copy preserved ("Book Operational Audit", "View Systems")
- asymmetric two-column grid retained
Plus: full regression 004–019, TypeScript, build, and mandatory Playwright/CDP browser inspection at desktop/tablet/mobile.

## Stop Condition
Hero communicates what Raystrat does; no preachy/manifesto tone; above-the-fold reads as institutional operational firm; no fake governance/system theater; browser screenshots confirm calm documentary authority; all verification green.
