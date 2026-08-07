const fs = require('fs');
const path = './src/data/treksData.js';
let content = fs.readFileSync(path, 'utf8');

const newGallery = `  "gallery": [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBJN1DqlFxqoaHMMIsrOf0IcCYycsT3hb0-ziYzHm3Q&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wlvt4a57yn0n-R9EbGDDuFH1XgVOC2P9SCPo2OdZxQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiAqV4I_xhUpiNUuIa_VM6y1pj7pC-AIgNQ_laaHfKQg&s=10"
  ],`;

const newFacts = `  "facts": {
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

// Replace difficulty and activity for ebc-heli-return
content = content.replace(/"difficulty":\s*"[^"]+"/, '"difficulty": "Moderate"');
content = content.replace(/"activity":\s*"[^"]+"/, '"activity": "Walking / Hiking / Heli"');

if (!content.includes('"gallery": [')) {
    content = content.replace(/"quickFacts":/, `${newGallery}\n${newFacts}\n  "quickFacts":`);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done!');
