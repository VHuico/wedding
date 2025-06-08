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
  ];

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-[#f7e1d7] to-[#dedbd2]/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#edafb8] text-6xl mb-6">💕</div>
          <h1 className="text-5xl font-dancing-script text-[#4a5759] mb-6">
            {texts[language].ourStory.title}
          </h1>
          <p className="text-xl text-[#4a5759]/80 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Un viaje de amor que comenzó con una sonrisa y continuará para toda la vida' 
              : 'A love journey that started with a smile and will continue for a lifetime'
            }
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#edafb8] via-[#b0c4b1] to-[#edafb8] rounded-full"></div>
          
          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative flex items-center ${event.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#b0c4b1] rounded-full border-4 border-[#f7e1d7] shadow-lg z-10"></div>
                
                {/* Content */}
                <div className={`w-5/12 ${event.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                  <div className={`bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg border border-[#dedbd2]/30 ${event.side === 'right' ? 'ml-auto' : ''}`}>
                    {/* Image Placeholder */}
                    <div className="w-full h-48 bg-gradient-to-br from-[#edafb8]/20 to-[#b0c4b1]/20 rounded-xl mb-4 flex items-center justify-center border border-[#dedbd2]/20">
                      <span className="text-6xl">📸</span>
                    </div>
                    
                    {/* Date */}
                    <h3 className="text-2xl font-dancing-script text-[#4a5759] mb-2">
                      {event.date}
                    </h3>
                    
                    {/* Title */}
                    <h4 className="text-lg font-semibold text-[#b0c4b1] mb-3">
                      {event.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-[#4a5759]/80 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-20 bg-white/60 backdrop-blur rounded-2xl p-8 border border-[#dedbd2]/30">
          <h3 className="text-2xl font-dancing-script text-[#4a5759] mb-4">
            {language === 'es' ? '¡Y la historia continúa!' : 'And the story continues!'}
          </h3>
          <p className="text-[#4a5759]/80">
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
