// Composant principal pour la vitrine des recettes (accès aux catégories Salé/Sucré)
import React from 'react';
import { Link } from 'react-router-dom';
import './RecetteVitrine.css';

const RecetteVitrine = () => {
  return (
    <div className="recette-vitrine">
      {/* Titre principal de la page */}
      <h1 className="recette-title">RECETTES</h1>
      
      {/* Bloc des catégories de recettes (Salé/Sucré) */}
      <div className="recette-categories">
        {/* Lien vers la catégorie Salé */}
        <Link to="/recettes/sale" className="category-card">
          <div className="category-image sale-image">
            <span className="category-text">Salé</span>
          </div>
        </Link>

        {/* Lien vers la catégorie Sucré */}
        <Link to="/recettes/sucre" className="category-card">
          <div className="category-image sucre-image">
            <span className="category-text">Sucré</span>
          </div>
        </Link>
      </div>

      {/* Icônes de navigation en bas de page */}
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

      {/* Bannière publicitaire en bas de page */}
      <div className="pub-banner">
        <p>PUB</p>
      </div>
    </div>
  );
};

export default RecetteVitrine; 