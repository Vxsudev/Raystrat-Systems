// src/app/api/metrics/sequence-health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you would fetch this data from your database (e.g., Firestore)
  // after it has been computed by the Insight/Data Plane.
  const mockSequenceHealthData = [
      { name: 'Sent', S0: 5000, S1: 4500, S2: 4000 },
      { name: 'Delivered', S0: 4800, S1: 4325, S2: 3850 },
      { name: 'Opened', S0: 2500, S1: 1975, S2: 1500 },
      { name: 'Clicked', S0: 1000, S1: 625, S2: 400 },
      { name: 'Replied', S0: 500, S1: 380, S2: 250 },
  ];

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(mockSequenceHealthData);
}
