
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bytes } from '@/data/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ByteNotesTaker } from '@/components/ui/byte-notes-taker';
import { Separator } from '@/components/ui/separator';

interface BytePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BytePageProps): Promise<Metadata> {
  const byte = bytes.find((p) => p.slug === params.slug);

  if (!byte) {
    return {};
  }

  return {
    title: `${byte.title} | Raystrat Bytes`,
    description: byte.summary,
  };
}

export default function BytePage({ params }: BytePageProps) {
  const byte = bytes.find((p) => p.slug === params.slug);

  if (!byte) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <article className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <header className="mb-8 text-center">
                  <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                  Byte-{String(bytes.indexOf(byte) + 1).padStart(2, '0')}
                  </span>
                  <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                  {byte.title}
                  </h1>
              </header>
              <div
                className="prose prose-invert prose-lg max-w-none mx-auto text-foreground/80"
                dangerouslySetInnerHTML={{ __html: byte.content }}
              />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
