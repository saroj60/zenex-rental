const fs = require('fs');
const path = require('path');

const BACKEND_DB = path.join(__dirname, '../backend/database/db.json');
const PUBLIC_DB = path.join(__dirname, '../public/database.json');
const SERVER_DB = path.join(__dirname, '../server/database.json');
const ZENEX_DEPLOY_DB = path.join(__dirname, '../zenex-deploy/database/db.json');

const db = JSON.parse(fs.readFileSync(BACKEND_DB, 'utf8'));

// Extract packageExtraData from PackageDetail.jsx
const pkgDetailCode = fs.readFileSync(path.join(__dirname, '../src/pages/PackageDetail.jsx'), 'utf8');

// We can evaluate packageExtraData safely
const startMarker = 'export const packageExtraData = {';
const startIndex = pkgDetailCode.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Could not find packageExtraData in PackageDetail.jsx');
  process.exit(1);
}

// Slice from packageExtraData to end of that object
const restCode = pkgDetailCode.substring(startIndex);
const endMarker = 'const PackageDetail = () => {';
const endIndex = restCode.indexOf(endMarker);
if (endIndex === -1) {
  console.error('Could not find PackageDetail endMarker');
  process.exit(1);
}

const extraDataBlock = restCode.substring(0, endIndex).replace('export const packageExtraData =', 'var packageExtraData =');

// Evaluate in sandbox
const fn = new Function(extraDataBlock + '\nreturn packageExtraData;');
const packageExtraData = fn();

console.log('Successfully extracted packageExtraData. Total entries:', Object.keys(packageExtraData).length);

const ALIASES = {
  '7-days-kathmandu-nagarkot-dhulikhel-tour': 'ktm-nagarkot-dhulikhel-7d',
  '7-days-kathmandu-chitwan-pokhara-lumbini-tour': 'ktm-chitwan-pokhara-lumbini-7d',
  '7-days-kathmandu-bandipur-pokhara-tour': 'ktm-bandipur-pokhara-7d',
  '7-days-kathmandu-pokhara-nagarkot-tour': 'ktm-pokhara-nagarkot-7d',
  '7-days-kathmandu-pokhara-chitwan-tour': 'ktm-pokhara-chitwan-7d',
  '7-days-kathmandu-chitwan-pokhara-tour': 'ktm-chitwan-pokhara-7d',
  '7-days-kathmandu-pokhara-jomsom-muktinath-tour': 'ktm-pokhara-jomsom-muktinath-7d',
  '8-days-kathmandu-pokhara-lumbini-chitwan-tour': 'ktm-pokhara-lumbini-chitwan-8d',
  '8-days-kathmandu-pokhara-muktinath-chitwan-tour': 'ktm-pokhara-muktinath-chitwan-8d',
  '8-days-kathmandu-pokhara-chitwan-tour-with-rafting': 'ktm-pokhara-chitwan-rafting-8d',
  '8-days-kathmandu-bandipur-pokhara-tour-with-trek': 'ktm-bandipur-pokhara-trek-8d',
  '8-days-kathmandu-pokhara-chitwan-nagarkot-tour': 'ktm-pokhara-chitwan-nagarkot-8d'
};

