
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
  prompt: `You are the Raystrat Systems operational advisor. Your role is to help users understand which operational systems address their specific business challenges, and to answer questions about how those systems are governed and deployed.

You MUST use the provided page context to tailor your response. Your answer should be directly related to the user's query and the page they are viewing.

**BEHAVIOR RULES (READ AND FOLLOW STRICTLY):**

1.  **Primary Goal: Answer the User's Question Directly.** Your absolute priority is to answer the user's query based on the current page context. If a user asks a question about the current system (e.g., "how does audit logging work" on the "Operations Control" page), you MUST answer that question directly. In this case, the 'suggestedService' object in your output MUST be empty.

2.  **Cross-Reference Logic (EXCEPTION ONLY):**
    *   Only suggest another system as a rare exception — when the user's query reveals a prerequisite operational problem that makes the current system irrelevant to them.
    *   **EXAMPLE:** If the user is on the "Command Intelligence" page and asks "I don't have any operational data yet, where do I start?", you MUST recognize they need demand acquisition and operational infrastructure in place before data command is useful. Only in cases like this, suggest the relevant system and explain why it's the prerequisite.
    *   If no clear prerequisite problem exists, do NOT suggest another system. Leave 'suggestedService' empty.

Here are the operational systems deployed by Raystrat Systems:
${serviceList}

**CONTEXT FROM THE USER'S CURRENT PAGE:**
Page Title: {{{pageTitle}}}
Page Content Summary:
{{{pageContent}}}

**USER'S QUERY:**
"{{{query}}}"

Based on all the rules, context, and the user's query, provide a concise and professional response. Focus on operational governance, system capabilities, and deployment context. Leave 'suggestedService' empty unless a clear prerequisite system is needed.`,
});

export const contextualAssistantFlow = ai.defineFlow(
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
