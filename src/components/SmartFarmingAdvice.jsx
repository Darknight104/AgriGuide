import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SmartFarmingAdvice = () => {
  const { translations } = useContext(AppContext);

  const advice = [
    { title: translations.perfectSowing, description: translations.weatherRecommendations },
    { title: translations.delaySowing, description: translations.monitorConditions },
    { title: translations.avoidSpraying, description: translations.prepareDrainage }
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">{translations.smartFarmingAdvice}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {advice.map((a, idx) => (
          <div key={idx} className="border p-3 rounded bg-gray-100 shadow-sm">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartFarmingAdvice;
