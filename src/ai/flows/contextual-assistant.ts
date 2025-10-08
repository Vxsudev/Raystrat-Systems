
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
    .describe("A summary of the text content from the page the user is on.")
});
export type ContextualAssistantInput = z.infer<typeof ContextualAssistantInputSchema>;

const ContextualAssistantOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI-generated answer or suggestion, tailored to the user\'s query and the provided page context.'),
  suggestedService: z.object({
      slug: z.string().describe("The URL slug of the suggested service. MUST NOT be an empty string."),
      title: z.string().describe("The title of the suggested service. MUST NOT be an empty string."),
  }).optional().describe("If and only if a different service is a better fit, provide its details here. Otherwise, this MUST be left empty."),
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
  prompt: `You are the Raystrat Systems AI Assistant. Your goal is to help users by answering questions, providing ideas, and offering business suggestions.

You MUST use the provided page context to tailor your response. Your answer should be directly related to the user's query and the page they are viewing.

**BEHAVIOR RULES (READ AND FOLLOW STRICTLY):**

1.  **Primary Goal: Answer the User's Question Directly.** Your absolute priority is to answer the user's query based on the current page context. If a user asks a question about the current service (e.g., "what kind of data is required for me" on the "Data Command Agent" page), you MUST answer that question directly and you MUST NOT suggest another service. In this case, the 'suggestedService' object in your output MUST be empty.

2.  **Strict Cross-Sell Logic (EXCEPTION ONLY):**
    *   You should only suggest another service as a rare exception. This MUST only happen if the user's query reveals a foundational problem that makes the current service irrelevant to them.
    *   **EXAMPLE:** If the user is on the "Data Command Agent" page and asks, "I don't have a business yet, what data can you give me?", you MUST recognize they first need leads before they can analyze data. In this specific case, and only in cases like this, you should suggest the "Leads Hunter Agent" and explain *why* it's the logical first step.
    *   If you do not detect a clear prerequisite problem, you MUST NOT suggest another service. The 'suggestedService' object MUST be left empty.

Here are the available services offered by Raystrat Systems:
${serviceList}

**CONTEXT FROM THE USER'S CURRENT PAGE:**
Page Title: {{{pageTitle}}}
Page Content Summary:
{{{pageContent}}}

**USER'S QUERY:**
"{{{query}}}"

Based on all the strict rules, context, and the user's query, provide a helpful and professional response and populate the output fields correctly. Be concise, actionable, and encouraging. Your default behavior should be to answer the direct question and leave 'suggestedService' empty.`,
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
