import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, HeartPulse, Scale, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const industryData: {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}[] = [
  {
    title: 'Fintech & Banking',
    description:
      'We deploy compliance-grade operational systems into financial workflows — built for audit accountability, regulatory scrutiny, and continuous operational availability.',
    features: [
      'Governed credit decisioning with full audit trail',
      'Fraud escalation workflows with anomaly routing',
      'Compliant KYC onboarding infrastructure',
      'Continuity-assured customer operations',
    ],
    icon: Landmark,
  },
  {
    title: 'Legal',
    description:
      'We engineer governed operational infrastructure for legal practices where case throughput, document integrity, and client accountability are operational requirements.',
    features: [
      'Case analysis and precedent retrieval infrastructure',
      'Governed document summarization workflows',
      'E-discovery processing with chain-of-custody controls',
      'Client intake and matter-opening with SLA enforcement',
    ],
    icon: Scale,
  },
  {
    title: 'Medical & Healthcare',
    description:
      'We install operational systems into healthcare environments where patient continuity, documentation accuracy, and SLA compliance are non-negotiable.',
    features: [
      'Clinical documentation workflows with coding accuracy controls',
      'Scheduling infrastructure with continuity and escalation logic',
      'Patient intake workflows with triage routing and audit trail',
      'Patient follow-up and continuity management systems',
    ],
    icon: HeartPulse,
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
          tools can&apos;t provide. Our systems are deployed where accountability
          requirements are explicit.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industryData.map((industry) => (
            <Card key={industry.title} className="flex flex-col bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-md bg-primary/10 shrink-0">
                    <industry.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold font-headline leading-snug">
                    {industry.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="mb-4 text-sm text-foreground/80">{industry.description}</p>
                <ul className="space-y-3">
                  {industry.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 mr-3 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
