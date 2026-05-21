// src/components/ui/floating-ai-suggestor.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
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
import { MessageSquare } from 'lucide-react';
import { services, ContextualAssistantOutput } from '@/data/content';
import { AiSuggestor, ConversationTurn } from './ai-suggestor';

// This is Component B: The Contextual AI Assistant for Service Pages

function FloatingTrigger({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
           <Button
              variant="outline"
              size="icon"
              id="contextual-ai-trigger"
              className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-sm z-40 bg-background border-border hover:border-primary transition-colors duration-150"
              onClick={onClick}
            >
              <MessageSquare className="h-5 w-5 text-foreground" />
              <span className="sr-only">Operational Advisor</span>
            </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="bg-card border-border text-foreground shadow-sm"
        >
          <p className="font-medium text-sm">Operational Advisor</p>
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

  const [state, setState] = useState<ContextualSuggestionState>({ message: null, errors: {}, data: null });
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  
  const slug = pathname.split('/').pop();
  const currentService = services.find(s => s.slug === slug);
  
  const handleFormAction = async (formData: FormData) => {
    const result = await getContextualSuggestion(state, formData);
    setState(result);
  };
  
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
    // Check if there's a successful response to process
    if (state.message === 'Success' && state.data) {
        // Ensure we don't process the same response multiple times
        if (conversation.length > 0 && conversation[conversation.length - 1].actor === 'user') {
            const aiResponseData = state.data as ContextualAssistantOutput;
            const aiResponseText = aiResponseData.response || 'Sorry, I could not generate a response.';
            setConversation(prev => [...prev, { actor: 'ai', text: aiResponseText, data: aiResponseData }]);
        }
    } else if (state.message === 'Error') {
         if (conversation.length > 0 && conversation[conversation.length - 1].actor === 'user') {
            const errorMessage = state.errors?.general?.[0] || 'An unknown error occurred.';
            setConversation(prev => [...prev, { actor: 'ai', text: `Error: ${errorMessage}` }]);
         }
    }
  }, [state, conversation]);

  const handleNewConversation = () => {
    setConversation([]);
    // The useEffect for 'conversation' will handle saving the empty array to localStorage
  };
  
  return (
    <>
      <FloatingTrigger onClick={() => setIsOpen(true)} />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent id="contextual-ai-container" className="w-full sm:max-w-sm flex flex-col p-0">
              <SheetHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                  <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      Operational Advisor
                  </SheetTitle>
                   <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleNewConversation}>
                      New Conversation
                    </Button>
                    <SheetClose />
                  </div>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4">
                  <AiSuggestor 
                      pageTitle={pageTitle} 
                      pageContent={pageContent}
                      service={currentService}
                      onNavigate={() => setIsOpen(false)}
                      conversation={conversation}
                      setConversation={setConversation}
                      handleFormAction={handleFormAction}
                      formState={state}
                      variant='sheet'
                  />
              </div>
          </SheetContent>
      </Sheet>
    </>
  );
}