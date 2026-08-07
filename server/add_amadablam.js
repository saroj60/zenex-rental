const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
try {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  const newTrek = {
    id: "amadablam-base-camp-11",
    title: "Amadablam Base Camp Trek - 11 Days",
    region: "everest",
    description: "Ama Dablam Base Camp Trek of 11 days in Khumbu region of Nepal is a spectacular short trek in the Everest region making it ideal for the trekkers seeking a close encounter with the Himalayas. Ama Dablam means ‘Mother Necklace’ in English. Without going all the way to Everest Base Camp, this scenic 11 days journey in Everest takes you deep into the heart of Sherpa culture, through vibrant villages, ancient monasteries, and breathtaking landscapes, all the way to the base of Mount Ama Dablam (6812 m), one of the most iconic and beautiful peaks in the world.\n\nFrom Ama Dablam Base Camp (4700 m), trekkers are rewarded with breathtaking panoramic views of some of the most iconic peaks in the Khumbu (Everest) region. The base camp is set in a wide, open alpine valley beneath towering Himalayan giants. This is one of the most beautiful and short trek in Khumbu region of Nepal.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop"
    ],
    price: "US$1150",
    originalPrice: "US$1200",
    rating: 4.9,
    reviewsCount: 143,
    difficulty: "Moderate",
    duration: "11 Days",
    maxElevation: "4700 meters",
    groupSize: "2-20 Pax",
    bestSeason: "Spring, Autumn & Winter",
    tripFacts: {
      "Country": "Nepal",
      "Duration": "11 Days",
      "Trip Grade": "Moderate",
      "Max. Altitude": "4700 meters",
      "Starts": "Kathmandu",
      "Ends": "Kathmandu",
      "Activities": "Walking / Hiking",
      "Accommodation": "Hotel / Lodge",
      "Meals": "Breakfast, Lunch & Dinner",
      "Best Time": "Spring, Autumn & Winter"
    },
    highlights: [
      "Explore the UNESCO-listed World Heritage sites of Sagarmatha National Park, home to diverse flora and fauna amidst breathtaking landscapes.",
      "Thrilling flight to Tenzing Hillary Airport in Lukla, offering unparalleled aerial views of the Himalayas.",
      "Discover the cultural heart of the Everest region in Namche Bazaar, bustling with activity and adorned with vibrant markets and traditional Sherpa architecture.",
      "Experience unparalleled luxury at the highest hotel on the planet, the Everest View Hotel, offering breathtaking vistas of the surrounding peaks.",
      "Visit the ancient Tengboche Monastery, a spiritual oasis nestled amidst the Himalayas, offering serenity and panoramic views of Everest and its neighboring peaks.",
      "Stand at the foot of Mount Ama Dablam, one of the most stunning peaks in Nepal",
      "Explore Sherpa villages and experience authentic Himalayan culture",
      "Easy & Short Trek in Everest region whcih can be done in winter season also"
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
        details: "This day after an early breakfast at the hotel, meet your guide and drive to the domestic terminal of Tribhuvan International Airport for a 35-minute scenic and adventurous flight to Lukla in the Everest region, weather permitting. Upon landing at Tenzing-Hillary Airport in Lukla (2840 m), rest briefly in the lodge of Lukla and meet your Sherpas at the lodge, and prepare to begin the first day trek to Everest Base Camp. Walking 3 hours some ascending and straight trials you reach Phakding (2610m)."
      },
      {
        day: 3,
        title: "Phakding - Namche Bazar (3440 m)",
        details: "This day you will have breakfast in the early morning and begin the journey towards Namche Bazar which takes about 5-6 hours of walking. At the beginning of the trek, you have to walk straight uphill path and then cross the Dhud Khosi River several times. After walking for about 1.5 hours you will reach Monjo village (2835 m). Then from Monjo continue the trek along steep zig-zag trial. After almost 5 to 6 hours of walking you will reach Namche Bazar."
      },
      {
        day: 4,
        title: "Acclimatization at Namche Bazar (3440 m)",
        details: "Today will be the acclimatization day in Namche Bazar. As trekking in higher elevations can lead to altitude sickness, you have to make sure to acclimatize so that your body can adapt with increasing elevation. In the morning, after breakfast in the hotel and get ready to hike for about 4 hours to the monastery above Namche Bazar, then after your guide will accompany you to Syangboche and Khumjung village and finally to the luxurious hotel at highest altitude: Everest View Hotel."
      },
      {
        day: 5,
        title: "Namche Bazaar – Pangboche (3930 m)",
        details: "This day you will have breakfast in the morning and then begin the journey to Pangboche which takes about 6 hours of walking. Today's trail will pass through the most scenic route from where you can see Dudh Koshi river and on the way, you can also see scenic view of Mount Ama Dablam, Mount Lhotse, Mount Nuptse, Mount Everest, Mount Kangtega, Thamserku and many more. After resting and enjoying the view from Phungi Thanga cross the suspension bridge and walk uphill trial for about 3 hours to reach Tengboche, then Pangboche."
      },
      {
        day: 6,
        title: "Pangboche – Ama Dablam Base Camp (4700 m)",
        details: "Today is the most awaited day of Amadablam Base Camp trekking as well as the end destination of the trek. After having breakfast in the early morning prepare to trek towards Ama Dablam Base Camp which takes about 5 hours. Ama Dablam is translated as “Mother’s Neckalce” in English and route from Pangboche to Ama Dablam Base camp is one of the thrilling and beautiful experience. From the base camp you can see mesmerizing views of Himalayas like; Mount Ama Dablam, Mount Lhotse, Mount Nuptse."
      },
      {
        day: 7,
        title: "Amadablam Base Camp – Tengboche (3860 m) – Monjo (2835 m)",
        details: "After enjoying the mesmerizing sunrise and beautiful view from the Ama Dablam Base Camp, prepare to descend back to Monjo passing through Debuche, Tengboche and Namche Bazar. Today's descending trial will be trek towards Monjo which takes about 8 hours. From Tengboche you will walk through rhododendron forests untill Phunki Thanga and then from there you climb to Sanasa and again descending past Namche Bazar & Sagarmatha National Park checkpoint you will reach Monjo."
      },
      {
        day: 8,
        title: "Monjo – Lukla (2840 m)",
        details: "Today is the last day of trekking in Khumbu region as you make your way back to Lukla. After having breakfast in the lodge, prepare to descend back towards Lukla through the same trial following the Dudh Koshi River. As you reach Lukla, today will be your last night in Everest region. From Monjo descending towards through charming Sherpa villages and crossing several suspension bridges, you will reach Phakding in about 2.5 hours. From Phakding, continuirng the trek you will reach Lukla in another 3 hours."
      },
      {
        day: 9,
        title: "Lukla – Kathmandu (1350 m)",
        details: "After having breakfast in the lodge, bid farewell to the Everest region of Nepal and again take scenic mountain flight to Kathmandu / Ramechhap. Stay overnight at Hotel in Kathmandu."
      },
      {
        day: 10,
        title: "Free day in Kathmandu",
        details: "Free day in Kathmandu for sightseeing / shopping / massage, and etc... We can do half day sightseeing in the UNESCO listed World Heritage sites like: Swoyambhunath, Boudhanath, Pashupatinath. Stay overnight at Hotel in Kathmandu."
      },
      {
        day: 11,
        title: "Departure from Kathmandu",
        details: "Enjoy your last day in Kathmandu before departure. At your scheduled departure time, our correspondent will pick you up from the hotel, transfer you to the airport, and bid you farewell with warm hearts."
      }
    ],
    costIncludes: [
      "Transfer from Airport – Hotel - Airport including domestic transfers",
      "3 nights in 3-star hotel in Kathmandu including breakfast on twin sharing basis",
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
    costExcludes: [
      "International Flight ticket and Nepal VISA fee",
      "Personal equipment",
      "Personal and medical insurance",
      "Emergency Rescue evacuation by helicopter incase needed",
      "Hot showers, electric charges and Wi-Fi during the trek",
      "Lunch and dinner in Kathmandu",
      "Visits and/or entrance fees to temples in Kathmandu",
      "Unforeseen expenses caused by uncontrollable circumstances such as flight cancellations or delays, blocked roads, weather conditions, natural disasters, altitude sickness, early termination or return of the program, etc.",
      "Personal Expenses",
      "Tips"
    ],
    faqs: [
      {
        question: "Is it possible to customize Ama Dablam Trek itinerary?",
        answer: "Yes, the itinerary is fully customizable depending on your holiday duration, fitness level, and acclimatization needs."
      },
      {
        question: "How difficult is the Ama Dablam Base Camp Trek?",
        answer: "The trek is graded as moderate. It involves 5-6 hours of walking daily, but it is less challenging than the full Everest Base Camp trek."
      },
      {
        question: "What permits are required for Ama Dablam Base Camp Trek?",
        answer: "You will need the Sagarmatha National Park Entry Permit and the Khumbu Pasang Lhamu Rural Municipality Permit."
      },
      {
        question: "When is the best time to do the Ama Dablam Base Camp Trek?",
        answer: "Spring (March-May) and Autumn (September-November) are best, though Winter is also possible for those who don't mind the cold."
      }
    ]
  };

  data.treks = data.treks.filter(t => t.id !== newTrek.id);
  data.treks.push(newTrek);

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Ama Dablam Trek added successfully!');
} catch (error) {
  console.error('Error:', error);
}
