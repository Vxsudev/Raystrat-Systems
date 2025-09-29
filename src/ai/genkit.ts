// server-only to keep this out of the client bundle
import 'server-only';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// In production on Firebase App Hosting, the GEMINI_API_KEY environment variable 
// is set via the firebase.json configuration. In local development, it should be
// set in a .env.local file. This setup ensures the key is loaded correctly.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
});

export default ai;
