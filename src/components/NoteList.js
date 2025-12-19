// List and manage user's notes
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import {
    collection,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc
} from 'firebase/firestore';

export default function NoteList({ onEditNote }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) return;

        setLoading(true);

        // Create query for current user's notes
        const q = query(
            collection(db, 'notes'),
            where('userId', '==', currentUser.uid)
        );

        // Real-time listener for notes
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const notesData = [];
            querySnapshot.forEach((doc) => {
                notesData.push({ id: doc.id, ...doc.data() });
            });

            // Sort by updatedAt (newest first)
            notesData.sort((a, b) =>
                (b.updatedAt?.toDate() || b.createdAt?.toDate()) -
                (a.updatedAt?.toDate() || a.createdAt?.toDate())
            );

            setNotes(notesData);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const handleDelete = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await deleteDoc(doc(db, 'notes', noteId));
            } catch (error) {
                console.error('Error deleting note:', error);
                alert('Failed to delete note. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading notes...</div>;
    }

    if (notes.length === 0) {
        return (
            <div className="empty-notes">
                <p>No notes yet. Create your first note!</p>
            </div>
        );
    }

    return (
        <div className="note-list">
            {notes.map((note) => (
                <div key={note.id} className="note-card">
                    <div className="note-header">
                        <h4>{note.title}</h4>
                        <div className="note-actions">
                            <button onClick={() => onEditNote(note)}>Edit</button>
                            <button
                                onClick={() => handleDelete(note.id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="note-content">
                        <p>{note.content}</p>
                    </div>
                    <div className="note-footer">
                        <small>
                            Updated: {note.updatedAt?.toDate().toLocaleDateString() ||
                                note.createdAt?.toDate().toLocaleDateString()}
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
}