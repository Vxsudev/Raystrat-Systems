// src/components/ui/floating-ai-suggestor.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { getContextualSuggestion, SuggestionState } from '@/app/actions';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ServiceSuggesterOutput, services, ContextualAssistantOutput } from '@/data/content';
import { AiSuggestor } from './ai-suggestor';

function FloatingTrigger({ onClick }: { onClick: () => void }) {
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
              <Sparkles className="h-7 w-7" />
              <span className="sr-only">AI</span>
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
          <p className="font-semibold">Have a bottleneck? I can help.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


export function FloatingAiSuggestor() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  
  const isServicePage = pathname.startsWith('/services/');
  const isHomePage = pathname === '/';
  const isBytesPage = pathname.startsWith('/bytes');

  const slug = isServicePage ? pathname.split('/').pop() : undefined;
  const currentService = services.find(s => s.slug === slug);

  useEffect(() => {
    if (isOpen && isServicePage) {
      setPageTitle(document.title);
      // A simple way to get some text content from the page.
      // A more robust solution might use a dedicated library or more specific selectors.
      const contentElement = document.querySelector('article');
      setPageContent(contentElement?.innerText.substring(0, 2000) || '');
    } else {
        setPageTitle('');
        setPageContent('');
    }
  }, [isOpen, pathname, isServicePage]);

  const onSuggestionSuccess = (data: ServiceSuggesterOutput | ContextualAssistantOutput) => {
    // Check if the data is a service suggestion (from homepage)
    if ('suggestedServiceSlug' in data && !('response' in data)) {
        const suggestion = data as ServiceSuggesterOutput;
        const query = (document.querySelector('input[name="query"]') as HTMLInputElement)?.value || '';

        toast({
            title: 'Agent Found!',
            description: suggestion.justification,
        });
        const noteParam = query ? `?note=${encodeURIComponent(query)}` : '';
        router.push(`/services/${suggestion.suggestedServiceSlug}${noteParam}`);
        setIsOpen(false);
    }
    // If it's a contextual response, we don't need to do anything here as it's handled in the conversation UI.
  };
  
  if (isBytesPage) {
      return null;
  }
  
  const aiSuggestorComponent = (
    <AiSuggestor 
        pageTitle={pageTitle} 
        pageContent={pageContent}
        service={currentService}
        onNavigate={() => setIsOpen(false)}
        onSuccess={onSuggestionSuccess}
    />
  );
  
  // Render a Sheet (sidebar) for service pages, and a Dialog for all other applicable pages.
  if (isServicePage) {
    return (
        <>
            <FloatingTrigger onClick={() => setIsOpen(true)} />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="w-full sm:max-w-sm flex flex-col p-0">
                   <SheetHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                        <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                           <Sparkles className="w-6 h-6 text-primary" />
                           Agent Assist
                        </SheetTitle>
                        <SheetClose />
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto p-4">
                        {aiSuggestorComponent}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <FloatingTrigger onClick={() => setIsOpen(true)} />
      <DialogContent className="sm:max-w-lg h-[60vh] flex flex-col">
        <DialogHeader>
          <div className="flex justify-center">
              <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tighter font-headline sm:text-4xl">Agent Assist</DialogTitle>
          <DialogDescription className="text-lg text-center text-foreground/80">
            {isServicePage
                ? "I have on-page context. Ask me anything about the agent you are exploring."
                : "Describe your biggest business bottleneck, and I'll suggest the right agent to solve it."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
            {aiSuggestorComponent}
        </div>
      </DialogContent>
    </Dialog>
  );
}
