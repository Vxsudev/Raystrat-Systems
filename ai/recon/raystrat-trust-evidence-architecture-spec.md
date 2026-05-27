# Recon: Trust & Evidence Architecture Spec
**Date:** 2026-05-21
**Pass:** RAYSTRAT_TRUST_EVIDENCE_ARCHITECTURE_SPEC
**Status:** SPEC-ONLY (pre-spec recon; no implementation)
**Scope:** Survey the perception of operational seriousness, evidence presence, and procurement-readability across all marketing surfaces. Identify gaps where the positioning is asserted but the supporting evidence layer is absent.

---

## 0. Read Authority

This recon operates under the doctrine ratified in:

- `specs/phases/phase-1.md` (positioning — locked)
- `specs/phases/phase-visual-system.md` (visual system — ratified Phase A/B complete)
- `ai/product-invariants.md` (marketing/app domain isolation)
- `ai/invariant-registry.md` (RATIFIED invariants INV-001..003)

The site's current state, post-Phase B, communicates: "operational systems engineering company." This recon evaluates what is missing to communicate: "institutionally trustworthy, procurement-safe, audit-grade operational systems engineering company that has built things."

---

## 1. Current Trust-Signal Inventory

### 1.1 Surface-by-surface audit

| Surface | What signals trust today | What is asserted but not shown |
|---------|--------------------------|--------------------------------|
| `hero.tsx` | Eyebrow `OPERATIONAL SYSTEMS ENGINEERING`, headline `Operational Breakdown Is Preventable`, lead paragraph naming the five functions, single canonical CTA | No evidence Raystrat has executed against this thesis. No artifact, no diagram, no proof. The hero asserts a position but does not demonstrate it. |
| `failure-thesis.tsx` | Two-column doctrinal text — "The Five Choke Points" left, "The Structural Failure" right. Strong rhetorical frame. | The five choke points are listed as text only. They are never visualized as a system. No diagram of how they interrelate. No artifact showing a "Failure Mode Registry" entry. |
| `services.tsx` | Six service cards with subhead + 3 bullets + "View System →" link affordance. Names every system. | The catalog is naming-level only. No architecture sketch per system. No telemetry. No audit trail preview. No SLA spec. |
| `agent-advantage.tsx` (Governance by Design) | Six governance properties (Audit Trail Architecture, SLA Enforcement, Escalation Protocol, Failure-Resistant Architecture, Compliance Controls, Operational Continuity) with titles + descriptions. | Each property is stated in prose. None are visualized. There is no governance-runtime sketch. No example of an audit-trail entry. No escalation flow diagram. No SLA specification example. |
| `industries.tsx` | Three industry verticals (Fintech & Banking, Legal, Medical & Healthcare). Each with bullets describing operational systems deployed. | No case studies. No anonymized engagement examples. No compliance certifications. No data-handling artifacts. No client mentions. No artifact-level proof of industry-specific deployment maturity. |
| `results.tsx` (audit CTA section) | "Book an Operational Audit" with three deliverable cards: Operational Gap Map, Failure Mode Registry, System Architecture Proposal. CTA framing positions audit as first engagement. | The deliverables are named but never previewed. A buyer cannot see what a "Gap Map" or "Failure Mode Registry" or "Architecture Proposal" actually looks like. The audit is offered as a product without artifact-level demonstration. |
| `byte-of-the-week.tsx` | Editorial signal — latest "Byte" with title, summary, CTA to read. Adds thought-leadership presence. `AnimatedGridBackground` decorative panel beside it. | The decorative animated grid signals "AI agency" more than "operating documentation." Bytes themselves are the strongest current trust signal, but they are siloed from the operational systems argument. |
| `faq.tsx` | Q&A accordion answering process and engagement questions. | No artifact references in answers — answers are conversational, not documentary. |
| `contact.tsx` | Contact form with restrained styling. | No SLA on response. No engagement protocol disclosure. No procurement-officer-readable handoff statement. |
| `systems/page.tsx` (catalog index) | Tight header + 6 system cards + audit CTA in box. | Catalog only — no diagram of how systems interrelate. No architecture overview. No deployment lifecycle. |
| `systems/[slug]/page.tsx` via `service-page-client.tsx` | Per-system content: HTML pageContent with sections (What It Governs / Failure Mode It Prevents / What It Delivers / Governance Properties / Outcome). Core Features sidebar. Sticky CTA. NotesTaker. FavoriteAgentButton. JustificationPopup. | Rich doctrinal text exists, but: no system architecture diagram, no audit trail sample, no SLA template, no escalation matrix, no handoff visualization, no deployment artifact. The text says "audit trail logged" — the site never shows what such a log entry looks like. |
| `floating-ai-suggestor.tsx` | Operational Advisor sheet — conversational contextual help. Post-Phase B: `MessageSquare` icon, restrained outline trigger. | Functional but conversation-only. No structured operational artifact returned. No "here is your gap map preview" output, no spec-style artifact. |
| `header.tsx` / `footer.tsx` | Wordmark, nav, ThemeToggle. Post-Phase B: no decorative ping animations. | Header is text-only wordmark — logo mark `raystrat-logo.png` does not yet appear (Phase C scope). Footer is functional but contains no institutional anchors: no compliance statement, no engagement model link, no documentation link, no principal accountability anchor. |

