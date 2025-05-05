import { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    mail: '',
    password: '',
    confirmPassword: '',
    phone_numbers: '',
    adress: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    // Validation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setError('Veuillez entrer une adresse email valide');
      return false;
    }
    
    // Validation du mot de passe (force)
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
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Créer un objet avec les données à envoyer à l'API
    // Exclure confirmPassword car il n'est pas attendu par l'API
    const { confirmPassword, ...dataToSend } = formData;

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          firstname: '',
          mail: '',
          password: '',
          confirmPassword: '',
          phone_numbers: '',
          adress: '',
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Inscription</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="mail"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="phone_numbers" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
        <input
          type="tel"
          id="phone_numbers"
          name="phone_numbers"
          value={formData.phone_numbers}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="adress" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
        <input
          type="text"
          id="adress"
          name="adress"
          value={formData.adress}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
      </button>
      
      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}
    </form>
  );
}

export default RegisterForm;