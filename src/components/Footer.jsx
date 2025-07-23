import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Footer = () => {
  const { translations } = useContext(AppContext);

  return (
    <footer className="bg-green-700 text-white text-center p-4">
      <p className="text-sm">{translations.footerText}</p>
    </footer>
  );
};

export default Footer;
