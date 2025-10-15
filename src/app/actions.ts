

'use server';

import { 
  ServiceSuggesterInput,
  getServiceSuggestion,
} from '@/ai/flows/service-suggester';
import {
  NotesAnalyzerInput,
  NotesAnalyzerOutput,
  analyzeNotes
} from '@/ai/flows/notes-analyzer';
import {
  ContextualAssistantInput,
  ContextualAssistantOutput,
  getContextualAssistantResponse
} from '@/ai/flows/contextual-assistant';
import { z } from 'zod';
// Import the new centralized authentication helper and the admin SDK instances
import { getAuthenticatedUser } from '@/lib/auth/getAuthenticatedUser';
import { db, adminAuth } from '@/lib/firebase/admin';
import sgMail from '@sendgrid/mail';
import { Sequence, SequenceStep, SequenceTemplate } from './dashboard/page';


if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// --- (A) HOMEPAGE AI SERVICE SUGGESTER ACTION ---
const serviceSuggestionSchema = z.object({
  problemDescription: z.string().min(10, { message: 'Please describe your bottleneck in at least 10 characters.' }),
});

export type ServiceSuggestionState = {
  errors?: {
    problemDescription?: string[];
    general?: string;
  };
  message: 'Success' | 'Error' | null;
  data?: {
    suggestedServiceTitle: string;
    suggestedServiceSlug: string;
    justification: string;
    problemDescription: string;
  } | null;
}

