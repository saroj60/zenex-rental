const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../backend/database/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// Strict forbidden patterns for day highlights
const FORBIDDEN_PATTERNS = [
  // Elevation / altitude phrases
  /(\d+\s*m\s+elevation|elevation\s+terrain|elevation\s+with\s+mountain|reach\s+altitude\s+of|\d+\s*m\s+–\s+high\s+camp|altitude\s+of\s+\d+|elevation\s+panoramas|\b\d{3,4}\s*m\b.*elevation|elevation.*\b\d{3,4}\s*m\b|acclimatiz.*higher\s+elevation|reach\s+extreme\s+altitude)/i,
  /^\s*trek\s+(to|through)\s+\d+\s*m\b/i,
  /^\s*reach\s+altitude/i,
  /^\s*summit\s+attempt\s+at\s+\d+\s*m/i,
  /^\s*trek\s+to\s+altitude\b/i,

  // Redundant route leg phrases
  /^\s*(trek|scenic trek|drive|scenic drive|flight|scenic flight|fly|journey)\s+from\s+/i,
  /^\s*scenic drive to lakeside pokhara valley\s*$/i,
  /^\s*scenic flight from flight\b/i,
  /^\s*scenic trek from (full|tiger)\b/i,
  /^\s*(trek|drive|flight|scenic flight|scenic drive|scenic trek)\s+to\s+(lakeside\s+pokhara\s+valley|\d+\s*m\b)/i,
  /^\s*(trek|scenic trek|drive|scenic drive|flight|scenic flight)\s+from\s+.+\s+to\s+.+/i,

  // Generic canned templates
  /cultural sightseeing/i,
  /explore bhaktapur durbar square \(unesco\)/i,
  /^\s*kathmandu\s*$/i,
  /^\s*pokhara\s*$/i,
  /^\s*bhaktapur\s*$/i,
  /^\s*patan\s*$/i,
  /^\s*rest & exploration day\s*$/i,
  /^\s*full day trekking\s*$/i,
  /^\s*cultural immersion & local heritage\s*$/i,
  /^\s*explore local culture & scenic surroundings\s*$/i,
  /\s{2,}/
];

function isForbidden(h) {
  if (!h || typeof h !== 'string') return true;
  const s = h.trim();
  if (s.length < 5) return true;
  return FORBIDDEN_PATTERNS.some(re => re.test(s));
}

// Clean altitude tags, parentheticals, and bracketed notes
function cleanHighlightText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\s*\(?\s*[\d,.]+\s*(?:m|ft)\s*(?:\/\s*[\d,.]+\s*(?:m|ft))?\s*\)?/gi, '')
    .replace(/\[\s*altitude.*?\]/gi, '')
    .replace(/\s*\(approx.*?\)/gi, '')
    .replace(/\s*\(unesco\)/gi, ' (UNESCO)')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[–\-•*]\s*/, '')
    .replace(/[.,;–-]+$/, '')
    .trim();
}

