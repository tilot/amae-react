// Composant principal pour l'affichage des détails des recettes d'une catégorie
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipeService } from '../../../services/api';
import './RecetteDetail.css';
import image_sucre from '../../../assets/images/recette_sucre.jpg';
import image_sale from '../../../assets/images/recette_sale.jpg';
import Footer_Fin from '../../Footer/Footer_Fin';
import Footer_Pub from '../../Footer/Footer_Pub';

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
      } catch {
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

  // Choix de l'image selon la catégorie
  const recetteImage = recipe.Id_Sucree_sale == '1' ? image_sucre : image_sale;

  return (
    <div className="recette-detail">
      <div className="recipe-header">
        <div className="recipe-image">
          <img 
            src={recetteImage} 
            className="recette-detail-img" 
            alt={recipe.name}
          />
        </div>
        <h1 className="recipe-title">{recipe.name}</h1>
        <div className="recipe-meta">
          <span className="recipe-time">
            <i className="fas fa-clock"></i> {recipe.preparation_time} minutes
          </span>
          <span className="recipe-date">
            <i className="fas fa-calendar"></i> {new Date(recipe.creation_date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="recipe-content">
        <section className="recipe-section">
          <h2>Ingrédients</h2>
          <div className="ingredients-list">
            {recipe.ingredient.split(',').map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <i className="fas fa-check"></i>
                <span>{ingredient.trim()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer_Fin/>
      <Footer_Pub/>
    </div>
  );
};

export default RecetteDetail;
