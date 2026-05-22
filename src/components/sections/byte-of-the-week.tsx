import { bytes } from '@/data/content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ByteOfTheWeek() {
  const latestByte = bytes[0];
  const byteIndex = bytes.indexOf(latestByte);
  if (!latestByte) return null;

  const code = `B-${String(byteIndex + 1).padStart(2, '0')}`;
  const features = latestByte.keyTakeaways.slice(0, 4);

  return (
    <section id="byte-of-the-week" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
              BYTE · {code}
            </p>
            <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl mb-4">
              {latestByte.title}
            </h2>
            <p className="text-foreground/80">{latestByte.summary}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {features.map((f) => (
                <div key={f.title}>
                  <p className="font-semibold text-sm mb-1">{f.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg">
                <Link href={`/bytes/${latestByte.slug}`}>Read Now →</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/bytes">All Bytes</Link>
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-md p-8">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Operational Intelligence
            </p>
            <p className="font-mono text-3xl font-bold text-primary mb-3">
              {code}
            </p>
            <p className="font-semibold text-sm mb-4">{latestByte.title}</p>
            <p className="text-sm text-muted-foreground">
              {latestByte.readTime} min read
            </p>
            <p className="text-sm text-muted-foreground">
              {latestByte.publishedOn}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
