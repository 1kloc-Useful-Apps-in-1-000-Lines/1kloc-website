import React from 'react';
import Logo from '../components/Logo';


const Home = () => {
    return (
        // Apply the global background and text color for light/dark mode
        <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-background text-black dark:text-white">
            <Logo />
            <div className="flex justify-center items-center mt-4">

            </div>
        </div>
    );
};

export default Home;
