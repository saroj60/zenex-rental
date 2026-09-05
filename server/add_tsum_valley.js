import fs from 'fs';
import { treksData } from '../src/data/treksData.js';

const updateDatabase = (filePath) => {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const db = JSON.parse(content);
  
  if (!Array.isArray(db.treks)) {
    db.treks = [];
  }

  treksData.forEach(newTrek => {
    const existingIdx = db.treks.findIndex(t => t.id === newTrek.id || t.slug === newTrek.slug);
    if (existingIdx >= 0) {
      db.treks[existingIdx] = newTrek;
    } else {
      db.treks.push(newTrek);
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
  console.log(`Updated ${filePath} successfully!`);
};

updateDatabase('./backend/database/db.json');
updateDatabase('./public/database.json');
updateDatabase('./zenex-deploy/database/db.json');
