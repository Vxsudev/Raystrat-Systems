
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ClientOnly } from '@/components/ui/client-only';

export const metadata: Metadata = {
  title: 'Book a 15-Minute Audit | Raystrat Systems',
  description: 'Schedule a free, no-obligation 15-minute audit to discover your biggest automation opportunities.',
};

// --- Calendly Embed Component ---
// Note: You must install the react-calendly package for this to work.
// I have added it to your package.json.
'use client';
import { InlineWidget } from 'react-calendly';

const CalendlyEmbed = () => {
  // TODO: Replace with your actual Calendly link.
  const calendlyUrl = "https://calendly.com/your-username/15min";

  return (
    <div className="h-[700px] md:h-[650px] overflow-hidden">
       <InlineWidget 
            url={calendlyUrl} 
            styles={{
                height: '1000px',
                transform: 'translateY(-50px)'
            }}
        />
    </div>
  );
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
