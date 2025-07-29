import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const SmartFarmingAdvice = () => {
  const { translations } = useContext(AppContext);

  const advice = [
    {
      icon: '🌱',
      title: translations.perfectSowing || 'Perfect Time to Sow',
      description: translations.weatherRecommendations || 'The weather is ideal for sowing. Go ahead with seeding.'
    },
    {
      icon: '⏳',
      title: translations.delaySowing || 'Delay Sowing',
      description: translations.monitorConditions || 'Uncertain weather. Monitor conditions before sowing.'
    },
    {
      icon: '🌧️',
      title: translations.avoidSpraying || 'Avoid Spraying',
      description: translations.prepareDrainage || 'Rain likely. Avoid spraying and ensure proper drainage.'
    }
  ];

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-green-700">
        {translations.smartFarmingAdvice || 'Smart Farming Advice'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {advice.map((a, idx) => (
          <motion.div
            key={idx}
            className="p-4 bg-green-50 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-3xl mb-2">{a.icon}</div>
            <h3 className="font-semibold text-green-800 text-md mb-1">{a.title}</h3>
            <p className="text-sm text-gray-700">{a.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SmartFarmingAdvice;
