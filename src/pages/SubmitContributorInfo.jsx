import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthProvider';

const SubmitContributorInfo = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        image: '',
        moniker: '',
        realName: '',
        info: '',
        githubLink: '',
        websiteLink: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const contributorData = {
            image: formData.image,
            moniker: formData.moniker,
            realName: formData.realName,
            info: formData.info,
            links: [
                { label: 'GitHub', url: formData.githubLink },
                { label: 'Website', url: formData.websiteLink },
            ],
        };
        await addDoc(collection(db, 'contributorsInfo'), contributorData);

        setFormData({
            image: '',
            moniker: '',
            realName: '',
            info: '',
            githubLink: '',
            websiteLink: '',
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
                    <label className="block mb-2 text-primary dark:text-yellow-300">Moniker</label>
                    <input
                        type="text"
                        placeholder="Enter moniker (e.g., CodeMaster OG)"
                        value={formData.moniker}
                        onChange={(e) => setFormData({ ...formData, moniker: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Real Name</label>
                    <input
                        type="text"
                        placeholder="Enter your real name"
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
