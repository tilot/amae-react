import React from 'react';
import { Link } from 'react-router-dom';
import './RecetteVitrine.css';

const RecetteVitrine = () => {
  return (
    <div className="recette-vitrine">
      <h1 className="recette-title">RECETTES</h1>
      
      <div className="recette-categories">
        <Link to="/recettes/sale" className="category-card">
          <div className="category-image sale-image">
            <span className="category-text">Salé</span>
          </div>
        </Link>

        <Link to="/recettes/sucre" className="category-card">
          <div className="category-image sucre-image">
            <span className="category-text">Sucré</span>
          </div>
        </Link>
      </div>

      <div className="navigation-icons">
        <button className="nav-icon">
          <img src="/icons/calendar.svg" alt="Calendrier" />
        </button>
        <button className="nav-icon">
          <img src="/icons/chef.svg" alt="Chef" />
        </button>
        <button className="nav-icon">
          <img src="/icons/utensils.svg" alt="Ustensiles" />
        </button>
        <button className="nav-icon">
          <img src="/icons/leaf.svg" alt="Bio" />
        </button>
        <button className="nav-icon">
          <img src="/icons/menu.svg" alt="Menu" />
        </button>
      </div>

      <div className="pub-banner">
        <p>PUB</p>
      </div>
    </div>
  );
};

export default RecetteVitrine; 