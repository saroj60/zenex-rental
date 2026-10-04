const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../backend/database/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

let totalDaysCleaned = 0;

['packages', 'tourTrips', 'treks'].forEach(col => {
  if (!Array.isArray(db[col])) return;
  db[col].forEach(item => {
    if (!Array.isArray(item.itinerary)) return;
    item.itinerary.forEach(day => {
      let cleaned = false;
      if (day.highlights !== undefined) {
        delete day.highlights;
        cleaned = true;
      }
      if (day.dayHighlights !== undefined) {
        delete day.dayHighlights;
        cleaned = true;
      }
      if (cleaned) totalDaysCleaned++;
    });
  });
});

console.log(`Removed itinerary highlights from ${totalDaysCleaned} itinerary days.`);

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log('Saved to backend/database/db.json');

const syncTargets = [
  path.join(__dirname, '../public/database.json'),
  path.join(__dirname, '../server/database.json'),
  path.join(__dirname, '../zenex-deploy/database/db.json')
];

syncTargets.forEach(dest => {
  if (fs.existsSync(path.dirname(dest))) {
    fs.copyFileSync(DB_PATH, dest);
    console.log(`Synced to ${dest}`);
  }
});