### 1.2 Trust-signal taxonomy (current)

The site has only **Tier-1 doctrinal artifacts**:
- Positioning statements
- Failure thesis prose
- Per-system "What It Governs" doctrine
- Governance property descriptions
- Industry deployment claims

The site has effectively **zero Tier-2/3/4 artifacts**:

| Tier | Definition | Current presence |
|------|------------|------------------|
| **Tier 1 — Doctrine** | Written claims about what Raystrat builds and why | Strong. Present on every page. |
| **Tier 2 — Architecture** | Diagrams of how systems are structured (intake, gates, execution, audit) | Absent. Zero diagrams anywhere on the marketing surface. |
| **Tier 3 — Operational** | Sample audit trail entries, SLA specifications, escalation matrices, failure-mode registry entries, runtime artifacts | Absent. The audit is offered as a service but never shown as an artifact. |
| **Tier 4 — Engagement** | Procurement-readable artifacts (engagement model timeline, principal accountability, deployment lifecycle, governance continuity commitment) | Absent. Buyers cannot procure off the public site — they must request material. |

This is the structural gap the spec must close.

---

## 2. Current Evidence Gaps

### 2.1 Categories of missing evidence

| Gap | Where it should appear | What its absence costs |
|-----|------------------------|------------------------|
| **System architecture diagrams** | Each `/systems/[slug]` page; homepage `services.tsx` could expose one diagram of the choke point map | A buyer cannot pattern-match "this company architects systems" because no architecture is ever shown. Visual proof of architectural thinking is the strongest signal of systems-engineering maturity. |
| **Audit trail artifact** | Per-system page; possibly a small panel on `agent-advantage.tsx` Audit Trail property | The phrase "audit trail" is repeated dozens of times in copy. It is never demonstrated. A buyer asking "what does your audit trail look like?" has no public reference. |
| **SLA specification example** | `agent-advantage.tsx` SLA Enforcement property; per-system page | "SLA Enforcement" is offered as a governance property without a single example of how SLA is specified, measured, or enforced. |
| **Escalation matrix** | Per-system page (esp. follow-through, frontline-support, operations-control) | Escalation Protocol is named as a governance property. The actual structure (when does X escalate to Y, with what context, on what trigger) is invisible. |
| **Failure Mode Registry preview** | `results.tsx` audit deliverable; per-system page | Named as an audit deliverable. Never previewed. Buyer cannot imagine what they will receive after engagement. |
| **Operational Gap Map preview** | `results.tsx` audit deliverable | Same — named, never shown. |
| **System Architecture Proposal preview** | `results.tsx` audit deliverable | Same. |
| **Deployment lifecycle diagram** | Homepage or a new "How We Engage" surface | The audit-first engagement is asserted in copy but the full deployment lifecycle (audit → architecture → deployment → governance run → continuity) is never visualized. |
| **Handoff visibility** | Per-system page (esp. follow-through, frontline-support) | The boundary between "system autonomy" and "human review zone" is invisible. Buyers cannot tell what part of the function they retain control over. |
| **Continuity model statement** | Footer or principal page | "Operational Continuity" is the sixth governance property. No artifact describes what continuity means when the engagement ends or what happens if a system fails. |
| **Principal accountability** | About / Principal page (does not exist) or footer | Raystrat is not represented by a named principal anywhere on the marketing surface. For institutional buyers, the named-principal signal is procurement-critical. |
| **Documentation surface** | Footer link to public documentation index | The site offers systems but does not link to any documentation. Documentation presence is one of the loudest "we have built things" signals. |
| **Compliance/data-handling statement** | Footer + per-industry page (Fintech, Medical, Legal) | Three regulated industries are named as target verticals. There is no public data-handling statement, no compliance certifications list, no data residency clarification. This is procurement-blocking. |
| **Engagement protocol** | `results.tsx` or a sibling section | The audit is offered. The post-audit protocol (what happens between Book and Deploy) is never published. |
| **Operational artifacts produced during engagement** | Implicit in deliverables | Naming three artifacts (Gap Map, Failure Mode Registry, Architecture Proposal) without showing what they look like leaves the buyer unable to evaluate their substance. |

### 2.2 Cumulative effect of gaps

The cumulative absence of Tier-2/3/4 artifacts produces this perception for an institutional buyer:

> "This company has strong language about operational systems engineering, but I cannot tell whether they actually build what they describe. There are no diagrams, no sample artifacts, no operational evidence. I would have to commission an audit to find out — but the audit itself is also unspecified beyond a three-bullet deliverable list."

This is the trust ceiling the current site enforces. A spec is required to define the surfaces that lift the ceiling.

---

## 3. Procurement-Risk Analysis

### 3.1 Procurement officer evaluation pass (hypothetical)

If a corporate procurement officer or systems architect performs a desk review of `raystratsystems.com` against a standard enterprise vendor checklist, they encounter:

