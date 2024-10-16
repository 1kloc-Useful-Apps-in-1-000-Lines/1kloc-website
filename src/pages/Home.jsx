import React from 'react';
import Logo from '../components/Logo';

const Home = () => (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-background text-black dark:text-white">
        <div className="flex flex-col items-center justify-center space-y-8 py-8">
            <Logo />
            <div className="text-center px-4 md:px-16 lg:px-32">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    1Kloc - Useful Apps in 1,000 Lines of Code
                </h1>
                <p className="text-lg mb-6">
                    Welcome to the 1Kloc project! Thank you for visiting our project ! This is an open-source initiative to build useful apps under 1,000 lines of code. Explore, contribute, and showcase your coding skills!
                </p>

                <h2 className="text-2xl font-semibold mb-2">We are under construction and creating our docs to get things going!!! Hopefully we will have live version for testing for community soon !!!!!</h2>
                <p className="text-lg mb-6">
                    For complete documentation, visit our{' '}
                    <a
                        href="http://localhost:3000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500 hover:underline"
                    >
                        1Kloc Docs Site
                    </a>.

                </p>
                <h2 className="text-2xl font-semibold mb-2">Contribute to the Project</h2>

                <p>
                    Find detailed guidelines in the{' '}
                    <a
                        href="http://localhost:3000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500 hover:underline"
                    >
                        documentation site
                    </a>
                    .
                </p>
            </div>
        </div>
    </div>
);

export default Home;
