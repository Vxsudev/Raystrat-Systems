
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="top" className="w-full min-h-screen flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-headline md:text-7xl text-white">
            Agents Run Business.
          </h1>
          <h2 className="mt-4 font-medium text-2xl md:text-3xl font-headline text-primary">
            AI isn’t the future — it’s the present. Wake up.
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-gray-300">
            Most losses trace back to the same five systems — 
            leads, follow-up, support, operations, and data. 
            Our agents run them with discipline.
          </p>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary px-6 py-3 rounded-2xl hover:bg-[#1a1a1a] transition h-auto">
                <Link href="#services">See The Five Agents</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
