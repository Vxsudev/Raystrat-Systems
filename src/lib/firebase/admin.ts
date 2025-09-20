// src/lib/firebase/admin.ts
import 'dotenv/config'; // no-op in prod; fixes local cold starts
import 'server-only';
import type {ServiceAccount} from 'firebase-admin';
import {initializeApp, getApps, cert, App} from 'firebase-admin/app';
import {getAuth, Auth} from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

declare global {
  // eslint-disable-next-line no-var
  var __FIREBASE_ADMIN__: { app: App; auth: Auth } | undefined;
}

function buildServiceAccount(): ServiceAccount {
  // Support both Secret Manager and local .env
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Private key may include literal \n – normalize for Node
  const raw = process.env.FIREBASE_PRIVATE_KEY || '';
  const privateKey = raw.includes('\\n') ? raw.replace(/\\n/g, '\n') : raw;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin env vars');
  }
  return { projectId, clientEmail, privateKey };
}

export function getAdmin() {
  if (global.__FIREBASE_ADMIN__) return global.__FIREBASE_ADMIN__;

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: cert(buildServiceAccount()) });

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
  return await adminAuth()().verifySessionCookie(cookie, true);
}
