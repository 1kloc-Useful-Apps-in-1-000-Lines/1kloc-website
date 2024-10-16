import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../firebase/AuthProvider';
import logo from '../assets/1kloc_hippy_logo.png'; // Import the logo

// Separate reusable menu links for consistency
const MenuLinks = ({ toggleMenu }) => (
    <>
        <Link to="/" className="hover:text-secondary dark:hover:text-yellow-300" onClick={toggleMenu}>
            Home
        </Link>
        <Link to="/project-showcase" className="hover:text-secondary dark:hover:text-yellow-300" onClick={toggleMenu}>
            Project Showcase
        </Link>
        <Link to="/contributors" className="hover:text-secondary dark:hover:text-yellow-300" onClick={toggleMenu}>
            Contributors
        </Link>
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
    const menuRef = useRef();

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const handleLogout = async () => {
        try {
            await logout();
            closeMobileMenu();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Close the menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                closeMobileMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    return (
        <nav className="bg-primary text-white dark:bg-gray-800 p-4 sticky top-0 z-50 transition-colors duration-300">

            <div className="container mx-auto flex justify-between items-center">
                {/* Logo as a link to home */}
                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        alt="1Kloc Logo"
                        className="h-10 w-10 md:h-12 md:w-12"
                    />
                </Link>

                {/* Burger Button */}
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
                            <Link to="/dashboard" className="hover:text-secondary dark:hover:text-yellow-300">
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
                            <Link to="/login" className="hover:text-secondary dark:hover:text-yellow-300">
                                Login
                            </Link>
                            <Link to="/signup" className="hover:text-secondary dark:hover:text-yellow-300">
                                Sign Up
                            </Link>
                        </>
                    )}
                    <DarkModeToggle />
                </div>

                {/* Mobile Slide-Out Menu */}
                <div
                    ref={menuRef}
                    className={`fixed top-0 right-0 h-screen w-2/3 max-w-xs bg-background dark:bg-black p-6 shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out z-50`}
                >
                    <button
                        onClick={closeMobileMenu}
                        className="absolute top-4 right-4 text-white focus:outline-none"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="flex flex-col space-y-4 mt-8">
                        <MenuLinks toggleMenu={closeMobileMenu} />
                        {currentUser ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-white dark:text-yellow-300"
                                    onClick={closeMobileMenu}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 dark:text-red-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white dark:text-yellow-300"
                                    onClick={closeMobileMenu}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-white dark:text-yellow-300"
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
            </div>
        </nav>
    );
};

export default Navbar;
