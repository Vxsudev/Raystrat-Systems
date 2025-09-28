

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { DynamicHeadline } from '../ui/dynamic-headline';

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 w-full">
        <div className="max-w-9xl mx-auto text-center">
            <div className="text-6xl font-bold font-headline sm:text-7xl md:text-8xl text-foreground">
              <h1>Agents Run</h1>
              <DynamicHeadline />
            </div>
            <p className="mx-auto mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl">
              Most losses trace back to the same five systems — leads, follow-up, support, operations, and data. Our agents run them with discipline.
            </p>
            <div className="flex justify-center mt-10">
              <Button asChild size="lg" variant="ghost" className="h-auto py-4 px-10 text-xl bg-background text-primary border-primary border hover:bg-primary/10">
                <Link href="#services">
                  See The Five Agents
                </Link>
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
