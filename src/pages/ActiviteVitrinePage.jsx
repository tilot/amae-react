import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActiviteVitrinePage.css';

const ActiviteVitrinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="activite-vitrine-container">
      <h1 className="activite-vitrine-title">Activités</h1>
      <div className="activite-vitrine-cards">
        <div className="activite-vitrine-card" onClick={() => navigate('/activites/interieur')}>
          <img src="/images/interieur.jpg" alt="Intérieur" className="activite-vitrine-img" />
          <span className="activite-vitrine-label">INTÉRIEUR</span>
        </div>
        <div className="activite-vitrine-card" onClick={() => navigate('/activites/exterieur')}>
          <img src="/images/exterieur.jpg" alt="Extérieur" className="activite-vitrine-img" />
          <span className="activite-vitrine-label">EXTÉRIEUR</span>
        </div>
      </div>
      <div className="activite-vitrine-footer">
        <button className="footer-icon"><i className="fas fa-home"></i></button>
        <button className="footer-icon"><i className="fas fa-running"></i></button>
        <button className="footer-icon"><i className="fas fa-user"></i></button>
      </div>
    </div>
  );
};

export default ActiviteVitrinePage; 