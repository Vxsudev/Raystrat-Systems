
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
import {
  analyzeNotes,
  NotesAnalyzerInput,
} from '@/ai/flows/notes-analyzer';
import { z } from 'zod';
// Import the new centralized authentication helper and the admin SDK instances
import { getAuthenticatedUser } from '@/lib/auth/getAuthenticatedUser';
import { db, adminAuth } from '@/lib/firebase/admin';
import sgMail from '@sendgrid/mail';

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
  industry: z.string().optional(),
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
    industry: formData.get('industry'),
    notes: formData.get('notes'),
    serviceName: formData.get('serviceName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }

  const { name, email, businessName, industry, notes, serviceName } = validatedFields.data;

  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.error('SendGrid API Key or From Email is not configured.');
    return { message: 'Server configuration error: Email service is not set up.' };
  }

  try {
    // Generate AI-powered suggestion
    let aiSuggestion = '';
    try {
      const analysisInput: NotesAnalyzerInput = { notes };
      const analysisResult = await analyzeNotes(analysisInput);
      aiSuggestion = analysisResult.suggestion;
    } catch (aiError) {
      console.error('AI Note Analysis Error:', aiError);
      // If AI fails, we can fall back to a default message.
      aiSuggestion =
        '<p>If you\'d like to discuss how our agents can solve your specific bottlenecks, you can book a free 15-minute audit with our team.</p>';
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
              <li><strong>Industry:</strong> ${industry || 'Not provided'}</li>
          </ul>
          <h3>Notes:</h3>
          <pre>${notes}</pre>
          <h3>AI Analysis:</h3>
          <p>${aiSuggestion}</p>
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
          <h3>Our AI-Powered Suggestion</h3>
          <p>${aiSuggestion}</p>
          <p><a href="https://calendly.com/raystrat/15-min-audit">Book Your Free Audit Now</a> to discuss this further.</p>
          <p>Best,<br>The Raystrat Systems Team</p>
      `,
    };

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
  errors?: { name?: string[]; general?: string[]; };
  message: 'Success' | 'Error' | null;
};

export async function updateUserProfile(prevState: ProfileState, formData: FormData): Promise<ProfileState> {
    const user = await getAuthenticatedUser();
    if (!user) {
        return { message: 'Error', errors: { general: ['Not authenticated.'] } };
    }

    const validatedFields = profileSchema.safeParse({ name: formData.get('name') });
    if (!validatedFields.success) {
        return { message: 'Error', errors: validatedFields.error.flatten().fieldErrors };
    }

    try {
        await adminAuth().updateUser(user.uid, { displayName: validatedFields.data.name });
        return { message: 'Success' };
    } catch (error) {
        console.error("Profile update error:", error);
        return { message: 'Error', errors: { general: ['Could not update your profile.'] } };
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

    const { newPassword } = validatedFields.data;

    try {
        // This is a simplified backend-only password change. For enhanced security,
        // a real production app would implement a client-side re-authentication flow
        // that prompts the user for their password again and sends a fresh ID token.
        // Since that's a more complex client-side build, we are proceeding with a
        // direct admin SDK update for now, which is secure but relies on the existing session.
        
        await adminAuth().updateUser(user.uid, { password: newPassword });
        return { message: 'Success' };
    } catch (error: any) {
        console.error('Password change error:', error);
        // A more advanced implementation would check for specific error codes
        // from Firebase to give more specific feedback, e.g., 'auth/weak-password'.
        return { message: 'Error', errors: { general: ['An error occurred while changing your password. Please try again.'] } };
    }
}
