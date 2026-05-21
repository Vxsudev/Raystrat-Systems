// src/components/diagrams/failure-mode-registry-preview.tsx
//
// Failure Mode Registry Preview — Phase D1, Track 2.
// Authority: specs/phases/phase-trust-evidence-architecture.md §18.2
// (Failure Mode Registry artifact), §19 (Failure Mode Registry Doctrine),
// §3.3 (redaction discipline), §27 (Institutional Typography Usage).
//
// Documentary artifact panel. Schematic representation. Three redacted
// entries. Monospace identifiers per §27.1. No badges, no animation,
// no decorative motion. Single semantic accent on identifiers only.

type FailureModeEntry = {
  id: string;
  surface: string;
  detection: string;
  containment: string;
  escalation: string;
};

const entries: FailureModeEntry[] = [
  {
    id: 'FM-DEM-01',
    surface: 'Demand Acquisition',
    detection: 'Signal-source freshness deviates from defined window.',
    containment: 'Governed re-qualification gate; record withheld from pipeline until verified.',
    escalation: 'Signal-source rotation triggered after threshold breach.',
  },
  {
    id: 'FM-PUR-01',
    surface: 'Pursuit',
    detection: 'Terminal state not reached within rule-defined cadence.',
    containment: 'Cadence enforcement continues; record annotated for principal review.',
    escalation: 'Principal-routed on SLA breach with full pursuit context.',
  },
  {
    id: 'FM-OPS-01',
    surface: 'Operations',
    detection: 'Process execution deviates from governed specification.',
    containment: 'Fallback rule engaged; audit trail annotated with deviation class.',
    escalation: 'Human review on persistent deviation; engagement-owner notified.',
  },
];

export function FailureModeRegistryPreview() {
  return (
    <section
      aria-labelledby="failure-mode-registry-preview-title"
      className="mt-16 max-w-4xl mx-auto text-left"
    >
      <header className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between border-b border-border pb-3">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Audit Deliverable — Excerpt
          </p>
          <h3
            id="failure-mode-registry-preview-title"
            className="mt-1 text-base font-semibold font-headline text-foreground"
          >
            Failure Mode Registry
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Schematic representation — entries redacted
        </p>
      </header>

      <div className="border border-border bg-background rounded-md overflow-hidden">
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li key={entry.id} className="p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
                <div className="md:w-40 shrink-0">
                  <p className="font-mono text-sm font-semibold text-primary">
                    {entry.id}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {entry.surface}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-3 flex-1 text-sm">
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                      Detection Signal
                    </p>
                    <p className="text-foreground/80 leading-relaxed">{entry.detection}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                      Containment Strategy
                    </p>
                    <p className="text-foreground/80 leading-relaxed">{entry.containment}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                      Escalation State
                    </p>
                    <p className="text-foreground/80 leading-relaxed">{entry.escalation}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Engagement-specific registry contains the full catalog scoped to client
        operational profile. The marketing-surface preview shows artifact
        format; client-specific entries are produced during the operational
        audit.
      </p>
    </section>
  );
}
