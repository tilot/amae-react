import React from 'react';

const ActiviteInfo = ({ activite }) => {
    return (
        <div className="activite-info">
            <h2>{activite.titre}</h2>
            <div className="activite-details">
                <p className="description">{activite.description}</p>
                <div className="activite-metadata">
                    <p><strong>Date:</strong> {activite.date}</p>
                    <p><strong>Lieu:</strong> {activite.lieu}</p>
                    <p><strong>Nombre de participants:</strong> {activite.nombreParticipants}</p>
                    <p><strong>Organisateur:</strong> {activite.organisateur}</p>
                </div>
            </div>
        </div>
    );
};

export default ActiviteInfo; 