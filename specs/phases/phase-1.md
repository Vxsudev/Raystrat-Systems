# Phase 1 — Homepage Repositioning Spec
## Raystrat Systems: Operational Systems Company

**Status:** DRAFT — Pending Implementation  
**Authored:** 2026-05-21  
**Author:** Claude Sonnet 4.6 (recon-driven; directive from principal)  
**Output target:** Redesigned homepage and site positioning architecture  
**Invariant class:** POSITION-CRITICAL — no implementation without this spec ratified

---

## 1. Strategic Intent

Raystrat Systems is transitioning from a perceived AI agency to a recognized operational systems company.

The strategic objective is not rebranding. It is identity elevation.

The current homepage communicates what Raystrat deploys (agents). The target homepage communicates what Raystrat is (the infrastructure layer that prevents operational breakdown in businesses).

This transition is urgent because:
- The AI agency category is commoditizing. Thousands of vendors offer "agents."
- Operational systems companies are rare, recognized as durable, and command significantly higher trust and price authority.
- Raystrat already has the substance of this identity in its delivery model. The public surface has not caught up.

The spec governs a surface repositioning. No new products are created. No services are removed. The delivery model does not change. What changes is the frame through which prospects encounter and interpret Raystrat.

---

## 2. Positioning Shift

**From:**  
Raystrat offers AI agents that automate your five business functions.

**To:**  
Raystrat engineers operational systems that govern execution, prevent failure, and stabilize the critical functions of your business.

**The mechanism:**  
The agents are not demoted. They become the *delivery layer* of a higher-order identity. An agent is the instrument. The operational system is the product. The failure prevention is the value.

**Category being vacated:**  
AI automation agency / chatbot shop / no-code workflow vendor

**Category being entered:**  
Operational systems engineering / governed execution infrastructure / business reliability architecture

---

## 3. Category Definition

Raystrat operates in the category of **operational systems engineering**.

This category is defined by:

- Building systems that govern how a business executes, not just how it communicates
- Owning the reliability and discipline of core operational functions
- Delivering durable infrastructure rather than temporary tooling
- Treating orchestration and governance as primary concerns, not afterthoughts

Companies in this category are trusted with:
- Ongoing operational state (not one-time deployment)
- Failure prevention (not just speed improvement)
- Audit accountability (not just output volume)
- Cross-function orchestration (not single-task execution)

This category has few occupants at the SMB and mid-market level. The enterprise segment has SAP, ServiceNow, and Pega. The mid-market has no clear operational systems authority. Raystrat's window is the governed execution layer below enterprise complexity.

---

## 4. Business Identity Definition

**Raystrat Systems is an operational systems company.**

It engineers the systems that govern how businesses execute. Its products are not features or automations. They are operational infrastructure — governed, auditable, and designed to run indefinitely.

**Raystrat's role is not to add a tool. It is to install an execution layer that becomes load-bearing.**

This identity has three components:

1. **Systems engineering:** Raystrat designs, deploys, and maintains execution systems. Not scripts. Not workflows. Systems.

2. **Operational governance:** Every system deployed by Raystrat includes discipline enforcement (audit trails, SLA definitions, escalation logic). The governance layer is not optional.

3. **Failure prevention:** The explicit value proposition is not speed — it is the absence of breakdown. A business with Raystrat systems does not lose leads because no one followed up. It does not have support gaps at 2 AM. It does not run operations on memory and good intentions.

---

## 5. Target Perception

When a qualified prospect encounters the Raystrat homepage, the target perceptions are:

1. **"This company is serious."** — Not a startup pitch. Not a demo-first flow. The surface signals operational authority.

2. **"They understand failure, not just optimization."** — The entry frame is breakdown prevention, not efficiency gain.

3. **"This isn't a tool vendor."** — The company engineers systems and takes ongoing responsibility for execution outcomes.

4. **"My business has operational exposure I haven't addressed."** — The site makes visible what is currently invisible: the structural gaps where breakdown enters.

5. **"I need to understand what they'd build for me."** — The site earns curiosity about specific application, not just surface-level features.

