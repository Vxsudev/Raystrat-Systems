'use client';

// Canonical choke points: Demand Acquisition, Pursuit, Frontline Resolution, Operations, Command Intelligence
import { useState } from 'react';
import { chokePoints } from '@/data/content';
import { ChokeDiagram } from '@/components/ui/choke-diagram';

export function FailureThesis() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="failure-thesis" className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          The Problem
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl mb-4 max-w-3xl">
          The five choke points where execution breaks.
        </h2>
        <p className="text-foreground/80 max-w-2xl mb-12">
          Most businesses run these functions on human discipline. That means
          they run — until someone is sick, overloaded, distracted, or gone.
          The failure is not a performance issue. It is structural.
        </p>

        <div className="border-t border-border">
          {chokePoints.map((cp) => {
            const isActive = activeId === cp.id;
            return (
              <button
                key={cp.id}
                type="button"
                onClick={() => setActiveId(isActive ? null : cp.id)}
                className={
                  'w-full text-left grid grid-cols-[32px_1fr] gap-x-4 py-4 border-b border-border cursor-pointer transition-colors duration-150 ' +
                  (isActive ? 'bg-primary/5' : 'hover:bg-muted/40')
                }
              >
                <span className="font-mono text-xs text-muted-foreground self-start pt-1">
                  {cp.ix}
                </span>
                <div>
                  <p className="font-bold text-foreground">{cp.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{cp.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12">
          <ChokeDiagram activeId={activeId} onSelect={setActiveId} />
          <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted-foreground uppercase tracking-widest">
            <span>SCHEMATIC.V1 · OPERATIONAL PIPELINE</span>
            <span>/ 01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
