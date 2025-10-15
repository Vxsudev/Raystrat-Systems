// src/components/ui/floating-ai-suggestor.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useActionState } from 'react';
import { getContextualSuggestion, ContextualSuggestionState } from '@/app/actions';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { services, ContextualAssistantOutput } from '@/data/content';
import { AiSuggestor, ConversationTurn } from './ai-suggestor';

// This is Component B: The Contextual AI Assistant for Service Pages

function FloatingTrigger({ onClick }: { onClick: () => void }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooltipOpen(true);
      const closeTimer = setTimeout(() => setIsTooltipOpen(false), 4000);
      return () => clearTimeout(closeTimer);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
           <Button
              variant="default"
              size="icon"
              id="contextual-ai-trigger"
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-40 animate-pulse bg-primary hover:bg-primary/90 hover:animate-none"
              onClick={onClick}
            >
              <Sparkles className="h-7 w-7" />
              <span className="sr-only">AI Assistant</span>
            </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className={cn(
            'bg-card border-primary text-foreground shadow-lg',
            'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=delayed-open]:zoom-in-95'
          )}
        >
          <p className="font-semibold">Have questions? Ask me anything.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


export function FloatingAiSuggestor() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');

  const [state, formAction, isPending] = useActionState<ContextualSuggestionState, FormData>(getContextualSuggestion, { message: null, data: null, errors: {}, id: null });
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const lastProcessedId = useRef<number | null>(null);
  
  const slug = pathname.split('/').pop();
  const currentService = services.find(s => s.slug === slug);
  
  // Load conversation from localStorage on mount
  useEffect(() => {
    if (!isOpen) return;
    try {
      const savedConversation = localStorage.getItem(`conversationHistory-${pathname}`);
      if (savedConversation) {
        setConversation(JSON.parse(savedConversation));
      } else {
        setConversation([]);
      }
    } catch (error) {
      console.error("Failed to load conversation from localStorage", error);
      setConversation([]);
    }
  }, [isOpen, pathname]);

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    if (isOpen) {
      try {
        localStorage.setItem(`conversationHistory-${pathname}`, JSON.stringify(conversation));
      } catch (error) {
        console.error("Failed to save conversation to localStorage", error);
      }
    }
  }, [conversation, isOpen, pathname]);


  useEffect(() => {
    if (isOpen) {
        setPageTitle(document.title);
        const contentElement = document.querySelector('article');
        setPageContent(contentElement?.innerText.substring(0, 2000) || '');
    }
  }, [isOpen, pathname]);

  // Handle the result from the server action
  useEffect(() => {
    if (state.id && state.id !== lastProcessedId.current) {
        lastProcessedId.current = state.id; // Mark this response as processed

        if (state.message === 'Success' && state.data) {
            const aiResponseData = state.data as ContextualAssistantOutput;
            const aiResponseText = aiResponseData.response || 'Sorry, I could not generate a response.';
            setConversation(prev => [...prev, { actor: 'ai', text: aiResponseText, data: aiResponseData }]);
        } else if (state.message === 'Error') {
            const errorMessage = state.errors?.general?.[0] || 'An unknown error occurred.';
            setConversation(prev => [...prev, { actor: 'ai', text: `Error: ${errorMessage}` }]);
        }
    }
  }, [state]);
  
  return (
    <>
      <FloatingTrigger onClick={() => setIsOpen(true)} />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent id="contextual-ai-container" className="w-full sm:max-w-sm flex flex-col p-0">
              <SheetHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                  <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-primary" />
                      Agent Assist
                  </SheetTitle>
                  <SheetClose />
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4">
                  <AiSuggestor 
                      pageTitle={pageTitle} 
                      pageContent={pageContent}
                      service={currentService}
                      onNavigate={() => setIsOpen(false)}
                      conversation={conversation}
                      setConversation={setConversation}
                      formAction={formAction}
                      isPending={isPending}
                      formState={state}
                      variant='sheet'
                  />
              </div>
          </SheetContent>
      </Sheet>
    </>
  );
}