// Comprehensive landmark & activity highlights
const LANDMARK_MAP = [
  // Everest / Khumbu
  { re: /kala patthar/i, h: 'Iconic sunrise over Mount Everest from Kala Patthar' },
  { re: /everest base camp|ebc/i, h: 'Stand at legendary Everest Base Camp beside Khumbu Icefall' },
  { re: /gokyo ri/i, h: 'Panoramic summit views of 4 eight-thousanders from Gokyo Ri' },
  { re: /gokyo lake/i, h: 'Explore pristine turquoise Gokyo alpine glacial lakes' },
  { re: /cho la pass|chola pass/i, h: 'Traverse rugged glacier trail crossing Cho La Pass' },
  { re: /renjo la/i, h: 'Spectacular Everest panorama from Renjo La Pass ridge' },
  { re: /kongma la/i, h: 'Cross challenging glaciated Kongma La Pass' },
  { re: /ama dablam/i, h: 'Spectacular close-up views of iconic Mount Ama Dablam' },
  { re: /tengboche|tyangboche/i, h: 'Visit historic Tengboche Monastery with mountain backdrop' },
  { re: /namche/i, h: 'Explore bustling Sherpa trading hub of Namche Bazaar' },
  { re: /lukla/i, h: 'Scenic mountain flight to/from Lukla airstrip' },
  { re: /machhermo|machermo/i, h: 'Alpine trail through high summer pastures of Machhermo' },
  { re: /dole/i, h: 'Ascend above tree line with views of Thamserku and Cho Oyu' },
  { re: /phortse/i, h: 'Visit traditional Sherpa farming village of Phortse' },
  { re: /dingboche/i, h: 'Scenic hike along the Imja Valley toward Dingboche' },
  { re: /lobuche/i, h: 'Trek along the rugged moraine of Khumbu Glacier to Lobuche' },
  { re: /gorak\s*shep/i, h: 'Reach Gorak Shep – last settlement before Everest Base Camp' },
  { re: /pikey peak/i, h: 'Panoramic sunrise view of Himalayan giants from Pikey Peak' },
  { re: /dhap|jhapre/i, h: 'Scenic countryside trail with traditional Sherpa monasteries' },

  // Annapurna Region
  { re: /thorong la/i, h: 'Cross legendary Thorong La Pass – apex of Annapurna Circuit' },
  { re: /muktinath/i, h: 'Visit sacred Muktinath Temple with 108 eternal holy water spouts' },
  { re: /annapurna base camp|abc/i, h: 'Reach the dramatic 360° natural Annapurna Sanctuary amphitheater' },
  { re: /machhapuchhre base camp|mbc/i, h: 'Camp beneath dramatic fishtail face of Machhapuchhre' },
  { re: /poon hill/i, h: 'Golden Himalayan sunrise over Dhaulagiri & Annapurna from Poon Hill' },
  { re: /ghorepani/i, h: 'Trek through blooming rhododendron forests to Ghorepani' },
  { re: /ghandruk/i, h: 'Explore stone-paved alleys and Gurung culture in Ghandruk' },
  { re: /mardi himal/i, h: 'High ridge trail facing towering Machhapuchhre on Mardi Himal' },
  { re: /tilicho lake/i, h: 'Visit breathtaking turquoise waters of high-altitude Tilicho Lake' },
  { re: /manang/i, h: 'Explore ancient cliff monasteries and Tibetan heritage in Manang' },
  { re: /pisang/i, h: 'Spectacular views of Annapurna II from upper Pisang village' },
  { re: /tatopani/i, h: 'Relaxing natural hot springs soak at Tatopani' },
  { re: /jomsom/i, h: 'Explore windy Kali Gandaki gorge & Thakali culture in Jomsom' },
  { re: /marpha/i, h: 'Walk whitewashed stone alleys of Marpha apple orchard village' },

  // Manaslu Region
  { re: /larkya la/i, h: 'Summit dramatic Larkya La Pass with views of Himlung & Cheo Himal' },
  { re: /manaslu base camp/i, h: 'Hike to pristine Manaslu Base Camp and Birendra Lake' },
  { re: /samagaon/i, h: 'Explore ancient Tibetan Buddhist monastery of Sama Gaon' },
  { re: /samdo/i, h: 'Visit remote high-altitude Tibetan trading village of Samdo' },
  { re: /dharmasala/i, h: 'High alpine staging camp beneath Larkya glacier' },

  // Langtang & Helambu
  { re: /kyanjin/i, h: 'Explore Kyanjin Gompa & traditional local yak cheese factory' },
  { re: /kyanjin ri|tserko ri/i, h: 'Climb viewpoint peak for panoramic Langtang glacier views' },
  { re: /langtang/i, h: 'Trek through scenic Langtang National Park alpine valley' },
  { re: /gosaikunda/i, h: 'Visit sacred holy glacial lake of Gosaikunda' },
  { re: /lauribina/i, h: 'Sweeping mountain vistas across Ganesh Himal from Lauribina Pass' },

  // Western & Remote Treks
  { re: /phoksundo/i, h: 'Marvel at deep turquoise waters of holy Lake Phoksundo' },
  { re: /shey gompa/i, h: 'Visit 11th-century Shey Gompa beneath mystical Crystal Mountain' },
  { re: /dho tarap/i, h: 'Explore highest permanent human settlement in Dho Tarap valley' },
  { re: /rara lake/i, h: 'Walk tranquil pine-forested shores of pristine Lake Rara' },
  { re: /kanchenjunga/i, h: 'Trek beneath towering Kanchenjunga – third highest peak on Earth' },
  { re: /makalu/i, h: 'Explore rugged wilderness of Makalu Barun glacial valley' },
  { re: /tashi lapcha/i, h: 'Cross technical glaciated Tashi Lapcha Pass from Rolwaling' },

  // Pokhara & Kathmandu
  { re: /sarangkot/i, h: 'Panoramic sunrise over Annapurna & Dhaulagiri from Sarangkot' },
  { re: /phewa lake/i, h: 'Peaceful boat ride on Phewa Lake with mountain reflections' },
  { re: /world peace pagoda|shanti stupa/i, h: 'Hike to hilltop World Peace Pagoda overlooking Pokhara valley' },
  { re: /davis fall/i, h: 'Visit underground waterfall of Davis Fall & Gupteshwor Cave' },
  { re: /pashupatinath/i, h: 'Visit sacred Hindu shrine & river ghats of Pashupatinath' },
  { re: /boudhanath/i, h: 'Circumambulate the great Buddhist Stupa of Boudhanath' },
  { re: /swayambhunath|monkey temple/i, h: 'Sunset vistas over Kathmandu Valley from Swayambhunath' },
  { re: /bhaktapur/i, h: 'Explore medieval brick courtyards of Bhaktapur Durbar Square' },
  { re: /patan/i, h: 'Admire intricate Newari metalcraft & temples of Patan Durbar Square' },
  { re: /changunarayan/i, h: 'Visit historical 5th-century Changunarayan Temple' },
  { re: /nagarkot/i, h: 'Himalayan sunrise panoramas stretching to Everest from Nagarkot' },
  { re: /dhulikhel/i, h: 'Traditional Newari township & snow-capped views from Dhulikhel' },
  { re: /chandragiri/i, h: 'Scenic cable car ride to Chandragiri hilltop temple' },
  { re: /bandipur/i, h: 'Stroll preserved historic streetscapes and heritage homes in Bandipur' },

  // Jungle & Terai
  { re: /chitwan.*safari|safari.*chitwan/i, h: 'Jeep safari spotting one-horned rhinos & royal Bengal tigers' },
  { re: /canoe|rapti/i, h: 'Peaceful canoe float along Rapti River for crocodile spotting' },
  { re: /tharu/i, h: 'Experience vibrant traditional Tharu cultural dance and village life' },
  { re: /bardia/i, h: 'Pristine wilderness wildlife tracking in Bardia National Park' },
  { re: /lumbini|maya devi/i, h: 'Visit sacred Maya Devi Temple – birthplace of Lord Buddha' },

  // Tibet
  { re: /potala palace/i, h: 'Explore historic chambers of the iconic Potala Palace' },
  { re: /jokhang/i, h: 'Visit sacred Jokhang Temple – spiritual heart of Tibet' },
  { re: /barkhor/i, h: 'Join pilgrims along the vibrant Barkhor Street kora circuit' },
  { re: /sera monastery/i, h: 'Witness lively philosophical monk debates at Sera Monastery' },
  { re: /drepung monastery/i, h: 'Explore vast historic halls of Drepung Monastery' },
  { re: /yamdrok/i, h: 'Spectacular turquoise waters of sacred Yamdrok Lake' },
  { re: /gyantse|kumbum/i, h: 'Visit 100,000-image Gyantse Kumbum Stupa & Pelkhor Monastery' },
  { re: /tashilhunpo|shigatse/i, h: 'Explore Tashilhunpo Monastery – seat of the Panchen Lama' },
  { re: /rongbuk/i, h: 'Visit highest Buddhist monastery in the world at Rongbuk' }
];

