// src/components/ui/byte-notes-taker.tsx
'use client';

import { useActionState, useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { saveAndSendNotes, NotesState } from '@/app/actions';
import { Loader2, Save, Send, GripVertical, X, CornerRightDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { industries } from '@/data/content';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send to My Email <Send className="ml-2" />
        </>
      )}
    </Button>
  );
}

interface DraggableNotepadProps {
  serviceName: string;
  onClose: () => void;
  isOpen: boolean;
}

export function ByteNotesTaker({ serviceName, onClose, isOpen }: DraggableNotepadProps) {
  const searchParams = useSearchParams();
  const initialNote = searchParams.get('note') || '';
  
  const [notes, setNotes] = useState(initialNote);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);

  const [state, formAction] = useActionState(saveAndSendNotes, {
    message: null,
    errors: {},
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const notepadRef = useRef<HTMLDivElement>(null);
  
  // Default state calculation moved inside to access `window`
  const getDefaultState = () => {
    if (typeof window === 'undefined') {
      return {
        pos: { x: 100, y: 100 },
        size: { width: 400, height: 500 }
      };
    }
    const defaultWidth = Math.max(320, window.innerWidth * 0.25);
    return {
      pos: { x: window.innerWidth - defaultWidth - 20, y: 80 },
      size: { width: defaultWidth, height: window.innerHeight - 180 }
    }
  };

  const [position, setPosition] = useState(getDefaultState().pos);
  const [size, setSize] = useState(getDefaultState().size);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });

  const storageKey = `byte-notepad-state-${window.location.pathname}`;

  // Load state from localStorage
  useEffect(() => {
    if (!isOpen) return;
    try {
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        const { notes: savedNotes, position: savedPosition, size: savedSize } = JSON.parse(savedState);
        setNotes(savedNotes || initialNote);
        if (savedPosition) setPosition(savedPosition);
        if (savedSize) setSize(savedSize);
      } else {
        setNotes(initialNote);
        const defaults = getDefaultState();
        setPosition(defaults.pos);
        setSize(defaults.size);
      }
    } catch (error) {
      console.error("Failed to parse notepad state from localStorage", error);
      setNotes(initialNote);
    }
  }, [isOpen, storageKey, initialNote]);

  // Save state to localStorage
  useEffect(() => {
    if (!isOpen) return;
    try {
      const stateToSave = JSON.stringify({ notes, position, size });
      localStorage.setItem(storageKey, stateToSave);
    } catch (error) {
      console.error("Failed to save notepad state to localStorage", error);
    }
  }, [notes, position, size, isOpen, storageKey]);


  useEffect(() => {
    if (state?.message === 'Success! Your notes have been sent to your email.') {
      toast({
        title: 'Success!',
        description: 'Your notes have been sent to your email.',
      });
      setIsSendDialogOpen(false);
      setNotes(''); // Clear notes after successful send
    } else if (state?.message && state.message !== 'Invalid input.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const handleMouseDownDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only main button
    setIsDragging(true);
    dragStartRef.current = {
      ...dragStartRef.current,
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };
  
  const handleMouseDownResize = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (e.button !== 0) return;
    setIsResizing(direction);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    };
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && notepadRef.current) {
      let newX = e.clientX - dragStartRef.current.x;
      let newY = e.clientY - dragStartRef.current.y;
      
      const headerHeight = 64; 
      const footerHeight = 76;
      
      newY = Math.max(headerHeight, newY);
      newY = Math.min(window.innerHeight - size.height - footerHeight, newY);
      newX = Math.max(0, newX);
      newX = Math.min(window.innerWidth - size.width, newX);

      setPosition({ x: newX, y: newY });
    }
    
    if (isResizing && notepadRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        
        let newWidth = dragStartRef.current.width;
        let newHeight = dragStartRef.current.height;
        let newX = dragStartRef.current.posX;
        let newY = dragStartRef.current.posY;

        if (isResizing.includes('r')) newWidth = dragStartRef.current.width + dx;
        if (isResizing.includes('l')) {
            newWidth = dragStartRef.current.width - dx;
            newX = dragStartRef.current.posX + dx;
        }
        if (isResizing.includes('b')) newHeight = dragStartRef.current.height + dy;
        if (isResizing.includes('t')) {
            newHeight = dragStartRef.current.height - dy;
            newY = dragStartRef.current.posY + dy;
        }

        const minWidth = 280;
        const minHeight = 200;

        if (newWidth > minWidth) {
          setSize(prev => ({...prev, width: newWidth}));
          setPosition(prev => ({...prev, x: newX}));
        }
        if (newHeight > minHeight) {
          setSize(prev => ({...prev, height: newHeight}));
          setPosition(prev => ({...prev, y: newY}));
        }
    }
  }, [isDragging, isResizing, size.width, size.height]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(null);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);


  if (!isOpen) return null;

  const notesAreEmpty = notes.trim().length === 0;

  return (
    <div
        ref={notepadRef}
        className="fixed top-0 left-0 bg-card border border-primary/50 rounded-lg shadow-2xl flex flex-col z-50"
        style={{ transform: `translate(${position.x}px, ${position.y}px)`, width: `${size.width}px`, height: `${size.height}px` }}
    >
        {/* Resize Handles */}
        {['t', 'b', 'l', 'r', 'tl', 'tr', 'bl', 'br'].map(dir => {
            let cursorClass = '';
            if (dir === 't' || dir === 'b') cursorClass = 'cursor-ns-resize';
            if (dir === 'l' || dir === 'r') cursorClass = 'cursor-ew-resize';
            if (dir === 'tl' || dir === 'br') cursorClass = 'cursor-nwse-resize';
            if (dir === 'tr' || dir === 'bl') cursorClass = 'cursor-nesw-resize';

            return (
                <div
                    key={dir}
                    onMouseDown={(e) => handleMouseDownResize(e, dir)}
                    className={cn(
                        "absolute z-10",
                        cursorClass,
                        (dir.includes('t') || dir.includes('b')) ? 'h-2 left-2 right-2' : 'w-2 top-2 bottom-2',
                        dir.includes('t') && 'top-0',
                        dir.includes('b') && 'bottom-0',
                        dir.includes('l') && 'left-0',
                        dir.includes('r') && 'right-0',
                    )}
                />
            );
        })}

        {/* Header */}
        <div
            className="flex items-center justify-between p-2 border-b cursor-move"
            onMouseDown={handleMouseDownDrag}
        >
            <div className="flex items-center gap-2">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold text-sm">Notepad</span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
                <X className="h-4 w-4" />
            </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-3 overflow-hidden">
            <Textarea
                placeholder="Jot down questions, ideas, and requirements here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex-1 resize-none text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
             <p
              className={cn(
                'text-xs text-center text-muted-foreground transition-opacity pt-2',
                 notesAreEmpty && !initialNote ? 'opacity-100' : 'opacity-0'
              )}
            >
              <CornerRightDown className="inline h-3 w-3 mr-1"/>
              Click "Save & Send" to get a copy and see our agents in action.
            </p>
        </div>

        {/* Footer */}
        <div className="p-3 border-t">
            <Button
                className="w-full"
                variant="outline"
                disabled={notesAreEmpty}
                onClick={() => setIsSendDialogOpen(true)}
            >
                <Save className="mr-2" /> Save & Send Notes
            </Button>
        </div>
        
        {/* Send Dialog */}
        <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Save & Send Your Notes</DialogTitle>
                <DialogDescription>
                    Enter your details below. We'll email you a copy of your notes and a
                    new lead notification will be sent to our team.
                </DialogDescription>
                </DialogHeader>
                <form ref={formRef} action={formAction} className="space-y-4 py-4">
                <input type="hidden" name="serviceName" value={serviceName} />
                <input type="hidden" name="notes" value={notes} />

                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="e.g. Jane Doe" required />
                    {state?.errors?.name && (
                    <p className="text-sm text-destructive">{state.errors.name[0]}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. jane.doe@example.com"
                    required
                    />
                    {state?.errors?.email && (
                    <p className="text-sm text-destructive">
                        {state.errors.email[0]}
                    </p>
                    )}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name (Optional)</Label>
                    <Input id="businessName" name="businessName" placeholder="e.g. Acme Inc." />
                </div>
                
                <div className="space-y-2">
                    <Label>Industry (Optional)</Label>
                    <Select name="industry">
                        <SelectTrigger>
                            <SelectValue placeholder="Select your industry..." />
                        </SelectTrigger>
                        <SelectContent>
                            {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                    {industry}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                {state?.errors?.notes && (
                    <p className="text-sm text-center text-destructive">{state.errors.notes[0]}</p>
                )}

                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                    </DialogClose>
                    <SubmitButton />
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    </div>
  );
}
