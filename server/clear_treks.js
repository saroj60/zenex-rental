const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
try {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  data.treks = [];
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully cleared all treks.');
} catch (error) {
  console.error('Error clearing treks:', error);
}
