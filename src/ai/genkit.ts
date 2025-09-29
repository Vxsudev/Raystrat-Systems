// server-only to keep this out of the client bundle
import 'server-only';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {firebase} from '@genkit-ai/firebase';

// In production on Firebase App Hosting, the GEMINI_API_KEY environment variable 
// is set via the firebase.json configuration. In local development, it should be
// set in a .env.local file. This setup ensures the key is loaded correctly.
export const ai = genkit({
  plugins: [
    firebase(), // Enables Firebase integration for logging and auth
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  // Log traces to Google Cloud Logging in production via the Firebase plugin.
  traceStore: 'firebase',
  // Enable production-level logging.
  logLevel: 'info',
  // Use Firebase Auth for flow-level authentication.
  enableClsHook: true,
});

export default ai;
