const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
try {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  const newTrek = {
    id: "gokyo-renjo-la-pass-13",
    title: "Gokyo and Renjo La Pass Trek - 13 Days",
    region: "everest",
    description: "Gokyo and Renjo La Pass trek in Everest is a short beautiful trek which blends with natural wonders and Sherpa culture of Khumbu region. During this trek you pass through different beautiful villages like: Lukla and passes through Phakding, Namche Bazaar, Thame, and Lungden before crossing the high Renjo La Pass. After descending to Gokyo Lake (4790 m), a hike to Gokyo Ri (5360 m) offers one of the best Himalayan panoramas. This is one of the less popular but scenic trek in Everest region suitable for trekkers sekking vistas of Everest in less crowded areas.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop"
    ],
    price: "US$865",
    originalPrice: "US$950",
    rating: 4.9,
    reviewsCount: 143,
    difficulty: "Hard",
    duration: "13 Days",
    activity: "Walking / Hiking",
    
    // Quick Facts mapped exactly to the TrekDetail schema
    quickFacts: {
      region: "Everest Region",
      distance: "120 km",
      maxAltitude: "5360 m",
      accommodation: "Hotel / Lodges",
      meals: "Breakfast, Lunch & Dinner",
      groupSize: "1 to 14 People",
      bestSeason: "Spring & Autumn",
      transportation: "Flight (Kathmandu-Lukla)"
    },
    
    highlights: [
      "Experience a thrilling flight to Tenzing Hillary Airport and best aerial views of Himalayas during the flight to Lukla",
      "Visit Namche Bazaar, a lively Sherpa town",
      "Explore the UNESCO-listed World Heritage sites of Sagarmatha National Park, home to diverse flora and fauna amidst breathtaking landscapes.",
      "Chance to explore World’s highest placed luxurious hotel - Everest View Hotel with 360-degree views of Himalayas",
      "Explore the quiet and traditional Thame village",
      "Cross the beautiful and high Renjo La Pass (5,340 m) and see majestic views of towering peaks such as Mt. Everest (8848 m), Mt. Lhotse (8516 m), Mt. Nuptse, Mt. Makalu (8463 m), and Mt. Cho Oyu (8201 m) and many more.",
      "Visit the peaceful Gokyo Valley and its blue lakes",
      "View of a series of turquoise Gokyo lakes amidst the towering Himalayas including hike to fifth Lake.",
      "Walk through less crowded trails for a peaceful trekking experience",
      "Experience the warm hospitality and rich culture of the Sherpa people"
    ],

    // Mapped properly as 'details' instead of 'description' so TrekDetail.jsx can render it
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu (1,350m)", details: "Upon arrival at Tribhuvan International Airport (TIA) in Kathmandu, you will be greeted by our correspondent who will assist with your transfer to the hotel. Once checked in, we will arrange a pre-trip meeting where we will brief in short about the trek, answer any queries you have and meet your trekking guide as well." },
      { day: 2, title: "Kathmandu – Lukla (2840 m) – Phakding (2610 m)", details: "This day after an early breakfast at the hotel, we will meet our guide and drive to the domestic terminal of Tribhuvan International Airport for a 35-minute scenic and adventurous flight to Lukla. The three-hour walk to Phakding (2610m) will take us through Lukla Bazaar, offering unforgettable views of terraced landscapes, river valleys, Sherpa villages." },
      { day: 3, title: "Phakding - Namche Bazar (3440 m)", details: "This day we will have breakfast in early morning and trek towards Namche Bazzar. After walking about 1.5 hours we will reach Monjo village (2835 m). Then we will continue our trek with a steep zig-zag trial crossing the waterfall, crossing biggest and amazing suspension bridge. After almost 5 to 6 hours of walking we will reach Namche Bazar." },
      { day: 4, title: "Acclimatization at Namche Bazar (3440 m)", details: "Today will be the acclimatization day in Namche Bazar. In the morning, we will have breakfast in the hotel and get ready to hike for about 4 hours to the monastery above Namche Bazar, then after we will go to Syangboche and Khumjung village and finally to the luxurious hotel at highest altitude: Hotel Everest View." },
      { day: 5, title: "Namche Bazzar - Thame (3800 m)", details: "This day you will have breakfast at the lodge and then begin the trek to Thame which takes about 4-5 hours of walking. Following Bhote Koshi Rive along the pine and rhododendron forests, we trek towards Thame." },
      { day: 6, title: "Thame - Lungden (4380m)", details: "This day you will have breakfast at the lodge and then trek towards Lungden which takes about 5/6 hours. Today’s walking mostly uphill trials, enjoying the view of landscape, vegetation and mountains." },
      { day: 7, title: "Lungden – Renjola Pass (5340 m) – Gokyo (4790 m)", details: "This day you will have breakfast in the early morning (around 5 am) and get ready to cross Renjo Las Pass (5340 m). Today you will have to trek for about 6/7 hours to reach Gokyo. From the top of Renjo La Pass (5340 m), you can see majestic views of towering peaks such as Mount Everest (8848 m)." },
      { day: 8, title: "Gokyo – Gokyo Ri (5360 m) - Dole (4200 m)", details: "Today is one of the important day of the trekking. Climbing Gokyo Ri is totally ascending uphill trial but the view from the top of Gokyo Ri is totally worth it! After enjoying the view from Gokyo Ri, descend back to Gokyo. After resting for a while prepare to trek back towards Dole which take about 5 hours of walking." },
      { day: 9, title: "Dole - Namche Bazaar (3440 m)", details: "This day after having breakfast and trek towards Namche Bazaar which takes about 6 hours. You will walk zig zag trial till we reach Namche Bazaar crossing Phortse and Phunke Tenga." },
      { day: 10, title: "Namche Bazaar – Lukla (2840 m)", details: "After having breakfast in the lodge, you will descend back towards Lukla through the same trial via Phakding. As you trek back to Lukla you get to spend the last night in the Khumbu region of Everest." },
      { day: 11, title: "Lukla – Kathmandu (1350 m)", details: "Today in the early morning (6 am onwards) you will take a flight from Tenzing Hillary Airport (an \"eagle's nest\") to fly to Kathmandu or Ramechhap. After arrival in Kathmandu and you can rest whole day." },
      { day: 12, title: "Free day in Kathmandu", details: "This day you have free day in Kathmandu. Stay overnight at Hotel in Kathmandu. Taking the advantage of extra day, you can go for UNESCO World Heritage sightseeing." },
      { day: 13, title: "Departure from Kathmandu", details: "Enjoy your last day in Kathmandu before departure. At your scheduled departure time, our correspondent will pick you up from the hotel, transfer you to the airport, and bid you farewell with warm hearts." }
    ],
    
    // Mapped properly to costIncludes and costExcludes
    costIncludes: [
      "Transfer from Airport – Hotel - Airport including domestic transfers",
      "3 nights reservation in 3-star Hotel in Kathmandu with breakfast in twin sharing basis",
      "Flight tickets from Kathmandu / Ramechhap – Lukla – Ramechhap / Kathmandu, (15 kilos per way)",
      "Khumbu Gaupalika Tax + Sagarmatha National Park Permit fees",
      "All meal (breakfast, lunch and dinner with tea/coffee) during the trek",
      "Accommodation at lodge during the trek",
      "Professional Nepal Government license holder English-speaking trekking guide",
      "1 porter (20-22 kilos) every two-person basis during the trek",
      "Insurance, equipment, accommodation, all meals and salary of the guide and porter(s).",
      "Duffel Bag for the trek",
      "Achievement certificates of Everest Gokyo & Renjo La Pass Trek",
      "Farewell Dinner and Company service charge"
    ],
    costExcludes: [
      "International airfare & Nepal VISA fees",
      "Personal equipment and Personal and medical insurance",
      "Emergency Rescue evacuation by helicopter incases needed",
      "Hot showers, electric charges and Wi-Fi during the trek",
      "Lunch and dinner in Kathmandu",
      "Visits and/or entrance fees to temples in Kathmandu",
      "Unforeseen expenses caused by uncontrollable circumstances",
      "Tips for guides and porters"
    ],

    // FAQs added
    faqs: [
      {
        question: "What is Renjo La Pass?",
        answer: "Renjo La Pass is one of the three high passes in the Everest region, standing at an elevation of 5,340 meters. It offers some of the most spectacular, unobstructed views of Mount Everest, Lhotse, Makalu, and Cho Oyu."
      },
      {
        question: "How difficult is the Everest Gokyo & Renjo La Pass Trek?",
        answer: "It is graded as MODERATE to HARD. This trek is suitable for beginners with good fitness & determination or moderately experienced trekkers. You will walk about 5-6 hours each day."
      },
      {
        question: "When is the best time to do the Everest Gokyo & Renjo La Trek?",
        answer: "The best time to do this trek is in Spring (March–May) and Autumn (September–November). December is also a good option for those who prefer fewer crowds."
      },
      {
        question: "Do I need a guide for this Everest - Renjo La Pass trek?",
        answer: "Yes, it is highly recommended and sometimes mandatory to have a licensed guide for high altitude treks for safety, navigation, and acclimatization support."
      }
    ],

    additionalInfo: "The best time to do this trek is in Spring (March–May) and Autumn (September–November). Flights to Lukla may depart from Ramechhap during peak seasons to avoid air traffic in Kathmandu. Please be prepared for a 1 or 2 AM wake-up call for the 5-6 hour drive to Ramechhap."
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
  console.log("Full Gokyo Trek added successfully!");
} catch (error) {
  console.error("Failed to seed db:", error);
}
