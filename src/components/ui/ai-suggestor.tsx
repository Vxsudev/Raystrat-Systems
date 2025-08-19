'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getAutomationSuggestion, SuggestionState } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          Get Suggestion <ArrowRight className="ml-2" />
        </>
      )}
    </Button>
  );
}

export function AiSuggestor() {
  const initialState: SuggestionState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(getAutomationSuggestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'Success') {
      formRef.current?.reset();
    }
    if (state.message && state.message !== 'Success' && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="max-w-3xl mx-auto">
      <form ref={formRef} action={dispatch} className="space-y-4">
        <Textarea
          name="contentBottleneckDescription"
          placeholder="e.g., 'We spend too much time manually following up on unpaid invoices' or 'I record a podcast but struggle to turn it into blog posts and social media content.'"
          className="min-h-[120px] text-base"
          required
        />
        {state.errors?.contentBottleneckDescription && (
          <p className="text-sm text-destructive">
            {state.errors.contentBottleneckDescription[0]}
          </p>
        )}
        <div className="flex justify-center">
          <SubmitButton />
        </div>
      </form>

      {state.data && (
        <Card className="mt-8 overflow-hidden border-2 border-primary bg-primary/5">
          <CardHeader className="flex-row items-center gap-4 p-4 border-b bg-primary/10">
            <Sparkles className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm font-medium text-primary">AI Recommendation</p>
              <CardTitle className="text-2xl font-bold font-headline">
                {state.data.suggestedService}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="font-semibold text-foreground">Why this service?</p>
            <p className="text-foreground/80">{state.data.reasoning}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
