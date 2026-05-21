
'use server';
/**
 * @fileOverview An AI flow that analyzes user notes and provides a tailored suggestion.
 *
 * - analyzeNotes - A function that handles the note analysis process.
 * - NotesAnalyzerInput - The input type for the analyzeNotes function.
 * - NotesAnalyzerOutput - The return type for the analyzeNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NotesAnalyzerInputSchema = z.object({
  notes: z
    .string()
    .describe("The user's notes, which describe their business problems or questions."),
  serviceName: z
    .string()
    .describe("The name of the service page the user is currently viewing. This provides context for the analysis."),
});
export type NotesAnalyzerInput = z.infer<typeof NotesAnalyzerInputSchema>;

const NotesAnalyzerOutputSchema = z.object({
  response: z.string().describe("The full, structured email response as plain text."),
});
export type NotesAnalyzerOutput = z.infer<typeof NotesAnalyzerOutputSchema>;

export async function analyzeNotes(
  input: NotesAnalyzerInput
): Promise<NotesAnalyzerOutput> {
  return notesAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'notesAnalyzerPrompt',
  input: {schema: NotesAnalyzerInputSchema},
  output: {schema: z.object({ response: z.string() }) },
  prompt: `You are a revenue-focused note interpreter. Your task is to read a client’s notes and produce a short, email-ready response.

**CONTEXT:**
The user wrote these notes while on the "{{serviceName}}" service page. You MUST use this context to make your diagnosis and suggestion more specific, detailed, and relevant.

**INSTRUCTIONS:**
1.  Read the user's notes carefully.
2.  You are not allowed to ask for more information. You MUST work with the information provided, no matter how brief. Make your best expert inference based on their notes and the context of the "{{serviceName}}" page.
3.  Produce a response with ONLY the following sections, in this exact order, each on a new line:
    *   **Subject:** A compelling, personalized email subject line based on the user's problem.
    *   **Pain:** Acknowledge the user's stated problem in their own words.
    *   **Diagnosis:** Describe the single most likely root cause in simple, operational business language. Your diagnosis MUST be more elaborate and directly relate to the purpose of the {{serviceName}}.
    *   **Suggestion:** Propose a single, concrete next step to address the diagnosis. This suggestion MUST be more detailed and explicitly mention how the {{serviceName}} solves their problem. It MUST end with a concluding sentence about deploying the {{serviceName}} agent.
    *   **SalesCopy:** Write a short, powerful paragraph (2-3 sentences) that acts as a sales pitch for the {{serviceName}}. It should summarize its core benefit and why it's the right solution for the diagnosed problem.
    *   **CTA:** Write a clear, one-sentence call to action that directs the user to book a free audit. This MUST include the link: https://calendly.com/raystrat/15-min-audit

**TONE RULES:**
*   Direct, pragmatic, and professional.
*   One pain, one diagnosis, one suggestion.
*   Use simple, operational language. No marketing buzzwords or jargon.
*   Write like a senior operator, not a coach.
*   Keep the total response under 150 words.
*   The 'Suggestion' must NOT contain jargon and must be immediately actionable in its description.

**OUTPUT SECTIONS (plain text, each on its own line):**
Subject:
Pain:
Diagnosis:
Suggestion:
SalesCopy:
CTA:

**USER'S NOTES:**
"{{{notes}}}"

**YOUR RESPONSE:**
`,
});

const notesAnalyzerFlow = ai.defineFlow(
  {
    name: 'notesAnalyzerFlow',
    inputSchema: NotesAnalyzerInputSchema,
    outputSchema: NotesAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return { response: output!.response };
  }
);
