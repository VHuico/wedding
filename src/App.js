import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import EventDetails from './pages/EventDetails';
import Travel from './pages/Travel';
import DynamicRSVP from './pages/DynamicRSVP';
import Registry from './pages/Registry';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import { texts } from './data/texts';

function AppContent() {
  const [language, setLanguage] = useState("es");
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

  return (
    <div className="bg-[#F5F5DC] text-[#2D5016] font-sans min-h-screen">
      {!isHomePage && <Header language={language} toggleLanguage={toggleLanguage} texts={texts} />}
      {!isHomePage && <Navigation language={language} texts={texts} />}
      
      <main>
        <Routes>
          <Route path="/" element={<Home language={language} texts={texts} toggleLanguage={toggleLanguage} />} />
          <Route path="/our-story" element={<OurStory language={language} texts={texts} />} />
          <Route path="/event-details" element={<EventDetails language={language} texts={texts} />} />
          <Route path="/travel" element={<Travel language={language} texts={texts} />} />
          <Route path="/rsvp" element={<DynamicRSVP language={language} texts={texts} />} />
          <Route path="/registry" element={<Registry language={language} texts={texts} />} />
          <Route path="/admin" element={<AdminDashboard language={language} texts={texts} />} />
          <Route path="/gallery" element={<Gallery language={language} texts={texts} />} />
          <Route path="/faq" element={<FAQ language={language} texts={texts} />} />
        </Routes>
      </main>
      
      <Footer language={language} toggleLanguage={toggleLanguage} />
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/wedding">
      <AppContent />
    </Router>
  );
}