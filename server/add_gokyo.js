const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
try {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  const newTrek = {
    id: "gokyo-renjo-la-pass-13",
    title: "Gokyo and Renjo La Pass Trek - 13 Days",
    description: "The 13-day Gokyo and Renjo La Pass Trek presents a spectacular alternative to the traditional Everest Base Camp route. Offering breathtaking panoramas of Mount Everest, Cho Oyu, and Makalu, this less-crowded path weaves through the serene Khumbu region. Highlighting the journey is the exhilarating ascent of the Renjo La Pass (5,340m) and the mesmerizing turquoise waters of the Gokyo Lakes. Along the way, you'll immerse yourself in authentic Sherpa culture, visiting traditional villages like Namche Bazaar and Thame. This adventure is perfect for those seeking towering Himalayan vistas away from the bustling main trails.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop"
    ],
    price: "US$1450",
    originalPrice: "US$1600",
    rating: 4.9,
    reviewsCount: 143,
    difficulty: "Hard",
    duration: "13 Days",
    activity: "Walking / Hiking",
    region: "everest",
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu (1,350m)", description: "Welcome to Nepal! Upon landing, you'll be transferred to your hotel. Later, enjoy a pre-trip briefing to prepare for the adventure ahead." },
      { day: 2, title: "Flight to Lukla (2,840m) & Trek to Phakding (2,610m)", description: "Experience a thrilling 35-minute scenic flight to Tenzing-Hillary Airport. Begin your trek with a gentle 3-hour walk through terraced landscapes to Phakding." },
      { day: 3, title: "Trek to Namche Bazaar (3,440m)", description: "Follow the Dudh Koshi River, crossing suspension bridges, and ascend steeply through pine forests to reach Namche Bazaar, the bustling Sherpa capital." },
      { day: 4, title: "Acclimatization at Namche Bazaar", description: "Hike to the Everest View Hotel for magnificent panoramas of Everest, Lhotse, and Ama Dablam. Spend the afternoon exploring the local markets." },
      { day: 5, title: "Trek to Thame (3,800m)", description: "Walk off the beaten path through rhododendron forests to the traditional village of Thame, home to one of the region's oldest monasteries." },
      { day: 6, title: "Trek to Lungden (4,380m)", description: "Ascend gradually through ancient walled villages like Taranga and Marulung. Enjoy the pristine landscapes on an old Tibetan trade route." },
      { day: 7, title: "Cross Renjo La Pass (5,340m) to Gokyo (4,790m)", description: "An early start takes you up the challenging Renjo La Pass. Reward yourself with breathtaking views of the Everest range before descending to the turquoise Gokyo Lakes." },
      { day: 8, title: "Hike Gokyo Ri (5,360m) & Trek to Dole (4,200m)", description: "Hike up Gokyo Ri at dawn for a phenomenal Himalayan sunrise. Afterwards, descend alongside the Dudh Koshi River to the village of Dole." },
      { day: 9, title: "Trek to Namche Bazaar (3,440m)", description: "A scenic 6-hour descent weaves through Phortse and Phunke Tenga, bringing you back to the comforts of Namche Bazaar." },
      { day: 10, title: "Trek to Lukla (2,840m)", description: "Retrace your steps through Phakding for your final 7-8 hours of trekking. Celebrate the completion of your journey with your team in Lukla." },
      { day: 11, title: "Flight to Kathmandu", description: "Take an early morning flight back to Kathmandu (or Ramechhap). Transfer to your hotel for a well-deserved rest." },
      { day: 12, title: "Free Day in Kathmandu", description: "Enjoy a leisure day. You can explore UNESCO World Heritage sites, shop for souvenirs, or treat yourself to a relaxing massage." },
      { day: 13, title: "Departure from Kathmandu", description: "Farewell from Nepal! You will be transferred to the airport for your onward journey." }
    ],
    included: [
      "Airport transfers via private vehicle",
      "3 nights twin-sharing 3-star hotel accommodation in Kathmandu with breakfast",
      "Round-trip domestic flights (Kathmandu/Ramechhap to Lukla) including taxes and 15kg baggage allowance",
      "Necessary permits: Sagarmatha National Park & Khumbu Rural Municipality Tax",
      "All meals (Breakfast, Lunch, Dinner with tea/coffee) during the trek",
      "Teahouse/lodge accommodation on the trail",
      "Licensed, English-speaking professional trekking guide",
      "One porter for every two trekkers (carrying 20-22 kg total)",
      "Staff expenses (insurance, food, accommodation, and salary)",
      "Complimentary duffel bag and trek achievement certificate",
      "Farewell dinner and all government taxes"
    ],
    excluded: [
      "International airfare and Nepal Visa fees",
      "Personal travel and medical insurance (including emergency helicopter evacuation)",
      "Personal trekking gear and equipment",
      "Extra amenities on the trek (Wi-Fi, hot showers, battery charging)",
      "Lunch and dinner while in Kathmandu",
      "Entrance fees for sightseeing in Kathmandu",
      "Unexpected expenses due to weather, flight delays, or altitude sickness",
      "Tips for guides and porters"
    ]
  };

  data.treks = data.treks || [];
  
  // Prevent duplicate insertion
  const existingIndex = data.treks.findIndex(t => t.id === newTrek.id);
  if (existingIndex !== -1) {
    data.treks[existingIndex] = newTrek; // Update if exists
  } else {
    data.treks.push(newTrek);
  }

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log("Gokyo Trek added successfully!");
} catch (error) {
  console.error("Failed to seed db:", error);
}
