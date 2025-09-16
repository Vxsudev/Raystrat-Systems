// src/lib/firebase/admin.ts
import 'server-only';
import admin from 'firebase-admin';

// Check if the app is already initialized to prevent re-initialization.
// This is important for Next.js's hot-reloading feature in development.
if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // The private key must be correctly formatted. 
    // The replace function handles the newline characters.
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export the initialized services.
const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
