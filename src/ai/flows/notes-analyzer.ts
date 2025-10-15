
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
  prompt: `You are a revenue-focused note interpreter. Read the client’s notes and produce a short, email-ready response.

**Instructions:**
1.  Read the user's notes carefully.
2.  You MUST work with the information provided, no matter how brief. You are not allowed to ask for more details. Make your best expert inference.
3.  Produce a response with ONLY the following sections, in this exact order, each on a new line:
    *   **Pain:** Acknowledge the user's stated problem in their own words.
    *   **Diagnosis:** Describe the single most likely root cause in simple, operational business language. No jargon. No lists.
    *   **Suggestion:** Propose a single, concrete next step to address the diagnosis. This must be a simple, actionable command.
    *   **CTA:** Write a clear, one-sentence call to action that directs the user to book a free audit. This MUST include the link: https://calendly.com/raystrat/15-min-audit

**Tone Rules:**
*   Direct, pragmatic, zero fluff.
*   One pain, one diagnosis, one suggestion.
*   Use simple, operational language. No marketing buzzwords.
*   Write like a senior operator, not a coach.
*   Keep the total response under 120 words.

**Output sections in plain text, in this order, each on its own line:**
Pain:
Diagnosis:
Suggestion:
CTA:

**USER'S NOTES:**
"{{{notes}}}"

**RESPONSE:**
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
