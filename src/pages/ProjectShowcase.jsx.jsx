import React from 'react';
import ContributorList from '../components/ContributorList';

const ProjectShowcase = () => {
    return (
        <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors duration-300">
            <div className="container mx-auto max-w-screen-xl px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold mb-10 text-center text-primary dark:text-white">
                    Project Showcase
                </h1>
                <ContributorList />
            </div>
        </div>
    );
};

export default ProjectShowcase;
