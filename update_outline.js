const fs = require('fs');
const dbPath = './server/database.json';
let db = JSON.parse(fs.readFileSync(dbPath));

const ebcGokyo = db.treks.find(t => t.id === 'ebc-gokyo-chola-pass-17-days');
if (ebcGokyo) {
  ebcGokyo.outlineItinerary = [
    { day: "Day 01", itinerary: "Arrival in Kathmandu (1350 m)", altitude: "1,350m / 4,429ft", activity: "-" },
    { day: "Day 02", itinerary: "Kathmandu – Lukla (2840 m) – Phakding (2610 m)", altitude: "2,610m / 8,562ft", activity: "Walking" },
    { day: "Day 03", itinerary: "Phakding - Namche Bazar (3440 m)", altitude: "3,440m / 11,286ft", activity: "Walking" },
    { day: "Day 04", itinerary: "Acclimatization & Hike to Everest View Hotel (3880 m)", altitude: "3,880m / 12,729ft", activity: "Hiking" },
    { day: "Day 05", itinerary: "Namche Bazar – Phortse Tenga (3680 m) – Dole (4200 m)", altitude: "4,200m / 13,779ft", activity: "Walking" },
    { day: "Day 06", itinerary: "Dole – Machermo (4470 m)", altitude: "4,470m / 14,665ft", activity: "Walking" },
    { day: "Day 07", itinerary: "Machermo – Gokyo (4790 m)", altitude: "4,790m / 15,715ft", activity: "Walking" },
    { day: "Day 08", itinerary: "Gokyo – Gokyo Ri (5360 m) - Thagnag (4700 m)", altitude: "4,700m / 15,419ft", activity: "Walking" },
    { day: "Day 09", itinerary: "Thagnag – Chola Pass (5330 m) – Dzonglha (4830 m)", altitude: "4,830m / 15,846ft", activity: "Walking" },
    { day: "Day 10", itinerary: "Dzonglha – Gorakshep (5140 m)", altitude: "5,140m / 16,863ft", activity: "Walking" },
    { day: "Day 11", itinerary: "Gorakshep – Kala Patthar (5545 m) – EBC (5360 m) - Lobuche (4910 m)", altitude: "5,545m / 18,192ft", activity: "Walking" },
    { day: "Day 12", itinerary: "Lobuche - Tengboche (3860 m)", altitude: "3,860m / 12,664ft", activity: "Walking" },
    { day: "Day 13", itinerary: "Tengboche (3860 m) – Namche Bazar (3440 m)", altitude: "3,440m / 11,286ft", activity: "Walking" },
    { day: "Day 14", itinerary: "Namche Bazar – Phakding – Lukla (2840 m)", altitude: "2,840m / 9,317ft", activity: "Walking" },
    { day: "Day 15", itinerary: "Lukla - Kathmandu (1350 m)", altitude: "1,350m / 4,429ft", activity: "-" },
    { day: "Day 16", itinerary: "Kathmandu", altitude: "1,350m / 4,429ft", activity: "-" },
    { day: "Day 17", itinerary: "Final Departure", altitude: "-", activity: "-" }
  ];
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('Outline added!');
}
