import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({ mail: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Utiliser la bonne URL de l'API
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'  // Pour gérer les cookies si nécessaire
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Connexion réussie !');
        
        // Stocker le token JWT dans le localStorage ou sessionStorage
        localStorage.setItem('token', data.token);
        
        // Stocker les infos utilisateur
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Rediriger l'utilisateur (optionnel)
        // window.location.href = '/dashboard';
        
        // Ou informer un composant parent avec un callback (optionnel)
        // if (props.onLoginSuccess) props.onLoginSuccess(data);
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
      
      <div>
        <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="mail"
          name="mail"
          placeholder="Votre email"
          value={formData.mail}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Votre mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Connexion en cours...' : 'Se connecter'}
      </button>
      
      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}
    </form>
  );
}

export default LoginForm;