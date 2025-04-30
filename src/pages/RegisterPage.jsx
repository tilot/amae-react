import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm/RegisterForm.jsx';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Créer un compte</h1>
        <p className="register-subtitle">Rejoignez notre communauté et commencez à partager vos recettes</p>
        
        <RegisterForm />
        
        <div className="register-footer">
          <p>Vous avez déjà un compte ?</p>
          <Link to="/login" className="login-link">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 