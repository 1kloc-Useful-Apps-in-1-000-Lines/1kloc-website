import React from 'react';
import ContributorList from '../components/ContributorList';  // Still using the ContributorList for project cards

const ProjectShowcase = () => (
    <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Project Showcase</h1>
        <ContributorList />  {/* Reuse the contributor list for projects */}
    </div>
);

export default ProjectShowcase;