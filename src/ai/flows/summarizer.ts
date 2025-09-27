
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
  headingCount: z
    .number()
    .describe("The number of H3 headings in the article."),
});
export type SummarizerInput = z.infer<typeof SummarizerInputSchema>;


const TakeawaySchema = z.object({
  title: z.string().describe("A short, punchy title for the key takeaway. Maximum 5 words."),
  description: z.string().describe("A longer, one-sentence description of the key takeaway. Maximum 25 words."),
});

const SummarizerOutputSchema = z.object({
  takeaways: z.array(TakeawaySchema).describe("An array of key takeaways, where the length of the array is exactly equal to the provided 'headingCount'."),
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
  prompt: `You are an expert SEO content strategist. Your task is to create a structured list of key takeaways from the following article.

Instructions:
1.  Read the entire article content and identify the most important concepts, corresponding to each major section.
2.  The article has exactly {{{headingCount}}} major sections (based on its H3 tags). You MUST generate exactly {{{headingCount}}} key takeaways.
3.  For each takeaway, provide a short 'title' (max 5 words) and a longer 'description' (a single compelling sentence, max 25 words).
4.  Ensure the takeaways are distinct and cover the breadth of the article.

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
