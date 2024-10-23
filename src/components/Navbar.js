import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav className="navbar">
      {/* Existing navbar items */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      
      {/* Language selector */}
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </nav>
  );
}

export default Navbar;
