
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="top" className="w-full min-h-screen flex items-center justify-center bg-background py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="w-full px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-headline md:text-7xl text-foreground">
            Agents Run Business.
          </h1>
          <h2 className="mt-4 font-medium text-2xl md:text-3xl font-headline text-primary">
            AI isn’t the future — it’s present. Wake up.
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-muted-foreground">
            Most losses trace back to the same five systems — 
            leads, follow-up, support, operations, and data. 
            Our agents run them with discipline.
          </p>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary px-6 py-3 rounded-2xl hover:bg-accent transition h-auto ml-4">
                <Link href="#services">See The Five Agents</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
