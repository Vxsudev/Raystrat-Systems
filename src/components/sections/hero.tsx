import Link from 'next/link';
import { CalendlyButton } from '@/components/ui/calendly-button';

const OPERATIONAL_CONTEXT = [
  'Demand and follow-through that run without manual chasing.',
  'Support and operations that don’t depend on individual memory.',
  'Reporting that stays current without spreadsheet assembly.',
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full py-24 md:py-32 lg:py-40"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-7 h-px bg-primary" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-medium">
                Operational Systems Engineering
              </span>
            </div>
            <h1 className="font-headline font-medium tracking-[-0.03em] leading-[1.02] text-[clamp(38px,5.4vw,64px)] mb-7 text-balance">
              Systems That Run the Business
            </h1>
            <p className="text-[clamp(16px,1.15vw,19px)] text-foreground/80 max-w-[54ch] mb-10 leading-relaxed">
              Raystrat builds systems for sales, support, operations, and
              reporting — so execution doesn&apos;t depend on memory,
              spreadsheets, or manual follow-through.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <CalendlyButton size="lg">Book Operational Audit</CalendlyButton>
              <Link
                href="/systems"
                className="inline-flex items-center px-5 py-3.5 rounded text-sm font-medium border border-border bg-transparent text-foreground hover:bg-muted hover:border-foreground/45 transition-colors duration-150"
              >
                View Systems
              </Link>
            </div>
          </div>

          <div className="hidden md:block md:pt-3">
            <div className="border-l border-border pl-6 space-y-4">
              {OPERATIONAL_CONTEXT.map((line) => (
                <p key={line} className="text-sm text-muted-foreground leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
