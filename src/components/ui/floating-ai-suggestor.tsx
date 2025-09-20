
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Lightbulb, Bot } from 'lucide-react';
import { AiSuggestor } from './ai-suggestor';
import { cn } from '@/lib/utils';

// Helper to get text content from the main content area of the page
const getPageContent = () => {
    if (typeof window === 'undefined') return '';
    const mainElement = document.querySelector('main');
    return mainElement?.innerText.substring(0, 4000) || ''; // Limit context size
}

export function FloatingAiSuggestor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [pageContext, setPageContext] = useState({ title: '', content: '' });
  const pathname = usePathname();

  useEffect(() => {
    // Show the tooltip on initial load for a few seconds to onboard the user
    const timer = setTimeout(() => {
      setIsTooltipOpen(true);
      const closeTimer = setTimeout(() => setIsTooltipOpen(false), 4000);
      return () => clearTimeout(closeTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update context whenever the sheet opens or path changes
    if (isOpen) {
      setPageContext({
        title: document.title,
        content: getPageContent(),
      });
    }
  }, [isOpen, pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={200}>
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-40 animate-pulse bg-primary hover:bg-primary/90 hover:animate-none"
              >
                <Bot className="h-8 w-8 text-primary-foreground" />
                <span className="sr-only">Open AI Assistant</span>
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className={cn(
              'bg-card border-primary text-foreground shadow-lg',
              'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=delayed-open]:zoom-in-95'
            )}
          >
            <p className="font-semibold">Psst! I'm context-aware. Ask me anything.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent className="sm:max-w-lg w-full">
        <SheetHeader className="text-center">
          <div className="flex justify-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
          </div>
          <SheetTitle className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">Raystrat AI Assistant</SheetTitle>
          <SheetDescription className="text-lg text-foreground/80">
            I have context on this page. How can I help you strategize?
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-2 mt-4">
          <AiSuggestor
            pageTitle={pageContext.title}
            pageContent={pageContext.content}
            onSuggestionClick={() => setIsOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

