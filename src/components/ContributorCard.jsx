import React from 'react';

const ContributorCard = ({ image, title, description, liveLink, gitHubLink, moniker }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 transform hover:scale-105">
        {image ? (
            <img
                src={image}
                alt={title}
                className="rounded-lg w-full h-56 object-cover mb-4"
            />
        ) : (
            <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg mb-4">
                <p className="text-gray-500 dark:text-gray-400 italic">No image provided</p>
            </div>
        )}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <p className="italic text-gray-500 dark:text-gray-400">Submitted by: {moniker}</p>
        <div className="flex justify-between items-center mt-auto">
            {liveLink ? (
                <a
                    href={liveLink}
                    className="text-blue-500 dark:text-yellow-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Live Version
                </a>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No live link available</p>
            )}
            {gitHubLink ? (
                <a
                    href={gitHubLink}
                    className="text-blue-500 dark:text-yellow-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub Code
                </a>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No GitHub link available</p>
            )}
        </div>

    </div>
);

export default ContributorCard;
