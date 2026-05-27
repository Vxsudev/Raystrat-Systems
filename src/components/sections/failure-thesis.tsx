// Canonical choke points: Demand Acquisition, Pursuit, Frontline Resolution, Operations, Command Intelligence
import { chokePoints } from '@/data/content';

export function FailureThesis() {
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
          {chokePoints.map((cp) => (
            <div
              key={cp.id}
              className="grid grid-cols-[32px_1fr] gap-x-4 py-5 border-b border-border"
            >
              <span className="font-mono text-xs text-muted-foreground self-start pt-1">
                {cp.ix}
              </span>
              <div>
                <p className="font-bold text-foreground">{cp.name}</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                  {cp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
