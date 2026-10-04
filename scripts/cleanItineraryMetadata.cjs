const fs = require('fs');
const path = require('path');

const BACKEND_DB = path.join(__dirname, '../backend/database/db.json');
const PUBLIC_DB = path.join(__dirname, '../public/database.json');
const SERVER_DB = path.join(__dirname, '../server/database.json');
const ZENEX_DEPLOY_DB = path.join(__dirname, '../zenex-deploy/database/db.json');

const db = JSON.parse(fs.readFileSync(BACKEND_DB, 'utf8'));

const ALTITUDE_MAP = [
  { match: /nagarkot/i, alt: '2,175m / 7,136ft' },
  { match: /kala\s*patthar/i, alt: '5,545m / 18,192ft' },
  { match: /everest\s*base\s*camp|ebc\b/i, alt: '5,364m / 17,598ft' },
  { match: /gorakshep/i, alt: '5,164m / 16,942ft' },
  { match: /lobuche/i, alt: '4,940m / 16,207ft' },
  { match: /dingboche/i, alt: '4,410m / 14,469ft' },
  { match: /tengboche|tyangboche/i, alt: '3,860m / 12,664ft' },
  { match: /namche/i, alt: '3,440m / 11,286ft' },
  { match: /lukla/i, alt: '2,860m / 9,383ft' },
  { match: /phakding/i, alt: '2,610m / 8,563ft' },
  { match: /gokyo\s*ri/i, alt: '5,357m / 17,575ft' },
  { match: /gokyo/i, alt: '4,790m / 15,715ft' },
  { match: /machhermo/i, alt: '4,470m / 14,665ft' },
  { match: /dole/i, alt: '4,200m / 13,780ft' },
  { match: /annapurna\s*base\s*camp|abc\b/i, alt: '4,130m / 13,550ft' },
  { match: /machhapuchhre\s*base\s*camp|mbc\b/i, alt: '3,700m / 12,139ft' },
  { match: /poon\s*hill/i, alt: '3,210m / 10,531ft' },
  { match: /ghorepani/i, alt: '2,860m / 9,383ft' },
  { match: /ghandruk/i, alt: '1,940m / 6,365ft' },
  { match: /thorong\s*la/i, alt: '5,416m / 17,769ft' },
  { match: /muktinath/i, alt: '3,760m / 12,336ft' },
  { match: /jomsom/i, alt: '2,720m / 8,924ft' },
  { match: /marpha/i, alt: '2,670m / 8,760ft' },
  { match: /manang/i, alt: '3,519m / 11,545ft' },
  { match: /tilicho/i, alt: '4,920m / 16,141ft' },
  { match: /kyanjin/i, alt: '3,870m / 12,697ft' },
  { match: /lama\s*hotel/i, alt: '2,480m / 8,136ft' },
  { match: /syabrubesi/i, alt: '1,503m / 4,931ft' },
  { match: /larkya\s*la/i, alt: '5,160m / 16,929ft' },
  { match: /samagaun|sama\s*gaon/i, alt: '3,530m / 11,581ft' },
  { match: /samdo/i, alt: '3,860m / 12,664ft' },
  { match: /dharapani/i, alt: '1,860m / 6,102ft' },
  { match: /pokhara/i, alt: '822m / 2,696ft' },
  { match: /sarangkot/i, alt: '1,600m / 5,249ft' },
  { match: /chitwan/i, alt: '415m / 1,361ft' },
  { match: /lumbini/i, alt: '150m / 492ft' },
  { match: /bandipur/i, alt: '1,030m / 3,379ft' },
  { match: /dhulikhel/i, alt: '1,550m / 5,085ft' },
  { match: /kathmandu|patan|bhaktapur/i, alt: '1,400m / 4,595ft' }
];

