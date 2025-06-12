import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import './LoginPage.css';
import Footer from '../components/Footer/Footer_Gros';
import FormInput from '../components/Common/Form/FormInput';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mail: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      
      if (response.token) {
        // Le token est déjà stocké dans le localStorage par le service d'authentification
        setSuccess('Connexion réussie !');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/calendrier');
        }, 1500);
      } else {
        setError('Erreur lors de la connexion : token manquant');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError(error.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Connexion</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="mail"
            label="Email"
            value={formData.mail}
            onChange={handleChange}
            required
            error={error}
            icon="fa-envelope"
          />
          <FormInput
            type="password"
            name="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            error={error}
            icon="fa-lock"
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        <div className="register-link">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </div>
      </div>
      <Footer />
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Connexion réussie !</h3>
            <p>Vous allez être redirigé...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;