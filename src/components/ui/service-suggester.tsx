// src/components/ui/service-suggester.tsx
'use client';

import React, { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bot, Loader2, ArrowRight, BrainCircuit } from 'lucide-react';
import { getServiceSuggestion, ServiceSuggestionState } from '@/app/actions';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from './alert';

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
  const [state, formAction] = useActionState<ServiceSuggestionState, FormData>(getServiceSuggestion, {
    message: null,
    errors: {},
    data: null,
  });

  // Automatically open the dialog on the homepage after a delay
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenSuggesterPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenSuggesterPopup', 'true');
      }, 3000); // 3-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const resetForm = () => {
    // A bit of a hack to reset the action state
    formAction(new FormData());
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when closing the dialog
      setTimeout(resetForm, 300);
    }
  };

  return (
    <>
      <FloatingTrigger onClick={() => setIsOpen(true)} />
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-headline">
              <Bot className="h-6 w-6 text-primary" />
              AI-Powered Agent Suggester
            </DialogTitle>
            <DialogDescription>
              Describe your biggest business bottleneck, and our AI will recommend the best agent to solve it.
            </DialogDescription>
          </DialogHeader>

          {state.message === 'Success' && state.data ? (
            <div className="py-4 space-y-4">
              <Alert>
                <BrainCircuit className="h-4 w-4" />
                <AlertTitle className="font-bold">Recommendation: {state.data.suggestedServiceTitle}</AlertTitle>
                <AlertDescription>
                  {state.data.justification}
                </AlertDescription>
              </Alert>
              <DialogFooter className="gap-2 sm:justify-end">
                <Button variant="outline" onClick={() => handleOpenChange(false)}>
                  Close
                </Button>
                <Button asChild>
                  <Link href={`/services/${state.data.suggestedServiceSlug}`}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <form action={formAction} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="problemDescription">What is your primary business challenge?</Label>
                <Textarea
                  id="problemDescription"
                  name="problemDescription"
                  placeholder="e.g., 'We spend too much time chasing unpaid invoices,' or 'Our team can't keep up with customer support tickets.'"
                  className="min-h-[100px]"
                  required
                />
                {state.errors?.problemDescription && (
                  <p className="text-sm text-destructive">{state.errors.problemDescription[0]}</p>
                )}
                {state.errors?.general && (
                    <p className="text-sm text-destructive">{state.errors.general[0]}</p>
                )}
              </div>
              <DialogFooter>
                <SubmitButton />
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
