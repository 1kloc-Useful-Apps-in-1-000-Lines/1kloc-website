import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../firebase/AuthProvider';
import logo from '../assets/1kloc_hippy_logo.png';

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
        <Link to="/docs/getting-started" className="hover:text-secondary dark:hover:text-yellow-300" onClick={toggleMenu}>
            Documentation
        </Link>
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
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="1Kloc Logo" className="h-10 w-10 md:h-12 md:w-12" />
                </Link>

                <button className="md:hidden block text-white focus:outline-none" onClick={toggleMobileMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div className="hidden md:flex items-center space-x-4">
                    <MenuLinks toggleMenu={closeMobileMenu} />
                    {currentUser ? (
                        <>
                            <Link to="/dashboard" className="hover:text-secondary dark:hover:text-yellow-300">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="hover:text-red-500 dark:hover:text-red-300">
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
            </div>
        </nav>
    );
};

export default Navbar;
