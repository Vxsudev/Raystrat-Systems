# Spec: Homepage PDF Exact-Match — Design Finalization

## Status
approved

## Phase
phase-visual-system

## Capability

Bring every homepage section into exact visual and content alignment with
`/Users/vasudevarao/Downloads/UI Work.pdf` (16-page print export). This is a
frontend-only change: no data model, API, or routing changes. All changes target
`src/app/page.tsx`, the section components under `src/components/sections/`,
`src/components/header.tsx`, `src/components/footer.tsx`, and
`src/data/content.ts`.

Work is isolated on branch `rhythm-lab-archetypes`. All existing verification
scripts (010–016) must continue to pass after every task.

---

## Anti-Theater Constraints (must not regress on any task)

- No `animate-pulse/ping/bounce/spin`
- No `bg-gradient-*`, `from-*`, `via-*`, `to-*`
- No `backdrop-blur-*`
- No `shadow-2xl`
- No hover `scale-*` or `rotate-*`
- `transition-colors duration-150` only
- `rounded-md` standard — no `rounded-2xl` or `rounded-full` on containers
- Primary: `hsl(214 98% 40%)` — no deviations
- Structure bg: `hsl(220 24% 12%)` — uses `bg-structure` or inline `var(--structure)`

---

## Task 1 — Header nav + footer

**Files:** `src/components/header.tsx`, `src/components/footer.tsx`,
`src/data/content.ts`

### Header

Nav links (in order): **Systems · Governance · Evidence · Bytes**
CTA button label: **"Book Audit"** (currently "Book Operational Audit")

Update `navigationLinks` in `src/data/content.ts` (or inline in header) to:
```
{ label: 'Systems',    href: '/systems' }
{ label: 'Governance', href: '/#governance' }
{ label: 'Evidence',   href: '/#results' }
{ label: 'Bytes',      href: '/bytes' }
```

CTA button `<CalendlyButton size="sm">Book Audit</CalendlyButton>` (no "→").

Keep existing `SystemPulse` component if already present.

### Footer

**Three columns: SYSTEMS | ENGAGE | LEGAL**

SYSTEMS column links:
- Demand Acquisition → `/systems/demand-acquisition`
- Follow-Through Infrastructure → `/systems/follow-through`
- Frontline Support → `/systems/frontline-support`
- Operations Control → `/systems/operations-control`
- Command Intelligence → `/systems/command-intelligence`

ENGAGE column links:
- Operational Audit → Calendly trigger
- Bytes → `/bytes`
- Governance → `/#governance`
- Industries → `/#industries`

LEGAL column links:
- Documentation → `/docs` (or `#`)
- Privacy → `/privacy` (or `#`)
- Terms → `/terms` (or `#`)
- Trust → `/trust` (or `#`)

Footer tagline (under logo):
> "Governed operational infrastructure for businesses where audit accountability,
> SLA compliance, and continuity are not optional."

**Bottom bar** (full-width, border-top, dark bg):
Left: `© Raystrat Systems · v4.2.1 · BUILD-2026.05.21`
Right: `STATUS · ALL SYSTEMS NOMINAL` (monospace, green dot `●` prefix)

Structure: `bg-structure text-foreground/60` dark section. No gradients.

---

## Task 2 — Hero section exact-match

**File:** `src/components/sections/hero.tsx`

### Status panel header row
Replace current header with:
```
● ● ●   DEPLOYED.SYSTEMS · PROD   V4.2.1
```
Left cluster: three `●` dots (two muted, one green — or all same muted). Center
text: `DEPLOYED.SYSTEMS · PROD` monospace uppercase. Right: `V4.2.1` mono.
Grid: `grid-cols-[auto_1fr_auto]`.

### Status rows format
Change from percentage/ok/warn/crit format to **hours elapsed + pill** format:

```
01   Demand Acquisition      720h 00m   GOVERNED
02   Pursuit                 733h 11m   GOVERNED
03   Frontline Resolution    746h 22m   GOVERNED
04   Operations              759h 33m   WATCH
05   Command Intelligence    772h 44m   GOVERNED
```

Grid per row: `grid-cols-[24px_1fr_auto_auto]`
- Col 1: two-digit index `01`–`05`, mono, muted
- Col 2: system name
- Col 3: uptime `720h 00m`, mono
- Col 4: pill — `GOVERNED` (green bg, dark text) or `WATCH` (amber bg, dark text)

Remove the existing `ok/warn/crit` percentage-based pill rendering. The uptime
values are static (no live counter needed — keep existing interval or remove it).

