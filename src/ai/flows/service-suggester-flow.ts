// src/ai/flows/service-suggester-flow.ts
'use server';
/**
 * @fileOverview An AI flow that suggests a service based on a user's problem description.
 *
 * - getServiceSuggestion - A function that handles the service suggestion process.
 * - ServiceSuggesterInput - The input type for the getServiceSuggestion function.
 * - ServiceSuggesterOutput - The return type for the getServiceSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { services } from '@/data/content';

// Define the input schema for the service suggester flow
const ServiceSuggesterInputSchema = z.object({
  problemDescription: z.string().describe('A description of a business problem provided by a user.'),
});
export type ServiceSuggesterInput = z.infer<typeof ServiceSuggesterInputSchema>;

// Define the output schema for the service suggester flow
const ServiceSuggesterOutputSchema = z.object({
  suggestedServiceSlug: z.string().describe('The unique slug of the suggested service.'),
  suggestedServiceTitle: z.string().describe('The title of the suggested service.'),
  justification: z.string().describe('A brief, user-friendly justification for why this service was recommended, explaining how it addresses the user\'s problem.'),
});
export type ServiceSuggesterOutput = z.infer<typeof ServiceSuggesterOutputSchema>;

// Exported wrapper function to be called from Server Actions
export async function getServiceSuggestion(input: ServiceSuggesterInput): Promise<ServiceSuggesterOutput> {
  return serviceSuggesterFlow(input);
}

// Prepare service data for the prompt
const serviceListForPrompt = services.map(s => `- ${s.title} (${s.slug}): ${s.subhead}`).join('\n');

const prompt = ai.definePrompt({
  name: 'serviceSuggesterPrompt',
  input: { schema: ServiceSuggesterInputSchema },
  output: { schema: ServiceSuggesterOutputSchema },
  prompt: `You are an expert business automation consultant for Raystrat Systems. Your task is to analyze a user's business problem and recommend the most suitable automated agent service from the provided list.

Here are the available services:
{{serviceList}}

User's business problem:
"{{{problemDescription}}}"

Based on the user's problem, identify the single best service to solve their issue. Your response must be in the specified JSON format. The justification should be concise (1-2 sentences) and clearly explain how the recommended service addresses the user's specific pain point. Do not invent services that are not on the list.
`,
});

const serviceSuggesterFlow = ai.defineFlow(
  {
    name: 'serviceSuggesterFlow',
    inputSchema: ServiceSuggesterInputSchema,
    outputSchema: ServiceSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      ...input,
      serviceList: serviceListForPrompt,
    });
    
    // Fallback logic in case the AI fails to produce valid output
    if (!output) {
      throw new Error('AI failed to generate a suggestion.');
    }
    
    // Ensure the suggested slug is valid
    const isValidSlug = services.some(s => s.slug === output.suggestedServiceSlug);
    if (!isValidSlug) {
      // Basic fallback: suggest the first service if the AI hallucinates a slug
      return {
        suggestedServiceSlug: services[0].slug,
        suggestedServiceTitle: services[0].title,
        justification: `Based on your problem, the ${services[0].title} is a good starting point for automation.`,
      };
    }
    
    return output;
  }
);
