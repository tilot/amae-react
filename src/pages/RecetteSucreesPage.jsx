import React, { useState, useEffect } from 'react';
import { recipeService } from '../services/api';
import { Link } from 'react-router-dom';
import './RecetteListCategorie.css';

const RecetteSucreesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes();
        const sucrees = data.filter(r => r.Id_Sucree_sale === 1);
        setRecipes(sucrees);
        setFiltered(sucrees);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des recettes sucrées');
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    let result = recipes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'name') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'time') {
      result = result.sort((a, b) => a.preparation_time - b.preparation_time);
    }
    setFiltered([...result]);
  }, [search, sort, recipes]);

  return (
    <div className="recette-categorie-container">
      <div className="recette-categorie-header">
        <span className="menu-icon"><i className="fas fa-bars"></i></span>
        <h2>Recettes Sucrées</h2>
        <span className="recette-categorie-count">{filtered.length} items</span>
      </div>
      <div className="recette-categorie-tools">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="recette-categorie-search"
        />
        <select value={sort} onChange={e => setSort(e.target.value)} className="recette-categorie-sort">
          <option value="">Trier par</option>
          <option value="name">Nom</option>
          <option value="time">Temps de préparation</option>
        </select>
      </div>
      {loading && <div className="loading">Chargement...</div>}
      {error && <div className="error">{error}</div>}
      <div className="recette-categorie-list">
        {filtered.map(recipe => (
          <div className="recette-categorie-item" key={recipe.Id_Recette}>
            <img src={recipe.picture || '/default-recipe.jpg'} alt={recipe.name} className="recette-categorie-img" />
            <div className="recette-categorie-info">
              <h3>{recipe.name}</h3>
              <div className="recette-categorie-meta">
                <span><i className="fas fa-clock"></i> {recipe.preparation_time} min</span>
              </div>
              <Link to={`/recette/${recipe.Id_Recette}`} className="recette-categorie-link">Ajouter à mes courses</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetteSucreesPage; 