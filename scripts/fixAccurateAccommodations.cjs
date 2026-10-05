const fs = require('fs');
const path = require('path');

const BACKEND_DB = path.join(__dirname, '../backend/database/db.json');
const PUBLIC_DB = path.join(__dirname, '../public/database.json');
const SERVER_DB = path.join(__dirname, '../server/database.json');
const ZENEX_DEPLOY_DB = path.join(__dirname, '../zenex-deploy/database/db.json');

const db = JSON.parse(fs.readFileSync(BACKEND_DB, 'utf8'));

// Comprehensive landmark/village to accommodation map
const DEST_MAP = [
  // Everest Region
  [/gorakshep|gorak\s*shep/i, 'Teahouse / Lodge in Gorakshep'],
  [/kala\s*patthar/i, 'Teahouse / Lodge in Gorakshep'],
  [/everest\s*base\s*camp|\bebc\b/i, 'Teahouse / Lodge in Gorakshep'],
  [/lobuche/i, 'Teahouse / Lodge in Lobuche'],
  [/dzonglha|zongla/i, 'Teahouse / Lodge in Dzonglha'],
  [/thagnag|dragnag/i, 'Teahouse / Lodge in Thagnag'],
  [/gokyo\s*ri/i, 'Teahouse / Lodge in Gokyo'],
  [/gokyo/i, 'Teahouse / Lodge in Gokyo'],
  [/machhermo|machermo/i, 'Teahouse / Lodge in Machhermo'],
  [/\bdole\b/i, 'Teahouse / Lodge in Dole'],
  [/phortse/i, 'Teahouse / Lodge in Phortse'],
  [/dingboche/i, 'Teahouse / Lodge in Dingboche'],
  [/pheriche/i, 'Teahouse / Lodge in Pheriche'],
  [/chhukung/i, 'Teahouse / Lodge in Chhukung'],
  [/tengboche|tyangboche/i, 'Teahouse / Lodge in Tengboche'],
  [/pangboche/i, 'Teahouse / Lodge in Pangboche'],
  [/khumjung/i, 'Teahouse / Lodge in Khumjung'],
  [/namche/i, 'Teahouse / Lodge in Namche Bazaar'],
  [/monjo/i, 'Teahouse / Lodge in Monjo'],
  [/phakding/i, 'Teahouse / Lodge in Phakding'],
  [/lukla/i, 'Lodge in Lukla'],
  [/\bthame\b/i, 'Teahouse / Lodge in Thame'],
  [/island\s*peak.*base\s*camp/i, 'Tented Camp at Island Peak Base Camp'],
  [/island\s*peak/i, 'Tented Camp at Island Peak'],
  [/mera\s*peak.*high\s*camp/i, 'Tented Camp at Mera High Camp'],
  [/mera\s*peak/i, 'Tented Camp / Lodge at Mera Peak'],
  [/pikey\s*peak.*base\s*camp/i, 'Lodge at Pikey Peak Base Camp'],
  [/pikey\s*peak/i, 'Lodge in Junbesi / Pikey'],
  [/junbesi/i, 'Lodge in Junbesi'],
  [/jhapre/i, 'Lodge in Jhapre'],
  [/\bdhap\b/i, 'Lodge in Dhap'],
  [/phaplu/i, 'Lodge in Phaplu'],
  [/ringmo/i, 'Lodge in Ringmo'],

  // Annapurna Region
  [/annapurna\s*base\s*camp|\babc\b/i, 'Lodge in Annapurna Base Camp'],
  [/machhapuchhre\s*base\s*camp|\bmbc\b/i, 'Lodge in Machhapuchhre Base Camp'],
  [/deurali/i, 'Teahouse / Lodge in Deurali'],
  [/himalaya\s*hotel/i, 'Teahouse / Lodge in Himalaya'],
  [/dovan/i, 'Teahouse / Lodge in Dovan'],
  [/\bbamboo\b/i, 'Teahouse / Lodge in Bamboo'],
  [/sinuwa/i, 'Teahouse / Lodge in Sinuwa'],
  [/chhomrong|chomrong/i, 'Teahouse / Lodge in Chhomrong'],
  [/jhinu/i, 'Lodge in Jhinu Danda'],
  [/ghandruk/i, 'Teahouse / Lodge in Ghandruk'],
  [/tadapani/i, 'Teahouse / Lodge in Tadapani'],
  [/poon\s*hill/i, 'Teahouse / Lodge in Ghorepani'],
  [/ghorepani/i, 'Teahouse / Lodge in Ghorepani'],
  [/ulleri/i, 'Teahouse / Lodge in Ulleri'],
  [/tikhedhunga/i, 'Teahouse / Lodge in Tikhedhunga'],
  [/mardi.*high\s*camp|high\s*camp.*mardi/i, 'Lodge in High Camp (Mardi)'],
  [/badal\s*danda/i, 'Lodge in Badal Danda'],
  [/low\s*camp/i, 'Lodge in Low Camp'],
  [/forest\s*camp/i, 'Lodge in Forest Camp'],
  [/australian\s*camp/i, 'Lodge in Australian Camp'],
  [/dhampus/i, 'Lodge in Dhampus'],
  [/thorong.*high\s*camp/i, 'Lodge in Thorong High Camp'],
  [/thorong\s*la/i, 'Hotel / Lodge in Muktinath'],
  [/thorong\s*phedi/i, 'Lodge in Thorong Phedi'],
  [/yak\s*kharka/i, 'Teahouse / Lodge in Yak Kharka'],
  [/letdar/i, 'Teahouse / Lodge in Letdar'],
  [/tilicho.*base\s*camp/i, 'Lodge at Tilicho Base Camp'],
  [/tilicho/i, 'Lodge at Tilicho / Siri Kharka'],
  [/siri\s*kharka/i, 'Lodge in Siri Kharka'],
  [/manang/i, 'Teahouse / Lodge in Manang'],
  [/pisang/i, 'Teahouse / Lodge in Pisang'],
  [/\bchame\b/i, 'Teahouse / Lodge in Chame'],
  [/dharapani/i, 'Teahouse / Lodge in Dharapani'],
  [/chamje|jagat.*annapurna/i, 'Teahouse / Lodge in Chamje'],
  [/muktinath/i, 'Hotel / Lodge in Muktinath'],
  [/kagbeni/i, 'Teahouse / Lodge in Kagbeni'],
  [/marpha/i, 'Teahouse / Lodge in Marpha'],
  [/jomsom/i, 'Hotel / Lodge in Jomsom'],
  [/kalopani/i, 'Hotel / Lodge in Kalopani'],
  [/tatopani/i, 'Lodge in Tatopani (Hot Springs)'],
  [/besisahar/i, 'Hotel / Lodge in Besisahar'],

  // Langtang & Helambu
  [/tserko\s*ri|kyanjin\s*ri/i, 'Lodge in Kyanjin Gompa'],
  [/kyanjin/i, 'Lodge in Kyanjin Gompa'],
  [/langtang\s*(?:village)?/i, 'Lodge in Langtang Village'],
  [/lama\s*hotel/i, 'Lodge in Lama Hotel'],
  [/rimche/i, 'Lodge in Lama Hotel / Rimche'],
  [/syabrubesi/i, 'Lodge in Syabrubesi'],
  [/dunche|dhunche/i, 'Lodge in Dhunche'],
  [/thulo\s*syabru/i, 'Lodge in Thulo Syabru'],
  [/shin\s*gompa|sing\s*gompa|chandan\s*bari/i, 'Lodge in Shin Gompa'],
  [/lauribina/i, 'Lodge in Lauribina'],
  [/gosaikunda/i, 'Lodge in Gosaikunda'],
  [/ghopte/i, 'Lodge in Ghopte'],
  [/tharepati/i, 'Lodge in Tharepati'],
  [/melamchi\s*gaun/i, 'Lodge in Melamchi Gaun'],
  [/tarke\s*ghyang/i, 'Lodge in Tarke Ghyang'],
  [/sermathang/i, 'Lodge in Sermathang'],
  [/kakani/i, 'Lodge in Kakani'],
  [/melamchi\s*pul|melamchi\s*bazar/i, 'Lodge / Hotel in Melamchi'],

  // Manaslu & Tsum Valley
  [/machha\s*khola/i, 'Mountain Lodge in Machha Khola'],
  [/soti\s*khola/i, 'Mountain Lodge in Soti Khola'],
  [/\bjagat\b/i, 'Mountain Lodge in Jagat'],
  [/philim/i, 'Mountain Lodge in Philim'],
  [/\bdeng\b/i, 'Mountain Lodge in Deng'],
  [/namrung/i, 'Mountain Lodge in Namrung'],
  [/\blho\b/i, 'Mountain Lodge in Lho'],
  [/shyala/i, 'Mountain Lodge in Shyala'],
  [/sama\s*gaun|sama\s*gaon/i, 'Mountain Lodge in Samagaun'],
  [/samdo/i, 'Mountain Lodge in Samdo'],
  [/dharmasala|larkya\s*phedi/i, 'Mountain Lodge in Dharmasala'],
  [/larkya\s*la/i, 'Mountain Lodge in Bhimtang'],
  [/bhimtang/i, 'Mountain Lodge in Bhimtang'],
  [/tilche/i, 'Mountain Lodge in Tilche'],
  [/lokpa/i, 'Mountain Lodge in Lokpa'],
  [/chumling/i, 'Mountain Lodge in Chumling'],
  [/chokangparo/i, 'Mountain Lodge in Chokangparo'],
  [/nile|chule/i, 'Mountain Lodge in Nile / Chule'],
  [/mu\s*gompa/i, 'Tea House / Monastery Lodge in Mu Gompa'],
  [/rechen\s*gompa|lama\s*gaun/i, 'Mountain Lodge in Lama Gaun'],
  [/gumba\s*langdang/i, 'Mountain Lodge in Gumba Langdang'],

  // Upper Mustang
  [/lo\s*manthang/i, 'Hotel / Teahouse in Lo Manthang'],
  [/chhoser/i, 'Hotel / Teahouse in Lo Manthang'],
  [/dhakmar|drakmar/i, 'Teahouse in Dhakmar'],
  [/tsarang|charang/i, 'Teahouse in Tsarang'],
  [/ghami/i, 'Teahouse in Ghami'],
  [/geling|ghiling/i, 'Teahouse in Geling'],
  [/syanbochen/i, 'Teahouse in Syanbochen'],
  [/samar/i, 'Teahouse in Samar'],
  [/\bchele\b/i, 'Teahouse in Chele'],
  [/tange|tangbe/i, 'Teahouse in Tangbe'],
  [/chhusang/i, 'Teahouse in Chhusang'],

  // Other Remote Treks
  [/kanchenjunga/i, 'Mountain Lodge / Camp in Kanchenjunga'],
  [/makalu/i, 'Mountain Lodge / Camp in Makalu'],
  [/dhaulagiri/i, 'Tented Camp / Lodge in Dhaulagiri'],
  [/dolpo/i, 'Tented Camp / Lodge in Dolpo'],
  [/nar\s*phu|nar\s*village|phu\s*village/i, 'Teahouse in Nar Phu Valley'],
  [/ruby\s*valley|gatlang|tatopani.*tamang/i, 'Community Homestay / Lodge'],

  // Major Cities, Cultural & Wildlife Destinations
  [/pokhara|sarangkot/i, 'Hotel in Pokhara'],
  [/chitwan|sauraha|meghauli/i, 'Jungle Resort in Chitwan'],
  [/nagarkot/i, 'Hotel / Resort in Nagarkot'],
  [/bandipur/i, 'Hotel / Heritage Resort in Bandipur'],
  [/lumbini/i, 'Hotel in Lumbini'],
  [/dhulikhel/i, 'Hotel / Resort in Dhulikhel'],
  [/chandragiri/i, 'Chandragiri Hills Resort / Hotel'],
  [/daman/i, 'Resort in Daman'],
  [/kurintar|trishuli/i, 'River Resort in Kurintar'],
  [/bardia/i, 'Jungle Safari Lodge in Bardia'],
  [/suklaphanta/i, 'Wildlife Resort in Suklaphanta'],
  [/nepalgunj/i, 'Hotel in Nepalgunj'],
  [/janakpur/i, 'Hotel in Janakpur'],
  [/ilam/i, 'Tea Garden Resort in Ilam'],

  // Tibet
  [/lhasa/i, 'Hotel in Lhasa'],
  [/shigatse/i, 'Hotel in Shigatse'],
  [/gyantse/i, 'Hotel in Gyantse'],
  [/tingri/i, 'Hotel / Guesthouse in Tingri'],
  [/rongbuk/i, 'Guesthouse at Rongbuk Monastery'],

  // Bhutan
  [/thimphu/i, 'Hotel in Thimphu'],
  [/paro/i, 'Hotel in Paro'],
  [/punakha/i, 'Hotel in Punakha'],
  [/phobjikha|gangtey/i, 'Hotel in Phobjikha Valley'],

  // Kathmandu Valley (last resort for valley tours)
  [/kathmandu|patan|bhaktapur|kirtipur/i, 'Hotel in Kathmandu']
];

