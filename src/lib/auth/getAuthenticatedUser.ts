// src/lib/auth/getAuthenticatedUser.ts
'use server';

import { cookies } from 'next/headers';
import { verifySessionCookie } from '@/lib/firebase/admin';

export async function getAuthenticatedUser() {
  const jar = await cookies();
  const cookie = jar.get('__session')?.value || '';
  if (!cookie) return null;
  try {
    const decoded = await verifySessionCookie(cookie); // throws if invalid
    return {
      uid: decoded.uid,
      email: decoded.email || null,
      displayName: decoded.name || null,
      photoURL: decoded.picture || null,
      claims: decoded,
    };
  } catch (error) {
    // Session cookie is invalid or expired.
    return null;
  }
}
