// src/app/api/users/[userId]/status/route.ts
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase/admin';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const apiKey = request.headers.get('x-api-key');

  // 1. Verify API Key
  if (!process.env.N8N_MAKE_API_KEY) {
    console.error('N8N_MAKE_API_KEY is not set in environment variables.');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (apiKey !== process.env.N8N_MAKE_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const db = getDb();
    // 2. Query Firestore for the customer document
    const customerRef = db.collection('customers').doc(userId);
    const customerDoc = await customerRef.get();

    if (!customerDoc.exists) {
      // If customer document doesn't exist, they don't have a plan.
      return NextResponse.json({ status: 'inactive', canRun: false });
    }

    const customerData = customerDoc.data();
    const planStatus = customerData?.planStatus;

    // 3. Check planStatus and return response
    if (planStatus === 'active') {
      return NextResponse.json({ status: 'active', canRun: true });
    } else {
      // Any other status (past_due, canceled, etc.) means services should not run.
      return NextResponse.json({ status: planStatus || 'inactive', canRun: false });
    }

  } catch (error) {
    console.error(`Error fetching status for user ${userId}:`, error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
