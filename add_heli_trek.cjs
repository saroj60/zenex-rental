const fs = require('fs');
const path = './src/data/treksData.js';
let content = fs.readFileSync(path, 'utf8');

const newTrek = {
  id: "ebc-heli-return",
  title: "Everest Base Camp Trek with Helicopter Return",
  duration: "12 Days",
  difficulty: "Grade 3: Hard/Challenging",
  activity: "Trekking",
  price: "$2,500",
  originalPrice: "$2,800",
  rating: 5,
  reviewsCount: 143,
  image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
  description: "Everest Base Camp Trek with Helicopter Return of 12 days offers a perfect blend of adventure and luxury. This journey takes you through the heart of Khumbu region, passing Sherpa villages, ancient monasteries, and stunning landscapes. After reaching the iconic Everest Base Camp (5360 m), and experiencing the beauty of the Khumbu Icefall, hike to Kala Pathar (5545 m) you’ll enjoy a scenic helicopter flight back to Kathmandu—skipping the long return hike through the same trial and soaking in panoramic Himalayan views from above.\n\nThis Everest Base Camp trek with heli return is once in a lifetime opportunity where travelers get to experience the high himalayas, culture and also experience a thrilling bird eye view of Everest Region. This is a luxurious opportunity anyone can have during their lifetime.",
  quickFacts: {
    destination: "Nepal, Everest Region",
    region: "Everest Region",
    accommodation: "Tea House & Hotel",
    distance: "130 km",
    startEnd: "Kathmandu / Kathmandu",
    maxAltitude: "5,545m / 18,192ft",
    meals: "Breakfast, Lunch, Dinner",
    groupSize: "1+ pax",
    bestSeason: "Mar-May / Sep-Nov",
    activityPerDay: "6 hrs",
    transportation: "Flight, Hiking, Helicopter"
  },
  highlights: [
    "Trek to the iconic Everest Base Camp (5360 m)",
    "Hike to Kala Pathar (5545 m) for panoramic views of Mount Everest",
    "Scenic helicopter flight from Gorakshep or Base Camp back to Kathmandu",
    "Experience the Sherpa culture and visit ancient monasteries in the Khumbu region",
    "Skip the long return hike and enjoy bird eye views of the Himalayas"
  ],
  itinerary: [
    { day: 1, title: "Arrival in Kathmandu (1,350 m)", details: "Welcome to Nepal! Upon your arrival in Kathmandu, our representative will transfer you to your hotel." },
    { day: 2, title: "Kathmandu – Lukla (2,840 m) – Phakding (2,610 m)", details: "Take a thrilling flight to Lukla and begin the trek with a gentle walk to Phakding." },
    { day: 3, title: "Phakding - Namche Bazar (3,440 m)", details: "Trek along the Dudh Koshi river, crossing suspension bridges to reach the bustling Sherpa hub of Namche Bazaar." },
    { day: 4, title: "Acclimatization & Hike to Everest View Hotel (3,880 m)", details: "A vital acclimatization day featuring a hike to the Everest View Hotel for your first panoramic views of Mount Everest." },
    { day: 5, title: "Namche Bazar – Tengboche (3,860 m)", details: "Trek through alpine forests and visit the famous Tengboche Monastery." },
    { day: 6, title: "Tengboche – Dingboche (4,410 m)", details: "Descend to the Imja Khola, then climb gradually to the village of Dingboche with stunning views of Ama Dablam." },
    { day: 7, title: "Acclimatization Day in Dingboche", details: "Hike to Nangkartshang Peak for acclimatization and return to Dingboche." },
    { day: 8, title: "Dingboche – Lobuche (4,940 m)", details: "Trek along the lateral moraine of the Khumbu Glacier, passing the memorials at Thukla Pass." },
    { day: 9, title: "Lobuche – Gorakshep (5,164 m) – EBC (5,364 m) – Gorakshep", details: "Reach Gorakshep, drop bags, and trek to the iconic Everest Base Camp before returning to Gorakshep for the night." },
    { day: 10, title: "Gorakshep – Kala Patthar (5,545 m) – Helicopter to Kathmandu", details: "Early morning hike to Kala Patthar for sunrise views. Then, take a thrilling helicopter ride directly back to Kathmandu." },
    { day: 11, title: "Kathmandu Free Day", details: "A buffer day for relaxation, shopping, or optional sightseeing around the Kathmandu valley." },
    { day: 12, title: "Final Departure", details: "Our representative will transfer you to the airport for your onward journey." }
  ],
  costIncludes: [
    "Airport transfers",
    "Flight to Lukla",
    "Helicopter flight from Everest region to Kathmandu",
    "Trekking permits and National Park fees",
    "Accommodation during the trek",
    "Experienced guide and porters"
  ],
  costExcludes: [
    "International flights",
    "Meals in Kathmandu",
    "Personal travel insurance",
    "Personal expenses and tips"
  ],
  additionalInfo: "The helicopter flight is subject to weather conditions."
};

content = content.replace(/export const treksData = \[/, `export const treksData = [\n  ${JSON.stringify(newTrek, null, 2)},`);

fs.writeFileSync(path, content, 'utf8');
console.log('Trek added successfully');
