// src/lib/firebase/admin.ts
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import { cookies } from 'next/headers';

// Load environment variables from a .env file if it exists.
// This is crucial for local development and preview environments.
dotenv.config();

// This ensures we only initialize the app once, using a global variable for the instance.
if (!admin.apps.length) {
  try {
    const serviceAccount: admin.ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    };
    
    // Check if all required fields are present. This helps debug missing secrets.
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error("Firebase Admin credentials are not fully configured. Please check your environment variables.");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    // In a serverless environment, sometimes the `apps` array check can fail in a race condition.
    // We catch a "duplicate-app" error to prevent crashes in that case.
    if (error.code !== 'app/duplicate-app') {
        console.error('Firebase admin initialization error', error.stack);
    }
  }
}

const adminAuth = getAuth();
const db = getFirestore();

/**
 * Verifies the session cookie from the incoming request and returns the decoded user claims.
 * Returns null if the cookie is invalid or not present.
 */
async function getAuthenticatedUser() {
    const sessionCookie = cookies().get('__session')?.value;
    if (!sessionCookie) return null;

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        return decodedClaims;
    } catch (error) {
        // This is expected if the cookie is expired or invalid.
        // We can safely return null and the user will be considered unauthenticated.
        console.error('Session cookie verification failed:', error);
        return null;
    }
}


export { adminAuth, db, getAuthenticatedUser };
