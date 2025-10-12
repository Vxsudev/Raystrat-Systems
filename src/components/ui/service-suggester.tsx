
// src/components/ui/service-suggester.tsx
'use client';

import React, { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bot, Loader2, BrainCircuit } from 'lucide-react';
import { suggestServiceAction, ServiceSuggestionState } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { ServiceSuggesterOutput } from '@/ai/flows/service-suggester';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          Get Suggestion <Bot className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

function FloatingTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      id="service-suggester-trigger"
      className="fixed bottom-6 right-6 h-14 rounded-full shadow-2xl z-40 bg-background/80 backdrop-blur-sm border-primary/30 group hover:border-primary"
      onClick={onClick}
    >
      <BrainCircuit className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
      <span className="ml-2 font-semibold hidden sm:inline">Suggest an Agent</span>
    </Button>
  );
}

export function ServiceSuggester() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const [state, formAction] = useActionState<ServiceSuggestionState, FormData>(suggestServiceAction, {
    message: null,
    errors: {},
    data: null,
  });

  const [suggestion, setSuggestion] = useState<ServiceSuggesterOutput | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  // Automatically open the dialog on the homepage after a delay
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenSuggesterPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenSuggesterPopup', 'true');
      }, 30000); // 30-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form when closing the dialog
      formRef.current?.reset();
      setSuggestion(null);
    }
  };

  useEffect(() => {
    if (state.message === 'Success' && state.data) {
      const suggestionData = state.data as ServiceSuggesterOutput;
      setSuggestion(suggestionData);

      toast({
        title: 'Agent Found!',
        description: suggestionData.justification,
      });

      const note = (formRef.current?.elements.namedItem('bottleneck') as HTMLInputElement)?.value || '';
      router.push(`/services/${suggestionData.suggestedServiceSlug}?note=${encodeURIComponent(note)}`);
      
      // Delay closing to allow user to see the change
      setTimeout(() => handleOpenChange(false), 500);
    }
  }, [state, router, toast]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <>
      <FloatingTrigger onClick={() => setIsOpen(true)} />
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent id="service-suggester-container" className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-headline">
              <Bot className="h-6 w-6 text-primary" />
              AI-Powered Agent Suggester
            </DialogTitle>
            <DialogDescription>
              Describe your biggest business bottleneck, and our AI will recommend the best agent to solve it.
            </DialogDescription>
          </DialogHeader>

          {suggestion ? (
            <div className="py-4 text-center">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
              <p className="mt-4 font-semibold">Suggestion Found: {suggestion.suggestedServiceTitle}</p>
              <p className="text-sm text-muted-foreground">Redirecting you now...</p>
            </div>
          ) : (
            <form ref={formRef} action={formAction} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bottleneck">What is your primary business challenge?</Label>
                <Textarea
                  id="bottleneck"
                  name="bottleneck"
                  placeholder="e.g., 'We spend too much time chasing unpaid invoices,' or 'Our team can't keep up with customer support tickets.'"
                  className="min-h-[100px]"
                  required
                  onKeyDown={handleKeyDown}
                />
                {state.errors?.problemDescription && (
                  <p className="text-sm text-destructive">{state.errors.problemDescription[0]}</p>
                )}
                {state.errors?.general && (
                    <p className="text-sm text-destructive">{state.errors.general[0]}</p>
                )}
              </div>
              <div className="pt-2">
                <SubmitButton />
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
