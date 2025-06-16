import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/api';
import './LoginForm.css';
import logoAmae from '../../assets/images/logo-amae.png';

function LoginForm({ onLoginSuccess }) {
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
      const response = await authService.login(formData);
      
      if (response.token) {
        setSuccess('Connexion réussie !');
        setShowPopup(true);
        
        setTimeout(() => {
          setShowPopup(false);
          onLoginSuccess();
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
    <div className="login-form-container">
      <img src={logoAmae} alt="Logo AMAE" className="amae-logo" />
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          id="mail"
          name="mail"
          placeholder="Email"
          value={formData.mail}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
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
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
        {error && <p className="login-error">{error}</p>}
        {success && <p className="login-success">{success}</p>}
        <div className="register-link">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </div>
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