
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/data/content';
import { PlaybookForm } from './ui/playbook-form';
import { CalendlyButton } from './ui/calendly-button';
import { ThemeToggle } from './ui/theme-toggle';

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <>
      {navigationLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-lg font-medium transition-colors text-foreground/80 hover:text-foreground md:text-sm"
        >
          {link.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/80 backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex items-center h-16">
        <Link href="/" className="flex items-center gap-3 mr-8">
           <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-lg font-bold font-headline">Raystrat Systems</span>
        </Link>
        <nav className="items-center hidden gap-6 md:flex">{navLinks}</nav>
        <div className="flex items-center justify-end flex-1 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
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
          <CalendlyButton size="sm" className="hidden md:inline-flex" />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="flex flex-col gap-8 p-6 pt-12">
                {navLinks}
                <div className="flex flex-col gap-4 pt-8 border-t border-border">
                   <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
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
                  <CalendlyButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
