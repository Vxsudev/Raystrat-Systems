// src/lib/firebase/admin.ts
import * as admin from 'firebase-admin';

// This function ensures the Firebase Admin SDK is initialized,
// and it's safe to call multiple times.
export async function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Only attempt to initialize if the necessary environment variables are set.
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    try {
      const app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      return app;
    } catch (error) {
      console.error('Firebase admin initialization error', error);
      throw error; // Rethrow to signal failure
    }
  } else {
    // In environments without these secrets, we throw an error at runtime.
    throw new Error('Firebase Admin SDK not initialized. Missing environment variables.');
  }
}

// Export a function that initializes the app and returns the firestore instance.
export async function getDb() {
    await initializeAdminApp();
    return admin.firestore();
}

// The default export is now a promise-based function.
// Note: You might want to update existing usages of `db` from a direct import
// to awaiting `getDb()`. For now, we will provide a default export for legacy compatibility,
// but it will fail at runtime if not initialized, which is intended.
export default {
    collection: (...args: Parameters<admin.firestore.Firestore['collection']>) => {
        if (admin.apps.length === 0) {
            throw new Error("Firebase not initialized. Call getDb() instead.");
        }
        return admin.firestore().collection(...args);
    }
};
