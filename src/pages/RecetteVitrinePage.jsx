// Page vitrine des recettes, affichant les catégories Salé et Sucré
import React from 'react';
import RecetteVitrine from '../components/Recettes/RecetteVitrine/RecetteVitrine';

// Cette page sert de point d'entrée pour la vitrine des recettes
const RecetteVitrinePage = () => {
  return (
    <div>
      {/* Affichage du composant vitrine */}
      <RecetteVitrine />
    </div>
  );
};

export default RecetteVitrinePage;
