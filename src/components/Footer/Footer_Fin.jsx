import React from "react";
import { Link } from "react-router-dom";
import "./Footer_Fin.css";
import calendrierIcon from "../../assets/images/icon/calendrier-lignes.svg";
import activiteIcon from "../../assets/images/icon/activite.svg";
import recetteIcon from "../../assets/images/icon/recette.svg";

const Footer_Fin = () => {
  return (
    <footer className="footer-fin">
      <div className="footer-icons">
        <Link to="/calendrier" className="footer-link">
          <img src={calendrierIcon} alt="Calendrier" className="footer-icon" />
          <span>Calendrier</span>
        </Link>
        <Link to="/activites" className="footer-link">
          <img src={activiteIcon} alt="Activité" className="footer-icon" />
          <span>Activités</span>
        </Link>
        <Link to="/recettes" className="footer-link">
          <img src={recetteIcon} alt="Recettes" className="footer-icon" />
          <span>Recettes</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer_Fin;
