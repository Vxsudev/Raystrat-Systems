import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faq } from '@/data/content';

export function Faq() {
  return (
    <section id="faq" className="container">
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
          Frequently Asked Questions<span className="text-primary">.</span>
        </h2>
        <p className="mt-4 text-lg text-foreground/80">
          Clear answers to common inquiries about our process and services.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faq.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
