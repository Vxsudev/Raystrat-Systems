
'use server';
/**
 * @fileOverview An AI flow that generates a concise summary for a given text.
 *
 * - summarizeText - A function that handles the text summarization process.
 * - SummarizerInput - The input type for the summarizeText function.
 * - SummarizerOutput - The return type for the summarizeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizerInputSchema = z.object({
  textToSummarize: z
    .string()
    .describe("The full text content of the article to be summarized."),
});
export type SummarizerInput = z.infer<typeof SummarizerInputSchema>;

const SummarizerOutputSchema = z.object({
  summary: z.string().describe("A markdown string containing exactly 5 bullet points summarizing the article's key takeaways. Each bullet point must be a single, concise sentence under 120 characters."),
});
export type SummarizerOutput = z.infer<typeof SummarizerOutputSchema>;

export async function summarizeText(
  input: SummarizerInput
): Promise<SummarizerOutput> {
  return summarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizerPrompt',
  input: {schema: SummarizerInputSchema},
  output: {schema: SummarizerOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert SEO content strategist. Your task is to create a bulleted list of key takeaways from the following article.

Instructions:
1.  Read the entire article content and identify the most important concepts.
2.  Create exactly 5 bullet points that summarize these key concepts.
3.  Each bullet point MUST be a single, concise, and compelling sentence.
4.  Each bullet point MUST be under 120 characters long.
5.  Format the final output as a markdown bulleted list (using '* ' for each item).

**ARTICLE CONTENT:**
"{{{textToSummarize}}}"`,
});

const summarizerFlow = ai.defineFlow(
  {
    name: 'summarizerFlow',
    inputSchema: SummarizerInputSchema,
    outputSchema: SummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
