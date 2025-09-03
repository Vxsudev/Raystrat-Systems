
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CalendlyButton } from './calendly-button';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  bottleneck: z.string().min(10, { message: 'Please describe your bottleneck in at least 10 characters.' }),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      bottleneck: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Placeholder for API submission
    console.log('Form values:', values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Message Sent!',
      description: "We've received your inquiry and will be in touch shortly.",
    });
    form.reset();
    setIsSubmitting(false);
  }

  const FloatingLabelInput = ({ field, label, ...props }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = field.value && field.value.length > 0;
    const isFloating = isFocused || hasValue;

    return (
      <FormItem className="relative">
        <FormControl>
          <Input
            {...field}
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="bg-[#0b0b0b] border border-white/10 rounded-xl w-full px-4 py-3 text-white placeholder-transparent focus:border-primary focus:ring-2 focus:ring-primary/30 transition h-auto pt-6"
          />
        </FormControl>
        <FormLabel
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none text-white/40",
            isFloating
              ? "text-xs top-1.5 text-primary"
              : "text-base top-3.5"
          )}
        >
          {label}
        </FormLabel>
        <FormMessage className="mt-1 text-xs h-4" />
      </FormItem>
    );
  };
  
  const FloatingLabelTextarea = ({ field, label, ...props }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = field.value && field.value.length > 0;
    const isFloating = isFocused || hasValue;

    return (
      <FormItem className="relative">
        <FormControl>
           <Textarea
            {...field}
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={2}
            className="bg-[#0b0b0b] border border-white/10 rounded-xl w-full px-4 py-3 text-white placeholder-transparent focus:border-primary focus:ring-2 focus:ring-primary/30 transition pt-6 resize-none"
           />
        </FormControl>
        <FormLabel
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none text-white/40",
            isFloating
              ? "text-xs top-1.5 text-primary"
              : "text-base top-3.5"
          )}
        >
          {label}
        </FormLabel>
        <FormMessage className="mt-1 text-xs h-4" />
      </FormItem>
    );
  };


  return (
    <div className="bg-[#111] rounded-2xl shadow-lg shadow-black/40 border-t-2 border-primary py-6 px-6 relative">
       <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl -z-10"></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" suppressHydrationWarning>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => <FloatingLabelInput field={field} label="Full Name" />}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => <FloatingLabelInput field={field} label="Email" />}
            />
          </div>
          <FormField
              control={form.control}
              name="company"
              render={({ field }) => <FloatingLabelInput field={field} label="Company (Optional)" />}
          />
          <FormField
            control={form.control}
            name="bottleneck"
            render={({ field }) => <FloatingLabelTextarea field={field} label="Primary Bottleneck" />}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => <FloatingLabelTextarea field={field} label="Your Message" />}
          />
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-[#b9972f] text-black font-semibold rounded-xl py-3 shadow-md shadow-black/40 transition h-auto text-base" 
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
              Send Message
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-3 text-center">
        <Link href="#pricing" className="text-sm text-white/50 hover:text-white transition">
           Prefer to start with a 15-min audit? → <span className='underline'>Book here</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/40">
        <Lock size={12} />
        <span>Your data is safe — no spam, no leaks. Military-grade privacy.</span>
      </div>
    </div>
  );
}
