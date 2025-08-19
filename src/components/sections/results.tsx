import { results } from '@/data/content';
import { Card } from '@/components/ui/card';

export function Results() {
  return (
    <section id="results" className="container">
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
          Tangible Results, Not Empty Promises
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          Our automations are measured by their impact. Here’s what we track for our clients.
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
    </section>
  );
}
