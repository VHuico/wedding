import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ language, texts }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const routes = [
    '/',
    '/our-story',
    '/event-details',
    '/travel',
    '/things-to-do',
    '/rsvp',
    '/gallery',
    '/faq'
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-white backdrop-blur shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Mobile menu button */}
        <div className="md:hidden flex justify-between items-center py-3">
          <span className="text-lg font-autography text-stone-700">Victor & Landy</span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-stone-700 hover:text-pink-400 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center gap-2 lg:gap-4 py-4 text-sm flex-wrap">
          {texts[language].nav.map((label, idx) => (
            <li key={idx} className="transition">
              <Link 
                to={routes[idx]}
                className={`px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 whitespace-nowrap ${
                  location.pathname === routes[idx] 
                    ? 'text-pink-400 bg-pink-50 font-semibold' 
                    : 'text-stone-700 hover:text-pink-400'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <ul className="py-2 space-y-1">
            {texts[language].nav.map((label, idx) => (
              <li key={idx}>
                <Link 
                  to={routes[idx]}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === routes[idx] 
                      ? 'text-pink-400 bg-pink-50 font-semibold border-l-4 border-pink-400' 
                      : 'text-stone-700 hover:text-pink-400 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
