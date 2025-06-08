// Real guest list - replace with your actual guest data
// TODO: Replace this sample data with your 180 guests in ~60 parties
export const sampleGuestList = [
  // Sample parties - replace with your actual guest list
  {
    partyId: "smith-family",
    partyName: "Smith Family",
    contactEmail: "sam.smith@email.com",
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
    contactEmail: "maria.garcia@email.com",
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
    contactEmail: "alex.johnson@email.com",
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
  //   contactEmail: "main@contact.email",
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

// RSVP response structure
export const createEmptyRSVPResponse = (party) => ({
  partyId: party.partyId,
  partyName: party.partyName,
  submittedBy: "",
  submittedAt: null,
  contactEmail: "",
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
