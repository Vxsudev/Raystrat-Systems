// src/app/actions.ts
'use server';

import {
  suggestAutomation,
  SuggestAutomationInput,
} from '@/ai/flows/suggest-automation';
import { z } from 'zod';
import { firestore } from '@/lib/firebase/admin'; // Use server-side firestore
import { FieldValue } from 'firebase-admin/firestore'; // Use server-side timestamp
import sgMail from '@sendgrid/mail';

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

    // 2. Send email 
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
        console.error("SendGrid environment variables not set.");
        return { message: 'Success' }; // Still success, lead was captured
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
    }

    return { message: 'Success' };
}

// --- Favorite Agent Action ---

const favoriteAgentSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  agentName: z.string(),
  agentSlug: z.string(),
});

export type FavoriteAgentFormState = {
    errors?: {
        name?: string[];
        email?: string[];
    };
    message?: string | null;
};

export async function favoriteAgentAction(
    prevState: FavoriteAgentFormState | null,
    formData: FormData
): Promise<FavoriteAgentFormState> {
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
        };
    }

    const { name, email, agentName, agentSlug } = validatedFields.data;

    try {
        const leadsCollection = firestore.collection('favorite_agent_leads');
        await leadsCollection.add({
            name,
            email,
            agentName,
            agentSlug,
            timestamp: FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error('Firestore Write Error (Favorite Agent):', error);
        return {
            message: 'An error occurred saving your interest. Please try again.',
        };
    }

    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
        console.error('SendGrid environment variables not set.');
        return { message: 'Success' };
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const calendlyUrl = 'https://calendly.com/raystrat/15-min-audit?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=d4af37';
    
    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: `Next Steps for the ${agentName}`,
        html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Your Interest in the ${agentName}</h2>
          <p>Hi ${name},</p>
          <p>Thank you for expressing interest in our ${agentName}. This is a powerful step toward automating key parts of your business.</p>
          <p>Are you ready to see exactly how it could work for you? The next step is a brief, no-pressure 15-minute audit where we can discuss your specific needs.</p>
          <p>
            <a 
              href="${calendlyUrl}" 
              style="display: inline-block; padding: 12px 24px; background-color: #f5a623; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold;"
            >
              Book a 15-Minute Demo
            </a>
          </p>
          <p>If you have any preliminary questions, feel free to reply directly to this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The Team at Raystrat Systems</p>
        </div>
      `,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('SendGrid Error (Favorite Agent):', error);
        return { message: 'Success' };
    }

    return { message: 'Success' };
}
    