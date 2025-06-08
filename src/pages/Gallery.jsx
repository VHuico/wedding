import React, { useState, useEffect } from 'react';
import { storage, db } from '../data/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';

export default function Gallery({ language, texts }) {
  // Sample photos data - using real engagement photos with proper import paths
  const samplePhotos = [
    {
      id: 1,
      url: require('../assets/photos/victorAndLandy/2024-04-12_16-24-39_630.jpeg'),
      caption: 'Our engagement shoot in beautiful Mérida! 💕',
      category: 'engagement',
      uploadedBy: 'Victor & Landy',
      date: '2024-04-12',
      likes: 24,
      reactions: { heart: 15, love: 8, laugh: 1 }
    },
    {
      id: 2,
      url: require('../assets/photos/victorAndLandy/2024-04-12_16-29-29_020.jpeg'),
      caption: 'Exploring the magical streets of Mérida together ✨',
      category: 'engagement',
      uploadedBy: 'Victor & Landy',
      date: '2024-04-12',
      likes: 18,
      reactions: { heart: 12, love: 5, laugh: 1 }
    },
    {
      id: 3,
      url: require('../assets/photos/victorAndLandy/2024-04-12_16-43-05_970.jpeg'),
      caption: 'Sweet moments captured forever 💫',
      category: 'engagement',
      uploadedBy: 'Victor & Landy',
      date: '2024-04-12',
      likes: 32,
      reactions: { heart: 20, love: 10, laugh: 2 }
    },
    {
      id: 4,
      url: require('../assets/photos/victorAndLandy/2024-04-12_17-17-08_930.jpeg'),
      caption: 'Love in the golden hour 🌅',
      category: 'engagement',
      uploadedBy: 'Victor & Landy',
      date: '2024-04-12',
      likes: 28,
      reactions: { heart: 18, love: 8, laugh: 2 }
    },
    {
      id: 5,
      url: require('../assets/photos/victorAndLandy/2024-04-12_17-26-15_210.jpeg'),
      caption: 'Perfect day, perfect love 💖',
      category: 'engagement',
      uploadedBy: 'Victor & Landy',
      date: '2024-04-12',
      likes: 35,
      reactions: { heart: 22, love: 12, laugh: 1 }
    }
  ];
  const [activeTab, setActiveTab] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [userReactions, setUserReactions] = useState({});
  const [photoReactions, setPhotoReactions] = useState({});
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    file: null,
    category: 'engagement',
    caption: '',
    uploaderName: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  // Load user reactions from localStorage on component mount
  useEffect(() => {
    const savedReactions = localStorage.getItem('wedding-photo-reactions');
    if (savedReactions) {
      setUserReactions(JSON.parse(savedReactions));
    }
    
    // Initialize photo reactions with sample data
    const initialReactions = {};
    samplePhotos.forEach(photo => {
      initialReactions[photo.id] = { ...photo.reactions };
    });
    setPhotoReactions(initialReactions);
    
    // Load uploaded photos from Firebase
    loadUploadedPhotos();
  }, []);

  // Load uploaded photos from Firebase
  const loadUploadedPhotos = async () => {
    try {
      const photosQuery = query(collection(db, 'gallery-photos'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(photosQuery);
      const photos = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        photos.push({
          id: doc.id,
          ...data,
          date: data.uploadedAt?.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          reactions: data.reactions || { heart: 0, love: 0, laugh: 0 }
        });
      });
      
      setUploadedPhotos(photos);
      
      // Initialize reactions for uploaded photos
      const uploadedReactions = {};
      photos.forEach(photo => {
        uploadedReactions[photo.id] = { ...photo.reactions };
      });
      setPhotoReactions(prev => ({...prev, ...uploadedReactions}));
      
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.file || !uploadForm.caption.trim() || !uploadForm.uploaderName.trim()) {
      alert(language === 'es' 
        ? 'Por favor completa todos los campos y selecciona una foto'
        : 'Please fill in all fields and select a photo'
      );
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `gallery/${timestamp}-${uploadForm.file.name}`;
      const storageRef = ref(storage, filename);
      
      // Upload file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, uploadForm.file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Save photo metadata to Firestore
      const photoData = {
        url: downloadURL,
        caption: uploadForm.caption.trim(),
        category: uploadForm.category,
        uploadedBy: uploadForm.uploaderName.trim(),
        uploadedAt: new Date(),
        reactions: { heart: 0, love: 0, laugh: 0 },
        likes: 0
      };
      
      await addDoc(collection(db, 'gallery-photos'), photoData);
      
      // Reset form and close modal
      setUploadForm({
        file: null,
        category: 'engagement',
        caption: '',
        uploaderName: ''
      });
      setShowUploadModal(false);
      
      // Reload photos
      await loadUploadedPhotos();
      
      alert(language === 'es' 
        ? '¡Foto subida exitosamente! 🎉'
        : 'Photo uploaded successfully! 🎉'
      );
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(language === 'es'
        ? 'Error al subir la foto. Por favor intenta de nuevo.'
        : 'Error uploading photo. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Save user reactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wedding-photo-reactions', JSON.stringify(userReactions));
  }, [userReactions]);
  // Function to handle reactions
  const handleReaction = async (photoId, reactionType) => {
    const reactionKey = `${photoId}-${reactionType}`;
    
    // Check if this is an uploaded photo (has Firebase doc ID)
    const isUploadedPhoto = uploadedPhotos.some(photo => photo.id === photoId);
    
    // Check if user has already reacted with this type to this photo
    if (userReactions[reactionKey]) {
      // Remove reaction
      const newUserReactions = { ...userReactions };
      delete newUserReactions[reactionKey];
      setUserReactions(newUserReactions);
      
      // Decrease count
      setPhotoReactions(prev => ({
        ...prev,
        [photoId]: {
          ...prev[photoId],
          [reactionType]: Math.max(0, (prev[photoId]?.[reactionType] || 0) - 1)
        }
      }));
      
      // Update Firebase if it's an uploaded photo
      if (isUploadedPhoto) {
        try {
          const newCount = Math.max(0, (photoReactions[photoId]?.[reactionType] || 0) - 1);
          const photoRef = doc(db, 'gallery-photos', photoId);
          await updateDoc(photoRef, {
            [`reactions.${reactionType}`]: newCount
          });
        } catch (error) {
          console.error('Error updating reaction in Firebase:', error);
        }
      }
    } else {
      // Add reaction
      setUserReactions(prev => ({
        ...prev,
        [reactionKey]: true
      }));
      
      // Increase count
      setPhotoReactions(prev => ({
        ...prev,
        [photoId]: {
          ...prev[photoId],
          [reactionType]: (prev[photoId]?.[reactionType] || 0) + 1
        }
      }));
      
      // Update Firebase if it's an uploaded photo
      if (isUploadedPhoto) {
        try {
          const newCount = (photoReactions[photoId]?.[reactionType] || 0) + 1;
          const photoRef = doc(db, 'gallery-photos', photoId);
          await updateDoc(photoRef, {
            [`reactions.${reactionType}`]: newCount
          });
        } catch (error) {
          console.error('Error updating reaction in Firebase:', error);
        }
      }
    }
  };  // Function to check if user has reacted
  const hasUserReacted = (photoId, reactionType) => {
    return userReactions[`${photoId}-${reactionType}`] || false;
  };

  // Combine sample and uploaded photos
  const allPhotos = [...samplePhotos, ...uploadedPhotos];
  
  // Calculate dynamic statistics
  const totalPhotos = allPhotos.length;
  const totalContributors = [...new Set(allPhotos.map(photo => photo.uploadedBy))].length;
  const totalLikes = Object.values(photoReactions).reduce((total, reactions) => {
    return total + (reactions.heart || 0) + (reactions.love || 0) + (reactions.laugh || 0);
  }, 0);

  const categories = {
    all: { label: language === 'es' ? 'Todas' : 'All', icon: '📸' },
    engagement: { label: language === 'es' ? 'Compromiso' : 'Engagement', icon: '💍' },
    'pre-wedding': { label: language === 'es' ? 'Pre-Boda' : 'Pre-Wedding', icon: '🌟' },
    wedding: { label: language === 'es' ? 'Boda' : 'Wedding', icon: '💒' },
    reception: { label: language === 'es' ? 'Recepción' : 'Reception', icon: '🎉' },
    'behind-scenes': { label: language === 'es' ? 'Tras Cámaras' : 'Behind Scenes', icon: '🎬' }
  };
  
  const filteredPhotos = activeTab === 'all' ? allPhotos : allPhotos.filter(photo => photo.category === activeTab);

  return (    <div className="min-h-screen py-8 md:py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="text-pink-400 text-5xl md:text-6xl mb-4 md:mb-6">📸</div>
          <h1 className="text-3xl md:text-4xl font-autography text-stone-700 mb-4 px-4">
            {texts[language].gallery.title}
          </h1>
          <p className="text-lg text-stone-600 px-4 mb-6">
            {language === 'es' 
              ? 'Comparte tus momentos favoritos con nosotros y crea recuerdos juntos'
              : 'Share your favorite moments with us and create memories together'
            }
          </p>
          
          {/* Upload Button */}
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            📷 {language === 'es' ? 'Subir Foto' : 'Upload Photo'}
          </button>        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === key
                    ? 'bg-pink-400 text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-pink-50 border border-stone-200'
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredPhotos.map(photo => (
            <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div 
                className="relative aspect-square overflow-hidden cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to camera icon if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-stone-100 flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-stone-300 text-4xl">📷</span>
                </div>
                
                {/* Overlay for hover effect */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {language === 'es' ? 'Click para ver' : 'Click to view'}
                  </div>
                </div>
              </div>
              
              {/* Photo Info */}
              <div className="p-4">
                <p className="text-stone-700 text-sm mb-2 line-clamp-2">{photo.caption}</p>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>{photo.uploadedBy}</span>
                  <span>{photo.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1">
                      ❤️ {photo.likes}
                    </span>
                  </div>
                  <div className="text-pink-400 text-xs font-medium">
                    {categories[photo.category]?.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Photo Placeholder */}
          <div 
            onClick={() => setShowUploadModal(true)}
            className="bg-white rounded-xl border-2 border-dashed border-stone-300 hover:border-pink-400 transition-colors cursor-pointer aspect-square flex flex-col items-center justify-center text-stone-400 hover:text-pink-400 group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📸</div>
            <p className="text-sm font-medium">
              {language === 'es' ? 'Agregar Foto' : 'Add Photo'}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 text-center">
          <h3 className="text-xl font-autography text-stone-700 mb-4">
            📊 {language === 'es' ? 'Estadísticas de la Galería' : 'Gallery Stats'}
          </h3>          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-pink-400">{totalPhotos}</div>
              <div className="text-sm text-stone-600">
                {language === 'es' ? 'Fotos Totales' : 'Total Photos'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">{totalContributors}</div>
              <div className="text-sm text-stone-600">
                {language === 'es' ? 'Contribuyentes' : 'Contributors'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">{totalLikes}</div>
              <div className="text-sm text-stone-600">
                {language === 'es' ? 'Me Gusta' : 'Total Likes'}
              </div>
            </div>
          </div>
        </div>        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-autography text-stone-700">
                  📷 {language === 'es' ? 'Subir Foto' : 'Upload Photo'}
                </h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-stone-400 hover:text-stone-600"
                  disabled={isUploading}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-stone-600 mb-4">
                    {language === 'es' ? 'Selecciona tu foto' : 'Select your photo'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadForm(prev => ({...prev, file: e.target.files[0]}))}
                    className="hidden"
                    id="photo-upload"
                    disabled={isUploading}
                  />
                  <label 
                    htmlFor="photo-upload"
                    className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition-colors cursor-pointer inline-block"
                  >
                    {language === 'es' ? 'Seleccionar Archivo' : 'Select File'}
                  </label>
                  {uploadForm.file && (
                    <p className="mt-2 text-sm text-stone-600">
                      {uploadForm.file.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">
                    {language === 'es' ? 'Categoría' : 'Category'}
                  </label>
                  <select 
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({...prev, category: e.target.value}))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-pink-400 focus:outline-none"
                    disabled={isUploading}
                  >
                    {Object.entries(categories).slice(1).map(([key, category]) => (
                      <option key={key} value={key}>{category.icon} {category.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">
                    {language === 'es' ? 'Descripción/Historia' : 'Caption/Story'}
                  </label>
                  <textarea 
                    value={uploadForm.caption}
                    onChange={(e) => setUploadForm(prev => ({...prev, caption: e.target.value}))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-pink-400 focus:outline-none"
                    rows="3"
                    placeholder={language === 'es' ? 'Cuéntanos la historia detrás de esta foto...' : 'Tell us the story behind this photo...'}
                    disabled={isUploading}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-stone-700 font-semibold mb-2">
                    {language === 'es' ? 'Tu Nombre' : 'Your Name'}
                  </label>
                  <input 
                    type="text"
                    value={uploadForm.uploaderName}
                    onChange={(e) => setUploadForm(prev => ({...prev, uploaderName: e.target.value}))}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:border-pink-400 focus:outline-none"
                    placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                    disabled={isUploading}
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-500 transition-colors font-semibold disabled:bg-stone-300 disabled:cursor-not-allowed"
                >
                  {isUploading 
                    ? (language === 'es' ? '🔄 Subiendo...' : '🔄 Uploading...') 
                    : (language === 'es' ? '🎉 Compartir Foto' : '🎉 Share Photo')
                  }
                </button>
              </form>
            </div>
          </div>
        )}{/* Photo Detail Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  <div className="aspect-square bg-stone-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={selectedPhoto.url} 
                      alt={selectedPhoto.caption}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to camera icon if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-stone-300 text-6xl">📷</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-80 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-stone-700">{selectedPhoto.uploadedBy}</h3>
                      <p className="text-xs text-stone-500">{selectedPhoto.date}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedPhoto(null)}
                      className="text-stone-400 hover:text-stone-600 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-stone-700 mb-6">{selectedPhoto.caption}</p>
                    <div className="flex items-center justify-center gap-6 mb-6 pb-6 border-b border-stone-200">
                    <button 
                      onClick={() => handleReaction(selectedPhoto.id, 'heart')}
                      className={`flex flex-col items-center gap-1 hover:scale-110 transition-all ${
                        hasUserReacted(selectedPhoto.id, 'heart') 
                          ? 'scale-110 opacity-100' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className={`text-2xl ${hasUserReacted(selectedPhoto.id, 'heart') ? 'animate-pulse' : ''}`}>❤️</span>
                      <span className="text-sm text-stone-600">
                        {photoReactions[selectedPhoto.id]?.heart || 0}
                      </span>
                    </button>
                    <button 
                      onClick={() => handleReaction(selectedPhoto.id, 'love')}
                      className={`flex flex-col items-center gap-1 hover:scale-110 transition-all ${
                        hasUserReacted(selectedPhoto.id, 'love') 
                          ? 'scale-110 opacity-100' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className={`text-2xl ${hasUserReacted(selectedPhoto.id, 'love') ? 'animate-pulse' : ''}`}>😍</span>
                      <span className="text-sm text-stone-600">
                        {photoReactions[selectedPhoto.id]?.love || 0}
                      </span>
                    </button>
                    <button 
                      onClick={() => handleReaction(selectedPhoto.id, 'laugh')}
                      className={`flex flex-col items-center gap-1 hover:scale-110 transition-all ${
                        hasUserReacted(selectedPhoto.id, 'laugh') 
                          ? 'scale-110 opacity-100' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className={`text-2xl ${hasUserReacted(selectedPhoto.id, 'laugh') ? 'animate-pulse' : ''}`}>😂</span>
                      <span className="text-sm text-stone-600">
                        {photoReactions[selectedPhoto.id]?.laugh || 0}
                      </span>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-stone-500 mb-4">
                      {language === 'es' 
                        ? 'Gracias por compartir este momento especial con nosotros 💕'
                        : 'Thank you for sharing this special moment with us 💕'
                      }
                    </p>
                    <button 
                      onClick={() => setSelectedPhoto(null)}
                      className="bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition-colors"
                    >
                      {language === 'es' ? 'Cerrar' : 'Close'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
