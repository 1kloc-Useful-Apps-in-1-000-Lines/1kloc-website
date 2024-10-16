import React from 'react';
import Logo from '../components/Logo';

const Home = () => (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-background text-black dark:text-white">
        <Logo />
        <div className="flex justify-center items-center mt-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">1Kloc - Useful Apps in 1,000 Lines of Code</h1>
                <p className="text-lg mb-6">
                    Welcome to the 1Kloc project! This is an open-source initiative to build useful apps under 1,000 lines of code.
                    Explore, contribute, and showcase your coding skills!
                </p>
                <p className="text-lg mb-6">
                    For complete documentation, visit our{' '}
                    <a
                        href="http://localhost:3000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline"
                    >
                        1Kloc Docs Site
                    </a>.
                </p>
                <h2 className="text-2xl font-semibold mb-2">Contribute to the Project</h2>
                <ul className="list-disc list-inside">
                    <li>Fork this repository.</li>
                    <li>Create your project under 1,000 lines of code.</li>
                    <li>Submit a pull request with your project.</li>
                </ul>
                <p className="mt-4">
                    Find detailed guidelines in the{' '}
                    <a
                        href="http://localhost:3000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline"
                    >
                        documentation site
                    </a>.
                </p>
            </div>
        </div>
    </div>
);

export default Home;
