import { useState } from 'react';
import './LoginForm.css';
import logoAmae from '../../assets/images/logo-amae.png';

function LoginForm() {
  const [formData, setFormData] = useState({ mail: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Connexion réussie !');
        setShowPopup(true);
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Fermer le popup après 2 secondes
        setTimeout(() => {
          setShowPopup(false);
          // Redirection vers la page d'accueil ou dashboard
          window.location.href = '/';
        }, 2000);
      } else {
        setError(data.message || 'Identifiants invalides');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src={logoAmae} alt="Logo AMAE" className="amae-logo" />
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          id="mail"
          name="mail"
          placeholder="Nom d'utilisateur ..."
          value={formData.mail}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe ..."
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button 
          type="submit" 
          className="login-btn"
          disabled={loading}
        >
          {loading ? 'Connexion en cours...' : 'Je m\'inscris'}
        </button>
        {error && <p className="login-error">{error}</p>}
        {success && <p className="login-success">{success}</p>}
      </form>
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
}

export default LoginForm;