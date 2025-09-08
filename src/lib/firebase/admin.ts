// src/lib/firebase/admin.ts
import 'server-only';
import admin from 'firebase-admin';

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    // Log a more helpful error message
    console.error('Firebase Admin SDK initialization error:', error.message);
    // To prevent the app from crashing on repeated failed inits (e.g. during dev HMR)
    // we can check if the code is 'auth/invalid-credential' and handle it.
    // For now, we'll just log it. A robust app might conditionally throw.
  }
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
