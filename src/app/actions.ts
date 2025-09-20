// src/app/actions.ts
'use server';

import {
  contextualAssistant,
  ContextualAssistantInput,
} from '@/ai/flows/contextual-assistant';
import { 
  suggestService,
  ServiceSuggesterInput,
} from '@/ai/flows/service-suggester';
import { z } from 'zod';
import db from '@/lib/firebase/admin';
import sgMail from '@sendgrid/mail';
import { createStreamableValue } from 'ai/rsc';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// --- AI Contextual Assistant Action (Conversational) ---

const suggestionSchema = z.object({
  query: z
    .string({
      required_error: 'Please ask a question or describe a problem.',
    })
    .min(10, {
      message: 'Please enter at least 10 characters.',
    }),
  pageTitle: z.string(),
  pageContent: z.string(),
});

export type SuggestionState = {
  data?: any;
  errors?: {
    query?: string[];
  };
  message?: string | null;
};

export async function getContextualSuggestion(
  prevState: SuggestionState | null,
  formData: FormData
) {
  const validatedFields = suggestionSchema.safeParse({
    query: formData.get('query'),
    pageTitle: formData.get('pageTitle'),
    pageContent: formData.get('pageContent'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }

  const stream = createStreamableValue();

  (async () => {
    try {
      const input: ContextualAssistantInput = {
        query: validatedFields.data.query,
        pageTitle: validatedFields.data.pageTitle,
        pageContent: validatedFields.data.pageContent,
      };
      const result = await contextualAssistant(input);
      stream.done(result);
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      stream.done({
        response: 'An error occurred on our end. Please try again later.',
      });
    }
  })();
  
  return { data: stream.value };
}


// --- AI Service Suggester Action (Homepage) ---

const serviceSuggestionSchema = z.object({
  bottleneck: z.string().min(10, { message: 'Please describe your bottleneck in at least 10 characters.' }),
});

export type ServiceSuggestionState = {
  errors?: {
    bottleneck?: string[];
  };
  message?: string | null;
  data?: {
    serviceSlug: string;
    suggestion: string;
  } | null;
}

export async function getServiceSuggestion(prevState: ServiceSuggestionState, formData: FormData): Promise<ServiceSuggestionState> {
  const validatedFields = serviceSuggestionSchema.safeParse({
    bottleneck: formData.get('bottleneck'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }
  
  try {
    const input: ServiceSuggesterInput = {
      bottleneck: validatedFields.data.bottleneck,
    };
    const result = await suggestService(input);
    return {
      message: 'Success',
      data: {
        serviceSlug: result.serviceSlug,
        suggestion: result.suggestion,
      },
    };
  } catch (error) {
     console.error('Service Suggestion Error:', error);
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
            createdAt: now,
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


// --- Notes Taker Action ---

const notesSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  businessName: z.string().optional(),
  notes: z.string().min(10, { message: 'Notes must be at least 10 characters.' }),
  serviceName: z.string(),
});

export type NotesState = {
  errors?: {
    name?: string[];
    email?: string[];
    businessName?: string[];
    notes?: string[];
  };
  message: string | null;
};

export async function saveAndSendNotes(
  prevState: NotesState | null,
  formData: FormData
): Promise<NotesState> {
  const validatedFields = notesSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    businessName: formData.get('businessName'),
    notes: formData.get('notes'),
    serviceName: formData.get('serviceName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }

  const { name, email, businessName, notes, serviceName } = validatedFields.data;

  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.error('SendGrid API Key or From Email is not configured.');
    return { message: 'Server configuration error: Email service is not set up.' };
  }

  // Define the two emails to send
  const emailToOwner = {
    to: process.env.SENDGRID_FROM_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `New Notes Lead from ${name} (${serviceName})`,
    html: `
        <h2>New Lead via Notes Taker</h2>
        <p>You've received a new lead from the notes section on the <strong>${serviceName}</strong> page.</p>
        <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Business:</strong> ${businessName || 'Not provided'}</li>
        </ul>
        <h3>Notes:</h3>
        <pre>${notes}</pre>
    `,
  };

  const emailToUser = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Your Notes on ${serviceName} from Raystrat Systems`,
    html: `
        <h2>Your Notes from Raystrat Systems</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your interest in the <strong>${serviceName}</strong>. Here is a copy of the notes you took for your records:</p>
        <hr>
        <pre>${notes}</pre>
        <hr>
        <p>If you'd like to discuss how this agent can solve your specific bottlenecks, you can book a free 15-minute audit with our team.</p>
        <p><a href="https://calendly.com/raystrat/15-min-audit">Book Your Free Audit Now</a></p>
        <p>Best,<br>The Raystrat Systems Team</p>
    `,
  };

  try {
    // Send both emails in parallel
    await Promise.all([sgMail.send(emailToOwner), sgMail.send(emailToUser)]);

    return { message: 'Success! Your notes have been sent to your email.' };

  } catch (error) {
    console.error('Notes Taker Email Error:', error);
    return { message: 'An internal server error occurred while sending the email.' };
  }
}
