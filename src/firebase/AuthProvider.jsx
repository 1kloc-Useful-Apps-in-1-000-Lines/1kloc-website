import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Create the context for auth
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Function to handle login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Function to handle sign up
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Function to handle logout
    const logout = () => {
        return signOut(auth);
    };

    // Values provided by AuthContext
    const value = {
        currentUser,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
