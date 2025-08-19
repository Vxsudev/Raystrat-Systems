import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/ui/marquee';
import { marqueeStats } from '@/data/content';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="w-full py-20 md:py-32 lg:py-48">
      <div className="container px-4 text-center md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            We automate <span className="text-primary">ROI</span> — not noise
          </h1>
          <p className="mt-4 text-lg text-foreground/80 md:text-xl">
            Five boring automations that print cashflow while you build. Zero ambiguity, maximum efficiency.
          </p>
          <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="mailto:audit@raystrat.com">
                Book 15-min Audit <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/playbook.pdf" target="_blank">Download Playbook</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <Marquee items={marqueeStats} />
      </div>
    </section>
  );
}
