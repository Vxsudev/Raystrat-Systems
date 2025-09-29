import 'server-only';

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

if (!process.env.GEMINI_API_KEY) {
console.warn('GEMINI_API_KEY not set');
}

export const ai = genkit({
plugins: [
googleAI({
apiKey: process.env.GEMINI_API_KEY,
}),
],
});

export { z };
export default ai;
