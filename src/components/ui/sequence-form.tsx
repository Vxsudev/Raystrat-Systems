// src/components/ui/sequence-form.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Settings2 } from 'lucide-react';
import type { Sequence, SequenceStep } from '@/app/dashboard/page';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from './switch';


interface SequenceFormProps {
    sequence?: Sequence;
    onSave: (data: Omit<Sequence, 'id' | 'leads' | 'sent' | 'replied' | 'booked'>) => void;
}

const DEFAULT_STEP: SequenceStep = {
    stepIndex: 0,
    delayMinutes: 1440, // 1 day
    templateSubject: '',
    templateHtml: '',
    templateText: '',
    suppressIfRepliedMinutes: 4320, // 3 days
    maxRetries: 3,
    backoffSeconds: 300, // 5 minutes
};


export function SequenceForm({ sequence, onSave }: SequenceFormProps) {
    const [name, setName] = useState(sequence?.name || '');
    const [steps, setSteps] = useState<SequenceStep[]>(sequence?.steps || [
        { ...DEFAULT_STEP, stepIndex: 0, delayMinutes: 0 },
    ]);
    const [status, setStatus] = useState<'draft' | 'active'>(sequence?.status === 'active' ? 'active' : 'draft');

    const handleStepChange = (index: number, field: keyof SequenceStep, value: string | number | boolean) => {
        const newSteps = [...steps];
        if (typeof (newSteps[index] as any)[field] === 'number') {
            (newSteps[index] as any)[field] = Number(value);
        } else {
            (newSteps[index] as any)[field] = value;
        }
        setSteps(newSteps);
    };

    const addStep = () => {
        setSteps([...steps, { ...DEFAULT_STEP, stepIndex: steps.length }]);
    };

    const removeStep = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index);
        // Re-index remaining steps
        const reIndexedSteps = newSteps.map((step, i) => ({ ...step, stepIndex: i }));
        setSteps(reIndexedSteps);
    };

    const handleSave = () => {
        onSave({ name, steps, status });
    };
    
    return (
        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="space-y-2">
                <Label htmlFor="sequence-name">Sequence Name</Label>
                <Input
                    id="sequence-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., 'Q3 Cold Prospecting'"
                />
            </div>

            <div className="space-y-4">
                <Label>Sequence Steps</Label>
                {steps.map((step, index) => (
                    <Card key={index} className="relative">
                        <CardHeader>
                            <CardTitle className="text-lg">Step {index + 1}</CardTitle>
                             <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4"
                                onClick={() => removeStep(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="col-span-1 space-y-2">
                                    <Label htmlFor={`delay-${index}`}>Delay (minutes)</Label>
                                    <Input
                                        id={`delay-${index}`}
                                        type="number"
                                        value={step.delayMinutes}
                                        onChange={(e) => handleStepChange(index, 'delayMinutes', e.target.value)}
                                    />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`subject-${index}`}>Subject</Label>
                                <Input
                                    id={`subject-${index}`}
                                    value={step.templateSubject}
                                    onChange={(e) => handleStepChange(index, 'templateSubject', e.target.value)}
                                    placeholder="e.g., Following up on our services"
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`body-html-${index}`}>HTML Body</Label>
                                <Textarea
                                    id={`body-html-${index}`}
                                    value={step.templateHtml}
                                    onChange={(e) => handleStepChange(index, 'templateHtml', e.target.value)}
                                    placeholder="<p>Hi {{name}},</p><p>This is the HTML version of the email. Use {{name}} for personalization.</p>"
                                    className="min-h-[150px] font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`body-text-${index}`}>Plain Text Body (Optional)</Label>
                                <Textarea
                                    id={`body-text-${index}`}
                                    value={step.templateText || ''}
                                    onChange={(e) => handleStepChange(index, 'templateText', e.target.value)}
                                    placeholder="Hi {{name}},\n\nThis is the plain text version for deliverability. Use {{name}} for personalization."
                                    className="min-h-[100px] font-mono"
                                />
                            </div>

                             <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <Settings2 className="mr-2 h-4 w-4" />
                                        Advanced Settings
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                             <div className="space-y-2">
                                                <Label htmlFor={`suppress-${index}`}>Reply Suppression (mins)</Label>
                                                <Input
                                                    id={`suppress-${index}`}
                                                    type="number"
                                                    value={step.suppressIfRepliedMinutes}
                                                    onChange={(e) => handleStepChange(index, 'suppressIfRepliedMinutes', e.target.value)}
                                                />
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor={`retries-${index}`}>Max Retries</Label>
                                                <Input
                                                    id={`retries-${index}`}
                                                    type="number"
                                                    value={step.maxRetries}
                                                    onChange={(e) => handleStepChange(index, 'maxRetries', e.target.value)}
                                                />
                                            </div>
                                             <div className="space-y-2">
                                                <Label htmlFor={`backoff-${index}`}>Backoff (seconds)</Label>
                                                <Input
                                                    id={`backoff-${index}`}
                                                    type="number"
                                                    value={step.backoffSeconds}
                                                    onChange={(e) => handleStepChange(index, 'backoffSeconds', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
                 <Button variant="outline" onClick={addStep} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Step
                </Button>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
                 <div className="flex items-center space-x-2 mr-auto">
                    <Switch id="status-mode" checked={status === 'active'} onCheckedChange={(checked) => setStatus(checked ? 'active' : 'draft')} />
                    <Label htmlFor="status-mode">{status === 'active' ? 'Active' : 'Draft'}</Label>
                </div>
                <Button variant="ghost" onClick={() => onSave({ name, steps, status: 'draft' })}>Save as Draft</Button>
                <Button onClick={handleSave}>Save and Activate</Button>
            </div>
        </div>
    );
}

    