import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import './RegisterPage.css';
import Footer from '../components/Footer/Footer_Gros';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    mail: '',
    password: '',
    confirmPassword: '',
    phone_numbers: '',
    adress: '',
    birthdates: '',
    hobbies: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

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
      const userData = { ...formData };
      delete userData.confirmPassword;
      userData.Id_Calendrier = 1;
      userData.Id_CSP = 1;
      await authService.register(userData);
      setSuccess('Inscription réussie ! Redirection vers la connexion...');
      setTimeout(() => navigate('/'), 1500); // Redirection après 1,5s
    } catch {
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
        {success && <div className="success-message">{success}</div>}
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
            <label htmlFor="mail">Email</label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={formData.mail}
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
          Déjà un compte ? <Link to="/">Se connecter</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage; 