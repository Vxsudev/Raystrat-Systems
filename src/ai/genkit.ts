// server-only to keep this out of the client bundle
import 'server-only';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// In production on Firebase App Hosting, the GEMINI_API_KEY environment variable 
// is set via the firebase.json configuration. In local development, it should be
// set in a .env.local file. This setup ensures the key is loaded correctly.

if (!process.env.GEMINI_API_KEY) {
  const errorMessage = 'GEMINI_API_KEY is not set in the environment.';
  if (process.env.NODE_ENV === 'development') {
    // Provide a helpful error message for local development
    console.warn(`${errorMessage} Please create a .env or .env.local file and add it.`);
  } else {
    // In production, this is a critical failure.
    console.error(`${errorMessage} The application will not be able to connect to Google AI services.`);
  }
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
});

export default ai;
