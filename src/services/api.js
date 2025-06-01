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
      const response = await api.get(`/activity/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  },

  // Créer une nouvelle activité
  createActivity: async (activityData) => {
    try {
      const response = await api.post('/activity', activityData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  },

  // Mettre à jour une activité
  updateActivity: async (id, activityData) => {
    try {
      const response = await api.put(`/activity/${id}`, activityData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  },

  // Supprimer une activité
  deleteActivity: async (id) => {
    try {
      const response = await api.delete(`/activity/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'activité:`, error);
      throw error;
    }
  }
};

// Service pour les moodboards
export const moodboardService = {
  // Récupérer tous les moodboards
  getAllMoodboards: async () => {
    try {
      const response = await api.get('/moodboards');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des moodboards:', error);
      throw error;
    }
  },

  // Récupérer un moodboard par son ID
  getMoodboardById: async (id) => {
    try {
      const response = await api.get(`/moodboards/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du moodboard:', error);
      throw error;
    }
  },

  // Créer un nouveau moodboard
  createMoodboard: async (moodboardData) => {
    try {
      const response = await api.post('/moodboards', moodboardData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du moodboard:', error);
      throw error;
    }
  },

  // Mettre à jour un moodboard
  updateMoodboard: async (id, moodboardData) => {
    try {
      const response = await api.put(`/moodboards/${id}`, moodboardData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du moodboard:', error);
      throw error;
    }
  },

  // Supprimer un moodboard
  deleteMoodboard: async (id) => {
    try {
      const response = await api.delete(`/moodboards/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du moodboard:', error);
      throw error;
    }
  }
};

// Service pour les smart deals
export const smartDealService = {
  // Récupérer tous les smart deals
  getAllSmartDeals: async () => {
    try {
      const response = await api.get('/smart_deals');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des smart deals:', error);
      throw error;
    }
  },

  // Récupérer un smart deal par son ID
  getSmartDealById: async (id) => {
    try {
      const response = await api.get(`/smart_deals/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du smart deal:', error);
      throw error;
    }
  },

  // Créer un nouveau smart deal
  createSmartDeal: async (smartDealData) => {
    try {
      const response = await api.post('/smart_deals', smartDealData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du smart deal:', error);
      throw error;
    }
  },

  // Mettre à jour un smart deal
  updateSmartDeal: async (id, smartDealData) => {
    try {
      const response = await api.put(`/smart_deals/${id}`, smartDealData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du smart deal:', error);
      throw error;
    }
  },

  // Supprimer un smart deal
  deleteSmartDeal: async (id) => {
    try {
      const response = await api.delete(`/smart_deals/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du smart deal:', error);
      throw error;
    }
  }
};

// Service pour l'authentification
export const authService = {
  // Inscription
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },

  // Connexion
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
  },

  // Vérification du token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      throw error;
    }
  },

  // Récupération du profil utilisateur
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  },

  // Modification du profil
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la modification du profil:', error);
      throw error;
    }
  },

  // Changement de mot de passe
  changePassword: async (passwordData) => {
    try {
      const response = await api.post('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      throw error;
    }
  }
}; 