import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import EventDetails from './pages/EventDetails';
import Travel from './pages/Travel';
import ThingsToDo from './pages/ThingsToDo';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import { texts } from './data/texts';

export default function App() {
  const [language, setLanguage] = useState("es");
  
  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

  return (
    <Router>
      <div className="bg-[#F5F5DC] text-[#2D5016] font-sans min-h-screen">
        <Header language={language} toggleLanguage={toggleLanguage} texts={texts} />
        <Navigation language={language} texts={texts} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home language={language} texts={texts} />} />
            <Route path="/our-story" element={<OurStory language={language} texts={texts} />} />
            <Route path="/event-details" element={<EventDetails language={language} texts={texts} />} />
            <Route path="/travel" element={<Travel language={language} texts={texts} />} />
            <Route path="/things-to-do" element={<ThingsToDo language={language} texts={texts} />} />
            <Route path="/rsvp" element={<RSVP language={language} texts={texts} />} />
            <Route path="/gallery" element={<Gallery language={language} texts={texts} />} />
            <Route path="/faq" element={<FAQ language={language} texts={texts} />} />
          </Routes>
        </main>
        
        <Footer language={language} toggleLanguage={toggleLanguage} />
      </div>
    </Router>
  );
}