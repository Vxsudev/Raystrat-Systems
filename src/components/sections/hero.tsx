
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Marquee } from '@/components/ui/marquee';
import { ArrowRight } from 'lucide-react';
import { PlaybookForm } from '../ui/playbook-form';
import { DynamicHeadline } from '../ui/dynamic-headline';

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-transparent py-16 md:py-24 overflow-hidden">
      <div className="w-full container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold font-headline sm:text-6xl md:text-7xl text-foreground text-shadow-none">
                    Agents Run<br/>
                    <DynamicHeadline />
                </h1>
                <p className="mx-auto md:mx-0 mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
                    Most losses trace back to the same five systems. Our agents run them with discipline so you can focus on what matters.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start mt-8 gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto text-lg h-auto">
                        <Link href="#services">
                            Explore The Agents <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Right Column */}
            <div className="relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-slower"></div>
                 <Image
                    src="/dashboard-hero.png"
                    alt="Analytics Dashboard"
                    width={800}
                    height={600}
                    className="rounded-2xl object-cover"
                    priority
                />
            </div>
        </div>
      </div>
    </section>
  );
}
