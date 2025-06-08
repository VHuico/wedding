// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// TODO: Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAZbqzxJ9CbWRU4fh3I-ZnYESsggabjkvM",
  authDomain: "victor-landy-wedding.firebaseapp.com",
  projectId: "victor-landy-wedding",
  storageBucket: "victor-landy-wedding.firebasestorage.app",
  messagingSenderId: "209201397711",
  appId: "1:209201397711:web:79d1aaec1ed28019075cba"
};

// INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or select existing)
// 3. Go to Project Settings > Your apps > Web app
// 4. Copy the config object and replace the values above

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Auth (for admin access)
export const auth = getAuth(app);

export default app;
