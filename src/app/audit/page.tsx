import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { FailureModeRegistryPreview } from '@/components/diagrams/failure-mode-registry-preview';
import { DeploymentLifecycleDiagram } from '@/components/diagrams/deployment-lifecycle-diagram';

export const metadata: Metadata = {
  title: 'Operational Audit | Raystrat Systems',
  description:
    'Operational audit — the structured engagement that begins every Raystrat deployment. Gap map, failure mode registry, architecture proposal.',
};

const reviewSurfaces: { surface: string; examined: string }[] = [
  {
    surface: 'Intake',
    examined:
      'Signal qualification reliability; source attribution; pipeline data lineage.',
  },
  {
    surface: 'Pursuit',
    examined:
      'Follow-through completeness; terminal-state ownership; cold-lead drop-off; escalation gaps.',
  },
  {
    surface: 'Support',
    examined:
      'First-contact resolution; SLA accountability; escalation routing; handoff continuity.',
  },
  {
    surface: 'Operations',
    examined:
      'Process execution reliability; exception routing; manual-intervention dependencies.',
  },
  {
    surface: 'Visibility',
    examined:
      'Operational state observability; data freshness; reporting reliability.',
  },
  {
    surface: 'Governance Layer',
    examined:
      'Audit trail completeness; SLA enforcement structure; failure-mode containment; continuity disposition.',
  },
];

const deliverables: { name: string; purpose: string; format: string }[] = [
  {
    name: 'Operational Gap Map',
    purpose:
      'A structured map of the five operational choke points against current state. Each function is classified as Governed, Partially Governed, or Reliance-Dependent.',
    format:
      'Documentary table. Choke point · current state classification · priority class · indicative failure mode.',
  },
  {
    name: 'Failure Mode Registry',
    purpose:
      'A catalog of failure modes identified during the audit, each bound to a containment strategy and the governance signal that closes it.',
    format:
      'Spec-document register. Failure mode ID · description · trigger conditions · current containment · proposed containment · audit signal.',
  },
  {
    name: 'System Architecture Proposal',
    purpose:
      'A proposed governance system design, scoped to the operational profile observed during the audit.',
    format:
      'Architecture document. Scope · system boundaries · governance properties · escalation structure · audit-trail format.',
  },
];

const governanceProperties: { property: string; description: string }[] = [
  {
    property: 'Audit Trail',
    description:
      'Every action executed by a deployed system is captured with timestamp, action, outcome, and actor. The audit trail is structural to the runtime, not an add-on.',
  },
  {
    property: 'Escalation Logic',
    description:
      'Exceptions are routed, not dropped. Tier 1 exceptions resolve in governed fallback paths; Tier 2 routes to designated reviewers with full context; Tier 3 surfaces to engagement-owner principal.',
  },
  {
    property: 'SLA Accountability',
    description:
      'Performance targets are specified at deployment. The system measures against thresholds, annotates the SLA clock on breach risk, and triggers escalation when targets are exceeded.',
  },
  {
    property: 'Continuity Doctrine',
    description:
      'Continuity is a structural property, reviewed on a defined cadence as part of the engagement. Configuration changes pass through a governed change cycle.',
  },
];

const clientScope: string[] = [
  'Business authority over the operational function.',
  'Approval authority over governance rules and escalation policy.',
  'Operational accountability for decisions made within human-review zones.',
];

const raystratScope: string[] = [
  'System structure — the architecture under which the function runs.',
  'Runtime enforcement — the governance layer that executes at deployment.',
  'Escalation logic — the routing and context-pass when exceptions surface.',
  'Continuity architecture — the governed change cycle and review cadence.',
];

