// src/app/api/genkit/[...flow]/route.ts
import {appRoute} from '@genkit-ai/next';
import {ai} from '@/ai/genkit';
// Force the import of the flow so that it is available to the runtime.
import '@/ai/flows/suggest-automation';

export const {GET, POST, OPTIONS} = appRoute({
  ai,
});
