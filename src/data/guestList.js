import { collection, getDocs, query, orderBy, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Real guest list - replace with your actual guest data
// TODO: Replace this sample data with your 180 guests in ~60 parties
export const sampleGuestList = [
  // Sample parties - replace with your actual guest list
  {
    partyId: "smith-family",
    partyName: "Smith Family",
    contactPhone: "(555) 123-4567",
    members: [
      { 
        id: "sam-smith", 
        name: "Sam Smith", 
        isMainContact: true,
        searchNames: ["sam smith", "samuel smith"]
      },
      { 
        id: "sarah-smith", 
        name: "Sarah Smith", 
        isMainContact: false,
        searchNames: ["sarah smith", "sara smith"]
      },
      { 
        id: "sam-smith-jr", 
        name: "Sam Smith Jr", 
        isMainContact: false,
        searchNames: ["sam smith jr", "sam jr", "sammy smith"]
      }
    ]
  },
  {
    partyId: "garcia-family",
    partyName: "García Family",
    contactPhone: "(555) 987-6543",
    members: [
      { 
        id: "maria-garcia", 
        name: "María García", 
        isMainContact: true,
        searchNames: ["maria garcia", "maría garcía", "maria"]
      },
      { 
        id: "carlos-garcia", 
        name: "Carlos García", 
        isMainContact: false,
        searchNames: ["carlos garcia", "carlos garcía", "carlos"]
      }
    ]
  },
  {
    partyId: "johnson-party",
    partyName: "Johnson Party",
    contactPhone: "(555) 456-7890",
    members: [
      { 
        id: "alex-johnson", 
        name: "Alex Johnson", 
        isMainContact: true,
        searchNames: ["alex johnson", "alexander johnson", "alex"]
      },
      { 
        id: "jamie-johnson", 
        name: "Jamie Johnson", 
        isMainContact: false,
        searchNames: ["jamie johnson", "james johnson"]
      },
      { 
        id: "taylor-johnson", 
        name: "Taylor Johnson", 
        isMainContact: false,
        searchNames: ["taylor johnson", "taylor"]
      }
    ]
  }
  // TODO: Add your remaining ~57 parties here
  // Each party should follow this structure:
  // {
  //   partyId: "unique-party-id",
  //   partyName: "Display Name for Party",
  //   contactPhone: "(555) 123-4567",
  //   members: [
  //     {
  //       id: "unique-member-id",
  //       name: "Full Name",
  //       isMainContact: true/false,
  //       searchNames: ["name variations", "nicknames", "alternative spellings"]
  //     }
  //   ]
  // }
];

// Helper function to search guests by name
export const searchGuestByName = (searchName, guestList = sampleGuestList) => {
  const normalizedSearch = searchName.toLowerCase().trim();
  
  for (const party of guestList) {
    for (const member of party.members) {
      // Check if the search matches the member's name or any search alternatives
      const matchesName = member.name.toLowerCase().includes(normalizedSearch);
      const matchesSearchNames = member.searchNames.some(searchAlias => 
        searchAlias.toLowerCase().includes(normalizedSearch) || 
        normalizedSearch.includes(searchAlias.toLowerCase())
      );
      
      if (matchesName || matchesSearchNames) {
        return {
          party,
          matchedMember: member
        };
      }
    }
  }
  
  return null;
};

// Search function to find guests by name
export const searchGuests = (searchTerm) => {
  const results = [];
  const searchLower = searchTerm.toLowerCase().trim();
  
  if (searchLower.length < 2) {
    return results;
  }
  
  sampleGuestList.forEach(party => {
    party.members.forEach(member => {
      // Check if any of the search names match
      const matches = member.searchNames.some(searchName => 
        searchName.toLowerCase().includes(searchLower)
      );
      
      if (matches) {
        results.push({
          party: party,
          matchedMember: member
        });
      }
    });
  });
  
  // Remove duplicates (same party found multiple times)
  const uniqueResults = [];
  const seenPartyIds = new Set();
  
  results.forEach(result => {
    if (!seenPartyIds.has(result.party.partyId)) {
      seenPartyIds.add(result.party.partyId);
      uniqueResults.push(result);
    }
  });
  
  return uniqueResults;
};

// Search function to find guests by name (from Firestore)
export const searchGuestsFromFirestore = async (searchTerm) => {
  const results = [];
  const searchLower = searchTerm.toLowerCase().trim();
  
  if (searchLower.length < 2) {
    return results;
  }
  
  try {
    // Load all guest parties from Firestore
    const q = query(collection(db, 'guestList'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const guestData = [];
    querySnapshot.forEach((doc) => {
      guestData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // If no guests in Firestore, fall back to sample data
    const guestList = guestData.length > 0 ? guestData : sampleGuestList.map(party => ({
      id: party.partyId,
      ...party,
      createdAt: new Date()
    }));
    
    guestList.forEach(party => {
      party.members.forEach(member => {
        // Check if any of the search names match
        const matches = member.searchNames.some(searchName => 
          searchName.toLowerCase().includes(searchLower)
        );
        
        if (matches) {
          results.push({
            party: party,
            matchedMember: member
          });
        }
      });
    });
    
    // Remove duplicates (same party found multiple times)
    const uniqueResults = [];
    const seenPartyIds = new Set();
    
    results.forEach(result => {
      if (!seenPartyIds.has(result.party.partyId)) {
        seenPartyIds.add(result.party.partyId);
        uniqueResults.push(result);
      }
    });
    
    return uniqueResults;
  } catch (error) {
    console.error('Error searching guests from Firestore:', error);
    // Fall back to local search if Firestore fails
    return searchGuests(searchTerm);
  }
};

// RSVP response structure
export const createEmptyRSVPResponse = (party) => ({
  partyId: party.partyId,
  partyName: party.partyName,
  submittedBy: "",
  submittedAt: null,
  contactPhone: "",
  generalMessage: "",
  responses: party.members.reduce((acc, member) => ({
    ...acc,
    [member.id]: {
      name: member.name,
      wedding: "", // "yes" | "no" | ""
      tornaBoda: "", // "yes" | "no" | ""
      dietaryRestrictions: "",
      notes: ""
    }
  }), {})
});

// Helper function to migrate sample data to Firestore (run once)
export const migrateSampleDataToFirestore = async () => {
  try {
    console.log('Starting migration of sample data to Firestore...');
    
    for (const party of sampleGuestList) {
      const docRef = doc(db, 'guestList', party.partyId);
      
      await setDoc(docRef, {
        partyId: party.partyId,
        partyName: party.partyName,
        contactPhone: party.contactPhone,
        members: party.members,
        createdAt: serverTimestamp(),
        migratedFromSample: true
      });
      
      console.log(`Migrated party: ${party.partyName}`);
    }
    
    console.log('Migration completed successfully!');
    return { success: true, count: sampleGuestList.length };
  } catch (error) {
    console.error('Error migrating sample data:', error);
    return { success: false, error: error.message };
  }
};

// Helper functions for RSVP management
export const getAllGuestsFromFirestore = async () => {
  try {
    const q = query(collection(db, 'guestList'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const guestData = [];
    querySnapshot.forEach((doc) => {
      guestData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return guestData;
  } catch (error) {
    console.error('Error loading all guests:', error);
    return [];
  }
};

// Get guests who have submitted RSVPs
export const getRSVPResponders = async () => {
  try {
    const allGuests = await getAllGuestsFromFirestore();
    return allGuests.filter(party => party.rsvpSubmitted === true);
  } catch (error) {
    console.error('Error loading RSVP responders:', error);
    return [];
  }
};

// Get guests who haven't submitted RSVPs
export const getPendingRSVPs = async () => {
  try {
    const allGuests = await getAllGuestsFromFirestore();
    return allGuests.filter(party => !party.rsvpSubmitted);
  } catch (error) {
    console.error('Error loading pending RSVPs:', error);
    return [];
  }
};

// Get RSVP statistics
export const getRSVPStats = async () => {
  try {
    const allGuests = await getAllGuestsFromFirestore();
    
    let totalGuests = 0;
    let rsvpSubmitted = 0;
    let weddingAttending = 0;
    let tornaAttending = 0;
    
    allGuests.forEach(party => {
      totalGuests += party.members.length;
      
      if (party.rsvpSubmitted) {
        rsvpSubmitted += party.members.length;
        
        party.members.forEach(member => {
          if (member.weddingDay === 'yes') weddingAttending++;
          if (member.tornaBoda === 'yes') tornaAttending++;
        });
      }
    });
    
    return {
      totalGuests,
      rsvpSubmitted,
      pendingRSVP: totalGuests - rsvpSubmitted,
      weddingAttending,
      tornaAttending,
      rsvpResponseRate: totalGuests > 0 ? (rsvpSubmitted / totalGuests * 100).toFixed(1) : 0
    };
  } catch (error) {
    console.error('Error calculating RSVP stats:', error);
    return {
      totalGuests: 0,
      rsvpSubmitted: 0,
      pendingRSVP: 0,
      weddingAttending: 0,
      tornaAttending: 0,
      rsvpResponseRate: 0
    };
  }
};
