import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistryBanner({ language }) {
  const navigate = useNavigate();

  const bannerMessages = {
    es: [
      '¡Visita nuestra lista de regalos! 🎁',
      '¿Ya viste nuestra lista de Amazon? 🛍️',
      'Sorpréndenos con un regalo especial ✨',
      'Ayúdanos a comenzar nuestra nueva aventura 💝',
      '¡Encuentra el regalo perfecto para nosotros! 🎀',
    ],
    en: [
      'Check out our gift registry! 🎁',
      'Have you seen our Amazon registry? 🛍️',
      'Surprise us with a special gift ✨',
      'Help us start our new adventure 💝',
      'Find the perfect gift for us! 🎀',
    ],
  };

  // Select a random message based on the current time (so it stays consistent during the session)
  const messageIndex = Math.floor(Date.now() / (1000 * 60 * 60)) % bannerMessages[language].length;
  const message = bannerMessages[language][messageIndex];

  return (
    <div className="bg-gradient-to-r from-orange-50 via-pink-50 to-orange-50 border-y border-orange-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <button
          onClick={() => navigate('/registry')}
          className="w-full group flex items-center justify-center gap-3 text-stone-700 hover:text-orange-600 transition-colors"
        >
          <span className="text-sm md:text-base font-medium">
            {message}
          </span>
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
