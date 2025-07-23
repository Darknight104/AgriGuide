import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Notifications = () => {
  const { translations } = useContext(AppContext);

  const alerts = [
    { id: 1, title: translations.prepareDrainage, message: "Heavy rain expected tomorrow. Prepare your fields." },
    { id: 2, title: translations.avoidSpraying, message: "Humidity too high for effective spraying today." }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">{translations.alertsNotifications}</h2>
      {alerts.map(alert => (
        <div key={alert.id} className="p-4 border rounded bg-yellow-100">
          <h3 className="font-semibold">{alert.title}</h3>
          <p>{alert.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
