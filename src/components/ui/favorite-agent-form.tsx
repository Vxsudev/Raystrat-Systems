// src/components/ui/favorite-agent-form.tsx
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { favoriteAgentAction, FavoriteAgentState } from '@/app/actions';
import { Label } from './label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Follow-up Email
    </Button>
  );
}

interface FavoriteAgentFormProps {
    agentName: string;
    agentSlug: string;
    onSuccess?: () => void;
}

export function FavoriteAgentForm({ agentName, agentSlug, onSuccess }: FavoriteAgentFormProps) {
  const [state, formAction] = useActionState(favoriteAgentAction, { message: null, errors: {} });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (state?.message === 'Success! Check your email for next steps.') {
      toast({
        title: 'Thank You!',
        description: "We've sent a follow-up email with next steps to your inbox.",
      });
      setIsSubmitted(true);
      if(onSuccess) onSuccess();
      formRef.current?.reset();
    } else if (state?.message && state.message !== 'Invalid input.') {
        toast({
            title: 'Error',
            description: state.message,
            variant: 'destructive',
        });
    }
  }, [state, toast, onSuccess]);
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
        <div className="py-8 text-center">
            <h3 className="text-xl font-bold">Email Sent!</h3>
            <p className="text-muted-foreground mt-2">Check your inbox for the next steps to book your demo.</p>
        </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4 py-4">
        <input type="hidden" name="agentName" value={agentName} />
        <input type="hidden" name="agentSlug" value={agentSlug} />
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="e.g. Jane Doe" required />
        {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
      </div>

       <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="e.g. jane.doe@example.com" required />
        {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
      </div>
      
      <SubmitButton />
    </form>
  );
}
