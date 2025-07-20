import React, { useState } from 'react';

// Import hotel images
import HiltonImage from '../assets/photos/travel/Hilton.png';
import HolidayImage from '../assets/photos/travel/Holiday.png';
import CityExpressImage from '../assets/photos/travel/CityExpress.png';

export default function Travel({ language, texts }) {
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const attractions = [
    {
      id: 'centro-historico',
      name: 'Centro Histórico',
      nameEn: 'Historic Center',
      description: 'Arquitectura colonial y plazas hermosas',
      descriptionEn: 'Colonial architecture and beautiful plazas',
      icon: '🏛️',
      duration: language === 'es' ? '2-3 horas' : '2-3 hours',
      distance: language === 'es' ? 'En el centro de la ciudad' : 'In the city center',
      highlights: language === 'es' ? [
        'Plaza Grande (Zócalo)',
        'Catedral de San Ildefonso',
        'Casa de Montejo',
        'Palacio del Gobierno',
        'Mercado Lucas de Gálvez'
      ] : [
        'Plaza Grande (Main Square)',
        'Cathedral of San Ildefonso',
        'Casa de Montejo',
        'Government Palace',
        'Lucas de Gálvez Market'
      ],
      tips: language === 'es' ? [
        'Mejor visitarlo temprano en la mañana o al atardecer',
        'Los domingos hay eventos culturales gratuitos',
        'Perfecto para caminar y tomar fotos'
      ] : [
        'Best visited early morning or at sunset',
        'Free cultural events on Sundays',
        'Perfect for walking and photography'
      ]
    },
    {
      id: 'chichen-itza',
      name: 'Chichen Itzá',
      nameEn: 'Chichen Itza',
      description: 'Una de las 7 maravillas del mundo moderno',
      descriptionEn: 'One of the 7 wonders of the modern world',
      icon: '🗿',
      duration: language === 'es' ? 'Día completo' : 'Full day',
      distance: language === 'es' ? '2 horas desde Mérida' : '2 hours from Mérida',
      highlights: language === 'es' ? [
        'Pirámide de Kukulkán (El Castillo)',
        'Gran Juego de Pelota',
        'Templo de los Guerreros',
        'Cenote Sagrado',
        'Observatorio (El Caracol)'
      ] : [
        'Kukulkan Pyramid (El Castillo)',
        'Great Ball Court',
        'Temple of Warriors',
        'Sacred Cenote',
        'Observatory (El Caracol)'
      ],
      tips: language === 'es' ? [
        'Lleva protector solar y sombrero',
        'Mejor ir temprano para evitar multitudes',
        'Considera un tour guiado para aprender más',
        'Lleva agua y snacks'
      ] : [
        'Bring sunscreen and hat',
        'Go early to avoid crowds',
        'Consider a guided tour to learn more',
        'Bring water and snacks'
      ]
    },
    {
      id: 'cenotes',
      name: 'Cenotes',
      nameEn: 'Cenotes',
      description: 'Piscinas naturales sagradas de los mayas',
      descriptionEn: 'Sacred natural pools of the Maya',
      icon: '💧',
      duration: language === 'es' ? '3-4 horas' : '3-4 hours',
      distance: language === 'es' ? '30 min - 1 hora desde Mérida' : '30 min - 1 hour from Mérida',
      highlights: language === 'es' ? [
        'Cenote Xlacah (Dzibilchaltún)',
        'Cenote San Ignacio',
        'Cenote Yokdzonot',
        'Cenote Sambulá',
        'Cenote Chelentún'
      ] : [
        'Cenote Xlacah (Dzibilchaltún)',
        'Cenote San Ignacio',
        'Cenote Yokdzonot',
        'Cenote Sambulá',
        'Cenote Chelentún'
      ],
      tips: language === 'es' ? [
        'Trae traje de baño y toalla',
        'Usa protector solar biodegradable',
        'Lleva zapatos acuáticos',
        'Perfecto para refrescarse del calor'
      ] : [
        'Bring swimsuit and towel',
        'Use biodegradable sunscreen',
        'Bring water shoes',
        'Perfect to cool off from the heat'
      ]
    },
    {
      id: 'gastronomia',
      name: 'Gastronomía',
      nameEn: 'Local Cuisine',
      description: 'Cochinita pibil, sopa de lima y más',
      descriptionEn: 'Cochinita pibil, lime soup, and more',
      icon: '🌮',
      duration: language === 'es' ? 'Todo el día' : 'All day',
      distance: language === 'es' ? 'En toda la ciudad' : 'Throughout the city',
      highlights: language === 'es' ? [
        'Cochinita Pibil',
        'Sopa de Lima',
        'Poc Chuc',
        'Panuchos y Salbutes',
        'Marquesitas'
      ] : [
        'Cochinita Pibil',
        'Lime Soup',
        'Poc Chuc',
        'Panuchos and Salbutes',
        'Marquesitas'
      ],
      tips: language === 'es' ? [
        'Prueba el mercado Lucas de Gálvez',
        'Restaurante Apoala para alta cocina yucateca',
        'La Chaya Maya para comida tradicional',
        'No te pierdas las marquesitas de postre'
      ] : [
        'Try Lucas de Gálvez market',
        'Apoala restaurant for fine Yucatecan cuisine',
        'La Chaya Maya for traditional food',
        'Don\'t miss marquesitas for dessert'
      ]
    },
    {
      id: 'uxmal',
      name: 'Uxmal',
      nameEn: 'Uxmal',
      description: 'Sitio arqueológico con arquitectura Puuc',
      descriptionEn: 'Archaeological site with Puuc architecture',
      icon: '🗿',
      duration: language === 'es' ? 'Medio día' : 'Half day',
      distance: language === 'es' ? '1 hora desde Mérida' : '1 hour from Mérida',
      highlights: language === 'es' ? [
        'Pirámide del Adivino',
        'Cuadrángulo de las Monjas',
        'Palacio del Gobernador',
        'Casa de las Tortugas',
        'Espectáculo de luz y sonido'
      ] : [
        'Pyramid of the Magician',
        'Nunnery Quadrangle',
        'Governor\'s Palace',
        'House of Turtles',
        'Light and sound show'
      ],
      tips: language === 'es' ? [
        'Menos concurrido que Chichen Itzá',
        'Arquitectura mejor conservada',
        'Ideal para los amantes de la historia',
        'El espectáculo nocturno es impresionante'
      ] : [
        'Less crowded than Chichen Itza',
        'Better preserved architecture',
        'Ideal for history lovers',
        'Night show is impressive'
      ]
    },
    {
      id: 'progreso',
      name: 'Progreso',
      nameEn: 'Progreso',
      description: 'Playa y puerto más cercano a Mérida',
      descriptionEn: 'Closest beach and port to Mérida',
      icon: '🏖️',
      duration: language === 'es' ? 'Medio día' : 'Half day',
      distance: language === 'es' ? '30 minutos desde Mérida' : '30 minutes from Mérida',
      highlights: language === 'es' ? [
        'Playa de Progreso',
        'Malecón de Progreso',
        'Muelle de Progreso',
        'Mariscos frescos',
        'Casa de los Mayas'
      ] : [
        'Progreso Beach',
        'Progreso Boardwalk',
        'Progreso Pier',
        'Fresh seafood',
        'Casa de los Mayas'
      ],
      tips: language === 'es' ? [
        'Perfecto para un día de playa',
        'Prueba los mariscos en el malecón',
        'Agua muy tranquila, ideal para familias',
        'Atardeceres espectaculares'
      ] : [
        'Perfect for a beach day',
        'Try seafood at the boardwalk',
        'Very calm water, ideal for families',
        'Spectacular sunsets'
      ]
    }
  ];
  return (    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">        <div className="text-center mb-8 md:mb-12">
          <div className="text-green-700 text-5xl md:text-6xl mb-4 md:mb-6">✈️</div>
          <h1 className="text-3xl md:text-4xl font-autography text-stone-700 mb-4 px-4">
            {texts[language].travel.title}
          </h1>
        </div>        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-6 md:mb-8 border border-stone-200">
          <p className="text-lg md:text-xl leading-relaxed text-center mb-6 md:mb-8 text-stone-700">
            {texts[language].travel.content}
          </p>
        </div>        {/* Hotel Options */}
        <div className="space-y-6 md:space-y-8">
          {/* Primary Hotel - Hilton Garden Inn */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-green-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {language === 'es' ? 'HOTEL PRINCIPAL' : 'PRIMARY HOTEL'}
              </div>
              <div className="text-green-700 text-xl">🚌</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={HiltonImage} 
                  alt="Hilton Garden Inn Mérida"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl text-stone-700 font-semibold">
                  Hilton Garden Inn Mérida
                </h3>
                
                <p className="text-sm md:text-base text-stone-600">
                  {language === 'es' 
                    ? 'Hotel principal con transporte incluido hacia y desde la recepción. Descuento especial para huéspedes de la boda.'
                    : 'Primary hotel with transportation included to and from the reception. Special discount for wedding guests.'
                  }
                </p>
                
                <div className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-green-700">📍</span>
                  <a 
                    href="https://maps.app.goo.gl/jfWT5gqukvfkcwET8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-700 hover:underline"
                  >
                    C. 17 104-108A, Vista Alegre, 97130 Mérida, Yuc., Mexico
                  </a>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium">
                    {language === 'es' 
                      ? '✅ Transporte incluido a la recepción'
                      : '✅ Transportation to reception included'
                    }
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    {language === 'es' 
                      ? '* Aplica tarifa por persona'
                      : '* Fee per person applies'
                    }
                  </p>
                </div>
                
                <button 
                  onClick={() => window.open('https://www.hilton.com/en/hotels/midyugi-hilton-garden-inn-merida/', '_blank')}
                  className="w-full bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-green-800 transition font-medium"
                >
                  {language === 'es' ? 'Ver Detalles' : 'View Details'}
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Hotels */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Holiday Inn */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-stone-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {language === 'es' ? 'OPCIÓN ALTERNATIVA' : 'ALTERNATIVE OPTION'}
                </div>
              </div>
              
              <img 
                src={HolidayImage} 
                alt="Holiday Inn Mérida La Isla"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              
              <div className="space-y-3 flex-grow flex flex-col">
                <h3 className="text-lg md:text-xl text-stone-700 font-semibold">
                  Holiday Inn Mérida La Isla
                </h3>
                
                <p className="text-sm text-stone-600 flex-grow">
                  {language === 'es' 
                    ? 'Excelente ubicación cerca de centros comerciales y restaurantes.'
                    : 'Excellent location near shopping centers and restaurants.'
                  }
                </p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-green-700">📍</span>
                    <a 
                      href="https://maps.app.goo.gl/nFup8sQTWENkTF1G8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-700 hover:underline"
                    >
                      Calle 24 S/N, Temozon Norte, 97305 Mérida, Yuc., Mexico
                    </a>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      {language === 'es' 
                        ? '⚠️ Transporte no incluido'
                        : '⚠️ Transportation not included'
                      }
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => window.open('https://www.ihg.com/holidayinn/hotels/us/en/find-hotels/select-roomrate?qDest=Holiday%20Inn%20%26%20Suites%20Merida%20La%20Isla&qPt=CASH&qCiD=13&qCoD=17&qCiMy=012026&qCoMy=012026&qAdlt=2&qChld=0&qRms=1&qAAR=6CBARC&qSlH=MIDNT&qPm=MIDNT&qAkamaiCC=US&srb_u=1&qExpndSrch=false&qSrt=sBR&qBrs=6c.hi.ex.sb.ul.ic.cp.cw.in.vn.cv.rs.ki.kd.ma.sp.va.sp.re.vx.nd.sx.we.lx.rn.sn.sn.sn.sn.sn.nu.ge&qWch=0&qSmP=0&qRad=30&qRdU=mi&setPMCookies=true&qpMbw=0&qErm=false&qpMn=0&qLoSe=false&qRmFltr=', '_blank')}
                    className="w-full bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-green-800 transition font-medium"
                  >
                    {language === 'es' ? 'Ver Detalles' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>

            {/* City Express Junior */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-stone-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {language === 'es' ? 'OPCIÓN ALTERNATIVA' : 'ALTERNATIVE OPTION'}
                </div>
              </div>
              
              <img 
                src={CityExpressImage} 
                alt="City Express Junior Mérida Altabrisa"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              
              <div className="space-y-3 flex-grow flex flex-col">
                <h3 className="text-lg md:text-xl text-stone-700 font-semibold">
                  City Express Junior Mérida Altabrisa
                </h3>
                
                <p className="text-sm text-stone-600 flex-grow">
                  {language === 'es' 
                    ? 'Opción económica con servicios modernos y cómodos.'
                    : 'Budget-friendly option with modern and comfortable amenities.'
                  }
                </p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-green-700">📍</span>
                    <a 
                      href="https://maps.app.goo.gl/evbHXBLSxZF6pM3s7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-700 hover:underline"
                    >
                      Calle 4 Periférico, entre calles 7 y 9C, Santa Rita Cholul, 97130 Mérida, Yuc., Mexico
                    </a>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      {language === 'es' 
                        ? '⚠️ Transporte no incluido'
                        : '⚠️ Transportation not included'
                      }
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => window.open('https://www.marriott.com/en-us/hotels/midja-city-express-junior-merida-altabrisa/overview/', '_blank')}
                    className="w-full bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-green-800 transition font-medium"
                  >
                    {language === 'es' ? 'Ver Detalles' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Travel Info */}
        <div className="mt-6 md:mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200">
          <h3 className="text-xl md:text-2xl text-stone-700 mb-4 md:mb-6 text-center font-semibold">
            {language === 'es' ? 'Información de Viaje' : 'Travel Information'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h4 className="font-semibold text-stone-700 mb-2">
                {language === 'es' ? 'Por Avión' : 'By Air'}
              </h4>
              <p className="text-sm text-stone-600 mb-3">
                ✈️ {language === 'es' 
                  ? 'Aeropuerto Internacional de Mérida (MID) - 30 min al Hotel Hilton'
                  : 'Mérida International Airport (MID) - 30 min to Hilton Hotel'
                }
              </p>
              <p className="text-sm text-stone-600 mb-2">
                {language === 'es' 
                  ? '🚕 El aeropuerto no permite Uber. Utiliza el servicio de taxi oficial del aeropuerto.'
                  : '🚕 Airport does not allow Uber. Use the official airport taxi service.'
                }
              </p>
              <p className="text-xs text-stone-500">
                💰 {language === 'es' 
                  ? 'Precios desde $20 USD / $400 MXN'
                  : 'Prices starting from $20 USD / $400 MXN'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-stone-700 mb-2">
                {language === 'es' ? 'Transporte a la Boda' : 'Wedding Transportation'}
              </h4>
              <p className="text-sm text-stone-600 mb-3">
                {language === 'es' 
                  ? '🚌 Transporte disponible desde el Hotel Hilton (solo día de la boda)'
                  : '🚌 Transportation available from Hilton Hotel (wedding day only)'
                }
              </p>
              <p className="text-sm text-stone-600 mb-2">
                {language === 'es' 
                  ? '🚗 Si te hospedas en otro hotel, puedes tomar taxi/Uber al Hilton y usar nuestro transporte.'
                  : '🚗 If staying elsewhere, you can take taxi/Uber to Hilton and use our transportation.'
                }
              </p>
              <p className="text-xs text-stone-500">
                💳 {language === 'es' 
                  ? 'Costo por persona: Por confirmar'
                  : 'Cost per person: To be confirmed'
                }
              </p>
            </div>
          </div>
        </div>        {/* Things to Do Section */}
        <div className="text-center mb-8 md:mb-12 mt-8 md:mt-12">
          <div className="text-green-700 text-5xl md:text-6xl mb-4 md:mb-6">🎯</div>
          <h2 className="text-3xl md:text-4xl font-autography text-stone-700 mb-4 md:mb-6">
            {language === 'es' ? 'Qué Hacer en Yucatán' : 'Things to Do in Yucatán'}
          </h2>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Descubre la magia de Yucatán: desde sitios arqueológicos hasta cenotes cristalinos y la deliciosa gastronomía local'
              : 'Discover the magic of Yucatán: from archaeological sites to crystal-clear cenotes and delicious local cuisine'
            }
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="mb-8 md:mb-16">
          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {attractions.map((attraction, idx) => (
              <div key={idx} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border border-stone-200 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-xl"
                   onClick={() => setSelectedAttraction(attraction)}>
                <div className="text-center mb-4">
                  <div className="text-4xl md:text-5xl mb-3">{attraction.icon}</div>
                  <h3 className="text-lg md:text-2xl text-stone-700 mb-2 font-semibold">
                    {language === 'es' ? attraction.name : attraction.nameEn}
                  </h3>
                  <div className="w-8 md:w-12 h-1 bg-green-700 mx-auto mb-3"></div>
                </div>
                
                <p className="text-stone-600 mb-6 text-center leading-relaxed text-sm md:text-base">
                  {language === 'es' ? attraction.description : attraction.descriptionEn}
                </p>
                
                <button className="w-full bg-green-700 text-white py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:bg-green-800 text-sm md:text-base">
                  {language === 'es' ? 'Ver más detalles' : 'See more details'}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll (visible only on mobile) */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {attractions.map((attraction, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-lg border border-stone-200 min-w-[280px] snap-start flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
                     onClick={() => setSelectedAttraction(attraction)}>
                  <div className="text-center mb-3">
                    <div className="text-3xl mb-2">{attraction.icon}</div>
                    <h3 className="text-base text-stone-700 font-semibold leading-tight mb-1">
                      {language === 'es' ? attraction.name : attraction.nameEn}
                    </h3>
                    <div className="w-8 h-0.5 bg-green-700 mx-auto mb-2"></div>
                  </div>
                  
                  <p className="text-stone-600 mb-4 text-center leading-relaxed text-sm line-clamp-2">
                    {language === 'es' ? attraction.description : attraction.descriptionEn}
                  </p>
                  
                  <button className="w-full bg-green-700 text-white py-2 px-3 rounded-lg font-medium text-sm hover:bg-green-800 transition-colors">
                    {language === 'es' ? 'Ver detalles' : 'See details'}
                  </button>
                </div>
              ))}
            </div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mt-3">
              <p className="text-xs text-stone-500 flex items-center gap-1">
                <span>👆</span>
                {language === 'es' ? 'Desliza para ver más' : 'Swipe to see more'}
              </p>
            </div>
          </div>
        </div>

        {/* Updated Suggested Itinerary for Wedding Weekend */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-stone-200">
          <div className="text-center mb-6 md:mb-8">
            <div className="text-green-700 text-4xl md:text-5xl mb-4">📅</div>
            <h3 className="text-2xl md:text-3xl text-stone-700 mb-4 font-semibold">
              {language === 'es' ? 'Itinerario Sugerido para el Fin de Semana de Boda' : 'Suggested Wedding Weekend Itinerary'}
            </h3>
            <div className="w-16 md:w-20 h-1 bg-green-700 mx-auto"></div>
          </div>
          
          {/* Desktop Layout - Original Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Friday */}
            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-stone-200">
              <div className="text-center mb-4">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-base md:text-lg font-bold mx-auto mb-2">
                  V
                </div>
                <h4 className="font-bold text-stone-700 text-base md:text-lg">
                  {language === 'es' ? 'Viernes - Llegada' : 'Friday - Arrival'}
                </h4>
              </div>
              <ul className="text-xs md:text-sm text-stone-600 space-y-2">
                <li>• {language === 'es' ? 'Llegada a Mérida' : 'Arrival in Mérida'}</li>
                <li>• {language === 'es' ? 'Check-in hotel' : 'Hotel check-in'}</li>
                <li>• {language === 'es' ? 'Cena en Centro Histórico' : 'Dinner in Historic Center'}</li>
                <li>• {language === 'es' ? 'Descanso' : 'Rest'}</li>
              </ul>
            </div>

            {/* Saturday */}
            <div className="bg-green-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-green-700">
              <div className="text-center mb-4">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-base md:text-lg font-bold mx-auto mb-2">
                  💒
                </div>
                <h4 className="font-bold text-stone-700 text-base md:text-lg">
                  {language === 'es' ? 'Sábado - ¡BODA!' : 'Saturday - WEDDING!'}
                </h4>
              </div>
              <ul className="text-xs md:text-sm text-stone-600 space-y-2">
                <li>• {language === 'es' ? 'Mañana libre' : 'Free morning'}</li>
                <li>• <strong>4:00 PM - {language === 'es' ? 'Ceremonia' : 'Ceremony'}</strong></li>
                <li>• <strong>6:00 PM - {language === 'es' ? 'Recepción' : 'Reception'}</strong></li>
                <li>• {language === 'es' ? '¡Fiesta!' : 'Party!'}</li>
              </ul>
            </div>

            {/* Sunday */}
            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-stone-200">
              <div className="text-center mb-4">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-base md:text-lg font-bold mx-auto mb-2">
                  🎉
                </div>
                <h4 className="font-bold text-stone-700 text-base md:text-lg">
                  {language === 'es' ? 'Domingo - Torna-Boda' : 'Sunday - Next Day Party'}
                </h4>
              </div>
              <ul className="text-xs md:text-sm text-stone-600 space-y-2">
                <li>• {language === 'es' ? 'Mañana relajada' : 'Relaxed morning'}</li>
                <li>• <strong>1:00 PM - Torna-Boda</strong></li>
                <li>• {language === 'es' ? 'Continúa la celebración' : 'Celebration continues'}</li>
                <li>• {language === 'es' ? 'Despedidas' : 'Farewells'}</li>
              </ul>
            </div>

            {/* Monday */}
            <div className="bg-stone-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-stone-200">
              <div className="text-center mb-4">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-stone-600 text-white rounded-full flex items-center justify-center text-base md:text-lg font-bold mx-auto mb-2">
                  L
                </div>
                <h4 className="font-bold text-stone-700 text-base md:text-lg">
                  {language === 'es' ? 'Lunes - Exploración' : 'Monday - Exploration'}
                </h4>
              </div>
              <ul className="text-xs md:text-sm text-stone-600 space-y-2">
                <li>• {language === 'es' ? 'Tour a Chichen Itzá o Uxmal' : 'Chichen Itza or Uxmal tour'}</li>
                <li>• {language === 'es' ? 'Cenotes o playa' : 'Cenotes or beach'}</li>
                <li>• {language === 'es' ? 'Compras de souvenirs' : 'Souvenir shopping'}</li>
                <li>• {language === 'es' ? 'Preparación para salida' : 'Departure preparation'}</li>
              </ul>
            </div>
          </div>

          {/* Mobile Layout - Compact Timeline */}
          <div className="md:hidden space-y-3">
            {/* Friday */}
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-stone-200">
              <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                V
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-stone-700 text-sm mb-1">
                  {language === 'es' ? 'Viernes - Llegada' : 'Friday - Arrival'}
                </h4>
                <p className="text-xs text-stone-600">
                  {language === 'es' 
                    ? 'Llegada a Mérida, check-in al hotel y primera cena en el Centro Histórico.'
                    : 'Arrival in Mérida, hotel check-in and first dinner in the Historic Center.'
                  }
                </p>
              </div>
            </div>

            {/* Saturday */}
            <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border-2 border-green-700">
              <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                💒
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-stone-700 text-sm mb-1">
                  {language === 'es' ? 'Sábado - ¡BODA!' : 'Saturday - WEDDING!'}
                </h4>
                <p className="text-xs text-stone-600">
                  <strong>4:00 PM {language === 'es' ? 'Ceremonia, 6:00 PM Recepción' : 'Ceremony, 6:00 PM Reception'}</strong> - {language === 'es' ? '¡El gran día!' : 'The big day!'}
                </p>
              </div>
            </div>

            {/* Sunday */}
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-stone-200">
              <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                🎉
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-stone-700 text-sm mb-1">
                  {language === 'es' ? 'Domingo - Torna-Boda' : 'Sunday - Next Day Party'}
                </h4>
                <p className="text-xs text-stone-600">
                  <strong>1:00 PM Torna-Boda</strong> - {language === 'es' ? 'La celebración continúa con más diversión.' : 'The celebration continues with more fun.'}
                </p>
              </div>
            </div>

            {/* Monday */}
            <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-4 border-2 border-stone-200">
              <div className="w-8 h-8 bg-stone-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                L
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-stone-700 text-sm mb-1">
                  {language === 'es' ? 'Lunes - Exploración' : 'Monday - Exploration'}
                </h4>
                <p className="text-xs text-stone-600">
                  {language === 'es' 
                    ? 'Día perfecto para explorar Chichen Itzá, Uxmal o relajarse en cenotes.'
                    : 'Perfect day to explore Chichen Itza, Uxmal or relax at cenotes.'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <p className="text-stone-600 text-xs md:text-sm">
                {language === 'es' 
                  ? '💡 Sugerencia: Muchos huéspedes llegan el jueves y se van el martes para tener más tiempo de explorar'
                  : '💡 Tip: Many guests arrive Thursday and leave Tuesday to have more time to explore'
                }
              </p>
            </div>
          </div>
        </div>        {/* Attraction Details Modal */}
        {selectedAttraction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 md:p-8 border-b border-stone-200">
                <h2 className="text-2xl md:text-3xl font-autography text-stone-700">
                  {language === 'es' ? selectedAttraction.name : selectedAttraction.nameEn}
                </h2>
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <div className="text-center mb-6 md:mb-8">
                  <div className="text-6xl md:text-8xl mb-4">{selectedAttraction.icon}</div>
                  <div className="w-16 md:w-20 h-1 bg-green-700 mx-auto mb-4 md:mb-6"></div>
                  <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
                    {language === 'es' ? selectedAttraction.description : selectedAttraction.descriptionEn}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                  <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-stone-200">
                    <h3 className="text-lg md:text-xl text-stone-700 mb-4 flex items-center gap-2 font-semibold">
                      <span className="text-xl md:text-2xl">✨</span>
                      {language === 'es' ? 'Puntos Destacados' : 'Highlights'}
                    </h3>
                    <ul className="space-y-2">
                      {selectedAttraction.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-stone-600 flex items-start gap-2 text-sm md:text-base">
                          <span className="text-green-700 font-bold">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-stone-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-stone-200">
                    <h3 className="text-lg md:text-xl text-stone-700 mb-4 flex items-center gap-2 font-semibold">
                      <span className="text-xl md:text-2xl">💡</span>
                      {language === 'es' ? 'Consejos Útiles' : 'Useful Tips'}
                    </h3>
                    <ul className="space-y-2">
                      {selectedAttraction.tips.map((tip, idx) => (
                        <li key={idx} className="text-stone-600 flex items-start gap-2 text-sm md:text-base">
                          <span className="text-green-700 font-bold">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-200">
                    <div className="text-xl md:text-2xl mb-2">⏱️</div>
                    <p className="text-stone-700 font-semibold text-sm md:text-base">{selectedAttraction.duration}</p>
                    <p className="text-stone-500 text-xs md:text-sm">{language === 'es' ? 'Duración' : 'Duration'}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-700">
                    <div className="text-xl md:text-2xl mb-2">📍</div>
                    <p className="text-stone-700 font-semibold text-sm md:text-base">{selectedAttraction.distance}</p>
                    <p className="text-stone-500 text-xs md:text-sm">{language === 'es' ? 'Distancia' : 'Distance'}</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-center p-6 md:p-8 border-t border-stone-200">
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {language === 'es' ? 'Cerrar' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
