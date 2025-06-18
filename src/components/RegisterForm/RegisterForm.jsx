import React, { useState } from 'react';
import './RegisterForm.css';
import logoAmae from '../../assets/images/logo-amae.png';
import { authService } from '../../services/api';

function RegisterForm({ onRegisterSuccess }) {
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
    
    // Validation email avec regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setError('Veuillez entrer une adresse email valide (doit contenir @ et un domaine)');
      return false;
    }
    
    // Validation mot de passe avec regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, dont 1 minuscule, 1 majuscule et 1 caractère spécial');
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
    
    try {
      // Vérifier l'unicité de l'email avant l'inscription
      const emailCheck = await authService.checkEmailUniqueness(formData.mail);
      if (!emailCheck.isUnique) {
        setError('Cet email est déjà utilisé');
        setLoading(false);
        return;
      }
      
      const dataToSend = { 
        ...formData,
        profil_pictures: null,
        birthdates: null,
        hobbies: null,
        Id_Calendrier: 1,
        Id_CSP: 1
      };
      delete dataToSend.confirmPassword;
      
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Compte créé avec succès! Vous allez être redirigé...');
        setTimeout(() => {
          if (onRegisterSuccess) {
            onRegisterSuccess();
          }
        }, 1500);
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

        <select name="situation" value={formData.situation} onChange={handleChange} className="register-input" required>
          <option value="">Situation</option>
          <option value="parent">Parent</option>
          <option value="tuteur">Tuteur</option>
          <option value="autre">Autre</option>
        </select>
        <input type="text" name="job" placeholder="Profession" value={formData.job} onChange={handleChange} className="register-input" />

        <input type="tel" name="phone_numbers" placeholder="Numéro de portable" value={formData.phone_numbers} onChange={handleChange} className="register-input" />
        <input type="email" name="mail" placeholder="Adresse mail" value={formData.mail} onChange={handleChange} className="register-input" required />
        <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} className="register-input" required />
        <input type="password" name="confirmPassword" placeholder="Confirmation du mot de passe" value={formData.confirmPassword} onChange={handleChange} className="register-input" required />
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