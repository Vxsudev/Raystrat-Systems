// src/components/ui/ai-suggestor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getContextualSuggestion, SuggestionState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Send, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ServiceSuggesterOutput } from '@/ai/flows/service-suggester';
import { cn } from '@/lib/utils';

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
      className="shrink-0 rounded-full"
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
  onSuggestionSuccess?: (state: SuggestionState) => void;
}

type ConversationTurn = {
    actor: 'user' | 'ai';
    text: string;
}

function ConversationHistory({ conversation, isPending }: { conversation: ConversationTurn[], isPending: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [conversation.length]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 pr-4 -mr-4 space-y-6">
      {conversation.map((turn, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-muted border">
            {turn.actor === 'user' ? <User className="w-5 h-5 text-primary" /> : <span className="text-xl" role="img" aria-label="Brain">♞</span>}
          </div>
          <div className="pt-1.5 prose prose-invert prose-sm max-w-none text-foreground/80">
            {(turn.actor === 'ai' && !turn.text && isPending) 
              ? <Loader2 className="animate-spin" />
              : <ReactMarkdown>{turn.text}</ReactMarkdown>
            }
          </div>
        </div>
      ))}
    </div>
  );
}


export function AiSuggestor({ pageTitle, pageContent, onSuggestionSuccess }: AiSuggestorProps) {
  const [state, setState] = useState<SuggestionState | null>(null);
  const [isPending, setIsPending] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const followUpFormRef = useRef<HTMLFormElement>(null);
  
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);

  useEffect(() => {
    if (state?.message === 'Success' && state.data) {
       onSuggestionSuccess?.(state);
       const aiResponse = 'response' in state.data && state.data.response ? state.data.response : 'Sorry, I could not generate a response.';
       const lastTurn = conversation[conversation.length - 1];
       if (lastTurn && lastTurn.actor === 'ai') {
        lastTurn.text = aiResponse;
        setConversation([...conversation]);
      } else {
         setConversation(prev => [
          ...prev,
          { actor: 'ai', text: aiResponse },
        ]);
      }
    } else if (state?.message && state.message !== 'Success' && state.message !== 'Invalid input.') {
        onSuggestionSuccess?.(state);
        const lastTurn = conversation[conversation.length - 1];
        if (lastTurn && lastTurn.actor === 'ai') {
            lastTurn.text = state.message;
            setConversation([...conversation]);
        }
    }
  }, [state, onSuggestionSuccess, conversation]);

  const handleFormSubmit = async (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query) return;

    setConversation(prev => [
      ...prev,
      { actor: 'user', text: query },
      { actor: 'ai', text: '' }, 
    ]);
    
    setIsPending(true);
    const result = await getContextualSuggestion(formData);
    setState(result);
    setIsPending(false);

    if (formRef.current) formRef.current.reset();
    if (followUpFormRef.current) followUpFormRef.current.reset();
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isPending) {
      event.preventDefault();
      const activeForm = formRef.current?.contains(document.activeElement) 
        ? formRef.current 
        : followUpFormRef.current;
      
      if (activeForm) {
        handleFormSubmit(new FormData(activeForm));
      }
    }
  };

  
  return (
    <div className="w-full h-full flex flex-col">
      {conversation.length > 0 ? (
          <>
            <ConversationHistory conversation={conversation} isPending={isPending} />
            <form ref={followUpFormRef} action={handleFormSubmit} className="flex gap-2 items-center mt-auto pt-2 border-t">
              <input type="hidden" name="pageTitle" value={pageTitle} />
              <input type="hidden" name="pageContent" value={pageContent} />
               <Input
                  name="query"
                  placeholder="Ask a follow-up..."
                  className="flex-1 rounded-full"
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
          <div className="relative rounded-full focus-within:ring-1 focus-within:ring-primary">
             <Input
                name="query"
                placeholder="Ask a question or describe a problem..."
                className="w-full rounded-full pr-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
                disabled={isPending}
                onKeyDown={handleKeyDown}
              />
              <Button type="submit" size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary" disabled={isPending}>
                 {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
              </Button>
          </div>
          {state?.errors?.query && (
            <p className="text-sm text-destructive">
              {state.errors.query[0]}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
