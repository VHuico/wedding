import React from "react";
import { useState, useEffect } from "react";

export default function VictorLandyWeddingHome() {
  const [language, setLanguage] = useState("es");
  const [timeLeft, setTimeLeft] = useState({});
  
  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("2026-02-14T00:00:00");
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const texts = {
    es: {
      welcome: "¡Bienvenidos!",
      subtitle: "Un viaje, un destino, un amor",
      intro: "Nos emociona mucho celebrar este momento tan especial con ustedes en Mérida, Yucatán. Esta página contiene toda la información sobre nuestra boda, desde los detalles del evento hasta recomendaciones para disfrutar su visita.\n¡Gracias por ser parte de nuestra historia!",
      countdown: "Faltan",
      days: "días",
      hours: "horas", 
      minutes: "minutos",
      seconds: "segundos",
      nav: [
        "Inicio",
        "Nuestra Historia", 
        "Detalles del Evento",
        "Hospedaje y Viaje",
        "Qué Hacer en Mérida",
        "RSVP",
        "Galería",
        "Preguntas Frecuentes",
      ],
      ourStory: {
        title: "Nuestra Historia",
        content: "Todo comenzó con una sonrisa y una mirada que cambió nuestras vidas para siempre. Después de [años] juntos, decidimos dar el siguiente paso en este hermoso viaje llamado amor."
      },
      eventDetails: {
        title: "Detalles del Evento",
        ceremony: "Ceremonia",
        reception: "Recepción",
        date: "14 de Febrero, 2026",
        time: "5:00 PM",
        venue: "Hacienda [Nombre]",
        location: "Mérida, Yucatán",
        dresscode: "Código de Vestimenta: Elegante Casual"
      },
      travel: {
        title: "Hospedaje y Viaje",
        content: "Hemos reservado habitaciones con descuento en hoteles cercanos al venue. También encontrarás información útil sobre cómo llegar a Mérida."
      },
      thingsToDo: {
        title: "Qué Hacer en Mérida",
        content: "Mérida es una ciudad llena de cultura, historia y gastronomía increíble. Te compartimos nuestras recomendaciones favoritas."
      },
      rsvp: {
        title: "RSVP",
        content: "Por favor confirma tu asistencia antes del 15 de Enero, 2026"
      },
      gallery: {
        title: "Galería",
        content: "Pronto compartiremos fotos de nuestro día especial"
      },
      faq: {
        title: "Preguntas Frecuentes",
        content: "¿Tienes dudas? Aquí encontrarás las respuestas a las preguntas más comunes."
      }
    },
    en: {
      welcome: "Welcome!",
      subtitle: "One journey, one destination, one love",
      intro: "We're so excited to celebrate this special moment with you in Mérida, Yucatán. This website has all the information you'll need — from event details to recommendations to enjoy your stay.\nThank you for being part of our story!",
      countdown: "Time left",
      days: "days",
      hours: "hours",
      minutes: "minutes", 
      seconds: "seconds",
      nav: [
        "Home",
        "Our Story",
        "Event Details",
        "Travel & Lodging",
        "Things to Do",
        "RSVP",
        "Gallery",
        "FAQ",
      ],
      ourStory: {
        title: "Our Story",
        content: "It all started with a smile and a look that changed our lives forever. After [years] together, we decided to take the next step in this beautiful journey called love."
      },
      eventDetails: {
        title: "Event Details",
        ceremony: "Ceremony",
        reception: "Reception", 
        date: "February 14th, 2026",
        time: "5:00 PM",
        venue: "Hacienda [Name]",
        location: "Mérida, Yucatán",
        dresscode: "Dress Code: Smart Casual"
      },
      travel: {
        title: "Travel & Lodging",
        content: "We've reserved discounted rooms at nearby hotels. You'll also find useful information on how to get to Mérida."
      },
      thingsToDo: {
        title: "Things to Do",
        content: "Mérida is a city full of culture, history, and incredible gastronomy. We're sharing our favorite recommendations."
      },
      rsvp: {
        title: "RSVP", 
        content: "Please confirm your attendance before January 15th, 2026"
      },
      gallery: {
        title: "Gallery",
        content: "We'll soon share photos from our special day"
      },
      faq: {
        title: "FAQ",
        content: "Have questions? Here you'll find answers to the most common questions."
      }
    },
  };  return (
    <div className="bg-[#E9E2D8] text-[#757F64] font-sans min-h-screen">
      {/* Header */}
      <header className="p-6 text-center relative">
        <div className="absolute top-0 left-0 text-[#CB7A5C] text-6xl opacity-30">❀</div>
        <div className="absolute top-0 right-0 text-[#C7CDBF] text-6xl opacity-30">❀</div>
        <h1 className="text-5xl font-dancing-script text-[#757F64] mb-2">
          Victor & Landy
        </h1>
        <p className="text-[#757F64]/70 italic">{texts[language].subtitle}</p>
        <button
          onClick={toggleLanguage}
          className="mt-4 px-4 py-2 bg-[#CB7A5C] text-white rounded-full text-sm hover:bg-[#CB7A5C]/80 transition"
        >
          {language === "es" ? "English" : "Español"}
        </button>
      </header>      {/* Navbar */}
      <nav className="sticky top-0 bg-[#E9E2D8]/95 backdrop-blur shadow-md z-50">
        <ul className="flex flex-wrap justify-center gap-4 p-4 text-sm">
          {texts[language].nav.map((label, idx) => (
            <li key={idx} className="hover:text-[#C7CDBF] cursor-pointer transition">
              <a href={`#section${idx}`} className="px-2 py-1 rounded hover:bg-[#C7CDBF]/10">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="section0" className="py-20 px-6 text-center bg-gradient-to-b from-[#ABB290]/20 to-[#E9E2D8]">
        <h2 className="text-4xl font-dancing-script text-[#757F64] mb-6">
          {texts[language].welcome}
        </h2>
        <p className="mt-4 max-w-3xl mx-auto whitespace-pre-line text-lg leading-relaxed">
          {texts[language].intro}
        </p>
        
        {/* Countdown Timer */}
        <div className="mt-12 bg-white/50 backdrop-blur rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
          <h3 className="text-2xl font-dancing-script text-[#757F64] mb-6">
            {texts[language].countdown}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-3xl font-bold text-[#CB7A5C] mb-2">
                  {value || 0}
                </div>
                <div className="text-sm text-[#757F64] uppercase tracking-wider">
                  {texts[language][unit]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Our Story Section */}
      <section id="section1" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#ABB290] rounded-3xl p-8 md:p-12 text-center shadow-lg">
            <div className="text-[#C7CDBF] text-4xl mb-4">💕</div>
            <h2 className="text-3xl font-dancing-script text-[#757F64] mb-6">
              {texts[language].ourStory.title}
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">
              {texts[language].ourStory.content}
            </p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="section2" className="py-16 px-6 bg-[#C7CDBF]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#CB7A5C] text-4xl mb-4">🏛️</div>
            <h2 className="text-3xl font-dancing-script text-[#757F64]">
              {texts[language].eventDetails.title}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <h3 className="text-xl font-dancing-script text-[#757F64] mb-4">
                {texts[language].eventDetails.ceremony}
              </h3>
              <div className="space-y-2 text-[#757F64]">
                <p className="font-semibold">{texts[language].eventDetails.date}</p>
                <p>{texts[language].eventDetails.time}</p>
                <p>{texts[language].eventDetails.venue}</p>
                <p className="text-sm text-[#757F64]/70">{texts[language].eventDetails.location}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <h3 className="text-xl font-dancing-script text-[#757F64] mb-4">
                {texts[language].eventDetails.reception}
              </h3>
              <div className="space-y-2 text-[#757F64]">
                <p className="font-semibold">Immediately Following</p>
                <p>Same Venue</p>
                <p className="text-sm mt-4 p-3 bg-[#ABB290]/20 rounded-lg">
                  {texts[language].eventDetails.dresscode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Travel & Lodging Section */}
      <section id="section3" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#C7CDBF] text-4xl mb-4">✈️</div>
          <h2 className="text-3xl font-dancing-script text-[#757F64] mb-6">
            {texts[language].travel.title}
          </h2>
          <div className="bg-[#ABB290] rounded-2xl p-8 shadow-lg">
            <p className="text-lg mb-6">{texts[language].travel.content}</p>
            <button className="bg-[#CB7A5C] text-white px-6 py-3 rounded-full hover:bg-[#CB7A5C]/80 transition">
              Ver Opciones de Hospedaje
            </button>
          </div>
        </div>
      </section>

      {/* Things to Do Section */}
      <section id="section4" className="py-16 px-6 bg-[#ABB290]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#CB7A5C] text-4xl mb-4">🏛️</div>
          <h2 className="text-3xl font-dancing-script text-[#757F64] mb-6">
            {texts[language].thingsToDo.title}
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-lg mb-6">{texts[language].thingsToDo.content}</p>
            <button className="bg-[#C7CDBF] text-white px-6 py-3 rounded-full hover:bg-[#C7CDBF]/80 transition">
              Explorar Mérida
            </button>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="section5" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#CB7A5C] text-4xl mb-4">💌</div>
          <h2 className="text-3xl font-dancing-script text-[#757F64] mb-6">
            {texts[language].rsvp.title}
          </h2>
          <div className="bg-[#ABB290] rounded-2xl p-8 shadow-lg">
            <p className="text-lg mb-6">{texts[language].rsvp.content}</p>
            <button className="bg-[#CB7A5C] text-white px-8 py-4 rounded-full text-lg hover:bg-[#CB7A5C]/80 transition transform hover:scale-105">
              Confirmar Asistencia
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="section6" className="py-16 px-6 bg-[#C7CDBF]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#C7CDBF] text-4xl mb-4">📸</div>
          <h2 className="text-3xl font-dancing-script text-[#757F64] mb-6">
            {texts[language].gallery.title}
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-lg">{texts[language].gallery.content}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="section7" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#757F64] text-4xl mb-4">❓</div>
          <h2 className="text-3xl font-dancing-script text-[#757F64] mb-6">
            {texts[language].faq.title}
          </h2>
          <div className="bg-[#ABB290] rounded-2xl p-8 shadow-lg">
            <p className="text-lg">{texts[language].faq.content}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#757F64] text-[#E9E2D8] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-dancing-script mb-4">Victor & Landy</h3>
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={toggleLanguage}
                className="text-[#ABB290] hover:text-white transition"
              >
                {language === "es" ? "English" : "Español"}
              </button>
            </div>
          </div>
          <div className="border-t border-[#E9E2D8]/20 pt-6">
            <p className="text-sm opacity-70">
              Hecho con amor por Victor & Landy • Mérida, Yucatán • 14 de Febrero, 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
