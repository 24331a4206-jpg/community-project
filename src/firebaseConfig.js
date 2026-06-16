import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value || String(value).trim() === '')
  .map(([key]) => key);

const hasValidConfig = missingKeys.length === 0;
let auth = null;
let googleProvider = null;
let firebaseConfigError = null;

if (!hasValidConfig) {
  firebaseConfigError = `Firebase configuration is incomplete. Missing: ${missingKeys.join(', ')}`;
} else {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    firebaseConfigError = `Firebase initialization failed: ${error.message}`;
    console.error('Firebase init error:', error);
  }
}

export { auth, googleProvider, firebaseConfigError };
