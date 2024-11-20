// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Import for Realtime Database
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL, // Add the Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const realtimeDb = getDatabase(app); // Realtime Database instance
const analytics = getAnalytics(app);

export { app, db, realtimeDb, analytics }; // Export both Firestore and Realtime Database