### Hero copy
Verify these exact strings are present (may already be correct):

**H1:** "Operational Breakdown Is Preventable."

**Subhead/body:** "Businesses don't fail because people aren't trying. They fail
because the systems that should govern demand, pursuit, support, operations, and
intelligence don't exist — or run on human memory instead of governed
infrastructure."

**CTA 1:** "Book Operational Audit →" (Calendly trigger)
**CTA 2:** "View Systems" (link to `/systems`)

### Meta row (below CTAs)
Four blocks (may already be correct — verify):
- `147` DEPLOYED SYSTEMS
- `12.4M` AUDIT TRAIL ENTRIES
- `99.94%` SLA COMPLIANCE
- `<2.3 min` AVG. FAILURE DETECTION

---

## Task 3 — FailureThesis section exact-match

**File:** `src/components/sections/failure-thesis.tsx`

### Section eyebrow
`THE PROBLEM` (uppercase tracking-widest text-primary or text-muted-foreground)

### H2
"The five choke points where execution breaks."

### Body
"Most businesses run these functions on human discipline. That means they run —
until someone is sick, overloaded, distracted, or gone. The failure is not a
performance issue. It is structural."

### Rows layout
Change from two-column (rows + ChokeDiagram side-by-side) to **single-column
stacked rows** that span full container width. Each row:

```
01   Demand Acquisition          ⏵ GOVERNED
     Continuously detect and qualify inbound interest.
```

Grid per row: `grid-cols-[32px_1fr_auto]`
- Col 1: index `01` mono muted
- Col 2: system name (bold) + subtext below (muted, smaller)
- Col 3: `⏵ GOVERNED` pill — border border-primary text-primary, small, right-aligned

Row is still clickable (keep `onClick` to set active state for ChokeDiagram).
Active row: `bg-primary/5` or `border-l-2 border-primary`.

### ChokeDiagram placement
Move the `ChokeDiagram` SVG **below** the rows (full-width, not side-by-side).
Keep existing SVG logic, just reposition: rows first, then diagram below.

### Footer label
Below diagram: `SCHEMATIC.V1 · OPERATIONAL PIPELINE` left-aligned mono muted,
and `/ 01` or page counter right-aligned.

---

## Task 4 — Services section exact-match

**File:** `src/components/sections/services.tsx`

### Section eyebrow
`THE SOLUTION`

### H2
"Six operational systems. Each closes a structural failure point."

### Body
"Each system installs as governed infrastructure — with audit trail, SLA
enforcement, and escalation protocol built in. Not a tool. Not a workflow.
Operational backbone."

### Cards layout
Change from 3-column icon grid to **2-column grid** (`grid-cols-1 md:grid-cols-2`).

**Remove icons** from cards entirely.

Each card structure:
```
SYS-01 · DEMAND          ← eyebrow: mono uppercase, text-primary/60 or muted
Demand Acquisition        ← h3 font-bold font-headline
Continuous detection...   ← subtitle/subhead text-muted-foreground
→  Persistent signal...   ← bullet (text, not Check icon)
→  Governed qualification...
→  Audit trail...
VIEW SYSTEM ↗             ← link, text-primary, bottom
```

Bullet style: plain `→` text prefix (not `<Check>` icon), `text-foreground/80`.

`VIEW SYSTEM ↗` = `<Link href={/systems/${slug}}>VIEW SYSTEM ↗</Link>`, small,
uppercase tracking-widest, `text-primary`, bottom of card.

SYS codes from PDF:
- SYS-01 · DEMAND
- SYS-02 · FOLLOW-THROUGH
- SYS-03 · FRONTLINE
- SYS-04 · OPERATIONS
- SYS-05 · COMMAND
- SYS-06 · CUSTOM

Map these to the existing service slugs from `services` array in `content.ts`.
If a service doesn't have a `sysCode` field, derive it from position (index + 1).

---

## Task 5 — Governance section exact-match

**File:** `src/components/sections/governance.tsx`

### Structure: two visual blocks in one section file

**Block A — Properties (light background, `bg-background` or `bg-secondary`)**

Eyebrow: `GOVERNANCE LAYER`
H2: "Governance by design — not as an add-on."
Body: "Every system Raystrat deploys includes an operational governance layer.
Audit trail, SLA enforcement, escalation, compliance controls — structural
requirements, not optional features."

6 governance properties in 3-col grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
Each property card:
```
01 / 06
Audit Trail Architecture
Every action executed by a deployed system is logged with timestamp,
context, and outcome. Nothing runs without a record.
```

Label format: `01 / 06` mono muted above title.

