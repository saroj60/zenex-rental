const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'backend/database/db.json');
const DEPLOY_DB_PATH = path.join(__dirname, 'zenex-deploy/database/db.json');

// ─── Standard "Why Choose Zenex Travels?" bullets ────────────────────────────
const WHY_CHOOSE = `### Why Choose Zenex Travels?
- **Private & Comfortable Transfers:** Clean, insured, air-conditioned private vehicles with experienced professional drivers throughout the tour.
- **Licensed Expert Tour Guides:** Knowledgeable, certified English-speaking local guides offering authentic cultural, historical, and spiritual insights.
- **100% Tailored & Flexible Itineraries:** Freedom to adjust pacing, explore off-the-beaten-path viewpoints, and select preferred hotel tiers.
- **24/7 Dedicated Local Assistance:** Around-the-clock WhatsApp and phone concierge support for smooth and worry-free travel.
- **Guaranteed Departures & Transparent Pricing:** Transparent quotes with no hidden charges, fair cancellation policies, and best price guarantee.`;

// ─── Strip HTML tags from a string ───────────────────────────────────────────
function stripHtml(str) {
  return str
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Strip old section headers from text ─────────────────────────────────────
function stripOldSections(str) {
  return str
    // Remove old ### headings and their content until next ### or end
    .replace(/###\s*(Journey Highlights[^\n]*|Accommodations[^\n]*|Why Book[^\n]*|Why Zenex[^\n]*)[^]*?(?=###|$)/gi, '')
    // Remove inline Key Highlight bullets (old TRIP-* format)
    .replace(/^- \*\*Key Highlight:\*\*[^\n]*/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ─── "Why You'll Love This Trek" — derive from title + highlights ─────────────
function buildWhyLoveTrek(title, highlights) {
  const t = (title || '').toLowerCase();

  // Terrain/region detection helpers
  const has = (...words) => words.some(w => t.includes(w));

  // Generate 4 contextual bullets based on the trek name/highlights
  const bullets = [];

  // 1 — Destination/terrain hook
  if (has('everest', 'ebc', 'khumbu')) {
    bullets.push('Stand at Everest Base Camp (5,364 m) and gaze at the legendary Khumbu Icefall — a bucket-list moment few trekkers ever forget.');
  } else if (has('annapurna', 'abc', 'poon hill', 'ghorepani', 'ghandruk', 'ghalegaun', 'mardi', 'khopra', 'gurung', 'tilicho', 'namun', 'nar phu', 'namun-la', 'nar-phu')) {
    bullets.push('Trek through the spectacular Annapurna massif — one of Nepal\'s most diverse landscapes, from subtropical valleys to high alpine passes.');
  } else if (has('manaslu')) {
    bullets.push('Circumnavigate Mt. Manaslu (8,163 m) along a remote restricted-area circuit that remains far less crowded than Everest or Annapurna routes.');
  } else if (has('gokyo', 'renjo')) {
    bullets.push('Discover the turquoise Gokyo Lakes and summit Gokyo Ri (5,360 m) for arguably the finest panoramic view in the entire Everest region.');
  } else if (has('kanchenjunga')) {
    bullets.push('Trek to the base of the world\'s third-highest peak (8,586 m) through pristine wilderness that sees a fraction of the traffic of Everest or Annapurna routes.');
  } else if (has('mustang')) {
    bullets.push('Venture into the ancient Forbidden Kingdom of Lo — a high-altitude desert plateau where Tibetan culture, painted cave monasteries, and medieval walled cities await.');
  } else if (has('tsum')) {
    bullets.push('Explore the hidden Tsum Valley — closed to outsiders until 2008 — where ancient Tibetan-Buddhist monasteries, sacred caves, and time-honored customs remain beautifully intact.');
  } else if (has('langtang', 'helambu', 'tamang', 'ruby', 'ganja')) {
    bullets.push('Trek through the Langtang Valley — one of Nepal\'s closest high-altitude Himalayan regions from Kathmandu — offering dramatic mountain scenery, glaciers, and authentic Tamang culture.');
  } else if (has('rolwaling', 'tashi lapcha', 'lapchi')) {
    bullets.push('Explore the remote Rolwaling Valley, a hidden gem between Everest and Langtang that rewards adventurous trekkers with raw Himalayan landscapes and deep Buddhist heritage.');
  } else if (has('dolpo', 'dolpa')) {
    bullets.push('Journey into Dolpo — Nepal\'s most remote and restricted Himalayan region — made famous by the film "Caravan" and beloved for its raw Trans-Himalayan landscapes and Bon culture.');
  } else if (has('dhaulagiri')) {
    bullets.push('Circle the mighty Dhaulagiri massif (8,167 m) through one of Nepal\'s most demanding and rewarding high-altitude circuits, crossing French Pass and Hidden Valley.');
  } else if (has('makalu')) {
    bullets.push('Trek to the base of Makalu (8,485 m) — the world\'s fifth-highest peak — through one of Nepal\'s least-visited and most pristine wilderness corridors.');
  } else if (has('api')) {
    bullets.push('Reach the remote Api Base Camp in far-western Nepal — an extraordinary off-the-beaten-path adventure surrounded by untouched landscapes and indigenous Byansi culture.');
  } else if (has('rara')) {
    bullets.push('Visit Rara Lake — Nepal\'s largest and most pristine lake — nestled in a remote national park that rewards the intrepid traveller with stunning alpine scenery and solitude.');
  } else if (has('mera peak')) {
    bullets.push('Summit Mera Peak (6,476 m) — Nepal\'s highest trekking peak — and be rewarded with a 360-degree view of five of the world\'s highest mountains simultaneously.');
  } else if (has('ama dablam', 'amadablam')) {
    bullets.push('Attempt Ama Dablam (6,812 m) — one of the world\'s most beautiful and technically rewarding alpine climbs — under expert Zenex Travels guidance.');
  } else if (has('dhampus', 'thapa peak')) {
    bullets.push('Climb Dhampus Peak (6,012 m) for a perfect introduction to Himalayan mountaineering, combining a classic Annapurna trek with a rewarding summit experience.');
  } else if (has('pikey')) {
    bullets.push('Hike to Pikey Peak (4,065 m) for one of the finest sunrise panoramas of the Himalaya — a hidden gem in the Solu Khumbu region favoured by Sir Edmund Hillary himself.');
  } else if (has('jiri')) {
    bullets.push('Follow the historic Jiri to Everest Base Camp route — the same trail Hillary and Tenzing walked — for a deeply authentic, unhurried Himalayan adventure.');
  } else if (has('three pass', 'cho la', 'renjo la', 'kongma la')) {
    bullets.push('Cross three legendary Everest region passes — Kongma La, Cho La, and Renjo La — a supreme high-altitude challenge rewarded with the best views in the Khumbu.');
  } else {
    bullets.push('Experience the unspoiled beauty of Nepal\'s Himalayas on a carefully curated trek that balances adventure, culture, and breathtaking mountain scenery.');
  }

  // 2 — Cultural / spiritual immersion bullet
  if (has('tsum', 'mustang', 'langtang', 'tamang', 'helambu', 'dolpo', 'dolpa', 'rara', 'api', 'rolwaling', 'lapchi')) {
    bullets.push('Immerse yourself in centuries-old traditions — ancient monasteries, prayer flags, mani walls, and warm village hospitality found nowhere else in the Himalayas.');
  } else if (has('kanchenjunga')) {
    bullets.push('Experience the rich cultural tapestry of far-eastern Nepal — home to Rai, Limbu, and Sherpa communities with deep roots in Himalayan Buddhist and animist traditions.');
  } else if (has('annapurna', 'ghalegaun', 'ghorepani', 'ghandruk', 'gurung', 'mardi', 'khopra', 'namun')) {
    bullets.push('Pass through authentic Gurung and Magar villages, discover centuries-old customs, and enjoy warm teahouse hospitality along one of the world\'s most iconic trekking corridors.');
  } else if (has('everest', 'ebc', 'khumbu', 'gokyo', 'three pass', 'jiri', 'mera', 'amadablam', 'pikey')) {
    bullets.push('Walk through legendary Sherpa villages — Namche Bazaar, Tengboche, Dingboche — and visit the famous Tengboche Monastery, the spiritual heart of the Khumbu Sherpa community.');
  } else if (has('makalu')) {
    bullets.push('Traverse through remote Sherpa and Rai villages, where ancient yak-herding traditions and Buddhist monasteries offer an authentic window into high-Himalayan life.');
  } else {
    bullets.push('Trek through authentic mountain villages and interact with warm, welcoming local communities whose culture and traditions have remained unchanged for centuries.');
  }

  // 3 — Scenic/wildlife bullet
  if (has('langtang', 'tamang', 'ruby', 'ganja', 'helambu')) {
    bullets.push('Trek through lush rhododendron forests bursting with colour in spring, oak and pine woodlands, and glaciated high passes with sweeping views of the Langtang Himalaya.');
  } else if (has('kanchenjunga')) {
    bullets.push('Traverse through some of Nepal\'s most biodiverse terrain — dense forests teeming with red pandas, snow leopards, and rare Himalayan wildlife in the Kanchenjunga Conservation Area.');
  } else if (has('dolpo', 'dolpa')) {
    bullets.push('Cross high Trans-Himalayan passes, spot rare wildlife including snow leopards and blue sheep, and navigate dramatic canyon landscapes that feel like the surface of another planet.');
  } else if (has('dhaulagiri')) {
    bullets.push('Cross the spectacular French Pass (5,360 m) into the surreal Hidden Valley glacier plateau — one of the most dramatic high-altitude landscapes in all of Nepal.');
  } else if (has('makalu')) {
    bullets.push('Trek through the Makalu-Barun National Park — home to extraordinary biodiversity including red pandas, snow leopards, and over 440 species of birds — on trail to the world\'s fifth-highest peak.');
  } else if (has('rara')) {
    bullets.push('Wander through the pristine forests of Rara National Park, spot Himalayan wildlife including deer and rare birds, and relax by the mirrored waters of Nepal\'s largest lake.');
  } else if (has('annapurna', 'abc', 'poon hill', 'ghorepani', 'ghandruk', 'mardi', 'khopra', 'gurung', 'tilicho')) {
    bullets.push('Marvel at sunrise panoramas from Poon Hill (3,210 m) or the Annapurna Sanctuary, where towering peaks including Annapurna I, Machapuchare, and Dhaulagiri paint the horizon in golden light.');
  } else if (has('mustang')) {
    bullets.push('Navigate a dramatic high-altitude desert plateau — ancient eroded canyons, cave settlements, and a stark beauty utterly unlike anywhere else in the Himalayas.');
  } else if (has('rolwaling', 'lapchi')) {
    bullets.push('Traverse glaciers, cross challenging high passes, and be awed by pristine alpine lakes and towering peaks like Gaurishankar that few trekkers ever lay eyes on.');
  } else {
    bullets.push('Marvel at ever-changing Himalayan scenery — from subtropical forests and terraced farmland to windswept glaciers and panoramic high-altitude viewpoints.');
  }

  // 4 — Expert support / logistics bullet
  bullets.push('Travel with full Zenex Travels support — licensed trekking guide, experienced porters, all required permits (TIMS, ACAP, restricted area), and teahouse/lodge accommodation arranged end-to-end.');

  return `### Why You'll Love This Trek\n${bullets.map(b => `- ${b}`).join('\n')}`;
}

// ─── Build the unified 4-part overview ───────────────────────────────────────
function buildUnifiedOverview(narrative, highlights, title) {
  // 1. Narrative
  const cleanNarrative = narrative.trim();

  // 2. Key Highlights from highlights array
  const keyHighlights = `### Key Highlights\n${highlights.map(h => `- ${h}`).join('\n')}`;

  // 3. Why You'll Love This Trek
  const whyLove = buildWhyLoveTrek(title, highlights);

  // 4. Why Choose Zenex Travels?
  return [cleanNarrative, keyHighlights, whyLove, WHY_CHOOSE].join('\n\n');
}

// ─── Process db.treks ────────────────────────────────────────────────────────
function processTreks(db) {
  let updated = 0;
  db.treks.forEach(trek => {
    const raw = trek.overview || trek.description || '';
    // Strip HTML to get clean narrative
    let narrative = stripHtml(raw);
    // Also strip any old section headers that may remain after HTML strip
    narrative = stripOldSections(narrative);

    const highlights = trek.highlights || [];
    const title = trek.title || trek.id || '';

    const newOverview = buildUnifiedOverview(narrative, highlights, title);
    trek.overview = newOverview;
    // Remove old description if overview is now canonical
    if (trek.description && trek.description !== newOverview) {
      trek.description = newOverview;
    }
    updated++;
    console.log('  ✓ trek:', trek.id);
  });
  return updated;
}

// ─── Process TRIP-* tourTrips ─────────────────────────────────────────────────
const ALREADY_UPDATED = new Set([
  'TRIP-everest-base-camp-15d',
  'TRIP-manaslu-circuit-16d',
]);

function processTripTreks(db) {
  let updated = 0;
  db.tourTrips.forEach(trip => {
    if (!trip.id.startsWith('TRIP-')) return;
    if (ALREADY_UPDATED.has(trip.id)) {
      console.log('  ⏭ skip (already updated):', trip.id);
      return;
    }

    const raw = trip.overview || trip.description || '';
    // Strip old inline Key Highlight bullets and clean up
    let narrative = stripOldSections(raw);

    const highlights = trip.highlights || [];
    const title = trip.title || trip.id || '';

    const newOverview = buildUnifiedOverview(narrative, highlights, title);
    trip.overview = newOverview;
    if (trip.description && trip.description !== newOverview) {
      trip.description = newOverview;
    }
    updated++;
    console.log('  ✓ trip:', trip.id);
  });
  return updated;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function processDatabase(dbPath) {
  console.log(`\nProcessing: ${dbPath}`);
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  console.log('\n[db.treks]');
  const trekCount = processTreks(db);

  console.log('\n[TRIP-* tourTrips]');
  const tripCount = processTripTreks(db);

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`\n✅ Done — updated ${trekCount} db.treks + ${tripCount} TRIP-* tourTrips`);
}

processDatabase(DB_PATH);
processDatabase(DEPLOY_DB_PATH);

console.log('\n🎉 All databases updated successfully!');
