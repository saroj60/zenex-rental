const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
try {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  const everestTreks = [
    {
      id: "everest-base-camp-14",
      title: "Everest Base Camp Trek - 14 Days",
      description: "The classic trek to the base of the world's highest peak. Experience Sherpa culture, stunning Himalayan views, and the legendary Khumbu Icefall.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop"
      ],
      price: "US$1450",
      originalPrice: "US$1600",
      rating: 4.9,
      reviewsCount: 320,
      difficulty: "Hard",
      duration: "14 Days",
      activity: "Trekking",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Welcome to Nepal. Transfer to hotel." },
        { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic flight and easy first day walk." },
        { day: 3, title: "Trek to Namche Bazaar", description: "Steep ascent to the Sherpa capital." },
        { day: 4, title: "Acclimatization Day at Namche", description: "Hike to Everest View Hotel for acclimatization." },
        { day: 5, title: "Trek to Tengboche", description: "Visit the famous Tengboche Monastery." }
      ],
      included: ["Airport transfers", "Flights to Lukla", "Accommodation", "Meals on trek", "Guide and Porter"],
      excluded: ["International flights", "Nepal Visa", "Travel insurance", "Personal expenses"]
    },
    {
      id: "everest-gokyo-16",
      title: "Everest Base Camp via Gokyo Lakes - 16 Days",
      description: "A breathtaking alternative route taking you through the pristine turquoise Gokyo Lakes and over the challenging Cho La Pass before reaching Everest Base Camp.",
      image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?q=80&w=800&auto=format&fit=crop"
      ],
      price: "US$1650",
      originalPrice: "US$1800",
      rating: 4.8,
      reviewsCount: 185,
      difficulty: "Strenuous",
      duration: "16 Days",
      activity: "Trekking",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Welcome to Nepal. Transfer to hotel." },
        { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic flight and easy first day walk." },
        { day: 3, title: "Trek to Namche Bazaar", description: "Steep ascent to the Sherpa capital." }
      ],
      included: ["Airport transfers", "Flights to Lukla", "Accommodation", "Meals on trek", "Guide and Porter"],
      excluded: ["International flights", "Nepal Visa", "Travel insurance", "Personal expenses"]
    },
    {
      id: "everest-three-passes-19",
      title: "Everest Three Passes Trek - 19 Days",
      description: "The ultimate Everest circuit for experienced trekkers, crossing three high passes (Renjo La, Cho La, Kongma La) with unparalleled panoramic views.",
      image: "https://images.unsplash.com/photo-1605640840469-60ce14840bc4?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1605640840469-60ce14840bc4?q=80&w=800&auto=format&fit=crop"
      ],
      price: "US$1850",
      originalPrice: "US$2100",
      rating: 5.0,
      reviewsCount: 112,
      difficulty: "Challenging",
      duration: "19 Days",
      activity: "High Passes Trekking",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Welcome to Nepal. Transfer to hotel." },
        { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic flight and easy first day walk." },
        { day: 3, title: "Trek to Namche Bazaar", description: "Steep ascent to the Sherpa capital." }
      ],
      included: ["Airport transfers", "Flights to Lukla", "Accommodation", "Meals on trek", "Guide and Porter"],
      excluded: ["International flights", "Nepal Visa", "Travel insurance", "Personal expenses"]
    },
    {
      id: "everest-short-heli-9",
      title: "Short Everest Trek with Helicopter Return - 9 Days",
      description: "Short on time but want to see Everest? Trek up to Tengboche or Base Camp and enjoy a thrilling scenic helicopter flight back to Kathmandu.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
      ],
      price: "US$2950",
      originalPrice: "US$3200",
      rating: 4.9,
      reviewsCount: 88,
      difficulty: "Moderate",
      duration: "9 Days",
      activity: "Trekking & Helicopter",
      itinerary: [
        { day: 1, title: "Arrival in Kathmandu", description: "Welcome to Nepal. Transfer to hotel." },
        { day: 2, title: "Fly to Lukla, trek to Phakding", description: "Scenic flight and easy first day walk." },
        { day: 3, title: "Trek to Namche Bazaar", description: "Steep ascent to the Sherpa capital." }
      ],
      included: ["Airport transfers", "Flights to Lukla", "Helicopter return to Kathmandu", "Accommodation", "Meals on trek", "Guide"],
      excluded: ["International flights", "Nepal Visa", "Travel insurance", "Personal expenses"]
    }
  ];

  data.treks = data.treks || [];
  
  // Prevent duplicate insertion
  const existingIds = data.treks.map(t => t.id);
  let count = 0;
  everestTreks.forEach(t => {
    if(!existingIds.includes(t.id)) {
      data.treks.push(t);
      count++;
    }
  });

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log(`${count} Everest treks added successfully!`);
} catch (error) {
  console.error("Failed to seed db:", error);
}
