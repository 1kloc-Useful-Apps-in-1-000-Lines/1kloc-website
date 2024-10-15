import React from 'react';
import { useAuth } from '../firebase/AuthProvider';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <div className="min-h-screen p-8 bg-white dark:bg-background transition-colors duration-300">
            <h1 className="text-3xl font-bold dark:text-white mb-8">Welcome, {currentUser?.moniker || 'OG!'}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800">
                    <h2 className="text-xl font-semibold dark:text-yellow-300 mb-4">Submit Your Project</h2>
                    <p className="mb-4 dark:text-gray-300">Have a project to showcase? Click below to submit it.</p>
                    <Link
                        to="/submit-contributor"
                        className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-secondary transition-colors"
                    >
                        Submit Project
                    </Link>
                </div>

                <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800">
                    <h2 className="text-xl font-semibold dark:text-yellow-300 mb-4">Submit Your Information</h2>
                    <p className="mb-4 dark:text-gray-300">Want to share more about yourself? Add your info below.</p>
                    <Link
                        to="/submit-contributor-info"
                        className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-secondary transition-colors"
                    >
                        Submit Info
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
