// src/lib/firebase/admin.ts
import 'server-only';
import admin from 'firebase-admin';

// Check if the app is already initialized to prevent re-initialization
if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // The private key must be correctly formatted. The replace function handles the newline characters.
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };

  // The credential object is created from the service account.
  const credential = admin.credential.cert(serviceAccount);
  
  // Initialize the app with the credential.
  admin.initializeApp({
    credential,
  });
}

// Export the initialized services.
const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
