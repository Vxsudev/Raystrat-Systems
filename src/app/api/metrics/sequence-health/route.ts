// src/app/api/metrics/sequence-health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you would fetch this data from your database (e.g., Firestore)
  // after it has been computed by the Insight/Data Plane.
  const mockSequenceHealthData = [
      { name: 'Sent', S0: 4000, S1: 3500, S2: 3000 },
      { name: 'Delivered', S0: 3800, S1: 3325, S2: 2850 },
      { name: 'Opened', S0: 2000, S1: 1575, S2: 1200 },
      { name: 'Clicked', S0: 800, S1: 525, S2: 300 },
      { name: 'Replied', S0: 400, S1: 280, S2: 150 },
  ];

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(mockSequenceHealthData);
}
