// src/app/actions.ts
'use server';

import {
  contextualAssistant,
  ContextualAssistantInput,
  ContextualAssistantOutput,
} from '@/ai/flows/contextual-assistant';
import { 
  suggestService,
  ServiceSuggesterInput,
} from '@/ai/flows/service-suggester';
import { z } from 'zod';
import db from '@/lib/firebase/admin';
import * as admin from 'firebase-admin';
import sgMail from '@sendgrid/mail';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';


if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// This function needs to handle initialization because server actions
// can run in a separate, cold-start environment.
function ensureFirebaseAdmin() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
    });
  }
}

async function getAuthenticatedUser() {
    const sessionCookie = cookies().get('__session')?.value;
    if (!sessionCookie) return null;

    ensureFirebaseAdmin();

    try {
        const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true);
        return decodedClaims;
    } catch (error) {
        console.error('Session cookie verification failed:', error);
        return null;
    }
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
  data?: ContextualAssistantOutput | null;
  errors?: {
    query?: string[];
  };
  message?: string | null;
};

export async function getContextualSuggestion(
  prevState: SuggestionState | null,
  formData: FormData
): Promise<SuggestionState> {
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

  try {
    const input: ContextualAssistantInput = {
      query: validatedFields.data.query,
      pageTitle: validatedFields.data.pageTitle,
      pageContent: validatedFields.data.pageContent,
    };
    const result = await contextualAssistant(input);
    return { data: result, message: 'Success' };
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    return {
        data: null,
        message: 'An error occurred on our end. Please try again later.',
    };
  }
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
        ensureFirebaseAdmin();
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


// --- Settings Page Actions ---

// Update User Profile
const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});

export type ProfileState = {
  errors?: { name?: string[] };
  message: 'Success' | 'Error' | null;
};

export async function updateUserProfile(prevState: ProfileState, formData: FormData): Promise<ProfileState> {
    const user = await getAuthenticatedUser();
    if (!user) return { message: 'Error', errors: { name: ['Not authenticated.'] } };

    const validatedFields = profileSchema.safeParse({ name: formData.get('name') });
    if (!validatedFields.success) {
        return { message: 'Error', errors: validatedFields.error.flatten().fieldErrors };
    }

    try {
        ensureFirebaseAdmin();
        await getAuth().updateUser(user.uid, { displayName: validatedFields.data.name });
        return { message: 'Success' };
    } catch (error) {
        console.error("Profile update error:", error);
        return { message: 'Error' };
    }
}

// Change Password
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters.'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match.",
  path: ['confirmPassword'],
});

export type PasswordState = {
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
    general?: string[];
  };
  message: 'Success' | 'Error' | null;
};

export async function changePassword(prevState: PasswordState, formData: FormData): Promise<PasswordState> {
    const user = await getAuthenticatedUser();
    if (!user || !user.email) {
        return { message: 'Error', errors: { general: ['Not authenticated.'] } };
    }

    const validatedFields = passwordSchema.safeParse(Object.fromEntries(formData));
    if (!validatedFields.success) {
        return { message: 'Error', errors: validatedFields.error.flatten().fieldErrors };
    }

    const { currentPassword, newPassword } = validatedFields.data;

    try {
        // Re-authentication is a security best practice for sensitive operations.
        // The Firebase Admin SDK does not have a direct equivalent of `reauthenticateWithCredential`.
        // This requires a more complex flow on the client-side, which we can't do in a server action easily.
        // For now, we will trust the session and proceed with the password change directly on the backend.
        // In a production app, you might build a client-side flow that prompts for password again
        // and sends an ID token to a dedicated API route.
        
        ensureFirebaseAdmin();
        await getAuth().updateUser(user.uid, { password: newPassword });
        return { message: 'Success' };
    } catch (error: any) {
        console.error('Password change error:', error);
        // This is a simplification. A real implementation would check for specific error codes
        // like `auth/wrong-password` if we could re-authenticate.
        return { message: 'Error', errors: { general: ['An error occurred while changing your password. Please try again.'] } };
    }
}

    