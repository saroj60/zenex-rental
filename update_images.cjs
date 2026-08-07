const fs = require('fs');
const dbPath = './backend/database/db.json';
const dbStr = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbStr);

const trek = db.treks.find(t => t.id === 'abc-yoga-trek-11d');
if (trek) {
    trek.image = 'https://indexadventure.com/uploads/media/april3.jpg';
    trek.gallery = [
        'https://indexadventure.com/uploads/media/april3.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5khcrdDVeDWl_p33svRRZMPzqS_hNcLqM0pFD14LYmT_SMmxh49VBsFc&s=10'
    ];
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Images updated in db.json!');
} else {
    console.log('Trek not found');
}
