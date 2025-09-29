// src/app/api/genkit/[...flow]/route.ts
import 'server-only';
import ai from '@/ai/genkit';
import { NextRequest, NextResponse } from 'next/server';
import { allFlows } from '@/ai/flows';

// This function will handle all incoming requests for the genkit flows.
async function handler(req: NextRequest, { params }: { params: { flow?: string[] } }) {
  try {
    // Ensure all flows are loaded and registered with the ai instance.
    // The presence of 'allFlows' from the import above handles this.
    
    const flowName = (params.flow ?? []).join('/');
    if (!flowName) {
      return NextResponse.json({ error: 'Missing flow name' }, { status: 400 });
    }

    const input = await req.json().catch(() => ({}));

    // The 'run' method is not a formally exposed part of the 'ai' object type,
    // so we cast to 'any' to call it. This is a pragmatic way to dispatch
    // to the correct flow by its string name, which Genkit registers internally.
    const result = await (ai as any).run(flowName, input);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Flow execution failed:', err);
    // Provide a structured error response for easier debugging on the client.
    return NextResponse.json(
      { error: 'Flow execution failed', detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST };
