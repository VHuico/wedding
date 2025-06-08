import React from 'react';

export default function EventDetails({ language, texts }) {
  const getDirectionsUrl = (placeName) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Mérida Yucatán')}`;
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-[#f7e1d7] to-[#dedbd2]/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#edafb8] text-6xl mb-6">💒</div>
          <h1 className="text-5xl font-dancing-script text-[#4a5759] mb-6">
            {texts[language].eventDetails.title}
          </h1>
          <p className="text-xl text-[#4a5759]/80 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Celebraremos nuestro amor durante dos días mágicos en Mérida, Yucatán'
              : 'We will celebrate our love during two magical days in Mérida, Yucatán'
            }
          </p>
        </div>        
        {/* Day 1 - Saturday */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#b0c4b1] text-white px-8 py-3 rounded-full text-xl font-semibold mb-4">
              {language === 'es' ? 'Sábado 14 de Febrero, 2026' : 'Saturday February 14, 2026'}
            </div>
            <h2 className="text-3xl font-dancing-script text-[#4a5759]">
              {language === 'es' ? 'Día de la Ceremonia' : 'Ceremony Day'}
            </h2>
          </div>

          {/* Saturday Events */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Religious Ceremony */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
              <div className="text-center mb-6">
                <div className="text-[#edafb8] text-5xl mb-4">⛪</div>
                <h3 className="text-2xl font-dancing-script text-[#4a5759] mb-2">
                  {language === 'es' ? 'Ceremonia Religiosa' : 'Religious Ceremony'}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-[#f7e1d7] rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#4a5759]">4:00 PM</p>
                  <p className="text-[#4a5759]/70">
                    {language === 'es' ? 'Hora de inicio' : 'Start time'}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#4a5759] mb-2">
                    Seminario Menor San Felipe de Jesús
                  </p>
                  <p className="text-[#4a5759]/70">Mérida, Yucatán</p>
                </div>
              </div>

              {/* Map for Seminary */}
              <div className="mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-[#edafb8]/20 to-[#b0c4b1]/20 rounded-xl border border-[#dedbd2]/30 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-[#4a5759]/60 text-sm">
                      {language === 'es' ? 'Mapa del Seminario' : 'Seminary Map'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(getDirectionsUrl('Seminario Menor San Felipe de Jesús'), '_blank')}
                  className="w-full bg-[#b0c4b1] hover:bg-[#b0c4b1]/80 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300"
                >
                  {language === 'es' ? '📍 Cómo llegar' : '📍 Get Directions'}
                </button>
              </div>
            </div>

            {/* Reception */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
              <div className="text-center mb-6">
                <div className="text-[#edafb8] text-5xl mb-4">🥂</div>
                <h3 className="text-2xl font-dancing-script text-[#4a5759] mb-2">
                  {language === 'es' ? 'Recepción y Fiesta' : 'Reception & Party'}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-[#f7e1d7] rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#4a5759]">6:00 PM</p>
                  <p className="text-[#4a5759]/70">
                    {language === 'es' ? 'Aproximadamente' : 'Approximately'}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#4a5759] mb-2">
                    Hacienda Chaka
                  </p>
                  <p className="text-[#4a5759]/70">Mérida, Yucatán</p>
                </div>
              </div>

              {/* Map for Hacienda */}
              <div className="mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-[#edafb8]/20 to-[#b0c4b1]/20 rounded-xl border border-[#dedbd2]/30 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-[#4a5759]/60 text-sm">
                      {language === 'es' ? 'Mapa de Hacienda Chaka' : 'Hacienda Chaka Map'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(getDirectionsUrl('Hacienda Chaka'), '_blank')}
                  className="w-full bg-[#b0c4b1] hover:bg-[#b0c4b1]/80 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300"
                >
                  {language === 'es' ? '📍 Cómo llegar' : '📍 Get Directions'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Day 2 - Sunday */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#edafb8] text-white px-8 py-3 rounded-full text-xl font-semibold mb-4">
              {language === 'es' ? 'Domingo 15 de Febrero, 2026' : 'Sunday February 15, 2026'}
            </div>
            <h2 className="text-3xl font-dancing-script text-[#4a5759]">
              {language === 'es' ? 'Torna-Boda' : 'Next Day Party'}
            </h2>
          </div>

          {/* Sunday Event */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
              <div className="text-center mb-6">
                <div className="text-[#edafb8] text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-dancing-script text-[#4a5759] mb-2">
                  {language === 'es' ? 'Torna-Boda' : 'Next Day Celebration'}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-[#f7e1d7] rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#4a5759]">1:00 PM</p>
                  <p className="text-[#4a5759]/70">
                    {language === 'es' ? 'Hora de inicio' : 'Start time'}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#4a5759] mb-2">
                    {language === 'es' ? 'Lugar por confirmar' : 'Venue TBD'}
                  </p>
                  <p className="text-[#4a5759]/70">
                    {language === 'es' 
                      ? 'Les avisaremos pronto sobre la ubicación' 
                      : 'We will let you know the location soon'
                    }
                  </p>
                </div>
              </div>

              <div className="bg-[#dedbd2]/30 rounded-xl p-4 text-center">
                <p className="text-[#4a5759] text-sm">
                  {language === 'es' 
                    ? '¡Más información próximamente!' 
                    : 'More information coming soon!'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dress Code Section */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-[#edafb8]/20">
          <div className="text-center mb-8">
            <div className="text-[#edafb8] text-5xl mb-4">👗</div>
            <h3 className="text-3xl font-dancing-script text-[#4a5759] mb-4">
              {language === 'es' ? 'Código de Vestimenta' : 'Dress Code'}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#edafb8] to-[#b0c4b1] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-[#f7e1d7] rounded-xl p-6 mb-4">
                <h4 className="text-xl font-semibold text-[#4a5759] mb-2">
                  {language === 'es' ? 'Ceremonia Religiosa' : 'Religious Ceremony'}
                </h4>
                <p className="text-[#4a5759]/80">
                  {language === 'es' ? 'Formal / Cocktail' : 'Formal / Cocktail'}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-[#f7e1d7] rounded-xl p-6 mb-4">
                <h4 className="text-xl font-semibold text-[#4a5759] mb-2">
                  {language === 'es' ? 'Recepción y Torna-Boda' : 'Reception & Next Day Party'}
                </h4>
                <p className="text-[#4a5759]/80">
                  {language === 'es' ? 'Semi-formal / Guayabera' : 'Semi-formal / Guayabera'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-[#4a5759]/70 text-sm">
              {language === 'es' 
                ? 'Por favor, considera el clima cálido de Yucatán al elegir tu atuendo'
                : 'Please consider Yucatán\'s warm climate when choosing your outfit'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
