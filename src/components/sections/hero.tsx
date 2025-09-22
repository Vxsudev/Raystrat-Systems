
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { DynamicHeadline } from '@/components/ui/dynamic-headline';

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-transparent py-24 md:py-32 overflow-hidden">
      <div className="w-full container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="text-center md:text-left md:col-span-3">
            <h1 className="text-4xl font-bold font-headline sm:text-5xl md:text-6xl text-foreground">
              Agents Run<br />
              <DynamicHeadline />
            </h1>
            <p className="mx-auto md:mx-0 mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Real-time performance for your automated sequences. Install once, watch replies and bookings compound.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start mt-8 gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-lg h-auto">
                <Link href="#services">
                  Explore The Agents <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center md:col-span-2">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-slower" />
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxEYXNoYm9hcmR8ZW58MHx8fHwxNzU4NTM4NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Follow-Up Agent Dashboard — analytics preview"
              width={800}
              height={600}
              className="rounded-2xl object-cover ring-1 ring-border/40 shadow-2xl transition-all duration-300 hover:scale-105"
              priority
              data-ai-hint="dashboard analytics"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
