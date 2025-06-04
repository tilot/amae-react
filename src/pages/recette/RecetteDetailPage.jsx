// Page de détails des recettes, affichant la liste des recettes d'une catégorie
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecetteDetail from '../../components/Recettes/RecetteDetail/RecetteDetail';
import Footer_Fin from '../../components/Footer/Footer_Fin';
import { recipeService } from '../../services/api';
import './RecetteDetailPage.css';

// Cette page sert de point d'entrée pour l'affichage détaillé des recettes
const RecetteDetailPage = () => {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecette = async () => {
      try {
        const data = await recipeService.getRecipeById(id);
        setRecette(data);
        setLoading(false);
      } catch {
        setError("Erreur lors du chargement de la recette");
        setLoading(false);
      }
    };
    fetchRecette();
  }, [id]);

  if (loading) return <div className="loading">Chargement de la recette...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recette) return null;

  return (
    <div className="recette-detail-page">
      <RecetteDetail recette={recette} />
      <Footer_Fin />
    </div>
  );
};

export default RecetteDetailPage;
