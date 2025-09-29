// src/components/ui/floating-ai-suggestor.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getServiceSuggestionAction, ServiceSuggestionState } from '@/app/actions';
import { cn } from '@/lib/utils';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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

function FloatingAiButton({ tooltipText }: { tooltipText: string }) {
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
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<ServiceSuggestionState, FormData>(getServiceSuggestionAction, { message: null });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [bottleneck, setBottleneck] = useState('');
  
  const isServicePage = pathname.startsWith('/services/');
  const isHomePage = pathname === '/';
  
  const [tooltipText, setTooltipText] = useState('Have a bottleneck? I can suggest an agent.');
  
    useEffect(() => {
    // This effect runs on the client after mount to generate the dynamic tooltip.
    const h1 = document.querySelector('h1');
    if (isServicePage && h1) {
      setTooltipText(`Ask me how the ${h1.innerText} can help you.`);
    } else {
       setTooltipText('Have a bottleneck? I can suggest an agent.');
    }
  }, [pathname, isServicePage]);


  useEffect(() => {
    if (state?.message === 'Success' && state.data) {
      toast({
        title: 'Agent Found!',
        description: state.data.justification,
      });
      const noteParam = bottleneck ? `?note=${encodeURIComponent(bottleneck)}` : '';
      router.push(`/services/${state.data.suggestedServiceSlug}${noteParam}`);
      setIsOpen(false);
      formRef.current?.reset();
    } else if (state?.message === 'Error') {
      const errorMessage = state.errors?.bottleneck?.[0] || 'An unknown error occurred.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [state, router, toast, bottleneck]);

  const handleFormAction = (formData: FormData) => {
    const bn = formData.get('bottleneck') as string;
    setBottleneck(bn);
    formAction(formData);
  };
  
  if (!isHomePage && !isServicePage) {
      return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <FloatingAiButton tooltipText={tooltipText} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
           <div className="flex justify-center">
            <span className="text-5xl" role="img" aria-label="Brain">🧠</span>
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tighter font-headline sm:text-4xl">Find Your Agent</DialogTitle>
          <DialogDescription className="text-lg text-center text-foreground/80">
            {isServicePage 
                ? "Ask a question about this agent or describe your problem."
                : "Describe your single biggest business bottleneck, and we'll suggest the right agent to solve it."
            }
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={handleFormAction} className="space-y-4 pt-4">
          <Textarea
            name="bottleneck"
            placeholder={isServicePage
                ? "e.g., 'How does this integrate with my existing CRM?' or 'Can this handle international invoicing?'"
                : "e.g., 'We waste too much time chasing unpaid invoices,' or 'Our leads are cold and unresponsive.'"
            }
            className="min-h-[120px] text-base"
            required
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
