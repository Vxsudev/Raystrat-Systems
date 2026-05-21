// src/components/sections/byte-of-the-week.tsx
import { bytes } from '@/data/content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ByteOfTheWeek() {
  // The most recent byte is the first one in the array.
  const latestByte = bytes[0];
  const byteIndex = bytes.indexOf(latestByte);

  if (!latestByte) {
    return null;
  }

  return (
    <section id="byte-of-the-week" className="py-16 md:py-24 bg-secondary">
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
          <div className="p-8 bg-card rounded-md border flex items-center justify-center aspect-square max-w-sm mx-auto w-full">
             <div className="text-center">
                 <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                    Byte-{String(byteIndex + 1).padStart(2, '0')}
                 </p>
                 <p className="text-xl font-semibold font-headline">Latest Insight</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
