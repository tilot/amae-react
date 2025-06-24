import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '../../../services/api';
import SearchBar from '../../Common/SearchBar/SearchBar';
import './RecetteList.css';
import image_sucre from '../../../assets/images/recette_sucre.jpg';
import image_sale from '../../../assets/images/recette_sale.jpg';

const RecetteList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'sale', 'sucre'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors du chargement des recettes');
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = filter === 'all' || recipe.category === filter;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="loading">Chargement des recettes...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="recette-list amae-bg">
      <h2 className="amae-title">Recettes</h2>
      <SearchBar 
        onSearch={setSearchQuery}
        placeholder="Rechercher une recette..."
      />
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
      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <div className="recipe-card amae-card" key={recipe.id}>
            <div className="recipe-image">
              <img src={recipe.category === 'sucre' ? image_sucre : image_sale} alt={recipe.name} />
            </div>
            <div className="recipe-info">
              <h3>{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta">
                <span className="recipe-time">
                  <i className="fas fa-clock"></i> {recipe.preparation_time} min
                </span>
                <span className="recipe-difficulty">
                  <i className="fas fa-signal"></i> {recipe.difficulty}
                </span>
              </div>
              <div className="recipe-details">
                <span className="recipe-servings">
                  <i className="fas fa-users"></i> {recipe.servings} pers.
                </span>
                <span className="recipe-category">
                  <i className="fas fa-tag"></i> {recipe.category}
                </span>
              </div>
              <Link to={`/recette/${recipe.id}`} className="amae-btn">
                Voir la recette
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetteList; 