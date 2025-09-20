
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getContextualSuggestion } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Loader2, Sparkles, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useStreamableValue } from 'ai/rsc';
import ReactMarkdown from 'react-markdown';


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
          Thinking...
        </>
      ) : (
        <>
          Get Answers <ArrowRight className="ml-2" />
        </>
      )}
    </Button>
  );
}

interface AiSuggestorProps {
  pageTitle: string;
  pageContent: string;
  onSuggestionClick?: () => void;
}

type ConversationTurn = {
    actor: 'user' | 'ai';
    text: string;
}

export function AiSuggestor({ pageTitle, pageContent, onSuggestionClick }: AiSuggestorProps) {
  const [state, dispatch, isActionPending] = useActionState(getContextualSuggestion, null);
  const formRef = useRef<HTMLFormElement>(null);
  const conversationContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const [data] = useStreamableValue(state?.data);

  useEffect(() => {
    if (submittedQuery) {
        setConversation([
            ...conversation,
            { actor: 'user', text: submittedQuery },
            { actor: 'ai', text: (data as string) || '' }
        ]);
        setSubmittedQuery(null);
    } else if (data) {
        setConversation(prev => {
            const newConversation = [...prev];
            if (newConversation.length > 0 && newConversation[newConversation.length - 1].actor === 'ai') {
                newConversation[newConversation.length - 1].text = data as string;
            }
            return newConversation;
        });
    }

    if (state?.message && state.message !== 'Success' && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [data, state?.message, toast, submittedQuery]);
  
  useEffect(() => {
      if (conversationContainerRef.current) {
          conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
      }
  }, [conversation]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    setSubmittedQuery(query);
    dispatch(formData);
    formRef.current?.reset();
  }
  
  return (
    <div className="w-full h-full flex flex-col">
      {conversation.length > 0 && (
          <div ref={conversationContainerRef} className="flex-1 overflow-y-auto mb-6 pr-4 -mr-4">
            <Card className="bg-transparent border-border/50">
                <CardContent className="p-4 space-y-4">
                    {conversation.map((turn, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-muted border">
                              {turn.actor === 'user' ? <User className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
                            </div>
                            <div className="pt-1.5 prose prose-invert prose-sm max-w-none text-foreground/80">
                              <ReactMarkdown>{turn.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </div>
      )}

      <form ref={formRef} action={handleFormSubmit} className="space-y-4 mt-auto">
        <input type="hidden" name="pageTitle" value={pageTitle} />
        <input type="hidden" name="pageContent" value={pageContent} />
        <Textarea
          name="query"
          placeholder="Ask a question or describe a problem... e.g., 'How can I automate my invoice chasing?' or 'Give me three ideas for using the support agent in a SaaS business.'"
          className="min-h-[120px] text-base bg-background/50 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30"
          required
          onKeyDown={handleKeyDown}
        />
        {state?.errors?.query && (
          <p className="text-sm text-destructive">
            {state.errors.query[0]}
          </p>
        )}
        <div className="flex justify-center pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
