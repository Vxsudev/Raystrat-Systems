
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
import { Heart } from 'lucide-react';
import { FavoriteAgentForm } from './favorite-agent-form';


interface FavoriteAgentButtonProps {
    agentName: string;
    agentSlug: string;
}

export function FavoriteAgentButton({ agentName, agentSlug }: FavoriteAgentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
        >
          <Heart className="mr-2" /> Save This System
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Save: {agentName}</DialogTitle>
          <DialogDescription>
            Enter your details below, and we'll email you a direct link to book a consultation for this system.
          </DialogDescription>
        </DialogHeader>
        <FavoriteAgentForm 
            agentName={agentName} 
            agentSlug={agentSlug} 
            onSuccess={() => {
                // We can close the dialog after a short delay to allow the user to read the success message
                setTimeout(() => setIsOpen(false), 2000);
            }}
        />
      </DialogContent>
    </Dialog>
  );
}
