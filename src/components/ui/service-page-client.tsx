// src/components/ui/service-page-client.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { services } from '@/data/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Check, X } from 'lucide-react';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FavoriteAgentButton } from '@/components/ui/favorite-agent-button';
import { NotesTaker } from '@/components/ui/notes-taker';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Button } from './button';


interface JustificationPopupProps {
  justification: string;
  onAnimate: (text: string) => void;
}

function JustificationPopup({ justification, onAnimate }: JustificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500); // Delay appearance
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    onAnimate(justification);
  };

  return (
     <div className={cn(
        "fixed bottom-20 right-6 z-50 w-full max-w-sm rounded-lg border border-primary bg-card text-card-foreground shadow-2xl transition-all duration-300",
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
     )}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-bold font-headline text-primary">Agent Found!</h4>
            <p className="mt-1 text-sm text-foreground/80">{justification}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 -mr-2 -mt-2 shrink-0" onClick={handleDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}


interface ServicePageClientProps {
  slug: string;
  nextServiceSlug?: string;
}

export function ServicePageClient({ slug, nextServiceSlug }: ServicePageClientProps) {
  const service = services.find((s) => s.slug === slug);
  const nextService = nextServiceSlug ? services.find((s) => s.slug === nextServiceSlug) : undefined;
  
  const searchParams = useSearchParams();
  const justification = searchParams.get('justification');
  const initialNote = searchParams.get('note') || '';

  const [noteContent, setNoteContent] = useState(initialNote);

  // This function will be called by the popup to trigger the animation
  const handleAnimateToNotes = (textToAnimate: string) => {
    // Combine the initial note with the justification
    const fullText = (initialNote ? `${initialNote}\n\n` : '') + `Justification: ${textToAnimate}`;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setNoteContent(prev => fullText.substring(0, prev.length + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20); // Adjust typing speed here
  };


  if (!service) {
    return null;
  }

  const Icon = service.icon;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
       {justification && (
        <JustificationPopup 
          justification={justification} 
          onAnimate={handleAnimateToNotes}
        />
      )}
      <main className="flex-1">
        <article className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <header className="mb-8">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 rounded-md bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
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
                      <NotesTaker 
                        serviceName={service.title} 
                        initialNote={noteContent}
                        onNoteChange={setNoteContent}
                      />
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
