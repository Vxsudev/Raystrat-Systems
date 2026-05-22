# Task: Implement homepage PDF exact-match — all section redesigns

## Parent Spec
specs/homepage-pdf-exact-match.md

## Phase
phase-visual-system

## Status
done

## Layer
frontend

## Description

Bring every homepage section into exact visual and content alignment with
`/Users/vasudevarao/Downloads/UI Work.pdf`. This is a frontend-only pass — no
data model or API changes.

Work on branch `rhythm-lab-archetypes`. All changes under
`src/components/sections/`, `src/components/header.tsx`,
`src/components/footer.tsx`, `src/data/content.ts`, and `src/app/page.tsx`.

Anti-theater constraints apply to every file touched — see spec.

---

### Sub-task 1 — Header nav + footer

**`src/components/header.tsx`**
Update nav links (in order): Systems · Governance · Evidence · Bytes
Update CTA button label: "Book Audit" (remove "Operational" — shorter)
Links:
- Systems → `/systems`
- Governance → `/#governance`
- Evidence → `/#results`
- Bytes → `/bytes`

Update `navigationLinks` in `src/data/content.ts` if header reads from there.

**`src/components/footer.tsx`**
Rewrite to three-column layout: SYSTEMS | ENGAGE | LEGAL.

SYSTEMS: Demand Acquisition, Follow-Through Infrastructure, Frontline Support,
Operations Control, Command Intelligence (links to `/systems/{slug}`)

ENGAGE: Operational Audit (Calendly or `#contact`), Bytes (`/bytes`), Governance
(`/#governance`), Industries (`/#industries`)

