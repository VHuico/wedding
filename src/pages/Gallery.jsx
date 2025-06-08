import React from 'react';

export default function Gallery({ language, texts }) {
  return (    <div className="min-h-screen py-16 px-6 bg-[#C7CDBF]/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#C7CDBF] text-6xl mb-6">📸</div>
          <h1 className="text-4xl font-dancing-script text-[#757F64] mb-4">
            {texts[language].gallery.title}
          </h1>
          <p className="text-lg text-[#757F64]/80">
            {texts[language].gallery.content}
          </p>
        </div>

        {/* Photo Grid Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(12)].map((_, idx) => (
            <div 
              key={idx} 
              className="aspect-square bg-white/50 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition"
            >
              <span className="text-[#757F64]/30 text-2xl">📷</span>
            </div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="text-[#CB7A5C] text-4xl mb-4">💖</div>
          <h3 className="text-2xl font-dancing-script text-[#757F64] mb-4">
            {language === 'es' ? 'Pronto...' : 'Coming Soon...'}
          </h3>
          <p className="text-[#757F64]/80 mb-6">
            {language === 'es' 
              ? 'Después de nuestra boda, compartiremos aquí todas las fotos hermosas de nuestro día especial. ¡Mantente atento!'
              : 'After our wedding, we will share all the beautiful photos from our special day here. Stay tuned!'
            }
          </p>
          
          {/* Photo Upload Section */}
          <div className="border-t border-[#757F64]/10 pt-6">
            <h4 className="font-semibold text-[#757F64] mb-3">
              {language === 'es' ? '¿Tomaste fotos?' : 'Did you take photos?'}
            </h4>
            <p className="text-sm text-[#757F64]/70 mb-4">
              {language === 'es' 
                ? 'Comparte tus fotos con nosotros y las agregaremos a la galería.'
                : 'Share your photos with us and we will add them to the gallery.'
              }
            </p>
            <button className="bg-[#C7CDBF] text-white px-6 py-3 rounded-full hover:bg-[#C7CDBF]/80 transition">
              {language === 'es' ? 'Subir Fotos' : 'Upload Photos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
