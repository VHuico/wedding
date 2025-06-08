import React from 'react';

export default function Travel({ language, texts }) {
  return (    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">        <div className="text-center mb-8 md:mb-12">
          <div className="text-pink-400 text-5xl md:text-6xl mb-4 md:mb-6">✈️</div>
          <h1 className="text-3xl md:text-4xl font-autography text-stone-700 mb-4 px-4">
            {texts[language].travel.title}
          </h1>
        </div>        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-6 md:mb-8 border border-stone-200">
          <p className="text-lg md:text-xl leading-relaxed text-center mb-6 md:mb-8 text-stone-700">
            {texts[language].travel.content}
          </p>
        </div>        {/* Hotel Options */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200">
            <h3 className="text-lg md:text-xl font-autography text-stone-700 mb-4">
              {language === 'es' ? 'Hotel Recomendado 1' : 'Recommended Hotel 1'}
            </h3>
            <div className="space-y-3 text-stone-600">
              <p className="font-semibold">[Hotel Name]</p>
              <p className="text-sm">
                {language === 'es' ? 'Descuento especial para huéspedes' : 'Special discount for guests'}
              </p>
              <button className="w-full bg-pink-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-pink-500 transition">
                {language === 'es' ? 'Ver Detalles' : 'View Details'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200">
            <h3 className="text-lg md:text-xl font-autography text-stone-700 mb-4">
              {language === 'es' ? 'Hotel Recomendado 2' : 'Recommended Hotel 2'}
            </h3>
            <div className="space-y-3 text-stone-600">
              <p className="font-semibold">[Hotel Name]</p>
              <p className="text-sm">
                {language === 'es' ? 'Opción económica cerca del venue' : 'Budget option near venue'}
              </p>
              <button className="w-full bg-stone-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-stone-700 transition">
                {language === 'es' ? 'Ver Detalles' : 'View Details'}
              </button>
            </div>
          </div>
        </div>        {/* Travel Info */}
        <div className="mt-6 md:mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200">
          <h3 className="text-xl md:text-2xl font-autography text-stone-700 mb-4 md:mb-6 text-center">
            {language === 'es' ? 'Información de Viaje' : 'Travel Information'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h4 className="font-semibold text-stone-700 mb-2">
                {language === 'es' ? 'Por Avión' : 'By Air'}
              </h4>
              <p className="text-sm text-stone-600">
                {language === 'es' 
                  ? 'Aeropuerto Internacional de Mérida (MID) - 15 min del centro'
                  : 'Mérida International Airport (MID) - 15 min from downtown'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-stone-700 mb-2">
                {language === 'es' ? 'Transporte Local' : 'Local Transport'}
              </h4>
              <p className="text-sm text-stone-600">
                {language === 'es' 
                  ? 'Taxi, Uber, o renta de auto disponibles'
                  : 'Taxi, Uber, or car rental available'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
