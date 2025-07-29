import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { location, setLocation, language, setLanguage, translations } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (inputValue.length > 2) {
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inputValue)}&count=5`)
        .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
        .then(data => setSuggestions(data.results || []))
        .catch(err => console.error('Location fetch error:', err));
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSelect = (lat, lon, name) => {
    setLocation({ latitude: lat, longitude: lon, name });
    setInputValue(name);
    setSuggestions([]);
  };

  return (
    <header className="bg-green-700 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-2">
      <div className="text-xl font-bold hover:text-green-300 transition">
        🌱 {translations.appName || 'Smart Agri-Weather'}
        <p className="text-sm font-normal">{translations.slogan}</p>
      </div>

      <nav className="flex gap-4 text-white">
        <Link to="/home" className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">{translations.home}</Link>
        <Link to="/my-crops" className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">{translations.myCrops}</Link>
        <Link to="/notifications" className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">{translations.notifications}</Link>
      </nav>

      <div className="relative w-full md:w-64">
        <input
          type="text"
          className="w-full p-2 rounded text-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={translations.locationPlaceholder || "Search location"}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white text-black w-full shadow rounded z-10 hover:shadow-lg">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(s.latitude, s.longitude, s.name)}
              >
                {s.name}, {s.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="flex gap-4 text-white">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          {translations.login}
        </Link>
        <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          {translations.signup}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
