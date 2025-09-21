// src/components/sections/byte-of-the-week.tsx
import { bytes } from '@/data/content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedGridBackground } from '../ui/animated-grid-background';

export function ByteOfTheWeek() {
  // The most recent byte is the first one in the array.
  const latestByte = bytes[0];
  const byteIndex = bytes.indexOf(latestByte);

  if (!latestByte) {
    return null;
  }

  return (
    <section id="byte-of-the-week" className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest uppercase text-primary font-headline">
              Byte-{String(byteIndex + 1).padStart(2, '0')}
            </p>
            <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">
              {latestByte.title}
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              {latestByte.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                 <Button asChild size="lg">
                    <Link href={`/bytes/${latestByte.slug}`}>
                        Read Now <ArrowRight className="ml-2" />
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/bytes">
                        Explore All Bytes
                    </Link>
                </Button>
            </div>
          </div>
          <div className="p-8 bg-card rounded-2xl border flex items-center justify-center aspect-square relative overflow-hidden max-w-sm mx-auto w-full">
             <AnimatedGridBackground />
             <div className="text-center relative z-10">
                 <span className="text-6xl font-bold font-headline text-primary">
                    B{String(byteIndex + 1).padStart(2, '0')}
                 </span>
                 <p className="text-xl font-semibold mt-2">Latest Insight</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
