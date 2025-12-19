// CORRECT Firebase v10+ modular syntax
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9X_V7EewcbT9E7rBpPdUg_4QhL9Crv6U",
    authDomain: "react-firebase-notes-ce3f0.firebasestorage.app",
    projectId: "react-firebase-notes-ce3f0",
    storageBucket: "react-firebase-notes-ce3f0.firebasestorage.app",
    messagingSenderId: "902671575686",
    appId: "1:902671575686:web:b4f8583b57f5eb28d63f07",
    measurementId: "G-LNT6MMBZQZ"
};

console.log("🔥 Firebase Config:", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    apiKeyLength: firebaseConfig.apiKey.length
});

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
    console.log("App name:", app.name);
} catch (error) {
    console.error("❌ Firebase initialization error:", error);
    throw error;
}

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

console.log("✅ Auth service loaded:", !!auth);
console.log("✅ Firestore service loaded:", !!db);

export { auth, db };