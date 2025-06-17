import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link to="/recettes" className="nav-item">
          <span>Recettes</span>
        </Link>
        
        <Link to="/activites" className="nav-item">
          <span>Activités</span>
        </Link>

        <Link to="/mon-compte" className="nav-item">
          <span>Mon compte</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar; 