import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ language, texts }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  // Couple photos for carousel
  const couplePhotos = [
    {
      url: '/api/placeholder/800/600',
      caption: language === 'es' ? 'Nuestra foto de compromiso' : 'Our engagement photo'
    },
    {
      url: '/api/placeholder/800/600',
      caption: language === 'es' ? 'En las calles de Mérida' : 'In the streets of Mérida'
    },
    {
      url: '/api/placeholder/800/600',
      caption: language === 'es' ? 'Celebrando nuestro amor' : 'Celebrating our love'
    }
  ];

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
  }, []);

  // Photo carousel rotation
  useEffect(() => {
    const photoTimer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === couplePhotos.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(photoTimer);
  }, [couplePhotos.length]);
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Photo Carousel */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-b from-[#edafb8]/30 to-[#f7e1d7] overflow-hidden">
        {/* Background Photo Carousel */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {couplePhotos.map((photo, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentPhotoIndex ? 'opacity-30' : 'opacity-0'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#edafb8]/20 to-[#b0c4b1]/20 flex items-center justify-center">
                  <div className="text-8xl opacity-50">📸</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-2xl text-[#edafb8]/30 animate-bounce" style={{animationDelay: '0s'}}>💕</div>
          <div className="absolute top-32 right-16 text-xl text-[#b0c4b1]/30 animate-bounce" style={{animationDelay: '1s'}}>💖</div>
          <div className="absolute bottom-40 left-20 text-lg text-[#edafb8]/30 animate-bounce" style={{animationDelay: '2s'}}>💝</div>
          <div className="absolute bottom-20 right-10 text-xl text-[#b0c4b1]/30 animate-bounce" style={{animationDelay: '1.5s'}}>💗</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-dancing-script text-[#4a5759] mb-6">
            {texts[language].welcome}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto whitespace-pre-line text-lg leading-relaxed text-[#4a5759]/90 bg-white/60 backdrop-blur rounded-xl p-6">
            {texts[language].intro}
          </p>
          
          {/* Countdown Timer */}
          <div className="mt-12 bg-white/80 backdrop-blur rounded-3xl p-8 max-w-2xl mx-auto shadow-xl border-2 border-[#dedbd2]/30">
            <h3 className="text-3xl font-dancing-script text-[#4a5759] mb-6">
              {texts[language].countdown}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-4xl font-bold text-[#b0c4b1] mb-2 bg-[#f7e1d7] rounded-xl py-3">
                    {value || 0}
                  </div>
                  <div className="text-sm text-[#4a5759] uppercase tracking-wider font-semibold">
                    {texts[language][unit]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Event Summary */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#f7e1d7] to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-dancing-script text-[#4a5759] mb-4">
              {language === 'es' ? 'Detalles del Evento' : 'Event Details'}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Saturday - Ceremony */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#edafb8]/20 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">⛪</div>
              <h4 className="text-2xl font-dancing-script text-[#4a5759] mb-3">
                {language === 'es' ? 'Ceremonia' : 'Ceremony'}
              </h4>
              <p className="text-[#b0c4b1] font-semibold mb-2">
                {language === 'es' ? 'Sábado 14 de Febrero' : 'Saturday February 14'}
              </p>
              <p className="text-[#4a5759]">4:00 PM</p>
              <p className="text-[#4a5759]/70 text-sm mt-2">Seminario Menor San Felipe de Jesús</p>
            </div>

            {/* Saturday - Reception */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#edafb8]/20 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">🥂</div>
              <h4 className="text-2xl font-dancing-script text-[#4a5759] mb-3">
                {language === 'es' ? 'Recepción' : 'Reception'}
              </h4>
              <p className="text-[#b0c4b1] font-semibold mb-2">
                {language === 'es' ? 'Sábado 14 de Febrero' : 'Saturday February 14'}
              </p>
              <p className="text-[#4a5759]">6:00 PM</p>
              <p className="text-[#4a5759]/70 text-sm mt-2">Hacienda Chaka</p>
            </div>

            {/* Sunday - Torna-Boda */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#edafb8]/20 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">🎉</div>
              <h4 className="text-2xl font-dancing-script text-[#4a5759] mb-3">
                {language === 'es' ? 'Torna-Boda' : 'Next Day Party'}
              </h4>
              <p className="text-[#b0c4b1] font-semibold mb-2">
                {language === 'es' ? 'Domingo 15 de Febrero' : 'Sunday February 15'}
              </p>
              <p className="text-[#4a5759]">1:00 PM</p>
              <p className="text-[#4a5759]/70 text-sm mt-2">
                {language === 'es' ? 'Lugar por confirmar' : 'Venue TBD'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Couple */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-[#dedbd2]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-dancing-script text-[#4a5759] mb-4">
              {language === 'es' ? 'Conoce a la Pareja' : 'Meet the Couple'}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Victor */}
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-[#b0c4b1]/20 to-[#edafb8]/20 rounded-full flex items-center justify-center border-4 border-[#f7e1d7] shadow-xl">
                <div className="text-6xl">👨‍💼</div>
              </div>
              <h4 className="text-3xl font-dancing-script text-[#4a5759] mb-3">Victor</h4>
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <p className="text-[#4a5759]/80 mb-4">
                  {language === 'es' 
                    ? 'Ingeniero apasionado por la tecnología y los viajes. Le encanta explorar nuevas culturas y crear memorias inolvidables.' 
                    : 'An engineer passionate about technology and travel. He loves exploring new cultures and creating unforgettable memories.'
                  }
                </p>
                <div className="flex justify-center gap-4 text-sm text-[#b0c4b1]">
                  <span>🎯 {language === 'es' ? 'Tecnología' : 'Technology'}</span>
                  <span>✈️ {language === 'es' ? 'Viajes' : 'Travel'}</span>
                  <span>📚 {language === 'es' ? 'Lectura' : 'Reading'}</span>
                </div>
              </div>
            </div>

            {/* Landy */}
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-[#edafb8]/20 to-[#b0c4b1]/20 rounded-full flex items-center justify-center border-4 border-[#f7e1d7] shadow-xl">
                <div className="text-6xl">👩‍🎨</div>
              </div>
              <h4 className="text-3xl font-dancing-script text-[#4a5759] mb-3">Landy</h4>
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <p className="text-[#4a5759]/80 mb-4">
                  {language === 'es' 
                    ? 'Artista creativa con un corazón lleno de amor por la familia y los momentos especiales. Siempre encuentra la belleza en los detalles.' 
                    : 'A creative artist with a heart full of love for family and special moments. She always finds beauty in the details.'
                  }
                </p>
                <div className="flex justify-center gap-4 text-sm text-[#b0c4b1]">
                  <span>🎨 {language === 'es' ? 'Arte' : 'Art'}</span>
                  <span>👨‍👩‍👧‍👦 {language === 'es' ? 'Familia' : 'Family'}</span>
                  <span>🌸 {language === 'es' ? 'Naturaleza' : 'Nature'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mérida Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#dedbd2]/20 to-[#f7e1d7]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-dancing-script text-[#4a5759] mb-4">
              {language === 'es' ? '¿Por qué Mérida?' : 'Why Mérida?'}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
          </div>
          
          <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
            <div className="text-6xl mb-6">🏛️</div>
            <p className="text-xl text-[#4a5759]/90 leading-relaxed mb-6">
              {language === 'es' 
                ? 'Mérida nos enamoró desde la primera visita. Su rica historia maya, arquitectura colonial, gastronomía única y la calidez de su gente la convierten en el lugar perfecto para celebrar nuestro amor. Queremos compartir con ustedes la magia de esta ciudad blanca que ahora forma parte de nuestra historia.' 
                : 'Mérida captivated us from our first visit. Its rich Mayan history, colonial architecture, unique cuisine, and the warmth of its people make it the perfect place to celebrate our love. We want to share with you the magic of this white city that is now part of our story.'
              }
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🏺</div>
                <h4 className="font-semibold text-[#b0c4b1] mb-1">
                  {language === 'es' ? 'Historia Maya' : 'Mayan History'}
                </h4>
                <p className="text-sm text-[#4a5759]/70">
                  {language === 'es' ? 'Cultura milenaria' : 'Ancient culture'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌮</div>
                <h4 className="font-semibold text-[#b0c4b1] mb-1">
                  {language === 'es' ? 'Gastronomía' : 'Cuisine'}
                </h4>
                <p className="text-sm text-[#4a5759]/70">
                  {language === 'es' ? 'Sabores únicos' : 'Unique flavors'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">❤️</div>
                <h4 className="font-semibold text-[#b0c4b1] mb-1">
                  {language === 'es' ? 'Calidez' : 'Warmth'}
                </h4>
                <p className="text-sm text-[#4a5759]/70">
                  {language === 'es' ? 'Gente maravillosa' : 'Wonderful people'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Preview */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#f7e1d7] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-dancing-script text-[#4a5759] mb-4">
              {language === 'es' ? 'Nuestro Viaje de Amor' : 'Our Love Journey'}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
            <div className="w-full h-64 bg-gradient-to-br from-[#edafb8]/20 to-[#b0c4b1]/20 rounded-xl mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">💕</div>
                <p className="text-[#4a5759]/60">
                  {language === 'es' ? 'Foto de nuestra historia' : 'Photo from our story'}
                </p>
              </div>
            </div>
            
            <p className="text-lg text-[#4a5759]/80 mb-6">
              {language === 'es' 
                ? 'Desde aquel primer encuentro en marzo de 2018 hasta hoy, cada momento nos ha llevado a este día especial. Descubre todos los momentos mágicos que nos trajeron hasta aquí.' 
                : 'From that first meeting in March 2018 until today, every moment has led us to this special day. Discover all the magical moments that brought us here.'
              }
            </p>
            
            <button 
              onClick={() => navigate('/our-story')}
              className="bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {language === 'es' ? 'Ver Nuestra Historia Completa' : 'See Our Complete Story'}
            </button>
          </div>
        </div>
      </section>

      {/* Weather Info & Travel Teaser */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-[#dedbd2]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Weather Info */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">☀️</div>
                <h4 className="text-2xl font-dancing-script text-[#4a5759] mb-2">
                  {language === 'es' ? 'Clima en Febrero' : 'February Weather'}
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#f7e1d7] rounded-xl p-3">
                  <span className="text-[#4a5759]">
                    {language === 'es' ? 'Temperatura' : 'Temperature'}
                  </span>
                  <span className="font-semibold text-[#b0c4b1]">25-30°C</span>
                </div>
                <div className="flex justify-between items-center bg-[#f7e1d7] rounded-xl p-3">
                  <span className="text-[#4a5759]">
                    {language === 'es' ? 'Clima' : 'Weather'}
                  </span>
                  <span className="font-semibold text-[#b0c4b1]">
                    {language === 'es' ? 'Soleado y seco' : 'Sunny & dry'}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-[#f7e1d7] rounded-xl p-3">
                  <span className="text-[#4a5759]">
                    {language === 'es' ? 'Recomendación' : 'Recommendation'}
                  </span>
                  <span className="font-semibold text-[#b0c4b1]">
                    {language === 'es' ? 'Ropa ligera' : 'Light clothing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Teaser */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">✈️</div>
                <h4 className="text-2xl font-dancing-script text-[#4a5759] mb-2">
                  {language === 'es' ? '¿Vienes de lejos?' : 'Coming from afar?'}
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
              </div>
              
              <p className="text-[#4a5759]/80 mb-6 text-center">
                {language === 'es' 
                  ? 'Te ayudamos con toda la información que necesitas para llegar a Mérida y disfrutar tu estancia al máximo.'
                  : 'We help you with all the information you need to get to Mérida and enjoy your stay to the fullest.'
                }
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#4a5759]/70">
                  <span className="text-xl">🏨</span>
                  <span>{language === 'es' ? 'Hoteles recomendados' : 'Recommended hotels'}</span>
                </div>
                <div className="flex items-center gap-3 text-[#4a5759]/70">
                  <span className="text-xl">🚗</span>
                  <span>{language === 'es' ? 'Transporte local' : 'Local transportation'}</span>
                </div>
                <div className="flex items-center gap-3 text-[#4a5759]/70">
                  <span className="text-xl">📍</span>
                  <span>{language === 'es' ? 'Lugares de interés' : 'Points of interest'}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/travel')}
                className="w-full mt-6 bg-gradient-to-r from-[#b0c4b1] to-[#edafb8] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {language === 'es' ? 'Ver Información de Viaje' : 'See Travel Information'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & RSVP Call-to-Action */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#dedbd2]/20 to-[#edafb8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
            <div className="text-6xl mb-6">💌</div>
            <h3 className="text-4xl font-dancing-script text-[#4a5759] mb-6">
              {language === 'es' ? '¡Confirma tu Asistencia!' : 'Please RSVP!'}
            </h3>
            
            <p className="text-xl text-[#4a5759]/80 mb-8">
              {language === 'es' 
                ? 'Tu presencia haría nuestro día aún más especial. Por favor confirma tu asistencia antes del 1 de enero de 2026.'
                : 'Your presence would make our day even more special. Please confirm your attendance before January 1, 2026.'
              }
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => navigate('/rsvp')}
                className="bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] text-white py-4 px-8 rounded-xl text-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {language === 'es' ? '✉️ Confirmar Asistencia' : '✉️ RSVP Now'}
              </button>
              
              <div className="bg-[#f7e1d7] rounded-xl p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <p className="text-[#4a5759] font-semibold mb-1">#VictorYLandy2026</p>
                  <p className="text-[#4a5759]/70 text-sm">
                    {language === 'es' ? 'Comparte tus fotos' : 'Share your photos'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-[#4a5759]/60 text-sm">
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
