import Link from 'next/link';
import { pricing } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
            Clear Pricing, Clear Value.
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Choose the plan that aligns with your automation goals. No hidden fees.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricing.tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                'flex flex-col',
                tier.popular ? 'border-2 border-primary shadow-2xl shadow-primary/20' : ''
              )}
            >
              {tier.popular && (
                <div className="px-3 py-1 text-sm font-semibold text-white bg-primary rounded-t-lg text-center">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-headline">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="flex items-baseline pt-4">
                  <span className="text-4xl font-extrabold font-headline">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-lg font-medium text-foreground/80">
                    {tier.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 mr-2 text-primary shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild size="lg" variant={tier.popular ? 'default' : 'outline'}>
                  <Link href="mailto:audit@raystrat.com">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
