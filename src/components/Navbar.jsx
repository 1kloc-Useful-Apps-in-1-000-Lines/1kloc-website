import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../firebase/AuthProvider';

// Separate reusable menu links into a component for consistency
const MenuLinks = ({ toggleMenu }) => (
    <>
        <Link to="/" className="hover:text-secondary dark:hover:text-yellow-300" onClick={toggleMenu}>Home</Link>
        <Link to="/project-showcase" className="hover:text-secondary dark:hover:text-yellow-300" onClick={toggleMenu}>Project Showcase</Link>
        <Link to="/contributors" className="hover:text-secondary dark:hover:text-yellow-300" onClick={toggleMenu}>Contributors</Link>
        <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary dark:hover:text-yellow-300"
            onClick={toggleMenu}
        >
            Documentation
        </a>
    </>
);

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="bg-primary text-white dark:bg-background p-4 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold dark:text-white text-accent">
                    1Kloc
                </Link>

                <button
                    className="md:hidden block text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <MenuLinks toggleMenu={closeMobileMenu} />
                    {currentUser ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="hover:text-secondary dark:hover:text-yellow-300"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-red-500 dark:hover:text-red-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-secondary dark:hover:text-yellow-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="hover:text-secondary dark:hover:text-yellow-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                    <DarkModeToggle />
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} w-full mt-4`}
                >
                    <MenuLinks toggleMenu={closeMobileMenu} />
                    {currentUser ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="block text-white dark:text-yellow-300 mb-2"
                                onClick={closeMobileMenu}
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block text-red-500 dark:text-red-300 mb-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block text-white dark:text-yellow-300 mb-2"
                                onClick={closeMobileMenu}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="block text-white dark:text-yellow-300 mb-2"
                                onClick={closeMobileMenu}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                    <div className="mt-4">
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
