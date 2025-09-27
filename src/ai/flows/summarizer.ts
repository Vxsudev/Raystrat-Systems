
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
  summary: z.string().describe("A bulleted list of key takeaways, with each bullet summarizing the section following an h3 tag. The format should be a markdown string."),
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
1.  Read the entire article content.
2.  Identify each section that begins with an '<h3>' tag.
3.  For each section, write a single, concise sentence that summarizes its core argument or conclusion.
4.  Format the final output as a markdown bulleted list (using '* ' for each item).
5.  The summary should be optimized for Large Language Models (LLMs) by being clear, direct, and factual.

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
