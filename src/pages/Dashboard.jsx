import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthProvider';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import ContributorCard from '../components/ContributorCard';
import ContributorInfoCard from '../components/ContributorInfoCard';
import Modal from '../components/Modal';
import EditProjectForm from '../components/EditProjectForm';
import EditContributorInfoForm from '../components/EditContributorInfoForm';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [userProjects, setUserProjects] = useState([]);
    const [contributorInfo, setContributorInfo] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [editingInfo, setEditingInfo] = useState(false);

    useEffect(() => {
        if (currentUser) {
            fetchUserProjects();
            fetchContributorInfo();
        }
    }, [currentUser]);

    const fetchUserProjects = async () => {
        const q = query(
            collection(db, 'contributors'),
            where('moniker', '==', currentUser.moniker)
        );
        const querySnapshot = await getDocs(q);
        const projects = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserProjects(projects);
    };

    const fetchContributorInfo = async () => {
        const q = query(
            collection(db, 'contributorsInfo'),
            where('moniker', '==', currentUser.moniker)
        );
        const querySnapshot = await getDocs(q);
        const info = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
        setContributorInfo(info);
    };

    const handleDeleteInfo = async () => {
        if (!contributorInfo?.id) return;
        try {
            await deleteDoc(doc(db, 'contributorsInfo', contributorInfo.id));
            setContributorInfo(null);
        } catch (error) {
            console.error('Failed to delete contributor info:', error);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteDoc(doc(db, 'contributors', projectId));
            fetchUserProjects();
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleSaveProject = async (project) => {
        await updateDoc(doc(db, 'contributors', project.id), project);
        setEditingProject(null);
        fetchUserProjects();
    };

    const handleSaveInfo = async (info) => {
        await updateDoc(doc(db, 'contributorsInfo', info.id), info);
        setEditingInfo(false);
        fetchContributorInfo();
    };

    return (
        <div className="min-h-screen p-8 bg-white dark:bg-background transition-colors duration-300">
            <h1 className="text-3xl font-bold dark:text-white mb-8">
                Welcome, {currentUser?.moniker || 'OG!'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800">
                    <h2 className="text-xl font-semibold dark:text-yellow-300 mb-4">Submit Your Project</h2>
                    <Link to="/submit-contributor" className="bg-primary text-white py-2 px-4 rounded-md">
                        Submit Project
                    </Link>
                </div>

                {!contributorInfo && (
                    <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800">
                        <h2 className="text-xl font-semibold dark:text-yellow-300 mb-4">Submit Your Information</h2>
                        <Link to="/submit-contributor-info" className="bg-primary text-white py-2 px-4 rounded-md">
                            Submit Info
                        </Link>
                    </div>
                )}
            </div>




            {contributorInfo && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold dark:text-yellow-300 mb-4">Your Contributor Info</h3>
                    <div className="relative">
                        <ContributorInfoCard {...contributorInfo} />
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <button
                                onClick={() => setEditingInfo(true)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Edit Info
                            </button>
                            <button
                                onClick={handleDeleteInfo}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Delete Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <h3 className="text-xl font-semibold dark:text-yellow-300 mb-4">Your Submitted Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProjects.map((project) => (
                        <div key={project.id} className="relative">
                            <ContributorCard {...project} />
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button
                                    onClick={() => setEditingProject(project)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!editingProject} onClose={() => setEditingProject(null)}>
                <EditProjectForm
                    project={editingProject}
                    onSave={handleSaveProject}
                    onClose={() => setEditingProject(null)}
                />
            </Modal>

            <Modal isOpen={editingInfo} onClose={() => setEditingInfo(false)}>
                <EditContributorInfoForm
                    info={contributorInfo}
                    onSave={handleSaveInfo}
                    onClose={() => setEditingInfo(false)}
                />
            </Modal>
        </div>
    );
};

export default Dashboard;
