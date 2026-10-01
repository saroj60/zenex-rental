/**
 * fillMaxAltitude.cjs
 * Fills missing `maxAltitude` field for itinerary days across all packages.
 *
 * Strategy (in priority order):
 *  1. day.maxAltitude already set → skip
 *  2. day.altitude set but no maxAltitude → copy altitude → maxAltitude
 *  3. Altitude embedded in day.title → parse and write to maxAltitude
 *  4. No altitude data → leave unchanged (shows "-" in UI, which is correct)
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'backend', 'database', 'db.json');

// Regex patterns for title-embedded altitude
// Matches: [altitude 1400m/4595ft], [Altitude 2175m/4136ft], [alt 3400m], etc.
const BRACKET_PATTERN = /\[(?:altitude|alt\.?)[:\s]*([\d,]+)\s*m(?:\/([\d,]+)\s*ft)?\]/i;
// Matches: (820 m), (3,440 m), (2,860 m)
const PAREN_PATTERN = /\(([\d,]+)\s*m\)/i;

function parseAltitudeFromTitle(title) {
  if (!title) return null;

  let match = title.match(BRACKET_PATTERN);
  if (match) {
    const meters = match[1]; // e.g. "1400" or "3,400"
    const feet = match[2];   // e.g. "4595" (may be undefined)
    if (feet) {
      return `${meters}m / ${feet}ft`;
    }
    // Convert meters to feet if not provided
    const metersNum = parseInt(meters.replace(/,/g, ''), 10);
    const feetNum = Math.round(metersNum * 3.28084);
    return `${meters}m / ${feetNum.toLocaleString()}ft`;
  }

  match = title.match(PAREN_PATTERN);
  if (match) {
    const meters = match[1]; // e.g. "820" or "3,440"
    const metersNum = parseInt(meters.replace(/,/g, ''), 10);
    const feetNum = Math.round(metersNum * 3.28084);
    return `${meters}m / ${feetNum.toLocaleString()}ft`;
  }

  return null;
}

function processItineraryDays(days) {
  let filled = 0;
  let skipped = 0;
  let noData = 0;

  for (const day of days) {
    // Already has maxAltitude — skip
    if (day.maxAltitude) {
      skipped++;
      continue;
    }

    // Has altitude field — copy it
    if (day.altitude) {
      day.maxAltitude = day.altitude;
      filled++;
      continue;
    }

    // Try to parse from title
    const titleAlt = parseAltitudeFromTitle(day.title);
    if (titleAlt) {
      day.maxAltitude = titleAlt;
      filled++;
      continue;
    }

    // No altitude data
    noData++;
  }

  return { filled, skipped, noData };
}

function main() {
  console.log('Reading database...');
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const db = JSON.parse(raw);

  let totalFilled = 0;
  let totalSkipped = 0;
  let totalNoData = 0;
  let packagesProcessed = 0;

  // Handle both treks and tours — they may be at different keys
  const collections = [];

  if (db.treks) collections.push({ name: 'treks', data: db.treks });
  if (db.tours) collections.push({ name: 'tours', data: db.tours });
  if (db.packages) collections.push({ name: 'packages', data: db.packages });

  // Also handle top-level array format
  for (const key of Object.keys(db)) {
    if (Array.isArray(db[key]) && !['treks', 'tours', 'packages'].includes(key)) {
      collections.push({ name: key, data: db[key] });
    }
  }

  for (const { name, data } of collections) {
    if (!Array.isArray(data)) continue;

    for (const pkg of data) {
      packagesProcessed++;

      // Find the itinerary days — handle multiple field names
      const itinerary =
        pkg.itinerary ||
        pkg.detailedItinerary ||
        pkg.days ||
        [];

      if (!Array.isArray(itinerary) || itinerary.length === 0) continue;

      const { filled, skipped, noData } = processItineraryDays(itinerary);
      totalFilled += filled;
      totalSkipped += skipped;
      totalNoData += noData;

      if (filled > 0) {
        console.log(`  [${name}] "${pkg.title || pkg.name || pkg.id}": filled ${filled} day(s)`);
      }
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Packages processed : ${packagesProcessed}`);
  console.log(`Days already set   : ${totalSkipped}`);
  console.log(`Days filled        : ${totalFilled}`);
  console.log(`Days with no data  : ${totalNoData} (will show "-" in UI)`);
  console.log('\nWriting updated database...');

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log('Done! Run `npm run build` to sync to public/ and server/.');
}

main();
