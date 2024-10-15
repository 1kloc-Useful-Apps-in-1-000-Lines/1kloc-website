import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthProvider';
import ContributorCard from '../components/ContributorCard'; // Reuse the card component for displaying projects

const SubmitContributor = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        liveLink: '',
        gitHubLink: '',
        image: '',
    });
    const [userProjects, setUserProjects] = useState([]); // State to hold user's projects

    // Fetch the user's submitted projects
    const fetchUserProjects = async () => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'contributors'),
            where('moniker', '==', currentUser.moniker) // Get projects submitted by the current user
        );
        const querySnapshot = await getDocs(q);
        const projects = querySnapshot.docs.map((doc) => doc.data());
        setUserProjects(projects); // Set the projects into state
    };

    useEffect(() => {
        fetchUserProjects(); // Fetch projects when component mounts
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const projectData = {
            ...formData,
            moniker: currentUser.moniker, // Use current user's moniker
        };

        // Add new project to Firestore
        await addDoc(collection(db, 'contributors'), projectData);

        // Reset form
        setFormData({
            title: '',
            description: '',
            liveLink: '',
            gitHubLink: '',
            image: '',
        });

        // Fetch the updated list of projects
        fetchUserProjects();
    };

    if (!currentUser) {
        return <div>Please log in to submit your project.</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-background transition-colors duration-300">
            <form onSubmit={handleSubmit} className="p-8 max-w-lg mx-auto shadow-lg rounded-md bg-white dark:bg-gray-900 transition-colors duration-300">
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">Submit Your Project</h2>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Project Title</label>
                    <input
                        type="text"
                        placeholder="Enter project title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Description</label>
                    <textarea
                        placeholder="Enter project description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        rows="4"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Live Link</label>
                    <input
                        type="url"
                        placeholder="Enter live link URL"
                        value={formData.liveLink}
                        onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">GitHub Link</label>
                    <input
                        type="url"
                        placeholder="Enter GitHub link URL"
                        value={formData.gitHubLink}
                        onChange={(e) => setFormData({ ...formData, gitHubLink: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-primary dark:text-yellow-300">Image URL</label>
                    <input
                        type="url"
                        placeholder="Enter image URL"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <button type="submit" className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-secondary transition-colors">
                    Submit Project
                </button>
            </form>

            {/* Display list of submitted projects */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold dark:text-yellow-300 mb-4">Your Submitted Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {userProjects.length > 0 ? (
                        userProjects.map((project, index) => (
                            <ContributorCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                liveLink={project.liveLink}
                                gitHubLink={project.gitHubLink}
                                image={project.image}
                                moniker={project.moniker}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No projects submitted yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmitContributor;
