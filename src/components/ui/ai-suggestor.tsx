// src/components/ui/ai-suggestor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getContextualSuggestion, SuggestionState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Send, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ContextualAssistantOutput, services } from '@/data/content';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="icon"
      className="shrink-0 rounded-full h-9 w-9 bg-primary"
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Send className="w-5 h-5" />
      )}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

interface AiSuggestorProps {
  pageTitle: string;
  pageContent: string;
  service?: typeof services[0];
  onSuggestionSuccess?: (state: SuggestionState) => void;
}

type ConversationTurn = {
    actor: 'user' | 'ai';
    text: string;
    data?: ContextualAssistantOutput;
}

function ConversationHistory({ conversation, isPending }: { conversation: ConversationTurn[], isPending: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [conversation.length, conversation[conversation.length - 1]?.text]); // Also scroll when text streams in

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 -mr-4 pr-4 space-y-6">
      {conversation.map((turn, index) => (
        <div key={index} className="flex flex-col items-start gap-3">
          <div className="flex items-start gap-3">
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
          {turn.actor === 'ai' && turn.data?.suggestedService && turn.data.suggestedService.slug && (
            <div className="ml-12 mt-2 space-y-2">
                <Link href={`/services/${turn.data.suggestedService.slug}`} passHref>
                    <Button asChild variant="outline" size="sm">
                        <a>
                            Learn More: {turn.data.suggestedService.title}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


export function AiSuggestor({ pageTitle, pageContent, service, onSuggestionSuccess }: AiSuggestorProps) {
  const [state, setState] = useState<SuggestionState | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuth();
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);

  useEffect(() => {
    if (state?.message === 'Success' && state.data) {
       onSuggestionSuccess?.(state);
       const aiResponseData = state.data as ContextualAssistantOutput;
       const aiResponseText = aiResponseData.response || 'Sorry, I could not generate a response.';
       const lastTurn = conversation[conversation.length - 1];
       if (lastTurn && lastTurn.actor === 'ai') {
        // Update the last AI turn's text and data
        setConversation(prev => {
          const newConversation = [...prev];
          newConversation[newConversation.length - 1] = { ...lastTurn, text: aiResponseText, data: aiResponseData };
          return newConversation;
        });
      } else {
         setConversation(prev => [
          ...prev,
          { actor: 'ai', text: aiResponseText, data: aiResponseData },
        ]);
      }
    } else if (state?.message && state.message !== 'Success' && state.message !== 'Invalid input.') {
        onSuggestionSuccess?.(state);
        const lastTurn = conversation[conversation.length - 1];
        if (lastTurn && lastTurn.actor === 'ai') {
            setConversation(prev => {
              const newConversation = [...prev];
              newConversation[newConversation.length - 1] = { ...lastTurn, text: state.message! };
              return newConversation;
            });
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
  };

  const handlePresetQuestionClick = (question: string) => {
    const formData = new FormData();
    formData.append('query', question);
    formData.append('pageTitle', pageTitle);
    formData.append('pageContent', pageContent);
    handleFormSubmit(formData);
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      {conversation.length > 0 ? (
          <ConversationHistory conversation={conversation} isPending={isPending} />
      ) : (
        <div className="flex-1 mb-4 flex flex-col justify-center">
            <h2 className="text-4xl font-bold">
                <span className="text-primary">Hello, {user?.displayName || 'there'}</span>
                <br />
                <span className="text-muted-foreground">How can I help you?</span>
            </h2>
            
            <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-4">Get started with a prompt</p>
                <div className="space-y-3">
                    {service?.presetQuestions && service.presetQuestions.length > 0 && (
                        service.presetQuestions.map((q, i) => (
                            <button
                                key={i}
                                className="w-full text-left p-0 bg-transparent text-foreground/80 hover:text-foreground transition-colors flex items-center gap-3"
                                onClick={() => handlePresetQuestionClick(q)}
                            >
                                <Sparkles className="h-5 w-5 text-primary/70 shrink-0" />
                                <span>{q}</span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
      )}

       <form 
        ref={formRef} 
        action={handleFormSubmit} 
        className="flex gap-2 items-center mt-auto"
        onSubmit={(e) => { e.preventDefault(); handleFormSubmit(new FormData(e.currentTarget)); }}
      >
          <input type="hidden" name="pageTitle" value={pageTitle} />
          <input type="hidden" name="pageContent" value={pageContent} />
          <div className="relative flex-1">
            <Input
              name="query"
              placeholder="Ask a question or describe a problem..."
              className="w-full rounded-full border-border bg-transparent pr-12 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
              required
              disabled={isPending}
            />
          </div>
           <SubmitButton />
        </form>
    </div>
  );
}
