import React from 'react';
import Forecast from '../components/Forecast';
import WeatherDashboard from '../components/WeatherDashboard';
import Advice from '../components/SmartFarmingAdvice';

const Home = () => {
  return (
    <div className="grid gap-4">
      <Forecast />
      <WeatherDashboard />
      <Advice />
    </div>
  );
};

export default Home;
