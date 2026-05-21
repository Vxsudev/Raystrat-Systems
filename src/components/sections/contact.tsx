import { ContactForm } from '@/components/ui/contact-form';
import { auditDeliverables } from '@/data/content';

export function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="container relative">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
            Book an Operational Audit.
          </h2>
          <div className="h-0.5 w-12 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="mt-2 text-base max-w-md mx-auto text-foreground/60">
            Thirty minutes. A precise gap map, failure mode registry, and
            proposed governance architecture — delivered as a structured
            artifact.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {auditDeliverables.map((d) => (
              <div key={d.id} className="border border-border rounded-md p-4 bg-card">
                <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                  {d.id}
                </p>
                <h3 className="font-semibold text-foreground mb-1">{d.ttl}</h3>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
