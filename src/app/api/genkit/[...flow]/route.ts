
import 'server-only';
import { appRoute } from '@genkit-ai/next';
import ai from '@/ai/genkit';

// Ensure flows are imported so Genkit can register them.
// The try/catch is a workaround to prevent Next.js from breaking
// during its build process, which doesn't have the full runtime environment.
try {
  require('@/ai/flows/suggest-automation');
  require('@/ai/flows/contextual-assistant');
  require('@/ai/flows/notes-analyzer');
  require('@/ai/flows/service-suggester');
  require('@/ai/flows/summarizer');
} catch (e) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Could not load flows for build, this is expected.', e);
  }
}

export const POST = appRoute(ai);
export const GET  = appRoute(ai);
