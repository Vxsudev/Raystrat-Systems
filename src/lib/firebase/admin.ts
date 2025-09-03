// src/lib/firebase/admin.ts
import 'server-only';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
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
