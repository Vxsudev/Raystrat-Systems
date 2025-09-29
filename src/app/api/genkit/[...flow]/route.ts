// src/app/api/genkit/[...flow]/route.ts
import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder file. The AI features are now handled by Next.js Server Actions.
// This route is no longer actively used but is kept to prevent 404 errors
// if any old client-side code still points to it.

export async function POST(
  req: NextRequest,
  { params }: { params: { flow?: string[] } }
) {
  const flowName = (params.flow ?? []).join('/');
  console.warn(`Attempted to call deprecated Genkit API route: /api/genkit/${flowName}`);
  return NextResponse.json(
    { 
      error: 'This API endpoint is deprecated.',
      detail: 'AI functionality has been migrated to Next.js Server Actions.'
    },
    { status: 410 } // 410 Gone
  );
}
