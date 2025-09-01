import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { AiSuggestorSection } from '@/components/sections/ai-suggestor-section';
import { Results } from '@/components/sections/results';
import { Pricing } from '@/components/sections/pricing';
import { Faq } from '@/components/sections/faq';
import { Footer } from '@/components/footer';
import { ClientOnly } from '@/components/ui/client-only';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main className="flex-1">
        <Hero />
        <Services />
        <AiSuggestorSection />
        <Results />
        <Pricing />
        <Faq />
      </main>
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  );
}
