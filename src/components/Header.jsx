import React from 'react';

export default function Header({ language, toggleLanguage, texts }) {
  return (
    <header className="bg-white p-6 text-center relative shadow-sm">
      {/* Desktop Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="hidden md:block absolute top-6 right-6 px-3 py-2 bg-gray-50 text-gray-700 rounded-md text-sm hover:bg-gray-100 transition-colors border border-gray-200 font-medium"
      >
        {language === "es" ? "EN" : "ES"}
      </button>
      
      <h1 className="text-5xl font-autography text-gray-800 mb-2">
        Victor & Landy
      </h1>
      <p className="text-gray-600 italic">{texts[language].subtitle}</p>
    </header>
  );
}
