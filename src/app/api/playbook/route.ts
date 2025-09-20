// src/app/api/playbook/route.ts
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase/admin';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.error('SendGrid API Key or From Email is not configured.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const db = await getDb();
    // 1. Write lead to Firestore
    await db.collection('playbook_leads').add({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    // 2. Send email via SendGrid
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Your Raystrat Systems Playbook',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your interest in Raystrat Systems.</p>
        <p>You can access the playbook using the link below:</p>
        <p><a href="/playbook.pdf">Download Your Playbook</a></p>
        <p>Best,<br>The Raystrat Systems Team</p>
      `,
    };
    
    await sgMail.send(msg);

    return NextResponse.json({ message: 'Success! Your playbook is on its way.' });

  } catch (error) {
    console.error('Playbook API Error:', error);
    // It's good practice to not expose detailed error messages to the client
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
