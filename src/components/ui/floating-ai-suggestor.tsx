// src/components/ui/floating-ai-suggestor.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getServiceSuggestion, getContextualSuggestion } from '@/app/actions';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Lightbulb, Bot, ArrowRight, Loader2, Sparkles, Brain } from 'lucide-react';
import { AiSuggestor } from '@/components/ui/ai-suggestor';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// --- AI Suggester for Homepage ---

function ServiceSuggesterSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 animate-spin" />
          Finding Agent...
        </>
      ) : (
        <>
          Suggest an Agent <ArrowRight className="ml-2" />
        </>
      )}
    </Button>
  );
}

function AiServiceSuggester() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(getServiceSuggestion, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.data?.serviceSlug) {
      toast({
        title: 'Agent Found!',
        description: state.data.suggestion,
      });
      router.push(`/services/${state.data.serviceSlug}`);
      setIsOpen(false);
      formRef.current?.reset();
    } else if (state?.message && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, router, toast]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isPending) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <FloatingAiButton />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
           <div className="flex justify-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tighter font-headline sm:text-4xl">Find Your Agent</DialogTitle>
          <DialogDescription className="text-lg text-center text-foreground/80">
            Describe your single biggest business bottleneck, and we'll suggest the right agent to solve it.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4 pt-4">
          <Textarea
            name="bottleneck"
            placeholder="e.g., 'We waste too much time chasing unpaid invoices,' or 'Our leads are cold and unresponsive.'"
            className="min-h-[120px] text-base"
            required
            onKeyDown={handleKeyDown}
            disabled={isPending}
          />
          {state?.errors?.bottleneck && (
            <p className="text-sm text-destructive">
              {state.errors.bottleneck[0]}
            </p>
          )}
          <div className="flex justify-center pt-2">
            <ServiceSuggesterSubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- Contextual AI Assistant for Content Pages ---

function ContextualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageContext, setPageContext] = useState({ title: '', content: '' });
  const pathname = usePathname();

  const getPageContent = () => {
    if (typeof window === 'undefined') return '';
    const mainElement = document.querySelector('main');
    return mainElement?.innerText.substring(0, 4000) || '';
  };

  useEffect(() => {
    if (isOpen) {
      setPageContext({
        title: document.title,
        content: getPageContent(),
      });
    }
  }, [isOpen, pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <FloatingAiButton />
      <SheetContent className="sm:max-w-lg w-full flex flex-col">
        <SheetHeader className="text-center">
          <div className="flex justify-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
          </div>
          <SheetTitle className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">Raystrat AI Assistant</SheetTitle>
          <SheetDescription className="text-lg text-foreground/80">
            I have context on this page. How can I help you strategize?
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-2 mt-4 flex-1 flex flex-col min-h-0">
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

// --- Shared Floating Button and Logic ---

function FloatingAiButton() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooltipOpen(true);
      const closeTimer = setTimeout(() => setIsTooltipOpen(false), 4000);
      return () => clearTimeout(closeTimer);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const TriggerButton = (
    <Button
      variant="default"
      size="icon"
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-40 animate-pulse bg-primary hover:bg-primary/90 hover:animate-none"
    >
      <Brain className="h-7 w-7 text-primary-foreground" />
      <span className="sr-only">Open AI Assistant</span>
    </Button>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
           <DialogTrigger asChild>
            {TriggerButton}
           </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className={cn(
            'bg-card border-primary text-foreground shadow-lg',
            'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=delayed-open]:zoom-in-95'
          )}
        >
          <p className="font-semibold">Need help? Our AI can guide you.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function FloatingAiSuggestor() {
  const pathname = usePathname();

  if (pathname.startsWith('/services/') || pathname.startsWith('/bytes/')) {
    return <ContextualAssistant />;
  }
  if (pathname === '/') {
    return <AiServiceSuggester />;
  }
  return null;
}