| Procurement checkpoint | Current site answer | Risk classification |
|------------------------|---------------------|---------------------|
| Does the vendor publish a system architecture? | No | High — cannot evaluate technical maturity |
| Does the vendor publish an audit-trail specification? | No | High — compliance-relevant; cannot evaluate |
| Does the vendor publish data handling / residency information? | No | Critical — blocks regulated-industry engagement |
| Does the vendor publish compliance certifications (SOC, ISO, HIPAA, PCI)? | No | High in regulated industries (Fintech, Medical, Legal — explicitly named verticals) |
| Does the vendor publish SLAs? | No public SLA template | High |
| Does the vendor publish an escalation policy? | No | Medium-High |
| Does the vendor name a principal accountable for delivery? | No | Medium — institutional preference |
| Does the vendor have published case studies with traceable outcomes? | No | Medium — limits reference-checking |
| Does the vendor publish a documentation surface? | No | Medium-High — proxy for engineering maturity |
| Does the vendor publish an engagement model? | Audit CTA only | Medium |
| Does the vendor publish a continuity statement (what happens if the system fails or the engagement ends)? | No | High in regulated industries |

**Net procurement read:** "This is a marketing site for an operational systems company. The substance is asserted but not evidenced. For RFP routing, this vendor requires extensive pre-qualification before we can even score them."

### 3.2 Procurement-friction cost

Each missing artifact translates into RFP-cycle friction. The audit-first engagement model is intended to compress the RFP, but the absence of public artifacts means the procurement officer cannot pre-qualify Raystrat before booking an audit. Two distinct failure modes:

1. **Self-disqualification:** The procurement officer screens out vendors who do not publish minimum procurement artifacts. Raystrat is screened out before contact.

2. **Over-disclosure pressure during audit:** The buyer brings full RFP-style probing to the audit because the public surface answered nothing. The audit becomes an RFP response under another name, draining its strategic compression.

The spec must close enough of this gap so that the audit serves its intended function (diagnostic compression) rather than becoming an oral RFP.

### 3.3 Industry-specific procurement risk

The three named verticals (Fintech, Legal, Medical) have the highest procurement bars. Each requires evidence the site does not currently provide:

| Vertical | Procurement-critical absence | Risk |
|----------|------------------------------|------|
| Fintech & Banking | No SOC 2, no compliance posture statement, no data residency artifact, no fraud-detection methodology disclosure | Self-disqualification likely for any institution above seed stage |
| Legal | No client-confidentiality statement, no chain-of-custody disclosure for e-discovery claim, no malpractice-relevant data handling artifact | Procurement-blocked by general counsel review |
| Medical & Healthcare | No HIPAA statement, no BAA template reference, no patient-data segregation artifact, no clinical-documentation accuracy controls disclosure | Procurement-blocked by compliance review |

The site currently asserts industry deployment maturity in these three sectors without providing the artifacts that make the assertion procurable. The spec must address whether industry-specific procurement-safe artifacts are part of the trust architecture (recommendation: yes, but with explicit bounded-claim discipline).

---

## 4. Institutional-Perception Gaps

### 4.1 The marketing-site read

The current site, despite positioning ratification and visual system maturity, retains four institutional-perception gaps:

| Gap | Symptom | Why it matters |
|-----|---------|----------------|
| **Reads as marketing-text-only** | Every section is prose. No tables of operational properties. No structural documents embedded. No reference architecture surface. | Operational systems companies that have built things publish operating documentation. The absence of documentation aesthetics signals "this is a service brochure." |
| **No documentary moments** | Site has zero passages that read like operating documentation (spec format, version-stamped artifact, structured property listing). | Documentary moments are the strongest signal of engineering culture. Without them, the site reads as a sales surface, not a systems-engineering surface. |
| **No structural diagrams** | Zero diagrams of any kind on the marketing surface. | Companies that engineer systems publish their systems' architecture. The absence of diagrams forces buyers to take engineering maturity on faith. |
| **No named principal or team** | Raystrat is rendered as a faceless brand. No principal page, no team page, no engineer profiles. | For institutional buyers, named accountability is a procurement signal. Anonymous vendors face elevated scrutiny. |

### 4.2 The institutional vs marketing register

The site currently lives in the **marketing register** even when content is operationally substantive. The institutional register has different conventions:

| Property | Marketing register (current) | Institutional register (target) |
|----------|------------------------------|---------------------------------|
| Page architecture | Hero → sections → CTA | Header doctrine → structural argument → operational evidence → engagement protocol |
| Typography | Brand-forward | Documentation-forward |
| Numbers | Marketing-rounded ("2–5×", "+10–25%") | Sourced and bounded ("In our engagements, reply-rate uplift falls in 2–5× range; methodology link") |
| Claims | Asserted | Sourced, bounded, scoped |
| Visual hierarchy | Eye-catching | Procedurally legible |
| Whitespace | Decorative | Functional |
| Color | Accent for emphasis | Accent for semantic operational state |
| Diagrams | None | One per system + one homepage architectural diagram |
| Artifacts | Implicit | Visible (with redaction) |
| Tone | "We build systems that…" | "Each deployed system exhibits these properties:" |

The spec must define which surfaces shift to institutional register and which retain marketing register (some surfaces — bytes editorial, FAQ, contact — appropriately remain marketing register).

### 4.3 The "we have built things" signal

The single perception the spec must engineer is: **"This company has built things."**

Decompose:

- "Built" implies past tense — there is prior work.
- "Things" implies plural and concrete — not abstractions.
- "Has" implies present possession — the work continues to exist.

