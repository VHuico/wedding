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

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">        <div className="text-center mb-12">
          <div className="text-[#757F64] text-6xl mb-6">❓</div>
          <h1 className="text-4xl font-dancing-script text-[#757F64] mb-4">
            {texts[language].faq.title}
          </h1>
          <p className="text-lg text-[#757F64]/80">
            {texts[language].faq.content}
          </p>
        </div>

        <div className="space-y-4">
          {faqs[language].map((faq, index) => (
            <div key={index} className="bg-[#ABB290] rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left hover:bg-[#ABB290]/80 transition flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-[#757F64] pr-4">
                  {faq.question}
                </h3>
                <span className={`text-[#CB7A5C] text-xl transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  ↓
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-[#757F64]/10 pt-4">
                    <p className="text-[#757F64]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-dancing-script text-[#757F64] mb-4">
            {language === 'es' ? '¿Más preguntas?' : 'More questions?'}
          </h3>
          <p className="text-[#757F64]/80 mb-6">
            {language === 'es' 
              ? 'Si tienes alguna pregunta que no esté aquí, no dudes en contactarnos directamente.'
              : "If you have any questions that aren't here, don't hesitate to contact us directly."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:victor.landy.wedding@gmail.com" 
              className="bg-[#CB7A5C] text-white px-6 py-3 rounded-full hover:bg-[#CB7A5C]/80 transition"
            >
              📧 {language === 'es' ? 'Enviar Email' : 'Send Email'}
            </a>
            <a 
              href="tel:+1234567890" 
              className="bg-[#C7CDBF] text-white px-6 py-3 rounded-full hover:bg-[#C7CDBF]/80 transition"
            >
              📞 {language === 'es' ? 'Llamar' : 'Call Us'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
