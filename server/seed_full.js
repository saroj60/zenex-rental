const db = require('./db');

async function seedAll() {
  try {
    const packagesMod = await import('../src/data/packagesData.js');
    const treksMod = await import('../src/data/treksData.js');
    
    const packages = packagesMod.featuredPackages || [];
    const treks = treksMod.treksData || [];

    console.log(`Found ${packages.length} packages and ${treks.length} treks to seed.`);

    const pCount = db.prepare('SELECT count(*) as count FROM packages').get();
    if (pCount.count === 0) {
      console.log('Seeding packages...');
      const stmt = db.prepare(`INSERT INTO packages (id, title, location, category, tripCode, price, persons, duration, img, desc, highlights, itinerary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      const insertMany = db.transaction((items) => {
        for (const p of items) {
          stmt.run(p.id, p.title, p.location, p.category, p.tripCode, p.price, p.persons, p.duration, p.img, p.desc, JSON.stringify(p.highlights || []), JSON.stringify(p.itinerary || []));
        }
      });
      insertMany(packages);
    }

    const tCount = db.prepare('SELECT count(*) as count FROM treks').get();
    if (tCount.count === 0) {
      console.log('Seeding treks...');
      const stmt = db.prepare(`INSERT INTO treks (id, title, location, category, tripCode, price, persons, duration, img, desc, highlights, itinerary, difficulty, activity, originalPrice, rating, reviewsCount, quickFacts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      const insertMany = db.transaction((items) => {
        for (const t of items) {
          stmt.run(t.id, t.title, t.location, t.category, t.tripCode, t.price, t.persons, t.duration, t.img || t.image, t.desc || t.description, JSON.stringify(t.highlights || []), JSON.stringify(t.itinerary || []), t.difficulty, t.activity, t.originalPrice, t.rating, t.reviewsCount, JSON.stringify(t.quickFacts || null));
        }
      });
      insertMany(treks);
    }

    console.log('Done seeding packages and treks.');
  } catch (err) {
    console.error('Error seeding:', err);
  }
}

seedAll();
