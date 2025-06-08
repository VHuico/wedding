import React from 'react';

export default function Header({ language, toggleLanguage, texts }) {
  return (
    <header className="bg-white p-6 text-center relative shadow-sm">
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 px-4 py-2 bg-[#edafb8] text-white rounded-full text-sm hover:bg-[#edafb8]/80 transition z-10"
      >
        {language === "es" ? "English" : "Español"}
      </button>
      <h1 className="text-5xl font-autography text-gray-800 mb-2">
        Victor & Landy
      </h1>
      <p className="text-gray-600 italic">{texts[language].subtitle}</p>
    </header>
  );
}
