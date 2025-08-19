import { ContactForm } from '@/components/ui/contact-form';

export function Contact() {
  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="container relative">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
            Start the Conversation.
          </h2>
          <div className="h-0.5 w-12 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="mt-2 text-base max-w-md mx-auto text-foreground/60">
            Ready to eliminate bottlenecks? Reach out and let&apos;s discuss how we can help.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
