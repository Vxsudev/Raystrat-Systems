import 'server-only';
import {ai} from '@/ai/genkit';
import {appRoute} from '@genkit-ai/next';

// Ensure flows are imported so Genkit can register them
import '@/ai/flows/suggest-automation';

export const {GET, POST} = appRoute({ai});