export async function suggestServiceAction(
  prevState: ServiceSuggestionState, 
  formData: FormData
): Promise<ServiceSuggestionState> {
  const validatedFields = serviceSuggestionSchema.safeParse({
    problemDescription: formData.get('bottleneck'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error',
      data: null,
    };
  }

  try {
    const suggestion = await getServiceSuggestion(validatedFields.data);
    return {
      message: 'Success',
      errors: {},
      data: { ...suggestion, problemDescription: validatedFields.data.problemDescription },
    };
  } catch (error: any) {
    console.error('Service Suggestion Error:', error);
    return {
      message: 'Error',
      errors: { general: [error.message] || ['An error occurred. Please try again.'] },
      data: null,
    };
  }
}


// --- (B) SERVICE PAGE CONTEXTUAL ASSISTANT ACTION ---
const contextualSuggestionSchema = z.object({
  query: z.string().min(1, { message: 'Please enter a question or problem.' }),
  pageTitle: z.string().optional(),
  pageContent: z.string().optional(),
});

export type ContextualSuggestionState = {
  id: number | null; // Unique ID for the response
  errors?: {
    query?: string[];
    general?: string;
  };
  message: 'Success' | 'Error' | null;
  data?: ContextualAssistantOutput | null;
  formData?: FormData;
}

export async function getContextualSuggestion(prevState: ContextualSuggestionState, formData: FormData): Promise<ContextualSuggestionState> {
    const validatedFields = contextualSuggestionSchema.safeParse({
        query: formData.get('query'),
        pageTitle: formData.get('pageTitle'),
        pageContent: formData.get('pageContent'),
    });

    if (!validatedFields.success) {
        return {
            id: Date.now(),
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Error',
        };
    }
    
    const { query, pageTitle, pageContent } = validatedFields.data;

    try {
        let result: ContextualAssistantOutput;
        if (pageTitle && pageContent && pageTitle.trim() !== '' && pageContent.trim() !== '') {
            const input: ContextualAssistantInput = { query, pageTitle, pageContent };
            result = await getContextualAssistantResponse(input);
        } else {
             // Fallback to service suggester if context is missing, though this path shouldn't be hit on service pages.
            const input: ServiceSuggesterInput = { problemDescription: query };
            const serviceSuggesterResult = await getServiceSuggestion(input);
            result = { response: serviceSuggesterResult.justification, suggestedService: { slug: serviceSuggesterResult.suggestedServiceSlug, title: serviceSuggesterResult.suggestedServiceTitle }};
        }

        return {
            id: Date.now(),
            message: 'Success',
            data: result,
            formData: formData,
        };
    } catch (error: any) {
        console.error('AI Suggestion Error:', error);
        return {
            id: Date.now(),
            message: 'Error',
            errors: { general: [error.message] || ['An error occurred on our end. Please try again.'] },
            data: null,
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


// --- (C) NOTES TAKER / ANALYZER ACTION ---

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

// Helper function to parse the AI's structured text response
function parseAIResponse(responseText: string): Record<string, string> {
    const sections: Record<string, string> = {};
    const lines = responseText.split('\n');
    
    const sectionHeaders = ["Subject:", "Pain:", "Diagnosis:", "Suggestion:", "CTA:"];
    let currentSectionKey = '';
    
    for (const line of lines) {
        const headerMatch = sectionHeaders.find(h => line.startsWith(h));
        if (headerMatch) {
            currentSectionKey = headerMatch.replace(':', '').trim().toLowerCase();
            const content = line.substring(headerMatch.length).trim();
            sections[currentSectionKey] = content;
        } else if (currentSectionKey && line.trim() !== '') {
            sections[currentSectionKey] = (sections[currentSectionKey] ? sections[currentSectionKey] + '\n' : '') + line.trim();
        }
    }
    return sections;
}


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
    let analysisResult: NotesAnalyzerOutput | null = null;
    let parsedAnalysis: Record<string, string> | null = null;
    let emailSubject = `Your Analysis from Raystrat Systems`; // Default subject

    try {
      const analysisInput: NotesAnalyzerInput = { notes, serviceName };
      analysisResult = await analyzeNotes(analysisInput);
      if (analysisResult?.response) {
        parsedAnalysis = parseAIResponse(analysisResult.response);
        if (parsedAnalysis.subject) {
            emailSubject = parsedAnalysis.subject;
        }
      }
    } catch (aiError) {
      console.error('AI Note Analysis Error:', aiError);
      // Fallback: AI fails, we proceed without analysis but still send the notes.
    }
    
    const emailStyles = `
        <style>
            body { font-family: sans-serif; color: #333; }
            .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 5px; }
            h2, h3 { color: #111; }
            .section { padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid #f0f0f0; }
            .label { font-weight: bold; color: #555; display: block; margin-bottom: 4px; }
            .content { margin-bottom: 10px; }
            .notes-box { background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin: 20px 0; }
            ul { padding-left: 20px; }
            li { margin-bottom: 5px; }
            pre { white-space: pre-wrap; font-family: sans-serif; font-size: 14px; }
        </style>
    `;

    const ownerEmailHtml = `
      <html><head>${emailStyles}</head><body><div class="container">
          <h2>New Lead via Notes Taker</h2>
          <div class="section">
              <span class="label">From Page:</span>
              <div class="content">${serviceName}</div>
          </div>
          <div class="section">
              <span class="label">Lead Details:</span>
              <ul>
                  <li><strong>Name:</strong> ${name}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Business:</strong> ${businessName || 'Not provided'}</li>
                  <li><strong>Industry:</strong> ${industry || 'Not provided'}</li>
              </ul>
          </div>
          <div class="notes-box">
              <span class="label">Original Notes:</span>
              <pre>${notes}</pre>
          </div>
          ${parsedAnalysis ? `
          <h2>AI Revenue Analysis</h2>
          <div class="section"><span class="label">Pain:</span> <div class="content">${parsedAnalysis.pain || ''}</div></div>
          <div class="section"><span class="label">Diagnosis:</span> <div class="content">${parsedAnalysis.diagnosis || ''}</div></div>
          <div class="section"><span class="label">Suggestion:</span> <div class="content">${parsedAnalysis.suggestion || ''}</div></div>
          <div class="section"><span class="label">CTA:</span> <div class="content">${parsedAnalysis.cta || ''}</div></div>
          ` : `
          <h2>No AI Analysis Generated</h2>
          <p>The AI analysis could not be generated for this lead.</p>
          `}
      </div></body></html>
    `;

    const userEmailHtml = `
      <html><head>${emailStyles}</head><body><div class="container">
          <h2>Your Analysis from Raystrat Systems</h2>
          <p>Hi ${name},</p>
          <p>Thank you for sharing your thoughts with us. Below is a copy of your notes and our AI's initial analysis based on what you wrote.</p>
          
          <div class="notes-box">
              <span class="label">Your Original Notes:</span>
              <pre>${notes}</pre>
          </div>

          ${parsedAnalysis ? `
            <h3>Our Initial Analysis</h3>
            <div style="border-top: 1px solid #ddd; padding-top: 15px;">
              <div class="section" style="border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 10px;">
                <span class="label">Pain:</span> 
                <div class="content">${parsedAnalysis.pain || ''}</div>
              </div>
              <div class="section" style="border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 10px;">
                <span class="label">Diagnosis:</span> 
                <div class="content">${parsedAnalysis.diagnosis || ''}</div>
              </div>
              <div class="section" style="border-bottom: 0; padding-bottom: 0; margin-bottom: 0;">
                <span class="label">Suggestion:</span> 
                <div class="content" style="margin-bottom: 0;">${parsedAnalysis.suggestion || ''}</div>
              </div>
            </div>
            <p style="margin-top: 20px;"><strong>Next Step:</strong> ${parsedAnalysis.cta || 'Reply to this email to get started.'}</p>
          ` : `
            <p style="margin-top: 20px;">If you'd like to discuss how our agents can solve your specific bottlenecks, you can book a free 15-minute audit with our team here: <a href="https://calendly.com/raystrat/15-min-audit">Book Your Free Audit Now</a></p>
          `}
          <p>Best,<br>The Raystrat Systems Team</p>
      </div></body></html>
    `;

    // Define the two emails to send
    const emailToOwner = {
      to: process.env.SENDGRID_FROM_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Notes Lead: ${emailSubject}`,
      html: ownerEmailHtml,
    };

    const emailToUser = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: emailSubject,
      html: userEmailHtml,
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
    await db.collection('playbook_requests').add({
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

