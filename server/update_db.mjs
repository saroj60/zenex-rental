import fs from 'fs';
import { featuredPackages } from '../src/data/packagesData.js';
import { treksData } from '../src/data/treksData.js';

const dbPath = 'database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.packages = featuredPackages;
db.treks = treksData;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Updated database.json successfully!');
