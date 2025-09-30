import 'server-only';
import { appRoute } from '@genkit-ai/next';
import { notesAnalyzerFlow } from '@/ai/flows/notes-analyzer';
export const runtime = 'nodejs';
export const POST = appRoute(notesAnalyzerFlow);