**Block B — Audit Ticker (dark background `bg-structure` or `var(--structure)`)**

Already implemented — keep as-is. Verify:
- Header: `/var/log/raystrat/audit.stream` + `TAIL -F` + `LIVE` pill
- 4-col grid: `grid-cols-[110px_90px_1fr_90px]`
- Entries rotate every 2400ms
- Outcome pills: RESOLVED (green) / ESCALATED (amber) / DISQUALIFIED (slate)

Ensure the two blocks render as visually distinct sections within the same
component: light block first, dark block second (no gap/margin weirdness).

---

## Task 6 — Industries section exact-match

**File:** `src/components/sections/industries.tsx`

### Section eyebrow
`HIGH-ACCOUNTABILITY ENVIRONMENTS`

### H2
"Where audit, continuity, and SLA are non-negotiable."

### Body
"Regulated sectors demand operational governance that general-purpose tools
can't provide. Our systems are deployed where accountability requirements are
explicit."

### Cards layout
Change from 3-column Card grid with icons to **stacked full-width cards**
(`grid-cols-1`, each card full-width, `border-b` separator or `border` container).

**Remove icons** from cards.

Each card structure:
```
SEG-01 · FINTECH                           ← eyebrow mono
Fintech & Banking                          ← h3 bold
Compliance-grade operational systems...    ← description
— Governed credit decisioning...           ← bullet: em-dash prefix
— Fraud escalation workflows...
— Compliant KYC onboarding infrastructure
— Continuity-assured customer operations
```

Bullet style: `— ` em-dash text prefix (not `<Check>` icon).

SEG codes:
- SEG-01 · FINTECH
- SEG-02 · LEGAL
- SEG-03 · MEDICAL

---

## Task 7 — Results section exact-match

**File:** `src/components/sections/results.tsx`

### Section eyebrow
`OPERATIONAL EVIDENCE`

### H2
"Measured against deployment baseline."

### Body
"Ranges reflect deployments across regulated and non-regulated environments.
Every metric is logged continuously against defined SLA targets."

### Metrics grid
Replace current content with **4 metric blocks** in a `grid-cols-2 md:grid-cols-4` grid:

| Value | Label |
|-------|-------|
| `2–5×` | REPLY RATE UPLIFT |
| `+10–25%` | COLLECTIONS SPEED |
| `30–60` | CONTENT VELOCITY |
| `~56` | HOURS SAVED /MO |

Each block: large mono value (`text-4xl font-mono font-bold`) + label below
(`text-xs uppercase tracking-widest text-muted-foreground`). Border-right
separators between blocks (last has none).

**Remove** `FailureModeRegistryPreview` and `DeploymentLifecycleDiagram` from
this section (they move to other sections or are removed).

**Keep** the `CalendlyButton` CTA at the bottom if it was there, or replace with a
plain link "Book Audit →".

---

## Task 8 — Failure Mode Registry standalone section

**File:** `src/components/sections/failure-mode-registry.tsx` (NEW)
**Register in:** `src/app/page.tsx`

A standalone section between Results and Contact:

### Section eyebrow
(none — table speaks for itself, or minimal label above)

### Table
3-column table: **ID | FUNCTION | SEVERITY**

```
FM-001   Demand Acquisition     CRITICAL
FM-002   Pursuit                CRITICAL
FM-003   Frontline Resolution   HIGH
FM-004   Operations             HIGH
FM-005   Command Intelligence   MEDIUM
FM-006   Pursuit                MEDIUM
```

Table layout:
- Monospace `font-mono text-sm`
- Row border-bottom separators
- Header row: `text-xs uppercase tracking-widest text-muted-foreground`
- Severity badge: `CRITICAL` red/destructive, `HIGH` amber, `MEDIUM` slate

---

## Task 9 — Contact section exact-match

**File:** `src/components/sections/contact.tsx`

### Background
`bg-structure` (dark). All text light.

### Section eyebrow
`THE FIRST MOVE`

### H2
"Book an Operational Audit."

### Body
"Before we propose a system, we assess. An audit maps your five choke points,
identifies active failure modes, and defines the governance architecture required
to address them."

### CTAs
Two buttons:
- Primary: `<CalendlyButton>Book 30-min Audit →</CalendlyButton>`
- Secondary/outline: `<Link href="/systems">Review Systems</Link>` styled as ghost/outline button

### Divider
Full-width text row below CTAs:
`THE AUDIT IS THE FIRST ENGAGEMENT. NOT A DEMO. NOT A TRIAL.`
Small caps or `text-xs uppercase tracking-widest text-foreground/40`.

