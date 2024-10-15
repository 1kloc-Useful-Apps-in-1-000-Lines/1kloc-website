import React, { useEffect, useState } from 'react';
import ContributorCard from './ContributorCard';
import { db } from '../firebase/firebaseConfig'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

const ContributorList = () => {
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        const fetchContributors = async () => {
            const querySnapshot = await getDocs(collection(db, 'contributors'));
            const contributorsData = querySnapshot.docs.map(doc => doc.data());
            setContributors(contributorsData);
        };

        fetchContributors();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {contributors.map((contributor, index) => (
                <ContributorCard key={index} {...contributor} />
            ))}
        </div>
    );
};

export default ContributorList;
