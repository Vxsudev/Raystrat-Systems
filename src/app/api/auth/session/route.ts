// src/app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// We need to initialize the app here if it's not already done.
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
}

// Set session cookie
export async function POST(request: Request) {
  const { idToken } = await request.json();
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  
  try {
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
    cookies().set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: '/',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create session cookie' }, { status: 401 });
  }
}

// Delete session cookie
export async function DELETE() {
  cookies().delete('__session');
  return NextResponse.json({ success: true });
}
