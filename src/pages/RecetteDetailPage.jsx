// Page de détails des recettes, affichant la liste des recettes d'une catégorie
import React from 'react';
import RecetteDetail from '../components/Recettes/RecetteDetail/RecetteDetail';

// Cette page sert de point d'entrée pour l'affichage détaillé des recettes
const RecetteDetailPage = () => {
  return (
    <div>
      {/* Affichage du composant détail */}
      <RecetteDetail />
    </div>
  );
};

export default RecetteDetailPage;
