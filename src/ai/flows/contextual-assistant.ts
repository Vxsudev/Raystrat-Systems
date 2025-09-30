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
import { services } from '@/data/content';

const ContextualAssistantInputSchema = z.object({
  query: z
    .string()
    .describe("The user's question or problem description."),
  pageTitle: z
    .string()
    .describe("The title of the page the user is currently on."),
  pageContent: z
    .string()
    .describe("A summary of the text content from the page the user is on."),
  conversationCount: z.number().describe("The number of turns in the current conversation."),
});
export type ContextualAssistantInput = z.infer<typeof ContextualAssistantInputSchema>;

const ContextualAssistantOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI-generated answer or suggestion, tailored to the user\'s query and the provided page context.'),
  suggestedService: z.object({
      slug: z.string().describe("The URL slug of the suggested service, if relevant."),
      title: z.string().describe("The title of the suggested service."),
  }).optional().describe("If the user's query is better answered by a different service, provide its details here."),
  showBookDemo: z.boolean().describe("Set to true if a 'Book a Demo' CTA should be shown with this response. This should happen every 3 user messages."),
});
export type ContextualAssistantOutput = z.infer<typeof ContextualAssistantOutputSchema>;

export async function getContextualAssistantResponse(
  input: ContextualAssistantInput
): Promise<ContextualAssistantOutput> {
  return contextualAssistantFlow(input);
}

const serviceList = services.map(s => `- ${s.title} (slug: ${s.slug})`).join('\n');

const prompt = ai.definePrompt({
  name: 'contextualAssistantPrompt',
  input: {schema: ContextualAssistantInputSchema},
  output: {schema: ContextualAssistantOutputSchema},
  model: 'googleai/gemini-2.0-flash',
  prompt: `You are the Raystrat Systems AI Assistant. Your goal is to help users by answering their questions and guiding them to the right solution.

You MUST use the provided page context to tailor your response. Your answer should be directly related to the user's query and the page they are viewing.

**BEHAVIOR RULES:**

1.  **Cross-Sell When Appropriate:** If the user's query, while on a specific service page, is clearly a better fit for a *different* service, you MUST identify that service. In your response, answer the user's question but also explain why another service might be a better fit. Then, populate the 'suggestedService' object with the slug and title of that other service. Do not do this if the query is relevant to the current page.

2.  **Book a Demo CTA:** You MUST set 'showBookDemo' to true every 3 user messages. The current conversation turn count is {{{conversationCount}}}. If (conversationCount % 3 === 0 && conversationCount > 0), set 'showBookDemo' to true. Otherwise, set it to false.

Here are the available services offered by Raystrat Systems:
${serviceList}

**CONTEXT FROM THE USER'S CURRENT PAGE:**
Page Title: {{{pageTitle}}}
Page Content Summary:
{{{pageContent}}}

**USER'S QUERY:**
"{{{query}}}"

Based on all the rules, context, and the user's query, provide a helpful and professional response and populate the output fields correctly.`,
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
