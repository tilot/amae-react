import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import recetteIcon from '../../assets/images/icon/recette.svg';
import activiteIcon from '../../assets/images/icon/activite.svg';
import compteIcon from '../../assets/images/icon/compte.svg';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link to="/recettes" className="nav-item">
          <img src={recetteIcon} alt="Recettes" className="nav-icon" />
          <span>Recettes</span>
        </Link>
        
        <Link to="/activites" className="nav-item">
          <img src={activiteIcon} alt="Activités" className="nav-icon" />
          <span>Activités</span>
        </Link>

        <Link to="/mon-compte" className="nav-item">
          <img src={compteIcon} alt="Mon compte" className="nav-icon" />
          <span>Mon compte</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar; 