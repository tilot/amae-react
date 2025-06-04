import React from 'react';
import { useParams } from 'react-router-dom';
import ActiviteInfo from '../../components/Activites/ActiviteDetail/ActiviteInfo';

const ActiviteDetailPage = () => {
    const { id } = useParams();

    // Données de test - à remplacer par des données réelles
    const activite = {
        id: id,
        titre: "Randonnée en montagne",
        description: "Une belle randonnée dans les montagnes avec vue panoramique",
        date: "2024-04-15",
        lieu: "Montagne des Vosges",
        nombreParticipants: 15,
        organisateur: "Club de Randonnée"
    };

    return (
        <div className="activite-detail">
            <ActiviteInfo activite={activite} />
        </div>
    );
};

export default ActiviteDetailPage; 