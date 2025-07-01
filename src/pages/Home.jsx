import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import heroImage from '../assets/photos/decor/hero.png';
import heroVertical from '../assets/photos/decor/heroVertical.png';
import rightSideFlower from '../assets/photos/decor/rightSideFlower.png';
import backgroundImage from '../assets/photos/horizontal/background.jpeg';

export default function Home({ language, texts, toggleLanguage }) {
  const [timeLeft, setTimeLeft] = useState({});
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
    <div className="min-h-screen">      {/* Full Screen Hero Section */}
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
          <h2 className="text-5xl md:text-6xl font-autography text-stone-700 mb-6">
            {texts[language].welcome}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto whitespace-pre-line text-lg leading-relaxed text-stone-600 bg-white/90 backdrop-blur rounded-xl p-6 shadow-sm border border-stone-200">
            {texts[language].intro}
          </p>            {/* Countdown Timer */}
          <div className="mt-12 bg-white backdrop-blur rounded-3xl p-8 max-w-2xl mx-auto shadow-lg border border-stone-200">
            <h3 className="text-3xl font-autography text-stone-700 mb-6">
              {texts[language].countdown}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-4xl font-bold text-stone-600 mb-2 bg-stone-50 rounded-xl py-3 border border-stone-100">
                    {value || 0}
                  </div>
                  <div className="text-sm text-stone-600 uppercase tracking-wider font-semibold">
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
          
          <div className="grid md:grid-cols-3 gap-8">            {/* Saturday - Ceremony */}            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200 text-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="text-5xl mb-4">⛪</div>
              <h4 className="text-2xl text-stone-700 mb-3 font-semibold">
                {language === 'es' ? 'Ceremonia' : 'Ceremony'}
              </h4>
              <p className="text-stone-600 font-semibold mb-2">
                {language === 'es' ? 'Sábado 14 de Febrero' : 'Saturday February 14'}
              </p>
              <p className="text-stone-600">4:00 PM</p>
              <p className="text-stone-500 text-sm mt-2">Seminario Menor San Felipe de Jesús</p>
            </div>

            {/* Saturday - Reception */}            <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-700 text-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="text-5xl mb-4">🥂</div>
              <h4 className="text-2xl text-stone-700 mb-3 font-semibold">
                {language === 'es' ? 'Recepción' : 'Reception'}
              </h4>
              <p className="text-green-700 font-semibold mb-2">
                {language === 'es' ? 'Sábado 14 de Febrero' : 'Saturday February 14'}
              </p>
              <p className="text-stone-600">6:00 PM</p>
              <p className="text-stone-500 text-sm mt-2">Hacienda Chaka</p>
            </div>

            {/* Sunday - Torna-Boda */}            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200 text-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="text-5xl mb-4">🎉</div>
              <h4 className="text-2xl text-stone-700 mb-3 font-semibold">
                {language === 'es' ? 'Torna-Boda' : 'Next Day Party'}
              </h4>
              <p className="text-stone-600 font-semibold mb-2">
                {language === 'es' ? 'Domingo 15 de Febrero' : 'Sunday February 15'}
              </p>
              <p className="text-stone-600">1:00 PM</p>
              <p className="text-stone-500 text-sm mt-2">
                {language === 'es' ? 'Lugar por confirmar' : 'Venue TBD'}
              </p>
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

      {/* Meet the Couple */}
      <section className="py-16 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto"><div className="text-center mb-12">
            <h3 className="text-4xl font-autography text-stone-700 mb-4">
              {language === 'es' ? 'Conoce a la Pareja' : 'Meet the Couple'}
            </h3>
            <div className="w-16 h-1 bg-green-700 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">            {/* Victor */}
            <div className="text-center">              <div className="w-64 h-64 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center border-4 border-stone-200 shadow-lg">
                <div className="text-6xl">👨‍💼</div>
              </div>
              <h4 className="text-3xl text-stone-700 mb-3 font-semibold">Victor</h4>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-200">
                <p className="text-stone-600 mb-4">
                  {language === 'es' 
                    ? 'Ingeniero apasionado por la tecnología y los viajes. Le encanta explorar nuevas culturas y crear memorias inolvidables.' 
                    : 'An engineer passionate about technology and travel. He loves exploring new cultures and creating unforgettable memories.'
                  }
                </p>
                <div className="flex justify-center gap-4 text-sm text-stone-500">
                  <span>🎯 {language === 'es' ? 'Tecnología' : 'Technology'}</span>
                  <span>✈️ {language === 'es' ? 'Viajes' : 'Travel'}</span>
                  <span>📚 {language === 'es' ? 'Lectura' : 'Reading'}</span>
                </div>
              </div>
            </div>

            {/* Landy */}
            <div className="text-center">              <div className="w-64 h-64 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-700 shadow-lg">
                <div className="text-6xl">👩‍🎨</div>
              </div>
              <h4 className="text-3xl text-stone-700 mb-3 font-semibold">Landy</h4>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-700">
                <p className="text-stone-600 mb-4">
                  {language === 'es' 
                    ? 'Artista creativa con un corazón lleno de amor por la familia y los momentos especiales. Siempre encuentra la belleza en los detalles.' 
                    : 'A creative artist with a heart full of love for family and special moments. She always finds beauty in the details.'
                  }
                </p>
                <div className="flex justify-center gap-4 text-sm text-green-700">
                  <span>🎨 {language === 'es' ? 'Arte' : 'Art'}</span>
                  <span>👨‍👩‍👧‍👦 {language === 'es' ? 'Familia' : 'Family'}</span>
                  <span>🌸 {language === 'es' ? 'Naturaleza' : 'Nature'}</span>
                </div>
              </div>
            </div>
          </div>        </div>
      </section>

      {/* Weather Info & Travel Teaser */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">            {/* Weather Info */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200">              <div className="text-center mb-6">
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
                    {language === 'es' ? 'Soleado y seco' : 'Sunny & dry'}
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
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-700">              <div className="text-center mb-6">
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
                className="w-full mt-6 bg-stone-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-stone-700"
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
                  ? 'Con amor, Victor & Landy 💕'
                  : 'With love, Victor & Landy 💕'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
