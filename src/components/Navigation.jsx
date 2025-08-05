import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ language, texts, toggleLanguage }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const routes = [
    '/',
    '/our-story',
    '/event-details',
    '/travel',
    '/rsvp',
    '/registry',
    '/gallery',
    '/faq'
  ];

  // Scroll detection for home page only
  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolling(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout to stop animation after scrolling stops
      const newTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // Animation continues for 1.5 seconds after scrolling stops
      
      setScrollTimeout(newTimeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [location.pathname, scrollTimeout]);

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
        <div className="md:hidden flex justify-between items-center py-4 px-2">
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 bg-gray-50 text-gray-700 rounded-md text-sm hover:bg-gray-100 transition-colors border border-gray-200 font-medium"
          >
            {language === "es" ? "EN" : "ES"}
          </button>
          <span className="text-2xl font-autography text-stone-700 font-semibold">Víctor & Landy</span>
          <button
            onClick={toggleMenu}
            className={`px-4 py-2 rounded-lg text-stone-700 hover:text-olive-700 hover:bg-gray-50 transition-colors font-semibold text-sm border ${
              isScrolling && location.pathname === '/' && !isMenuOpen 
                ? 'shake-animation border-olive-500 bg-olive-50' 
                : 'border-stone-300'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? texts[language].close : texts[language].menu}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center gap-2 lg:gap-4 py-4 text-sm flex-wrap">
          {texts[language].nav.map((label, idx) => (
            <li key={idx} className="transition">
              <Link 
                to={routes[idx]}
                className={`px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 whitespace-nowrap ${
                  location.pathname === routes[idx] 
                    ? 'text-olive-700 bg-olive-50 font-semibold' 
                    : 'text-stone-700 hover:text-olive-700'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <ul className="py-2 space-y-1">
            {texts[language].nav.map((label, idx) => (
              <li key={idx}>
                <Link 
                  to={routes[idx]}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === routes[idx] 
                      ? 'text-olive-700 bg-olive-50 font-semibold border-l-4 border-olive-700' 
                      : 'text-stone-700 hover:text-olive-700 hover:bg-gray-50'
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
