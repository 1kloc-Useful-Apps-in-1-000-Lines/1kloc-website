import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SubmitContributor = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        liveLink: '',
        gitHubLink: '',
        image: '',
        docsLink: '', // New field
    });
    const [userProjects, setUserProjects] = useState([]);

    const fetchUserProjects = async () => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'contributors'),
            where('moniker', '==', currentUser.moniker)
        );
        const querySnapshot = await getDocs(q);
        const projects = querySnapshot.docs.map(doc => doc.data());
        setUserProjects(projects);
    };

    useEffect(() => {
        fetchUserProjects();
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const projectData = {
            ...formData,
            moniker: currentUser.moniker,
        };

        try {
            await addDoc(collection(db, 'contributors'), projectData);
            setFormData({
                title: '',
                description: '',
                liveLink: '',
                gitHubLink: '',
                image: '',
                docsLink: '', // Reset new field
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to submit project:', error);
        }
    };

    if (!currentUser) {
        return <div>Please log in to submit your project.</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-background transition-colors duration-300">
            <form
                onSubmit={handleSubmit}
                className="p-8 max-w-lg mx-auto shadow-lg rounded-md bg-white dark:bg-gray-900"
            >
                <h2 className="text-2xl font-semibold mb-6 dark:text-white">Submit Your Project</h2>

                <input
                    type="text"
                    placeholder="Enter project title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border p-2 mb-4"
                />
                <textarea
                    placeholder="Enter project description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border p-2 mb-4"
                    rows="4"
                />
                <input
                    type="url"
                    placeholder="Enter live link URL"
                    value={formData.liveLink}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                    className="w-full border p-2 mb-4"
                />
                <input
                    type="url"
                    placeholder="Enter GitHub link URL"
                    value={formData.gitHubLink}
                    onChange={(e) => setFormData({ ...formData, gitHubLink: e.target.value })}
                    className="w-full border p-2 mb-4"
                />
                <input
                    type="url"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full border p-2 mb-4"
                />
                <input
                    type="url"
                    placeholder="Enter documentation link URL"
                    value={formData.docsLink}
                    onChange={(e) => setFormData({ ...formData, docsLink: e.target.value })}
                    className="w-full border p-2 mb-4"
                />
                <button type="submit" className="w-full bg-primary text-white py-2 rounded-md">
                    Submit Project
                </button>
            </form>
        </div>
    );
};

export default SubmitContributor;
