// src/ai/flows/suggest-automation.ts
'use server';

/**
 * @fileOverview Suggests the most relevant service automation based on user-described content bottlenecks.
 *
 * - suggestAutomation - A function that handles the service automation suggestion process.
 * - SuggestAutomationInput - The input type for the suggestAutomation function.
 * - SuggestAutomationOutput - The return type for the suggestAutomation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAutomationInputSchema = z.object({
  contentBottleneckDescription: z
    .string()
    .describe('A description of the user\'s content creation bottlenecks.'),
});
export type SuggestAutomationInput = z.infer<typeof SuggestAutomationInputSchema>;

const SuggestAutomationOutputSchema = z.object({
  suggestedService: z
    .string()
    .describe(
      'The most relevant service automation suggested to address the user\'s content bottlenecks. Must be one of the following: Search-Intent Lead Scraper, Repurposing Engine, Invoice Collector, Long-Form Generator, Smart Inbox Controller, Custom AI Automation.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested service automation.'),
});
export type SuggestAutomationOutput = z.infer<typeof SuggestAutomationOutputSchema>;

export async function suggestAutomation(
  input: SuggestAutomationInput
): Promise<SuggestAutomationOutput> {
  return suggestAutomationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAutomationPrompt',
  input: {schema: SuggestAutomationInputSchema},
  output: {schema: SuggestAutomationOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert AI assistant designed to suggest the most relevant service automation based on a user's description of their content bottlenecks. The available service automations are:

- Search-Intent Lead Scraper: Prospect where deals form
- Repurposing Engine: 1 recording -> 30-day content
- Invoice Collector: Recover overdue cash
- Long-form Generator: Publish authority on schedule
- Smart Inbox Controller: Inbox zero, automated
- Custom AI Automation: Your specific bottleneck, solved.

Based on the user's description, select the single most relevant service automation and explain your reasoning.

User's description: {{{contentBottleneckDescription}}}

Output the suggested service automation and reasoning in JSON format.`,
});

const suggestAutomationFlow = ai.defineFlow(
  {
    name: 'suggestAutomationFlow',
    inputSchema: SuggestAutomationInputSchema,
    outputSchema: SuggestAutomationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
