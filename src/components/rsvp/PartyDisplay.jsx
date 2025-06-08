import React from 'react';

export default function PartyDisplay({ language, party, existingResponses, onContinue, onStartOver }) {
  const hasExistingResponses = Object.keys(existingResponses).length > 0;
  
  // Get response summary
  const getResponseSummary = () => {
    if (!hasExistingResponses) return null;
    
    let weddingAttending = 0;
    let weddingNotAttending = 0;
    let tornaAttending = 0;
    let tornaNotAttending = 0;
    
    Object.values(existingResponses).forEach(response => {
      if (response.weddingDay === 'yes') weddingAttending++;
      if (response.weddingDay === 'no') weddingNotAttending++;
      if (response.tornaBoda === 'yes') tornaAttending++;
      if (response.tornaBoda === 'no') tornaNotAttending++;
    });
    
    return {
      weddingAttending,
      weddingNotAttending,
      tornaAttending,
      tornaNotAttending
    };
  };

  const summary = getResponseSummary();

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-green-500 text-4xl mb-4">👥</div>
          <h2 className="text-2xl font-semibold text-stone-700 mb-4">
            {language === 'es' ? '¡Hola!' : 'Hello!'} {party.partyName}
          </h2>
          <p className="text-stone-600">
            {language === 'es' 
              ? 'Hemos encontrado tu grupo. Por favor confirma la asistencia para cada persona.'
              : 'We found your party. Please confirm attendance for each person.'
            }
          </p>
        </div>

        {/* Party members list */}
        <div className="bg-stone-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-stone-700 mb-4">
            {language === 'es' ? 'Miembros del Grupo:' : 'Party Members:'}
          </h3>
          <div className="space-y-3">
            {party.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-500 font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-700">{member.name}</p>
                    {member.isMainContact && (
                      <p className="text-xs text-stone-500">
                        {language === 'es' ? 'Contacto principal' : 'Main contact'}
                      </p>
                    )}
                  </div>
                </div>
                {existingResponses[member.id] && (
                  <div className="text-right text-sm">
                    <div className="text-stone-600">
                      {language === 'es' ? 'Boda:' : 'Wedding:'} 
                      <span className={`ml-1 font-medium ${
                        existingResponses[member.id].weddingDay === 'yes' ? 'text-green-600' : 
                        existingResponses[member.id].weddingDay === 'no' ? 'text-red-600' : 'text-stone-400'
                      }`}>
                        {existingResponses[member.id].weddingDay === 'yes' ? '✓' : 
                         existingResponses[member.id].weddingDay === 'no' ? '✗' : '?'}
                      </span>
                    </div>
                    <div className="text-stone-600">
                      {language === 'es' ? 'Torna-Boda:' : 'Torna-Boda:'} 
                      <span className={`ml-1 font-medium ${
                        existingResponses[member.id].tornaBoda === 'yes' ? 'text-green-600' : 
                        existingResponses[member.id].tornaBoda === 'no' ? 'text-red-600' : 'text-stone-400'
                      }`}>
                        {existingResponses[member.id].tornaBoda === 'yes' ? '✓' : 
                         existingResponses[member.id].tornaBoda === 'no' ? '✗' : '?'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Existing responses summary */}
        {hasExistingResponses && summary && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              {language === 'es' ? 'Respuestas Anteriores' : 'Previous Responses'}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-700 mb-2">
                  {language === 'es' ? 'Día de la Boda:' : 'Wedding Day:'}
                </h4>
                <p className="text-green-600">
                  ✓ {summary.weddingAttending} {language === 'es' ? 'asistirán' : 'attending'}
                </p>
                <p className="text-red-600">
                  ✗ {summary.weddingNotAttending} {language === 'es' ? 'no asistirán' : 'not attending'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-700 mb-2">Torna-Boda:</h4>
                <p className="text-green-600">
                  ✓ {summary.tornaAttending} {language === 'es' ? 'asistirán' : 'attending'}
                </p>
                <p className="text-red-600">
                  ✗ {summary.tornaNotAttending} {language === 'es' ? 'no asistirán' : 'not attending'}
                </p>
              </div>
            </div>
            <p className="text-blue-600 text-sm mt-3">
              {language === 'es' 
                ? 'Puedes actualizar estas respuestas si es necesario.'
                : 'You can update these responses if needed.'
              }
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStartOver}
            className="px-6 py-3 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors"
          >
            {language === 'es' ? 'Buscar Otro Grupo' : 'Search Different Party'}
          </button>
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-medium transition-colors"
          >
            {hasExistingResponses 
              ? (language === 'es' ? 'Actualizar Respuestas' : 'Update Responses')
              : (language === 'es' ? 'Confirmar Asistencia' : 'Confirm Attendance')
            }
          </button>
        </div>
      </div>
    </div>
  );
}
