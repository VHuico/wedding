import React from 'react';

export default function OurStory({ language, texts }) {
  const timelineEvents = [
    {
      date: '15 de Marzo, 2019',
      title: language === 'es' ? 'Nuestra Historia Comienza' : 'Our Story Begins',
      description: language === 'es' ? 'Landy confiesa su amor con un "No puedo dejar de pensar en ti."' : 'Landy confesses her love with "I can\'t stop thinking about you."',
      side: 'left',
      image: require('../assets/photos/NuestraHistoria/1-LandyConfiesaSuAmor.jpeg')
    },
    {
      date: '18 de Septiembre, 2019',
      title: language === 'es' ? 'Oficialmente Novios' : 'Officially Dating',
      description: language === 'es' ? '"¿Quieres ser mi novia?"' : '"Will you be my girlfriend?"',
      side: 'right',
      image: require('../assets/photos/NuestraHistoria/2-QuieresSerMiNovia.jpeg')
    },
    {
      date: '21 de Marzo, 2020',
      title: language === 'es' ? 'COVID-19' : 'COVID-19',
      description: language === 'es' ? 'Sobrevivimos una pandemia' : 'We survived a pandemic',
      side: 'left',
      image: require('../assets/photos/NuestraHistoria/3-SobrevivimosUnaPandemia.jpeg')
    },
    {
      date: '15 de Mayo, 2021',
      title: language === 'es' ? 'Graduaciones' : 'Graduations',
      description: language === 'es' ? 'Graduación del MBA & B.S. Computer Science' : 'MBA & B.S. Computer Science Graduation',
      side: 'right',
      image: require('../assets/photos/NuestraHistoria/4-Graduacion.jpeg')
    },
    {
      date: '15 de Julio, 2021',
      title: language === 'es' ? 'Primer Viaje Juntos' : 'First Trip Together',
      description: language === 'es' ? 'Explorando Guadalajara, Cancún y Mérida' : 'Exploring Guadalajara, Cancún and Mérida',
      side: 'left',
      image: require('../assets/photos/NuestraHistoria/5-PrimerViajeJuntos.jpeg')
    },
    {
      date: '1 de Agosto, 2022',
      title: language === 'es' ? 'Viviendo Juntos' : 'Living Together',
      description: language === 'es' ? 'Casita en El Paso juntos' : 'Little house in El Paso together',
      side: 'right',
      image: require('../assets/photos/NuestraHistoria/6-Mudanza.jpeg')
    },
    {
      date: 'Noviembre 2023',
      title: language === 'es' ? 'Viaje Juntos #12' : '12th Trip Together',
      description: language === 'es' ? 'Conociendo Finlandia, Noruega y Estonia' : 'Discovering Finland, Norway and Estonia',
      side: 'left',
      image: require('../assets/photos/NuestraHistoria/7-DoceavoViajeJuntos.jpeg')
    },
    {
      date: '23 de Febrero, 2024',
      title: language === 'es' ? 'La Propuesta' : 'The Proposal',
      description: 'She said "Yes!"',
      side: 'right',
      image: require('../assets/photos/NuestraHistoria/8-SheSaidYes.jpeg')
    },
    {
      date: 'Marzo 2024',
      title: language === 'es' ? 'Primer Mascota Juntos' : 'First Pet Together',
      description: language === 'es' ? 'Adoptamos al queridísimo Loki' : 'We adopted our beloved Loki',
      side: 'left',
      image: require('../assets/photos/NuestraHistoria/9-Loki.jpeg')
    },
    {
      date: '12 de Abril, 2024',
      title: language === 'es' ? 'Haciéndolo Oficial' : 'Making it Official',
      description: language === 'es' ? 'Boda civil!' : 'Civil wedding!',
      side: 'right',
      image: require('../assets/photos/NuestraHistoria/10-BodaCivil.jpeg')
    },
    // {
    //   date: language === 'es' ? 'Abril 2024' : 'April 2024',
    //   title: language === 'es' ? 'La Propuesta' : 'The Proposal',
    //   description: language === 'es' ? 'El momento más mágico de nuestras vidas en Mérida' : 'The most magical moment of our lives in Mérida',
    //   side: 'left'
    // },
    // {
    //   date: language === 'es' ? 'Febrero 2026' : 'February 2026',
    //   title: language === 'es' ? '¡Nuestra Boda!' : 'Our Wedding!',
    //   description: language === 'es' ? 'El día que oficializaremos nuestro amor eterno' : 'The day we make our eternal love official',
    //   side: 'right'
    // }
  ];  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-olive-700 text-5xl md:text-6xl mb-4 md:mb-6">💕</div>
          <h1 className="text-3xl md:text-5xl font-autography text-stone-700 mb-4 md:mb-6 px-4">
            {texts[language].ourStory.title}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto px-4">
            {language === 'es' 
              ? 'Un viaje de amor que comenzó con una sonrisa y continuará para toda la vida' 
              : 'A love journey that started with a smile and will continue for a lifetime'
            }
          </p>
        </div>        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-olive-700 rounded-full"></div>
          
          {/* Mobile Timeline Line - Left aligned */}
          <div className="md:hidden absolute left-6 top-0 w-1 h-full bg-olive-700 rounded-full"></div>
          
          {/* Timeline Events */}
          <div className="space-y-8 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative ${
                // Mobile: all items left-aligned, Desktop: alternating sides
                'md:flex md:items-center ' + (event.side === 'left' ? 'md:justify-start' : 'md:justify-end')
              }`}>
                {/* Timeline Dot */}
                <div className={`absolute w-6 h-6 bg-olive-700 rounded-full border-4 border-white shadow-lg z-10 ${
                  // Mobile: positioned at left line center, Desktop: centered
                  'left-3.5 md:left-1/2 md:transform md:-translate-x-1/2'
                }`}></div>
                
                {/* Content */}
                <div className={`${
                  // Mobile: full width with left padding, Desktop: half width with side-specific padding
                  'ml-12 md:ml-0 md:w-5/12 ' + (event.side === 'left' ? 'md:pr-8' : 'md:pl-8')
                }`}>
                  <div className={`bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-stone-200 ${
                    event.side === 'right' ? 'md:ml-auto' : ''
                  }`}>
                    {/* Image and Text Side by Side Layout - Works on all screen sizes */}
                    <div className="flex flex-row gap-3 sm:gap-4">
                      {/* Image Container - Left side */}
                      <div className="flex justify-start flex-shrink-0">
                        {event.image ? (
                          <div className="w-20 h-32 xs:w-24 xs:h-40 sm:w-28 sm:h-44 md:w-32 md:h-52 bg-stone-50 rounded-lg sm:rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-32 xs:w-24 xs:h-40 sm:w-28 sm:h-44 md:w-32 md:h-52 bg-stone-50 rounded-lg sm:rounded-xl border border-stone-200 flex items-center justify-center">
                            <span className="text-lg xs:text-xl sm:text-2xl">📸</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Text Content - Right side */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        {/* Date */}
                        <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-stone-700 mb-1 sm:mb-2 font-semibold leading-tight">
                          {event.date}
                        </h3>
                        
                        {/* Title */}
                        <h4 className="text-xs xs:text-sm sm:text-base md:text-lg font-semibold text-olive-700 mb-1 sm:mb-2 md:mb-3 leading-tight">
                          {event.title}
                        </h4>
                        
                        {/* Description */}
                        <p className="text-xs xs:text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>        {/* Bottom Message */}
        <div className="text-center mt-12 md:mt-20 bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-lg mx-4 md:mx-0">
          <h3 className="text-xl md:text-2xl text-stone-700 mb-4 font-semibold">
            {language === 'es' ? '¡Y la historia continúa!' : 'And the story continues!'}
          </h3>
          <p className="text-sm md:text-base text-stone-600">
            {language === 'es' 
              ? 'Cada día escribimos nuevas páginas de nuestra historia de amor, y no podemos esperar a compartir el próximo capítulo contigo en Mérida.' 
              : 'Every day we write new pages of our love story, and we can\'t wait to share the next chapter with you in Mérida.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
