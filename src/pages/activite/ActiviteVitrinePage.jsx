import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActiviteVitrinePage.css';
import activite_int from '../../assets/images/activite_int.jpg';
import activite_ext from '../../assets/images/activite_ext.jpg';
import Footer_Gros from '../../components/Footer/Footer_Gros';

const ActiviteVitrinePage = () => {
  const navigate = useNavigate();

  return (
    <div className="activite-vitrine-container">
      <h1 className="activite-vitrine-title">Activités</h1>
      <div className="activite-vitrine-cards">
        <div className="activite-vitrine-card" onClick={() => navigate('/activites/interieur')}>
          <img src={activite_int} alt="Intérieur" className="activite-vitrine-img" />
          <span className="activite-vitrine-label">INTÉRIEUR</span>
        </div>
        <div className="activite-vitrine-card" onClick={() => navigate('/activites/exterieur')}>
          <img src={activite_ext} alt="Extérieur" className="activite-vitrine-img" />
          <span className="activite-vitrine-label">EXTÉRIEUR</span>
        </div>
      </div>
      <Footer_Gros/>
    </div>
  );
};

export default ActiviteVitrinePage; 