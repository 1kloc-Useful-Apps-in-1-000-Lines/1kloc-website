import React, { useState } from 'react';
import DocsSidebar from '../components/DocsSidebar';
import MarkdownViewer from '../components/MarkdownViewer';

const DocsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-4 bg-primary text-white"
            >
                {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>

            <div
                className={`${isSidebarOpen ? 'block' : 'hidden'
                    } md:block w-full md:w-64 bg-lightBackground dark:bg-background p-6 shadow-lg`}
            >
                <DocsSidebar />
            </div>

            <div className="flex-1 p-8">
                <MarkdownViewer />
            </div>
        </div>
    );
};

export default DocsPage;
