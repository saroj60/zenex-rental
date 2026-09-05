const fs = require('fs');

const databasePath = './database.json';

// Read the database
let rawdata = fs.readFileSync(databasePath);
let data = JSON.parse(rawdata);

// Define the new trek
const newTrek = {
  id: "everest-base-camp-15-days",
  title: "Everest Base Camp Trek - 15 Days",
  image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534122841883-8a3d6ba22b2a?auto=format&fit=crop&q=80"
  ],
  price: "US$1405",
  originalPrice: "US$1500",
  rating: "5.0",
  reviewsCount: 165,
  duration: "15 Days",
  difficulty: "Moderate",
  overview: `Everest Base Camp Trek, shortly known as EBC Trek is one of the most adventurous & most admired trekking destination in Nepal where to get the vista of the world's highest peak Mt. Everest (8848 m). This 15-Days Everest Base Camp Trek is a lifetime opportunity where we get to walk on the lap of Himalayas as well as experience the Sherpa culture, Buddhist Monasteries, UNESCO World Heritage Site - Sagarmatha National Park and lifestyle in Himalayas.

Trekking to Everest Base Camp is not just about conquering mountains; it's a cultural immersion into the Sherpa way of life along with Tibetan Buddhist Culture. EBC trek is overall the combination of amazing landscapes and cultural immersion. The unforgettable highlights of Everest trek are best views from Everest Base Camp (5360 m) & sunrise hike to Kalapatthar (5545 m).

Get to know about the Everest region, Sherpa people and encounter dozens of snowy mountains with us! Our fixed departures for 2026 are wide open for booking and secure your spot today and embark towards the lifetime experience of world's highest Mountain with Zenex Travels!`,
  facts: {
    "Country": "Nepal",
    "Duration": "15 Days",
    "Trip Grade": "Moderate",
    "Max. Altitude": "5545 meters",
    "Starts": "Kathmandu",
    "Ends": "Kathmandu",
    "Activities": "Trekking / Hiking",
    "Accomodation": "Hotels / Lodges",
    "Meals": "Breakfast, Lunch & Dinner (trek)",
    "Best Time": "Spring, Autumn & Winter"
  },
  highlights: [
    "Explore the UNESCO-listed World Heritage sites of Sagarmatha National Park, home to diverse flora and fauna amidst breathtaking landscapes.",
    "Thrilling flight to Tenzing Hillary Airport in Lukla, offering unparalleled aerial views of the Himalayas.",
    "Stand at the foot of the world's tallest mountain in Everest Base Camp (EBC), the most desire destination of the world and view Khumbu glacier and Khumbu icefall",
    "Breathtaking views from Kalapathar (5545 m) and unrivaled views of Mount Everest, Ama Dablam, Lhotse, Nuptse and more.",
    "Discover the cultural heart of the Everest region in Namche Bazaar, bustling with activity and adorned with vibrant markets and traditional Sherpa architecture.",
    "Experience unparalleled luxury at the highest hotel on the planet, the Everest View Hotel, offering breathtaking vistas of the surrounding peaks.",
    "Visit the ancient Tengboche Monastery, a spiritual oasis nestled amidst the Himalayas, offering serenity and panoramic views of Everest and its neighboring peaks.",
    "Chance to explore beauty from Nangkartshang Peak (5083 m) from Dingboche",
    "Chance to have the Spectacular views of Mount Everest, Mount Ama Dablam, Lhotse, Nuptse, Pumori, Thamserku, and so on",
    "Exploring the culture and tradition of Sherpa Community of Everest Region"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Kathmandu",
      details: "Upon arrival at Tribhuvan International Airport (TIA) in Kathmandu, you will be greeted by our correspondent who will assist with your transfer to the hotel. Once checked in, we will arrange a pre-trip meeting where we will brief in short about the trek, answer any queries you have and meet your trekking guide as well. After the short brief, you can relax and spend rest of the day at your leisure. Stay overnight at the Hotel in Kathmandu."
    },
    {
      day: 2,
      title: "Kathmandu – Lukla (2840 m) – Phakding (2610 m)",
      details: "This day after an early breakfast at the hotel, we will meet our guide and drive to the domestic terminal of Tribhuvan International Airport for a 35-minute scenic and adventurous flight to Lukla in the Everest region, weather permitting. Upon landing at Tenzing-Hillary Airport in Lukla (2840 m), we will rest briefly, meet our Sherpas at the lodge, and begin our trek. The three-hour walk to Phakding (2610m) will take us through Lukla Bazaar, offering unforgettable views of terraced landscapes, river valleys, Sherpa villages, and up-close perspectives of some of the world's highest mountains. Stay overnight at a lodge in Phakding."
    },
    {
      day: 3,
      title: "Phakding - Namche Bazzar (3440 m)",
      details: "This day we will have breakfast in early morning and trek towards Namche Bazzar. At the beginning of the trek, we have to walk straight uphill path and we will cross the Dhud Khosi river several times. After walking about 1.5 hours we will reach Monjo village (2835 m). Then we will continue our trek with a steep zig-zag trial crossing the waterfall, crossing biggest and amazing suspension bridge. After almost 5 to 6 hours of walking we will reach Namche Bazar, the capital of Sherpa people. The first view of Namche Bazar with the stupa, monastery, lodges and the beautiful gates is amazing. Stay overnight at Lodge in Namche Bazzar."
    },
    {
      day: 4,
      title: "Acclimatization at Namche Bazzar (3440 m)",
      details: "Today will be the acclimatization day in Namche Bazar. As trekking in higher elevations can lead to altitude sickness, we have to make sure to acclimatize so that our body can adapt with increasing elevation.\n\nIn the morning, we will have breakfast in the hotel and get ready to hike for about 4 hours to the monastery above Namche Bazar, then after we will go to Syangboche and Khumjung village and finally to the luxurious hotel at highest altitude: Hotel Everest View. From the hotel, we can see first view of Mount Everest, and other beautiful Himalayas like: Mount Ama Dablam, Mount Lhotse, Mount Nuptse and so on.\n\nToday’s hike will serve us for acclimatization and where we will enjoy magnificent views of Everest. As we return back to Namche Bazar, in the afternoon we will have free time to wander around and visit the markets, purchase trekking equipment’s (if needed), local handicrafts and so on around Namche Bazar. Stay overnight at Lodge in Namche Bazzar."
    },
    {
      day: 5,
      title: "Namche Bazaar - Tengboche (3860 m)",
      details: "This day we will have breakfast in morning and then begin our trek to Tengboche. Today we will have to trek through the most scenic route from where we can see Dudh Koshi river and on the way, we will see scenic view of Mount Ama Dablam, Mount Lhotse, Mount Nuptse, Mount Everest, Mount Kangtega, Thamserku and many more. As we leave Namche Bazar, we will have to walk through the descending trial along the Dudh Koshi valley until we reach Phungi Thanga. We will rest there for a while and then cross the suspension bridge and walk uphill trial for about 3 hours to reach Tengboche. Tengboche is one of the famous destinations with old monastery for the travelers, here we can visit the Tengboche monastery and pray with monks in the evening or morning with Lamas. Stay overnight at Lodge in Tengboche."
    },
    {
      day: 6,
      title: "Tengboche - Dingboche (4410 m)",
      details: "This day we will have breakfast in morning and then gear ourself to trek towards Dingboche. Before we head to Dingboche, we can see mesmerizing view of sunrise on Mount Amadablam from Tengboche. We will have to walk through the alpine forest crossing Imja Khola (river) through the suspension bridge on the way. We will cross different villages like: Debuche, Pangboche before me reach Dingboche Village. On the way we can also see mani walls, prayer flags, yaks, and so on. Dingboche is a beautiful village with settlement of Sherpa people. Stay overnight at Lodge in Dingboche."
    },
    {
      day: 7,
      title: "Acclimatization in Dingboche (4410 m)",
      details: "Today we will have acclimatization day in Dingboche. Meanwhile to adapt with the altitude and changing environment and prevent ourself from altitude sickness we can hike to Nangkartsang peak (5083 m) which takes about 3.5 hours to reach there and 2 hours to descend back. This hike is great opportunity to see the amazing view of Mount Makalu (8485 m). Stay overnight at Lodge in Dingboche."
    },
    {
      day: 8,
      title: "Dingboche - Lobuche (4940 m)",
      details: "This day we will have breakfast in morning and then begin our trek to Lobuche. We have to walk through the straight ascending trial to climb towards Pheriche valley. We will pass through the alpine scrub and yak pastures along with the beautiful view of mountains behind us. We can see the memorial statues of climbers who passed away during the expeditions in Everest and then from there walking further, we reach Thukla Pass. We will rest there for a while and begin to walk towards Lobuche. Here, in Lobuche we will have basic place for lodging. Stay overnight at Lodge in Lobuche."
    },
    {
      day: 9,
      title: "Lobuche - Gorak Shep – EBC (5360 m)- Gorak Shep (5140 m)",
      details: "This day we will have breakfast in early and then hike for about 2 hours to reach Gorakshep. From Lobuche we have to walk through the rocky ways, uphill trial. As we reach Gorakshep, we will keep our luggage in the lodge and then go to the main destination of our trek, Everest Base Camp (5360 m). If weather is clear, we can see amazing view of Mount Everest followed by Mount Nuptse, Mount Lhotse and so on. Also, we can see Khumbu Glaciers from here. After enjoying the scenic view in EBC we will return back to Gorakshep. Stay overnight at Lodge in Gorakshep."
    },
    {
      day: 10,
      title: "Gorak Shep - Kala Pathar (5545 m) - Dingboche (4410 m)",
      details: "In the morning (4-5am) we will begin our hike to Kalapathar and walking uphill trial for about 2.5 hours we will reach at Kala Pathar. From here, we can see beautiful 360 view of Everest Range. We can see amazing view of Mount Everest, Mount Nuptse, Mount Lhotse, Mount Pumori, Mount Ama Dablam and many more. As we ascend towards Kalapathar we can see mount Pumori right straight to our sight which gives the feeling like we are climbing Mount Pumori. We will celebrate and capture our success climb to Kalapathar and then after enjoying the scene we will return back to Gorakshep which takes about 1.5 hours. Then after we will have breakfast in Gorakshep. After that we will get ready to descend back through the same way towards Dingboche. Stay overnight at Lodge in Dingboche."
    },
    {
      day: 11,
      title: "Dingboche – Namche Bazzar (3440m)",
      details: "After having breakfast in the lodge, we will return back towards Namche bazzar which takes about 7/8 hours of walk. Today's trek presents a gentle descent from the high altitudes of Dingboche to the vibrant cultural hub of Namche Bazzar. As we bid farewell to the serene landscapes of Dingboche, we are greeted by panoramic views that accompany us throughout the journey. Reverse through picturesque forests adorned with blue pine and rhododendrons, painting the landscape with vibrant hues of green and red. The fragrant aroma of the forest and the gentle rustle of leaves create a serene atmosphere as we make our way towards Namche Bazzar. Stay overnight at Lodge Namche Bazzar."
    },
    {
      day: 12,
      title: "Namche Bazaar - Lukla (2840m)",
      details: "After having breakfast in the lodge, we will descend back towards Lukla through the same trial. As we trek back to Lukla we get to spend the last night in the Khumbu region of Everest. We will descend towards Phakding from Lukla in about 3.5 hours have lunch in Phakding. From here, we will again descend towards Lukla through the zigzag trial in another 4.5 hours. Stay overnight at Lodge in Lukla."
    },
    {
      day: 13,
      title: "Lukla - Kathmandu (1350m)",
      details: "After having breakfast in the lodge, we bid farewell to the Everest region of Nepal and again take scenic mountain flight to Kathmandu / Ramechhap. Stay overnight at Hotel in Kathmandu."
    },
    {
      day: 14,
      title: "Kathmandu",
      details: "Free day in Kathmandu for sightseeing / shopping / massage, and etc... We can do half day sightseeing in the UNESCO listed World Heritage sites like:\n\nSwoyambhunath: Also known as the Monkey Temple, it offers panoramic views of Kathmandu.\nBoudhanath: One of the largest stupas in the world and a UNESCO World Heritage Site.\nPashupatinath: A sacred Hindu temple complex on the banks of the Bagmati River.\nStay overnight at Hotel in Kathmandu.\n\nNote: If you have extra days in Kathmandu then it is possible to do Short Kathmandu Heritage Tour, Nepal Tour, explore Nature and Wildlife and so on.. in Nepal. Also, it is possible to extend the tours to other destinations like: Tibet, Bhutan or India also."
    },
    {
      day: 15,
      title: "Departure from Kathmandu",
      details: "Enjoy your last day in Kathmandu before departure. At your scheduled departure time, our correspondent will pick you up from the hotel, transfer you to the airport, and bid you farewell with warm hearts."
    }
  ],
  costDetails: {
    includes: [
      "Transfer from Airport – Hotel - Airport including domestic transfers",
      "3 nights at 3-star hotel in Kathmandu including breakfast on twin sharing basis",
      "Flight tickets from Kathmandu / Ramechhap - Lukla- Ramechhap / Kathmandu, (15 kilos per way, per person in the fare), including of trekking guide and all airport taxes",
      "Khumbu Gaupalika Tax + Sagarmatha National Park Permit fees",
      "All meal (breakfast, lunch and dinner with a cup of tea/coffee) during the trek",
      "Accommodation at lodges during the trek",
      "Nepal Government License Holder English Speaking Trekking Guide(s) during the trek",
      "1 porter (carrying 20-22 kilos) per two-person basis during the trek",
      "Guide(s) and porter(s) all meal, accommodation, daily wages, transportation and insurance",
      "Farewell Dinner",
      "Company service charge",
      "All necessary government taxes"
    ],
    excludes: [
      "Personal equipment",
      "Personal and medical insurance",
      "Emergency Rescue evacuation by helicopter incase needed",
      "Hot showers, electric charges and Wi-Fi during the trek",
      "Lunch and dinner in Kathmandu",
      "Visits and/or entrance fees to temples in Kathmandu",
      "Unforeseen expenses caused by uncontrollable circumstances such as flight cancellations or delays, blocked roads, weather conditions, natural disasters, altitude sickness, early termination or return of the program, etc.",
      "Personal Expenses",
      "Tips",
      "Any other expenses not mentioned in INCLUDED"
    ]
  },
  faqs: [
    {
      question: "How difficult is Nepal Everest Base Camp trek?",
      answer: "The Everest Base Camp Trek is considered moderate to challenging. It involves daily walking of 5 to 7 hours and reaching high altitudes, so a good level of physical fitness is required."
    },
    {
      question: "What is the best time for Everest Base Camp Trek?",
      answer: "The best times are Spring (March to May) and Autumn (September to November) when the weather is stable, and the views are clear."
    },
    {
      question: "Do we need a guide for Everest Base Camp Trek?",
      answer: "Yes, it is highly recommended and in many cases mandatory to have a licensed guide for safety, navigation, and cultural insights."
    },
    {
      question: "What will be the weather and temperature in Everest Trek?",
      answer: "Weather can vary. In peak seasons, daytime temperatures are comfortable, but nights can drop below freezing, especially at higher altitudes."
    },
    {
      question: "Do we need prior experience for Everest Base Camp Trek?",
      answer: "No prior trekking experience is strictly required, but regular walking, cardio exercises, and a positive mindset are essential."
    }
  ]
};

// Check if trek already exists and update or add
const existingIndex = data.treks.findIndex(t => t.id === newTrek.id);
if (existingIndex !== -1) {
  data.treks[existingIndex] = { ...data.treks[existingIndex], ...newTrek };
} else {
  data.treks.push(newTrek);
}

// Write back to the file
fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
console.log('Everest Base Camp 15 Days Trek added successfully!');
