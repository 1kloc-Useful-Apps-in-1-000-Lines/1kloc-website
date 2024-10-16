import React from 'react';
import logo from '../assets/1kloc_hippy_logo.png'; // Adjust the logo path as needed

const Logo = () => (
    <div className="flex justify-center items-center">
        <img
            src={logo}
            alt="1Kloc Logo"
            className="w-1/2 md:w-1/4 lg:w-1/6"
        />
    </div>
);

export default Logo;
