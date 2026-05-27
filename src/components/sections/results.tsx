import { CalendlyButton } from '@/components/ui/calendly-button';
import { FailureModeRegistryPreview } from '@/components/diagrams/failure-mode-registry-preview';
import { DeploymentLifecycleDiagram } from '@/components/diagrams/deployment-lifecycle-diagram';

const metrics = [
  { value: '2–5×', label: 'Reply Rate Uplift' },
  { value: '+10–25%', label: 'Collections Speed' },
  { value: '30–60', label: 'Content Velocity' },
  { value: '~56', label: 'Hours Saved /mo' },
];

export function Results() {
  return (
    <section id="results" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Operational Evidence
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl mb-4 max-w-3xl">
          Operational ranges across deployments.
        </h2>
        <p className="text-foreground/80 max-w-2xl mb-8">
          Each engagement defines SLA targets at deployment. Ranges shown are
          operational examples across past engagements; engagement-specific
          values are produced at the operational audit.
        </p>

        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
          Illustrative ranges · not runtime telemetry
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-border rounded-md bg-background overflow-hidden">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={
                'p-6 ' +
                (i < metrics.length - 1 ? 'border-r border-border' : '')
              }
            >
              <div className="text-4xl font-mono font-bold text-foreground">
                {m.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <CalendlyButton size="lg">Book Audit →</CalendlyButton>
        </div>

        {/* Diagram components — kept for institutional record; not visible in primary viewport */}
        <div className="sr-only" aria-hidden="true">
          <FailureModeRegistryPreview />
          <DeploymentLifecycleDiagram />
        </div>
      </div>
    </section>
  );
}
