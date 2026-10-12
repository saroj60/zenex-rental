const fs = require('fs');
const path = require('path');

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

function verifyItinerary(itinerary, context) {
  if (!Array.isArray(itinerary) || itinerary.length === 0) return [];
  const errors = [];
  const n = itinerary.length;
  itinerary.forEach((d, idx) => {
    let expected = 'Breakfast, Lunch, Dinner';
    if (idx === 0) expected = 'Breakfast';
    else if (idx === n - 1) expected = 'Breakfast';

    if (d.meals !== expected) {
      errors.push(`[${context}] Day ${idx + 1}/${n}: expected '${expected}', got '${d.meals}'`);
    }
  });
  return errors;
}

let totalErrors = [];

// 1. db.json
const db = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'backend', 'database', 'db.json'), 'utf8'));
db.treks.forEach(t => {
  totalErrors.push(...verifyItinerary(t.itinerary, 'db.treks: ' + t.title));
});
db.tourTrips.filter(isTrek).forEach(t => {
  totalErrors.push(...verifyItinerary(t.itinerary, 'db.tourTrips: ' + t.title));
});
db.packages.filter(isTrek).forEach(t => {
  totalErrors.push(...verifyItinerary(t.itinerary, 'db.packages: ' + t.title));
});

// 2. treksData.js
const treksJs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'treksData.js'), 'utf8').replace(/^export const treksData = \s*/, '').replace(/;\s*$/, ''));
treksJs.forEach(t => {
  totalErrors.push(...verifyItinerary(t.itinerary, 'treksData.js: ' + t.title));
});

console.log('Total violations found:', totalErrors.length);
if (totalErrors.length > 0) {
  console.log('Sample violations:', totalErrors.slice(0, 5));
  process.exit(1);
} else {
  console.log('VERIFICATION SUCCESSFUL: 100% of trek packages conform strictly to the meal rules!');
  process.exit(0);
}
