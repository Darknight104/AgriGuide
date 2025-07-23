// pages/Start.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <h1 className="text-3xl font-bold">Welcome to Smart Agri-Weather System</h1>
      <div className="flex gap-4">
        <Link to="/login" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Login</Link>
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Signup</Link>
      </div>
    </div>
  );
};

export default Start;
