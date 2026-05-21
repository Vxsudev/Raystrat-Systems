'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { heroMeta } from '@/data/content';

type Status = 'ok' | 'warn' | 'crit';

const STATUS_ROWS: { code: string; label: string; status: Status }[] = [
  { code: 'DMND', label: 'Demand Acquisition', status: 'ok' },
  { code: 'PRSU', label: 'Pursuit', status: 'ok' },
  { code: 'FRNT', label: 'Frontline Res.', status: 'warn' },
  { code: 'OPS', label: 'Operations', status: 'ok' },
  { code: 'CMND', label: 'Command Intel.', status: 'ok' },
];

function pillClass(s: Status) {
  if (s === 'ok') return 'font-mono text-[10px] px-2 py-0.5 rounded border border-green-800 bg-green-950 text-green-400';
  if (s === 'warn') return 'font-mono text-[10px] px-2 py-0.5 rounded border border-amber-800 bg-amber-950 text-amber-400';
  return 'font-mono text-[10px] px-2 py-0.5 rounded border border-red-800 bg-red-950 text-red-400';
}

function pillLabel(s: Status) {
  if (s === 'ok') return 'ok';
  if (s === 'warn') return 'warn';
  return 'crit';
}

function HeroStatusPanel() {
  const initialUptimes = useMemo(
    () =>
      STATUS_ROWS.map((_, i) => {
        const base = [99.94, 99.87, 99.71, 99.99, 99.91];
        return base[i];
      }),
    []
  );

  const [uptimes, setUptimes] = useState<number[]>(initialUptimes);

  useEffect(() => {
    const id = setInterval(() => {
      setUptimes((u) =>
        u.map((v) => parseFloat((v + (Math.random() - 0.5) * 0.02).toFixed(2)))
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-status-panel border border-border rounded-md p-4 bg-card">
      <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">
        SYSTEM STATUS
      </p>
      <div>
        {STATUS_ROWS.map((row, i) => (
          <div
            key={row.code}
            className="grid grid-cols-[40px_1fr_auto_auto] gap-2 items-center py-2 border-b border-border last:border-0"
          >
            <span className="font-mono text-[10px] text-muted-foreground/70">
              {row.code}
            </span>
            <span className="text-sm font-medium text-foreground">
              {row.label}
            </span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {uptimes[i].toFixed(2)}%
            </span>
            <span className={pillClass(row.status)}>{pillLabel(row.status)}</span>
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
          {/* Left column */}
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
              <CalendlyButton size="lg">Book Operational Audit</CalendlyButton>
              <a
                href="#systems"
                className="inline-flex items-center px-5 py-3.5 rounded text-sm font-medium border border-border bg-transparent text-foreground hover:bg-muted hover:border-foreground/45 transition-colors duration-150"
              >
                View Systems
              </a>
            </div>
            <HeroMetaRow />
          </div>

          {/* Right column — hidden on mobile */}
          <div className="hidden md:block">
            <HeroStatusPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
