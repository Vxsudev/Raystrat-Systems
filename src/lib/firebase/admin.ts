// src/lib/firebase/admin.ts
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// This ensures we only initialize the app once.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
    });
  } catch (error: any) {
    // In a serverless environment, sometimes the check fails but the app is already initialized.
    if (error.code !== 'auth/invalid-credential') {
        console.error('Firebase admin initialization error', error);
    }
  }
}

const adminAuth = getAuth();
const db = getFirestore();

export { adminAuth, db };
