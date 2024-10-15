import React, { useEffect, useState } from 'react';
import ContributorInfoCard from '../components/ContributorInfoCard';
import { db } from '../firebase/firebaseConfig'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

const Contributors = () => {
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        const fetchContributorsInfo = async () => {
            const querySnapshot = await getDocs(collection(db, 'contributorsInfo'));
            const contributorsData = querySnapshot.docs.map(doc => doc.data());
            setContributors(contributorsData);
        };

        fetchContributorsInfo();
    }, []);

    return (
        <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors duration-300">
            <div className="container mx-auto max-w-screen-lg p-8">
                <h1 className="text-4xl font-bold mb-10 text-center text-primary dark:text-white">
                    Meet the Contributors
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {contributors.map((contributor, index) => (
                        <ContributorInfoCard key={index} {...contributor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contributors;
