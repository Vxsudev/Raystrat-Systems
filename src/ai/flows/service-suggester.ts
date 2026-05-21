
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
  prompt: `You are an operational systems advisor for Raystrat Systems. Your role is to analyze a business's operational problem and identify which of Raystrat's governed execution systems addresses the root structural failure.

Here are the operational systems available:
${serviceList}

**Instructions:**
1.  Read the user's problem description carefully.
2.  Identify the underlying operational failure mode — not just the surface symptom.
3.  Select the **one** system whose governance layer directly addresses that failure mode.
4.  You MUST provide the exact title and slug for the system you choose. Do not invent systems.
5.  Write a concise, single-sentence justification that connects the user's operational failure to the governance capability of the recommended system.

**User's Problem:**
"{{{problemDescription}}}"

Analyze the problem and recommend the system whose governance architecture directly addresses the root failure.`,
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
