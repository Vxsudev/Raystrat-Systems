
// src/components/ui/byte-card.tsx
import Link from 'next/link';
import { Card } from './card';

interface Byte {
  slug: string;
  title: string;
  summary: string;
}

interface ByteCardProps {
  byte: Byte;
  index: number;
}

export function ByteCard({ byte, index }: ByteCardProps) {
  return (
    <Link href={`/bytes/${byte.slug}`} className="block group">
      <Card className="flex flex-col h-full p-6 transition-all duration-300 border-2 rounded-2xl border-border/80 bg-card hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
        <div className="flex-1">
          <p className="mb-2 text-sm font-semibold tracking-widest uppercase text-primary font-headline">
            Byte-{String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mb-3 text-2xl font-bold font-headline">
            {byte.title}
          </h3>
          <p className="text-base text-foreground/80">
            {byte.summary}
          </p>
        </div>
        <div className="pt-4 mt-auto">
          <div className="w-full h-1 transition-all duration-300 rounded-full bg-border group-hover:bg-primary" />
        </div>
      </Card>
    </Link>
  );
}
