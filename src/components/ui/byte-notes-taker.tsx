// src/components/ui/byte-notes-taker.tsx
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { saveAndSendNotes, NotesState } from '@/app/actions';
import { Loader2, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { industries } from '@/data/content';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send to My Email <Send className="ml-2" />
        </>
      )}
    </Button>
  );
}

interface NotesTakerProps {
  serviceName: string;
}

export function ByteNotesTaker({ serviceName }: NotesTakerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const searchParams = useSearchParams();
  const initialNote = searchParams.get('note') || '';
  
  const [notes, setNotes] = useState(initialNote);
  const [state, formAction] = useActionState(saveAndSendNotes, {
    message: null,
    errors: {},
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message === 'Success! Your notes have been sent to your email.') {
      toast({
        title: 'Success!',
        description: 'Your notes have been sent to your email.',
      });
      setIsOpen(false);
      // Don't clear notes, user might want to continue editing
    } else if (state?.message && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const notesAreEmpty = notes.trim().length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="space-y-3">
        <h3 className="text-xl font-bold font-headline">Your Private Notes</h3>
        <Textarea
          placeholder="Your notes should be specific to your business for maximum personalisation from our agents. Shoot!"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[120px] text-base"
        />
        <DialogTrigger asChild>
          <Button
            className="w-full"
            variant="outline"
            disabled={notesAreEmpty}
          >
            <Save className="mr-2" /> Save & Send Notes
          </Button>
        </DialogTrigger>
        <p
          className={cn(
            'text-xs text-center text-muted-foreground transition-opacity',
            notesAreEmpty && !initialNote ? 'opacity-100' : 'opacity-0'
          )}
        >
          Jot down your questions, ideas and requirements as you read. Save the note to see our operations and follow-up agents in action!
        </p>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save & Send Your Notes</DialogTitle>
          <DialogDescription>
            Enter your details below. We'll email you a copy of your notes and a
            new lead notification will be sent to our team.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4 py-4">
          <input type="hidden" name="serviceName" value={serviceName} />
          <input type="hidden" name="notes" value={notes} />

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="e.g. Jane Doe" required />
            {state?.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. jane.doe@example.com"
              required
            />
            {state?.errors?.email && (
              <p className="text-sm text-destructive">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          
           <div className="space-y-2">
            <Label htmlFor="businessName">Business Name (Optional)</Label>
            <Input id="businessName" name="businessName" placeholder="e.g. Acme Inc." />
          </div>
          
          <div className="space-y-2">
            <Label>Industry (Optional)</Label>
            <Select name="industry">
                <SelectTrigger>
                    <SelectValue placeholder="Select your industry..." />
                </SelectTrigger>
                <SelectContent>
                    {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                            {industry}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>


          {state?.errors?.notes && (
              <p className="text-sm text-center text-destructive">{state.errors.notes[0]}</p>
          )}

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}