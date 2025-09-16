
import { services } from '@/data/content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Services() {
  return (
    <section id="services" className="container">
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
          Agents<span className="text-primary">.</span>
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          Engineered to cut waste, reclaim hours, and grow revenue.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="block group">
            <Card className="flex flex-col h-full transition-all duration-300 border-2 border-transparent group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-md bg-primary/10">
                  <service.icon className={cn("w-6 h-6 text-primary animate-pulse group-hover:scale-110 group-hover:-rotate-6", service.iconClassName)} />
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-lg font-semibold font-headline">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base italic text-foreground/90">{service.subhead}</CardDescription>
                <ul className="space-y-3">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 mr-3 text-primary shrink-0 mt-1" />
                      <span className="text-foreground/80">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
