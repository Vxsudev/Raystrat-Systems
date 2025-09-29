// src/app/actions.ts
'use server';

import {
  ContextualAssistantInput,
  ContextualAssistantOutput,
  getContextualAssistantResponse
} from '@/ai/flows/contextual-assistant';
import { 
  ServiceSuggesterInput,
  ServiceSuggesterOutput,
  getServiceSuggestion
} from '@/ai/flows/service-suggester';
import {
  NotesAnalyzerInput,
  NotesAnalyzerOutput,
  analyzeNotes
} from '@/ai/flows/notes-analyzer';
import { z } from 'zod';
// Import the new centralized authentication helper and the admin SDK instances
import { getAuthenticatedUser } from '@/lib/auth/getAuthenticatedUser';
import { db, adminAuth } from '@/lib/firebase/admin';
import sgMail from '@sendgrid/mail';
import { Sequence, SequenceStep, SequenceTemplate } from './dashboard/page';

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
    const result = await getContextualAssistantResponse(input);
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
    general?: string[];
  };
  message: 'Success' | 'Error' | 'pending' | null;
  data?: ServiceSuggesterOutput | null;
}

export async function getServiceSuggestionAction(prevState: ServiceSuggestionState, formData: FormData): Promise<ServiceSuggestionState> {
  const validatedFields = serviceSuggestionSchema.safeParse({
    bottleneck: formData.get('bottleneck'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error',
    };
  }
  
  try {
    const input: ServiceSuggesterInput = {
      problemDescription: validatedFields.data.bottleneck,
    };
    const result = await getServiceSuggestion(input);
    return {
      message: 'Success',
      data: result,
    };
  } catch (error) {
     console.error('Service Suggestion Error:', error);
    return {
      message: 'Error',
      data: null,
      errors: { general: ['An error occurred on our end. Please try again later.'] },
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
    let aiSuggestion: NotesAnalyzerOutput | null = null;
    try {
      const analysisInput: NotesAnalyzerInput = { notes };
      aiSuggestion = await analyzeNotes(analysisInput);
    } catch (aiError) {
      console.error('AI Note Analysis Error:', aiError);
      // If AI fails, we can fall back to a default message.
    }
    
    const suggestionText = aiSuggestion?.suggestion 
        ? `<p>${aiSuggestion.suggestion}</p>`
        : '<p>If you\'d like to discuss how our agents can solve your specific bottlenecks, you can book a free 15-minute audit with our team here: <a href="https://calendly.com/raystrat/15-min-audit">Book Your Free Audit Now</a></p>';
    
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
              <li><strong><strong>Email:</strong> ${email}</li>
              <li><strong>Business:</strong> ${businessName || 'Not provided'}</li>
              <li><strong>Industry:</strong> ${industry || 'Not provided'}</li>
          </ul>
          <h3>Notes:</h3>
          <pre>${notes}</pre>
          <h3>Raystrat's Follow-Up Agent Analysis (AI) :</h3>
          ${suggestionText}
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
          <h3>Raystrat's Follow-Up Agent Analysis (AI) :</h3>
          ${suggestionText}
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
        await adminAuth.updateUser(user.uid, { displayName: validatedFields.data.name });
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
        
        await adminAuth.updateUser(user.uid, { password: newPassword });
        return { message: 'Success' };
    } catch (error: any) {
        console.error('Password change error:', error);
        // A more advanced implementation would check for specific error codes
        // from Firebase to give more specific feedback, e.g., 'auth/weak-password'.
        return { message: 'Error', errors: { general: ['An error occurred while changing your password. Please try again.'] } };
    }
}

// --- Sequence Management Actions ---

const sequenceStepSchema = z.object({
    stepIndex: z.number(),
    delayMinutes: z.number().min(0),
    templateSubject: z.string().min(1, 'Subject is required.'),
    templateHtml: z.string().min(1, 'HTML body is required.'),
    templateText: z.string().optional(),
    suppressIfRepliedMinutes: z.number().optional(),
    maxRetries: z.number().optional(),
    backoffSeconds: z.number().optional(),
});

const sequenceTemplateSchema = z.object({
    name: z.string().min(1, 'Sequence name is required.'),
    status: z.enum(['draft', 'active']),
    steps: z.array(sequenceStepSchema).min(1, 'Sequence must have at least one step.'),
});


export type SaveSequenceState = {
  errors?: {
    name?: string[];
    steps?: string[];
    general?: string[];
  };
  message: 'Success' | 'Error' | null;
  data?: SequenceTemplate | null;
};

export async function saveSequenceTemplate(
    prevState: SaveSequenceState, 
    formData: SequenceTemplate
): Promise<SaveSequenceState> {
    const user = await getAuthenticatedUser();
    // In a real multi-tenant app, you'd get the tenantId from the user's claims.
    // For now, we'll use a hardcoded one for simplicity.
    const tenantId = user?.claims.tenantId || 'tenant_a'; 

    if (!user) {
        return { message: 'Error', errors: { general: ['Not authenticated.'] } };
    }
    
    const validatedFields = sequenceTemplateSchema.safeParse(formData);

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            message: 'Error',
            errors: {
                name: fieldErrors.name,
                steps: fieldErrors.steps,
                general: fieldErrors.steps ? ['Please check for errors in your sequence steps.'] : undefined
            }
        };
    }

    try {
        const templateData = {
            ...validatedFields.data,
            tenantId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const docRef = db.collection('sequenceTemplates').doc();
        await docRef.set(templateData);

        const savedData: SequenceTemplate = {
            id: docRef.id,
            ...templateData
        };

        return { message: 'Success', data: savedData };
    } catch (error) {
        console.error('Error saving sequence template:', error);
        return { message: 'Error', errors: { general: ['Could not save the sequence to the database.'] } };
    }
}

export async function getSequenceTemplates(): Promise<Sequence[]> {
    const user = await getAuthenticatedUser();
    const tenantId = user?.claims.tenantId || 'tenant_a';

    if (!user) {
        // This should not happen if the page is protected, but it's a good safeguard.
        return [];
    }

    try {
        const snapshot = await db.collection('sequenceTemplates')
            .where('tenantId', '==', tenantId)
            .orderBy('createdAt', 'desc')
            .get();

        if (snapshot.empty) {
            return [];
        }

        const templates: Sequence[] = snapshot.docs.map(doc => {
            const data = doc.data() as Omit<SequenceTemplate, 'id'>;
            return {
                id: doc.id,
                ...data,
                status: data.status || 'draft', // Ensure status is set
                // For now, these are placeholders. In a future step, this data would come
                // from an analytics collection.
                leads: 0, 
                sent: 0,
                replied: 0,
                booked: 0,
            };
        });

        return templates;
    } catch (error) {
        console.error("Error fetching sequence templates:", error);
        // In a real app, you might want to throw the error to be caught by an error boundary.
        // For now, we'll return an empty array to prevent the UI from crashing.
        return [];
    }
}


// --- Lead Enrollment Actions ---

const enrollLeadsSchema = z.object({
  sequenceId: z.string().min(1, 'A sequence must be selected.'),
  startInMinutes: z.number().min(0),
  leadsCSV: z.string().optional(),
  leadsPasted: z.string().optional(),
}).refine(data => data.leadsCSV || data.leadsPasted, {
  message: 'You must provide leads via CSV or pasted text.',
  path: ['general'],
});


export type EnrollLeadsState = {
  errors?: {
    sequenceId?: string[];
    leadsCSV?: string[];
    leadsPasted?: string[];
    general?: string[];
  };
  message: 'Success' | 'Error' | null;
  data?: {
    enrolledCount: number;
  } | null;
}

export async function enrollLeadsFromCSV(prevState: EnrollLeadsState, formData: FormData): Promise<EnrollLeadsState> {
  const user = await getAuthenticatedUser();
  if (!user || !user.claims.tenantId || !user.token) {
    return { message: 'Error', errors: { general: ['Authentication error: No tenant ID found or token is missing.'] } };
  }
  const tenantId = user.claims.tenantId;

  if (!process.env.AGENT_API_BASE_URL) {
    console.error("AGENT_API_BASE_URL is not set.");
    return { message: 'Error', errors: { general: ['Server configuration error: Agent API URL is not set.'] } };
  }

  const validatedFields = enrollLeadsSchema.safeParse({
    sequenceId: formData.get('sequenceId'),
    startInMinutes: Number(formData.get('startInMinutes') || 0),
    leadsCSV: formData.get('leadsCSV'),
    leadsPasted: formData.get('leadsPasted'),
  });

  if (!validatedFields.success) {
    return { message: 'Error', errors: validatedFields.error.flatten().fieldErrors };
  }

  const { sequenceId, startInMinutes, leadsCSV, leadsPasted } = validatedFields.data;

  try {
    // Fetch the full sequence template
    const seqTemplateSnap = await db.collection('sequenceTemplates').doc(sequenceId).get();
    if (!seqTemplateSnap.exists) {
      return { message: 'Error', errors: { general: ['Sequence template not found.'] } };
    }
    const sequenceTemplate = seqTemplateSnap.data() as SequenceTemplate;
    const steps = sequenceTemplate.steps;

    // Parse leads from CSV or pasted text
    const leadsRaw = leadsCSV || leadsPasted || '';
    const lines = leadsRaw.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 1) {
        return { message: 'Error', errors: { general: ['No lead data found. Please provide a header row and at least one lead.'] } };
    }
    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const emailIndex = header.indexOf('email');
    const nameIndex = header.indexOf('name');

    if (emailIndex === -1) {
      return { message: 'Error', errors: { general: ['CSV data must contain an "email" column.'] } };
    }

    const leads = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        email: values[emailIndex]?.trim(),
        name: nameIndex > -1 ? values[nameIndex]?.trim() : undefined,
      };
    }).filter(lead => lead.email);
    
    if (leads.length === 0) {
        return { message: 'Error', errors: { general: ['No valid leads found in the provided data.'] } };
    }
    
    const apiUrl = `${process.env.AGENT_API_BASE_URL}/followup/lead-intake`;
    
    let enrolledCount = 0;
    // Batch enroll leads to avoid overwhelming the service
    const enrollmentPromises = leads.map(lead => {
        const payload = {
            ...lead,
            steps,
            startInMinutes,
            force: true, // Allow re-enrollment for simplicity in this UI
        };

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`, // Use the user's ID token
            },
            body: JSON.stringify(payload),
        }).then(res => {
            if (res.ok) enrolledCount++;
            // In a real app, you'd collect and report failures more granularly
        });
    });

    await Promise.all(enrollmentPromises);
    
    return { message: 'Success', data: { enrolledCount } };

  } catch (error) {
    console.error('Lead enrollment error:', error);
    return { message: 'Error', errors: { general: ['An internal server error occurred while enrolling leads.'] } };
  }
}

// --- Playbook Action ---

const playbookSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type PlaybookState = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message: string | null;
};


export async function playbookAction(prevState: PlaybookState, formData: FormData): Promise<PlaybookState> {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.error('SendGrid API Key or From Email is not configured.');
    return { message: 'Server configuration error.' };
  }

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

  try {
    // 1. Write lead to Firestore
    await db.collection('playbook_leads').add({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    // 2. Send email via SendGrid
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Your Raystrat Systems Playbook',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your interest in Raystrat Systems.</p>
        <p>You can access the playbook using the link below:</p>
        <p><a href="/playbook.pdf">Download Your Playbook</a></p>
        <p>Best,<br>The Raystrat Systems Team</p>
      `,
    };
    
    await sgMail.send(msg);

    return { message: 'Success! Your playbook is on its way.' };

  } catch (error) {
    console.error('Playbook Action Error:', error);
    return { message: 'An internal server error occurred.' };
  }
}

    