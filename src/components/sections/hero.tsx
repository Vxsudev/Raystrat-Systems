'use client';

import Link from 'next/link';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { heroMeta } from '@/data/content';

type Status = 'GOVERNED' | 'WATCH';

const STATUS_ROWS: { ix: string; name: string; uptime: string; status: Status }[] = [
  { ix: '01', name: 'Demand Acquisition', uptime: '720h 00m', status: 'GOVERNED' },
  { ix: '02', name: 'Pursuit', uptime: '733h 11m', status: 'GOVERNED' },
  { ix: '03', name: 'Frontline Resolution', uptime: '746h 22m', status: 'GOVERNED' },
  { ix: '04', name: 'Operations', uptime: '759h 33m', status: 'WATCH' },
  { ix: '05', name: 'Command Intelligence', uptime: '772h 44m', status: 'GOVERNED' },
];

function pillClass(s: Status) {
  if (s === 'GOVERNED') {
    return 'bg-green-950 text-green-400 border border-green-800 text-xs px-2 py-0.5 rounded-md font-mono';
  }
  return 'bg-amber-950 text-amber-400 border border-amber-800 text-xs px-2 py-0.5 rounded-md font-mono';
}

function HeroStatusPanel() {
  return (
    <div className="hero-status-panel border border-border rounded-md p-4 bg-card">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 mb-4 font-mono text-xs">
        <span className="text-muted-foreground tracking-widest">● ● ●</span>
        <span className="text-muted-foreground uppercase tracking-widest text-center">
          DEPLOYED.SYSTEMS · PROD
        </span>
        <span className="text-muted-foreground">V4.2.1</span>
      </div>
      <div>
        {STATUS_ROWS.map((row) => (
          <div
            key={row.ix}
            className="grid grid-cols-[24px_1fr_auto_auto] gap-x-4 items-center py-2 border-b border-border last:border-0"
          >
            <span className="font-mono text-muted-foreground text-xs">{row.ix}</span>
            <span className="text-sm text-foreground">{row.name}</span>
            <span className="font-mono text-muted-foreground text-xs tabular-nums">
              {row.uptime}
            </span>
            <span className={pillClass(row.status)}>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroMetaRow() {
  return (
    <div className="hero-meta-row flex divide-x divide-border border border-border rounded-md mt-8">
      {heroMeta.map((m, i) => (
        <div
          key={m.k}
          className={'px-6 py-3 text-center flex-1 ' + (i === 0 ? 'pl-0' : '')}
        >
          <div className="font-mono text-2xl font-semibold text-foreground">
            {m.v}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
        </div>
      ))}
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
            <HeroMetaRow />
          </div>

          <div className="hidden md:block">
            <HeroStatusPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
