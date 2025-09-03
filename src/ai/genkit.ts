import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from 'dotenv';
import {nextJs} from '@genkit-ai/next';

config();

export const ai = genkit({
  plugins: [
    nextJs(),
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
});
