import React from 'react';
import axios from 'axios';

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        // À adapter selon ce que ton API attend
        email: 'test@example.com',
        password: 'password123'
      });

      // Exemple : stocker le token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Connexion réussie !');
      window.location.href = '/calendrier';
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert('Erreur de connexion');
    }
  };

  return (
    <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow">
      Log in
    </button>
  );
};

export default LoginButton;
