const fs = require('fs');
const dbPath = './backend/database/db.json';
const dbStr = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbStr);

const newTrek = {
  id: "ebc-wellness-trek-14d",
  title: "Everest Base Camp Wellness Trek – 14 Days",
  duration: "14 Days",
  difficulty: "Challenging",
  activity: "Wellness Trek",
  price: "$1,650",
  originalPrice: "$1,800",
  rating: 5,
  reviewsCount: 42,
  image: "https://www.trekkingtrail.com/media/package/everest-base-camp-yoga-trek-525497.jpg",
  gallery: [
    "https://www.trekkingtrail.com/media/package/everest-base-camp-yoga-trek-525497.jpg",
    "https://exploreallaboutnepal.com/wp-content/uploads/2026/01/Gemini_Generated_Image_5l6yi5l6yi5l6yi5_11zon.png"
  ],
  description: "The Everest Base Camp Wellness Trek – 14 Days combines one of the world's most iconic trekking adventures with a carefully designed wellness experience. This unique journey allows you to explore the breathtaking landscapes of the Khumbu region while nurturing your physical and mental well-being through daily yoga, guided meditation, breathing techniques, and mindful trekking practices.\n\nStarting with a scenic mountain flight to Lukla, you'll trek through picturesque Sherpa villages, ancient Buddhist monasteries, suspension bridges, alpine forests, and glacier valleys before reaching the legendary Everest Base Camp (5,364m). Along the way, wellness sessions are thoughtfully integrated into the itinerary to help improve flexibility, support acclimatization, relieve muscle fatigue, and promote relaxation after each day's hike.\n\nWitness spectacular views of Mount Everest (8,848.86m), Lhotse, Nuptse, Ama Dablam, Thamserku, and many other Himalayan giants while experiencing the warm hospitality and rich culture of the Sherpa people. Whether you are an experienced trekker or looking to combine adventure with mindfulness, this wellness trek offers a balanced and unforgettable Himalayan experience.\n\nWellness Experience:\nThroughout the journey, professional wellness practices are incorporated to enhance your trekking experience.\n- Morning Wellness: Gentle Yoga, Sunrise Stretching, Pranayama (Breathing Exercises), Mindfulness Practice\n- Evening Wellness: Restorative Yoga, Guided Meditation, Muscle Recovery Stretching, Relaxation & Mindfulness Sessions\nThese activities are suitable for both beginners and experienced practitioners and are designed to complement the trekking schedule without adding physical strain.\n\nWhy Choose This Trek?\nUnlike a traditional Everest Base Camp trek, the Wellness Trek focuses not only on reaching your destination but also on how you feel throughout the journey. By combining mindful movement, breathing techniques, and meditation with one of the world's greatest trekking routes, you'll return home with unforgettable memories, renewed energy, and a deeper connection to the Himalayas.",
  quickFacts: {
    destination: "Nepal",
    region: "Everest Region",
    accommodation: "Hotel & Mountain Tea Houses",
    distance: "130 km",
    startEnd: "Kathmandu / Kathmandu",
    maxAltitude: "5,545m / 18,192ft (Kala Patthar)",
    meals: "Breakfast, Lunch & Dinner (During Trek)",
    groupSize: "1+ Pax",
    bestSeason: "Spring & Autumn",
    activityPerDay: "6 hrs",
    transportation: "Flight / Trekking"
  },
  highlights: [
    "Reach the iconic Everest Base Camp (5,364m)",
    "Hike to Kala Patthar (5,545m) for breathtaking sunrise views of Mount Everest",
    "Daily morning yoga and stretching sessions",
    "Evening meditation and relaxation exercises",
    "Pranayama (breathing techniques) to support high-altitude trekking",
    "Explore the vibrant Sherpa town of Namche Bazaar",
    "Visit the famous Tengboche Monastery",
    "Walk through Sagarmatha National Park, a UNESCO World Heritage Site",
    "Cross thrilling suspension bridges over the Dudh Koshi River",
    "Enjoy panoramic views of Everest, Lhotse, Nuptse, Ama Dablam, Pumori, and Thamserku",
    "Experience authentic Sherpa culture and Himalayan hospitality",
    "Optional luxury lodge accommodation on selected sections of the trek"
  ],
  itinerary: [
    { "day": 1, "title": "Arrival in Kathmandu (1,400m)", "details": "Arrival, hotel transfer, and evening wellness orientation." },
    { "day": 2, "title": "Fly to Lukla (2,840m) and Trek to Phakding (2,652m)", "details": "Scenic flight and introductory trek with evening stretching." },
    { "day": 3, "title": "Trek to Namche Bazaar (3,440m)", "details": "Enter Sagarmatha National Park with evening restorative yoga." },
    { "day": 4, "title": "Acclimatization Day in Namche Bazaar", "details": "Hike to Everest View Hotel and practice mindfulness." },
    { "day": 5, "title": "Trek to Tengboche (3,860m)", "details": "Visit Tengboche Monastery and enjoy mountain views." },
    { "day": 6, "title": "Trek to Dingboche (4,410m)", "details": "Trek higher with guided breathing exercises." },
    { "day": 7, "title": "Acclimatization Day in Dingboche", "details": "Rest day with morning yoga and a short acclimatization hike." },
    { "day": 8, "title": "Trek to Lobuche (4,910m)", "details": "Trek through the alpine landscape past the Thukla Pass." },
    { "day": 9, "title": "Trek to Everest Base Camp (5,364m) & Gorak Shep", "details": "Reach Everest Base Camp! Celebrate with an evening meditation." },
    { "day": 10, "title": "Hike to Kala Patthar (5,545m) & Trek to Pheriche", "details": "Sunrise views over Everest, followed by descent." },
    { "day": 11, "title": "Trek to Namche Bazaar", "details": "Descend back into the tree line with evening recovery stretching." },
    { "day": 12, "title": "Trek to Lukla", "details": "Final day of trekking with a celebratory wellness session." },
    { "day": 13, "title": "Fly back to Kathmandu", "details": "Return to the city for rest and relaxation." },
    { "day": 14, "title": "Final Departure", "details": "Transfer to the airport for your onward journey." }
  ]
};

if (!db.treks.find(t => t.id === newTrek.id)) {
    db.treks.unshift(newTrek);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Successfully added EBC Wellness Trek!');
} else {
    console.log('EBC Wellness Trek already exists.');
}
