import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import './RegisterPage.css';
import Footer from '../components/Footer/Footer_Gros';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    // Redirection vers la page de connexion après inscription réussie
    navigate('/');
  };

  return (
    <div className="register-container">
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      <Footer />
    </div>
  );
};

export default RegisterPage; 