import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Forecast = () => {
  const { location, translations } = useContext(AppContext);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );
        const data = await response.json();
        setForecast(data.daily || []);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [location]);

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-xl font-semibold mb-4 text-green-700">
        {translations.forecast || '7-Day Forecast'}
      </h2>

      {loading ? (
        <p className="text-gray-600">{translations.loading || 'Loading...'}</p>
      ) : forecast.time ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.time.map((date, i) => (
            <motion.div
              key={i}
              className="p-4 rounded-lg shadow-sm text-center bg-green-50 hover:bg-green-100 transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <p className="font-medium text-sm text-gray-700 mb-1">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {forecast.temperature_2m_max[i]}°C / {forecast.temperature_2m_min[i]}°C
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {translations.weather}: {forecast.weathercode[i]}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">{translations.noData || 'No data available'}</p>
      )}
    </motion.div>
  );
};

export default Forecast;
