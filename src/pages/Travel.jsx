import React from 'react';

export default function Travel({ language, texts }) {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">        <div className="text-center mb-12">
          <div className="text-[#C7CDBF] text-6xl mb-6">✈️</div>
          <h1 className="text-4xl font-dancing-script text-[#757F64] mb-4">
            {texts[language].travel.title}
          </h1>
        </div>

        <div className="bg-[#ABB290] rounded-2xl p-8 shadow-lg mb-8">
          <p className="text-xl leading-relaxed text-center mb-8">
            {texts[language].travel.content}
          </p>
        </div>

        {/* Hotel Options */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-dancing-script text-[#757F64] mb-4">
              {language === 'es' ? 'Hotel Recomendado 1' : 'Recommended Hotel 1'}
            </h3>
            <div className="space-y-3 text-[#757F64]">
              <p className="font-semibold">[Hotel Name]</p>
              <p className="text-sm">
                {language === 'es' ? 'Descuento especial para huéspedes' : 'Special discount for guests'}
              </p>
              <button className="w-full bg-[#CB7A5C] text-white px-6 py-3 rounded-full hover:bg-[#CB7A5C]/80 transition">
                {language === 'es' ? 'Ver Detalles' : 'View Details'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-dancing-script text-[#757F64] mb-4">
              {language === 'es' ? 'Hotel Recomendado 2' : 'Recommended Hotel 2'}
            </h3>
            <div className="space-y-3 text-[#757F64]">
              <p className="font-semibold">[Hotel Name]</p>
              <p className="text-sm">
                {language === 'es' ? 'Opción económica cerca del venue' : 'Budget option near venue'}
              </p>
              <button className="w-full bg-[#C7CDBF] text-white px-6 py-3 rounded-full hover:bg-[#C7CDBF]/80 transition">
                {language === 'es' ? 'Ver Detalles' : 'View Details'}
              </button>
            </div>
          </div>
        </div>

        {/* Travel Info */}
        <div className="mt-8 bg-[#CB7A5C]/20 rounded-2xl p-8">
          <h3 className="text-2xl font-dancing-script text-[#757F64] mb-6 text-center">
            {language === 'es' ? 'Información de Viaje' : 'Travel Information'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#757F64] mb-2">
                {language === 'es' ? 'Por Avión' : 'By Air'}
              </h4>
              <p className="text-sm text-[#757F64]/80">
                {language === 'es' 
                  ? 'Aeropuerto Internacional de Mérida (MID) - 15 min del centro'
                  : 'Mérida International Airport (MID) - 15 min from downtown'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#757F64] mb-2">
                {language === 'es' ? 'Transporte Local' : 'Local Transport'}
              </h4>
              <p className="text-sm text-[#757F64]/80">
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
