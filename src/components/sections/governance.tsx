'use client';

import { useEffect, useRef, useState } from 'react';
import { auditSeed } from '@/data/content';

const governanceProps = [
  {
    title: 'Audit Trail Architecture',
    description:
      'Every action executed by a deployed system is logged with timestamp, context, and outcome. Nothing runs without a record.',
  },
  {
    title: 'SLA Enforcement',
    description:
      'Performance targets are defined at deployment. The system enforces them automatically — measuring against thresholds, alerting on deviation, escalating at risk.',
  },
  {
    title: 'Escalation Protocol',
    description:
      'Exceptions are routed, not dropped. When a case falls outside system parameters, escalation logic activates — with full context passed to the responsible party.',
  },
  {
    title: 'Failure-Resistant Architecture',
    description:
      'Systems are designed around failure modes, not ideal scenarios. Retry logic, fallback paths, and degraded-mode operation are specified before deployment.',
  },
  {
    title: 'Compliance Controls',
    description:
      'For regulated environments, the governance layer includes data handling rules, access controls, and audit-ready logging — without manual intervention.',
  },
  {
    title: 'Operational Continuity',
    description:
      'Deployed systems operate continuously — not dependent on headcount, shift schedules, or individual attention. The function runs because the system governs it.',
  },
];

type Entry = {
  key: string;
  ts: string;
  sys: string;
  ev: string;
  out: 'ok' | 'esc' | 'disq';
};

export function Governance() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const seedRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const initial: Entry[] = [];
    for (let i = 0; i < 8; i++) {
      const seed = auditSeed[(i + 3) % auditSeed.length];
      const date = new Date(now - (8 - i) * 4200);
      initial.push({
        key: `seed-${i}-${date.getTime()}`,
        ts: date.toISOString().slice(11, 19),
        sys: seed.sys,
        ev: seed.ev,
        out: seed.out,
      });
    }
    setEntries(initial);
    seedRef.current = 8;

    const id = setInterval(() => {
      const seed = auditSeed[seedRef.current % auditSeed.length];
      seedRef.current++;
      const date = new Date();
      const entry: Entry = {
        key: `live-${seedRef.current}-${date.getTime()}`,
        ts: date.toISOString().slice(11, 19),
        sys: seed.sys,
        ev: seed.ev,
        out: seed.out,
      };
      setEntries((prev) => [...prev.slice(-7), entry]);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  return (
    <section id="governance" className="bg-[hsl(220_24%_12%)] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,220px)_1fr] gap-6 md:gap-16 items-end mb-12 md:mb-14">
          <div className="pt-1.5">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary font-medium">
              Governance Layer
            </p>
          </div>
          <div>
            <h2 className="font-headline font-semibold tracking-tight text-[clamp(28px,3.6vw,48px)] leading-[1.05] mb-3 max-w-[24ch]">
              Governance by design — not as an add-on.
            </h2>
            <p className="text-[17px] text-foreground/80 max-w-[60ch]">
              Every system Raystrat deploys includes an operational governance
              layer. Audit trail, SLA enforcement, escalation, compliance
              controls — structural requirements, not optional features.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
          {governanceProps.map((g, i) => (
            <div
              key={g.title}
              className="bg-card p-7 flex flex-col gap-2 min-h-[220px]"
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-primary mb-1">
                {String(i + 1).padStart(2, '0')} / 06
              </div>
              <h3 className="font-headline font-medium tracking-tight text-lg leading-snug">
                {g.title}
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-[hsl(220_24%_12%)] text-white/95 rounded-md overflow-hidden font-mono text-[12.5px]">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.025] text-[11px] tracking-[0.14em] uppercase text-white/60">
            <span>/var/log/raystrat/audit.stream</span>
            <div className="flex items-center gap-3.5">
              <span className="text-white/40">tail -f</span>
              <span className="inline-flex items-center gap-1.5 text-green-400">
                <span className="system-pulse-dot bg-green-400 rounded-full w-1.5 h-1.5" />
                LIVE
              </span>
            </div>
          </div>
          <div className="audit-log-body py-2 max-h-[280px] overflow-hidden relative">
            {entries.map((e) => (
              <div
                key={e.key}
                className="audit-row-anim grid grid-cols-[80px_60px_1fr_80px] sm:grid-cols-[110px_90px_1fr_90px] items-center gap-2 sm:gap-4 px-3 sm:px-5 py-1.5 text-white/80 border-t border-dashed border-white/[0.05] first:border-t-0"
              >
                <span className="text-white/45 text-[11px]">{e.ts}</span>
                <span className="text-[10px] tracking-[0.12em] uppercase text-primary-foreground/90 [color:color-mix(in_oklab,hsl(214_98%_60%),white_20%)]">
                  {e.sys}
                </span>
                <span className="text-white/90 truncate">{e.ev}</span>
                <span
                  className={
                    'text-[10px] tracking-[0.12em] uppercase text-right ' +
                    (e.out === 'ok'
                      ? 'text-green-400'
                      : e.out === 'esc'
                      ? 'text-amber-400'
                      : 'text-white/50')
                  }
                >
                  {e.out === 'ok'
                    ? 'RESOLVED'
                    : e.out === 'esc'
                    ? 'ESCALATED'
                    : 'DISQUALIFIED'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
