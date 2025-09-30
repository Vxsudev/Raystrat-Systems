
'use client';

import { services } from '@/data/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Check } from 'lucide-react';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FavoriteAgentButton } from '@/components/ui/favorite-agent-button';
import { NotesTaker } from '@/components/ui/notes-taker';
import { Separator } from '@/components/ui/separator';
import type { LucideIcon } from 'lucide-react';

interface Service {
  slug: string;
  title: string;
  subhead: string;
  bullets: string[];
  icon: LucideIcon;
  pageContent: string;
  iconClassName?: string;
}

interface ServicePageClientProps {
  service: Service;
  nextService: Service;
}

export function ServicePageClient({ service, nextService }: ServicePageClientProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <article className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <header className="mb-8">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 rounded-md bg-primary/10">
                        <service.icon className="w-8 h-8 text-primary" />
                     </div>
                     <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                        {service.title}
                     </h1>
                   </div>
                  <p className="mt-4 text-xl italic text-foreground/80">{service.subhead}</p>
                </header>
                <div 
                  className="prose prose-invert prose-lg max-w-none mx-auto text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: service.pageContent }}
                />
              </div>
              <aside className="lg:col-span-2">
                <div className="sticky p-6 rounded-lg top-24 bg-card border border-border">
                    <h3 className="text-2xl font-bold font-headline">Core Features</h3>
                     <ul className="mt-4 space-y-3">
                        {service.bullets.map((bullet, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 mr-3 text-primary shrink-0 mt-1" />
                            <span className="text-foreground/80">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 space-y-3">
                         <CalendlyButton size="lg" className='w-full'>
                            Book a Demo <ArrowRight className="ml-2" />
                        </CalendlyButton>
                        <FavoriteAgentButton agentName={service.title} agentSlug={service.slug} />
                      </div>
                      <Separator className="my-6" />
                      <NotesTaker serviceName={service.title} />
                </div>
              </aside>
            </div>
            {nextService && (
                <div className="mt-24 text-center">
                    <Link 
                        href={`/services/${nextService.slug}`}
                        className="inline-flex items-center text-lg font-semibold transition-colors text-foreground/80 hover:text-primary group"
                    >
                        Explore the next agent: <span className="ml-2 font-bold group-hover:underline">{nextService.title}</span>
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
