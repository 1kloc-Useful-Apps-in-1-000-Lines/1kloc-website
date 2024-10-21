import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-background transition-colors duration-300">
            <h2 className="text-2xl mb-4 text-primary dark:text-white">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
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
                    <label className="block text-gray-700 dark:text-gray-200">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition-colors mb-4"
                >
                    Login
                </button>
            </form>
            <p className="text-gray-700 dark:text-gray-200">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-secondary hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;
