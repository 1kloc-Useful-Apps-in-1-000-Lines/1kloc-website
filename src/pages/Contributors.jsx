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
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Meet the Contributors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {contributors.map((contributor, index) => (
                    <ContributorInfoCard key={index} {...contributor} />
                ))}
            </div>
        </div>
    );
};

export default Contributors;
