// Test Firebase configuration directly
console.log("=== FIREBASE DEBUG TEST ===");

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD9X_V7EewcbT9E7rBpPdUg_4QhL9Crv6U",
    authDomain: "react-firebase-notes-ce3f0.firebasestorage.app",
    projectId: "react-firebase-notes-ce3f0",
    storageBucket: "react-firebase-notes-ce3f0.firebasestorage.app",
    messagingSenderId: "902671575686",
    appId: "1:902671575686:web:b4f8583b57f5eb28d63f07",
    measurementId: "G-LNT6MMBZQZ"
};

console.log("Config being used:", firebaseConfig);
console.log("API Key starts with:", firebaseConfig.apiKey.substring(0, 20));

// Dynamically import and test Firebase
let appInstance; // Declare here so it's available in all scopes

import("firebase/app")
    .then(({ initializeApp }) => {
        console.log("Firebase app module loaded");
        appInstance = initializeApp(firebaseConfig); // Store in global variable
        console.log("✅ Firebase app initialized:", appInstance.name);
        return appInstance;
    })
    .then(app => {
        // Test auth
        return import("firebase/auth").then(({ getAuth }) => {
            const auth = getAuth(app);
            console.log("✅ Auth service loaded:", !!auth);
            return { app, auth };
        });
    })
    .then(({ app, auth }) => {
        // Test Firestore
        return import("firebase/firestore").then(({ getFirestore }) => {
            const db = getFirestore(app);
            console.log("✅ Firestore service loaded:", !!db);
            return { auth, db };
        });
    })
    .then(({ auth, db }) => {
        console.log("✅ All Firebase services loaded successfully!");
        console.log("=== TEST COMPLETE ===");
    })
    .catch(error => {
        console.error("❌ Firebase test failed:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.log("=== TEST FAILED ===");
    });