/**
 * Auto-generate day highlights for trek and tour itinerary days that are missing them.
 * Highlights are derived intelligently from the day's title and description.
 * v2 – improved logic, cleaner fallbacks, no duplicate/conflicting patterns
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../backend/database/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// ─── Place keyword → highlight phrase ───────────────────────────────────────

const PLACE_HIGHLIGHTS = {
  'pashupatinath': 'Visit sacred Pashupatinath Temple (UNESCO)',
  'boudhanath': 'Explore Boudhanath Stupa & prayer wheel walk (UNESCO)',
  'swayambhunath': 'Climb to Swayambhunath (Monkey Temple) hilltop',
  'patan durbar': 'Explore Patan Durbar Square medieval courtyards (UNESCO)',
  'bhaktapur': 'Walk through ancient Bhaktapur Durbar Square (UNESCO)',
  'kathmandu durbar': 'Visit Kathmandu Durbar Square & Kumari Ghar',
  'changu narayan': 'Visit Changu Narayan hilltop temple (oldest in Nepal)',
  'dakshinkali': 'Visit Dakshinkali Goddess Temple',
  'pharping': 'Explore Pharping cave hermitages & Vajra Yogini temple',
  'kirtipur': 'Walk through historic hilltop town of Kirtipur',
  'chobhar': 'Visit Chobhar Gorge & Adinath Lokeshwor Temple',
  'phewa lake': 'Boat ride on Phewa Lake with Fishtail reflection',
  'begnas lake': 'Peaceful Begnas Lake boating & sunrise views',
  'davis fall': 'Visit Davis Fall & Gupteshwor Cave',
  'sarangkot': 'Sunrise viewpoint at Sarangkot over Annapurna range',
  'world peace pagoda': 'Hike to World Peace Pagoda (Shanti Stupa) viewpoint',
  'seti gorge': 'Marvel at Seti River white water gorge',
  'bandipur': 'Explore Bandipur heritage hilltop village',
  'tansen': 'Explore medieval Tansen (Palpa) town & bazaar',
  'rani mahal': 'Visit Rani Mahal "Palace of Queens" by Kali Gandaki river',
  'lumbini': 'Visit Maya Devi Temple – birthplace of Lord Buddha (UNESCO)',
  'chitwan': 'Chitwan National Park – UNESCO World Heritage wildlife experience',
  'dhulikhel': 'Panoramic Himalayan sunrise from Dhulikhel hill',
  'bardia': 'Bardia National Park wildlife & jungle exploration',
  'rara lake': 'Explore Rara Lake – Nepal\'s largest pristine alpine lake',
  'phoksundo': 'Marvel at turquoise Phoksundo Lake in Dolpo',
  'mustang': 'Explore ancient Mustang kingdom & cave monastery complex',
  'manang': 'Rest & acclimatization walk in high-altitude Manang valley',
  'namche': 'Explore Namche Bazaar – the Sherpa capital & market hub',
  'lukla': 'Thrilling scenic flight to Lukla (Tenzing-Hillary Airport)',
  'tengboche': 'Visit Tengboche Monastery with Everest & Ama Dablam backdrop',
  'gorakshep': 'Reach Gorak Shep – the last overnight stop before EBC',
  'kala patthar': 'Iconic sunrise from Kala Patthar (5,550m) – 360° Everest panorama',
  'everest base camp': 'Reach legendary Everest Base Camp (5,364m)',
  'gokyo': 'Climb Gokyo Ri (5,357m) for panoramic glacier & lake views',
  'poon hill': 'Iconic Poon Hill (3,210m) sunrise over Annapurna & Dhaulagiri',
  'ghorepani': 'Trek through stunning rhododendron forests to Ghorepani',
  'ghandruk': 'Explore traditional Gurung village of Ghandruk & culture',
  'tadapani': 'Trek through dense rhododendron & oak forest to Tadapani',
  'langtang': 'Trek through Langtang National Park glacial valley',
  'kyanjin': 'Explore Kyanjin Gompa & high-altitude cheese factory',
  'gosaikunda': 'Visit sacred Gosaikunda alpine lake (4,381m)',
  'helambu': 'Trek through traditional Sherpa & Tamang villages of Helambu',
  'rolwaling': 'Enter remote Rolwaling Valley – off-the-beaten-path trek',
  'tashi lapcha': 'Cross technical glaciated Tashi Lapcha Pass (5,755m)',
  'dolpo': 'Explore hidden Dolpo – Nepal\'s most remote Himalayan region',
  'dho-tarap': 'Explore ancient Dho Tarap Bon Buddhist village',
  'jumla': 'Fly to Jumla & begin remote western Nepal adventure',
  'sinja': 'Walk through Sinja Valley – once capital of Karnali kingdom',
  'api': 'Trek through pristine far-western Nepal to Api Himal Base Camp',
  'shey gompa': 'Visit Crystal Mountain & mystical Shey Gompa monastery',
  'lhasa': 'Explore Lhasa – the spiritual capital of Tibet',
  'potala palace': 'Visit iconic 13-storey Potala Palace (UNESCO Heritage)',
  'jokhang': 'Circumambulate sacred Jokhang Temple & Barkhor Bazaar',
  'barkhor': 'Join pilgrims on the Barkhor sacred kora circuit',
  'drepung': 'Explore Drepung Monastery – once world\'s largest monastery',
  'sera monastery': 'Watch live philosophical debates at Sera Monastery',
  'tsedang': 'Explore Tsedang – the ancient cradle of Tibetan civilization',
  'samye': 'Visit Samye Monastery – Tibet\'s very first monastery',
  'yumbu lhakang': 'Visit Yumbu Lhakang – Tibet\'s oldest standing palace',
  'gyantse': 'Explore Gyantse Kumbum Stupa & Pelkhor Chode Monastery',
  'shigatse': 'Visit Tashilhunpo Monastery – seat of the Panchen Lama',
  'yamdrok': 'Drive past stunning turquoise Yamdrok Tso Lake (4,441m)',
  'rongbuk': 'Visit Rongbuk Monastery – world\'s highest monastery at 4,800m',
  'kerung': 'Cross Kerung-Rasuwagadhi border into Nepal',
  'makalu': 'Trek toward Makalu (8,481m) – world\'s 5th highest peak',
  'sherpani col': 'Cross the high glaciated Sherpani Col (6,180m)',
  'amphu laptse': 'Technical Amphu Laptse Pass crossing (5,845m)',
  'dhaulagiri': 'Trek beneath towering Dhaulagiri massif (8,167m)',
  'kanchenjunga': 'Trek toward majestic Kanchenjunga (8,586m)',
  'thorong la': 'Cross Thorong La Pass (5,416m) – highest point on circuit',
  'muktinath': 'Visit sacred Muktinath Temple (Vishnu shrine at 3,760m)',
  'jomsom': 'Explore Jomsom – gateway to Mustang & Mustangi culture',
  'marpha': 'Visit Marpha village – Nepal\'s famous apple brandy capital',
  'tilicho': 'Trek to Tilicho Lake (4,919m) – one of world\'s highest lakes',
  'mardi himal': 'High Camp viewpoint overlooking Annapurna & Machhapuchhre',
  'melamchi': 'Drive to Melamchi Bazar trailhead & begin trek',
  'solukhumbhu': 'Trek through legendary Solu-Khumbu Sherpa homeland',
  'lapchi': 'Trek to sacred Lapchi hermitage – Milarepa\'s meditation site',
  'tumlingtar': 'Fly to Tumlingtar & drive to remote trail start',
  'dhangadhi': 'Fly to Dhangadhi & drive into the far-western hills',
  'nepalgunj': 'Transit through Nepalgunj – gateway to western Nepal',
};

// ─── Activity patterns (ordered, check one at a time) ────────────────────────

function getActivityHighlight(titleLow, descLow) {
  const combined = titleLow + ' ' + descLow;
  const patterns = [
    { re: /tiger.*track/,          val: 'Tiger tracking expedition through dense jungle' },
    { re: /elephant.*safari|safari.*elephant/, val: 'Elephant-back safari through jungle' },
    { re: /jeep.*safari|safari.*jeep|wildlife.*safari/, val: 'Thrilling jeep safari in national park' },
    { re: /jungle.*walk|tharu.*village/,  val: 'Tharu village walk & jungle nature trail' },
    { re: /karnali.*raft|raft.*karnali/,  val: 'White-water rafting on Karnali River' },
    { re: /rafting|white.*water/,         val: 'River rafting adventure' },
    { re: /boating|kayak/,               val: 'Peaceful lake boating experience' },
    { re: /acclimatiz/,                  val: 'Acclimatization rest day with short hike' },
    { re: /summit.*attempt|attempt.*summit/, val: 'High-altitude summit attempt' },
    { re: /cross.*pass|la pass|col crossing/, val: 'High mountain pass crossing' },
    { re: /sunrise.*view|view.*sunrise|sarangkot/i, val: 'Spectacular Himalayan sunrise viewpoint' },
    { re: /cultural.*dinner|farewell.*dinner|dinner.*cultural/, val: 'Traditional cultural dinner & farewell' },
    { re: /monk.*debate|debate.*monk/,   val: 'Watch philosophical monk debates' },
    { re: /meditation|yoga/,             val: 'Meditation & spiritual practice session' },
    { re: /healing|wellness/,            val: 'Personalized wellness & healing session' },
    { re: /monastery|gompa/,             val: 'Explore ancient monastery & Buddhist art' },
    { re: /sightseeing|city.*tour/,      val: 'Cultural sightseeing & heritage walks' },
    { re: /tea.*garden|tea.*estate/,     val: 'Visit Himalayan tea garden & estate' },
    { re: /glacier.*view|view.*glacier/, val: 'Dramatic glacier & icefall views' },
    { re: /bird.*watch|birdwatch/,       val: 'Birdwatching in rich biodiversity zone' },
  ];
  for (const p of patterns) {
    if (p.re.test(combined)) return p.val;
  }
  return null;
}

// ─── Day type detection ───────────────────────────────────────────────────────

function getDayTypeHighlights(titleOrig, titleLow, descLow) {
  const results = [];

  // Arrival
  if (/\barriv/i.test(titleOrig)) {
    results.push('Airport welcome & hotel check-in');
    results.push('Welcome briefing with guide & gear check');
    results.push('Evening stroll & acclimatization in the city');
    return results;
  }

  // Departure
  if (/depart|departure|final.*day|last.*day/i.test(titleOrig)) {
    results.push('Transfer to airport for departure');
    results.push('Last-minute shopping or sightseeing');
    results.push('Fond farewell to Nepal / Tibet');
    return results;
  }

  // Free/rest/buffer day
  if (/\b(free|rest|buffer)\s*day\b/i.test(titleOrig)) {
    results.push('Rest & personal exploration time');
    results.push('Optional city sightseeing or shopping');
    results.push('Catch up on journaling & photography');
    return results;
  }

  // Acclimatization
  if (/acclimatiz/i.test(titleOrig)) {
    results.push('Rest day for altitude acclimatization');
    results.push('Short acclimatization hike to higher point');
    results.push('Visit local village or viewpoint nearby');
    return results;
  }

  return results;
}

// ─── Main highlight generator ─────────────────────────────────────────────────

function generateHighlights(day) {
  const titleOrig = (day.title || '').replace(/^Day\s+\w+\s*[:–-]?\s*/i, '').trim();
  const titleLow  = titleOrig.toLowerCase();
  const descLow   = (day.desc || day.description || '').toLowerCase();
  const combined  = titleLow + ' ' + descLow;

  // 1. Day-type shortcuts (arrival, departure, rest, acclimatization)
  const typeHighlights = getDayTypeHighlights(titleOrig, titleLow, descLow);
  if (typeHighlights.length > 0) return typeHighlights;

  const highlights = [];

  // 2. Match known places (most specific first)
  for (const [keyword, phrase] of Object.entries(PLACE_HIGHLIGHTS)) {
    if (combined.includes(keyword)) {
      if (!highlights.some(h => h === phrase)) highlights.push(phrase);
      if (highlights.length >= 4) break;
    }
  }

  // 3. Add one activity highlight
  const activity = getActivityHighlight(titleLow, descLow);
  if (activity && !highlights.some(h => h.toLowerCase().includes(activity.toLowerCase().slice(0, 12)))) {
    highlights.push(activity);
  }

  // 4. If title has "A – B" format, add trek/drive info
  const dashParts = titleOrig.split(/\s*[–\-→]\s*/);
  if (dashParts.length >= 2) {
    const from = dashParts[0].replace(/\(.*?\)/g, '').trim();
    const to   = dashParts[dashParts.length - 1].replace(/\(.*?\)/g, '').trim();
    if (from.length > 3 && to.length > 3 && from !== to) {
      const word = /trek/i.test(combined) ? 'Trek' : /drive|drive to/i.test(combined) ? 'Drive' : /fly/i.test(combined) ? 'Fly' : 'Journey';
      const connector = `${word} from ${from} to ${to}`;
      if (!highlights.some(h => h.toLowerCase().includes(from.toLowerCase().slice(0, 6)))) {
        highlights.push(connector);
      }
    }
  }

  // 5. Altitude info from title
  const altMatches = titleOrig.match(/\(?([\d,]+)\s*m\)?/g) || [];
  if (altMatches.length > 0 && highlights.length < 3) {
    const nums = altMatches.map(a => parseInt(a.replace(/[(),m]/g, '').replace(',', '')));
    const maxAlt = Math.max(...nums);
    if (maxAlt > 5000) highlights.push(`Reach extreme altitude of ${maxAlt.toLocaleString()}m`);
    else if (maxAlt > 3500) highlights.push(`Trek to ${maxAlt.toLocaleString()}m elevation with panoramic views`);
  }

  // 6. Fill to at least 3
  if (highlights.length < 3) {
    const isTrek = /trek|hike|walk/i.test(combined);
    const isTour = /sightseeing|tour|visit|temple|city/i.test(combined);
    const isDrive = /drive|jeep|bus|vehicle/i.test(combined);
    const isFlight = /fly|flight/i.test(combined);

    if (isFlight && highlights.length < 3)  highlights.push('Scenic mountain flight with Himalayan views');
    if (isDrive && highlights.length < 3)   highlights.push('Scenic overland drive through mountain landscape');
    if (isTrek && highlights.length < 3)    highlights.push('Trek through pristine mountain wilderness');
    if (isTrek && highlights.length < 3)    highlights.push('Overnight at mountain teahouse or camp');
    if (isTour && highlights.length < 3)    highlights.push('Cultural immersion & local heritage exploration');
    if (highlights.length < 3)             highlights.push('Explore local culture & scenic surroundings');
    if (highlights.length < 3)             highlights.push('Photography & panoramic mountain views');
  }

  // 7. Deduplicate & cap at 5
  return [...new Set(highlights)].slice(0, 5);
}

// ─── Process all treks & tours ───────────────────────────────────────────────

let filled = 0;
let skipped = 0;

function processItems(items) {
  items.forEach(item => {
    const itinerary = item.itinerary || [];
    itinerary.forEach(day => {
      const existing = day.highlights;
      const isEmpty = !existing ||
        (Array.isArray(existing) && existing.length === 0) ||
        (typeof existing === 'string' && existing.trim() === '');
      if (isEmpty) {
        day.highlights = generateHighlights(day);
        filled++;
      } else {
        skipped++;
      }
    });
  });
}

processItems(db.treks || []);
processItems(db.tourTrips || []);

// ─── Save ─────────────────────────────────────────────────────────────────────

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
console.log(`✅ Done! Filled ${filled} days | Skipped ${skipped} (already had highlights)`);
