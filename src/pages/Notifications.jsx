import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const mockAPI = () =>
  Promise.resolve([
    {
      id: 1,
      type: 'Rain',
      title: 'Prepare Drainage',
      message: 'Heavy rain expected tomorrow. Prepare your fields.',
    },
    {
      id: 2,
      type: 'Humidity',
      title: 'Avoid Spraying',
      message: 'Humidity too high for effective spraying today.',
    },
    {
      id: 3,
      type: 'Temperature',
      title: 'Irrigation Alert',
      message: 'Hot weather incoming. Ensure adequate irrigation.',
    },
  ]);

const Notifications = () => {
  const { translations } = useContext(AppContext);
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    mockAPI().then(setAlerts);
  }, []);

  const handleDismiss = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const filterOptions = ['All', 'Rain', 'Humidity', 'Temperature'];
  const filteredAlerts =
    filter === 'All'
      ? alerts
      : alerts.filter((alert) => alert.type === filter);

  return (
    <div className="relative min-h-screen bg-gray-50 py-10 px-4">
      <motion.div
        className="relative z-10 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-800">
            {translations.alertsNotifications || 'Alerts & Notifications'}
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            {filterOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <AnimatePresence>
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              className="relative bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-3 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => handleDismiss(alert.id)}
                className="absolute top-2 right-2 text-yellow-700 hover:text-red-600"
              >
                <FiX size={18} />
              </button>
              <h3 className="font-semibold text-yellow-800">{alert.title}</h3>
              <p className="text-sm text-yellow-700 mt-1">{alert.message}</p>
              <span className="text-xs mt-2 inline-block px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded">
                {alert.type}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAlerts.length === 0 && (
          <p className="text-gray-500 text-center mt-8">
            No alerts available for this filter.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Notifications;