function inferAltitude(title, desc) {
  const combined = (title + ' ' + desc);
  // Match explicit altitude like [2175m/4136ft] or (3,440 m)
  const explicitMatch = combined.match(/(?:\[|\()?\s*([\d,.]+)\s*m\s*(?:\/\s*([\d,.]+)\s*ft)?\s*(?:\]|\))?/i);
  if (explicitMatch && explicitMatch[1]) {
    const m = explicitMatch[1].replace(/,/g, '');
    const mNum = parseFloat(m);
    if (!isNaN(mNum) && mNum >= 100 && mNum <= 8848) {
      const ft = explicitMatch[2] ? explicitMatch[2].replace(/,/g, '') : Math.round(mNum * 3.28084).toLocaleString();
      return `${mNum.toLocaleString()}m / ${ft}ft`;
    }
  }

  for (const item of ALTITUDE_MAP) {
    if (item.match.test(combined)) {
      return item.alt;
    }
  }
  return '1,400m / 4,595ft';
}

function processItinerary(itinerary, isTrek = false) {
  if (!Array.isArray(itinerary)) return;

  const totalDays = itinerary.length;

  itinerary.forEach((day, index) => {
    // 1. Completely remove day highlights
    delete day.highlights;

    const title = (day.title || '').trim();
    const desc = (day.details || day.desc || day.description || '').trim();
    const combined = title + ' ' + desc;
    const isFirstDay = index === 0 || /\barriv/i.test(title);
    const isLastDay = index === totalDays - 1 || /depart|final\s*day|last\s*day|flight\s+back/i.test(title);

    // 2. Max Altitude
    if (!day.maxAltitude && !day.altitude) {
      day.maxAltitude = inferAltitude(title, desc);
    }

    // 3. Mode of travel
    if (!day.modeOfTravel && !day.transport && !day.travelMode) {
      if (/flight|fly|scenic\s*flight|plane/i.test(title)) {
        day.modeOfTravel = 'Flight';
      } else if (/drive|jeep|private\s*car|vehicle|transfer/i.test(title) || isFirstDay || isLastDay) {
        day.modeOfTravel = 'Private Vehicle';
      } else if (isTrek) {
        day.modeOfTravel = 'Trekking';
      } else {
        day.modeOfTravel = 'Private Vehicle';
      }
    }

    // 4. Accommodation
    if (!day.accommodation) {
      if (isLastDay) {
        day.accommodation = 'Departure';
      } else if (isTrek) {
        day.accommodation = 'Lodge / Teahouse';
      } else {
        if (/nagarkot/i.test(title)) {
          day.accommodation = 'Hotel in Nagarkot [1 Night]';
        } else if (/pokhara/i.test(title)) {
          day.accommodation = 'Hotel in Pokhara [1 Night]';
        } else if (/chitwan/i.test(title)) {
          day.accommodation = 'Resort in Chitwan [1 Night]';
        } else if (/bandipur/i.test(title)) {
          day.accommodation = 'Hotel in Bandipur [1 Night]';
        } else if (/lumbini/i.test(title)) {
          day.accommodation = 'Hotel in Lumbini [1 Night]';
        } else {
          day.accommodation = 'Hotel in Kathmandu [1 Night]';
        }
      }
    }

    // 5. Meals
    if (!day.meals) {
      if (isFirstDay) {
        day.meals = 'Welcome Drink';
      } else if (isLastDay) {
        day.meals = 'Breakfast';
      } else if (isTrek) {
        day.meals = 'Breakfast, Lunch & Dinner';
      } else {
        if (/cultural\s*(?:dinner|show|dance)|farewell\s*dinner/i.test(combined)) {
          day.meals = 'Breakfast & Farewell Dinner';
        } else {
          day.meals = 'Breakfast';
        }
      }
    }
  });
}

