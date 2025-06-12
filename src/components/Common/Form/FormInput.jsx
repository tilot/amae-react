import React from 'react';
import './FormInput.css';

/**
 * Composant FormInput - Un champ de saisie personnalisable avec support pour les icônes et la gestion des erreurs
 * 
 * @param {string} type - Type du champ (text, email, password, etc.)
 * @param {string} name - Nom unique du champ
 * @param {string} label - Texte du label
 * @param {string} value - Valeur du champ
 * @param {function} onChange - Fonction appelée lors de la modification de la valeur
 * @param {string} placeholder - Texte d'exemple dans le champ
 * @param {boolean} required - Indique si le champ est obligatoire
 * @param {string} error - Message d'erreur à afficher
 * @param {string} icon - Classe FontAwesome de l'icône à afficher
 * @param {string} className - Classes CSS supplémentaires
 */
const FormInput = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon,
  className = ''
}) => {
  return (
    // Conteneur principal du champ avec gestion des classes conditionnelles
    <div className={`form-input-container ${className}`}>
      {/* Affichage du label si fourni */}
      {label && (
        <label htmlFor={name} className="form-input-label">
          {label}
          {/* Indicateur visuel pour les champs obligatoires */}
          {required && <span className="required">*</span>}
        </label>
      )}
      {/* Wrapper pour gérer le positionnement de l'icône */}
      <div className="form-input-wrapper">
        {/* Affichage de l'icône si fournie */}
        {icon && <i className={`fas ${icon} form-input-icon`}></i>}
        {/* Champ de saisie avec gestion des états (erreur, icône) */}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`form-input ${icon ? 'with-icon' : ''} ${error ? 'error' : ''}`}
        />
      </div>
      {/* Affichage du message d'erreur si présent */}
      {error && <span className="form-input-error">{error}</span>}
    </div>
  );
};

export default FormInput; 