Current state of this signal on the site:

| Evidence type | Present? |
|---------------|----------|
| Engineering journal references | No |
| Architecture diagrams | No |
| Sample operational artifacts | No |
| Versioned documentation | No |
| Visible system identifiers (codes, versions) | Partial — `Byte-01` exists, but no system identifiers |
| Date-stamped artifacts | No |
| Principal authorship attribution | No |
| Engineering-culture signals (code commits visible, technical writing, open-source contribution) | No |
| Customer named (with permission artifact) | No |
| Industry-specific compliance posture | No |

The site asserts the position but does not exhibit the evidence. Closing this gap is the spec's primary mission.

---

## 5. Operational-Proof Opportunities

### 5.1 Surfaces ready to carry operational proof

The following surfaces are structurally appropriate hosts for operational-proof artifacts. The spec must define which artifacts land where and what they look like in restrained, doctrine-compliant form.

| Surface | Operational proof opportunity |
|---------|-------------------------------|
| `agent-advantage.tsx` (Governance by Design) | Each of the six governance properties is the natural anchor for a corresponding operational artifact preview (Audit Trail Architecture → audit-log entry sketch; SLA Enforcement → SLA spec sketch; Escalation Protocol → escalation matrix sketch; etc.). |
| `failure-thesis.tsx` | The "Five Choke Points" list is the natural anchor for a structural diagram showing how the choke points relate to the systems Raystrat deploys. One diagram, restrained, schematic — not infographic. |
| `services.tsx` (homepage catalog) | Each card could carry a micro-affordance signaling "architecture available" — leading to the per-system page architecture. |
| `systems/[slug]/page.tsx` | The per-system page is the densest operational-proof opportunity. It can host: system architecture diagram, sample audit-trail entry, SLA template, escalation matrix, handoff diagram. |
| `results.tsx` | The audit deliverable cards are the natural anchor for redacted previews of Gap Map / Failure Mode Registry / Architecture Proposal — small, restrained, schematic. |
| `industries.tsx` | Each industry card can carry a compliance-posture line (or a "see compliance posture" link to a deeper artifact) once such artifacts exist. The spec must define what the industry-specific proof surface looks like without overclaiming. |
| Footer | Footer can carry institutional anchors: documentation link, compliance posture link, principal accountability anchor, continuity statement link. |

### 5.2 Specific operational-proof artifacts to define

The spec must doctrinally define the following operational-proof artifacts (each gets a section in the spec):

1. **Audit-trail entry artifact** — a redacted, schematic representation of what one log entry looks like (timestamp, system identifier, action class, outcome, context hash). Lives in a small panel on the Audit Trail Architecture property of `agent-advantage.tsx` and/or per-system pages.

2. **SLA specification artifact** — a structured table showing how SLA is specified at deployment (metric, threshold, measurement window, escalation trigger, breach action). Lives on the SLA Enforcement property and per-system pages where SLA is foregrounded (frontline-support especially).

3. **Escalation matrix artifact** — a structured table or restrained diagram showing escalation tiers (trigger → routing → context passed → SLA preservation). Lives on Escalation Protocol property and on per-system pages.

4. **Failure Mode Registry artifact** — a structured table excerpt showing failure mode entries (mode → containment strategy → audit signal). Lives on `results.tsx` audit deliverable and possibly in `failure-thesis.tsx`.

5. **Operational Gap Map artifact** — a structured diagram showing the 5 choke points mapped against client-state (current state, target state, gap class). Lives on `results.tsx`.

6. **System architecture diagram** — per-system schematic showing intake → governance gates → execution → terminal state → audit. One per `/systems/[slug]` page.

7. **Choke point diagram** — homepage-level schematic showing the five choke points and how Raystrat's six systems map to them. Lives on `failure-thesis.tsx` or as a new lightweight section between FailureThesis and Services.

8. **Handoff diagram** — per-system, showing autonomous-zone vs human-review zone vs escalation zone. Especially relevant for follow-through, frontline-support, operations-control.

9. **Deployment lifecycle artifact** — visualization of the engagement lifecycle (audit → architecture proposal → build → deployment → governance run → continuity review). Lives on `results.tsx` or a new "Engagement Model" surface.

10. **Continuity statement artifact** — a structured document anchor describing operational continuity properties (what happens during incidents, what happens if engagement ends, what artifacts the client retains).

11. **Principal accountability artifact** — named principal, named on the engagement, with a sentence on accountability scope. Lives in footer or on a Principal page.

12. **Bytes-as-evidence integration** — Bytes are already a thought-leadership surface. The spec should examine whether Bytes can be cross-referenced from operational surfaces to function as engineering-culture evidence ("our reasoning is published; here are the bytes that govern this surface").

---

## 6. Governance Cognition Opportunities

### 6.1 The governance-visibility deficit

The site repeats the word "governance" many times across `agent-advantage.tsx`, every system page, and the homepage architecture. The word does extensive work without visual support.

To cognitively close the gap, the spec must address:

- **What is being governed?** (Inputs, decisions, executions, outputs, exceptions.)
- **By what mechanism?** (Rules at deployment, runtime enforcement, audit-trail capture, escalation triggers, SLA monitoring.)
- **With what visibility?** (Audit access, runtime telemetry, dashboards.)
- **Under whose accountability?** (Raystrat retains? Client retains? Both?)

