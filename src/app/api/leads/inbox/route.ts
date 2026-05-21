// src/app/api/leads/inbox/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // In a real application, this would query your Firestore database based on the filter.
  // const { searchParams } = new URL(request.url);
  // const filter = searchParams.get('filter') || 'new-replies';
  
  const mockLeadsData = {
      newReplies: [
          { id: 'lead_1', email: 'new.prospect@example.com', lastStep: 'S1', snippet: 'Thanks for the updated info. What is the pricing?', received: '1h ago' },
          { id: 'lead_2', email: 'interested.lead@domain.com', lastStep: 'S2', snippet: 'This looks promising. Can we schedule a demo?', received: '4h ago' },
      ],
      needsHuman: [
            { id: 'lead_3', email: 'human.review@corp.com', lastStep: 'S1', snippet: 'Is this an automated message? I have a complex question.', received: '1d ago' },
            { id: 'lead_5', email: 'edge.case@company.io', lastStep: 'S3', snippet: 'My legal team needs to review your terms of service.', received: '2d ago' },
      ],
      bounced: [
          { id: 'lead_4', email: 'invalid.email@baddomain.com', lastStep: 'S0', snippet: 'Permanent Failure: Address does not exist', received: '3d ago' },
      ]
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Here you would dynamically return the correct list based on the 'filter' query param.
  // For this mock, we'll just return the whole object.
  return NextResponse.json(mockLeadsData);
}
