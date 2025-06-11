import React, { useState, useEffect } from 'react';

export default function IndividualResponse({ 
  language, 
  party, 
  responses, 
  onResponseChange, 
  onContinue, 
  onBack 
}) {
  const [localResponses, setLocalResponses] = useState({});
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  // Initialize local responses
  useEffect(() => {
    const initialResponses = {};
    party.members.forEach(member => {      initialResponses[member.id] = responses[member.id] || {
        weddingDay: '',
        tornaBoda: ''
      };
    });
    setLocalResponses(initialResponses);
  }, [party.members, responses]);

  const currentMember = party.members[currentMemberIndex];
  const currentResponse = localResponses[currentMember?.id] || {};

  // Update response for current member
  const updateResponse = (field, value) => {
    const newResponses = {
      ...localResponses,
      [currentMember.id]: {
        ...currentResponse,
        [field]: value
      }
    };
    setLocalResponses(newResponses);
    onResponseChange(currentMember.id, newResponses[currentMember.id]);
  };

  // Navigate between members
  const goToNextMember = () => {
    if (currentMemberIndex < party.members.length - 1) {
      setCurrentMemberIndex(currentMemberIndex + 1);
    }
  };

  const goToPreviousMember = () => {
    if (currentMemberIndex > 0) {
      setCurrentMemberIndex(currentMemberIndex - 1);
    }
  };

  // Check if current member has required responses
  const isCurrentMemberComplete = () => {
    return currentResponse.weddingDay && currentResponse.tornaBoda;
  };

  // Check if all members have required responses
  const areAllMembersComplete = () => {
    return party.members.every(member => {
      const response = localResponses[member.id];
      return response && response.weddingDay && response.tornaBoda;
    });
  };

  // Handle continue to review
  const handleContinue = () => {
    // Update all responses
    party.members.forEach(member => {
      onResponseChange(member.id, localResponses[member.id]);
    });
    onContinue();
  };

  if (!currentMember) return null;

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          {party.members.map((member, index) => (
            <React.Fragment key={member.id}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                  index === currentMemberIndex 
                    ? 'bg-pink-400 text-white' 
                    : localResponses[member.id]?.weddingDay && localResponses[member.id]?.tornaBoda
                      ? 'bg-green-100 text-green-600'
                      : 'bg-stone-200 text-stone-500'
                }`}
                onClick={() => setCurrentMemberIndex(index)}
              >
                {index + 1}
              </div>
              {index < party.members.length - 1 && (
                <div className="w-4 h-px bg-stone-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Current member */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-pink-500 text-xl font-bold">
              {currentMember.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-stone-700 mb-2">
            {currentMember.name}
          </h2>
          <p className="text-stone-600">
            {language === 'es' 
              ? `Persona ${currentMemberIndex + 1} de ${party.members.length}`
              : `Person ${currentMemberIndex + 1} of ${party.members.length}`
            }
          </p>
        </div>

        {/* RSVP Form */}
        <div className="space-y-8">
          {/* Wedding Day */}
          <div className="bg-stone-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-stone-700 mb-4">
              {language === 'es' ? 'Día de la Boda' : 'Wedding Day'}
            </h3>
            <p className="text-stone-600 mb-4 text-sm">
              {language === 'es' 
                ? 'Sábado, [Fecha] - Ceremonia y Recepción'
                : 'Saturday, [Date] - Ceremony and Reception'
              }
            </p>
            <div className="space-y-3">
              <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
                <input
                  type="radio"
                  name={`wedding-${currentMember.id}`}
                  value="yes"
                  checked={currentResponse.weddingDay === 'yes'}
                  onChange={(e) => updateResponse('weddingDay', e.target.value)}
                  className="mr-3 text-green-500"
                />
                <span className="text-stone-700">
                  {language === 'es' ? '✓ Sí, asistiré' : '✓ Yes, I will attend'}
                </span>
              </label>
              <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
                <input
                  type="radio"
                  name={`wedding-${currentMember.id}`}
                  value="no"
                  checked={currentResponse.weddingDay === 'no'}
                  onChange={(e) => updateResponse('weddingDay', e.target.value)}
                  className="mr-3 text-red-500"
                />
                <span className="text-stone-700">
                  {language === 'es' ? '✗ No podré asistir' : '✗ I cannot attend'}
                </span>
              </label>
            </div>
          </div>

          {/* Torna-Boda */}
          <div className="bg-stone-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-stone-700 mb-4">
              Torna-Boda
            </h3>
            <p className="text-stone-600 mb-4 text-sm">
              {language === 'es' 
                ? 'Domingo, [Fecha] - Celebración posterior'
                : 'Sunday, [Date] - Post-wedding celebration'
              }
            </p>
            <div className="space-y-3">
              <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
                <input
                  type="radio"
                  name={`torna-${currentMember.id}`}
                  value="yes"
                  checked={currentResponse.tornaBoda === 'yes'}
                  onChange={(e) => updateResponse('tornaBoda', e.target.value)}
                  className="mr-3 text-green-500"
                />
                <span className="text-stone-700">
                  {language === 'es' ? '✓ Sí, asistiré' : '✓ Yes, I will attend'}
                </span>
              </label>
              <label className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
                <input
                  type="radio"
                  name={`torna-${currentMember.id}`}
                  value="no"
                  checked={currentResponse.tornaBoda === 'no'}
                  onChange={(e) => updateResponse('tornaBoda', e.target.value)}
                  className="mr-3 text-red-500"
                />
                <span className="text-stone-700">
                  {language === 'es' ? '✗ No podré asistir' : '✗ I cannot attend'}
                </span>
              </label>
            </div>
          </div>
        </div>        {/* Navigation buttons */}
        <div className="mt-8 pt-6 border-t border-stone-200">
          {/* Mobile layout - stacked buttons */}
          <div className="block sm:hidden space-y-3">
            <button
              onClick={onBack}
              className="w-full px-6 py-3 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors"
            >
              {language === 'es' ? '← Volver al Grupo' : '← Back to Party'}
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              {currentMemberIndex > 0 && (
                <button
                  onClick={goToPreviousMember}
                  className="px-4 py-3 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors text-sm"
                >
                  {language === 'es' ? '← Anterior' : '← Previous'}
                </button>
              )}

              {currentMemberIndex < party.members.length - 1 ? (
                <button
                  onClick={goToNextMember}
                  disabled={!isCurrentMemberComplete()}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors text-sm ${
                    isCurrentMemberComplete()
                      ? 'bg-pink-400 hover:bg-pink-500 text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  } ${currentMemberIndex === 0 ? 'col-span-2' : ''}`}
                >
                  {language === 'es' ? 'Siguiente →' : 'Next →'}
                </button>
              ) : (
                <button
                  onClick={handleContinue}
                  disabled={!areAllMembersComplete()}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors text-sm ${
                    areAllMembersComplete()
                      ? 'bg-pink-400 hover:bg-pink-500 text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  } ${currentMemberIndex === 0 ? 'col-span-2' : ''}`}
                >
                  {language === 'es' ? 'Revisar →' : 'Review →'}
                </button>
              )}
            </div>
          </div>

          {/* Desktop layout - horizontal buttons */}
          <div className="hidden sm:flex justify-between items-center">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors"
            >
              {language === 'es' ? '← Volver' : '← Back'}
            </button>

            <div className="flex space-x-3">
              {currentMemberIndex > 0 && (
                <button
                  onClick={goToPreviousMember}
                  className="px-4 py-3 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors"
                >
                  {language === 'es' ? '← Anterior' : '← Previous'}
                </button>
              )}

              {currentMemberIndex < party.members.length - 1 ? (
                <button
                  onClick={goToNextMember}
                  disabled={!isCurrentMemberComplete()}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                    isCurrentMemberComplete()
                      ? 'bg-pink-400 hover:bg-pink-500 text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {language === 'es' ? 'Siguiente →' : 'Next →'}
                </button>
              ) : (
                <button
                  onClick={handleContinue}
                  disabled={!areAllMembersComplete()}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    areAllMembersComplete()
                      ? 'bg-pink-400 hover:bg-pink-500 text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {language === 'es' ? 'Revisar →' : 'Review →'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Completion status */}
        <div className="mt-4 text-center text-sm text-stone-500">
          {party.members.filter(member => {
            const response = localResponses[member.id];
            return response && response.weddingDay && response.tornaBoda;
          }).length} {language === 'es' ? 'de' : 'of'} {party.members.length} {
            language === 'es' ? 'completadas' : 'completed'
          }
        </div>
      </div>
    </div>
  );
}