Each of these must be visualizable in a restrained, doctrine-compliant way. The spec must explicitly forbid the "operations dashboard" cosplay aesthetic while requiring some form of governance-visibility evidence.

### 6.2 Governance cognition patterns to adopt (extract, do not copy)

Operational-systems references (extracting cognition patterns only — do **not** copy aesthetics):

| Reference (cognition pattern) | What works | What to avoid |
|-------------------------------|------------|---------------|
| Palantir (Foundry public surfaces) | Restrained dark anchors, structural language, named operational categories, documentary tone, system-identifier numerals, schematic system diagrams | Their cybersecurity-government aesthetic, their dark-mode dominance, their dense data visualizations |
| Stripe Docs | Document-first surface, structured property listings, sample artifacts (JSON examples, response shapes), restrained visual flourish | Their developer-tool register is too playful for institutional buyers |
| AWS Well-Architected | Documentary structure, principle-first organization, named reference architectures | Their aesthetic is too utilitarian / corporate |
| Google SRE Book aesthetic (technical writing) | Sober register, sourced claims, named principles, bounded language | They have no marketing register to study |
| Atlassian Compass / OpsGenie | Operational-tooling register, structured property tables, named SLAs, escalation visibility | Their dashboard aesthetic is on the wrong side of dashboard-theater for our needs |
| Datadog / PagerDuty (operational surfaces) | Operational-state language, named runtime properties, structured escalation paths | Their decorative telemetry is exactly what we must avoid |
| Vercel (deployment surface) | Restrained documentation, named deployment lifecycle, calm structural layout | Their playful brand register is incompatible |
| Linear (engineering tool surface) | Calm visual density, structured property emphasis, restrained motion | Their consumer-prosumer aesthetic is too playful |

**Extracted patterns (allowed):**
- Document-first structural layout for operational evidence
- Named-principle organization (not feature lists)
- Sourced, bounded claims with methodology references
- Schematic diagrams (boxes, lines, decision gates — no organic shapes)
- Sample-artifact panels with redacted content (not live dashboards)
- Operational language (named entities, identifiers, state codes)
- Restrained color (single semantic accent for operational state)

**Patterns explicitly rejected:**
- Live or animated telemetry
- Decorative dashboards
- Real-time-feel without real-time data
- Glowing metric cards
- Number-counter animations
- Particle backgrounds in evidence sections
- Hero scenes that simulate operational interfaces

---

## 7. Diagram Opportunity Map

### 7.1 Diagram inventory (target)

The current site has **zero diagrams** on the marketing surface. The spec must define exactly how many diagrams the site should carry, what each shows, and how it is rendered (SVG, static, schematic).

| Diagram | Surface | Purpose | Density tier |
|---------|---------|---------|--------------|
| Choke Point Diagram | `failure-thesis.tsx` (or a new sub-section) | Show the five choke points and how they interrelate as the operational lifecycle | High |
| Systems Coverage Map | Between `failure-thesis.tsx` and `services.tsx` (or integrated into one of them) | Show how the six systems map to the five choke points + custom build | High |
| System Architecture Diagram (×6) | `systems/[slug]/page.tsx` for each of the six systems | Show intake → governance gates → execution → terminal state → audit for each system | High (one per system page) |
| Escalation Flow Diagram | Per-system pages where escalation is foregrounded (follow-through, frontline-support, operations-control) | Show escalation trigger → routing → context-pass → SLA preservation → human-review zone | Medium |
| Handoff Diagram | Same per-system pages | Show autonomous-zone vs human-zone vs escalation-zone | Medium |
| Governance Layer Diagram | `agent-advantage.tsx` (one diagram for the section) | Show audit trail / SLA / escalation / failure-resistance / compliance / continuity as structural layers of every deployed system | Medium |
| Deployment Lifecycle Diagram | `results.tsx` (or a new engagement-model surface) | Show audit → architecture proposal → build → deployment → governance run | Medium |

**Maximum diagram count per page:** one large diagram per surface. Per-system pages may have one large (system architecture) + one inline (escalation/handoff). Homepage carries at most two diagrams across its full scroll.

### 7.2 Diagram doctrine (preview — full version in spec)

| Property | Rule |
|----------|------|
| Format | SVG only. No raster. No Lottie. No Spline. No animated GIF. |
| Motion | Static. No decorative motion. Reveal-on-scroll is permissible if subtle (fade-in over 200ms), but never animation of internal diagram elements. |
| Color | Monochrome + single accent (Raystrat blue) for semantic operational state. No multi-color illustrations. |
| Shapes | Geometric: rectangles, lines, arrows, decision diamonds where appropriate. No organic curves except for accountability-zone boundaries. No 3D, no depth, no shadow. |
| Icons | Lucide-react icons only, restrained — never cute mascots, never brain icons, never robot faces, never sparkle accents. |
| Annotations | Every element labeled. No mystery shapes. |
| Density | Diagrams may be dense if every element serves the doctrine. Never dense for decorative effect. |
| Dark mode | All diagrams must render correctly in both light and dark themes via CSS variables. |
| Mobile | Diagrams must collapse to vertical flow at narrow widths without horizontal scroll. |
| Source | Diagrams are committed as `.svg` files in `public/diagrams/` (or similar). Authored by hand or by SVG-generating script; not by external SaaS embed. |

