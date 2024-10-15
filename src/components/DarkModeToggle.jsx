import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme === 'dark';
        } else {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="text-2xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300"
        >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800 dark:text-gray-200" />}
        </button>
    );
};

export default DarkModeToggle;