### OUT cards
Three stacked cards (full-width rows, not a grid):
```
OUT-01   Operational Gap Map
         A precise analysis of which of your five functions are running on structural risk.

OUT-02   Failure Mode Registry
         The specific ways each gap will manifest as the business scales.

OUT-03   System Architecture Proposal
         A proposed governance system design, scoped to your operational profile.
```

Each row: `OUT-01` label mono bold + title bold + description muted.
Border-bottom separator between rows, or `border` card per row.

**Remove** the `ContactForm` component entirely from this section.

---

## Task 10 — ByteOfTheWeek section exact-match

**File:** `src/components/sections/byte-of-the-week.tsx`

### Eyebrow
`BYTE · B-01` (where `B-01` = `B-` + zero-padded byte index)

### Layout
Two-column layout: left content | right preview card.

**Left column:**
- Eyebrow: `BYTE · B-01`
- H2: `{latestByte.title}`
- Body: `{latestByte.summary}`
- 4-cell features grid below summary (`grid-cols-2 md:grid-cols-4`), each cell:
  label (bold small) + description (muted smaller). Pull from `latestByte.features`
  if that field exists, or hardcode from PDF for the current byte.
- CTAs: "Read Now →" | "All Bytes"

**Right preview card** (`bg-card border rounded-md`):
```
OPERATIONAL INTELLIGENCE          ← mono eyebrow muted
B-01                              ← large mono bold
{latestByte.title}                ← normal weight
{readTime} min read               ← muted
{date}                            ← muted
```

The `readTime` and `date` should be derived from `latestByte` data if available,
or use `latestByte.readTime` / `latestByte.publishedAt` fields. If not available,
show only what is available.

---

## Task 11 — FAQ section exact-match

**File:** `src/components/sections/faq.tsx`

### Eyebrow
`FAQ`

### H2
"Operational questions, answered."

### Subhead
"For questions specific to your operational profile, the audit is the right path."

### Question items
Number each question: `Q.01`, `Q.02`, etc. (not just the question text).
Format per accordion row:
```
Q.01   What does an operational audit involve?   ▼
       [answer text]
```

The `Q.01` label renders inline left of the question text, mono muted.

Questions (5 total — use existing content if present, else use PDF text verbatim):
- Q.01: What does an operational audit involve?
- Q.02: How is this different from hiring an operations consultant?
- Q.03: What does governance mean in practice for a deployed system?
- Q.04: How does SLA accountability work?
- Q.05: What is the implementation timeline for a complete operational system?

Keep existing `grid-template-rows: 0fr → 1fr` CSS transition accordion behavior.

---

## Task 12 — Page section order

**File:** `src/app/page.tsx`

Reorder section components to match PDF sequence:

```
1.  <Hero />
2.  <FailureThesis />
3.  <Services />
4.  <Governance />        ← includes both property block and audit ticker
5.  <Industries />
6.  <Results />
7.  <FailureModeRegistry />   ← NEW section from Task 8
8.  <Contact />
9.  <ByteOfTheWeek />
10. <Faq />
```

Remove `<AgentAdvantage />` from the homepage (it is an internal section not
present in the PDF design). If `AgentAdvantage` imports diagrams, those
imports/renders stay in the component file — just don't render it on the homepage.

Verify all imports are correct after reorder.

---

## Verification

All scripts 004–016 must pass. Scripts 001 (typecheck) and 003 (build) have pre-existing
errors outside this spec's scope and are excluded from the required set.
New script 017 verifies the PDF-exact-match features.

## Verification Scripts
- scripts/verification/004-invariants.sh
- scripts/verification/005-raystrat-homepage-repositioning.sh
- scripts/verification/006-raystrat-positioning-refinement-pass.sh
- scripts/verification/007-raystrat-visual-system-phase-a.sh
- scripts/verification/008-raystrat-visual-system-phase-b.sh
- scripts/verification/009-phase-c-institutional-identity.sh
- scripts/verification/010-phase-d-governance-proof-foundation.sh
- scripts/verification/011-d1-5-institutional-cognition-stabilization.sh
- scripts/verification/012-d2-auditability-and-deployment-foundation.sh
- scripts/verification/013-d2-5-evidence-cognition-simplification.sh
- scripts/verification/014-phase-e-audit-surface-foundation.sh
- scripts/verification/015-rhythm-lab-archetypes.sh
- scripts/verification/016-homepage-design-v2.sh
- scripts/verification/017-homepage-pdf-exact-match.sh

---

## Data Model Changes
none

## API Surface
none
