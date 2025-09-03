// src/lib/firebase/admin.ts
import 'server-only';
import admin from 'firebase-admin';

// Corrected initialization using service account credentials from environment variables
// This is more robust for local development and production environments.
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // The private key must be properly formatted, replacing newlines with \\n
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  try {
    // Check if all required environment variables are present
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error('Firebase Admin SDK environment variables are not set. Please check your .env.local file.');
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
    // In a production environment, you might want to handle this more gracefully
    // For now, we'll throw to make it clear something is wrong.
    throw new Error('Could not initialize Firebase Admin SDK.');
  }
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
