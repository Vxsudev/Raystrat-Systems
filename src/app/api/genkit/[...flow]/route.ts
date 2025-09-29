
import 'server-only';
import ai from '@/ai/genkit';
import { NextRequest, NextResponse } from 'next/server';

// Ensure all flows are imported so they register with Genkit
try {
  require('@/ai/flows/suggest-automation');
  require('@/ai/flows/contextual-assistant');
  require('@/ai/flows/notes-analyzer');
  require('@ai/flows/service-suggester');
  require('@/ai/flows/summarizer');
} catch (e) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Could not load flows for build, this is expected.', e);
  }
}

// Single dynamic POST handler that dispatches to the correct registered flow
export async function POST(
  req: NextRequest,
  { params }: { params: { flow?: string[] } }
) {
  try {
    const flowName = (params.flow ?? []).join('/');
    if (!flowName) {
      return NextResponse.json({ error: 'Missing flow name' }, { status: 400 });
    }

    const input = await req.json().catch(() => ({}));
    // run the requested flow (all flows were registered on import)
    const result = await (ai as any).run(flowName, input);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Flow execution failed:', err);
    return NextResponse.json(
      { error: 'Flow execution failed', detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
