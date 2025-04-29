// authUtils.js

const API_URL = 'http://localhost:3000/api';

// Fonction utilitaire pour faire des requêtes authentifiées
export const authFetch = async (endpoint, options = {}) => {
  // Récupérer le token du localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Non authentifié');
  }
  
  // Créer des en-têtes par défaut avec le token
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };
  
  // Fusionner les options avec les en-têtes par défaut
  const config = {
    ...options,
    headers
  };
  
  // Faire la requête
  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  // Vérifier si le token est expiré (401 Unauthorized)
  if (response.status === 401) {
    // Nettoyer les données d'authentification
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Rediriger vers la page de connexion
    window.location.href = '/login';
    throw new Error('Session expirée');
  }
  
  return response;
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Convertit en booléen
};

// Récupérer les informations de l'utilisateur connecté
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return null;
  }
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Rediriger vers la page de connexion
  window.location.href = '/login';
};

// Exemple d'utilisation pour le profil utilisateur
export const getUserProfile = async () => {
  try {
    const response = await authFetch('/users/profile');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du profil');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Mettre à jour le profil utilisateur
export const updateUserProfile = async (userData) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Utilisateur non connecté');
  
  try {
    const response = await authFetch(`/users/${currentUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Changer le mot de passe
export const changePassword = async (currentPassword, newPassword) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Utilisateur non connecté');
  
  try {
    const response = await authFetch(`/users/${currentUser.id}/change-password`, {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors du changement de mot de passe');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};