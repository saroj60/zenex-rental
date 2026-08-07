const fs = require('fs');

const databasePath = './database.json';
let data = JSON.parse(fs.readFileSync(databasePath));

const newTrek = {
  id: "ebc-gokyo-chola-pass-17-days",
  title: "Everest Base Camp Trek with Gokyo - Chola Pass - 17 Days",
  image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80"
  ],
  price: "US$1650", 
  originalPrice: "US$1750",
  rating: "5.0",
  reviewsCount: 165,
  duration: "17 Days",
  difficulty: "Hard",
  description: "The Everest Base Camp Trek via Gokyo and the legendary Chola Pass is a thrilling Himalayan journey that has captivated trekkers since the 1950s. As an extended and more adventurous alternative to the standard 15-day EBC trek, this route guides you through the majestic Khumbu Region, conquering some of Nepal's most iconic high-altitude milestones: Chola Pass (5,330m), Gokyo Ri (5,360m), and the renowned Kala Patthar (5,545m).\n\nAlong the way, you will witness the pristine beauty of the high-altitude Gokyo Lakes (4,790m) and immerse yourself in the rich, traditional Sherpa culture. Combining breathtaking mountain vistas, challenging alpine passes, and authentic cultural encounters, this is truly a once-in-a-lifetime expedition into the heart of the Himalayas.\n\nThis adventurous trek offers mystical, up-close views of Mount Everest and allows you to explore beautiful Sherpa villages. We operate this trek in a clockwise direction—starting from Namche Bazaar toward Gokyo, crossing the Cho La Pass, and finally reaching Everest Base Camp. This clockwise route provides vastly superior acclimatization compared to the anti-clockwise alternative. Your journey begins with a thrilling flight to Lukla, followed by a trek through Namche Bazaar, Dole, and Machhermo to the pristine Gokyo Lakes. A hike up Gokyo Ri reveals jaw-dropping vistas of Everest, Cho-Oyu, and Makalu. After crossing the challenging Cho La Pass, you will ascend Kala Patthar—the 'Trekker's Summit'—before reaching Everest Base Camp and concluding the high-altitude portion at the peaceful Tengboche Monastery.",
  facts: {
    "Country": "Nepal",
    "Duration": "17 Days",
    "Trip Grade": "Hard",
    "Max. Altitude": "5545 meters",
    "Starts": "Kathmandu",
    "Ends": "Kathmandu",
    "Activities": "Trekking / Hiking",
    "Accomodation": "Hotel / Lodge",
    "Meals": "Breakfast, Lunch & Dinner",
    "Best Time": "Spring & Autumn"
  },
  highlights: [
    "Explore the UNESCO World Heritage Site of Sagarmatha National Park.",
    "Enjoy a thrilling flight to Lukla's Tenzing Hillary Airport with breathtaking aerial views of the Himalayas.",
    "Discover the cultural hub of Namche Bazaar, the gateway to the Everest Region.",
    "Visit the world’s highest luxury hotel, the Everest View Hotel, for a 360-degree panorama.",
    "Immerse yourself in the rich traditions and culture of the local Sherpa community.",
    "Stand at Everest Base Camp and marvel at the majestic Khumbu Glacier and Icefall.",
    "Witness stunning panoramas of Mount Everest, Lhotse, Nuptse, Ama Dablam, and Cho Oyu.",
    "Explore the pristine Gokyo Lakes and hike up Gokyo Ri (5,360m) for incredible views.",
    "Conquer the steep and challenging Cho La Pass (5,330m), one of the highest passes in the region.",
    "Reach the summit of Kala Patthar (5,545m) for the most iconic sunrise over Mount Everest.",
    "Take an acclimatization hike to Nangkartshang Peak (5,083m) from Dingboche.",
    "Seek blessings at the spiritually significant Tengboche Monastery."
  ],
  luklaFlightInfo: [
    {
      season: "Peak Season (March–May & Oct–Nov)",
      details: "Due to high air traffic, flights to Lukla operate from Ramechhap. You will depart Kathmandu around 1:00 AM to 2:00 AM for a 4-hour drive to Ramechhap, followed by a 20-minute flight to Lukla."
    },
    {
      season: "Off-Peak Season (Dec–Sept)",
      details: "Flights operate directly from Kathmandu (TIA). You will leave your hotel around 5:00 AM to 6:00 AM for a 35-minute scenic flight directly to Lukla."
    }
  ]
};

const existingIndex = data.treks.findIndex(t => t.id === newTrek.id);
if (existingIndex !== -1) {
  // Update existing
  data.treks[existingIndex] = { ...data.treks[existingIndex], ...newTrek };
} else {
  data.treks.push(newTrek);
}

fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
console.log('EBC Gokyo Chola 17 Days seeded successfully!');
