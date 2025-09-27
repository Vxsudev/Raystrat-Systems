
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bytes } from '@/data/content';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FloatingTOC } from '@/components/ui/floating-toc';
import { format } from 'date-fns';
import { Lightbulb } from 'lucide-react';

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raystratsystems.com';
  const byteUrl = `${siteUrl}/bytes/${byte.slug}`;

  return {
    title: `${byte.title} | Raystrat Bytes`,
    description: byte.summary,
    alternates: {
      canonical: byteUrl,
    },
    openGraph: {
        title: byte.title,
        description: byte.summary,
        url: byteUrl,
        type: 'article',
        publishedTime: byte.publishedOn,
        authors: ['Raystrat Systems'],
    }
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
    /<h3(.*?)>(.*?)<\/h3>/g,
    (match, attributes, innerText) => {
      const id = slugify(innerText);
      if (!headings.find(h => h.id === id)) {
        headings.push({ id, title: innerText.replace(/<[^>]+>/g, '') });
      }
      return `<h3 id="${id}"${attributes}>${innerText}</h3>`;
    }
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raystratsystems.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/bytes/${byte.slug}`,
    },
    headline: byte.title,
    description: byte.summary,
    image: `${siteUrl}/og-image.png`, // A generic OG image
    author: {
        '@type': 'Organization',
        name: 'Raystrat Systems',
        url: siteUrl,
    },
    publisher: {
        '@type': 'Organization',
        name: 'Raystrat Systems',
        logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/icon.svg`, // Assuming you have a logo here
        },
    },
    datePublished: byte.publishedOn,
    dateModified: byte.publishedOn, // Assuming publishedOn is the last modified date for now
    articleBody: byte.content.replace(/<[^>]+>/g, ''), // Stripped HTML for articleBody
  };

  return (
    <>
    {/* Add JSON-LD to the head of the page */}
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">
              Byte-{String(bytes.indexOf(byte) + 1).padStart(2, '0')}
              </span>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
              {byte.title}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">
                Published by Raystrat Systems on {format(new Date(byte.publishedOn), 'MMMM d, yyyy')}
              </p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            {byte.aiSummary && (
                <div className="p-6 mb-12 rounded-lg bg-card border border-primary/30">
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                            <Lightbulb className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold font-headline">Key Takeaways</h2>
                            <p className="mt-1 text-base text-foreground/80">{byte.aiSummary}</p>
                        </div>
                    </div>
                </div>
            )}
            <article>
                <div
                    className="prose prose-invert prose-lg max-w-none text-foreground/80"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                />
            </article>
          </div>

        </div>
      </main>
      <FloatingTOC headings={headings} />
      <Footer />
    </div>
    </>
  );
}
