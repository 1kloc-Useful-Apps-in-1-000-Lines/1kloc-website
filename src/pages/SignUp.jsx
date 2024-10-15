import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting
import { useAuth } from '../firebase/AuthProvider'; // Use the auth context

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For redirecting after signup
    const { signup } = useAuth(); // Get signup function from auth context

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        try {
            await signup(email, password);
            navigate('/'); // Redirect to home after successful signup
        } catch (error) {
            setError('Failed to create an account');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password</label>
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
                    className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
