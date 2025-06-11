import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, increment, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../data/firebase';

export default function Registry({ language, texts }) {
  const [registryItems, setRegistryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contributionModal, setContributionModal] = useState(null);
  const [contributionAmount, setContributionAmount] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [contributorMessage, setContributorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set()); // Track failed image loads

  // Safe access to registry texts with fallback
  const registryTexts = texts?.[language]?.registry;// Load registry data from Firebase
  useEffect(() => {
    if (registryTexts && texts) {
      loadRegistryData();
    }
  }, [registryTexts, texts]);const loadRegistryData = async () => {
    try {
      setLoading(true);
      
      // Load items directly from Firebase instead of using the static list
      const q = query(collection(db, 'registry'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // If no items exist, initialize with the default items from texts.js
        const defaultItems = registryTexts?.items || [];
        if (defaultItems.length > 0) {
          const itemsWithContributions = await Promise.all(
            defaultItems.map(async (item) => {
              const docRef = doc(db, 'registry', item.id);
              
              // Initialize the item in Firebase
              await setDoc(docRef, {
                itemId: item.id,
                name: item.name,
                description: item.description,
                targetAmount: item.targetAmount,
                image: item.image,
                currentAmount: 0,
                contributions: [],
                createdAt: serverTimestamp()
              });
              
              return {
                ...item,
                currentAmount: 0,
                contributions: []
              };
            })
          );
          setRegistryItems(itemsWithContributions);
        } else {
          setRegistryItems([]);
        }
      } else {
        // Load items from Firebase
        const registryData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          registryData.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            targetAmount: data.targetAmount,
            image: data.image,
            imageUrl: data.imageUrl,
            currentAmount: data.currentAmount || 0,
            contributions: data.contributions || []
          });
        });
        setRegistryItems(registryData);
      }
    } catch (error) {
      console.error('Error loading registry data:', error);
      // Set empty array instead of showing error
      setRegistryItems([]);
    } finally {
      setLoading(false);
    }
  };

  const openContributionModal = (item) => {
    setContributionModal(item);
    setContributionAmount('');
    setContributorName('');
    setContributorMessage('');
    setSuccess(false);
  };

  const closeContributionModal = () => {
    setContributionModal(null);
    setContributionAmount('');
    setContributorName('');
    setContributorMessage('');
    setSuccess(false);
  };

  const submitContribution = async () => {
    if (!contributionAmount || !contributorName) return;

    setSubmitting(true);
    try {
      const amount = parseFloat(contributionAmount);
      if (amount <= 0) return;

      const docRef = doc(db, 'registry', contributionModal.id);
      
      // Create contribution record
      const contribution = {
        amount,
        contributorName: contributorName.trim(),
        message: contributorMessage.trim(),
        timestamp: serverTimestamp(),
        id: Date.now().toString()
      };

      // Update the registry item
      await updateDoc(docRef, {
        currentAmount: increment(amount),
        contributions: [...(contributionModal.contributions || []), contribution],
        lastUpdated: serverTimestamp()
      });

      setSuccess(true);
      
      // Reload data to reflect changes
      setTimeout(() => {
        loadRegistryData();
        closeContributionModal();
      }, 2000);

    } catch (error) {
      console.error('Error submitting contribution:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };
  const isGoalReached = (current, target) => {
    return current >= target;
  };

  // Handle image load errors
  const handleImageError = (itemId) => {
    setImageErrors(prev => new Set([...prev, itemId]));
  };

  // Check if image should be shown
  const shouldShowImage = (item) => {
    return item.imageUrl && !imageErrors.has(item.id);
  };
  if (loading) {
    return (
      <div className="min-h-screen py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-stone-600">Loading registry...</p>
        </div>
      </div>
    );
  }

  if (!registryTexts) {
    return (
      <div className="min-h-screen py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-pink-400 text-6xl mb-6">🎁</div>
          <h1 className="text-4xl font-autography text-stone-700 mb-4">
            {registryTexts.title}
          </h1>
          <h2 className="text-2xl text-stone-600 mb-6">
            {registryTexts.subtitle}
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            {registryTexts.description}
          </p>
        </div>        {/* Registry Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {registryItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image Section - Full Width Header */}
              <div className="relative">
                {shouldShowImage(item) ? (
                  <div className="w-full h-48 bg-stone-100">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(item.id)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-pink-50 to-stone-100 flex items-center justify-center">
                    <div className="text-6xl">{item.image}</div>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                {/* Item Header */}
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold text-stone-700 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-stone-600 text-xs line-clamp-2">
                    {item.description}
                  </p>
                </div>{/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>{registryTexts.contributed}: ${item.currentAmount}</span>
                    <span>{registryTexts.goal}: ${item.targetAmount}</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isGoalReached(item.currentAmount, item.targetAmount) 
                          ? 'bg-green-500' 
                          : 'bg-pink-400'
                      }`}
                      style={{ width: `${getProgressPercentage(item.currentAmount, item.targetAmount)}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-xs font-medium text-stone-700">
                      {Math.round(getProgressPercentage(item.currentAmount, item.targetAmount))}%
                    </span>
                  </div>
                </div>                {/* Goal Status */}
                {isGoalReached(item.currentAmount, item.targetAmount) ? (
                  <div className="text-center">
                    <div className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      <span className="mr-1">✅</span>
                      {registryTexts.goalReached}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={() => openContributionModal(item)}
                      className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-xl font-medium transition-colors w-full text-sm"
                    >
                      {registryTexts.contributeButton}
                    </button>
                  </div>
                )}

                {/* Contributors Count */}
                {item.contributions && item.contributions.length > 0 && (
                  <div className="mt-2 text-center text-xs text-stone-500">
                    {item.contributions.length} {language === 'es' ? 'contribución(es)' : 'contribution(s)'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>      {/* Contribution Modal */}
      {contributionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {success ? (
              <div className="p-8 text-center">
                <div className="text-green-500 text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-semibold text-stone-700 mb-4">
                  {registryTexts.thankYou}
                </h3>
                <p className="text-stone-600 mb-6">
                  {registryTexts.contributionSuccess}
                </p>
                <button
                  onClick={closeContributionModal}
                  className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {registryTexts.backToRegistry}
                </button>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-stone-700">
                    {language === 'es' ? 'Contribuir a' : 'Contribute to'} {contributionModal.name}
                  </h3>
                  <button
                    onClick={closeContributionModal}
                    className="text-stone-400 hover:text-stone-600 p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>                <div className="mb-6">
                  {/* Image Section */}
                  <div className="mb-4">
                    {shouldShowImage(contributionModal) ? (
                      <div className="w-full h-40 rounded-xl overflow-hidden bg-stone-100">
                        <img 
                          src={contributionModal.imageUrl} 
                          alt={contributionModal.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(contributionModal.id)}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 rounded-xl bg-gradient-to-br from-pink-50 to-stone-100 flex items-center justify-center">
                        <div className="text-6xl">{contributionModal.image}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div className="text-center mb-4">
                    <p className="text-stone-600 text-sm">{contributionModal.description}</p>
                  </div>
                  
                  <div className="bg-stone-50 rounded-xl p-4">
                    <div className="text-sm text-stone-600 mb-2">
                      {registryTexts.contributed}: ${contributionModal.currentAmount} / ${contributionModal.targetAmount}
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-pink-400 rounded-full transition-all duration-500"
                        style={{ width: `${getProgressPercentage(contributionModal.currentAmount, contributionModal.targetAmount)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'es' ? 'Monto de Contribución ($)' : 'Contribution Amount ($)'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'es' ? 'Tu Nombre' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      value={contributorName}
                      onChange={(e) => setContributorName(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {language === 'es' ? 'Mensaje (Opcional)' : 'Message (Optional)'}
                    </label>
                    <textarea
                      value={contributorMessage}
                      onChange={(e) => setContributorMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      rows="3"
                      placeholder={language === 'es' ? 'Un mensaje especial...' : 'A special message...'}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={closeContributionModal}
                    className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    {language === 'es' ? 'Cancelar' : 'Cancel'}
                  </button>
                  <button
                    onClick={submitContribution}
                    disabled={!contributionAmount || !contributorName || submitting}
                    className="flex-1 bg-pink-400 hover:bg-pink-500 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    {submitting 
                      ? (language === 'es' ? 'Enviando...' : 'Submitting...') 
                      : registryTexts.contributeButton
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}