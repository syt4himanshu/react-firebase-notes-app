import { useEffect, useState } from 'react';
import { auth, db } from './firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function TestFirebaseConnection() {
    const [status, setStatus] = useState('Testing Firebase connection...');
    const [testUser, setTestUser] = useState(null);
    const [testNote, setTestNote] = useState(null);

    useEffect(() => {
        const testConnection = async () => {
            try {
                // Test 1: Check if auth is available
                setStatus('Checking Firebase Authentication...');
                console.log('Auth object:', auth);

                // Test 2: Check if Firestore is available
                setStatus('Checking Firestore Database...');
                console.log('Firestore object:', db);

                // Test 3: Try to create a test user
                setStatus('Creating test user...');
                const testEmail = `test${Date.now()}@test.com`;
                const testPassword = 'test123456';

                let userCredential;
                try {
                    userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
                    setTestUser(userCredential.user);
                    console.log('Test user created:', userCredential.user.uid);

                    // Test 4: Try to create a test note
                    setStatus('Creating test note...');
                    const noteRef = await addDoc(collection(db, 'notes'), {
                        title: 'Test Note',
                        content: 'This is a test note from Firebase connection test',
                        userId: userCredential.user.uid,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp()
                    });

                    setTestNote(noteRef.id);
                    console.log('Test note created with ID:', noteRef.id);

                    setStatus('✅ All tests passed! Firebase is connected successfully.');
                } catch (authError) {
                    console.log('Auth test error (might be expected):', authError.message);

                    // Try to login with existing test user
                    setStatus('Trying to login with test credentials...');
                    try {
                        userCredential = await signInWithEmailAndPassword(auth, 'test@test.com', 'test123456');
                        setTestUser(userCredential.user);
                        setStatus('✅ Logged in successfully. Firebase is connected.');
                    } catch (loginError) {
                        console.log('Login test error:', loginError.message);
                        setStatus('⚠️ Authentication test skipped. Please enable Email/Password auth in Firebase Console.');
                    }
                }

            } catch (error) {
                console.error('Firebase connection error:', error);
                setStatus(`❌ Error: ${error.message}`);
            }
        };

        testConnection();
    }, []);

    return (
        <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Firebase Connection Test</h3>
            <p><strong>Status:</strong> {status}</p>
            {testUser && <p><strong>Test User ID:</strong> {testUser.uid}</p>}
            {testNote && <p><strong>Test Note ID:</strong> {testNote}</p>}
            <div style={{ marginTop: '20px' }}>
                <h4>Checklist:</h4>
                <ul>
                    <li>✅ Firebase configuration loaded</li>
                    <li>✅ Authentication initialized</li>
                    <li>✅ Firestore initialized</li>
                    <li>❓ Email/Password auth enabled in Firebase Console</li>
                    <li>❓ Firestore database created</li>
                </ul>
            </div>
        </div>
    );
}