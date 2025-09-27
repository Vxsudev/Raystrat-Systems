
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bytes } from '@/data/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ByteNotesTaker } from '@/components/ui/byte-notes-taker';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface BytePageProps {
  params: {
    slug: string;
  };
}

// Function to generate a URL-friendly slug from a string
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // remove html tags
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple - with single -
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, ''); // trim - from end of text

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

  // --- Logic to generate Table of Contents ---
  const headings: { id: string; title: string }[] = [];
  const processedContent = byte.content.replace(
    /<h2(.*?)>(.*?)<\/h2>/g,
    (match, attributes, innerText) => {
      const id = slugify(innerText);
      if (!headings.find(h => h.id === id)) {
        headings.push({ id, title: innerText.replace(/<[^>]+>/g, '') });
      }
      return `<h2 id="${id}"${attributes}>${innerText}</h2>`;
    }
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-16 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
                 <header className="mb-8">
                    <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                    Byte-{String(bytes.indexOf(byte) + 1).padStart(2, '0')}
                    </span>
                    <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                    {byte.title}
                    </h1>
                </header>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
                 {/* Table of Contents Sidebar */}
                <aside className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24">
                        <h3 className="text-lg font-semibold tracking-tight font-headline">On This Page</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                        {headings.map((heading) => (
                            <li key={heading.id}>
                            <Link 
                                href={`#${heading.id}`}
                                className="text-muted-foreground transition-colors hover:text-foreground hover:font-medium"
                            >
                                {heading.title}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Article Content */}
                <article className="lg:col-span-9">
                    <div
                        className="prose prose-invert prose-lg max-w-none mx-auto text-foreground/80"
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                </article>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
