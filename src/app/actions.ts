// src/app/actions.ts
'use server';

import {
  suggestAutomation,
  SuggestAutomationInput,
} from '@/ai/flows/suggest-automation';
import { z } from 'zod';

const schema = z.object({
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
  prevState: SuggestionState,
  formData: FormData
): Promise<SuggestionState> {
  const validatedFields = schema.safeParse({
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
