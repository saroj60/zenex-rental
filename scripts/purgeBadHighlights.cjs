const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../backend/database/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// Forbidden generic/canned highlight patterns
const STRICT_PURGE = [
  /cultural sightseeing/i,
  /explore bhaktapur durbar square \(unesco\)/i,
  /full day trekking through mountain trails/i,
  /rest & exploration day/i,
  /^\s*exploration\s*$/i,
  /^\s*rest\s*day\s*$/i,
  /^\s*hotel checkout\s*$/i,
  /^\s*kathmandu\s*$/i,
  /^\s*pokhara\s*$/i,
  /^\s*bhaktapur\s*$/i,
  /^\s*patan\s*$/i,
  /^\s*lumbini\s*$/i,
  /^\s*chitwan\s*$/i,
  /^\s*explore kathmandu\s*$/i,
  /\s{2,}/,
  /\/\s*departure/i,
  /^\s*final departure\s*[–-]\s*end of journey\s*$/i,
  /^[A-Za-z]+\s{2,}[A-Za-z]+$/,
  /^[A-Z][a-z]+\s+[A-Z][a-z]+$/
];

function isStrictlyForbidden(h) {
  if (!h || typeof h !== 'string') return true;
  const t = h.trim();
  if (t.length < 5) return true;
  if (!t.includes(' ')) return true;
  return STRICT_PURGE.some(re => re.test(t));
}

// Convert narrative long sentence e.g. "After breakfast, enjoy a full-day sightseeing tour of X" -> "Sightseeing tour of X"
function cleanNarrativeSentence(sentence) {
  if (!sentence || typeof sentence !== 'string') return null;
  let s = sentence.trim();
  if (isStrictlyForbidden(s)) return null;

  // Strip narrative prefixes
  s = s.replace(/^(after breakfast,?\s*|in the morning,?\s*|in the evening,?\s*|today,?\s*|wake up early.*?(to|and)\s*|early morning,?\s*|enjoy a?\s*|you will\s*|we will\s*|our representative will\s*|on arrival.*?,?\s*|depending on your.*?,?\s*)+/i, '');

  // Capitalize first letter
  s = s.charAt(0).toUpperCase() + s.slice(1);

  // If ends with period, remove it
  s = s.replace(/\.+$/, '').trim();

  // If too long (> 90 chars), trim to first comma or clause
  if (s.length > 90) {
    const commaIdx = s.indexOf(',', 35);
    if (commaIdx > 30 && commaIdx < 95) {
      s = s.substring(0, commaIdx).trim();
    }
  }

  if (s.length < 8 || isStrictlyForbidden(s)) return null;
  return s;
}

const SPECIFIC_LANDMARKS = [
  { match: /changunarayan/i, phrase: 'Visit ancient Changunarayan Temple & stone carvings' },
  { match: /bhaktapur/i, phrase: 'Explore medieval Bhaktapur Durbar Square palaces' },
  { match: /chandragiri/i, phrase: 'Scenic cable car ride to Chandragiri Hills (2,551m)' },
  { match: /pashupatinath/i, phrase: 'Visit sacred Hindu shrine of Pashupatinath Temple' },
  { match: /boudhanath/i, phrase: 'Circumambulate the massive Boudhanath Buddhist Stupa' },
  { match: /swayambhunath|monkey temple/i, phrase: 'Panoramic valley views from Swayambhunath Stupa' },
  { match: /patan/i, phrase: 'Explore Patan Durbar Square & Krishna Mandir' },
  { match: /sarangkot/i, phrase: 'Golden sunrise over Annapurna range from Sarangkot' },
  { match: /phewa lake/i, phrase: 'Peaceful boat ride on Phewa Lake' },
  { match: /davis fall/i, phrase: 'Visit Davis Falls & Gupteshwor Sacred Cave' },
  { match: /peace pagoda|shanti stupa/i, phrase: 'Hike to World Peace Pagoda overlooking lake' },
  { match: /chitwan.*safari|safari.*chitwan/i, phrase: 'Jungle safari spotting one-horned rhinos & wildlife' },
  { match: /canoe|rapti/i, phrase: 'Dugout canoe trip along Rapti River for crocodile spotting' },
  { match: /tharu/i, phrase: 'Traditional Tharu cultural dance performance' },
  { match: /nagarkot/i, phrase: 'Himalayan sunrise views from Nagarkot ridge' },
  { match: /bandipur/i, phrase: 'Explore preserved Newari architecture in Bandipur' },
  { match: /lumbini|maya devi/i, phrase: 'Visit Maya Devi Temple – birthplace of Lord Buddha' },
  { match: /everest base camp/i, phrase: 'Stand at legendary Everest Base Camp (5,364m)' },
  { match: /kala patthar/i, phrase: 'Early morning climb of Kala Patthar for 360° Everest view' },
  { match: /namche/i, phrase: 'Explore bustling Sherpa hub of Namche Bazaar' },
  { match: /lukla/i, phrase: 'Scenic mountain flight to/from Lukla airstrip' },
  { match: /tengboche/i, phrase: 'Visit spiritual Tengboche Monastery with Ama Dablam view' },
  { match: /annapurna base camp/i, phrase: 'Surrounded by 8,000m peaks in Annapurna Sanctuary' },
  { match: /poon hill/i, phrase: 'Iconic Poon Hill sunrise over Dhaulagiri & Annapurnas' },
  { match: /ghandruk/i, phrase: 'Discover traditional Gurung stone village of Ghandruk' },
  { match: /mardi himal/i, phrase: 'High Camp ridge walk beneath Machhapuchhre' },
  { match: /thorong la/i, phrase: 'Challenging crossing of Thorong La Pass (5,416m)' },
  { match: /muktinath/i, phrase: 'Visit sacred 108 water spouts at Muktinath Temple' }
];

