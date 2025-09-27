// src/components/ui/byte-card.tsx
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

interface Byte {
  slug: string;
  title: string;
  summary: string;
  aiSummary: string;
  publishedOn: string;
  readTime: number;
}

interface ByteCardProps {
  byte: Byte;
  index: number;
}

export function ByteCard({ byte, index }: ByteCardProps) {
  return (
    <Link href={`/bytes/${byte.slug}`} className="block group">
      <Card className="flex flex-col h-full p-6 transition-all duration-300 rounded-2xl bg-card hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
        <CardHeader className="p-0">
          <p className="mb-2 text-sm font-semibold tracking-widest uppercase text-primary font-headline">
            Byte-{String(index + 1).padStart(2, '0')}
          </p>
          <CardTitle className="mb-3 text-2xl font-bold font-headline group-hover:text-primary transition-colors">
            {byte.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0">
            <div className="prose prose-invert prose-sm max-w-none text-foreground/80 my-4">
                <h4 className="font-bold text-foreground/90 !mb-2">Key Takeaways:</h4>
                <ReactMarkdown 
                  components={{
                    ul: ({ node, ...props }) => <ul className="!my-0" {...props} />,
                    li: ({ node, ...props }) => <li className="!my-1" {...props} />,
                  }}
                >
                    {byte.aiSummary}
                </ReactMarkdown>
            </div>
        </CardContent>

        <div className="pt-4 mt-auto">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                 <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{byte.readTime} min read</span>
                </div>
                 <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(byte.publishedOn), 'MMM d, yyyy')}</span>
                </div>
            </div>
          <div className="font-semibold text-primary group-hover:underline flex items-center">
            Read Now <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
