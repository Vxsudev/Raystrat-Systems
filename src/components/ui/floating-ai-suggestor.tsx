
// src/components/ui/floating-ai-suggestor.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Brain } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ServiceSuggesterOutput } from '@/ai/flows/service-suggester';
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
              <span className="text-4xl" role="img" aria-label="Brain">🧠</span>
              <span className="sr-only">Open AI Assistant</span>
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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  
  const isServicePage = pathname.startsWith('/services/');
  const isBytesPage = pathname.startsWith('/bytes/');
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isOpen && (isServicePage || isBytesPage)) {
      setPageTitle(document.title);
      // A simple way to get some text content from the page.
      // A more robust solution might use a dedicated library or more specific selectors.
      const contentElement = document.querySelector('article');
      setPageContent(contentElement?.innerText.substring(0, 2000) || '');
    } else {
        setPageTitle('');
        setPageContent('');
    }
  }, [isOpen, pathname, isServicePage, isBytesPage]);

  const onSuggestionSuccess = (state: SuggestionState) => {
    if (state.message === 'Success' && state.data) {
        // Check if the data is a service suggestion
        if ('suggestedServiceSlug' in state.data) {
            const suggestion = state.data as ServiceSuggesterOutput;
            const query = (document.querySelector('textarea[name="query"]') as HTMLTextAreaElement)?.value || '';

            toast({
                title: 'Agent Found!',
                description: suggestion.justification,
            });
            const noteParam = query ? `?note=${encodeURIComponent(query)}` : '';
            router.push(`/services/${suggestion.suggestedServiceSlug}${noteParam}`);
            setIsOpen(false);
        }
    } else if (state.message === 'Error') {
        const errorMessage = state.errors?.general?.join(', ') || 'An unknown error occurred.';
        toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
        });
    }
  };
  
  if (!isHomePage && !isServicePage && !isBytesPage) {
      return null;
  }

  const commonHeader = (
      <>
        <div className="flex justify-center">
            <span className="text-5xl" role="img" aria-label="Brain">🧠</span>
        </div>
        <DialogTitle className="text-3xl text-center font-bold tracking-tighter font-headline sm:text-4xl">AI Assistant</DialogTitle>
        <DialogDescription className="text-lg text-center text-foreground/80">
            {isServicePage || isBytesPage
                ? "Ask a question about this page, or describe a problem."
                : "Describe your biggest business bottleneck, and I'll suggest the right agent to solve it."
            }
        </DialogDescription>
      </>
  );

  const aiSuggestorComponent = (
    <AiSuggestor 
        pageTitle={pageTitle} 
        pageContent={pageContent} 
        onSuggestionSuccess={onSuggestionSuccess}
    />
  );
  
  // Render a Sheet (sidebar) for service pages, and a Dialog for all other applicable pages.
  if (isServicePage) {
    return (
        <>
            <FloatingTrigger onClick={() => setIsOpen(true)} />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetContent className="sm:max-w-lg w-full flex flex-col">
                <SheetHeader>
                   {commonHeader}
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
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
           {commonHeader}
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
            {aiSuggestorComponent}
        </div>
      </DialogContent>
    </Dialog>
  );
}
