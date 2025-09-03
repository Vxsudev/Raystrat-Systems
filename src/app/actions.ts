
// src/app/actions.ts
'use server';

import {
  suggestAutomation,
  SuggestAutomationInput,
} from '@/ai/flows/suggest-automation';
import { z } from 'zod';
import { firestore } from '@/firebase/server'; // Use server-side firestore
import { FieldValue } from 'firebase-admin/firestore'; // Use server-side timestamp
import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config(); // Load environment variables

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

    const { name, email } = validatedFields.data;

    // 1. Save lead to Firestore
    try {
        const leadsCollection = firestore.collection('playbook_leads');
        await leadsCollection.add({
            name,
            email,
            timestamp: FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error('Firestore Write Error:', error);
        return {
            message: 'An error occurred writing to our database. Please try again later.',
        };
    }

    // 2. Send email with SendGrid
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
        console.error('SendGrid environment variables not set.');
        // This is a server-side error, so we don't want to expose the details to the client.
        // We still return "Success" to the user, as the lead was captured.
        // The asset delivery is the part that failed.
        return { message: 'Success' };
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Your Raystrat Systems Automation Playbook',
        html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Thank You for Your Interest!</h2>
          <p>Hi ${name},</p>
          <p>Here is the automation playbook you requested. It contains the core strategies we use to help businesses like yours eliminate bottlenecks and scale efficiently.</p>
          <p>
            <a 
              href="/playbook.pdf" 
              style="display: inline-block; padding: 12px 24px; background-color: #f5a623; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold;"
            >
              Download the Playbook PDF
            </a>
          </p>
          <p>If you have any questions or are ready to discuss a 15-minute audit, simply reply to this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The Team at Raystrat Systems</p>
        </div>
      `,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('SendGrid Error:', error);
        // Even if email fails, the lead was captured. Return success to the user.
        // In a production system, you would add monitoring here to alert you of the failure.
        return { message: 'Success' };
    }

    return { message: 'Success' };
}
