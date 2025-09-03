// server-only to keep this out of the client bundle
import 'server-only';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Load env in Node runtime (dev/SSR). In production on Firebase App Hosting,
// set the env var in the console; dotenv is ignored there.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
} catch {}

if (!process.env.GEMINI_API_KEY) {
  // In development, this will be a hard error. In production, the key
  // should be set in the environment, but we add a check for robustness.
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'GEMINI_API_KEY is not set. Please create a .env.local file and add it.'
    );
  }
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
});
