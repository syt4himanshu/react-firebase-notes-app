import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress React Router warnings (optional)
if (process.env.NODE_ENV !== 'production') {
    const originalWarn = console.warn;
    console.warn = function (...args) {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('React Router Future Flag')) {
            return;
        }
        originalWarn.apply(console, args);
    };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);