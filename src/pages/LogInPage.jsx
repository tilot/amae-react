import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Footer from '../components/Footer/Footer_Gros';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/calendrier');
  };

  return (
    <div className="login-box">
        <h1>Connexion</h1>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <Footer />
    </div>
      
    

  );
};

export default LoginPage;