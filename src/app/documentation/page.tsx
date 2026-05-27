import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { services } from '@/data/content';

export const metadata: Metadata = {
  title: 'Documentation | Raystrat Systems',
  description:
    'Operational systems documentation philosophy and per-system references at Raystrat Systems.',
};

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Documentation
              </p>
              <h1 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl mb-8">
                Operational Systems Documentation
              </h1>

              <div className="space-y-6 text-base text-foreground/80 leading-relaxed">
                <p>
                  Operational systems are documented at deployment. Documentation is the contract surface — the artifact that survives institutional turnover. Each deployed system carries documentation scoped to its operational properties, governance layer, escalation protocol, and continuity disposition.
                </p>
                <p>
                  Engagement-time documentation deliverables — Operational Gap Map, Failure Mode Registry, System Architecture Proposal — are produced during the operational audit and refined through deployment. The marketing surface signals their existence; the engagement produces the substance.
                </p>
                <p>
                  Documentation carries version stamps. Evolution is recorded in the engineering record. Documentation that has drifted from runtime is treated as a defect.
                </p>
              </div>

              <div className="mt-12">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  Per-System References
                </p>
                <ul className="space-y-2 border-l border-border pl-4">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <span className="text-sm font-medium text-foreground">{service.title}</span>
                      <span className="text-sm text-muted-foreground"> — reference forthcoming</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                  Continuity
                </p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Operational continuity is a structural property of deployed systems. Each system, once deployed, operates continuously under governance. Continuity is reviewed on a defined cadence as part of the engagement model. Engagement-end and incident-time continuity properties are scoped in the engagement contract. The full continuity statement is forthcoming.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
