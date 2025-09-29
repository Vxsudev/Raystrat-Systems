import 'server-only';
import {ai} from '@/ai/genkit';
import {appRoute} from '@genkit-ai/next';

// Ensure flows are imported so Genkit can register them.
// The try/catch is a workaround to prevent Next.js from breaking
// during its build process, which doesn't have the full runtime environment.
try {
  require('@/ai/flows/suggest-automation');
} catch (e) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Could not load flows for build, this is expected.', e);
  }
}

export const {GET, POST} = appRoute({ai});
