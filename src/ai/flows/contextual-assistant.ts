// src/ai/flows/contextual-assistant.ts
'use server';

/**
 * @fileOverview A context-aware AI assistant that provides suggestions based on the user's current page.
 *
 * - contextualAssistant - A function that handles the contextual suggestion process.
 * - ContextualAssistantInput - The input type for the contextualAssistant function.
 * - ContextualAssistantOutput - The return type for the contextualAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextualAssistantInputSchema = z.object({
  query: z
    .string()
    .describe("The user's question or problem description."),
  pageTitle: z
    .string()
    .describe("The title of the page the user is currently on."),
  pageContent: z
    .string()
    .describe("A summary of the text content from the page the user is on.")
});
export type ContextualAssistantInput = z.infer<typeof ContextualAssistantInputSchema>;

const ContextualAssistantOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI-generated answer or suggestion, tailored to the user\'s query and the provided page context.'),
});
export type ContextualAssistantOutput = z.infer<typeof ContextualAssistantOutputSchema>;

export async function contextualAssistant(
  input: ContextualAssistantInput
): Promise<ContextualAssistantOutput> {
  return contextualAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualAssistantPrompt',
  input: {schema: ContextualAssistantInputSchema},
  output: {schema: ContextualAssistantOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are the Raystrat Systems AI Assistant. Your goal is to help users by answering questions, providing ideas, and offering business suggestions.

You MUST use the provided page context to tailor your response. The context gives you clues about what the user is interested in. Your answer should be directly related to the user's query and the page they are viewing.

Here are the services offered by Raystrat Systems. Refer to them when relevant:
- Leads Hunter Agent: Scans the web for live buying signals.
- Follow-Up Agent: Runs multi-channel sequences across email, SMS, and WhatsApp.
- Support Agent: Resolves FAQs and common tickets instantly.
- Operations Agent: Automates routine workflows: invoicing, notifications, task assignments.
- Data Command Agent: Centralizes KPIs across leads, sales, ops, and support.
- Custom AI Agent: A bespoke solution for a unique bottleneck.

**CONTEXT FROM THE USER'S CURRENT PAGE:**
Page Title: {{{pageTitle}}}
Page Content Summary:
{{{pageContent}}}

**USER'S QUERY:**
"{{{query}}}"

Based on the user's query and the page context, provide a helpful and relevant response. Be concise, actionable, and encouraging. Frame your answer as a helpful assistant.`,
});

const contextualAssistantFlow = ai.defineFlow(
  {
    name: 'contextualAssistantFlow',
    inputSchema: ContextualAssistantInputSchema,
    outputSchema: ContextualAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
