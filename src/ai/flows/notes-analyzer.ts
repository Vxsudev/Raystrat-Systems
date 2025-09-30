
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
import { services } from '@/data/content';

const NotesAnalyzerInputSchema = z.object({
  notes: z
    .string()
    .describe("The user's notes, which describe their business problems or questions."),
});
export type NotesAnalyzerInput = z.infer<typeof NotesAnalyzerInputSchema>;

const NotesAnalyzerOutputSchema = z.object({
  suggestion: z.string().describe("A concise, one-paragraph analysis of the user's notes, suggesting the most relevant Raystrat Systems agent and linking to its service page. The tone should be helpful and consultative."),
});
export type NotesAnalyzerOutput = z.infer<typeof NotesAnalyzerOutputSchema>;

export async function analyzeNotes(
  input: NotesAnalyzerInput
): Promise<NotesAnalyzerOutput> {
  return notesAnalyzerFlow(input);
}

const serviceList = services.map(s => `- ${s.title} (${s.slug}): ${s.subhead}`).join('\n');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raystratsystems.com';

const prompt = ai.definePrompt({
  name: 'notesAnalyzerPrompt',
  input: {schema: NotesAnalyzerInputSchema},
  output: {schema: NotesAnalyzerOutputSchema},
  model: 'googleai/gemini-2.0-flash',
  prompt: `You are an expert AI consultant for Raystrat Systems. Your goal is to analyze a user's notes, identify their core problems, and guide them towards a solution.

Your response should be a single, helpful, and consultative paragraph that does the following:
1.  **Acknowledge the Problem:** Start by acknowledging the user's situation and the core problem they've described.
2.  **Bridge to the Solution:** Seamlessly connect their problem to the single most impactful Raystrat Systems agent.
3.  **Provide a Clear Call to Action:** End with a direct call to action to book a free audit. You MUST include a link to https://calendly.com/raystrat/15-min-audit.

The link format for a service page is: ${siteUrl}/services/{service_slug}

Here are the available services:
${serviceList}

Analyze the user's notes below. Adopt a helpful, consultative persona and generate the suggestion paragraph.

**USER'S NOTES:**
"{{{notes}}}"`,
});

const notesAnalyzerFlow = ai.defineFlow(
  {
    name: 'notesAnalyzerFlow',
    inputSchema: NotesAnalyzerInputSchema,
    outputSchema: NotesAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

