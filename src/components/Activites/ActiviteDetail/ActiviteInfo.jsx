import React from 'react';
import activite_int from '../../../assets/images/activite_int.jpg';
import activite_ext from '../../../assets/images/activite_ext.jpg';
import activite_image from '../../../assets/images/activite_image.webp';

// Fonction utilitaire pour formater la date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}h${minutes}`;
}

const ActiviteInfo = ({ activite }) => {
    let imageSrc = activite_image;
    if (activite.Id_Inside_Outside === 1) {
        imageSrc = activite_int;
    } else if (activite.Id_Inside_Outside === 2) {
        imageSrc = activite_ext;
    }
    return (
        <div className="activite-info">
            <h2>{activite.name}</h2>
            <div className="activite-details">
                <div className="activite-metadata">
                    <p><strong>Début :</strong> {formatDate(activite.start_date)}</p>
                    <p><strong>Fin :</strong> {formatDate(activite.end_date)}</p>
                    <p><strong>Lieu :</strong> {activite.place}</p>
                    <img src={imageSrc} alt={activite.name} className="activite-detail-img" />
                </div>
            </div>
        </div>
    );
};

export default ActiviteInfo; 