**Anti-target perceptions to eliminate:**
- "Oh, another AI chatbot company."
- "I wonder if they're cheaper than [competitor]."
- "This feels like it would be one of five things I'm testing."

---

## 6. Failure Thesis

The homepage must be grounded in a Failure Thesis — the claim that operational breakdown is not a risk but a certainty for businesses that operate without governed systems.

**The thesis:**

Every business has five operational choke points: demand acquisition, pursuit, support, execution, and command intelligence. These systems fail silently. They fail on reliance — human discipline, manual follow-through, and good intentions. When they fail, the loss is not always visible: a lead that went cold, a follow-up that never happened, a support ticket that eroded trust, an invoice that slipped, a decision made without data.

The aggregate cost of these silent failures is structural. It is not an efficiency gap. It is the organization's inability to scale without adding headcount, or to operate without key personnel.

**Raystrat's answer to the Failure Thesis:**

Operational systems replace reliance with governance. When a system runs the function — not a person's memory — the function executes reliably, scales without friction, and produces auditable evidence of its operation. The failures stop not because the people improved, but because the system no longer depends on them.

**Why the Failure Thesis matters for the homepage:**

The prospect's first encounter should not be with what Raystrat sells. It should be with the problem they are currently not naming. When the homepage names the failure before offering the solution, it establishes that Raystrat understands operational reality — which is the prerequisite for trust in any systems engagement.

---

## 7. Information Architecture

### Top-Level Routes (target state)

```
raystratsystems.com/            → Homepage (control surface)
raystratsystems.com/systems/    → Operational systems catalogue (replaces /services/)
raystratsystems.com/systems/[slug]  → Individual system pages (replaces /services/[slug])
raystratsystems.com/industries/ → Industry application pages (optional expansion)
raystratsystems.com/bytes/      → Editorial (retain as-is)
raystratsystems.com/contact/    → Engagement entry point (currently inline #contact)
```

### App Domain (unchanged)
```
app.raystratsystems.com/        → Auth gate / dashboard (unchanged)
```

### Navigation (target state)
```
[Logo]  Systems  Bytes  [Book Operational Audit]
```

Removed from primary nav: Results (merged into hero or systems), FAQ (collapsed into footer or contact), Industries (demoted to systems context or separate page).

**Nav design principle:** The navigation expresses what Raystrat does (Systems) and what a prospect should do next (Book Operational Audit). Nothing else needs to be in primary navigation.

---

## 8. Homepage Narrative Flow

The homepage is not a features page. It is a claim sequence — a series of progressively specific statements that take the prospect from recognition of a general problem to confidence in a specific solution provider.

**Target narrative arc:**

```
1. IDENTIFICATION — Name the failure the prospect already lives with
      ↓
2. DIAGNOSIS — Name why the failure persists (structural, not behavioral)
      ↓
3. AUTHORITY — Establish that Raystrat is an engineering firm, not a vendor
      ↓
4. SYSTEMS — Show the specific operational systems (not features, not tools)
      ↓
5. EVIDENCE — Demonstrate the governance layer (audit, SLA, reliability)
      ↓
6. SCOPE — Show where Raystrat's systems apply (industries/contexts)
      ↓
7. ENGAGEMENT — Define the correct first step (audit, not demo, not trial)
```

**Each section of the homepage corresponds to one node in this arc.** No section should appear on the page without a clear function within the arc. Sections that exist for visual variety without narrative function are to be removed or consolidated.

---

## 9. Homepage Section Hierarchy

Listed in render order (top to bottom):

