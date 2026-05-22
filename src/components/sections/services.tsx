import { services } from '@/data/content';
import Link from 'next/link';

const SYS_CODES = [
  'SYS-01 · DEMAND',
  'SYS-02 · FOLLOW-THROUGH',
  'SYS-03 · FRONTLINE',
  'SYS-04 · OPERATIONS',
  'SYS-05 · COMMAND',
  'SYS-06 · CUSTOM',
];

export function Services() {
  return (
    <section id="systems" className="py-16 md:py-24">
      <div className="container">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          The Solution
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl mb-4 max-w-3xl">
          Six operational systems. Each closes a structural failure point.
        </h2>
        <p className="text-foreground/80 max-w-2xl mb-12">
          Each system installs as governed infrastructure — with audit trail,
          SLA enforcement, and escalation protocol built in. Not a tool. Not a
          workflow. Operational backbone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-md overflow-hidden">
          {services.map((service, i) => (
            <div key={service.slug} className="bg-card p-7 flex flex-col">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                {SYS_CODES[i]}
              </p>
              <h3 className="font-bold font-headline text-xl mb-1">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.subhead}
              </p>
              <ul className="space-y-2 mb-6">
                {service.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start text-sm text-foreground/80">
                    <span className="mr-2 text-muted-foreground">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/systems/${service.slug}`}
                className="mt-auto text-xs font-mono uppercase tracking-widest text-primary hover:underline"
              >
                VIEW SYSTEM ↗
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
