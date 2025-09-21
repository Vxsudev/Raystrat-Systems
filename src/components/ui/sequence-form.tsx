// src/components/ui/sequence-form.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Settings2, Info, Loader2 } from 'lucide-react';
import type { SequenceStep, SequenceTemplate } from '@/app/dashboard/page';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from './switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormStatus } from 'react-dom';


interface SequenceFormProps {
    sequence?: SequenceTemplate;
    action: (data: SequenceTemplate) => void;
}

const DEFAULT_STEP: Omit<SequenceStep, 'stepIndex'> = {
    delayMinutes: 1440, // 1 day
    templateSubject: '',
    templateHtml: '',
    templateText: '',
    suppressIfRepliedMinutes: 4320, // 3 days
    maxRetries: 3,
    backoffSeconds: 300, // 5 minutes
};

const TooltipLabel = ({ label, tooltipText }: { label: string; tooltipText: string }) => (
    <div className="flex items-center space-x-2">
        <Label>{label}</Label>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger type="button" asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs">{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
);

function SubmitButton({ variant = 'default', children }: { variant?: 'default' | 'ghost', children: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" name="intent" value={variant === 'ghost' ? 'draft' : 'save'} disabled={pending} variant={variant}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    )
}


export function SequenceForm({ sequence, action }: SequenceFormProps) {
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

    const formAction = (formData: FormData) => {
        const intent = formData.get('intent') as string;
        const finalStatus = intent === 'draft' ? 'draft' : 'active';
        
        const sequenceData: SequenceTemplate = {
            name,
            steps,
            status: finalStatus,
        };
        action(sequenceData);
    }
    
    return (
        <form action={formAction}>
            <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                <div className="space-y-2">
                    <TooltipLabel label="Sequence Name" tooltipText="Give your sequence a memorable name to identify it in your dashboard." />
                    <Input
                        id="sequence-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., 'Q3 Cold Prospecting'"
                        required
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
                                    type="button"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="col-span-1 space-y-2">
                                        <TooltipLabel label="Delay (minutes)" tooltipText="The time to wait BEFORE sending this step's email, in minutes. For Step 1, a delay of 0 sends immediately." />
                                        <Input
                                            id={`delay-${index}`}
                                            type="number"
                                            value={step.delayMinutes}
                                            onChange={(e) => handleStepChange(index, 'delayMinutes', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <TooltipLabel label="Subject" tooltipText="The subject line for this email step. You can use {{name}} to personalize it." />
                                    <Input
                                        id={`subject-${index}`}
                                        value={step.templateSubject}
                                        onChange={(e) => handleStepChange(index, 'templateSubject', e.target.value)}
                                        placeholder="e.g., Following up on our services"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <TooltipLabel label="HTML Body" tooltipText="The main content of your email in HTML format. Use {{name}} to personalize it with the lead's first name." />
                                    <Textarea
                                        id={`body-html-${index}`}
                                        value={step.templateHtml}
                                        onChange={(e) => handleStepChange(index, 'templateHtml', e.target.value)}
                                        placeholder="<p>Hi {{name}},</p><p>This is the HTML version of the email. Use {{name}} for personalization.</p>"
                                        className="min-h-[150px] font-mono"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <TooltipLabel label="Plain Text Body (Optional)" tooltipText="A plain text version of your email. This is highly recommended for better email deliverability and for clients that block HTML." />
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
                                                    <TooltipLabel label="Reply Suppression (mins)" tooltipText="If a lead replies, how long should the sequence be paused for them? Default is 3 days (4320 minutes). Set to a high number to effectively stop the sequence on any reply." />
                                                    <Input
                                                        id={`suppress-${index}`}
                                                        type="number"
                                                        value={step.suppressIfRepliedMinutes}
                                                        onChange={(e) => handleStepChange(index, 'suppressIfRepliedMinutes', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <TooltipLabel label="Max Retries" tooltipText="If an email fails to send due to a temporary error, how many times should the agent try again?" />
                                                    <Input
                                                        id={`retries-${index}`}
                                                        type="number"
                                                        value={step.maxRetries}
                                                        onChange={(e) => handleStepChange(index, 'maxRetries', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <TooltipLabel label="Backoff (seconds)" tooltipText="How long to wait between retries after a failed send. The agent uses exponential backoff." />
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
                    <Button variant="outline" onClick={addStep} className="w-full" type="button">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                    <div className="flex items-center space-x-2 mr-auto">
                        <Switch id="status-mode" checked={status === 'active'} onCheckedChange={(checked) => setStatus(checked ? 'active' : 'draft')} />
                        <Label htmlFor="status-mode">{status === 'active' ? 'Active' : 'Draft'}</Label>
                    </div>
                     <SubmitButton variant="ghost">Save as Draft</SubmitButton>
                     <SubmitButton>Save and Activate</SubmitButton>
                </div>
            </div>
        </form>
    );
}
