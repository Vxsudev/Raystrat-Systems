import { ContactForm } from '@/components/ui/contact-form';

export function Contact() {
  return (
    <section id="contact" className="w-full bg-secondary">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
            Start the Conversation.
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
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
