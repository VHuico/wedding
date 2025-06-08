import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../data/firebase';
import { sampleGuestList } from '../data/guestList';

export default function AdminDashboard({ language, texts }) {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, wedding, torna
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAuthError('');
  };

  // Simple password protection - change this to your preferred password
  const ADMIN_PASSWORD = 'VictorLandy2025!';
  // Handle password authentication
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

  // Load RSVP data
  useEffect(() => {
    if (isAuthenticated) {
      loadRSVPs();
    }
  }, [isAuthenticated]);

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
              RSVP Dashboard
            </h1>            <button
              onClick={handleLogout}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Logout
            </button>
          </div>
          <p className="text-lg text-stone-600">
            Wedding Response Management
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

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
                  </div>                  <div className="text-right">
                    <div className="text-sm text-stone-500">
                      {Object.values(rsvp.responses || {}).filter(response => 
                        response && typeof response === 'object' && (response.weddingDay || response.tornaBoda)
                      ).length} people
                    </div>
                  </div>
                </div>                <div className="grid gap-4">
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
      </div>
    </div>
  );
}
