import React from 'react';
import Logo from '../components/Logo';

const Home = () => {
    return (
        <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-background text-black dark:text-white">
            <Logo />
            <div className="flex justify-center items-center mt-4">
                {/* Add content here */}
            </div>
        </div>
    );
};

export default Home;