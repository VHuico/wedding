import React from 'react';
import seminarioMenor from '../assets/photos/decor/seminarioMenor.jpg';
import haciendaChaka from '../assets/photos/decor/haciendaChaka.jpg';
import salonBamboo from '../assets/photos/decor/SalonBamboo.png';

export default function EventDetails({ language, texts }) {
  const getDirectionsUrl = (placeName) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Mérida Yucatán')}`;
  };
  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-olive-700 text-5xl md:text-6xl mb-4 md:mb-6">💒</div>
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
            <div className="inline-block bg-olive-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-lg md:text-xl font-semibold mb-4">
              {language === 'es' ? 'Sábado 14 de Febrero, 2026' : 'Saturday February 14, 2026'}
            </div>
          </div>

          {/* Saturday Events */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Religious Ceremony */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-olive-700">
              <div className="text-center mb-6">
                <div className="text-olive-700 text-4xl md:text-5xl mb-4">⛪</div>
                <h3 className="text-xl md:text-2xl text-stone-700 mb-2 font-semibold">
                  {language === 'es' ? 'Ceremonia Religiosa' : 'Religious Ceremony'}
                </h3>
                <div className="w-16 h-1 bg-olive-700 mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-olive-50 rounded-xl p-4 border border-olive-700">
                  <p className="text-xl md:text-2xl font-bold text-olive-700">4:00 PM - 5:00 PM</p>
                  <p className="text-stone-500">
                    {language === 'es' ? 'Horario' : 'Schedule'}
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
                <div className="w-full h-40 md:h-48 bg-stone-50 rounded-xl border border-stone-200 overflow-hidden mb-4">
                  <img 
                    src={seminarioMenor} 
                    alt={language === 'es' ? 'Seminario Menor San Felipe de Jesús' : 'Seminary San Felipe de Jesús'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  onClick={() => window.open(getDirectionsUrl('Seminario Menor San Felipe de Jesús'), '_blank')}
                  className="w-full bg-olive-700 hover:bg-olive-800 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-colors duration-300"
                >
                  {language === 'es' ? '📍 Cómo llegar' : '📍 Get Directions'}
                </button>
              </div>
            </div>

            {/* Reception */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-olive-700">
              <div className="text-center mb-6">
                <div className="text-olive-700 text-4xl md:text-5xl mb-4">🥂</div>
                <h3 className="text-xl md:text-2xl text-stone-700 mb-2 font-semibold">
                  {language === 'es' ? 'Recepción y Fiesta' : 'Reception & Party'}
                </h3>
                <div className="w-16 h-1 bg-olive-700 mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-olive-50 rounded-xl p-4 border border-olive-700">
                  <p className="text-xl md:text-2xl font-bold text-olive-700">6:00 PM - 1:00 AM</p>
                  <p className="text-stone-500">
                    {language === 'es' ? 'Horario' : 'Schedule'}
                  </p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-stone-700 mb-2">
                    Hacienda Chaká
                  </p>
                  <p className="text-stone-500">Mérida, Yucatán</p>
                </div>
              </div>

              {/* Map for Hacienda */}
              <div className="mb-6">
                <div className="w-full h-40 md:h-48 bg-stone-50 rounded-xl border border-stone-200 overflow-hidden mb-4">
                  <img 
                    src={haciendaChaka} 
                    alt={language === 'es' ? 'Hacienda Chaka' : 'Hacienda Chaka'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  onClick={() => window.open(getDirectionsUrl('Hacienda Chaka'), '_blank')}
                  className="w-full bg-olive-700 hover:bg-olive-800 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-colors duration-300"
                >
                  {language === 'es' ? '📍 Cómo llegar' : '📍 Get Directions'}
                </button>
              </div>
            </div>
          </div>
        </div>        {/* Day 2 - Sunday */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-olive-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-lg md:text-xl font-semibold mb-4">
              {language === 'es' ? 'Domingo 15 de Febrero, 2026' : 'Sunday February 15, 2026'}
            </div>
          </div>          {/* Sunday Event */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-olive-700">
              <div className="text-center mb-6">
                <div className="text-olive-700 text-4xl md:text-5xl mb-4">🎉</div>
                <h3 className="text-xl md:text-2xl text-stone-700 mb-2 font-semibold">
                  {language === 'es' ? 'Torna-Boda' : 'Next Day Celebration'}
                </h3>
                <div className="w-16 h-1 bg-olive-700 mx-auto"></div>
              </div>
              
              <div className="space-y-4 text-center mb-6">
                <div className="bg-olive-50 rounded-xl p-4 border border-olive-700">
                  <p className="text-xl md:text-2xl font-bold text-olive-700">1:00 PM - 6:00 PM</p>
                  <p className="text-stone-500">
                    {language === 'es' ? 'Horario' : 'Schedule'}
                  </p>
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold text-stone-700 mb-2">
                    {language === 'es' ? 'Salón Bamboo' : 'Salón Bamboo'}
                  </p>
                  <p className="text-stone-500">Mérida, Yucatán</p>
                </div>
              </div>

              {/* Map for Salón Bamboo */}
              <div className="mb-6">
                <div className="w-full h-40 md:h-48 bg-stone-50 rounded-xl border border-stone-200 overflow-hidden mb-4">
                  <img 
                    src={salonBamboo} 
                    alt={language === 'es' ? 'Salón Bamboo' : 'Salón Bamboo'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  onClick={() => window.open('https://maps.app.goo.gl/6LKF9afrRLztzNfv9', '_blank')}
                  className="w-full bg-olive-700 hover:bg-olive-800 text-white py-2 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-colors duration-300"
                >
                  {language === 'es' ? '📍 Cómo llegar' : '📍 Get Directions'}
                </button>
              </div>
            </div>
          </div>
        </div>        {/* Dress Code Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-stone-200">
          <div className="text-center mb-6 md:mb-8">
            <div className="text-olive-700 text-4xl md:text-5xl mb-4">👗</div>
            <h3 className="text-2xl md:text-3xl text-stone-700 mb-4 font-semibold">
              {language === 'es' ? 'Código de Vestimenta' : 'Dress Code'}
            </h3>
            <div className="w-20 h-1 bg-olive-700 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 border border-stone-200">
                <h4 className="text-lg md:text-xl font-semibold text-stone-700 mb-2">
                  {language === 'es' ? 'Ceremonia Religiosa y Fiesta' : 'Religious Ceremony & Party'}
                </h4>
                <p className="text-stone-600">
                  {language === 'es' ? 'Formal / Vestido Largo' : 'Formal / Long Dress'}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 border border-stone-200">
                <h4 className="text-lg md:text-xl font-semibold text-stone-700 mb-2">
                  {language === 'es' ? 'Torna-Boda' : 'Next Day Party'}
                </h4>
                <p className="text-stone-600">
                  {language === 'es' ? 'Casual / Guayabera' : 'Casual / Guayabera'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4 md:mt-6">
            <div className="bg-olive-50 rounded-xl p-4 md:p-6 border border-olive-200 mb-4">
              <h4 className="text-lg font-semibold text-stone-700 mb-3">
                {language === 'es' ? 'Consejos Útiles' : 'Helpful Tips'}
              </h4>
              <div className="text-left space-y-2 text-stone-600 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-olive-600">•</span>
                  <p>
                    {language === 'es' 
                      ? 'Nuestra boda es al aire libre con césped natural. Recomendamos tacones bajos, de plataforma o zapatos cómodos para caminar'
                      : 'Our wedding is outdoors on natural grass. We recommend low heels, platform shoes, or comfortable walking shoes'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-olive-600">•</span>
                  <p>
                    {language === 'es' 
                      ? 'Repelente de insectos recomendado para la noche, preferiblemente sin fragancia fuerte'
                      : 'Insect repellent recommended for the evening, preferably unscented or lightly scented'
                    }
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-olive-600">•</span>
                  <p>
                    {language === 'es' 
                      ? 'Considera el clima cálido y húmedo de Yucatán al elegir telas ligeras y transpirables'
                      : 'Consider Yucatán\'s warm and humid climate when choosing light and breathable fabrics'
                    }
                  </p>
                </div>
              </div>
            </div>
            <p className="text-stone-500 text-sm">
              {language === 'es' 
                ? '¡Tu comodidad es importante para nosotros!' 
                : 'Your comfort is important to us!'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
