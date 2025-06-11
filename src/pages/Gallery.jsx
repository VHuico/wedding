import React, { useState, useEffect } from 'react';
import { storage, db } from '../data/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';

export default function Gallery({ language, texts }) {  const [activeTab, setActiveTab] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
    // Upload form state
  const [uploadForm, setUploadForm] = useState({
    files: [], // Changed from single file to array of files
    category: 'engagement',
    caption: '',
    uploaderName: ''
  });  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);  // Load uploaded photos from Firebase
  useEffect(() => {
    loadUploadedPhotos();
  }, []);

  // Load uploaded photos from Firebase
  const loadUploadedPhotos = async () => {
    try {
      const photosQuery = query(collection(db, 'gallery-photos'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(photosQuery);
      const photos = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();        photos.push({
          id: doc.id,
          ...data,
          date: data.uploadedAt?.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          // Handle both single photos and photo collections
          isCollection: data.urls && data.urls.length > 1,
          urls: data.urls || [data.url], // Convert single url to array for consistency
          url: data.urls ? data.urls[0] : data.url // Main display image
        });
      });
        setUploadedPhotos(photos);
      
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };// Handle form submission - show confirmation dialog first
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!uploadForm.files.length || !uploadForm.caption.trim() || !uploadForm.uploaderName.trim()) {
      alert(language === 'es' 
        ? 'Por favor completa todos los campos y selecciona al menos una foto'
        : 'Please fill in all fields and select at least one photo'
      );
      return;
    }

    if (uploadForm.files.length > 15) {
      alert(language === 'es' 
        ? 'Máximo 15 fotos por subida'
        : 'Maximum 15 photos per upload'
      );
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };
  // Handle confirmed file upload
  const handleConfirmedUpload = async () => {
    setShowConfirmDialog(false);
    setIsUploading(true);
    
    try {
      const uploadedUrls = [];
      const timestamp = Date.now();
      
      // Upload all files
      for (let i = 0; i < uploadForm.files.length; i++) {
        const file = uploadForm.files[i];
        const filename = `gallery/${timestamp}-${i}-${file.name}`;
        const storageRef = ref(storage, filename);
        
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(downloadURL);
      }

      // Save photo collection metadata to Firestore
      const photoData = {
        urls: uploadedUrls,
        url: uploadedUrls[0], // Main display image
        caption: uploadForm.caption.trim(),        category: uploadForm.category,
        uploadedBy: uploadForm.uploaderName.trim(),
        uploadedAt: new Date(),
        photoCount: uploadedUrls.length
      };
      
      await addDoc(collection(db, 'gallery-photos'), photoData);
      
      // Reset form and close modal
      setUploadForm({
        files: [],
        category: 'engagement',
        caption: '',
        uploaderName: ''
      });
      setShowUploadModal(false);
      
      // Reload photos
      await loadUploadedPhotos();
      
      alert(language === 'es' 
        ? `¡${uploadedUrls.length} foto${uploadedUrls.length > 1 ? 's' : ''} subida${uploadedUrls.length > 1 ? 's' : ''} exitosamente! 🎉`
        : `${uploadedUrls.length} photo${uploadedUrls.length > 1 ? 's' : ''} uploaded successfully! 🎉`
      );
      
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert(language === 'es'
        ? 'Error al subir las fotos. Por favor intenta de nuevo.'
        : 'Error uploading photos. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }  };

  // Swipe detection functions
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (selectedPhoto && selectedPhoto.urls.length > 1) {
      if (isLeftSwipe) {
        // Swipe left - next image
        setCurrentImageIndex(prev => 
          prev === selectedPhoto.urls.length - 1 ? 0 : prev + 1
        );
      }
      if (isRightSwipe) {
        // Swipe right - previous image
        setCurrentImageIndex(prev => 
          prev === 0 ? selectedPhoto.urls.length - 1 : prev - 1
        );
      }
    }
  };
  // Use only uploaded photos from Firebase
  const allPhotos = uploadedPhotos;
    // Calculate dynamic statistics
  const totalPhotos = allPhotos.length;
  const totalContributors = [...new Set(allPhotos.map(photo => photo.uploadedBy))].length;
  const totalUploads = allPhotos.reduce((total, photo) => {
    return total + (photo.urls ? photo.urls.length : 1);
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
                
                {/* Photo collection indicator */}
                {photo.isCollection && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <span>📸</span>
                    <span>{photo.urls.length}</span>
                  </div>
                )}
                
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
                <div className="flex items-center justify-end">
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
                {language === 'es' ? 'Publicaciones' : 'Posts'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">{totalUploads}</div>
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
          </div>
        </div>        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
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
              
              <form onSubmit={handleFormSubmit} className="space-y-4">                <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-stone-600 mb-4">
                    {language === 'es' ? 'Selecciona tus fotos (máximo 15)' : 'Select your photos (max 15)'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files).slice(0, 15);
                      setUploadForm(prev => ({...prev, files}));
                    }}
                    className="hidden"
                    id="photo-upload"
                    disabled={isUploading}
                  />
                  <label 
                    htmlFor="photo-upload"
                    className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition-colors cursor-pointer inline-block"
                  >
                    {language === 'es' ? 'Seleccionar Archivos' : 'Select Files'}
                  </label>
                  {uploadForm.files.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-stone-600 mb-2">
                        {uploadForm.files.length} {language === 'es' ? 'archivo(s) seleccionado(s)' : 'file(s) selected'}
                      </p>
                      <div className="max-h-32 overflow-y-auto">
                        {uploadForm.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-stone-50 rounded p-2 mb-1">
                            <span className="text-xs text-stone-600 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newFiles = uploadForm.files.filter((_, i) => i !== index);
                                setUploadForm(prev => ({...prev, files: newFiles}));
                              }}
                              className="text-red-500 hover:text-red-700 ml-2"
                              disabled={isUploading}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
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
                </button>              </form>
            </div>
          </div>
        )}        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-autography text-stone-700 mb-4">
                  {language === 'es' ? '¿Confirmar subida?' : 'Confirm Upload?'}
                </h3>                <p className="text-stone-600 text-sm leading-relaxed">
                  {language === 'es' 
                    ? `Una vez que subas tu${uploadForm.files.length > 1 ? 's' : ''} foto${uploadForm.files.length > 1 ? 's' : ''}, no podrás eliminarla${uploadForm.files.length > 1 ? 's' : ''}. ¿Estás seguro de que quieres compartir ${uploadForm.files.length > 1 ? 'estas imágenes' : 'esta imagen'}?`
                    : `Once you upload your photo${uploadForm.files.length > 1 ? 's' : ''}, you won't be able to delete ${uploadForm.files.length > 1 ? 'them' : 'it'}. Are you sure you want to share ${uploadForm.files.length > 1 ? 'these images' : 'this image'}?`
                  }
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 bg-stone-200 text-stone-700 py-3 rounded-lg hover:bg-stone-300 transition-colors font-medium"
                >
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  onClick={handleConfirmedUpload}
                  className="flex-1 bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-500 transition-colors font-medium"
                >
                  {language === 'es' ? 'Sí, compartir' : 'Yes, share'}
                </button>
              </div>
            </div>
          </div>
        )}        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 relative">
                  <div 
                    className="aspect-square bg-stone-100 flex items-center justify-center overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <img 
                      src={selectedPhoto.urls[currentImageIndex]} 
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
                  
                  {/* Navigation arrows for collections - hidden on mobile */}
                  {selectedPhoto.urls.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === 0 ? selectedPhoto.urls.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all hidden md:block"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === selectedPhoto.urls.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all hidden md:block"
                      >
                        →
                      </button>
                      
                      {/* Image counter */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded-full">
                        {currentImageIndex + 1} / {selectedPhoto.urls.length}
                      </div>
                      
                      {/* Swipe instruction for mobile */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-3 py-1 rounded-full md:hidden">
                        {language === 'es' ? 'Desliza para ver más' : 'Swipe to see more'}
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full md:w-80 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-stone-700">{selectedPhoto.uploadedBy}</h3>
                      <p className="text-xs text-stone-500">{selectedPhoto.date}</p>
                      {selectedPhoto.urls.length > 1 && (
                        <p className="text-xs text-pink-400 mt-1">
                          📸 {selectedPhoto.urls.length} {language === 'es' ? 'fotos' : 'photos'}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedPhoto(null);
                        setCurrentImageIndex(0);
                      }}
                      className="text-stone-400 hover:text-stone-600 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-stone-700 mb-6">{selectedPhoto.caption}</p>
                  
                  {/* Thumbnail navigation for collections */}
                  {selectedPhoto.urls.length > 1 && (
                    <div className="mb-6">
                      <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                        {selectedPhoto.urls.map((url, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 ${
                              currentImageIndex === index 
                                ? 'border-pink-400' 
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <img 
                              src={url} 
                              alt={`${selectedPhoto.caption} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <p className="text-sm text-stone-500">
                      {language === 'es' 
                        ? 'Gracias por compartir este momento especial con nosotros 💕'
                        : 'Thank you for sharing this special moment with us 💕'
                      }
                    </p>
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
