// Page vitrine des recettes, affichant les catégories Salé et Sucré
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecetteVitrinePage.css';
import recette_image from '../../assets/images/recette_image.jpg';
import Footer_Gros from '../../components/Footer/Footer_Gros';

// Cette page sert de point d'entrée pour la vitrine des recettes
const RecetteVitrinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="recette-vitrine-container">
      <h1 className="recette-vitrine-title">Recettes</h1>
      <div className="recette-vitrine-cards">
        <div className="recette-vitrine-card" onClick={() => navigate('/recettes/salees')}>
          <img src={recette_image} alt="Salées" className="recette-vitrine-img" />
          <span className="recette-vitrine-label">SALÉES</span>
        </div>
        <div className="recette-vitrine-card" onClick={() => navigate('/recettes/sucrees')}>
          <img src={recette_image} alt="Sucrées" className="recette-vitrine-img" />
          <span className="recette-vitrine-label">SUCRÉES</span>
        </div>
      </div>
      <Footer_Gros/>
    </div>
  );
};

export default RecetteVitrinePage;
