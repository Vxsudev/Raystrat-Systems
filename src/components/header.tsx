'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bot, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/data/content';

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
          className="text-sm font-medium transition-colors text-foreground/80 hover:text-foreground"
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
        <Link href="/" className="flex items-center gap-2 mr-8">
          <Bot className="w-6 h-6 text-primary" />
          <span className="font-bold font-headline">Raystrat</span>
        </Link>
        <nav className="items-center hidden gap-6 md:flex">{navLinks}</nav>
        <div className="flex items-center justify-end flex-1 gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/playbook.pdf" target="_blank">Download Playbook</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="mailto:audit@raystrat.com">Book 15-min Audit</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6 pt-12">
                {navLinks}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
