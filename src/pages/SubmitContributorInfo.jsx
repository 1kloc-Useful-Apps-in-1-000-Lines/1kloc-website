import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthProvider';

const SubmitContributorInfo = () => {
    const { currentUser } = useAuth(); // Get current user from auth context
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
        if (!currentUser) return; // Check if user is logged in before submitting
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
        <form onSubmit={handleSubmit} className="p-8 max-w-lg mx-auto shadow-lg rounded-md">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                <input
                    type="url"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Moniker</label>
                <input
                    type="text"
                    placeholder="Enter moniker (e.g., CodeMaster OG)"
                    value={formData.moniker}
                    onChange={(e) => setFormData({ ...formData, moniker: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Real Name</label>
                <input
                    type="text"
                    placeholder="Enter your real name"
                    value={formData.realName}
                    onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Information</label>
                <textarea
                    placeholder="Describe yourself"
                    value={formData.info}
                    onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">GitHub Link</label>
                <input
                    type="url"
                    placeholder="Enter GitHub link"
                    value={formData.githubLink}
                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Website Link</label>
                <input
                    type="url"
                    placeholder="Enter Website link"
                    value={formData.websiteLink}
                    onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 mt-4">
                Submit Contributor Info
            </button>
        </form>
    );
};

export default SubmitContributorInfo;
