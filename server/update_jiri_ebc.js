const fs = require('fs');

const databasePath = './database.json';

// Read the database
let rawdata = fs.readFileSync(databasePath);
let data = JSON.parse(rawdata);

// Find the trek
const trekId = "jiri-to-everest-base-camp-22-days";
const trekIndex = data.treks.findIndex(t => t.id === trekId);

if (trekIndex !== -1) {
  const trek = data.treks[trekIndex];

  // Append new sections to overview
  trek.overview += `\n\n### Alternatives For Jiri To EBC Trek In Nepal\nIf you’re looking for other trekking options besides the long Jiri to Everest Base Camp route, Nepal offers many beautiful and rewarding alternatives that vary in duration, difficulty, and scenery. Here are some great choices:\n\n*   **Everest Base Camp (EBC) Trek via Lukla:** This is the most popular and direct route to Everest Base Camp, usually completed in 12–14 days. It includes scenic mountain views, visits to Sherpa villages, and key highlights like Namche Bazaar, Tengboche Monastery, and Kala Patthar.\n*   **Gokyo Lake Trek:** A peaceful and scenic trek that focuses on the stunning Gokyo Lakes. It includes a hike to Gokyo Ri for breathtaking views of Everest, Lhotse, Makalu, and Cho Oyu. Ideal for those wanting fewer crowds.\n*   **EBC and Gokyo via Cho La Pass:** This combines both Everest Base Camp and Gokyo Lakes, with the adventure of crossing the Cho La Pass (5,330 m). A great middle-ground option for trekkers who want a more challenging route but not the full three passes.\n*   **Other Treks Near Kathmandu:** If you’re short on time or prefer something easier, the Langtang Valley Trek or Tamang Heritage Trail are great options. These treks offer beautiful mountain views and rich cultural experiences closer to Kathmandu.\n\nAll of these treks can be customized based on your time, interests, and fitness level. Whether you're seeking a classic Everest experience or something quieter, there's a trek in Nepal for everyone.\n\n### Why Asian Adventure Treks & Expedition for 22 Days Jiri to Everest Base Camp Trek?\nChoosing Asian Adventure Treks & Expedition means traveling with trusted local experts who truly care about your experience, safety, and the mountains.\n\nWith over 20 years of experience, we specialize in responsible and sustainable tourism. We balance adventure with your comfort by managing all logistics including permits, transportation, lodge bookings, and ensuring your walking pace and altitude gain are well-planned for a safe and successful trek.\n\nWe don’t just guide you over high passes; we deliver a complete Himalayan experience. Our licensed local guides and porters offer deep insight into Sherpa culture and help support the local communities you visit.\n\nWhether you're a fit beginner or a seasoned high-altitude trekker, we customize the trek to suit your pace, preferences, and goals. With us, every detail is handled so you can focus on enjoying the landscapes, crossing some of the world’s highest trails, and making unforgettable memories.\n\nWe believe Asian Adventure Treks & Expedition can be your reliable partner in this once-in-a-lifetime Himalayan journey where every step is guided with care, local expertise, and deep respect for Nepal’s mountains and people.\n\n### Lukla Flight Information\n**Flight from Ramechhap (March, April, May, October & November)**\nDuring the peak seasons of Spring (March to May) and Autumn (October to November), due to the high volume of tourists and maximum flights to Lukla, the Government of Nepal normally decides to operate flights from Ramechhap instead of Kathmandu to avoid air traffic. If flying from Ramechhap, we will have to wake up at 1 or 2 AM and take a 5–6-hour drive from Kathmandu to Ramechhap in a private or shared vehicle. From Ramechhap, we will take a 20-minute flight to Lukla.\n\n**Flight from Kathmandu (December - September)**\nDuring the off-peak months from December to September (Winter/Monsoon), due to fewer tourists, flights to Lukla operate directly from Kathmandu. We have to wake up at about 5 or 6 AM, meet the guide at the hotel, drive to TIA airport, and take a 35-minute flight to Lukla.`;

  // Update gallery
  trek.gallery = [
    "/images/Lukla Airport 1.jpg",
    "/images/Phakding 4.jpg",
    "/images/On The Way To Lukla.jpg",
    "/images/On The Way To Namche 1.jpg",
    "/images/View From Everst View Hotel.jpg",
    "/images/Tengboche.jpg",
    "/images/Everest Trekking.jpg",
    "/images/Clients In Everest Trek Nepal.jpg",
    "/images/Everest Trek Kalapathar 1.jpg",
    "/images/Everest Trek 2.jpg",
    "/images/Rek From Jiri.jpg",
    "/images/Everest Base Camp Nepal 1.jpg",
    "/images/Everest Base Camp Trek 1.jpg",
    "/images/Everest Trek From Jiri.jpg",
    "/images/Achermmo.jpg",
    "/images/Gokyo Ri Of Everest Trek 1.jpg"
  ];

  // Update detailed itinerary
  trek.itinerary = [
    {
      day: 1,
      title: "Arrival in Kathmandu (1350 m)",
      details: "Upon arrival at Tribhuvan International Airport (TIA) in Kathmandu, you will be greeted by our correspondent who will assist with your transfer to the hotel. Once checked in, we will arrange a pre-trip meeting where we will brief in short about the trek, answer any queries you have and meet your trekking guide as well. After the short brief, you can relax and spend rest of the day at your leisure. Stay overnight at the hotel."
    },
    {
      day: 2,
      title: "Kathmandu – Bhandara (2190 m) via Jiri (1955 m)",
      details: "This day you will have breakfast in the early morning and then prepare to begin the journey to Bhandara via Jiri. The drive will be from Kathmandu to Bhandara via Jiri which is in the eastern mountain range. During the drive you can see view of Ganesh Himal, Dorje Lakpa, Lirung, Langtang and more enjoying uphill and downhill drive. It takes about 10 hours (216 km) in private vehicle to reach village of Bhandara. You can explore around Monastery, government school and coffee farming in the village of Bhandara. Stay overnight at lodge.",
      highlights: [
        "Max Altitude: 2,190m / 7,185ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 10 hours",
        "Distance: 216 km",
        "Accommodation: Lodge",
        "Mode of Travel: Private vehicle"
      ]
    },
    {
      day: 3,
      title: "Bhandara - Sete (2580 m)",
      details: "This day you will have breakfast in the morning and then begin the first day of Jiri - EBC trek with Gokyo to Sete which takes about 7 hours. You have to walk uphill for about 3.5 hours to reach Kinja (1630 m) and have lunch here. From Kinja you will cross Kinja Khola and then walk another 3.5 hours on straight uphill trial to reach Sete. Stay overnight at the lodge. Today you will be passing through the rhododendron forest and some villages to reach Sete. Stay overnight at lodge.",
      highlights: [
        "Max Altitude: 2,580m / 8,464ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7 hours",
        "Distance: 7.5 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 4,
      title: "Sete - Junbesi (2700 m)",
      details: "This day you will have breakfast in the morning and then begin to trek towards Junbeshi which takes about 7 hours. At beginning walk uphill trial for about 4 hours and reach Lamjura Pass (3530 m). On the way you can see beautiful views of Pikey Peak, Meara Peak, Gaurisanker and so on. After having lunch in Lamjura Pass you will start to descend through the Rhododendron Forest for about 3 hours to reach Junbesi. Junbesi is a beautiful settlement of Sherpa people, as you reach here, explore around monastery, and sherpa village. Stay overnight at lodge.",
      highlights: [
        "Max Altitude: 2,700m / 8,858ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7 hours",
        "Distance: 12 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 5,
      title: "Junbeshi - Nunthala (2194 m)",
      details: "This day you will have breakfast in the morning & trek towards Nunthala which takes about 8 hours. Today will be quite longer day than before but not so hard. At first, walk straight ascending trial for about 3.5 until you reach reach Ringmu village (2720m). You can have lunch here and then rest for a while and again walk uphill trial for another 1 hour until you reach Taksindu (2960 m). From here, you can see amazing views of Mera Peak if weather is clear. On the way you can explore around Tibetan Monastery here in Taksindu and then again walk another 3.5 hours descending trial until you reach Nunthala. Nunthana is also a local village with the settlement of Sherpa, Rai and Limbu. Stay overnight at lodge.",
      highlights: [
        "Max Altitude: 2,194m / 7,198ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 8 hours",
        "Distance: 17 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 6,
      title: "Nunthala – Bupsa (2340 m)",
      details: "This day you will have breakfast in the morning & trek towards Bupsa via Paiya which takes about 7 hours. Today begin the trek by walking through descending trial for about 3 hours and reach Dudh Koshi River and cross suspension bridge and then start walking uphill trial for about 2 hours Khari Khola, have lunch there and rest for a while. Khari Khola is one of the big village of Sherpa community and here you can see Tibetan monastery, locals and people engaged in terraced farming and so on. From Khari Khola, again walk ascending and straight trial for another 2 hours to reach Bupsa. Stay overnight at lodge.",
      highlights: [
        "Max Altitude: 2,340m / 7,677ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7 hours",
        "Distance: 13 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 7,
      title: "Bupsa – Chheplung (2660 m)",
      details: "This day you will have breakfast in the morning and then start walking towards Chheplung which takes about 7 hours. Begin by walking straight uphill trial on rhododendron and bamboo forest until for about 1 hour until Tham Danda. From here, walk zig zag trial for another in same forest way for about 4.5 hours until you reach Surke. You will have lunch in Surke, rest for a while and then again start trekking towards Chheplung which takes about 2.5 hours. Stay overnight at lodge.",
      highlights: [
        "Max Altitude: 2,660m / 8,727ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7 hours",
        "Distance: 16 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 8,
      title: "Chheplung – Namche Bazaar (3440 m)",
      details: "This day you will have breakfast in the morning and then start walking towards Namche Bazzar which takes about 7 hours. Today's walk will be zigzag trial for about 2.5 hours until Phakding. From Phakding, following the modern trek route of Everest – Gokyo Chola Pass trek start walking zigzag trial until you reach Namche Bazar. As you head towards Namche, pass through Monjo where there is National Park permit counter. On the way to Namche, you can see first glimpse of mountains like: Kusum Kangru, Thamserku and so on. Namche Bazar is a beautiful town of Everest having monastery, and many markets for shopping. We will be amazed by the first glimpse of Namche Bazar as we reach there. Stay overnight at lodge.",
      highlights: [
        "Max Altitude: 3,440m / 11,286ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7 hours",
        "Distance: 14 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 9,
      title: "Day of Acclimatization at Namche Bazaar (3440 m)",
      details: "Today will be the acclimatization day in Namche Bazar. As trekking in higher elevations can lead to altitude sickness, you have to make sure to acclimatize so that our body can adapt with increasing elevation.\n\nIn the morning, you will have breakfast in the hotel and get ready to hike for about 4 hours to the monastery above Namche Bazar, explore around: Syangboche and Khumjung village and finally to the luxurious hotel at highest altitude: Everest View Hotel. From the hotel, you can see first view of Mount Everest, and other beautiful Himalayas like: Mount Ama Dablam, Mount Lhotse, Mount Nuptse and so on.\n\nToday’s hike will serve us for acclimatization and where you will enjoy magnificent views of Everest. As you return back to Namche Bazar, in the afternoon you will have free time to wander around and visit the markets, purchase trekking equipment’s (if needed), local handicrafts and so on around Namche Bazar. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 3,440m / 11,286ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 3-4 hours",
        "Distance: 4 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 10,
      title: "Namche Bazar – Phortse Tenga (3680 m) – Dole (4200 m)",
      details: "This day you will have breakfast in the morning (around 7 am) and then get ready to trek towards Dole via Phortse Tenga which takes about 6-7 hours of walking.\n\nToday's journey starts by walking through the straight uphill trials until you reach Mongla Pass (3972 m) which takes about 3 hours. This is a wonderful place and from where you can see the beautiful view of Mount Amadablam and Chorten. Here stop for a while to acclimatize and take pictures. Later continue to descent to Phortse Tenga for about 1 hour. You will have lunch in Phortse Tenga.\n\nFrom Phortse, walking ascending uphill trial for about 2-3 hours you will reach Dole. On the way you can see the yaks passing by, waterfalls, cross small wooden bridges. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 4,200m / 13,779ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 6-7 hours",
        "Distance: 11 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 11,
      title: "Dole – Machermo (4470 m)",
      details: "This day we will have breakfast in the morning (7 am) and get ready to head toward Machermo which takes about 4-5 hours of walking.\n\nToday as we leave Dole, we will have to walk through the steep climb up to 4000 m from where we can see view of Dole village and landscape nearby. Then after we will pass through the towns of Labharma and Luza until will reach Machermo. On the way to Machermo, we can see beautiful view of Mount Amadablam and Thamserku Himalays. We will Machermo by lunch time.\n\nIt is possible to have free day in Machermo or after lunch we can hike to nearby hills for acclimatization. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 4,470m / 14,665ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 4-5 hours",
        "Distance: 5.5 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 12,
      title: "Machermo – Gokyo (4790 m)",
      details: "This day after having breakfast you head towards Gokyo from Machermo which takes about 4-5 hours.\n\nAs you continue the trek to Gokyo, you will have to walk through some straight and ascending trials. You can see beautiful views of Himalayas on the way and cross some small bridges too. And before Gokyo valley, you can see the 1st Gokyo Lake and then from there walking straight trial for about 1 hour finally reach Gokyo valley. As you reach towards Gokyo, you will be stunned by the amazing view of turquoise Gokyo Lake, also possible to see yaks gazing around Gokyo.\n\nCrossing by side of Gokyo lake you reach lodge in Gokyo. You will have lunch in Gokyo and then explore around the glacier and lakes in the afternoon. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 4,790m / 15,715ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 4-5 hours",
        "Distance: 7 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 13,
      title: "Gokyo – Gokyo Ri (5360 m) - Thagnag (4700 m)",
      details: "Today is one of the important day of the trekking, You will have to wake up in the early morning (4:30 – 5 am) and then get ready to hike 1.8 km uphill to Gokyo Ri (4773 m) which takes about 3 hours.\n\nClimbing Gokyo Ri is totally ascending uphill trial but the view from the top of Gokyo Ri is totally worth it! We can enjoy the panoramic view of the Himalayas like Mount Everest, Mount Makalu, Mount Lhotse, Ama Dablam, Thamserku and so on. Along with the views of magnificent peaks, you can also see glaciers and very breautiful views of Gokyo Lakes. After enjoying the view from Gokyo Ri, descend back to Gokyo in lodge which takes about 1.5 hours.\n\nBesides these mountains, you can see magnificent peaks, Gokyo Lakes, glaciers and panoramic views.\n\nAfter arrival in the lodge in Gokyo lodge, you will have breakfast and rest for a while. Thenafter prepare to continue our trek to Thagnang which takes about 3 hours. Walking little uphill trial from you can see amazing view of Gokyo Lake and valley, & then bid farewell to Gokyo and descend downhill towards Thagnang. Now walking through the Nangjungma glacier trials for about 40 minutes and then again walking uphill and straight trials you reach Thagnang. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 4,700m / 15,419ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 6-7 hours",
        "Distance: 10 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 14,
      title: "Thagnag – Chola Pass (5330 m) – Dzonglha (4830 m)",
      details: "This day is also another very important day of the trek as we will be crossing the Chola Pass (5330 m). You will have to trek towards Dzongla via Chola Pass which takes about 7 hours of walking.\n\nToday also you wake up in early morning around 4 am – 5 am and have early morning breakfast. After breakfast you start the trek with a steep climb uphill, and after walking about 1.5 hours you reach a pass at 5000 m from where you can can see the Chola Pass. Today you have to walk slow and steady as you will be going to highest altitude.\n\nYou continue climbing for about 3 hours in the rock and then you cross the Chola Pass, (5330 m). Upon reaching Chola Pass we can see mesmerizing views of Cho Oyu and beautiful Everest Range. After resting for a while in Chola Pass and having packed lunch in the pass or right before pass, you have to descend back through a long valley until Dzonglha.\n\nFor today’s pass trekking gearls like: crampons, trekking poles for safety are suggested!",
      highlights: [
        "Max Altitude: 4,830m / 15,846ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7 hours",
        "Distance: 8.8 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 15,
      title: "Dzonglha – Gorakshep (5140 m)",
      details: "This day after having breakfast in Dzongla we will start trekking to Gorakshep, which is the final destination to reach Kalapathar (5445 m) and Everest Base Camp (5360 m).\n\nFrom Dzongla we can see breathtaking view of towering peaks like: Cholatse (6440 m), Taboche (6495 m) & Lobuche (6119 m) and so on as we pass through Dzongla.\n\nYou continue the trek for about 3-4 hours walking through the uphill trials until Lobuche (4910 m). You will rest for a while in Lobuche and from there we will continue our trek to Gorakshep.\n\nGorakshep is the last sleeping point of the trek from where you hike to Everest Base Camp & Kalapatthar. We continue the trek walking uphill and then some rocky trials also walk on the left bank of the glacier until we reach Gorakshep. From Lobuche, we will have to walk uphill for about 1 hour and then walk through the rocky ways for about 2 hours to reach Gorakshep. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 5,140m / 16,863ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 6 hours",
        "Distance: 11 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 16,
      title: "GorakShep – Kala Patthar (5545 m) – EBC (5360 m) - Lobuche (4910 m)",
      details: "Today is the greatest as well as important day of the trek. Today we will enjoy the most amazing site from Kalapatthar and Everest Base Camp.\n\nBefore having breakfast, we will wake up early in the morning (4-5 am) and then get ready to hike towards Kalapatthar (5545 m) – meaning Black Stone which takes about 3 hours uphill walk. From the top of Kalapatthar we can see breathtaking 360-degree views of Mount Everest, Mount Nuptse, Mount Lhotse, Mount Pumori, Amadablam, Cho Oyu and so on. After enjoying the view from top, we descend back to Gorakshep and then we will have breakfast.\n\nIf weather permits, we can also go to Everest Base Camp which takes about 2 hours from Goraksep. We can take the picutres and see the amazing view from EBC and then return back to Lobuche which takes about 3-4 hours. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 4,910m / 16,108ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7 hours",
        "Distance: 8 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 17,
      title: "Lobuche - Tengboche (3860 m)",
      details: "This day after having breakfast in Lobuche you will head towards Tengboche which takes about 7-8 hours of walking. The route descends from Lobuche to the Imja Khola valley, then you will cross a wooden bridge and the path turns upwards until we reach Tengboche. Taking advantage of this day to visit the famous Tengboche Monastery, an emblematic place of local Buddhist culture.You can also visit it in the afternoon and meet the lama who live in it. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 3,860m / 12,664ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7-8 hours",
        "Distance: 14 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 18,
      title: "Tengboche (3860 m) – Namche Bazar (3440 m)",
      details: "This day you will have breakfast and start the day with beautiful views of Everest and Lhotse. The trek begins with a steep descent until crossing the river in the town of Phumki. Continuing to Namche Bazar trek for another 3 hours. Explore around Namche Bazar, the market, cafe, restaurant and so on in the evening. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 3,440m / 11,286ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 5-6 hours",
        "Distance: 9.5 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 19,
      title: "Namche Bazar – Phakding – Lukla (2840 m)",
      details: "After having breakfast in the lodge, you will descend back towards Lukla through the same trial via Phakding. As you trek back to Lukla we get to spend the last night in the Khumbu region of Everest. You will descend towards Phakding from Lukla in about 3.5 hours have lunch in Phakding. From here, we will again descend towards Lukla through the zigzag trial in another 4.5 hours.\n\nUpon arrival in Lukla, enjoy your last stay in Khumbu region, have group dinner and enjoy your final stay with warm memories and lifetime adventure in Khumbu region just spent. Stay overnight at Lodge.",
      highlights: [
        "Max Altitude: 2,840m / 9,317ft",
        "Meals: Breakfast, Lunch & Dinner",
        "Duration: 7-8 hours",
        "Distance: 17.5 km",
        "Accommodation: Lodge"
      ]
    },
    {
      day: 20,
      title: "Lukla – Kathmandu",
      details: "Today in the early morning (6 am onwards) you will take a flight from Tenzing Hillary Airport (an \"eagle's nest\") to fly to Kathmandu or Ramechhap (subject to availability). The time of the flight will depend on the weather conditions. After arrival in Kathmandu and you can rest whole day. Stay overnight at hotel.",
      highlights: [
        "Max Altitude: 1,350m / 4,429ft",
        "Meals: Breakfast",
        "Duration: 35 minute",
        "Distance: 138 km",
        "Accommodation: Hotel",
        "Mode of Travel: Flight"
      ]
    },
    {
      day: 21,
      title: "Free day in Kathmandu",
      details: "Free day in Kathmandu for sightseeing / shopping / massage. We can do half day sightseeing in the UNESCO listed World Heritage sites like:\n\nSwoyambhunath: Also known as the Monkey Temple, it offers panoramic views of Kathmandu.\nBoudhanath: One of the largest stupas in the world and a UNESCO World Heritage Site.\nPashupatinath: A sacred Hindu temple complex on the banks of the Bagmati River.\nStay overnight at Hotel in Kathmandu.",
      highlights: [
        "Max Altitude: 1,350m / 4,429ft",
        "Meals: Breakfast",
        "Accommodation: Hotel"
      ]
    },
    {
      day: 22,
      title: "Departure from Kathmandu",
      details: "Enjoy your last day in Kathmandu before departure. At your scheduled departure time, our correspondent will pick you up from the hotel, transfer you to the airport, and bid you farewell with warm hearts."
    }
  ];

  // Write back to the file
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  console.log('Jiri to Everest Base Camp 22 Days Trek updated successfully!');
} else {
  console.log('Trek not found');
}
