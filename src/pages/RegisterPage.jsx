import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_numbers: '',
    adress: '',
    birthdates: '',
    hobbies: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    // Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      // Suppression du champ confirmPassword avant l'envoi
      const { confirmPassword, ...userData } = formData;
      await authService.register(userData);
      navigate('/login'); // Redirection vers la page de connexion après inscription
    } catch (err) {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Inscription</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_numbers">Téléphone</label>
            <input
              type="tel"
              id="phone_numbers"
              name="phone_numbers"
              value={formData.phone_numbers}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adress">Adresse</label>
            <input
              type="text"
              id="adress"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthdates">Date de naissance</label>
            <input
              type="date"
              id="birthdates"
              name="birthdates"
              value={formData.birthdates}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hobbies">Centres d'intérêt</label>
            <textarea
              id="hobbies"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>
        <div className="login-link">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 