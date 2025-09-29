// src/app/api/genkit/[...flow]/route.ts
import 'server-only';
import { appRoute } from '@genkit-ai/next';
import { allFlows } from '@/ai/flows';

export const GET = appRoute({ flows: Object.values(allFlows) });
export const POST = appRoute({ flows: Object.values(allFlows) });
