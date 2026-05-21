// src/lib/firebase/admin.ts
import 'server-only';
import { initializeApp, getApps, App, applicationDefault } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Use applicationDefault() to automatically find credentials in the environment.
  // This is the standard and recommended practice for server-side Google Cloud environments.
  return initializeApp({
    credential: applicationDefault(),
  });
}

const app = getAdminApp();
export const adminAuth: Auth = getAuth(app);
export const db = getFirestore(app);

// Verify the __session cookie and return the decoded token
export async function verifySessionCookie(cookie: string) {
  if (!cookie) throw new Error('No session cookie');
  return await adminAuth.verifySessionCookie(cookie, true);
}
