import React from 'react';

const ContributorInfoCard = ({ image, moniker, realName, info, position, links }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 shadow-lg flex items-center transition-colors duration-300">
        <img src={image} alt={realName} className="w-16 h-16 rounded-full mr-4" /> {/* Small image */}
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                {moniker} <span className="text-sm text-gray-500 dark:text-gray-400">OG - Original Geek!</span>
            </h2>
            <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400">{realName}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{info}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Position:</strong> {position}</p> {/* Display the position */}
            <div className="mt-4 flex space-x-4">
                {links.map((link, index) => (
                    <a key={index} href={link.url} className="text-blue-500 dark:text-yellow-300 hover:underline">
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    </div>
);

export default ContributorInfoCard;
