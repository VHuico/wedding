import React, { useState } from 'react';

export default function FAQ({ language, texts }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = {
    es: [
      {
        question: "¿Cuál es el código de vestimenta?",
        answer: "Elegante casual. Recomendamos vestidos de verano, guayaberas, o trajes ligeros. Ten en cuenta el clima cálido de Yucatán."
      },
      {
        question: "¿Hay transporte desde el hotel?",
        answer: "Proporcionaremos transporte desde los hoteles recomendados hasta el venue. Los detalles se compartirán más cerca de la fecha."
      },
      {
        question: "¿Qué documentos necesito para viajar a México?",
        answer: "Los ciudadanos estadounidenses necesitan pasaporte válido. Otros países pueden requerir visa. Consulta con tu embajada local."
      },
      {
        question: "¿Habrá comida vegetariana/vegana?",
        answer: "¡Sí! Tendremos opciones vegetarianas y veganas. Por favor indica tus restricciones alimentarias en el RSVP."
      },
      {
        question: "¿Puedo traer niños?",
        answer: "Esta será una celebración solo para adultos. Agradecemos tu comprensión."
      },
      {
        question: "¿Cuál es la fecha límite para el RSVP?",
        answer: "Por favor confirma tu asistencia antes del 15 de enero de 2026."
      }
    ],
    en: [
      {
        question: "What is the dress code?",
        answer: "Smart casual. We recommend summer dresses, guayaberas, or light suits. Keep in mind Yucatan's warm climate."
      },
      {
        question: "Is there transportation from the hotel?",
        answer: "We will provide transportation from the recommended hotels to the venue. Details will be shared closer to the date."
      },
      {
        question: "What documents do I need to travel to Mexico?",
        answer: "US citizens need a valid passport. Other countries may require a visa. Check with your local embassy."
      },
      {
        question: "Will there be vegetarian/vegan food?",
        answer: "Yes! We will have vegetarian and vegan options. Please indicate your dietary restrictions in the RSVP."
      },
      {
        question: "Can I bring children?",
        answer: "This will be an adults-only celebration. We appreciate your understanding."
      },
      {
        question: "What is the RSVP deadline?",
        answer: "Please confirm your attendance before January 15th, 2026."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">        <div className="text-center mb-8 md:mb-12">
          <div className="text-pink-400 text-5xl md:text-6xl mb-4 md:mb-6">❓</div>
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
                <span className={`text-pink-400 text-lg md:text-xl transform transition-transform ${
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
          <h3 className="text-xl md:text-2xl font-autography text-stone-700 mb-4">
            {language === 'es' ? '¿Más preguntas?' : 'More questions?'}
          </h3>
          <p className="text-stone-600 mb-4 md:mb-6 px-4">
            {language === 'es' 
              ? 'Si tienes alguna pregunta que no esté aquí, no dudes en contactarnos directamente.'
              : "If you have any questions that aren't here, don't hesitate to contact us directly."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a 
              href="mailto:victor.landy.wedding@gmail.com" 
              className="bg-pink-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-pink-500 transition"
            >
              📧 {language === 'es' ? 'Enviar Email' : 'Send Email'}
            </a>
            <a 
              href="tel:+1234567890" 
              className="bg-stone-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-stone-700 transition"
            >
              📞 {language === 'es' ? 'Llamar' : 'Call Us'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
