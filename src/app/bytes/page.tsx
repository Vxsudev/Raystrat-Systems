import { Metadata } from 'next';
import { bytes } from '@/data/content';
import { ByteCard } from '@/components/ui/byte-card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Raystrat Bytes: Atomic Insights in Automation',
  description: 'Short, potent articles on automation and conversion engineering from Raystrat Systems.',
};

export default function BytesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Raystrat Bytes
              </h1>
              <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                Precision Insights in AI & Automation. Small Reads, Big Impact.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {bytes.map((byte, index) => (
                <ByteCard key={byte.slug} byte={byte} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
