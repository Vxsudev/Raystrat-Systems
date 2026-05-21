import { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { services } from '@/data/content';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Operational Systems | Raystrat Systems',
  description:
    'The six operational systems deployed by Raystrat Systems — each engineered to close a structural failure mode across the full operational lifecycle.',
};

export default function SystemsPage() {
  return (
    <>
    <Header />
    <main className="py-12 md:py-16">
      {/* Header block — tight, not a hero */}
      <div className="container mb-12 md:mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
          OPERATIONAL SYSTEMS
        </p>
        <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Six Systems. One Governed Architecture.
        </h1>
        <p className="text-foreground/80 max-w-2xl text-lg">
          Each system addresses a structural failure mode in business operations.
          Together they form a governed execution layer across the full operational lifecycle.
        </p>
      </div>

      {/* Systems grid */}
      <div className="container mb-16 md:mb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/systems/${service.slug}`}
              className="block group"
            >
              <Card className="flex flex-col h-full bg-card/50 border-2 border-transparent transition-colors duration-200 group-hover:border-primary">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <div className="p-2.5 rounded-md bg-primary/10 shrink-0">
                    <service.icon
                      className={`w-6 h-6 ${service.iconClassName ?? 'text-primary'}`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold font-headline leading-snug">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-0.5">
                      {service.subhead}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 pt-0">
                  <ul className="space-y-2 mb-4">
                    {service.bullets.slice(0, 3).map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 mr-2.5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto text-sm font-medium text-primary group-hover:underline">
                    View System →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Audit CTA — bottom, minimal */}
      <div className="container">
        <div className="border border-border rounded-lg px-6 py-8 md:px-10 md:py-10 max-w-2xl">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-2">
            Not sure where to start?
          </p>
          <p className="text-foreground/80 mb-6">
            An operational audit identifies which systems apply to your business and maps
            the structural failure modes they would close.
          </p>
          <CalendlyButton size="lg">Book Operational Audit</CalendlyButton>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
