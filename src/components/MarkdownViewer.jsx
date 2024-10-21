import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

// Import markdown files
const docs = import.meta.glob('/src/docs/*.md', { as: 'raw' });
const contributorDocs = import.meta.glob('/src/docs/contributor-md/*.md', { as: 'raw' });

const MarkdownViewer = () => {
    const { docName, contributorName } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadDoc = async () => {
            let filePath = `/src/docs/${docName}.md`;
            if (contributorName) {
                filePath = `/src/docs/contributor-md/${contributorName}.md`;
            }

            if (docs[filePath]) {
                const text = await docs[filePath]();
                setContent(text);
            } else if (contributorDocs[filePath]) {
                const text = await contributorDocs[filePath]();
                setContent(text);
            } else {
                setContent('Document not found');
            }
        };
        loadDoc();
    }, [docName, contributorName]);

    return (
        <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors duration-300">
            <div className="container mx-auto max-w-screen-md px-6 py-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-all duration-300">
                    <ReactMarkdown
                        className="prose prose-lg text-gray-900 dark:text-gray-100 max-w-none"
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1 className="text-3xl font-bold mb-4 text-primary" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary" {...props} />
                            ),
                            p: ({ node, ...props }) => <p className="mb-6" {...props} />,
                            ul: ({ node, ...props }) => (
                                <ul className="list-disc list-inside mb-4" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol className="list-decimal list-inside mb-4" {...props} />
                            ),
                            a: ({ node, ...props }) => (
                                <a
                                    className="text-accent hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default MarkdownViewer;
