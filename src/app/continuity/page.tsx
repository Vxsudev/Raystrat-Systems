import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Continuity | Raystrat Systems',
  description:
    'Operational continuity as a structural property of every deployed Raystrat system.',
};

export default function ContinuityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Continuity
              </p>
              <h1 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl mb-8">
                Operational Continuity
              </h1>

              <div className="space-y-6 text-base text-foreground/80 leading-relaxed">
                <p>
                  Continuity is a structural property of deployed systems. Each system, once deployed, operates continuously under governance — not as a project with a completion date.
                </p>
                <p>
                  Continuity is reviewed on a defined cadence as part of the engagement model. Configuration changes are made through a governed change cycle. Operational state is principal-accountable.
                </p>
                <p>
                  Engagement-specific continuity terms — incident response posture, end-of-engagement disposition, artifact retention — are scoped in the engagement contract. The full continuity statement is forthcoming.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
