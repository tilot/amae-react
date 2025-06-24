import React, { useState, useEffect } from 'react';
import { recipeService } from '../../services/api';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/Common/SearchBar/SearchBar';
import './RecetteListCategorie.css';

import image_sale from '../../assets/images/recette_sale.jpg';
import Footer_Fin from '../../components/Footer/Footer_Fin';
import Footer_Pub from '../../components/Footer/Footer_Pub';

const RecetteSaleesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes();
        const salees = data.filter(r => r.Id_Sucree_sale === 2);
        setRecipes(salees);
        setFiltered(salees);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des recettes salées');
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    let result = recipes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sort === 'name') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'time') {
      result = result.sort((a, b) => a.preparation_time - b.preparation_time);
    }
    setFiltered([...result]);
  }, [searchQuery, sort, recipes]);

  return (
    <div className="recette-categorie-container">
      <div className="recette-categorie-header">
        <span className="menu-icon"><i className="fas fa-bars"></i></span>
        <h2>Recettes Salées</h2>
        <span className="recette-categorie-count">{filtered.length} items</span>
      </div>
      <div className="recette-categorie-tools">
        <SearchBar 
          onSearch={setSearchQuery}
          placeholder="Rechercher une recette..."
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
            <img src={image_sale} alt={recipe.name} className="recette-categorie-img" />
            <div className="recette-categorie-info">
              <h3>{recipe.name}</h3>
              <div className="recette-categorie-meta">
                <span><i className="fas fa-clock"></i> {recipe.preparation_time} min</span>
              </div>
              <Link to={`/recette/${recipe.Id_Recette}`} className="recette-categorie-link">Voir la recette</Link>
            </div>
          </div>
        ))}
      </div>
      <Footer_Fin/>
      <Footer_Pub/>
    </div>
  );
};

export default RecetteSaleesPage; 