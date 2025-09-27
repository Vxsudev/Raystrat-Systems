// src/components/ui/floating-toc.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { List } from 'lucide-react';

interface FloatingTOCProps {
  headings: { id: string; title: string }[];
}

export function FloatingTOC({ headings }: FloatingTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-2xl z-40 bg-primary hover:bg-primary/90"
        >
          <List className="h-6 w-6" />
          <span className="sr-only">Open Table of Contents</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs w-full flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold font-headline">On This Page</SheetTitle>
        </SheetHeader>
        <div className="py-4 flex-1 overflow-y-auto">
          <ul className="space-y-3">
            {headings.map((heading) => (
              <li key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-muted-foreground transition-colors hover:text-foreground hover:font-medium text-lg"
                >
                  {heading.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
