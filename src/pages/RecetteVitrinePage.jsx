// Page vitrine des recettes, affichant les catégories Salé et Sucré
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecetteVitrinePage.css';

// Cette page sert de point d'entrée pour la vitrine des recettes
const RecetteVitrinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="recette-vitrine-container">
      <h1 className="recette-vitrine-title">Recettes</h1>
      <div className="recette-vitrine-cards">
        <div className="recette-vitrine-card" onClick={() => navigate('/recettes/salees')}>
          <img src="/images/salees.jpg" alt="Salées" className="recette-vitrine-img" />
          <span className="recette-vitrine-label">SALÉES</span>
        </div>
        <div className="recette-vitrine-card" onClick={() => navigate('/recettes/sucrees')}>
          <img src="/images/sucrees.jpg" alt="Sucrées" className="recette-vitrine-img" />
          <span className="recette-vitrine-label">SUCRÉES</span>
        </div>
      </div>
      <div className="recette-vitrine-footer">
        <button className="footer-icon"><i className="fas fa-home"></i></button>
        <button className="footer-icon"><i className="fas fa-utensils"></i></button>
        <button className="footer-icon"><i className="fas fa-user"></i></button>
      </div>
    </div>
  );
};

export default RecetteVitrinePage;
