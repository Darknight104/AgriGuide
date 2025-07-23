import React, { createContext, useState, useEffect } from 'react';
import { translateText } from '../utils/translate';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: 9.9252, longitude: 77.4906, name: 'Theni, Tamil Nadu' });
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  const texts = {
    appName: 'Smart Agri-Weather', slogan: 'Weather-Based Farming Advisory',
    locationPlaceholder: 'Enter location (e.g., Theni, Tamil Nadu)',
    notifications: 'Notifications', smartFarmingAdvice: 'Smart Farming Advice',
    weatherRecommendations: 'Weather-based recommendations for your crops',
    loading: 'Loading weather data...', error: 'Error', perfectSowing: 'Perfect Sowing Conditions',
    delaySowing: 'Delay Sowing Due to Rain', prepareDrainage: 'Prepare Drainage',
    avoidSpraying: 'Avoid Pesticide Spraying', monitorConditions: 'Monitor Conditions',
    noLocation: 'No Location', weatherError: 'Weather Error', noWeatherData: 'No Weather Data',
    takeAction: 'Take Action', noAdvice: 'No advice available.', alertsNotifications: 'Alerts & Notifications',
    actionRequired: '2 Action Required', stayUpdated: 'Stay updated with weather-based farming alerts',
    markAsRead: 'Mark as Read', footerText: 'Smart Agri-Weather System - Empowering farmers with weather intelligence',
    forecast: '7-Day Forecast', temperature: 'Temperature', windSpeed: 'Wind Speed',
    currentWeather: 'Current Weather', weather: 'Weather', time: 'Time', noData: 'No data available',
    home: 'Home', myCrops: 'My Crops', login: 'Login', signup: 'Signup'
  };

  useEffect(() => {
    if (language === 'en') {
      setTranslations(texts);
    } else {
      (async () => {
        const entries = await Promise.all(
          Object.entries(texts).map(async ([key, txt]) => {
            const tr = await translateText(txt, language);
            return [key, tr];
          })
        );
        setTranslations(Object.fromEntries(entries));
      })();
    }
  }, [language]);

  return (
    <AppContext.Provider value={{ location, setLocation, language, setLanguage, translations }}>
      {children}
    </AppContext.Provider>
  );
};