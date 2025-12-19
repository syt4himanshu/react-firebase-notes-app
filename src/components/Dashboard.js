
// Main dashboard with note list and logout
import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

export default function Dashboard() {
    const [showForm, setShowForm] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedNote(null);
    };

    return (
        <div className="dashboard">
            <header>
                <h2>My Notes</h2>
                <div className="user-info">
                    <span>Welcome, {currentUser.email}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <main>
                <button
                    onClick={() => setShowForm(true)}
                    className="add-note-btn"
                >
                    + Add New Note
                </button>

                {showForm && (
                    <NoteForm
                        note={selectedNote}
                        onClose={handleFormClose}
                    />
                )}

                <NoteList onEditNote={handleEditNote} />
            </main>
        </div>
    );
}