### Section 1 — HERO
**Arc function:** Identification + Authority claim  
**Core message:** "We build systems that prevent operational breakdown."  
**Subtext (target):** Something that names the structural failure pattern, not the product. Candidate: "Businesses don't fail because people are bad. They fail because the systems that should run these functions don't exist."  
**CTA:** Single, specific — "Book Operational Audit" (not "See the Agents," not "Get Started")  
**What to remove:** The rotating DynamicHeadline (it signals uncertainty; authority doesn't rotate between options). The agent-first framing.

### Section 2 — FAILURE THESIS
**Arc function:** Diagnosis  
**Core message:** Name the five choke points and their failure mode explicitly.  
**Form:** Not a bullet grid. A structured prose block or two-column problem / structural-cause layout. The failure should feel inevitable, not hypothetical.  
**What it is not:** A features list. A statistics block. A promise of ROI.

### Section 3 — SYSTEMS CATALOGUE (formerly Services)
**Arc function:** Systems  
**Core message:** "Here are the operational systems we engineer."  
**Frame change:** Each system is introduced as a governed execution layer, not as an agent. The agent is the delivery mechanism.  
- "Demand Acquisition System" (was: Leads Hunter Agent)
- "Pursuit Continuity System" (was: Follow-Up Agent)
- "Frontline Resolution System" (was: Support Agent)
- "Execution Backbone System" (was: Operations Agent)
- "Command Intelligence System" (was: Data Command Agent)
- "Custom Operational System" (was: Custom AI Agent)

**Note:** The renaming is a vocabulary shift, not a product change. The underlying delivery does not change. The system names may be refined during implementation — what matters is the category frame, not the specific nouns.

**CTA per card:** "Explore this system" → links to `/systems/[slug]`

### Section 4 — GOVERNANCE LAYER
**Arc function:** Evidence / Trust  
**Core message:** "Every system Raystrat deploys includes governance by design — audit trails, SLA accountability, escalation logic, and compliance controls."  
**Form:** Feature-statement layout, not a list of benefits. This section distinguishes Raystrat from automation vendors. Governance is what makes a deployed system infrastructure rather than a script.  
**What it replaces:** AgentAdvantage section ("Total Discipline," "Asymmetric Leverage," etc.) — these are valid points but framed as agent selling, not systems authority. The new section reframes these facts as governance architecture.

### Section 5 — OPERATIONAL CONTEXTS (formerly Industries)
**Arc function:** Scope  
**Core message:** "These systems operate across regulated industries, complex cross-team workflows, and high-accountability environments."  
**Frame change:** Not "agents for every vertical." Contexts where operational governance matters most.  
**Retained verticals:** Fintech, Legal, Healthcare (highest governance relevance). Retail, Hospitality, Education can be demoted to secondary pages.  
**Form:** 3-column or horizontal scroll — concise, not card-heavy.

### Section 6 — ENGAGEMENT ENTRY (formerly Results / CTA)
**Arc function:** Engagement  
**Core message:** "The correct first step is an operational audit, not a demo."  
**Frame:** Position the audit as a professional engagement — not a free trial, not a sales call. An operational audit is the thing an engineering firm does before proposing a system design.  
**Form:** Full-width block, dark or contrasting background. Single CTA. Brief explanation of what the audit is and what it produces.  
**CTA:** "Book an Operational Audit" — with a one-sentence explanation: "We assess your five choke points, identify the failure modes, and propose the specific systems to govern them."

### Section 7 — ByteOfTheWeek (retained)
**Arc function:** Editorial authority / return signal  
**No repositioning needed.** The Byte format already demonstrates systems thinking. Retain as-is.

### Section 8 — FAQ (repositioned)
**Arc function:** Objection resolution  
**Frame change:** FAQ questions should be about systems engagement, not "will this work for me?" questions. Target questions:
- "What does an operational audit involve?"
- "How is this different from hiring an automation consultant?"
- "What does governance mean in practice?"
- "How does SLA accountability work?"
- "What is the implementation timeline for a complete system?"  
**What to remove:** "ROI within 1–4 weeks" — this is vendor-pitch language. Replace with operational commitment language.

### Footer (retained, minimal changes)
Current structure is adequate. Navigation links should reflect the updated route structure.

---

## 10. Control Surface Principles

The homepage is the public-facing control surface of the business. As such:

1. **Authority is not claimed — it is demonstrated.** The page earns authority by naming the problem precisely, structuring the solution architecturally, and defining the engagement professionally. No "world-class" claims. No hyperbole.

2. **Density is a feature.** An operational systems company does not need to simplify its message for fear of overwhelming prospects. The target prospect is an operator who makes systems decisions. They can read.

3. **The CTA is singular and specific.** Every section of the page either directs toward the audit CTA or does not have a CTA. There are no secondary CTAs competing with the primary conversion goal.

4. **Scroll structure enforces the arc.** The narrative arc is enforced by section order. A prospect who reads the page in order arrives at the engagement section having been identified (failure thesis), diagnosed (structural cause), convinced (systems catalogue), and verified (governance layer). The conversion should feel earned, not pushed.

5. **Tone is controlled, not enthusiastic.** Systems authority is communicated through precision and structure. Exclamation points, "amazing results," and urgency-injection are prohibited. The page should read like an architecture brief, not a sales pitch.

---

## 11. Route Restructuring Plan

### Required Route Changes

| Current route | Target route | Action |
|---|---|---|
| `/services/` | `/systems/` | Create new route (or redirect) |
| `/services/[slug]` | `/systems/[slug]` | Create new route (or redirect) |
| `/services/leads-hunter-agent` | `/systems/demand-acquisition` | Redirect + rename |
| `/services/follow-up-agent` | `/systems/pursuit-continuity` | Redirect + rename |
| `/services/support-agent` | `/systems/frontline-resolution` | Redirect + rename |
| `/services/operations-agent` | `/systems/execution-backbone` | Redirect + rename |
| `/services/data-command-agent` | `/systems/command-intelligence` | Redirect + rename |
| `/services/custom-ai-agent` | `/systems/custom-operational` | Redirect + rename |

### Redirect Policy

All `/services/*` URLs must redirect (301) to their `/systems/*` equivalents. The old URLs must remain functional for existing links, shares, and any indexed content. No link rot.

### Navigation Update

Primary nav changes from `[Services, Results, Bytes, FAQ]` to `[Systems, Bytes]` + primary CTA `[Book Operational Audit]`.

Results and FAQ content do not disappear — they are absorbed into other sections or moved to the footer.

### Implementation constraint

Route restructuring is non-trivial in Next.js App Router when using `[slug]` dynamic routes. The implementation must account for:
- Updating `src/data/content.ts` slug values
- Creating the `src/app/systems/` route tree
- Adding 301 redirects in `next.config.js`
- Updating all internal hrefs (navigation, section CTAs, service-suggester output)

---

## 12. Existing Surface Retention Plan

The following surfaces survive the repositioning unchanged or minimally changed:

| Surface | Status | Rationale |
|---|---|---|
| `src/ai/flows/` | UNCHANGED | Server-side AI logic is positioning-agnostic |
| `src/app/dashboard/` | UNCHANGED | App domain, separate from marketing surface |
| `src/app/bytes/` | UNCHANGED | Editorial authority surface, already aligned |
| `src/components/sections/byte-of-the-week.tsx` | UNCHANGED | Retain as-is |
| `src/data/content.ts` → `bytes` export | UNCHANGED | Editorial content is positioning-agnostic |
| `src/data/content.ts` → `faq` export | MODIFY | FAQ questions repositioned; structure retained |
| `src/app/api/` routes | UNCHANGED | Backend surface |
| `functions/` | UNCHANGED | Firebase Functions, unrelated to positioning |
| Firebase Hosting config | UNCHANGED | Infrastructure, not positioning |

The following surfaces require modification or replacement:

| Surface | Status | Change |
|---|---|---|
| `src/data/content.ts` → `services` export | MODIFY | Slugs, titles, subheads, pageContent framing |
| `src/data/content.ts` → `results` export | MODIFY OR REMOVE | Reframe as governance evidence, not "Cut the Fat" |
| `src/data/content.ts` → `navigationLinks` | MODIFY | Reflect new nav structure |
| `src/components/sections/hero.tsx` | REPLACE | New hero narrative and CTA |
| `src/components/sections/agent-advantage.tsx` | REPLACE | New governance layer section |
| `src/components/sections/industries.tsx` | MODIFY | Reframe; reduce to 3 primary verticals |
| `src/components/sections/results.tsx` | REPLACE OR MODIFY | Reframe or absorb into governance section |
| `src/components/sections/services.tsx` | RENAME + MODIFY | Becomes systems catalogue |
| `src/app/services/[slug]/` | REPLACE | Becomes `src/app/systems/[slug]/` |

---

## 13. Service/Agent Demotion Strategy

The six agents are not removed. They are repositioned within the site hierarchy.

**Current position:** Primary surface (Services section at position 2 on homepage, direct nav link)  
**Target position:** Secondary surface (Systems section at position 3 on homepage, behind the Failure Thesis)

**What changes:**
- The hero does not lead with agents. It leads with the operational problem.
- The systems catalogue presents systems with governance framing, not agent capability framing.
- Individual system pages (`/systems/[slug]`) explain the governance architecture, SLA accountability, and operational outcome — with the agent as the delivery mechanism, not the headline.
- The word "agent" is not the primary noun in system descriptions. Systems have agents. Systems are the product.

**What does not change:**
- The six systems remain the same six delivery surfaces.
- The Custom AI Agent / Custom Operational System offering remains the premium tier.
- SLA exclusivity remains a product differentiator.

**Vocabulary transition table (for copywriting reference):**

| Old language | New language |
|---|---|
| "AI agent" | "operational system" |
| "automation" | "governed execution" |
| "deploy an agent" | "install a system" |
| "the agent runs" | "the system governs" |
| "replaces headcount" | "removes dependency" |
| "ROI in 1–4 weeks" | "measurable operational outcomes" |
| "tool" | "infrastructure" |
| "five systems" | "five operational choke points" |

---

## 14. Messaging Principles

1. **Name the failure before offering the solution.** The prospect's problem is visible to them before Raystrat is. Lead with what they already know.

2. **Precision over aspiration.** "Audit trails for every task executed" is more authoritative than "total accountability." Specific beats general.

3. **Infrastructure frame.** Raystrat installs. It does not offer. Installation implies permanence, accountability, and engineering judgment.

4. **Governance is the differentiator.** Most automation vendors sell output. Raystrat sells governed output — execution that is auditable, failure-resistant, and SLA-accountable. Governance language should appear early and consistently.

5. **The business is the subject, not the technology.** "Your invoicing runs without human intervention" is stronger than "Our Operations Agent automates invoicing." The prospect wants to know what happens to their business, not what the product does.

6. **Scarcity is structural, not artificial.** Raystrat does not create urgency by limiting supply. The urgency comes from the ongoing cost of the unaddressed failure: every month without a governed demand system is a month of leads leaking.

7. **The audit is the first move.** The conversion goal is not "sign up" or "start trial." It is "book an operational audit." This is the professional first step in a systems engagement. It reframes the sale as an engineering engagement.

---

## 15. Visual Direction Principles

*(This section governs visual intent, not implementation. Implementation will follow a separate visual spec.)*

1. **Structured density over airy minimalism.** The current dotted-pattern background and spacious layout signal "startup landing page." The target visual register is closer to architecture documentation — purposeful density, clear hierarchy, deliberate use of whitespace as structure rather than decoration.

2. **Typography as authority.** The headline font (currently `font-headline`) should carry weight and precision. Avoid typefaces that read as "tech startup." Engineering firms use type that signals permanence.

3. **Color palette: signal over decoration.** The current primary/muted-foreground system is adequate. The priority is ensuring that color is used to signal hierarchy (primary action, secondary information, tertiary context) rather than to create visual interest.

4. **The hero is not a hero image.** No background illustration, no gradient mesh, no floating icons. The hero is a claim. The claim should be readable and dominant. Everything else is subordinate.

5. **Section transitions signal architecture, not creativity.** Alternating backgrounds (`bg-card`, `bg-background`) that currently serve to visually separate sections are adequate. The priority is that section boundaries are clean and hierarchically obvious, not that they're visually striking.

6. **No stock imagery.** Operational systems companies do not use stock photos of people in meetings. If imagery is used, it should be structural — diagrams, system maps, or abstract architectural representations.

---

## 16. Trust Signaling Strategy

**Primary trust signals (architectural):**

1. **Governance language itself.** The use of words like "audit trail," "SLA accountability," "escalation protocol," and "compliance controls" signals that Raystrat operates at a level of operational maturity that automation vendors do not.

2. **The operational audit offer.** Offering an audit before proposing a system signals engineering rigor. It says: we assess before we build.

3. **SLA exclusivity.** The competitor-blackout SLA (currently in Custom AI Agent) is a significant trust signal when surfaced at the right level. It signals that Raystrat treats its deployments as strategic infrastructure, not commodities.

**Secondary trust signals (evidential):**

4. **System specificity.** The six named systems, with defined governance parameters and escalation logic, are more trustworthy than generic "we automate things." Specificity is evidence of capability.

5. **Industry presence in regulated sectors.** Fintech, Legal, and Healthcare are high-governance verticals. Being positioned as operational infrastructure for these sectors signals that Raystrat's systems meet compliance requirements — without needing to make a compliance claim.

**What to avoid:**

- Testimonial placeholders or generic social proof claims without real substance
- "Trusted by X businesses" unless the number is specific and defensible
- Logo walls without context (logos without stated engagement are theater)
- Star ratings or review aggregators (signals B2C commodity, not B2B systems)

---

## 17. Conversion Strategy

**Primary conversion goal:** Book an Operational Audit

**Secondary conversion goal:** Subscribe to Bytes (editorial — return engagement, not immediate commercial)

**The audit as conversion architecture:**

The "Book Operational Audit" CTA is not a demo request form renamed. It is a positioned engagement:

1. **What it is:** A structured assessment of the prospect's five operational choke points. Raystrat identifies which systems are absent, which are running on fragile dependencies, and which failure modes are currently active.

2. **What it produces:** A one-page operational gap map and a proposed system architecture. This is the deliverable of the audit.

3. **Why it works as a conversion vehicle:** It reframes the first interaction from "evaluate Raystrat's product" to "get your operations evaluated by Raystrat." The prospect comes to receive value, not to evaluate a vendor. This is the systems-engagement posture.

4. **Placement:** Hero CTA, Engagement section CTA, and one reference in the nav. Not in every section.

**What not to do:**

- Do not add a pricing CTA ("Get Started" or "Start Free Trial") — this signals SaaS, not systems engineering
- Do not add a "schedule a demo" CTA — demos are for product vendors, not operational architects
- Do not add multiple competing CTAs — singular conversion pressure produces better results

---

## 18. Operational Language Rules

The following rules govern all copy produced for this repositioning. They apply to headlines, subtext, card descriptions, CTA labels, and FAQ answers.

**USE:**
- System / operational system / governed execution
- Install / deploy / engineer / architect
- Failure mode / operational gap / breakdown point
- Audit / assessment / engagement
- Governance / accountability / audit trail / SLA
- Operational choke point / critical function
- Infrastructure / operational layer / execution backbone
- Reliability / discipline / consistency
- Orchestration / coordination / handoff logic

**AVOID:**
- Agent (as primary noun for the product; acceptable as technical term in documentation)
- Automation / automate (positions Raystrat in the low-end automation category)
- Workflow (implies tool-level; systems govern more than workflows)
- Chatbot (never)
- AI-powered (never; every vendor claims this)
- Digital transformation (never)
- Game-changer / innovative / cutting-edge (never)
- ROI within weeks / rapid ROI (sounds like a pitch, not an engineering commitment)
- "Never miss a lead" (sounds like a sales email subject line)
- "Scale without limits" (startup language)
- Smart (as adjective for anything)

**NEUTRAL / CONTEXTUAL:**
- "AI" — acceptable in technical context, not as a positioning claim
- "Agent" — acceptable in `/systems/[slug]` pages as the delivery mechanism description; not acceptable as the category noun on the homepage

---

## 19. Anti-Patterns / Forbidden Directions

These directions are explicitly prohibited. They are named here because they may appear "safe" or "incremental" during implementation.

1. **Agents-first with new words.** Renaming "agents" to "systems" while keeping the same hero copy, card layout, and narrative order is not repositioning. It is cosmetic. The arc must change.

2. **Adding a "why us" section.** "Why Raystrat" sections signal defensiveness. Systems authority does not need to explain why it's better than alternatives. It names the problem and presents the architecture.

3. **Testimonial theater.** Fake testimonials, generic quotes, or social proof without specifics erode trust in a systems context. If no real testimonials are available, omit the section entirely.

4. **Stats as hero content.** "2–5× reply rate uplift" and "56 hours saved monthly" are evidence, not claims. They belong inside the systems catalogue or a case study, not in the hero or as primary section anchors.

5. **CTA proliferation.** "Book a Call," "See Pricing," "Start for Free," "Get a Demo," and "Contact Sales" on the same page signal that the company does not know its own conversion motion. One CTA. One path.

6. **Positioning the audit as free.** The operational audit is a professional engagement. It may or may not be free — that is a business decision. But it should not be positioned as "free audit" because "free" signals low-stakes lead generation, not systems engagement.

7. **Industry-first structure.** Leading with "we serve Fintech, Legal, and Healthcare" before establishing what kind of company Raystrat is produces category confusion. Industries are evidence of scope, not identity.

8. **Velocity language.** "2-week deployment," "fast onboarding," "quick wins" — these are positioned against the wrong competitive frame. Speed is not the differentiator. Governance is.

---

## 20. Architectural Risks

The following risks are architectural — they affect the soundness of the repositioning and must be resolved before or during implementation.

**RISK-1: Vocabulary ambiguity in AI flow system prompts**

`src/ai/flows/contextual-assistant.ts` has a system prompt that introduces Raystrat using the current agent-first language. If the site repositions externally but the AI assistant continues to describe Raystrat as an "agent service," the inconsistency will be visible to any prospect who interacts with the floating assistant.

*Resolution required:* Update the Genkit system prompts in `src/ai/flows/contextual-assistant.ts` and `src/ai/flows/service-suggester.ts` to reflect the repositioned vocabulary. This must be coordinated with the homepage rewrite.

**RISK-2: Slug/route breaking existing links**

Renaming `/services/[slug]` to `/systems/[slug]` without proper 301 redirects will break:
- Any shared URLs
- Any indexed pages
- Any internal hrefs in current components

*Resolution required:* Implement redirects in `next.config.js` before removing old routes. Audit all `href` references in `src/` before route deletion.

**RISK-3: Content.ts is a single monolith**

All service copy, results data, and FAQ content lives in `src/data/content.ts`. A full repositioning requires modifying this file substantially. The current TypeScript type for `services` is tightly coupled to the current data shape (slug, title, subhead, bullets, pageContent, etc.).

If new system page shapes require different fields (e.g., "governance features," "SLA tier," "failure mode addressed"), the type definition must be extended without breaking existing components that consume it.

*Resolution required:* Plan the `content.ts` type extension before writing new copy. Do not break existing component consumption patterns.

**RISK-4: The DynamicHeadline component**

The Hero section currently uses `DynamicHeadline` — a rotating component that cycles through phrases. This component embeds positioning in JavaScript logic. If it remains, it will cycle through old agent-forward language after the repositioning. It must be replaced or updated.

*Resolution required:* Either replace with a static headline or update the rotation content. The new hero is likely better served by a single, static, high-authority claim.

**RISK-5: Genkit flows reference six specific service slugs**

`src/ai/flows/service-suggester.ts` and `src/ai/flows/notes-analyzer.ts` likely reference the six current agent slugs in their output logic. If slugs change during the `/services/` → `/systems/` route transition, the AI-generated CTAs may link to 404s.

*Resolution required:* Audit flow output logic against the new slug set before launching new routes.

---

## 21. Future Expansion Surfaces

These surfaces are not in scope for Phase 1 but should be designed with them in mind.

1. **Case Studies (`/cases/[slug]`)** — Operational systems command more trust when evidenced by specific client outcomes with named failure modes, governance systems deployed, and measurable outcomes. Case studies are the natural next surface after positioning is established.

2. **Operational Audit standalone page (`/audit/`)** — As the audit CTA becomes the primary conversion vehicle, a dedicated page explaining the audit process, what it produces, and what happens next becomes valuable. This is not a form — it is a process explanation.

3. **Systems documentation (`/systems/[slug]/governance/`)** — A governance reference layer for each deployed system: SLA definitions, escalation protocol, audit parameters. Accessible post-engagement or as a trust signal pre-engagement.

4. **Industry pages (`/industries/[slug]`)** — Full pages per industry context (Fintech, Legal, Healthcare) explaining the operational failure modes specific to that sector and the governance systems that address them. Currently the industry grid is inline; these become standalone authority pages.

5. **Engineering journal (`/journal/`)** — A public-facing subset of the engineering journal — architectural decisions, system deployment notes, operational learnings. This is the technical credibility surface for engineering-oriented prospects.

---

## 22. Verification Criteria

Phase 1 is complete when all of the following criteria are satisfied:

**Positioning verification:**
- [ ] Hero leads with operational failure framing, not agent-product framing
- [ ] The word "agent" does not appear in H1 or H2 copy on the homepage
- [ ] "Operational system" or equivalent is used as the primary noun for Raystrat's products in the homepage
- [ ] The primary CTA is "Book Operational Audit" (or equivalent) — not "See the Agents," "Get Started," or "Schedule a Demo"
- [ ] No stats appear as hero content
- [ ] No "AI-powered" language in homepage copy
- [ ] FAQ questions reflect systems-engagement framing (not "will this work for me?" vendor evaluation)

**Architectural verification:**
- [ ] `/services/[slug]` URLs return 301 redirects to `/systems/[slug]`
- [ ] All internal hrefs updated to `/systems/` paths
- [ ] `src/ai/flows/contextual-assistant.ts` system prompt uses repositioned vocabulary
- [ ] `src/ai/flows/service-suggester.ts` output CTAs link to `/systems/` paths
- [ ] `DynamicHeadline` component replaced or updated with repositioned content
- [ ] `src/data/content.ts` service slugs updated to match new route structure

**Build verification:**
- [ ] `npm run typecheck` passes with zero new errors introduced by repositioning
- [ ] `npm run build` passes (or pre-existing errors are isolated and documented)
- [ ] INV-001 (marketing domain isolation) continues to pass
- [ ] INV-002 (no client-side secrets) continues to pass
- [ ] INV-003 (Genkit server boundary) continues to pass

**Narrative arc verification (manual):**
- [ ] Reading the homepage top-to-bottom, a prospect encounters: failure identification → structural diagnosis → systems catalogue → governance evidence → scope → engagement entry
- [ ] No section exists without a clear function in the narrative arc
- [ ] The page reads as an architecture brief, not a sales pitch

---

## 23. GO / NO-GO Conditions

### GO — Proceed to implementation when:

1. This spec has been reviewed and ratified by the principal (no implementation before ratification)
2. The route restructuring plan has been reviewed for completeness (all redirect paths mapped)
3. A decision has been made on system naming (are "Demand Acquisition System" etc. the final names, or placeholders for implementation?)
4. The `content.ts` type extension plan is agreed upon before writing new copy
5. The Genkit flow system prompt updates are scoped into the implementation plan (not treated as a separate cleanup)

### NO-GO — Do not proceed if:

1. The spec is treated as a visual redesign only (copy stays, layout changes). The copy is the repositioning.
2. The agents are renamed but their position in the narrative arc is not changed (hero leads with agents → repositioning is cosmetic, not structural).
3. The CTA is changed to "Book Operational Audit" but the page still has multiple competing CTAs.
4. Route restructuring is deferred as a "next phase." The routes and the copy must change together. Old routes with new positioning, or new routes with old positioning, produce a broken experience.
5. The Genkit AI assistant is not updated alongside the homepage. A page that says "operational systems company" with an AI assistant that says "I'm here to help you find the right agent" is incoherent.

---

*End of spec. Status: DRAFT — Pending principal review and ratification.*  
*Next step upon ratification: `writing-plans` → implementation task graph.*
