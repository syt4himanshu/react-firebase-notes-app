// Protected route wrapper
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();

    // If user is not authenticated, redirect to login
    return currentUser ? children : <Navigate to="/login" />;
}