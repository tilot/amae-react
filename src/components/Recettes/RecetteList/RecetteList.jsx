import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '../../../services/api';
import './RecetteList.css';

const RecetteList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des recettes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des recettes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="recette-list">
      <h2>Nos Recettes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Link to={`/recette/${recipe.id}`} key={recipe.id} className="recipe-card">
            <div className="recipe-image">
              <img src={recipe.image_url || '/default-recipe.jpg'} alt={recipe.title} />
            </div>
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta">
                <span className="recipe-time">
                  <i className="fas fa-clock"></i> {recipe.preparation_time} min
                </span>
                <span className="recipe-difficulty">
                  <i className="fas fa-signal"></i> {recipe.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecetteList; 