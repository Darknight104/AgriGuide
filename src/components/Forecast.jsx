import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

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
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">{translations.forecast}</h2>
      {loading ? (
        <p>{translations.loading}</p>
      ) : forecast.time ? (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-center">
          {forecast.time.map((date, i) => (
            <div key={i} className="border rounded p-2 bg-gray-100">
              <p>{new Date(date).toLocaleDateString()}</p>
              <p>{forecast.temperature_2m_max[i]}°C / {forecast.temperature_2m_min[i]}°C</p>
              <p>{translations.weather}: {forecast.weathercode[i]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>{translations.noData}</p>
      )}
    </div>
  );
};

export default Forecast;
