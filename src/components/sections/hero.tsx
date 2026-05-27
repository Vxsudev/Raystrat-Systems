import Link from 'next/link';
import { CalendlyButton } from '@/components/ui/calendly-button';

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full py-20 md:py-28 lg:py-32"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-7 h-px bg-primary" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-medium">
                Operational Systems Engineering
              </span>
            </div>
            <h1 className="font-headline font-medium tracking-[-0.035em] leading-[0.98] text-[clamp(40px,6.4vw,80px)] mb-8 text-balance">
              Operational Breakdown
              <br />
              Is <span className="text-primary">Preventable.</span>
            </h1>
            <p className="text-[clamp(16px,1.2vw,19px)] text-foreground/80 max-w-[56ch] mb-10 leading-relaxed">
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

          <div className="hidden md:block md:pt-2">
            <p className="text-base text-foreground/70 leading-relaxed border-l border-border pl-6">
              Raystrat engineers governed execution systems for businesses where
              audit accountability, SLA compliance, and operational continuity
              are not optional.
            </p>
            <p className="text-base text-foreground/70 leading-relaxed border-l border-border pl-6 mt-6">
              Each engagement begins with an operational audit — a structured
              assessment of where execution depends on individuals rather than
              governed infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
