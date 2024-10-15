import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../firebase/AuthProvider'; // Import the custom hook for auth

const Navbar = () => {
    const { currentUser, logout } = useAuth(); // Get the current user and logout function from context
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Debug: Check if currentUser is correctly set after login
    console.log("Current User in Navbar: ", currentUser);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <nav className="bg-primary text-white dark:bg-gray-800 p-4 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold dark:text-white">1Kloc</Link>

                <button
                    className="md:hidden block text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="hover:text-secondary dark:hover:text-yellow-300">Home</Link>
                    <Link to="/project-showcase" className="hover:text-secondary dark:hover:text-yellow-300">Project Showcase</Link>
                    <Link to="/contributors" className="hover:text-secondary dark:hover:text-yellow-300">Contributors</Link>

                    {currentUser ? (
                        <>
                            <Link to="/submit-contributor" className="hover:text-secondary dark:hover:text-yellow-300">Submit Contributor</Link>
                            <Link to="/submit-contributor-info" className="hover:text-secondary dark:hover:text-yellow-300">Submit Info</Link>
                            <button onClick={handleLogout} className="hover:text-red-500 dark:hover:text-red-300">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-secondary dark:hover:text-yellow-300">Login</Link>
                            <Link to="/signup" className="hover:text-secondary dark:hover:text-yellow-300">Sign Up</Link>
                        </>
                    )}
                    <DarkModeToggle />
                </div>

                <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} w-full mt-4`}>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Home</Link>
                    <Link to="/project-showcase" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Project Showcase</Link>
                    <Link to="/contributors" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Contributors</Link>

                    {currentUser ? (
                        <>
                            <Link to="/submit-contributor" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Submit Contributor</Link>
                            <Link to="/submit-contributor-info" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Submit Info</Link>
                            <button onClick={handleLogout} className="block px-4 py-2 text-red-500 hover:bg-gray-700 dark:hover:bg-gray-600">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Login</Link>
                            <Link to="/signup" className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600">Sign Up</Link>
                        </>
                    )}
                    <DarkModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
