import React from 'react';

export default function EventDetails({ language, texts }) {
  const getDirectionsUrl = (placeName) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Mérida Yucatán')}`;
  };
  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-pink-400 text-5xl md:text-6xl mb-4 md:mb-6">💒</div>
          <h1 className="text-3xl md:text-5xl font-autography text-stone-700 mb-4 md:mb-6 px-4">
            {texts[language].eventDetails.title}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto px-4">
            {language === 'es' 
              ? 'Celebraremos nuestro amor durante dos días mágicos en Mérida, Yucatán'
              : 'We will celebrate our love during two magical days in Mérida, Yucatán'
            }
          </p>
        </div>        {/* Day 1 - Saturday */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-stone-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-lg md:text-xl font-semibold mb-4">
              {language === 'es' ? 'Sábado 14 de Febrero, 2026' : 'Saturday February 14, 2026'}
            </div>
            <h2 className="text-2xl md:text-3xl font-autography text-stone-700">
              {language === 'es' ? 'Día de la Ceremonia' : 'Ceremony Day'}
            </h2>
          </div>

          {/* Saturday Events */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Religious Ceremony */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-stone-200">
              <div className="text-center mb-6">
                <div className="text-pink-400 text-4xl md:text-5xl mb-4">⛪</div>
                <h3 className="text-xl md:text-2xl font-autography text-stone-700 mb-2">
                  {language === 'es' ? 'Ceremonia Religiosa' : 'Religious Ceremony'}
                </h3>
                <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-stone-200">
                  <p className="text-xl md:text-2xl font-bold text-stone-700">4:00 PM</p>
                  <p className="text-stone-500">
                    {language === 'es' ? 'Hora de inicio' : 'Start time'}
                  </p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-stone-700 mb-2">
                    Seminario Menor San Felipe de Jesús
                  </p>
                  <p className="text-stone-500">Mérida, Yucatán</p>
                </div>
              </div>

              {/* Map for Seminary */}
              <div className="mb-6">
                <div className="w-full h-40 md:h-48 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl mb-2">🗺️</div>
                    <p className="text-stone-500 text-sm">
                      {language === 'es' ? 'Mapa del Seminario' : 'Seminary Map'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(getDirectionsUrl('Seminario Menor San Felipe de Jesús'), '_blank')}
                  className="w-full bg-stone-600 hover:bg-stone-700 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-colors duration-300"
                >
                  {language === 'es' ? '📍 Cómo llegar' : '📍 Get Directions'}
                </button>
              </div>
            </div>

            {/* Reception */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-pink-200">
              <div className="text-center mb-6">
                <div className="text-pink-400 text-4xl md:text-5xl mb-4">🥂</div>
                <h3 className="text-xl md:text-2xl font-autography text-stone-700 mb-2">
                  {language === 'es' ? 'Recepción y Fiesta' : 'Reception & Party'}
                </h3>
                <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <p className="text-xl md:text-2xl font-bold text-stone-700">6:00 PM</p>
                  <p className="text-stone-500">
                    {language === 'es' ? 'Aproximadamente' : 'Approximately'}
                  </p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-stone-700 mb-2">
                    Hacienda Chaka
                  </p>
                  <p className="text-stone-500">Mérida, Yucatán</p>
                </div>
              </div>

              {/* Map for Hacienda */}
              <div className="mb-6">
                <div className="w-full h-40 md:h-48 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl mb-2">🗺️</div>
                    <p className="text-stone-500 text-sm">
                      {language === 'es' ? 'Mapa de Hacienda Chaka' : 'Hacienda Chaka Map'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(getDirectionsUrl('Hacienda Chaka'), '_blank')}
                  className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-colors duration-300"
                >
                  {language === 'es' ? '📍 Cómo llegar' : '📍 Get Directions'}
                </button>
              </div>
            </div>
          </div>
        </div>        {/* Day 2 - Sunday */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-pink-400 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-lg md:text-xl font-semibold mb-4">
              {language === 'es' ? 'Domingo 15 de Febrero, 2026' : 'Sunday February 15, 2026'}
            </div>
            <h2 className="text-2xl md:text-3xl font-autography text-stone-700">
              {language === 'es' ? 'Torna-Boda' : 'Next Day Party'}
            </h2>
          </div>          {/* Sunday Event */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-pink-200">
              <div className="text-center mb-6">
                <div className="text-pink-400 text-4xl md:text-5xl mb-4">🎉</div>
                <h3 className="text-xl md:text-2xl font-autography text-stone-700 mb-2">
                  {language === 'es' ? 'Torna-Boda' : 'Next Day Celebration'}
                </h3>
                <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                  <p className="text-xl md:text-2xl font-bold text-stone-700">1:00 PM</p>
                  <p className="text-stone-500">
                    {language === 'es' ? 'Hora de inicio' : 'Start time'}
                  </p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-stone-700 mb-2">
                    {language === 'es' ? 'Lugar por confirmar' : 'Venue TBD'}
                  </p>
                  <p className="text-stone-500">
                    {language === 'es' 
                      ? 'Les avisaremos pronto sobre la ubicación' 
                      : 'We will let you know the location soon'
                    }
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center border border-stone-200">
                <p className="text-stone-600 text-sm">
                  {language === 'es' 
                    ? '¡Más información próximamente!' 
                    : 'More information coming soon!'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>        {/* Dress Code Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-stone-200">
          <div className="text-center mb-6 md:mb-8">
            <div className="text-pink-400 text-4xl md:text-5xl mb-4">👗</div>
            <h3 className="text-2xl md:text-3xl font-autography text-stone-700 mb-4">
              {language === 'es' ? 'Código de Vestimenta' : 'Dress Code'}
            </h3>
            <div className="w-20 h-1 bg-pink-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 border border-stone-200">
                <h4 className="text-lg md:text-xl font-semibold text-stone-700 mb-2">
                  {language === 'es' ? 'Ceremonia Religiosa' : 'Religious Ceremony'}
                </h4>
                <p className="text-stone-600">
                  {language === 'es' ? 'Formal / Cocktail' : 'Formal / Cocktail'}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 border border-stone-200">
                <h4 className="text-lg md:text-xl font-semibold text-stone-700 mb-2">
                  {language === 'es' ? 'Recepción y Torna-Boda' : 'Reception & Next Day Party'}
                </h4>
                <p className="text-stone-600">
                  {language === 'es' ? 'Semi-formal / Guayabera' : 'Semi-formal / Guayabera'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4 md:mt-6">
            <p className="text-stone-500 text-sm">
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
