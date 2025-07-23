import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import heroImage from '../assets/photos/decor/hero.png';
import heroVertical from '../assets/photos/decor/heroVertical.png';
import rightSideFlower from '../assets/photos/decor/rightSideFlower.png';
import backgroundImage from '../assets/photos/horizontal/background.jpeg';
import victorPhoto from '../assets/photos/decor/Victor.jpeg';
import landyPhoto from '../assets/photos/decor/Landy.jpeg';

export default function Home({ language, texts, toggleLanguage }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [victorFlipped, setVictorFlipped] = useState(false);
  const [landyFlipped, setLandyFlipped] = useState(false);
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("2026-02-14T00:00:00");
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);  return (
    <div className="min-h-screen">
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>      {/* Full Screen Hero Section */}
      <section className="relative h-[100dvh] md:h-screen w-full overflow-hidden">
        {/* Desktop Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="hidden md:block absolute top-6 right-6 z-20 px-3 py-2 bg-white/90 text-gray-700 rounded-md text-sm hover:bg-white transition-colors border border-gray-200 font-medium shadow-sm backdrop-blur"
        >
          {language === "es" ? "EN" : "ES"}
        </button>
        
        {/* Desktop Hero Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
        </div>
        
        {/* Mobile Hero Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat block md:hidden"
          style={{
            backgroundImage: `url(${heroVertical})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
        </div>
        
        {/* Animated scroll arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg 
              className="w-8 h-8 text-black" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Navigation positioned after hero */}
      <Navigation language={language} texts={texts} toggleLanguage={toggleLanguage} />      {/* Enhanced Hero Section */}
      <section 
        className="relative py-20 px-6 text-center bg-white overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        
        {/* Hero Content */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-autography text-stone-700 mb-4 md:mb-6">
            {texts[language].welcome}
          </h2>
          <p className="mt-3 md:mt-4 max-w-3xl mx-auto whitespace-pre-line text-base md:text-lg leading-relaxed text-stone-600 bg-white/90 backdrop-blur rounded-xl p-4 md:p-6 shadow-sm border border-stone-200">
            {texts[language].intro}
          </p>            {/* Countdown Timer */}
          <div className="mt-8 md:mt-12 bg-white backdrop-blur rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-lg border border-stone-200">
            <h3 className="text-3xl md:text-3xl font-autography text-stone-700 mb-4 md:mb-6">
              {texts[language].countdown}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-stone-600 mb-1 md:mb-2 bg-stone-50 rounded-xl py-2 md:py-3 border border-stone-100">
                    {value || 0}
                  </div>
                  <div className="text-xs md:text-sm text-stone-600 uppercase tracking-wider font-semibold">
                    {texts[language][unit]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Quick Event Summary */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">          <div className="text-center mb-12">
            <h3 className="text-4xl font-autography text-stone-700 mb-4">
              {language === 'es' ? 'Detalles del Evento' : 'Event Details'}
            </h3>
            <div className="w-16 h-1 bg-green-700 mx-auto"></div>
          </div>
          
          {/* Desktop Version - 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {/* Saturday - Ceremony */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200 text-center">
              <div className="text-5xl mb-4">⛪</div>
              <h4 className="text-2xl text-stone-700 mb-3 font-semibold">
                {language === 'es' ? 'Ceremonia' : 'Ceremony'}
              </h4>
              <p className="text-green-700 font-semibold mb-2">
                {language === 'es' ? 'Sábado 14 de Febrero' : 'Saturday February 14'}
              </p>
              <p className="text-stone-600">4:00 PM</p>
              <p className="text-stone-500 text-sm mt-2">Seminario Menor San Felipe de Jesús</p>
            </div>

            {/* Saturday - Reception */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200 text-center">
              <div className="text-5xl mb-4">🥂</div>
              <h4 className="text-2xl text-stone-700 mb-3 font-semibold">
                {language === 'es' ? 'Recepción' : 'Reception'}
              </h4>
              <p className="text-green-700 font-semibold mb-2">
                {language === 'es' ? 'Sábado 14 de Febrero' : 'Saturday February 14'}
              </p>
              <p className="text-stone-600">6:00 PM</p>
              <p className="text-stone-500 text-sm mt-2">Hacienda Chaká</p>
            </div>

            {/* Sunday - Torna-Boda */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h4 className="text-2xl text-stone-700 mb-3 font-semibold">
                {language === 'es' ? 'Torna-Boda' : 'Next Day Party'}
              </h4>
              <p className="text-green-700 font-semibold mb-2">
                {language === 'es' ? 'Domingo 15 de Febrero' : 'Sunday February 15'}
              </p>
              <p className="text-stone-600">1:00 PM</p>
              <p className="text-stone-500 text-sm mt-2">
                {language === 'es' ? 'Lugar por confirmar' : 'Venue TBD'}
              </p>
            </div>
          </div>

          {/* Mobile Version - Compact Timeline */}
          <div className="md:hidden bg-white rounded-3xl p-6 shadow-lg border border-stone-200">
            <div className="space-y-6">
              {/* Saturday Events */}
              <div className="border-l-4 border-green-700 pl-4">
                <h4 className="text-lg font-semibold text-green-700 mb-3">
                  {language === 'es' ? 'Sábado 14 de Febrero' : 'Saturday February 14'}
                </h4>
                
                <div className="space-y-4">
                  {/* Ceremony */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⛪</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-stone-700">
                          {language === 'es' ? 'Ceremonia' : 'Ceremony'}
                        </span>
                        <span className="text-stone-600 font-medium">4:00 PM</span>
                      </div>
                      <p className="text-stone-500 text-sm">Seminario Menor San Felipe de Jesús</p>
                    </div>
                  </div>
                  
                  {/* Reception */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🥂</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-stone-700">
                          {language === 'es' ? 'Recepción' : 'Reception'}
                        </span>
                        <span className="text-stone-600 font-medium">6:00 PM</span>
                      </div>
                      <p className="text-stone-500 text-sm">Hacienda Chaká</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sunday Event */}
              <div className="border-l-4 border-stone-400 pl-4">
                <h4 className="text-lg font-semibold text-stone-600 mb-3">
                  {language === 'es' ? 'Domingo 15 de Febrero' : 'Sunday February 15'}
                </h4>
                
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎉</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-stone-700">
                        {language === 'es' ? 'Torna-Boda' : 'Next Day Party'}
                      </span>
                      <span className="text-stone-600 font-medium">1:00 PM</span>
                    </div>
                    <p className="text-stone-500 text-sm">
                      {language === 'es' ? 'Lugar por confirmar' : 'Venue TBD'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>      </section>      {/* Decorative Flower Connector */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-16 -right-12 z-10 hidden lg:block">
          <img 
            src={rightSideFlower} 
            alt="Decorative flower" 
            className="w-72 h-96 opacity-90 transform rotate-12 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Meet the Couple - Interactive Flip Cards */}
      <section className="py-16 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-autography text-stone-700 mb-4">
              {language === 'es' ? 'Conoce a la Pareja' : 'Meet the Couple'}
            </h3>
            <div className="w-16 h-1 bg-green-700 mx-auto mb-4"></div>
          </div>
          
          {/* Desktop Version - 2 columns with flip cards */}
          <div className="hidden md:grid md:grid-cols-2 gap-12">
            {/* Victor - Desktop Flippable Card */}
            <div className="relative h-96 w-full perspective-1000">
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  victorFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => setVictorFlipped(!victorFlipped)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border border-stone-200 flex flex-col items-center justify-center p-8">
                  <div className="w-56 h-56 bg-stone-100 rounded-full flex items-center justify-center border-4 border-green-700 shadow-lg mb-4 overflow-hidden">
                    <img 
                      src={victorPhoto} 
                      alt="Víctor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-3xl text-stone-700 font-semibold mb-2">Víctor</h4>
                  <div className="w-20 h-1 bg-green-700 mb-3"></div>
                  <p className="text-stone-500 text-center">
                    {language === 'es' ? 'Haz clic para conocer más' : 'Click to learn more'}
                  </p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-green-700 rounded-3xl shadow-lg border border-stone-200 flex flex-col justify-center p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-3xl text-white font-semibold mb-2">Víctor</h4>
                    <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
                  </div>
                  <p className="text-white leading-relaxed mb-6 text-center">
                    {language === 'es' 
                      ? 'Ingeniero apasionado por la tecnología y los viajes, Víctor disfruta explorar nuevas culturas y crear memorias inolvidables. Es entusiasta de las finanzas personales, amante de las caminatas en parques nacionales y siempre está buscando nuevas formas de optimizar todo (¡hasta los snacks del viaje!). Le gusta diseñar y programar aplicaciones que resuelvan problemas reales.' 
                      : 'An engineer passionate about technology and travel, Víctor enjoys exploring new cultures and creating unforgettable memories. He\'s an enthusiast of personal finance, loves hiking in national parks, and is always looking for new ways to optimize everything (even travel snacks!). He enjoys designing and programming applications that solve real problems.'
                    }
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-white">
                    <span>🎯 {language === 'es' ? 'Tecnología' : 'Technology'}</span>
                    <span>✈️ {language === 'es' ? 'Viajes' : 'Travel'}</span>
                    <span>📚 {language === 'es' ? 'Lectura' : 'Reading'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Landy - Desktop Flippable Card */}
            <div className="relative h-96 w-full perspective-1000">
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  landyFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => setLandyFlipped(!landyFlipped)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border border-stone-200 flex flex-col items-center justify-center p-8">
                  <div className="w-56 h-56 bg-stone-100 rounded-full flex items-center justify-center border-4 border-green-700 shadow-lg mb-4 overflow-hidden">
                    <img 
                      src={landyPhoto} 
                      alt="Landy" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-3xl text-stone-700 font-semibold mb-2">Landy</h4>
                  <div className="w-20 h-1 bg-green-700 mb-3"></div>
                  <p className="text-stone-500 text-center">
                    {language === 'es' ? 'Haz clic para conocer más' : 'Click to learn more'}
                  </p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-green-700 rounded-3xl shadow-lg border border-stone-200 flex flex-col justify-center p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-3xl text-white font-semibold mb-2">Landy</h4>
                    <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
                  </div>
                  <p className="text-white leading-relaxed mb-6 text-center">
                    {language === 'es' 
                      ? 'Apasionada por los viajes, Landy cree que cada destino y cultura tiene algo que enseñarle. Valora las conversaciones profundas, y los momentos que no se repiten. Le encanta trabajar con personas y siempre intenta hacer que todos se sientan bienvenidos. Aunque pocos lo saben, guarda una pasión secreta por el anime (y sí, ¡llora con los finales!)' 
                      : 'Passionate about travel, Landy believes every destination and culture has something to teach her. She values deep conversations and unrepeatable moments. She loves working with people and always tries to make everyone feel welcome. Though few know it, she harbors a secret passion for anime (and yes, she cries at the endings!)'
                    }
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-white">
                    <span>✈️ {language === 'es' ? 'Viajes' : 'Travel'}</span>
                    <span>🌍 {language === 'es' ? 'Cultura' : 'Culture'}</span>
                    <span>🌸 {language === 'es' ? 'Naturaleza' : 'Nature'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version - Single column with flip cards */}
          <div className="md:hidden space-y-8">
            {/* Victor - Mobile Flippable Card */}
            <div className="relative h-80 w-full max-w-sm mx-auto perspective-1000">
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  victorFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => setVictorFlipped(!victorFlipped)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border border-stone-200 flex flex-col items-center justify-center p-8">
                  <div className="w-40 h-40 bg-stone-100 rounded-full flex items-center justify-center border-4 border-green-700 shadow-lg mb-4 overflow-hidden">
                    <img 
                      src={victorPhoto} 
                      alt="Víctor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-2xl text-stone-700 font-semibold mb-2">Víctor</h4>
                  <div className="w-16 h-1 bg-green-700 mb-3"></div>
                  <p className="text-stone-500 text-sm text-center">
                    {language === 'es' ? 'Toca para conocer más' : 'Tap to learn more'}
                  </p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-green-700 rounded-3xl shadow-lg border border-stone-200 flex flex-col justify-center p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-2xl text-white font-semibold mb-2">Víctor</h4>
                    <div className="w-12 h-1 bg-white mx-auto mb-4"></div>
                  </div>
                  <p className="text-white text-sm leading-relaxed mb-4 text-center">
                    {language === 'es' 
                      ? 'Ingeniero apasionado por la tecnología y los viajes, Víctor disfruta explorar nuevas culturas y crear memorias inolvidables. Es entusiasta de las finanzas personales, amante de las caminatas en parques nacionales y siempre está buscando nuevas formas de optimizar todo (¡hasta los snacks del viaje!). Le gusta diseñar y programar aplicaciones que resuelvan problemas reales.' 
                      : 'An engineer passionate about technology and travel, Víctor enjoys exploring new cultures and creating unforgettable memories. He\'s an enthusiast of personal finance, loves hiking in national parks, and is always looking for new ways to optimize everything (even travel snacks!). He enjoys designing and programming applications that solve real problems.'
                    }
                  </p>
                  <div className="flex justify-center gap-3 text-xs text-white">
                    <span>🎯 {language === 'es' ? 'Tecnología' : 'Technology'}</span>
                    <span>✈️ {language === 'es' ? 'Viajes' : 'Travel'}</span>
                    <span>📚 {language === 'es' ? 'Lectura' : 'Reading'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Landy - Mobile Flippable Card */}
            <div className="relative h-80 w-full max-w-sm mx-auto perspective-1000">
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  landyFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => setLandyFlipped(!landyFlipped)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border border-stone-200 flex flex-col items-center justify-center p-8">
                  <div className="w-40 h-40 bg-stone-100 rounded-full flex items-center justify-center border-4 border-green-700 shadow-lg mb-4 overflow-hidden">
                    <img 
                      src={landyPhoto} 
                      alt="Landy" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-2xl text-stone-700 font-semibold mb-2">Landy</h4>
                  <div className="w-16 h-1 bg-green-700 mb-3"></div>
                  <p className="text-stone-500 text-sm text-center">
                    {language === 'es' ? 'Toca para conocer más' : 'Tap to learn more'}
                  </p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-green-700 rounded-3xl shadow-lg border border-stone-200 flex flex-col justify-center p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-2xl text-white font-semibold mb-2">Landy</h4>
                    <div className="w-12 h-1 bg-white mx-auto mb-4"></div>
                  </div>
                  <p className="text-white text-sm leading-relaxed mb-4 text-center">
                    {language === 'es' 
                      ? 'Apasionada por los viajes, Landy cree que cada destino y cultura tiene algo que enseñarle. Valora las conversaciones profundas, y los momentos que no se repiten. Le encanta trabajar con personas y siempre intenta hacer que todos se sientan bienvenidos. Aunque pocos lo saben, guarda una pasión secreta por el anime (y sí, ¡llora con los finales!)' 
                      : 'Passionate about travel, Landy believes every destination and culture has something to teach her. She values deep conversations and unrepeatable moments. She loves working with people and always tries to make everyone feel welcome. Though few know it, she harbors a secret passion for anime (and yes, she cries at the endings!)'
                    }
                  </p>
                  <div className="flex justify-center gap-3 text-xs text-white">
                    <span>✈️ {language === 'es' ? 'Viajes' : 'Travel'}</span>
                    <span>🌍 {language === 'es' ? 'Cultura' : 'Culture'}</span>
                    <span>🌸 {language === 'es' ? 'Naturaleza' : 'Nature'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Info & Travel Teaser */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">            {/* Weather Info */}
            <div className="hidden md:block bg-white rounded-3xl p-8 shadow-lg border border-stone-200">              <div className="text-center mb-6">
                <div className="text-5xl mb-4">☀️</div>
                <h4 className="text-2xl text-stone-700 mb-2 font-semibold">
                  {language === 'es' ? 'Clima en Febrero' : 'February Weather'}
                </h4>
                <div className="w-12 h-1 bg-green-700 mx-auto"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <span className="text-stone-600">
                    {language === 'es' ? 'Temperatura' : 'Temperature'}
                  </span>
                  <span className="font-semibold text-stone-600">25-30°C</span>
                </div>
                <div className="flex justify-between items-center bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <span className="text-stone-600">
                    {language === 'es' ? 'Clima' : 'Weather'}
                  </span>
                  <span className="font-semibold text-stone-600">
                    {language === 'es' ? 'Soleado y húmedo' : 'Sunny & humid'}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <span className="text-stone-600">
                    {language === 'es' ? 'Recomendación' : 'Recommendation'}
                  </span>
                  <span className="font-semibold text-stone-600">
                    {language === 'es' ? 'Ropa ligera' : 'Light clothing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Teaser */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200">              <div className="text-center mb-6">
                <div className="text-5xl mb-4">✈️</div>
                <h4 className="text-2xl text-stone-700 mb-2 font-semibold">
                  {language === 'es' ? '¿Vienes de lejos?' : 'Coming from afar?'}
                </h4>
                <div className="w-12 h-1 bg-green-700 mx-auto"></div>
              </div>
              
              <p className="text-stone-600 mb-6 text-center">
                {language === 'es' 
                  ? 'Te ayudamos con toda la información que necesitas para llegar a Mérida y disfrutar tu estancia al máximo.'
                  : 'We help you with all the information you need to get to Mérida and enjoy your stay to the fullest.'
                }
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="text-xl">🏨</span>
                  <span>{language === 'es' ? 'Hoteles recomendados' : 'Recommended hotels'}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="text-xl">🚗</span>
                  <span>{language === 'es' ? 'Transporte local' : 'Local transportation'}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-500">
                  <span className="text-xl">📍</span>
                  <span>{language === 'es' ? 'Lugares de interés' : 'Points of interest'}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/travel')}
                className="w-full mt-6 bg-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-green-800"
              >
                {language === 'es' ? 'Ver Información de Viaje' : 'See Travel Information'}
              </button>
            </div>
          </div>
        </div>
      </section>      {/* Social Media & RSVP Call-to-Action */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">          <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200">
            <div className="text-6xl mb-6">💌</div>
            <h3 className="text-4xl font-autography text-stone-700 mb-6">
              {language === 'es' ? '¡Confirma tu Asistencia!' : 'Please RSVP!'}
            </h3>
            
            <p className="text-xl text-stone-600 mb-8">
              {language === 'es' 
                ? 'Tu presencia haría nuestro día aún más especial. Por favor confirma tu asistencia antes del 1 de enero de 2026.'
                : 'Your presence would make our day even more special. Please confirm your attendance before January 1, 2026.'
              }
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => navigate('/rsvp')}
                className="bg-green-700 text-white py-4 px-8 rounded-xl text-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-green-800"
              >
                {language === 'es' ? '✉️ Confirmar Asistencia' : '✉️ RSVP Now'}
              </button>
              
              <div className="bg-stone-50 rounded-xl p-4 flex items-center justify-center border border-stone-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <p className="text-stone-700 font-semibold mb-1">#VictorYLandy2026</p>
                  <p className="text-stone-500 text-sm">
                    {language === 'es' ? 'Comparte tus fotos' : 'Share your photos'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-stone-500 text-sm">
                {language === 'es' 
                  ? 'Con amor, Víctor & Landy 💕'
                  : 'With love, Víctor & Landy 💕'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
