// src/lib/firebase/admin.ts
import 'dotenv/config'; // no-op in prod; fixes local cold starts
import 'server-only';
import { initializeApp, getApps, applicationDefault, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

declare global {
  // eslint-disable-next-line no-var
  var __FIREBASE_ADMIN__: { app: App; auth: Auth } | undefined;
}

export function getAdmin() {
  if (global.__FIREBASE_ADMIN__) return global.__FIREBASE_ADMIN__;

  // Use applicationDefault() to automatically find credentials in the environment
  const app = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: applicationDefault() });

  const auth = getAuth(app);
  global.__FIREBASE_ADMIN__ = { app, auth };
  return global.__FIREBASE_ADMIN__;
}

// Convenience helpers
export const adminAuth = () => getAdmin().auth;
export const db = getFirestore(getAdmin().app);


// Verify the __session cookie and return the decoded token
export async function verifySessionCookie(cookie: string) {
  if (!cookie) throw new Error('No session cookie');
  return await adminAuth().verifySessionCookie(cookie, true);
}
