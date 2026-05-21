// src/components/sections/results.tsx
import { CalendlyButton } from "@/components/ui/calendly-button";
import { FailureModeRegistryPreview } from '@/components/diagrams/failure-mode-registry-preview';
import { DeploymentLifecycleDiagram } from '@/components/diagrams/deployment-lifecycle-diagram';

const auditDeliverables = [
  {
    title: "Operational Gap Map",
    description:
      "A precise analysis of which of your five functions are running on structural risk.",
  },
  {
    title: "Failure Mode Registry",
    description:
      "The specific ways each gap will manifest as the business scales.",
  },
  {
    title: "System Architecture Proposal",
    description:
      "A proposed governance system design, scoped to your operational profile.",
  },
];

export function Results() {
  return (
    <section id="results" className="py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-6">
            The First Move
          </p>

          <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl">
            Book an Operational Audit
          </h2>

          <p className="mt-6 text-lg text-foreground/80 md:text-xl max-w-2xl mx-auto">
            Before we propose a system, we assess. An operational audit maps your five choke points — demand acquisition, pursuit, support, operations, and command intelligence — identifies active failure modes, and defines the governance architecture required to address them.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 mb-12">
            {auditDeliverables.map((item) => (
              <div
                key={item.title}
                className="text-left p-4 rounded-md border border-border bg-background"
              >
                <p className="font-bold font-headline text-base mb-2">{item.title}</p>
                <p className="text-sm text-foreground/80">{item.description}</p>
              </div>
            ))}
          </div>

          <CalendlyButton size="lg" className="mt-4">
            Book Operational Audit
          </CalendlyButton>

          <p className="mt-4 text-sm text-muted-foreground">
            The audit is the first engagement. Not a demo. Not a trial.
          </p>
        </div>
        <FailureModeRegistryPreview />
        <div className="mt-16">
          <DeploymentLifecycleDiagram />
        </div>
      </div>
    </section>
  );
}
