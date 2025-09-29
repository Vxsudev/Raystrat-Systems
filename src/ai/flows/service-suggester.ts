
'use server';
/**
 * @fileOverview An AI flow that suggests a Raystrat Systems service based on a user's problem description.
 *
 * - getServiceSuggestion - A function that handles the service suggestion process.
 * - ServiceSuggesterInput - The input type for the getServiceSuggestion function.
 * - ServiceSuggesterOutput - The return type for the getServiceSuggestion function.
 */

import { ai, z } from '@/ai/genkit';
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

const serviceList = services.map(s => `- ${s.title} (${s.slug}): ${s.subhead}`).join('\n');

const prompt = ai.definePrompt({
  name: 'serviceSuggesterPrompt',
  input: {schema: ServiceSuggesterInputSchema},
  output: {schema: ServiceSuggesterOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert consultant for Raystrat Systems. Your goal is to analyze a user's problem and recommend the single most impactful service to solve it.

Here are the available services:
${serviceList}

Analyze the user's problem description below. Based on their problem, select the single best service from the list and provide a concise justification for your recommendation.

**USER'S PROBLEM:**
"{{{problemDescription}}}"`,
});

const serviceSuggesterFlow = ai.defineFlow(
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
