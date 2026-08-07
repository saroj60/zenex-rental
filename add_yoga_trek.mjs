import fs from 'fs';

const newTrek = {
  id: "abc-yoga-trek-11d",
  title: "Annapurna Base Camp Yoga Trek 11 Days",
  duration: "11 Days",
  difficulty: "Moderate",
  activity: "Yoga Trek",
  price: "$1,250",
  originalPrice: "$1,400",
  rating: 5,
  reviewsCount: 54,
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1400",
  description: "The 11-Day Annapurna Base Camp Yoga Trek is a unique wellness adventure that combines Himalayan trekking with daily yoga, meditation, and mindfulness practices. Set within the breathtaking Annapurna Conservation Area, this journey takes you through picturesque Gurung villages, lush rhododendron forests, cascading waterfalls, and alpine landscapes before reaching Annapurna Base Camp at an elevation of 4,130 meters.\n\nEach day begins with guided sunrise yoga and pranayama to energize your body and prepare you for the trek ahead. After reaching your destination each afternoon, gentle stretching, restorative yoga, and meditation sessions help relieve muscle fatigue and promote relaxation.\n\nThroughout the journey, you'll enjoy panoramic views of Annapurna I (8,091m), Machhapuchhre (6,993m), Hiunchuli, Gangapurna, and other Himalayan peaks while experiencing Nepal's rich mountain culture and peaceful natural surroundings.\n\nWhether you are an experienced yogi or trying yoga for the first time, this trek offers the perfect balance of adventure, wellness, and cultural immersion.",
  quickFacts: {
    destination: "Nepal",
    region: "Annapurna Region",
    accommodation: "Hotel & Tea House",
    distance: "110 km",
    startEnd: "Kathmandu / Kathmandu",
    maxAltitude: "4,130m / 13,550ft",
    meals: "Breakfast, Lunch & Dinner (During Trek)",
    groupSize: "1+ Pax",
    bestSeason: "Spring & Autumn",
    activityPerDay: "5-6 hrs",
    transportation: "Tourist Bus / Private Jeep"
  },
  highlights: [
    "Daily sunrise yoga overlooking the Himalayas",
    "Evening meditation and restorative yoga sessions",
    "Reach Annapurna Base Camp (4,130m)",
    "Walk through beautiful Gurung villages",
    "Explore rhododendron forests and alpine landscapes",
    "Relax in the natural hot springs at Jhinu Danda",
    "Practice breathing techniques for better acclimatization",
    "Spectacular views of Annapurna I, Machhapuchhre, Hiunchuli, and Gangapurna",
    "Experience authentic Nepali mountain hospitality",
    "Small group wellness trekking experience"
  ],
  itinerary: [
    { day: 1, title: "Arrival in Kathmandu (1,350m)", details: "Meet our representative at Tribhuvan International Airport and transfer to your hotel. In the evening, meet your trekking guide and yoga instructor for a briefing and introductory meditation session." },
    { day: 2, title: "Drive to Pokhara (822m)", details: "Drive through scenic hills and rivers to Pokhara. Enjoy an evening yoga session beside Phewa Lake while taking in the stunning views of the Annapurna Range." },
    { day: 3, title: "Drive to Nayapul & Trek to Ghandruk (1,940m)", details: "Begin your trek through terraced farmlands and traditional Gurung villages. After arrival, enjoy a gentle stretching session and sunset meditation." },
    { day: 4, title: "Trek to Chhomrong (2,170m)", details: "Morning yoga followed by trekking through forests and suspension bridges. Chhomrong offers spectacular views of Annapurna South and Machhapuchhre." },
    { day: 5, title: "Trek to Bamboo (2,310m)", details: "Descend through dense bamboo forests before climbing gradually to Bamboo. Evening restorative yoga focuses on recovery and flexibility." },
    { day: 6, title: "Trek to Deurali (3,230m)", details: "Continue trekking through Himalayan forests, waterfalls, and narrow valleys. Practice breathing exercises to support acclimatization." },
    { day: 7, title: "Trek to Annapurna Base Camp (4,130m)", details: "Begin with a short meditation before trekking to the magnificent Annapurna Base Camp. Celebrate your achievement with sunset yoga surrounded by snow-covered peaks." },
    { day: 8, title: "Trek to Bamboo", details: "Enjoy a peaceful sunrise meditation at Annapurna Base Camp before descending to Bamboo." },
    { day: 9, title: "Trek to Jhinu Danda", details: "Descend to Jhinu Danda where you can relax in the famous natural hot springs before an evening yoga session." },
    { day: 10, title: "Trek to Nayapul & Drive to Pokhara", details: "Complete the trek and return to Pokhara. Celebrate your journey with a wellness dinner and closing meditation session." },
    { day: 11, title: "Return to Kathmandu / Final Departure", details: "Drive or fly back to Kathmandu before your onward journey." }
  ]
};

const dbPath = './backend/database/db.json';
const dbStr = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbStr);

// Avoid duplicate
if (!db.treks.find(t => t.id === newTrek.id)) {
    db.treks.unshift(newTrek);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Successfully added Yoga Trek!');
} else {
    console.log('Yoga Trek already exists.');
}
