const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../backend/database/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// Place keyword to clean short highlight
const PLACE_MAP = {
  'pashupatinath': 'Visit sacred Pashupatinath Temple (UNESCO)',
  'boudhanath': 'Explore Boudhanath Stupa & prayer wheel walk (UNESCO)',
  'swayambhunath': 'Climb to Swayambhunath (Monkey Temple) hilltop',
  'monkey temple': 'Panoramic views from Swayambhunath (Monkey Temple)',
  'patan durbar': 'Explore medieval Patan Durbar Square courtyards',
  'bhaktapur': 'Walk through historic Bhaktapur Durbar Square',
  'kathmandu durbar': 'Visit ancient Kathmandu Durbar Square & Kumari Ghar',
  'chandragiri': 'Ride scenic cable car to Chandragiri Hills viewpoint',
  'changu narayan': 'Visit historic Changu Narayan Temple',
  'nagarkot': 'Panoramic sunrise over Everest range from Nagarkot',
  'dhulikhel': 'Himalayan sunrise views from Dhulikhel hill station',
  'sarangkot': 'Sunrise viewpoint at Sarangkot over Annapurnas',
  'phewa lake': 'Peaceful boat cruise on Phewa Lake',
  'davis fall': 'Explore Davis Fall & Gupteshwor Sacred Cave',
  'world peace pagoda': 'Hike to World Peace Pagoda (Shanti Stupa)',
  'chitwan': 'Full-day wildlife safari & jungle activities in Chitwan',
  'elephant safari': 'Wildlife safari spotting one-horned rhinos & deer',
  'jeep safari': 'Thrilling 4x4 jungle jeep safari',
  'canoe': 'Scenic dugout canoe trip along Rapti River',
  'tharu': 'Traditional Tharu cultural dance & village walk',
  'bandipur': 'Explore preserved Newari hilltop town of Bandipur',
  'lumbini': 'Visit sacred birthplace of Lord Buddha at Maya Devi Temple',
  'pokhara': 'Scenic drive to lakeside Pokhara valley',
  'everest base camp': 'Reach iconic Everest Base Camp (5,364m)',
  'kala patthar': 'Iconic sunrise over Mt. Everest from Kala Patthar (5,550m)',
  'namche': 'Explore Sherpa capital of Namche Bazaar',
  'lukla': 'Thrilling mountain flight to/from Lukla airport',
  'tengboche': 'Visit Tengboche Monastery with Ama Dablam backdrop',
  'annapurna base camp': 'Stand inside the colossal Annapurna Sanctuary amphitheater',
  'poon hill': 'Golden sunrise over Dhaulagiri & Annapurna from Poon Hill',
  'ghandruk': 'Explore stone-paved Gurung heritage village of Ghandruk',
  'manaslu': 'Trek through rugged Budi Gandaki valley on Manaslu Circuit',
  'thorong la': 'Cross challenging Thorong La Pass (5,416m)',
  'muktinath': 'Visit sacred pilgrimage temple of Muktinath',
  'jomsom': 'Explore windy Jomsom valley & Kali Gandaki gorge',
  'mardi himal': 'Reach Mardi Himal High Camp with Machhapuchhre view',
  'langtang': 'Trek through pristine Langtang valley & Tamang villages',
  'kyanjin gompa': 'Visit Kyanjin Gompa & local yak cheese factory',
  'gosaikunda': 'Visit high-altitude sacred alpine lakes of Gosaikunda',
  'rara lake': 'Explore tranquil turquoise waters of Rara Lake'
};

const BOILERPLATE_PATTERNS = [
  /depending on your arrival/i,
  /on arrival at the tribhuvan/i,
  /you will then be transferred/i,
  /receive your complimentary/i,
  /dedicated dedicated representative/i,
  /welcome to your hotel/i,
  /today is your last day/i,
  /wake up early in the morning/i,
  /wake up early/i,
  /enjoy your breakfast at the hotel/i,
  /after breakfast.*we will drive/i,
  /our representative will meet/i,
  /our representative will greet/i
];

function isBoilerplate(sentence) {
  return BOILERPLATE_PATTERNS.some(re => re.test(sentence));
}

