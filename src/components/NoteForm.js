// Form for creating/editing notes
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';

export default function NoteForm({ note, onClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return setError('Title and content are required');
        }

        setLoading(true);
        setError('');

        try {
            const noteData = {
                title,
                content,
                userId: currentUser.uid,
                updatedAt: serverTimestamp()
            };

            if (note) {
                // Update existing note
                const noteRef = doc(db, 'notes', note.id);
                await updateDoc(noteRef, noteData);
            } else {
                // Create new note
                noteData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'notes'), noteData);
            }

            // Reset form and close
            setTitle('');
            setContent('');
            onClose();
        } catch (error) {
            setError('Failed to save note. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="note-form-overlay">
            <div className="note-form">
                <h3>{note ? 'Edit Note' : 'Create New Note'}</h3>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        required
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Note Content"
                        rows="6"
                        required
                    />
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : (note ? 'Update' : 'Save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}