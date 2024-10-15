import React from 'react';
import logo from '../assets/1kloc_hippy_logo.png'; // Add the logo file here

const Logo = () => (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-background transition-colors duration-300">
        <img src={logo} alt="1Kloc Logo" className="w-2/3 md:w-1/3" />
    </div>
);

export default Logo;