// Process 6-days-kathmandu-nagarkot-tour explicitly
const specificTour = (db.packages || []).find(p => p.id === '6-days-kathmandu-nagarkot-tour');
if (specificTour) {
  specificTour.itinerary = [
    {
      day: 1,
      title: "Arrival in Kathmandu [altitude 1,400m/4,595ft]",
      description: "On arrival at the Tribhuvan International Airport, you will be greeted by a dedicated representative from Zenex Travels & Tours Pvt. Ltd. You will then be transferred to your hotel in Kathmandu. Depending on your arrival time, you can explore the city on your own or relax at your hotel.",
      maxAltitude: "1,400m / 4,595ft",
      accommodation: "Hotel in Kathmandu [1 Night]",
      modeOfTravel: "Private Vehicle",
      meals: "Welcome Drink"
    },
    {
      day: 2,
      title: "Kathmandu - Nagarkot [2,175m/7,136ft]",
      description: "After breakfast, full day sightseeing tour of Changunarayan temple & Bhaktapur durbar square. Changunarayan temple is the oldest Hindu temple still in use in Kathmandu Valley. Bhaktapur Durbar Square features 55-window palace, Golden Gate, and Nyatapole temple. Proceed to Nagarkot, walk around local villages, and enjoy sunset over eastern Himalayas including Mount Everest.",
      maxAltitude: "2,175m / 7,136ft",
      accommodation: "Hotel in Nagarkot [1 Night]",
      modeOfTravel: "Private Vehicle",
      meals: "Breakfast"
    },
    {
      day: 3,
      title: "Nagarkot - Kathmandu",
      description: "Wake up early to see the sunrise on the Himalayan ranges including Mount Everest. After breakfast, drive to Kathmandu for a full day sightseeing tour of Boudhanath Stupa, Pashupatinath Temple, & Kopan Monastery.",
      maxAltitude: "1,400m / 4,595ft",
      accommodation: "Hotel in Kathmandu [1 Night]",
      modeOfTravel: "Private Vehicle",
      meals: "Breakfast"
    },
    {
      day: 4,
      title: "Kathmandu",
      description: "After breakfast, full day sightseeing tour of Patan durbar square, Swoyambhunath stupa (Monkey Temple) & Kathmandu durbar square. Explore ancient royal palaces, ancient shrines, and Goddess Kumari.",
      maxAltitude: "1,400m / 4,595ft",
      accommodation: "Hotel in Kathmandu [1 Night]",
      modeOfTravel: "Private Vehicle",
      meals: "Breakfast"
    },
    {
      day: 5,
      title: "Kathmandu",
      description: "After breakfast, full day sightseeing tour of Dakshinkali, Chobhar, Pharping, and Kirtipur. Visit Dakshinkali temple dedicated to goddess Kali, Chobhar gorge, Pharping monasteries, and historic hilltop town of Kirtipur. In the evening, enjoy a complimentary Nepali dinner with live cultural performance.",
      maxAltitude: "1,400m / 4,595ft",
      accommodation: "Hotel in Kathmandu [1 Night]",
      modeOfTravel: "Private Vehicle",
      meals: "Breakfast & Farewell Dinner"
    },
    {
      day: 6,
      title: "Depart from Kathmandu",
      description: "Today is your last day in the highest country on earth. Free time until departure. Transfer to international airport for final departure.",
      maxAltitude: "1,400m / 4,595ft",
      accommodation: "Departure",
      modeOfTravel: "Private Vehicle",
      meals: "Breakfast"
    }
  ];
}

// Process all packages, tourTrips, treks
['packages', 'tourTrips'].forEach(col => {
  (db[col] || []).forEach(p => {
    if (p.id !== '6-days-kathmandu-nagarkot-tour') {
      processItinerary(p.itinerary, false);
    }
  });
});

(db.treks || []).forEach(t => {
  processItinerary(t.itinerary, true);
});

// Write to all database locations
const jsonStr = JSON.stringify(db, null, 2);
fs.writeFileSync(BACKEND_DB, jsonStr, 'utf8');
fs.writeFileSync(PUBLIC_DB, jsonStr, 'utf8');
if (fs.existsSync(SERVER_DB)) {
  fs.writeFileSync(SERVER_DB, jsonStr, 'utf8');
}
if (fs.existsSync(ZENEX_DEPLOY_DB)) {
  fs.writeFileSync(ZENEX_DEPLOY_DB, jsonStr, 'utf8');
}

console.log('Successfully updated itinerary metadata and removed day highlights!');
console.log('Sample 6-days-kathmandu-nagarkot-tour:');
console.log(JSON.stringify(specificTour.itinerary, null, 2));
