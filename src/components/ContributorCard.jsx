// src/components/ContributorCard.js
import React from 'react';

const ContributorCard = ({ image, title, description, liveLink, gitHubLink }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
        <img src={image} alt={title} className="rounded-lg w-full h-48 object-cover" />
        <h2 className="text-xl font-bold mt-4 text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-4">
            <a href={liveLink} className="text-blue-500 dark:text-yellow-300 hover:underline mr-4">Live Version</a>
            <a href={gitHubLink} className="text-blue-500 dark:text-yellow-300 hover:underline">GitHub Code</a>
        </div>
    </div>
);

export default ContributorCard;
