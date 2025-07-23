import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { location, setLocation, language, setLanguage, translations } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(location?.name || '');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setInputValue(location?.name || '');
  }, [location]);

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
    setSuggestions([]);
  };

  return (
    <header className="bg-green-700 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-2">
      <div className="text-xl font-bold">
        🌱 {translations.appName || 'Smart Agri-Weather'}
        <p className="text-sm font-normal">{translations.slogan}</p>
      </div>

      <nav className="flex gap-4 text-white">
        <Link to="/" className="hover:underline">Start</Link>
        <Link to="/home" className="hover:underline">{translations.home}</Link>
        <Link to="/my-crops" className="hover:underline">{translations.myCrops}</Link>
        <Link to="/notifications" className="hover:underline">{translations.notifications}</Link>
        <Link to="/login" className="hover:underline">{translations.login}</Link>
        <Link to="/signup" className="hover:underline">{translations.signup}</Link>
      </nav>

      <div className="relative w-full md:w-64">
        <input
          type="text"
          className="w-full p-2 rounded text-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={translations.locationPlaceholder || 'Enter location'}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white text-black w-full shadow rounded z-10">
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

      <select
        className="ml-2 p-1 rounded text-black"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिन्दी</option>
      </select>
    </header>
  );
};

export default Header;
