const fs = require('fs');

const path = './src/data/treksData.js';
let content = fs.readFileSync(path, 'utf8');

const newItinerary = [
  {
    day: 1,
    title: "Arrival in Kathmandu",
    details: "Upon arrival at Tribhuvan International Airport (TIA) in Kathmandu, you will be greeted by our correspondent who will assist with your transfer to the hotel. Once checked in, we will arrange a pre-trip meeting where we will brief in short about the trek, answer any queries you have and meet your trekking guide as well. After the short brief, you can relax and spend rest of the day at your leisure. Stay overnight at the Hotel in Kathmandu.",
    highlights: {
      "Max Altitude": "1,350m / 4,429ft",
      "Duration": "40 minute",
      "Distance": "6 km",
      "Accommodation": "Hotel",
      "Mode of Travel": "Private vehicle"
    }
  },
  {
    day: 2,
    title: "Kathmandu – Lukla (2840 m) – Phakding (2610 m)",
    details: "This day after an early breakfast at the hotel, meet your guide and drive to the domestic terminal of Tribhuvan International Airport for a 35-minute scenic and adventurous flight to Lukla in the Everest region, weather permitting.\n\nUpon landing at Tenzing-Hillary Airport in Lukla (2840 m), rest briefly in the lodge of Lukla and meet your Sherpas at the lodge, and prepare to begin the first day trek to Everest Base Camp. Walking 3 hours some ascending and straight trials you reach Phakding (2610m). Along the way you pass through Lukla Bazaar, offering unforgettable views of terraced landscapes, river valleys, Sherpa villages, and up-close perspectives of some of the world's highest mountains. Stay overnight at a lodge in Phakding.",
    highlights: {
      "Max Altitude": "2,610m / 8,562ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "3 hours",
      "Distance": "7.5 km",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 3,
    title: "Phakding - Namche Bazar (3440 m)",
    details: "This day you will have breakfast in the early morning and begin the journey towards Namche Bazzar which takes about 5-6 hours of walking.\n\nAt the beginning of the trek, you have to walk straight uphill path and then cross the Dhud Khosi River several times. After walking for about 1.5 hours you will reach Monjo village (2835 m). Then from Monjo continue the trek along steep zig-zag trial. On the way you cross waterfall, pass through one of the biggest and amazing suspension bridge. After almost 5 to 6 hours of walking you will reach Namche Bazar. The first view of Namche Bazar with the stupa, monastery, lodges and the beautiful gates is amazing.\n\nNamche Bazar is the main gateway to the Nepal's Himalayas of Everest region. Namche Bazar is also known as “Sherpa capital,” - a vibrant town known for its stunning mountain views, cultural richness, and importance as a trading and acclimatization hub for trekkers and climbers heading towards Everest Base Camp, Gokyo Lakes, or Everest Three Passes trek..Stay overnight at Lodge in Namche Bazar.",
    highlights: {
      "Max Altitude": "3,440m / 11,286ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "5-6 hours",
      "Distance": "11 km",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 4,
    title: "Acclimatization at Namche Bazar & Hike to Everest View Hotel (3440 m)",
    details: "Today will be the acclimatization day in Namche Bazar. As trekking in higher elevations can lead to altitude sickness, you have to make sure to acclimatize so that your body can adapt with increasing elevation.\n\nIn the morning, after breakfast in the hotel and get ready to hike for about 4 hours to the monastery above Namche Bazar, then after your guide will accompany you to Syangboche and Khumjung village and finally to the luxurious hotel at highest altitude: Everest View Hotel. From the hotel, you can see first view of Mount Everest, and other beautiful Himalayas like: Mount Ama Dablam, Mount Lhotse, Mount Nuptse and so on. You can rest and have some tea in the hotel.\n\nToday will be the first day when you get to enjoy magnificent views of mighty Mount Everest (8848 m). As you return back to Namche Bazar, in the afternoon you will have free time to wander around and visit the markets, purchase trekking equipment’s (if needed), local handicrafts and so on around Namche Bazar. Stay overnight at Lodge in Namche Bazzar.",
    highlights: {
      "Max Altitude": "3,440m / 11,286ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "4-5 hours",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 5,
    title: "Namche Bazaar - Tengboche (3860 m)",
    details: "This day you will have breakfast in morning and then begin the journey to Tengboche which takes about 5 hours of walking.\n\nToday trek will be through the most scenic route of Everest from where we can see Dudh Koshi River and on the way, you can see scenic view of Mount Ama Dablam, Mount Lhotse, Mount Nuptse, Mount Everest, Mount Kangtega, Thamserku and many more. As you leave Namche Bazar, walk through the descending trial along the Dudh Koshi valley until you reach Phungi Thanga. You get to see most amazing view of Mount Ama Dablam and monastery near Phungi Thanga, a best place to take the picture of nature, mountain and monastery. After resting for a while in Phungi Thanga, cross the suspension bridge and walk uphill trial for about 3 hours to reach Tengboche.\n\nTengboche is one of the famous destinations with old monastery for the travelers in khumbu region of Nepal, here you can visit the Tengboche monastery and pray with monks in the evening or morning with Lamas. Stay overnight at Lodge in Tengboche.",
    highlights: {
      "Max Altitude": "3,860m / 12,664ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "5 hours",
      "Distance": "10 km",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 6,
    title: "Tengboche - Dingboche (4410 m)",
    details: "This day you have breakfast in morning gear yourself to trek towards Dingboche which takes about 5-6 hours of walking.\n\nBefore you head to Dingboche, you can see mesmerizing view of sunrise on Mount Amadablam, Mount Everest, Mount Lhotse and Thamserku from Tengboche. You have to walk through the alpine forest crossing Imja Khola (river) through the suspension bridge on the way to reach Dingboche. You will also pass through different villages like: Debuche, Pangboche before Dingboche Village. On the way you can also see mani walls, prayer flags, yaks gazing, and so on. Just before Dingboche is a beautiful village with settlement of Sherpa people in Everest region of Nepal. It is also known as \"summer valley\" due to its warmer sun exposure compared to neighboring villages. Dingboche is a common acclimatization point for trekkers heading toward Everest Base Camp, Island Peak, or Ama Dablam. Stay overnight at Lodge in Dingboche.",
    highlights: {
      "Max Altitude": "4,410m / 14,468ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "5-6 hours",
      "Distance": "12.5 km",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 7,
    title: "Acclimatization in Dingboche (4410 m)",
    details: "Today is a rest and acclimatization day in Dingboche. Though today is a \"rest day,\" it’s important to stay active to acclimatization.\n\nMeanwhile to adapt with the altitude and changing environment and prevent ourself from altitude sickness we can hike to Nangkartsang peak (5510 m) which takes about 3.5 hours to reach there and 2 hours to descend back. This hike is great opportunity to see the amazing view of Makalu (8,485 m), Lhotse (8,516 m), Ama Dablam (6,812 m), Island Peak, and Cho Oyu (8,188 m) on a clear day.\n\nAfter the hike, return to Dingboche for a relaxed afternoon. You can explore the village, interact with the local Sherpa people, or rest at the lodge. The landscape around Dingboche, with its traditional stone walls, potato fields, and wide open valleys, is both peaceful and picturesque. Stay overnight at Lodge.",
    highlights: {
      "Max Altitude": "4,410m / 14,468ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "5-6 hours",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 8,
    title: "Dingboche - Lobuche (4940 m)",
    details: "This day you will have breakfast in morning and then prepare to continue the journey to Lobuche which takes about 5 hours of walking uphill trials.\n\nYou have to walk through the straight ascending trial to climb towards Pheriche valley. Passing through the alpine scrub and yak pastures along with the beautiful view of mountains behind. You can see the memorial statues of climbers who passed away during the expeditions in Everest and then from there walking further, you reach Thukla Pass. You will rest there for a while and begin to walk towards Lobuche. Here, in Lobuche you will have basic place for lodging. Stay overnight at Lodge in Lobuche.",
    highlights: {
      "Max Altitude": "4,940m / 16,207ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "5 hours",
      "Distance": "8 km",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 9,
    title: "Lobuche - EBC (5360 m) - Gorak Shep (5140 m)",
    details: "This day you will have breakfast in early morning and then hike for about 2 hours to reach Gorakshep. From Lobuche we have to walk through the rocky ways, uphill trial to reach Gorakshep. Today is one of the important day of the Everest Base Camp trek where you will be able to reach the foot of world tallest mountain - Mount Everest's base camp - EBC.\n\nAs we reach Gorakshep, we will keep your luggage in the lodge and then go to the main destination of the trek, Everest Base Camp (5360 m). If weather is clear, you can see amazing view of Mount Everest followed by Mount Nuptse, Mount Lhotse and so on. Also, you can see Khumbu Glaciers from here. After enjoying the scenic view in EBC return back to Gorakshep. Stay overnight at Lodge in Gorakshep.",
    highlights: {
      "Max Altitude": "5,140m / 16,863ft",
      "Meals": "Breakfast, Lunch & Dinner",
      "Duration": "6-7 hours",
      "Distance": "11.5 km",
      "Accommodation": "Lodge"
    }
  },
  {
    day: 10,
    title: "Gorak Shep - Kala Patthar (5550 m) – Lukla (2840 m) – Kathmandu (1350 m) by Heli",
    details: "Today is one of the most adventorous and thrilling day of the Everest Base Camp trek, where you will reach to the maximum altitute of the trek - Kalapathar (5545 m).\n\nYou will wake up in the early morning (4-5am) and begin to hike towards Kalapathar, the viewpoint of the trek. Walking uphill trial for addition 2.5 hours you will reach Kala Patthar - meaning \"Black Stone\" in Nepali. When you are ascending towards Kalapathar you can see mount Pumori right straight to your sight which gives the feeling like you are climbing Mount Pumori.From the top you can see beautiful 360-degree view of Everest Range; Mount Everest, Mount Nuptse, Mount Lhotse, Mount Pumori, Mount Ama Dablam and many more. After celebrating and capturing the successful climb to Kalapathar, descend back the lodge and have breakfast. After breakfast prepare to return back to Kathmandu and wait for the Helicopter to arrive at the Heli pad of Kala Patthar and fly back to Lukla. The helicopter will stopover in Lukla for fuel and then again fly back to Kathmandu from Lukla airport. Stay overnight at Hotel in Kathmandu.",
    highlights: {
      "Max Altitude": "1,350m / 4,429ft",
      "Meals": "Breakfast & Lunch",
      "Duration": "3-4 hours",
      "Accommodation": "Hotel",
      "Mode of Travel": "Flight"
    }
  },
  {
    day: 11,
    title: "Free day in Kathmandu",
    details: "Free day in Kathmandu for sightseeing / shopping / massage. We can do half day sightseeing in the UNESCO listed World Heritage sites like:\n\nKathmandu Durbar Square: This is a historical, cultural and religious heritage site in Kathmandu with amazing architecture of temples, monuments which represent the Nepalese identity.\nSwoyambhunath: Also known as the Monkey Temple, it offers panoramic views of Kathmandu.\nBoudhanath: One of the largest stupas in the world and a UNESCO World Heritage Site.\nPashupatinath: A sacred Hindu temple complex on the banks of the Bagmati River.\nStay overnight at Hotel in Kathmandu.",
    highlights: {
      "Max Altitude": "1,350m / 4,429ft",
      "Meals": "Breakfast",
      "Accommodation": "Hotel"
    }
  },
  {
    day: 12,
    title: "Departure from Kathmandu",
    details: "Enjoy your last day in Kathmandu before departure. At your scheduled departure time, our correspondent will pick you up from the hotel, transfer you to the airport, and bid you farewell with warm hearts.",
    highlights: {
      "Max Altitude": "1,350m / 4,429ft",
      "Meals": "Breakfast",
      "Duration": "40 minute",
      "Distance": "6 km",
      "Mode of Travel": "Private vehicle"
    }
  }
];

// Read as module and stringify the whole array for safety
// Actually, easier to use eval, manipulate and stringify back (though eval is unsafe, it works on JS object literals)
// Instead of modifying the whole file, we can do a regex replacement on ebc-heli-return itinerary

const itineryStr = JSON.stringify(newItinerary, null, 4);

content = content.replace(/"id": "ebc-heli-return"[\s\S]*?"itinerary": \[\s*\{[\s\S]*?\}\s*\]/, (match) => {
    return match.replace(/"itinerary": \[\s*\{[\s\S]*?\}\s*\]/, `"itinerary": ${itineryStr}`);
});

fs.writeFileSync(path, content, 'utf8');
console.log('Itinerary updated successfully!');
