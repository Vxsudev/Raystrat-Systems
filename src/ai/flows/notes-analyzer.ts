
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
  prompt: `You are a revenue-focused note interpreter. Read the client’s notes and produce a short, email-ready response. The response must be pragmatic, direct, and action-led.

**Instructions:**
1.  Read the user's notes.
2.  Produce a response with ONLY the following sections, in this exact order, each on a new line:
    *   **Pain:** Acknowledge the user's stated problem in their own words.
    *   **Diagnosis:** Describe the single most likely root cause in simple business language. No jargon. No lists.
    *   **Suggestion:** Propose a single, concrete next step to address the diagnosis. This must be a simple, actionable command.
    *   **CTA:** Write a clear, one-sentence call to action for the user to take next.

**Tone Rules:**
*   Direct, pragmatic, zero fluff.
*   One pain, one diagnosis, one suggestion.
*   Use simple, operational language. No marketing buzzwords.
*   Write like a senior operator, not a coach.
*   Keep the total response under 120 words.

**Content Constraints:**
*   If notes are vague (<15 words), for the Diagnosis, state: "The bottleneck isn't detailed enough to pinpoint a root cause." For the Suggestion, state: "Reply with more detail on where the process is failing."
*   NEVER invent numbers, statistics, dates, or ETAs.
*   NEVER output sections that are not listed in the instructions (e.g., no "Impact", "KPIs", "Deadline", etc.).

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
