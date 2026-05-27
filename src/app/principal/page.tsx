import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Principal | Raystrat Systems',
  description:
    'Principal accountability for delivery, continuity, and incident escalation at Raystrat Systems.',
};

export default function PrincipalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Principal
              </p>
              <h1 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl mb-6">
                Principal Accountability
              </h1>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Engagement principal: <span className="font-semibold text-foreground">Vasudev</span> — Principal, Operational Systems.
              </p>
              <p className="text-base text-foreground/80 leading-relaxed mb-4">
                Delivery, operational continuity, and incident escalation are principal-accountable across every Raystrat engagement.
              </p>
              <p className="text-base text-foreground/80 leading-relaxed">
                Engagement-specific accountability scope is defined in the engagement contract. The first engagement is the operational audit.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
