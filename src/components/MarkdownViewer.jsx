import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const MarkdownViewer = () => {
    const { docName } = useParams(); // Extract the document name from the route params
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`/src/docs/${docName}.md`)
            .then((res) => {
                if (res.ok) return res.text();
                throw new Error('Document not found');
            })
            .then((text) => setContent(text))
            .catch((error) => setContent(error.message));
    }, [docName]);

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
