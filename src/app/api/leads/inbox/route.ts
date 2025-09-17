// src/app/api/leads/inbox/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // In a real application, this would query your Firestore database based on the filter.
  // const { searchParams } = new URL(request.url);
  // const filter = searchParams.get('filter') || 'new-replies';
  
  const mockLeadsData = {
      newReplies: [
          { id: 'lead_1', email: 'prospect1@example.com', lastStep: 'S1', snippet: 'Thanks for reaching out, what\'s the pricing?', received: '2h ago' },
          { id: 'lead_2', email: 'prospect2@domain.com', lastStep: 'S2', snippet: 'Can you send over a case study for a company in...', received: '5h ago' },
      ],
      needsHuman: [
            { id: 'lead_3', email: 'prospect3@corp.com', lastStep: 'S1', snippet: 'Is this an automated message?', received: '1d ago' },
      ],
      bounced: [
          { id: 'lead_4', email: 'invalid@baddomain.com', lastStep: 'S0', snippet: 'Error: Address does not exist', received: '3d ago' },
      ]
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Here you would dynamically return the correct list based on the 'filter' query param.
  // For this mock, we'll just return the whole object.
  return NextResponse.json(mockLeadsData);
}
