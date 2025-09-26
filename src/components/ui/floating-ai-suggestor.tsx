// src/components/ui/floating-ai-suggestor.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getServiceSuggestion, getContextualSuggestion, ServiceSuggestionState } from '@/app/actions';
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
import { ArrowRight, Loader2, Brain } from 'lucide-react';
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
  const [state, formAction] = useActionState<ServiceSuggestionState, FormData>(getServiceSuggestion, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [bottleneck, setBottleneck] = useState('');

  useEffect(() => {
    if (state?.data?.serviceSlug) {
      toast({
        title: 'Agent Found!',
        description: state.data.suggestion,
      });
      const noteParam = bottleneck ? `?note=${encodeURIComponent(bottleneck)}` : '';
      router.push(`/services/${state.data.serviceSlug}${noteParam}`);
      setIsOpen(false);
      formRef.current?.reset();
    } else if (state?.message && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, router, toast, bottleneck]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleFormAction = (formData: FormData) => {
    const bn = formData.get('bottleneck') as string;
    setBottleneck(bn);
    formAction(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <FloatingAiButton tooltipText="Have a bottleneck? I can suggest an agent." />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
           <div className="flex justify-center">
            <span className="text-5xl" role="img" aria-label="Brain">🧠</span>
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tighter font-headline sm:text-4xl">Find Your Agent</DialogTitle>
          <DialogDescription className="text-lg text-center text-foreground/80">
            Describe your single biggest business bottleneck, and we'll suggest the right agent to solve it.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={handleFormAction} className="space-y-4 pt-4">
          <Textarea
            name="bottleneck"
            placeholder="e.g., 'We waste too much time chasing unpaid invoices,' or 'Our leads are cold and unresponsive.'"
            className="min-h-[120px] text-base"
            required
            onKeyDown={handleKeyDown}
            disabled={state?.message === 'pending'}
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
  const [tooltipText, setTooltipText] = useState('Need help? I have context on this page.');
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

  useEffect(() => {
    // This effect runs on the client after mount to generate the dynamic tooltip.
    const h1 = document.querySelector('h1');
    if (pathname.startsWith('/services/') && h1) {
      setTooltipText(`Ask me how the ${h1.innerText} can help you.`);
    } else {
       setTooltipText('Need help? I have context on this page.');
    }
  }, [pathname]);


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <FloatingAiButton tooltipText={tooltipText} />
      <SheetContent className="sm:max-w-lg w-full flex flex-col">
        <SheetHeader className="text-center">
          <div className="flex justify-center">
             <span className="text-5xl" role="img" aria-label="Brain">🧠</span>
          </div>
          <SheetTitle className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">Raystrat Support Agent</SheetTitle>
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

function FloatingAiButton({ tooltipText }: { tooltipText: string }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const TriggerButton = (
    // The DialogTrigger is used for the homepage version, SheetTrigger for others.
    // We use a generic DialogTrigger here and let the parent control which component it's inside.
    <DialogTrigger asChild>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-40 animate-pulse bg-primary hover:bg-primary/90 hover:animate-none"
      >
        <span className="text-4xl" role="img" aria-label="Brain">🧠</span>
        <span className="sr-only">Open AI Assistant</span>
      </Button>
    </DialogTrigger>
  );

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
           {TriggerButton}
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


export function FloatingAiSuggestor() {
  const pathname = usePathname();

  if (pathname.startsWith('/services/')) {
    return <ContextualAssistant />;
  }
  if (pathname === '/') {
    return <AiServiceSuggester />;
  }
  // The suggestor is now removed from /bytes/ pages.
  // A new FloatingNoteTaker component will handle that route.
  return null;
}
