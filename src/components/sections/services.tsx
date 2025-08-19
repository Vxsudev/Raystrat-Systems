import { services } from '@/data/content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';

export function Services() {
  return (
    <section id="services" className="container">
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
          Automations That Deliver
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          We don&apos;t build for the sake of tech. We build for your bottom line.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col transition-all duration-300 border-2 border-transparent hover:border-primary hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-md bg-primary/10">
                <service.icon className="w-6 h-6 text-primary" />
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
        ))}
      </div>
    </section>
  );
}
