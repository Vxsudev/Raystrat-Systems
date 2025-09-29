import 'server-only';
import { ai, z } from '@/ai/genkit';

export const ContextualAssistantInputSchema = z.object({
  query: z.string().describe("The user's question or problem description."),
  pageTitle: z.string().describe("The title of the page the user is currently on."),
  pageContent: z.string().describe("A summary of the text content from the page the user is on.")
});
export type ContextualAssistantInput = z.infer<typeof ContextualAssistantInputSchema>;

export const ContextualAssistantOutputSchema = z.object({
  response: z.string().describe("AI-generated answer or suggestion, tailored to the user's query and the provided page context.")
});
export type ContextualAssistantOutput = z.infer<typeof ContextualAssistantOutputSchema>;

const prompt = ai.definePrompt({
  name: 'contextualAssistantPrompt',
  input: { schema: ContextualAssistantInputSchema },
  output: { schema: ContextualAssistantOutputSchema },
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are the Raystrat Systems AI Assistant. Use the page context to tailor your response.

Page Title: {{{pageTitle}}}
Page Content Summary:
{{{pageContent}}}

User's query:
"{{{query}}}"

Give a concise, actionable response tied to this context.`
});

export const contextualAssistantFlow = ai.defineFlow(
  {
    name: 'contextualAssistantFlow',
    inputSchema: ContextualAssistantInputSchema,
    outputSchema: ContextualAssistantOutputSchema
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

// What actions.ts is expecting:
export async function getContextualAssistantResponse(
  input: ContextualAssistantInput
): Promise<ContextualAssistantOutput> {
  return await contextualAssistantFlow(input);
}
