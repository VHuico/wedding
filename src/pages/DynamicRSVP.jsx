import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../data/firebase';
import { searchGuests } from '../data/guestList';
import NameSearch from '../components/rsvp/NameSearch';
import PartyDisplay from '../components/rsvp/PartyDisplay';
import IndividualResponse from '../components/rsvp/IndividualResponse';
import ReviewSubmission from '../components/rsvp/ReviewSubmission';

export default function DynamicRSVP({ language, texts }) {
  const [currentStep, setCurrentStep] = useState('search'); // search, party, individual, review, submitted
  const [selectedParty, setSelectedParty] = useState(null);
  const [rsvpResponses, setRsvpResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load existing RSVP responses if party is found
  const loadExistingResponses = async (partyId) => {
    try {
      const docRef = doc(db, 'rsvps', partyId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRsvpResponses(data.responses || {});
      }
    } catch (error) {
      console.error('Error loading existing responses:', error);
    }
  };

  // Handle party selection from search
  const handlePartySelected = async (party) => {
    setSelectedParty(party);
    setCurrentStep('party');
    await loadExistingResponses(party.partyId);
  };

  // Handle individual RSVP responses
  const handleIndividualResponse = (memberId, responses) => {
    setRsvpResponses(prev => ({
      ...prev,
      [memberId]: responses
    }));
  };

  // Submit RSVP to Firebase
  const submitRSVP = async (finalResponses) => {
    setLoading(true);
    setError('');

    try {
      const docRef = doc(db, 'rsvps', selectedParty.partyId);
      
      await setDoc(docRef, {
        partyId: selectedParty.partyId,
        partyName: selectedParty.partyName,
        contactEmail: selectedParty.contactEmail,
        responses: finalResponses,
        submittedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }, { merge: true });

      setCurrentStep('submitted');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError(language === 'es' 
        ? 'Error al enviar la confirmación. Por favor, inténtalo de nuevo.' 
        : 'Error submitting RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset to start over
  const startOver = () => {
    setCurrentStep('search');
    setSelectedParty(null);
    setRsvpResponses({});
    setError('');
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-pink-400 text-6xl mb-6">💌</div>
          <h1 className="text-4xl font-autography text-stone-700 mb-4">
            {texts[language].rsvp.title}
          </h1>
          <p className="text-lg text-stone-600 mb-8">
            {language === 'es' 
              ? 'Busca tu nombre para encontrar tu grupo y confirmar asistencia'
              : 'Search your name to find your party and confirm attendance'
            }
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className={`w-3 h-3 rounded-full ${
              currentStep === 'search' ? 'bg-pink-400' : 
              ['party', 'individual', 'review', 'submitted'].includes(currentStep) ? 'bg-stone-400' : 'bg-stone-200'
            }`}></div>
            <div className={`w-3 h-3 rounded-full ${
              currentStep === 'party' ? 'bg-pink-400' : 
              ['individual', 'review', 'submitted'].includes(currentStep) ? 'bg-stone-400' : 'bg-stone-200'
            }`}></div>
            <div className={`w-3 h-3 rounded-full ${
              currentStep === 'individual' ? 'bg-pink-400' : 
              ['review', 'submitted'].includes(currentStep) ? 'bg-stone-400' : 'bg-stone-200'
            }`}></div>
            <div className={`w-3 h-3 rounded-full ${
              currentStep === 'review' ? 'bg-pink-400' : 
              currentStep === 'submitted' ? 'bg-stone-400' : 'bg-stone-200'
            }`}></div>
            <div className={`w-3 h-3 rounded-full ${
              currentStep === 'submitted' ? 'bg-pink-400' : 'bg-stone-200'
            }`}></div>
          </div>
        </div>        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Step content */}
        <div className="bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
          {currentStep === 'search' && (
            <NameSearch 
              language={language}
              onPartySelected={handlePartySelected}
              onError={setError}
            />
          )}

          {currentStep === 'party' && selectedParty && (
            <PartyDisplay 
              language={language}
              party={selectedParty}
              existingResponses={rsvpResponses}
              onContinue={() => setCurrentStep('individual')}
              onStartOver={startOver}
            />
          )}

          {currentStep === 'individual' && selectedParty && (
            <IndividualResponse 
              language={language}
              party={selectedParty}
              responses={rsvpResponses}
              onResponseChange={handleIndividualResponse}
              onContinue={() => setCurrentStep('review')}
              onBack={() => setCurrentStep('party')}
            />
          )}

          {currentStep === 'review' && selectedParty && (
            <ReviewSubmission 
              language={language}
              party={selectedParty}
              responses={rsvpResponses}
              onSubmit={submitRSVP}
              onBack={() => setCurrentStep('individual')}
              loading={loading}
            />
          )}

          {currentStep === 'submitted' && (
            <div className="p-8 text-center">
              <div className="text-green-500 text-6xl mb-6">✅</div>
              <h2 className="text-2xl font-semibold text-stone-700 mb-4">
                {language === 'es' ? '¡Confirmación Recibida!' : 'RSVP Received!'}
              </h2>
              <p className="text-stone-600 mb-6">
                {language === 'es' 
                  ? 'Gracias por confirmar tu asistencia. Hemos guardado tu respuesta.'
                  : 'Thank you for confirming your attendance. We have saved your response.'
                }
              </p>
              <button
                onClick={startOver}
                className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                {language === 'es' ? 'Hacer Otra Confirmación' : 'Make Another RSVP'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
