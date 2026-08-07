const fs = require('fs');
const path = './src/data/treksData.js';
let content = fs.readFileSync(path, 'utf8');

const newGallery = `
  gallery: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBJN1DqlFxqoaHMMIsrOf0IcCYycsT3hb0-ziYzHm3Q&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wlvt4a57yn0n-R9EbGDDuFH1XgVOC2P9SCPo2OdZxQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiAqV4I_xhUpiNUuIa_VM6y1pj7pC-AIgNQ_laaHfKQg&s=10"
  ],`;

const newFacts = `
  facts: {
    "Country": "Nepal",
    "Duration": "12 Days",
    "Trip Grade": "Moderate",
    "Max. Altitude": "5545",
    "Starts": "Kathmandu",
    "Ends": "Kathmandu",
    "Activities": "Walking / Hiking / Heli",
    "Accomodation": "Hotels / Lodges",
    "Meals": "Breakfast, Lunch & Dinner",
    "Best Time": "Spring & Autumn"
  },`;

content = content.replace(/id:\s*['"]ebc-heli-return['"][\s\S]*?}/, (match) => {
    // Check if gallery or facts already exist to avoid duplication, though we know they don't from our previous script.
    let newMatch = match;
    
    // insert right before quickFacts
    newMatch = newMatch.replace(/quickFacts:/, `${newGallery}\n${newFacts}\n  quickFacts:`);
    return newMatch;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Trek updated with gallery and facts!');
