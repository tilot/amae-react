import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-container">
          <img src="/logo.png" alt="AMAE Logo" className="home-logo" />
        </div>
        
        <div className="buttons-container">
          <Link to="/login" className="home-button login-button">
            Connexion
          </Link>
          <Link to="/register" className="home-button register-button">
            Inscription
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 