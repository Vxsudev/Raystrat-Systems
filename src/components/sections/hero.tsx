import Link from 'next/link';
import { CalendlyButton } from '@/components/ui/calendly-button';

const OPERATING_FUNCTIONS: { name: string; detail: string }[] = [
  { name: 'Sales', detail: 'lead capture, qualification, follow-up, pipeline movement' },
  { name: 'Support', detail: 'intake, routing, escalation, resolution tracking' },
  { name: 'Operations', detail: 'task routing, reminders, approvals, handoffs' },
  { name: 'Reporting', detail: 'dashboards, summaries, weekly operating visibility' },
];

function OperatingFunctionsPanel() {
  return (
    <div className="border border-border rounded-md bg-card overflow-hidden">
      <div className="border-b border-border px-5 py-3.5 bg-secondary">
        <p className="text-sm font-semibold font-headline text-foreground">
          Operating functions Raystrat builds for
        </p>
      </div>
      <div className="divide-y divide-border">
        {OPERATING_FUNCTIONS.map((fn) => (
          <div
            key={fn.name}
            className="grid grid-cols-[96px_1fr] sm:grid-cols-[112px_1fr] gap-4 px-5 py-4 items-baseline"
          >
            <span className="font-semibold text-foreground">{fn.name}</span>
            <span className="text-sm text-muted-foreground leading-relaxed">
              {fn.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full py-14 md:py-20 lg:py-24 border-b border-border"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-14 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-7 h-px bg-primary" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground font-medium">
                Operational Systems Engineering
              </span>
            </div>
            <h1 className="font-headline font-medium tracking-[-0.03em] leading-[1.02] text-[clamp(36px,4.8vw,58px)] mb-6 text-balance">
              Systems That Run the Business
            </h1>
            <p className="text-[clamp(16px,1.1vw,18px)] text-foreground/80 max-w-[52ch] mb-9 leading-relaxed">
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

          <div className="md:pt-1">
            <OperatingFunctionsPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
