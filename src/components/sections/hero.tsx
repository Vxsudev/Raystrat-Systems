
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

export function Hero() {
  return (
    <section id="top" className="w-full py-20 md:py-32 lg:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_minmax(0,1fr)]">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tighter font-headline sm:text-5xl md:text-6xl lg:text-7xl">
              Systems that <span className="text-primary">collect, convert, and deliver</span>.
            </h1>
            <p className="mt-6 text-lg text-foreground/80 md:text-xl">
              Five boring automations that cut wasted hours, recover cash, and open new revenue streams.
            </p>
            <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
              <Button size="lg" asChild>
                <Link href="mailto:audit@raystrat.com">
                  Book 15-min Audit <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline">
                    Download Playbook
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Download the Playbook</DialogTitle>
                    <DialogDescription>
                      Enter your details below to get immediate access to the playbook.
                    </DialogDescription>
                  </DialogHeader>
                  <PlaybookForm />
                </DialogContent>
              </Dialog>
            </div>
            <p className="mt-6 text-sm text-foreground/60">
              Preview from our automation command center dashboard.
            </p>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl">
              <div
                className="absolute -inset-6 rounded-3xl bg-primary/20 blur-3xl md:-inset-10"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] to-[#050505] p-3 shadow-[0_40px_120px_rgba(9,9,11,0.55)]">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <Image
                    src="/dashboard-hero.png"
                    alt="Automation dashboard highlighting performance metrics"
                    width={2588}
                    height={1606}
                    priority
                    className="h-auto w-full rounded-2xl"
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 520px, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <Marquee />
      </div>
    </section>
  );
}