function deriveCleanHighlights(day) {
  const title = (day.title || '').replace(/^Day\s+\w+\s*[:–-]?\s*/i, '').trim();
  const desc = (day.details || day.desc || day.description || '').trim();
  const combined = `${title} ${desc}`.toLowerCase();

  // Arrival
  if (/\barriv/i.test(title)) {
    return [
      'Airport welcome & private hotel transfer',
      'Trip orientation, welcome Khada & briefing',
      'Leisure time for evening stroll & hotel rest'
    ];
  }

  // Departure
  if (/depart|departure|final|last.*day/i.test(title)) {
    return [
      'Breakfast & hotel check-out',
      'Free time for souvenir shopping in Thamel',
      'Private transfer to airport for departure'
    ];
  }

  // Acclimatization
  if (/acclimatiz/i.test(title)) {
    return [
      'Rest & altitude acclimatization day',
      'Scenic acclimatization day hike with mountain vistas',
      'Explore local village culture and traditions'
    ];
  }

  const out = [];

  // Match landmark triggers
  for (const lm of LANDMARK_MAP) {
    if (lm.re.test(combined)) {
      if (!out.includes(lm.h)) {
        out.push(lm.h);
      }
      if (out.length >= 3) break;
    }
  }

  // Extract quality action sentences from details/description
  if (out.length < 2 && desc) {
    const sentences = desc
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map(s => cleanHighlightText(s))
      .filter(s => {
        if (!s || s.length < 18 || s.length > 85) return false;
        if (isForbidden(s)) return false;
        // Check for narrative starters
        if (/^(after breakfast|in the morning|today|wake up|we will|you will|depart|our)/i.test(s)) return false;
        // Must have action or visual focus
        return /\b(visit|explore|hike|trek|ascend|descend|cross|witness|marvel|discover|observe|spot|enjoy|stroll|climb|pass|view|panoram|scenic|peaceful|traditional|temple|monastery|ridge|pass|lake|valley|river|forest)\b/i.test(s);
      });

    for (const sent of sentences) {
      if (!out.includes(sent)) {
        out.push(sent);
        if (out.length >= 3) break;
      }
    }
  }

  // Generic fallback if still under 2 highlights
  if (out.length === 0) {
    const cleanT = cleanHighlightText(title);
    if (/drive/i.test(combined)) {
      out.push(`Scenic overland drive through Himalayan foothills`);
      out.push(`Picturesque river valleys and terraced hillsides`);
    } else if (/flight|fly/i.test(combined)) {
      out.push(`Scenic mountain flight with Himalayan aerial vistas`);
      out.push(`Smooth airport transfer and journey continuation`);
    } else {
      out.push(`Scenic alpine trekking through tranquil mountain landscapes`);
      out.push(`Stunning Himalayan panoramas & authentic local teahouse hospitality`);
    }
  } else if (out.length === 1) {
    if (/drive/i.test(combined)) {
      out.push(`Scenic overland journey through countryside river valleys`);
    } else if (/flight|fly/i.test(combined)) {
      out.push(`Panoramic Himalayan aerial mountain views`);
    } else {
      out.push(`Panoramic mountain views along the scenic trail`);
    }
  }

  return out.slice(0, 3);
}