function formatItineraryDay(it, idx, total) {
  const dayNum = parseInt(it.day || idx + 1) || (idx + 1);
  const title = it.title || `Day ${idx + 1}`;
  const desc = it.desc || it.description || '';
  const isFirst = idx === 0;
  const isLast = idx === total - 1;

  // Infer altitude
  let maxAlt = it.maxAltitude || it.altitude || '';
  if (!maxAlt) {
    const altMatch = (title + ' ' + desc).match(/\[(?:altitude\s*)?([\d,.]+m(?:\/[\d,.]+ft)?)\]/i) || 
                     (title + ' ' + desc).match(/\((?:altitude\s*)?([\d,.]+m(?:\/[\d,.]+ft)?)\)/i);
    if (altMatch) {
      maxAlt = altMatch[1];
    } else if (/nagarkot/i.test(title)) {
      maxAlt = '2,175m / 7,136ft';
    } else if (/dhulikhel/i.test(title)) {
      maxAlt = '1,550m / 5,085ft';
    } else if (/pokhara|sarangkot/i.test(title)) {
      maxAlt = '822m / 2,696ft';
    } else if (/chitwan/i.test(title)) {
      maxAlt = '415m / 1,361ft';
    } else if (/lumbini/i.test(title)) {
      maxAlt = '150m / 492ft';
    } else if (/bandipur/i.test(title)) {
      maxAlt = '1,030m / 3,379ft';
    } else if (/jomsom|muktinath/i.test(title)) {
      maxAlt = '3,760m / 12,336ft';
    } else {
      maxAlt = '1,400m / 4,595ft';
    }
  }

  // Infer mode of travel
  let mode = it.modeOfTravel || it.transport || it.travelMode || '';
  if (!mode) {
    if (/flight|fly/i.test(title)) {
      mode = 'Flight';
    } else if (/rafting|raft/i.test(title)) {
      mode = 'Private Vehicle & Rafting';
    } else {
      mode = 'Private Vehicle';
    }
  }

  // Infer accommodation
  const toParts = title.split(/\s+to\s+|\s*[–-]\s*/i);
  const destPart = toParts.length > 1 ? toParts[toParts.length - 1] : title;

  let acc = it.accommodation || '';
  if (!acc) {
    if (isLast) {
      acc = 'Departure';
    } else if (/dhulikhel/i.test(destPart)) {
      acc = 'Hotel / Resort in Dhulikhel';
    } else if (/nagarkot/i.test(destPart)) {
      acc = 'Hotel / Resort in Nagarkot';
    } else if (/pokhara/i.test(destPart)) {
      acc = 'Hotel in Pokhara';
    } else if (/chitwan/i.test(destPart)) {
      acc = 'Jungle Resort in Chitwan';
    } else if (/bandipur/i.test(destPart)) {
      acc = 'Hotel / Heritage Resort in Bandipur';
    } else if (/lumbini/i.test(destPart)) {
      acc = 'Hotel in Lumbini';
    } else if (/jomsom/i.test(destPart)) {
      acc = 'Hotel / Lodge in Jomsom';
    } else if (/muktinath/i.test(destPart)) {
      acc = 'Hotel / Lodge in Muktinath';
    } else {
      acc = 'Hotel in Kathmandu';
    }
  }

  // Infer meals
  let meals = it.meals || '';
  if (!meals) {
    if (isFirst) {
      meals = 'Welcome Drink';
    } else if (isLast) {
      meals = 'Breakfast';
    } else if (/cultural.*(?:dinner|performance|show)|farewell.*dinner/i.test(desc)) {
      meals = 'Breakfast & Cultural Farewell Dinner';
    } else if (/chitwan/i.test(destPart)) {
      meals = 'Breakfast, Lunch & Dinner';
    } else {
      meals = 'Breakfast';
    }
  }

  return {
    day: dayNum,
    dayNumber: dayNum,
    title: title.replace(/\[altitude\s*[^\]]+\]/gi, '').replace(/\(altitude\s*[^)]+\)/gi, '').trim(),
    description: desc.replace(/Accommodation:\s*Hotel[^.]*\.?/gi, '').trim(),
    maxAltitude: maxAlt,
    modeOfTravel: mode,
    accommodation: acc,
    meals: meals
  };
}

let populatedCount = 0;

['packages', 'tourTrips'].forEach(col => {
  (db[col] || []).forEach(p => {
    const alias = ALIASES[p.id];
    if (alias || !Array.isArray(p.itinerary) || p.itinerary.length === 0) {
      const extraKey = alias || p.id;
      const extra = packageExtraData[extraKey] || packageExtraData[p.id];
      if (extra && Array.isArray(extra.itinerary) && extra.itinerary.length > 0) {
        p.itinerary = extra.itinerary.map((it, idx) => 
          formatItineraryDay(it, idx, extra.itinerary.length)
        );
        populatedCount++;
        console.log(`Populated ${col} -> ${p.id} (${p.itinerary.length} days)`);
      }
    }
  });
});

console.log(`\nSuccessfully populated ${populatedCount} missing package itineraries!`);

// Specifically inspect 7-days-kathmandu-nagarkot-dhulikhel-tour
const sample = (db.packages || []).concat(db.tourTrips || []).find(p => p.id === '7-days-kathmandu-nagarkot-dhulikhel-tour');
if (sample) {
  console.log('\n=== Sample 7-days-kathmandu-nagarkot-dhulikhel-tour Itinerary ===');
  sample.itinerary.forEach(d => {
    console.log(`Day ${d.day}: ${d.title}`);
    console.log(`  Max Altitude: ${d.maxAltitude}`);
    console.log(`  Mode of Travel: ${d.modeOfTravel}`);
    console.log(`  Accommodation: ${d.accommodation}`);
    console.log(`  Meals: ${d.meals}`);
  });
}

// Write to all database files
const jsonStr = JSON.stringify(db, null, 2);
fs.writeFileSync(BACKEND_DB, jsonStr, 'utf8');
fs.writeFileSync(PUBLIC_DB, jsonStr, 'utf8');
if (fs.existsSync(SERVER_DB)) {
  fs.writeFileSync(SERVER_DB, jsonStr, 'utf8');
}
if (fs.existsSync(ZENEX_DEPLOY_DB)) {
  fs.writeFileSync(ZENEX_DEPLOY_DB, jsonStr, 'utf8');
}

console.log('\nSaved and synced database files.');
