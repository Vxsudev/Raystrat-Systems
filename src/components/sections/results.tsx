import { results } from '@/data/content';
import { Card } from '@/components/ui/card';

export function Results() {
  return (
    <section id="results" className="container">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
          Here’s how the systems perform — real-world benchmarks
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          Live data appears when available. Otherwise, we display conservative, research-backed performance metrics.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.stats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center">
            <stat.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
            <div className="text-4xl font-extrabold font-headline text-primary">
              {stat.value}
            </div>
            <p className="mt-2 text-sm font-medium text-foreground/80">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>
      <p className="max-w-3xl mx-auto mt-8 text-xs text-center text-foreground/60">
        These are industry benchmarks for 2025. Your results depend on execution, volume, and list quality. Live /api/metrics values replace benchmarks when available.
      </p>
    </section>
  );
}
