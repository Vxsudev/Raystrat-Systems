
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="w-full relative z-10 px-4 md:px-6">
        <div className="max-w-9xl mx-auto text-center">
            <h1 className="text-5xl font-bold font-headline sm:text-6xl md:text-7xl text-foreground">
              Agents Run Business.
            </h1>
            <p className="mt-6 text-2xl md:text-3xl text-primary font-medium">
              AI isn’t the future anymore — it’s present. Step up.
            </p>
            <p className="mx-auto mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl">
              Most losses trace back to the same five systems — leads, follow-up, support, operations, and data. Our agents run them with discipline.
            </p>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg" variant="ghost" className="h-auto py-3 px-8 text-lg bg-background text-primary border-primary border hover:bg-primary/10">
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