function resolveAccommodation(day, idx, totalDays, prevAcc, tripContext = {}) {
  const title = (day.title || '').trim();
  const desc = (day.desc || day.details || day.description || '').trim();
  const isTrek = tripContext.isTrek;

  // 1. Departure Day
  if (idx === totalDays - 1 || /depart|departure|final\s*day|last\s*day|flight\s+back\s+home/i.test(title)) {
    return 'Departure';
  }

  // 2. Arrival Day
  if (idx === 0 || /\barriv/i.test(title)) {
    if (/lhasa/i.test(title + ' ' + desc)) return 'Hotel in Lhasa';
    if (/paro|thimphu/i.test(title + ' ' + desc)) return 'Hotel in Paro';
    if (/pokhara/i.test(title + ' ' + desc)) return 'Hotel in Pokhara';
    return 'Hotel in Kathmandu';
  }

  // 3. Check explicit "Overnight at / in ..." from description
  const overnightMatch = desc.match(/overnight\s+(?:stay\s+)?(?:at|in)\s+([^.,;]+)/i);
  if (overnightMatch) {
    const rawPlace = overnightMatch[1].trim();
    for (const [regex, acc] of DEST_MAP) {
      if (regex.test(rawPlace)) {
        return acc;
      }
    }
  }

  // 4. Check destination from title
  // Example: "Kathmandu – Lukla – Phakding", "Drive from Pokhara to Chitwan", "Trek to Namche"
  const toParts = title.split(/\s+to\s+|\s*[–-]\s*/i);
  if (toParts.length > 1) {
    const destinationPart = toParts[toParts.length - 1];
    for (const [regex, acc] of DEST_MAP) {
      if (regex.test(destinationPart)) {
        return acc;
      }
    }
  }

  // 5. Acclimatization or exploration day (e.g., "Acclimatization Day in Namche Bazaar")
  if (/acclimatiz|exploration|rest\s*day|excursion/i.test(title)) {
    // Check if place is in title
    for (const [regex, acc] of DEST_MAP) {
      if (regex.test(title)) {
        return acc;
      }
    }
    // Otherwise keep previous night's place
    if (prevAcc && prevAcc !== 'Departure') return prevAcc;
  }

  // 6. Whole title match
  for (const [regex, acc] of DEST_MAP) {
    if (regex.test(title)) {
      return acc;
    }
  }

  // 7. Whole desc match
  for (const [regex, acc] of DEST_MAP) {
    if (regex.test(desc)) {
      return acc;
    }
  }

  // 8. If previous night accommodation is available and valid
  if (prevAcc && prevAcc !== 'Departure') {
    return prevAcc;
  }

  // 9. Fallback according to package type
  if (isTrek) {
    return 'Mountain Lodge / Teahouse';
  }
  return 'Hotel in Kathmandu';
}

