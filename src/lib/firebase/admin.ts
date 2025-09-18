// src/lib/firebase/admin.ts
import * as admin from 'firebase-admin';

// Check if the app is already initialized to prevent errors
if (!admin.apps.length) {
  // Only attempt to initialize if the necessary environment variables are set.
  // This prevents build-time errors when these variables are not available.
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Firebase admin initialization error', error);
    }
  } else {
    // During build or in environments without these secrets, we don't want to throw an error.
    // The app will not be initialized, and subsequent calls will fail gracefully at runtime.
    console.log('Firebase Admin SDK not initialized. Missing environment variables.');
  }
}

// Export the firestore instance. If the app is not initialized,
// this will throw an error at runtime when used, which is the desired behavior.
export default admin.firestore();
