
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="top" className="w-full min-h-screen flex items-center justify-center bg-background py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full container">
        <div className="mx-auto text-center">
          <h1 className="text-5xl font-bold font-headline sm:text-6xl md:text-8xl text-foreground">
            Agents Run Business.
          </h1>
          <h2 className="mt-4 font-medium text-2xl sm:text-3xl md:text-4xl font-headline text-primary">
            AI isn’t the future anymore — it’s present. Step up.
          </h2>
          <p className="mx-auto mt-6 text-lg md:text-xl text-muted-foreground max-w-4xl">
            Most losses trace back to the same five systems — 
            leads, follow-up, support, operations, and data. 
            Our agents run them with discipline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-4">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary px-8 py-4 text-lg rounded-2xl hover:bg-accent transition h-auto">
                <Link href="#services">See The Five Agents</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
