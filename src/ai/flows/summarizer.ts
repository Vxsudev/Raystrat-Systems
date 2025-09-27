
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
  summary: z.string().describe("A concise, one to two-sentence summary of the provided text, optimized for SEO and LLM readability."),
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
  prompt: `You are an expert SEO content strategist. Your task is to create a concise, one or two-sentence summary of the following article. The summary should be optimized for Large Language Models (LLMs) by clearly stating the article's core argument and conclusion. This summary will be displayed prominently at the top of the page.

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