### 7.3 Diagram-style anti-patterns (preview)

**Forbidden visual styles:**
- Neural-network node graphs
- "Brain" or "AI core" illustrations
- Animated network connection lines
- Particle-system backgrounds in diagrams
- 3D isometric "city" or "infrastructure" illustrations
- Glowing edges or nodes
- Holographic / glassmorphism overlays
- Animated cursor / typing simulations
- Generated AI-style architectural illustrations
- Stock infographic templates
- Multi-color rainbow-coded edges

---

## 8. Deployment Cognition Map

### 8.1 What "deployed system" means operationally

The word "deployed" appears across the site. A buyer's mental model of "deployment" varies by background:

| Buyer background | "Deployed system" likely means to them |
|------------------|----------------------------------------|
| Enterprise IT / ops leader | A running production service with SLA, monitoring, incident response, change management |
| Mid-market founder | A tool that someone installed and trained the team on |
| Vendor evaluator | A piece of software the vendor maintains |
| Regulated industry compliance officer | A system inside the compliance perimeter with audit access, data residency, BAA |
| Procurement officer | A contract-bound vendor obligation with deliverables and acceptance criteria |

The site must engineer the institutional read: deployed = governed, audited, continuously operating, accountable.

### 8.2 Deployment cognition properties to communicate

The spec must define how each property is communicated visually and verbally:

| Property | Cognitive claim | Communication mechanism |
|----------|----------------|-------------------------|
| **Continuity** | The system runs after deployment, indefinitely | Continuity statement artifact; visualization of operational lifecycle |
| **Governance** | The system enforces rules at runtime | Governance layer diagram; audit-trail artifact |
| **Auditability** | The system produces a continuous, queryable trail | Audit-trail entry artifact; per-system page audit-trail callout |
| **SLA-bound** | The system is contractually accountable for performance | SLA specification artifact; SLA visibility on per-system pages |
| **Escalation-aware** | Exceptions are routed, not dropped | Escalation matrix artifact; escalation flow diagram |
| **Failure-resistant** | The system is designed around failure modes | Failure-mode registry artifact; per-system "Failure Mode It Prevents" already serves this — diagrammatic reinforcement |
| **Accountable** | The system has named operational ownership (Raystrat + client) | Principal accountability artifact; engagement model |
| **Documented** | The system survives institutional turnover | Documentation surface; engagement-deliverable artifact |
| **Compliance-relevant** | The system fits the regulatory perimeter (where applicable) | Compliance posture artifact (per-industry, bounded claims only) |

### 8.3 Deployment lifecycle (target visualization)

The spec must define a deployment lifecycle visualization with these stages:

1. **Audit** — operational gap mapping, failure mode registry, architecture proposal
2. **Architecture Review** — client-side review of proposed system architecture, scope, SLA targets
3. **Build** — system construction against the approved architecture
4. **Deployment** — system goes into governed runtime, audit trail begins
5. **Governance Run** — continuous operation under SLA, escalation, audit
6. **Continuity Review** — periodic review of operational state, configuration updates as governed change

The visualization must be schematic, not journey-map cosplay (no "1 → 2 → 3 → 4" timeline with emojis). It must read like an operational lifecycle, not a marketing funnel.

---

## 9. Anti-Pattern Map

### 9.1 Anti-patterns to explicitly forbid

The spec must enumerate forbidden patterns. Below is the recon-level inventory; the spec will canonize and expand.

| Anti-pattern class | Examples to forbid |
|--------------------|--------------------|
| **Fake dashboards** | Mocked-up "operational dashboard" sections with animated KPIs; simulated charts; live-typing in a code panel; cursor-blink in a fake terminal |
| **Decorative telemetry** | Glowing metric cards; up-arrow icons on numbers; count-up animations; sparkline backgrounds behind statistics |
| **AI agency clichés** | Sparkle icons; gradient backgrounds; "neural" patterns; "AI brain" illustrations; orb / particle systems; "powered by AI" badges |
| **Cybersecurity cosplay** | Green-on-black terminal aesthetics; hexagonal node grids; "live attack map" simulations; matrix-style raining characters; hacker fonts |
| **Dashboard theater** | Sections that mimic an internal admin panel without being one; sidebars with fake nav items; status bars with fake green dots; fake "system online" indicators |
| **Enterprise consulting sludge** | Big-4-style "Our Approach" timelines with circular numbered arrows; "Methodology" pyramids; "Pillars of Excellence" iconography; corporate stock photography |
| **Startup social proof theater** | "Trusted by 10,000+ teams"; logo carousels with no permission attribution; "As featured in" rows for press that didn't happen; "Backed by [VC]" badges without permission |
| **Animation spectacle** | Hero parallax; scroll-jacking; full-bleed B-roll video; stock founder-photo collages; cursor-following gradients; mouse-tracked tilt on cards |
| **Holographic / glassmorphism** | Backdrop-blur panels on operational sections; gradient mesh backgrounds; iridescent borders; depth-stacked card shadows |
| **Quantitative overclaim** | "100% uptime"; "Zero failures"; "Millions served"; "10× ROI guaranteed"; specific percentages without methodology |
| **Anonymous client claims** | "Major Fortune 500 client"; "A leading financial institution"; without permission artifact attached |
| **Unsourced compliance claims** | "SOC 2 compliant" / "HIPAA compliant" / "ISO 27001 certified" without certification artifact or scope statement |

