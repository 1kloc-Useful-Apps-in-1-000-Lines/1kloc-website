import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useAuth } from '../firebase/AuthProvider';

const Login = () => { // Updated name to Login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate hook
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/'); // Redirect to home page after successful sign-in
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-2xl mb-4">Login</h2> {/* Updated text */}
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
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
                >
                    Login {/* Updated button text */}
                </button>
            </form>
        </div>
    );
};

export default Login;
