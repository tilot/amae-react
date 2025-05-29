import React from 'react';

const ActiviteInfo = ({ activite }) => {
    return (
        <div className="activite-info">
            <h2>{activite.name}</h2>
            <div className="activite-details">
                
                <div className="activite-metadata">
                    <p><strong>Date:</strong> {activite.startdate}</p>
                    <p><strong>Lieu:</strong> {activite.place}</p>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default ActiviteInfo; 