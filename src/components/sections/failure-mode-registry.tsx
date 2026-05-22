type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM';

const failureModes: { id: string; function: string; severity: Severity }[] = [
  { id: 'FM-001', function: 'Demand Acquisition', severity: 'CRITICAL' },
  { id: 'FM-002', function: 'Pursuit', severity: 'CRITICAL' },
  { id: 'FM-003', function: 'Frontline Resolution', severity: 'HIGH' },
  { id: 'FM-004', function: 'Operations', severity: 'HIGH' },
  { id: 'FM-005', function: 'Command Intelligence', severity: 'MEDIUM' },
  { id: 'FM-006', function: 'Pursuit', severity: 'MEDIUM' },
];

function pillClass(s: Severity) {
  const base = 'text-xs px-2 py-0.5 rounded-md font-mono inline-block';
  if (s === 'CRITICAL') return `${base} bg-red-950 text-red-400 border border-red-800`;
  if (s === 'HIGH') return `${base} bg-amber-950 text-amber-400 border border-amber-800`;
  return `${base} bg-slate-800 text-slate-300 border border-slate-600`;
}

export function FailureModeRegistry() {
  return (
    <section id="failure-mode-registry" className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Failure Mode Registry
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl mb-12 max-w-3xl">
          Documented failure modes per function.
        </h2>

        <div className="border border-border rounded-md bg-background overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_120px] gap-4 px-5 py-3 border-b border-border text-xs uppercase tracking-widest text-muted-foreground font-mono">
            <span>ID</span>
            <span>Function</span>
            <span>Severity</span>
          </div>
          {failureModes.map((fm) => (
            <div
              key={fm.id}
              className="grid grid-cols-[80px_1fr_120px] gap-4 px-5 py-4 border-b border-border last:border-0 items-center"
            >
              <span className="font-mono text-sm text-foreground">{fm.id}</span>
              <span className="text-sm text-foreground/80">{fm.function}</span>
              <span>
                <span className={pillClass(fm.severity)}>{fm.severity}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
