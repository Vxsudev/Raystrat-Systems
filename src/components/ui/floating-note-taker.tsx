// src/components/ui/floating-note-taker.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { NotebookText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ByteNotesTaker } from './byte-notes-taker';

function FloatingNotepadButton({
  tooltipText,
  onClick,
}: {
  tooltipText: string;
  onClick: () => void;
}) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooltipOpen(true);
      const closeTimer = setTimeout(() => setIsTooltipOpen(false), 4000);
      return () => clearTimeout(closeTimer);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-40 animate-pulse bg-primary hover:bg-primary/90 hover:animate-none"
            onClick={onClick}
          >
            <NotebookText className="w-7 h-7" />
            <span className="sr-only">Open Notepad</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className={cn(
            'bg-card border-primary text-foreground shadow-lg',
            'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=delayed-open]:zoom-in-95'
          )}
        >
          <p className="font-semibold">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function FloatingNoteTaker() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentByteTitle, setCurrentByteTitle] = useState('Note');

  useEffect(() => {
    if (pathname.startsWith('/bytes/')) {
      const h1 = document.querySelector('h1');
      if (h1) {
        setCurrentByteTitle(`Byte: ${h1.innerText}`);
      }
    }
  }, [pathname]);

  if (!pathname.startsWith('/bytes/')) {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <FloatingNotepadButton
          tooltipText="Save ideas. Click to open your private notepad."
          onClick={() => setIsOpen(true)}
        />
      )}
      <ByteNotesTaker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceName={currentByteTitle}
      />
    </>
  );
}
