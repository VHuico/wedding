import React, { useState } from 'react';

export default function Registry({ language, texts }) {
  const [copiedField, setCopiedField] = useState(null);

  // Copy to clipboard function
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-olive-700 text-6xl mb-6">💝</div>
          <h1 className="text-4xl font-autography text-stone-700 mb-4">
            {language === 'es' ? 'Lista de Regalos' : 'Gift Registry'}
          </h1>
          <h2 className="text-2xl text-stone-600 mb-6">
            {language === 'es' ? 'Celebrando Juntos Este Momento Especial' : 'Celebrating Together This Special Moment'}
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'es' 
              ? 'Tener a nuestros seres queridos celebrando con nosotros ya es más de lo que podríamos soñar. Si desean honrarnos con un regalo, hemos puesto a disposición estas opciones que nos ayudarían a comenzar nuestra nueva aventura como esposos. Su amor y apoyo son lo que realmente importa.' 
              : 'Having our loved ones celebrate with us is already more than we could dream of. If you wish to honor us with a gift, we\'ve made these options available that would help us start our new adventure as husband and wife. Your love and support are what truly matter.'
            }
          </p>
        </div>

        {/* Banking Options */}
        <div className="space-y-8">
          {/* US Payment Options */}
          <div className="bg-white rounded-3xl p-4 md:p-8 shadow-lg border border-stone-200 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="bg-blue-100 px-3 py-4 md:px-4 md:py-5 rounded-2xl flex-shrink-0 self-center md:self-start flex items-center justify-center">
                <div className="text-3xl md:text-4xl">🇺🇸</div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-stone-700">
                    {language === 'es' ? 'Opciones de Estados Unidos' : 'United States Options'}
                  </h3>
                </div>
                
                <p className="text-stone-600 mb-6 text-center md:text-left text-sm md:text-base">
                  {language === 'es' 
                    ? 'Transferencias instantáneas y seguras. Ideal para familiares y amigos en Estados Unidos.'
                    : 'Instant and secure transfers. Ideal for family and friends in the United States.'
                  }
                </p>

                {/* Zelle Option */}
                <div className="mb-6 bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-200">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4 text-center md:text-left">
                    <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold self-center md:self-start">
                      Zelle
                    </div>
                    <h4 className="text-base md:text-lg font-semibold text-stone-700">
                      {language === 'es' ? 'Transferencia Bancaria' : 'Bank Transfer'}
                    </h4>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div className="bg-white rounded-xl p-3 md:p-4 border border-stone-200">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <div className="text-center md:text-left">
                          <p className="text-sm font-medium text-stone-700 mb-1">
                            {language === 'es' ? 'Número de Teléfono' : 'Phone Number'}
                          </p>
                          <p className="text-base md:text-lg font-mono text-stone-800">(737) 333-0615</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard('7373330615', 'zellePhone')}
                          className="bg-olive-700 hover:bg-olive-800 text-white p-2 rounded-lg transition-colors self-center md:self-start"
                          title={language === 'es' ? 'Copiar' : 'Copy'}
                        >
                          {copiedField === 'zellePhone' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-3 md:p-4 border border-stone-200">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <div className="text-center md:text-left">
                          <p className="text-sm font-medium text-stone-700 mb-1">
                            {language === 'es' ? 'Nombre del Destinatario' : 'Recipient Name'}
                          </p>
                          <p className="text-base md:text-lg font-mono text-stone-800 break-words">Victor Huicochea Solorzano</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard('Victor Huicochea Solorzano', 'zelleName')}
                          className="bg-olive-700 hover:bg-olive-800 text-white p-2 rounded-lg transition-colors self-center md:self-start"
                          title={language === 'es' ? 'Copiar' : 'Copy'}
                        >
                          {copiedField === 'zelleName' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venmo Option */}
                <div className="bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-200">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4 text-center md:text-left">
                    <div className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold self-center md:self-start">
                      Venmo
                    </div>
                    <h4 className="text-base md:text-lg font-semibold text-stone-700">
                      {language === 'es' ? 'Pago Digital' : 'Digital Payment'}
                    </h4>
                  </div>

                  <div className="bg-white rounded-xl p-3 md:p-4 border border-stone-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <div className="text-center md:text-left">
                        <p className="text-sm font-medium text-stone-700 mb-1">
                          {language === 'es' ? 'Usuario de Venmo' : 'Venmo Username'}
                        </p>
                        <p className="text-base md:text-lg font-mono text-stone-800">@Huico</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('@Huico', 'venmo')}
                        className="bg-olive-700 hover:bg-olive-800 text-white p-2 rounded-lg transition-colors self-center md:self-start"
                        title={language === 'es' ? 'Copiar' : 'Copy'}
                      >
                        {copiedField === 'venmo' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs md:text-sm text-blue-800">
                      {language === 'es' 
                        ? 'Solo disponible para bancos en Estados Unidos. Las transferencias son instantáneas y sin costo.' 
                        : 'Available for US banks only. Transfers are instant and free of charge.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mexican Bank Account */}
          <div className="bg-white rounded-3xl p-4 md:p-8 shadow-lg border border-stone-200 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="bg-green-100 px-3 py-4 md:px-4 md:py-5 rounded-2xl flex-shrink-0 self-center md:self-start flex items-center justify-center">
                <div className="text-3xl md:text-4xl">🇲🇽</div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-stone-700">
                    {language === 'es' ? 'Cuenta de México' : 'Mexico Account'}
                  </h3>
                  <div className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold self-center md:self-start">
                    CLABE
                  </div>
                </div>
                
                <p className="text-stone-600 mb-6 text-center md:text-left text-sm md:text-base">
                  {language === 'es' 
                    ? 'Transferencias bancarias seguras utilizando CLABE interbancaria. Perfecto para familiares y amigos en México.'
                    : 'Secure bank transfers using CLABE interbank code. Perfect for family and friends in Mexico.'
                  }
                </p>

                <div className="space-y-4">
                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <div className="text-center md:text-left">
                        <p className="text-sm font-medium text-stone-700 mb-1">
                          {language === 'es' ? 'CLABE Interbancaria' : 'CLABE Interbank Code'}
                        </p>
                        <p className="text-base md:text-lg font-mono text-stone-800 break-all">638 180 000116908870</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('638180000116908870', 'clabe')}
                        className="bg-olive-700 hover:bg-olive-800 text-white p-2 rounded-lg transition-colors self-center md:self-start"
                        title={language === 'es' ? 'Copiar' : 'Copy'}
                      >
                        {copiedField === 'clabe' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <div className="text-center md:text-left">
                        <p className="text-sm font-medium text-stone-700 mb-1">
                          {language === 'es' ? 'Nombre del Beneficiario' : 'Beneficiary Name'}
                        </p>
                        <p className="text-base md:text-lg font-mono text-stone-800 break-words">VICTOR HUICOCHEA SOLORZANO</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('VICTOR HUICOCHEA SOLORZANO', 'mexName')}
                        className="bg-olive-700 hover:bg-olive-800 text-white p-2 rounded-lg transition-colors self-center md:self-start"
                        title={language === 'es' ? 'Copiar' : 'Copy'}
                      >
                        {copiedField === 'mexName' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <div className="text-center md:text-left">
                        <p className="text-sm font-medium text-stone-700 mb-1">
                          {language === 'es' ? 'Banco' : 'Bank'}
                        </p>
                        <p className="text-base md:text-lg font-mono text-stone-800">Nu México</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard('Nu México', 'bank')}
                        className="bg-olive-700 hover:bg-olive-800 text-white p-2 rounded-lg transition-colors self-center md:self-start"
                        title={language === 'es' ? 'Copiar' : 'Copy'}
                      >
                        {copiedField === 'bank' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs md:text-sm text-green-800">
                      {language === 'es' 
                        ? 'Las transferencias pueden tardar de 1-3 días hábiles. Disponible desde cualquier banco en México.' 
                        : 'Transfers may take 1-3 business days. Available from any bank in Mexico.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amazon Registry Section */}
        <div className="mt-8 bg-white rounded-3xl p-4 md:p-8 shadow-lg border border-stone-200 hover:shadow-xl transition-shadow">
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
            <div className="bg-orange-100 px-3 py-4 md:px-4 md:py-5 rounded-2xl flex-shrink-0 self-center md:self-start flex items-center justify-center">
              <div className="text-3xl md:text-4xl">🎁</div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold text-stone-700">
                  {language === 'es' ? 'Lista de Compras' : 'Shopping Registry'}
                </h3>
                <div className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-semibold self-center md:self-start">
                  Amazon
                </div>
              </div>

              <p className="text-stone-600 mb-6 text-center md:text-left text-sm md:text-base">
                {language === 'es'
                  ? 'Si prefieres obsequiarnos un artículo físico, hemos creado una lista de regalos en Amazon con cosas que nos ayudarán en nuestro nuevo hogar.'
                  : 'If you prefer to gift us a physical item, we\'ve created a registry on Amazon with items that will help us in our new home.'
                }
              </p>

              <div className="bg-orange-50 rounded-2xl p-4 md:p-6 border border-orange-200">
                <div className="flex flex-col items-center gap-4">
                  <a
                    href="https://www.amazon.com/wedding/organize-registry?ref_=gr-home-wedding-create1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    <span>{language === 'es' ? 'Ver Lista en Amazon' : 'View Amazon Registry'}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs md:text-sm text-orange-800">
                    {language === 'es'
                      ? 'Los artículos pueden ser enviados directamente a nuestra dirección. Amazon ofrece envío internacional.'
                      : 'Items can be shipped directly to our address. Amazon offers international shipping.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 text-center bg-white rounded-3xl p-8 shadow-lg border border-stone-200">
          <div className="text-4xl mb-4">💕</div>
          <h3 className="text-2xl font-autography text-stone-700 mb-4">
            {language === 'es' ? 'Con Todo Nuestro Amor' : 'With All Our Love'}
          </h3>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'es' 
              ? 'Su presencia en nuestro día especial es el regalo más grande que podríamos pedir. Cualquier contribución que decidan hacer será profundamente apreciada y nos ayudará a comenzar nuestra vida juntos de la mejor manera posible.' 
              : 'Your presence at our special day is the greatest gift we could ask for. Any contribution you choose to make will be deeply appreciated and will help us start our life together in the best possible way.'
            }
          </p>
          <div className="mt-6">
            <p className="text-stone-500 italic">
              {language === 'es' ? '¡Gracias por ser parte de nuestra historia!' : 'Thank you for being part of our story!'}
            </p>
            <p className="text-lg font-autography text-olive-700 mt-2">
              Victor & Landy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

