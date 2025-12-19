import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Log for debugging (remove in production)
console.log('Firebase Config Loaded:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
});

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    console.error('Please check your .env.local file');

    // Fallback to your direct config
    const fallbackConfig = {
        apiKey: "AIzaSyD9X_V7EewcbT9E7rBpPdUg_4QhL9Crv6U",
        authDomain: "react-firebase-notes-ce3f0.firebaseapp.com",
        projectId: "react-firebase-notes-ce3f0",
        storageBucket: "react-firebase-notes-ce3f0.firebasestorage.app",
        messagingSenderId: "902671575686",
        appId: "1:902671575686:web:b4f8583b57f5eb28d63f07"
    };
    app = initializeApp(fallbackConfig);
}

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };