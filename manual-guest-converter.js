// Manual Guest List Template
// Copy your Excel data here and manually format it

// Step 1: Paste your Excel data in this format:
const rawGuestData = [
  // ["Guest Name", "Party Name"],
  // ["John Smith", "Smith Family"],
  // ["Jane Smith", "Smith Family"],
  // ["María García", "García Family"],
  // ["Carlos García", "García Family"],
  // ... add all your guests here
];

// Step 2: Run this function to convert to proper format
function convertRawDataToGuestList(rawData) {
  const parties = {};
  
  // Group by party
  rawData.forEach(([guestName, partyName]) => {
    if (!parties[partyName]) {
      parties[partyName] = [];
    }
    parties[partyName].push(guestName);
  });
  
  // Convert to proper structure
  const guestList = Object.entries(parties).map(([partyName, guests]) => {
    const partyId = partyName.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    
    const members = guests.map((guestName, index) => {
      const memberId = guestName.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      
      // Generate search variations
      const names = guestName.toLowerCase().split(' ');
      const searchNames = [
        guestName.toLowerCase(),
        ...names,
        names[0] + ' ' + names[names.length - 1] // first + last
      ].filter((name, index, arr) => arr.indexOf(name) === index);
      
      return {
        id: memberId,
        name: guestName,
        isMainContact: index === 0,
        searchNames: searchNames
      };
    });
    
    return {
      partyId: partyId,
      partyName: partyName,
      contactEmail: `${members[0].id.replace(/-/g, '.')}@example.com`, // TODO: Update
      members: members
    };
  });
  
  return guestList;
}

// Example usage:
// const myGuestList = convertRawDataToGuestList(rawGuestData);
// console.log(JSON.stringify(myGuestList, null, 2));

module.exports = { convertRawDataToGuestList };
