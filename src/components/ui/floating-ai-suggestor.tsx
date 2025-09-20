
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb, Bot } from 'lucide-react';
import { AiSuggestor } from './ai-suggestor';

// Helper to get text content from the main content area of the page
const getPageContent = () => {
    if (typeof window === 'undefined') return '';
    const mainElement = document.querySelector('main');
    return mainElement?.innerText.substring(0, 4000) || ''; // Limit context size
}

export function FloatingAiSuggestor() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageContext, setPageContext] = useState({ title: '', content: '' });
  const pathname = usePathname();

  useEffect(() => {
    // Update context whenever the dialog opens or path changes
    if (isOpen) {
      setPageContext({
        title: document.title,
        content: getPageContent(),
      });
    }
  }, [isOpen, pathname]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-40 animate-pulse bg-primary hover:bg-primary/90 hover:animate-none"
        >
          <Bot className="h-8 w-8 text-primary-foreground" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader className="text-center">
          <div className="flex justify-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">Raystrat AI Assistant</DialogTitle>
          <DialogDescription className="text-lg text-foreground/80">
            I have context on the page you're viewing. How can I help you strategize?
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 py-2">
          <AiSuggestor 
            pageTitle={pageContext.title}
            pageContent={pageContext.content}
            onSuggestionClick={() => setIsOpen(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
