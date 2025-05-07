import React from 'react';
import ActiviteList from '../components/Activites/ActiviteVitrine/ActiviteList';

const ActiviteVitrinePage = () => {
    // Données de test - à remplacer par des données réelles
    const activites = [
        {
            id: 1,
            titre: "Randonnée en montagne",
            description: "Une belle randonnée dans les montagnes",
            date: "2024-04-15",
            lieu: "Montagne des Vosges"
        },
        // Ajoutez d'autres activités ici
    ];

    return (
        <div className="activite-vitrine">
            <h1>Nos Activités</h1>
            <ActiviteList activites={activites} />
        </div>
    );
};

export default ActiviteVitrinePage; 