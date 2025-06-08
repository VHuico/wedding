import React from 'react';

export default function Header({ language, toggleLanguage, texts }) {
  return (    <header className="p-6 text-center relative">
      <div className="absolute top-0 left-0 text-[#edafb8] text-6xl opacity-30">❀</div>
      <div className="absolute top-0 right-0 text-[#b0c4b1] text-6xl opacity-30">❀</div>
      <h1 className="text-5xl font-dancing-script text-[#4a5759] mb-2">
        Victor & Landy
      </h1>
      <p className="text-[#4a5759]/70 italic">{texts[language].subtitle}</p>
      <button
        onClick={toggleLanguage}
        className="mt-4 px-4 py-2 bg-[#edafb8] text-white rounded-full text-sm hover:bg-[#edafb8]/80 transition"
      >
        {language === "es" ? "English" : "Español"}
      </button>
    </header>
  );
}
