// src/components/diagrams/audit-trail-entry-preview.tsx
//
// Audit Trail Entry Preview — Phase D2, Track 1; simplified D2.5.
// Authority: specs/phases/phase-trust-evidence-architecture.md §7 (Auditability
// Doctrine), §7.2 (Audit-trail entry artifact format), §3.3 (Redaction discipline).
// Mounted on agent-advantage.tsx (Governance by Design — Audit Trail Architecture).
//
// Documentary artifact panel. Schematic representation. Two generalized entries
// with human-readable operational labels. Monospace for timestamp only.
// No animation. No icons inside panel. No internal system notation.

type AuditEntry = {
  event: string;
  timestamp: string;
  action: string;
  outcome: string;
  actor: string;
};

const entries: AuditEntry[] = [
  {
    event: 'Demand Qualification',
    timestamp: '2026-05-21T09:42:17Z',
    action: 'Signal qualification completed',
    outcome: 'Qualified',
    actor: 'Governed rule',
  },
  {
    event: 'Support Escalation',
    timestamp: '2026-05-21T14:31:02Z',
    action: 'Case escalated to human review',
    outcome: 'Routed to human review',
    actor: 'Governed rule',
  },
];

const fields: { label: string; key: keyof AuditEntry; mono: boolean }[] = [
  { label: 'Timestamp', key: 'timestamp', mono: true },
  { label: 'Action', key: 'action', mono: false },
  { label: 'Outcome', key: 'outcome', mono: false },
  { label: 'Actor', key: 'actor', mono: false },
];

export function AuditTrailEntryPreview() {
  return (
    <section
      aria-labelledby="audit-trail-entry-preview-title"
      className="max-w-4xl text-left"
    >
      <header className="mb-4 border-b border-border pb-3">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          Governance Artifact — Schematic
        </p>
        <h3
          id="audit-trail-entry-preview-title"
          className="mt-1 text-base font-semibold font-headline text-foreground"
        >
          Audit Trail — Entry Format
        </h3>
      </header>

      <div className="border border-border bg-background rounded-md overflow-hidden">
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li key={entry.event} className="p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
                <div className="md:w-44 shrink-0">
                  <p className="text-sm font-semibold font-headline text-foreground">
                    {entry.event}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1">
                  {fields.map(({ label, key, mono }) => (
                    <div key={label}>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      <p
                        className={
                          mono
                            ? 'font-mono text-xs text-foreground/80'
                            : 'text-xs text-foreground/80'
                        }
                      >
                        {entry[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Schematic representation — engagement-specific audit trail entries
        are produced continuously at runtime and accessible per engagement protocol.
      </p>
    </section>
  );
}
