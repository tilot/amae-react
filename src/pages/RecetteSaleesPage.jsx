import React, { useState, useEffect } from 'react';
import { recipeService } from '../services/api';
import { Link } from 'react-router-dom';
import './RecetteListCategorie.css';

const RecetteSaleesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes();
        // Filtrer avec Id_Sucree_Sale === 2 pour salé
        const salees = data.filter(r => r.Id_Sucree_Sale === 2);
        setRecipes(salees);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des recettes salées');
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="recette-categorie-container">
      <div className="recette-categorie-header">
        <span className="menu-icon"><i className="fas fa-bars"></i></span>
        <h2>Recettes Salées</h2>
        <span className="recette-categorie-count">{recipes.length} items</span>
      </div>
      {loading && <div className="loading">Chargement...</div>}
      {error && <div className="error">{error}</div>}
      <div className="recette-categorie-list">
        {recipes.map(recipe => (
          <div className="recette-categorie-item" key={recipe.id}>
            <img src={recipe.image_url || '/default-recipe.jpg'} alt={recipe.title} className="recette-categorie-img" />
            <div className="recette-categorie-info">
              <h3>{recipe.title}</h3>
              <div className="recette-categorie-meta">
                <span><i className="fas fa-clock"></i> {recipe.preparation_time} min</span>
              </div>
              <Link to={`/recette/${recipe.id}`} className="recette-categorie-link">Ajouter à mes courses</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetteSaleesPage; 