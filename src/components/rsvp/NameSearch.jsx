import React, { useState, useCallback } from 'react';
import { searchGuests } from '../../data/guestList';

export default function NameSearch({ language, onPartySelected, onError }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const handleSearch = useCallback(async (value) => {
    if (value.trim().length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    onError(''); // Clear any previous errors

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = searchGuests(value.trim());
      setSearchResults(results);
      
      if (results.length === 0) {
        onError(language === 'es' 
          ? 'No se encontró ningún invitado con ese nombre. Verifica la ortografía o intenta con un nombre diferente.'
          : 'No guests found with that name. Please check the spelling or try a different name.'
        );
      }
    } catch (error) {
      console.error('Search error:', error);
      onError(language === 'es' 
        ? 'Error al buscar invitados. Por favor, inténtalo de nuevo.'
        : 'Error searching for guests. Please try again.'
      );
    } finally {
      setIsSearching(false);
    }
  }, [language, onError]);

  // Handle search input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Handle party selection
  const selectParty = (party) => {
    onPartySelected(party);
  };
  return (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-stone-700 mb-4">
            {language === 'es' ? 'Confirmación de Asistencia' : 'RSVP Confirmation'}
          </h2>
          <p className="text-stone-600 mb-6">
            {language === 'es' 
              ? 'Te guiaremos paso a paso para confirmar la asistencia de tu grupo.'
              : 'We\'ll guide you step by step to confirm your party\'s attendance.'
            }
          </p>
          
          {/* Process steps preview */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
            <h3 className="text-stone-700 font-semibold mb-3 text-sm">
              {language === 'es' ? 'Proceso en 3 pasos:' : '3-step process:'}
            </h3>
            <div className="text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-pink-400 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>{language === 'es' ? 'Buscar tu nombre' : 'Find your name'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-stone-300 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>{language === 'es' ? 'Confirmar por persona' : 'Confirm per person'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-stone-300 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>{language === 'es' ? 'Revisar y enviar' : 'Review and submit'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-stone-700 font-medium mb-2">
            {language === 'es' ? 'Paso 1: Escribe tu nombre' : 'Step 1: Enter your name'}
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={language === 'es' ? 'Ej: María García' : 'Ex: John Smith'}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            autoComplete="off"
          />
          <p className="text-xs text-stone-500 mt-2">
            {language === 'es' 
              ? 'Buscaremos tu grupo automáticamente'
              : 'We\'ll automatically find your party'
            }
          </p>
        </div>

        {/* Loading indicator */}
        {isSearching && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-pink-400"></div>
            <p className="text-stone-600 mt-2">
              {language === 'es' ? 'Buscando...' : 'Searching...'}
            </p>
          </div>
        )}

        {/* Search results */}
        {!isSearching && searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-stone-700 mb-4">
              {language === 'es' ? 'Selecciona tu grupo:' : 'Select your party:'}
            </h3>
            {searchResults.map((result) => (
              <div
                key={result.party.partyId}
                onClick={() => selectParty(result.party)}
                className="p-4 border border-stone-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-stone-700">
                      {result.party.partyName}
                    </h4>
                    <p className="text-sm text-stone-600 mt-1">
                      {language === 'es' ? 'Encontrado: ' : 'Found: '}
                      <span className="font-medium">{result.matchedMember.name}</span>
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      {result.party.members.length} {
                        result.party.members.length === 1 
                          ? (language === 'es' ? 'persona' : 'person')
                          : (language === 'es' ? 'personas' : 'people')
                      }
                    </p>
                  </div>
                  <div className="text-pink-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {!isSearching && hasSearched && searchResults.length === 0 && searchTerm.trim().length >= 2 && (
          <div className="text-center py-8">
            <div className="text-stone-400 text-4xl mb-4">🔍</div>
            <p className="text-stone-600">
              {language === 'es' 
                ? 'No se encontraron resultados'
                : 'No results found'
              }
            </p>
            <p className="text-sm text-stone-500 mt-2">
              {language === 'es' 
                ? 'Intenta con un nombre diferente o verifica la ortografía'
                : 'Try a different name or check the spelling'
              }
            </p>
          </div>
        )}

        {/* Help text */}
        {!hasSearched && (
          <div className="text-center py-8 text-stone-500">
            <div className="text-4xl mb-4">👋</div>
            <p className="text-sm">
              {language === 'es' 
                ? 'Escribe tu nombre o apellido para comenzar'
                : 'Type your first or last name to get started'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
