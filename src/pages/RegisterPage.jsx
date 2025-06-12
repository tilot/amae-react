import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import './RegisterPage.css';
import Footer from '../components/Footer/Footer_Gros';
import FormInput from '../components/Common/Form/FormInput';
import FormSelect from '../components/Common/Form/FormSelect';

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
      setTimeout(() => navigate('/'), 1500);
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
          <FormInput
            type="text"
            name="name"
            label="Nom"
            value={formData.name}
            onChange={handleChange}
            required
            error={error}
            icon="fa-user"
          />
          <FormInput
            type="text"
            name="firstname"
            label="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            required
            error={error}
            icon="fa-user"
          />
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
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={error}
            icon="fa-lock"
          />
          <FormInput
            type="tel"
            name="phone_numbers"
            label="Téléphone"
            value={formData.phone_numbers}
            onChange={handleChange}
            required
            error={error}
            icon="fa-phone"
          />
          <FormInput
            type="text"
            name="adress"
            label="Adresse"
            value={formData.adress}
            onChange={handleChange}
            required
            error={error}
            icon="fa-home"
          />
          <FormInput
            type="date"
            name="birthdates"
            label="Date de naissance"
            value={formData.birthdates}
            onChange={handleChange}
            required
            error={error}
            icon="fa-calendar"
          />
          <FormInput
            type="textarea"
            name="hobbies"
            label="Centres d'intérêt"
            value={formData.hobbies}
            onChange={handleChange}
            error={error}
            icon="fa-heart"
          />
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