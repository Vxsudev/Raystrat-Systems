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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raystrat.com';

const prompt = ai.definePrompt({
  name: 'notesAnalyzerPrompt',
  input: {schema: NotesAnalyzerInputSchema},
  output: {schema: NotesAnalyzerOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert consultant for Raystrat Systems. A user has taken notes on your website. Your task is to analyze their notes and provide a helpful, consultative one-paragraph summary.

This summary should:
1. Briefly acknowledge their key problems or questions.
2. Recommend the single most impactful Raystrat Systems agent to solve their primary issue.
3. Include a direct link to that agent's service page.

The link format is: ${siteUrl}/services/{service_slug}

Here are the available services:
${serviceList}

Analyze the user's notes below and generate the suggestion paragraph.

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
