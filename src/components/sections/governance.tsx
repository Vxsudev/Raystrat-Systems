const governanceProps = [
  {
    title: 'Audit Trail Architecture',
    description:
      'Every action executed by a deployed system is logged with timestamp, context, and outcome. Nothing runs without a record.',
  },
  {
    title: 'SLA Enforcement',
    description:
      'Performance targets are defined at deployment. The system enforces them automatically — measuring against thresholds, alerting on deviation, escalating at risk.',
  },
  {
    title: 'Escalation Protocol',
    description:
      'Exceptions are routed, not dropped. When a case falls outside system parameters, escalation logic activates — with full context passed to the responsible party.',
  },
  {
    title: 'Failure-Resistant Architecture',
    description:
      'Systems are designed around failure modes, not ideal scenarios. Retry logic, fallback paths, and degraded-mode operation are specified before deployment.',
  },
  {
    title: 'Compliance Controls',
    description:
      'For regulated environments, the governance layer includes data handling rules, access controls, and audit-ready logging — without manual intervention.',
  },
  {
    title: 'Operational Continuity',
    description:
      'Deployed systems operate continuously — not dependent on headcount, shift schedules, or individual attention. The function runs because the system governs it.',
  },
];

export function Governance() {
  return (
    <section id="governance" className="bg-background py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Governance Layer
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl mb-4 max-w-3xl">
          Governance by design — not as an add-on.
        </h2>
        <p className="text-foreground/80 max-w-2xl mb-12">
          Every system Raystrat deploys includes an operational governance
          layer. Audit trail, SLA enforcement, escalation, compliance
          controls — structural requirements, not optional features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
          {governanceProps.map((g, i) => (
            <div key={g.title} className="bg-card p-7 flex flex-col">
              <p className="font-mono text-xs text-muted-foreground mb-2">
                {String(i + 1).padStart(2, '0')} / 06
              </p>
              <h3 className="font-bold font-headline text-lg mb-2">{g.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
