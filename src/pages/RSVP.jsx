import React, { useState } from 'react';

export default function RSVP({ language, texts }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form data:', formData);
    alert(language === 'es' 
      ? '¡Gracias por tu confirmación! Te contactaremos pronto.' 
      : 'Thank you for your confirmation! We will contact you soon.'
    );
  };
  return (
    <div className="min-h-screen py-16 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">        <div className="text-center mb-12">
          <div className="text-pink-400 text-6xl mb-6">💌</div>
          <h1 className="text-4xl font-autography text-stone-700 mb-4">
            {texts[language].rsvp.title}
          </h1>
          <p className="text-lg text-stone-600">
            {texts[language].rsvp.content}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-200">          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-stone-700 font-semibold mb-2">
                {language === 'es' ? 'Nombre Completo *' : 'Full Name *'}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-pink-400 focus:outline-none bg-stone-50 focus:bg-white transition-colors"
                placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-2">
                {language === 'es' ? 'Correo Electrónico *' : 'Email Address *'}
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-pink-400 focus:outline-none bg-stone-50 focus:bg-white transition-colors"
                placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-2">
                {language === 'es' ? '¿Podrás acompañarnos? *' : 'Will you be able to join us? *'}
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={handleChange}
                    className="mr-3 text-pink-400"
                  />
                  <span className="text-stone-600">{language === 'es' ? '¡Sí, estaré ahí!' : 'Yes, I will be there!'}</span>
                </label>
                <label className="flex items-center p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={handleChange}
                    className="mr-3 text-pink-400"
                  />
                  <span className="text-stone-600">{language === 'es' ? 'No podré asistir' : 'I cannot attend'}</span>
                </label>
              </div>
            </div>            {formData.attendance === 'yes' && (
              <>
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">
                    {language === 'es' ? 'Número de invitados' : 'Number of guests'}
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-pink-400 focus:outline-none bg-stone-50 focus:bg-white transition-colors"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-2">
                    {language === 'es' ? 'Restricciones alimentarias' : 'Dietary restrictions'}
                  </label>
                  <textarea
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-pink-400 focus:outline-none bg-stone-50 focus:bg-white transition-colors resize-none"
                    placeholder={language === 'es' 
                      ? 'Vegetariano, vegano, alergias, etc.' 
                      : 'Vegetarian, vegan, allergies, etc.'
                    }
                  />
                </div>
              </>
            )}            <div>
              <label className="block text-stone-700 font-semibold mb-2">
                {language === 'es' ? 'Mensaje para los novios' : 'Message for the couple'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded-xl border border-stone-200 focus:border-pink-400 focus:outline-none bg-stone-50 focus:bg-white transition-colors resize-none"
                placeholder={language === 'es' 
                  ? 'Deja un mensaje especial...' 
                  : 'Leave a special message...'
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-400 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {language === 'es' ? 'Enviar Confirmación' : 'Send Confirmation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
