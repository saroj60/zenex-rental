const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'backend', 'database', 'db.json'), 'utf8'));

console.log('Total in db.treks:', (db.treks || []).length);
console.log('Total in db.packages:', (db.packages || []).length);
console.log('Total in db.tourTrips:', (db.tourTrips || []).length);

const trekPackages = (db.packages || []).filter(p => {
    const s = `${p.category} ${p.type} ${p.title} ${p.slug}`.toLowerCase();
    return s.includes('trek');
});
console.log('\nPackages with "trek":', trekPackages.length);
trekPackages.forEach(p => console.log('  [package] ', p.id, '->', p.title));

const trekTourTrips = (db.tourTrips || []).filter(t => {
    const s = `${t.category} ${t.type} ${t.title} ${t.slug}`.toLowerCase();
    return s.includes('trek');
});
console.log('\nTourTrips with "trek":', trekTourTrips.length);
trekTourTrips.forEach(t => console.log('  [tourTrip]', t.id, '->', t.title));

// Let's also check AppDataContext to see how treks are populated in the React app!
