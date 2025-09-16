
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { AiSuggestor } from './ai-suggestor';

export function FloatingAiSuggestor() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-40 animate-synchronized-pulse bg-primary hover:bg-primary/90 hover:animate-none"
        >
          <Lightbulb className="h-8 w-8 text-primary-foreground" />
          <span className="sr-only">Open AI Suggestor</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader className="text-center">
          <div className="flex justify-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">Unsure Where To Start?</DialogTitle>
          <DialogDescription className="text-lg text-foreground/80">
            Describe your biggest content or operational bottleneck, and our AI will suggest the most impactful automation for your business.
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 py-2">
          <AiSuggestor onSuggestionClick={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
