const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load original database before truncation from git commit 1415f79
const origJson = execSync('git show 1415f79:backend/database/db.json', { maxBuffer: 50 * 1024 * 1024 }).toString('utf8');
const db = JSON.parse(origJson);

const BACKEND_DB = path.join(__dirname, '../backend/database/db.json');
const PUBLIC_DB = path.join(__dirname, '../public/database.json');
const SERVER_DB = path.join(__dirname, '../server/database.json');
const ZENEX_DEPLOY_DB = path.join(__dirname, '../zenex-deploy/database/db.json');

const PHRASE_RULES = [
  // Specific known sentences
  { match: /sunrise and sunset views over mount everest.*nagarkot/i, replace: 'Himalayan sunrise & sunset views from Nagarkot' },
  { match: /guided tour of unesco.*(?:bhaktapur|pashupatinath)/i, replace: 'UNESCO Heritage sites in Kathmandu & Bhaktapur' },
  { match: /visit kopan monastery.*durbar square/i, replace: 'Swayambhunath, Patan & Kathmandu Durbar Squares' },
  { match: /southern valley heritage.*kirtipur/i, replace: 'Dakshinkali Temple, Chobhar Gorge & Pharping' },
  { match: /complimentary.*nepali.*dinner/i, replace: 'Complimentary Nepali dinner with cultural dance' },
  { match: /stand at everest base camp/i, replace: 'Everest Base Camp (5,364m) & Khumbu Icefall' },
  { match: /summit kala patthar/i, replace: 'Kala Patthar (5,545m) with Mount Everest panorama' },
  { match: /explore namche bazaar/i, replace: 'Historic Sherpa capital of Namche Bazaar (3,440m)' },
  { match: /ancient tengboche monastery/i, replace: 'Tengboche Monastery facing Mount Ama Dablam' },
  { match: /cross iconic high suspension bridges/i, replace: 'Suspension bridges over Dudh Koshi River' },
  { match: /save time.*domestic flights/i, replace: '3 scenic domestic flights connecting key cities' },
  { match: /thrilling.*chitwan.*safari/i, replace: 'Chitwan jungle safari spotting rhinos & tigers' },
  { match: /peaceful dugout canoe/i, replace: 'Peaceful dugout canoe float on Rapti River' },
  { match: /indigenous tharu culture|tharu.*village/i, replace: 'Tharu cultural village walk & stick dance' },
  { match: /boating on phewa lake/i, replace: 'Phewa Lake boating & Pokhara valley sightseeing' },
  { match: /golden sunrise over annapurna.*sarangkot/i, replace: 'Sarangkot sunrise over Annapurna & Fishtail' },
  { match: /langtang valley.*valley of glaciers/i, replace: "Langtang Valley 'Valley of Glaciers' exploration" },
  { match: /traditional tamang village/i, replace: 'Traditional Tamang village culture & hospitality' },
  { match: /historic tibetan buddhist heritage/i, replace: 'Ancient Tibetan monasteries, chortens & mani walls' },
  { match: /herds of yaks/i, replace: 'Herds of yaks grazing in high alpine pastures' },
  { match: /rare himalayan wildlife/i, replace: 'Himalayan wildlife inside national park' },
  { match: /360-degree mountain views from kyanjin ri/i, replace: 'Summit views from Kyanjin Ri (4,773m) or Tserko Ri' },
  { match: /ancient tibetan-style.*mu gompa/i, replace: 'Ancient Mu Gompa (3,700m) & Rachen Gompa' },
  { match: /historical caves.*milarepa/i, replace: 'Historic Milarepa meditation caves' },
  { match: /excursion hike to ganesh himal base camp/i, replace: 'Hike to Ganesh Himal Base Camp (4,200m)' },
  { match: /authentic tibetan culture.*mani walls/i, replace: 'Authentic Tibetan culture, mani walls & prayer flags' },
  { match: /rhododendron forests.*alpine meadows/i, replace: 'Rhododendron forests, pine groves & alpine trails' },
  { match: /thermal hot springs at tatopani/i, replace: 'Natural thermal hot springs in Tatopani' },
  { match: /lauribina pass.*gosaikunda/i, replace: 'Cross Lauribina Pass (4,610m) & Gosaikunda Lakes' },
  { match: /larkya la pass/i, replace: 'Cross high-altitude Larkya La Pass (5,106m)' },
  { match: /thorong la pass/i, replace: 'Cross legendary Thorong La Pass (5,416m)' },
  { match: /gokyo.*chola pass/i, replace: 'Turquoise Gokyo Lakes & crossing Cho La Pass (5,330m)' },
  { match: /annapurna sanctuary/i, replace: 'Stand in 360-degree Annapurna Sanctuary amphitheater' },
  { match: /poon hill sunrise/i, replace: 'Iconic Poon Hill sunrise over Dhaulagiri & Annapurna' },
  { match: /potala palace/i, replace: 'Explore historic 13-storey Potala Palace' },
  { match: /jokhang temple|barkhor/i, replace: 'Sacred Jokhang Temple & Barkhor Street kora circuit' },
  { match: /pikey peak.*sunrise/i, replace: 'Pikey Peak sunrise over Everest & Kanchenjunga' },
  { match: /mardi himal.*(?:beginner|seeking)/i, replace: 'Scenic ridge trek facing Machhapuchhre & Annapurna' },
  { match: /off-the-beaten-path.*tsum valley|trails inside.*tsum/i, replace: 'Off-the-beaten-path trails in sacred Tsum Valley' }
];

