import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import './MonComptePage.css';

const MonComptePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    phone_numbers: '',
    adress: '',
    mail: '',
    birthdates: '',
    hobbies: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer l'ID de l'utilisateur depuis le localStorage ou le contexte
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('Utilisateur non connecté');
          setLoading(false);
          return;
        }

        const data = await userService.getUserById(userId);
        setUser(data);
        setFormData({
          name: data.name || '',
          firstname: data.firstname || '',
          phone_numbers: data.phone_numbers || '',
          adress: data.adress || '',
          mail: data.mail || '',
          birthdates: data.birthdates ? new Date(data.birthdates).toISOString().split('T')[0] : '',
          hobbies: data.hobbies || ''
        });
        setLoading(false);
      } catch (error) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const userId = localStorage.getItem('userId');
      await userService.updateUser(userId, formData);
      setSuccess('Profil mis à jour avec succès');
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mon-compte-container">
      <h1>Mon Compte</h1>
      
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="mon-compte-form">
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
          <label htmlFor="phone_numbers">Téléphone</label>
          <input
            type="tel"
            id="phone_numbers"
            name="phone_numbers"
            value={formData.phone_numbers}
            onChange={handleChange}
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
          <label htmlFor="birthdates">Date de naissance</label>
          <input
            type="date"
            id="birthdates"
            name="birthdates"
            value={formData.birthdates}
            onChange={handleChange}
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

        <button type="submit" className="submit-button">
          Mettre à jour mon profil
        </button>
      </form>
    </div>
  );
};

export default MonComptePage; 