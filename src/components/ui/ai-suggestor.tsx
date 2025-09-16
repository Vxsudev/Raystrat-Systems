
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getAutomationSuggestion, SuggestionState } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl py-3 shadow-md transition h-auto text-base"
    >
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
  const [state, dispatch] = useActionState(getAutomationSuggestion, null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message === 'Success') {
      formRef.current?.reset();
    }
    if (state?.message && state.message !== 'Success' && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full">
      <form ref={formRef} action={dispatch} className="space-y-4">
        <Textarea
          name="contentBottleneckDescription"
          placeholder="Describe your bottleneck. e.g., 'Chasing unpaid invoices takes too much time,' or 'Finding qualified leads is a constant struggle.'"
          className="min-h-[120px] text-base bg-background/50 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30"
          required
        />
        {state?.errors?.contentBottleneckDescription && (
          <p className="text-sm text-destructive">
            {state.errors.contentBottleneckDescription[0]}
          </p>
        )}
        <div className="flex justify-center pt-2">
          <SubmitButton />
        </div>
      </form>

      {state?.data && (
        <Card className="mt-8 overflow-hidden border-2 border-primary bg-transparent shadow-lg shadow-primary/10">
           <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-xl -z-10"></div>
          <CardHeader className="flex-row items-center gap-4 p-4 border-b border-primary/20 bg-primary/10">
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
