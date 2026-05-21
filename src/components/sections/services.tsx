
import { services } from '@/data/content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Services() {
  return (
    <section id="systems" className="container">
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
          Operational Systems<span className="text-primary">.</span>
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          Six governed execution layers, each designed to eliminate a structural failure point in your business.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/systems/${service.slug}`} className="block group">
            <Card className="flex flex-col h-full transition-colors duration-150 border border-transparent group-hover:border-primary">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2.5 rounded-md bg-primary/10 shrink-0">
                  <service.icon className={cn("w-5 h-5", service.iconClassName || "text-primary")} />
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-base font-semibold font-headline leading-snug">{service.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-0.5">{service.subhead}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 mr-3 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">
                  View System →
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
