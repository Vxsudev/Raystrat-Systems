
'use server';
/**
 * @fileOverview An AI flow that analyzes user notes and provides a tailored suggestion.
 *
 * - analyzeNotes - A function that handles the note analysis process.
 * - NotesAnalyzerInput - The input type for the analyzeNotes function.
 * - NotesAnalyzerOutput - The return type for the analyzeNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NotesAnalyzerInputSchema = z.object({
  notes: z
    .string()
    .describe("The user's notes, which describe their business problems or questions."),
});
export type NotesAnalyzerInput = z.infer<typeof NotesAnalyzerInputSchema>;

const NotesAnalyzerOutputSchema = z.object({
  response: z.string().describe("The full, structured email response as plain text."),
});
export type NotesAnalyzerOutput = z.infer<typeof NotesAnalyzerOutputSchema>;

export async function analyzeNotes(
  input: NotesAnalyzerInput
): Promise<NotesAnalyzerOutput> {
  return notesAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'notesAnalyzerPrompt',
  input: {schema: NotesAnalyzerInputSchema},
  output: {schema: z.object({ response: z.string() }) },
  prompt: `You are a revenue-focused note interpreter. Read the client’s notes and produce a short email-ready response that does three things: acknowledge the pain in their own words, diagnose the root cause in business terms, and prescribe a concrete fix they can execute within 72 hours. Keep it punchy, direct, and action-led.

Do the following in order:

1.  **Mirror the client’s phrasing:** open with a one–two sentence acknowledgment that reflects 2–3 exact phrases from their notes.
2.  **Name one root cause:** describe the single most likely operational/process cause in business language. No lists.
3.  **Quantify impact:** estimate the revenue/time loss in a single sentence using ranges if needed.
4.  **Prescribe the fix:** give a one–two sentence solution that is the fastest, lowest-resistance path.
5.  **Issue a 72-hour plan:** three command-style steps, each with owner label (client or us) and ETA in hours.
6.  **Request assets:** bullet three–five specific items needed to start today.
7.  **Define success:** list one–three measurable KPIs.
8.  **Set a deadline:** give a concrete calendar date in the client’s timezone.
9.  **Push a single CTA:** one clear next action the client must reply or do now.
10. **Offer a fallback:** a simpler alternative if they stall.

**Tone rules:**
*   Direct, pragmatic, zero fluff.
*   One pain, one cause, one fix.
*   Commands only; no suggestions or hedging.
*   No apologies. No theory.
*   Write like a senior operator, not a coach.
*   Keep total length under 180 words.

**Content constraints:**
*   If notes are vague (<20 words), default acknowledgment to: “You’ve flagged a bottleneck without details.” Then ask for exactly three clarifiers: channel, volume per week, and current follow-up timing. Still propose a minimal fix and a single CTA.
*   If the problem is clearly outside sales/ops, reframe into the nearest commercial lever (lead capture, follow-up, offer clarity, booking friction).
*   Never output multiple options; choose the highest-ROI path.

**Output sections in plain text, in this order, each on its own line:**
Subject:
Preview:
Pain:
Diagnosis:
Impact:
Fastest fix:
72h plan:
Assets needed:
KPIs:
Deadline:
CTA:
Fallback:

**72h plan formatting:**
[Command] — Owner: [client|us] — ETA: [hours]
[Command] — Owner: [client|us] — ETA: [hours]
[Command] — Owner: [client|us] — ETA: [hours]

**USER'S NOTES:**
"{{{notes}}}"

**RESPONSE:**
`,
});

const notesAnalyzerFlow = ai.defineFlow(
  {
    name: 'notesAnalyzerFlow',
    inputSchema: NotesAnalyzerInputSchema,
    outputSchema: NotesAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return { response: output!.response };
  }
);