function deriveSpecificHighlights(title, desc) {
  const combined = `${title} ${desc}`.toLowerCase();
  const out = [];

  // Day type rules
  if (/\barriv/i.test(title)) {
    return [
      'Airport pickup & private hotel transfer',
      'Trip briefing, welcome Khada & orientation',
      'Leisure time for evening city exploration'
    ];
  }

  if (/depart|departure|final|last/i.test(title)) {
    return [
      'Breakfast & hotel check-out',
      'Free time for souvenir shopping in Thamel',
      'Private transfer to airport for departure'
    ];
  }

  // Check specific landmarks mentioned
  for (const item of SPECIFIC_LANDMARKS) {
    if (item.match.test(combined)) {
      if (!out.includes(item.phrase)) {
        out.push(item.phrase);
      }
      if (out.length >= 3) break;
    }
  }

  // Route journey
  const cleanTitle = title.replace(/^Day\s+\w+\s*[:–-]?\s*/i, '').replace(/\[.*?\]|\(.*?\)/g, '').trim();
  const routeMatch = cleanTitle.match(/^([A-Za-z\s]+)\s*(?:to|–|-)\s*([A-Za-z\s]+)/i);
  if (routeMatch && out.length < 2) {
    const from = routeMatch[1].trim();
    const to = routeMatch[2].trim();
    if (from.length < 25 && to.length < 25) {
      const verb = combined.includes('fly') || combined.includes('flight')
        ? 'Scenic flight from'
        : (combined.includes('drive') ? 'Scenic drive from' : 'Trek from');
      out.unshift(`${verb} ${from} to ${to}`);
    }
  }

  return out.slice(0, 3);
}

let totalUpdated = 0;

['packages', 'tourTrips', 'treks'].forEach(col => {
  if (!Array.isArray(db[col])) return;
  db[col].forEach(item => {
    if (!Array.isArray(item.itinerary)) return;
    item.itinerary.forEach(d => {
      const title = (d.title || '').trim();
      const desc = (d.description || d.desc || '').trim();
      const current = Array.isArray(d.highlights) ? d.highlights : (typeof d.highlights === 'string' ? [d.highlights] : []);

      // Filter and clean each existing highlight
      let cleaned = current
        .map(h => cleanNarrativeSentence(h))
        .filter(Boolean);

      // Remove duplicates
      cleaned = [...new Set(cleaned)];

      // If we have fewer than 2 quality highlights, derive specific landmark/route highlights
      if (cleaned.length < 2) {
        const specific = deriveSpecificHighlights(title, desc);
        for (const sp of specific) {
          if (!cleaned.includes(sp)) {
            cleaned.push(sp);
          }
          if (cleaned.length >= 3) break;
        }
      }

      // If still empty, fall back to clean title action
      if (cleaned.length === 0) {
        const cleanTitle = title.replace(/^Day\s+\w+\s*[:–-]?\s*/i, '').replace(/\[.*?\]|\(.*?\)/g, '').trim();
        if (cleanTitle) cleaned.push(`Explore ${cleanTitle}`);
      }

      d.highlights = cleaned.slice(0, 4);
      totalUpdated++;
    });
  });
});

console.log(`Refined highlights across all ${totalUpdated} itinerary days.`);

// Save to db.json
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

console.log('Complete!');
