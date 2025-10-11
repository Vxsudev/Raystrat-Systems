// src/components/ui/ai-suggestor.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { SuggestionState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Send, Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { services } from '@/data/content';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import type { ServiceSuggesterOutput, ContextualAssistantOutput } from '@/data/content';
import { cn } from '@/lib/utils';


export type ConversationTurn = {
    actor: 'user' | 'ai';
    text: string;
    data?: ContextualAssistantOutput;
}

interface AiSuggestorProps {
  pageTitle: string;
  pageContent: string;
  service?: typeof services[0];
  onNavigate?: () => void;
  // --- Props passed down from parent ---
  conversation: ConversationTurn[];
  setConversation: React.Dispatch<React.SetStateAction<ConversationTurn[]>>;
  formAction: (formData: FormData) => void;
  isPending: boolean;
  formState: SuggestionState;
  variant?: 'dialog' | 'sheet';
}


function ConversationHistory({ conversation, isPending, onNavigate }: { conversation: ConversationTurn[], isPending: boolean, onNavigate?: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [conversation]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 -mr-4 pr-4 space-y-6">
      {conversation.map((turn, index) => (
        <div key={index} className="flex flex-col items-start gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-muted border">
                {turn.actor === 'user' ? <User className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
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
                <Link href={`/services/${turn.data.suggestedService.slug}`} onClick={onNavigate}>
                    <Button variant="outline" size="sm">
                        Learn More: {turn.data.suggestedService.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
          )}
        </div>
      ))}
       {isPending && conversation.length > 0 && conversation[conversation.length - 1]?.actor !== 'ai' && (
           <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-muted border">
                <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="pt-1.5 prose prose-invert prose-sm max-w-none text-foreground/80">
                <Loader2 className="animate-spin" />
            </div>
          </div>
       )}
    </div>
  );
}


export function AiSuggestor({ 
    pageTitle, 
    pageContent, 
    service, 
    onNavigate,
    conversation,
    setConversation,
    formAction,
    isPending,
    formState, 
    variant = 'dialog' 
}: AiSuggestorProps) {
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  
  useEffect(() => {
    // When a form submission starts, add the user's query to the conversation
    if (isPending && currentQuery) {
      setConversation(prev => [
        ...prev,
        { actor: 'user', text: currentQuery },
      ]);
      setCurrentQuery(''); // Clear the temp state
    }
  }, [isPending, currentQuery, setConversation]);

  
  return (
    <div className="w-full h-full flex flex-col">
      {conversation.length > 0 ? (
          <ConversationHistory conversation={conversation} isPending={isPending} onNavigate={onNavigate} />
      ) : (
        <div className="flex-1 mb-4 flex flex-col justify-center">
            <h2 className={cn("font-bold", variant === 'dialog' ? 'text-4xl' : 'text-2xl')}>
                <span className="text-primary">Hello, {user?.displayName || 'there'}</span>
                <br />
                <span className={cn("text-muted-foreground", variant === 'dialog' ? '' : 'text-xl')}>How can I help you?</span>
            </h2>
            
            <div className={cn("mt-8", variant === 'dialog' ? '' : 'mt-6')}>
                <p className="text-sm text-muted-foreground mb-4">Get started with a prompt</p>
                <div className="space-y-3">
                    {service?.presetQuestions && service.presetQuestions.length > 0 && (
                        service.presetQuestions.map((q, i) => (
                            <form
                                key={i}
                                action={(formData: FormData) => {
                                    const query = formData.get('query') as string;
                                    if (!query) return;
                                    setCurrentQuery(query);
                                    formAction(formData);
                                }}
                            >
                                <input type="hidden" name="pageTitle" value={pageTitle} />
                                <input type="hidden" name="pageContent" value={pageContent} />
                                <input type="hidden" name="query" value={q} />
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full justify-start text-left p-0 bg-transparent text-foreground/80 hover:text-foreground transition-colors flex items-center gap-3 disabled:opacity-50"
                                >
                                    <Sparkles className="h-5 w-5 text-primary/70 shrink-0" />
                                    <span>{q}</span>
                                </Button>
                            </form>
                        ))
                    )}
                </div>
            </div>
        </div>
      )}

       <form 
        ref={formRef} 
        action={(formData) => {
            const query = formData.get('query') as string;
            if (!query || isPending) return;
            setCurrentQuery(query);
            formAction(formData);
            formRef.current?.reset();
        }}
        className="flex gap-2 items-center mt-auto"
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
              autoComplete='off'
              onChange={(e) => {
                if (formState.errors?.query) {
                    // Clear error when user starts typing
                    formState.errors.query = undefined;
                }
              }}
            />
             {formState.errors?.query && <p className="text-sm text-destructive absolute -bottom-5 left-2">{formState.errors.query[0]}</p>}
          </div>
           <Button
              type="submit"
              disabled={isPending}
              size="icon"
              className="shrink-0 rounded-full h-9 w-9 bg-primary"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
        </form>
    </div>
  );
}
