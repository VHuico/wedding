import React, { useState } from 'react';

export default function ReviewSubmission({ 
  language, 
  party, 
  responses, 
  onSubmit, 
  onBack, 
  loading 
}) {
  const [contactPhone, setContactPhone] = useState(party.contactPhone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get summary statistics
  const getSummary = () => {
    const members = party.members.map(member => ({
      ...member,
      response: responses[member.id] || {}
    }));

    const weddingAttending = members.filter(m => m.response.weddingDay === 'yes').length;
    const tornaAttending = members.filter(m => m.response.tornaBoda === 'yes').length;    const totalNotes = members.filter(m => m.response.additionalNotes?.trim()).length;

    return {
      members,
      weddingAttending,
      tornaAttending
    };
  };

  const summary = getSummary();

  // Handle submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const finalResponses = { ...responses };
    
    // Add contact phone to the submission
    const submissionData = {
      ...finalResponses,
      contactPhone: contactPhone.trim(),
      submittedAt: new Date().toISOString()
    };

    await onSubmit(submissionData);
    setIsSubmitting(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-blue-500 text-4xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold text-stone-700 mb-4">
            {language === 'es' ? 'Revisar Confirmación' : 'Review RSVP'}
          </h2>
          <p className="text-stone-600">
            {language === 'es' 
              ? 'Por favor revisa las respuestas antes de enviar'
              : 'Please review your responses before submitting'
            }
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Wedding Day Summary */}
          <div className="bg-stone-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-stone-700 mb-4">
              {language === 'es' ? 'Día de la Boda' : 'Wedding Day'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">
                  {language === 'es' ? 'Asistirán:' : 'Attending:'}
                </span>
                <span className="font-semibold text-green-600">
                  {summary.weddingAttending}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">
                  {language === 'es' ? 'No asistirán:' : 'Not attending:'}
                </span>
                <span className="font-semibold text-red-600">
                  {party.members.length - summary.weddingAttending}
                </span>
              </div>
            </div>
          </div>

          {/* Torna-Boda Summary */}
          <div className="bg-stone-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-stone-700 mb-4">
              Torna-Boda
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">
                  {language === 'es' ? 'Asistirán:' : 'Attending:'}
                </span>
                <span className="font-semibold text-green-600">
                  {summary.tornaAttending}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">
                  {language === 'es' ? 'No asistirán:' : 'Not attending:'}
                </span>
                <span className="font-semibold text-red-600">
                  {party.members.length - summary.tornaAttending}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Responses */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-stone-700 mb-6">
            {language === 'es' ? 'Respuestas Detalladas' : 'Detailed Responses'}
          </h3>
          
          <div className="space-y-6">
            {summary.members.map((member) => (
              <div key={member.id} className="border-b border-stone-100 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-700 font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-700">{member.name}</h4>
                    {member.isMainContact && (
                      <p className="text-xs text-stone-500">
                        {language === 'es' ? 'Contacto principal' : 'Main contact'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-stone-600">
                      {language === 'es' ? 'Día de la Boda:' : 'Wedding Day:'}
                    </span>
                    <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      member.response.weddingDay === 'yes' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {member.response.weddingDay === 'yes' 
                        ? (language === 'es' ? 'Asistirá' : 'Attending')
                        : (language === 'es' ? 'No asistirá' : 'Not attending')
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-stone-600">Torna-Boda:</span>
                    <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      member.response.tornaBoda === 'yes' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {member.response.tornaBoda === 'yes' 
                        ? (language === 'es' ? 'Asistirá' : 'Attending')
                        : (language === 'es' ? 'No asistirá' : 'Not attending')
                      }
                    </div>
                  </div>                </div>

                {/* Remove dietary and notes sections */}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Phone */}
        <div className="bg-stone-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-stone-700 mb-4">
            {language === 'es' ? 'Teléfono de Contacto' : 'Contact Phone'}
          </h3>
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder={language === 'es' ? '(555) 123-4567' : '(555) 123-4567'}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            required
          />
          <p className="text-sm text-stone-500 mt-2">
            {language === 'es' 
              ? 'Usaremos este teléfono para contactarte sobre confirmaciones y actualizaciones'
              : 'We\'ll use this phone number to contact you about confirmations and updates'
            }
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBack}
            disabled={loading || isSubmitting}
            className="px-6 py-3 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === 'es' ? '← Editar Respuestas' : '← Edit Responses'}
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading || isSubmitting || !contactPhone.trim()}
            className={`px-8 py-3 rounded-xl font-medium transition-colors ${
              loading || isSubmitting || !contactPhone.trim()
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-green-700 hover:bg-green-800 text-white'
            }`}
          >
            {loading || isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>
                  {language === 'es' ? 'Enviando...' : 'Submitting...'}
                </span>
              </div>
            ) : (
              language === 'es' ? 'Enviar Confirmación' : 'Submit RSVP'
            )}
          </button>
        </div>

        {/* Terms notice */}
        <div className="text-center mt-6">
          <p className="text-xs text-stone-500">
            {language === 'es' 
              ? 'Al enviar, confirmas que la información es correcta y puedes ser contactado en el teléfono proporcionado.'
              : 'By submitting, you confirm the information is correct and you can be contacted at the provided phone number.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
