import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Import all markdown files using Vite's import.meta.glob
const docs = import.meta.glob('/src/docs/*.md');


const DocsSidebar = () => {
    const [docLinks, setDocLinks] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const regularDocs = Object.keys(docs)
            .filter((path) => !path.includes('getting-started.md'))
            .map((path) => ({
                name: path.split('/').pop().replace('.md', ''),
                path: `/docs/${path.split('/').pop().replace('.md', '')}`,
            }));
        setDocLinks(regularDocs);



    }, []);

    return (
        <div className="w-64 min-h-screen bg-lightBackground dark:bg-background p-6 shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold mb-8 text-primary dark:text-white">
                Documentation for 1Kloc
            </h2>

            <ul className="space-y-6">
                <li>
                    <Link
                        to="/docs/getting-started"
                        className={`block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-secondary dark:hover:text-accent transition-colors duration-200 ${location.pathname === '/docs/getting-started' ? 'text-accent' : ''
                            }`}
                    >
                        GETTING STARTED
                    </Link>
                </li>

                {docLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className={`block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-secondary dark:hover:text-accent transition-colors duration-200 ${location.pathname === link.path ? 'text-accent' : ''
                                }`}
                        >
                            {link.name.replace('-', ' ').toUpperCase()}
                        </Link>
                    </li>
                ))}


            </ul>
        </div>
    );
};

export default DocsSidebar;
