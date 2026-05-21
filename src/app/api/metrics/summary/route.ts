// src/app/api/metrics/summary/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you would fetch this data from your database (e.g., Firestore)
  // after it has been computed by the Insight/Data Plane.
  const mockSummaryData = {
    kpis: [
      { title: "Leads Enrolled (30d)", value: "1,337" },
      { title: "In Sequence", value: "412" },
      { title: "Replies (30d)", value: "521" },
      { title: "Meetings Booked (30d)", value: "99" },
    ],
    deliverability: {
      deliverabilityScore: 99.1,
      bounceRate: 0.8,
      spamRate: 0.01,
    },
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(mockSummaryData);
}
