// Guest List Converter - Run this script to convert your CSV data to the proper format
// Instructions:
// 1. Export your Excel file to CSV format
// 2. Update the CSV file path below
// 3. Run: node convert-guest-list.js

const fs = require('fs');
const path = require('path');

// Configuration - Update these paths
const CSV_FILE_PATH = './guest-list.csv'; // Update this to your CSV file path
const OUTPUT_FILE_PATH = './src/data/converted-guest-list.js';

// Function to read CSV and convert to guest list format
function convertCSVToGuestList(csvFilePath) {
  try {
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvContent.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length === 0) {
      throw new Error('CSV file is empty');
    }
    
    // Parse header to find column indices
    const header = lines[0].split(',').map(col => col.replace(/"/g, '').trim().toLowerCase());
    const guestNameIndex = header.findIndex(col => 
      col.includes('guest name') || col.includes('guest') || col.includes('name')
    );
    const partyNameIndex = header.findIndex(col => 
      col.includes('party name') || col.includes('party') || col.includes('group')
    );
    
    if (guestNameIndex === -1 || partyNameIndex === -1) {
      console.log('Available columns:', header);
      throw new Error('Could not find "Guest Name" and "Party Name" columns');
    }
    
    console.log(`Found Guest Name at column ${guestNameIndex + 1}: "${header[guestNameIndex]}"`);
    console.log(`Found Party Name at column ${partyNameIndex + 1}: "${header[partyNameIndex]}"`);
    
    // Parse data rows
    const guestData = {};
    
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(cell => cell.replace(/"/g, '').trim());
      
      if (row.length <= Math.max(guestNameIndex, partyNameIndex)) {
        console.warn(`Skipping incomplete row ${i + 1}: ${lines[i]}`);
        continue;
      }
      
      const guestName = row[guestNameIndex];
      const partyName = row[partyNameIndex];
      
      if (!guestName || !partyName) {
        console.warn(`Skipping row ${i + 1} with missing data: Guest="${guestName}", Party="${partyName}"`);
        continue;
      }
      
      // Group guests by party
      if (!guestData[partyName]) {
        guestData[partyName] = [];
      }
      
      guestData[partyName].push(guestName);
    }
    
    return guestData;
  } catch (error) {
    console.error('Error reading CSV:', error.message);
    return null;
  }
}

// Function to generate guest list structure
function generateGuestListJS(guestData) {
  const parties = [];
  
  Object.entries(guestData).forEach(([partyName, guests], index) => {
    // Create party ID from party name
    const partyId = partyName.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50); // Limit length
    
    // Create members array
    const members = guests.map((guestName, memberIndex) => {
      // Create member ID from guest name
      const memberId = guestName.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      
      // Generate search names (name variations)
      const searchNames = generateSearchNames(guestName);
      
      return {
        id: memberId,
        name: guestName,
        isMainContact: memberIndex === 0, // First member is main contact
        searchNames: searchNames
      };
    });
    
    // Assume first member's email pattern (you'll need to update these)
    const contactEmail = `${members[0].id.replace(/-/g, '.')}@example.com`;
    
    parties.push({
      partyId: partyId,
      partyName: partyName,
      contactEmail: contactEmail, // TODO: Update with real emails
      members: members
    });
  });
  
  return parties;
}

// Function to generate search name variations
function generateSearchNames(fullName) {
  const names = fullName.toLowerCase().split(' ').filter(name => name.length > 0);
  const searchNames = [fullName.toLowerCase()];
  
  // Add individual names
  names.forEach(name => {
    if (!searchNames.includes(name)) {
      searchNames.push(name);
    }
  });
  
  // Add first + last name combinations
  if (names.length >= 2) {
    const firstLast = `${names[0]} ${names[names.length - 1]}`;
    if (!searchNames.includes(firstLast)) {
      searchNames.push(firstLast);
    }
  }
  
  // Add common nickname patterns
  if (names[0]) {
    const firstName = names[0];
    const commonNicknames = {
      'alexander': ['alex', 'al'],
      'alexandra': ['alex', 'lexi'],
      'elizabeth': ['liz', 'beth', 'betty'],
      'robert': ['rob', 'bob', 'bobby'],
      'william': ['will', 'bill', 'billy'],
      'michael': ['mike', 'mick'],
      'christopher': ['chris'],
      'matthew': ['matt'],
      'jennifer': ['jen', 'jenny'],
      'jessica': ['jess', 'jessie'],
      'stephanie': ['steph'],
      'katherine': ['kate', 'katie', 'kathy'],
      'anthony': ['tony'],
      'patricia': ['pat', 'patty', 'trish'],
      'margaret': ['maggie', 'peggy']
    };
    
    if (commonNicknames[firstName]) {
      commonNicknames[firstName].forEach(nickname => {
        searchNames.push(nickname);
        if (names.length >= 2) {
          searchNames.push(`${nickname} ${names[names.length - 1]}`);
        }
      });
    }
  }
  
  return [...new Set(searchNames)]; // Remove duplicates
}

// Main execution
function main() {
  console.log('🎉 Wedding Guest List Converter');
  console.log('================================');
  
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`❌ CSV file not found: ${CSV_FILE_PATH}`);
    console.log('📋 Instructions:');
    console.log('1. Export your Excel file to CSV format');
    console.log('2. Save it as "guest-list.csv" in the project root');
    console.log('3. Or update CSV_FILE_PATH in this script');
    return;
  }
  
  console.log(`📖 Reading CSV file: ${CSV_FILE_PATH}`);
  const guestData = convertCSVToGuestList(CSV_FILE_PATH);
  
  if (!guestData) {
    return;
  }
  
  console.log(`✅ Found ${Object.keys(guestData).length} parties with ${Object.values(guestData).flat().length} total guests`);
  
  const guestList = generateGuestListJS(guestData);
  
  // Generate the JavaScript file content
  const jsContent = `// Auto-generated guest list from Excel/CSV
// Generated on: ${new Date().toISOString()}
// TODO: Update contact emails with real email addresses

export const guestList = ${JSON.stringify(guestList, null, 2)};

// Export functions from original guestList.js
export const searchGuestByName = (searchName, guestListData = guestList) => {
  const normalizedSearch = searchName.toLowerCase().trim();
  
  for (const party of guestListData) {
    for (const member of party.members) {
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

export const searchGuests = (searchTerm) => {
  const results = [];
  const searchLower = searchTerm.toLowerCase().trim();
  
  if (searchLower.length < 2) {
    return results;
  }
  
  guestList.forEach(party => {
    party.members.forEach(member => {
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
      wedding: "",
      tornaBoda: "",
      dietaryRestrictions: "",
      notes: ""
    }
  }), {})
});
`;
  
  // Write the output file
  fs.writeFileSync(OUTPUT_FILE_PATH, jsContent);
  
  console.log(`✅ Generated guest list: ${OUTPUT_FILE_PATH}`);
  console.log(`📊 Statistics:`);
  console.log(`   - Total parties: ${guestList.length}`);
  console.log(`   - Total guests: ${guestList.reduce((sum, party) => sum + party.members.length, 0)}`);
  console.log(`   - Average party size: ${(guestList.reduce((sum, party) => sum + party.members.length, 0) / guestList.length).toFixed(1)}`);
  
  console.log('\n📝 Next Steps:');
  console.log('1. Review the generated file and update contact emails');
  console.log('2. Check search names and add any missing nicknames');
  console.log('3. Replace the import in your components to use the new guest list');
  console.log('4. Test the RSVP system with your real data');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { convertCSVToGuestList, generateGuestListJS };
