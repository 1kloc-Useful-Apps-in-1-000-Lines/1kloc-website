import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthProvider'; // Use the auth context
import { useNavigate } from 'react-router-dom'; // For redirection if not logged in

const SubmitContributor = () => {
    const { currentUser } = useAuth(); // Get current user from Auth context
    const navigate = useNavigate(); // For redirection if not logged in

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        liveLink: '',
        gitHubLink: '',
        image: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'contributors'), formData);
        setFormData({
            title: '',
            description: '',
            liveLink: '',
            gitHubLink: '',
            image: '',
        });
    };

    if (!currentUser) {
        return <div>Please log in to submit your project.</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="p-8 max-w-lg mx-auto shadow-lg rounded-md bg-background">
            <div className="mb-4">
                <label className="block mb-2 text-primary">Project Title</label>
                <input
                    type="text"
                    placeholder="Enter project title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border rounded-md text-black"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-primary">Description</label>
                <textarea
                    placeholder="Enter project description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded-md text-black"
                    rows="4"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-primary">Live Link</label>
                <input
                    type="url"
                    placeholder="Enter live link URL"
                    value={formData.liveLink}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                    className="w-full p-2 border rounded-md text-black"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-primary">GitHub Link</label>
                <input
                    type="url"
                    placeholder="Enter GitHub link URL"
                    value={formData.gitHubLink}
                    onChange={(e) => setFormData({ ...formData, gitHubLink: e.target.value })}
                    className="w-full p-2 border rounded-md text-black"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-primary">Image URL</label>
                <input
                    type="url"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2 border rounded-md text-black"
                />
            </div>

            <button type="submit" className="w-full py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors">
                Submit Contributor
            </button>
        </form>
    );
};

export default SubmitContributor;
