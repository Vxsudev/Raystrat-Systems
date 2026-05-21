
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rhythm Lab | Raystrat Systems',
  description: 'Design experiment surface — section archetype laboratory.',
  robots: { index: false, follow: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// Archetype data
// ─────────────────────────────────────────────────────────────────────────────

const failureModeRows: { id: string; mode: string; trigger: string; containment: string; signal: string }[] = [
  {
    id: 'FM-001',
    mode: 'Signal qualification failure',
    trigger: 'Lead enters pipeline without source attribution or intent classification.',
    containment: 'Intake gate enforces qualification schema before record creation.',
    signal: 'Governance audit: intake gate pass rate < 100%.',
  },
  {
    id: 'FM-002',
    mode: 'Terminal-state orphan',
    trigger: 'Pursuit record reaches no-response state with no escalation trigger.',
    containment: 'SLA clock escalates to principal after defined dormancy window.',
    signal: 'Governance audit: open records with SLA breach flag.',
  },
  {
    id: 'FM-003',
    mode: 'Handoff continuity break',
    trigger: 'Support escalation completes transfer without context artifact.',
    containment: 'Escalation schema requires context packet on transition.',
    signal: 'Governance audit: escalation records with context_complete = false.',
  },
  {
    id: 'FM-004',
    mode: 'Reporting drift',
    trigger: 'Command intelligence output diverges from runtime state by > N hours.',
    containment: 'Refresh cadence enforced by governance layer; drift triggers alert.',
    signal: 'Governance audit: data freshness delta against defined threshold.',
  },
];

const governanceMatrix: {
  property: string;
  definition: string;
  trigger: string;
  owner: string;
  accountability: string;
}[] = [
  {
    property: 'Audit Trail',
    definition: 'Every runtime action captured with timestamp, actor, outcome, and system reference.',
    trigger: 'Each action executed by the deployed system.',
    owner: 'System runtime',
    accountability: 'Principal',
  },
  {
    property: 'Escalation Protocol',
    definition: 'Exceptions routed to designated reviewer with full context packet.',
    trigger: 'Tier-1 fallback path exhausted without resolution.',
    owner: 'Designated reviewer',
    accountability: 'Principal',
  },
  {
    property: 'SLA Enforcement',
    definition: 'Performance threshold monitored continuously against defined target.',
    trigger: 'SLA clock breach risk: threshold approached or exceeded.',
    owner: 'System auto-escalation',
    accountability: 'Engagement contract',
  },
  {
    property: 'Continuity Review',
    definition: 'Governed review of operational state at defined cadence.',
    trigger: 'Review cadence trigger (calendar-bound, not event-bound).',
    owner: 'Principal',
    accountability: 'Engagement contract',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function RhythmLabPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

      {/* Lab identifier bar */}
      <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-3 px-6">
        <p className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
          RHYTHM-LAB · branch: rhythm-lab-archetypes · design experiment surface · not a production route
        </p>
      </div>

      {/* ─── ARCHETYPE 1 — EDITORIAL DOCTRINE ─────────────────────────────── */}
      <section
        id="archetype-editorial"
        aria-label="Archetype 1: Editorial Doctrine"
        className="py-24 md:py-32 border-b border-[hsl(var(--border))]"
      >
        <div className="px-6 md:px-12 max-w-2xl">
          <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase mb-6">
            Archetype 01 · Editorial Doctrine
          </p>

          <h2 className="text-3xl font-bold font-headline tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
            Operational failure is structural, not behavioral.
          </h2>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-[hsl(var(--foreground))]/80">
            <p>
              Every business that depends on demand, pursuit, support, operations, and command intelligence
              has the same structural exposure: these five functions run on the discipline of specific
              individuals. The discipline is real. It is also the single point of failure.
            </p>
            <p>
              When the individual is unavailable — travel, illness, departure, distraction — the function
              does not pause. It continues executing, but now without governance. Signals are missed.
              Follow-through lapses. Escalations go unrouted. Reporting drifts. The downstream accumulation
              of these lapses is not immediately visible. It becomes visible at quarter-end, at the first
              large deal that fell through, at the client escalation that arrived without context.
            </p>
            <p>
              A governance layer does not replace the individual. It replaces the function&apos;s dependence
              on any one individual. The system runs the function. The individual makes decisions the system
              cannot. The governance layer enforces what was specified, escalates what exceeded threshold,
              and records what happened. The audit trail is the proof that the function ran.
            </p>
            <p>
              This distinction — between a function that depends on discipline and a function that is
              governed — is the architectural boundary Raystrat installs.
            </p>
          </div>

          <div className="mt-10">
            <div className="w-12 h-px bg-[hsl(var(--primary))]" aria-hidden="true" />
            <p className="mt-4 text-sm font-mono text-[hsl(var(--muted-foreground))]">
              Editorial register · narrow column · no chrome
            </p>
          </div>
        </div>
      </section>

      {/* ─── ARCHETYPE 2 — DOCUMENTARY ARTIFACT ───────────────────────────── */}
      <section
        id="archetype-documentary"
        aria-label="Archetype 2: Documentary Artifact"
        className="py-24 md:py-32 border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))]"
      >
        <div className="px-6 md:px-12 max-w-5xl">
          <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase mb-6">
            Archetype 02 · Documentary Artifact
          </p>

          <h2 className="text-2xl font-bold font-headline tracking-tight text-[hsl(var(--foreground))] md:text-3xl mb-2">
            Failure Mode Registry
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
            Schematic representation · four modes · audit-signal column included
          </p>

          {/* Documentary panel */}
          <div className="border border-[hsl(var(--border))] bg-[hsl(var(--background))] overflow-hidden rounded-md">

            {/* Panel header */}
            <div className="bg-[hsl(var(--structure))] px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-xs text-[hsl(var(--structure-foreground))]/80 tracking-widest uppercase">
                Failure Mode Registry — Schematic
              </span>
              <span className="font-mono text-xs text-[hsl(var(--structure-foreground))]/50">
                v0.4 · illustrative
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[hsl(var(--secondary))]">
                  <tr>
                    {['ID', 'Failure Mode', 'Trigger Condition', 'Containment', 'Audit Signal'].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-3 font-mono text-xs tracking-widest uppercase text-[hsl(var(--muted-foreground))] border-b border-[hsl(var(--border))] whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {failureModeRows.map((row) => (
                    <tr key={row.id} className="align-top">
                      <td className="px-4 py-4 font-mono text-xs text-[hsl(var(--primary))] whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="px-4 py-4 font-semibold font-headline text-[hsl(var(--foreground))] max-w-[160px]">
                        {row.mode}
                      </td>
                      <td className="px-4 py-4 text-[hsl(var(--foreground))]/75 max-w-[200px]">
                        {row.trigger}
                      </td>
                      <td className="px-4 py-4 text-[hsl(var(--foreground))]/75 max-w-[200px]">
                        {row.containment}
                      </td>
                      <td className="px-4 py-4 text-[hsl(var(--muted-foreground))] max-w-[180px] text-xs">
                        {row.signal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Panel footer */}
            <div className="border-t border-[hsl(var(--border))] px-5 py-3 bg-[hsl(var(--secondary))]">
              <p className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                Schematic representation only. Engagement-specific registry produced at operational audit.
              </p>
            </div>
          </div>

          <p className="mt-6 font-mono text-xs text-[hsl(var(--muted-foreground))]">
            Documentary panel · dark header bar · table body · schematic footer note
          </p>
        </div>
      </section>

      {/* ─── ARCHETYPE 3 — ARCHITECTURE EXHIBITION ────────────────────────── */}
      <section
        id="archetype-exhibition"
        aria-label="Archetype 3: Architecture Exhibition"
        className="py-24 md:py-32 border-b border-[hsl(var(--border))]"
      >
        <div className="px-6 md:px-12 max-w-6xl">
          <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase mb-6">
            Archetype 03 · Architecture Exhibition
          </p>

          <h2 className="text-2xl font-bold font-headline tracking-tight text-[hsl(var(--foreground))] md:text-3xl mb-2">
            Operational System — Structural Schematic
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-10">
            Diagram-dominant layout · prose as caption, not primary content
          </p>

          <figure>
            <div className="border border-[hsl(var(--border))] bg-[hsl(var(--background))] rounded-md p-8 overflow-x-auto">
              <svg
                viewBox="0 0 780 280"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="arch-diagram-title"
                className="w-full max-w-3xl mx-auto"
              >
                <title id="arch-diagram-title">
                  Operational system structural schematic: signal intake, governance runtime, and audit capture loop
                </title>

                {/* System boundary */}
                <rect
                  x="10" y="10" width="760" height="210"
                  rx="4" ry="4"
                  fill="none"
                  stroke="hsl(220,10%,88%)"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                />
                <text x="22" y="26" fontSize="9" fontFamily="monospace" fill="hsl(220,10%,45%)" letterSpacing="1">
                  OPERATIONAL SYSTEM BOUNDARY
                </text>

                {/* Node 1 — Intake */}
                <rect x="40" y="60" width="160" height="80" rx="3" fill="hsl(220,10%,96%)" stroke="hsl(220,10%,88%)" strokeWidth="1" />
                <text x="120" y="94" fontSize="11" fontFamily="monospace" fontWeight="600" fill="hsl(220,15%,8%)" textAnchor="middle">
                  INTAKE
                </text>
                <text x="120" y="112" fontSize="9" fontFamily="monospace" fill="hsl(220,10%,45%)" textAnchor="middle">
                  Signal qualification
                </text>
                <text x="120" y="126" fontSize="9" fontFamily="monospace" fill="hsl(220,10%,45%)" textAnchor="middle">
                  Source attribution
                </text>

                {/* Arrow 1→2 */}
                <line x1="200" y1="100" x2="304" y2="100" stroke="hsl(220,10%,70%)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <text x="252" y="93" fontSize="8" fontFamily="monospace" fill="hsl(220,10%,55%)" textAnchor="middle">
                  qualified
                </text>

                {/* Node 2 — Governance Runtime */}
                <rect x="304" y="48" width="172" height="104" rx="3" fill="hsl(214,98%,95%)" stroke="hsl(214,98%,40%)" strokeWidth="1.5" />
                <text x="390" y="88" fontSize="11" fontFamily="monospace" fontWeight="700" fill="hsl(214,98%,40%)" textAnchor="middle">
                  GOVERNANCE
                </text>
                <text x="390" y="102" fontSize="11" fontFamily="monospace" fontWeight="700" fill="hsl(214,98%,40%)" textAnchor="middle">
                  RUNTIME
                </text>
                <text x="390" y="118" fontSize="8" fontFamily="monospace" fill="hsl(214,60%,40%)" textAnchor="middle">
                  SLA · escalation · audit
                </text>
                <text x="390" y="132" fontSize="8" fontFamily="monospace" fill="hsl(214,60%,40%)" textAnchor="middle">
                  rule engine · routing
                </text>

                {/* Arrow 2→3 */}
                <line x1="476" y1="100" x2="580" y2="100" stroke="hsl(220,10%,70%)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <text x="528" y="93" fontSize="8" fontFamily="monospace" fill="hsl(220,10%,55%)" textAnchor="middle">
                  governed
                </text>

                {/* Node 3 — Output */}
                <rect x="580" y="60" width="160" height="80" rx="3" fill="hsl(220,10%,96%)" stroke="hsl(220,10%,88%)" strokeWidth="1" />
                <text x="660" y="94" fontSize="11" fontFamily="monospace" fontWeight="600" fill="hsl(220,15%,8%)" textAnchor="middle">
                  OUTPUT
                </text>
                <text x="660" y="112" fontSize="9" fontFamily="monospace" fill="hsl(220,10%,45%)" textAnchor="middle">
                  Escalation routing
                </text>
                <text x="660" y="126" fontSize="9" fontFamily="monospace" fill="hsl(220,10%,45%)" textAnchor="middle">
                  Resolution record
                </text>

                {/* Audit capture rail */}
                <rect x="40" y="178" width="700" height="28" rx="2" fill="none" stroke="hsl(214,98%,40%)" strokeWidth="1" strokeDasharray="4 3" />
                <text x="390" y="197" fontSize="9" fontFamily="monospace" fill="hsl(214,98%,40%)" textAnchor="middle" letterSpacing="1.5">
                  AUDIT TRAIL — CONTINUOUS CAPTURE — ALL RUNTIME ACTIONS
                </text>

                {/* Vertical lines from nodes to audit rail */}
                <line x1="120" y1="140" x2="120" y2="178" stroke="hsl(220,10%,80%)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="390" y1="152" x2="390" y2="178" stroke="hsl(214,98%,40%)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="660" y1="140" x2="660" y2="178" stroke="hsl(220,10%,80%)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Escalation loop */}
                <path
                  d="M 390 48 C 390 30 500 10 660 40 C 720 55 740 80 660 80"
                  fill="none"
                  stroke="hsl(220,10%,75%)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  markerEnd="url(#arrowhead-muted)"
                />
                <text x="565" y="22" fontSize="8" fontFamily="monospace" fill="hsl(220,10%,55%)" textAnchor="middle">
                  escalation path
                </text>

                {/* Arrowhead definition */}
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M 0 0 L 6 3 L 0 6 Z" fill="hsl(220,10%,70%)" />
                  </marker>
                  <marker id="arrowhead-muted" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <path d="M 0 0 L 5 2.5 L 0 5 Z" fill="hsl(220,10%,75%)" />
                  </marker>
                </defs>
              </svg>
            </div>
            <figcaption className="mt-4 text-xs font-mono text-[hsl(var(--muted-foreground))]">
              Schematic representation only. System boundary, governance runtime, and audit capture rail.
              Actual deployed topology determined at audit.
            </figcaption>
          </figure>

          <p className="mt-8 font-mono text-xs text-[hsl(var(--muted-foreground))]">
            Diagram-dominant · wider container · prose as caption · inline SVG · schematic-first layout
          </p>
        </div>
      </section>

      {/* ─── ARCHETYPE 4 — GOVERNANCE MATRIX ──────────────────────────────── */}
      <section
        id="archetype-matrix"
        aria-label="Archetype 4: Governance Matrix"
        className="py-24 md:py-32 border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))]"
      >
        <div className="px-6 md:px-12 max-w-5xl">
          <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase mb-6">
            Archetype 04 · Governance Matrix
          </p>

          <h2 className="text-2xl font-bold font-headline tracking-tight text-[hsl(var(--foreground))] md:text-3xl mb-2">
            Governance Properties — Operational Reference
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
            Dense table · four properties × four dimensions · reads as an operational spec extract
          </p>

          <div className="border border-[hsl(var(--border))] bg-[hsl(var(--background))] overflow-hidden rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[hsl(var(--structure))]">
                    <th scope="col" className="px-4 py-3 font-mono text-xs text-[hsl(var(--structure-foreground))]/60 uppercase tracking-widest border-b border-[hsl(var(--border))]/20 w-[140px]">
                      Property
                    </th>
                    <th scope="col" className="px-4 py-3 font-mono text-xs text-[hsl(var(--structure-foreground))]/60 uppercase tracking-widest border-b border-[hsl(var(--border))]/20">
                      Definition
                    </th>
                    <th scope="col" className="px-4 py-3 font-mono text-xs text-[hsl(var(--structure-foreground))]/60 uppercase tracking-widest border-b border-[hsl(var(--border))]/20">
                      Trigger
                    </th>
                    <th scope="col" className="px-4 py-3 font-mono text-xs text-[hsl(var(--structure-foreground))]/60 uppercase tracking-widest border-b border-[hsl(var(--border))]/20">
                      Resolution Owner
                    </th>
                    <th scope="col" className="px-4 py-3 font-mono text-xs text-[hsl(var(--structure-foreground))]/60 uppercase tracking-widest border-b border-[hsl(var(--border))]/20">
                      Accountability
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {governanceMatrix.map((row) => (
                    <tr key={row.property} className="align-top">
                      <td className="px-4 py-4 font-semibold font-headline text-[hsl(var(--primary))] text-sm whitespace-nowrap">
                        {row.property}
                      </td>
                      <td className="px-4 py-4 text-[hsl(var(--foreground))]/80 text-xs leading-relaxed max-w-[200px]">
                        {row.definition}
                      </td>
                      <td className="px-4 py-4 text-[hsl(var(--foreground))]/80 text-xs leading-relaxed max-w-[180px]">
                        {row.trigger}
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">
                        {row.owner}
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">
                        {row.accountability}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[hsl(var(--border))] px-4 py-3 bg-[hsl(var(--secondary))]">
              <p className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                Governance properties are specified at deployment and enforced at runtime. Matrix is schematic; engagement-specific values defined in deployment contract.
              </p>
            </div>
          </div>

          <p className="mt-6 font-mono text-xs text-[hsl(var(--muted-foreground))]">
            Dense 5-column table · dark header · monospace identifiers · spec-extract register
          </p>
        </div>
      </section>

      {/* ─── ARCHETYPE 5 — TRANSITIONAL RESET ─────────────────────────────── */}
      <section
        id="archetype-transitional"
        aria-label="Archetype 5: Transitional Reset"
        className="py-24 md:py-32"
      >
        <div className="px-6 md:px-12 max-w-6xl">
          <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase mb-16">
            Archetype 05 · Transitional Reset
          </p>

          {/* Asymmetric split — sparse left, dense right */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">

            {/* Left — sparse anchor */}
            <div className="md:sticky md:top-16">
              <div className="w-8 h-px bg-[hsl(var(--primary))] mb-6" aria-hidden="true" />
              <p className="text-2xl font-headline font-bold tracking-tight text-[hsl(var(--foreground))] leading-snug md:text-3xl">
                The system is the governance.
              </p>
              <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                A density shift is not decoration.
                It is a visual instruction: recalibrate.
              </p>
              <p className="mt-8 font-mono text-xs text-[hsl(var(--muted-foreground))]">
                Left: sparse, anchoring.
              </p>
            </div>

            {/* Right — dense content */}
            <div className="space-y-0">
              {[
                {
                  label: 'Intake',
                  text: 'Signal qualification is gated. No unqualified record enters the operational system. The gate is structural, not disciplinary.',
                },
                {
                  label: 'Pursuit',
                  text: 'Follow-through is governed. The SLA clock begins on record creation. Breach risk triggers escalation before breach occurs.',
                },
                {
                  label: 'Frontline Resolution',
                  text: 'First-contact resolution is measured at the session boundary. Escalation carries a context packet — the receiving reviewer has full operational state.',
                },
                {
                  label: 'Operations',
                  text: 'Exception routing is defined at deployment. Tier-1 exceptions resolve in governed fallback paths. Tier-2 escalates with context. Tier-3 surfaces to principal.',
                },
                {
                  label: 'Command Intelligence',
                  text: 'Reporting is bounded by data freshness thresholds. The system marks data age. Decision-makers see the freshness delta alongside the metric.',
                },
                {
                  label: 'Governance Layer',
                  text: 'The audit trail is structural. It is not a log appended to operations — it is the invariant record of every action the system executed. Its presence is the continuity proof.',
                },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className="border-t border-[hsl(var(--border))] py-6 grid grid-cols-[80px_1fr] gap-6 items-start"
                >
                  <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase pt-1">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <p className="font-semibold font-headline text-[hsl(var(--foreground))] mb-2">
                      {item.label}
                    </p>
                    <p className="text-sm text-[hsl(var(--foreground))]/75 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t border-[hsl(var(--border))] pt-6">
                <p className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                  Right: dense, enumerated, numbered list. Column contrast creates the reset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab footer */}
      <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-4 px-6">
        <p className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
          RHYTHM-LAB · end of archetypes · 01 editorial · 02 documentary · 03 exhibition · 04 matrix · 05 transitional
        </p>
      </div>

    </div>
  );
}
