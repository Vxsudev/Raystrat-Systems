// src/lib/firebase/admin.ts
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';
import dotenv from 'dotenv';

// Load environment variables from a .env file. This is crucial for local development.
dotenv.config();

// --- Robust Initialization for Firebase Admin SDK ---

// This ensures we only initialize the app once.
// It's a standard pattern to avoid "duplicate app" errors in serverless environments.
if (!admin.apps.length) {
  try {
    const serviceAccount: admin.ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The private key comes with escaped newlines, which we must replace.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    };
    
    // This check is a safeguard to provide a clear error if secrets aren't set.
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error("Firebase Admin credentials are not fully configured in environment variables.");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  } catch (error: any) {
    // In a serverless environment, sometimes `admin.apps.length` can fail in a race condition.
    // We catch the "duplicate-app" error code to prevent crashes in such cases.
    if (error.code !== 'app/duplicate-app') {
        console.error('Firebase admin initialization error:', error.stack);
        // We throw the error in development to halt execution and signal a critical configuration issue.
        if (process.env.NODE_ENV === 'development') {
            throw error;
        }
    }
  }
}

const adminAuth = getAuth();
const db = getFirestore();


// --- Authentication Helper ---

/**
 * Verifies the session cookie from the incoming request and returns the decoded user claims.
 * Returns null if the cookie is invalid or not present.
 * This is the single source of truth for authenticating users in Server Actions and API Routes.
 */
async function getAuthenticatedUser() {
    const sessionCookie = cookies().get('__session')?.value;
    if (!sessionCookie) return null;

    try {
        // Use the reliably initialized adminAuth instance to verify the cookie.
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        return decodedClaims;
    } catch (error) {
        // This is an expected failure case if the cookie is expired or invalid.
        // We log it for debugging but return null as the user is not authenticated.
        console.error('Session cookie verification failed:', error);
        return null;
    }
}

export { adminAuth, db, getAuthenticatedUser };
