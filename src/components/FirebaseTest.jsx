import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../data/firebase';

export default function FirebaseTest() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    setStatus('Testing Firebase connection...');
    
    try {
      // Try to write a test document
      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Firebase connection test',
        timestamp: serverTimestamp()
      });
      
      setStatus(`✅ Success! Document written with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Firebase test error:', error);
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-stone-200 mb-4">
      <h3 className="text-lg font-semibold text-stone-700 mb-4">
        Firebase Connection Test
      </h3>
      
      <button
        onClick={testFirebaseConnection}
        disabled={loading}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          loading 
            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {loading ? 'Testing...' : 'Test Firebase'}
      </button>
      
      {status && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-sm">{status}</p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-stone-600">
        <p><strong>Instructions:</strong></p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Create a Firebase project at console.firebase.google.com</li>
          <li>Enable Firestore Database</li>
          <li>Copy your config to src/data/firebase.js</li>
          <li>Click "Test Firebase" to verify connection</li>
        </ol>
      </div>
    </div>
  );
}
