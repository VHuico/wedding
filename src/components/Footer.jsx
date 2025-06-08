import React from 'react';

export default function Footer({ language, toggleLanguage }) {
  return (    <footer className="bg-[#4a5759] text-[#f7e1d7] py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-dancing-script mb-4">Victor & Landy</h3>
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={toggleLanguage}
              className="text-[#edafb8] hover:text-white transition"
            >
              {language === "es" ? "English" : "Español"}
            </button>
          </div>
        </div>
        <div className="border-t border-[#f7e1d7]/20 pt-6">
          <p className="text-sm opacity-70">
            Hecho con amor por Victor & Landy • Mérida, Yucatán • 14 de Febrero, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
