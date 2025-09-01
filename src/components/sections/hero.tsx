
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
import { marqueeStats } from '@/data/content';
import { ArrowRight } from 'lucide-react';
import { PlaybookForm } from '../ui/playbook-form';

export function Hero() {
  return (
    <section id="top" className="w-full py-20 md:py-32 lg:py-48">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Systems that <span className="text-primary">collect, convert, and deliver</span>.
          </h1>
          <p className="mt-4 text-lg text-foreground/80 md:text-xl">
            Five boring automations that cut wasted hours, recover cash, and open new revenue streams.
          </p>
          <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/book-audit">
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
        </div>
      </div>
      <div className="mt-24">
        <Marquee items={marqueeStats} />
      </div>
    </section>
  );
}
