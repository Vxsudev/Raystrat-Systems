// src/components/ui/add-leads-form.tsx
'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, UploadCloud } from 'lucide-react';
import { Sequence, EnrollLeadsState } from '@/app/dashboard/page';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                </>
            ) : (
                'Enroll Leads'
            )}
        </Button>
    );
}

interface AddLeadsFormProps {
    sequences: Sequence[];
    action: (data: FormData) => void;
    state?: EnrollLeadsState;
}

export function AddLeadsForm({ sequences, action, state }: AddLeadsFormProps) {
    const [csvContent, setCsvContent] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setCsvContent(text);
            };
            reader.readAsText(file);
        }
    };
    
    return (
        <form action={action} className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="sequenceId">Select Sequence</Label>
                <Select name="sequenceId" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a sequence..." />
                    </SelectTrigger>
                    <SelectContent>
                        {sequences.filter(s => s.status === 'active').map(seq => (
                            <SelectItem key={seq.id} value={seq.id}>
                                {seq.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 {state?.errors?.sequenceId && <p className="text-sm text-destructive">{state.errors.sequenceId[0]}</p>}
            </div>

            <div className="space-y-2">
                 <Label htmlFor="startInMinutes">Start Delay (minutes)</Label>
                 <Input id="startInMinutes" name="startInMinutes" type="number" defaultValue="0" min="0" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="leads-csv">Upload CSV File</Label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">CSV file with 'email' and 'name' columns</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
                    </label>
                </div> 
            </div>

            <div className="space-y-2">
                <Label htmlFor="leads-pasted">Or Paste CSV Data</Label>
                <Textarea
                    id="leads-pasted"
                    name="leadsPasted"
                    value={csvContent}
                    onChange={(e) => setCsvContent(e.target.value)}
                    placeholder={'email,name\njane.doe@example.com,Jane Doe\nsupport@raystrat.com,Raystrat Support'}
                    className="min-h-[120px] font-mono text-xs"
                />
            </div>

            {state?.errors?.general && <p className="text-sm text-center text-destructive">{state.errors.general[0]}</p>}
            
            <div className="pt-4">
                <SubmitButton />
            </div>
        </form>
    );
}