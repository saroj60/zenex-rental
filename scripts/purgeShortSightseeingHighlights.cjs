const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../backend/database/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// Strict forbidden patterns:
// 1. Elevation/altitude statements
// 2. Duplicate route phrases
// 3. Short canned sightseeing/temple templates and meditation points
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

  // Short canned sightseeing / temple / meditation templates
  /^\s*visit\s+(?:sacred\s+)?pashupatinath\b/i,
  /^\s*visit\s+(?:sacred\s+hindu\s+shrine\s+of\s+)?pashupatinath\b/i,
  /^\s*visit\s+boudhanath\b/i,
  /^\s*explore\s+boudhanath\b/i,
  /^\s*circumambulate\s+the\s+(?:massive|great)\s+boudhanath/i,
  /^\s*visit\s+kathmandu\s+durbar\s+square\s*$/i,
  /^\s*guided\s+unesco\s+tour:\s*kathmandu\s+durbar\s+square/i,
  /^\s*explore\s+patan\s+durbar\s+square/i,
  /^\s*walk\s+through\s+ancient\s+bhaktapur\s+durbar\s+square/i,
  /spiritual\s+practice\s*&\s*meditation\s+session/i,
  /meditation\s*&\s*spiritual\s+practice\s+session/i,
  /\(unesco\s+world\s+heritage\)/i,
  /\(unesco\)/i,
  /unesco\s+world\s+heritage\s+sites?/i,
  /unesco\s+heritage\s+sightseeing/i,
  /^\s*explore\s+pokhara\s+lakeside\s+city\s*$/i,
  /^\s*explore\s+seti\s+river\s+gorge\s*$/i,
  /^\s*visit\s+dakshinkali\s+temple\s*$/i,
  /^\s*visit\s+pharping\s+sacred\s+sites\s*$/i,
  /^\s*visit\s+chobhar\s+gorge\s*&\s*adinath\s+temple\s*$/i,
  /^\s*visit\s+sacred\s+birthplace\s+of\s+lord\s+buddha/i,
  /^\s*visit\s+birthplace\s+of\s+lord\s+buddha\s+at\s+lumbini\s*$/i,
  /^\s*cultural\s+sightseeing/i,
  /^\s*explore\s+bhaktapur\s+durbar\s+square/i,
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

function cleanHighlightText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\s*\(?\s*[\d,.]+\s*(?:m|ft)\s*(?:\/\s*[\d,.]+\s*(?:m|ft))?\s*\)?/gi, '')
    .replace(/\[\s*altitude.*?\]/gi, '')
    .replace(/\s*\(approx.*?\)/gi, '')
    .replace(/\s*\((?:unesco|world heritage).*?\)/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[–\-•*]\s*/, '')
    .replace(/[.,;–-]+$/, '')
    .trim();
}

