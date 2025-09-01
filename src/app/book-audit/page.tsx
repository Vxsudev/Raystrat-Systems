
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ClientOnly } from '@/components/ui/client-only';
import { CalendlyEmbed } from '@/components/ui/calendly-embed';

export const metadata: Metadata = {
  title: 'Book a 15-Minute Audit | Raystrat Systems',
  description: 'Schedule a free, no-obligation 15-minute audit to discover your biggest automation opportunities.',
};

export default function BookAuditPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Book Your 15-Min Audit
              </h1>
              <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                Select a time below that works for you. We'll discuss your current bottlenecks and identify the highest-impact automation opportunities for your business.
              </p>
            </div>
            <div className="max-w-4xl mx-auto overflow-hidden border rounded-lg bg-card border-border">
                <ClientOnly>
                    <CalendlyEmbed />
                </ClientOnly>
            </div>
          </div>
        </section>
      </main>
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  );
}
