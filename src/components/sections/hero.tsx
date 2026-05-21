
import { CalendlyButton } from '@/components/ui/calendly-button';

export function Hero() {
  return (
    <section id="top" className="relative w-full bg-transparent py-20 md:py-28">
      <div className="container text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
          Operational Systems Engineering
        </p>
        <h1 className="text-5xl font-bold font-headline leading-tight tracking-tighter md:text-6xl text-foreground">
          Operational Breakdown<br />Is Preventable.
        </h1>
        <p className="mx-auto mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Businesses don&apos;t fail because people aren&apos;t trying. They fail because the systems that should govern demand, pursuit, support, operations, and intelligence don&apos;t exist — or run on human memory instead of governed infrastructure.
        </p>
        <div className="flex justify-center mt-10">
          <CalendlyButton size="lg">
            Book Operational Audit
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
}
