// Page vitrine des recettes, affichant les catégories Salé et Sucré
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecetteVitrinePage.css';

import Footer_Gros from '../../components/Footer/Footer_Gros';
import image_sucre from '../../assets/images/recette_sucre.jpg';
import image_sale from '../../assets/images/recette_sale.jpg';

// Cette page sert de point d'entrée pour la vitrine des recettes
const RecetteVitrinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="recette-vitrine-container">
      <h1 className="recette-vitrine-title">Recettes</h1>
      <div className="recette-vitrine-cards">
        <div className="recette-vitrine-card" onClick={() => navigate('/recettes/salees')}>
          <img src={image_sale} alt="Salées" className="recette-vitrine-img" />
          <span className="recette-vitrine-label">SALÉES</span>
        </div>
        <div className="recette-vitrine-card" onClick={() => navigate('/recettes/sucrees')}>
          <img src={image_sucre} alt="Sucrées" className="recette-vitrine-img" />
          <span className="recette-vitrine-label">SUCRÉES</span>
        </div>
      </div>
      <Footer_Gros/>
    </div>
  );
};

export default RecetteVitrinePage;
