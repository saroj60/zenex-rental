const fs = require('fs');
const path = './src/data/treksData.js';
let content = fs.readFileSync(path, 'utf8');

const extendedInfo = [
  {
    title: "Permits Required for Everest Base Camp Trekking with Helicopter Return",
    description: "For the travellers interested in Everest Base Camp Trekking in Everest Region of Nepal you’ll need two main permits:",
    items: [
      "Sagarmatha National Park Entry Permit: This permit is needed once you enter the Sagarmatha National Park, which covers the upper Everest region including Everest Base Camp, Gokyo, and Kala Patthar.",
      "Khumbu Pasang Lhamu Rural Municipality Permit: This local permit is required to trek in the Khumbu region. It replaces the TIMS card for this area and is usually obtained in Lukla or Monjo."
    ],
    footer: "Note: The TIMS (Trekkers' Information Management System) card is no longer required for treks in the Everest region as per the latest rules.\n\nAt Zenex Travels, we take care of all the necessary permits for you. Our team arranges everything in advance, and your guide will carry the documents to ensure smooth passage through all checkpoints."
  },
  {
    title: "Best Time for Everest Base Camp Trek with Heli Return in Nepal",
    items: [
      "Spring: (March – May): Spring is one of the most popular times for trekking to Everest Base Camp Trek. During these months, the weather is generally stable, and the temperatures are moderate, making it an ideal time for trekking. The days are longer, which allows for extended trekking hours. The Rhododendron forests along the trail are in full bloom, adding vibrant colors to the landscape. Additionally, this season offers clear views of the surrounding peaks and lush green valleys. Spring is also the perfect season for expeditions in Everest Region; we can see many climbers and preparations for expeditions during our trek in Spring.",
      "Autumn: (September – November): Autumn is another peak season for trekking in the Everest Base Camp. The monsoon rains have washed away the dust and pollution, leaving the air crisp and the skies clear. This season is known for its stable weather and dry conditions, making it perfect for trekking. The temperatures are comfortable, and the visibility is excellent, providing breathtaking views of the snow-capped mountains.",
      "Winter (December to February): Winter is considered off-season for the Everest Base Camp Trek, but it still has its unique charm—especially for experienced trekkers who prefer fewer crowds and clear skies. The primary advantage of trekking in December is the significantly lower number of tourists, which means no accommodation issues in the lodges and a more serene trekking experience. Although it is quite cold, the views are stunning, with snow-covered landscapes and pristine, clear skies. Additionally, during this period, flights to and from Lukla operate directly from Kathmandu, simplifying logistics."
    ],
    footer: "Overall, each season offers unique benefits for trekking to Everest Base Campt Trek. Spring, Autumn & Winter are ideal for those seeking optimal weather and vibrant landscapes, while winter is perfect for those who prefer fewer crowds and spectacular snowy vistas."
  },
  {
    title: "Weather and Temperature during the Nepal EBC Trekking with Heli return",
    items: [
      "Spring (March - May): Spring is one of the best times for the EBC trek. The weather is generally stable, with clear skies and pleasant daytime temperatures ranging from 10°C to 15°C at lower altitudes. At higher elevations like Gorakshep and Kala Patthar, temperatures can drop to -10°C to -15°C at night. The trails are colourful with blooming rhododendrons, and visibility is excellent for mountain views.",
      "Autumn (September - November): Autumn is the most popular season for the EBC trek due to its clear skies, dry weather, and ideal temperatures. Daytime temperatures range between 10°C and 20°C at lower altitudes, while nighttime temperatures at higher altitudes can fall to -10°C or lower. This season offers crisp mountain views, less rainfall, and comfortable trekking conditions, making it peak trekking time.",
      "Winter (December - February): Winter brings cold and harsher conditions, especially at higher elevations. Daytime temperatures may reach 5°C to 10°C, but can drop to -15°C to -20°C at night above 4,000 meters. Though skies remain generally clear and crowds are minimal, heavy snow can occasionally block trails and lodges at higher altitudes. Proper cold-weather gear and flexibility are essential for trekking in winter."
    ]
  },
  {
    title: "Meals & Accommodations during Everest trekking",
    description: "Throughout the Everest Base Camp trek, trekkers primarily stay in basic lodges. These lodges provide essential amenities and services, catering to the needs of trekkers while offering a unique cultural experience. About meals in Everest region, it is possible to get the local delicacies to western cuisines during the trek. And there are dining halls for fooding, to be warm in all the lodges.",
    subsections: [
      {
        subtitle: "Facilities:",
        items: [
          "Rooms: Typically, rooms are basic with twin beds, blankets, and a small table. Most lodges have shared bathrooms with basic toilet facilities.",
          "Dining: Lodges have communal dining areas where trekkers can enjoy meals and socialize. The dining rooms are often heated with a central stove.",
          "Food: A variety of meals are available, including local Nepali dishes and more familiar international options like pasta, rice, and soups.",
          "Water: Safe drinking water is available for purchase, and most lodges offer boiled water for trekkers to fill their bottles."
        ]
      },
      {
        subtitle: "Attached Rooms (fewer options)",
        items: [
          "Availability: In some lodges, particularly in larger villages like Namche Bazaar, Dingboche, and Lukla, attached rooms with private bathrooms are available. These rooms come at an additional cost compared to standard rooms, offering more comfort and privacy.",
          "Facilities: Attached rooms typically include private bathrooms with basic shower facilities, sometimes with hot water depending on the lodge and altitude."
        ]
      },
      {
        subtitle: "Menu Options",
        description: "During the peak season it will not be easy to get the accommodation during the trek, so for better service and hassle-free journey to Himalayas, book with Zenex Travels, we will pre book and ensure to make your holiday memorable and pleasant.",
        items: [
          "A. Breakfast Menu (Main Course with a cup of a tea / coffee): Bread / Muesli / Porridge / Pancake / Tibetan Bread / Chapatti / Corn flakes / Burger / Sandwich or any main course dish as per menu with a cup of tea / coffee",
          "B. Lunch Menu (Main Course with a cup of a tea / coffee): Chowmein / Fried Rice / Pasta / French Fries / Chips / Momo / Spring Roll / Pizza / Burger / or any main course dish as per menu with a cup of tea / coffee",
          "C. Dinner Menu (Soup + Main Course with a cup of a tea / coffee): Any soup: Mushroom soup / Garlic soup / Onion Soup / Potato Soup / Veg Soup or any soup as per menu. Main course: Macaroni / Pasta / Chowmein / Fried Rice / Chips / Pizza / Spaghetti / Momo / Noodles / Nepali Thali / or any main course dish as per menu with a cup of tea / coffee"
        ]
      }
    ],
    footer: "Note: During the trek, please inform us in advance if you are vegetarian, vegan, or have any food allergies. We will accommodate your dietary needs with simple, plant-based or allergy-conscious meals."
  },
  {
    title: "Everest Base Camp (EBC) Trek with return Heli – 12 Days Cost for 2026 & 2027",
    table: {
      headers: ["TARRIFS", "2-3 PAX", "4-7 PAX", "8-10 PAX"],
      rows: [
        ["2025/26", "US$ 2660 P/P", "US$ 2550 P/P", "US$ 2530 P/P"]
      ]
    }
  },
  {
    title: "Difficulty Level of EBC Trek with Heli return in Nepal",
    paragraphs: [
      "Everest Base Camp (EBC) Trek with Heli Return, typically completed in 12 days, is considered a MODERATE trek (graded 2), making it suitable even for beginners who are in good physical condition and have some prior hiking experience. Although it does not involve any technical climbing or high mountain passes, the trek demands stamina, mental resilience, and proper acclimatization due to its high altitude and daily walking duration ranging from 5 to 6 hours.",
      "The trek reaches its maximum altitude of 5,545 meters at Kala Patthar, a popular vantage point offering spectacular sunrise views over Mount Everest and surrounding peaks. The highest sleeping altitude during the trek is at Gorakshep (5140 m), the final settlement located just before Everest Base Camp. The trek also takes you directly to Everest Base Camp itself (5360 m), where you can witness the grandeur of the Khumbu Icefall and soak in the ambiance of the world’s highest peak, even if summit attempts aren’t part of the journey.",
      "The route via Tengboche is not only scenic but spiritually enriching, as it passes through Tengboche Monastery, the largest and most revered Buddhist monastery in the Khumbu region. This path offers a gradual altitude gain, allowing better acclimatization as you pass through Sherpa villages like Namche Bazaar, Dingboche, and Lobuche.",
      "Since the itinerary does not involve crossing any high passes (such as Kongma La, Cho La, or Renjo La), it reduces the technical difficulty while still delivering the full Himalayan trekking experience. Proper preparation, including physical training and knowledge about altitude sickness, is essential for a safe and enjoyable journey."
    ]
  }
];

const str = JSON.stringify(extendedInfo, null, 4).replace(/\n/g, '\n  ');

// Insert after datesAvailability
content = content.replace(/"datesAvailability": ".*?",/, (match) => `${match}\n  "extendedInfo": ${str},`);

fs.writeFileSync(path, content, 'utf8');
console.log('Extended info added!');
