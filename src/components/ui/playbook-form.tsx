
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { playbookAction, PlaybookState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Download Now
    </Button>
  );
}

export function PlaybookForm() {
  const [state, formAction] = useActionState(playbookAction, { message: null, errors: {} });
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'Success! Your playbook is on its way.') {
      toast({
        title: 'Success!',
        description: "The playbook will be sent to your email shortly.",
      });
      setIsSubmitted(true);
      formRef.current?.reset();
      window.open('/playbook.pdf', '_blank');
    } else if (state.message && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  if (isSubmitted) {
    return (
        <div className="py-8 text-center">
            <h3 className="text-xl font-bold">Thank You!</h3>
            <p className="text-muted-foreground mt-2">Your playbook is on its way to your inbox.</p>
        </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4 py-4">
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