function processTrip(trip) {
  if (!Array.isArray(trip.itinerary)) return;
  const totalDays = trip.itinerary.length;
  const isTrek = /trek|circuit|base\s*camp|himal|pass|trail|climb/i.test(trip.title || trip.name || trip.id || '');
  const context = { isTrek, title: trip.title };

  let prevAcc = '';
  trip.itinerary.forEach((day, idx) => {
    const acc = resolveAccommodation(day, idx, totalDays, prevAcc, context);
    day.accommodation = acc;
    prevAcc = acc;
  });
}

// Process packages, tourTrips, treks
let count = 0;
['packages', 'tourTrips', 'treks'].forEach(col => {
  (db[col] || []).forEach(p => {
    processTrip(p);
    count++;
  });
});

console.log(`Processed ${count} tours/treks.`);

// Check 6-days-kathmandu-nagarkot-tour specifically
const sampleTour = (db.packages || []).find(p => p.id === '6-days-kathmandu-nagarkot-tour');
console.log('\n=== 6-days-kathmandu-nagarkot-tour Accommodations ===');
sampleTour.itinerary.forEach((d, i) => {
  console.log(`Day ${i+1}: ${d.title} --> [${d.accommodation}]`);
});

// Check TRIP-ebc-gokyo-17d specifically
const sampleTrek = (db.tourTrips || []).find(p => p.id === 'TRIP-ebc-gokyo-17d');
console.log('\n=== TRIP-ebc-gokyo-17d Accommodations ===');
sampleTrek.itinerary.forEach((d, i) => {
  console.log(`Day ${i+1}: ${d.title} --> [${d.accommodation}]`);
});

// Check 5-days-kathmandu-chitwan-pokhara-tour
const sampleMultiCity = (db.packages || []).find(p => p.id === '5-days-kathmandu-chitwan-pokhara-tour');
console.log('\n=== 5-days-kathmandu-chitwan-pokhara-tour Accommodations ===');
sampleMultiCity.itinerary.forEach((d, i) => {
  console.log(`Day ${i+1}: ${d.title} --> [${d.accommodation}]`);
});

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

console.log('\nSuccessfully saved accurate accommodations across all database files!');
