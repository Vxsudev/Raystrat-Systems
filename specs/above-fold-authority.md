# Spec: Above-the-Fold Authority Pass

## Status
approved

## Phase
phase-visual-system

## Capability

Give the homepage above-the-fold real visual authority — make the first viewport read as a serious institutional systems company, not a blank AI-generated landing page. Above-the-fold only. Branch `feature/above-fold-authority-pass`.

DO NOT touch sections below the hero (services, governance, industries, bytes, footer, /audit, systems pages).

## Keep exact copy
- Headline: `Systems That Run the Business`
- Subheadline: `Raystrat builds systems for sales, support, operations, and reporting — so execution doesn't depend on memory, spreadsheets, or manual follow-through.`

## Hard delete (right-column prose — delete, do not rewrite or relocate)
- `Demand and follow-through that run without manual chasing.`
- `Support and operations that don't depend on individual memory.`
- `Reporting that stays current without spreadsheet assembly.`

## Required right-side exhibit — concrete Operating Functions panel
Title: `Operating functions Raystrat builds for`
Rows (exact, plain, no poetic/doctrine phrasing):
- `Sales — lead capture, qualification, follow-up, pipeline movement`
- `Support — intake, routing, escalation, resolution tracking`
- `Operations — task routing, reminders, approvals, handoffs`
- `Reporting — dashboards, summaries, weekly operating visibility`

Contained panel with keylines / section boundary; not fake telemetry, dashboard, runtime, metrics, or schematic cosplay.

## Above-fold design requirements
1. Reduce dead whitespace; stronger first-screen structure.
2. Grounded right-side exhibit (the Operating Functions panel) that explains what Raystrat installs.
3. Structural framing: keylines, contained panel, section boundary, better width choreography.
4. Hero stays severe, simple, business-clear.
5. No floating AI pill on the homepage.

## Forbidden above the fold
fake live status, fake audit stream, fake metrics, schematic reference labels, version numbers, abstract governance jargon, AI words, decorative diagrams/SVG, huge empty right column, TED-talk copy, mode switchers, floating AI pill.

## Forbidden phrases (verification must FAIL if any remain in hero.tsx)
`Demand and follow-through`, `manual chasing`, `individual memory`, `spreadsheet assembly`, `Reporting that stays current`, `Support and operations`.

## Verification
`scripts/verification/021-above-fold-authority.sh`: exact hero copy present; banned old right-col phrases absent; Operating Functions panel + 4 rows present; no fake telemetry/live/prod/status/metrics; no SVG diagram above fold; no mode switcher; ServiceSuggester not mounted on homepage. Plus full regression 004–020, TypeScript, and mandatory Playwright/CDP screenshots at desktop/tablet/mobile.

## Stop Condition
Above-the-fold is visually worth showing and browser-verified; the fold answers "What does Raystrat build?" within 5 seconds.
