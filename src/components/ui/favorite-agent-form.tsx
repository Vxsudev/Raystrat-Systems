
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { favoriteAgentAction } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

interface FavoriteAgentFormProps {
    agentName: string;
    agentSlug: string;
    onSuccess?: () => void;
}

export function FavoriteAgentForm({ agentName, agentSlug, onSuccess }: FavoriteAgentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('agentName', agentName);
    formData.append('agentSlug', agentSlug);

    const result = await favoriteAgentAction(null, formData);

    if (result?.message === 'Success') {
      toast({
        title: 'Thank You!',
        description: "We've sent a follow-up email with next steps to your inbox.",
      });
      setIsSubmitted(true);
      if(onSuccess) onSuccess();
      form.reset();
    } else {
      toast({
        title: 'Error',
        description: result?.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  }

  if (isSubmitted) {
    return (
        <div className="py-8 text-center">
            <h3 className="text-xl font-bold">Email Sent!</h3>
            <p className="text-muted-foreground mt-2">Check your inbox for the next steps to book your demo.</p>
        </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="e.g. jane.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Send Follow-up Email
        </Button>
      </form>
    </Form>
  );
}
