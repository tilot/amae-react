import React from 'react';
import './FormSelect.css';

/**
 * Composant FormSelect - Un menu déroulant personnalisable avec support pour les icônes et la gestion des erreurs
 * 
 * @param {string} name - Nom unique du champ
 * @param {string} label - Texte du label
 * @param {string} value - Valeur sélectionnée
 * @param {function} onChange - Fonction appelée lors du changement de sélection
 * @param {Array} options - Liste des options disponibles [{value: string, label: string}]
 * @param {string} placeholder - Texte affiché quand aucune option n'est sélectionnée
 * @param {boolean} required - Indique si le champ est obligatoire
 * @param {string} error - Message d'erreur à afficher
 * @param {string} icon - Classe FontAwesome de l'icône à afficher
 * @param {string} className - Classes CSS supplémentaires
 */
const FormSelect = ({
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  error,
  icon,
  className = ''
}) => {
  return (
    // Conteneur principal du select avec gestion des classes conditionnelles
    <div className={`form-select-container ${className}`}>
      {/* Affichage du label si fourni */}
      {label && (
        <label htmlFor={name} className="form-select-label">
          {label}
          {/* Indicateur visuel pour les champs obligatoires */}
          {required && <span className="required">*</span>}
        </label>
      )}
      {/* Wrapper pour gérer le positionnement de l'icône */}
      <div className="form-select-wrapper">
        {/* Affichage de l'icône si fournie */}
        {icon && <i className={`fas ${icon} form-select-icon`}></i>}
        {/* Menu déroulant avec gestion des états (erreur, icône) */}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`form-select ${icon ? 'with-icon' : ''} ${error ? 'error' : ''}`}
        >
          {/* Option placeholder si fournie */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {/* Génération des options à partir du tableau fourni */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {/* Affichage du message d'erreur si présent */}
      {error && <span className="form-select-error">{error}</span>}
    </div>
  );
};

export default FormSelect; 