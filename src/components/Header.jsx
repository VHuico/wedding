import React from 'react';

export default function Header({ language, toggleLanguage, texts }) {
  return (
    <header className="bg-white p-6 text-center relative shadow-sm">
      <h1 className="text-5xl font-autography text-gray-800 mb-2">
        Victor & Landy
      </h1>
      <p className="text-gray-600 italic">{texts[language].subtitle}</p>
    </header>
  );
}
