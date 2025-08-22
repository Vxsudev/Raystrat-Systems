
// src/app/actions.ts
'use server';

import {
  suggestAutomation,
  SuggestAutomationInput,
} from '@/ai/flows/suggest-automation';
import { z } from 'zod';

const suggestionSchema = z.object({
  contentBottleneckDescription: z
    .string({
      required_error: 'Please describe your content bottleneck.',
    })
    .min(20, {
      message: 'Please describe your bottleneck in at least 20 characters.',
    }),
});

export type SuggestionState = {
  errors?: {
    contentBottleneckDescription?: string[];
  };
  message?: string | null;
  data?: {
    suggestedService: string;
    reasoning: string;
  } | null;
};

export async function getAutomationSuggestion(
  prevState: SuggestionState | null,
  formData: FormData
): Promise<SuggestionState> {
  const validatedFields = suggestionSchema.safeParse({
    contentBottleneckDescription: formData.get('contentBottleneckDescription'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }

  try {
    const input: SuggestAutomationInput = {
      contentBottleneckDescription:
        validatedFields.data.contentBottleneckDescription,
    };
    const result = await suggestAutomation(input);
    return { message: 'Success', data: result };
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    return {
      message:
        'An error occurred on our end. Please try again later.',
    };
  }
}

// --- Playbook Download Action ---

const playbookSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
});

export type PlaybookFormState = {
    errors?: {
        name?: string[];
        email?: string[];
    };
    message?: string | null;
};

export async function downloadPlaybookAction(
    prevState: PlaybookFormState | null,
    formData: FormData
): Promise<PlaybookFormState> {
    const validatedFields = playbookSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid input.',
        };
    }

    try {
        // In a real application, you would add the contact to your CRM
        // or email marketing service here.
        console.log('New Playbook Lead:', validatedFields.data);

        return { message: 'Success' };

    } catch (error) {
        console.error('Playbook Form Error:', error);
        return {
            message: 'An error occurred on our end. Please try again later.',
        };
    }
}
