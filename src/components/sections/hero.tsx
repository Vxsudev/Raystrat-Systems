import Link from 'next/link';
import { CalendlyButton } from '@/components/ui/calendly-button';

const OPERATIONAL_SURFACES: { ix: string; name: string; property: string }[] = [
  {
    ix: '01',
    name: 'Demand Acquisition',
    property: 'Signal qualification · source attribution',
  },
  {
    ix: '02',
    name: 'Pursuit',
    property: 'Follow-through governance · SLA continuity',
  },
  {
    ix: '03',
    name: 'Frontline Resolution',
    property: 'Tier-routed resolution · escalation context',
  },
  {
    ix: '04',
    name: 'Operations',
    property: 'Routine execution under audit',
  },
  {
    ix: '05',
    name: 'Command Intelligence',
    property: 'Reporting freshness · lineage-verified',
  },
];

function HeroSurfaceReference() {
  return (
    <div className="border border-border rounded-md bg-card p-4">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 mb-4 font-mono text-[11px]">
        <span className="text-muted-foreground uppercase tracking-[0.18em]">
          Operational Surfaces · Schematic Reference
        </span>
        <span className="text-muted-foreground/70 uppercase tracking-[0.18em]">
          / 05
        </span>
      </div>
      <div>
        {OPERATIONAL_SURFACES.map((row) => (
          <div
            key={row.ix}
            className="grid grid-cols-[24px_1fr] gap-x-4 items-start py-3 border-b border-border last:border-0"
          >
            <span className="font-mono text-muted-foreground text-xs pt-0.5">
              {row.ix}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {row.name}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {row.property}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-3 pt-3 border-t border-border">
        Schematic reference · not runtime telemetry
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-7 h-px bg-primary" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-medium">
                Operational Systems Engineering
              </span>
            </div>
            <h1 className="hero-headline font-headline font-medium tracking-[-0.035em] leading-[0.98] text-[clamp(40px,6.4vw,80px)] mb-7 text-balance">
              Operational Breakdown
              <br />
              Is <span className="text-primary">Preventable.</span>
            </h1>
            <p className="text-[clamp(16px,1.2vw,19px)] text-foreground/80 max-w-[56ch] mb-9 leading-relaxed">
              Businesses don&apos;t fail because people aren&apos;t trying. They
              fail because the systems that should govern demand, pursuit,
              support, operations, and intelligence don&apos;t exist — or run on
              human memory instead of governed infrastructure.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <CalendlyButton size="lg">Book Operational Audit →</CalendlyButton>
              <Link
                href="/systems"
                className="inline-flex items-center px-5 py-3.5 rounded text-sm font-medium border border-border bg-transparent text-foreground hover:bg-muted hover:border-foreground/45 transition-colors duration-150"
              >
                View Systems
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <HeroSurfaceReference />
          </div>
        </div>
      </div>
    </section>
  );
}
