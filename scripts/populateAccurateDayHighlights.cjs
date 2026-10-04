const fs = require('fs');
const path = require('path');

const BACKEND_DB = path.join(__dirname, '../backend/database/db.json');
const PUBLIC_DB = path.join(__dirname, '../public/database.json');
const SERVER_DB = path.join(__dirname, '../server/database.json');
const ZENEX_DEPLOY_DB = path.join(__dirname, '../zenex-deploy/database/db.json');

const db = JSON.parse(fs.readFileSync(BACKEND_DB, 'utf8'));

// Forbidden phrases that should never appear in highlights
const FORBIDDEN_HIGHLIGHT_RE = /(cultural sightseeing & temple visits|^\s*kathmandu\s*$|^\s*pokhara\s*$|^\s*bhaktapur\s*$|^\s*patan\s*$|^\s*rest & exploration day\s*$|^\s*full day trekking\s*$|\s{2,}|\d+\s*m\s+elevation|elevation\s+terrain|elevation\s+with\s+mountain|reach\s+altitude\s+of|\d+\s*m\s+–\s+high\s+camp|altitude\s+of\s+\d+|elevation\s+panoramas|\b\d{3,4}\s*m\b.*elevation|elevation.*\b\d{3,4}\s*m\b|acclimatiz.*higher\s+elevation|reach\s+extreme\s+altitude|^\s*trek\s+(to|through)\s+\d+\s*m\b|^\s*reach\s+altitude|^\s*summit\s+attempt\s+at\s+\d+\s*m|^\s*(trek|scenic trek|drive|scenic drive|flight|scenic flight|fly|journey)\s+from\s+|^\s*scenic drive to lakeside pokhara valley\s*$|^\s*scenic flight from flight\b|^\s*scenic trek from (full|tiger)\b|^\s*(trek|drive|flight|scenic flight|scenic drive|scenic trek)\s+to\s+(lakeside\s+pokhara\s+valley|\d+\s*m\b)|^\s*(trek|scenic trek|drive|scenic drive|flight|scenic flight)\s+from\s+.+\s+to\s+.+|spiritual\s+practice\s*&\s*meditation\s+session|meditation\s*&\s*spiritual\s+practice\s+session)/i;

function cleanText(t) {
  if (!t || typeof t !== 'string') return '';
  return t
    .replace(/\s*\(?\s*[\d,.]+\s*(?:m|ft)\b(?:\/\s*[\d,.]+\s*(?:m|ft)\b)?\s*\)?/gi, '')
    .replace(/\[\s*altitude.*?\]/gi, '')
    .replace(/\s*\(approx.*?\)/gi, '')
    .replace(/\s*\((?:unesco|world heritage).*?\)/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[–\-•*]\s*/, '')
    .replace(/[.,;–-]+$/, '')
    .trim();
}

