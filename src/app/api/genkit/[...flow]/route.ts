import 'server-only';
import {ai} from '@/ai/genkit';
import {appRoute} from '@genkit-ai/next';

// Ensure flows are imported so Genkit can register them
import '@/ai/flows/contextual-assistant';
import '@/ai/flows/service-suggester';
import '@/ai/flows/notes-analyzer';
import '@/ai/flows/summarizer';


export const {GET, POST} = appRoute({ai});