function deriveRichHighlights(day) {
  const title = (day.title || '').replace(/^Day\s+\w+\s*[:–-]?\s*/i, '').trim();
  const desc = (day.details || day.desc || day.description || '').trim();
  const combined = (title + ' ' + desc).toLowerCase();
  const out = [];

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

  // Chandragiri
  if (/chandragiri/i.test(combined)) {
    out.push('Scenic cable car ride up to Chandragiri Hills resort & viewpoint');
    out.push('Breathtaking Himalayan panorama of Everest and Annapurna ranges');
    if (/bhaleshwar|bhaleshwore/i.test(combined)) {
      out.push('Visit sacred hilltop Bhaleshwar Mahadev Temple');
    }
  }

  // Bhaktapur
  if (/bhaktapur/i.test(combined) && out.length < 3) {
    out.push('Guided heritage walk through medieval Bhaktapur Durbar Square & 55 Window Palace');
    if (/nyatapol/i.test(combined) && out.length < 3) {
      out.push('Marvel at the towering 5-story Nyatapola Temple architecture');
    }
  }

  // Boudhanath
  if (/boudhanath|bouddha/i.test(combined) && out.length < 3) {
    out.push('Spinning prayer wheels and Tibetan monastic life around Boudhanath Stupa');
  }

  // Pashupatinath
  if (/pashupatinath/i.test(combined) && out.length < 3) {
    out.push('Sacred Hindu river ghat rituals and ancient shrines at Pashupatinath Temple');
  }

  // Swayambhunath
  if (/swayambhunath|swoyambhunath|monkey\s*temple/i.test(combined) && out.length < 3) {
    out.push('Panoramic Kathmandu valley views from hilltop Swayambhunath Stupa');
  }

  // Patan
  if (/patan/i.test(combined) && out.length < 3) {
    out.push('Explore intricate Newari metalcraft and courtyards of Patan Durbar Square');
  }

  // Kathmandu Durbar Square
  if (/kathmandu\s*durbar/i.test(combined) && out.length < 3) {
    out.push('Historic courtyards, pagoda temples & Kumari Ghar Living Goddess residence');
  }

  // Nagarkot
  if (/nagarkot/i.test(combined) && out.length < 3) {
    out.push('Golden Himalayan sunrise vistas stretching from Annapurna to Everest ridge');
  }

  // Sarangkot / Pokhara
  if (/sarangkot/i.test(combined) && out.length < 3) {
    out.push('Golden sunrise over Annapurna & Dhaulagiri ranges from Sarangkot');
  }
  if (/phewa|boating/i.test(combined) && out.length < 3) {
    out.push('Peaceful boat ride on Phewa Lake with Fishtail mountain reflections');
  }
  if (/davis|gupteshwor/i.test(combined) && out.length < 3) {
    out.push('Visit subterranean Davis Fall and sacred Gupteshwor Cave');
  }
  if (/peace pagoda|shanti stupa/i.test(combined) && out.length < 3) {
    out.push('Hike to hilltop World Peace Pagoda overlooking Pokhara valley');
  }

  // Chitwan
  if (/chitwan|safari/i.test(combined) && out.length < 3) {
    if (/jeep|elephant/i.test(combined)) {
      out.push('Thrilling jungle jeep safari spotting one-horned rhinos & wildlife');
    }
    if (/canoe|rapti/i.test(combined) && out.length < 3) {
      out.push('Peaceful dugout canoe float along Rapti River for crocodile spotting');
    }
    if (/tharu/i.test(combined) && out.length < 3) {
      out.push('Experience vibrant traditional Tharu cultural dance and village life');
    }
  }

  // Lumbini
  if (/lumbini|maya devi/i.test(combined) && out.length < 3) {
    out.push('Explore sacred Maya Devi Temple – ancient birthplace of Lord Buddha');
    out.push('Peaceful walk through Lumbini international monastic gardens & peace flame');
  }

  // Bandipur / Dhulikhel
  if (/bandipur/i.test(combined) && out.length < 3) {
    out.push('Stroll preserved cobblestone streets and heritage homes in Bandipur');
  }
  if (/dhulikhel/i.test(combined) && out.length < 3) {
    out.push('Traditional Newari township & snow-capped views from Dhulikhel');
  }

  // Tibet
  if (/potala/i.test(combined) && out.length < 3) {
    out.push('Explore historic chambers of the iconic 13-storey Potala Palace');
  }
  if (/jokhang|barkhor/i.test(combined) && out.length < 3) {
    out.push('Walk alongside Tibetan pilgrims on the sacred Barkhor Street kora circuit');
  }
  if (/sera monastery/i.test(combined) && out.length < 3) {
    out.push('Witness lively philosophical monk debates at Sera Monastery');
  }
  if (/yamdrok/i.test(combined) && out.length < 3) {
    out.push('Spectacular turquoise waters of sacred Yamdrok Lake');
  }

  // Everest landmarks
  if (/kala patthar/i.test(combined) && out.length < 3) {
    out.push('Iconic sunrise over Mount Everest from Kala Patthar');
  }
  if (/everest base camp|ebc/i.test(combined) && out.length < 3) {
    out.push('Stand at legendary Everest Base Camp beside Khumbu Icefall');
  }
  if (/gokyo ri/i.test(combined) && out.length < 3) {
    out.push('Panoramic summit views of 4 eight-thousanders from Gokyo Ri');
  }
  if (/gokyo lake/i.test(combined) && out.length < 3) {
    out.push('Explore pristine turquoise Gokyo alpine glacial lakes');
  }
  if (/tengboche/i.test(combined) && out.length < 3) {
    out.push('Visit historic Tengboche Monastery with mountain backdrop');
  }
  if (/namche/i.test(combined) && out.length < 3) {
    out.push('Explore bustling Sherpa trading hub of Namche Bazaar');
  }
  if (/machhermo|machermo/i.test(combined) && out.length < 3) {
    out.push('Alpine trail through high summer pastures of Machhermo');
  }

  // Annapurna landmarks
  if (/thorong la/i.test(combined) && out.length < 3) {
    out.push('Cross legendary Thorong La Pass – apex of Annapurna Circuit');
  }
  if (/muktinath/i.test(combined) && out.length < 3) {
    out.push('Visit sacred Muktinath Temple with 108 eternal holy water spouts');
  }
  if (/poon hill/i.test(combined) && out.length < 3) {
    out.push('Golden Himalayan sunrise over Dhaulagiri & Annapurna from Poon Hill');
  }
  if (/ghorepani/i.test(combined) && out.length < 3) {
    out.push('Trek through blooming rhododendron forests to Ghorepani');
  }
  if (/ghandruk/i.test(combined) && out.length < 3) {
    out.push('Explore stone-paved alleys and Gurung culture in Ghandruk');
  }

  // Action sentence fallback from description
  if (out.length < 2 && desc) {
    const sentences = desc
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map(s => cleanHighlightText(s))
      .filter(s => {
        if (!s || s.length < 20 || s.length > 85) return false;
        if (isForbidden(s)) return false;
        if (/^(after breakfast|in the morning|today|wake up|we will|you will|depart|our|meet your)/i.test(s)) return false;
        return /\b(visit|explore|hike|trek|ascend|descend|cross|witness|marvel|discover|observe|spot|enjoy|stroll|climb|pass|view|panoram|scenic|peaceful|traditional|temple|monastery|ridge|pass|lake|valley|river|forest)\b/i.test(s);
      });

    for (const sent of sentences) {
      if (!out.includes(sent)) {
        out.push(sent);
        if (out.length >= 3) break;
      }
    }
  }

  // Generic final fallback
  if (out.length === 0) {
    if (/drive/i.test(combined)) {
      out.push('Scenic overland drive through Himalayan foothills');
      out.push('Picturesque river valleys and terraced hillsides');
    } else if (/flight|fly/i.test(combined)) {
      out.push('Scenic mountain flight with Himalayan aerial vistas');
      out.push('Smooth airport transfer and journey continuation');
    } else {
      out.push('Scenic alpine trekking through tranquil mountain landscapes');
      out.push('Stunning Himalayan panoramas & authentic local teahouse hospitality');
    }
  } else if (out.length === 1) {
    if (/drive/i.test(combined)) {
      out.push('Scenic overland journey through countryside river valleys');
    } else if (/flight|fly/i.test(combined)) {
      out.push('Panoramic Himalayan aerial mountain views');
    } else {
      out.push('Panoramic mountain views along the scenic trail');
    }
  }

  return out.slice(0, 3);
}

// ─── Execute ────────────────────────────────────────────────────────────────
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

      // 1. Filter out forbidden highlights
      let cleaned = current
        .map(h => cleanHighlightText(typeof h === 'string' ? h : (h?.text || '')))
        .filter(h => h && h.length > 5 && !isForbidden(h));

      cleaned = [...new Set(cleaned)];

      if (cleaned.length < current.length) {
        purgedItemsCount += (current.length - cleaned.length);
      }

      // 2. If fewer than 2 quality highlights remain, derive rich replacement
      if (cleaned.length < 2) {
        regeneratedDaysCount++;
        const derived = deriveRichHighlights(d);
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
console.log(`Purged ${purgedItemsCount} short/boilerplate highlight items.`);
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
