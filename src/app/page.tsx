import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { AiSuggestorSection } from '@/components/sections/ai-suggestor-section';
import { Results } from '@/components/sections/results';
import { Pricing } from '@/components/sections/pricing';
import { Faq } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { ClientOnly } from '@/components/ui/client-only';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
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
        <Contact />
      </main>
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </div>
  );
}
