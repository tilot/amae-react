// Composant principal pour la vitrine des recettes (accès aux catégories Salé/Sucré)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecetteVitrine.css';
import recette_image from '../../../assets/images/recette_image.jpg';

const RecetteVitrine = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'sale', 'sucre'

  return (
    <div className="recette-vitrine amae-bg">
      <h1 className="amae-title">RECETTES</h1>
      
      <div className="amae-tabs">
        <button 
          className={filter === 'all' ? 'amae-tab active' : 'amae-tab'} 
          onClick={() => setFilter('all')}
        >
          Toutes
        </button>
        <button 
          className={filter === 'sale' ? 'amae-tab active' : 'amae-tab'} 
          onClick={() => setFilter('sale')}
        >
          Salé
        </button>
        <button 
          className={filter === 'sucre' ? 'amae-tab active' : 'amae-tab'} 
          onClick={() => setFilter('sucre')}
        >
          Sucré
        </button>
      </div>

      <div className="recette-categories">
        <Link to="/recettes/sale" className="category-card amae-card">
          <div className="category-image sale-image">
            <img src={recette_image} alt="Recettes salées" />
            <span className="category-text">Salé</span>
          </div>
        </Link>

        <Link to="/recettes/sucre" className="category-card amae-card">
          <div className="category-image sucre-image">
            <img src={recette_image} alt="Recettes sucrées" />
            <span className="category-text">Sucré</span>
          </div>
        </Link>
      </div>

      {/* <div className="navigation-icons">
        <button className="nav-icon">
          <img src={recette_image} alt="Calendrier" />
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
      </div> */}
{/* 
      <div className="pub-banner">
        <p>PUB</p>
      </div> */}
    </div>
  );
};

export default RecetteVitrine; 