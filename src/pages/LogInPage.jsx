import React, { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm.jsx';
import LoginButton from '../components/LoginButton/LoginButton.jsx';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Ici vous intégreriez votre logique d'authentification
      // Par exemple: await authService.login(credentials);
      console.log('Tentative de connexion avec:', credentials);
      
      // Simulation d'un délai d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection après connexion réussie
      // history.push('/dashboard'); // Si vous utilisez react-router
      console.log('Connexion réussie!');
    } catch (err) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
      console.error('Erreur de connexion:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Connexion</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <LoginForm 
          credentials={credentials}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
        >
          <LoginButton 
            isLoading={isLoading} 
            text="Se connecter" 
            loadingText="Connexion en cours..." 
          />
        </LoginForm>
        
        <div className="additional-options">
          <a href="/forgot-password">Mot de passe oublié?</a>
          <a href="/register">Créer un compte</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;