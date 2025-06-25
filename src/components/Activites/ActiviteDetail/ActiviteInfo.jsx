import React from 'react';
import activite_int from '../../../assets/images/activite_int.jpg';
import activite_ext from '../../../assets/images/activite_ext.jpg';
import activite_image from '../../../assets/images/activite_image.webp';

const ActiviteInfo = ({ activite }) => {
    return (
        <div className="activite-info">
            <h2>{activite.name}</h2>
            <div className="activite-details">
                <div className="activite-metadata">
                    <p><strong>Début :</strong> {activite.start_date}</p>
                    <p><strong>Fin :</strong> {activite.end_date}</p>
                    <p><strong>Lieu :</strong> {activite.place}</p>
                    <img src={activite_image} alt={activite.name} className="activite-detail-img" />

                </div>
            </div>
        </div>
    );
};

export default ActiviteInfo; 