import React, { useState } from 'react';

export default function FAQ({ language, texts }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = {
    es: [
      {
        question: "¿Cuál es el código de vestimenta?",
        answer: "Para la ceremonia religiosa y recepción, el código de vestimenta es formal. Las damas pueden usar vestidos largos, y los caballeros traje formal con corbata. Para la torna boda (after party), el código cambia a casual para que puedan estar más cómodos y disfrutar de la fiesta. Recuerden que estaremos en Yucatán, así que recomendamos telas ligeras y transpirables."
      },
      {
        question: "¿Cuál es la fecha límite de RSVP?",
        answer: "Por favor confirmen su asistencia antes del 15 de enero de 2026. Esto nos ayudará enormemente a coordinar todos los detalles finales como catering, transporte y asientos. ¡Esperamos contar con su presencia en nuestro día especial!"
      },
      {
        question: "¿A qué hora tengo que llegar a la ceremonia?",
        answer: "Les pedimos llegar 15 minutos antes del inicio de la ceremonia religiosa (3:45 PM para una ceremonia a las 4:00 PM). Para la recepción, pueden llegar puntualmente a las 6:00 PM. Esto nos permitirá comenzar todo a tiempo y asegurar que no se pierdan ningún momento especial."
      },
      {
        question: "¿Puedo llevar a un plus one?",
        answer: "En la sección de RSVP de nuestra página web podrán ver exactamente cuántas personas están incluidas en su invitación. Por favor revisen su invitación personalizada y respetar el número de invitados que pueden llevar."
      },
      {
        question: "¿Qué hacer si soy vegano/vegetariano?",
        answer: "¡Por supuesto que tendremos opciones deliciosas para nuestros invitados veganos y vegetarianos! Habrá un menú especial disponible sin costo adicional. Solo necesitamos que nos lo hagan saber con anticipación contactando a nuestra wedding planner Soffie Yañez (teléfono: +52 999 412 0207) o a nosotros directamente para coordinar sus necesidades dietéticas."
      },
      {
        question: "¿Están bienvenidos los niños?",
        answer: "Hemos decidido que nuestra boda sea una celebración solo para adultos. Sabemos que esto puede requerir arreglos especiales para el cuidado de los niños, y agradecemos mucho su comprensión. ¡Esperamos que puedan disfrutar de una noche de celebración con nosotros!"
      },
      {
        question: "¿Hay estacionamiento disponible?",
        answer: "Sí, habrá estacionamiento gratuito disponible en los tres venues: la iglesia para la ceremonia, el lugar de la recepción, y el venue de la torna boda. Tendremos personal de apoyo para ayudar a dirigir el tráfico y asegurar que todos encuentren un lugar seguro para estacionar."
      },
      {
        question: "¿Ofrecen transporte?",
        answer: "Sí, ofreceremos servicio de transporte desde y hacia el hotel sede el día de la boda. Habrá autobuses que los llevarán de manera segura entre los diferentes venues y de regreso al hotel al final de la noche. El costo por persona está aún por definirse, pero les compartiremos todos los detalles próximamente."
      }
    ],
    en: [
      {
        question: "What is the dress code?",
        answer: "For the religious ceremony and reception, the dress code is formal. Ladies can wear long dresses, and gentlemen should wear formal suits with ties. For the after-party, the dress code changes to casual so you can be more comfortable and enjoy the celebration. Remember we'll be in Yucatan, so we recommend light, breathable fabrics."
      },
      {
        question: "What is the RSVP deadline?",
        answer: "Please confirm your attendance before January 15th, 2026. This will help us tremendously in coordinating all the final details such as catering, transportation, and seating arrangements. We're looking forward to celebrating our special day with you!"
      },
      {
        question: "What time should I arrive?",
        answer: "We ask that you arrive 15 minutes before the religious ceremony begins (3:45 PM for a 4:00 PM ceremony). For the reception, you can arrive promptly at 6:00 PM. This will allow us to start everything on time and ensure you don't miss any special moments."
      },
      {
        question: "Can I bring a plus one?",
        answer: "In the RSVP section of our website, you'll be able to see exactly how many people are included in your invitation. Please check your personalized invitation and respect the number of guests indicated."
      },
      {
        question: "What if I'm vegan/vegetarian?",
        answer: "Of course we'll have delicious options for our vegan and vegetarian guests! There will be a special menu available at no additional cost. We just need you to let us know in advance by contacting our wedding planner Soffie Yañez (phone: +52 999 412 0207) or us directly to coordinate your dietary needs."
      },
      {
        question: "Are children welcome?",
        answer: "We've decided to make our wedding an adults-only celebration. We know this may require special childcare arrangements, and we greatly appreciate your understanding. We hope you can enjoy a night of celebration with us!"
      },
      {
        question: "Is there parking available?",
        answer: "Yes, there will be free parking available at all three venues: the church for the ceremony, the reception location, and the after-party venue. We'll have support staff to help direct traffic and ensure everyone finds a safe place to park."
      },
      {
        question: "Do you offer transportation?",
        answer: "Yes, we'll offer transportation service to and from the host hotel on the wedding day. There will be buses that will safely take you between the different venues and back to the hotel at the end of the night. The cost per person is yet to be determined, but we'll share all the details with you soon."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">        <div className="text-center mb-8 md:mb-12">
          <div className="text-olive-700 text-5xl md:text-6xl mb-4 md:mb-6">❓</div>
          <h1 className="text-3xl md:text-4xl font-autography text-stone-700 mb-4 px-4">
            {texts[language].faq.title}
          </h1>
          <p className="text-lg text-stone-600 px-4">
            {texts[language].faq.content}
          </p>
        </div>        <div className="space-y-3 md:space-y-4">
          {faqs[language].map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 md:p-6 text-left hover:bg-stone-50 transition flex justify-between items-center"
              >
                <h3 className="text-base md:text-lg font-semibold text-stone-700 pr-4">
                  {faq.question}
                </h3>
                <span className={`text-olive-700 text-lg md:text-xl transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  ↓
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="border-t border-stone-200 pt-4">
                    <p className="text-stone-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>        {/* Contact Section */}
        <div className="mt-8 md:mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-lg text-center border border-stone-200">
          <h3 className="text-xl md:text-2xl text-stone-700 mb-4 font-semibold">
            {language === 'es' ? '¿Más preguntas?' : 'More questions?'}
          </h3>
          <p className="text-stone-600 mb-3 px-4">
            {language === 'es' 
              ? 'Si tienes alguna pregunta que no esté aquí, no dudes en contactar a nuestra wedding planner.'
              : "If you have any questions that aren't here, don't hesitate to contact our wedding planner."
            }
          </p>
          <p className="text-stone-700 font-medium mb-6">
            {language === 'es' 
              ? 'Soffie Yañez de Boda Mía MX'
              : 'Soffie Yañez from Boda Mía MX'
            }
          </p>
          <div className="flex justify-center">
            <a 
              href="https://wa.me/529994120207?text=Hola%20Soffie,%20tengo%20una%20pregunta%20sobre%20la%20boda%20de%20Victor%20y%20Landy" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-olive-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-olive-800 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <span className="text-lg">📞</span>
              {language === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
