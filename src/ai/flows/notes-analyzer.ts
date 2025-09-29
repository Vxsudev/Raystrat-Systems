
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

const serviceList = services.map(s => `- ${s.title} (${s.slug}): ${s.subhead}`).join('\n');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raystratsystems.com';

const prompt = ai.definePrompt({
  name: 'notesAnalyzerPrompt',
  input: {schema: NotesAnalyzerInputSchema},
  output: {schema: NotesAnalyzerOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert AI consultant for Raystrat Systems, skilled in using Neuro-linguistic Programming (NLP) to understand and guide potential clients. Your goal is to analyze a user's notes, identify their core problems AND their underlying objections or hesitations, and then reframe them in a way that builds confidence and guides them towards a solution.

Your response should be a single, helpful, and consultative paragraph that does the following:
1.  **Acknowledge the Concern, Not Just the Problem:** Start by acknowledging the user's situation. Do not just repeat their words. Instead, identify the deeper worry (e.g., "It sounds like you're concerned about reclaiming time without adding complexity," or "It seems the core issue is building a predictable sales pipeline, and past efforts have not provided the control you need.").
2.  **Reframe and Dispel Objections:** Gently counter any implied objections. If they say "this is too expensive," reframe it as an investment in ROI. If they say "this seems complex," reframe it as a system that handles complexity for them. Use phrases like "A common perspective is..., but what our most successful clients find is..." or "That is a valid concern, and it is precisely why our approach focuses on..."
3.  **Bridge to the Solution:** Seamlessly connect their reframed problem to the single most impactful Raystrat Systems agent.
4.  **Provide a Clear Call to Action:** End with a direct call to action to book a free audit. This is the most important step. You MUST include a link to https://calendly.com/raystrat/15-min-audit.

The link format for a service page is: ${siteUrl}/services/{service_slug}

Here are the available services:
${serviceList}

Analyze the user's notes below. Adopt the NLP consultant persona and generate the suggestion paragraph.

**USER'S NOTES:**
"{{{notes}}}"`,
});

export const notesAnalyzer = ai.defineFlow(
  {
    name: 'notesAnalyzer',
    inputSchema: NotesAnalyzerInputSchema,
    outputSchema: NotesAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
