// src/components/ui/ai-suggestor.tsx
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getContextualSuggestion, SuggestionState } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Loader2, Send, User, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createStreamableValue, useStreamableValue } from 'ai/rsc';
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

function FollowUpSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="icon"
      className="shrink-0"
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Send />
      )}
      <span className="sr-only">Send message</span>
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

export function AiSuggestor({ pageTitle, pageContent }: AiSuggestorProps) {
  const [state, formAction, isPending] = useActionState<SuggestionState, FormData>(getContextualSuggestion, null);
  const formRef = useRef<HTMLFormElement>(null);
  const followUpFormRef = useRef<HTMLFormElement>(null);
  const conversationContainerRef = useRef<HTMLDivElement>(null);
  
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const initialStream = createStreamableValue();
  const [data] = useStreamableValue(state?.data || initialStream.value);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  useEffect(() => {
    if (submittedQuery) {
      setConversation(prev => [
        ...prev,
        { actor: 'user', text: submittedQuery },
        { actor: 'ai', text: '' },
      ]);
      setSubmittedQuery(null);
    }
  }, [submittedQuery]);

  useEffect(() => {
    if (data) {
      setConversation(prev => {
        const newConversation = [...prev];
        const lastTurn = newConversation[newConversation.length - 1];
        if (lastTurn && lastTurn.actor === 'ai') {
          lastTurn.text = (data as any).response;
        }
        return newConversation;
      });
    }
  }, [data]);
  
  useEffect(() => {
    if (conversationContainerRef.current) {
        const element = conversationContainerRef.current;
        const lastMessage = element.lastElementChild;
        if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
  }, [conversation.length, data]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isPending) {
      event.preventDefault();
      const activeForm = formRef.current?.contains(document.activeElement) 
        ? formRef.current 
        : followUpFormRef.current;
      
      if (activeForm) {
        activeForm.requestSubmit();
        activeForm.reset();
      }
    }
  };
  
  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query) return;
    setSubmittedQuery(query);
    formAction(formData);
  }
  
  return (
    <div className="w-full h-full flex flex-col">
      {conversation.length > 0 ? (
          <>
            <div ref={conversationContainerRef} className="flex-1 overflow-y-auto mb-4 pr-4 -mr-4 space-y-6">
              {conversation.map((turn, index) => (
                  <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-muted border">
                        {turn.actor === 'user' ? <User className="w-5 h-5 text-primary" /> : <Brain className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="pt-1.5 prose prose-invert prose-sm max-w-none text-foreground/80">
                         {(turn.actor === 'ai' && isPending && index === conversation.length - 1 && !data) 
                          ? <Loader2 className="animate-spin" />
                          : <ReactMarkdown>{turn.text}</ReactMarkdown>
                         }
                      </div>
                  </div>
              ))}
            </div>
            
            <form ref={followUpFormRef} action={handleFormSubmit} className="flex gap-2 items-center mt-auto pt-2 border-t">
              <input type="hidden" name="pageTitle" value={pageTitle} />
              <input type="hidden" name="pageContent" value={pageContent} />
               <Input
                  name="query"
                  placeholder="Ask a follow-up..."
                  className="flex-1"
                  required
                  disabled={isPending}
                  onKeyDown={handleKeyDown}
                />
              <FollowUpSubmitButton />
            </form>
          </>
      ) : (
        <form ref={formRef} action={handleFormSubmit} className="space-y-4 mt-auto">
          <input type="hidden" name="pageTitle" value={pageTitle} />
          <input type="hidden" name="pageContent" value={pageContent} />
          <Textarea
            name="query"
            placeholder="Ask a question or describe a problem... e.g., 'How can I automate my invoice chasing?'"
            className="min-h-[120px] text-base bg-background/50 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30"
            required
            disabled={isPending}
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
      )}
    </div>
  );
}
