import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import the debug test
import './test-firebase-debug.js';

// Delay React render to see Firebase errors first
setTimeout(() => {
    import('./App').then(({ default: App }) => {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    });
}, 1000);