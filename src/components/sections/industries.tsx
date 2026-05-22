const industryData: {
  code: string;
  title: string;
  description: string;
  features: string[];
}[] = [
  {
    code: 'SEG-01 · FINTECH',
    title: 'Fintech & Banking',
    description:
      'We deploy compliance-grade operational systems into financial workflows — built for audit accountability, regulatory scrutiny, and continuous operational availability.',
    features: [
      'Governed credit decisioning with full audit trail',
      'Fraud escalation workflows with anomaly routing',
      'Compliant KYC onboarding infrastructure',
      'Continuity-assured customer operations',
    ],
  },
  {
    code: 'SEG-02 · LEGAL',
    title: 'Legal',
    description:
      'We engineer governed operational infrastructure for legal practices where case throughput, document integrity, and client accountability are operational requirements.',
    features: [
      'Case analysis and precedent retrieval infrastructure',
      'Governed document summarization workflows',
      'E-discovery processing with chain-of-custody controls',
      'Client intake and matter-opening with SLA enforcement',
    ],
  },
  {
    code: 'SEG-03 · MEDICAL',
    title: 'Medical & Healthcare',
    description:
      'We install operational systems into healthcare environments where patient continuity, documentation accuracy, and SLA compliance are non-negotiable.',
    features: [
      'Clinical documentation workflows with coding accuracy controls',
      'Scheduling infrastructure with continuity and escalation logic',
      'Patient intake workflows with triage routing and audit trail',
      'Patient follow-up and continuity management systems',
    ],
  },
];

export function Industries() {
  return (
    <section id="industries" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          High-Accountability Environments
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl mb-4 max-w-3xl">
          Where audit, continuity, and SLA are non-negotiable.
        </h2>
        <p className="text-foreground/80 max-w-2xl mb-12">
          Regulated sectors demand operational governance that general-purpose
          tools can't provide. Our systems are deployed where accountability
          requirements are explicit.
        </p>

        <div className="border border-border rounded-md divide-y divide-border bg-background">
          {industryData.map((industry) => (
            <div key={industry.title} className="p-7">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">
                {industry.code}
              </p>
              <h3 className="font-bold font-headline text-xl mb-2">
                {industry.title}
              </h3>
              <p className="text-foreground/80 mb-4">{industry.description}</p>
              <ul className="space-y-2">
                {industry.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-foreground/80">
                    <span className="mr-2 text-muted-foreground">—</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
