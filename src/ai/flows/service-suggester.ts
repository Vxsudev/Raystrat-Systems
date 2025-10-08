
'use server';
/**
 * @fileOverview An AI flow that suggests a Raystrat Systems service based on a user's problem description.
 *
 * - getServiceSuggestion - A function that handles the service suggestion process.
 * - ServiceSuggesterInput - The input type for the getServiceSuggestion function.
 * - ServiceSuggesterOutput - The return type for the getServiceSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { services } from '@/data/content';

const ServiceSuggesterInputSchema = z.object({
  problemDescription: z
    .string()
    .describe("The user's description of their business bottleneck or problem."),
});
export type ServiceSuggesterInput = z.infer<typeof ServiceSuggesterInputSchema>;

const ServiceSuggesterOutputSchema = z.object({
  suggestedServiceTitle: z.string().describe('The title of the single most relevant service.'),
  suggestedServiceSlug: z.string().describe('The URL slug for the suggested service page.'),
  justification: z.string().describe('A concise, one-sentence justification for why this service was recommended, tailored to the user\'s problem.'),
});
export type ServiceSuggesterOutput = z.infer<typeof ServiceSuggesterOutputSchema>;

export async function getServiceSuggestion(
  input: ServiceSuggesterInput
): Promise<ServiceSuggesterOutput> {
  return serviceSuggesterFlow(input);
}

const serviceList = services.map(s => `- ${s.title} (slug: ${s.slug}): ${s.subhead}`).join('\n');

const prompt = ai.definePrompt({
  name: 'serviceSuggesterPrompt',
  input: {schema: ServiceSuggesterInputSchema},
  output: {schema: ServiceSuggesterOutputSchema},
  prompt: `You are an expert consultant for Raystrat Systems. Your only job is to analyze a user's business problem and recommend the single most impactful service to solve it.

Here are the available services you can recommend from:
${serviceList}

**Instructions:**
1.  Read the user's problem description very carefully.
2.  Compare the problem against the service descriptions in the list provided.
3.  Select the **one** service that is the most direct and effective solution for the user's stated problem.
4.  You MUST provide the exact title and slug for the service you choose. Do not make up new services.
5.  Write a concise, single-sentence justification that directly connects the user's problem to the benefit of the recommended service.

**User's Problem:**
"{{{problemDescription}}}"

Now, analyze the problem and provide your recommendation based on the rules above.`,
});

export const serviceSuggesterFlow = ai.defineFlow(
  {
    name: 'serviceSuggesterFlow',
    inputSchema: ServiceSuggesterInputSchema,
    outputSchema: ServiceSuggesterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