// Grouped landmark rules to prevent duplicate highlights for the same attraction
const LANDMARK_RULE_GROUPS = [
  // Kathmandu & Valley Highlights
  {
    group: 'changunarayan',
    rules: [
      {
        matches: (t, d) => /changunarayan/i.test(t + ' ' + d),
        highlight: 'Visit ancient Changunarayan Temple – oldest Hindu shrine in Kathmandu Valley'
      }
    ]
  },
  {
    group: 'bhaktapur',
    rules: [
      {
        matches: (t, d) => /bhaktapur/i.test(t + ' ' + d) && /55.*window|nyatapol/i.test(t + ' ' + d),
        highlight: 'Explore Bhaktapur Durbar Square (55-Window Palace, Golden Gate & Nyatapola Temple)'
      },
      {
        matches: (t, d) => /bhaktapur/i.test(t + ' ' + d),
        highlight: 'Explore medieval brick courtyards and ancient pagoda temples of Bhaktapur Durbar Square'
      }
    ]
  },
  {
    group: 'nagarkot_sunset',
    rules: [
      {
        matches: (t, d) => /nagarkot/i.test(t + ' ' + d) && /sunset/i.test(t + ' ' + d),
        highlight: 'Spectacular sunset views over the eastern Himalayas including Mount Everest from Nagarkot'
      }
    ]
  },
  {
    group: 'nagarkot_sunrise',
    rules: [
      {
        matches: (t, d) => /nagarkot/i.test(t + ' ' + d) && /sunrise/i.test(t + ' ' + d),
        highlight: 'Early morning panoramic sunrise over the snow-capped Himalayas from Nagarkot ridge'
      }
    ]
  },
  {
    group: 'nagarkot_drive_walk',
    rules: [
      {
        matches: (t, d) => /nagarkot/i.test(t + ' ' + d) && /village|drive\s+to\s+nagarkot|proceed\s+to\s+nagarkot/i.test(t + ' ' + d) && !/sunrise/i.test(t + ' ' + d),
        highlight: 'Scenic drive to Nagarkot hill station and walk around traditional hillside villages'
      }
    ]
  },
  {
    group: 'boudhanath',
    rules: [
      {
        matches: (t, d) => /boudhanath|bouddha/i.test(t + ' ' + d),
        highlight: 'Explore the massive Buddhist dome of Boudhanath Stupa and Tibetan monasteries'
      }
    ]
  },
  {
    group: 'pashupatinath',
    rules: [
      {
        matches: (t, d) => /pashupatinath/i.test(t + ' ' + d),
        highlight: 'Visit sacred Hindu shrine and Bagmati River ghats at Pashupatinath Temple'
      }
    ]
  },
  {
    group: 'kopan',
    rules: [
      {
        matches: (t, d) => /kopan/i.test(t + ' ' + d),
        highlight: 'Tour peaceful Kopan Monastery overlooking Kathmandu Valley'
      }
    ]
  },
  {
    group: 'patan',
    rules: [
      {
        matches: (t, d) => /patan/i.test(t + ' ' + d),
        highlight: 'Explore medieval courtyards and intricate Newari architecture at Patan Durbar Square'
      }
    ]
  },
  {
    group: 'swayambhunath',
    rules: [
      {
        matches: (t, d) => /swayambhunath|swoyambhunath|monkey\s*temple/i.test(t + ' ' + d),
        highlight: 'Climb to hilltop Swayambhunath Stupa (Monkey Temple) for panoramic valley views'
      }
    ]
  },
  {
    group: 'kathmandu_durbar',
    rules: [
      {
        matches: (t, d) => /kathmandu\s*durbar/i.test(t + ' ' + d) && /kumari/i.test(t + ' ' + d),
        highlight: 'Visit historic Kathmandu Durbar Square and Kumari Ghar (Living Goddess residence)'
      },
      {
        matches: (t, d) => /kathmandu\s*durbar/i.test(t + ' ' + d),
        highlight: 'Discover ancient royal palaces and centuries-old pagoda temples of Kathmandu Durbar Square'
      }
    ]
  },
  {
    group: 'chandragiri',
    rules: [
      {
        matches: (t, d) => /chandragiri/i.test(t + ' ' + d),
        highlight: 'Scenic cable car ride up to Chandragiri Hills resort & panoramic viewpoint'
      }
    ]
  },
  {
    group: 'bhaleshwar',
    rules: [
      {
        matches: (t, d) => /bhaleshwar|bhaleshwore/i.test(t + ' ' + d),
        highlight: 'Visit sacred hilltop Bhaleshwar Mahadev Temple overlooking the valley'
      }
    ]
  },
  {
    group: 'dakshinkali',
    rules: [
      {
        matches: (t, d) => /dakshinkali/i.test(t + ' ' + d),
        highlight: 'Visit sacred Dakshinkali Temple dedicated to goddess Kali in a forested gorge'
      }
    ]
  },
  {
    group: 'kirtipur',
    rules: [
      {
        matches: (t, d) => /kirtipur/i.test(t + ' ' + d),
        highlight: 'Explore historic hilltop Newari town of Kirtipur and ancient stone streets'
      }
    ]
  },
  {
    group: 'chobhar',
    rules: [
      {
        matches: (t, d) => /chobhar/i.test(t + ' ' + d),
        highlight: 'Visit legendary Chobhar Gorge where Manjushree cleft the valley waters'
      }
    ]
  },
  {
    group: 'pharping',
    rules: [
      {
        matches: (t, d) => /pharping/i.test(t + ' ' + d),
        highlight: 'Tour sacred cave hermitages and Tibetan Buddhist monasteries in Pharping'
      }
    ]
  },
  {
    group: 'cultural_dinner',
    rules: [
      {
        matches: (t, d) => /cultural\s*(?:dinner|show|dance)|nepali\s*dinner/i.test(t + ' ' + d),
        highlight: 'Complimentary traditional Nepali farewell dinner with live cultural performance'
      }
    ]
  },
  {
    group: 'namobuddha',
    rules: [
      {
        matches: (t, d) => /namobuddha|namo\s*buddha/i.test(t + ' ' + d),
        highlight: 'Visit sacred Thrangu Tashi Yangtse Monastery at Namobuddha'
      }
    ]
  },
  {
    group: 'panauti',
    rules: [
      {
        matches: (t, d) => /panauti/i.test(t + ' ' + d),
        highlight: 'Explore historic Newari town and Indreshwar Mahadev Temple in Panauti'
      }
    ]
  },
  {
    group: 'dhulikhel',
    rules: [
      {
        matches: (t, d) => /dhulikhel/i.test(t + ' ' + d),
        highlight: 'Panoramic Himalayan vistas over Langtang and Rolwaling ranges from Dhulikhel'
      }
    ]
  },

  // Pokhara & Annapurna Highlights
  {
    group: 'sarangkot',
    rules: [
      {
        matches: (t, d) => /sarangkot/i.test(t + ' ' + d),
        highlight: 'Golden sunrise over Annapurna & Dhaulagiri mountain ranges from Sarangkot'
      }
    ]
  },
  {
    group: 'phewa',
    rules: [
      {
        matches: (t, d) => /phewa/i.test(t + ' ' + d),
        highlight: 'Peaceful boat ride on Phewa Lake with Fishtail peak reflections'
      }
    ]
  },
  {
    group: 'pokhara_caves_falls',
    rules: [
      {
        matches: (t, d) => /davis|gupteshwor/i.test(t + ' ' + d),
        highlight: 'Visit subterranean Davis Fall and sacred Gupteshwor Mahadev Cave'
      }
    ]
  },
  {
    group: 'peace_pagoda',
    rules: [
      {
        matches: (t, d) => /peace\s*pagoda|shanti\s*stupa|pumdikot/i.test(t + ' ' + d),
        highlight: 'Hike to hilltop World Peace Pagoda overlooking Pokhara valley and lake'
      }
    ]
  },
  {
    group: 'poon_hill',
    rules: [
      {
        matches: (t, d) => /poon\s*hill/i.test(t + ' ' + d),
        highlight: 'Iconic Poon Hill sunrise over Dhaulagiri, Annapurna I & Machhapuchhre'
      }
    ]
  },
  {
    group: 'ghorepani',
    rules: [
      {
        matches: (t, d) => /ghorepani/i.test(t + ' ' + d),
        highlight: 'Trek through blooming rhododendron forests to picturesque Ghorepani'
      }
    ]
  },
  {
    group: 'ghandruk',
    rules: [
      {
        matches: (t, d) => /ghandruk/i.test(t + ' ' + d),
        highlight: 'Explore traditional Gurung village of Ghandruk & cultural heritage museum'
      }
    ]
  },
  {
    group: 'annapurna_base_camp',
    rules: [
      {
        matches: (t, d) => /annapurna\s*base\s*camp|abc\b/i.test(t + ' ' + d),
        highlight: 'Stand within the 360-degree high-alpine amphitheater of Annapurna Sanctuary'
      }
    ]
  },
  {
    group: 'machhapuchhre_base_camp',
    rules: [
      {
        matches: (t, d) => /machhapuchhre\s*base\s*camp|mbc\b/i.test(t + ' ' + d),
        highlight: 'Camp directly beneath the soaring fishtail peak of Machhapuchhre'
      }
    ]
  },
  {
    group: 'mardi_himal',
    rules: [
      {
        matches: (t, d) => /mardi\s*himal|badal\s*danda/i.test(t + ' ' + d),
        highlight: 'High ridge trail facing towering Machhapuchhre and Annapurna South on Mardi Himal'
      }
    ]
  },
  {
    group: 'thorong_la',
    rules: [
      {
        matches: (t, d) => /thorong\s*la/i.test(t + ' ' + d),
        highlight: 'Cross legendary Thorong La Pass – the highest point on the Annapurna Circuit'
      }
    ]
  },
  {
    group: 'muktinath',
    rules: [
      {
        matches: (t, d) => /muktinath/i.test(t + ' ' + d),
        highlight: 'Visit sacred Muktinath Temple with 108 eternal holy water spouts & sacred flame'
      }
    ]
  },
  {
    group: 'jomsom_marpha',
    rules: [
      {
        matches: (t, d) => /marpha/i.test(t + ' ' + d),
        highlight: 'Walk whitewashed stone alleys of Marpha apple orchard village'
      },
      {
        matches: (t, d) => /jomsom/i.test(t + ' ' + d),
        highlight: 'Explore windy Kali Gandaki gorge & Thakali culture in Jomsom'
      }
    ]
  },
  {
    group: 'manang',
    rules: [
      {
        matches: (t, d) => /manang/i.test(t + ' ' + d),
        highlight: 'Explore ancient cliff monasteries and Tibetan Buddhist heritage in Manang'
      }
    ]
  },
  {
    group: 'tilicho',
    rules: [
      {
        matches: (t, d) => /tilicho/i.test(t + ' ' + d),
        highlight: 'Visit breathtaking turquoise waters of high-altitude Tilicho Lake'
      }
    ]
  },

  // Everest & Khumbu Highlights
  {
    group: 'kala_patthar',
    rules: [
      {
        matches: (t, d) => /kala\s*patthar/i.test(t + ' ' + d),
        highlight: 'Challenging climb of Kala Patthar for iconic close-up panoramic views of Mount Everest'
      }
    ]
  },
  {
    group: 'everest_base_camp',
    rules: [
      {
        matches: (t, d) => /everest\s*base\s*camp|ebc\b/i.test(t + ' ' + d),
        highlight: 'Stand at legendary Everest Base Camp directly beside the tumbling Khumbu Icefall'
      }
    ]
  },
  {
    group: 'gokyo_ri',
    rules: [
      {
        matches: (t, d) => /gokyo\s*ri/i.test(t + ' ' + d),
        highlight: 'Summit Gokyo Ri for panoramic vistas of four 8,000m Himalayan giants'
      }
    ]
  },
  {
    group: 'gokyo_lakes',
    rules: [
      {
        matches: (t, d) => /gokyo\s*lake/i.test(t + ' ' + d),
        highlight: 'Explore pristine turquoise Gokyo alpine glacial lakes nestled below Cho Oyu'
      }
    ]
  },
  {
    group: 'cho_la_pass',
    rules: [
      {
        matches: (t, d) => /cho\s*la\s*pass|chola/i.test(t + ' ' + d),
        highlight: 'Traverse rugged glacial trails crossing thrilling Cho La Pass'
      }
    ]
  },
  {
    group: 'renjo_la',
    rules: [
      {
        matches: (t, d) => /renjo\s*la/i.test(t + ' ' + d),
        highlight: 'Spectacular Everest and Gokyo valley panorama from Renjo La Pass ridge'
      }
    ]
  },
  {
    group: 'tengboche',
    rules: [
      {
        matches: (t, d) => /tengboche|tyangboche/i.test(t + ' ' + d),
        highlight: 'Visit historic Tengboche Monastery with magnificent Ama Dablam backdrop'
      }
    ]
  },
  {
    group: 'namche',
    rules: [
      {
        matches: (t, d) => /namche/i.test(t + ' ' + d),
        highlight: 'Explore bustling Sherpa trading hub of Namche Bazaar & Everest viewpoints'
      }
    ]
  },
  {
    group: 'lukla',
    rules: [
      {
        matches: (t, d) => /lukla/i.test(t + ' ' + d),
        highlight: 'Thrilling mountain flight to/from iconic Lukla airstrip in the high Himalayas'
      }
    ]
  },
  {
    group: 'ama_dablam',
    rules: [
      {
        matches: (t, d) => /ama\s*dablam/i.test(t + ' ' + d),
        highlight: 'Spectacular close-up vistas of iconic pyramid peak Mount Ama Dablam'
      }
    ]
  },
  {
    group: 'machhermo',
    rules: [
      {
        matches: (t, d) => /machhermo|machermo/i.test(t + ' ' + d),
        highlight: 'Trek through high summer alpine pastures of Machhermo beneath Cho Oyu'
      }
    ]
  },
  {
    group: 'dole',
    rules: [
      {
        matches: (t, d) => /dole/i.test(t + ' ' + d),
        highlight: 'Ascend steeply above tree line with retro views of Thamserku and deep valleys'
      }
    ]
  },
  {
    group: 'phortse',
    rules: [
      {
        matches: (t, d) => /phortse/i.test(t + ' ' + d),
        highlight: 'Visit traditional Sherpa farming village of Phortse perched on a high terrace'
      }
    ]
  },

  // Langtang, Manaslu & Mustang
  {
    group: 'kyanjin',
    rules: [
      {
        matches: (t, d) => /kyanjin|tserko/i.test(t + ' ' + d),
        highlight: 'Explore high-alpine Kyanjin Gompa and traditional yak cheese factory'
      }
    ]
  },
  {
    group: 'langtang_valley',
    rules: [
      {
        matches: (t, d) => /langtang\s*village|lama\s*hotel/i.test(t + ' ' + d),
        highlight: 'Hike through lush oak and rhododendron forests along the Langtang River'
      }
    ]
  },
  {
    group: 'larkya_la',
    rules: [
      {
        matches: (t, d) => /larkya\s*la/i.test(t + ' ' + d),
        highlight: 'Conquer dramatic Larkya La Pass with sweeping vistas of Himlung and Annapurna II'
      }
    ]
  },
  {
    group: 'sama_gaon',
    rules: [
      {
        matches: (t, d) => /sama\s*gaun|sama\s*gaon|birendra/i.test(t + ' ' + d),
        highlight: 'Explore historic Sama Gaon Tibetan village and turquoise Birendra Tal glacial lake'
      }
    ]
  },
  {
    group: 'lo_manthang',
    rules: [
      {
        matches: (t, d) => /lo\s*manthang/i.test(t + ' ' + d),
        highlight: 'Discover ancient fortified royal capital of Lo Manthang and royal palaces'
      }
    ]
  },

  // Terai & Wildlife
  {
    group: 'chitwan_safari',
    rules: [
      {
        matches: (t, d) => /chitwan/i.test(t + ' ' + d) && /jeep|safari/i.test(t + ' ' + d),
        highlight: 'Thrilling jungle jeep safari spotting one-horned rhinos, deer & wild boars in Chitwan'
      }
    ]
  },
  {
    group: 'canoe_float',
    rules: [
      {
        matches: (t, d) => /canoe|rapti/i.test(t + ' ' + d),
        highlight: 'Peaceful dugout canoe float along Rapti River for gharial and mugger crocodile spotting'
      }
    ]
  },
  {
    group: 'tharu_culture',
    rules: [
      {
        matches: (t, d) => /tharu/i.test(t + ' ' + d),
        highlight: 'Experience vibrant traditional Tharu cultural stick dance and indigenous village life'
      }
    ]
  },
  {
    group: 'bardia_safari',
    rules: [
      {
        matches: (t, d) => /bardia/i.test(t + ' ' + d),
        highlight: 'Deep wilderness wildlife tracking for wild elephants and royal Bengal tigers in Bardia'
      }
    ]
  },
  {
    group: 'lumbini',
    rules: [
      {
        matches: (t, d) => /lumbini|maya\s*devi/i.test(t + ' ' + d),
        highlight: 'Explore sacred Maya Devi Temple – ancient birthplace of Lord Buddha & peace gardens'
      }
    ]
  },
  {
    group: 'bandipur',
    rules: [
      {
        matches: (t, d) => /bandipur/i.test(t + ' ' + d),
        highlight: 'Stroll preserved cobblestone streets and traditional Newari heritage homes in Bandipur'
      }
    ]
  },

  // Tibet & Bhutan
  {
    group: 'potala',
    rules: [
      {
        matches: (t, d) => /potala/i.test(t + ' ' + d),
        highlight: 'Explore historic chambers of the iconic 13-storey Potala Palace'
      }
    ]
  },
  {
    group: 'jokhang_barkhor',
    rules: [
      {
        matches: (t, d) => /jokhang|barkhor/i.test(t + ' ' + d),
        highlight: 'Walk alongside Tibetan pilgrims on the sacred Barkhor Street kora circuit'
      }
    ]
  },
  {
    group: 'tigers_nest',
    rules: [
      {
        matches: (t, d) => /tiger.*nest|taktsang/i.test(t + ' ' + d),
        highlight: 'Hike to breathtaking cliffside Taktsang Monastery (Tiger’s Nest) perched on a sheer cliff'
      }
    ]
  }
];

