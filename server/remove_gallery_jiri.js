const fs = require('fs');

const databasePath = './database.json';

// Read the database
let rawdata = fs.readFileSync(databasePath);
let data = JSON.parse(rawdata);

// Find the trek
const trekId = "jiri-to-everest-base-camp-22-days";
const trekIndex = data.treks.findIndex(t => t.id === trekId);

if (trekIndex !== -1) {
  // Clear the gallery
  data.treks[trekIndex].gallery = [];

  // Write back to the file
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  console.log('Jiri to Everest Base Camp 22 Days Trek gallery removed successfully!');
} else {
  console.log('Trek not found');
}
