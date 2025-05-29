import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Configuration d'axios avec l'URL de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Service pour les recettes
export const recipeService = {
  // Récupérer toutes les recettes
  getAllRecipes: async () => {
    try {
      const response = await api.get('/recipes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
      throw error;
    }
  },

  // Récupérer une recette par son ID
  getRecipeById: async (id) => {
    try {
      const response = await api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette:', error);
      throw error;
    }
  },

  // Créer une nouvelle recette
  createRecipe: async (recipeData) => {
    try {
      const response = await api.post('/recipes', recipeData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la recette:', error);
      throw error;
    }
  },

  // Mettre à jour une recette
  updateRecipe: async (id, recipeData) => {
    try {
      const response = await api.put(`/recipes/${id}`, recipeData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette:', error);
      throw error;
    }
  },

  // Supprimer une recette
  deleteRecipe: async (id) => {
    try {
      const response = await api.delete(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
      throw error;
    }
  }
};

// Service pour les activités
export const activityService = {
  // Récupérer toutes les activités
  getAllActivities: async () => {
    try {
      const response = await api.get('/activity');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des activités:', error);
      throw error;
    }
  },

  // Récupérer uniquement les activités d'intérieur
  getInsideActivities: async () => {
    try {
      const response = await api.get('/activity');
      return response.data.filter(a => a.Id_Inside_Outside === 1);
    } catch (error) {
      console.error('Erreur lors de la récupération des activités intérieures:', error);
      throw error;
    }
  },

  // Récupérer uniquement les activités d'extérieur
  getOutsideActivities: async () => {
    try {
      const response = await api.get('/activity');
      return response.data.filter(a => a.Id_Inside_Outside === 2);
    } catch (error) {
      console.error('Erreur lors de la récupération des activités extérieures:', error);
      throw error;
    }
  },

  // Récupérer une activité par son ID
  getActivityById: async (id) => {
    try {
      const response = await api.get(`/activities/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  },

  // Créer une nouvelle activité
  createActivity: async (activityData) => {
    try {
      const response = await api.post('/activities', activityData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  },

  // Mettre à jour une activité
  updateActivity: async (id, activityData) => {
    try {
      const response = await api.put(`/activities/${id}`, activityData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  },

  // Supprimer une activité
  deleteActivity: async (id) => {
    try {
      const response = await api.delete(`/activities/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  }
}; 