function cleanBullet(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let s = raw.trim();
  s = s.replace(/^[–\-*•]\s*/, '').trim();

  // Strip service boilerplate
  if (/full logistics support|zenex travels|permit processing|dedicated customer support|24\/7|around-the-clock/i.test(s)) {
    return null;
  }

  // Check predefined phrase rules
  for (const rule of PHRASE_RULES) {
    if (rule.match.test(s)) {
      return rule.replace;
    }
  }

  // Strip introductory fluff
  s = s.replace(/^(experience|discover|witness|explore|visit|enjoy|stand at|summit|climb|trek through|hike through|take a|embark on|a deep dive into|opportunity to see|marvel at|observe|savor|taste)\s+/i, '');
  s = s.replace(/^the\s+/i, '');
  s = s.replace(/^(breathtaking|stunning|spectacular|mind-blowing|magnificent|unforgettable|iconic|picturesque|serene|tranquil|pristine|beautiful)\s+/i, '');

  // Strip trailing long clauses
  s = s.replace(/—\s*(the historic|known for|the spiritual heart|a major pilgrimage|famously known|home to|an unforgettable|with panoramic|offering).*$/i, '');
  s = s.replace(/\s+for\s+(360-degree|unforgettable|spectacular|iconic|maximum|panoramic\s+views\s+overlooking|high-altitude|lifetime|cultural depth).*$/i, '');
  s = s.replace(/\s+to\s+(learn about|hear genuine|spot\s+wild|ensure|rejuvenate).*$/i, '');
  s = s.replace(/,\s*(a\s+perfect\s+mix|making it|ideal for|perfect for|allowing travelers|offering an unforgettable|ensuring).*$/i, '');
  s = s.replace(/\s*\([^)]*unesco[^)]*\)/gi, '');
  s = s.replace(/\s*\([^)]*world heritage[^)]*\)/gi, '');
  s = s.replace(/\s{2,}/g, ' ');
  s = s.replace(/[.,;–-]+$/, '').trim();

  // Clean trailing dangling prepositions/conjunctions
  while (/\s+(?:the|a|an|with|in|at|from|to|over|of|and|inside|seeking|&)\s*$/i.test(s)) {
    s = s.replace(/\s+(?:the|a|an|with|in|at|from|to|over|of|and|inside|seeking|&)\s*$/i, '').trim();
  }

  // Clean unclosed parenthesis
  if (s.includes('(') && !s.includes(')')) {
    s = s.replace(/\([^\)]*$/, '').trim();
  }

  if (s.length > 0) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Truncate at logical boundary if > 65
  if (s.length > 65) {
    const parts = s.split(/[,:;]/);
    if (parts.length > 1 && parts[0].length >= 25 && parts[0].length <= 60) {
      s = parts[0].trim();
    } else {
      const words = s.split(' ');
      let acc = '';
      for (const w of words) {
        if ((acc + ' ' + w).trim().length > 58) break;
        acc += (acc ? ' ' : '') + w;
      }
      s = acc.replace(/[.,;–-]+$/, '').trim();
      while (/\s+(?:the|a|an|with|in|at|from|to|over|of|and|inside|seeking|&)\s*$/i.test(s)) {
        s = s.replace(/\s+(?:the|a|an|with|in|at|from|to|over|of|and|inside|seeking|&)\s*$/i, '').trim();
      }
      if (s.includes('(') && !s.includes(')')) {
        s = s.replace(/\([^\)]*$/, '').trim();
      }
    }
  }

  if (s.length < 15) return null;
  return s;
}

