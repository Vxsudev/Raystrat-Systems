// src/app/actions.ts
'use server';

import {
  suggestAutomation,
  SuggestAutomationInput,
} from '@/ai/flows/suggest-automation';
import { z } from 'zod';
import db from '@/lib/firebase/admin';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// --- AI Suggestion Action ---

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

// --- Favorite Agent Action ---

const favoriteAgentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  agentName: z.string(),
  agentSlug: z.string(),
});

export type FavoriteAgentState = {
    errors?: {
        name?: string[];
        email?: string[];
    },
    message: string | null;
}

export async function favoriteAgentAction(prevState: FavoriteAgentState | null, formData: FormData): Promise<FavoriteAgentState> {
    const validatedFields = favoriteAgentSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        agentName: formData.get('agentName'),
        agentSlug: formData.get('agentSlug'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid input.',
        }
    }

    const { name, email, agentName, agentSlug } = validatedFields.data;

    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
        console.error('SendGrid API Key or From Email is not configured.');
        return { message: 'Server configuration error.' };
    }

    try {
        // 1. Write lead to Firestore & Enroll in Sequence
        const now = new Date();
        await db.collection('favorite_agent_leads').add({
            name,
            email,
            agentName,
            agentSlug,
            createdAt: now.toISOString(),
            sequenceState: 'active', // Enroll in sequence
            currentStep: 0, // Start at step 0
            lastStepCompletedAt: null,
            nextStepScheduledAt: now, // Schedule the first step immediately
        });

        // 2. Send initial confirmation email via SendGrid
        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: `Next Steps for ${agentName}`,
            html: `
                <p>Hi ${name},</p>
                <p>Thank you for your interest in the <strong>${agentName}</strong>.</p>
                <p>You can find more details and book a specific demo for this agent by visiting the service page:</p>
                <p><a href="https://raystrat.com/services/${agentSlug}">View the ${agentName} Page</a></p>
                <p>Our team will also be in touch shortly to answer any questions you might have.</p>
                <p>Best,<br>The Raystrat Systems Team</p>
            `,
        };
        
        await sgMail.send(msg);

        return { message: 'Success! Check your email for next steps.' };

    } catch (error) {
        console.error('Favorite Agent API Error:', error);
        return { message: 'An internal server error occurred.' };
    }
}
