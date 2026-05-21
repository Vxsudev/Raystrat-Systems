import 'server-only';
import { appRoute } from '@genkit-ai/next';
import { contextualAssistantFlow } from '@/ai/flows/contextual-assistant';
export const runtime = 'nodejs';
export const POST = appRoute(contextualAssistantFlow);
