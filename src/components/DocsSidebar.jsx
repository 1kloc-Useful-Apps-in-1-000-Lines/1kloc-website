import React from 'react';
import { Link } from 'react-router-dom';

const DocsSidebar = () => (
    <div className="w-64 min-h-screen bg-lightBackground dark:bg-background p-6 shadow-lg transition-all duration-300">
        <h2 className="text-2xl font-bold mb-8 text-primary dark:text-white">
            Documentation
        </h2>
        <ul className="space-y-6">
            <li>
                <Link
                    to="/docs/getting-started"
                    className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-secondary dark:hover:text-accent transition-colors duration-200"
                >
                    Getting Started
                </Link>
            </li>
            <li>
                <Link
                    to="/docs/contributing"
                    className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-secondary dark:hover:text-accent transition-colors duration-200"
                >
                    Contributing Guide
                </Link>
            </li>
            <li>
                <Link
                    to="/docs/feature-overview"
                    className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-secondary dark:hover:text-accent transition-colors duration-200"
                >
                    Feature Overview
                </Link>
            </li>
        </ul>
    </div>
);

export default DocsSidebar;
