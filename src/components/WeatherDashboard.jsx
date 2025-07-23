import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

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
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">{translations.currentWeather}</h2>
      {weather ? (
        <div className="flex justify-between text-center">
          <div>
            <p className="font-semibold">{translations.temperature}</p>
            <p>{weather.temperature}°C</p>
          </div>
          <div>
            <p className="font-semibold">{translations.windSpeed}</p>
            <p>{weather.windspeed} km/h</p>
          </div>
          <div>
            <p className="font-semibold">{translations.time}</p>
            <p>{new Date(weather.time).toLocaleTimeString()}</p>
          </div>
        </div>
      ) : (
        <p>{translations.noWeatherData}</p>
      )}
    </div>
  );
};

export default WeatherDashboard;