function analyzeDay(day) {
  const title = (day.title || '').trim();
  const desc = (day.details || day.desc || day.description || '').trim();

  // 1. Arrival Day
  if (/\barriv/i.test(title)) {
    return [
      'Warm airport welcome and private transfer to your hotel in Kathmandu',
      'Trip briefing & orientation with your dedicated tour guide',
      'Leisure time to explore Kathmandu city or relax at your hotel'
    ];
  }

  // 2. Departure Day
  if (/depart|departure|final\s*day|last\s*day|flight\s+back\s+home/i.test(title)) {
    return [
      'Free time for souvenir shopping and relaxing in Thamel',
      'Hotel check-out and private transfer to Tribhuvan International Airport for final departure'
    ];
  }

  // 3. Acclimatization Day
  if (/acclimatiz/i.test(title)) {
    return [
      'Essential altitude acclimatization rest day with scenic mountain vistas',
      'Active acclimatization hike to higher panoramic viewpoints',
      'Explore local Sherpa village culture, bakeries and mountain traditions'
    ];
  }

  const highlights = [];

  // Match landmarks by group (only one highlight per group)
  for (const grp of LANDMARK_RULE_GROUPS) {
    for (const rule of grp.rules) {
      if (rule.matches(title, desc)) {
        if (!highlights.includes(rule.highlight)) {
          highlights.push(rule.highlight);
        }
        break; // Only one rule per group
      }
    }
    if (highlights.length >= 4) break;
  }

  // Extract action sentences from description if fewer than 3
  if (highlights.length < 3 && desc) {
    const rawSentences = desc
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map(cleanText)
      .filter(s => {
        if (!s || s.length < 25 || s.length > 95) return false;
        if (FORBIDDEN_HIGHLIGHT_RE.test(s)) return false;
        if (/^(after breakfast|in the morning|today|wake up|we will|you will|depart|our|meet your|following breakfast)/i.test(s)) return false;
        return /\b(visit|explore|hike|trek|ascend|descend|cross|witness|marvel|discover|observe|spot|enjoy|stroll|climb|pass|view|panoram|scenic|peaceful|traditional|temple|monastery|ridge|pass|lake|valley|river|forest)\b/i.test(s);
      });

    for (const sent of rawSentences) {
      if (!highlights.includes(sent)) {
        highlights.push(sent);
        if (highlights.length >= 4) break;
      }
    }
  }

  // Fallbacks if still empty or < 2
  if (highlights.length < 2) {
    if (/drive|highway|road/i.test(title + ' ' + desc)) {
      if (!highlights.includes('Scenic overland journey through picturesque river valleys and hills')) {
        highlights.push('Scenic overland journey through picturesque river valleys and hills');
      }
      if (highlights.length < 2) {
        highlights.push('En-route stops to photograph breathtaking countryside landscapes');
      }
    } else if (/flight|fly/i.test(title + ' ' + desc)) {
      if (!highlights.includes('Scenic mountain flight with sweeping Himalayan aerial views')) {
        highlights.push('Scenic mountain flight with sweeping Himalayan aerial views');
      }
      if (highlights.length < 2) {
        highlights.push('Smooth arrival and onward journey transfer to your destination');
      }
    } else {
      if (!highlights.includes('Scenic trail exploration through authentic local landscapes')) {
        highlights.push('Scenic trail exploration through authentic local landscapes');
      }
      if (highlights.length < 2) {
        highlights.push('Panoramic mountain viewpoints and immersion in local culture');
      }
    }
  }

  return highlights.slice(0, 4);
}

// Process collections: packages, tourTrips, treks
const collections = ['packages', 'tourTrips', 'treks'];
let totalUpdatedDays = 0;
let totalUpdatedEntities = 0;

for (const colName of collections) {
  const list = db[colName];
  if (!Array.isArray(list)) continue;

  for (const item of list) {
    if (!Array.isArray(item.itinerary)) continue;
    let modified = false;

    item.itinerary.forEach((day) => {
      const generatedHighlights = analyzeDay(day);
      day.highlights = generatedHighlights;
      totalUpdatedDays++;
      modified = true;
    });

    if (modified) totalUpdatedEntities++;
  }
}

// Specifically verify 6-days-kathmandu-nagarkot-tour
const sample = (db.packages || []).find(p => p.id === '6-days-kathmandu-nagarkot-tour');
console.log('=== VERIFIED 6-days-kathmandu-nagarkot-tour HIGHLIGHTS ===');
sample.itinerary.forEach((d, i) => {
  console.log(`Day ${d.dayNumber || d.day || i+1}: ${d.title}`);
  (d.highlights || []).forEach(h => console.log('   • ' + h));
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

console.log(`\nSuccessfully updated ${totalUpdatedDays} itinerary days across ${totalUpdatedEntities} tours/treks!`);
