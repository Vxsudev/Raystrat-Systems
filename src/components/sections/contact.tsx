import Link from 'next/link';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { Button } from '@/components/ui/button';
import { auditDeliverables } from '@/data/content';

export function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-[hsl(220_24%_12%)] text-white">
      <div className="container">
        <p className="font-mono text-xs text-white/60 uppercase tracking-widest mb-4">
          The First Move
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline md:text-4xl mb-4 max-w-3xl">
          Book an Operational Audit.
        </h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Before we propose a system, we assess. An audit maps your five choke
          points, identifies active failure modes, and defines the governance
          architecture required to address them.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <CalendlyButton size="lg">Book 30-min Audit →</CalendlyButton>
          <Button asChild variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
            <Link href="/systems">Review Systems</Link>
          </Button>
        </div>

        <p className="text-xs uppercase tracking-widest text-white/40 border-t border-white/20 pt-6 mt-6">
          The audit is the first engagement. Not a demo. Not a trial.
        </p>

        <div className="mt-12 divide-y divide-white/20 border-t border-white/20">
          {auditDeliverables.map((d) => (
            <div key={d.id} className="py-5 grid grid-cols-[80px_1fr] gap-6">
              <p className="font-mono font-bold text-primary text-sm">{d.id}</p>
              <div>
                <h3 className="font-semibold text-white mb-1">{d.ttl}</h3>
                <p className="text-sm text-white/60">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
