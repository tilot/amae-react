import React from "react";
import "./Footer_Fin.css";
import calendrierIcon from "../../assets/images/icon/calendrier-lignes.svg";
import activiteIcon from "../../assets/images/icon/activite.svg";

const Footer_Fin = () => {
  return (
    <footer className="footer-fin">
      <div className="footer-icons">
        <img src={calendrierIcon} alt="Calendrier" className="footer-icon" />
        <img src={activiteIcon} alt="Activité" className="footer-icon" />
      </div>
    </footer>
  );
};

export default Footer_Fin;