function processOverviewText(overview) {
  if (!overview || typeof overview !== 'string') return overview;

  const keyHighlightsRegex = /###\s*Key\s*Highlights([\s\S]*?)(?=###|$)/i;
  const match = overview.match(keyHighlightsRegex);
  if (!match) return overview;

  const rawSection = match[1];
  const rawBullets = rawSection
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('-') || l.startsWith('*') || l.startsWith('•'));

  const shortBullets = [];
  for (const b of rawBullets) {
    const cleaned = cleanBullet(b);
    if (cleaned && !shortBullets.includes(cleaned)) {
      shortBullets.push(cleaned);
    }
    if (shortBullets.length >= 6) break;
  }

  if (shortBullets.length === 0) return overview;

  const newSectionText = '### Key Highlights\n' + shortBullets.map(b => `- ${b}`).join('\n') + '\n\n';
  return overview.replace(keyHighlightsRegex, newSectionText);
}

let modifiedCount = 0;

['packages', 'tourTrips', 'treks'].forEach(col => {
  (db[col] || []).forEach(item => {
    let changed = false;

    // 1. Process overview
    if (item.overview && /###\s*Key\s*Highlights/i.test(item.overview)) {
      const updated = processOverviewText(item.overview);
      if (updated !== item.overview) {
        item.overview = updated;
        changed = true;
      }
    }

    // 2. Process description if it contains Key Highlights
    if (item.description && /###\s*Key\s*Highlights/i.test(item.description)) {
      const updated = processOverviewText(item.description);
      if (updated !== item.description) {
        item.description = updated;
        changed = true;
      }
    }

    // 3. Process item.highlights array if present
    if (Array.isArray(item.highlights) && item.highlights.length > 0) {
      const newHlts = [];
      for (const h of item.highlights) {
        const text = typeof h === 'string' ? h : (h.title || h.text || '');
        const shortH = cleanBullet(text);
        if (shortH && !newHlts.includes(shortH)) {
          newHlts.push(shortH);
        }
        if (newHlts.length >= 6) break;
      }
      if (newHlts.length > 0) {
        item.highlights = newHlts;
        changed = true;
      }
    }

    if (changed) modifiedCount++;
  });
});

console.log(`Successfully updated ${modifiedCount} packages, tours, and treks with short Key Highlights!`);

// Print sample outputs
const samples = [
  '6-days-kathmandu-nagarkot-tour',
  'TRIP-everest-base-camp-15d',
  'langtang-valley-trek-10d',
  '5-days-kathmandu-chitwan-pokhara-tour',
  'tsum-valley-trek-17d'
];

samples.forEach(id => {
  const p = (db.packages || []).concat(db.tourTrips || []).concat(db.treks || []).find(x => x.id === id);
  if (!p) return;
  console.log(`\n=== [${p.title}] Key Highlights ===`);
  const match = (p.overview || p.description || '').match(/###\s*Key\s*Highlights([\s\S]*?)(?=###|$)/i);
  if (match) {
    console.log(match[0].trim());
  }
});

// Also preserve our accurate accommodations in db.packages, db.tourTrips, db.treks!
// Let's load the accommodations from current db.json before saving
const currentDb = JSON.parse(fs.readFileSync(BACKEND_DB, 'utf8'));
['packages', 'tourTrips', 'treks'].forEach(col => {
  (db[col] || []).forEach(item => {
    const curItem = (currentDb[col] || []).find(x => x.id === item.id);
    if (curItem && Array.isArray(curItem.itinerary)) {
      curItem.itinerary.forEach((d, idx) => {
        if (item.itinerary && item.itinerary[idx]) {
          item.itinerary[idx].accommodation = d.accommodation;
          item.itinerary[idx].modeOfTravel = d.modeOfTravel;
          item.itinerary[idx].maxAltitude = d.maxAltitude;
          item.itinerary[idx].meals = d.meals;
          delete item.itinerary[idx].highlights;
        }
      });
    }
  });
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

console.log('\nSynced db.json to backend, public, server, and zenex-deploy.');
