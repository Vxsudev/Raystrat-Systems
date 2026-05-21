import { AiSuggestor } from '@/components/ui/ai-suggestor';
import { Lightbulb } from 'lucide-react';

export function AiSuggestorSection() {
  return (
    <section id="ai-suggestor" className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
            Unsure Where To Start?
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Describe your biggest content or operational bottleneck, and our AI will suggest the most impactful automation for your business.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg border-t-2 border-primary py-8 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-2xl -z-10"></div>
          <AiSuggestor />
        </div>
      </div>
    </section>
  );
}
