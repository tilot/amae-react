// Composant principal pour l'affichage des détails des recettes d'une catégorie
import React from 'react';
// import { useParams } from 'react-router-dom'; // À décommenter si besoin de filtrer par catégorie
import './RecetteDetail.css';

const RecetteDetail = () => {
  // Pour filtrer selon la catégorie, utiliser :
  // const { category } = useParams();

  // Données temporaires pour les recettes (à remplacer par un fetch API plus tard)
  const recettes = [
    {
      id: 1,
      name: "Nom de recette",
      prepTime: "30 min",
      image: "/images/recette-placeholder.jpg"
    },
    {
      id: 2,
      name: "Nom de recette",
      prepTime: "45 min",
      image: "/images/recette-placeholder.jpg"
    },
    {
      id: 3,
      name: "Nom de recette",
      prepTime: "25 min",
      image: "/images/recette-placeholder.jpg"
    },
    {
      id: 4,
      name: "Nom de recette",
      prepTime: "60 min",
      image: "/images/recette-placeholder.jpg"
    }
  ];

  return (
    <div className="recette-detail">
      {/* Titre principal */}
      <h1 className="recette-title">RECETTES</h1>

      {/* Liste des recettes sous forme de cartes */}
      <div className="recettes-list">
        {recettes.map(recette => (
          <div key={recette.id} className="recette-card">
            {/* Image de la recette */}
            <div className="recette-image">
              <img src={recette.image} alt={recette.name} />
            </div>
            {/* Informations sur la recette */}
            <div className="recette-info">
              <h3>{recette.name}</h3>
              <p>Durée de préparation: {recette.prepTime}</p>
              <button className="add-to-cart">ajouter à mes courses</button>
            </div>
          </div>
        ))}
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

export default RecetteDetail;
