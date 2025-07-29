import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const WeatherDashboard = () => {
  const { location, translations } = useContext(AppContext);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };
    fetchCurrentWeather();
  }, [location]);

  return (
    <motion.div
      className="bg-white p-5 rounded-xl shadow-lg mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-xl font-semibold mb-4 text-green-700">
        {translations.currentWeather || 'Current Weather'}
      </h2>

      {weather ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <motion.div
            className="p-4 bg-blue-50 rounded-lg shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm text-gray-600">{translations.temperature || 'Temperature'}</p>
            <p className="text-2xl font-bold text-blue-600">🌡️ {weather.temperature}°C</p>
          </motion.div>
          <motion.div
            className="p-4 bg-green-50 rounded-lg shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm text-gray-600">{translations.windSpeed || 'Wind Speed'}</p>
            <p className="text-2xl font-bold text-green-600">💨 {weather.windspeed} km/h</p>
          </motion.div>
          <motion.div
            className="p-4 bg-yellow-50 rounded-lg shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm text-gray-600">{translations.date || 'Date'}</p>
            <p className="text-xl font-semibold text-yellow-600">
              📅 {new Date(weather.time).toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </motion.div>
        </div>
      ) : (
        <p className="text-gray-500">{translations.noWeatherData || 'No weather data available'}</p>
      )}
    </motion.div>
  );
};

export default WeatherDashboard;
