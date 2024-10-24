import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../firebase/AuthProvider';
import logo from '../assets/1kloc_hippy_logo.png';

const MenuLinks = ({ toggleMenu }) => (
    <>
        <Link to="/" className="block p-2" onClick={toggleMenu}>Home</Link>
        <Link to="/project-showcase" className="block p-2" onClick={toggleMenu}>Project Showcase</Link>
        <Link to="/contributors" className="block p-2" onClick={toggleMenu}>Contributors</Link>
        <Link to="/docs/getting-started" className="block p-2" onClick={toggleMenu}>Documentation</Link>
    </>
);

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef();

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
        <nav className="bg-primary text-white p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="1Kloc Logo" className="h-10 w-10" />
                </Link>

                <button
                    className="md:hidden block"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                    >
                        <path stroke="currentColor" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div
                    ref={menuRef}
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'
                        } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4 absolute md:relative bg-gray-900 md:bg-transparent w-full md:w-auto top-16 left-0 md:top-0 p-4 md:p-0`}
                >
                    <MenuLinks toggleMenu={closeMobileMenu} />
                    {currentUser ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    )}
                    <DarkModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
