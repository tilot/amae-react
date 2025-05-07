import React from 'react';
import ActiviteCard from './ActiviteCard';

const ActiviteList = ({ activites }) => {
    return (
        <div className="activites-list">
            {activites.map((activite) => (
                <ActiviteCard key={activite.id} activite={activite} />
            ))}
        </div>
    );
};

export default ActiviteList; 