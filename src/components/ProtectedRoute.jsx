import { useAuth } from '../firebase/AuthProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // If user is not logged in, redirect to login page
        return <Navigate to="/login" />;
    }

    // If user is logged in, show the protected content
    return children;
};

export default ProtectedRoute;
