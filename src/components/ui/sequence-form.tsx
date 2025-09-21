// src/components/ui/sequence-form.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Sequence, SequenceStep } from '@/app/dashboard/page';

interface SequenceFormProps {
    sequence?: Sequence;
    onSave: (data: Omit<Sequence, 'id' | 'leads' | 'sent' | 'replied' | 'booked'>) => void;
}

export function SequenceForm({ sequence, onSave }: SequenceFormProps) {
    const [name, setName] = useState(sequence?.name || '');
    const [steps, setSteps] = useState<SequenceStep[]>(sequence?.steps || [
        { delayDays: 0, subject: '', body: '' }
    ]);
    const [status, setStatus] = useState<'draft' | 'active'>(sequence?.status === 'active' ? 'active' : 'draft');

    const handleStepChange = (index: number, field: keyof SequenceStep, value: string | number) => {
        const newSteps = [...steps];
        (newSteps[index] as any)[field] = value;
        setSteps(newSteps);
    };

    const addStep = () => {
        setSteps([...steps, { delayDays: 3, subject: '', body: '' }]);
    };

    const removeStep = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
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
                                className="absolute top-2 right-2"
                                onClick={() => removeStep(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-1 space-y-2">
                                    <Label htmlFor={`delay-${index}`}>Delay (days)</Label>
                                    <Input
                                        id={`delay-${index}`}
                                        type="number"
                                        value={step.delayDays}
                                        onChange={(e) => handleStepChange(index, 'delayDays', parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`subject-${index}`}>Subject</Label>
                                <Input
                                    id={`subject-${index}`}
                                    value={step.subject}
                                    onChange={(e) => handleStepChange(index, 'subject', e.target.value)}
                                    placeholder="e.g., Following up"
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`body-${index}`}>Body</Label>
                                <Textarea
                                    id={`body-${index}`}
                                    value={step.body}
                                    onChange={(e) => handleStepChange(index, 'body', e.target.value)}
                                    placeholder="Use {{name}} for personalization."
                                    className="min-h-[150px]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
                 <Button variant="outline" onClick={addStep} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Step
                </Button>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button variant="ghost" onClick={() => setStatus('draft')}>Save as Draft</Button>
                <Button onClick={handleSave}>Save and Activate</Button>
            </div>
        </div>
    );
}
