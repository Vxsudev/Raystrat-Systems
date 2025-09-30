import 'server-only';

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

if (!process.env.GEMINI_API_KEY) {
console.warn('GEMINI_API_KEY not set');
}

export const ai = genkit({
plugins: [
googleAI({
apiKey: process.env.GEMINI_API_KEY,
apiVersion: 'v1',
}),
],
});

export { z };
export default ai;
