import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthProvider';

const SubmitContributorInfo = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        image: '',
        realName: '',
        info: '',
        githubLink: '',
        websiteLink: '',
        position: '', // New field for project position
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const contributorData = {
            image: formData.image,
            moniker: currentUser.moniker, // Use the user's moniker
            realName: formData.realName,
            info: formData.info,
            position: formData.position, // Include position in the data
            links: [
                { label: 'GitHub', url: formData.githubLink },
                { label: 'Website', url: formData.websiteLink },
            ],
        };
        await addDoc(collection(db, 'contributorsInfo'), contributorData);

        setFormData({
            image: '',
            realName: '',
            info: '',
            githubLink: '',
            websiteLink: '',
            position: '', // Reset position field
        });
    };

    if (!currentUser) {
        return <div>Please log in to submit your information.</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-background transition-colors duration-300">
            <form onSubmit={handleSubmit} className="p-8 max-w-lg mx-auto shadow-lg rounded-md bg-white dark:bg-gray-900 transition-colors duration-300">
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">Submit Your Information</h2>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Profile Image URL</label>
                    <input
                        type="url"
                        placeholder="Enter image URL"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Real Name</label>
                    <input
                        type="text"
                        placeholder="Enter your real name (optional)"
                        value={formData.realName}
                        onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Information</label>
                    <textarea
                        placeholder="Describe yourself"
                        value={formData.info}
                        onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        rows="4"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Project Position</label>
                    <select
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Select Position</option>
                        <option value="Maintainer">Maintainer</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Tester">Tester</option>
                        <option value="Documentation Writer">Documentation Writer</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Contributor">Contributor</option>
                        <option value="Community Manager">Community Manager</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">GitHub Link</label>
                    <input
                        type="url"
                        placeholder="Enter GitHub link"
                        value={formData.githubLink}
                        onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Website Link</label>
                    <input
                        type="url"
                        placeholder="Enter Website link"
                        value={formData.websiteLink}
                        onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <button type="submit" className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-secondary transition-colors mt-4">
                    Submit Contributor Info
                </button>
            </form>
        </div>
    );
};

export default SubmitContributorInfo;