### 9.2 Visual anti-theater rules (preview)

The spec must explicitly forbid these visual moves on trust/evidence surfaces:

- No `animate-pulse`, `animate-ping`, `animate-bounce` on metric or trust elements
- No `bg-gradient-*` on operational evidence containers
- No `backdrop-blur-*` on evidence panels
- No `shadow-2xl` or glow shadows on trust artifacts
- No iridescent borders (no animated rainbow gradients)
- No `scale-*` or `rotate-*` hover effects on evidence elements
- No fake-live indicators (no "🟢 Operational" with no real source)
- No counter animations on statistics

---

## 10. Implementation-Risk Analysis

### 10.1 Risks of producing trust/evidence artifacts

This recon enumerates risks that the spec must address with explicit doctrine and the implementation phase must mitigate operationally.

| Risk | Description | Mitigation direction |
|------|-------------|----------------------|
| **Overclaim risk** | Sample artifacts (audit-trail, SLA, escalation matrix) imply Raystrat's runtime systems behave as shown. If the actual runtime differs, the marketing surface becomes a liability. | Spec defines "redaction discipline" — artifacts are illustrative representations of artifact format, not live runtime samples. Every artifact carries a "schematic representation" label. |
| **Compliance overclaim risk** | Naming Fintech / Medical / Legal as deployment verticals invites SOC / HIPAA / regulatory inquiries. Stating compliance posture before certification exists is procurement-blocking. | Spec defines bounded-claim discipline — vertical-specific artifacts describe approach (audit trail, BAA-ready, data segregation) without claiming certifications that do not exist. |
| **Diagram drift risk** | Architecture diagrams must match actual runtime. If they don't, technical reviewers spot the gap. | Spec requires each diagram to be a faithful schematic of an actually-deployed system. Implementation phase reviews diagrams against runtime architecture before publication. |
| **Dashboard-theater drift risk** | Designers will be tempted to render operational artifacts as polished dashboards. The line between "documentary artifact" and "fake dashboard" is narrow. | Spec defines anti-theater rules with explicit forbidden CSS patterns and concrete visual specifications. |
| **Procurement-disclosure risk** | Publishing escalation matrices, SLA templates, and continuity statements creates contractual reference points. Buyers can quote them in negotiation. | Acceptable. The trust-evidence architecture is intended to engineer institutional readability; published artifacts become the contract baseline. |
| **Positioning dilution risk** | Adding too many surfaces or making the site too dense risks diluting the operational systems positioning into enterprise-consulting sludge. | Spec includes a positioning-immutability check on every new surface. Sections that do not strengthen operational positioning are rejected. |
| **Density-overload risk** | Adding diagrams + artifacts + new sections to existing pages can make the homepage too long. | Spec defines homepage evidence architecture explicitly — what lands on homepage, what defers to deeper pages. |
| **Mobile-cognition risk** | Diagrams that work on desktop may collapse poorly on mobile and lose their operational signal. | Spec includes mobile cognition rules per artifact class. |
| **Maintenance burden** | Artifacts (architecture diagrams, SLA samples) drift from runtime over time without a maintenance discipline. | Spec recommends governance: artifacts are version-stamped; periodic review is part of the engineering journal cycle. |
| **Engineering-resource cost** | Producing 6 system architecture diagrams + 5+ artifact previews + 1 lifecycle diagram is substantial. | Spec sequences artifacts by trust impact, not all-at-once. Implementation phase (Phase D? E?) can ship in waves. |
| **Anti-pattern leak via shadcn defaults** | Some shadcn primitives default to behaviors that conflict with anti-theater rules (e.g., decorative animations). | Spec lists primitive overrides required. Verification scripts enforce. |

### 10.2 Phase boundary risk

The directive specifies this is SPEC ONLY. Implementation is a later phase. Risk: spec is written, ratified, then implementation drifts from the spec because the implementation phase makes case-by-case calls under pressure. Mitigation:

- Spec must be specific enough to govern individual implementation decisions
- Spec must include a verification-criteria section so a script can enforce the structural rules (no decorative motion on evidence, no forbidden CSS classes, artifact file presence checks)
- Spec must include GO/NO-GO conditions so the implementation phase is gated on principal ratification

### 10.3 Positioning-protection risk

The strongest risk: the trust/evidence layer becomes so dominant it overshadows the operational-systems positioning. The site shifts from "operational systems company" to "enterprise vendor with operational evidence." This is a category drift.

Mitigation:
- Spec defines a positioning-immutability invariant (already standard in Raystrat phase specs)
- Spec keeps doctrinal layer (Tier 1) as the dominant surface; evidence (Tier 2-4) augments, never replaces

---

## 11. Surface Placement Recommendations (preview for spec)

