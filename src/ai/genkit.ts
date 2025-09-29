// src/ai/genkit.ts
import { genkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin
export const ai = genkit({
  plugins: [
    googleAI({
      // Specify the API version
      apiVersion: 'v1beta',
    }),
  ],
  // Log all traces to the console
  logLevel: 'debug',
  // Open telemetry data to a file for local development
  traceStore: {
    type: 'file',
    options: {
      path: './genkit-traces.jsonl',
    },
  },
});
