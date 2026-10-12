const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function updateItineraryMeals(itinerary) {
  if (!Array.isArray(itinerary) || itinerary.length === 0) return;
  const totalDays = itinerary.length;
  itinerary.forEach((day, idx) => {
    if (idx === 0) {
      day.meals = 'Breakfast';
    } else if (idx === totalDays - 1) {
      day.meals = 'Breakfast';
    } else {
      day.meals = 'Breakfast, Lunch, Dinner';
    }
  });
}

function isTrek(item) {
  if (!item) return false;
  const cat = String(item.category || '');
  const title = String(item.title || item.name || '');
  const slug = String(item.slug || '');
  return cat.toLowerCase() === 'treks' ||
    /trek/i.test(cat) ||
    /trek/i.test(title) ||
    /trek/i.test(slug);
}

// 1. Update backend/database/db.json
const dbPath = path.join(__dirname, '..', 'backend', 'database', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let treksUpdated = 0;
if (Array.isArray(db.treks)) {
  db.treks.forEach(trek => {
    if (trek.itinerary) {
      updateItineraryMeals(trek.itinerary);
      treksUpdated++;
    }
  });
}

let tourTripsUpdated = 0;
if (Array.isArray(db.tourTrips)) {
  db.tourTrips.forEach(trip => {
    if (isTrek(trip) && trip.itinerary) {
      updateItineraryMeals(trip.itinerary);
      tourTripsUpdated++;
    }
  });
}

let packagesUpdated = 0;
if (Array.isArray(db.packages)) {
  db.packages.forEach(pkg => {
    if (isTrek(pkg) && pkg.itinerary) {
      updateItineraryMeals(pkg.itinerary);
      packagesUpdated++;
    }
  });
}

console.log(`Updated in db.json: ${treksUpdated} treks, ${tourTripsUpdated} tourTrips, ${packagesUpdated} packages`);

// Save formatted db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

// Copy to public/database.json, server/database.json, zenex-deploy/database/db.json
const copyTargets = [
  path.join(__dirname, '..', 'public', 'database.json'),
  path.join(__dirname, '..', 'server', 'database.json'),
  path.join(__dirname, '..', 'zenex-deploy', 'database', 'db.json')
];

copyTargets.forEach(target => {
  if (fs.existsSync(path.dirname(target))) {
    fs.writeFileSync(target, JSON.stringify(db, null, 2), 'utf8');
    console.log(`Synced to ${target}`);
  }
});

// 2. Update src/data/treksData.js
const treksDataPath = path.join(__dirname, '..', 'src', 'data', 'treksData.js');
if (fs.existsSync(treksDataPath)) {
  const content = fs.readFileSync(treksDataPath, 'utf8');
  const jsonStr = content.replace(/^export const treksData = \s*/, '').replace(/;\s*$/, '');
  const treks = JSON.parse(jsonStr);

  let treksDataUpdated = 0;
  treks.forEach(trek => {
    if (trek.itinerary) {
      updateItineraryMeals(trek.itinerary);
      treksDataUpdated++;
    }
  });

  const updatedCode = `export const treksData = ${JSON.stringify(treks, null, 2)};\n`;
  fs.writeFileSync(treksDataPath, updatedCode, 'utf8');
  console.log(`Updated ${treksDataUpdated} treks in ${treksDataPath}`);
}

// 3. Re-generate zenex_database_import.sql
console.log('Generating updated SQL import file...');
const sqlScriptPath = path.join(__dirname, 'generateSqlDump.cjs');
if (fs.existsSync(sqlScriptPath)) {
  execSync(`node "${sqlScriptPath}"`, { stdio: 'inherit' });
}

console.log('Trek meal standardization completed successfully!');
