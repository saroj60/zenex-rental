const fs = require('fs');

const DB_FILES = [
  'backend/database/db.json',
  'zenex-deploy/database/db.json',
];

// More flexible pattern — handles both \n and space-separated season bullets
const SEASON_PATTERNS = [
  // Newline-separated (primary)
  /[\n ]*- \*\*Spring \(March to May\):\*\*[^\n-]*[\n]*- \*\*Summer \/ Monsoon \(June to August\):\*\*[^\n-]*[\n]*- \*\*Autumn \(September to November\):\*\*[^\n-]*[\n]*- \*\*Winter \(December to February\):\*\*[^\n-]*/g,
  // Any order variant
  /[\n ]*- \*\*Spring \(March to May\):\*\*[^\n-]*[\n]*- \*\*Autumn \(September to November\):\*\*[^\n-]*[\n]*- \*\*Winter \(December to February\):\*\*[^\n-]*[\n]*- \*\*Summer \/ Monsoon \(June to August\):\*\*[^\n-]*/g,
];

function cleanOverview(str) {
  if (!str) return str;
  let cleaned = str;
  SEASON_PATTERNS.forEach(re => {
    re.lastIndex = 0;
    cleaned = cleaned.replace(re, '');
    re.lastIndex = 0;
  });
  return cleaned.replace(/\n{3,}/g, '\n\n').trim();
}

function hasSeasonBlock(str) {
  return str && str.includes('**Spring (March to May):**') && str.includes('**Summer / Monsoon');
}

DB_FILES.forEach(dbPath => {
  console.log(`\nProcessing: ${dbPath}`);
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let updated = 0;

  ['packages', 'treks', 'tourTrips'].forEach(col => {
    (db[col] || []).forEach(item => {
      let changed = false;
      if (hasSeasonBlock(item.overview)) {
        item.overview = cleanOverview(item.overview);
        changed = true;
      }
      if (hasSeasonBlock(item.description)) {
        item.description = cleanOverview(item.description);
        changed = true;
      }
      if (changed) { updated++; console.log(`  ✓ [${col}] ${item.id || item.title}`); }
    });
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`  → Updated ${updated} items`);
});

// Final verify
const db = JSON.parse(fs.readFileSync(DB_FILES[0], 'utf8'));
let rem = 0;
['packages','treks','tourTrips'].forEach(col => {
  (db[col]||[]).forEach(item => {
    if (hasSeasonBlock(item.overview)||hasSeasonBlock(item.description)) rem++;
  });
});
console.log('\n✅ Remaining season blocks:', rem);