| Surface | Trust/evidence load |
|---------|---------------------|
| Hero | None added. Hero remains positioning-only. |
| FailureThesis | One diagram (Choke Point map) added; doctrinal text preserved. |
| Services (homepage catalog) | Possibly one micro-diagram or schematic added; cards remain. |
| AgentAdvantage (Governance by Design) | Most-affected section. Each of the six governance properties receives a small artifact panel (audit-trail entry, SLA spec sketch, escalation matrix sketch, etc.). One section-level governance-layer diagram added. |
| Industries | Each industry card may carry a compliance-posture line + link to deeper artifact. |
| Results (audit CTA) | Audit deliverable cards expanded to include redacted preview thumbnails of Gap Map / Failure Mode Registry / Architecture Proposal. Engagement-lifecycle diagram added. |
| ByteOfTheWeek | No load added (remains thought-leadership). |
| FAQ | Possible: links from FAQ answers to operational artifacts where relevant. |
| Contact | No load added. |
| Footer | Institutional anchors added: documentation, compliance posture, principal accountability, continuity statement. |
| `/systems/[slug]` per-page | Highest evidence load. Each gets architecture diagram + handoff diagram + sample-artifact preview (audit trail / SLA / escalation matrix per system as appropriate). |
| `/systems` index | One overview diagram (six systems → operational lifecycle) added; cards remain. |
| `/bytes` and `/bytes/[slug]` | No load added. |
| New: `/principal` or `/about` | Optional — principal accountability page. Spec decides if it is required for v1 or deferred. |
| New: `/engagement` or `/audit` | Optional dedicated audit/engagement page if Results section is insufficient. Spec decides. |
| New: `/governance` or `/documentation` | Optional documentation surface. Spec decides if v1 includes a documentation entry-point. |

---

## 12. Open Questions for the Spec

The spec must resolve the following questions; this recon flags them but does not answer them:

| Question | Note |
|----------|------|
| Does the trust architecture include a `/principal` page or is principal accountability surfaced in the footer? | Procurement signals favor a dedicated page; positioning discipline may favor footer integration. |
| Does the trust architecture publish vertical-specific compliance posture artifacts (Fintech / Medical / Legal) or defer them to engagement-time disclosure? | Publishing increases procurement-readiness; not publishing protects against overclaim. |
| Are SLA templates published or shown as schematics only? | Publishing concrete SLAs creates contract baselines; schematic-only protects negotiation flexibility. |
| Is there a public documentation index for deployed systems or is documentation engagement-bound only? | Public documentation increases "we have built things" signal; engagement-bound documentation protects IP. |
| Does the engagement-model surface live in `results.tsx` (expanded) or as a separate `/engagement` page? | Recon recommends expansion of `results.tsx` first; new page if expansion proves insufficient. |
| Do industry-specific case studies appear as anonymized artifacts? | Without artifacts, "Fintech" / "Medical" / "Legal" verticals remain procurement-uncertain. With artifacts, anonymization-discipline becomes a spec concern. |
| Does the trust architecture introduce monospace numerals on operational artifact previews? | Spec §9.5 reserves monospace for system identifiers and audit-report numerals — trust artifacts are the natural home for this register. Likely yes. |
| Should the floating advisor surface ever produce structured operational artifacts in its output? | Could be Phase E feature — advisor returns a draft Gap Map for a buyer's described situation. Out of scope for trust architecture spec but flagged. |
| What is the canonical render path for diagrams — handcrafted SVG committed to repo, MDX-rendered React diagrams, or a hybrid? | Recon recommends handcrafted SVG (zero runtime cost, sharp, version-controlled). |

---

## 13. Scope Discipline (Spec is SPEC ONLY)

This recon documents trust-evidence opportunities and gaps. It does **not** authorize implementation.

The spec to be written will:
- Define doctrine for institutional trust, operational proof, evidence architecture, deployment cognition
- Identify required artifacts and their characteristics
- Forbid anti-patterns
- Define diagram philosophy and density rules
- Define procurement safety rules
- Define verification criteria
- Recommend GO/NO-GO conditions for principal ratification

The spec will **not**:
- Generate any SVG
- Write any TSX component
- Touch any production file
- Schedule implementation phases
- Bind the principal to any specific surface decision without ratification

Implementation, if approved, becomes a separate phase with its own recon, task graph, and verification script.

---

## 14. Recon Confidence

| Section | Confidence |
|---------|------------|
| Current trust-signal inventory | High — directly observed from code |
| Evidence gaps | High — directly observed absence |
| Procurement risk | Medium-High — based on standard enterprise procurement patterns; specific procurement officer perspective inferred not surveyed |
| Institutional perception gaps | High — observed against institutional register conventions |
| Operational proof opportunities | High — surfaces directly mappable |
| Governance cognition opportunities | High — repeated terminology with no visual support is directly observed |
| Diagram opportunity map | Medium — opportunity set is clear; final diagram count and surface placement defer to spec |
| Deployment cognition map | High — terminology gap is directly observed |
| Anti-pattern map | High — prior visual system spec (Phase A/B) already canonized motion anti-patterns; this recon extends to evidence-class anti-patterns |
| Implementation-risk analysis | Medium — risks enumerated but quantification deferred to implementation phase |

Recon is sufficient to author the trust-evidence architecture spec. Spec authoring proceeds.
