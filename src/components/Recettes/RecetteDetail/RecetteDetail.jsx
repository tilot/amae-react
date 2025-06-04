// Composant principal pour l'affichage des détails des recettes d'une catégorie
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipeService } from '../../../services/api';
import './RecetteDetail.css';
import recette_image from '../../../assets/images/recette_image.jpg';

const RecetteDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getRecipeById(id);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors du chargement de la recette');
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement de la recette...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!recipe) {
    return <div className="error">Recette non trouvée</div>;
  }

  return (
    <div className="recette-detail amae-bg">
      <div className="recipe-header">
        <div className="recipe-image">
          <img src={recette_image} alt={recipe.title} />
        </div>
        <h1 className="recipe-title">{recipe.name}</h1>
        <div className="recipe-meta">
          <span className="recipe-time">
            <i className="fas fa-clock"></i> {recipe.preparation_time}
          </span>
          {/* <span className="recipe-difficulty">
            <i className="fas fa-signal"></i> {recipe.difficulty}
          </span> */}
          {/* <span className="recipe-servings">
            <i className="fas fa-users"></i> {recipe.servings} pers.
          </span> */}
        </div>
      </div>
      <div className='receipe-name'>
        <h1>{recipe.name}</h1>
      </div>

      {/* <div className="recipe-content">
        <section className="recipe-section">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </section>

        <section className="recipe-section">
          <p>
            {recipe.ingredients}
          </p>
        </section>

        <section className="recipe-section">
          <h2>Préparation</h2>
          <ol className="steps-list">
            {recipe.steps.map((step, index) => (
              <li key={index}>
                <span className="step-number">{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {recipe.tips && (
          <section className="recipe-section">
            <h2>Astuces</h2>
            <ul className="tips-list">
              {recipe.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>
        )}
      </div> */}
    </div>
  );
};

export default RecetteDetail;
