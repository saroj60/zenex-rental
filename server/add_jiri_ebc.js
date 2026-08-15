const fs = require('fs');

const databasePath = './database.json';

// Read the database
let rawdata = fs.readFileSync(databasePath);
let data = JSON.parse(rawdata);

// Define the new trek
const newTrek = {
  id: "jiri-to-everest-base-camp-22-days",
  title: "Jiri to Everest Base Camp Trek - 22 Days",
  image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534122841883-8a3d6ba22b2a?auto=format&fit=crop&q=80"
  ],
  price: "US$1850",
  originalPrice: "US$2000",
  rating: "5.0",
  reviewsCount: 143,
  duration: "22 Days",
  difficulty: "Hard",
  overview: `The 22-day Jiri to Everest Base Camp Trek is a historic and extensive route to Mount Everest, commencing with a picturesque drive from Kathmandu to Jiri. This prolonged journey provides an extraordinary opportunity to delve into the rich cultural heritage, varied topographies, and pristine wilderness of the lower Khumbu region—a section frequently bypassed by trekkers who opt for direct flights to Lukla. 

Following the legendary footsteps of Sir Edmund Hillary and Tenzing Norgay, this classic trail takes you through lively settlements, lush forests, and the Gaurishankar National Park. You will visit premier Everest attractions, including the pristine Gokyo Lakes, the formidable Cho La Pass, the iconic Everest Base Camp, and Kala Patthar, which provides the ultimate panoramic vista of the Everest range.

The Classic Route to Everest
Renowned as the "Classic Route to Everest," this trek begins with a scenic 6 to 7-hour drive from Kathmandu to Jiri, offering a deeper and more enriching adventure compared to standard Everest treks. It allows for a gradual ascent, helping your body acclimatize effectively while exploring the diverse lower Khumbu area. From the vibrant trails of Jiri, you will pass through charming villages such as Deurali, Sete, Junbesi, Nunthala, and Paiya before merging with the main Everest trail at Phakding. 

As you progress, the path winds through stunning rhododendron and pine forests, offering insights into the unique lifestyles of the Rai and Sherpa communities. The trek continues upwards to Namche Bazaar, Dole, and Machhermo, eventually reaching the breathtaking Gokyo Lakes (4790 m). A hike up Gokyo Ri (5360 m) rewards you with sweeping views of Everest and neighboring peaks. The adventure then challenges you with crossing the Cho La Pass (5330 m), proceeding to Gorakshep, Everest Base Camp (5380 m), and culminating with a spectacular sunrise at Kala Patthar (5545 m). 

Who Can Do This Trek?
This extended journey is suitable for physically fit individuals capable of walking 5 to 7 hours daily on undulating terrains. While prior trekking experience is not strictly required, strong physical stamina and mental endurance are crucial for this over three-week expedition. It is the perfect choice for adventure enthusiasts, culture lovers, and experienced trekkers looking to avoid crowded trails while enjoying a gradual acclimatization process.`,
  facts: {
    "Country": "Nepal",
    "Duration": "22 Days",
    "Trip Grade": "Hard",
    "Max. Altitude": "5545 meters",
    "Starts": "Kathmandu",
    "Ends": "Kathmandu",
    "Activities": "Walking / Hiking",
    "Accomodation": "Hotels / Lodges",
    "Meals": "Breakfast, Lunch & Dinner",
    "Best Time": "Spring & Autumn"
  },
  highlights: [
    "Embark on a scenic drive from Kathmandu to Jiri to commence the trek.",
    "Traverse verdant valleys, terraced landscapes, and traditional villages, absorbing the authentic rural Nepalese culture.",
    "Explore the UNESCO World Heritage Site of Sagarmatha National Park.",
    "Discover Namche Bazaar, the bustling gateway and cultural epicenter of the Everest region.",
    "Experience the Everest View Hotel, the highest luxury hotel globally, offering 360-degree Himalayan views.",
    "Visit the spiritually significant Tengboche Monastery.",
    "Marvel at the crystal-clear Gokyo Lakes (4790 m) and ascend Gokyo Ri (5360 m) for unmatched panoramic mountain views.",
    "Reach the legendary Everest Base Camp (5360 m) and witness the magnificent Khumbu Glacier.",
    "Conquer the thrilling Cho La Pass (5330 m), enjoying views of Mt. Cho Oyu and other 7000+ meter peaks.",
    "Engage with local Sherpa and Rai communities, experiencing their warm hospitality.",
    "Conclude with a breathtaking scenic flight from Lukla back to Kathmandu."
  ],
  itinerary: [
    { day: 1, title: "Arrival in Kathmandu", details: "Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you will be transferred to your hotel. Later, enjoy a pre-trek briefing with your guide." },
    { day: 2, title: "Drive from Kathmandu to Jiri (1905m)", details: "A scenic 6-7 hour drive takes us from Kathmandu to Jiri, the starting point of our classic Everest trek." },
    { day: 3, title: "Trek from Jiri to Deurali (2705m)", details: "We start our trek by ascending through beautiful forests and passing through small villages to reach Deurali." },
    { day: 4, title: "Trek from Deurali to Sete (2575m)", details: "The trail descends to the Likhu Khola and then ascends steeply to the small Sherpa village of Sete." },
    { day: 5, title: "Trek from Sete to Junbesi (2675m)", details: "A challenging climb takes us over the Lamjura La pass (3530m) before descending into the picturesque village of Junbesi." },
    { day: 6, title: "Trek from Junbesi to Nunthala (2220m)", details: "Enjoying the first views of Everest, we cross the Taksindu La pass and descend to Nunthala." },
    { day: 7, title: "Trek from Nunthala to Bupsa (2360m)", details: "The trail drops to the Dudh Koshi river before climbing steeply through terraced fields to Bupsa." },
    { day: 8, title: "Trek from Bupsa to Surke (2290m)", details: "We continue our ascent, passing through forests and crossing streams to reach the village of Surke." },
    { day: 9, title: "Trek from Surke to Phakding (2610m)", details: "We join the main Everest trail today, passing through Chaurikharka to reach Phakding." },
    { day: 10, title: "Trek from Phakding to Namche Bazaar (3440m)", details: "We cross the Hillary suspension bridge and ascend steeply to Namche Bazaar, the gateway to Everest." },
    { day: 11, title: "Acclimatization Day in Namche Bazaar", details: "A rest day for acclimatization. We hike to the Everest View Hotel for magnificent views of Everest and Ama Dablam." },
    { day: 12, title: "Trek from Namche Bazaar to Dole (4038m)", details: "Leaving the main EBC trail, we head towards the Gokyo Valley, climbing steadily through rhododendron forests to Dole." },
    { day: 13, title: "Trek from Dole to Machhermo (4470m)", details: "A relatively short but scenic trek takes us further up the valley to Machhermo." },
    { day: 14, title: "Trek from Machhermo to Gokyo (4790m)", details: "We ascend the Ngozumpa Glacier moraine and arrive at the stunning turquoise waters of the Gokyo Lakes." },
    { day: 15, title: "Hike to Gokyo Ri (5360m) and Trek to Thagnak (4700m)", details: "Early morning hike to Gokyo Ri for spectacular panoramas, then we cross the glacier to reach Thagnak." },
    { day: 16, title: "Cross Cho La Pass (5330m) to Dzongla (4830m)", details: "A challenging day crossing the icy Cho La pass, offering incredible views, before descending to Dzongla." },
    { day: 17, title: "Trek from Dzongla to Lobuche (4910m)", details: "We rejoin the main EBC trail, trekking gently to the settlement of Lobuche." },
    { day: 18, title: "Trek to Everest Base Camp (5364m) & return to Gorakshep", details: "The big day! We trek to Everest Base Camp, celebrating our achievement before returning to Gorakshep for the night." },
    { day: 19, title: "Hike to Kala Patthar (5545m) & Trek to Pheriche (4240m)", details: "Early hike up Kala Patthar for the best sunrise views of Everest. Then we begin our descent down to Pheriche." },
    { day: 20, title: "Trek from Pheriche to Namche Bazaar (3440m)", details: "A long but easier descent brings us back to the vibrant Namche Bazaar." },
    { day: 21, title: "Trek from Namche Bazaar to Lukla (2840m)", details: "Our final day of trekking takes us back to Lukla, where we celebrate the end of an incredible journey." },
    { day: 22, title: "Flight from Lukla to Kathmandu", details: "A thrilling morning flight brings us back to Kathmandu. Transfer to hotel for rest and departure." }
  ],
  costDetails: {
    includes: [
      "Airport transfers",
      "Kathmandu hotel accommodations",
      "Flight from Lukla to Kathmandu",
      "All necessary permits (Sagarmatha National Park, Gaurishankar National Park, Khumbu Pasang Lhamu Rural Municipality)",
      "Meals and accommodations during the trek",
      "Experienced guide and porters"
    ],
    excludes: [
      "International flights and Nepal Visa",
      "Personal trekking gear",
      "Travel insurance",
      "Personal expenses and tips"
    ]
  },
  faqs: [
    {
      question: "Is the Jiri to Everest Base Camp trek difficult?",
      answer: "Yes, it is a demanding trek graded as 'Hard'. It requires walking 5-7 hours daily for 22 days, crossing high passes, and reaching altitudes up to 5545m. Good physical fitness is essential."
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
    location: "Everest Region",
    category: "Treks",
    tripCode: "DNTT/J-EBC/22",
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
console.log('Jiri to Everest Base Camp 22 Days Trek added successfully!');
