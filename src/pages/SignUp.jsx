import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthProvider';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [moniker, setMoniker] = useState(''); // Added moniker state
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        try {
            const userCredential = await signup(email, password);
            const user = userCredential.user;

            // Save user details to Firestore with moniker
            await setDoc(doc(db, 'users', user.uid), { email, moniker });

            navigate('/');
        } catch (error) {
            setError('Failed to create an account');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-background transition-colors duration-300">
            <h2 className="text-2xl mb-4 text-primary dark:text-white">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="w-80">
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200">Moniker</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={moniker}
                        onChange={(e) => setMoniker(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition-colors"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
