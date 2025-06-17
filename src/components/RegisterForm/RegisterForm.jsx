import React, { useState } from 'react';
import './RegisterForm.css';
import logoAmae from '../../assets/images/logo-amae.png';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    children_number: '',
    situation: '',
    job: '',
    children_age: '',
    children_firstname: '',
    phone_numbers: '',
    mail: '',
    password: '',
    confirmPassword: '',
    adress: '',
    acceptCGU: false,
    newsletter: false,
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.acceptCGU) {
      setError('Vous devez accepter les CGU');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setError('Veuillez entrer une adresse email valide');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return;
    setLoading(true);
    const dataToSend = { 
      ...formData,
      profil_pictures: null,
      birthdates: null,
      hobbies: null,
      Id_Calendrier: 1,
      Id_CSP: 1
    };
    delete dataToSend.confirmPassword;
    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        setFormData({
          name: '',
          firstname: '',
          children_number: '',
          situation: '',
          job: '',
          children_age: '',
          children_firstname: '',
          phone_numbers: '',
          mail: '',
          password: '',
          confirmPassword: '',
          adress: '',
          acceptCGU: false,
          newsletter: false,
        });
      } else {
        setError(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <img src={logoAmae} alt="Logo AMAE" className="amae-logo" />
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} className="register-input" required />
        <input type="text" name="firstname" placeholder="Prénom" value={formData.firstname} onChange={handleChange} className="register-input" required />
        <select name="children_number" value={formData.children_number} onChange={handleChange} className="register-input" required>
          <option value="">Nombre(s) d'enfant(s)</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5+">5 ou plus</option>
        </select>
        <select name="situation" value={formData.situation} onChange={handleChange} className="register-input" required>
          <option value="">Situation</option>
          <option value="parent">Parent</option>
          <option value="tuteur">Tuteur</option>
          <option value="autre">Autre</option>
        </select>
        <input type="text" name="job" placeholder="Profession" value={formData.job} onChange={handleChange} className="register-input" />
        <input type="text" name="children_age" placeholder="Âge enfant(s)" value={formData.children_age} onChange={handleChange} className="register-input" />
        <input type="text" name="children_firstname" placeholder="Prénom(s) enfant(s)" value={formData.children_firstname} onChange={handleChange} className="register-input" />
        <input type="tel" name="phone_numbers" placeholder="Numéro de portable" value={formData.phone_numbers} onChange={handleChange} className="register-input" />
        <input type="email" name="mail" placeholder="Adresse mail" value={formData.mail} onChange={handleChange} className="register-input" required />
        <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} className="register-input" required />
        <input type="password" name="confirmPassword" placeholder="Confirmation du mdp" value={formData.confirmPassword} onChange={handleChange} className="register-input" required />
        <input type="text" name="adress" placeholder="Adresse postale" value={formData.adress} onChange={handleChange} className="register-input" />
        <div className="register-checkboxes">
          <label className="checkbox-label">
            <input type="checkbox" name="acceptCGU" checked={formData.acceptCGU} onChange={handleChange} required />
            J'accepte les CGU
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
            Je souhaite recevoir les newsletters
          </label>
        </div>
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? 'Inscription en cours...' : 'S\'INSCRIRE'}
        </button>
        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;