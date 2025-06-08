import React from 'react';

export default function OurStory({ language, texts }) {
  const timelineEvents = [
    {
      date: language === 'es' ? 'Marzo 2018' : 'March 2018',
      title: language === 'es' ? 'Nuestro Primer Encuentro' : 'Our First Meeting',
      description: language === 'es' ? 'Fue amor a primera vista en aquella cafetería universitaria' : 'It was love at first sight in that university café',
      side: 'left'
    },
    {
      date: language === 'es' ? 'Julio 2018' : 'July 2018',
      title: language === 'es' ? 'Primera Cita Oficial' : 'Our First Official Date',
      description: language === 'es' ? 'Una cena romántica que cambió nuestras vidas para siempre' : 'A romantic dinner that changed our lives forever',
      side: 'right'
    },
    {
      date: language === 'es' ? 'Diciembre 2018' : 'December 2018',
      title: language === 'es' ? 'Oficialmente Novios' : 'Officially a Couple',
      description: language === 'es' ? 'El momento en que decidimos estar juntos para siempre' : 'The moment we decided to be together forever',
      side: 'left'
    },
    {
      date: language === 'es' ? 'Junio 2019' : 'June 2019',
      title: language === 'es' ? 'Nuestro Primer Viaje' : 'Our First Trip Together',
      description: language === 'es' ? 'Descubriendo el mundo juntos en las playas de Cancún' : 'Discovering the world together on the beaches of Cancún',
      side: 'right'
    },
    {
      date: language === 'es' ? 'Enero 2020' : 'January 2020',
      title: language === 'es' ? 'Viviendo Juntos' : 'Moving in Together',
      description: language === 'es' ? 'Comenzamos nuestra vida en común en nuestro primer hogar' : 'We started our life together in our first home',
      side: 'left'
    },
    {
      date: language === 'es' ? 'Agosto 2020' : 'August 2020',
      title: language === 'es' ? 'Adoptamos a Luna' : 'We Adopted Luna',
      description: language === 'es' ? 'Nuestra primera "hija" peluda se unió a la familia' : 'Our first furry "daughter" joined the family',
      side: 'right'
    },
    {
      date: language === 'es' ? 'Febrero 2021' : 'February 2021',
      title: language === 'es' ? 'Conociendo Mérida' : 'Discovering Mérida',
      description: language === 'es' ? 'Nos enamoramos de esta hermosa ciudad yucateca' : 'We fell in love with this beautiful Yucatecan city',
      side: 'left'
    },
    {
      date: language === 'es' ? 'Septiembre 2022' : 'September 2022',
      title: language === 'es' ? 'Graduación' : 'Graduation',
      description: language === 'es' ? 'Celebramos nuestros logros académicos juntos' : 'We celebrated our academic achievements together',
      side: 'right'
    },
    {
      date: language === 'es' ? 'Marzo 2023' : 'March 2023',
      title: language === 'es' ? 'Nuevos Trabajos' : 'New Jobs',
      description: language === 'es' ? 'Comenzamos nuestras carreras profesionales' : 'We started our professional careers',
      side: 'left'
    },
    {
      date: language === 'es' ? 'Octubre 2023' : 'October 2023',
      title: language === 'es' ? 'Aniversario de 5 Años' : '5 Year Anniversary',
      description: language === 'es' ? 'Celebrando medio década de amor incondicional' : 'Celebrating half a decade of unconditional love',
      side: 'right'
    },
    {
      date: language === 'es' ? 'Abril 2024' : 'April 2024',
      title: language === 'es' ? 'La Propuesta' : 'The Proposal',
      description: language === 'es' ? 'El momento más mágico de nuestras vidas en Mérida' : 'The most magical moment of our lives in Mérida',
      side: 'left'
    },
    {
      date: language === 'es' ? 'Febrero 2026' : 'February 2026',
      title: language === 'es' ? '¡Nuestra Boda!' : 'Our Wedding!',
      description: language === 'es' ? 'El día que oficializaremos nuestro amor eterno' : 'The day we make our eternal love official',
      side: 'right'
    }
  ];  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">{/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-pink-400 text-5xl md:text-6xl mb-4 md:mb-6">💕</div>
          <h1 className="text-3xl md:text-5xl font-autography text-stone-700 mb-4 md:mb-6 px-4">
            {texts[language].ourStory.title}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto px-4">
            {language === 'es' 
              ? 'Un viaje de amor que comenzó con una sonrisa y continuará para toda la vida' 
              : 'A love journey that started with a smile and will continue for a lifetime'
            }
          </p>
        </div>{/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-pink-400 rounded-full"></div>
          
          {/* Mobile Timeline Line - Left aligned */}
          <div className="md:hidden absolute left-6 top-0 w-1 h-full bg-pink-400 rounded-full"></div>
          
          {/* Timeline Events */}
          <div className="space-y-8 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative ${
                // Mobile: all items left-aligned, Desktop: alternating sides
                'md:flex md:items-center ' + (event.side === 'left' ? 'md:justify-start' : 'md:justify-end')
              }`}>
                {/* Timeline Dot */}
                <div className={`absolute w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg z-10 ${
                  // Mobile: positioned at left line, Desktop: centered
                  'left-3 md:left-1/2 md:transform md:-translate-x-1/2'
                }`}></div>
                
                {/* Content */}
                <div className={`${
                  // Mobile: full width with left padding, Desktop: half width with side-specific padding
                  'ml-12 md:ml-0 md:w-5/12 ' + (event.side === 'left' ? 'md:pr-8' : 'md:pl-8')
                }`}>
                  <div className={`bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-stone-200 ${
                    event.side === 'right' ? 'md:ml-auto' : ''
                  }`}>
                    {/* Image Placeholder */}
                    <div className="w-full h-32 md:h-48 bg-stone-50 rounded-xl mb-4 flex items-center justify-center border border-stone-200">
                      <span className="text-4xl md:text-6xl">📸</span>
                    </div>
                    
                    {/* Date */}
                    <h3 className="text-xl md:text-2xl font-autography text-stone-700 mb-2">
                      {event.date}
                    </h3>
                    
                    {/* Title */}
                    <h4 className="text-base md:text-lg font-semibold text-pink-400 mb-3">
                      {event.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>        {/* Bottom Message */}
        <div className="text-center mt-12 md:mt-20 bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-lg mx-4 md:mx-0">
          <h3 className="text-xl md:text-2xl font-autography text-stone-700 mb-4">
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
