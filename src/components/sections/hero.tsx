
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="w-full relative z-10">
        <div className="max-w-9xl mx-auto text-center">
            <h1 className="text-6xl font-bold font-headline sm:text-7xl md:text-8xl text-foreground">
              Agents Run Business.
            </h1>
            <p className="mt-8 text-3xl md:text-4xl text-primary font-medium">
              AI isn’t the future anymore — it’s present. Step up.
            </p>
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