export default function AuditPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* SECTION 1 — HEADER */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Engagement Surface
              </p>
              <h1 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl lg:text-5xl">
                Operational Audit
              </h1>
              <p className="mt-6 text-lg text-foreground/80 leading-relaxed md:text-xl">
                The first engagement with Raystrat is a structured operational audit. It examines how the five
                operational surfaces of the business are currently executed, identifies the failure modes
                emerging from fragmented execution, and produces the architectural reference for a governed
                deployment.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Principal-led. Documentary. Not a demo. Not a trial.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — WHY THE AUDIT EXISTS */}
        <section className="py-16 md:py-24 border-t border-border bg-secondary">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Why the audit exists
              </p>
              <h2 className="text-2xl font-headline font-bold tracking-tight md:text-3xl">
                Operational failures emerge from fragmented execution surfaces
              </h2>
              <div className="mt-6 space-y-5 text-base text-foreground/80 leading-relaxed">
                <p>
                  When intake, pursuit, support, operations, and visibility are run as separate tools
                  stitched by individual discipline, failure modes appear at the seams. Signals are missed
                  at intake. Leads stall in pursuit. Support cases lose their handoff context. Operations
                  exceptions accumulate. Reporting drifts from the underlying state.
                </p>
                <p>
                  The audit examines each surface as an operational system, not as a tool stack. It
                  surfaces the gaps where reliance on individual discipline is doing the work that a
                  governance layer should be doing.
                </p>
                <p>
                  Architecture proposals are written against what the audit observes — not against a
                  generic playbook.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — WHAT IS REVIEWED */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Scope
              </p>
              <h2 className="text-2xl font-headline font-bold tracking-tight md:text-3xl">
                What the audit reviews
              </h2>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed">
                Six operational surfaces are examined. Each is reviewed against the governance properties
                that distinguish a governed function from one running on individual discipline.
              </p>

              <div className="mt-10 border border-border bg-background overflow-hidden rounded-md">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 font-semibold text-xs tracking-widest uppercase text-muted-foreground border-b border-border w-1/3"
                      >
                        Operational Surface
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 font-semibold text-xs tracking-widest uppercase text-muted-foreground border-b border-border"
                      >
                        What the audit examines
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {reviewSurfaces.map((row) => (
                      <tr key={row.surface}>
                        <td className="px-5 py-4 align-top font-semibold font-headline text-foreground">
                          {row.surface}
                        </td>
                        <td className="px-5 py-4 align-top text-foreground/80">
                          {row.examined}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — DELIVERABLES */}
        <section className="py-16 md:py-24 border-t border-border bg-secondary">
          <div className="container">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Audit Deliverables
              </p>
              <h2 className="text-2xl font-headline font-bold tracking-tight md:text-3xl">
                Three artifacts are produced
              </h2>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed">
                Each engagement produces three documentary artifacts. The artifact set becomes the
                reference for the architecture proposal and, if the engagement continues, the governance
                specification at deployment.
              </p>

              <div className="mt-10 space-y-6">
                {deliverables.map((item, idx) => (
                  <article
                    key={item.name}
                    className="bg-background border border-border rounded-md p-6 md:p-8"
                  >
                    <p className="font-mono text-xs text-muted-foreground mb-2">
                      Deliverable 0{idx + 1}
                    </p>
                    <h3 className="text-lg font-semibold font-headline text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                      {item.purpose}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold tracking-widest uppercase">Format · </span>
                      {item.format}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-12 max-w-5xl">
                <FailureModeRegistryPreview />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — ENGAGEMENT LIFECYCLE */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Engagement Lifecycle
              </p>
              <h2 className="text-2xl font-headline font-bold tracking-tight md:text-3xl">
                What happens after the audit
              </h2>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed">
                The audit is the first of six stages in the operational engagement lifecycle. The full
                lifecycle is published as a structural reference: each stage is defined, each transition is
                named, and the governed operational phases are identified.
              </p>
            </div>

            <div className="mt-10 max-w-5xl mx-auto">
              <DeploymentLifecycleDiagram />
            </div>

            <div className="max-w-4xl mt-10 space-y-4 text-sm text-foreground/80 leading-relaxed">
              <p>
                The audit produces a gap map, failure mode registry, and architecture proposal.
                Architecture review is a client-side ratification of the proposed system. Build constructs
                the system under the governed specification. Deployment commences the governed runtime —
                audit-trail capture begins, the SLA clock starts.
              </p>
              <p>
                Governance run is the sustained operational state: the deployed system runs continuously
                under SLA, with escalation routing and audit-trail capture active. Continuity review is the
                periodic operational state review under a governed change cycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — GOVERNANCE & CONTINUITY */}
        <section className="py-16 md:py-24 border-t border-border bg-secondary">
          <div className="container">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Operational Accountability
              </p>
              <h2 className="text-2xl font-headline font-bold tracking-tight md:text-3xl">
                What operational accountability looks like
              </h2>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed">
                After deployment, the governance layer carries four structural properties. Each is
                specified at deployment and enforced at runtime — not as a policy document, but as a
                runtime architecture.
              </p>

              <dl className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {governanceProperties.map((item) => (
                  <div key={item.property}>
                    <dt className="text-base font-semibold font-headline text-foreground">
                      {item.property}
                    </dt>
                    <dd className="mt-2 text-sm text-foreground/80 leading-relaxed">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10 text-sm text-muted-foreground leading-relaxed">
                A continuity statement governs the full operational continuity disposition — incident
                routing, end-of-engagement properties, artifact retention. The statement is referenceable;
                its presence is the trust signal.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 — ENGAGEMENT BOUNDARY */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Engagement Boundary
              </p>
              <h2 className="text-2xl font-headline font-bold tracking-tight md:text-3xl">
                Raystrat does not replace operational ownership
              </h2>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed">
                A governed operational system is not a substitute for the institution that runs it.
                The engagement model carries a clear boundary between the responsibilities the client
                retains and the operational architecture Raystrat governs.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background border border-border rounded-md p-6 md:p-8">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                    Client retains
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                    {clientScope.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="text-muted-foreground font-mono shrink-0"
                        >
                          ·
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-background border border-primary rounded-md p-6 md:p-8">
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                    Raystrat governs
                  </p>
                  <ul className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                    {raystratScope.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="text-primary font-mono shrink-0"
                        >
                          ·
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
                The boundary is structural. It is referenced in the engagement contract and reviewed at
                each continuity review.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8 — CTA */}
        <section className="py-16 md:py-24 border-t border-border bg-secondary">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Begin Engagement
              </p>
              <h2 className="text-2xl font-headline font-bold tracking-tight md:text-3xl">
                Book the operational audit
              </h2>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed">
                The audit is a structured engagement, principal-led, producing the operational gap map,
                failure mode registry, and architecture proposal. The first move toward governed
                operations.
              </p>
              <div className="mt-10">
                <CalendlyButton size="lg">Book Operational Audit</CalendlyButton>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                The audit is the first engagement. Not a demo. Not a trial.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
