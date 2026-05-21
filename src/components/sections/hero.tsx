
import { CalendlyButton } from '@/components/ui/calendly-button';

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 w-full">
        <div className="max-w-9xl mx-auto text-center">
            <div className="text-6xl font-bold font-headline sm:text-7xl md:text-8xl text-foreground">
              <h1>Operational Breakdown<br />Is Preventable.</h1>
            </div>
            <p className="mx-auto mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl">
              Businesses don&apos;t fail because people aren&apos;t trying. They fail because the systems that should govern demand, pursuit, support, operations, and intelligence don&apos;t exist — or run on human memory instead of governed infrastructure.
            </p>
            <div className="flex justify-center mt-10">
              <CalendlyButton size="lg" variant="ghost" className="h-auto py-4 px-10 text-xl bg-background text-primary border-primary border hover:bg-primary/10">
                Book Operational Audit
              </CalendlyButton>
            </div>
        </div>
      </div>
    </section>
  );
}
