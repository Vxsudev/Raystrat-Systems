// src/ai/flows/service-suggester.ts
'use server';
/**
 * @fileOverview An AI flow that suggests a Raystrat service based on a user's described bottleneck.
 *
 * - suggestService - A function that handles the service suggestion process.
 * - ServiceSuggesterInput - The input type for the suggestService function.
 * - ServiceSuggesterOutput - The return type for the suggestService function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { services } from '@/data/content';

const ServiceSuggesterInputSchema = z.object({
  bottleneck: z
    .string()
    .describe("The user's description of their business problem or bottleneck."),
});
export type ServiceSuggesterInput = z.infer<typeof ServiceSuggesterInputSchema>;

const ServiceSuggesterOutputSchema = z.object({
  serviceSlug: z
    .string()
    .describe(`The most relevant service slug. Must be one of: ${services.map(s => s.slug).join(', ')}`),
  suggestion: z.string().describe("A very short, one-sentence explanation for why this service was recommended."),
});
export type ServiceSuggesterOutput = z.infer<typeof ServiceSuggesterOutputSchema>;

export async function suggestService(
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
  prompt: `You are an expert consultant for Raystrat Systems. Your task is to analyze a user's business bottleneck and recommend the single most impactful service to solve it.

Here are the available services:
${serviceList}

Analyze the user's bottleneck below and determine which one of these services is the best fit. Respond with the service's slug and a concise, one-sentence reason for your recommendation.

**USER'S BOTTLENECK:**
"{{{bottleneck}}}"`,
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
