const fs = require('fs');

const databasePath = './database.json';

// Read the database
let rawdata = fs.readFileSync(databasePath);
let data = JSON.parse(rawdata);

// Define the new trek
const newTrek = {
  id: "mera-peak-amphu-lapcha-pass-19-days",
  title: "Mera Peak Climbing and Amphu Lapcha Pass - 19 Days",
  image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80",
  gallery: [],
  price: "US$2650",
  originalPrice: "US$2800",
  rating: "5.0",
  reviewsCount: 143,
  duration: "19 Days",
  difficulty: "Challenging",
  overview: `Mera Peak Climbing and Amphu Lapcha Pass Expedition is a challenging high-altitude adventure that combines trekking, peak climbing, and crossing a technical mountain pass. It takes you through the quiet Hinku and remote Hongu Valleys, far from the busy Everest routes. You’ll climb Mera Peak (6461m)—the highest trekking peak in Nepal offering amazing views of Everest, Lhotse, Makalu, Cho Oyu, and Kangchenjunga. After the summit, the journey continues into the wild and untouched Hongu Valley, ending with the thrilling Amphu Lapcha Pass (5845m), which requires technical gear and professional guided support.

Mera peak climbing with Amphu Lapcha trek is only for experienced trekkers or those with basic mountaineering skills who are ready to experience true Himalayan expedition. Along the way, you’ll see glaciers, alpine lakes, and massive peaks, and experience the culture of remote Sherpa villages. This is not just a trek, it’s a remote, raw, and rewarding journey through some of the most stunning and less-traveled parts of the Himalayas.

### Mera Peak (6461 m) & Amphu Lapcha Pass (5845 m): The Ultimate High-Altitude Himalayan Adventure
Climbing Mera Peak & Amphu Lapcha Pass Expedition is one of the spectacular high-altitude adventure that combines trekking, peak climbing, and technical pass crossing. This challenging expedition takes you through the remote Hongu and Hinku Valleys, summiting Mera Peak (6461m)—the highest trekking peak in Nepal before approaching the Amphu Lapcha Pass (5845m), one of the most demanding passes in the Himalayas.

The adventure begins with a scenic flight to Lukla and heads into the quiet and beautiful Hinku Valley, far from the crowded Everest Trekking trails. You trek through lush forests, suspension bridges, yak pastures, and traditional Sherpa villages like Khote and Tangnag. The trail slowly climbs higher, giving you time to acclimatize as you head toward Mera Base Camp, which sits just below the snowy peak of Mera.

### Information about: Mera Peak – Nepal’s Highest Trekking Peak (6461 m)
Mera Peak is the highest of all designated trekking peaks in Nepal. Though the climb is non-technical, it involves walking on glaciers using crampons, ice axes, and ropes. It’s a demanding ascent mainly due to its high altitude, but it's achievable for fit trekkers with basic mountaineering training.

From the summit of Mera Peak, you are rewarded with one of the most stunning mountain panoramas anywhere on Earth. You can see below five of the world’s tallest peaks from the summit:
*   Mount Everest (8848 m)
*   Lhotse (8516 m)
*   Makalu (8485 m)
*   Cho Oyu (8188 m)
*   Kangchenjunga (8586 m)
alongside dozens of other Himalayan giants. The sense of peace, accomplishment, and raw beauty from the summit is unforgettable.

### Crossing the Remote Hongu Valley
After summiting Mera, the journey continues into the Hongu Valley, one of the most remote and untouched parts of the Himalayas. This area is wild, vast, and rarely visited. You’ll walk alongside glacial rivers, across moraines, and past turquoise alpine lakes under the shadows of massive mountains like Baruntse, Chamlang, and Makalu.

Camping in this isolated valley surrounded by snow and silence offers a rare connection with nature and the mountains. It feels like a true expedition, far removed from modern distractions.

### Amphu Lapcha Pass (5,845 m) – Technical and Thrilling
The Amphu Lapcha Pass is a high, icy mountain pass that connects the Hongu Valley to the famous Imja Valley near Island Peak and Chhukung. This is one of the most technical and demanding passes in Nepal. It requires the use of:
*   Ropes for ascending and descending
*   Crampons
*   Ice axes
*   Helmet and harness
*   Guided support for fixed ropes on steep icy sections

Crossing this pass involves a thrilling climb to the top, followed by a steep, rope-assisted descent down an ice wall into the Imja Valley. It’s an exciting challenge for those ready to push their limits.

Once you cross the pass, you descend into the Khumbu region, where the trail ends in Chhukung, near Island Peak, Ama Dablam, and Nuptse. From here, you can either trek down to Lukla or continue to Everest Base Camp if time and energy allow.

### Who can do Mera Peak Climbing and Amphu Lapcha Pass In Nepal?
The Mera Peak and Amphu Lapcha Pass Trekking is a challenging yet rewarding journey that combines high-altitude trekking, glacier travel, and technical pass crossing. 
**Suitable For:**
*   Experienced high-altitude trekkers (EBC, Annapurna Circuit, Langtang, etc.)
*   First-time climbers aiming for their first Himalayan summit using basic gear (crampons, ice axe, ropes)
*   Adventure seekers looking to train for more technical climbs like Island Peak, Ama Dablam, or Everest
*   Physically active individuals able to hike 6–8 hours a day in challenging, cold, high-altitude conditions
*   Nature lovers seeking remote trails, mountain solitude, and jaw-dropping scenery

**Not Suitable For:**
*   Those with serious heart, lung, or altitude-related conditions
*   People new to trekking or not used to long walks and mountain terrain
*   Trekkers without enough time for acclimatization or who prefer unguided routes

*Important Note:* While no prior technical climbing experience is required, basic mountaineering knowledge and strong fitness are essential. Your experienced guide will teach you to use crampons, ropes, and ice axes during the glacier and pass sections. Zenex Travels ensures full support, proper acclimatization, and experienced guidance throughout the expedition.`,
  facts: {
    "Country": "Nepal",
    "Duration": "19 Days",
    "Trip Grade": "Challenging",
    "Max. Altitude": "6461 m",
    "Starts": "Kathmandu",
    "Ends": "Kathmandu",
    "Activities": "Walking / Climbing / Expedition",
    "Accomodation": "Hotels / Lodges / Tented camp",
    "Meals": "Breakfast, Lunch & Dinner",
    "Best Time": "Spring & Autumn"
  },
  highlights: [
    "Summit Mera Peak (6461m) – Nepal’s highest trekking peak with incredible 360° views of Everest, Lhotse, Makalu, Cho Oyu, and Kanchenjunga.",
    "Cross Amphu Lapcha Pass (5845m) – A technically demanding, high-altitude pass with breathtaking views of Island Peak, Ama Dablam, and Everest.",
    "Scenic & Less-Crowded Trekking Route – Fewer trekkers take this route, making for a more serene and immersive experience in remote Himalayan landscapes.",
    "Technical Mountaineering Challenge – Requires ropework, ice climbing, and glacier navigation, making it a great experience for climbers looking to improve their skills.",
    "Diverse Terrain & Landscapes – Trek through dense forests, glacial valleys, remote yak pastures, and high-altitude lakes, with dramatic scenery at every stage.",
    "Wild & Remote Hongu Valley – One of Nepal’s most isolated trekking areas, with pristine alpine lakes like Seto Pokhari (White Lake) and stunning wilderness.",
    "Rich Sherpa Culture & Buddhist Heritage – Pass through traditional Sherpa villages, ancient monasteries, and prayer-flag-lined trails in both the Solu-Khumbu and Everest regions."
  ],
  itinerary: [
    { day: 1, title: "Arrival in Kathmandu (1350m)", details: "Welcome to Nepal! Transfer to your hotel, rest, and attend a pre-expedition briefing where we check your climbing gear." },
    { day: 2, title: "Flight to Lukla (2840m) & Trek to Chutanga (3020m)", details: "A thrilling morning flight to Lukla, followed by a short trek up through forests to Chutanga for our first night in the mountains." },
    { day: 3, title: "Trek from Chutanga to Thuli Kharka (4300m) via Zatrwa La Pass (4600m)", details: "A challenging day crossing the Zatrwa La Pass with steep ascents and descents, arriving at Thuli Kharka in the Hinku Valley." },
    { day: 4, title: "Trek from Thuli Kharka to Kothe (3600m)", details: "A beautiful descent through lush rhododendron and pine forests, following the Hinku River to the settlement of Kothe." },
    { day: 5, title: "Trek from Kothe to Thangnak (4350m)", details: "We trek up the Hinku valley in the shadow of Mera Peak, passing monasteries and enjoying views of Kusum Kanguru." },
    { day: 6, title: "Acclimatization Day in Thangnak", details: "Rest and acclimatize. We take a short hike towards Sabal Tsho lake or a nearby ridge for spectacular views and acclimatization." },
    { day: 7, title: "Trek from Thangnak to Khare (5045m)", details: "A short but steep trek along the moraine of the Dig Glacier to Khare, the base camp for Mera Peak." },
    { day: 8, title: "Pre-Climb Training in Khare", details: "Our climbing guides provide training on using ice axes, crampons, and ropes to prepare for the ascent and pass crossing." },
    { day: 9, title: "Trek from Khare to Mera High Camp (5780m)", details: "A steep, snowy climb up the Mera Glacier brings us to High Camp, where we set up tents and prepare for summit day." },
    { day: 10, title: "Summit Mera Peak (6461m) & Descend to Kongma Dingma (4850m)", details: "Summit day! We start at 2 AM to reach the top for sunrise, enjoying 5 of the world's 8000m peaks. Then a long descent to Kongma Dingma." },
    { day: 11, title: "Trek from Kongma Dingma to Seto Pokhari (5035m)", details: "We enter the remote and wild Hongu Valley, trekking past high-altitude lakes to camp at Seto Pokhari (White Lake)." },
    { day: 12, title: "Trek from Seto Pokhari to Amphu Lapcha Base Camp (5400m)", details: "A gradual ascent through the pristine wilderness of the Hongu Valley brings us to the base of the formidable Amphu Lapcha pass." },
    { day: 13, title: "Cross Amphu Lapcha Pass (5845m) & Trek to Chhukung (4730m)", details: "The most technical day. We use ropes to ascend and descend the icy Amphu Lapcha Pass, arriving in the Imja Valley and Chhukung." },
    { day: 14, title: "Trek from Chhukung to Tengboche (3860m)", details: "Descending back into civilization, we pass through Dingboche and Pangboche to reach the famous Tengboche Monastery." },
    { day: 15, title: "Trek from Tengboche to Namche Bazaar (3440m)", details: "A scenic descent through rhododendron forests brings us back to the bustling Sherpa capital of Namche Bazaar." },
    { day: 16, title: "Trek from Namche Bazaar to Lukla (2840m)", details: "Our final day of trekking, descending to the Dudh Kosi river and making our way back to Lukla for a celebration." },
    { day: 17, title: "Flight from Lukla to Kathmandu", details: "An early morning scenic flight back to Kathmandu. Transfer to the hotel to rest and enjoy a hot shower." },
    { day: 18, title: "Free Day in Kathmandu / Contingency Day", details: "A free day to explore Kathmandu, shop for souvenirs, or relax. This also serves as a backup day in case of bad weather." },
    { day: 19, title: "Final Departure", details: "Transfer to the airport for your flight home, carrying incredible memories of a true Himalayan expedition." }
  ],
  costDetails: {
    includes: [
      "Airport transfers",
      "Kathmandu hotel accommodations",
      "Domestic flights (Kathmandu/Ramechhap - Lukla - Kathmandu/Ramechhap)",
      "All necessary permits (Mera Peak climbing permit, National Park fees, TIMS)",
      "Meals and accommodations (lodges and tented camps) during the trek",
      "Experienced climbing guide, assistant guides, and porters",
      "Group climbing equipment (ropes, ice screws, snow bars)"
    ],
    excludes: [
      "International flights and Nepal Visa",
      "Personal climbing and trekking gear (boots, crampons, harness, ice axe)",
      "Travel and rescue insurance (mandatory)",
      "Personal expenses and tips"
    ]
  },
  faqs: [
    {
      question: "Do I need previous climbing experience for Mera Peak?",
      answer: "While Mera Peak is considered a 'trekking peak' and is not highly technical, basic mountaineering skills are required. You must be comfortable using crampons, an ice axe, and ropes, though our guides will provide training at Khare."
    },
    {
      question: "How technical is the Amphu Lapcha Pass?",
      answer: "Amphu Lapcha is one of Nepal's most technical trekking passes. It requires the use of fixed ropes, a climbing harness, crampons, and an ice axe, especially on the steep descent into the Imja Valley."
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

// Add to packages list if needed
if (data.packages) {
  const existingPkgIndex = data.packages.findIndex(p => p.id === newTrek.id);
  const pkgData = {
    id: newTrek.id,
    title: newTrek.title,
    location: "Everest / Makalu Region",
    category: "Expedition",
    tripCode: "DNTT/MP-AL/19",
    price: newTrek.price,
    persons: "for 2 Persons",
    img: newTrek.image
  };
  if (existingPkgIndex !== -1) {
    data.packages[existingPkgIndex] = { ...data.packages[existingPkgIndex], ...pkgData };
  } else {
    data.packages.push(pkgData);
  }
}

// Write back to the file
fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
console.log('Mera Peak and Amphu Lapcha Pass 19 Days added successfully!');
