const db = require('./db');

db.exec('DROP TABLE IF EXISTS treks');
db.exec('DROP TABLE IF EXISTS packages');
console.log('Tables dropped. Run server to reseed.');