// ─── Process all collections ────────────────────────────────────────────────
let totalDaysProcessed = 0;
let purgedItemsCount = 0;
let regeneratedDaysCount = 0;

['packages', 'tourTrips', 'treks'].forEach(col => {
  if (!Array.isArray(db[col])) return;
  db[col].forEach(item => {
    if (!Array.isArray(item.itinerary)) return;
    item.itinerary.forEach((d, idx) => {
      totalDaysProcessed++;
      const current = Array.isArray(d.highlights)
        ? d.highlights
        : (typeof d.highlights === 'string' && d.highlights.trim() ? [d.highlights] : []);

      // 1. Clean and filter current highlights
      let cleaned = current
        .map(h => cleanHighlightText(typeof h === 'string' ? h : (h?.text || '')))
        .filter(h => h && h.length > 5 && !isForbidden(h));

      // Remove duplicates
      cleaned = [...new Set(cleaned)];

      if (cleaned.length < current.length) {
        purgedItemsCount += (current.length - cleaned.length);
      }

      // 2. If fewer than 2 quality highlights remain, derive replacement
      if (cleaned.length < 2) {
        regeneratedDaysCount++;
        const derived = deriveCleanHighlights(d);
        for (const dh of derived) {
          if (!cleaned.includes(dh)) {
            cleaned.push(dh);
          }
          if (cleaned.length >= 3) break;
        }
      }

      // Final sanity filter
      d.highlights = cleaned
        .map(cleanHighlightText)
        .filter(h => h && h.length > 5 && !isForbidden(h))
        .slice(0, 4);
    });
  });
});

console.log(`Processed ${totalDaysProcessed} total itinerary days.`);
console.log(`Purged ${purgedItemsCount} bad highlight items.`);
console.log(`Regenerated/supplemented highlights for ${regeneratedDaysCount} days.`);

// Save back to backend/database/db.json
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log('Saved updated database to backend/database/db.json');

// Sync to other database files
const SYNC_DESTINATIONS = [
  path.join(__dirname, '../public/database.json'),
  path.join(__dirname, '../server/database.json'),
  path.join(__dirname, '../zenex-deploy/database/db.json')
];

SYNC_DESTINATIONS.forEach(dest => {
  if (fs.existsSync(path.dirname(dest))) {
    fs.copyFileSync(DB_PATH, dest);
    console.log(`Synced to ${dest}`);
  }
});

console.log('Database cleanup completed successfully.');
