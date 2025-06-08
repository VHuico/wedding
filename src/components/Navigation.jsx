import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ language, texts }) {
  const location = useLocation();
  
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

  return (    <nav className="sticky top-0 bg-[#f7e1d7]/95 backdrop-blur shadow-md z-50">
      <ul className="flex flex-wrap justify-center gap-4 p-4 text-sm">
        {texts[language].nav.map((label, idx) => (
          <li key={idx} className="transition">
            <Link 
              to={routes[idx]}
              className={`px-3 py-2 rounded hover:bg-[#dedbd2]/10 transition ${
                location.pathname === routes[idx] 
                  ? 'text-[#b0c4b1] bg-[#b0c4b1]/10' 
                  : 'text-[#4a5759] hover:text-[#edafb8]'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
