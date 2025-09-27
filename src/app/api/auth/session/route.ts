// src/app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

// Set session cookie
export async function POST(request: Request) {
  const { idToken } = await request.json();
  // Set session expiration to 14 days. This is the max allowed by Firebase.
  const expiresIn = 60 * 60 * 24 * 14 * 1000;
  
  try {
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
    cookies().set('__session', sessionCookie, {
      maxAge: expiresIn / 1000, // maxAge is in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to create session cookie:', error instanceof Error ? error.message : JSON.stringify(error));
    return NextResponse.json({ success: false, error: 'Failed to create session cookie' }, { status: 401 });
  }
}

// Delete session cookie
export async function DELETE() {
  cookies().delete('__session');
  return NextResponse.json({ success: true });
}