LEGAL: Documentation, Privacy, Terms, Trust (use `#` if pages don't exist)

Footer tagline below logo:
"Governed operational infrastructure for businesses where audit accountability,
SLA compliance, and continuity are not optional."

Bottom bar (full-width border-top, dark bg `bg-structure text-foreground/60`):
- Left: `© Raystrat Systems · v4.2.1 · BUILD-2026.05.21`
- Right: `● STATUS · ALL SYSTEMS NOMINAL` (mono, `text-green-500` for dot)

No gradients, no shadow-2xl.

---

### Sub-task 2 — Hero section

**`src/components/sections/hero.tsx`**

**Status panel header row** — replace current with:
```
● ● ●   DEPLOYED.SYSTEMS · PROD   V4.2.1
```
Grid `grid-cols-[auto_1fr_auto]`. Three dots left (muted), center mono text, right version mono.

**Status rows** — change format to:
```
01   Demand Acquisition      720h 00m   GOVERNED
02   Pursuit                 733h 11m   GOVERNED
03   Frontline Resolution    746h 22m   GOVERNED
04   Operations              759h 33m   WATCH
05   Command Intelligence    772h 44m   GOVERNED
```
Grid per row: `grid-cols-[24px_1fr_auto_auto] gap-x-4`
- Index `01`–`05`: `font-mono text-muted-foreground`
- Name: normal weight
- Uptime `720h 00m`: `font-mono text-muted-foreground`
- Pill: GOVERNED = `bg-green-950 text-green-400 border border-green-800 text-xs px-2 py-0.5 rounded-md font-mono`
       WATCH = `bg-amber-950 text-amber-400 border border-amber-800 text-xs px-2 py-0.5 rounded-md font-mono`

Remove percentage-based ok/warn/crit pill logic.

**Hero copy** — verify exact strings:
- H1: "Operational Breakdown Is Preventable."
- Body: "Businesses don't fail because people aren't trying. They fail because the systems that should govern demand, pursuit, support, operations, and intelligence don't exist — or run on human memory instead of governed infrastructure."
- CTA 1: "Book Operational Audit →" (Calendly)
- CTA 2: "View Systems" link to `/systems`
- Meta row 4 stats: 147 / 12.4M / 99.94% / <2.3 min (likely already correct)

---

### Sub-task 3 — FailureThesis section

**`src/components/sections/failure-thesis.tsx`**

Section eyebrow: `THE PROBLEM`
H2: "The five choke points where execution breaks."
Body: "Most businesses run these functions on human discipline. That means they
run — until someone is sick, overloaded, distracted, or gone. The failure is
not a performance issue. It is structural."

**Rows layout** — change from two-column (rows + ChokeDiagram side-by-side) to
single-column stacked rows, full container width.

Per row grid: `grid-cols-[32px_1fr_auto] gap-x-4 py-4 border-b border-border cursor-pointer`
- Col 1: `01`–`05` mono muted
- Col 2: system name (bold) with subtext below in muted smaller
- Col 3: `⏵ GOVERNED` pill — `border border-primary/40 text-primary text-xs px-2 py-0.5 rounded-md font-mono`

Active row: `bg-primary/5`

Row data (name → subtext):
1. Demand Acquisition → "Continuously detect and qualify inbound interest."
2. Pursuit → "Disciplined, persistent follow-through on every live opportunity."
3. Frontline Resolution → "Resolve customer contact consistently, 24/7, without SLA gaps."
4. Operations → "Execute routine processes with full auditability."
5. Command Intelligence → "Consolidate decision-critical data and surface it without delay."

**ChokeDiagram** — move below the rows (full width), keep existing SVG logic.

**Footer label** below diagram:
`SCHEMATIC.V1 · OPERATIONAL PIPELINE` left-aligned mono muted, `/ 01` right-aligned.

---

### Sub-task 4 — Services section

**`src/components/sections/services.tsx`**

Section eyebrow: `THE SOLUTION`
H2: "Six operational systems. Each closes a structural failure point."
Body: "Each system installs as governed infrastructure — with audit trail, SLA
enforcement, and escalation protocol built in. Not a tool. Not a workflow.
Operational backbone."

**Cards layout** — change from 3-column to `grid-cols-1 md:grid-cols-2`.
Remove icons entirely from cards.

Each card:
```
SYS-01 · DEMAND                    ← eyebrow: font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2
Demand Acquisition                 ← h3 font-bold font-headline text-xl mb-1
Continuous detection...            ← subtitle text-muted-foreground text-sm mb-4
→  Persistent signal monitoring... ← bullet: span "→" mr-2 text-muted-foreground, then text
→  ...
VIEW SYSTEM ↗                      ← mt-auto text-xs font-mono uppercase tracking-widest text-primary
```

SYS codes (in order, map to service index):
SYS-01 · DEMAND, SYS-02 · FOLLOW-THROUGH, SYS-03 · FRONTLINE,
SYS-04 · OPERATIONS, SYS-05 · COMMAND, SYS-06 · CUSTOM

"VIEW SYSTEM ↗" links to `/systems/${service.slug}`.

---

### Sub-task 5 — Governance section

**`src/components/sections/governance.tsx`**

Structure: two visually distinct blocks inside one component.

**Block A (light bg `bg-background` or `bg-secondary`):**
Section id: `governance`
Eyebrow: `GOVERNANCE LAYER`
H2: "Governance by design — not as an add-on."
Body: "Every system Raystrat deploys includes an operational governance layer.
Audit trail, SLA enforcement, escalation, compliance controls — structural
requirements, not optional features."

6 property cards in `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`:

```
01 / 06   Audit Trail Architecture
          Every action executed...

02 / 06   SLA Enforcement
          Performance targets...

03 / 06   Escalation Protocol
          Exceptions are routed...

04 / 06   Failure-Resistant Architecture
          Systems are designed around failure modes...

05 / 06   Compliance Controls
          For regulated environments...

06 / 06   Operational Continuity
          Deployed systems operate continuously...
```

Label `01 / 06` in `font-mono text-xs text-muted-foreground mb-2`.

**Block B (dark bg `bg-[hsl(220_24%_12%)]`):**
Keep existing AuditTicker implementation (pre-seed 8 entries, rotate every 2400ms).
Ensure header shows: `/var/log/raystrat/audit.stream` + `TAIL -F` + `LIVE` pill.
Row grid: `grid-cols-[110px_90px_1fr_90px]`.

---

### Sub-task 6 — Industries section

**`src/components/sections/industries.tsx`**

Section eyebrow: `HIGH-ACCOUNTABILITY ENVIRONMENTS`
H2: "Where audit, continuity, and SLA are non-negotiable."
Body: "Regulated sectors demand operational governance that general-purpose tools
can't provide. Our systems are deployed where accountability requirements are
explicit."

**Cards layout** — change from 3-col Card grid to stacked full-width entries.
Use `space-y-0` with `border border-border rounded-md` container or simple
`divide-y divide-border` on a wrapper.

Remove icons.

Each entry:
```
SEG-01 · FINTECH                   ← font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1
Fintech & Banking                  ← h3 font-bold font-headline text-xl mb-2
Compliance-grade description...    ← text-foreground/80 mb-4
— Governed credit decisioning...   ← bullet: "— " prefix text-foreground/80
— Fraud escalation workflows...
```

SEG codes: SEG-01 · FINTECH, SEG-02 · LEGAL, SEG-03 · MEDICAL.

---

### Sub-task 7 — Results section

**`src/components/sections/results.tsx`**

Section eyebrow: `OPERATIONAL EVIDENCE`
H2: "Measured against deployment baseline."
Body: "Ranges reflect deployments across regulated and non-regulated environments.
Every metric is logged continuously against defined SLA targets."

**4 metrics** in `grid-cols-2 md:grid-cols-4`:

| Value | Label |
|-------|-------|
| `2–5×` | REPLY RATE UPLIFT |
| `+10–25%` | COLLECTIONS SPEED |
| `30–60` | CONTENT VELOCITY |
| `~56` | HOURS SAVED /MO |

Each block: `text-4xl font-mono font-bold` value + `text-xs uppercase tracking-widest text-muted-foreground mt-2` label.
Border-right `border-r border-border` on first 3, none on last.

Remove `FailureModeRegistryPreview` and `DeploymentLifecycleDiagram` imports/renders
from this section.

Keep or add a simple "Book Audit →" link/button at the bottom.

---

### Sub-task 8 — Failure Mode Registry standalone section (NEW)

**`src/components/sections/failure-mode-registry.tsx`** (new file)

Simple section with a 3-column table.

```tsx
const failureModes = [
  { id: 'FM-001', function: 'Demand Acquisition',    severity: 'CRITICAL' },
  { id: 'FM-002', function: 'Pursuit',               severity: 'CRITICAL' },
  { id: 'FM-003', function: 'Frontline Resolution',  severity: 'HIGH' },
  { id: 'FM-004', function: 'Operations',            severity: 'HIGH' },
  { id: 'FM-005', function: 'Command Intelligence',  severity: 'MEDIUM' },
  { id: 'FM-006', function: 'Pursuit',               severity: 'MEDIUM' },
];
```

Table structure:
- Container: `bg-background` (light), or match surrounding context
- Header row: `text-xs uppercase tracking-widest text-muted-foreground font-mono`
- Cols: ID (80px) | FUNCTION (1fr) | SEVERITY (120px)
- Row separator: `border-b border-border`
- ID cell: `font-mono text-sm`
- Severity pill:
  - CRITICAL: `bg-red-950 text-red-400 border border-red-800`
  - HIGH: `bg-amber-950 text-amber-400 border border-amber-800`
  - MEDIUM: `bg-slate-800 text-slate-300 border border-slate-600`
  All pills: `text-xs px-2 py-0.5 rounded-md font-mono`

Export: `export function FailureModeRegistry() { ... }`

---

### Sub-task 9 — Contact section

**`src/components/sections/contact.tsx`**

Background: `bg-[hsl(220_24%_12%)]` (dark). All text light.
Section eyebrow: `THE FIRST MOVE`
H2: "Book an Operational Audit."
Body: "Before we propose a system, we assess. An audit maps your five choke
points, identifies active failure modes, and defines the governance architecture
required to address them."

CTA buttons (side by side):
- `<CalendlyButton size="lg">Book 30-min Audit →</CalendlyButton>`
- `<Button asChild variant="outline" size="lg"><Link href="/systems">Review Systems</Link></Button>`

Divider text below CTAs:
`THE AUDIT IS THE FIRST ENGAGEMENT. NOT A DEMO. NOT A TRIAL.`
`text-xs uppercase tracking-widest text-foreground/40 border-t border-border/20 pt-6 mt-6`

Three OUT rows (stacked, `divide-y divide-border/20`):
```
OUT-01   Operational Gap Map
         A precise analysis of which of your five functions are running on structural risk.

OUT-02   Failure Mode Registry
         The specific ways each gap will manifest as the business scales.

OUT-03   System Architecture Proposal
         A proposed governance system design, scoped to your operational profile.
```
Each row: `py-5 grid grid-cols-[80px_1fr]` or `flex gap-6`.
`OUT-01` in `font-mono font-bold text-primary text-sm`.
Title in `font-semibold`.
Description in `text-sm text-foreground/60`.

**Remove** `<ContactForm />` component and import.

---

### Sub-task 10 — ByteOfTheWeek section

**`src/components/sections/byte-of-the-week.tsx`**

Eyebrow: `BYTE · B-{padded index}` (e.g. `BYTE · B-01`)

Layout: `grid md:grid-cols-2 gap-8 md:gap-12 items-start`

**Left column:**
- Eyebrow `BYTE · B-01` (text-primary)
- H2: `{latestByte.title}`
- Body: `{latestByte.summary}`
- Features grid `grid-cols-2 gap-4 mt-6` — if `latestByte.features` or `latestByte.highlights` exists, use it.
  If no features field, show 4 hardcoded items from content.ts for the B-01 byte:
  "Add Service Lines", "Divide Labor", "Rethink Compensation", "Establish Governance"
  Each cell: `font-semibold text-sm mb-1` label + `text-sm text-muted-foreground` description
- CTAs: `<Button asChild size="lg"><Link href={...}>Read Now →</Link></Button>` + `<Button asChild variant="outline" size="lg"><Link href="/bytes">All Bytes</Link></Button>`

**Right preview card** (`bg-card border border-border rounded-md p-8`):
```
OPERATIONAL INTELLIGENCE    ← font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4
B-01                        ← font-mono text-3xl font-bold text-primary mb-3
{latestByte.title}          ← font-semibold text-sm mb-4
{readTime} min read         ← text-sm text-muted-foreground  (use latestByte.readTime if available)
{publishedAt}               ← text-sm text-muted-foreground  (use latestByte.publishedAt if available)
```

---

### Sub-task 11 — FAQ section

**`src/components/sections/faq.tsx`**

Eyebrow: `FAQ`
H2: "Operational questions, answered."
Subhead: "For questions specific to your operational profile, the audit is the right path."

Each accordion row renders `Q.01` label inline-left of question text:
```
Q.01   What does an operational audit involve?   [chevron]
       [answer text — revealed on open]
```

Left label: `font-mono text-xs text-muted-foreground mr-4 shrink-0`

If existing FAQ data in content.ts has questions, use them. Otherwise replace with
the 5 questions from the PDF:
- Q.01: What does an operational audit involve?
- Q.02: How is this different from hiring an operations consultant?
- Q.03: What does governance mean in practice for a deployed system?
- Q.04: How does SLA accountability work?
- Q.05: What is the implementation timeline for a complete operational system?

Keep existing accordion CSS grid-rows transition (no max-height hacks).

---

### Sub-task 12 — Page section order

**`src/app/page.tsx`**

Reorder section components to match PDF:
```tsx
<Hero />
<FailureThesis />
<Services />
<Governance />
<Industries />
<Results />
<FailureModeRegistry />   {/* NEW — import from sections/failure-mode-registry */}
<Contact />
<ByteOfTheWeek />
<Faq />
```

Remove `<AgentAdvantage />` from the page (do NOT delete the component file —
just don't render it on the homepage). Remove its import from page.tsx.

Ensure all remaining imports are correct after reorder.

---

## Acceptance Criteria
- [ ] Header nav: Systems | Governance | Evidence | Bytes | Book Audit
- [ ] Footer: 3 columns SYSTEMS/ENGAGE/LEGAL + STATUS bottom bar
- [ ] Hero status rows: hours format + GOVERNED/WATCH pills
- [ ] FailureThesis: single-col rows with `⏵ GOVERNED` pills, ChokeDiagram below
- [ ] Services: 2-col grid, SYS-XX notation, → bullets, no icons, VIEW SYSTEM ↗
- [ ] Governance: light prop block (01/06 labels) + dark audit ticker
- [ ] Industries: stacked full-width, SEG-XX labels, — bullets, no icons
- [ ] Results: 4 metrics (2-5×, +10-25%, 30-60, ~56) with labels
- [ ] FailureModeRegistry standalone section with FM-001 through FM-006
- [ ] Contact: dark bg, OUT-01/02/03 rows, no ContactForm, Book 30-min Audit CTA
- [ ] ByteOfTheWeek: BYTE·B-01 eyebrow, right-side preview card
- [ ] FAQ: "Operational questions, answered." heading, Q.01 notation
- [ ] Page order matches PDF sequence, AgentAdvantage removed from homepage
- [ ] `npm run typecheck` exits 0
- [ ] No anti-theater patterns in any modified file

## Files Likely Affected
- `src/components/header.tsx`
- `src/components/footer.tsx`
- `src/data/content.ts`
- `src/components/sections/hero.tsx`
- `src/components/sections/failure-thesis.tsx`
- `src/components/sections/services.tsx`
- `src/components/sections/governance.tsx`
- `src/components/sections/industries.tsx`
- `src/components/sections/results.tsx`
- `src/components/sections/failure-mode-registry.tsx` (new)
- `src/components/sections/contact.tsx`
- `src/components/sections/byte-of-the-week.tsx`
- `src/components/sections/faq.tsx`
- `src/app/page.tsx`

## Blocked By
- none
