'use client';

// Choke point canon: Demand Acquisition | Pursuit | Frontline Resolution | Operations | Command Intelligence
import { useState } from 'react';
import { chokePoints, failureRegistry } from '@/data/content';
import { ChokeDiagram } from '@/components/ui/choke-diagram';

function sevBadge(sev: 'crit' | 'high' | 'med') {
  if (sev === 'crit')
    return 'font-mono text-[10px] px-2 py-0.5 rounded border border-red-800 bg-red-950 text-red-400 uppercase tracking-widest';
  if (sev === 'high')
    return 'font-mono text-[10px] px-2 py-0.5 rounded border border-amber-800 bg-amber-950 text-amber-400 uppercase tracking-widest';
  return 'font-mono text-[10px] px-2 py-0.5 rounded border border-slate-600 bg-slate-900 text-slate-400 uppercase tracking-widest';
}

function sevLabel(sev: 'crit' | 'high' | 'med') {
  if (sev === 'crit') return 'Critical';
  if (sev === 'high') return 'High';
  return 'Medium';
}

export function FailureThesis() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="failure-thesis"
      className="py-16 md:py-24 bg-[hsl(220_24%_12%)]"
    >
      <div className="container">
        {/* Header */}
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
          The Problem
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl text-white mb-12">
          Five Choke Points
        </h2>

        {/* Two-column: choke point list + diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: clickable choke point list */}
          <div className="space-y-1">
            {chokePoints.map((cp) => {
              const isActive = activeId === cp.id;
              return (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => setActiveId(isActive ? null : cp.id)}
                  className={
                    'w-full text-left px-4 py-3 rounded-md border transition-colors duration-150 ' +
                    (isActive
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]')
                  }
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] text-primary mt-0.5 shrink-0">
                      {cp.ix}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {cp.name}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5">{cp.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: diagram with shared activeId */}
          <div>
            <ChokeDiagram activeId={activeId} onSelect={setActiveId} />
          </div>
        </div>

        {/* Failure Mode Registry table */}
        <div className="mt-16">
          <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-4">
            Failure Mode Registry
          </p>
          <div className="border border-white/10 rounded-md overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[80px_180px_1fr_100px] gap-4 px-5 py-3 bg-white/[0.04] border-b border-white/10 font-mono text-[10px] tracking-widest uppercase text-white/40">
              <span>FM-ID</span>
              <span>Function</span>
              <span>Failure Mode</span>
              <span>Severity</span>
            </div>
            {failureRegistry.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[80px_180px_1fr_100px] gap-4 py-3 px-5 border-b border-white/10 last:border-0 items-start"
              >
                <span className="font-mono text-xs text-white/50">{r.id}</span>
                <span className="text-sm text-white/70 font-medium">{r.fn}</span>
                <span className="text-sm text-white/70">{r.mode}</span>
                <span className={sevBadge(r.sev)}>{sevLabel(r.sev)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
