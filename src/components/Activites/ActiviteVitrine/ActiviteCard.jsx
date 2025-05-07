import React from 'react';
import { Link } from 'react-router-dom';

const ActiviteCard = ({ activite }) => {
    return (
        <div className="activite-card">
            <Link to={`/activitedetail/${activite.id}`}>
                <div className="activite-card-content">
                    <h3>{activite.titre}</h3>
                    <p>{activite.description}</p>
                    <div className="activite-card-info">
                        <span>Date: {activite.date}</span>
                        <span>Lieu: {activite.lieu}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ActiviteCard; 