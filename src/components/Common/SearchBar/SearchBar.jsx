import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Rechercher..." }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar; 