import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActiviteVitrinePage.css';
import Footer_Fin from '../../components/Footer/Footer_Fin';
import activite_image from '../../assets/images/activite_image.webp';

const ActiviteVitrinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="activite-vitrine-container">
      <h1 className="activite-vitrine-title">Activités</h1>
      <div className="activite-vitrine-cards">
        <div className="activite-vitrine-card" onClick={() => navigate('/activites/interieur')}>
          <img src={activite_image} alt="Intérieur" className="activite-vitrine-img" />
          <span className="activite-vitrine-label">INTÉRIEUR</span>
        </div>
        <div className="activite-vitrine-card" onClick={() => navigate('/activites/exterieur')}>
          <img src={activite_image} alt="Extérieur" className="activite-vitrine-img" />
          <span className="activite-vitrine-label">EXTÉRIEUR</span>
        </div>
      </div>
      <div className="activite-vitrine-footer">
        <button className="footer-icon"><i className="fas fa-home"></i></button>
        <button className="footer-icon"><i className="fas fa-running"></i></button>
        <button className="footer-icon"><i className="fas fa-user"></i></button>
      </div>
      <Footer_Fin />
    </div>
  );
};

export default ActiviteVitrinePage; 