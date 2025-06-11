import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../data/firebase';
import { sampleGuestList } from '../data/guestList';

export default function AdminDashboard({ language, texts }) {
  const [activeTab, setActiveTab] = useState('rsvp'); // rsvp, registry
  const [rsvps, setRsvps] = useState([]);
  const [registryItems, setRegistryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, wedding, torna
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  // Registry form states
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    targetAmount: '',
    image: '🎁',
    imageFile: null,
    imageUrl: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);// Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAuthError('');
  };

  // Simple password protection - change this to your preferred password
  const ADMIN_PASSWORD = 'VictorLandy2025!';  // Handle password authentication
  const handleAuth = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      loadRSVPs();
    } else {
      setAuthError('Invalid password');
    }
  };
  // Handle image file selection
  const handleImageUpload = (file, isEditing = false) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEditing) {
          setEditingItem(prev => ({
            ...prev,
            imageFile: file,
            imageUrl: e.target.result // Preview URL
          }));
        } else {
          setNewItem(prev => ({
            ...prev,
            imageFile: file,
            imageUrl: e.target.result // Preview URL
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset modal states
  const resetNewItemState = () => {
    setNewItem({ name: '', description: '', targetAmount: '', image: '🎁', imageFile: null, imageUrl: '' });
    setShowAddItemModal(false);
  };

  const resetEditingState = () => {
    setEditingItem(null);
  };
  // Load RSVP data
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'rsvp') {
        loadRSVPs();
      } else if (activeTab === 'registry') {
        loadRegistryItems();
      }
    }
  }, [isAuthenticated, activeTab]);
  const loadRSVPs = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'rsvps'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const rsvpData = [];
      querySnapshot.forEach((doc) => {
        rsvpData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setRsvps(rsvpData);
    } catch (error) {
      console.error('Error loading RSVPs:', error);
      setError('Error loading RSVP data');
    } finally {
      setLoading(false);
    }
  };

  // Load registry items
  const loadRegistryItems = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'registry'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const registryData = [];
      querySnapshot.forEach((doc) => {
        registryData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setRegistryItems(registryData);
    } catch (error) {
      console.error('Error loading registry items:', error);
      setError('Error loading registry data');
    } finally {
      setLoading(false);
    }
  };  // Add new registry item
  const addRegistryItem = async () => {
    if (!newItem.name || !newItem.description || !newItem.targetAmount) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setUploadingImage(true);
      const itemId = newItem.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      let imageUrl = null; // Start with null
      
      // Upload image if a file was selected
      if (newItem.imageFile) {
        const imageRef = ref(storage, `registry/${itemId}/${newItem.imageFile.name}`);
        await uploadBytes(imageRef, newItem.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
      
      const docRef = doc(db, 'registry', itemId);
      
      await setDoc(docRef, {
        itemId,
        name: newItem.name,
        description: newItem.description,
        targetAmount: parseFloat(newItem.targetAmount),
        image: newItem.image,
        imageUrl: imageUrl, // Store the actual download URL or null
        currentAmount: 0,
        contributions: [],
        createdAt: serverTimestamp()
      });setShowAddItemModal(false);
      setNewItem({ name: '', description: '', targetAmount: '', image: '🎁', imageFile: null, imageUrl: '' });
      loadRegistryItems();
      setError('');
    } catch (error) {
      console.error('Error adding registry item:', error);
      setError('Error adding registry item');
    } finally {
      setUploadingImage(false);
    }
  };
  // Update registry item
  const updateRegistryItem = async () => {
    if (!editingItem.name || !editingItem.description || !editingItem.targetAmount) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setUploadingImage(true);
      let imageUrl = editingItem.imageUrl || null;
      
      // Upload new image if a file was selected
      if (editingItem.imageFile) {
        const imageRef = ref(storage, `registry/${editingItem.id}/${editingItem.imageFile.name}`);
        await uploadBytes(imageRef, editingItem.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
      
      const docRef = doc(db, 'registry', editingItem.id);
      
      await updateDoc(docRef, {
        name: editingItem.name,
        description: editingItem.description,
        targetAmount: parseFloat(editingItem.targetAmount),
        image: editingItem.image,
        imageUrl: imageUrl,
        lastUpdated: serverTimestamp()
      });

      setEditingItem(null);
      loadRegistryItems();
      setError('');
    } catch (error) {
      console.error('Error updating registry item:', error);
      setError('Error updating registry item');
    } finally {
      setUploadingImage(false);
    }
  };
  // Delete registry item
  const deleteRegistryItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this registry item? This action cannot be undone.')) {
      return;
    }

    try {
      const docRef = doc(db, 'registry', itemId);
      await deleteDoc(docRef);
      loadRegistryItems();
    } catch (error) {
      console.error('Error deleting registry item:', error);
      setError('Error deleting registry item');
    }
  };

  // Filter and search RSVPs
  const filteredRSVPs = rsvps.filter(rsvp => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!rsvp.partyName.toLowerCase().includes(searchLower) &&
          !rsvp.contactEmail.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    return true;
  });
  // Calculate statistics
  const getStatistics = () => {
    let totalPeople = 0;
    let weddingAttending = 0;
    let weddingNotAttending = 0;
    let tornaAttending = 0;
    let tornaNotAttending = 0;
    let totalDietary = 0;

    rsvps.forEach(rsvp => {
      // Only iterate over the responses object, not all document properties
      Object.values(rsvp.responses || {}).forEach(response => {
        // Make sure this is actually a member response object
        if (response && typeof response === 'object' && (response.weddingDay || response.tornaBoda)) {
          totalPeople++;
          
          if (response.weddingDay === 'yes') weddingAttending++;
          if (response.weddingDay === 'no') weddingNotAttending++;
          if (response.tornaBoda === 'yes') tornaAttending++;
          if (response.tornaBoda === 'no') tornaNotAttending++;
          if (response.dietaryRestrictions?.trim()) totalDietary++;
        }
      });
    });

    return {
      totalParties: rsvps.length,
      totalPeople,
      weddingAttending,
      weddingNotAttending,
      tornaAttending,
      tornaNotAttending,
      totalDietary
    };
  };
  // Get member name from guest list
  const getMemberName = (partyId, memberId) => {
    const party = sampleGuestList.find(p => p.partyId === partyId);
    if (party) {
      const member = party.members.find(m => m.id === memberId);
      return member ? member.name : `Member ${memberId}`;
    }
    return `Member ${memberId}`;
  };

  const stats = getStatistics();

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-16 px-6 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-autography text-stone-700 mb-2">
                Admin Access
              </h1>
              <p className="text-stone-600">
                Enter password to view RSVP dashboard
              </p>
            </div>
            
            <form onSubmit={handleAuth}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              {authError && (
                <div className="mb-4 text-red-600 text-sm text-center">
                  {authError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-pink-400 text-white py-3 px-6 rounded-xl hover:bg-pink-500 transition-colors font-medium"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading RSVP data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-4xl font-autography text-stone-700">
              Admin Dashboard
            </h1>            
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Logout
            </button>
          </div>
          <p className="text-lg text-stone-600">
            Wedding Management Portal
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-xl p-2 shadow-sm border border-stone-200">
              <button
                onClick={() => setActiveTab('rsvp')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'rsvp'
                    ? 'bg-pink-400 text-white'
                    : 'text-stone-600 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                RSVP Management
              </button>
              <button
                onClick={() => setActiveTab('registry')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'registry'
                    ? 'bg-pink-400 text-white'
                    : 'text-stone-600 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                Registry Management
              </button>
            </div>
          </div>
        </div>        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* RSVP Tab Content */}
        {activeTab === 'rsvp' && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="text-2xl font-bold text-stone-700">{stats.totalParties}</div>
                <div className="text-stone-600">Total Parties</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="text-2xl font-bold text-stone-700">{stats.totalPeople}</div>
                <div className="text-stone-600">Total People</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="text-2xl font-bold text-green-600">{stats.weddingAttending}</div>
                <div className="text-stone-600">Wedding Attending</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <div className="text-2xl font-bold text-blue-600">{stats.tornaAttending}</div>
                <div className="text-stone-600">Torna-Boda Attending</div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'all' 
                        ? 'bg-pink-400 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    All Responses
                  </button>
                  <button
                    onClick={() => setFilter('wedding')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'wedding' 
                        ? 'bg-pink-400 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Wedding Day
                  </button>
                  <button
                    onClick={() => setFilter('torna')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'torna' 
                        ? 'bg-pink-400 text-white' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Torna-Boda
                  </button>
                </div>
                
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search parties or emails..."
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={loadRSVPs}
                  className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* RSVP List */}
            <div className="space-y-6">
              {filteredRSVPs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-stone-400 text-4xl mb-4">📭</div>
                  <p className="text-stone-600">No RSVP responses found</p>
                </div>
              ) : (
                filteredRSVPs.map((rsvp) => (
                  <div key={rsvp.id} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-stone-700">{rsvp.partyName}</h3>
                        <p className="text-stone-600">{rsvp.contactEmail}</p>
                        <p className="text-sm text-stone-500">
                          Submitted: {rsvp.submittedAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                        </p>
                      </div>                      
                      <div className="text-right">
                        <div className="text-sm text-stone-500">
                          {Object.values(rsvp.responses || {}).filter(response => 
                            response && typeof response === 'object' && (response.weddingDay || response.tornaBoda)
                          ).length} people
                        </div>
                      </div>
                    </div>                    
                    <div className="grid gap-4">
                      {Object.entries(rsvp.responses || {}).map(([memberId, response]) => {
                        // Skip if this isn't a valid response object
                        if (!response || typeof response !== 'object' || (!response.weddingDay && !response.tornaBoda)) {
                          return null;
                        }

                        return (
                          <div key={memberId} className="border border-stone-100 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-medium text-stone-700">
                                  {getMemberName(rsvp.partyId, memberId)}
                                </h4>
                              </div>
                              <div className="flex gap-4 text-sm">
                                <div className="text-center">
                                  <div className="text-stone-600 mb-1">Wedding</div>
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    response.weddingDay === 'yes' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {response.weddingDay === 'yes' ? 'Yes' : 'No'}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-stone-600 mb-1">Torna-Boda</div>
                                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    response.tornaBoda === 'yes' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {response.tornaBoda === 'yes' ? 'Yes' : 'No'}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {response.dietaryRestrictions && (
                              <div className="mb-2">
                                <span className="text-sm font-medium text-stone-600">Dietary: </span>
                                <span className="text-sm text-stone-700">{response.dietaryRestrictions}</span>
                              </div>
                            )}

                            {response.additionalNotes && (
                              <div>
                                <span className="text-sm font-medium text-stone-600">Notes: </span>
                                <span className="text-sm text-stone-700">{response.additionalNotes}</span>
                              </div>
                            )}
                          </div>
                        );
                      }).filter(Boolean)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Registry Tab Content */}
        {activeTab === 'registry' && (
          <>
            {/* Registry Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-stone-700">Registry Items</h2>
                <p className="text-stone-600">Manage your wedding registry items and contributions</p>
              </div>
              <button
                onClick={() => setShowAddItemModal(true)}
                className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Add New Item
              </button>
            </div>

            {/* Registry Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registryItems.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-stone-400 text-4xl mb-4">🎁</div>
                  <p className="text-stone-600">No registry items found</p>
                  <button
                    onClick={() => setShowAddItemModal(true)}
                    className="mt-4 bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Add Your First Item
                  </button>
                </div>
              ) : (
                registryItems.map((item) => (                  <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                    <div className="text-center mb-4">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                        />
                      ) : (
                        <div className="text-3xl mb-2">{item.image}</div>
                      )}
                      <h3 className="font-semibold text-stone-700 mb-2">{item.name}</h3>
                      <p className="text-sm text-stone-600 mb-3">{item.description}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-stone-600 mb-2">
                        <span>Contributed: ${item.currentAmount || 0}</span>
                        <span>Goal: ${item.targetAmount}</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-pink-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(((item.currentAmount || 0) / item.targetAmount) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-2 text-sm text-stone-600">
                        {Math.round(((item.currentAmount || 0) / item.targetAmount) * 100)}% complete
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRegistryItem(item.id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>

                    {item.contributions && item.contributions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-stone-200">
                        <p className="text-sm font-medium text-stone-600 mb-2">
                          Recent Contributions ({item.contributions.length})
                        </p>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {item.contributions.slice(-3).map((contribution, index) => (
                            <div key={index} className="text-xs text-stone-600 bg-stone-50 p-2 rounded">
                              <span className="font-medium">${contribution.amount}</span> by {contribution.contributorName}
                              {contribution.message && (
                                <div className="italic mt-1">"{contribution.message}"</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>        )}        {/* Add Item Modal */}
        {showAddItemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-stone-700">Add New Registry Item</h3>                  <button
                    onClick={resetNewItemState}
                    className="text-stone-400 hover:text-stone-600 p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Item Name</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      placeholder="Living Room Sofa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      rows="3"
                      placeholder="A beautiful, comfortable sofa for our new living room..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Target Amount ($)</label>
                    <input
                      type="number"
                      min="1"
                      value={newItem.targetAmount}
                      onChange={(e) => setNewItem({ ...newItem, targetAmount: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      placeholder="1500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Item Image</label>
                    <div className="space-y-3">
                      {/* Image Preview */}
                      <div className="flex items-center justify-center w-full">
                        {newItem.imageUrl ? (
                          <div className="relative">
                            <img 
                              src={newItem.imageUrl} 
                              alt="Preview"
                              className="w-20 h-20 object-cover rounded-xl border-2 border-stone-200"
                            />
                            <button
                              onClick={() => setNewItem({ ...newItem, imageFile: null, imageUrl: '' })}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div className="text-4xl p-4 bg-stone-100 rounded-xl">
                            {newItem.image}
                          </div>
                        )}
                      </div>
                        {/* File Upload */}
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer bg-stone-50 hover:bg-stone-100">
                          <div className="flex flex-col items-center justify-center py-2">
                            <svg className="w-6 h-6 mb-1 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-xs text-stone-500">Upload image</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], false)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Emoji Icon (fallback)</label>
                    <input
                      type="text"
                      value={newItem.image}
                      onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      placeholder="🛋️"
                    />
                  </div>
                </div>                <div className="flex gap-3 mt-6">
                  <button
                    onClick={resetNewItemState}
                    className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button><button
                    onClick={addRegistryItem}
                    disabled={!newItem.name || !newItem.description || !newItem.targetAmount || uploadingImage}
                    className="flex-1 bg-pink-400 hover:bg-pink-500 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    {uploadingImage ? 'Uploading...' : 'Add Item'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}        {/* Edit Item Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-stone-700">Edit Registry Item</h3>                  <button
                    onClick={resetEditingState}
                    className="text-stone-400 hover:text-stone-600 p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Item Name</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                    <textarea
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Target Amount ($)</label>
                    <input
                      type="number"
                      min="1"
                      value={editingItem.targetAmount}
                      onChange={(e) => setEditingItem({ ...editingItem, targetAmount: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Item Image</label>
                    <div className="space-y-3">
                      {/* Current Image Preview */}
                      <div className="flex items-center justify-center w-full">
                        {editingItem.imageUrl ? (
                          <div className="relative">
                            <img 
                              src={editingItem.imageUrl} 
                              alt="Current"
                              className="w-20 h-20 object-cover rounded-xl border-2 border-stone-200"
                            />
                            {editingItem.imageFile && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xs">New</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-4xl p-4 bg-stone-100 rounded-xl">
                            {editingItem.image}
                          </div>
                        )}
                      </div>
                      
                      {/* File Upload */}
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer bg-stone-50 hover:bg-stone-100">
                          <div className="flex flex-col items-center justify-center pt-2 pb-3">
                            <svg className="w-6 h-6 mb-2 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-xs text-stone-500">Upload new image</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], true)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Emoji Icon (fallback)</label>
                    <input
                      type="text"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-stone-50 rounded-xl p-4">
                    <div className="text-sm text-stone-600 mb-2">
                      Current Progress: ${editingItem.currentAmount || 0} / ${editingItem.targetAmount}
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-pink-400 rounded-full"
                        style={{ width: `${Math.min(((editingItem.currentAmount || 0) / editingItem.targetAmount) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>                <div className="flex gap-3 mt-6">
                  <button
                    onClick={resetEditingState}
                    className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button><button
                    onClick={updateRegistryItem}
                    disabled={!editingItem.name || !editingItem.description || !editingItem.targetAmount || uploadingImage}
                    className="flex-1 bg-pink-400 hover:bg-pink-500 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-medium transition-colors"
                  >
                    {uploadingImage ? 'Uploading...' : 'Update Item'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
