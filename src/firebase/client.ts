// src/firebase/client.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'raystrat-systems',
  appId: '1:120940808370:web:95959bce4810f0e8a521ab',
  storageBucket: 'raystrat-systems.firebasestorage.app',
  apiKey: 'AIzaSyBwXPewYIPGS9SUEqv29EHfBUcjbu7z5xQ',
  authDomain: 'raystrat-systems.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '120940808370',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

export { app, firestore };
