import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MyCrops from './pages/MyCrops';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Start from './pages/Start';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <AppProvider>
      <Header />
      <main className="min-h-screen p-4 bg-gray-50">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/my-crops" element={isLoggedIn ? <MyCrops /> : <Navigate to="/" />} />
          <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </AppProvider>
  );
}
export default App; 