function generateCleanHighlights(day) {
  const title = (day.title || '').trim();
  const desc = (day.description || day.desc || '').trim();
  const titleLow = title.toLowerCase();
  const descLow = desc.toLowerCase();
  const combined = titleLow + ' ' + descLow;

  // 1. Arrival Day
  if (/\barriv/i.test(title)) {
    return [
      'Airport pickup & private hotel transfer',
      'Trip briefing, welcome Khada & orientation',
      'Leisure time for evening city exploration'
    ];
  }

  // 2. Departure Day
  if (/depart|departure|final\s*day|last\s*day/i.test(title)) {
    return [
      'Breakfast & hotel check-out',
      'Free time for souvenir shopping in Thamel',
      'Private transfer to airport for departure'
    ];
  }

  // 3. Free / Rest Day
  if (/\b(free|rest|buffer)\s*day\b/i.test(title)) {
    return [
      'Rest & leisure day at your own pace',
      'Optional local sightseeing and market walk',
      'Relaxation & photography'
    ];
  }

  // 4. Acclimatization Day
  if (/acclimatiz/i.test(title)) {
    return [
      'Active rest day for altitude acclimatization',
      'Short scenic hike to higher elevation',
      'Explore local mountain village & culture'
    ];
  }

  // 5. Place and activity based highlights
  const highlights = [];
  for (const [key, phrase] of Object.entries(PLACE_MAP)) {
    if (combined.includes(key)) {
      if (!highlights.includes(phrase)) {
        highlights.push(phrase);
      }
      if (highlights.length >= 4) break;
    }
  }

  // 6. If title has route format e.g. "A to B" or "A – B"
  const routeMatch = title.replace(/^Day\s+\w+\s*[:–-]?\s*/i, '').match(/^([A-Za-z\s]+)\s*(?:to|–|-)\s*([A-Za-z\s]+)/i);
  if (routeMatch && highlights.length < 3) {
    const from = routeMatch[1].trim();
    const to = routeMatch[2].trim();
    if (from.length < 25 && to.length < 25) {
      const routeHighlight = combined.includes('fly') || combined.includes('flight')
        ? `Scenic flight from ${from} to ${to}`
        : combined.includes('drive')
          ? `Scenic road journey from ${from} to ${to}`
          : `Scenic trek from ${from} to ${to}`;
      if (!highlights.includes(routeHighlight)) {
        highlights.unshift(routeHighlight);
      }
    }
  }

  // 7. If still too few highlights, extract clean non-boilerplate action sentences and shorten
  if (highlights.length < 2 && desc) {
    const cleanSentences = desc
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 150 && !isBoilerplate(s));

    const actionRe = /\b(visit|explore|drive|trek|cross|reach|ascend|descend|hike|walk|fly|travel|discover|witness|observe|sightseeing|tour|climb)\b/i;
    for (const s of cleanSentences) {
      if (actionRe.test(s)) {
        // Truncate if long
        let shortSentence = s;
        if (shortSentence.length > 90) {
          const commaIdx = shortSentence.indexOf(',', 40);
          if (commaIdx > 30 && commaIdx < 95) {
            shortSentence = shortSentence.substring(0, commaIdx);
          }
        }
        if (!highlights.includes(shortSentence)) {
          highlights.push(shortSentence);
        }
        if (highlights.length >= 3) break;
      }
    }
  }

  // 8. Absolute fallback
  if (highlights.length === 0) {
    const cleanTitle = title.replace(/^Day\s+\w+\s*[:–-]?\s*/i, '').replace(/\[.*?\]|\(.*?\)/g, '').trim();
    if (cleanTitle) highlights.push(`Experience ${cleanTitle}`);
  }

  return highlights.slice(0, 4);
}

// Process packages, tourTrips, treks
let cleanedCount = 0;
let totalProcessed = 0;

['packages', 'tourTrips', 'treks'].forEach(col => {
  if (!Array.isArray(db[col])) return;
  db[col].forEach(item => {
    if (!Array.isArray(item.itinerary)) return;
    item.itinerary.forEach(day => {
      totalProcessed++;
      const current = Array.isArray(day.highlights) ? day.highlights : (typeof day.highlights === 'string' ? [day.highlights] : []);
      const hasBoilerplate = current.some(h => typeof h === 'string' && isBoilerplate(h));
      const hasOverlyLong = current.some(h => typeof h === 'string' && h.length > 130);

      // If missing, or contains boilerplate, or has overly long sentences
      if (current.length === 0 || hasBoilerplate || hasOverlyLong) {
        day.highlights = generateCleanHighlights(day);
        cleanedCount++;
      }
    });
  });
});

console.log(`Cleaned and updated highlights for ${cleanedCount} out of ${totalProcessed} itinerary days.`);

// Write back to backend/database/db.json
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log('Saved to backend/database/db.json');

// Sync to public/database.json, server/database.json, zenex-deploy
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

console.log('Done!');
