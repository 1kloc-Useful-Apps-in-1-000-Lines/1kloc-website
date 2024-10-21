import React from 'react';
import DocsSidebar from '../components/DocsSidebar';
import MarkdownViewer from '../components/MarkdownViewer';

const DocsPage = () => (
    <div className="min-h-screen w-full bg-lightBackground dark:bg-background transition-colors duration-300 flex">
        <DocsSidebar />
        <div className="flex-1 p-8">
            <MarkdownViewer />
        </div>
    </div>
);

export default DocsPage;
