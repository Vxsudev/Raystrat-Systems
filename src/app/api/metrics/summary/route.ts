// src/app/api/metrics/summary/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you would fetch this data from your database (e.g., Firestore)
  // after it has been computed by the Insight/Data Plane.
  const mockSummaryData = {
    kpis: [
      { title: "Leads Enrolled (30d)", value: "1,204" },
      { title: "In Sequence", value: "312" },
      { title: "Replies (30d)", value: "488" },
      { title: "Meetings Booked (30d)", value: "88" },
    ],
    deliverability: {
      deliverabilityScore: 98.2,
      bounceRate: 1.1,
      spamRate: 0.05,
    },
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(mockSummaryData);
}
