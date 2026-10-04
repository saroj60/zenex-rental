const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../backend/database/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const ARRIVAL_DEPARTURE_RE = /airport\s+(?:welcome|pickup|transfer|drop)|hotel\s+(?:check-in|check\s*in|check-out|check\s*out|checkout)|welcome\s+briefing|welcome\s+khada|evening\s+stroll|leisure\s+time\s+for\s+evening|free\s+time\s+for\s+souvenir|souvenir\s+shopping|transfer\s+to\s+airport|private\s+transfer\s+to\s+airport|last-minute\s+shopping|fond\s+farewell\s+to\s+nepal|farewell\s+to\s+nepal|breakfast\s*&\s*hotel\s+check-out|hotel\s+rest|smooth\s+airport\s+transfer/i;

let totalPurged = 0;
let arrivalDaysCleared = 0;

['packages', 'tourTrips', 'treks'].forEach(col => {
  if (!Array.isArray(db[col])) return;
  db[col].forEach(item => {
    if (!Array.isArray(item.itinerary)) return;
    item.itinerary.forEach((d, idx) => {
      const title = (d.title || '').toLowerCase();
      const isArrival = /\barriv/i.test(title);
      const isDeparture = /depart|departure|final\s*day|last\s*day|flight\s+back\s+home/i.test(title);

      if (Array.isArray(d.highlights)) {
        const initialLen = d.highlights.length;
        // Filter out arrival/departure boilerplate
        let cleaned = d.highlights.filter(h => !ARRIVAL_DEPARTURE_RE.test(h));

        // If it's strictly an arrival or departure day and has no specific sightseeing (like a temple or pass), clear highlights
        if ((isArrival || isDeparture) && !/bhaktapur|pashupatinath|boudhanath|cable\s*car|sarangkot|sightseeing|safari/i.test(title)) {
          cleaned = [];
        }

        totalPurged += (initialLen - cleaned.length);
        if (cleaned.length === 0 && initialLen > 0) {
          arrivalDaysCleared++;
        }
        d.highlights = cleaned;
      }
    });
  });
});

console.log(`Purged ${totalPurged} arrival/departure boilerplate highlight items.`);
console.log(`Cleared highlights completely on ${arrivalDaysCleared} arrival/departure days.`);

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log('Saved to backend/database/db.json');

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
