import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Map, Clock, CalendarCheck, ShieldCheck, CheckCircle2, Car, MapPin, Info, DollarSign, ThumbsUp, Calendar, Flag, Mountain, Sun, Users, BarChart, Heart, ArrowLeft, Compass } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

import SEO from '../components/SEO';
import TrustReviewBadges from '../components/TrustReviewBadges';

export const packageExtraData = {
  'nepal-tour-poon-hill-trek-12d': {
    quickInfo: [
      { label: 'Duration', value: '12 Days 11 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m (Poon Hill)', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private & Group', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Car & Tourist Bus', icon: 'Car' },
      { label: 'Start/End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on a magnificent 12 Days Nepal Tour combined with the legendary Poon Hill Trek. This journey offers a perfect blend of rich cultural exploration in Kathmandu and Pokhara, alongside an exhilarating trek into the heart of the Annapurna region.

Begin with sightseeing at UNESCO World Heritage sites in the Kathmandu Valley, discovering ancient temples, stupas, and vibrant bazaars. Journey to the beautiful lakeside city of Pokhara, the gateway to the Himalayas.

The trekking portion takes you through lush rhododendron forests, terraced fields, and traditional Gurung villages. The absolute highlight is the early morning hike to Poon Hill (3,210m), where you will witness a breathtaking panoramic sunrise over the Annapurna and Dhaulagiri mountain ranges.

### Why This Tour?
This itinerary perfectly balances cultural immersion, stunning landscapes, and an accessible trekking experience suitable for beginners and seasoned hikers alike.`,
    highlights: [
      'Guided sightseeing of Kathmandu’s UNESCO World Heritage Sites',
      'Scenic drive to the picturesque lakeside city of Pokhara',
      'Trek through beautiful rhododendron forests and Gurung villages',
      'Spectacular sunrise views over the Himalayas from Poon Hill (3,210m)',
      'Experience the warm hospitality of local mountain communities'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu (1,400m)', desc: 'Welcome to Nepal! Transfer to your hotel and enjoy a welcome dinner.' },
      { day: 'Day 2', title: 'Kathmandu Valley Sightseeing', desc: 'Full day guided tour of Pashupatinath, Boudhanath, Swayambhunath, and Kathmandu Durbar Square.' },
      { day: 'Day 3', title: 'Drive to Pokhara (820m)', desc: 'Scenic drive to Pokhara. Enjoy the evening strolling around Phewa Lake.' },
      { day: 'Day 4', title: 'Drive to Nayapul & Trek to Tikhedhunga (1,540m)', desc: 'Short drive to Nayapul to begin the trek. Hike along the Modi Khola to Tikhedhunga.' },
      { day: 'Day 5', title: 'Trek to Ghorepani (2,860m)', desc: 'Ascend the stone steps of Ulleri and trek through rhododendron forests to Ghorepani.' },
      { day: 'Day 6', title: 'Hike to Poon Hill (3,210m) & Trek to Tadapani (2,630m)', desc: 'Early morning hike to Poon Hill for a spectacular sunrise. Later, trek to Tadapani.' },
      { day: 'Day 7', title: 'Trek to Ghandruk (1,940m)', desc: 'Descend to the beautiful Gurung village of Ghandruk. Enjoy cultural immersion and mountain views.' },
      { day: 'Day 8', title: 'Trek to Nayapul & Drive to Pokhara', desc: 'Trek down to Nayapul and take a short drive back to Pokhara to relax.' },
      { day: 'Day 9', title: 'Pokhara Sightseeing', desc: 'Visit Davis Falls, Gupteshwor Cave, and the World Peace Pagoda.' },
      { day: 'Day 10', title: 'Drive back to Kathmandu', desc: 'Scenic drive back to the capital. Transfer to your hotel.' },
      { day: 'Day 11', title: 'Free Day in Kathmandu', desc: 'Relax, go souvenir shopping in Thamel, or explore more of the city.' },
      { day: 'Day 12', title: 'Departure', desc: 'Transfer to the international airport for your flight home.' }
    ],
    inclusions: [
      'Airport pick-up and drop-off',
      'All ground transportation by private vehicle/tourist bus',
      'Professional English-speaking tour and trekking guides',
      'Trekking permits (TIMS and Annapurna Conservation Area Project fee)',
      'Accommodation in Kathmandu and Pokhara (hotels) and during the trek (teahouses)',
      'Daily breakfast in cities; all meals (breakfast, lunch, dinner) during the trek'
    ],
    exclusions: [
      'Nepal Visa fees and International airfare',
      'Lunch and dinner in Kathmandu and Pokhara',
      'Personal expenses, travel insurance, and tipping',
      'Hot showers and battery charging during the trek'
    ],
    gallery: [
      '/images/poon2.jpg',
      '/images/poon1.jpeg'
    ]
  },
  'nepal-classic-8-days': {
    quickInfo: [
      { label: 'Duration', value: '8 Days 7 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1400m (Kathmandu)', icon: 'Mountain' },
      { label: 'Best Season', value: 'All Year Round', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private & Group', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Premium SUV', icon: 'Car' },
      { label: 'Start/End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Experience the ultimate "Golden Triangle" of Nepal with this 8-Day Classic Tour covering Kathmandu, Pokhara, and Chitwan National Park.

Your journey begins in the vibrant capital, **Kathmandu**, where you will explore ancient temples, massive stupas, and the bustling durbar squares that showcase Nepal's rich architectural heritage. 

Next, travel to the lush jungles of **Chitwan National Park**. Enjoy a thrilling jeep safari, canoe rides along the Rapti River, and keep your eyes peeled for the rare one-horned rhinoceros and majestic Bengal tigers. 

Finally, unwind in the picturesque lakeside city of **Pokhara**. Marvel at the reflection of the Annapurna mountain range in the pristine waters of Phewa Lake, and wake up early for a spectacular Himalayan sunrise from Sarangkot.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://images.unsplash.com/photo-1620803511210-90baeb9d4db8?q=80&w=1170&auto=format&fit=crop" alt="Nepal Classic Tour" class="w-full h-full object-cover" />
</div>

### Why This Tour?
This itinerary perfectly balances cultural immersion, wildlife adventure, and relaxing mountain views, making it the most popular choice for first-time visitors to Nepal.`,
    highlights: [
      'Discover 4 UNESCO World Heritage Sites in Kathmandu',
      'Thrilling Jungle Safari in Chitwan National Park',
      'Canoeing and Tharu cultural village tour',
      'Relaxing boat ride on Phewa Lake in Pokhara',
      'Breathtaking sunrise over the Himalayas from Sarangkot'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu', desc: 'Welcome to Nepal! Transfer to your hotel and enjoy a welcome dinner.' },
      { day: 'Day 2', title: 'Kathmandu Valley Sightseeing', desc: 'Full day guided tour of Pashupatinath, Boudhanath, Swayambhunath, and Kathmandu Durbar Square.' },
      { day: 'Day 3', title: 'Drive to Chitwan', desc: 'Scenic drive to Chitwan. Check into your jungle lodge and enjoy an evening Tharu cultural stick dance.' },
      { day: 'Day 4', title: 'Chitwan Jungle Safari', desc: 'Full day of jungle activities including a jeep safari, canoeing, and a guided jungle walk.' },
      { day: 'Day 5', title: 'Drive to Pokhara', desc: 'Travel to the beautiful lakeside city of Pokhara. Evening free to stroll around Phewa Lake.' },
      { day: 'Day 6', title: 'Pokhara Sightseeing', desc: 'Early morning Sarangkot sunrise tour. Later, visit Davis Falls, Gupteshwor Cave, and the World Peace Pagoda.' },
      { day: 'Day 7', title: 'Return to Kathmandu', desc: 'Scenic drive back to the capital. Enjoy some last-minute souvenir shopping in Thamel.' },
      { day: 'Day 8', title: 'Departure', desc: 'Transfer to the international airport for your flight home.' }
    ],
    inclusions: [
      'Airport pick-up and drop-off',
      'Premium SUV transportation between cities',
      'Professional English-speaking guides',
      'All monument and national park entrance fees',
      'Jungle safari activities in Chitwan',
      '7 Nights accommodation in premium hotels',
      'Daily breakfast, plus all meals during the Chitwan stay'
    ],
    exclusions: [
      'Nepal Visa fees and International airfare',
      'Lunch and dinner in Kathmandu and Pokhara',
      'Personal expenses, travel insurance, and tipping'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1620803511210-90baeb9d4db8?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513614835783-51537729c8ba?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1171&auto=format&fit=crop'
    ]
  },
  'kathmandu-4-days': {
    quickInfo: [
      { label: 'Duration', value: '4 Days 3 Nights', icon: 'Calendar' },
      { label: 'Location', value: 'Kathmandu Valley', icon: 'MapPin' },
      { label: 'Transportation', value: 'Private Car & Cable Car', icon: 'Car' }
    ],
    overview: `Experience the best of Kathmandu's culture and viewpoints in just 4 days. Includes all major temples and a scenic ride to Chandragiri Hills!`,
    highlights: ['Pashupatinath Temple', 'Swayambhunath Stupa', 'Chandragiri Cable Car', 'Bhaktapur Durbar Square'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Swayambhunath Sunset', desc: 'Arrive in Kathmandu, transfer to hotel, and watch the sunset from the Monkey Temple.' },
      { day: 'Day 2', title: 'Pashupatinath & Boudhanath', desc: 'Explore the spiritual heart of the city.' },
      { day: 'Day 3', title: 'Chandragiri Hills & Patan', desc: 'Ride the cable car for mountain views, then visit Patan Durbar Square.' },
      { day: 'Day 4', title: 'Bhaktapur Tour & Departure', desc: 'Visit the ancient city of Bhaktapur before flying home.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1544442069-97dded965a9f?q=80&w=1331&auto=format&fit=crop'
    ]
  },
  'annapurna-11-days': {
    quickInfo: [
      { label: 'Duration', value: '11 Days', icon: 'Calendar' },
      { label: 'Max Altitude', value: '5416m (Thorong La)', icon: 'Mountain' }
    ],
    overview: `Conquer the legendary Annapurna Circuit! This 11-day trek takes you from lush subtropical valleys to the arid, high-altitude Tibetan plateau.`,
    highlights: ['Thorong La Pass (5416m)', 'Muktinath Temple', 'Expert Mountain Guides', 'Teahouse Accommodations'],
    itinerary: [
      { day: 'Day 1', title: 'Drive to Chame', desc: 'Off-road drive into the mountains.' },
      { day: 'Day 2-4', title: 'Trek to Manang', desc: 'Acclimatization and stunning views.' },
      { day: 'Day 5-8', title: 'Thorong La Pass', desc: 'Cross the highest pass in the world.' },
      { day: 'Day 9-11', title: 'Jomsom to Pokhara & Return', desc: 'Fly to Pokhara and return to Kathmandu.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1171&auto=format&fit=crop'
    ]
  },
  'kathmandu-chandragiri-4d': {
        quickInfo: [
      { label: 'Duration', value: '4 Days 3 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2551m/8370ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep/Oct/Nov/Dec/Feb/Mar/Apr/May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Road & Cable car', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Experience a perfect blend of Nepal's rich cultural heritage and breathtaking natural beauty on this 4-day Kathmandu and Chandragiri Hills tour.

Your journey begins in the historic city of Kathmandu, where you will wander through the ancient courtyards of Bhaktapur Durbar Square and visit the Changunarayan Temple, Nepal's oldest Hindu shrine. As you delve deeper into the city's spiritual heart, you'll explore the sacred Pashupatinath Temple and the massive Boudhanath Stupa. A stroll through Kathmandu Durbar Square will transport you back to the era of the Malla kings.

The adventure peaks with a scenic drive to Chandragiri Hills. Here, a thrilling cable car ride whisks you up to sweeping panoramic views of the magnificent Himalayas, including Mount Everest and Annapurna. Visit the revered Bhaleshwar Mahadev Temple and breathe in the tranquil mountain air before concluding your trip with a spectacular sunrise over the snow-capped peaks.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/0e/1d/8c/de.jpg" alt="Chandragiri Hills Cable Car" class="w-full h-full object-cover" />
</div>

### Best Time to Visit
Nepal is beautiful year-round, but **Spring (March–May)** and **Autumn (Sept–Nov)** offer the clearest skies and most spectacular mountain views. Spring brings blooming rhododendrons and comfortable temperatures, while Autumn offers crystal-clear panoramas following the monsoon. Winter is cooler but rewards travelers with peaceful snow-dusted landscapes, while the Summer monsoon brings lush greenery to the valleys.`,
    highlights: [
      'Explore Kathmandu’s iconic UNESCO World Heritage Sites',
      'Witness the intricate architecture of Bhaktapur Durbar Square',
      'Enjoy a thrilling cable car ride to Chandragiri Hills',
      'Capture panoramic views of Mount Everest and the Annapurna range',
      'Experience a mesmerizing sunrise over the Himalayas'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu [1400m/4595ft]', desc: 'Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you will be transferred to your comfortable 4 or 5-star hotel. Take the rest of the day to relax or explore the vibrant streets of Kathmandu at your leisure.' },
      { day: 'Day 2', title: 'Kathmandu Sightseeing', desc: 'A full day of cultural immersion visiting Kathmandu’s renowned UNESCO World Heritage sites, including historic durbar squares, sacred temples, and massive stupas.' },
      { day: 'Day 3', title: 'Kathmandu to Chandragiri Hills [2551m/8370ft]', desc: 'Enjoy a scenic drive followed by a breathtaking cable car ride to the top of Chandragiri Hills. Soak in the panoramic Himalayan views and visit the Bhaleshwar Mahadev Temple.' },
      { day: 'Day 4', title: 'Chandragiri Hills to Kathmandu / Departure', desc: 'Wake up to a magnificent mountain sunrise. After breakfast, you will be driven back to Kathmandu and transferred to the airport for your onward journey.' }
    ],
    inclusions: [
      'Airport pick-up and drop-off by private air-conditioned vehicle',
      'All tours and transfers in a comfortable private air-conditioned vehicle',
      'Sightseeing tours in Kathmandu with an English-speaking professional guide',
      'All applicable monument entrance fees',
      'Return cable car ticket for Chandragiri Hills',
      'All government and local taxes',
      'Daily buffet breakfast at all hotels',
      '2 Nights accommodation in Kathmandu',
      '1 Night accommodation at Chandragiri Hills Resort'
    ],
    exclusions: [
      'Nepal Visa fees and International airfare',
      'Tips for driver and guide (Recommended but not compulsory)',
      'Entrance fees for children (if applicable)',
      'Lunch and dinner (Approx. US$ 10-20 per meal)',
      'Personal expenses (insurance, medical, laundry, shopping, liquor, etc.)',
      'Costs arising from flight cancellations, roadblocks, or emergencies'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**Visa Information**
All visitors (except Indian nationals) require a visa to enter Nepal. Visas are available on arrival or via Nepalese embassies. We recommend completing the online visa form within 10 days of your arrival to avoid queues. Fees: 15 Days ($30), 30 Days ($50), 90 Days ($125).

**Passports & Visas**
Ensure your passport is valid for at least six months beyond your trip dates. 

**Tipping**
While not mandatory, tipping is highly appreciated. A standard restaurant tip is 10%. For guides and drivers, we suggest US$ 5/day for drivers and US$ 10/day for guides.

**Booking & Cancellation**
A 40% deposit is required to confirm your booking, with the remaining 60% payable upon arrival in Kathmandu. Cancellations up to 30 days before the trip incur a 20% fee.`,
    whyBookWithUs: [
      'Local tour operator with 5+ years of experience',
      '99% satisfied customers & prompt responses',
      '100% instant booking confirmation',
      'Secure online payment gateway with no hidden charges',
      '24/7 WhatsApp & email support desk',
      'All insured vehicles, guides, and porters',
      'Tailor-made, flexible itineraries to suit your interests'
    ],
    valueAdded: [
      'Welcome Garland/Khada on arrival',
      'Two 500ml water bottles per day per person',
      'One complimentary authentic Nepali dinner with cultural dance',
      'Local SIM card with unlimited data for 7 days'
    ]
  }
,
  'tibet-tour-6d': {
        quickInfo: [
      { label: 'Duration', value: '6 Days 5 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Tibet', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3,700 meters (12,139 feet) in Tsedang', icon: 'Mountain' },
      { label: 'Best Season', value: 'April to June & Sep to Nov', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Flight & Drive', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `This 6-day Tibet Tour is a captivating journey through Tibet’s spiritual, cultural, and historical landmarks. Starting with a scenic flight from Kathmandu to Lhasa, this tour takes you to some of the most iconic sites in Tibet, offering a blend of stunning landscapes, ancient monasteries, and vibrant local culture.

On the first day, arrive in Lhasa and travel to Tsedang (3,700m), known as the “cradle of Tibetan civilization.” Spend the night acclimatizing to the high altitude. Day 2 includes a visit to the historic Samye Monastery, Tibet’s first Buddhist monastery, famous for its mandala design, ancient murals, and serene surroundings.

The third day begins with visits to Yumbu Lhakang, Tibet’s oldest palace offering panoramic views of the Yarlung Valley, and Thandruk Monastery, known for its ancient Thangka paintings. A scenic drive brings you to Lhasa for more exploration.

Over the next two days, explore Lhasa’s top attractions. Visit the Potala Palace, a UNESCO World Heritage Site and former residence of the Dalai Lama, and the sacred Jokhang Temple, surrounded by the bustling Barkhor Bazaar, where you can experience Tibetan culture up close. On Day 5, visit Sera Monastery, famous for its lively monk debates, and Drepung Monastery, once the largest monastery in Tibet.

Your journey concludes with a scenic drive to Gonggar Airport and a flight back to Kathmandu, leaving you with unforgettable memories of Tibet’s rich heritage and stunning landscapes.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://www.tibettravel.org/assets/images/shigatse/6-days-lhasa-to-shigatse-tour-8.jpg" alt="Potala Palace Tibet" class="w-full h-full object-cover" />
</div>

### Best Time to Visit
The best time to visit Tibet is from **April to June** and **September to November**. During these months, the weather is relatively mild and the skies are clear, offering the best views of the stunning Himalayan landscapes and comfortable conditions for exploring monasteries.`,
    highlights: [
      'Samye Monastery – Explore Tibet’s first monastery with its unique mandala layout.',
      'Yumbu Lhakang – Discover Tibet’s oldest palace and enjoy panoramic views of the Yarlung Valley',
      'Potala Palace – Visit the iconic former residence of the Dalai Lama in Lhasa.',
      'Jokhang Temple & Barkhor Bazaar – Experience Tibetan spirituality and local culture.',
      'Sera & Drepung Monasteries – Witness monk debates and explore historic Buddhist learning centers.'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Kathmandu-Lhasa [3656m/11,995ft]-Tsedang[3700m/12139ft]', desc: 'Fly from Kathmandu to Lhasa over the magnificent Himalayas. Upon arrival, transfer to Tsedang to acclimatize to the altitude.' },
      { day: 'Day 2', title: 'Tsedang-Samye Monastery', desc: "Visit the historic Samye Monastery, Tibet\'s first Buddhist monastery, known for its unique mandala architecture." },
      { day: 'Day 3', title: 'Tsedang-Lhasa', desc: 'Explore Yumbu Lhakang palace and Thandruk Monastery before taking a scenic drive to the capital city, Lhasa.' },
      { day: 'Day 4', title: 'Explore Lhasa', desc: "Discover Lhasa\'s iconic landmarks including the magnificent Potala Palace and the sacred Jokhang Temple." },
      { day: 'Day 5', title: 'Lhasa', desc: 'Visit Sera Monastery to witness traditional monk debates, followed by a tour of Drepung Monastery.' },
      { day: 'Day 6', title: 'Lhasa - Kathmandu flight', desc: 'Transfer to Gonggar Airport for your scenic return flight to Kathmandu, concluding your unforgettable Tibet tour.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle in Nepal',
      'All necessary transportation as per given itinerary by private vehicle in Nepal & Tibet',
      'All government and local taxes in Nepal & Tibet',
      'English Speaking Tibetan Guide',
      'Kathmandu-Lhasa return flight tickets',
      'Sightseeing and monastery entrance fees as per our itinerary',
      'Tibet Travel Permit',
      'Tibet Visa fees',
      'Daily buffet breakfast in all hotels',
      'All accommodation in the mention hotel in Tibet'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Accommodation in Nepal ( Minimum 3 full working days we need for visa processing)',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Natural or Political disturbance Which Beyond our Control',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**Insurance**
It is recommended of joining any of Destination Nepal Tours & Travels trips that be protected against comprehensive expenses potential to incur due to medical issues or accidents (to include air ambulance, helicopter rescue, and treatment costs). Please note that we do not arrange insurance. Please note that your insurance should be covered 5600m.

**Visa Information**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. Fees: 15 Days ($30), 30 Days ($50), 90 Days ($125).

**Passports & Visas**
You must have a valid passport (valid for at least six months beyond your trip) and all required visas, permits, and certificates for your destinations. Ensure you possess the correct documents as outlined in the Trip Notes.

**Tipping**
Tips are appreciated by your support team after the trip. Tips are not mandatory but recommended. The amount depends on your budget and appreciation of their work. Where restaurant meals are involved, the tipping is usually 10% of the bill. We suggest US$ 5 per day to driver & US$ 10 per day to guide.

**Booking & Cancellation**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made through our payment gateway via credit/debit card. The remaining 60% is payable upon arrival in Kathmandu. Cancellations up to 30 days before the trip incur a 20% fee, scaling up closer to the departure date. There is no charge for postponing the trip.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'Local tour operator with 5+ years of experience',
      '99% satisfied customers & prompt responses',
      '100% instant booking confirmation',
      'Secure online payment gateway without extra charges',
      '24/7 WhatsApp & email support desk',
      'All insured vehicles, guides, and porters',
      'Tailor-made, flexible itineraries to suit your interests'
    ]
  }
,
  'kailash-16d': {
    quickInfo: [
      { label: 'Duration', value: '16 Days', icon: 'Calendar' },
      { label: 'Country', value: 'Tibet', icon: 'Flag' },
      { label: 'Max. Altitude', value: '5636 Meter', icon: 'Mountain' },
      { label: 'Best Season', value: 'May-Sep', icon: 'Sun' },
      { label: 'Group/Private', value: 'Group', icon: 'Users' },
      { label: 'Grade', value: 'Demanding', icon: 'BarChart' },
      { label: 'Transportation', value: 'Coach/Jeep', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `16 Days Kailash Mansarovar Tour via Kerung offers a once-in-a-lifetime spiritual journey through the majestic landscapes of Nepal and Tibet. Starting in Kathmandu, this meticulously planned itinerary allows you to immerse yourself in the rich culture of Nepal, visit sacred temples, and experience the vibrant capital city. As you travel towards Tibet, you’ll witness the stunning Himalayan scenery, cross high mountain passes, and step onto the Tibetan Plateau.

The spiritual highlight of the trip is the holy Lake Manasarovar, revered in Hinduism and Buddhism. You can take a holy dip and experience the divine serenity of this sacred site. The three-day Mount Kailash Kora trek, which includes crossing the challenging Dolma La Pass, is both a physically demanding and spiritually rewarding experience. Along the way, you’ll marvel at the north face of Mount Kailash and visit sacred sites like Gauri Kund.

With time for acclimatization and detailed preparation, this itinerary ensures safety and comfort while allowing you to focus on the spiritual significance of the journey. The journey ends back in Kathmandu with memories of the unparalleled landscapes and the spiritual fulfillment of completing the Kailash Mansarovar pilgrimage.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://media.app.dreamtibet.com/uploads/fullbanner/mt-kailash-manasarover-tour.webp" alt="Mount Kailash" class="w-full h-full object-cover" />
</div>

### Best Time for the Tour
The Kailash Mansarovar Yatra operates between May and September, offering the most favorable weather and accessibility for this spiritual journey. These months provide pilgrims with comfortable trekking conditions, breathtaking landscapes, and the opportunity to connect deeply with the sacred surroundings. 

Many pilgrims prefer to schedule their journey during the full moon days for an enhanced spiritual experience. The light of the full moon reflecting on Mount Kailash and Lake Manasarovar adds a profound and ethereal dimension to the pilgrimage.`,
    highlights: [
      'Sacred Sites: The pilgrimage to Mount Kailash and Lake Manasarovar holds deep religious and spiritual importance.',
      'A Divine Experience: The opportunity to bathe in the holy waters of Lake Manasarovar and trek around Mount Kailash.',
      'Challenging Trek: The 3-day Kailash Kora trek, including the crossing of Dolma La Pass (5,636m).',
      'Stunning Landscapes: From the lush hills of Nepal to the vast Tibetan Plateau and the majestic Himalayas.',
      'Cultural Immersion: Experience the vibrant traditions, temples, and unique lifestyles of both Nepal and Tibet.'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu (1,400m)', desc: 'Arrive in Kathmandu. After airport pick-up, transfer to your hotel. Our official will collect original passport and 4 passport size pictures for VISA process.' },
      { day: 'Day 2', title: 'Sightseeing of Kathmandu', desc: 'Sightseeing tour of Pashupatinath and Budhanilkantha.' },
      { day: 'Day 3', title: 'Rest day at Kathmandu', desc: 'Rest day at Kathmandu stay (Optional Sightseeing).' },
      { day: 'Day 4', title: 'Rest day at Kathmandu', desc: 'Rest day at Kathmandu stay (Optional Sightseeing).' },
      { day: 'Day 5', title: 'VISA collection', desc: 'VISA collection by evening.' },
      { day: 'Day 6', title: 'Kathmandu to Syabrubesi (1,460m)', desc: 'Drive from Kathmandu to Syabrubesi.' },
      { day: 'Day 7', title: 'Syabrubesi to Kerung (2,700m)', desc: 'Cross the border and drive to Kerung.' },
      { day: 'Day 8', title: 'Kerung to Saga (4,640m)', desc: 'Drive to Saga across the Tibetan plateau.' },
      { day: 'Day 9', title: 'Acclimatization at Saga', desc: 'Rest and acclimatization day at Saga.' },
      { day: 'Day 10', title: 'Saga to Lake Manasarovar (4,590m)', desc: 'Drive to the holy Lake Manasarovar and take a holy dip.' },
      { day: 'Day 11', title: 'Lake Manasarovar to Darchen (4,575m)', desc: 'Drive to Darchen, the base camp for Mount Kailash Kora.' },
      { day: 'Day 12', title: 'Kailash Kora – Darchen to Dirapuk (4,900m)', desc: 'Start the trek around Mount Kailash to Dirapuk.' },
      { day: 'Day 13', title: 'Kailash Kora – Dirapuk to Zuthulpuk (5,636m)', desc: 'Trek to Zuthulpuk via the challenging Dolma La Pass.' },
      { day: 'Day 14', title: 'Zuthulpuk to Darchen, Drive to Saga', desc: 'Finish the Kora at Darchen and drive back to Saga.' },
      { day: 'Day 15', title: 'Saga to Kerung, Return to Kathmandu', desc: 'Drive from Saga to Kerung, cross the border and return to Kathmandu.' },
      { day: 'Day 16', title: 'Departure from Kathmandu', desc: 'Departure from Kathmandu to your home country.' }
    ],
    inclusions: [
      'Arrival & departure transportation',
      'Sightseeing tour of Pashupatinath and Budhanilkantha',
      '6 nights 3-star hotel at Kathmandu on twin sharing basis in MAP plan',
      'Transfer to Kerung by tourist bus or Scorpio',
      'Tibet side: accommodation in decent hotel/Guest House',
      'Pure vegetarian meals prepare by our escort for tour to Kailash (Tibet side)',
      'A/C coach & support trucks',
      'English speaking Tibetan guide & Nepali tour leader',
      'Gamow bag, Backpack, oxygen, basic first-aid kit',
      'Kailash permit & normal Tibet/China visa fee & Kerung land tax'
    ],
    exclusions: [
      'Airfares from Home - Kathmandu - Home',
      'All beverages, Photography charges and Telephone calls',
      'Travel Insurance of clients & Emergency evacuation expenses',
      'Riding Yak/Horse for Kailash Parikrama',
      'Extra cost in the event of landslide for hiring additional transportation',
      'Expenses of personal urgent visa fee etc',
      'Any sorts of Meals in Nepal'
    ],
    information: `**Model of Payments**
• Advance of 40% of the total amount to be provided as token of confirmation.
• 20 days prior to tour departure date, 100% of the total cost should reach Destination Nepal Tours and Travels Pvt. Ltd account.

**Tour Cancellation Policy**
• All notice of cancellation must be sent to our office in written.
• 20 days before trip departure: 10% of total trip cost.
• 15 days before trip departure: 50% of total trip cost.
• 10 days before trip departure: 90% of total trip cost.
• 07 days and less departure: 100% of total trip cost.

**Important Pre-Departure Information:**
**Clothing:** Casual wear and comfortable walking shoes are recommended. Bring warm clothing as nights can be quite chilly. Down jacket, raincoat, thermal underwears, warm sweaters, and a scarf/dust mask are highly recommended.

**Health:** This is one of the toughest high altitude road journeys on earth. You must be physically fit. Generally patients with asthma & heart problems have a problem acclimatizing to high altitudes. 

**Altitude Sickness:** You are likely to experience symptoms of altitude sickness (headache, loss of appetite, nausea, exhaustion) until your body adjusts. Drink plenty of water, be calm, and do not exercise. Do not drink alcohol or smoke prior to and during the tour. We provide a Gamow bag on this tour.

**Currency:** The unit of Chinese currency is Yuan. USD 1 = 7.50 Yuan. 1 Yuan = NPR 20.00 approx, which must be exchanged in Nepal.`,
    whyBookWithUs: [
      'We are local tour operator with 5+ years of experience',
      '99% satisfied customers & prompt response',
      '100% instant booking confirmation',
      'Secure online payment gateway without extra charges',
      '24/7 WhatsApp & email support',
      'All insured vehicles, trekking guides & porters',
      'Trustworthy travel agency with unbeatable value for money'
    ]
  }
,
  'annapurna-11d': {
    quickInfo: [
      { label: 'Duration', value: '11 Days 10 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '5416m/17756ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Challenging', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private vhicle & Domestic flight', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on the 11-day Annapurna Circuit trek, starting from Kathmandu with a scenic drive to Bhulbhule and Chame, trekking through stunning Himalayan landscapes from Pisang to Thorung La Pass, and concluding with cultural experiences in Pokhara and Kathmandu. Perfect for adventure seekers in Nepal.

The **11-day Annapurna Circuit trek** is one of Nepal’s most iconic trekking routes, offering adventurers a perfect combination of stunning landscapes, cultural immersion, and exhilarating high-altitude challenges. The journey begins with a scenic drive from Kathmandu to the village of Bhulbhule, passing through terraced hills, vibrant villages, and rivers fed by Himalayan glaciers. As the drive continues toward Chame, the air grows crisper, and the towering peaks of the Annapurna range come into view. Chame is a quaint town nestled in the mountains, marking the starting point of the trekking adventure.

Thorung La Pass, standing at 5,416 meters (17,769 feet), is one of the highest trekking passes in the world and offers an awe-inspiring experience for every trekker who crosses it. The climb is steep and requires careful pacing, but the reward is the sweeping panorama of the Himalayas stretching as far as the eye can see. After crossing the pass, the trail descends toward the sacred town of Muktinath. 

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://himalayatrip.com/wp-content/uploads/2026/05/Thomas-team-thorong-la-pass.jpeg.webp" alt="Annapurna Circuit Trek" class="w-full h-full object-cover" />
</div>

### Why you'll love 11 Days Annapurna circuit Trek
- **Thorong La Pass Summit**: Conquer the exhilarating Thorong La Pass, reaching an impressive altitude of 5,416 meters.
- **Muktinath Temple Exploration**: Discover the cultural richness at Muktinath Temple, a sacred site with 108 stone sprouts.
- **Charming Village Encounters**: Immerse yourself in the local culture as you explore quaint villages like Pisang and Manang.
- **Diverse Landscapes**: Trek through a diverse terrain that transitions from lush lowlands to rugged landscapes.`,
    highlights: [
      'Conquer Thorong La Pass at 5,416 meters.',
      'Cultural richness at Muktinath Temple with 108 stone sprouts.',
      'Explore quaint villages like Pisang and Manang.',
      'Trek through diverse terrains from lowlands to high alpine environments.'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu [Altitude 1336m]', desc: 'Transfer to your hotel. You can spend the rest of the day exploring the city or resting to acclimatize.' },
      { day: 'Day 2', title: 'Kathmandu-Bhulbhule via Besisahar [840 m/2760ft]', desc: 'Scenic drive to Bhulbhule.' },
      { day: 'Day 3', title: 'Bhulbhule - Chame [2610m/8890ft]', desc: 'Continue the scenic drive to Chame, the starting point of the trek.' },
      { day: 'Day 4', title: 'Chame-Pisang [3300m/10826ft]', desc: 'Trek 6-7 hrs to Pisang, offering panoramic views of Annapurna II.' },
      { day: 'Day 5', title: 'Pisang-Manang [3540m/11300ft]', desc: 'Trek 5-6 hrs to the vibrant village of Manang.' },
      { day: 'Day 6', title: 'Acclimatization day in Manang', desc: 'Rest day to adjust to the altitude. Explore the local monastery or walk to Gangapurna Glacier.' },
      { day: 'Day 7', title: 'Manang-Yak Kharka [4050m/14275ft]', desc: 'Trek 3-4 hrs through yak pastures.' },
      { day: 'Day 8', title: 'Yak Kharka-Thorung Phedi [4525m/14525ft]', desc: 'Trek 4-5 hrs to the base camp for Thorung La Pass.' },
      { day: 'Day 9', title: 'Thorung Phedi-Thorung-La [5416 m]-Muktinath [3710m]', desc: 'Trek 9-10 hrs across the challenging Thorung La Pass to Muktinath.' },
      { day: 'Day 10', title: 'Muktinath-Jomsom-Pokhara-Kathmadnu by Flight', desc: 'Scenic flight from Jomsom to Pokhara, then to Kathmandu.' },
      { day: 'Day 11', title: 'Depart from Kathmandu', desc: 'Transfer to the airport for departure.' }
    ],
    inclusions: [
      'Airport pick & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'A comprehensive medical kit',
      'TIMS Card & permit fees',
      'Trekking guide & porter',
      'Free Trekking Bag',
      'Jomsom- Pokhara flight ticket',
      'Pokhara-Kathmandu flight ticket',
      'Daily buffet breakfast in Kathmandu',
      'Daily breakfast, lunch, dinner during the trekking time',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu',
      '8 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver, guide & porter [It is not compulsory]',
      'Meals in Kathmandu & Pokhara [US$ 10-20 per lunch/dinner]',
      'Necessary trekking equipment and things as per check list',
      'Any expenses incurred in emergency evacuation',
      'Any transportation cost outside of the regular itinerary'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**Climate & Best Time to Go**
The best time to trek the Annapurna Circuit is in spring (March to May) and autumn (September to November). Spring offers blooming rhododendrons, pleasant temperatures, and clear skies, while autumn provides stable weather and stunning mountain views. 

**Rescue/Evacuations**
In case of a serious sickness or a casualty, you shall be rescued by a helicopter. Since you are entirely liable for all the expenses incurred in evacuation please make sure that it is covered by your insurance before assigning for it.

**Ultimate Packing Checklist**
**Clothing:** Moisture-wicking thermal tops, fleece jacket or down jacket, waterproof and windproof jacket, waterproof trekking pants, warm beanie, thermal gloves.
**Footwear:** Waterproof trekking boots, camp shoes, wool trekking socks.
**Gear:** 40-50L backpack, sleeping bag (-15°C), trekking poles, headlamp, water purification.
**First Aid:** Basic first aid kit, Diamox (for altitude sickness), painkillers, blister treatment.

**Visa Information**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. Fees: 15 Days ($30), 30 Days ($50), 90 Days ($125).`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator with 5+ years of experienced in tour & trekking operation',
      '99% satisfied customers & prompt response',
      '100% instant booking confirmation',
      'Secure online payment gateway without extra charges',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      'All insured vehicle we use in our tour, insured trekking guide & porter'
    ]
  }
,
  'poon-hill-8d': {
    quickInfo: [
      { label: 'Duration', value: '8 Days 7 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m/10,531ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Experience the thrill of our 8-day Ghorepani Poon Hill Trek, starting and ending in Kathmandu. Your adventure begins with a scenic road trip from Kathmandu to Pokhara. Optionally, you can enjoy an exciting rafting experience on the Trishuli River. From Pokhara, trek to Tikhedhunga, then continue to Tikhedhunga and Ghorepani. At Ghorepani, embark on an early morning trek to Poon Hill for breathtaking sunrise views of the Annapurna and Dhaulagiri mountains. Proceed to Tadapani and explore the picturesque Ghandruk village. Your trek concludes with a scenic flight back to Kathmandu, capturing the essence of Nepal’s natural beauty and cultural charm.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://media.app.mysticadventureholidays.com/uploads/package/gallery/f2.webp" alt="Poon Hill Trek" class="w-full h-full object-cover" />
</div>

### Why you'll love the 8-Day Ghorepani Poon Hill Trek
- **Extended Adventure**: The 8-day itinerary allows for a more relaxed and immersive experience compared to shorter treks.
- **Incredible Views**: Trekkers will be treated to stunning panoramic views of the Annapurna and Dhaulagiri mountain ranges, with the sunrise at Poon Hill being a highlight.
- **Scenic Road Trip**: The trek begins with a scenic road trip from Kathmandu to Pokhara.
- **Cultural Exploration**: The trek provides an opportunity to experience the rich culture and traditional lifestyle of the Gurung and Magar communities in villages like Ghandruk.
- **Memorable Sunrise**: The early morning hike to Poon Hill for sunrise offers one of the most memorable and breathtaking views in the Himalayas.`,
    highlights: [
      'Incredible sunrise views over the Annapurna and Dhaulagiri ranges from Poon Hill.',
      'Cultural immersion in Gurung and Magar villages like Ghandruk.',
      'Varied terrain including lush forests, terraced fields, and picturesque villages.',
      'Optional rafting experience on the Trishuli River.'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu [Altitude 1350m/4429ft]', desc: 'Transfer to your hotel. Depending on your arrival time, explore the city or relax.' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara [altitude 830m]', desc: 'Scenic road trip from Kathmandu to Pokhara.' },
      { day: 'Day 3', title: 'Pokhara- Nayapul-Tikhedhunga [Altitude 1540 m]', desc: '1-2 hrs drive to Nayapul followed by a 4-5 hrs trek to Tikhedhunga.' },
      { day: 'Day 4', title: 'Tikhedhunga-Ghorepani [Altitude 2860m]', desc: '6-7 hrs trek ascending to the village of Ghorepani.' },
      { day: 'Day 5', title: 'Ghorepani-Poon Hill [3210m]-Tadapani [2630 m]', desc: 'Early morning hike to Poon Hill for sunrise, then trek to Tadapani.' },
      { day: 'Day 6', title: 'Tadapani-Ghandruk [Altitude 1940 m]', desc: 'Trek to the beautiful Gurung village of Ghandruk.' },
      { day: 'Day 7', title: 'Ghandruk-Pokhara-Kathmandu', desc: 'Trek back to Nayapul, drive to Pokhara, and take a scenic flight back to Kathmandu.' },
      { day: 'Day 8', title: 'Depart from Kathmandu', desc: 'Transfer to the airport for your departure.' }
    ],
    inclusions: [
      'Airport pick & drop by comfortable private air-conditional vehicle',
      'All transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Pokhara to Kathmandu flight tickets',
      'TIMS Card & permit fees',
      'A comprehensive medical kit',
      'Trekking guide & porter',
      'Free Trekking Bag',
      'Daily buffet breakfast in Kathmandu & Pokhara',
      'Daily breakfast, lunch, dinner with tea during the trekking time',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu',
      '1 Night Temple Tree Resort & Spa or similar in Pokhara',
      '4 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver, guide & porter [It is not compulsory]',
      'Meals in Kathmandu & Pokhara [US$ 10-30 per lunch/dinner]',
      'Necessary trekking equipment and things as per check list',
      'Any expenses incurred in emergency evacuation',
      'Any transportation cost outside of the regular itinerary'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**Climate & Best Time to Go**
Autumn (mid Sept to mid Dec) and Spring (March to May) are the best seasons for the Annapurna Base Camp Trek. The weather is sunny and warm, with outstanding views but the nights are cold. Winter is also good but colder.

**Rescue/Evacuations**
In case of a serious sickness or a casualty, you shall be rescued by a helicopter. Since you are entirely liable for all the expenses incurred in evacuation please make sure that it is covered by your insurance.

**Ultimate Packing Checklist**
**Clothing:** Lightweight trekking shirts and pants, fleece or warm jacket, waterproof rain jacket, sun hat, beanie.
**Footwear:** Sturdy, broken-in trekking boots, sandals for evenings.
**Gear:** Medium-sized backpack, sleeping bag, trekking poles.
**Accessories:** Sunglasses with UV protection, sunscreen, reusable water bottle.

**Visa Information**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. Fees: 15 Days ($30), 30 Days ($50), 90 Days ($125).`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator with 5+ years of experienced in tour & trekking operation',
      '99% satisfied customers & prompt response',
      '100% instant booking confirmation',
      'Secure online payment gateway without extra charges',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      'All insured vehicle we use in our tour, insured trekking guide & porter'
    ]
  }
,
  'bhutan-6d': {
    quickInfo: [
      { label: 'Duration', value: '6 Days 5 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal & Bhutan', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3120m(10240ft)', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Flight & road', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `6 Days Bhutan Tour begins with a warm welcome by Destination Nepal Tours and Travels representative at Tribhuvan International Airport, Kathmandu. Upon arrival, you will have a free day to relax, followed by an evening briefing and visa document preparation for Bhutan.

On the second day, enjoy a spectacular flight to Paro, offering breathtaking views of Everest, Kanchenjunga, Makalu, and Bhutanese peaks like Chomolhari, Jichu Drake, and Tsrim Gang. Upon landing at Paro, your guide will meet you and take you for sightseeing. Visit the National Museum and Paro Dzong. In the evening, take a scenic one-hour drive to Thimphu, stopping at Tamchoe Monastery and Chuzom en route.

The third day begins with a visit to Thimphu's iconic sites, including the Memorial Chorten, Changangkha Monastery, Takin Zoo, Thimphu Valley Viewpoint, and the Nunnery Monastery. The next day, return to Paro for an unforgettable hike to Taktsang Monastery (Tiger’s Nest). Perched 3,000 feet above the valley floor, this iconic site offers mystical views and fascinating legends.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://www.nepalpackagetour.com/public/uploads/bhutan_tour/Tiger%20nest.jpg" alt="Tiger's Nest Monastery" class="w-full h-full object-cover" />
</div>

### Why People Love This 6-Day Bhutan Tour
- **Scenic Mountain Flights**: Breathtaking flight offering panoramic views of the Himalayas.
- **Iconic Cultural Landmarks**: Explore historic sites like Paro Dzong, Tashichho Dzong, and ancient Kichu Lhakhang.
- **Mystical Tiger’s Nest Hike**: Hike to Taktsang Monastery perched dramatically on a cliff.
- **Authentic Bhutanese Experiences**: Witness traditional crafts, archery sessions, and vibrant local culture.`,
    highlights: [
      'Spectacular mountain flight with views of Everest and Kanchenjunga.',
      'Hike to the legendary Taktsang Monastery (Tiger’s Nest).',
      'Explore Thimphu’s iconic sites like the Memorial Chorten and Takin Zoo.',
      'Cultural sightseeing in Paro including Paro Dzong and the National Museum.',
      'A delightful Nepali cultural dinner in Kathmandu.'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrive Kathmandu [Altitude 1400 m/4594 ft]', desc: 'Arrival at TIA, Kathmandu. Welcome by officer and transfer to the hotel. Briefing about the program.' },
      { day: 'Day 2', title: 'Kathmandu-Paro [2,250m] -Thimphu [2,350m]', desc: 'Spectacular flight to Paro. Visit National Museum and Paro Dzong. Evening drive to Thimphu.' },
      { day: 'Day 3', title: 'Explore Thimphu Valley', desc: 'Visit Memorial Chorten, Changangkha Monastery, Takin Zoo, and Nunnery Monastery. Afternoon visit to Tashichho Dzong.' },
      { day: 'Day 4', title: 'Thimphu-Paro', desc: 'Return to Paro for a hike to Taktsang Monastery (Tiger’s Nest). Visit Drukgyel Dzong and Kichu Lhakhang.' },
      { day: 'Day 5', title: 'Paro-Kathmandu', desc: 'Fly back to Kathmandu. Visit Pashupatinath Temple and Boudhanath Stupa followed by a Nepali cultural dinner.' },
      { day: 'Day 6', title: 'Depart from Kathmandu', desc: 'Depart with unforgettable memories of your Bhutan journey.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle in Nepal',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle in Nepal',
      'All sightseeing tours with a local English speaking guide as per itinerary in Nepal',
      'All applicable monument entrance fees in Nepal',
      'Daily buffet breakfast in Nepal',
      'All meal (Breakfast, Lunch & Dinner) in Bhutan',
      'English speaking guide in Bhutan',
      'Entrance fees, necessary permits, and transportation within Bhutan',
      'Visa fee & TDF fee for Bhutan',
      'Kathmandu to Paro return flight tickets',
      'All accommodation in the mention hotels Nepal & Bhutan'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-25 per lunch/dinner] in Nepal',
      'Any expenses incurred in emergency evacuation',
      'Pony hiring charge during Taktsang Monastery',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**Best Time to Visit**
Spring (March to May) and Autumn (September to November) are the best seasons. Spring offers vibrant blooms and clear skies, while Autumn provides crisp air and traditional festivals.

**Visa Information for Bhutan**
The following documents are required to proceed with a Bhutan visa:
A digital copy of a valid passport, a recent digital passport-sized photo, and valid travel insurance for the duration of your trip.

**Visa Information for Nepal**
All visitors except Indian nationals must hold a passport and valid visa. Visa can be obtained at the Nepalese diplomatic missions or upon arrival. Fees: 15 Days ($30), 30 Days ($50), 90 Days ($125).

**Tipping**
Tips are appreciated by your support team. We suggest US$ 5 per day per tourist to the driver and US$ 10 per day to the guide.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator with 5+ years of experienced in tour & trekking operation',
      '99% satisfied customers & prompt response',
      '100% instant booking confirmation',
      'Secure online payment gateway without extra charges',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      'All insured vehicle we use in our tour, insured trekking guide & porter'
    ]
  }
,
  'nepal-poon-hill-12d': {
    quickInfo: [
      { label: 'Duration', value: '12 Days 11 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m/10531ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `12 Days Nepal Tour with Poon Hill Trek is a perfect blend of cultural exploration, wildlife adventure, and scenic trekking. This exciting 12-day Nepal itinerary starts with a warm welcome at Tribhuvan International Airport. The tour begins with a drive to Chitwan, where you will experience Chitwan jungle safari, Tharu village tour, and an enchanting Tharu cultural program. Enjoy activities like an Elephant safari or Jeep safari, canoe ride in the Rapti River, and visits to the Crocodile Breeding Centre or Elephant Breeding Centre, along with bird watching.

After Chitwan, the journey continues to Pokhara city tour—a beautiful city with attractions like Phewa Lake boating, Davis Fall, Gupteshwor Mahadev Cave, Seti Gorge, and the Tibetan Refugee Camp. The highlight of this Nepal tour package is the trek to the Ghorepani Poon Hill trek, starting from Nayapul. Trek through lush forests, villages, and hills to Tikhedhunga, Ghorepani, Tadapani, and Ghandruk village trek. Witness the majestic Poon Hill sunrise trek for breathtaking Himalayan views.

The tour concludes with visit Boudhanath Stupa, Pashupatinath Temple, Swoyambhunath stupa & Kathmandu durbar square and where you can enjoy a complimentary Nepali cultural dinner. This Nepal trekking and tour package combines adventure, nature, and cultural experiences, making it the best Nepal tour and trek for those seeking a memorable holiday in Nepal.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://api.himalayantrekkers.com/api/file-upload/trips%2FMarch2021%2Fpoon-hill-trek.jpg" alt="Poon Hill View" class="w-full h-full object-cover" />
</div>

### Why you'll love 12 Days Nepal Tour with Poon Hill Trek
- **Perfect Combination of Culture, Nature, and Adventure**: Experience Tharu villages, Chitwan jungle safaris, and Himalayan views.
- **Breathtaking Sunrise at Poon Hill**: Witness the magical sunrise over the Annapurna and Dhaulagiri ranges.
- **Explore Beautiful Pokhara**: Enjoy a peaceful Pokhara city tour with attractions like Phewa Lake boating and Davis Fall.
- **Wildlife Adventure in Chitwan**: Spot exotic animals during the Elephant or Jeep safari and enjoy a canoe ride.
- **Comfort and Hospitality**: From well-planned itineraries to a complimentary Nepali cultural dinner.`,
    highlights: [
      'Chitwan Jungle Safari, Tharu village tour, and Elephant/Jeep safari.',
      'Pokhara city tour including Phewa Lake boating and Davis Fall.',
      'Trek through lush forests and villages to Ghorepani and Ghandruk.',
      'Witness the majestic Poon Hill sunrise for breathtaking Himalayan views.',
      'Explore Kathmandu’s UNESCO World Heritage sites.'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu [altitude 1400m]', desc: 'Arrival at TIA, Kathmandu. Transfer to the hotel. Explore the city or relax.' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan [altitude 415m]', desc: 'Drive to Chitwan.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Experience Chitwan jungle safari, Tharu village tour, and activities.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara [altitude 830m]', desc: 'Drive to Pokhara and enjoy a city tour.' },
      { day: 'Day 5', title: 'Pokhara-Thikedhunga [Altitude 1480m]', desc: 'Start the trek from Nayapul to Thikedhunga.' },
      { day: 'Day 6', title: 'Thikedhunga-Ghorepani [Altitude 2874m]', desc: 'Trek to Ghorepani.' },
      { day: 'Day 7', title: 'Ghorepani-Poonhill [3210m]-Tadapani [2630m]', desc: 'Early morning hike to Poon Hill for sunrise, then trek to Tadapani.' },
      { day: 'Day 8', title: 'Tadapani-Ghandruk [Altitude 1940m]', desc: 'Trek to the beautiful village of Ghandruk.' },
      { day: 'Day 9', title: 'Ghandruk-Nayapul', desc: 'Trek down to Nayapul and drive back to Pokhara.' },
      { day: 'Day 10', title: 'Pokhara-Kathmandu', desc: 'Drive back to Kathmandu.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Visit Boudhanath, Pashupatinath, Swoyambhunath, and Kathmandu Durbar Square.' },
      { day: 'Day 12', title: 'Depart from Kathmandu', desc: 'Departure from Kathmandu.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by private vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained guide',
      'Pokhara city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Trekking guide, Porter, TIMS & ACAP permit, First Aid Kit, Trekking bag',
      'All applicable monument entrance fees and government/local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights Kathmandu, 2 Nights Pokhara, 4 Nights Lodge, 2 Nights Chitwan Resort'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner] outside Chitwan/Trek',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 12 days',
      '24 hrs WhatsApp help desk for any problem'
    ],
    information: `**Best Time for 12 Days Nepal Tour with Poon Hill Trek**
Spring (March to May) and Autumn (September to November) are the best times due to clear weather, stunning scenery, and comfortable trekking conditions. 

**Visa Information**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. Fees: 15 Days ($30), 30 Days ($50), 90 Days ($125).

**Booking & Cancellation**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu. Cancellation fees apply starting from 30 days before the trip.`,
    whyBookWithUs: [
      'We are local tour operator with 5+ years of experienced in tour & trekking operation',
      '99% satisfied customers & prompt response',
      '100% instant booking confirmation',
      'Secure online payment gateway without extra charges',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      'All insured vehicle we use in our tour, insured trekking guide & porter'
    ]
  }
,
  'muktinath-yatra-8d': {
    quickInfo: [
      { label: 'Duration', value: '4 Days 3 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2551m/8370ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep/Oct/Nov/Dec/Feb/Mar/Apr/May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Road & Cable car', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Experience the cultural and natural beauty of Nepal with the Kathmandu & Chandragiri Hills Tour. This 4-day journey offers a perfect blend of heritage exploration and scenic mountain vistas.

Your adventure begins in Kathmandu, where you’ll explore Bhaktapur Durbar Square, known for its stunning Malla-era palaces and intricate wood carvings. Nearby, Changunarayan Temple, Nepal’s oldest Hindu temple, offers historical insights and scenic views.

On the next leg, visit Pashupatinath Temple, a sacred Hindu shrine, and the iconic Boudhanath Stupa, one of the largest Buddhist stupas in the world. Wander through Kathmandu Durbar Square, a UNESCO-listed site filled with ancient palaces, temples, and vibrant local culture.

A scenic drive to Chandragiri Hills follows, where you’ll enjoy breathtaking Himalayan panoramas, including views of Everest and Annapurna. Take a cable car ride to the Bhaleshwar Mahadev Temple, a revered Hindu site, and soak in the tranquility of lush greenery.

End your tour with a mesmerizing sunrise over the Himalayas before returning to Kathmandu for your departure.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://www.muktinathdarshan.com/sites/default/files/basic/Muktinath-Packages.jpg" alt="Muktinath Yatra" class="w-full h-full object-cover" />
</div>

### Highlights of Kathmandu & Chandragiri Hills Tour
- Explore Kathmandu’s UNESCO World Heritage Sites.
- Witness the cultural richness of Bhaktapur Durbar Square.
- Enjoy a cable car ride to Chandragiri Hills.
- Capture stunning views of Mount Everest and Annapurna.
- Experience the sunrise over the Himalayan range.`,
    highlights: [
      'Explore Kathmandu’s UNESCO World Heritage Sites.',
      'Witness the cultural richness of Bhaktapur Durbar Square.',
      'Enjoy a cable car ride to Chandragiri Hills.',
      'Capture stunning views of Mount Everest and Annapurna.',
      'Experience the sunrise over the Himalayan range.'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu [altitude 1400m]', desc: 'Arrival at TIA. Transfer to your hotel and explore or relax.' },
      { day: 'Day 2', title: 'Kathmandu', desc: 'Sightseeing in Kathmandu including Bhaktapur Durbar Square and Changunarayan Temple.' },
      { day: 'Day 3', title: 'Kathmandu-Chandragiri Hills [2551m]', desc: 'Cable car ride to Chandragiri Hills and temple visit.' },
      { day: 'Day 4', title: 'Chandragiri Hills-Kathmandu/Departure', desc: 'Enjoy sunrise and depart.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'All applicable monument entrance fees',
      'Chandragiri Hills return cable car ticket',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu',
      '1 Night Chandragiri Hills Resort in Chandragiri'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Entrance fees for children in case of needed in any sightseeing place',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ],
    information: `**Best Time for Kathmandu & Chandragiri Hills Tour**
Spring (March – May) and Autumn (September – November) are the best times for clear skies, pleasant weather, and stunning views.

**Visa Information**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. Fees: 15 Days ($30), 30 Days ($50), 90 Days ($125).

**Tipping**
Tips are appreciated by your support team. Our suggestion is US$ 5 per day per tourist to driver and US$ 10 per day to guide.`,
    whyBookWithUs: [
      'We are local tour operator with 5+ years of experienced in tour & trekking operation',
      '99% satisfied customers & prompt response',
      '100% instant booking confirmation',
      'Secure online payment gateway without extra charges',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      'All insured vehicle we use in our tour, insured trekking guide & porter'
    ]
  },
  'kathmandu-tour-4d': {
    quickInfo: [
      { label: 'Duration', value: '4 Days 3 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2551m/8370ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Dec & Feb-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on an extraordinary Kathmandu tour package and immerse yourself in Nepal's rich culture, history, and natural beauty. This 4-day Kathmandu sightseeing tour is perfect for travelers seeking adventure, spirituality, and cultural discovery.

Your journey begins upon arrival at Tribhuvan International Airport, where our team warmly welcomes you. Spend the first day at your leisure, exploring the vibrant city of Kathmandu. On the second day, your Kathmandu tour kicks off with a visit to Chandragiri Hills, where you can enjoy breathtaking views of the Himalayas and explore the sacred Bhaleshwore Temple. A thrilling cable car ride adds excitement to your adventure, and for those seeking an adrenaline rush, the Bicycle Zipline is an optional activity that promises unforgettable thrills. The day continues with visits to the spiritual Swoyambhunath Stupa and the historic Kathmandu Durbar Square, both UNESCO World Heritage Sites.

On the third day, you’ll explore Nepal’s most iconic landmarks, starting with the majestic Boudhanath Stupa and the sacred Pashupatinath Temple. Dive into the medieval charm of Bhaktapur Durbar Square, known for its traditional architecture and cultural heritage. The evening concludes with a delightful cultural dinner in Kathmandu, featuring authentic Nepali cuisine and a live cultural show.

The final day offers an optional Nepal mountain flight experience, allowing you to witness Mount Everest and other Himalayan peaks from the skies. Depending on your departure schedule, we’ll ensure a seamless transfer to Tribhuvan International Airport, leaving you with incredible memories of your Kathmandu tour.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://www.attractivetravelnepal.com/wp-content/uploads/2022/09/kathmandu-tour.jpg" alt="Kathmandu Tour" class="w-full h-full object-cover" />
</div>
### Why You Will Love 4 Days Kathmandu Tour ?
The 4 days Kathmandu tour offers a perfect blend of culture, spirituality, natural beauty, and adventure, making it an unforgettable experience for every traveler. 
- **A Deep Dive into Kathmandu’s Heritage:** Explore UNESCO World Heritage Sites like Kathmandu Durbar Square, Swoyambhunath Stupa, and Boudhanath Stupa.
- **Breathtaking Himalayan Views:** At Chandragiri Hills, enjoy panoramic views of the majestic Himalayas.
- **Adventure and Thrill:** Experience the excitement of a cable car ride to Chandragiri Hills and optional Bicycle Zipline.
- **Spiritual Immersion:** Visit the sacred Pashupatinath Temple and Boudhanath Stupa.
- **Nepali Culture and Cuisine:** Indulge in a traditional cultural dinner in Kathmandu.

### Trip Cost for 2026 and 2027 (Price is Per Person)
- **Luxury Package:** US$ 1015 (1 pax) | US$ 645 (2 pax) | US$ 585 (3-5 pax)
- **Comfort Package:** US$ 705 (1 pax) | US$ 455 (2 pax) | US$ 400 (3-5 pax)
- **Standard Package:** US$ 580 (1 pax) | US$ 380 (2 pax) | US$ 330 (3-5 pax)
- **Budget Package:** US$ 560 (1 pax) | US$ 360 (2 pax) | US$ 310 (3-5 pax)`,
    highlights: [
      'A Deep Dive into Kathmandu’s Heritage',
      'Breathtaking Himalayan Views from Chandragiri',
      'Adventure and Thrill at Chandragiri Hills',
      'Spiritual Immersion at Pashupatinath and Boudhanath',
      'Nepali Culture and Cuisine Experience',
      'Optional Mountain Flight to see Mount Everest'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu [altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by a representative from Destination Nepal Tours & Travels Pvt. Ltd. You will then be transferred to your hotel in Kathmandu. Depending on your arrival time, you can explore the city on your own or relax at your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu City Tour', desc: 'Visit Chandragiri Hills, Swoyambhunath Stupa and Kathmandu Durbar Square.' },
      { day: 'Day 3', title: 'Kathmandu City Tour', desc: 'Explore Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. Enjoy a cultural dinner in the evening.' },
      { day: 'Day 4', title: 'Depart from Kathmandu', desc: 'Optional Everest mountain flight in the morning. Seamless transfer to Tribhuvan International Airport for your departure.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Chandragiri Hill cable car both way ticket',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast',
      'All accommodation in the mention hotel',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'kathmandu-pokhara-4d': {
    quickInfo: [
      { label: 'Duration', value: '4 Days 3 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on an unforgettable Tour with our 4 Days Kathmandu Pokhara Tour, designed for travelers seeking a short yet enriching experience in Nepal. Your journey begins upon arrival at Kathmandu airport, where our representative will warmly welcome you and provide a briefing about your tour while driving you to your hotel. This Kathmandu Pokhara tour package is perfect for those with limited time but a desire to explore the beauty of Nepal.

On the second day, you will take a morning flight to Pokhara, a city renowned for its stunning natural landscapes. Your first stop will be Bindabasini Temple, a sacred site that offers a glimpse into the local culture. Next, explore Davis Fall, where water cascades dramatically into a deep gorge, and visit Gupteshwor Cave, known for its fascinating rock formations. A visit to the Tibetan Refugee Camp will provide insight into the lives of Tibetan exiles and their rich culture. Afterward, enjoy a relaxing boat ride on Phewa Lake, where you can admire the breathtaking reflections of the Annapurna range.

The following day starts early with a trip to Sarangkot for a mesmerizing sunrise view over the Himalayas. This viewpoint is famous for its panoramic vistas, making it a highlight of the Nepal 4-day tour. After breakfast, you will fly back to Kathmandu and continue your sightseeing adventure. Visit Bhaktapur Durbar Square, a UNESCO World Heritage Site known for its medieval architecture, and explore Boudhanath Stupa, one of the largest stupas in Nepal. The day concludes with a visit to Pashupatinath Temple, a sacred Hindu site along the banks of the Bagmati River.

In the evening, enjoy a delightful Nepali dinner accompanied by a cultural program, allowing you to immerse yourself in the local traditions. After this enriching experience, you will depart the next day with cherished memories of your Kathmandu Pokhara trip. This Nepal holiday package offers a perfect blend of culture, adventure, and scenic beauty, making it an ideal choice for travelers looking to explore the best of Nepal in a short time.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://trippokhara.com/uploads/beautiful%20city%20of%20nepal%20-%20Pokhara.webp" alt="Pokhara Tour" class="w-full h-full object-cover" />
</div>

### Why you will love 4 Days Kathmandu Pokhara Tour ?
- **Stunning Scenic Flights:** Experience the breathtaking views of the Himalayas during scenic flights between Kathmandu and Pokhara.
- **Cultural Immersion in Two Iconic Cities:** The tour combines the rich cultural heritage of Kathmandu with the natural beauty of Pokhara.
- **Mesmerizing Sunrise at Sarangkot:** Witnessing the sunrise over the Himalayas from Sarangkot is a once-in-a-lifetime experience.
- **Nature and Adventure in Pokhara:** Pokhara offers an idyllic setting for nature lovers, with attractions like Davis Fall, the mystical Gupteshwor Cave, and boating at Phewa Lake.
- **Authentic Nepali Cultural Experience:** From a vibrant Nepali cultural program with dinner to visits to the Tibetan Refugee Camp.
- **Value for Money:** The package includes accommodation, transportation, some meals, and entrance fees.

### Best Time to Enjoy the Tour
The best time to enjoy the 4 Days Kathmandu & Pokhara Tour is during the **spring (March to May)** and **autumn (September to November)** seasons. These periods offer the most favorable weather conditions, making it ideal for sightseeing and outdoor activities with clear skies providing stunning views of the snow-capped Himalayan peaks.

### Trip Cost for 2026 and 2027 (Price is Per Person)
- **Luxury Package:** US$ 1290 (1 pax) | US$ 875 (2 pax) | US$ 800 (3-5 pax)
- **Comfort Package:** US$ 970 (1 pax) | US$ 675 (2 pax) | US$ 610 (3-5 pax)
- **Standard Package:** US$ 845 (1 pax) | US$ 600 (2 pax) | US$ 535 (3-5 pax)
- **Budget Package:** US$ 815 (1 pax) | US$ 575 (2 pax) | US$ 515 (3-5 pax)`,
    highlights: [
      'Scenic flight to Pokhara with Himalayan views',
      'Visit Bindabasini Temple, Davis Fall, and Gupteshwor Cave',
      'Relaxing boat ride on Phewa Lake',
      'Mesmerizing sunrise over the Himalayas from Sarangkot',
      "Explore Kathmandu's Bhaktapur Durbar Square, Boudhanath, and Pashupatinath",
      'Traditional Nepali dinner and cultural program'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu [altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by our representative. You will then be transferred to your hotel in Kathmandu. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara scenic flight & Pokhara City tour [altitude 830m/2723ft]', desc: 'Morning flight to Pokhara. Visit Bindabasini Temple, Davis Fall, Gupteshwor Cave, World Peace Stupa, and Phewa Lake.' },
      { day: 'Day 3', title: 'Pokhara-Kathmandu scenic flight & Explore Cultural Heritage', desc: 'Sunrise view from Sarangkot. Fly back to Kathmandu. Visit Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. Traditional dinner in the evening.' },
      { day: 'Day 4', title: 'Depart from Kathmandu with beautiful memories', desc: 'Departure from Kathmandu to your onward destination.' }
    ],
    inclusions: [
      'All Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      '1 full day Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'English speaking local guide in Pokhara for Sarangkot and Half day city tour',
      'Kathmandu-Pokhara-Kathmandu flight tickets with airport taxes',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'All accommodation in the mention hotel',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Entrance fees for children in case of needed in any sightseeing place',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 4 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-chitwan-pokhara-5d': {
    quickInfo: [
      { label: 'Duration', value: '5 Days 4 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `5 Days Kathmandu Chitwan Pokhara Tour is the perfect itinerary to explore Nepal’s most popular destinations in a short time. This well-designed tour takes you from Kathmandu to Chitwan by flight and then from Chitwan to Pokhara, allowing you to make the most of your visit while avoiding long drives. Upon arrival at Tribhuvan International Airport, you will be warmly welcomed by Destination Nepal Tours & Travels.

On the second day, take a flight to Chitwan, known for its lush jungles and diverse wildlife. Enjoy a thrilling Chitwan Jeep Safari or an Elephant Safari, with chances to spot rhinos, tigers, and elephants. Visit the traditional Tharu Village and experience the vibrant Tharu cultural program in the evening.

The next morning, fly to Pokhara, a city famous for its stunning views of the Annapurna range. Visit Bindabasini Temple, Davis Fall, and Gupteswore Mahadev Cave. Explore the Tibetan Refugee Camp, Seti Gorge, and enjoy serene boating on Phewa Lake. End your day with panoramic views from the World Peace Stupa.

On your last day, witness a breathtaking sunrise at Sarangkot before flying back to Kathmandu for a city tour featuring Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. This Nepal highlights tour combines natural beauty, culture, and wildlife for an unforgettable experience.

<div class="my-8 w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-md">
  <img src="https://www.easytournepal.com/admin/public/images/trip/kathmandu-pokhara-lumbini-chitwan-tour.jpg" alt="Kathmandu Chitwan Pokhara Tour" class="w-full h-full object-cover" />
</div>

### Why you'll love 5 Days Kathmandu Chitwan Pokhara Tour ?
- **Efficient Travel by Flight:** The tour is designed to maximize time and comfort by including flights between major cities.
- **Diverse Experiences in a Short Time:** Experience Nepal’s vibrant cultural heritage, rich wildlife, and stunning natural beauty.
- **Wildlife Safari in Chitwan:** A thrilling opportunity to see exotic wildlife such as rhinos, tigers, and elephants.
- **Scenic Beauty of Pokhara:** Breathtaking Himalayan views and serene lakes with attractions like Phewa Lake and Sarangkot Sunrise.
- **Cultural Immersion:** Includes visits to iconic cultural sites like Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square.

### Best time to visit
Spring (March to May) and Autumn (September to November) offer the best weather, clear skies, excellent visibility, and active wildlife for safaris in Chitwan.

### Trip Cost for 2026 and 2027 (Price is Per Person)
- **Luxury Package:** US$ 2150 (1 pax) | US$ 1440 (2 pax) | US$ 1295 (3-5 pax)
- **Comfort Package:** US$ 1775 (1 pax) | US$ 1190 (2 pax) | US$ 1050 (3-5 pax)
- **Standard Package:** US$ 1545 (1 pax) | US$ 1070 (2 pax) | US$ 940 (3-5 pax)
- **Budget Package:** US$ 1490 (1 pax) | US$ 1020 (2 pax) | US$ 890 (3-5 pax)`,
    highlights: [
      'Efficient Travel by Flight between cities',
      'Wildlife Safari in Chitwan National Park',
      'Scenic Beauty of Pokhara and Phewa Lake',
      'Breathtaking Sarangkot Sunrise',
      'Cultural Immersion in Kathmandu (Boudhanath, Pashupatinath)'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by a representative. Transfer to your hotel and explore or relax. Accommodation: Hotel [1 Night]' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Quick Flight to Experience Nepal’s Wildlife. Jeep Safari, Tharu Village, and cultural program.' },
      { day: 'Day 3', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: "Scenic Flight to Explore Nepal's Natural Wonders. Sightseeing in Pokhara including Davis Fall and boating on Phewa Lake." },
      { day: 'Day 4', title: 'Pokhara- Kathmandu', desc: 'Scenic Return Journey from Himalayan Beauty to Cultural Heritage. Sarangkot sunrise, fly to Kathmandu, and sightseeing.' },
      { day: 'Day 5', title: 'Depart from Kathmandu', desc: 'Seamless transfer to the airport for your departure.' }
    ],
    inclusions: [
      'All Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      '1 Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Guided tour in Lumbini with English speaking local guide',
      'Pokhara city tour with English speaking local guide',
      'All applicable monument entrance fees',
      'Kathmandu-Chitwan flight ticket & airport taxes',
      'Chitwan-Pokhara flight ticket & airport taxes',
      'Pokhara-Lumbini(Bhairahawa) flight ticket & airport taxes',
      'Lumbini(Bhairahawa)-Kathmandu flight ticket & airport taxes',
      'All government and local taxes',
      'Daily buffet breakfast in Kathmandu',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      'All accommodation in the mention hotel'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Entrance fees for children in case of needed in any sightseeing place',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 5 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-chitwan-pokhara-lumbini-5d': {
    quickInfo: [
      { label: 'Duration', value: '5 Days 4 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 5 Days Kathmandu Chitwan Pokhara Lumbini Tour is an ideal short trip to explore Nepal’s cultural, natural, and historical highlights. This tour uses flights between cities to maximize your time and offer a comfortable travel experience, making it perfect for travelers with a tight schedule.

The journey begins with a warm welcome at Tribhuwan International Airport, Kathmandu. After check-in, explore the famous UNESCO World Heritage Sites, including Swoyambhunath Stupa, Kathmandu Durbar Square, Pashupatinath Temple, and Boudhanath Stupa. If time does not permit, the remaining sites will be covered on your departure day.

The next morning, fly to Chitwan to enjoy thrilling activities like an Elephant Safari or Jeep Safari, a Tharu Village Tour, and a cultural evening with a Tharu Dance Performance. After an overnight stay, take a morning flight to Pokhara, where you’ll explore attractions like Phewa Lake, Bindabasini Temple, Davis Fall, Gupteswori Cave, World Peace Stupa, and Pumdikot Shiva Temple, with a memorable sunrise at Sarangkot.

Conclude your journey with a flight to Lumbini, the birthplace of Lord Buddha, to visit the Sacred Garden and surrounding monasteries. The same day, fly back to Kathmandu, wrapping up an unforgettable Kathmandu Chitwan Pokhara Lumbini Tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.himalayajourneys.com/assets/images/tour/kathmandu-pokhara-lumbini-tour.jpg" alt="Tour Highlights" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1280,h_870/w_79,x_14,y_14,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/vfyskzz71a7auu2kquco/5-DayChitwanWildlifeLumbiniPilgrimageTourFromPokhara.jpg" alt="Chitwan Wildlife & Lumbini" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.satoriadventuresnepal.com/public/uploads/kathmandu-lumbini-chitwan-and-pokhara-tour90.jpg" alt="Kathmandu to Lumbini" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 5 Days Kathmandu Chitwan Pokhara Lumbini Tour ?
- **A Perfect Blend of Culture, Nature, and History:** Explore UNESCO World Heritage Sites in Kathmandu and dive deep into Nepal’s rich cultural and historical heritage.
- **Thrilling Wildlife Adventures in Chitwan:** Immerse yourself in the wilderness of Chitwan National Park with exciting activities like an Elephant Safari and Jeep Safari.
- **Serene Beauty and Adventure in Pokhara:** Enjoy the tranquil Phewa Lake, marvel at Davis Fall, explore mystical caves, and catch the sunrise at Sarangkot.
- **Convenient and Comfortable Travel:** Maximizes your time with domestic flights between cities, perfect for travelers with a tight schedule.
- **Unforgettable Spiritual Connection in Lumbini:** The spiritual significance of Lumbini, the birthplace of Lord Buddha, is unmatched.

### Best Time for the Tour
**Spring (March-May)** and **Autumn (September-November)** are the best times to explore Nepal, offering crystal-clear skies, pleasant weather, and optimal conditions for wildlife spotting and mountain views.

### Trip Cost for 2026 and 2027 (Price is Per Person)
- **Luxury Package:** US$ 2435 (1 pax) | US$ 1635 (2 pax) | US$ 1460 (3-5 pax)
- **Comfort Package:** US$ 2060 (1 pax) | US$ 1385 (2 pax) | US$ 1220 (3-5 pax)
- **Standard Package:** US$ 1825 (1 pax) | US$ 1260 (2 pax) | US$ 1105 (3-5 pax)
- **Budget Package:** US$ 1785 (1 pax) | US$ 1225 (2 pax) | US$ 1070 (3-5 pax)`,
    highlights: [
      'Explore famous UNESCO World Heritage Sites in Kathmandu',
      'Thrilling Wildlife Adventures in Chitwan National Park',
      'Serene Beauty and Sarangkot Sunrise in Pokhara',
      'Spiritual Connection at the Sacred Garden in Lumbini',
      'Convenient Travel with domestic flights between cities'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400 m/4595ft]', desc: "On arrival at the Tribhuvan International Airport, you will be greeted by our representative. Explore the city's famous UNESCO World Heritage Sites. Accommodation: Hotel [1 Night]" },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Fly to Chitwan to enjoy thrilling activities like an Elephant Safari or Jeep Safari and a Tharu Village Tour.' },
      { day: 'Day 3', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: 'Morning flight to Pokhara. Explore attractions like Phewa Lake, Bindabasini Temple, Davis Fall, Gupteswori Cave, and World Peace Stupa.' },
      { day: 'Day 4', title: 'Pokhara-Lumbini-Kathmandu', desc: 'Sunrise at Sarangkot. Conclude your journey with a flight to Lumbini to visit the Sacred Garden. The same day, fly back to Kathmandu.' },
      { day: 'Day 5', title: 'Depart from Kathmandu', desc: 'Departure transfer to the airport.' }
    ],
    inclusions: [
      'All airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'Kathmandu to Chitwan flight tickets',
      'Chitwan to Pokhara flight tickets',
      'Pokhara to Lumbini flight tickets',
      'Lumbini to Kathmandu flight tickets',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'All accommodation in the mention hotel',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Jungle Villa resort(Safari Villa) or similar in Chitwan'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 5 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-muktinath-5d': {
    quickInfo: [
      { label: 'Duration', value: '5 Days 4 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 5 Days Kathmandu Pokhara Muktinath Tour is a perfect combination of natural beauty, spiritual experiences, and cultural exploration in Nepal. This tour begins with a warm welcome at Tribhuwan International Airport, Kathmandu, by Destination Nepal Tours & Travels. Upon arrival, you’ll have free time or the option for an additional tour if you arrive early.

On the second day, take a morning flight to Pokhara, where you’ll explore attractions such as Phewa Lake (with boating), Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, Tibetan Refugee Camp, and Seti Gorge.

The third day features an early morning flight to Jomsom, followed by a spiritual visit to the sacred Muktinath Temple, located at an altitude of 3,710 meters (12,172 ft). Explore the serene surroundings of the temple, including Dhumba Lake and the traditional charm of Jomsom Village, all set against stunning Himalayan views.

On the fourth day, return to Pokhara by flight and continue directly to Kathmandu. In Kathmandu, visit iconic landmarks such as Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. End your day with an authentic Nepali dinner accompanied by a live cultural performance, offering a glimpse into Nepal’s rich traditions.

The tour concludes on the fifth day with your departure, leaving you with unforgettable memories of the Kathmandu Pokhara Muktinath Tour. This short yet enriching itinerary is ideal for travelers seeking a seamless blend of Nepal’s cultural, spiritual, and natural wonders.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://cimages1.touristlink.com/data/cache/J/O/M/S/O/M/M/U/jomsom-muktinath_2_640_480.jpg" alt="Muktinath Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.coretreks.com/wp-content/uploads/2024/07/11-days-nepal-highlight-tour-1683449541-1.jpg" alt="Scenic views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.overlandescape.com/storage/packages/180723122145-kathmandu-pokhara-muktinathjomsom.jpg" alt="Himalayan vistas" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 5 Days Kathmandu Pokhara Muktinath Tour ?
- **Scenic Flights:** Enjoy breathtaking aerial views of Nepal’s landscapes with flights between Kathmandu, Pokhara, and Jomsom.
- **Spiritual Experience:** Visit the sacred Muktinath Temple, a revered site for both Hindus and Buddhists.
- **Cultural Immersion:** Explore iconic landmarks like Boudhanath Stupa, Pashupatinath Temple, and Budhanilkantha Temple.
- **Natural Beauty:** Witness the serene Phewa Lake, the charm of Jomsom Village, and the stunning Himalayan vistas.
- **Seamless Itinerary:** A well-planned tour that blends culture, nature, and spirituality with minimal travel time.
- **Authentic Experience:** Relish a traditional Nepali dinner with a live cultural show.

### Best Time for the Tour
**Spring (March to May)** and **Autumn (September to November)** are the ideal seasons. Clear skies and reliable flights to Jomsom make it perfect for visiting Muktinath Temple and exploring scenic landscapes. Winter and Monsoon are not recommended due to unpredictable weather, flight delays, and heavy snowfall.

### Trip Cost for 2026 and 2027 (Price is Per Person)
- **Luxury Package:** US$ 1805 (1 pax) | US$ 1350 (2 pax) | US$ 1265 (3-5 pax)
- **Comfort Package:** US$ 1485 (1 pax) | US$ 1155 (2 pax) | US$ 1080 (3-5 pax)
- **Standard Package:** US$ 1290 (1 pax) | US$ 1025 (2 pax) | US$ 955 (3-5 pax)
- **Budget Package:** US$ 1265 (1 pax) | US$ 1000 (2 pax) | US$ 935 (3-5 pax)`,
    highlights: [
      'Breathtaking aerial views with flights between Kathmandu, Pokhara, and Jomsom',
      'Spiritual visit to the sacred Muktinath Temple',
      'Explore Boudhanath Stupa and Pashupatinath Temple in Kathmandu',
      'Witness the serene Phewa Lake and stunning Himalayan vistas',
      'Traditional Nepali dinner with a live cultural show'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by our representative. You will then be transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Morning flight to Pokhara. Explore attractions such as Phewa Lake, Bindabasini Temple, Davis Fall, and Gupteswori Mahadev Cave.' },
      { day: 'Day 3', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft)', desc: 'Early morning flight to Jomsom. Visit the sacred Muktinath Temple and explore Dhumba Lake and Jomsom Village.' },
      { day: 'Day 4', title: 'Jomsom-Pokhara-Kathmandu', desc: 'Return flight to Pokhara, then continue to Kathmandu. Visit iconic landmarks and enjoy an authentic Nepali dinner with a live cultural performance.' },
      { day: 'Day 5', title: 'Depart from Kathmandu', desc: 'Departure transfer to the airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in all hotels',
      'All accommodation in the mention hotel',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      "1 Night Om's Home in Jomsom"
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Entrance fees for children in case of needed in any sightseeing place',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 5 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-chitwan-pokhara-lumbini-6d': {
    quickInfo: [
      { label: 'Duration', value: '6 Days 5 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 6 Days Kathmandu Chitwan Pokhara Lumbini Tour is perfect for those who have limited time but wish to explore Nepal’s most iconic tourist attractions. This itinerary allows travelers to experience Nepal’s rich cultural heritage, scenic beauty, and unique wildlife in just six days. With well-planned flights between destinations, this tour ensures maximum comfort and convenience for travelers.

Your journey begins as soon as you land at Tribhuvan International Airport in Kathmandu, where you will be greeted by a representative from Destination Nepal Tours & Travels. After a warm welcome and transfer to your hotel, you’ll have time to relax and prepare for the adventure ahead.

The next morning, the tour truly begins with a flight to Chitwan. Known for its wildlife and lush jungles, Chitwan offers a memorable experience for nature lovers. After arriving, you will either embark on an Elephant Safari or a Jeep Safari, depending on your resort location. This is a fantastic opportunity to spot rhinos, deer, crocodiles, and even Bengal tigers if you're lucky. In the evening, you will visit a traditional Tharu Village to get a glimpse of the local way of life, followed by a Tharu cultural program, where you’ll enjoy traditional dances and songs.

The following day, take a morning flight to Pokhara, one of Nepal’s most picturesque cities. Pokhara is famous for its stunning lakes, mountain views, and adventure activities. Upon arrival, you'll visit the city’s top attractions, including boating on Phewa Lake, exploring the Bindabasini Temple, admiring the natural beauty of Davis Fall, and venturing into the mystical Gupteswori Mahadev Cave. Don't forget to visit the Tibetan Refugee Camp and marvel at the deep Seti Gorge. These activities offer a perfect mix of nature, culture, and history, making Pokhara a must-visit destination.

On the fourth day, rise early for a breathtaking sunrise view of the Himalayas from Sarangkot. This vantage point provides stunning views of Annapurna and Machhapuchhre (Fishtail) Mountains, a highlight of the entire tour. After breakfast, you’ll catch a flight to Lumbini, the birthplace of Lord Buddha.

In Lumbini, you’ll visit the sacred Maya Devi Temple, the exact spot where Buddha was born, and explore the many monasteries and peaceful gardens surrounding it. The spiritual significance of Lumbini draws pilgrims from all over the world. You’ll have time to reflect on this profound experience before taking an evening flight back to Kathmandu.

The final full day of your tour includes visits to some of Kathmandu’s most important UNESCO World Heritage Sites. Begin with a visit to the Boudhanath Stupa, one of the largest and holiest stupas in the world, followed by a trip to Pashupatinath Temple, a sacred Hindu temple complex on the banks of the Bagmati River. Lastly, you will explore Bhaktapur Durbar Square, known for its well-preserved ancient architecture, vibrant local culture, and historic palaces.

In the evening, enjoy a special farewell with a Nepali dinner and cultural program, where you can experience traditional Nepali cuisine and performances. This will be the perfect way to end your 6 Days Kathmandu Chitwan Pokhara Lumbini Tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.kathmandusummitadventure.com/wp-content/uploads/2023/09/chitwan-pokhara-lumbini-tour.jpg" alt="Chitwan Pokhara Lumbini" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.satoriadventuresnepal.com/public/uploads/kathmandu-lumbini-chitwan-and-pokhara-tour70.jpg" alt="Tour highlights" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 6 Days Kathmandu Chitwan Pokhara Lumbini Tour ?
- **Diverse Experiences:** Kathmandu's culture and history, Chitwan's wildlife, Pokhara's stunning lakes and Himalayan views, and Lumbini's spiritual significance.
- **Convenience:** Covers significant landmarks in Nepal with convenient flights between destinations.
- **Cultural and Spiritual Exploration:** Ancient temples, palaces, UNESCO sites, and the birthplace of Buddha.
- **Nature and Adventure:** Boating, adventure sports, jungle safaris, and elephant rides.
- **Compact Itinerary:** Immersive experience covering multiple significant locations without feeling rushed.

### Best Time to Travel
**Spring (March to May)** and **Autumn (September to November)** are the best times for this tour due to clear skies and minimal disruptions. Summer/Monsoon and Winter are also enjoyable with proper planning to account for occasional flight delays.

### Trip Cost for 2026 and 2027 (Price is Per Person /US$)
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,735</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,870</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,690</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,610</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,545</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,260</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,550</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,380</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,300</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,235</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,005</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,385</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,225</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,150</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,090</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,945</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,350</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,195</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,115</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,055</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Wildlife spotting in Chitwan National Park via Elephant or Jeep Safari',
      'Boating on Phewa Lake and exploring the Bindabasini Temple in Pokhara',
      'Breathtaking sunrise view of the Himalayas from Sarangkot',
      "Visit the sacred Maya Devi Temple in Lumbini, the birthplace of Lord Buddha",
      "Explore Kathmandu's UNESCO World Heritage Sites: Boudhanath, Pashupatinath, and Bhaktapur"
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by a representative. You will then be transferred to your hotel in Kathmandu. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]: Explore Wildlife and Culture', desc: 'Flight to Chitwan. Embark on an Elephant or Jeep Safari to spot wildlife. Evening visit to a traditional Tharu Village with a cultural program.' },
      { day: 'Day 3', title: 'Chitwan-Pokhara[altitude 830m/2723ft]: Discover Nature and Adventure', desc: 'Morning flight to Pokhara. Visit top attractions including Phewa Lake, Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, Tibetan Refugee Camp, and Seti Gorge.' },
      { day: 'Day 4', title: "Pokhara to Lumbini Flight and Cultural Exploration–Discover Buddha's Birthplace and Return to Kathmandu", desc: "Sunrise view from Sarangkot. Flight to Lumbini to visit Maya Devi Temple and monasteries. Evening flight back to Kathmandu." },
      { day: 'Day 5', title: 'Kathmandu City Tour', desc: 'Visit Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. Farewell Nepali dinner and cultural program in the evening.' },
      { day: 'Day 6', title: 'Depart from Kathmandu', desc: 'Departure transfer to the airport.' }
    ],
    inclusions: [
      'All Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      '1 Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Guided tour in Lumbini with English speaking local guide',
      'Pokhara city tour with English speaking local guide',
      'All applicable monument entrance fees',
      'Kathmandu-Chitwan flight ticket & airport taxes',
      'Chitwan-Pokhara flight ticket & airport taxes',
      'Pokhara-Lumbini(Bhairahawa) flight ticket & airport taxes',
      'Lumbini(Bhairahawa)-Kathmandu flight ticket & airport taxes',
      'All government and local taxes',
      'Daily buffet breakfast in Kathmandu',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      'All accommodation in the mention hotel',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Entrance fees for children in case of needed in any sightseeing place',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 6 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-bandipur-pokhara-6d': {
    quickInfo: [
      { label: 'Duration', value: '6 Days 5 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 6 Days Kathmandu Bandipur Pokhara Tour is a perfect blend of culture, natural beauty, and adventure, designed to offer an unforgettable experience in Nepal. Your journey begins with a warm welcome by Destination Nepal Tours and Travels at Tribhuvan International Airport, Kathmandu. If you arrive early, you can enjoy a free day or an optional tour.

On the second day, embark on a scenic drive to Bandipur, a charming hilltop village with breathtaking views of the Trishuli and Marshyandi rivers. En route, thrill-seekers can opt for an exciting Trishuli River Rafting adventure. Explore the quaint Bandipur village at your leisure and soak in its serene ambiance.

The next morning, drive to Pokhara, where you’ll visit iconic attractions such as Phewa Lake Boating, Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, Tal Barahi Temple, the Tibetan Refugee Camp, and Seti Gorge. On day four, enjoy a spectacular Sarangkot Sunrise with panoramic Himalayan views before heading back to Kathmandu. A flight option is also available for added convenience.

Day five takes you to UNESCO World Heritage Sites like Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. Conclude your trip with a complimentary Nepali dinner and cultural show, immersing yourself in Nepal's rich traditions.

The tour ends with your departure on day six, leaving you with cherished memories of Nepal's wonders.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.himalayantrekkingpath.com/_next/image?url=https%3A%2F%2Fmedia.app.himalayantrekkingpath.com%2Fuploads%2Ffullbanner%2Fparagliding-pokhara-1.webp&w=3840&q=75&dpl=dpl_3KNdaNwCDiUgUVh4mjVZ9wigSein" alt="Pokhara Adventure" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://fis-api.nepalkameleonholidays.com/media/attachments/pokhara-bandipur-wheelchair-tour%20(6).jpg" alt="Bandipur Village" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://cdn.kimkim.com/files/a/images/f53f3b62e6d69d63810af64bd341b7694d94530e/big-a2bffd34ebc1934337f3173b31765d55.jpg" alt="Scenic Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 6 Days Kathmandu Bandipur Pokhara Tour ?
- **Diverse Destinations:** Experience the perfect mix of cultural landmarks, serene hilltop villages, and natural beauty.
- **Adventure Opportunities:** Enjoy optional activities like thrilling Trishuli River rafting and boating on Phewa Lake.
- **Breathtaking Himalayan Views:** Witness a magical sunrise over the Himalayas from Sarangkot.
- **Rich Cultural Immersion:** Visit iconic UNESCO World Heritage Sites and enjoy a Nepali dinner with a cultural show.
- **Comfort and Convenience:** The itinerary offers both scenic drives and optional flights, making the tour enjoyable and hassle-free.

### Best Time for the Tour
**Spring (March to May)** and **Autumn (September to November)** are the best times with clear skies, pleasant weather, and stunning mountain views. Summer/Monsoon may face occasional road blockages, and Winter mornings can be foggy.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026 and 2027 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,585</td>
        <td class="px-6 py-4 text-center text-gray-800">$935</td>
        <td class="px-6 py-4 text-center text-gray-800">$825</td>
        <td class="px-6 py-4 text-center text-gray-800">$780</td>
        <td class="px-6 py-4 text-center text-gray-800">$740</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,125</td>
        <td class="px-6 py-4 text-center text-gray-800">$660</td>
        <td class="px-6 py-4 text-center text-gray-800">$560</td>
        <td class="px-6 py-4 text-center text-gray-800">$510</td>
        <td class="px-6 py-4 text-center text-gray-800">$475</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$930</td>
        <td class="px-6 py-4 text-center text-gray-800">$540</td>
        <td class="px-6 py-4 text-center text-gray-800">$445</td>
        <td class="px-6 py-4 text-center text-gray-800">$400</td>
        <td class="px-6 py-4 text-center text-gray-800">$360</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$895</td>
        <td class="px-6 py-4 text-center text-gray-800">$510</td>
        <td class="px-6 py-4 text-center text-gray-800">$415</td>
        <td class="px-6 py-4 text-center text-gray-800">$370</td>
        <td class="px-6 py-4 text-center text-gray-800">$335</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Scenic drive to Bandipur, a charming hilltop village',
      'Spectacular Sarangkot Sunrise with panoramic Himalayan views',
      'Boating on Phewa Lake and exploring Bindabasini Temple',
      'Visit UNESCO World Heritage Sites like Boudhanath Stupa and Pashupatinath Temple',
      'Complimentary Nepali dinner and cultural show'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by a representative. You will then be transferred to your hotel in Kathmandu. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]', desc: 'Scenic drive to Bandipur with optional Trishuli River Rafting. Explore the charming hilltop village.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara. Visit iconic attractions including Phewa Lake Boating, Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, and Seti Gorge.' },
      { day: 'Day 4', title: 'Pokhara-Kathmandu', desc: 'Sarangkot Sunrise tour. Drive or optional flight back to Kathmandu.' },
      { day: 'Day 5', title: 'Kathmandu', desc: 'Visit UNESCO World Heritage Sites like Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. Complimentary Nepali dinner and cultural show.' },
      { day: 'Day 6', title: 'Depart from Kathmandu', desc: 'Departure transfer to the airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'All accommodation in the mention hotel',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Ghaun Ghar or similar in Bandipur'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 6 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-muktinath-6d': {
    quickInfo: [
      { label: 'Duration', value: '6 Days 5 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 6 Days Kathmandu Pokhara Muktinath Tour is a perfect blend of spirituality, scenic beauty, and cultural exploration in Nepal. Your journey begins as you arrive at Tribhuvan International Airport in Kathmandu, where Destination Nepal Tours and Travels warmly welcomes you. If you arrive early, you can relax or opt for an additional city tour.

The next day, enjoy a scenic drive to Pokhara along the beautiful riversides of Trishuli, Marshyandi, and Seti. For adventure enthusiasts, optional activities include rafting in the Trishuli River or a cable car ride to the sacred Manakamana Temple.

On day three, take a morning flight to Jomsom and visit the revered Muktinath Temple, known for its spiritual significance. Explore Dhumba Lake and the charming Jomsom village, immersing yourself in the Himalayan beauty.

The following day, fly back to Pokhara and explore its highlights, including Bindabasini Temple, Gupteswori Mahadev Cave, Tibetan Refugee Camp, Seti Gorge, and boating on the serene Phewa Lake.

On day five, return to Kathmandu via a morning flight for a full-day sightseeing tour of Budhanilkantha Temple, Boudhanath Stupa, and Pashupatinath Temple. In the evening, enjoy a delightful Nepali dinner accompanied by a cultural show.

Your 6-day adventure concludes with a departure, leaving you with unforgettable memories of the Kathmandu Pokhara Muktinath Tour. This tour promises spiritual tranquility, stunning landscapes, and cultural richness, making it a must-visit experience in Nepal.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.hikingadventuretreks.com/uploads/socialmedia/kathmandu-pokhara-bandipur-.jpg" alt="Tour Highlights" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.gracefuladventure.com/wp-content/uploads/2025/04/cover-625x449.jpg" alt="Scenic Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.pelago.com/img/products/NP-Nepal/multi-day-tour-to-bandipur-and-pokhara-visitnepal2020/d65814e1-dbad-4e67-ac81-97ed8fe69eb7_multi-day-tour-to-bandipur-and-pokhara-visitnepal2020.jpg" alt="Beautiful Landscapes" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 6 Days Kathmandu Pokhara Muktinath Tour ?
- **Spiritual Experience at Muktinath Temple:** Visit the sacred Muktinath Temple, a revered site for both Hindus and Buddhists.
- **Scenic Drives and Flights:** Enjoy picturesque drives along Nepal's beautiful riversides and thrilling flights to Jomsom.
- **Cultural and Religious Exploration:** Explore iconic cultural landmarks in Kathmandu, including Pashupatinath Temple, Boudhanath Stupa, and Budhanilkantha Temple.
- **Highlights of Pokhara:** Visit Bindabasini Temple, Gupteswori Mahadev Cave, Tibetan Refugee Camp, and enjoy boating on Phewa Lake.
- **Authentic Nepali Farewell:** Conclude your journey with a memorable Nepali dinner accompanied by a vibrant cultural show.

### Best Time for Tour
**Spring (March to May)** and **Autumn (September to November)** are the best times for travel with clear skies, comfortable temperatures, and stunning views of the mountains. Summer/Monsoon may face road disruptions, and Winter flights to Jomsom are usually not operational due to heavy snowfall.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026 and 2027 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,015</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,400</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,290</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,250</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,215</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,570</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,130</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,030</td>
        <td class="px-6 py-4 text-center text-gray-800">$990</td>
        <td class="px-6 py-4 text-center text-gray-800">$955</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,350</td>
        <td class="px-6 py-4 text-center text-gray-800">$995</td>
        <td class="px-6 py-4 text-center text-gray-800">$905</td>
        <td class="px-6 py-4 text-center text-gray-800">$860</td>
        <td class="px-6 py-4 text-center text-gray-800">$830</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,315</td>
        <td class="px-6 py-4 text-center text-gray-800">$960</td>
        <td class="px-6 py-4 text-center text-gray-800">$870</td>
        <td class="px-6 py-4 text-center text-gray-800">$830</td>
        <td class="px-6 py-4 text-center text-gray-800">$795</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Visit the revered Pashupatinath Temple, a UNESCO World Heritage Site',
      'Enjoy stunning Himalayan views and serene Phewa Lake in Pokhara',
      'Explore the sacred Muktinath Temple, highly revered by devotees',
      'Flights from Pokhara to Muktinath and back to save time',
      'Memorable Nepali dinner accompanied by a vibrant cultural show'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by a representative. You will then be transferred to your hotel in Kathmandu. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara along the beautiful riversides of Trishuli, Marshyandi, and Seti.' },
      { day: 'Day 3', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft)', desc: 'Morning flight to Jomsom. Visit the revered Muktinath Temple. Explore Dhumba Lake and Jomsom village.' },
      { day: 'Day 4', title: 'Jomsom-Pokhara', desc: 'Fly back to Pokhara and explore its highlights, including Bindabasini Temple, Gupteswori Mahadev Cave, Tibetan Refugee Camp, Seti Gorge, and boating on Phewa Lake.' },
      { day: 'Day 5', title: 'Pokhara-Kathmandu', desc: 'Return to Kathmandu via a morning flight. Full-day sightseeing tour of Budhanilkantha Temple, Boudhanath Stupa, and Pashupatinath Temple. Nepali dinner and cultural show.' },
      { day: 'Day 6', title: 'Depart from Kathmandu', desc: 'Departure transfer to the airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Jomsom-Muktinath-Jomsom by local transport Jeep/bus etc',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Muktinath temple visit with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Pokhara-Kathmandu flight tickets with airport taxes',
      'Daily buffet breakfast in all hotels',
      'All accommodation in the mention hotel',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      "1 Night Om's Home in Jomsom"
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 6 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-nagarkot-7d': {
    quickInfo: [
      { label: 'Duration', value: '7 Days 6 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/7136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Kathmandu Pokhara Nagarkot Tour-7 Days is an incredible journey showcasing Nepal’s most iconic destinations. Starting with a warm welcome from a representative of Destination Nepal Tours and Travels at Tribhuvan International Airport, this tour takes you on a cultural, spiritual, and scenic adventure through Kathmandu, Pokhara, and Nagarkot, creating memories to last a lifetime.

On the second day, explore the cultural wonders of Kathmandu. Begin at the sacred Pashupatinath Temple, a revered Hindu shrine dedicated to Lord Shiva. Visit the majestic Boudhanath Stupa, one of the largest in the world, followed by the Swayambhunath Stupa (Monkey Temple) with panoramic views of the Kathmandu Valley. End the day at Kathmandu Durbar Square, a UNESCO World Heritage Site brimming with ancient palaces and temples.

Day three begins with a scenic drive to Pokhara, the serene city of lakes. En route, opt for thrilling activities like Trishuli River rafting or a cable car ride to the Manakamana Temple, known for fulfilling the wishes of devotees. Once in Pokhara, you’ll be captivated by the tranquil beauty of this enchanting city.

The fourth day is all about exploring Pokhara’s highlights. Visit the Tal Barahi Temple by boat on Phewa Lake, and see attractions like the Bindabasini Temple, Seti River Gorge, Davis Fall, and the Gupteshwor Mahadev Cave. You’ll also visit the Tibetan Refugee Camp, offering a glimpse into the lives of Tibetan communities.

On the fifth day, rise early to witness a breathtaking sunrise from Sarangkot, with panoramic views of the Himalayas. After breakfast, visit the Pumdikot Shiva Temple and the iconic World Peace Stupa. For adventure enthusiasts, Pokhara offers exciting activities such as paragliding, the Zip Flyer, ultra-light flights, hot air balloon rides, and the new Sarangkot cable car for stunning aerial views.

Day six takes you to Nagarkot, a serene hill station famous for its Himalayan vistas. The drive is picturesque, and the evening in Nagarkot is peaceful, surrounded by breathtaking mountain views.

On the final day, wake early to enjoy the sunrise over the Himalayas, including views of Everest on clear days. After a relaxing morning in Nagarkot, return to Kathmandu for your departure, taking home unforgettable memories of your 7 Days Kathmandu Pokhara Nagarkot Tour.

This tour is the perfect balance of cultural discovery and natural beauty, offering you the best of Nepal in just seven days.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/99/55/a1.jpg" alt="Kathmandu Heritage" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nestadventure.com/wp-content/uploads/2019/06/Nagarkot-Tour-Mountain-View.jpg" alt="Nagarkot Sunrise" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.teamramadventure.com/public/uploads/720_0836.jpg" alt="Pokhara Phewa Lake" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 7 Days Kathmandu Pokhara Nagarkot Tour ?
- **Natural beauty:** Stunning natural landscapes, including the Himalayan mountain range, lakes, forests, and rivers.
- **Cultural experiences:** Numerous temples, monasteries, and historic sites in Kathmandu.
- **Adventure activities:** Options like trekking, paragliding, and white water rafting available in Pokhara.
- **Relaxation:** Nagarkot is a peaceful mountain village known for its views of the Himalayas.
- **Unique experiences:** A glimpse into the country's history, traditions, and way of life.

### The best time for 7 Days Kathmandu Pokhara Nagarkot Tour
**Autumn (September to November):** Mild temperatures and clear skies, perfect for mountain views and trekking. Vibrant festivals like Dashain and Tihar.
**Spring (March to May):** Warm and pleasant, with blooming rhododendron forests. Ideal time for photography.
Avoid the monsoon season (June to August) due to heavy rains, which can disrupt travel plans and limit visibility.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,035</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,195</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,055</td>
        <td class="px-6 py-4 text-center text-gray-800">$995</td>
        <td class="px-6 py-4 text-center text-gray-800">$940</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,445</td>
        <td class="px-6 py-4 text-center text-gray-800">$835</td>
        <td class="px-6 py-4 text-center text-gray-800">$710</td>
        <td class="px-6 py-4 text-center text-gray-800">$650</td>
        <td class="px-6 py-4 text-center text-gray-800">$595</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,185</td>
        <td class="px-6 py-4 text-center text-gray-800">$685</td>
        <td class="px-6 py-4 text-center text-gray-800">$565</td>
        <td class="px-6 py-4 text-center text-gray-800">$510</td>
        <td class="px-6 py-4 text-center text-gray-800">$460</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,135</td>
        <td class="px-6 py-4 text-center text-gray-800">$645</td>
        <td class="px-6 py-4 text-center text-gray-800">$525</td>
        <td class="px-6 py-4 text-center text-gray-800">$465</td>
        <td class="px-6 py-4 text-center text-gray-800">$420</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Explore Kathmandu’s UNESCO World Heritage Sites: Boudhanath, Pashupatinath, and Bhaktapur',
      'Boating on Phewa Lake and exploring the Bindabasini Temple in Pokhara',
      'Breathtaking sunrise view of the Himalayas from Sarangkot',
      'Sunrise over the Himalayas, including views of Everest from Nagarkot',
      'Complimentary Nepali dinner with typical Nepal cultural dance'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by a representative. You will then be transferred to your hotel in Kathmandu. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu Sightseeing', desc: 'Visit Pashupatinath Temple, Boudhanath Stupa, Swayambhunath Stupa (Monkey Temple), and Kathmandu Durbar Square.' },
      { day: 'Day 3', title: 'Kathmandu to Pokhara [altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara, the serene city of lakes. En route, opt for thrilling activities like Trishuli River rafting or a cable car ride.' },
      { day: 'Day 4', title: 'Pokhara Sightseeing', desc: 'Visit Tal Barahi Temple by boat on Phewa Lake. See Bindabasini Temple, Seti River Gorge, Davis Fall, Gupteshwor Mahadev Cave, and Tibetan Refugee Camp.' },
      { day: 'Day 5', title: 'Pokhara Sightseeing', desc: 'Sunrise from Sarangkot. After breakfast, visit the Pumdikot Shiva Temple and the iconic World Peace Stupa. Optional adventure activities.' },
      { day: 'Day 6', title: 'Pokhara to Nagarkot[2175m/7136ft]', desc: 'Picturesque drive to Nagarkot, a serene hill station famous for its Himalayan vistas.' },
      { day: 'Day 7', title: 'Depart from Kathmandu', desc: 'Enjoy sunrise views. Return to Kathmandu for your departure, taking home unforgettable memories.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara & Nagarkot',
      'All accommodation in the mention hotel',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '3 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot'
    ],
    exclusions: [
      'Nepal Visa fee & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Entrance fees for children in case of needed in any sightseeing place',
      'Meals [Lunch & dinner: INR 600-1500 per lunch/dinner]',
      'Any transportation cost outside of the regular itinerary',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-chitwan-7d': {
    quickInfo: [
      { label: 'Duration', value: '7 Days 6 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `7 Days Kathmandu Pokhara Chitwan Tour is the perfect way to explore Nepal’s diverse landscapes, cultural heritage, and wildlife in a short time. Starting from your arrival at Tribhuwan International Airport, you will be warmly welcomed by a representative from Destination Nepal Tours & Travels, setting the tone for a memorable journey ahead.

The tour begins with a scenic drive to Pokhara, one of Nepal's most picturesque cities. Along the way, you’ll pass beautiful landscapes, rivers, and small villages. Once in Pokhara, you will experience breathtaking views of the Annapurna mountain range and visit some of the most iconic attractions. Early the next morning, you will take in the mesmerizing sunrise view from Nagarkot, where the Himalayas are bathed in golden light. Afterward, a visit to the Bindabasi Temple, dedicated to Goddess Durga, will add a spiritual start to the day.

Your journey continues with a stop at the Seti Gorge, known for its deep river canyon and white water, followed by a trip to the famous Davis Fall—a unique underground waterfall. Nearby, you’ll visit the sacred Gupteshwore Mahadev Cave, a natural cave that houses a revered shrine of Lord Shiva. Afterward, enjoy a relaxing boat ride to Tal Barahi Temple, which is located on a small island in the middle of Phewa Lake, one of Pokhara’s most serene spots. The day concludes with an evening visit to the World Peace Stupa, where panoramic views of Pokhara and the Himalayas provide a peaceful end to your Pokhara experience.

The next morning, after a hearty breakfast, the tour takes you to Chitwan National Park, Nepal’s most famous wildlife reserve. Depending on the location of your resort, you’ll have the option of choosing between an Elephant Safari or a Jeep Safari, both offering opportunities to see Bengal tigers, rhinos, and various species of birds in their natural habitats. You will also be treated to a Tharu Village tour, where you’ll learn about the lifestyle and culture of the local Tharu people. In the evening, enjoy the vibrant Tharu Cultural Dance, which showcases the traditional dance and music of the region.

After a night in Chitwan, the next morning will start with breakfast, and then you’ll drive back to Kathmandu. The final day of your tour is dedicated to exploring some of the Kathmandu Valley’s most significant UNESCO World Heritage Sites. You will visit Bhaktapur Durbar Square, known for its stunning architecture and historic palaces. Then, make your way to the Boudhanath Stupa, one of the largest stupas in the world and a key pilgrimage site for Buddhists. The day continues with a visit to the sacred Pashupatinath Temple, one of the holiest Hindu temples dedicated to Lord Shiva.

In the evening, you’ll enjoy a traditional Nepali dinner with a cultural show, providing a fitting conclusion to your trip. The tour ends with your departure as you are dropped off at the International Airport, leaving you with good memories of your Nepal tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/f8/0f/2b.jpg" alt="Kathmandu Heritage" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.himalayanrecreation.com/uploads/fullbanner/kathmandu-chitwan-pokhara-tour.webp" alt="Wildlife Adventure" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nepalhikingteam.com/_next/image?url=https%3A%2F%2Fnht-api.nepalhikingteam.com%2Fmedia%2Ftrip-gallery%2Fmedia-0cfab254-1721902878.jpg&w=3840&q=75" alt="Himalayan Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 7 Days Kathmandu Pokhara Chitwan Tour?
- **Diverse Experiences in a Short Time:** Combines cultural, natural, and wildlife experiences in just seven days.
- **Breathtaking Natural Beauty:** From stunning Himalayan sunrise views to serene lakes and waterfalls.
- **Wildlife Adventure in Chitwan:** Chance to experience a Jeep or Elephant Safari to see tigers and rhinos.
- **Rich Cultural and Historical Sites:** Explore famous UNESCO World Heritage Sites offering deep insights.
- **Cultural Immersion with Local Traditions:** Tharu cultural dance, village tours, and traditional Nepali dinner.

### Seasonal Guide
- **Spring (March to May):** Warm weather, blooming rhododendrons, and clear skies.
- **Summer (June to August):** Monsoon rains bring lush landscapes and fewer crowds.
- **Autumn (September to November):** Clear skies and festive vibes make it the peak season.
- **Winter (December to February):** A quieter experience with cool weather and sunny days.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/2027 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,010</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,230</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,105</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,050</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,010</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,430</td>
        <td class="px-6 py-4 text-center text-gray-800">$860</td>
        <td class="px-6 py-4 text-center text-gray-800">$745</td>
        <td class="px-6 py-4 text-center text-gray-800">$695</td>
        <td class="px-6 py-4 text-center text-gray-800">$655</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,140</td>
        <td class="px-6 py-4 text-center text-gray-800">$705</td>
        <td class="px-6 py-4 text-center text-gray-800">$600</td>
        <td class="px-6 py-4 text-center text-gray-800">$550</td>
        <td class="px-6 py-4 text-center text-gray-800">$510</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,070</td>
        <td class="px-6 py-4 text-center text-gray-800">$640</td>
        <td class="px-6 py-4 text-center text-gray-800">$535</td>
        <td class="px-6 py-4 text-center text-gray-800">$485</td>
        <td class="px-6 py-4 text-center text-gray-800">$445</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Stunning Himalayan sunrise view from Nagarkot',
      'Wildlife adventure in Chitwan National Park including Jungle Safari',
      'Relaxing boat ride to Tal Barahi Temple on Phewa Lake',
      'Explore some of Nepal’s famous UNESCO World Heritage Sites',
      'Tharu cultural dance and traditional Nepali dinner with cultural show'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'On arrival at the Tribhuvan International Airport, you will be greeted by a representative. Transfer to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]: The Ultimate Himalayan Experience', desc: 'Scenic drive to Pokhara, passing beautiful landscapes. Enjoy breathtaking views of the Annapurna range.' },
      { day: 'Day 3', title: 'A Day in Pokhara: Exploring Nepal’s Scenic Gem', desc: 'Sunrise view, visit Bindabasi Temple, Seti Gorge, Davis Fall, Gupteshwore Mahadev Cave, and boat ride on Phewa Lake to Tal Barahi Temple.' },
      { day: 'Day 4', title: 'Pokhara-Chitwan[altitude 415m/1361ft]: The Best of Nepal\'s Beauty and Wildlife', desc: 'Drive to Chitwan National Park. Elephant or Jeep Safari to see Bengal tigers and rhinos. Tharu Village tour and Cultural Dance.' },
      { day: 'Day 5', title: 'Chitwan-Kathmandu: Wildlife, Culture, and Sacred Sites', desc: 'After breakfast, drive back to Kathmandu.' },
      { day: 'Day 6', title: 'Sacred Sites and Ancient Wonders: Kathmandu City Tour', desc: 'Visit Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. Traditional Nepali dinner and cultural show.' },
      { day: 'Day 7', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Jungle Villa resort(Safari Villa) or similar in Chitwan'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-chitwan-pokhara-7d': {
    quickInfo: [
      { label: 'Duration', value: '7 Days 6 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `7 Days Kathmandu Chitwan Pokhara Tour offers a captivating journey through Nepal’s most iconic destinations. Begin your Nepal tour with a warm welcome at Tribhuvan International Airport, where our representative will greet you. The tour starts with a scenic drive to Chitwan, where you’ll spend two nights immersing yourself in the unique culture and wildlife of the region. In Chitwan, embark on a Tharu Village tour to experience the local way of life and enjoy a vibrant cultural program. Explore the Chitwan National Park with an exciting elephant or jeep safari, and take a tranquil canoe ride along the Rapti River. Visit the crocodile or elephant breeding centers to learn about conservation efforts and see these magnificent creatures up close.

After your Chitwan adventure, travel to Pokhara for an overnight stay. Pokhara, renowned for its stunning natural beauty, offers a range of attractions. Start with a city tour to explore its lakeside charm and visit notable sites. Early the next morning, head to Sarangkot for a breathtaking sunrise view over the Himalayas, a perfect way to witness the majestic peaks bathed in the early morning light.

Following your time in Pokhara, return to Kathmandu. The next day is dedicated to exploring the cultural and historical highlights of the city. Visit Pashupatinath Temple, a sacred Hindu site, and Boudhanath Stupa, one of the largest Buddhist stupas in Nepal. Explore Bhaktapur Durbar Square, known for its well-preserved medieval architecture and vibrant local culture. In the evening, enjoy a traditional Nepali dinner accompanied by a cultural program, providing a memorable end to your Nepal tour.

This 7-Day Kathmandu, Chitwan & Pokhara Tour offers a perfect blend of wildlife experiences, cultural immersion, and natural beauty. From the rich traditions of Tharu Village and the excitement of a jungle safari to the serene views of the Himalayas and the vibrant culture of Kathmandu, this tour ensures a comprehensive and unforgettable experience of Nepal.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/9c/eb/cf.jpg" alt="Kathmandu Culture" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://nepaltoursandtravels.com/wp-content/uploads/2025/11/Chitwan.jpg" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.himalayajourneys.com/assets/images/tour/kathmandu-pokhara-lumbini-tour.jpg" alt="Pokhara Scenery" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 7 Days Kathmandu Chitwan Pokhara Tour?
- **Diverse Experiences:** A rich mix of wildlife adventures, scenic beauty, and cultural and historical exploration.
- **Stunning Scenery:** Highlights like the sunrise view from Sarangkot and the serene beauty of Pokhara’s lakes.
- **Immersive Cultural Encounters:** Engage with local traditions through Tharu Village tours and Nepali dinners.
- **Exciting Wildlife Adventures:** Thrilling wildlife safaris, canoe rides, and visits to breeding centers in Chitwan National Park.

### Best Time to Enjoy the Tour
- **Spring (March to May):** One of the best times with pleasant weather and blooming rhododendrons.
- **Summer (June to August):** Lush greenery and fewer crowds, though occasional showers occur.
- **Autumn (September to November):** The most popular time, offering clear skies and mild temperatures.
- **Winter (December to February):** Cooler temperatures with clear skies offering excellent mountain views.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/2027 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,025</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,265</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,135</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,085</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,045</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,445</td>
        <td class="px-6 py-4 text-center text-gray-800">$880</td>
        <td class="px-6 py-4 text-center text-gray-800">$765</td>
        <td class="px-6 py-4 text-center text-gray-800">$715</td>
        <td class="px-6 py-4 text-center text-gray-800">$670</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,150</td>
        <td class="px-6 py-4 text-center text-gray-800">$705</td>
        <td class="px-6 py-4 text-center text-gray-800">$600</td>
        <td class="px-6 py-4 text-center text-gray-800">$550</td>
        <td class="px-6 py-4 text-center text-gray-800">$510</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,105</td>
        <td class="px-6 py-4 text-center text-gray-800">$660</td>
        <td class="px-6 py-4 text-center text-gray-800">$550</td>
        <td class="px-6 py-4 text-center text-gray-800">$510</td>
        <td class="px-6 py-4 text-center text-gray-800">$470</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Exciting elephant or jeep safari in Chitwan National Park',
      'Tranquil canoe ride along the Rapti River',
      'Breathtaking sunrise view over the Himalayas from Sarangkot',
      'Visit Pashupatinath Temple and Boudhanath Stupa in Kathmandu',
      'Traditional Nepali dinner accompanied by a cultural program'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan to immerse yourself in the unique culture and wildlife of the region.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Tharu Village tour, cultural program, elephant or jeep safari, canoe ride along the Rapti River, and a visit to the breeding centers.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: 'Travel to Pokhara for an overnight stay. Explore its lakeside charm.' },
      { day: 'Day 5', title: 'Pokhara-Kathmandu', desc: 'Sarangkot sunrise view. Return drive to Kathmandu.' },
      { day: 'Day 6', title: 'Kathmandu', desc: 'Explore Pashupatinath Temple, Boudhanath Stupa, and Bhaktapur Durbar Square. Traditional Nepali dinner with a cultural program.' },
      { day: 'Day 7', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-jomsom-muktinath-7d': {
    quickInfo: [
      { label: 'Duration', value: '7 Days 6 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `7 Days Kathmandu Pokhara Jomsom Muktinath Tour is a perfect blend of natural beauty, cultural richness, and spiritual experiences. The tour begins as you are warmly welcomed by a representative from Destination Nepal Tours & Travels at Tribhuwan International Airport, Kathmandu. The next day, you embark on a scenic countryside drive from Kathmandu to Pokhara, passing riversides and lush landscapes that showcase the beauty of rural Nepal. On the third day, an early morning flight from Pokhara to Jomsom offers stunning aerial views of the Annapurna range. Upon arrival at Jomsom Airport, you are greeted by our representative and transferred to your hotel. After checking in, you will proceed on a spiritual journey to Muktinath Temple for the Muktinath Temple Darshan. The temple is a sacred pilgrimage site for both Hindus and Buddhists. After visiting the temple and the surrounding area, you will return to Jomsom, where you will explore the serene Dhumba Lake.

The next morning, a flight back to Pokhara awaits, and once you arrive, your Pokhara sightseeing begins. The day is filled with visits to iconic sites such as the Bindabasini Temple, Seti Gorge, Davis Fall, and Gupteswor Mahadev Cave, as well as a stop at the Tibetan Refugee Camp. End the day with a peaceful boating experience on the tranquil waters of Phewa Lake. The following day, you will drive back to Kathmandu, where you will visit some of the city’s most famous cultural and religious landmarks. These include Patan Durbar Square, a UNESCO World Heritage Site known for its stunning Newari architecture, and the revered Budhanilkantha Temple. You will also visit the majestic Boudhanath Stupa and the sacred Pashupatinath Temple, one of the most important Hindu temples in Nepal. In the evening, enjoy a traditional Nepali dinner accompanied by a cultural program in a typical Nepali restaurant, offering an authentic experience of Nepali hospitality and cuisine.

On the final day, you depart from Nepal with unforgettable memories of your Kathmandu Pokhara Jomsom Muktinath Tour. This tour package offers a mix of adventure, spirituality, and cultural immersion, making it an ideal option for travelers seeking a comprehensive Nepal experience.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://marditreknepal.com/wp-content/uploads/2025/05/muktinath-temple-drshn.webp" alt="Muktinath Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=375,height=340,dpr=2/tour_img/e1247b80d13efd54fe2f3ed4af9e4a01ff9df15f20987e215d929c9b76974c88.jpg" alt="Pokhara Lake" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://muktinathtempletour.com/wp-content/uploads/2019/08/Jomsome-Airport-.jpg" alt="Jomsom Airport" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 7 Days Kathmandu Pokhara Jomsom Muktinath Tour?
- **Spiritual and Religious Significance:** Visit Muktinath Temple, one of the most important pilgrimage sites for Hindus and Buddhists.
- **Scenic Beauty:** Breathtaking views of the Himalayan mountain range, Annapurna and Dhaulagiri peaks, and the Kali Gandaki River Valley.
- **Cultural Experience:** Experience the local culture and lifestyle, visit traditional villages, and interact with the locals.
- **Easy Accessibility:** Includes a scenic flight from Pokhara to Jomsom, making it a convenient option for those with limited time.
- **Food and Cuisine:** Indulge in local cuisine, a unique blend of Tibetan, Nepali, and Indian flavors.

### Best Seasons for the Tour
- **Spring (March to May):** Ideal for clear skies, blooming rhododendrons, and scenic flights.
- **Summer/Monsoon (June to August):** Lush greenery but travel may be affected by rains. Occasional flight delays.
- **Autumn (September to November):** Peak season with crisp air and vibrant festivals. Clear mountain views.
- **Winter (December to February):** Quiet season with stunning snowy peaks. Great for Muktinath visits and serene Pokhara.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,140</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,435</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,315</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,270</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,230</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,590</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,105</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,000</td>
        <td class="px-6 py-4 text-center text-gray-800">$950</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,340</td>
        <td class="px-6 py-4 text-center text-gray-800">$945</td>
        <td class="px-6 py-4 text-center text-gray-800">$845</td>
        <td class="px-6 py-4 text-center text-gray-800">$800</td>
        <td class="px-6 py-4 text-center text-gray-800">$765</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,295</td>
        <td class="px-6 py-4 text-center text-gray-800">$905</td>
        <td class="px-6 py-4 text-center text-gray-800">$810</td>
        <td class="px-6 py-4 text-center text-gray-800">$765</td>
        <td class="px-6 py-4 text-center text-gray-800">$730</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Visit the famous Muktinath Temple, a pilgrimage site for Hindus and Buddhists',
      'Scenic flights between Pokhara and Jomsom offering stunning aerial views',
      'Breathtaking views of the Annapurna and Dhaulagiri mountain ranges',
      'Cultural sightseeing in Kathmandu and Pokhara',
      'Traditional Nepali dinner accompanied by a cultural program'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]: A Journey Through Nepal\'s Countryside', desc: 'Scenic drive to Pokhara passing riversides and lush landscapes.' },
      { day: 'Day 3', title: 'Breathtaking Flight from Pokhara to Jomsom[Altitude 2745m/9005ft): Gateway to Muktinath', desc: 'Early morning flight to Jomsom. Transfer to hotel, then proceed to Muktinath Temple Darshan. Explore Dhumba Lake.' },
      { day: 'Day 4', title: 'Scenic Return Flight from Jomsom to Pokhara: Aerial Views of the Himalayas', desc: 'Flight back to Pokhara. Sightseeing including Bindabasini Temple, Seti Gorge, Davis Fall, and Gupteswor Mahadev Cave. Boating on Phewa Lake.' },
      { day: 'Day 5', title: 'Picturesque Drive from Pokhara to Kathmandu: A Journey Through Nepal\'s Heartland', desc: 'Drive back to Kathmandu.' },
      { day: 'Day 6', title: 'Cultural Exploration of Kathmandu', desc: 'Visit Patan Durbar Square, Budhanilkantha Temple, Boudhanath Stupa, and Pashupatinath Temple. Traditional Nepali dinner with a cultural program.' },
      { day: 'Day 7', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'Jomsom-Muktinath-Jomsom by local transport Jeep/bus etc',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Om\'s Home in Jomsom'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-nagarkot-dhulikhel-7d': {
    quickInfo: [
      { label: 'Duration', value: '7 Days 6 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on an unforgettable 7 Days Kathmandu Nagarkot Dhulikhel Tour and explore Nepal's cultural and natural wonders. Your adventure begins with a warm welcome at Tribhuvan International Airport by Destination Nepal Tours and Travels. Spend your arrival day at leisure or enjoy an optional tour if you arrive early.

Day two features a full-day sightseeing tour of Changunarayan Temple and Bhaktapur Durbar Square, followed by a scenic drive to Nagarkot for an overnight stay. Wake up to a stunning Himalayan sunrise and, after breakfast, drive to Dhulikhel, stopping en route at the charming Panauti Village. Enjoy another morning of Himalayan views in Dhulikhel before returning to Kathmandu to visit Namo Buddha, Boudhanath Stupa, and Pashupatinath Temple.

Day five includes exploring Patan Durbar Square, Swoyambhunath Stupa, and Kathmandu Durbar Square. On the sixth day, visit serene spots like Dakshinkali Temple, Chobhar, Pharping, and Kirtipur, and end with a delightful Nepali dinner accompanied by a vibrant cultural performance.

This comprehensive tour ensures a perfect blend of cultural exploration, natural beauty, and relaxation. Book your Kathmandu, Nagarkot & Dhulikhel tour for an unforgettable journey in Nepal!

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/99/55/a1.jpg" alt="Kathmandu Heritage" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nestadventure.com/wp-content/uploads/2019/06/Nagarkot-Tour-Mountain-View.jpg" alt="Nagarkot Sunrise" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://thehimalayantreks.com/wp-content/uploads/2019/04/boudhanath-stupa.jpg" alt="Boudhanath Stupa" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 7 Days Kathmandu Nagarkot Dhulikhel Tour?
- **Breathtaking Himalayan Sunrise Views:** Witness stunning sunrise views over the Himalayas from Nagarkot and Dhulikhel.
- **Rich Cultural Exploration:** Visit iconic UNESCO World Heritage Sites like Bhaktapur Durbar Square, Pashupatinath, and Boudhanath Stupa.
- **Unique Village Experience at Panauti:** Explore the charming and historic Panauti Village.
- **Peaceful Retreats:** Enjoy the tranquility of Namo Buddha and the serene environment of Dhulikhel.
- **Authentic Nepali Dinner:** Savor a delicious Nepali dinner while enjoying a lively cultural performance.

### Best Time to Visit
- **Spring (March to May):** The best season with clear skies, blooming rhododendrons, and warm temperatures.
- **Summer/Monsoon (June to August):** Lush greenery, but heavy rainfall can obscure views.
- **Autumn (September to November):** Ideal offering crisp weather, clear mountain vistas, and lively festivals.
- **Winter (December to February):** Unique experience with snow-capped peaks, though mornings can be foggy.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,975</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,175</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,030</td>
        <td class="px-6 py-4 text-center text-gray-800">$970</td>
        <td class="px-6 py-4 text-center text-gray-800">$925</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,440</td>
        <td class="px-6 py-4 text-center text-gray-800">$845</td>
        <td class="px-6 py-4 text-center text-gray-800">$710</td>
        <td class="px-6 py-4 text-center text-gray-800">$655</td>
        <td class="px-6 py-4 text-center text-gray-800">$605</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,175</td>
        <td class="px-6 py-4 text-center text-gray-800">$695</td>
        <td class="px-6 py-4 text-center text-gray-800">$570</td>
        <td class="px-6 py-4 text-center text-gray-800">$510</td>
        <td class="px-6 py-4 text-center text-gray-800">$470</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,140</td>
        <td class="px-6 py-4 text-center text-gray-800">$665</td>
        <td class="px-6 py-4 text-center text-gray-800">$540</td>
        <td class="px-6 py-4 text-center text-gray-800">$485</td>
        <td class="px-6 py-4 text-center text-gray-800">$440</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Breathtaking Himalayan sunrise views from Nagarkot and Dhulikhel',
      'Rich cultural exploration in Bhaktapur Durbar Square, Pashupatinath, and Boudhanath',
      'Unique village experience at the historic Panauti Village',
      'Peaceful retreats at Namo Buddha and Dhulikhel',
      'Authentic Nepali dinner and cultural show'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Nagarkot [2175m/4136ft]', desc: 'Full-day sightseeing tour of Changunarayan Temple and Bhaktapur Durbar Square, followed by a scenic drive to Nagarkot.' },
      { day: 'Day 3', title: 'Nagarkot-Dhulikhel[Altitude 1550m/5085ft]', desc: 'Wake up to a stunning Himalayan sunrise. Drive to Dhulikhel, stopping en route at the charming Panauti Village.' },
      { day: 'Day 4', title: 'Dhulikhel-Kathmandu', desc: 'Enjoy Himalayan views in Dhulikhel before returning to Kathmandu to visit Namo Buddha, Boudhanath Stupa, and Pashupatinath Temple.' },
      { day: 'Day 5', title: 'Kathmandu', desc: 'Explore Patan Durbar Square, Swoyambhunath Stupa, and Kathmandu Durbar Square.' },
      { day: 'Day 6', title: 'Kathmandu', desc: 'Visit serene spots like Dakshinkali Temple, Chobhar, Pharping, and Kirtipur. Enjoy a delightful Nepali dinner and cultural performance.' },
      { day: 'Day 7', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Dhulikhel Mountain resort or similar in Dhulikhel'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-bandipur-pokhara-7d': {
    quickInfo: [
      { label: 'Duration', value: '7 Days 6 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `7 Days Kathmandu Bandipur Pokhara Tour is the perfect way to experience the diverse beauty and culture of Nepal. Starting from Kathmandu, this Nepal tour package offers an exciting journey filled with historical landmarks, stunning landscapes, and memorable cultural experiences. Upon arrival at Tribhuvan International Airport, you will be welcomed by a representative from Destination Nepal Tours and Travels. If you arrive early in Kathmandu, you can enjoy some free time exploring the vibrant streets or relaxing at your hotel. The next day, you’ll begin your adventure by driving to Bandipur village, where you can soak in the peaceful ambiance and admire the traditional Newari architecture. A cable car ride in Bandipur is a recent addition to the itinerary, offering a fun and scenic way to take in the stunning views of the surrounding hills.

On the third day, you’ll drive from Bandipur to Pokhara, the city of lakes. Once you arrive, you’ll have the opportunity to relax and explore the famous Lakeside area, situated on the bank of Phewa Lake. You can enjoy a leisurely evening walk or unwind in one of the cozy cafes by the water. The next morning, a visit to Sarangkot awaits, where you can witness a breathtaking sunrise and panoramic views of the Himalayas, including the majestic Annapurna and Dhaulagiri ranges. After breakfast, your Pokhara tour continues with visits to Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, and Seti Gorge, all of which showcase the natural and cultural beauty of this region. You’ll also enjoy a peaceful boat ride on Phewa Lake, stopping at the Tal Barahi Temple, which is situated on a small island in the middle of the lake. Later in the evening, you’ll visit the World Peace Pagoda, a tranquil site that offers stunning views of the city and the lake.

The following day, you’ll drive back to Kathmandu, where more cultural wonders await. You will visit Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. In the evening, enjoy a delightful Nepali dinner with a cultural show at a traditional restaurant. Your tour ends with a heartfelt farewell, taking with you beautiful memories of your time spent exploring Nepal’s rich heritage and natural beauty.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.enepaltour.com/public/images/upload/package/slider/1457243443_pokhara.jpg" alt="Pokhara Lake" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://joshitours.org/wp-content/uploads/2024/02/nepal-1.jpg" alt="Kathmandu Culture" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.gracefuladventure.com/wp-content/uploads/2024/12/pokhara-oy-lt-1-1630391646.jpg" alt="Bandipur Village" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 7 Days Kathmandu Bandipur Pokhara Tour?
- **Rich cultural experiences:** Explore the rich cultural heritage of Nepal, including UNESCO World Heritage Sites, ancient temples, and traditional markets.
- **Natural beauty:** From the stunning views of the Himalayas in Bandipur to the tranquil lakes and lush forests of Pokhara.
- **Well-planned itinerary:** Enjoy a hassle-free and enjoyable experience with comfortable accommodation, transportation, and guided tours.
- **Friendly people:** Experience the warmth and hospitality of the Nepalese locals.
- **Authentic cuisine:** Taste authentic Nepalese cuisine, including traditional dishes like momos and dal bhat.

### Best Seasons for the Tour
- **Spring (March to May):** Enjoy mild weather, clear skies, and blooming rhododendrons. Perfect for exploring Pokhara's lakes.
- **Summer/Monsoon (June to August):** Lush landscapes but challenging travel due to rains. Serene lakeside views in Pokhara.
- **Autumn (September to November):** Peak travel season with cool weather and clear mountain views. Ideal for sunrise at Sarangkot.
- **Winter (December to February):** Quiet season with clear days and cooler temperatures. Comfortable sightseeing in Kathmandu and Bandipur.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,900</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,125</td>
        <td class="px-6 py-4 text-center text-gray-800">$995</td>
        <td class="px-6 py-4 text-center text-gray-800">$940</td>
        <td class="px-6 py-4 text-center text-gray-800">$895</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,370</td>
        <td class="px-6 py-4 text-center text-gray-800">$810</td>
        <td class="px-6 py-4 text-center text-gray-800">$690</td>
        <td class="px-6 py-4 text-center text-gray-800">$635</td>
        <td class="px-6 py-4 text-center text-gray-800">$590</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,100</td>
        <td class="px-6 py-4 text-center text-gray-800">$640</td>
        <td class="px-6 py-4 text-center text-gray-800">$535</td>
        <td class="px-6 py-4 text-center text-gray-800">$480</td>
        <td class="px-6 py-4 text-center text-gray-800">$435</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,045</td>
        <td class="px-6 py-4 text-center text-gray-800">$595</td>
        <td class="px-6 py-4 text-center text-gray-800">$490</td>
        <td class="px-6 py-4 text-center text-gray-800">$435</td>
        <td class="px-6 py-4 text-center text-gray-800">$395</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Scenic drive to Bandipur with a cable car ride offering stunning views',
      'Explore the vibrant streets and traditional Newari architecture of Bandipur',
      'Witness breathtaking sunrises from Sarangkot in Pokhara',
      'Discover Pokhara\'s natural beauty including lakes, caves, and waterfalls',
      'Visit Kathmandu\'s iconic UNESCO World Heritage Sites'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]: Scenic Journey and Cultural Exploration in Nepal', desc: 'Drive to Bandipur village. Enjoy the peaceful ambiance and traditional Newari architecture. Experience a scenic cable car ride.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]: Discover Nepal\'s Hidden Gems and Lakeside Beauty', desc: 'Drive from Bandipur to Pokhara. Relax and explore the famous Lakeside area on the bank of Phewa Lake.' },
      { day: 'Day 4', title: 'Pokhara Tour: Explore the Beauty of Nepal’s Lakeside City and Himalayan Views', desc: 'Visit Sarangkot for sunrise. Explore Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, Seti Gorge, and enjoy boating on Phewa Lake. Visit World Peace Pagoda.' },
      { day: 'Day 5', title: 'Pokhara-Kathmandu: Scenic Drive and Cultural Highlights of Nepal', desc: 'Drive back to Kathmandu.' },
      { day: 'Day 6', title: 'Kathmandu Tour: Explore Nepal’s Cultural and Historical attractions', desc: 'Visit Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. Delightful Nepali dinner with a cultural show.' },
      { day: 'Day 7', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Ghaun Ghar or similar in Bandipur'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-chitwan-pokhara-lumbini-7d': {
    quickInfo: [
      { label: 'Duration', value: '7 Days 6 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 7 Days Kathmandu Chitwan Pokhara Lumbini Tour is the perfect way to experience the beauty and culture of Nepal in a short time. This Nepal city tour starts in the capital, Kathmandu, where you'll be welcomed by a representative of Destination Nepal Tours and Travels at Tribhuvan International Airport. The next morning, you'll take a flight from Kathmandu to Chitwan, where you will enjoy a 2-night stay. In Chitwan, you’ll visit a Tharu village to witness the local way of life and watch their Tharu cultural dance performances. Depending on your hotel location, you’ll experience either an Elephant safari or a Jeep safari, which takes you through Chitwan National Park for a chance to spot some of Nepal’s amazing wildlife. The tour also includes a Canoe ride in the Rapti River, where you can spot crocodiles and other aquatic creatures, and a visit to the Crocodile Breeding Centre or Elephant Breeding Centre, depending on the location of your stay.

After your exciting time in Chitwan, you will fly to Pokhara. Known for its stunning landscapes, Pokhara is a must-see during your Kathmandu to Pokhara tour. You’ll visit popular sites such as the Bindabasini Temple, the Davis Falls, and the Gupteshwor Mahadev Cave, a sacred cave dedicated to Lord Shiva. You’ll also explore the Tibetan Refugee Camp and the beautiful Seti Gorge. Another highlight of the Pokhara visit is a trip to the World Peace Stupa, where you can enjoy breathtaking views of the city and the surrounding Himalayas. Afterward, you’ll go boating on Phewa Lake, a serene experience in one of Nepal's most scenic spots.

The next morning, you will visit Sarangkot for a stunning sunrise view over the Himalayas. This moment is one of the top attractions on the Nepal tour package, as the sight of the sun rising behind the mountains is unforgettable. After breakfast in Pokhara, you’ll fly to Lumbini, the birthplace of Lord Buddha. In Lumbini, you’ll visit the Maya Devi Temple, where Buddha was born, and explore the surrounding monasteries, learning about the rich history and spirituality of this UNESCO World Heritage site.

After your Lumbini tour, you’ll take a morning flight back to Kathmandu. In the capital, you’ll visit some of Nepal’s most sacred and historical landmarks, including the Pashupatinath Temple, the Boudhanath Stupa, and Patan Durbar Square. In the evening, enjoy a traditional Nepali cultural dinner, complete with music and performances, to cap off your incredible journey. The Nepal tour package combines natural beauty, cultural heritage, and spiritual significance, allowing you to explore Nepal’s top four cities—Kathmandu, Chitwan, Pokhara, and Lumbini—in just seven days. Because the tour uses domestic flights, you can cover these destinations quickly and comfortably.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nepalhimalayastrekking.com/public/uploads/caption-5.jpg" alt="Kathmandu Sightseeing" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://corporatetreks.com/wp-content/uploads/2020/01/lumbini.jpg" alt="Lumbini Maya Devi Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.satoriadventuresnepal.com/public/uploads/kathmandu-lumbini-chitwan-and-pokhara-tour70.jpg" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 7 Days Kathmandu Chitwan Pokhara Lumbini Tour?
- **Convenience and Comfort:** Includes flights between destinations, covering vast distances quickly.
- **Diverse Experiences:** Mix of nature, culture, and spirituality from wildlife adventures to serene lakeside beauty.
- **Cultural Immersion:** Explore iconic sites in Kathmandu highlighting Nepal’s rich heritage.
- **Close Encounters with Nature:** Exciting jungle safaris in Chitwan National Park to see rare animals.
- **Stunning Scenic Beauty:** Pokhara’s beautiful landscapes and panoramic mountain views.
- **Spiritual Journey:** Explore Lumbini, the birthplace of Lord Buddha, a deeply spiritual destination.

### Best Seasons for the Tour
- **Spring (March to May):** Clear skies, vibrant landscapes, and blooming rhododendrons. Ideal for sightseeing and wildlife exploration.
- **Summer/Monsoon (June to August):** Lush greenery and quieter tourist spots. Bring waterproof clothing.
- **Autumn (September to November):** Peak travel season with clear skies, mild weather, and festive vibes (Dashain and Tihar).
- **Winter (December to February):** Serene experiences with fewer crowds and crisp weather. Great for wildlife spotting.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,590</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,795</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,650</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,595</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,545</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,035</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,430</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,300</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,240</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,195</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,715</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,230</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,110</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,055</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,015</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,675</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,190</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,075</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,020</td>
        <td class="px-6 py-4 text-center text-gray-800">$975</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Flights between destinations for quick and comfortable travel',
      'Wildlife adventures in Chitwan National Park including safaris',
      'Serene lakeside beauty of Pokhara with panoramic mountain views',
      'Spiritual ambiance of Lumbini, the birthplace of Lord Buddha',
      'Explore iconic cultural and religious sites in Kathmandu'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft] Tour by Flight: Wildlife Safari and Cultural Adventure', desc: 'Flight to Chitwan. Tharu village visit, cultural dance performances.' },
      { day: 'Day 3', title: 'Chitwan Tour: Jungle Safari and Wildlife Experience', desc: 'Elephant or Jeep safari, canoe ride in the Rapti River, and a visit to the breeding centers.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara[altitude 830m/2723ft] by flight', desc: 'Fly to Pokhara. Visit Bindabasini Temple, Davis Falls, Gupteshwor Mahadev Cave, Seti Gorge, World Peace Stupa, and boating on Phewa Lake.' },
      { day: 'Day 5', title: 'Pokhara-Lumbini[altitude 150m/492ft] by Flight', desc: 'Sarangkot sunrise view. Fly to Lumbini. Visit Maya Devi Temple and surrounding monasteries.' },
      { day: 'Day 6', title: 'Lumbini-Kathmandu by flight', desc: 'Fly back to Kathmandu. Visit Pashupatinath Temple, Boudhanath Stupa, and Patan Durbar Square. Traditional Nepali cultural dinner.' },
      { day: 'Day 7', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'Kathmandu to Chitwan flight tickets with airport taxes',
      'Chitwan to Pokhara flight tickets with airport taxes',
      'Pokhara to Lumbini flight tickets with airport taxes',
      'Lumbini to Kathmandu flight tickets with airport taxes',
      'All government and local taxes',
      'Daily Buffet breakfast in all hotels',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Buddha Maya Garden or similar in Lumbin'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 7 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-bandipur-pokhara-trek-8d': {
    quickInfo: [
      { label: 'Duration', value: '8 Days 7 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `8 Days Kathmandu Bandipur Pokhara Tour with Trek is a perfect way to experience Nepal's cultural and natural beauty with adventure. This tour begins with your arrival in Kathmandu, where you will be warmly welcomed by a representative from Destination Nepal Tours & Travels at Tribhuvan International Airport. The next day, you’ll embark on a scenic drive to Bandipur village, a charming hilltop settlement known for its preserved cultural heritage and stunning views of the Himalayan range. After exploring Bandipur’s traditional Newari architecture and vibrant community, you will drive to Pokhara, Nepal’s adventure capital.

In Pokhara, you will visit several iconic landmarks including Bindabasini Temple, a sacred Hindu site dedicated to the goddess Bhagwati, and Davis Fall, a unique waterfall that plunges into an underground gorge. You’ll also explore the mystical Gupteshwor Mahadev Cave, which houses a revered Shiva shrine. A visit to the Tibetan Refugee Camp offers insight into the local Tibetan culture, while the serene Seti Gorge and Phewa Lake will leave you mesmerized. Boating on Phewa Lake amidst stunning mountain views is one of the highlights of this Pokhara tour.

Early the next morning, you’ll head to Sarangkot for a breathtaking sunrise over the Himalayas. Sarangkot offers panoramic views of Annapurna, Dhaulagiri, and Machhapuchhre. After a refreshing breakfast at Sarangkot, you’ll start your trek to Australian Camp, a peaceful hilltop destination offering yet another stunning view of the Himalayan range. The following day, you’ll trek through the scenic trails to Dhampus, a beautiful village nestled amidst terraced fields, and then descend to Phedi, from where you’ll drive back to Pokhara.

The adventure continues as you drive to Nagarkot, one of the best spots in Nepal to witness stunning Himalayan sunrises. The next morning, you will enjoy a magical sunrise over the snow-capped peaks from your hotel in Nagarkot before driving back to Kathmandu. On the way, you’ll visit Bhaktapur Durbar Square, known for its well-preserved medieval architecture, followed by visits to the iconic Boudhanath Stupa and the sacred Pashupatinath Temple. The day ends with a traditional Nepali dinner and cultural show at a typical Nepali restaurant, offering an authentic taste of Nepal's rich heritage.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://thehimalayantimes.com/uploads/imported_images/wp-content/uploads/2018/04/Bhaktapur-Durbar-Square.jpg" alt="Bhaktapur Durbar Square" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://everestchronicle.com/image/tourist.jpg" alt="Tourists in Nepal" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://english.headlinenepal.com/images/uploads/-media1672576612.jpg" alt="Nepalese Landscape" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 8 Days Kathmandu Bandipur Pokhara Tour with Trek?
- **Scenic beauty:** From the stunning views of the Himalayas in Dhampus and the Australian Base Camp to the tranquil lakes and waterfalls in Pokhara, there is no shortage of breathtaking sights to see.
- **Cultural immersion:** From exploring the ancient temples and palaces of Kathmandu to interacting with locals in the charming village of Bandipur, visitors can experience Nepal's unique culture firsthand.
- **Adventure:** The trek to the Australian Base Camp is particularly challenging but rewarding, and visitors can also enjoy activities like paragliding, zip-lining, and rafting in Pokhara.
- **Relaxation:** The hill station of Nagarkot is particularly known for its tranquil atmosphere and stunning sunrise views over the Himalayas.

### Best Seasons for the Tour
- **Spring (March to May):** Vibrant rhododendron blooms and lush greenery. Perfect for trekking to Australian Camp and Dhampus.
- **Summer/Monsoon (June to August):** Lush landscapes, best for cultural tours in Kathmandu and indoor attractions in Pokhara. Avoid high-altitude treks.
- **Autumn (September to November):** Peak season. Perfect weather, clear skies, and vibrant cultural festivals. Ideal for mountain vistas and boating on Phewa Lake.
- **Winter (December to February):** Quieter trails and stunning mountain views, though colder weather may limit some trekking. Cool and clear crisp mornings.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,040</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,255</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,105</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,040</td>
        <td class="px-6 py-4 text-center text-gray-800">$985</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,545</td>
        <td class="px-6 py-4 text-center text-gray-800">$950</td>
        <td class="px-6 py-4 text-center text-gray-800">$805</td>
        <td class="px-6 py-4 text-center text-gray-800">$740</td>
        <td class="px-6 py-4 text-center text-gray-800">$685</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,255</td>
        <td class="px-6 py-4 text-center text-gray-800">$765</td>
        <td class="px-6 py-4 text-center text-gray-800">$635</td>
        <td class="px-6 py-4 text-center text-gray-800">$570</td>
        <td class="px-6 py-4 text-center text-gray-800">$520</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,185</td>
        <td class="px-6 py-4 text-center text-gray-800">$710</td>
        <td class="px-6 py-4 text-center text-gray-800">$580</td>
        <td class="px-6 py-4 text-center text-gray-800">$515</td>
        <td class="px-6 py-4 text-center text-gray-800">$465</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Scenic drive to the charming hilltop settlement of Bandipur',
      'Discover Pokhara\'s natural beauty including lakes, caves, and waterfalls',
      'Trek to Australian Camp and Dhampus for stunning Himalayan views',
      'Witness breathtaking sunrises from Sarangkot and Nagarkot',
      'Visit Kathmandu\'s iconic UNESCO World Heritage Sites including Bhaktapur Durbar Square'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Time to relax or explore. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]', desc: 'Scenic drive to Bandipur village. Explore Bandipur’s traditional Newari architecture and vibrant community.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara. Visit Bindabasini Temple, Davis Fall, Gupteshwor Mahadev Cave, Tibetan Refugee Camp, and Seti Gorge. Enjoy boating on Phewa Lake.' },
      { day: 'Day 4', title: 'Pokhara-Australian camp [Altitude 2060m/6752ft]', desc: 'Early morning head to Sarangkot for sunrise over the Himalayas. After breakfast, trek to Australian Camp for a peaceful hilltop experience and stunning views.' },
      { day: 'Day 5', title: 'Australian camp-Dhampus-Phedi-Pokhara', desc: 'Trek through scenic trails to Dhampus, a village amidst terraced fields. Descend to Phedi, and drive back to Pokhara.' },
      { day: 'Day 6', title: 'Pokhara-Nagarkot[2175m/4136ft]', desc: 'Drive to Nagarkot, one of the best spots for witnessing Himalayan sunrises.' },
      { day: 'Day 7', title: 'Nagarkot –Kathmandu', desc: 'Enjoy a magical sunrise. Drive back to Kathmandu. Visit Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. Traditional Nepali dinner and cultural show.' },
      { day: 'Day 8', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour, Sarangkot Sunrise tour & trekking with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in Kathmandu, Bandipur, Pokhara, Australian Camp & Nagarkot',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night The Old Inn or similar in Bandipur',
      '1 Night at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 8 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-chitwan-nagarkot-8d': {
    quickInfo: [
      { label: 'Duration', value: '8 Days 7 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 8 Days Kathmandu Pokhara Chitwan Nagarkot Tour is a perfect way to explore the beauty and culture of Nepal in just eight days. This tour takes you to the most popular destinations in the country, giving you a mix of city life, natural beauty, wildlife, and cultural experiences.

Your journey begins with a warm welcome at Kathmandu airport by our representative. Kathmandu is the capital city of Nepal and is known for its rich history and UNESCO World Heritage sites. During your stay, you will visit Pashupatinath Temple, Boudhanath Stupa, and the historic Bhaktapur Durbar Square, which showcases the traditional architecture and culture of the Kathmandu Valley.

Next, the Kathmandu Pokhara Chitwan Nagarkot Tour takes you on a scenic drive to Pokhara, a beautiful city known for its lakes and mountain views. In Pokhara, you will enjoy a breathtaking sunrise over the Himalayas from Sarangkot. You can also explore popular attractions such as Bindabasini Temple, Davis Fall, and the mysterious Gupteshwor Cave. Don’t miss the boating experience on Phewa Lake, where you can visit the serene Tal Barahi Temple situated on an island in the middle of the lake.

After Pokhara, the tour continues with a drive to Chitwan National Park. This park is famous for its rich wildlife, including Bengal tigers, rhinos, and elephants. During your stay in Chitwan, you will participate in exciting activities such as an Elephant or Jeep Safari, a canoe ride, and a visit to the Elephant Breeding Center or the Crocodile Breeding Center. The Tharu cultural program is also a highlight, offering insight into the local community’s traditions.

The Kathmandu Pokhara Chitwan & Nagarkot Tour concludes with a drive to Nagarkot, a hill station near Kathmandu known for its stunning sunrise views of the Himalayas. From Nagarkot, you can witness the majestic peaks, including Mount Everest, on a clear day. The tour wraps up with a farewell Nepali cultural dinner in Kathmandu before your departure with unforgettable memories.

With the Kathmandu, Pokhara, Chitwan & Nagarkot Tour, you’ll experience the best of Nepal, from vibrant cities and peaceful lakes to wildlife adventures and mountain views.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://newbusinessage.prixacdn.net/img/news/20211020114526_20191017121120_1571271950.jpg" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.b360nepal.com/uploads/posts/Gorepani-Poon-Hill-(1)-1767252612.jpg" alt="Poon Hill View" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.app.shikharadventure.com/uploads/fullbanner/view-from-nagarkot.webp" alt="Nagarkot Sunrise" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 8 Days Kathmandu Pokhara Chitwan Nagarkot Tour?
- **Diverse Experiences:** Offers a rich variety of experiences, from exploring Kathmandu's ancient temples to enjoying the serene beauty of Pokhara's lakes.
- **Scenic Beauty:** Covers some of Nepal's most stunning landscapes, from Phewa Lake in Pokhara to spectacular sunrise views from Nagarkot.
- **Cultural Immersion:** Dive deep into Nepal's rich cultural and religious heritage visiting UNESCO World Heritage sites.
- **Wildlife Adventure:** Thrilling opportunities to spot diverse wildlife in Chitwan National Park through exciting jungle safaris.

### Best Seasons for the Tour
- **Spring (March to May):** Mild and pleasant weather with vibrant blooms and clear skies.
- **Summer/Monsoon (June to August):** Less favorable for outdoor travel but excellent for indoor cultural sites. Expect muddy trails in Chitwan.
- **Autumn (September to November):** Peak season. Ideal for outdoor activities, with dry conditions and excellent visibility.
- **Winter (December to February):** Crisp mornings and clear skies with fewer crowds. Cold mornings but comfortable daytime temperatures in Pokhara and Chitwan.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,320</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,440</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,290</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,230</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,180</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,680</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,015</td>
        <td class="px-6 py-4 text-center text-gray-800">$880</td>
        <td class="px-6 py-4 text-center text-gray-800">$820</td>
        <td class="px-6 py-4 text-center text-gray-800">$770</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,330</td>
        <td class="px-6 py-4 text-center text-gray-800">$810</td>
        <td class="px-6 py-4 text-center text-gray-800">$685</td>
        <td class="px-6 py-4 text-center text-gray-800">$630</td>
        <td class="px-6 py-4 text-center text-gray-800">$580</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,275</td>
        <td class="px-6 py-4 text-center text-gray-800">$760</td>
        <td class="px-6 py-4 text-center text-gray-800">$640</td>
        <td class="px-6 py-4 text-center text-gray-800">$585</td>
        <td class="px-6 py-4 text-center text-gray-800">$535</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Comprehensive journey through Kathmandu\'s UNESCO World Heritage Sites',
      'Boating on Phewa Lake and visiting serene temples in Pokhara',
      'Exciting jungle safaris in Chitwan National Park to see rare wildlife',
      'Witness stunning panoramic sunrises from Nagarkot and Sarangkot',
      'A complete blend of city life, nature, wildlife, and culture in 8 days'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by our representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Scenic Drive from Kathmandu to Pokhara[altitude 830m/2723ft] – Arrival and Relaxation', desc: 'Scenic drive to Pokhara. Enjoy the evening relaxing by the lake or exploring the city.' },
      { day: 'Day 3', title: 'Discover Pokhara – Sunrise, Lakes, Caves, and Waterfalls', desc: 'Breathtaking sunrise from Sarangkot. Visit Bindabasini Temple, Davis Fall, and Gupteshwor Cave. Enjoy boating on Phewa Lake.' },
      { day: 'Day 4', title: 'Travel from Pokhara to Chitwan [altitude 415m/1361ft]– Scenic Drive and Safari Introduction', desc: 'Drive to Chitwan National Park. Check into your resort and get an introduction to the safari activities.' },
      { day: 'Day 5', title: 'Exploring Chitwan National Park – Safari Adventures and Local Culture', desc: 'Full day of jungle activities: Elephant or Jeep Safari, canoe ride, and a visit to the breeding centers. Enjoy a Tharu cultural program.' },
      { day: 'Day 6', title: 'Chitwan to Nagarkot[2175m/4136ft] – Scenic Drive and Sunset Over the Himalayas', desc: 'Drive from the plains of Chitwan to the hill station of Nagarkot to witness a beautiful sunset.' },
      { day: 'Day 7', title: 'Nagarkot to Kathmandu – Explore Bhaktapur, Pashupatinath, and Boudhanath', desc: 'Sunrise views of the Himalayas. Drive back to Kathmandu to explore historic sites. Farewell Nepali cultural dinner.' },
      { day: 'Day 8', title: 'Final Day in Kathmandu – Departure and Last-Minute Shopping', desc: 'Free time for last-minute shopping before your departure transfer to the airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara & Nagarkot',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 8 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-chitwan-rafting-8d': {
    quickInfo: [
      { label: 'Duration', value: '8 Days 7 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `8 Days Kathmandu Pokhara Chitwan Tour with Rafting Adventure is the perfect trip for those who want to explore Nepal's cultural heritage, natural beauty, wildlife, and adventure all in one. The tour begins in Kathmandu, where you’ll meet the representative from Destination Nepal Tours and Travels at Tribhuvan International Airport.

After a scenic drive to Pokhara, you’ll visit Sarangkot the next morning for a breathtaking sunrise view of the Himalayas. After breakfast, enjoy boating on Phewa Lake, and explore Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, the Tibetan Refugee Camp, and Seti Gorge. Pokhara, with its stunning landscapes and tranquil surroundings, offers a perfect blend of culture and nature.

The adventure continues as you drive to Damauli for an exhilarating rafting adventure on the Seti River. This unique experience combines adventure and relaxation, with an overnight camping stop at Saranghat on the beach by the river. The next day, the rafting continues from Saranghat to Gai Ghat, after which you’ll drive to Chitwan National Park.

In Chitwan, you’ll immerse yourself in a wildlife safari, choosing either an elephant safari or a jeep safari depending on your resort location. Explore the lush jungles of Chitwan and spot wildlife like rhinos, deer, and possibly even Bengal tigers. A visit to a Tharu Village followed by a Tharu cultural program offers a deep insight into the local culture and traditions.

After a night in Chitwan, the tour heads to Nagarkot, where you’ll witness an unforgettable sunrise view of the Himalayas. On the way back to Kathmandu, you’ll visit iconic world heritage sites like Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple, all renowned for their historical and spiritual significance. The tour ends with a special Nepali cultural dinner, a perfect way to conclude your Nepal adventure.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://theindianface.com/cdn/shop/articles/parapente-pokhara2.jpg?v=1591376806" alt="Pokhara Adventure" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/85/3b/15/caption.jpg?w=500&h=400&s=1" alt="Phewa Lake Boating" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://nht-api.nepalhikingteam.com/media/trip-gallery/media-e3c4b4ef-1740459767.jpg" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 8 Days Kathmandu Pokhara Chitwan Tour with Rafting?
- **Diverse Experiences:** Blends city tours, cultural exploration, wildlife adventures, and outdoor activities like rafting on the Seti River.
- **Cultural Immersion:** Discover Nepal’s rich cultural heritage visiting Pashupatinath, Boudhanath Stupa, and Bhaktapur Durbar Square.
- **Thrilling Adventure:** Experience an exhilarating white-water rafting adventure on the Seti River combined with an overnight riverbank camping experience.
- **Wildlife Safari:** Go on a jeep or elephant safari to explore the lush jungles of Chitwan National Park.

### Best Seasons for the Tour
- **Spring (March to May):** One of the best times to visit with clear skies, vibrant landscapes, and comfortable conditions for rafting and safaris.
- **Summer/Monsoon (June to August):** Avoid rafting due to high river levels. It's a great season for cultural explorations with lush washed landscapes.
- **Autumn (September to November):** Peak season. Ideal for all activities, offering fresh air, excellent visibility, and the clearest mountain vistas.
- **Winter (December to February):** Rafting might be chilly and sometimes unavailable. Great for serene cultural tours and amazing wildlife safaris.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,420</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,545</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,390</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,330</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,285</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,835</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,145</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,010</td>
        <td class="px-6 py-4 text-center text-gray-800">$950</td>
        <td class="px-6 py-4 text-center text-gray-800">$900</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,520</td>
        <td class="px-6 py-4 text-center text-gray-800">$975</td>
        <td class="px-6 py-4 text-center text-gray-800">$850</td>
        <td class="px-6 py-4 text-center text-gray-800">$790</td>
        <td class="px-6 py-4 text-center text-gray-800">$745</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,450</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
        <td class="px-6 py-4 text-center text-gray-800">$790</td>
        <td class="px-6 py-4 text-center text-gray-800">$730</td>
        <td class="px-6 py-4 text-center text-gray-800">$685</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Experience the thrill of white-water rafting on the Seti River',
      'Overnight camping experience on the sandy beaches of the riverbank',
      'Boating on Phewa Lake and mesmerizing sunrises from Sarangkot',
      'Witness diverse wildlife with a Jungle Safari in Chitwan National Park',
      'Visit Kathmandu\'s iconic UNESCO World Heritage Sites'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Relax or explore. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara. Enjoy the evening relaxing by the lake or exploring the city.' },
      { day: 'Day 3', title: 'Pokhara', desc: 'Breathtaking sunrise from Sarangkot. Enjoy boating on Phewa Lake, explore Bindabasini Temple, Davis Fall, and Gupteswori Cave.' },
      { day: 'Day 4', title: 'Pokhara- Damauli', desc: 'Drive to Damauli for an exhilarating rafting adventure on the Seti River. Overnight camping stop at Saranghat on the beach.' },
      { day: 'Day 5', title: 'Saranghat- Chitwan[altitude 415m/1361ft]', desc: 'Rafting continues from Saranghat to Gai Ghat. After that, drive to Chitwan National Park.' },
      { day: 'Day 6', title: 'Chitwan-Nagarkot[2175m/4136ft]', desc: 'Immerse yourself in a wildlife safari in Chitwan. Visit a Tharu Village. Later, drive to Nagarkot.' },
      { day: 'Day 7', title: 'Nagarkot –Kathmandu', desc: 'Witness an unforgettable sunrise. Visit Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple on the way back to Kathmandu. Special Nepali cultural dinner.' },
      { day: 'Day 8', title: 'Depart from Kathmandu', desc: 'Free time for last-minute shopping before your departure transfer to the airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara & Nagarkot',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      'Daily Buffet breakfast, lunch & dinner in Rafting day',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Tented Beach camp'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 8 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-muktinath-chitwan-8d': {
    quickInfo: [
      { label: 'Duration', value: '8 Days 7 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on an unforgettable 8 Days Kathmandu Pokhara Muktinath Chitwan Tour, a perfect blend of cultural exploration and a Nepal pilgrimage experience. This tour is designed to offer you a rich cultural and religious journey, with visits to both Hindu and Buddhist sacred sites, including the revered Pashupatinath temple and Muktinath temple, making it a top choice for those seeking spiritual fulfillment. Your journey begins in Kathmandu, where you'll visit the famous Pashupatinath temple, one of the most sacred Hindu shrines, along with the impressive Boudhanath stupa, a significant pilgrimage site for Buddhists. This combination of Hindu and Buddhist landmarks highlights Nepal’s deep spiritual heritage.

After a day of immersion in Kathmandu’s religious and historical sites, you'll head to the beautiful city of Pokhara, known for its natural beauty and temples. Here, you’ll visit Bindabasini temple, Davis fall, and the Gupteswori Mahadev cave, adding to the pilgrimage feel of the tour. The scenic flight to Jomsom will take you on a breathtaking journey, leading to the highlight of the tour – a visit to the Muktinath temple. Located in the Mustang region, this temple holds significance for both Hindus and Buddhists, making it an essential stop for religious travelers. While in the area, you’ll explore Kagbeni and the serene Dhumba Lake, offering stunning landscapes and spiritual tranquility.

From Jomsom, you’ll return to Pokhara and then drive directly to Chitwan for an exciting wildlife experience. In Chitwan National Park, you’ll enjoy thrilling jungle safaris – either an elephant safari or a jeep safari depending on your location. Chitwan offers more than just adventure; it includes cultural activities such as a Tharu village tour and Tharu cultural program, providing insight into the local indigenous community. You can also visit the Elephant Breeding Centre or the Crocodile Breeding Centre, rounding out the tour with a mix of nature and culture.

The tour concludes with a return to Kathmandu, where you’ll explore the ancient Bhaktapur Durbar Square and enjoy a Nepali cultural program with a farewell dinner. This Nepal pilgrimage and cultural tour offers a well-rounded experience that combines spiritual visits with rich cultural and natural highlights, leaving you with lasting memories of Nepal’s diverse beauty.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.bestheritagetour.com/public/images/upload/package/slider/chitwan-national-park-3.jpg" alt="Chitwan Elephant Safari" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://econepaltrekkers.com/wp-content/uploads/2024/07/pexels-photo-6872553.webp" alt="Himalayan Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5ec7WPrRZvgu1Hnxo0S0pANgOQE1WHhaOw&s" alt="Cultural Sites" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 8 Days Kathmandu Pokhara Muktinath Chitwan Tour?
- **Spiritual Fulfillment:** Visit important Hindu and Buddhist pilgrimage sites like Pashupatinath temple, Muktinath temple, and Boudhanath stupa.
- **Scenic Beauty:** Immerse yourself in the breathtaking landscapes of Pokhara, the Jomsom flight, and the serene surroundings of Muktinath and Dhumba Lake.
- **Adventure in Chitwan:** Enjoy exciting activities like safaris and visits to breeding centers in Chitwan National Park.
- **Cultural Immersion:** Engage with local traditions through the Tharu village tour and Tharu cultural program.
- **Comprehensive Itinerary:** A well-rounded, all-inclusive journey covering Nepal’s cultural, religious, and natural highlights.

### Best Seasons for the Tour
- **Spring (March to May):** Ideal season for pleasant weather, clear skies, and blooming rhododendrons.
- **Summer/Monsoon (June to August):** Green landscapes and fewer crowds. Muktinath visits require flexibility due to weather.
- **Autumn (September to November):** The most favored season for clear skies, crisp days, and vibrant cultural richness.
- **Winter (December to February):** A tranquil season with excellent wildlife spotting in Chitwan, though Muktinath will be cold.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,050</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,695</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,550</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,495</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,450</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,655</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,300</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,170</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,110</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,065</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,425</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,085</td>
        <td class="px-6 py-4 text-center text-gray-800">$965</td>
        <td class="px-6 py-4 text-center text-gray-800">$910</td>
        <td class="px-6 py-4 text-center text-gray-800">$865</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,385</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,045</td>
        <td class="px-6 py-4 text-center text-gray-800">$925</td>
        <td class="px-6 py-4 text-center text-gray-800">$870</td>
        <td class="px-6 py-4 text-center text-gray-800">$825</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Visit the sacred Muktinath Temple, highly revered by both Hindus and Buddhists',
      'Thrilling flight from Pokhara to Jomsom witnessing extreme Himalayan landscapes',
      'Discover Nepal’s rich cultural heritage in Kathmandu Valley\'s UNESCO sites',
      'Exciting elephant or jeep safaris in Chitwan National Park to see rare wildlife',
      'Immerse in indigenous Tharu culture with a local village tour and cultural program'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Depending on your arrival time, explore the city or relax. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]: Scenic Journey Through Culture and Nature', desc: 'Scenic journey from Kathmandu to Pokhara. Experience beautiful landscapes.' },
      { day: 'Day 3', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft): Breathtaking Flight to the Heart of Mustang', desc: 'Breathtaking flight to Jomsom. Visit the sacred Muktinath Temple and explore the stunning Mustang region.' },
      { day: 'Day 4', title: 'Jomsom-Pokhara-Chitwan[altitude 415m/1361ft]: A Journey from Mountains to Jungle Adventures', desc: 'Fly back to Pokhara, then drive to Chitwan National Park for your jungle adventures.' },
      { day: 'Day 5', title: 'Chitwan: Explore Wildlife and Cultural Wonders in Nepal\'s Jungle Paradise', desc: 'Full day of jungle activities including safaris, visit to breeding centers, and Tharu cultural program.' },
      { day: 'Day 6', title: 'Chitwan-Kathmandu: Return Journey through Nepal’s Cultural Heart', desc: 'Drive back to Kathmandu enjoying the scenic highways of Nepal.' },
      { day: 'Day 7', title: 'Kathmandu City Tour', desc: 'Explore ancient Bhaktapur Durbar Square, Pashupatinath, Boudhanath. Enjoy a Nepali cultural program with a farewell dinner.' },
      { day: 'Day 8', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Om\'s Home in Jomsom'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 8 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-lumbini-chitwan-8d': {
    quickInfo: [
      { label: 'Duration', value: '8 Days 7 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `8 Days Kathmandu Pokhara Lumbini Chitwan Tour is a perfect way to explore the best of Nepal’s culture, nature, and history in a short time. The tour begins when our representative greets you at Tribhuwan International Airport in Kathmandu. From the moment you arrive, you will experience the warm hospitality of Nepal. The first day is for rest and getting ready for the exciting days ahead.

On the second day, you will enjoy a scenic drive from Kathmandu to Pokhara, one of Nepal’s most beautiful cities. Pokhara is known for its stunning lakes and mountain views. After arriving in Pokhara, you will visit Bindabasini Temple, one of the oldest temples in the city, and then explore Davis Fall, a famous waterfall that flows into a mysterious underground tunnel. Next, we will take you to Gupteshwor Mahadev Cave, a holy site dedicated to Lord Shiva, located just near Davis Fall. You will also visit the Tibetan Refugee Camp and Seti Gorge, a deep river gorge carved by the Seti River. To end the day, we will enjoy boating on the serene Phewa Lake, where you can see the reflection of the Annapurna mountain range on the water.

The next morning, we will visit Sarangkot, a popular viewpoint known for its breathtaking sunrise over the Himalayas. After enjoying the sunrise and the stunning mountain views, you will have breakfast and then begin your drive to Lumbini. Lumbini is the birthplace of Lord Buddha and a UNESCO World Heritage Site. You will visit the Maya Devi Temple, which marks the exact birthplace of Buddha, and explore the surrounding monasteries and meditation centers, each built by different countries to represent their cultures and traditions.

On the fifth day, we drive to Chitwan National Park, Nepal’s famous wildlife sanctuary. You will spend two nights in Chitwan, which offers a mix of wildlife adventures and cultural experiences. In the evening, we will visit a Tharu village to learn about the local indigenous people and their unique culture. You will also enjoy a Tharu cultural program featuring traditional music and dance. A sunset view over the Rapti River will make your evening special. During your stay, you can choose between an elephant safari or a jeep safari, depending on your hotel location, to explore the rich wildlife of the park, including rhinos, deer, and if lucky, a Bengal tiger. You may also visit the Elephant Breeding Centre or the Crocodile Breeding Centre, depending on your preferences. Canoeing in the Rapti River will allow you to spot exotic birds and wildlife along the riverbanks.

After an exciting stay in Chitwan, we will drive to Nagarkot, a hill station near Kathmandu, known for its panoramic views of the Himalayas. On the way, we will stop at Bhaktapur Durbar Square, a historic city filled with ancient temples, palaces, and courtyards. Once in Nagarkot, you will relax and enjoy the peaceful surroundings.

On the seventh day, we will drive back to Kathmandu. Along the way, you will visit two of Kathmandu’s most famous religious sites: Boudhanath Stupa, one of the largest stupas in Nepal, and Pashupatinath Temple, a sacred Hindu temple. In the evening, you will enjoy a traditional Nepali dinner along with a cultural program featuring music and dance.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/f2/5c/d4.jpg" alt="Lumbini Peace Stupa" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.thirdrockadventures.com/assets-back/images/trip/fewa-lake-pokhara.jpgSGF.jpg" alt="Phewa Lake Pokhara" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://luxuryholidaynepal.com/_next/image?url=https%3A%2F%2Fapi.luxuryholidaynepal.com%2Fmedia%2Fitinerary-gallery%2Fmedia-c9652f6c-1734850740.jpg&w=1920&q=75" alt="Nepal Highlights" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 8 Days Kathmandu Pokhara Lumbini Chitwan Tour?
- **Cultural and Historical Richness:** Witness ancient temples, monasteries, and UNESCO World Heritage Sites including Pashupatinath and Boudhanath.
- **Natural Beauty:** Be amazed by beautiful lakes, stunning mountains, and waterfalls in Pokhara, and breathtaking Himalayan views from Nagarkot.
- **Birthplace of Buddha:** Experience the spiritual serenity of Lumbini, a UNESCO World Heritage site and the birthplace of Gautama Buddha.
- **Wildlife and Adventure:** Jungle safaris, bird-watching, and nature walks in Chitwan National Park spotting rare wildlife.
- **Unique & Convenient:** Covers the most popular tourist destinations offering a well-planned and hassle-free tour in a short timeframe.

### Best Seasons for the Tour
- **Spring (March to May):** A delightful season with blooming flowers, clear skies, and perfect sightseeing conditions.
- **Summer/Monsoon (June to August):** A quieter time with picturesque lush scenery. Budget-friendly though expect some travel delays.
- **Autumn (September to November):** Peak season. Perfect weather, clear skies, and grand festivals like Dashain and Tihar.
- **Winter (December to February):** A tranquil time with fewer tourists. Nagarkot offers serene, crowd-free mountain vistas.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,560</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,555</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,370</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,290</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,225</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,955</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,160</td>
        <td class="px-6 py-4 text-center text-gray-800">$985</td>
        <td class="px-6 py-4 text-center text-gray-800">$910</td>
        <td class="px-6 py-4 text-center text-gray-800">$845</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,580</td>
        <td class="px-6 py-4 text-center text-gray-800">$930</td>
        <td class="px-6 py-4 text-center text-gray-800">$770</td>
        <td class="px-6 py-4 text-center text-gray-800">$695</td>
        <td class="px-6 py-4 text-center text-gray-800">$630</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,530</td>
        <td class="px-6 py-4 text-center text-gray-800">$890</td>
        <td class="px-6 py-4 text-center text-gray-800">$730</td>
        <td class="px-6 py-4 text-center text-gray-800">$655</td>
        <td class="px-6 py-4 text-center text-gray-800">$590</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
  <p class="text-blue-800">
    <strong class="font-semibold">Looking for a more relaxed pace?</strong> If you have an extra day and want a more comfortable option, consider our <a href="/packages/ktm-pokhara-lumbini-chitwan-9d" class="text-blue-600 underline font-semibold">9 Days Kathmandu, Pokhara, Lumbini & Chitwan Tour</a>.
  </p>
</div>`,
    highlights: [
      'Visit Lumbini, the sacred birthplace of Lord Buddha, a UNESCO World Heritage Site',
      'Discover Nepal’s rich cultural heritage in Kathmandu Valley\'s UNESCO sites',
      'Enjoy boating on Phewa Lake and mesmerizing sunrises from Sarangkot',
      'Exciting jungle safaris in Chitwan National Park to spot exotic wildlife',
      'Immerse yourself in indigenous Tharu culture with a village tour and program'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Relax and prepare for your adventure. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara. Visit Bindabasini Temple, Davis Fall, Gupteshwor Cave, and enjoy boating on Phewa Lake.' },
      { day: 'Day 3', title: 'Pokhara-Lumbini[altitude 150m/492ft]', desc: 'Sunrise view from Sarangkot. Drive to Lumbini, the birthplace of Buddha, and explore Maya Devi Temple and surroundings.' },
      { day: 'Day 4', title: 'Lumbini-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park. Relax in the evening with a sunset view over the Rapti River and a Tharu cultural program.' },
      { day: 'Day 5', title: 'Chitwan', desc: 'Full day of jungle adventures including an elephant or jeep safari, canoeing, and visiting breeding centers.' },
      { day: 'Day 6', title: 'Chitwan-Kathmandu-Nagarkot[Altitude 2175m/4136ft]', desc: 'Drive back to Kathmandu, stop at Bhaktapur Durbar Square, and proceed to the hill station of Nagarkot for peaceful surroundings.' },
      { day: 'Day 7', title: 'Nagarkot-Kathmandu', desc: 'Wake up to panoramic Himalayan views. Drive to Kathmandu to visit Boudhanath and Pashupatinath. Farewell cultural dinner.' },
      { day: 'Day 8', title: 'Depart from Kathmandu', desc: 'Departure transfer to the airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '2 Nights Buddha Maya Garden or similar in Lumbini'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 8 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-chitwan-nagarkot-9d': {
    quickInfo: [
      { label: 'Duration', value: '9 Days 8 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on a 9 Days Kathmandu Pokhara Chitwan Nagarkot Tour and experience the diverse beauty of Nepal. Your adventure begins with a warm welcome at Tribhuvan International Airport by our representative. The next day, we start with a scenic drive to Pokhara, the city of lakes. In Pokhara, you will enjoy an early morning visit to Sarangkot for a breathtaking sunrise view and panoramic mountain vistas, including the Annapurna and Machhapuchhre ranges. The Pokhara city tour continues with stops at Bindabasini Temple, Seti Gorge, the Tibetan Refugee Camp, Gupteshwor Cave, and the famous Davis Fall. Enjoy a relaxing boat ride on Phewa Lake, followed by a visit to the World Peace Stupa, where you can capture stunning views of Pokhara city, the lake, and the surrounding mountains.

After exploring Pokhara, the journey heads towards Chitwan, home to Nepal’s renowned Chitwan National Park. Over the next two days, immerse yourself in thrilling jungle activities like the Tharu village walk and an evening Tharu cultural dance program. Depending on your hotel's location, you'll embark on an elephant safari or a jeep safari, taking you deep into the jungle to witness wildlife such as rhinos and exotic birds. You will also visit either the Elephant Breeding Centre or the Crocodile Breeding Centre and enjoy a serene canoe ride along the river.

After two nights in Chitwan, the tour continues with a scenic drive to Nagarkot, a charming hill station known for its spectacular Himalayan sunrise views. The next morning, wake up early to witness the majestic sunrise over the Himalayas. From Nagarkot, the journey back to Kathmandu includes a stop at Changu Narayan Temple, a UNESCO World Heritage Site, and a visit to the historical Bhaktapur Durbar Square, known for its medieval art and architecture.

In Kathmandu, you'll explore iconic landmarks like the Boudhanath Stupa, one of the largest stupas in the world, the sacred Pashupatinath Temple, and the Swayambhunath Stupa (Monkey Temple), offering a panoramic view of the Kathmandu valley. The Kathmandu Durbar Square, with its ancient palaces, courtyards, and temples, will take you back in time to the era of kings. Your last evening in Nepal will be celebrated with a traditional Nepali dinner accompanied by a lively cultural program at a local restaurant.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://peacefulnepal.com/wp-content/uploads/2023/08/1-1080x720.jpg" alt="Kathmandu Highlights" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.thameltravel.com/uploads/fullbanner/kathmandu-pokhara-chitwan-1.webp" alt="Scenic Pokhara" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://actionnepaltreks.com/wp-content/uploads/2025/01/at-chitwan.webp" alt="Chitwan Adventures" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 9 day Kathmandu Pokhara Chitwan Nagarkot Tour?
- **Diverse Experiences in One Tour:** Combines the best of nature, culture, and adventure offering a well-rounded experience.
- **Stunning Mountain Views:** Incredible sunrise views from Sarangkot and Nagarkot with panoramic vistas of the Himalayan range.
- **Wildlife Adventure in Chitwan:** Explore the rich biodiversity of Chitwan National Park through jeep safaris, canoeing, and elephant rides.
- **Cultural Immersion:** Discover historical temples of Kathmandu and immerse yourself in the Tharu cultural dance in Chitwan.
- **Relaxation & Adventure Balance:** The perfect balance between thrilling safaris and peaceful activities such as boating on Phewa Lake.

### Best Seasons for the Tour
- **Spring (March to May):** Warm and pleasant with blooming flowers. Ideal for mountain views from Sarangkot and Nagarkot.
- **Summer/Monsoon (June to August):** Lush, green countryside with fewer crowds. Rain can cause slippery trails and cloud covers.
- **Autumn (September to November):** The most popular season with clear skies, pleasant temperatures, and best mountain views.
- **Winter (December to February):** Cool to cold. Milder in Chitwan. Perfect for those who enjoy quieter, serene destinations.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,635</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,630</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,560</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,395</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,340</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,895</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,145</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,090</td>
        <td class="px-6 py-4 text-center text-gray-800">$930</td>
        <td class="px-6 py-4 text-center text-gray-800">$875</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,505</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
        <td class="px-6 py-4 text-center text-gray-800">$870</td>
        <td class="px-6 py-4 text-center text-gray-800">$715</td>
        <td class="px-6 py-4 text-center text-gray-800">$665</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,440</td>
        <td class="px-6 py-4 text-center text-gray-800">$860</td>
        <td class="px-6 py-4 text-center text-gray-800">$820</td>
        <td class="px-6 py-4 text-center text-gray-800">$660</td>
        <td class="px-6 py-4 text-center text-gray-800">$610</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Stunning sunrise views from Sarangkot and Nagarkot with panoramic Himalayan vistas',
      'Boating on Phewa Lake and visiting the beautiful World Peace Stupa in Pokhara',
      'Exciting elephant or jeep safaris in Chitwan National Park to see rare wildlife',
      'Discover Nepal’s rich cultural heritage in Kathmandu Valley\'s ancient temples',
      'Experience traditional Tharu culture with a village walk and cultural dance'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Depending on your arrival time, explore the city or relax. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Scenic drive to the beautiful city of Pokhara. Relax by the lakeside.' },
      { day: 'Day 3', title: 'Pokhara', desc: 'Breathtaking sunrise from Sarangkot. Visit Bindabasini Temple, Seti Gorge, Gupteshwor Cave, Davis Fall, and enjoy boating on Phewa Lake. Visit World Peace Stupa.' },
      { day: 'Day 4', title: 'Pokhara-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park for thrilling jungle activities. Tharu village walk and cultural dance program in the evening.' },
      { day: 'Day 5', title: 'Chitwan', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, and enjoying a serene canoe ride.' },
      { day: 'Day 6', title: 'Chitwan-Nagarkot[2175m/7135ft]', desc: 'Scenic drive to Nagarkot, a charming hill station known for its spectacular Himalayan views.' },
      { day: 'Day 7', title: 'Nagarkot –Kathmandu', desc: 'Majestic sunrise over the Himalayas. Drive back to Kathmandu via Changu Narayan Temple and Bhaktapur Durbar Square.' },
      { day: 'Day 8', title: 'Kathmandu', desc: 'Explore Boudhanath Stupa, Pashupatinath Temple, Swayambhunath, and Kathmandu Durbar Square. Farewell Nepali cultural dinner.' },
      { day: 'Day 9', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara & Nagarkot',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 9 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-chitwan-trek-9d': {
    quickInfo: [
      { label: 'Duration', value: '9 Days 8 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m/10531ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Nepal adventure trip offers an unforgettable experience combining culture, nature, and trekking. This 9-day Kathmandu Pokhara Chitwan Tour with Trek allows you to explore Nepal’s vibrant cities, serene landscapes, and rich wildlife. After your arrival in Kathmandu, you will be greeted by a representative from Destination Nepal Tours & Travels at Tribhuvan International Airport, marking the beginning of your adventure. The next morning, you’ll embark on a scenic drive to Pokhara, one of Nepal’s most beautiful cities. In Pokhara, enjoy the peaceful Phewa Lake with a boat ride, visit the famous Bindabasini Temple, marvel at Davis Fall, explore the mystical Gupteswor Mahadev Cave, visit the Tibetan refugee camp, and see the dramatic Seti Gorge.

From Pokhara, your trekking journey begins. A short drive takes you to Phedi, the starting point of your trek. The first day’s trek to Tolka takes about five hours, offering stunning views of lush landscapes and traditional villages. The following day, you’ll trek to the picturesque Ghandruk village, a four-hour journey where you can experience the warm hospitality of the local Gurung community and enjoy incredible views of the Annapurna and Machhapuchhre mountains. Afterward, you will trek from Ghandruk to Nayapul, where a drive will take you back to Pokhara.

Your adventure continues with a drive to Chitwan, famous for its rich wildlife. In Chitwan National Park, you will enjoy activities like an elephant safari or jeep safari, depending on your resort's location. You’ll also take part in a Tharu village tour and enjoy a cultural program showcasing the traditional Tharu dance. After a one-night stay in Chitwan, your Nepal adventure trip moves on to Nagarkot, a popular hill station known for its spectacular Himalaya view. You’ll arrive in Nagarkot just in time to witness a stunning sunrise over the Himalayas the following morning.

Before heading back to Kathmandu, you’ll visit Bhaktapur Durbar Square, a UNESCO World Heritage site, as well as the famous Pashupatinath Temple and Boudhanath Stupa. Your trip concludes with a delightful Nepali dinner and cultural program at a traditional restaurant in Kathmandu. The next day, you depart with cherished memories of your Nepal adventure trip, filled with breathtaking landscapes, cultural experiences, and exciting wildlife encounters.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.bestheritagetour.com/public/images/upload/package/slider/photo-2025-09-05-06-21-44-1.jpg" alt="Trekking Village" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.himalayanexcursionnepal.com/storage/trips/June2025/UEn0fWQJ5tWyoISwt5ez.jpg" alt="Mountain Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.asiaodysseytravel.com/images/asia-tours/nepal-tours/swayambhunath-temple-nepal-700-11.jpg" alt="Kathmandu Heritage" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 9 day Kathmandu Pokhara Chitwan Tour with Trek?
- **Unforgettable cultural experiences:** Explore the vibrant cities of Kathmandu and Pokhara, rich in cultural history and stunning architecture.
- **Stunning natural beauty:** Trek to Ghandruk Village offering breathtaking views of Annapurna and Machhapuchhre, alongside wildlife adventures in Chitwan and panoramic Himalayan views from Nagarkot.
- **Adventure and excitement:** Thrilling 2-day trekking experience in the Annapurna foothills that pushes your limits and rewards you with unforgettable memories.
- **Authentic Nepalese hospitality:** Interact with locals in traditional villages like Ghandruk, experiencing the warmth and welcoming culture of the Nepalese people.
- **Personalized itinerary:** Tailor the trip to your preferences, adding or removing destinations to suit your time and interests.

### Best Seasons for the Tour
- **Spring (March to May):** Mild temperatures and clear skies. Perfect for trekking with blooming rhododendrons, sightseeing, and enjoying comfortable safaris in Chitwan.
- **Autumn (September to November):** Clear skies, cool temperatures, and minimal rain. Post-monsoon greenery ensures perfect trekking conditions and a vibrant atmosphere in Chitwan.
*(Both seasons avoid the heavy monsoon rains and the freezing winter cold, ensuring a comfortable adventure.)*

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,600</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,610</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,530</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,340</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,275</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,040</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,240</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,175</td>
        <td class="px-6 py-4 text-center text-gray-800">$980</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,705</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,055</td>
        <td class="px-6 py-4 text-center text-gray-800">$995</td>
        <td class="px-6 py-4 text-center text-gray-800">$810</td>
        <td class="px-6 py-4 text-center text-gray-800">$745</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,615</td>
        <td class="px-6 py-4 text-center text-gray-800">$975</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
        <td class="px-6 py-4 text-center text-gray-800">$730</td>
        <td class="px-6 py-4 text-center text-gray-800">$670</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Scenic trekking to traditional villages like Tolka and Ghandruk in the Annapurna foothills',
      'Stunning views of Annapurna and Machhapuchhre from Ghandruk',
      'Discover Pokhara’s natural wonders including Phewa Lake, Davis Fall, and Gupteswor Cave',
      'Exciting jungle activities in Chitwan National Park and witnessing authentic Tharu culture',
      'Explore Kathmandu Valley\'s UNESCO World Heritage sites and catch a Himalayan sunrise in Nagarkot'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Depending on your arrival time, explore the city or relax. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara. Enjoy boating on Phewa Lake and visit local sites like Bindabasini Temple, Davis Fall, and Gupteswor Cave.' },
      { day: 'Day 3', title: 'Pokhara-Tolka [Altitude 1700/5578ft]-Trekking', desc: 'Short drive to Phedi, the starting point of your trek. Trek to Tolka (approx. 5 hours) offering lush landscapes and traditional villages.' },
      { day: 'Day 4', title: 'Tolka–Ghandruk[Altitude 1940m/6365ft] Trekking', desc: 'Trek to the picturesque Ghandruk village (approx. 4 hours). Experience Gurung hospitality and incredible mountain views.' },
      { day: 'Day 5', title: 'Ghandruk-Nayapul-Trekking & drive to Pokhara', desc: 'Trek down from Ghandruk to Nayapul and take a scenic drive back to Pokhara to rest.' },
      { day: 'Day 6', title: 'Pokhara- Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park. Embark on a jungle safari (elephant or jeep) and enjoy a Tharu village tour.' },
      { day: 'Day 7', title: 'Chitwan-Nagarkot[2175m/4136ft]', desc: 'Drive to the hill station of Nagarkot. Prepare for spectacular sunrise views over the Himalayas the following morning.' },
      { day: 'Day 8', title: 'Nagarkot –Kathmandu', desc: 'Watch the sunrise over the Himalayas. Drive to Kathmandu visiting Bhaktapur Durbar Square, Pashupatinath, and Boudhanath. Farewell dinner.' },
      { day: 'Day 9', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide and Porter',
      'TIMS Card and ACAP permit',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '2 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 9 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-chitwan-rafting-9d': {
    quickInfo: [
      { label: 'Duration', value: '9 Days 8 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Kathmandu Pokhara Chitwan Tour with Rafting is the perfect 9-day adventure for travelers seeking a blend of culture, nature, and thrill in Nepal. This journey begins when you are warmly welcomed at Tribhuvan International Airport by a representative from Destination Nepal Tours & Travels. The next day, you’ll embark on a scenic drive to Pokhara, a city known for its serene lakes and stunning views of the Annapurna range. Early the following morning, experience the magical sunrise over the Himalayas from Sarangkot, one of the best vantage points in Pokhara. After breakfast, your day continues with an exploration of Pokhara's top attractions: a relaxing boat ride on Phewa Lake, a visit to the Bindabasini Temple, and stops at Davis Falls, the mystical Gupteswor Mahadev Cave, the Tibetan refugee camp, and the awe-inspiring Seti Gorge. As the evening falls, you’ll visit either the World Peace Stupa or the impressive Pumdikot Shiva Temple, offering panoramic views of the city and surrounding landscape.

The next part of your adventure takes you to Damauli for a two-day Seti River rafting experience. Enjoy thrilling rapids on the Seti River as you raft from Damauli to Saranghat, where you’ll stay overnight by the riverside. The following day, you’ll continue rafting to Gai Ghat before driving to Chitwan for a unique jungle experience. During your two-night stay in Chitwan, you’ll be immersed in the local culture with a Tharu village tour, and enjoy a traditional Tharu cultural program in the evening. Your jungle activities will include an elephant safari or jeep safari, depending on your resort’s location, a visit to the Crocodile Breeding Center or the Elephant Breeding Center, and a canoe ride along the peaceful Rapti River.

After your exciting wildlife adventure, the tour continues with a scenic drive to Nagarkot, where you’ll enjoy a sunrise view over the Himalayas the next morning. From Nagarkot, you’ll return to Kathmandu to visit historic sites such as Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. To end your trip on a memorable note, enjoy an authentic Nepali dinner with a cultural program at a typical Nepali restaurant. Finally, you’ll depart with unforgettable memories of your Nepal adventure. This Kathmandu, Pokhara, Chitwan Tour with Rafting is the ultimate way to experience Nepal's diverse offerings, from adventure sports to cultural exploration and wildlife encounters.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://himalayanadventuretreks.com/wp-content/uploads/2025/02/White-Water-Rafting.webp" alt="White Water Rafting" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://galaxyworldtravels.com/storage/uploads/adventure/images/116794039998083.jpg" alt="Rafting Adventure" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://nepalnirvanatrails.com/uploads/img/chitwan-national-park.jpg" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 9 Days Kathmandu Pokhara Chitwan Tour with Rafting?
- **Diverse Experiences in One Trip:** Combines cultural exploration, natural beauty, adventure sports, and wildlife encounters.
- **Adventure and Thrill:** Navigate the thrilling rapids of the Seti River while surrounded by stunning landscapes.
- **Wildlife Safari in Chitwan:** Close-up wildlife encounters via jungle safaris, canoeing, and conservation center visits.
- **Cultural Immersion:** Connect with Nepal's traditions visiting iconic temples, UNESCO heritage sites, and Tharu communities.
- **Stunning Himalayan Views:** Breathtaking sunrises over the snow-capped peaks from Sarangkot and Nagarkot.

### Best Seasons for the Tour
- **Spring (March to May):** Mild weather, clear skies, and pleasant temperatures. Blooming rhododendrons enhance the landscape, perfect for outdoor activities like rafting and safaris.
- **Autumn (September to November):** The best season to visit Nepal with dry, stable weather and clear Himalayan views. Ideal for sunrise tours, rafting, and wildlife encounters.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,665</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,695</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,625</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,470</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,420</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,980</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,235</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,180</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,030</td>
        <td class="px-6 py-4 text-center text-gray-800">$975</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,625</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,045</td>
        <td class="px-6 py-4 text-center text-gray-800">$995</td>
        <td class="px-6 py-4 text-center text-gray-800">$850</td>
        <td class="px-6 py-4 text-center text-gray-800">$800</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,550</td>
        <td class="px-6 py-4 text-center text-gray-800">$975</td>
        <td class="px-6 py-4 text-center text-gray-800">$930</td>
        <td class="px-6 py-4 text-center text-gray-800">$785</td>
        <td class="px-6 py-4 text-center text-gray-800">$735</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Two-day thrilling white water rafting adventure on the Seti River',
      'Stunning sunrise views over the Himalayas from Sarangkot and Nagarkot',
      'Discover Pokhara’s natural wonders including Phewa Lake and Davis Fall',
      'Exciting jungle activities in Chitwan National Park spotting exotic wildlife',
      'Explore Kathmandu Valley\'s UNESCO World Heritage sites and ancient temples'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Depending on your arrival time, explore the city or relax. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Discover Nepal: Kathmandu to Pokhara by Road [altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara, exploring the serene lakes and stunning views.' },
      { day: 'Day 3', title: 'Pokhara City Tour: Nature, Culture, and Adventure', desc: 'Breathtaking sunrise from Sarangkot. Visit Bindabasini Temple, Davis Fall, Gupteswor Cave, and enjoy boating on Phewa Lake.' },
      { day: 'Day 4', title: 'Pokhara to Damauli: A Rafting Adventure on the Seti River', desc: 'Drive to Damauli. Experience thrilling rapids on the Seti River rafting to Saranghat. Overnight tented camp by the river.' },
      { day: 'Day 5', title: 'From Rapids to Wildlife: Saranghat to Gaighat Rafting and Chitwan Drive[altitude 415m/1361ft]', desc: 'Continue rafting to Gaighat. Then drive to Chitwan National Park.' },
      { day: 'Day 6', title: 'Discover Chitwan: A Wildlife and Cultural Exploration', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, canoeing, and a Tharu cultural program.' },
      { day: 'Day 7', title: 'Transitioning from Jungle to Mountains: Chitwan to Nagarkot[2175m/4136ft]', desc: 'Scenic drive to Nagarkot, a hill station renowned for its Himalayan views.' },
      { day: 'Day 8', title: 'From Nagarkot to Kathmandu: A Cultural Heritage Tour', desc: 'Watch the sunrise over the Himalayas. Drive to Kathmandu visiting Bhaktapur Durbar Square, Pashupatinath, and Boudhanath. Farewell dinner.' },
      { day: 'Day 9', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      'Daily Buffet breakfast, lunch & dinner in Rafting day',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Tented Beach camp'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 9 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-muktinath-chitwan-9d': {
    quickInfo: [
      { label: 'Duration', value: '9 Days 8 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private Vehicle', icon: 'Plane' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Kathmandu Pokhara Muktinath Chitwan Tour offers a perfect blend of culture, adventure, and spirituality across Nepal’s diverse landscapes. This 9-day Nepal tour starts with a warm welcome at Tribhuwan International Airport, followed by a journey into the heart of Nepal’s most iconic destinations.

On the second day, you’ll embark on a scenic drive to Pokhara, one of Nepal’s most picturesque cities. Here, you can enjoy a peaceful boating experience on Phewa Lake with views of the majestic Annapurna range. The tour also includes visits to the Bindabasini Temple, a popular Hindu pilgrimage site, as well as the breathtaking Davis Fall and the mysterious Gupteswori Mahadev Cave. A stop at the Tibetan Refugee Camp and Seti Gorge adds a cultural and historical dimension to your Pokhara experience.

Next, your adventure takes you to Jomsom by flight, a scenic town in the Mustang region. From there, you’ll visit Muktinath, a sacred temple for both Hindus and Buddhists, nestled in the Himalayas. Muktinath is not only a spiritual highlight but also offers stunning mountain views. The tour also covers Kagbeni, a traditional village, and Dumba Lake, a serene spot near Jomsom. These areas are perfect for those seeking both spiritual peace and natural beauty.

After a memorable time in Jomsom and Muktinath, you will fly back to Pokhara and drive to Chitwan for an exciting jungle safari. Spend two nights in Chitwan, exploring the Tharu village, witnessing the Tharu cultural program, and going on a thrilling elephant safari or jeep safari, depending on the resort location. Canoe rides, visits to the Elephant Breeding Centre or Crocodile Breeding Centre, and opportunities for wildlife spotting in Chitwan National Park make this part of the tour unforgettable.

Your cultural journey continues with a full day of sightseeing in Bhaktapur Durbar Square, home to ancient palaces and temples. The itinerary also includes visits to Boudhanath Stupa and Pashupatinath Temple, two of Nepal’s most significant religious landmarks. The next day, explore Patan Durbar Square, Swoyambhunath Stupa, and Kathmandu Durbar Square, followed by an evening of authentic Nepali dinner with a cultural program at a traditional restaurant.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://yatrinepal.com/sites/default/files/styles/cover/public/deers-at-chitwan.jpg?itok=dfFRop6o" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/aa/0c/99.jpg" alt="Muktinath Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.bookmundi.com/tour/tour-of-kathmandu-pokhara-and-chitwan-23768-1510029029.jpg?format=auto&quality=10&width=1920" alt="Kathmandu Heritage" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 9 Days Kathmandu Pokhara Muktinath Chitwan Tour?
- **Spiritual Journey to Muktinath:** Visit the sacred Muktinath temple high in the Himalayas, a revered pilgrimage site for both Hindus and Buddhists.
- **Pokhara’s Natural Beauty:** Enjoy serene boating on Phewa Lake, explore Davis Fall, Gupteswori Cave, and gaze at majestic mountain views.
- **Exciting Wildlife Safari in Chitwan:** Close-up encounters with rare wildlife such as one-horned rhinos and Bengal tigers in Chitwan National Park.
- **Rich Cultural Experiences:** Discover Nepal’s ancient architecture, art, and vibrant history in Bhaktapur, Patan, and Kathmandu Durbar Squares.
- **Tharu Cultural Program:** Engage with the indigenous Tharu community and enjoy their traditional dance performances.

### Best Seasons for the Tour
- **Spring (March to May):** Mild temperatures and clear skies. Perfect for sightseeing, Muktinath visits, and wildlife viewing in Chitwan.
- **Autumn (September to November):** Crisp air, clear skies, and stunning views of the Himalayas. Culturally enriching with festivals like Dashain and Tihar.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,850</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,910</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,830</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,675</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,625</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,155</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,450</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,390</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,235</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,180</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,765</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,210</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,160</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,010</td>
        <td class="px-6 py-4 text-center text-gray-800">$960</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,715</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,160</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,110</td>
        <td class="px-6 py-4 text-center text-gray-800">$965</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Scenic flight to Jomsom and a spiritual visit to the sacred Muktinath Temple',
      'Discover Pokhara’s natural wonders including Phewa Lake and Davis Fall',
      'Exciting jungle activities in Chitwan National Park spotting exotic wildlife',
      'Explore Kathmandu Valley\'s UNESCO World Heritage sites including Bhaktapur Durbar Square',
      'Experience traditional Tharu culture with a village walk and cultural dance'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft] Nepal’s Scenic Route', desc: 'Scenic drive to Pokhara. Explore Phewa Lake, Bindabasini Temple, Davis Fall, and Gupteswori Cave.' },
      { day: 'Day 3', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft) : Gateway to the Himalayas', desc: 'Fly to Jomsom. Visit the sacred Muktinath Temple, Kagbeni village, and Dumba Lake.' },
      { day: 'Day 4', title: 'Jomsom to Pokhara by Air, Then Drive to Chitwan for a Wildlife Experience[altitude 415m/1361ft]', desc: 'Fly back to Pokhara, then drive to Chitwan National Park for an immersive wildlife experience.' },
      { day: 'Day 5', title: 'Explore the Wilderness: Chitwan National Park Adventure', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, canoeing, and a Tharu cultural program.' },
      { day: 'Day 6', title: 'Chitwan-Kathmandu: From Chitwan’s Wilderness to City Life', desc: 'Drive back to Kathmandu from Chitwan. Rest or explore the city.' },
      { day: 'Day 7', title: 'Kathmandu City Tour', desc: 'Visit Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple.' },
      { day: 'Day 8', title: 'Kathmandu City Tour', desc: 'Explore Patan Durbar Square, Swoyambhunath Stupa, and Kathmandu Durbar Square. Enjoy an authentic Nepali dinner with a cultural program.' },
      { day: 'Day 9', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Om\'s Home in Jomsom',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 9 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'ktm-pokhara-lumbini-chitwan-9d': {
    quickInfo: [
      { label: 'Duration', value: '9 Days 8 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 9 Days Kathmandu Pokhara Lumbini Chitwan Tour is the perfect way to explore Nepal's rich cultural heritage, natural beauty, and wildlife. Starting with a warm welcome at Tribhuwan International Airport, you will embark on a scenic drive to Pokhara the next day. The journey includes a sunrise view from Sarangkot, offering breathtaking Himalayan scenery. After breakfast, you'll visit Bindabasini Temple, Seti Gorge, Davis Falls, Gupteshwor Cave, the Tibetan Refugee Camp, and enjoy a peaceful boat ride on Phewa Lake. In the evening, a visit to the World Peace Stupa awaits.

The next day, the tour continues to Lumbini, the birthplace of Lord Buddha. Explore the sacred grounds before heading toward Chitwan. In Chitwan, you'll stay for two nights and experience the Tharu village, the traditional Tharu cultural program, and enjoy an exciting canoe ride in the Rapti River. Depending on your hotel location, you can choose between an Elephant Safari or Jeep Safari, and visit the Crocodile Breeding Center or Elephant Breeding Center.

From Chitwan, you'll drive to Nagarkot for a night stay and witness a stunning sunrise with panoramic Himalayan views. After breakfast, visit Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple in Kathmandu. The day ends with a traditional Nepali dinner and live cultural show at a local restaurant. The tour concludes the following day with departure, leaving you with lasting memories of Nepal's beauty and culture.

This 9 Days Kathmandu Pokhara Lumbini Chitwan Tour package offers a diverse experience, blending cultural, natural, and wildlife attractions, making it an ideal itinerary for those seeking a comprehensive Nepal tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nepalpackagetour.com/public/uploads/tour/Kathmandu-Pokhara-Chitwan-Travel-Package.jpg" alt="Lumbini Maya Devi" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://rptreks.com/wp-content/uploads/2024/02/Pashupatinath-temple-1024x768.jpg" alt="Pashupatinath Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://image.kkday.com/v2/image/get/c_fill%2Cq_55%2Ct_webp%2Cw_960/s1.kkday.com/product_scm_10114/20260122072158_QO88c/jpg" alt="Kathmandu Tour" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 9 Days Kathmandu Pokhara Lumbini Chitwan Tour?
- **Diverse Experiences:** The tour offers a perfect mix of cultural heritage, natural beauty, and wildlife adventures.
- **Stunning Scenic Views:** Witness breathtaking sunrises over the Himalayas from Sarangkot and Nagarkot, plus the peaceful beauty of Phewa Lake.
- **Cultural Immersion:** Deepen your connection to Nepal’s spirituality with visits to the sacred Lumbini, Bhaktapur Durbar Square, and Pashupatinath Temple.
- **Wildlife Adventure:** Thrilling safaris in Chitwan National Park coupled with rich Tharu cultural experiences.
- **Relaxing Pace:** A comfortable balance between adventure and relaxation with well-planned sightseeing and multiple overnight stays.

### Best Seasons for the Tour
- **Spring (March to May):** Pleasant and warm weather with clear mountain views and blooming rhododendrons. Ideal for sightseeing and wildlife safaris.
- **Autumn (September to November):** Crystal-clear skies, cool weather, and stunning Himalayan views. Perfect for outdoor activities and cultural festivals like Dashain.
- **Winter (December to February):** Crisp cold air, stunning sunrises over snow-capped mountains, and quieter tourist spots.
- **Summer/Monsoon (June to August):** Lush greenery and dramatic waterfalls, though frequent rainfall can make roads muddy.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,795</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,705</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,625</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,430</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,365</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,080</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,240</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,180</td>
        <td class="px-6 py-4 text-center text-gray-800">$985</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,665</td>
        <td class="px-6 py-4 text-center text-gray-800">$990</td>
        <td class="px-6 py-4 text-center text-gray-800">$935</td>
        <td class="px-6 py-4 text-center text-gray-800">$750</td>
        <td class="px-6 py-4 text-center text-gray-800">$685</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,600</td>
        <td class="px-6 py-4 text-center text-gray-800">$935</td>
        <td class="px-6 py-4 text-center text-gray-800">$885</td>
        <td class="px-6 py-4 text-center text-gray-800">$700</td>
        <td class="px-6 py-4 text-center text-gray-800">$635</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Stunning sunrise views over the Himalayas from Sarangkot and Nagarkot',
      'Discover Pokhara’s natural wonders including Phewa Lake and Davis Fall',
      'Visit Lumbini, the sacred birthplace of Lord Buddha, a UNESCO World Heritage Site',
      'Exciting jungle activities in Chitwan National Park spotting exotic wildlife',
      'Explore Kathmandu Valley\'s UNESCO World Heritage sites and ancient temples'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara. Explore the lakeside and enjoy the serene atmosphere.' },
      { day: 'Day 3', title: 'Pokhara', desc: 'Sarangkot sunrise view. Visit Bindabasini Temple, Seti Gorge, Davis Falls, Gupteshwor Cave, Tibetan Refugee Camp, and enjoy a boat ride on Phewa Lake. Evening visit to the World Peace Stupa.' },
      { day: 'Day 4', title: 'Pokhara-Lumbini[altitude 150m/492ft]', desc: 'Drive to Lumbini. Explore the sacred Maya Devi Temple and various monasteries from different countries.' },
      { day: 'Day 5', title: 'Lumbini-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park for a wildlife experience.' },
      { day: 'Day 6', title: 'Chitwan', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, canoeing, and a Tharu cultural program.' },
      { day: 'Day 7', title: 'Chitwan-Nagarkot[2175m/4136ft]', desc: 'Scenic drive to Nagarkot, renowned for its Himalayan sunrise and sunset views.' },
      { day: 'Day 8', title: 'Nagarkot –Kathmandu', desc: 'Watch the sunrise over the Himalayas. Drive to Kathmandu visiting Bhaktapur Durbar Square, Pashupatinath, and Boudhanath. Farewell dinner with a cultural show.' },
      { day: 'Day 9', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '2 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Buddha Maya Garden or similar in Lumbini'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 9 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-ghandruk-trek-10d': {
    quickInfo: [
      { label: 'Duration', value: '10 Days 9 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 10 Days Nepal Tour with Ghandruk Trek is a perfect blend of adventure, culture, and natural beauty. This journey begins when a representative from Destination Nepal Tours and Travels welcomes you at Tribhuvan International Airport. You can relax on your arrival day, or explore a bit of Kathmandu if you arrive early.

The next day, your journey starts with a drive to Chitwan National Park. This park is famous for its wildlife activities. During your two-night stay, you will visit a Tharu village, enjoy a Tharu cultural program, take a canoe ride on the Rapti River, and go on an elephant safari or a jeep safari, depending on your resort location. You can also visit the Elephant Breeding Centre or the Crocodile Breeding Centre.

After your time in Chitwan, you will drive to Pokhara. Here, you can enjoy a city tour of Pokhara, visiting Bindabasini Temple, Davis Fall, Gupteswor Mahadev Cave, and the Tibetan Refugee Camp. You can also go boating at the beautiful Phewa Lake.

The highlight of the tour is the 3-day Ghandruk Trek. From Pokhara, you will drive to Phedi, a short one-hour journey. From Phedi, the trek begins, taking you to Tolka after about 5 hours of trekking. You will spend the night in Tolka. The next day, you will trek to Ghandruk, one of the most beautiful and traditional villages in the Annapurna region. The trek takes about 4 hours. Here, you will experience the rich culture of the Gurung people and stunning views of the Annapurna mountains. On the final day of the trek, you will descend to Nayapul and drive back to Pokhara. This Ghandruk trek brings you closer to Nepal’s mountain culture and offers an amazing trekking experience. It is also a great introduction to longer treks in Nepal.

After returning to Pokhara, you will drive back to Kathmandu. The scenic drive offers beautiful views of rivers, hills, and small villages along the way. In Kathmandu, you will visit famous sites like Boudhanath Stupa, Pashupatinath Temple, Swoyambhunath Stupa, and Kathmandu Durbar Square. In the evening, enjoy a traditional Nepali dinner with a cultural program at a typical Nepali restaurant.

Your 10 Days Nepal Tour with Ghandruk Trek ends with departure from Kathmandu, taking with you unforgettable memories of Nepal's wildlife, culture, and mountains. This tour is designed by Destination Nepal Tours and Travels to give you the best of Nepal in a short time.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://galaxyworldtravels.com/storage/uploads/adventure/images/316794042251447.jpeg" alt="Ghandruk Village" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/66/48/e9.jpg" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.himalayantrekkingpath.com/_next/image?url=https%3A%2F%2Fmedia.app.himalayantrekkingpath.com%2Fuploads%2Ffullbanner%2Fbandipur-touring.webp&w=3840&q=75&dpl=dpl_3KNdaNwCDiUgUVh4mjVZ9wigSein" alt="Scenic Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 10 Days Nepal Tour with Ghandruk Trek?
- **Perfect Mix of Adventure and Culture:** Experience wildlife adventures, scenic landscapes, and the traditional village life of Ghandruk.
- **Close Encounter with Wildlife:** Spot rhinos and crocodiles in Chitwan National Park and immerse yourself in the local Tharu culture.
- **Stunning Views of the Himalayas:** The Ghandruk trek offers majestic backdrops of Annapurna South, Hiunchuli, and Machhapuchhre.
- **Exploring the Best of Pokhara:** Enjoy the serenity of Phewa Lake alongside cultural visits to Bindabasini Temple and Davis Fall.
- **Immerse in Nepal’s Mountain Culture:** A 3-day authentic trek connecting with the Gurung people and their rich traditions in the Annapurna foothills.

### Best Seasons for the Tour
- **Spring (March to May):** Warm weather, blooming rhododendrons, and clear skies for stunning mountain views and comfortable Chitwan safaris.
- **Autumn (September to November):** Peak season offering cool, dry weather, excellent visibility, and the chance to experience major Nepali festivals like Dashain.

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
  <p class="text-blue-800 font-medium"><strong>Have more time?</strong> We also offer an 11-day itinerary that provides the same level of adventure as the Ghandruk village trek for an even more relaxed pace!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,790</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,780</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,590</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,515</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,450</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,070</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,300</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,130</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,050</td>
        <td class="px-6 py-4 text-center text-gray-800">$990</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,705</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,080</td>
        <td class="px-6 py-4 text-center text-gray-800">$920</td>
        <td class="px-6 py-4 text-center text-gray-800">$845</td>
        <td class="px-6 py-4 text-center text-gray-800">$785</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,625</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,005</td>
        <td class="px-6 py-4 text-center text-gray-800">$850</td>
        <td class="px-6 py-4 text-center text-gray-800">$775</td>
        <td class="px-6 py-4 text-center text-gray-800">$715</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Scenic trekking to traditional villages like Tolka and Ghandruk in the Annapurna foothills',
      'Stunning views of Annapurna South and Machhapuchhre from Ghandruk village',
      'Discover Pokhara’s natural wonders including Phewa Lake and Davis Fall',
      'Exciting jungle activities in Chitwan National Park spotting exotic wildlife',
      'Explore Kathmandu Valley\'s UNESCO World Heritage sites and ancient temples'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park. Prepare for an immersive wildlife experience.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, canoeing, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara. Explore the lakeside and enjoy the serene atmosphere.' },
      { day: 'Day 5', title: 'Pokhara-Tolka [Altitude 1700/5578ft]', desc: 'Drive to Phedi (approx 1 hour) and begin the trek. Trek for about 5 hours to reach Tolka. Overnight in Tolka.' },
      { day: 'Day 6', title: 'Tolka–Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek to the picturesque Ghandruk village (approx. 4 hours). Experience Gurung hospitality and incredible mountain views.' },
      { day: 'Day 7', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Trek down from Ghandruk to Nayapul and take a scenic drive back to Pokhara to rest.' },
      { day: 'Day 8', title: 'Pokhara-Kathmandu', desc: 'Scenic drive back to Kathmandu with beautiful views of rivers and hills.' },
      { day: 'Day 9', title: 'Kathmandu', desc: 'City tour of Kathmandu visiting Boudhanath Stupa, Pashupatinath, Swoyambhunath, and Kathmandu Durbar Square. Farewell traditional dinner with cultural show.' },
      { day: 'Day 10', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag for trekking time',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '2 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 10 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-rafting-10d': {
    quickInfo: [
      { label: 'Duration', value: '10 Days 9 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on an unforgettable journey with our 10 Days Nepal Tour with Rafting, blending adventure, culture, and natural beauty. This tour takes you through the scenic landscapes of Pokhara, Chitwan, and Nagarkot while giving you the thrill of rafting in the Seti River. You will experience everything from breathtaking mountain views to thrilling safaris and vibrant cultural encounters.

Your adventure begins with a warm welcome at Tribhuvan International Airport by a representative from Destination Nepal Tours & Travels. The next day, enjoy a scenic drive to Pokhara, a city known for its stunning mountain scenery. Early the next morning, visit Sarangkot to witness a mesmerizing sunrise over the Himalayas. After breakfast, explore Pokhara’s highlights, including Bindabasi Temple, Davis Fall, Gupteshwor Mahadev Cave, Tibetan Refugee Camp, Seti Gorge, and enjoy a peaceful boat ride on Phewa Lake. In the evening, visit the serene World Peace Stupa for panoramic views of the city and surrounding mountains.

The adventure continues with a drive to Damauli for a thrilling rafting experience on the Seti River, followed by an overnight stay at a beach camp under the stars. After rafting, head to Chitwan National Park for a two-night stay, where you'll dive into the heart of Nepal's rich wildlife. Highlights include a Tharu village tour, a Tharu cultural program, an Elephant Safari or Jeep Safari, and a Canoe ride on the Rapti River. Depending on your resort location, you will also visit either the Crocodile Breeding Center or the Elephant Breeding Center.

After your wildlife adventures, the tour takes you to Nagarkot, famous for its stunning sunrise views over the Himalayas. The next morning, witness the sunrise and enjoy the panoramic Himalayan views before heading back to Kathmandu. On the way, visit Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple—some of Nepal’s most revered UNESCO World Heritage Sites.

Your journey concludes in Kathmandu, where you'll explore Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square before enjoying a traditional Nepali dinner with a cultural program. Finally, depart from Nepal with wonderful memories of this adventure-packed tour.

This 10 Days Nepal Tour with Rafting offers the perfect mix of adventure, culture, and relaxation, making it one of the most unique and exciting Nepal holiday packages.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://wildernesstours.com/wp-content/uploads/2025/11/High-Adventure-Rafting-Feature-Image.webp" alt="River Rafting Adventure" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.yosemite.com/wp-content/uploads/2024/04/JC_3065-scaled-topaz-enhance-1.7x-faceai-scaled.jpeg" alt="Nature Exploration" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://themountaingaze.com/wp-content/uploads/2025/08/clearcreekcounty_Rafters.jpg" alt="Rafting Thrill" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 10 Days Nepal Tour with Rafting?
- **Cultural and Historical Sites:** Explore UNESCO World Heritage Sites across the Kathmandu Valley and the incredible sunrises at Nagarkot.
- **Natural Beauty:** Be captivated by the beauty of Pokhara, the serenity of Phewa Lake, and the majestic Annapurna mountains.
- **Wildlife and Nature:** Spot Bengal tigers, one-horned rhinos, and Asian elephants at Chitwan National Park during thrilling jungle safaris.
- **Adventure Activities:** Get your adrenaline pumping with a thrilling Seti River rafting experience paired with an overnight beach camp.

### Best Seasons for the Tour
- **Spring (March to May):** Mild weather and blooming rhododendrons make it perfect for sightseeing, wildlife activities, and catching Himalayan sunrises.
- **Autumn (September to November):** The best time for this tour with crystal-clear mountain views, moderate temperatures, and calm river flows, enhancing the rafting experience.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,955</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,895</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,715</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,645</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,590</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,160</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,355</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,195</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,125</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,070</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,765</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,120</td>
        <td class="px-6 py-4 text-center text-gray-800">$970</td>
        <td class="px-6 py-4 text-center text-gray-800">$905</td>
        <td class="px-6 py-4 text-center text-gray-800">$850</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,700</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,065</td>
        <td class="px-6 py-4 text-center text-gray-800">$915</td>
        <td class="px-6 py-4 text-center text-gray-800">$850</td>
        <td class="px-6 py-4 text-center text-gray-800">$800</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Thrilling river rafting on the Seti River with an overnight beach camp experience',
      'Discover Pokhara’s natural wonders including Phewa Lake and Davis Fall',
      'Stunning sunrise views over the Himalayas from Sarangkot and Nagarkot',
      'Exciting jungle activities in Chitwan National Park spotting exotic wildlife',
      'Explore Kathmandu Valley\'s UNESCO World Heritage sites and ancient temples'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft]', desc: 'Scenic drive to Pokhara. Explore the lakeside and enjoy the serene atmosphere.' },
      { day: 'Day 3', title: 'Pokhara', desc: 'Sarangkot sunrise view. Visit Bindabasini Temple, Seti Gorge, Davis Falls, Gupteshwor Cave, Tibetan Refugee Camp, and enjoy a boat ride on Phewa Lake. Evening visit to the World Peace Stupa.' },
      { day: 'Day 4', title: 'Pokhara- Damauli', desc: 'Drive to Damauli for an exhilarating rafting adventure on the Seti River. Overnight at a tented beach camp.' },
      { day: 'Day 5', title: 'Saranghat-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park. Prepare for an immersive wildlife experience.' },
      { day: 'Day 6', title: 'Chitwan', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, canoeing, and a Tharu cultural program.' },
      { day: 'Day 7', title: 'Chitwan-Nagarkot[2175m/4136ft]', desc: 'Scenic drive to Nagarkot, renowned for its Himalayan sunrise and sunset views.' },
      { day: 'Day 8', title: 'Nagarkot-Kathmandu', desc: 'Watch the sunrise over the Himalayas. Drive to Kathmandu visiting Bhaktapur Durbar Square, Pashupatinath, and Boudhanath.' },
      { day: 'Day 9', title: 'Kathmandu', desc: 'City tour of Kathmandu visiting Patan Durbar Square, Swayambhunath, and Kathmandu Durbar Square. Farewell traditional dinner with cultural show.' },
      { day: 'Day 10', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      'Daily Buffet breakfast, lunch & dinner in Rafting day',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Tented Beach camp'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 10 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-muktinath-10d': {
    quickInfo: [
      { label: 'Duration', value: '10 Days 9 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `10 Days Nepal Tour with Muktinath is the perfect way to experience the best of Nepal's cultural, spiritual, and natural beauty. Your journey begins when you are welcomed by a representative from Destination Nepal Tours and Travels at Tribhuwan International Airport. The next day, you will drive to Chitwan, where you will stay for two nights. Chitwan offers an exciting jungle safari experience where you can spot wildlife in Chitwan National Park. Activities like the Tharu village tour, Tharu cultural program, and either an elephant safari or jeep safari will be arranged, depending on the location of your resort. You will also enjoy a canoe ride in the Rapti River and visit the crocodile breeding center or elephant breeding center as per your resort’s proximity.

After your stay in Chitwan, you will drive to Pokhara, one of Nepal’s most beautiful cities, known for its serene lakes and mountain views. From Pokhara, you will take a flight to Muktinath, a sacred pilgrimage site for both Hindus and Buddhists. At Muktinath, you will visit the Muktinath Temple, which sits at 3,710 meters and is famous for its 108 water spouts and eternal flame. You’ll also explore nearby sites such as Kagbeni and Dhumba Lake, offering breathtaking views of the Annapurna mountain range. The next day, you will return to Pokhara, where you can enjoy a relaxing boat ride at Phewa Lake and visit some of the city’s most famous attractions, such as the Bindabasini Temple, Gupteshwor Mahadev Cave, Davis Fall, and the Tibetan refugee camp.

After your time in Pokhara, you will drive back to Kathmandu. In the capital city, you’ll visit important UNESCO World Heritage Sites, including Bhaktapur Durbar Square, the magnificent Boudhanath Stupa, and the sacred Pashupatinath Temple. On the following day, you will explore Patan Durbar Square, Swayambhunath Stupa (also known as the Monkey Temple), and Kathmandu Durbar Square, which houses the Kumari (the living goddess). Your trip will conclude with a Nepali cultural dinner featuring traditional music and dance, leaving you with unforgettable memories of your 10 Days Nepal Tour with Muktinath.

This tour offers a comprehensive experience of Nepal, combining adventure, culture, spirituality, and natural beauty. From the jungle safari in Chitwan to the serene temples in Kathmandu, this trip will immerse you in the best that Nepal has to offer.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.visithimalayastrek.com/uploads/photos/1/Mustang-Muktinath-Temple.jpg" alt="Muktinath Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.nepaltrekadventures.com/uploads/img/muktinath-temple.webp" alt="Sacred 108 Waterspouts" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://skylinetreks.com/wp-content/uploads/2023/10/muktinath-cable-car.jpg" alt="Muktinath Scenery" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 10 Days Nepal Tour with Muktinath?
- **Spiritual Journey to Muktinath:** Visit the sacred Muktinath Temple, nestled at 3,710m, with its 108 water spouts and eternal flame.
- **Wildlife Adventure in Chitwan National Park:** Spot endangered species like the Bengal tiger and one-horned rhinoceros during an exciting jungle safari.
- **Scenic Beauty of Pokhara:** Enjoy a peaceful boat ride on Phewa Lake and soak in the stunning backdrop of the Annapurna range.
- **Cultural Richness of Kathmandu Valley:** Dive deep into Nepal’s heritage visiting UNESCO World Heritage Sites across Kathmandu, Bhaktapur, and Patan.
- **Nepali Cultural Experience:** Conclude your trip with an authentic Nepali cultural dinner with traditional music and dance.

### Best Seasons for the Tour
- **Spring (March to May):** Mild temperatures (16°C to 35°C), clear skies, and blooming rhododendrons make it beautiful for sightseeing and jungle safaris.
- **Autumn (September to November):** The best time for this tour. The post-monsoon season provides lush landscapes, clear skies, and perfect visibility for mountain views.
- **Winter (December to February):** A quiet, peaceful experience with snow-capped peaks. Temperatures drop (especially in Muktinath), so bring warm clothing.
- **Summer/Monsoon (June to August):** Warmer temperatures with vibrant wildlife in Chitwan, though heavy rains can occur.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$3,180</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,115</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,955</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,885</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,820</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,370</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,585</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,445</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,380</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,315</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,940</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,325</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,200</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,130</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,070</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,880</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,270</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,140</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,075</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,015</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Scenic flight between Pokhara and Jomsom featuring incredible views of the Annapurna and Dhaulagiri ranges',
      'Spiritual visit to the sacred Muktinath Temple with its 108 water spouts and eternal flame',
      'Explore the breathtaking landscapes of Kagbeni and Dhumba Lake in the Mustang region',
      'Thrilling jungle activities in Chitwan National Park spotting exotic wildlife like rhinos and tigers',
      'Discover Kathmandu Valley\'s UNESCO World Heritage sites including Swayambhunath, Pashupatinath, and Durbar Squares'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park. Prepare for an immersive wildlife experience.' },
      { day: 'Day 3', title: 'Chitwan-Full day wildlife activity', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, canoeing, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara. Explore the lakeside and enjoy the serene atmosphere.' },
      { day: 'Day 5', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft)', desc: 'Scenic flight to Jomsom. Drive to Muktinath for Darshan, then return to Jomsom. Overnight in Jomsom.' },
      { day: 'Day 6', title: 'Jomsom-Pokhara', desc: 'Fly back to Pokhara. Afternoon sightseeing of Pokhara: Bindabasini Temple, Davis Falls, Gupteshwor Cave, and Phewa Lake.' },
      { day: 'Day 7', title: 'Pokhara-Kathmandu', desc: 'Scenic drive back to Kathmandu with beautiful views of rivers and hills.' },
      { day: 'Day 8', title: 'Kathmandu City Tour', desc: 'Explore the magnificent UNESCO Heritage sites: Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple.' },
      { day: 'Day 9', title: 'Kathmandu City Tour', desc: 'Visit Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square. Farewell Nepali dinner with cultural dance.' },
      { day: 'Day 10', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Om\'s Home in Jomsom'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 10 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-lumbini-10d': {
    quickInfo: [
      { label: 'Duration', value: '10 Days 9 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/7135ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `10 Days Nepal Tour with Lumbini is a perfect journey for travelers who want to explore Nepal’s natural beauty, spiritual sites, and rich culture. The tour begins when a representative from Destination Nepal Tours & Travels welcomes you at Tribhuvan International Airport in Kathmandu. The adventure kicks off the next day with a scenic drive to Pokhara, a city famous for its lakes and breathtaking views of the Himalayas. The following morning, you will visit Sarangkot to experience a stunning sunrise over the snow-capped mountains. Afterward, you will tour the Bindabasini Temple, Seti Gorge, Gupteshwor Mahadev Cave, and Davis Fall, which are some of Pokhara's most famous attractions. You will also visit the Tibetan Refugee Camp, take a boat ride on the serene Phewa Lake, and end the day at the World Peace Stupa, enjoying the peaceful atmosphere.

After Pokhara, your 10 Days Nepal Tour with Lumbini continues with a drive to Lumbini, the birthplace of Lord Buddha and a UNESCO World Heritage Site. Here, you will visit the sacred Maya Devi Temple and explore the monasteries built by Buddhist communities from different countries. Lumbini’s tranquil environment offers a deeply spiritual experience, making it a must-visit for those interested in Buddhism and peace.

The next stop is Chitwan National Park, where you will spend two nights. Chitwan is known for its incredible wildlife and adventure opportunities. You can choose between an elephant safari or jeep safari, depending on your preference. A canoe ride along the Rapti River gives you a chance to spot crocodiles and other wildlife. You can also visit the Crocodile Breeding Centre or the Elephant Breeding Centre to learn more about conservation efforts in the area. Additionally, a Tharu Village tour will give you insight into the local culture, and the Tharu Cultural Dance Program will showcase the traditional dances of the indigenous people.

After your time in Chitwan, the tour takes you to Nagarkot, a hill station famous for its panoramic sunrise views over the Himalayas. You will enjoy a peaceful morning here, taking in the stunning scenery before heading back to Kathmandu. On the way, you’ll stop at Bhaktapur Durbar Square, a historic site known for its beautiful architecture and ancient temples. Once back in Kathmandu, the tour includes visits to some of the city’s most famous landmarks, including Boudhanath Stupa, Pashupatinath Temple, and Patan Durbar Square.

The final day of your 10 Days Nepal Tour with Lumbini includes visits to Swayambhunath Stupa, also known as the Monkey Temple, and Kathmandu Durbar Square. In the evening, you’ll enjoy a special Nepali dinner with a cultural program, where you can experience traditional music and dance. The next day, you’ll depart with unforgettable memories of your Nepal adventure.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://lumbinidevtrust.gov.np/upload_file/images/slider/1721894939_276597348_lumbini.jpg" alt="Lumbini Sacred Garden" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdf-1q2D2gKUn6sDvE_lzEoe8thBDlrf5XrQ&s" alt="Buddhist Monasteries" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/0c/bd/25.jpg" alt="Chitwan Safari Experience" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 10 Days Nepal Tour with Lumbini?
- **Diverse Experiences:** A perfect mix of nature, culture, and spirituality blending Pokhara's lakes, Lumbini's temples, and Chitwan's wildlife.
- **Spiritual Significance:** Explore Lumbini, the birthplace of Lord Buddha, including the Maya Devi Temple and international monasteries.
- **Stunning Himalayan Views:** Witness majestic sunrises from both Sarangkot in Pokhara and Nagarkot near Kathmandu.
- **Wildlife Adventures:** Enjoy a two-night stay in Chitwan National Park with safaris and cultural Tharu dance programs.
- **Cultural Immersion:** Explore historical landmarks across Kathmandu, Patan, and Bhaktapur Durbar Squares.

### Best Seasons for the Tour
- **Spring (March to May):** Warm days ideal for sightseeing, clear skies for mountain views, and blooming rhododendrons. Nepali New Year and Buddha Jayanti occur during this time.
- **Autumn (September to November):** The best time for this tour with clear skies, mild temperatures, and the lively Dashain and Tihar festivals.
- **Winter (December to February):** Peaceful, serene experience with snow-capped mountain views and pleasant sightseeing in Lumbini and Chitwan.
- **Summer/Monsoon (June to August):** Lush, incredibly green landscapes perfect for a quieter, serene spiritual retreat.

<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Trip Cost for 2026/27 (Price is Per Person /US$)</h3>
<div class="overflow-x-auto shadow-sm rounded-lg border border-gray-200 mt-4 mb-8">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="bg-gray-50 text-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 font-semibold">Package Category</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">1 Person</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">2 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">3-5 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">6-8 Persons</th>
        <th scope="col" class="px-6 py-3 font-semibold text-center">9+ Persons</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-purple-700">Luxury</td>
        <td class="px-6 py-4 text-center text-gray-800">$3,090</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,880</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,665</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,580</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,505</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-blue-700">Comfort</td>
        <td class="px-6 py-4 text-center text-gray-800">$2,275</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,350</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,160</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,070</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,000</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-green-700">Standard</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,815</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,075</td>
        <td class="px-6 py-4 text-center text-gray-800">$900</td>
        <td class="px-6 py-4 text-center text-gray-800">$815</td>
        <td class="px-6 py-4 text-center text-gray-800">$745</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 font-bold text-orange-700">Budget</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,745</td>
        <td class="px-6 py-4 text-center text-gray-800">$1,020</td>
        <td class="px-6 py-4 text-center text-gray-800">$840</td>
        <td class="px-6 py-4 text-center text-gray-800">$760</td>
        <td class="px-6 py-4 text-center text-gray-800">$690</td>
      </tr>
    </tbody>
  </table>
</div>`,
    highlights: [
      'Spiritual enlightenment at Lumbini, the birthplace of Lord Buddha',
      'Discover Pokhara’s natural wonders including Phewa Lake and Davis Fall',
      'Stunning sunrise views over the Himalayas from Sarangkot and Nagarkot',
      'Exciting jungle activities in Chitwan National Park spotting exotic wildlife',
      'Explore Kathmandu Valley\'s UNESCO World Heritage sites and ancient temples'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Pokhara[altitude 830m/2723ft] Scenic Tour with Himalayas, Lakes', desc: 'Scenic drive to Pokhara. Explore the lakeside and enjoy the serene atmosphere.' },
      { day: 'Day 3', title: 'Pokhara City Tour', desc: 'Sarangkot sunrise view. Visit Bindabasini Temple, Seti Gorge, Davis Falls, Gupteshwor Cave, Tibetan Refugee Camp, and enjoy a boat ride on Phewa Lake. Evening visit to the World Peace Stupa.' },
      { day: 'Day 4', title: 'Pokhara-Lumbini[altitude 150m/492ft] Cultural and Spiritual Journey through Nepal', desc: 'Drive to Lumbini. Explore the sacred Maya Devi Temple and various monasteries from different countries.' },
      { day: 'Day 5', title: 'Lumbini-Chitwan[altitude 415m/1361ft] Wildlife Safari and Cultural Adventure in Nepal', desc: 'Drive to Chitwan National Park for an immersive wildlife and cultural experience.' },
      { day: 'Day 6', title: 'Chitwan -Full day Wildlife activity', desc: 'Full day of jungle adventures: elephant or jeep safari, visiting breeding centers, canoeing, and a Tharu cultural program.' },
      { day: 'Day 7', title: 'Chitwan-Nagarkot[2175m/7135ft] Scenic Drive and Sunrise View of the Himalayas', desc: 'Scenic drive to Nagarkot, renowned for its Himalayan sunrise and sunset views.' },
      { day: 'Day 8', title: 'Nagarkot-Kathmandu', desc: 'Watch the sunrise over the Himalayas. Drive to Kathmandu visiting Bhaktapur Durbar Square, Pashupatinath, and Boudhanath.' },
      { day: 'Day 9', title: 'Kathmandu City Tour', desc: 'Visit Patan Durbar Square, Swayambhunath, and Kathmandu Durbar Square. Farewell traditional dinner with cultural show.' },
      { day: 'Day 10', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Buddha Maya Garden or similar in Lumbini'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 10 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-ghandruk-trek-11d': {
    quickInfo: [
      { label: 'Duration', value: '11 Days 10 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Start your 11 Days Nepal Tour with Ghandruk Village Trek upon arrival at Tribhuvan International Airport in Kathmandu, where a Destination Nepal Tours and Travels representative will warmly welcome you. Spend this day unwinding from your journey, with the option to explore Kathmandu if you arrive early.

On Day 2, the adventure continues as you take a scenic 5-6 hour drive to Chitwan National Park for a two-night stay. Dive into the local culture with a visit to a traditional Tharu village, attend a Tharu cultural program, and relax on a canoe ride along the Rapti River. Depending on your resort location, enjoy either an elephant safari or jeep safari through the jungle, with stops at the Elephant Breeding Center or Crocodile Breeding Center for a closer look at Nepal’s unique wildlife.

Day 4 takes you to the vibrant city of Pokhara. Here, visit Bindabasini Temple, marvel at Davis Fall, explore Gupteshwor Mahadev Cave, and learn about local heritage at the Tibetan Refugee Camp. Take a peaceful boat ride on Phewa Lake, surrounded by Pokhara’s scenic hills.

The next part of your Nepal Trekking Tour begins on Day 5. A short drive to Phedi marks the start of a 5-hour trek to Tolka, where you’ll spend the night amid stunning mountain scenery. On Day 6, trek from Tolka to Ghandruk Village in about four hours. Ghandruk, a traditional Gurung village, offers breathtaking views of Annapurna South and Machhapuchhre peaks, and is a highlight for cultural immersion and mountain hospitality.

On Day 7, trek from Ghandruk to Nayapul in about 5-6 hours, followed by a drive back to Pokhara. Spend the evening relaxing, then drive back to Kathmandu the next day, a journey of around 6-7 hours.

Your time in Kathmandu includes two days of cultural tours. On Day 9, visit UNESCO sites like Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square for an immersive experience of Nepal’s rich heritage. Day 10 continues with a visit to Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square, each offering a unique glimpse into Nepalese culture. Celebrate your final evening with a traditional Nepali dinner and live cultural show.

Your 11 Days Nepal Tour concludes on Day 11 with unforgettable memories of Nepal’s landscapes, culture, and warm hospitality, leaving you with the essence of a Beautiful Nepal trip.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://tibetanencounter.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-14-at-6.48.44-pm-800x436.jpeg" alt="Ghandruk Village Encounter" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nepalmountaintrekkers.com/wp-content/uploads/2021/02/ghandruk-trek.jpg" alt="Trekking to Ghandruk" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.ruggedtrailsnepal.com/uploads/img/luxury-ghorepani-poon-hill-ghandruk-village-trek.jpg" alt="Himalayan Mountain View" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 11 Days Nepal Tour with Ghandruk Village Trek?
- **Cultural Experience:** Explore the unique cultures of Kathmandu, Chitwan, Pokhara, and the Gurung traditions of Ghandruk village.
- **Scenic Beauty:** Trek through dense forests, valleys, and hills with panoramic views of the Himalayas including Annapurna South.
- **Adventure:** A thrilling trekking experience to Ghandruk village exploring rugged terrain and crossing suspension bridges.
- **Wildlife:** Observe tigers, rhinos, and elephants in their natural habitat with a thrilling jungle safari in Chitwan National Park.
- **Relaxation:** Unwind by the serene lakes and tranquil atmosphere of Pokhara after your trek.

### Best Seasons for the Tour
- **Spring (March to May):** Warm temperatures and blooming rhododendrons make the Ghandruk trek incredibly vibrant. The clear days are perfect for sightseeing across Kathmandu, Pokhara, and Chitwan.
- **Autumn (September to November):** Crisp air and clear skies provide the best visibility for mountain views. The festive atmosphere of Dashain and Tihar makes cultural exploration very engaging.`,
    highlights: [
      'Immersive 3-day trek through the scenic Annapurna foothills to Ghandruk Village',
      'Discover traditional Gurung culture and stunning views of Machhapuchhre (Fishtail)',
      'Exciting wildlife jungle safari adventures in Chitwan National Park',
      'Explore Pokhara’s natural beauty with a boat ride on the serene Phewa Lake',
      'Extensive cultural tours of Kathmandu Valley\'s iconic UNESCO World Heritage Sites'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic 5-6 hour drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara. Visit Bindabasini Temple, Davis Fall, Gupteshwor Mahadev Cave, and the Tibetan Refugee Camp. Enjoy a boat ride on Phewa Lake.' },
      { day: 'Day 5', title: 'Pokhara-Tolka [Altitude 1700/5578ft]', desc: 'Short drive to Phedi, then begin a 5-hour scenic trek to the mountain village of Tolka. Overnight in a lodge.' },
      { day: 'Day 6', title: 'Tolka–Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek from Tolka to the beautiful traditional Gurung village of Ghandruk (approx. 4 hours). Enjoy breathtaking views of Annapurna South and Machhapuchhre.' },
      { day: 'Day 7', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Trek from Ghandruk to Nayapul (5-6 hours), then drive back to Pokhara for a relaxing evening.' },
      { day: 'Day 8', title: 'Pokhara-Kathmandu', desc: 'Drive back to Kathmandu (approx. 6-7 hours) and relax at your hotel.' },
      { day: 'Day 9', title: 'Kathmandu', desc: 'Cultural tour of Kathmandu Valley: Visit Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square.' },
      { day: 'Day 10', title: 'Kathmandu', desc: 'Visit Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square. Farewell traditional Nepali dinner with a live cultural show.' },
      { day: 'Day 11', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag for trekking time',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '2 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 11 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-muktinath-11d': {
    quickInfo: [
      { label: 'Duration', value: '11 Days 10 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Welcome to our 11 Days Nepal Tour with Muktinath! Upon arrival at Tribhuvan International Airport in Kathmandu, our Destination Nepal Tours & Travels representative will greet you. The first day is free for relaxation or optional tours if you arrive early.

On Day 2, enjoy a scenic 5-6 hour drive from Kathmandu to Chitwan for a 2-night stay. Explore the fascinating Tharu Village, experience the Tharu Cultural Program, and choose between a thrilling Elephant Safari or Jeep Safari (depending on your resort location). You may also visit a Crocodile Breeding Center or Elephant Breeding Center.

Day 4 takes you to Bandipur Village, one of Nepal’s most charming towns, where you’ll experience Nepalese culture and scenic beauty. On Day 5, travel to Pokhara (a 2-3 hour drive) and explore Bindabasini Temple, Davis Fall, Gupteshwor Mahadev Cave, and the Tibetan Refugee Camp. Enjoy a serene boating experience on Phewa Lake and visit the Seti Gorge.

On Day 6, fly from Pokhara to Jomsom and drive to the sacred Muktinath Temple. After visiting Muktinath, return to Jomsom for an overnight stay. The next day, fly back to Pokhara and visit the International Mountain Museum.

On Day 8, drive back to Kathmandu (6-7 hours). For an extra fee, you can opt for a convenient 35-minute flight instead of driving. In Kathmandu, enjoy a tour of Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. On Day 10, visit Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square. End the evening with a Nepali cultural dinner at a local restaurant, celebrating the rich heritage of Nepal.

On the final day, depart with cherished memories of your Nepal Tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nepaltrekkinginhimalaya.com/images/articles/ophNq-muktinath.jpg" alt="Muktinath Temple Area" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nepalhiking.com/wp-content/uploads/2026/01/Muktinath-Darshan-Tour-and-Yatra.jpg" alt="Muktinath Yatra" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://www.nepaltrekhub.com/wp-content/uploads/2020/05/muktinath-temple-tour.jpg" alt="Sacred Muktinath Tour" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love this trip?
- **Cultural immersion:** Explore ancient temples in Kathmandu, learn about the Tharu community in Chitwan, discover Bandipur's well-preserved Newari architecture, and see the unique blend of Hindu and Buddhist cultures in Pokhara.
- **Natural beauty:** Enjoy the serene beauty of Phewa Lake in Pokhara, explore lush jungles tracking wildlife in Chitwan, and experience breathtaking Himalayan views during the flight to Jomsom.
- **Spiritual significance:** Make a pilgrimage to Muktinath, a profoundly sacred site for both Hindus and Buddhists seeking purification and blessings, along with the revered Pashupatinath in Kathmandu.

### Best Seasons for the Tour
- **Spring (March to May):** Pleasant weather and blooming rhododendrons make it ideal for sightseeing, cultural exploration, and safaris.
- **Autumn (September to November):** Clear skies provide excellent visibility for mountain views after the monsoon, and festive seasons like Dashain add unique cultural depth.`,
    highlights: [
      'Scenic flight over the Himalayas from Pokhara to Jomsom',
      'Sacred pilgrimage to Muktinath Temple, revered by Hindus and Buddhists',
      'Explore Bandipur Village, renowned for its beautifully preserved Newari culture',
      'Exciting wildlife safaris and Tharu cultural programs in Chitwan National Park',
      'Extensive tours of Kathmandu Valley’s UNESCO World Heritage Sites'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic 5-6 hour drive to Chitwan National Park for a 2-night stay. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Bandipur [Altitude 1030m/3380ft]', desc: 'Travel to Bandipur, a charming Newari town offering incredible mountain views and well-preserved cultural heritage.' },
      { day: 'Day 5', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara (2-3 hours). Visit Bindabasini Temple, Davis Fall, Gupteshwor Mahadev Cave, Tibetan Refugee Camp, and enjoy boating on Phewa Lake.' },
      { day: 'Day 6', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft)', desc: 'Fly to Jomsom and drive to the sacred Muktinath Temple for Darshan, then return to Jomsom for an overnight stay.' },
      { day: 'Day 7', title: 'Jomsom-Pokhara', desc: 'Fly back to Pokhara. Visit the International Mountain Museum.' },
      { day: 'Day 8', title: 'Pokhara-Kathmandu', desc: 'Drive back to Kathmandu (approx. 6-7 hours) and relax at your hotel.' },
      { day: 'Day 9', title: 'Kathmandu', desc: 'Cultural tour of Kathmandu Valley: Visit Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square.' },
      { day: 'Day 10', title: 'Kathmandu', desc: 'Visit Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square. Farewell traditional Nepali dinner with a live cultural show.' },
      { day: 'Day 11', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '1 Night The Old Inn or similar in Bandipur',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Om\'s Home in Jomsom'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 11 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-lumbini-11d': {
    quickInfo: [
      { label: 'Duration', value: '11 Days 10 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/7135ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `11 Days Nepal Tour; Kathmandu, Chitwan, Lumbini, Pokhara, Bandipur & Nagarkot Tour is the perfect way to explore Nepal's rich heritage, culture, and natural beauty. Begin your journey in Kathmandu, where you’ll be welcomed by a Destination Nepal Tours & Travels representative at Tribhuvan International Airport. The first day offers leisure time to rest or explore if you arrive early.

The adventure starts as you drive to Chitwan for a two-night stay. Experience the region's wildlife through activities like elephant safari or jeep safari, depending on your resort's location. Visit the Tharu village, enjoy a Tharu cultural program, and explore the Elephant breeding center or Crocodile breeding center. Don't miss the serene canoe ride in the Rapti River, perfect for wildlife spotting and enjoying the peaceful atmosphere.

After an immersive wildlife experience, the tour continues with a scenic drive to Lumbini, the sacred birthplace of Lord Buddha. This spiritual visit is an opportunity to explore ancient monasteries and reflect in a place of deep historical significance. The next day, set out for Pokhara, known for its stunning landscapes and adventure opportunities. Visit Sarangkot at sunrise to witness panoramic Himalaya views. Your Pokhara city tour includes the Bindabasini Temple, Seti Gorge, Gupteshwor Mahadev Cave, and the Tibetan Refugee Camp. Enjoy a boat ride on Phewa Lake to reach the beautiful Tal Barahi Temple, and visit the serene World Peace Stupa and Pumdikot Shiva Temple in the evening.

After two memorable nights in Pokhara, drive to the charming Bandipur village, where history and nature come together. Wander through its preserved streets and take in the views of rolling hills and distant mountains.

Continue your journey to Nagarkot, renowned for its mesmerizing sunrise views over the Himalaya ranges. The day in Bhaktapur will allow you to explore the historic Bhaktapur Durbar Square, followed by visits to the iconic Boudhanath Stupa and the sacred Pashupatinath Temple. The final day in Kathmandu includes visits to Patan Durbar Square, Swayambhunath Stupa (also known as the Monkey Temple), and Kathmandu Durbar Square, showcasing centuries-old art and architecture.

Conclude your trip with a special Nepali dinner accompanied by a cultural program to immerse in local traditions. Depart the next day with unforgettable memories of your Nepal tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1611892370612-0ac8e4a4507a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHVtYmluaXxlbnwwfHwwfHx8MA%3D%3D" alt="Sacred Lumbini Exploration" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1578235107258-f6e405a4ffc0?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Heritage Sites" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://plus.unsplash.com/premium_photo-1697730321309-0389da6f762b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 11 Days Nepal Tour with Lumbini ?
- **Cultural Exploration:** Experience authentic Nepalese culture through traditional villages, ancient temples, local customs, and Tharu cultural programs.
- **Wildlife Encounters:** Discover Nepal's wildlife in Chitwan National Park spotting endangered species like one-horned rhinoceros and Bengal tigers.
- **Historical Sites:** Explore extensive UNESCO World Heritage Sites including Kathmandu Durbar Square, Bhaktapur Durbar Square, and Patan Durbar Square.
- **Natural Landscapes:** Witness breathtaking Himalayan views from Nagarkot and Sarangkot sunrise viewpoints, and experience the beauty of Phewa Lake in Pokhara.
- **Spiritual Experiences:** Visit sacred Buddhist sites like Lumbini (Buddha's birthplace) and Boudhanath Stupa, along with holy Hindu temples.

### Best Seasons for the Tour
- **Spring (March to May):** Nepal is vibrant with blooming flowers. Enjoy pleasant temperatures ideal for wildlife safaris in Chitwan, cultural exploration in Lumbini, and outdoor activities in Pokhara.
- **Autumn (September to November):** Considered the peak tourist season due to its stable weather, stunning visibility, and comfortable temperatures. Clear skies offer breathtaking views of the Himalayan ranges from Sarangkot and Nagarkot.`,
    highlights: [
      'Extensive spiritual visit to Lumbini, the sacred birthplace of Lord Buddha',
      'Discover Nepal\'s wildlife in Chitwan National Park through an exciting jungle safari',
      'Witness breathtaking Himalayan views from Sarangkot and Nagarkot sunrise viewpoints',
      'Explore the charming traditional Newari hillside village of Bandipur',
      'Tour iconic UNESCO World Heritage Sites across the Kathmandu Valley'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your immersive wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride on the Rapti River, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Explore ancient monasteries and reflect in a place of deep historical and spiritual significance.' },
      { day: 'Day 5', title: 'Lumbini-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, known for its stunning landscapes and serene lakes.' },
      { day: 'Day 6', title: 'Pokhara', desc: 'Sarangkot sunrise view. City tour including Bindabasini Temple, Seti Gorge, Gupteshwor Mahadev Cave, Tibetan Refugee Camp, boating on Phewa Lake, World Peace Stupa, and Pumdikot Shiva Temple.' },
      { day: 'Day 7', title: 'Pokhara-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming Newari village of Bandipur. Wander through preserved streets and enjoy views of rolling hills.' },
      { day: 'Day 8', title: 'Bandipur-Nagarkot [2175m/7135ft]', desc: 'Drive to Nagarkot, renowned for its mesmerizing sunset and sunrise views over the Himalayan ranges.' },
      { day: 'Day 9', title: 'Nagarkot-Kathmandu', desc: 'Explore historic Bhaktapur Durbar Square, Boudhanath Stupa, and the sacred Pashupatinath Temple on the way back to Kathmandu.' },
      { day: 'Day 10', title: 'Kathmandu', desc: 'Visit Patan Durbar Square, Swayambhunath Stupa (Monkey Temple), and Kathmandu Durbar Square. Farewell traditional Nepali dinner with cultural program.' },
      { day: 'Day 11', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '1 Night The Old Inn or similar in Bandipur'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 11 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-poon-hill-trek-12d': {
    quickInfo: [
      { label: 'Duration', value: '12 Days 11 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m/10531ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `12 Days Nepal Tour with Poon Hill Trek is a perfect blend of cultural exploration, wildlife adventure, and scenic trekking. This exciting 12-day Nepal itinerary starts with a warm welcome at Tribhuvan International Airport. The tour begins with a drive to Chitwan, where you will experience Chitwan jungle safari, Tharu village tour, and an enchanting Tharu cultural program. Enjoy activities like an Elephant safari or Jeep safari, canoe ride in the Rapti River, and visits to the Crocodile Breeding Centre or Elephant Breeding Centre, along with bird watching.

After Chitwan, the journey continues to Pokhara city tour—a beautiful city with attractions like Phewa Lake boating, Davis Fall, Gupteshwor Mahadev Cave, Seti Gorge, and the Tibetan Refugee Camp. The highlight of this Nepal tour package is the trek to the Ghorepani Poon Hill trek, starting from Nayapul. Trek through lush forests, villages, and hills to Tikhedhunga, Ghorepani, Tadapani, and Ghandruk village trek. Witness the majestic Poon Hill sunrise trek for breathtaking Himalayan views.

The tour concludes with visit Boudhanath Stupa, Pashupatinath Temple, Swoyambhunath stupa & Kathmandu durbar square and where you can enjoy a complimentary Nepali cultural dinner. This Nepal trekking and tour package combines adventure, nature, and cultural experiences, making it the best Nepal tour and trek for those seeking a memorable holiday in Nepal.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1589800463007-3be49fe18b92?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Poon Hill Sunrise View" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1595873371912-27a70363bcf2?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trekking in the Himalayas" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Himalayan Villages" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love 12 Days Nepal Tour with Poon Hill Trek?
- **Perfect Combination:** Experience the rich culture of Tharu villages, the thrill of Chitwan jungle safaris, and stunning Himalayan views on the Ghorepani Poon Hill trek.
- **Breathtaking Sunrise at Poon Hill:** Witness the magical sunrise over the Annapurna and Dhaulagiri ranges.
- **Explore Beautiful Pokhara:** Enjoy a peaceful Pokhara city tour with attractions like Phewa Lake boating, Davis Fall, and Gupteshwor Mahadev Cave.
- **Wildlife Adventure in Chitwan:** Spot exotic animals during an Elephant or Jeep safari, and enjoy bird watching and canoe rides.
- **Comfort and Hospitality:** From well-planned itineraries to a complimentary Nepali cultural dinner, this tour ensures a comfortable and memorable experience.

### Best Seasons for the Tour
- **Spring (March to May):** Pleasant temperatures and blooming rhododendrons make the Ghorepani Poon Hill trek colorful and vibrant. One of the most popular seasons.
- **Autumn (September to November):** Perfect trekking conditions with crystal-clear skies and panoramic views of the Annapurna ranges during the Poon Hill sunrise trek.
- **Winter (December to February):** Cool days and colder nights offer snow-capped peaks and peaceful trails for those who enjoy a quieter experience.`,
    highlights: [
      'Witness the breathtaking sunrise over the Annapurna and Dhaulagiri ranges from Poon Hill',
      'Embark on an immersive jungle safari adventure in Chitwan National Park',
      'Discover the rich cultural heritage of Kathmandu\'s UNESCO World Heritage Sites',
      'Explore Pokhara’s natural wonders including Phewa Lake and Gupteshwor Mahadev Cave',
      'Trek through lush rhododendron forests and the traditional Gurung village of Ghandruk'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara. City tour including Phewa Lake boating, Davis Fall, Gupteshwor Mahadev Cave, Seti Gorge, and Tibetan Refugee Camp.' },
      { day: 'Day 5', title: 'Pokhara-Thikedhunga[Altitude 1480m/4855ft]', desc: 'Drive to Nayapul and begin the trek. Hike through forests and villages to reach Tikhedhunga for the night.' },
      { day: 'Day 6', title: 'Thikedhunga-Ghorepani[Altitude 2874m/9430ft]', desc: 'Trek up the famous stone steps to Ulleri and continue through rhododendron forests to Ghorepani.' },
      { day: 'Day 7', title: 'Ghorepani-Poonhill [Altitude 3210m/10531ft]-Tadapani[Altitude 2630m/8628ft]', desc: 'Early morning hike to Poon Hill for a majestic sunrise view over the Himalayas. Trek down to Ghorepani and continue to Tadapani.' },
      { day: 'Day 8', title: 'Tadapani-Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek from Tadapani down to the beautiful traditional Gurung village of Ghandruk.' },
      { day: 'Day 9', title: 'Ghandruk-Nayapul', desc: 'Trek down from Ghandruk to Nayapul, then drive back to Pokhara.' },
      { day: 'Day 10', title: 'Pokhara-Kathmandu', desc: 'Drive back to Kathmandu and relax at your hotel.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Cultural tour of Kathmandu Valley: Visit Boudhanath Stupa, Pashupatinath Temple, Swayambhunath Stupa & Kathmandu Durbar Square. Farewell traditional Nepali dinner.' },
      { day: 'Day 12', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '4 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 12 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-ghandruk-trek-12d': {
    quickInfo: [
      { label: 'Duration', value: '12 Days 11 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1940m/6365ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `12 Days Nepal Tour with Ghandruk Trek is the perfect blend of cultural exploration, wildlife adventure, and scenic trekking in Nepal. This tour begins with a warm welcome at Tribhuvan International Airport. After a relaxing day, the journey starts with a drive to Chitwan, where you will enjoy a Chitwan jungle safari, Tharu village tour, canoe rides, and visits to the Crocodile Breeding Centre. This unique wildlife experience is perfect for nature lovers.

From Chitwan, you will drive to the beautiful Pokhara city tour, where you can explore attractions like Phewa Lake boating, Davis Fall, Gupteshwor Mahadev Cave, Tibetan Refugee Camp, and Seti Gorge Pokhara. After Pokhara, the real adventure begins with an easy trek to Tolka to Ghandruk trek, ideal for beginners. Ghandruk, a charming Gurung village, offers stunning Himalayan views and a peaceful trekking experience. The trek concludes with a drive back to Pokhara from Ghandruk to Nayapul trek.

The tour continues with a scenic drive back to Kathmandu, where you will explore famous cultural landmarks like Boudhanath Stupa, Pashupatinath Temple, Bhaktapur Durbar Square, Patan Durbar Square, and Swoyambhunath Stupa. A visit to Chandragiri Hills by cable car offers panoramic views of the Himalayas and the Kathmandu Valley.

This 12 Days Nepal Tour with Ghandruk Trek is a perfect choice for those looking for an easy trekking experience combined with wildlife, nature, and cultural exploration. Complete your trip with a complimentary Nepali cultural dinner and create unforgettable memories. Whether you’re a beginner or a culture enthusiast, this easy Nepal trekking tour will leave you amazed by Nepal’s beauty and diversity.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1704180724080-c923aa1ee129?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chitwan National Park Safari" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1545309451-2369945f85a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Ghandruk Village Trekking" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1746733938602-4b1feb7d0bd1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Sightseeing" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love This 12 Days Nepal Tour with Ghandruk Trek?
- **Perfect for Beginners:** The Ghandruk trek offers an easy and scenic hiking experience, ideal for beginners and families.
- **Blend of Nature, Wildlife, and Culture:** Explore diverse experiences including the Chitwan jungle safari, Pokhara city tour, and Kathmandu's heritage.
- **Breathtaking Himalayan Views:** The trek to Ghandruk village offers stunning views of Annapurna, Machhapuchhre (Fishtail), and Hiunchuli peaks.
- **Rich Cultural Experiences:** Witness the vibrant culture of the Tharu community, visit historical sites like Pashupatinath Temple, and enjoy a traditional Nepali cultural dinner.
- **Scenic Drives and Boating:** Enjoy beautiful drives alongside rivers and hills, and relax with a peaceful Phewa Lake boating experience in Pokhara.

### Best Seasons for the Tour
- **Spring (March to May):** Mild, pleasant weather with blooming rhododendrons and clear skies for breathtaking Himalayan views.
- **Autumn (September to November):** The best time for trekking with clear skies, mild temperatures, and crystal-clear views of the peaks.`,
    highlights: [
      'Embark on an easy, scenic trek through the beautiful Gurung village of Ghandruk',
      'Experience thrilling wildlife safaris in the jungles of Chitwan National Park',
      'Enjoy panoramic Himalayan views from Chandragiri Hills via an exciting cable car ride',
      'Explore Pokhara’s natural beauty with boating on Phewa Lake and visiting Davis Fall',
      'Discover the rich cultural heritage of Kathmandu\'s iconic UNESCO World Heritage Sites'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara. City tour including Phewa Lake boating, Davis Fall, Gupteshwor Mahadev Cave, Seti Gorge, and Tibetan Refugee Camp.' },
      { day: 'Day 5', title: 'Pokhara-Tolka [Altitude 1700/5578ft]', desc: 'Drive to Phedi and begin the trek. Hike to the scenic village of Tolka for the night.' },
      { day: 'Day 6', title: 'Tolka–Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek from Tolka to the beautiful traditional Gurung village of Ghandruk. Enjoy breathtaking views of the Annapurna range.' },
      { day: 'Day 7', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Trek down from Ghandruk to Nayapul, then drive back to Pokhara for a relaxing evening.' },
      { day: 'Day 8', title: 'Pokhara-Kathmandu', desc: 'Drive back to Kathmandu and relax at your hotel.' },
      { day: 'Day 9', title: 'Kathmandu', desc: 'Cultural tour: Visit Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square.' },
      { day: 'Day 10', title: 'Kathmandu', desc: 'Visit Patan Durbar Square and Swayambhunath Stupa.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Visit Chandragiri Hills by cable car for panoramic views. Farewell traditional Nepali cultural dinner.' },
      { day: 'Day 12', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '3 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights at best available lodge during the Trekking',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 12 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-muktinath-12d': {
    quickInfo: [
      { label: 'Duration', value: '12 Days 11 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Domestic flight & Private vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 12 Days Nepal Tour with Muktinath is a perfect blend of adventure, culture, and natural beauty. This comprehensive itinerary is designed to give you an unforgettable experience, from exploring the tranquil lakes of Pokhara to the spiritual journey to Muktinath, a sacred pilgrimage site. Whether you are seeking cultural immersion, breathtaking landscapes, or thrilling wildlife encounters, this tour has it all.

Your journey begins with a warm welcome at Tribhuwan International Airport in Kathmandu. After a free day to relax or explore optional tours, the adventure starts with a scenic drive to Chitwan. Here, you will enjoy activities like the Tharu cultural program, Elephant Safari or Jeep Safari, Canoe ride, and Bird Watching in the lush jungles of Chitwan National Park.

Next, you’ll visit the charming hilltop village of Bandipur, where you can immerse yourself in traditional Nepali culture and admire stunning mountain views. From Bandipur, we head to Pokhara, the picturesque lake city. Explore the famous Davis Falls, Bindabasini Temple, Seti Gorge, and Phewa Lake with a boat ride.

The highlight of the tour is a scenic flight to Jomsom, followed by a visit to Muktinath, Kagbeni, and the serene Dhumba Lake. Muktinath is a revered pilgrimage site for both Hindus and Buddhists, offering spiritual serenity amidst the majestic Himalayas.

The tour concludes with sightseeing in Kathmandu, covering iconic sites like Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. A memorable Nepali cultural dinner and cable car ride to Chandragiri Hills add the perfect finishing touch to this incredible journey.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1540961286473-8ad1368dc1bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sacred Muktinath Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1586614024747-d5e88bc4b02e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Flight to Jomsom" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1623356788377-3313cc497e4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bandipur Village Culture" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 12 Days Nepal Tour with Muktinath ?
- **Explore Nepal’s Natural Beauty:** From the lush jungles of Chitwan to the serene Phewa Lake in Pokhara and the breathtaking landscapes of the Annapurna region.
- **Spiritual Journey to Muktinath:** Visit the sacred destination for Hindus and Buddhists, known for its 108 water spouts and eternal flame.
- **Adventure and Wildlife:** Experience thrilling activities in Chitwan, including an Elephant/Jeep Safari and canoe ride in the Rapti River.
- **Cultural Immersion:** Visit Bandipur, enjoy the Tharu cultural program in Chitwan, and explore Kathmandu’s UNESCO World Heritage Sites.
- **Personalized and Relaxing Experiences:** Boating on Phewa Lake, a cultural dinner, and optional flights make the journey customizable and convenient.

### Best Seasons for the Tour
- **Spring (March to May):** Stable and pleasant weather with clear skies and blooming flowers. A peak tourist season ideal for exploring without weather disruptions.
- **Autumn (September to November):** The busiest season with clear skies and perfect travel conditions. Flights to Jomsom operate smoothly.
- **Summer/Monsoon (June to August):** Lush scenery but frequent rainfall and flight delays. Alternate destinations may be needed.
- **Winter (December to February):** Cold temperatures. Jomsom Airport often closes due to snow, limiting access to Muktinath.`,
    highlights: [
      'Embark on a sacred pilgrimage to the revered Muktinath Temple in the high Himalayas',
      'Enjoy a thrilling scenic domestic flight between Pokhara and the mountain town of Jomsom',
      'Explore the vibrant wildlife and Tharu culture in Chitwan National Park',
      'Visit the beautifully preserved traditional hilltop village of Bandipur',
      'Discover the rich historical and cultural heritage of the Kathmandu Valley'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming hilltop village of Bandipur. Immerse yourself in traditional Nepali culture and admire mountain views.' },
      { day: 'Day 5', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, the picturesque lake city. Explore Davis Falls, Bindabasini Temple, Seti Gorge, and enjoy boating on Phewa Lake.' },
      { day: 'Day 6', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft]', desc: 'Take a scenic flight to Jomsom. Visit the sacred pilgrimage site of Muktinath, Kagbeni, and the serene Dhumba Lake.' },
      { day: 'Day 7', title: 'Jomsom-Pokhara', desc: 'Fly back to Pokhara from Jomsom and relax by the lakeside.' },
      { day: 'Day 8', title: 'Pokhara-Kathmandu', desc: 'Drive back to Kathmandu and relax at your hotel.' },
      { day: 'Day 9', title: 'Kathmandu', desc: 'Cultural tour: Visit Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square.' },
      { day: 'Day 10', title: 'Kathmandu', desc: 'Visit Patan Durbar Square and Swayambhunath Stupa.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Visit Chandragiri Hills by cable car for panoramic views. Farewell traditional Nepali cultural dinner.' },
      { day: 'Day 12', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'Chandragiri Hills cable car ticket',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '5 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Om\'s Home in Jomsom',
      '1 Night Ghaun Ghar or similar in Bandipur'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 12 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nepal-tour-lumbini-12d': {
    quickInfo: [
      { label: 'Duration', value: '12 Days 11 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/4136ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 12 Days Nepal Tour with Lumbini is a perfect blend of culture, spirituality, wildlife, and adventure, offering an unforgettable experience across Nepal's most iconic destinations.

Your journey begins with a warm welcome at Tribhuvan International Airport. The next day, drive through the scenic hills and riversides of Trishuli and Narayani River to reach Chitwan National Park. Spend two nights in Chitwan enjoying activities such as elephant safari, jeep safari, Tharu village tour, canoe rides on the Rapti River, and visits to the Crocodile Breeding Centre or Elephant Breeding Centre.

From Chitwan, head to Lumbini, the birthplace of Lord Buddha. Explore the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide. Next, drive to Pokhara, where you’ll witness the breathtaking sunrise at Sarangkot, enjoy a boat ride on Phewa Lake, and visit attractions like Davis Fall, Gupteshwor Mahadev Cave, and the World Peace Pagoda. Adventure enthusiasts can opt for paragliding, ziplining, or a hot air balloon ride.

Continue your journey to Bandipur, a charming hillside village showcasing Newari culture and Himalayan views. From Bandipur, proceed to Nagarkot, renowned for its mesmerizing Himalayan sunrise view.

On the final leg, visit cultural highlights in Kathmandu, including Bhaktapur Durbar Square, Patan Durbar Square, Boudhanath Stupa, Pashupatinath Temple, Swayambhunath Stupa, and Kathmandu Durbar Square. Conclude your journey with a traditional Nepali dinner and cultural program before departure.

The 12 Days Nepal Tour with Lumbini offers an immersive experience, covering Nepal’s diverse heritage, natural beauty, and spiritual sites, leaving you with unforgettable memories.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1616166831783-f239fea49bdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sacred Maya Devi Temple" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1703605196342-f7d695e43abe?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Phewa Lake in Pokhara" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1611325695972-d22894e3f8d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Heritage Sites in Kathmandu" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 12 Days Nepal Tour with Lumbini ?
- **A Perfect Blend:** Combines Nepal’s rich cultural heritage, breathtaking natural landscapes, and spiritual significance.
- **Wildlife Adventure:** Explore the wilderness of Chitwan National Park with elephant/jeep safaris and canoe rides.
- **Spiritual Tranquility:** Walk in the sacred footsteps of Lord Buddha at Lumbini, a UNESCO World Heritage Site.
- **Scenic Beauty:** Enjoy serene lakes, Sarangkot sunrises in Pokhara, and panoramic Himalayan vistas from Nagarkot.
- **Cultural Immersion:** Immerse yourself in the rich history of Nepal across Kathmandu's UNESCO sites, Bandipur, and Tharu culture.

### Best Seasons for the Tour
- **Spring (March-May):** Pleasant weather and blooming rhododendrons. The Himalayan views from Sarangkot and Nagarkot are crystal clear.
- **Autumn (September-November):** The most popular season with clear skies and stable weather. Renowned for breathtaking views of the Himalayas.
- **Summer/Monsoon (June-August):** Transforms Nepal into a vibrant green paradise. Less crowded, making cultural and spiritual sites more peaceful.
- **Winter (December-February):** Cool and dry with clear skies. Winter sees fewer tourists, making it perfect for a quiet, less crowded experience.`,
    highlights: [
      'Experience spiritual tranquility at Lumbini, the sacred birthplace of Lord Buddha',
      'Discover exotic wildlife on a thrilling jungle safari in Chitwan National Park',
      'Witness stunning panoramic sunrises over the Himalayas from Nagarkot and Sarangkot',
      'Relax in the picturesque lakeside city of Pokhara and enjoy boating on Phewa Lake',
      'Explore Nepal’s rich heritage at UNESCO World Heritage Sites in the Kathmandu Valley'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your immersive wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, known for its stunning landscapes and serene lakes.' },
      { day: 'Day 6', title: 'Pokhara', desc: 'Enjoy a beautiful sunrise at Sarangkot, followed by a city tour including Davis Fall, Gupteshwor Mahadev Cave, World Peace Pagoda, and Phewa Lake boating.' },
      { day: 'Day 7', title: 'Pokhara', desc: 'Free day in Pokhara. You can relax by the lake or opt for adventure activities like paragliding, ziplining, or a hot air balloon ride.' },
      { day: 'Day 8', title: 'Pokhara-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming Newari village of Bandipur. Explore its preserved streets and enjoy views of rolling hills.' },
      { day: 'Day 9', title: 'Bandipur-Nagarkot [2175m/4136ft]', desc: 'Drive to Nagarkot, renowned for its mesmerizing sunset and sunrise views over the Himalayan ranges.' },
      { day: 'Day 10', title: 'Nagarkot-Kathmandu', desc: 'Watch the sunrise from Nagarkot before driving back to Kathmandu. Relax or explore the city.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Cultural tour: Visit Bhaktapur Durbar Square, Patan Durbar Square, Boudhanath Stupa, Pashupatinath Temple, Swayambhunath Stupa, and Kathmandu Durbar Square. Farewell traditional Nepali cultural dinner.' },
      { day: 'Day 12', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '3 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '1 Night The Old Inn or similar in Bandipur'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 12 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'explore-nepal-tour-13d': {
    quickInfo: [
      { label: 'Duration', value: '13 Days 12 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle & Domestic flight', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 13 Days Explore Nepal Tour offers a perfect combination of culture, spirituality, and scenic beauty, making it an unforgettable experience for every traveler. This tour covers Nepal’s most iconic destinations, blending nature, heritage, and adventure.

Your journey begins with a warm welcome at Tribhuwan International Airport in Kathmandu. After a free day or an optional tour, you will set out on a scenic drive through the lush hills and riverside landscapes of Trishuli and Narayani to reach Chitwan. Here, enjoy two nights of thrilling activities, including the Tharu cultural program, Elephant Safari or Jeep Safari, Canoe ride, and Bird Watching at Chitwan National Park.

Next, travel to Lumbini, the birthplace of Lord Buddha, for a guided tour of this sacred UNESCO World Heritage Site. From Lumbini, head to the serene city of Pokhara. A short flight takes you to Jomsom, followed by a visit to Muktinath, Kagbeni, and Dhumba Lake, offering both spiritual and scenic experiences.

Returning to Pokhara, explore attractions like Bindabasini Temple, Davis Falls, Gupteshwor Cave, Seti Gorge, and Phewa Lake with a relaxing boat ride. Continue to Bandipur village, a charming hilltop destination with cultural richness and breathtaking views.

The tour concludes in Kathmandu with visits to iconic sites, including Bhaktapur Durbar Square, Boudhanath Stupa, Pashupatinath Temple, Patan Durbar Square, and Swayambhunath Stupa. Explore the cultural gems of Dakshinkali, Chobhar, Pharping, and Kirtipur. Celebrate your journey with a traditional Nepali dinner and cultural show before departing with cherished memories.

The 13 Days Explore Nepal Tour is the ultimate way to experience Nepal’s diverse culture, heritage, and natural beauty.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1513614835783-51537729c8ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sacred Heritage Sites in Kathmandu" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1580424917967-a8867a6e676e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Muktinath Temple Landscape" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Experiences in Nepal" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 13 Days Explore Nepal Tour ?
- **Diverse Cultural Experiences:** Explore the vibrant traditions of Nepal through visits to historical and spiritual sites like Bhaktapur Durbar Square, Boudhanath Stupa, Pashupatinath Temple, and the ancient town of Bandipur.
- **Spiritual Serenity at Muktinath:** Visit this revered pilgrimage site for Hindus and Buddhists, known for its 108 water spouts and eternal flame.
- **Nature and Wildlife Adventures:** Enjoy thrilling activities in Chitwan National Park, including a Jeep Safari, canoe ride, and birdwatching.
- **Stunning Landscapes and Scenic Drives:** From the tranquil lakes of Pokhara to the breathtaking Annapurna and Dhaulagiri ranges.
- **Tailored Comfort and Authentic Experiences:** Blends comfort with authenticity. Enjoy boating at Phewa Lake and end the trip with a traditional Nepali dinner.

### Best Seasons for the Tour
- **Spring (March to May):** Stable and pleasant weather with blooming flowers. A peak tourist season ideal for exploring cultural and natural sites.
- **Autumn (September to November):** The busiest season due to favorable conditions and beautiful vistas. Flights to Jomsom operate smoothly.
- **Summer/Monsoon (June to August):** Frequent rainfall. Roads may be slippery, and flights to Jomsom are often delayed. Not recommended if you have time in another season.
- **Winter (December to February):** Cold temperatures. Jomsom Airport often closes due to snow, limiting access to Muktinath.`,
    highlights: [
      'Experience spiritual serenity on a sacred pilgrimage to the Muktinath Temple in Jomsom',
      'Discover the birthplace of Lord Buddha with a guided tour of Lumbini',
      'Dive into vibrant wildlife and Tharu culture in Chitwan National Park',
      'Explore the ancient Newari hilltop village of Bandipur',
      'Enjoy a scenic domestic flight capturing breathtaking views of the Dhaulagiri and Annapurna ranges'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Pokhara[altitude 830m/2723ft]', desc: 'Drive to the picturesque lake city of Pokhara. Enjoy boating on Phewa Lake.' },
      { day: 'Day 6', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft]', desc: 'Take a short, scenic flight to Jomsom. Visit the sacred pilgrimage site of Muktinath, Kagbeni, and Dhumba Lake.' },
      { day: 'Day 7', title: 'Jomsom-Pokhara', desc: 'Fly back to Pokhara from Jomsom. Explore attractions like Bindabasini Temple, Davis Falls, Gupteshwor Cave, and Seti Gorge.' },
      { day: 'Day 8', title: 'Pokhara-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming hilltop village of Bandipur, known for its cultural richness and breathtaking views.' },
      { day: 'Day 9', title: 'Bandipur-Kathmandu', desc: 'Drive back to Kathmandu and relax at your hotel.' },
      { day: 'Day 10', title: 'Kathmandu', desc: 'Explore cultural gems around the Kathmandu Valley, including Dakshinkali, Chobhar, Pharping, and Kirtipur.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Visit iconic sites like Bhaktapur Durbar Square, Boudhanath Stupa, Pashupatinath Temple, Patan Durbar Square, and Swayambhunath Stupa.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Free day in Kathmandu. Celebrate your journey with a traditional Nepali dinner and cultural show.' },
      { day: 'Day 13', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara & Lumbini city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '5 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '4 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan (2 + 2 nights per itinerary spec)',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Om\'s Home in Jomsom',
      '1 Night Buddha Maya Garden or similar in Lumbini'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 13 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'explore-nepal-tour-poon-hill-trek-13d': {
    quickInfo: [
      { label: 'Duration', value: '13 Days 12 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m/10531ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 13 Days Explore Nepal Tour with Poon Hill Trek is a perfect blend of cultural exploration, natural beauty, and trekking adventure. This tour takes you through Nepal’s iconic destinations, offering diverse experiences for every traveler.

Your journey begins with a warm welcome at Tribhuwan International Airport in Kathmandu. After a free day or optional sightseeing, drive through scenic hills and riversides to Chitwan. Spend two nights enjoying thrilling activities such as Elephant Safari, Canoe Ride, Tharu Cultural Program, and birdwatching at Chitwan National Park.

Next, visit Lumbini, the birthplace of Lord Buddha, for a guided spiritual experience. From Lumbini, head to Pokhara and explore popular attractions like Bindabasini Temple, Davis Falls, Gupteshwor Cave, Tibetan Refugee Camp, and Seti Gorge.

Begin the trekking adventure with a drive to Nayapul, followed by a trek to Tikhedhunga. Trek to Ghorepani the next day, and experience a magical sunrise over the Annapurna and Dhaulagiri ranges from Poon Hill. Continue trekking through Tadapani and Ghandruk, offering stunning mountain views and charming villages. Return to Nayapul and drive back to Pokhara.

Conclude your journey with a scenic drive or optional flight to Kathmandu. Visit UNESCO World Heritage Sites such as Boudhanath Stupa, Pashupatinath Temple, Swayambhunath Stupa, and Kathmandu Durbar Square. End the tour with a traditional Nepali dinner and cultural show, creating lasting memories.

The 13 Days Explore Nepal Tour with Poon Hill Trek is ideal for those seeking a mix of cultural, spiritual, and trekking experiences. It offers an unforgettable journey through Nepal’s breathtaking landscapes and rich heritage.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1725009562005-adba89f6951f?q=80&w=1102&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trekking in the Annapurna Region" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1622723371392-baef50ba829c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Sunrises from Poon Hill" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1653038035856-abaf464bae6b?q=80&w=2125&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Views of Phewa Lake" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why People Love the 13 Days Explore Nepal Tour with Poon Hill Trek ?
- **Stunning Sunrise at Poon Hill:** Witness the golden rays of the sun illuminate the Annapurna and Dhaulagiri ranges.
- **A Perfect Mix of Adventure and Culture:** Offers a balanced combination of trekking through scenic trails and exploring Nepal’s rich cultural heritage.
- **Immersion in Local Life:** Walk through charming villages like Ghandruk, interact with locals, and experience the unique mountain culture.
- **Thrilling Wildlife Encounters:** Spot diverse wildlife in Chitwan National Park through Jeep Safaris and Canoe Rides.
- **Spiritual and Historical Exploration:** Visit sacred sites like Lumbini and iconic landmarks in Kathmandu, such as Pashupatinath Temple and Boudhanath Stupa.

### Best Seasons for the Tour
- **Spring (March to May):** Pleasant and mild. Rhododendron flowers bloom along the trails, creating vibrant landscapes. Clear skies provide stunning Himalayan views.
- **Autumn (September to November):** Ideal trekking conditions with clear, sunny days. Spectacularly clear skies reveal panoramic views during the Poon Hill sunrise trek.
- **Summer/Monsoon (June to August):** Lush green landscapes. Rain may obscure mountain views, but trails are quieter and forests rejuvenated.
- **Winter (December to February):** Chilly nights in higher altitudes. A great time for solitude and the beauty of snow-draped mountains.`,
    highlights: [
      'Trek to Poon Hill and witness a spectacular golden sunrise over the Annapurna and Dhaulagiri ranges',
      'Discover Nepal’s rich history at UNESCO World Heritage sites in Kathmandu and Lumbini',
      'Explore the vibrant wildlife and Tharu culture in Chitwan National Park',
      'Immerse yourself in traditional mountain village life in Ghorepani and Ghandruk',
      'Relax in the picturesque lakeside city of Pokhara and enjoy its natural wonders'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your immersive wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, known for its stunning landscapes and serene lakes. Enjoy boating on Phewa Lake.' },
      { day: 'Day 6', title: 'Pokhara-Thikedhunga[Altitude 1480m/4855ft]', desc: 'Drive to Nayapul and begin your trek to Tikhedhunga.' },
      { day: 'Day 7', title: 'Thikedhunga-Ghorepani[Altitude 2874m/9430ft]', desc: 'Trek up to Ghorepani. Rest and prepare for the sunrise hike tomorrow.' },
      { day: 'Day 8', title: 'Ghorepani-Poonhill [Altitude 3210m/10531ft]-Tadapani[Altitude 2630m/8628ft]', desc: 'Early morning hike to Poon Hill for a magical sunrise over the Annapurna and Dhaulagiri ranges. Trek onward to Tadapani.' },
      { day: 'Day 9', title: 'Tadapani-Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek to Ghandruk. Enjoy the traditional culture and stunning mountain views.' },
      { day: 'Day 10', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Trek back to Nayapul and drive to Pokhara to rest.' },
      { day: 'Day 11', title: 'Pokhara-Kathmandu', desc: 'Scenic drive back to Kathmandu. Relax or explore the city.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Cultural tour of Kathmandu: Visit Boudhanath Stupa, Pashupatinath Temple, Swayambhunath Stupa, and Kathmandu Durbar Square. Farewell Nepali dinner and cultural show.' },
      { day: 'Day 13', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Pokhara city tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '4 Nights at best available lodge during the Trekking',
      '1 Night Buddha Maya Garden or similar in Lumbini'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 13 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-13d': {
    quickInfo: [
      { label: 'Duration', value: '13 Days 12 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/7135ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 13 Days Discover Nepal Tour offers an incredible journey through Nepal’s rich culture, natural beauty, and spiritual heritage. From exploring UNESCO World Heritage Sites to enjoying wildlife safaris and breathtaking Himalayan views, this tour ensures a lifetime of unforgettable memories.

Your adventure begins with a warm welcome at Tribhuvan International Airport, where a representative from Destination Nepal Tours & Travels will greet you. Spend your first day at leisure or opt for an optional tour if you arrive early.

The next morning, enjoy a delicious breakfast before driving along the picturesque hills and riversides of Trishuli and Narayani River to reach Chitwan National Park. Spend two nights in Chitwan, indulging in activities such as elephant safari, jeep safari, Tharu village tour, Tharu cultural program, canoe rides on the Rapti River, and visits to the Crocodile Breeding Centre or Elephant Breeding Centre.

From Chitwan, travel to Lumbini, the sacred birthplace of Lord Buddha, where you will explore the Maya Devi Temple and other historical monasteries with a local guide. The journey continues to Tansen, where you will visit Ranighat, the Rani Mahal, and enjoy a full-day sightseeing tour of the ancient Tansen Town, including Tundikhel and the beautiful three-storey pagoda.

Next, head to Pokhara, known as the "City of Lakes." Witness the spectacular sunrise from Sarangkot, enjoy boating on Phewa Lake, and visit attractions like Davis Fall, Gupteshwor Mahadev Cave, World Peace Pagoda, and more. Continue to Bandipur Village, a charming hillside town, before proceeding to Nagarkot, famous for its stunning Himalayan sunrise views.

The final days of your tour include exploring Bhaktapur Durbar Square, Patan Durbar Square, Boudhanath Stupa, Pashupatinath Temple, and Kathmandu Durbar Square. Conclude the trip with a delightful Nepali dinner and cultural program, leaving you with cherished memories of your Discover Nepal Tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chitwan National Park Safari" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://plus.unsplash.com/premium_photo-1691735666207-be6e91326e3a?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Maya Devi Temple, Lumbini" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1580424917967-a8867a6e676e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Views from Pokhara" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 13 Days Discover Nepal Tour ?
- **A Journey Through Nepal’s Diverse Wonders:** A perfect blend of culture, history, nature, and adventure covering Nepal's most iconic destinations.
- **Wildlife Adventure in Chitwan National Park:** Get up close with Nepal’s incredible wildlife through safaris and canoe rides.
- **Spiritual Peace in Lumbini:** Walk through the sacred grounds of the birthplace of Lord Buddha.
- **Cultural Gems in Tansen and Pokhara:** Explore the historical charm of Tansen and a mix of natural beauty and cultural landmarks in Pokhara.
- **Himalayan Sunrise and Scenic Beauty:** Witness spectacular sunrises over the Himalayas from Sarangkot and Nagarkot.
- **Rich Cultural Heritage of Kathmandu Valley:** Delve into Nepal’s cultural history at iconic UNESCO World Heritage sites.

### Best Seasons for the Tour
- **Spring (March-May):** Pleasant with clear skies. Blooming rhododendrons and lush greenery. Perfect for photography and sightseeing.
- **Autumn (September-November):** The most popular season. Known for breathtaking views of the Himalayas and lush landscapes after the monsoon.
- **Summer/Monsoon (June-August):** Rain transforms Nepal into a vibrant green paradise. Less crowded, making cultural sites more serene.
- **Winter (December-February):** Cool and dry with clear skies. The Himalayas appear majestic. Perfect for those seeking a quiet experience.`,
    highlights: [
      'Uncover the spiritual history of Lumbini, the birthplace of Lord Buddha',
      'Enjoy an immersive jungle safari experience in Chitwan National Park',
      'Marvel at panoramic Himalayan sunrises from Nagarkot and Sarangkot',
      'Explore the ancient town of Tansen and the majestic Rani Mahal',
      'Discover the rich architectural heritage of the Kathmandu Valley'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Tansen[altitude 1350m/4430ft]', desc: 'Drive to Tansen, a historical town. Enjoy a sightseeing tour of the ancient Tansen Town, Tundikhel, and pagoda.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Explore more of Tansen including a visit to Ranighat and the Rani Mahal.' },
      { day: 'Day 7', title: 'Tansen-Pokhara[altitude 830m/2723ft]', desc: 'Drive to the picturesque lake city of Pokhara. Enjoy its stunning landscapes and serene lakes.' },
      { day: 'Day 8', title: 'Pokhara', desc: 'Enjoy a beautiful sunrise at Sarangkot, followed by a city tour including Davis Fall, Gupteshwor Mahadev Cave, and Phewa Lake boating.' },
      { day: 'Day 9', title: 'Pokhara-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming hillside village of Bandipur, showcasing Newari culture and Himalayan views.' },
      { day: 'Day 10', title: 'Bandipur-Nagarkot[2175m/7135ft]', desc: 'Drive to Nagarkot, famous for its mesmerizing sunset and sunrise views over the Himalayan ranges.' },
      { day: 'Day 11', title: 'Nagarkot-Kathmandu', desc: 'Watch the sunrise from Nagarkot before driving back to Kathmandu.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Cultural tour: Visit Bhaktapur Durbar Square, Patan Durbar Square, Boudhanath Stupa, Pashupatinath Temple, and Kathmandu Durbar Square.' },
      { day: 'Day 13', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Hotel Mystic Mountain or similar in Nagarkot',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '1 Night The Old Inn or similar in Bandipur',
      '2 Nights Hotel Shreenagar or similar in Tansen'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 13 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-ghandruk-trek-13d': {
    quickInfo: [
      { label: 'Duration', value: '13 Days 12 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1940m/6365ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 13 Days Discover Nepal Tour with Ghandruk Trek is a perfect combination of cultural exploration and trekking in Nepal. Your journey begins as you are warmly welcomed by a representative from Destination Nepal Tours & Travels at Tribhuvan International Airport. The first day is free to relax or explore with an optional tour.

After a delightful breakfast, you will drive through scenic hill areas alongside the Trishuli and Narayani rivers to reach Chitwan. Enjoy two nights here, experiencing the Tharu cultural program, elephant safari or jeep safari, crocodile breeding center, and canoeing in the Rapti River. Next, head to Lumbini, the birthplace of Lord Buddha, with a guided tour of its sacred sites.

From Lumbini, drive to Pokhara, where you’ll visit Bindabasini Temple, Davis Fall, Gupteshwor Mahadev Cave, Seti Gorge, and a Tibetan refugee camp. Begin your trek the next day, driving to Phedi and trekking to Tolka. Continue trekking to Ghandruk, a picturesque Gurung village, and descend to Nayapul before returning to Pokhara.

Drive or optionally fly back to Kathmandu, followed by sightseeing at Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square. Visit Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square the next day. Conclude your cultural journey with visits to Dakshinkali, Chobhar, Pharping, and Kirtipur, and enjoy a traditional Nepali dinner with a cultural show.

This tour combines Nepal’s cultural treasures with the beauty of the Ghandruk Trek, creating memories to cherish for a lifetime.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://plus.unsplash.com/premium_photo-1692102550644-b3969be679ad?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chitwan National Park Safari" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1545309451-2369945f85a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Ghandruk Village Trekking" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1592623171049-4be9e0f5a501?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Landmarks in Kathmandu" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 13 Days Discover Nepal Tour with Ghandruk Trek ?
- **Diverse Experiences in One Journey:** Blends Nepal's cultural richness with the stunning beauty of the Himalayas. From the serene birthplace of Lord Buddha to the breathtaking Annapurna region.
- **Picturesque Ghandruk Trek:** Perfect for beginners and seasoned trekkers alike. Walk through lush forests, traditional villages, and terraced fields.
- **Wildlife Adventures in Chitwan:** Enjoy thrilling jungle safaris, canoe rides, and birdwatching in Chitwan National Park.
- **Cultural and Spiritual Exploration:** Discover Nepal’s iconic UNESCO World Heritage Sites like Boudhanath Stupa and Bhaktapur Durbar Square.
- **Stunning Natural Beauty:** Pokhara’s serene lakes, waterfalls, and caves offer a refreshing escape.
- **Authentic Nepali Hospitality:** From traditional Nepali dinners with cultural performances to warm welcomes in local villages.

### Best Seasons for the Tour
- **Autumn (September to November):** Considered the best time for trekking in Nepal, with clear skies, mild temperatures, and dry weather. Crystal-clear views of the Himalayan peaks.
- **Spring (March to May):** Mild, pleasant weather with warm days. The trekking trails are covered with vibrant rhododendron blooms.
- **Summer/Monsoon (June to August):** Warmer with frequent rainfall. The landscape turns lush and green, but mountain views may be obscured by clouds.
- **Winter (December to February):** Cooler weather with clear skies. Snow-capped mountains create a picturesque winter landscape, offering a serene trekking experience.`,
    highlights: [
      'Embark on an accessible, picturesque trek to the traditional Gurung village of Ghandruk',
      'Discover Nepal’s rich history at UNESCO World Heritage sites in Kathmandu and Lumbini',
      'Dive into vibrant wildlife and Tharu culture in Chitwan National Park',
      'Relax in the picturesque lakeside city of Pokhara',
      'Enjoy panoramic views of the Annapurna mountain range while trekking'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, known for its stunning landscapes and serene lakes. City tour including Bindabasini Temple, Davis Fall, and Gupteshwor Cave.' },
      { day: 'Day 6', title: 'Pokhara-Tolka [Altitude 1700/5578ft]', desc: 'Drive to Phedi and begin your trek. Trek through scenic trails to the village of Tolka.' },
      { day: 'Day 7', title: 'Tolka–Ghandruk[Altitude 1940m/6365ft]', desc: 'Continue trekking to Ghandruk, a picturesque Gurung village. Enjoy stunning views of the Annapurna range.' },
      { day: 'Day 8', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Descend to Nayapul and drive back to Pokhara to rest and relax.' },
      { day: 'Day 9', title: 'Pokhara-Kathmandu', desc: 'Scenic drive or optional flight back to Kathmandu.' },
      { day: 'Day 10', title: 'Kathmandu', desc: 'Sightseeing tour of Boudhanath Stupa, Pashupatinath Temple, and Bhaktapur Durbar Square.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Visit Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Explore cultural gems around the Kathmandu Valley: Dakshinkali, Chobhar, Pharping, and Kirtipur. Traditional Nepali farewell dinner.' },
      { day: 'Day 13', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara & Lumbini city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '5 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 13 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'explore-nepal-tour-poon-hill-trek-14d': {
    quickInfo: [
      { label: 'Duration', value: '14 Days 13 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m/10531ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 14 Days Explore Nepal Tour with Poon Hill Trek begins with a warm welcome by Destination Nepal Tours & Travels' representative at Tribhuvan International Airport. On your arrival day, relax or opt for an additional tour if you arrive early. The next day, after a delightful breakfast, enjoy a scenic drive through lush hills and along the Trishuli and Narayani rivers to reach Chitwan. Spend two nights exploring Tharu village, experiencing the Tharu cultural program, and enjoying activities like elephant safari or jeep safari, visits to the crocodile breeding center, canoe rides, and birdwatching.

Proceed to Lumbini, the birthplace of Lord Buddha, with a guided tour to sacred sites. From Lumbini, journey to Pokhara, where you'll visit attractions such as Bindabasini Temple, Davis Falls, Gupteshwor Cave, Tibetan Refugee Camp, and Seti Gorge. Begin the trekking adventure by driving to Nayapul and trekking to Tikhedhunga. Continue to Ghorepani, followed by a sunrise trek to Poon Hill for panoramic Himalayan views. Trek onward to Tadapani and Ghandruk, enjoying the natural beauty and cultural charm of these iconic villages.

Conclude the trek at Nayapul and drive back to Pokhara, where you'll enjoy a relaxing evening. Drive back to Kathmandu, with an option for a flight to avoid the road journey. In Kathmandu, explore landmarks like Boudhanath Stupa, Pashupatinath Temple, Swayambhunath Stupa, and Kathmandu Durbar Square. Your journey ends with a traditional Nepali dinner accompanied by a cultural show. Depart with unforgettable memories of Nepal’s beauty and culture.

This package offers a blend of adventure, culture, and spirituality, making it perfect for an enriching Nepal experience.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1665394182741-78f266b0c944?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trekking in the Annapurna Region" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1665394182736-a5fc0aabbcea?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Landscapes" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1626163446890-cb31e7d711aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Sites in Nepal" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 14 Days Explore Nepal Tour with Poon Hill Trek ?
- **Cultural Immersion:** Immerse yourself in Nepal's rich heritage with visits to iconic sites like Boudhanath Stupa, Pashupatinath Temple, Kathmandu Durbar Square, and the spiritual aura of Lumbini.
- **Scenic Adventure:** The trek to Poon Hill offers stunning sunrise views of the Annapurna and Dhaulagiri ranges. Explore picturesque villages like Ghorepani, Tadapani, and Ghandruk.
- **Wildlife Encounters:** Chitwan National Park promises thrilling adventures with elephant or jeep safaris, canoe rides, and birdwatching.
- **Himalayan Serenity:** Enjoy the tranquility of Pokhara, with serene boating at Phewa Lake and visits to attractions like Davis Falls and Gupteshwor Cave.
- **Balanced Experience:** Blends moderate trekking with sightseeing and spiritual exploration, catering to both adventure enthusiasts and culture seekers.

### Best Seasons for the Tour
- **Spring (March to May):** Pleasant and mild. Rhododendron flowers bloom along the trails. Clear skies provide stunning views of the Himalayas.
- **Autumn (September to November):** Ideal trekking conditions with clear, sunny days. Spectacularly clear skies reveal panoramic views during the Poon Hill sunrise trek.
- **Summer/Monsoon (June to August):** Lush green landscapes and sparkling waterfalls dominate the trails. A quieter time for trekking.
- **Winter (December to February):** Cool days with chilly nights in higher altitudes. Milder weather in lower regions like Chitwan and Pokhara.`,
    highlights: [
      'Experience a majestic Himalayan sunrise from Poon Hill, towering at 3,210 meters',
      'Discover Nepal’s rich heritage at UNESCO World Heritage sites in Kathmandu and Lumbini',
      'Immerse yourself in wildlife adventures and Tharu culture in Chitwan National Park',
      'Trek through picturesque mountain villages including Ghorepani, Tadapani, and Ghandruk',
      'Relax in the peaceful lakeside city of Pokhara'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Immerse in Chitwan activities. Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 4', title: 'Lumbini-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, known for its stunning landscapes and serene lakes. City tour including Bindabasini Temple, Davis Falls, and Gupteshwor Cave.' },
      { day: 'Day 5', title: 'Pokhara-Thikedhunga[Altitude 1480m/4855ft]', desc: 'Drive to Nayapul and begin your trek to Tikhedhunga.' },
      { day: 'Day 6', title: 'Thikedhunga-Ghorepani[Altitude 2874m/9430ft]', desc: 'Trek up to Ghorepani. Rest and prepare for the sunrise hike tomorrow.' },
      { day: 'Day 7', title: 'Ghorepani-Poonhill [Altitude 3210m/10531ft]-Tadapani[Altitude 2630m/8628ft]', desc: 'Early morning hike to Poon Hill for a magical sunrise over the Annapurna and Dhaulagiri ranges. Trek onward to Tadapani.' },
      { day: 'Day 8', title: 'Tadapani-Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek to Ghandruk. Enjoy the traditional culture and stunning mountain views.' },
      { day: 'Day 9', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Descend to Nayapul and drive back to Pokhara to rest.' },
      { day: 'Day 10', title: 'Pokhara-Kathmandu', desc: 'Scenic drive back to Kathmandu. Relax or explore the city.' },
      { day: 'Day 11', title: 'Kathmandu', desc: 'Explore cultural gems around the Kathmandu Valley. Sightseeing tour of Boudhanath Stupa, Pashupatinath Temple, and Kathmandu Durbar Square.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Visit Swayambhunath Stupa. Enjoy a traditional Nepali farewell dinner and cultural show.' },
      { day: 'Day 13', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' },
      { day: 'Day 14', title: 'Final Departure', desc: 'Safe travels back home.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag for trekking time',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '4 Nights at best available lodge during the Trekking',
      '1 Night Buddha Maya Garden or similar in Lumbini'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 14 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'explore-nepal-tour-14d': {
    quickInfo: [
      { label: 'Duration', value: '14 Days 13 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle & Domestic Flight', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `14 Days Explore Nepal Tour offers a rich blend of cultural heritage, scenic landscapes, and spiritual experiences. Your journey begins as Destination Nepal Tours & Travels warmly welcomes you at Tribhuvan International Airport. The first day is free, or you can opt for an optional city tour.

On the second day, enjoy a delightful breakfast before heading to Chitwan via the picturesque Trishuli and Narayani rivers. Spend two nights in Chitwan, exploring the Tharu village, enjoying the cultural program, and experiencing an Elephant or Jeep safari, a canoe ride on the Rapti River, and bird watching.

Next, drive to Lumbini, the birthplace of Lord Buddha, and discover its sacred significance with a local guide. Continue to Tansen, where you’ll visit the historic Rani Mahal—often called Nepal’s Taj Mahal—and explore the charming ancient town.

From Tansen, journey to Pokhara, the scenic gateway to the Himalayas. Take a short flight to Jomsom and visit Muktinath, Kagbeni, Dhumba Lake, and Jomsom village. Fly back to Pokhara and explore landmarks like Bindabasini Temple, Devi’s Fall, Gupteswori Mahadev Cave, and enjoy boating on Phewa Lake.

Drive to Bandipur, a tranquil hilltop town, before returning to Kathmandu. The tour concludes with visits to Bhaktapur Durbar Square, Patan Durbar Square, Boudhanath Stupa, Pashupatinath Temple, and the Swoyambhunath Stupa. Enjoy a Nepali cultural dinner before departure with unforgettable memories of Nepal’s diverse wonders.

This tour offers the perfect combination of nature, culture, and spirituality, creating a once-in-a-lifetime experience.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1562462181-b228e3cff9ad?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chitwan Jungle Safari" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1526712318848-5f38e2740d44?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Muktinath Temple Exploration" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://plus.unsplash.com/premium_photo-1661963741928-673ed7f7c00b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Serene Landscapes of Nepal" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 14 Days Explore Nepal Tour ?
- **Diverse Experiences:** Covers every aspect of Nepal’s rich heritage and natural beauty, from cultural shows in Kathmandu to serene moments at Muktinath.
- **Cultural Immersion:** Walk through Bhaktapur Durbar Square, marvel at Pashupatinath Temple, and experience Bandipur village.
- **Spiritual Highlights:** Visit Lumbini, the sacred birthplace of Lord Buddha, and the revered Muktinath Temple.
- **Adventure and Nature:** Thrilling activities like a Chitwan Jungle Safari and canoe rides on the Rapti River.
- **Scenic Beauty:** Stunning landscapes, lush jungles, majestic rivers, snow-capped peaks, and tranquil lakes.
- **Unique Landmarks:** Explore the Nepali Taj Mahal (Rani Mahal) in Tansen.

### Best Seasons for the Tour
- **Spring (March to May):** Stable and pleasant. Lush greenery and blooming flowers. Majestic views of the Himalayas. Peak tourist season.
- **Autumn (September to November):** Clear skies and dry days. Perfect for travel. Flights to Jomsom operate smoothly. The busiest season.
- **Summer/Monsoon (June to August):** Warm and humid with frequent rainfall. Flights to Jomsom often delayed. Not recommended if you have time in another season.
- **Winter (December to February):** Cold temperatures. Jomsom Airport often closes due to snow. Low popularity due to travel challenges.`,
    highlights: [
      'Discover the birthplace of Lord Buddha with a guided tour of Lumbini',
      'Experience a spiritual journey to the sacred Muktinath Temple in Jomsom',
      'Explore the architectural beauty of the Rani Mahal (Nepali Taj Mahal) in Tansen',
      'Dive into vibrant wildlife and Tharu culture in Chitwan National Park',
      'Relax in the picturesque lakeside city of Pokhara and the tranquil hilltop of Bandipur'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Tansen[altitude 1350m/4430ft]', desc: 'Drive to Tansen, a historical town. Enjoy a sightseeing tour of the ancient Tansen Town, Tundikhel, and pagoda.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Explore more of Tansen including a visit to the historic Rani Mahal (Nepal\'s Taj Mahal).' },
      { day: 'Day 7', title: 'Tansen-Pokhara[altitude 830m/2723ft]', desc: 'Drive to the picturesque lake city of Pokhara. Enjoy its stunning landscapes and serene lakes.' },
      { day: 'Day 8', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft]', desc: 'Take a short, scenic flight to Jomsom. Visit the sacred pilgrimage site of Muktinath, Kagbeni, and Dhumba Lake.' },
      { day: 'Day 9', title: 'Jomsom-Pokhara', desc: 'Fly back to Pokhara from Jomsom. Explore attractions like Bindabasini Temple, Davis Falls, Gupteshwor Cave, and Seti Gorge.' },
      { day: 'Day 10', title: 'Pokhara-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming hilltop village of Bandipur, known for its cultural richness and breathtaking views.' },
      { day: 'Day 11', title: 'Bandipur-Kathmandu', desc: 'Drive back to Kathmandu and relax at your hotel.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Explore cultural gems around the Kathmandu Valley, including Bhaktapur Durbar Square and Patan Durbar Square.' },
      { day: 'Day 13', title: 'Kathmandu', desc: 'Visit Boudhanath Stupa, Pashupatinath Temple, and Swayambhunath Stupa. Enjoy a traditional Nepali farewell dinner.' },
      { day: 'Day 14', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara, Lumbini tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Om\'s Home in Jomsom',
      '1 Night The Old Inn or similar in Bandipur',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '2 Nights Hotel Shreenagar or similar in Tansen'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 14 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-14d': {
    quickInfo: [
      { label: 'Duration', value: '14 Days 13 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '2175m/7135ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 14 Days Discover Nepal Tour is a carefully curated journey through Nepal’s vibrant culture, natural beauty, and spiritual heritage. From the bustling streets of Kathmandu to the serene landscapes of Nagarkot, and from the jungles of Chitwan to the sacred sites of Lumbini, this tour promises a truly unforgettable experience.

Begin your adventure with a warm welcome at Tribhuvan International Airport, followed by a day at leisure or an optional tour. The next morning, drive through scenic hill areas and riversides to Chitwan National Park, where you’ll spend two nights enjoying wildlife safaris, Tharu cultural programs, canoe rides, and visits to breeding centers.

Head to Lumbini, the birthplace of Lord Buddha, for a spiritual journey, then continue to the historical town of Tansen, visiting landmarks like Ranighat and Rani Mahal. Explore the ancient charm of Tansen Town before proceeding to Pokhara, where activities include sunrise views from Sarangkot, boating on Phewa Lake, and visiting attractions like World Peace Pagoda and Davis Fall.

Next, visit the charming Bandipur Village, followed by breathtaking mountain views from Nagarkot. Dive into Nepal’s rich heritage by exploring Bhaktapur Durbar Square, Patan Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. On the final day, visit Dakshinkali, Chobhar, Pharping, and Kirtipur, ending your journey with a traditional Nepali dinner and cultural program.

This 14 Days Nepal Tour offers a perfect balance of adventure, culture, and spiritual exploration, leaving you with cherished memories of Nepal.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Himalayan Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1511215579272-6192432f83bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Exploration" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1610997686651-98492fd08108?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Tranquil Lakes" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 14 Days Discover Nepal Tour ?
- **A Perfect Blend of Culture, Nature, and Spirituality:** A harmonious mix of Nepal’s cultural heritage, natural beauty, and spiritual essence.
- **Wildlife and Adventure in Chitwan:** Thrilling elephant/jeep safaris, canoe rides, and visits to breeding centers.
- **Spiritual Peace in Lumbini:** Visit the Maya Devi Temple and various monasteries that radiate tranquility.
- **Historical Charm of Tansen:** Step back in time in the ancient town of Tansen, exploring landmarks like the stunning Rani Mahal.
- **Himalayan Views and Scenic Landscapes:** Breathtaking sunrises from Sarangkot and Nagarkot.
- **Nepal’s Rich Cultural Heritage:** Immerse yourself in the historical grandeur of Durbar Squares and iconic stupas.
- **Unique and Offbeat Experiences:** Visit hidden gems like Bandipur Village, Pharping, and Kirtipur.

### Best Seasons for the Tour
- **Autumn (September-November):** Clear skies and stable weather. Breathtaking views of the Himalayas and lush landscapes. The most popular season.
- **Spring (March-May):** Pleasant with clear skies and moderate climate. Blooming rhododendrons and lush greenery. Peak tourist season.
- **Summer/Monsoon (June-August):** Transforms Nepal into a vibrant green paradise. Less crowded, perfect for travelers who prefer quieter destinations.
- **Winter (December-February):** Cool and dry with clear skies. Majestic winter skies. Fewer tourists, making it perfect for a quiet experience.`,
    highlights: [
      'Experience incredible sunrises over the Himalayas from Sarangkot and Nagarkot',
      'Discover the birthplace of Lord Buddha on a guided spiritual tour of Lumbini',
      'Step back in time at the historic Rani Mahal (Nepali Taj Mahal) in Tansen',
      'Immerse yourself in wildlife and Tharu culture in Chitwan National Park',
      'Explore hidden gems like the hilltop town of Bandipur and the historical sites of Kirtipur'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Tansen[altitude 1350m/4430ft]', desc: 'Drive to Tansen, a historical town. Enjoy a sightseeing tour of the ancient Tansen Town, Tundikhel, and pagoda.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Explore more of Tansen including a visit to the historic Rani Mahal (Nepal\'s Taj Mahal) and Ranighat.' },
      { day: 'Day 7', title: 'Tansen-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, known for its stunning landscapes and serene lakes. Enjoy boating on Phewa Lake.' },
      { day: 'Day 8', title: 'Pokhara', desc: 'Sarangkot sunrise view. City tour including World Peace Pagoda, Davis Fall, and other key attractions.' },
      { day: 'Day 9', title: 'Pokhara-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming hilltop village of Bandipur, known for its cultural richness and breathtaking views.' },
      { day: 'Day 10', title: 'Bandipur-Nagarkot [2175m/7135ft]', desc: 'Drive to Nagarkot for panoramic Himalayan views and a spectacular sunset/sunrise.' },
      { day: 'Day 11', title: 'Nagarkot-Kathmandu', desc: 'Drive back to Kathmandu. Sightseeing tour of Bhaktapur Durbar Square and Patan Durbar Square.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Visit Boudhanath Stupa and Pashupatinath Temple. Explore the bustling streets.' },
      { day: 'Day 13', title: 'Kathmandu', desc: 'Visit Dakshinkali, Chobhar, Pharping, and Kirtipur. Traditional Nepali farewell dinner with cultural program.' },
      { day: 'Day 14', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Dhulikhel Mountain resort or similar in Dhulikhel',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '1 Night The Old Inn or similar in Bandipur',
      '2 Nights Hotel Shreenagar or similar in Tansen'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 14 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-ghandruk-trek-14d': {
    quickInfo: [
      { label: 'Duration', value: '14 Days 13 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1940m/6365ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 14 Days Discover Nepal Tour with Ghandruk Trek is a perfect blend of culture, adventure, and breathtaking natural beauty. Upon arrival at Tribhuvan International Airport, you’ll be welcomed by Destination Nepal Tours & Travels' representative. Your first day will be free, or you can opt for an additional tour.

The journey begins with a scenic drive along the Trishuli and Narayani rivers to Chitwan, where you’ll enjoy a 2-night stay. Activities include a Tharu village tour, cultural program, jungle safari, canoe ride, and birdwatching. Next, head to Lumbini, the birthplace of Lord Buddha, for a guided tour of its sacred sites.

From Lumbini, drive to Tansen to explore the historic Ranighat Palace, also known as Nepal’s Taj Mahal, and the ancient town of Tansen. Continue to Pokhara, where you’ll visit Bindabasini Temple, Davis Fall, Gupteswor Mahadev Cave, Tibetan Refugee Camp, and Seti Gorge.

Begin the trek from Phedi to Tolka, then to Ghandruk, a charming Gurung village offering stunning Himalayan views. The trek concludes with a descent to Nayapul and a return drive to Pokhara.

Back in Kathmandu, explore iconic sites such as Boudhanath Stupa, Pashupatinath Temple, Bhaktapur Durbar Square, Patan Durbar Square, Swoyambhunath Stupa, and Kathmandu Durbar Square. Conclude your journey with a traditional Nepali dinner and cultural show.

This tour offers a perfect balance of heritage, nature, and cultural immersion, leaving you with unforgettable memories of Nepal.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1696576834819-37a40bfd21c6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Annapurna Views" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1678628103733-e1a76d096a1a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trekking Adventures" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nepal Cultural Heritage" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why People Love the 14 Days Discover Nepal Tour with Ghandruk Trek ?
- **Diverse Experiences:** A perfect mix of culture, history, adventure, and nature. From the tranquil jungles of Chitwan to the sacred birthplace of Lord Buddha.
- **Rich Cultural Heritage:** Explore Nepal’s UNESCO World Heritage Sites, including Boudhanath Stupa, Pashupatinath Temple, and ancient Durbar Squares.
- **Historical Significance:** A visit to Tansen’s ancient town and the Ranighat Palace adds a historical dimension to this journey.
- **Scenic Beauty and Adventure:** The trek to Ghandruk offers breathtaking views of the Annapurna range. An easy-to-moderate trek suitable for all levels.
- **Wildlife Encounters:** Immerse yourself in Nepal’s diverse wildlife during the safari in Chitwan National Park.
- **Seamless Itinerary:** A well-balanced itinerary ensuring a mix of relaxation, exploration, and adventure.

### Best Seasons for the Tour
- **Autumn (September to November):** The best time for trekking in Nepal, with clear skies, mild temperatures, and dry weather. Most popular time for this tour.
- **Spring (March to May):** Mild, pleasant weather with warm days. Vibrant rhododendron blooms cover the trails.
- **Summer/Monsoon (June to August):** Warmer with frequent rainfall. Lush and green landscapes. Trekking in high-altitude areas can be challenging.
- **Winter (December to February):** Cooler weather with clear skies. Beautiful snow-capped mountains. A good time if you don't mind the cold.`,
    highlights: [
      'Embark on a picturesque and accessible trek to the Gurung village of Ghandruk',
      'Discover the birthplace of Lord Buddha on a guided spiritual tour of Lumbini',
      'Immerse yourself in vibrant wildlife and Tharu culture in Chitwan National Park',
      'Explore the architectural beauty of the historic Rani Mahal in Tansen',
      'Relax in the peaceful lakeside city of Pokhara and enjoy stunning mountain views'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive to Chitwan National Park. Prepare for your wildlife adventure.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Dive into the local culture with a traditional Tharu village visit, canoe ride, elephant/jeep safari, and a Tharu cultural program.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Scenic drive to Lumbini. Visit the sacred Maya Devi Temple, spiritual gardens, and beautiful monasteries with a local guide.' },
      { day: 'Day 5', title: 'Lumbini-Tansen[altitude 1350m/4430ft]', desc: 'Drive to Tansen, a historical town. Enjoy a sightseeing tour of the ancient Tansen Town, Tundikhel, and pagoda.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Explore more of Tansen including a visit to the historic Rani Mahal (Nepal\'s Taj Mahal).' },
      { day: 'Day 7', title: 'Tansen-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, known for its stunning landscapes and serene lakes. Enjoy boating on Phewa Lake.' },
      { day: 'Day 8', title: 'Pokhara-Tolka [Altitude 1700/5578ft]', desc: 'Drive to Phedi and begin the trek. Hike to Tolka.' },
      { day: 'Day 9', title: 'Tolka–Ghandruk[Altitude 1940m/6365ft]', desc: 'Continue trekking to the charming Gurung village of Ghandruk. Enjoy breathtaking views of the Annapurna range.' },
      { day: 'Day 10', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Descend to Nayapul and drive back to Pokhara. Rest and relax.' },
      { day: 'Day 11', title: 'Pokhara-Kathmandu', desc: 'Drive back to Kathmandu. Relax at your hotel or explore the city.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Explore cultural gems around the Kathmandu Valley. Sightseeing tour of Bhaktapur Durbar Square and Patan Durbar Square.' },
      { day: 'Day 13', title: 'Kathmandu', desc: 'Visit Boudhanath Stupa, Pashupatinath Temple, and Swayambhunath Stupa. Enjoy a traditional Nepali farewell dinner and cultural show.' },
      { day: 'Day 14', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara & Lumbini city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '2 Nights Hotel Shreenagar or similar in Tansen',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '2 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 14 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-tiger-tracking-bardia-15d': {
    quickInfo: [
      { label: 'Duration', value: '15 Days 14 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov, Mar-Jun', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on an exhilarating 15 Day Discover Nepal Tour Cum Tiger Tracking that combines adventure, culture, and spirituality in Nepal's diverse landscapes. Begin in the bustling heart of Kathmandu, where ancient temples and vibrant markets set the tone for your exploration. Traverse to Bandipur, a well-preserved medieval town offering a glimpse into Nepal's architectural past. The serene lakes and awe-inspiring mountains of Pokhara provide a tranquil respite before immersing in Tansen's cultural riches and hilltop views. 

Prepare for an exciting phase as you head to Bardia, where tiger tracking in the untouched wilderness becomes an unforgettable wildlife encounter. Transition to spiritual reflection in Lumbini, the birthplace of Buddha, before concluding this remarkable journey. With safety measures in place, this 15-day tour seamlessly blends adventure with cultural immersion, leaving you with indelible memories of Nepal's captivating beauty and unique experiences.

Overall, the 15-day tour caters to a wide range of interests, offering a balanced blend of adventure, culture, wildlife, spirituality, and security, making it an attractive option for travelers looking for a comprehensive and enriching exploration of Nepal.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://tigerencounter.com/wp-content/uploads/2019/03/Tiger-Encounter-in-Bardia-National-Park-2.jpg" alt="Tiger Tracking in Bardia" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1738902917784-9c4d8e373d25?q=80&w=670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Heritage" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1738902918354-da032dd5c9be?q=80&w=668&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Exploration" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love this trip?
- **Diverse Experiences:** Explore bustling urban centers like Kathmandu, tranquil lakes in Pokhara, cultural immersion in Bandipur and Tansen, thrilling wildlife encounters in Bardia, and spiritual reflection in Lumbini.
- **Cultural Richness:** Immerse yourself in the rich cultural heritage of Nepal, visiting ancient temples, historical landmarks, and UNESCO World Heritage Sites.
- **Untouched Wilderness:** Tiger tracking in Bardia's pristine wilderness provides a chance to get up close to incredible wildlife in their natural habitat.
- **Spiritual Exploration:** Lumbini, the birthplace of Buddha, offers a profound spiritual experience to connect with Buddhism's roots.
- **Scenic Beauty:** Showcases Nepal's stunning natural beauty, from serene lakes and majestic mountains to hilltop vistas and lush jungles.
- **Expertly Crafted Itinerary:** Carefully planned to ensure a seamless travel experience, including guided tours, comfortable accommodations, and transportation.
- **Sense of Adventure:** The combination of cultural exploration, wildlife tracking, and spiritual introspection adds an element of excitement.`,
    highlights: [
      'Track majestic Bengal tigers and other exotic wildlife in the pristine Bardia National Park',
      'Wander through the well-preserved medieval streets of Bandipur',
      'Find spiritual peace exploring the sacred gardens and monasteries of Lumbini',
      'Discover Nepal’s rich cultural tapestry in Kathmandu’s vibrant temples and markets',
      'Enjoy breathtaking lakeside views and majestic mountain panoramas in Pokhara'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the beautifully preserved medieval town of Bandipur. Enjoy the historic architecture and views.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Continue your journey to the picturesque lake city of Pokhara.' },
      { day: 'Day 4', title: 'Pokhara', desc: 'Explore Pokhara. Early morning Sarangkot sunrise tour, followed by a city sightseeing tour.' },
      { day: 'Day 5', title: 'Pokhara-Tansen[altitude 1350m/4430ft]', desc: 'Drive to Tansen. Enjoy the cultural riches and hilltop views of this ancient town.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Explore the historical landmarks and local culture of Tansen.' },
      { day: 'Day 7', title: 'Tansen- Bardia  [Altitude300m/984ft]', desc: 'Drive to Bardia National Park, preparing for your exciting wildlife encounter.' },
      { day: 'Day 8', title: 'Bardia', desc: 'Engage in thrilling jungle activities, including tiger tracking and exploring the untouched wilderness.' },
      { day: 'Day 9', title: 'Bardia', desc: 'Another full day of wildlife safaris and nature exploration in Bardia National Park.' },
      { day: 'Day 10', title: 'Bardia', desc: 'Final day in Bardia to spot exotic wildlife and enjoy the serene jungle environment.' },
      { day: 'Day 11', title: 'Bardia-Lumbini[Altitude165m/492ft]', desc: 'Drive to Lumbini, the birthplace of Lord Buddha, for spiritual reflection.' },
      { day: 'Day 12', title: 'Lumbini-Kathmandu', desc: 'Drive back to the bustling capital city of Kathmandu.' },
      { day: 'Day 13', title: 'Kathmandu', desc: 'Full day sightseeing tour of Kathmandu’s ancient temples and UNESCO World Heritage Sites.' },
      { day: 'Day 14', title: 'Kathmandu', desc: 'Free day in Kathmandu for shopping, relaxing, or optional tours. Enjoy a farewell dinner.' },
      { day: 'Day 15', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Bardia',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Bardia',
      '4 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '1 Night The Old Inn or similar in Bandipur',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '2 Nights Hotel Shreenagar or similar in Tansen',
      '4 Nights Rhino Lodge or similar in Bardia'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 15 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'explore-nepal-tour-15d': {
    quickInfo: [
      { label: 'Duration', value: '15 Days 14 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3710m/12172 ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle & Domestic Flight', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Discover the wonders of Nepal on our 15-day Explore Nepal Tour. Begin in Kathmandu and travel to the charming town of Bandipur. Continue to Pokhara, famous for its beautiful lakes and mountain views. From Pokhara, journey to Jomsom and visit the sacred Muktinath Temple. Return to Pokhara before exploring the historic town of Tansen. Visit Lumbini, the peaceful birthplace of Lord Buddha, and then head to Chitwan for an exciting wildlife adventure. Finish your trip back in Kathmandu with three full days of sightseeing, exploring its rich culture and history. This tour is perfect for those who want to experience Nepal's diverse landscapes, spiritual sites, and vibrant traditions.

From Kathmandu, you can experience Himalaya [Mount Everest and so many other ranges] view from early morning 1 hrs flight. Most of the visitor likes to join this tour to see highest peak of the world.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Wonders" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1554710869-95f3df6a3197?q=80&w=677&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Spiritual Sites" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://plus.unsplash.com/premium_photo-1697729591214-a4dc41d7d760?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Scenic Splendor" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love this trip?
- **Variety of Experiences:** A mix of cultural exploration, spiritual visits, and natural beauty, providing a diverse and enriching experience.
- **Scenic Beauty:** Witness Nepal's stunning landscapes, from the serene lakes of Pokhara to the majestic mountains around Jomsom and Muktinath.
- **Cultural Immersion:** Deep dive into local traditions and history with visits to culturally rich towns like Bandipur and Tansen.
- **Spiritual Significance:** Profound spiritual experiences at sacred sites such as Muktinath Temple and Lumbini, the birthplace of Lord Buddha.
- **Wildlife Adventure:** The chance to see exotic wildlife, including rhinos, elephants, and various bird species in Chitwan National Park.
- **Comprehensive Kathmandu Tour:** Explore rich heritage, historical sites, and vibrant markets with three full days of sightseeing in Kathmandu.`,
    highlights: [
      'Experience the spiritual energy of the sacred Muktinath Temple in Jomsom',
      'Discover the birthplace of Lord Buddha with a guided tour in Lumbini',
      'Engage in thrilling wildlife safaris and Tharu cultural experiences in Chitwan',
      'Explore the historic towns of Bandipur and Tansen',
      'Enjoy extensive sightseeing of Kathmandu’s vibrant culture and history over three days'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to the charming, culturally rich town of Bandipur.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Continue to Pokhara, famous for its beautiful lakes and mountain views.' },
      { day: 'Day 4', title: 'Pokhara-Jomsom[Altitude 2745m/9005ft]', desc: 'Fly to Jomsom. Visit the sacred Muktinath Temple and surrounding areas.' },
      { day: 'Day 5', title: 'Jomsom-Pokhara', desc: 'Fly back to Pokhara. Explore the city, including a Sarangkot Sunrise tour.' },
      { day: 'Day 6', title: 'Pokhara-Tansen[altitude 1350m/4430ft]', desc: 'Drive to the historic town of Tansen. Deep dive into local traditions and history.' },
      { day: 'Day 7', title: 'Tansen', desc: 'Explore Tansen’s local culture and landmarks.' },
      { day: 'Day 8', title: 'Tansen-Lumbini[altitude 150m/492ft]', desc: 'Drive to Lumbini, the peaceful birthplace of Lord Buddha.' },
      { day: 'Day 9', title: 'Lumbini-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan for an exciting wildlife adventure.' },
      { day: 'Day 10', title: 'Chitwan', desc: 'Enjoy wildlife safaris, elephant rides, and cultural shows in Chitwan National Park.' },
      { day: 'Day 11', title: 'Chitwan-Kathmandu', desc: 'Drive back to Kathmandu.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Full day sightseeing of Kathmandu’s rich heritage and vibrant markets.' },
      { day: 'Day 13', title: 'Kathmandu', desc: 'Another full day of sightseeing in Kathmandu.' },
      { day: 'Day 14', title: 'Kathmandu', desc: 'Final day of Kathmandu sightseeing. Enjoy a farewell dinner.' },
      { day: 'Day 15', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara & Lumbini city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Jomsom-Muktinath tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Pokhara-Jomsom-Pokhara flight tickets with airport taxes',
      'Daily buffet breakfast in Kathmandu, Pokhara, Jomsom',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '5 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Om\'s Home in Jomsom',
      '1 Night The Old Inn or similar in Bandipur',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '2 Nights Hotel Shreenagar or similar in Tansen'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 15 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-15d': {
    quickInfo: [
      { label: 'Duration', value: '15 Days 14 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `The 15 Days Discover Nepal Tour is a journey through Nepal’s stunning landscapes, vibrant culture, and spiritual heritage. From the tranquil beauty of Bandipur to the sacred birthplace of Lord Buddha, this tour offers an unforgettable experience.

Start your adventure with a warm welcome at Tribhuvan International Airport, followed by a relaxing day or an optional tour. The next day, drive along scenic riversides to Bandipur Village, where you can explore its charming culture and scenic vistas. Continue to Pokhara, the city of lakes, and enjoy sunrise views from Sarangkot, boating on Phewa Lake, and visits to iconic sites like World Peace Pagoda and Begnas Lake.

Explore the historical town of Tansen, home to the majestic Rani Mahal and ancient pagodas, before heading to Lumbini, the sacred birthplace of Lord Buddha, for a spiritual journey. Next, experience the wonders of Chitwan National Park, with activities such as wildlife safaris, Tharu cultural programs, and serene canoe rides.

Drive to Dhulikhel, known for its panoramic Himalayan views, and visit iconic landmarks like Bhaktapur Durbar Square, Boudhanath Stupa, and Pashupatinath Temple. End your tour in Kathmandu Valley, exploring Patan Durbar Square, Swoyambhunath Stupa, and hidden gems like Dakshinkali and Pharping.

Conclude your journey with a traditional Nepali dinner and cultural program, leaving you with cherished memories of this diverse and enriching Nepal Tour.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1504448252408-b32799ff32f3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Charming Hilltop Villages" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1512036594830-51cea3a8df78?q=80&w=718&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Historical Journeys" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1636513988093-126e51dee32d?q=80&w=2156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Sunrises" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 15 Days Discover Nepal Tour ?
- **A Complete Nepal Experience:** An all-encompassing journey showcasing vibrant culture, breathtaking landscapes, and spiritual heritage.
- **Charming Hilltop Villages:** Explore the tranquil beauty of Bandipur Village, known for its traditional charm and stunning views.
- **Adventure and Serenity in Pokhara:** Enjoy magical sunrises at Sarangkot, boating on Phewa Lake, and serene moments at Begnas Lake.
- **Historical and Spiritual Journeys:** Delve into ancient Tansen, explore Lumbini, and visit spiritual landmarks in Kathmandu.
- **Thrilling Wildlife Encounters:** Experience Chitwan National Park with elephant/jeep safaris, canoe rides, and Tharu culture.
- **Spectacular Himalayan Views:** Panoramic views from Dhulikhel and Nagarkot, perfect for photography.
- **Cultural and Culinary Delight:** Immerse yourself in UNESCO Sites and indulge in a traditional Nepali dinner and cultural program.`,
    highlights: [
      'Take in panoramic Himalayan views from the serene hill station of Dhulikhel',
      'Discover the birthplace of Lord Buddha on a guided spiritual tour of Lumbini',
      'Engage in exciting wildlife safaris and local culture in Chitwan National Park',
      'Wander the charming medieval streets of Bandipur and the historical sites of Tansen',
      'Experience the magic of a Sarangkot sunrise and peaceful boating in Pokhara'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]', desc: 'Drive to Bandipur Village. Explore its charming culture and scenic vistas.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Drive to Pokhara, the city of lakes. Relax by the lakeside.' },
      { day: 'Day 4', title: 'Pokhara', desc: 'Enjoy sunrise views from Sarangkot, boating on Phewa Lake, and visit World Peace Pagoda and Begnas Lake.' },
      { day: 'Day 5', title: 'Pokhara', desc: 'Another full day in Pokhara to explore more sights and relax.' },
      { day: 'Day 6', title: 'Pokhara-Tansen[altitude 1350m/4430ft]', desc: 'Drive to the historical town of Tansen. Explore the ancient pagodas.' },
      { day: 'Day 7', title: 'Tansen', desc: 'Visit the majestic Rani Mahal (Nepali Taj Mahal) and explore Tansen Town.' },
      { day: 'Day 8', title: 'Tansen-Lumbini[altitude 150m/492ft]', desc: 'Drive to Lumbini, the sacred birthplace of Lord Buddha. Explore the spiritual gardens.' },
      { day: 'Day 9', title: 'Lumbini-Chitwan[altitude 415m/1361ft]', desc: 'Drive to Chitwan National Park for wildlife safaris and Tharu cultural programs.' },
      { day: 'Day 10', title: 'Chitwan', desc: 'Enjoy a full day of jungle activities including canoe rides, elephant/jeep safaris, and visiting breeding centers.' },
      { day: 'Day 11', title: 'Chitwan-Dhulikhel[1550m/5085ft]', desc: 'Drive to Dhulikhel for panoramic Himalayan views.' },
      { day: 'Day 12', title: 'Dhulikhel-Kathmandu', desc: 'Drive back to Kathmandu. Visit iconic landmarks like Bhaktapur Durbar Square.' },
      { day: 'Day 13', title: 'Kathmandu', desc: 'Explore Patan Durbar Square, Swoyambhunath Stupa, and more.' },
      { day: 'Day 14', title: 'Kathmandu', desc: 'Visit hidden gems like Dakshinkali and Pharping. Traditional Nepali farewell dinner.' },
      { day: 'Day 15', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '4 Nights The Soaltee kathmandu or similar in Kathmandu for Luxury tier',
      '3 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Dhulikhel Mountain resort or similar in Dhulikhel',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '1 Night The Old Inn or similar in Bandipur',
      '2 Nights Hotel Shreenagar or similar in Tansen'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 15 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'explore-nepal-tour-poon-hill-trek-15d': {
    quickInfo: [
      { label: 'Duration', value: '15 Days 14 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '3210m/10531ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on the 15 Days Explore Nepal Tour with Poon Hill Trek and uncover the breathtaking beauty and cultural treasures of Nepal. Your journey begins as Destination Nepal Tours & Travels welcomes you at Tribhuvan International Airport. On the first day, enjoy free time or opt for an additional tour.

The adventure starts with a scenic drive along Trishuli and Narayani rivers to reach Chitwan, where you’ll stay for two nights. Experience the vibrant Tharu culture, enjoy an elephant or jeep safari, and explore the Crocodile Breeding Center or Elephant Breeding Center, along with a canoe ride and birdwatching.

Next, visit Lumbini, the birthplace of Lord Buddha, followed by a drive to Tansen for a short excursion to the stunning Rani Mahal. The ancient town of Tansen offers a glimpse into Nepal’s historical architecture and culture.

From Tansen, travel to Pokhara, where you’ll explore Bindabasini Temple, Davis Fall, Gupteswori Mahadev Cave, and more. Begin the trekking segment with a drive to Nayapul, followed by treks to Thikedhunga, Ghorepani, and Poon Hill for a spectacular Himalayan sunrise. Continue through Tadapani and Ghandruk, experiencing charming villages and local culture.

After descending to Nayapul and returning to Pokhara, drive or fly back to Kathmandu. Explore iconic sites such as Boudhanath Stupa, Pashupatinath Temple, Swoyambhunath Stupa, and Kathmandu durbar square concluding with a Nepali cultural dinner. End your trip with cherished memories of Nepal’s natural beauty and rich heritage.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1574410206732-0000dbcb116d?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trekking Trails" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1660629400873-4c4ec47f3726?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Sites" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1705911566030-5f21a162b505?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Panoramas" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love the 15 Days Explore Nepal Tour with Poon Hill Trek ?
- **Diverse Cultural Experiences:** Immerse yourself in Nepal’s rich heritage with visits to UNESCO World Heritage Sites, Lumbini, and historic towns like Tansen and Kathmandu.
- **Thrilling Wildlife Adventure:** Unforgettable stay in Chitwan National Park with safaris, canoe rides, and birdwatching amidst lush greenery.
- **Breathtaking Trekking Trails:** The Poon Hill Trek offers a moderate trekking experience with spectacular sunrise views over the Himalayas.
- **Picturesque Landscapes:** Explore the natural beauty of Pokhara, with highlights such as Phewa Lake, Seti Gorge, and Davis Fall.
- **Historical and Spiritual Enrichment:** Visit Rani Mahal, along with iconic temples and stupas.
- **Unique Culinary Delights:** Conclude your journey with an authentic Nepali cultural dinner and lively performance.`,
    highlights: [
      'Experience the thrill of wildlife safaris in the lush jungles of Chitwan National Park',
      'Discover inner peace at Lumbini, the sacred birthplace of Lord Buddha',
      'Trek to Poon Hill for a breathtaking, panoramic sunrise over the Himalayas',
      'Explore the ancient architectural marvels of Tansen and Kathmandu',
      'Enjoy the serene beauty and majestic mountain backdrops of Pokhara'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive along Trishuli and Narayani rivers to reach Chitwan National Park.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Full day jungle activities: elephant/jeep safari, canoe ride, birdwatching, and Tharu cultural experience.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Drive to Lumbini, the birthplace of Lord Buddha, for spiritual reflection.' },
      { day: 'Day 5', title: 'Lumbini-Tansen[altitude 1350m/4430ft]', desc: 'Drive to Tansen. Enjoy a short excursion to the stunning Rani Mahal.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Explore the ancient town of Tansen, rich in historical architecture and culture.' },
      { day: 'Day 7', title: 'Tansen-Pokhara[altitude 830m/2723ft]', desc: 'Travel to Pokhara and explore its beautiful lakes, temples, and caves.' },
      { day: 'Day 8', title: 'Pokhara-Thikedhunga[Altitude 1480m/4855ft]', desc: 'Drive to Nayapul and begin the trek. Trek to Thikedhunga.' },
      { day: 'Day 9', title: 'Thikedhunga-Ghorepani[Altitude 2874m/9430ft]', desc: 'Ascend the stone steps to Ulleri and continue trekking to the beautiful village of Ghorepani.' },
      { day: 'Day 10', title: 'Ghorepani-Poonhill [Altitude 3210m/10531ft]-Tadapani[Altitude 2630m/8628ft]', desc: 'Early morning hike to Poon Hill for sunrise. Trek through rhododendron forests to Tadapani.' },
      { day: 'Day 11', title: 'Tadapani-Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek down to the culturally rich Gurung village of Ghandruk. Enjoy mountain views.' },
      { day: 'Day 12', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Descend to Nayapul and drive back to Pokhara for a well-deserved rest.' },
      { day: 'Day 13', title: 'Pokhara-Kathmandu', desc: 'Drive or fly back to the bustling city of Kathmandu.' },
      { day: 'Day 14', title: 'Kathmandu', desc: 'Explore iconic sites such as Boudhanath, Pashupatinath, Swoyambhunath, and Kathmandu Durbar Square. Farewell dinner.' },
      { day: 'Day 15', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara & Lumbini city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '3 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '2 Nights Hotel Shreenagar or similar in Tansen',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '4 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 15 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-ghandruk-trek-15d': {
    quickInfo: [
      { label: 'Duration', value: '15 Days 14 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1940m/6365ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Moderate', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Discover Nepal Tour with Ghandruk Trek starts as soon as you are welcomed by Destination Nepal Tours & Travels at Tribhuvan International Airport. Upon arrival, enjoy a free day or take an optional tour if you arrive early.

The next morning, after a delightful breakfast, embark on a scenic drive through hilly roads and alongside the Trishuli and Narayani rivers to reach Chitwan. Spend two nights exploring Chitwan National Park with activities like a Tharu village tour, cultural program, elephant safari or jeep safari, and a visit to the crocodile breeding center.

From Chitwan, head to Lumbini, the birthplace of Lord Buddha, with a guided tour. Continue to Tansen to visit the historic Ranighat Palace and explore the ancient town. Drive to Pokhara for sightseeing at Bindabasini Temple, Davis Fall, Gupteswor Mahadev Cave, Tibetan Refugee Camp, and Seti Gorge.

Begin your trek from Phedi to Tolka, followed by Tolka to Ghandruk—a picturesque village offering stunning Himalayan views. After descending to Nayapul, drive back to Pokhara and optionally fly to Kathmandu.

Conclude the journey with visits to Boudhanath Stupa, Pashupatinath Temple, Bhaktapur Durbar Square, Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square. On the final day, tour Dakshinkali, Chobhar, Pharping, and Kirtipur before enjoying a traditional Nepali dinner with a cultural show.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1545309451-2369945f85a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trekking to Ghandruk" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1738054410156-2fa3631c9436?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Spiritual Lumbini" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1536199307404-10f48e79b590?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chitwan Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why You Will Love 15-day Discover Nepal Tour with Ghandruk Trek ?
- **Diverse Experiences:** A perfect blend of nature, culture, and history from Kathmandu's ancient temples to the serene beauty of Pokhara and wildlife adventures in Chitwan.
- **Birthplace of Buddha:** Immerse yourself in the peaceful ambiance of Lumbini, the sacred birthplace of Lord Buddha.
- **Scenic Drives & Treks:** Drive through stunning landscapes and trek to Ghandruk, a charming village with breathtaking views of the Annapurna range.
- **Wildlife & Adventure:** Thrill of a jeep or elephant safari, canoe rides on the Rapti River, and bird-watching in Asia’s best-preserved national park.
- **Cultural Immersion:** Witness traditional Tharu cultural programs, explore historic Ranighat Palace, and enjoy a Nepali dinner with a live cultural show.
- **Optional Flight Choices:** Save time with optional flights between Pokhara and Kathmandu.
- **Unforgettable Memories:** Each destination leaves a lasting impression, making it an unforgettable journey through Nepal.`,
    highlights: [
      'Trek to the picturesque Gurung village of Ghandruk for stunning views of the Annapurna range',
      'Discover the peaceful birthplace of Lord Buddha during a guided tour of Lumbini',
      'Enjoy exhilarating wildlife safaris and canoe rides in Chitwan National Park',
      'Explore the ancient palaces and temples of Kathmandu Valley',
      'Wander the historical streets of Tansen and visit the stunning Ranighat Palace'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Chitwan[altitude 415m/1361ft]', desc: 'Scenic drive along Trishuli and Narayani rivers to reach Chitwan.' },
      { day: 'Day 3', title: 'Chitwan', desc: 'Explore Chitwan National Park: Tharu village tour, cultural program, elephant/jeep safari, and more.' },
      { day: 'Day 4', title: 'Chitwan-Lumbini[altitude 150m/492ft]', desc: 'Drive to Lumbini, the birthplace of Lord Buddha. Guided tour of the sacred site.' },
      { day: 'Day 5', title: 'Lumbini-Tansen[altitude 1350m/4430ft]', desc: 'Drive to Tansen. Visit the historic Ranighat Palace and explore the ancient town.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Full day to explore Tansen and its surroundings.' },
      { day: 'Day 7', title: 'Tansen-Pokhara[altitude 830m/2723ft]', desc: 'Travel to Pokhara. Sightseeing at Bindabasini Temple, Davis Fall, Gupteswor Cave, and Seti Gorge.' },
      { day: 'Day 8', title: 'Pokhara-Tolka [Altitude 1700/5578ft]', desc: 'Begin your trek from Phedi and trek up to Tolka.' },
      { day: 'Day 9', title: 'Tolka–Ghandruk[Altitude 1940m/6365ft]', desc: 'Trek from Tolka to the picturesque village of Ghandruk, offering stunning Himalayan views.' },
      { day: 'Day 10', title: 'Ghandruk-Nayapul-Pokhara', desc: 'Descend to Nayapul and drive back to Pokhara.' },
      { day: 'Day 11', title: 'Pokhara-Kathmandu', desc: 'Drive or take an optional flight back to Kathmandu.' },
      { day: 'Day 12', title: 'Kathmandu', desc: 'Explore Boudhanath Stupa, Pashupatinath Temple, Bhaktapur Durbar Square, and more.' },
      { day: 'Day 13', title: 'Kathmandu', desc: 'Visit Patan Durbar Square, Swayambhunath Stupa, and Kathmandu Durbar Square.' },
      { day: 'Day 14', title: 'Kathmandu', desc: 'Tour Dakshinkali, Chobhar, Pharping, and Kirtipur. Traditional Nepali farewell dinner.' },
      { day: 'Day 15', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara & Lumbini city tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'All applicable monument entrance fees',
      'Trekking guide, Porter',
      'TIMS & ACAP permit',
      'First Aid Kit',
      'Trekking bag',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels/lodge',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      '5 Nights The Soaltee Kathmandu or similar in Kathmandu for Luxury tier',
      '2 Nights Jungle Villa resort(Safari Villa) or similar in Chitwan',
      '1 Night Buddha Maya Garden or similar in Lumbini',
      '2 Nights Hotel Shreenagar or similar in Tansen',
      '2 Nights Sarangkot Mountain Lodge or similar in Pokhara',
      '2 Nights at best available lodge during the Trekking'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 15 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-16d': {
    quickInfo: [
      { label: 'Duration', value: '16 Days 15 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Sep-Nov & Mar-May', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Join our 16-day Discover Nepal Tour and experience the beauty and culture of this amazing country. Start your journey in Kathmandu, the bustling capital, and travel to the charming town of Bandipur, known for its stunning views and rich heritage. From Bandipur, continue to Pokhara, where you will stay for three nights. Enjoy the serene lakes, breathtaking mountain views, and vibrant local culture in this picturesque city.

Next, travel to Tansen for a two-night stay, exploring its unique architecture and historical significance. After Tansen, head to Lumbini, the peaceful birthplace of Lord Buddha, for a one-night stay. Immerse yourself in the spiritual ambiance of this sacred site.

Continue your journey to Chitwan, where you will stay for three nights. Experience the excitement of wildlife safaris and discover the rich biodiversity of Chitwan National Park, home to rhinos, elephants, and numerous bird species. After your adventure in Chitwan, travel to Dhulikhel for a one-night stay, enjoying its scenic landscapes and panoramic views of the Himalayas.

Return to Kathmandu to conclude your tour with two full days of sightseeing in the Kathmandu Valley. Explore the rich cultural heritage, ancient temples, and vibrant markets. Visit iconic sites such as Swayambhunath (Monkey Temple), Boudhanath Stupa, and Durbar Square.

This 16-day tour provides a perfect blend of cultural exploration, natural beauty, and thrilling adventures, making it an ideal choice for travelers seeking an enriching and unforgettable journey through Nepal. Discover the wonders of Nepal and create memories that will last a lifetime.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cultural Exploration" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://images.unsplash.com/photo-1545917633-ea973917d3f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Himalayan Sunrises" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://plus.unsplash.com/premium_photo-1661963741928-673ed7f7c00b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Serene Temples" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love this trip?
- **Diverse Experiences:** A perfect blend of cultural exploration, natural beauty, and adventure.
- **Stunning Scenery:** Breathtaking mountain views in Pokhara and panoramic landscapes of Dhulikhel.
- **Cultural Immersion:** Connect with Nepalese traditions in culturally rich towns like Bandipur, Tansen, and Lumbini.
- **Wildlife Adventure:** A three-night stay in Chitwan provides an exciting opportunity for wildlife safaris.
- **Spiritual Significance:** Reflect at Lumbini, the peaceful birthplace of Lord Buddha.
- **Comprehensive Kathmandu Tour:** Two full days exploring Kathmandu Valley's ancient temples and vibrant markets.
- **Relaxation and Adventure:** A balanced mix of relaxation and adventure, catering to various interests.`,
    highlights: [
      'Experience the thrill of wildlife safaris over a three-night stay in Chitwan National Park',
      'Discover inner peace at Lumbini, the sacred birthplace of Lord Buddha',
      'Wander the charming streets of Bandipur and explore the historical architecture of Tansen',
      'Take in panoramic Himalayan views from the serene hill station of Dhulikhel',
      'Enjoy the serene lakes and majestic mountain backdrops during your stay in Pokhara'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]', desc: 'Travel to the charming town of Bandipur, known for its stunning views and rich heritage.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Continue to Pokhara, the city of lakes, where you will stay for three nights.' },
      { day: 'Day 4', title: 'Pokhara', desc: 'Enjoy the serene lakes, breathtaking mountain views, and vibrant local culture.' },
      { day: 'Day 5', title: 'Pokhara', desc: 'Explore more of Pokhara. Sarangkot Sunrise tour with a local guide.' },
      { day: 'Day 6', title: 'Pokhara-Tansen[altitude 1350m/4430ft]', desc: 'Travel to Tansen for a two-night stay. Explore its unique architecture.' },
      { day: 'Day 7', title: 'Tansen', desc: 'Full day to explore the historical significance of Tansen.' },
      { day: 'Day 8', title: 'Tansen-Lumbini[altitude 150m/492ft]', desc: 'Head to Lumbini, the peaceful birthplace of Lord Buddha, for a spiritual visit.' },
      { day: 'Day 9', title: 'Lumbini-Chitwan[altitude 415m/1361ft]', desc: 'Continue your journey to Chitwan for a three-night stay.' },
      { day: 'Day 10', title: 'Chitwan', desc: 'Experience the excitement of wildlife safaris and discover the rich biodiversity.' },
      { day: 'Day 11', title: 'Chitwan', desc: 'Another day of adventure in Chitwan National Park, home to rhinos, elephants, and birds.' },
      { day: 'Day 12', title: 'Chitwan-Dhulikhel[1550m/5085ft]', desc: 'Travel to Dhulikhel for a one-night stay, enjoying scenic landscapes and panoramic views.' },
      { day: 'Day 13', title: 'Dhulikhel-Kathmandu', desc: 'Return to Kathmandu.' },
      { day: 'Day 14', title: 'Kathmandu', desc: 'Full day sightseeing in Kathmandu Valley. Explore Swayambhunath, Boudhanath, and Durbar Square.' },
      { day: 'Day 15', title: 'Kathmandu', desc: 'Another day of cultural exploration, ancient temples, and vibrant markets.' },
      { day: 'Day 16', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      'All accommodation in the mention hotel'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 16 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'discover-nepal-tour-tiger-tracking-bardia-16d': {
    quickInfo: [
      { label: 'Duration', value: '16 Days 15 Nights', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Max. Altitude', value: '1700m/5577ft', icon: 'Mountain' },
      { label: 'Best Season', value: 'Aug-Oct & Mar-June', icon: 'Sun' },
      { label: 'Group/Private', value: 'Private', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private Vehicle', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Embark on a 16-day Discover Nepal Tour and Tiger Tracking adventure, offering an unforgettable experience through Nepal's diverse landscapes and rich culture. Start your journey in Kathmandu, the vibrant capital, and travel to the charming hill town of Bandipur, where you can enjoy stunning views and local culture. Continue to Pokhara, renowned for its serene lakes and breathtaking mountain scenery. Next, explore the historic town of Tansen, a hidden gem with unique architecture and history.

From Tansen, head to Bardiya National Park, one of Nepal's best wildlife reserves. Spend four exciting days in Bardiya, tracking tigers and discovering other wildlife like rhinos, elephants, and various bird species. The park's diverse ecosystems offer an incredible opportunity for nature and wildlife enthusiasts. After your wildlife adventure, visit Lumbini, the peaceful birthplace of Lord Buddha, and immerse yourself in its spiritual ambiance.

Return to Kathmandu to conclude your tour with two full days of sightseeing. Explore the rich cultural heritage, ancient temples, and vibrant markets of the city. Visit iconic sites such as Swayambhunath (Monkey Temple), Boudhanath Stupa, and Durbar Square. This tour provides a perfect blend of cultural exploration, natural beauty, and thrilling wildlife experiences, making it an ideal choice for travelers seeking adventure and immersion in Nepal's unique traditions.

Whether you're tracking tigers in Bardiya or exploring the historical sites of Kathmandu, this 16-day tour promises an enriching and unforgettable journey through Nepal.

<div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/TigerBardia-1200x560_20201027200017.jpg" alt="Tiger Tracking" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYif5ULV0SfS-KOOG0IOCXiotYqbk8Adj4Rg&s" alt="Bardia Wildlife" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://tigerencounter.com/wp-content/uploads/2026/01/Tiger-Cubs-in-Bardia-A-Rare-Sighting-That-Shows-Conservation-Is-Working.jpg" alt="Tiger Cubs" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### Why you'll love this trip?
- **Varied Experiences:** A mix of cultural exploration, wildlife adventure, and natural beauty.
- **Scenic Landscapes:** Witness diverse landscapes from serene lakes to lush forests.
- **Wildlife Adventure:** Bardiya National Park is a highlight for nature lovers. Track tigers, rhinos, elephants, and various bird species.
- **Cultural Immersion:** Discover culturally rich towns like Bandipur and Tansen, exploring traditions and history.
- **Spiritual Significance:** Visit Lumbini, the birthplace of Lord Buddha, for a profound spiritual experience.
- **Comprehensive Kathmandu Tour:** Two full days exploring Kathmandu's rich heritage, historical sites, and vibrant markets.`,
    highlights: [
      'Track majestic tigers and other wildlife over a four-day adventure in Bardiya National Park',
      'Discover inner peace at Lumbini, the sacred birthplace of Lord Buddha',
      'Wander the charming streets of Bandipur and explore the historical architecture of Tansen',
      'Enjoy the serene lakes and breathtaking mountain scenery during your stay in Pokhara',
      'Immerse yourself in the rich cultural heritage and ancient temples of the Kathmandu Valley'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kathmandu[altitude 1400m/4595ft]', desc: 'Arrival at Tribhuvan International Airport. Greeted by a representative and transferred to your hotel. Accommodation: Hotel [1 Night].' },
      { day: 'Day 2', title: 'Kathmandu-Bandipur [Altitude 1030m/3380ft]', desc: 'Travel to the charming hill town of Bandipur, where you can enjoy stunning views and local culture.' },
      { day: 'Day 3', title: 'Bandipur-Pokhara[altitude 830m/2723ft]', desc: 'Continue to Pokhara, renowned for its serene lakes and breathtaking mountain scenery.' },
      { day: 'Day 4', title: 'Pokhara', desc: 'Enjoy sightseeing around the beautiful city of lakes.' },
      { day: 'Day 5', title: 'Pokhara-Tansen[altitude 1350m/4430ft]', desc: 'Explore the historic town of Tansen, a hidden gem with unique architecture and history.' },
      { day: 'Day 6', title: 'Tansen', desc: 'Full day to explore Tansen and its surroundings.' },
      { day: 'Day 7', title: 'Tansen- Bardia [Altitude300m/984ft]', desc: 'Head to Bardiya National Park, one of Nepal\'s best wildlife reserves.' },
      { day: 'Day 8', title: 'Bardia', desc: 'First day of tracking tigers and discovering other wildlife in Bardiya.' },
      { day: 'Day 9', title: 'Bardia', desc: 'Second day of wildlife adventure in Bardiya National Park.' },
      { day: 'Day 10', title: 'Bardia', desc: 'Third day exploring the diverse ecosystems of Bardiya.' },
      { day: 'Day 11', title: 'Bardia', desc: 'Final day of your exciting wildlife adventure in Bardiya.' },
      { day: 'Day 12', title: 'Bardia-Lumbini[Altitude165m/492ft]', desc: 'Travel to Lumbini, the peaceful birthplace of Lord Buddha.' },
      { day: 'Day 13', title: 'Lumbini-Kathmandu', desc: 'Return to Kathmandu.' },
      { day: 'Day 14', title: 'Kathmandu', desc: 'Full day sightseeing in Kathmandu. Explore Swayambhunath, Boudhanath, and Durbar Square.' },
      { day: 'Day 15', title: 'Kathmandu', desc: 'Another day of cultural exploration and vibrant markets in Kathmandu.' },
      { day: 'Day 16', title: 'Depart from Kathmandu', desc: 'Departure transfer to the International Airport.' }
    ],
    inclusions: [
      'Airport pick up & drop by comfortable private air-conditional vehicle',
      'All tours & transfer as per the given itinerary by comfortable private air-conditional vehicle',
      'Sightseeing tours in Kathmandu with an English speaking trained, professional guide',
      'Pokhara city tour and Sarangkot Sunrise tour with an English speaking local guide',
      'Naturalist guide, program as mention in itinerary and entrance fees in Chitwan',
      'Lumbini guided tour with an English speaking local guide',
      'All applicable monument entrance fees',
      'All government and local taxes',
      'Daily buffet breakfast in all hotels',
      'Daily Buffet breakfast, lunch & dinner in Chitwan',
      'All accommodation in the mention hotel'
    ],
    exclusions: [
      'Nepal Visa fees & International airfare',
      'Tips for driver & guide [It is not compulsory but recommended]',
      'Meals [Lunch & dinner: US$ 10-20 per lunch/dinner]',
      'Personal expenses such as insurance, medical charges, laundry, shopping, liquor etc',
      'Cost arising by flight cancellation/road blockades/landslides/emergency evacuation and reasons beyond our control'
    ],
    epe: [
      { category: 'Luxury', cost: 'US$ 60-70 Per person/night' },
      { category: 'Comfort', cost: 'US$ 50-60 Per person/night' },
      { category: 'Standard', cost: 'US$ 40-50 Per person/night' },
      { category: 'Budget', cost: 'US$ 30-40 Per person/night' }
    ],
    tripCost: [
      { category: 'Luxury', pax1: 'US$ 2150', pax2: 'US$ 1440', pax3_5: 'US$ 1295' },
      { category: 'Comfort', pax1: 'US$ 1775', pax2: 'US$ 1190', pax3_5: 'US$ 1050' },
      { category: 'Standard', pax1: 'US$ 1545', pax2: 'US$ 1070', pax3_5: 'US$ 940' },
      { category: 'Budget', pax1: 'US$ 1490', pax2: 'US$ 1020', pax3_5: 'US$ 890' }
    ],
    information: `**VISA**
All visitors (except Indian nationals) must have a valid passport and visa to enter Nepal. Visas are available at Nepalese embassies/consulates or entry points. To avoid queues, complete the online visa form within 10 days of your arrival date. 

**VISA FEES**
15 Days: 30 US$ | 30 Days: 50 US$ | 90 Days: 125 US$

**PASSPORT AND VISAS:**
You must have a valid passport (valid for at least six months beyond your trip).

**TIPPING**
Tips are appreciated by your support team after the trip. Tips are not mandatory in Nepal but recommended. Our suggestion is US$ 5 per day to driver & US$ 10 per day to guide.

**BOOKING CONDITIONS**
Your booking will be confirmed via email after a 40% deposit of the total trip cost is made. The remaining 60% is payable upon arrival in Kathmandu.

**CANCELATION**
20% if canceled up to 30 days before the trip. 30% if canceled 15-29 days before. 60% if canceled 7-14 days before. 90% if canceled 6 or fewer days before.`,
    whyBookWithUs: [
      'TripAdvisor Recommended',
      'We are local tour operator',
      '99% satisfied customers',
      'Prompt response',
      '100% Instant booking confirmation',
      'Secure online payment gateway without extra charges',
      'Personal care',
      '24 hrs & 7 weeks available in email & Viber/WhatsApp',
      '5+ years of experienced in tour & trekking operation',
      'All insured vehicle we use in our tour',
      'All insured trekking guide & porter',
      'Government certified guide',
      'Trustworthy travel agency',
      'Unbeatable value for money',
      'Tailor made itinerary as per clients interest'
    ],
    valueAdded: [
      'Welcome Arrival Garlands/Khada(traditional scarf)',
      '02 Units of 500ml water bottles per day per person',
      '01 Complimentary Nepali dinner with typical Nepal cultural dance',
      'Local SIM Card with unlimited data for 16 days',
      '24 hrs WhatsApp help desk for any problem'
    ]
  },
  'nature-heals-package-3d': {
    quickInfo: [
      { label: 'Duration', value: '3 Days', icon: 'Calendar' },
      { label: 'Country', value: 'Nepal', icon: 'Flag' },
      { label: 'Group/Private', value: 'Private/Group', icon: 'Users' },
      { label: 'Grade', value: 'Easy', icon: 'BarChart' },
      { label: 'Transportation', value: 'Private', icon: 'Car' },
      { label: 'Start', value: 'Kathmandu', icon: 'MapPin' },
      { label: 'End', value: 'Kathmandu', icon: 'MapPin' }
    ],
    overview: `Nestled in the serene natural beauty of Nepal, the 3 Days Nature Heals Package is a transformative wellness retreat designed to rejuvenate the body, calm the mind, and uplift the spirit. This holistic healing experience is ideal for those seeking deep restoration through the ancient wisdom of Ayurveda, yoga, meditation, and sound healing, all within the nurturing embrace of nature. Surrounded by lush forests and peaceful mountain views, the retreat offers a rare opportunity to disconnect from stress and reconnect with your inner self. The package integrates traditional Ayurvedic therapies such as Abhyanga, Shirodhara, Nasya, and Kati Basti, which are tailored to individual body types (Prakriti) after a personal consultation with an experienced Ayurvedic doctor. These therapies use medicated oils and natural ingredients to promote detoxification, improve circulation, and restore balance to the doshas.

The retreat begins with a personalized wellness consultation, where guests are guided through their medical history, lifestyle, and current health conditions to craft a healing plan suited to their specific needs. The program is enriched with guided yoga and pranayama sessions that focus on breath control, mindfulness, and gentle movement to enhance mental clarity and physical strength. Each day starts with an early Brahma Muhurta wake-up, aligning participants with the most spiritually potent time of the day. Early mornings involve conscious observation of the surrounding forest, bird songs, and the morning sky, cultivating a deep sense of presence and peace.

One of the highlights of this wellness retreat is forest bathing, known as Shinrin-yoku, which encourages mindful immersion in nature to reduce stress and anxiety while boosting immunity. Guests also enjoy sound healing therapy using Tibetan singing bowls and calming frequencies that work on a vibrational level to release emotional blockages and promote energy flow. The retreat is further supported by a sattvic diet—pure, nourishing vegetarian meals prepared with organic and Ayurvedically appropriate ingredients. These meals help improve digestion, increase vitality, and support mental clarity throughout the healing process.

Additional practices such as mindful walking, herbal sauna sessions, and evening campfires provide moments of introspection and grounding. The combination of these healing modalities not only relieves physical discomfort but also promotes a profound sense of emotional and spiritual balance. Whether you're battling burnout, recovering from illness, or simply looking for a peaceful reset, this Ayurveda and nature healing retreat in Nepal offers an ideal sanctuary.

With personalized care, natural therapies, and the soothing rhythm of nature, the 3 Days Nature Heals Retreat is more than just a short getaway—it’s a path to total well-being. For anyone searching for a wellness retreat in Nepal that integrates tradition, tranquility, and transformation, this carefully curated package is a powerful step toward holistic healing.

<div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://ayurveda.com.np/wp-content/uploads/2022/10/SZ.jpg" alt="Ayurvedic Therapy" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <div class="w-full h-48 md:h-64 overflow-hidden rounded-2xl shadow-md">
    <img src="https://ayurveda.com.np/wp-content/uploads/2024/03/thumb-video.jpg" alt="Wellness Retreat" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
</div>

### 🌺 Why Choose Our Nature Heals Package?
- **Expert Care:** Expert Ayurvedic doctors and therapists.
- **Certified Instruction:** Certified yoga and meditation instructors.
- **Perfect Setting:** Peaceful natural location ideal for forest bathing.
- **Nourishing Food:** Sattvic meals prepared with organic ingredients.
- **Customized Experience:** Tailored programs for physical, emotional, and spiritual well-being.`,
    highlights: [
      'Personalized Ayurveda doctor consultation to determine your body type and craft a healing plan',
      'Traditional Ayurvedic therapies including Abhyanga, Shirodhara, Nasya, and Kati Basti',
      'Daily guided yoga and pranayama sessions for breath control, mindfulness, and physical strength',
      'Shinrin-yoku (forest bathing) and sound healing therapy with Tibetan singing bowls',
      'Nourishing, pure sattvic vegetarian meals to support digestion and vitality'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival and Personalized Wellness Planning', desc: '• 2:00 PM: Arrival/Welcome drink. Check in/Light Snacks.\n• 3:00 PM - 4:00 PM: Ayurveda doctor consultation - Meditation - Medical History/Knowing your body type (Prakriti) / Lifestyle advice / Therapy plans.\n• 4:00 PM - 5:00 PM: Ayurvedic Abhyanga. Special Ayurvedic whole body massage with specially made medicated ayurvedic oil.\n• 5:30 PM - 6:30 PM: Personalized Yoga Session. Sharing your yoga and pranayama experience. Yoga session / Pranayama / Yoga ashan / Dhyan Relaxation.\n• 7:00 PM - 8:00 PM: Ayurveda Sattvic Dinner.' },
      { day: 'Day 2', title: 'Wellness and Healing Continuation', desc: 'Detailed itinerary for Day 2 to be updated soon.' },
      { day: 'Day 3', title: 'Final Therapies and Departure', desc: 'Detailed itinerary for Day 3 to be updated soon.' }
    ],
    inclusions: [
      'Expert Ayurvedic doctor consultation',
      'Daily guided yoga and meditation sessions',
      'All prescribed Ayurvedic therapies (Abhyanga, etc.)',
      'Sattvic vegetarian meals (Breakfast, Lunch, Dinner)',
      'Accommodation in a peaceful natural setting',
      'Sound healing therapy sessions',
      'Forest bathing experiences'
    ],
    exclusions: [
      'Travel expenses to and from the retreat center',
      'Personal expenses (laundry, additional treatments, shopping)',
      'Tips and gratuities for therapists and staff'
    ],
    epe: [],
    information: `This retreat focuses on holistic healing. Guests are advised to wear comfortable, loose-fitting clothing suitable for yoga and meditation. Unplug from digital devices to fully immerse in the healing process.`,
    whyBookWithUs: [
      'Expert Ayurvedic doctors and therapists',
      'Certified yoga and meditation instructors',
      'Peaceful natural location ideal for forest bathing',
      'Sattvic meals prepared with organic ingredients',
      'Tailored programs for physical, emotional, and spiritual well-being'
    ],
    valueAdded: [
      'Personalized wellness consultation',
      'Sound healing therapy sessions',
      'Forest bathing experiences'
    ]
  },
  'nepal-poon-hill-12d': {
    gallery: ['/images/poon2.jpg', '/images/poon1.jpeg']
  }
};

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { packages: contextPackages } = useAppData();
  
  // Find package in context or in featuredPackages
  const basePkg = contextPackages.find(p => p.id === id) || contextPackages[0];
  
  // Merge extra details if they exist
  const lookupId = id === 'nepal-poon-hill-12d' ? 'nepal-tour-poon-hill-trek-12d' : id;
  const extraData = packageExtraData[lookupId] || {};
  const pkg = { ...basePkg, ...extraData };

  const [persons, setPersons] = useState(2);
  const [packageType, setPackageType] = useState('Budget');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Calculate dynamic price
  const calculatePrice = () => {
    if (!pkg.price) return null;
    // Extract base number from string like "US$1290"
    const match = pkg.price.match(/[\d,]+/);
    if (!match) return pkg.price;
    
    let baseTotal = parseInt(match[0].replace(/,/g, ''), 10);
    // Assume base total is for 2 persons on 'Budget' tier
    let basePerPerson = baseTotal / 2;
    
    let multiplier = 1;
    if (packageType === 'Standard') multiplier = 1.2;
    if (packageType === 'Comfort') multiplier = 1.4;
    if (packageType === 'Luxury') multiplier = 1.8;
    
    const finalPrice = Math.round(basePerPerson * persons * multiplier);
    return `US$${finalPrice}`;
  };

  const currentPrice = calculatePrice();

  const handleBookPackage = () => {
    navigate(`/checkout?pkg=${id}&travelers=${persons}&date=${date}`);
  };

  const handleQuickInquiry = () => {
    const message = `Hi! I have some questions about the ${pkg.title} package. Can you please help me?`;
    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-[#F4F6F8] min-h-screen">
      <SEO 
        title={`${pkg.title} | Nepal Tour Packages`}
        description={`Book the ${pkg.title} tour package with Zenex Travel. ${pkg.category || 'Adventure'} tour in Nepal starting at ${pkg.price || 'best price'}.`}
        canonicalUrl={`https://zenextravel.com/packages/${id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": pkg.title,
          "description": pkg.title + " Tour Package",
          "image": pkg.img,
          "provider": {
            "@type": "TravelAgency",
            "name": "Zenex Travel"
          }
        }}
      />
      {/* Hero Section (Clean Image Banner / Flex Accordion Gallery) */}
      <div className="relative h-[75vh] min-h-[550px] w-full overflow-hidden bg-gray-900 p-2 md:p-3">
        {(() => {
          const images = [];
          if (pkg.img) images.push(pkg.img);
          if (pkg.gallery && pkg.gallery.length > 0) {
            pkg.gallery.forEach(img => {
              if (!images.includes(img)) images.push(img);
            });
          }
          const displayImages = images.length > 0 ? images : ['/images/trek.png'];

          if (displayImages.length === 1) {
            return (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-85"
                style={{ backgroundImage: `url("${displayImages[0]}")` }}
              />
            );
          }

          if (displayImages.length === 2) {
            return (
              <div className="flex h-full w-full gap-2 md:gap-3 relative z-0">
                {displayImages.slice(0, 2).map((img, idx) => (
                  <div 
                    key={idx}
                    className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-1 hover:flex-[1.2] group"
                  >
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                      style={{ backgroundImage: `url("${img}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div className="flex h-full w-full gap-2 md:gap-3 relative z-0">
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[2] hover:flex-[2.5] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[1] hover:flex-[1.4] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[1] || displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
              <div className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-[1] hover:flex-[1.4] group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[2] || displayImages[0]}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })()}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10" />
      </div>

      {/* Package Header details below Hero */}
      <div className="bg-white border-b border-gray-150 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link to="/packages" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#e53a24] mb-4 text-xs font-bold uppercase tracking-wider transition-colors">
            <ArrowLeft size={14} /> Back to Packages
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight tracking-tight">{pkg.title}</h1>
          <TrustReviewBadges title={pkg.title} />
          
          <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-600">
            {pkg.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">{pkg.duration}</span>
              </div>
            )}
            {pkg.category && (
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">{pkg.category}</span>
              </div>
            )}
          </div>
          
          {pkg.desc && (
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-4xl font-medium mt-4">{pkg.desc}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Info Grid */}
            {pkg.quickInfo && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                  {pkg.quickInfo.map((info, idx) => {
                    const IconComponent = {
                      Calendar, Flag, Mountain, Sun, Users, BarChart, Car, MapPin
                    }[info.icon] || Info;
                    return (
                      <div key={idx} className="flex items-center">
                        <div className="w-12 h-12 rounded border border-gray-200 flex items-center justify-center shrink-0 mr-4">
                          <IconComponent className="text-gray-700" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 font-medium truncate">{info.label}</p>
                          <p className="text-[#1e3a8a] font-semibold text-sm leading-tight mt-0.5 break-words hyphens-auto">
                            {info.value.replace(/\//g, '/\u200B')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {pkg.gallery && pkg.gallery.length > 0 && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 mb-10">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6 flex items-center">Photo Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pkg.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img src={imgUrl} alt={`${pkg.title} Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            {pkg.overview && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Overview</h2>
                <div 
                  className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: pkg.overview.replace(/\n\n/g, '<br/><br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>') }}
                />
              </div>
            )}

            {/* Highlights, Inclusions & Exclusions */}
            {(pkg.highlights || pkg.inclusions || pkg.exclusions) && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                {pkg.highlights && (
                  <>
                    <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6">Package Highlights</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle2 className="text-[#e53a24] mr-3 shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-700 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {pkg.inclusions && (
                    <div>
                      <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center"><CheckCircle2 className="mr-2" size={20} /> What's Included</h3>
                      <ul className="space-y-3">
                        {pkg.inclusions.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <span className="text-green-500 mr-2 mt-0.5">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions && (
                    <div>
                      <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center"><span className="material-symbols-outlined mr-2">cancel</span> Not Included</h3>
                      <ul className="space-y-3">
                        {pkg.exclusions.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <span className="text-red-500 mr-2 mt-0.5">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {pkg.itinerary && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-8">Route Itinerary</h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {pkg.itinerary.map((step, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#e53a24] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <MapPin size={16} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-[#1e3a8a] text-lg mb-1">{step.day}: {step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trip Cost */}
            {pkg.tripCost && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6 flex items-center"><DollarSign className="mr-2" /> Trip Cost for 2026 and 2027</h2>
                <p className="text-gray-600 mb-6 text-sm font-medium">
                  Prices are listed per person (in US$).
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#1e3a8a] text-white">
                        <th className="p-4 font-bold">Package Category</th>
                        <th className="p-4 font-bold">1 Pax</th>
                        <th className="p-4 font-bold">2 Pax</th>
                        <th className="p-4 font-bold">3-5 Pax</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {pkg.tripCost.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-orange-50 transition-colors">
                          <td className="p-4 font-bold text-gray-900">{item.category}</td>
                          <td className="p-4 text-gray-700 font-medium">{item.pax1}</td>
                          <td className="p-4 text-gray-700 font-medium">{item.pax2}</td>
                          <td className="p-4 text-gray-700 font-medium">{item.pax3_5}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Estimated Personal Expenses */}
            {pkg.epe && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6 flex items-center"><DollarSign className="mr-2" /> Estimated Personal Expenses</h2>
                <p className="text-gray-600 mb-6 text-sm">
                  The daily expenses per person listed below are based on market estimates and can vary depending on hotels, shops, and restaurants you choose.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-700">
                        <th className="p-4 font-bold border-b border-gray-200 rounded-tl-xl">Package Category</th>
                        <th className="p-4 font-bold border-b border-gray-200 rounded-tr-xl">Lunch, Dinner & Water</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.epe.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">{item.category}</td>
                          <td className="p-4 text-gray-600">{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Information */}
            {pkg.information && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6 flex items-center"><Info className="mr-2" /> Essential Information</h2>
                <div 
                  className="prose prose-blue max-w-none text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: pkg.information.replace(/\n\n/g, '<br/><br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 block mt-4 mb-1">$1</strong>') }}
                />
              </div>
            )}

            {/* Why Book With Us */}
            {pkg.whyBookWithUs && (
              <div className="bg-[#1e3a8a] rounded-3xl p-8 md:p-10 shadow-lg text-white">
                <h2 className="text-2xl font-extrabold mb-6 flex items-center text-orange-400"><ThumbsUp className="mr-2" /> Why Book With Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {pkg.whyBookWithUs.map((reason, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle2 className="text-orange-400 mr-3 shrink-0 mt-0.5" size={20} />
                      <span className="font-medium text-blue-100">{reason}</span>
                    </div>
                  ))}
                </div>

                {pkg.valueAdded && (
                  <div className="mt-8 pt-8 border-t border-blue-800">
                    <h3 className="text-lg font-bold mb-4 text-white">Value Added Services</h3>
                    <ul className="space-y-3">
                      {pkg.valueAdded.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-blue-200">
                          <span className="text-orange-400 mr-2 mt-0.5">★</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Main Booking Card (Redesigned) */}
              <div className="bg-white border border-gray-100 p-7 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                
                {/* Header Area */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-5">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#0F766E] uppercase tracking-widest mb-1 block">Starting From</span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-black text-[#1e3a8a] tracking-tight">
                        {currentPrice ? currentPrice : 'TBA'}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#64748B] mt-1 font-bold uppercase tracking-wider">Per Person / All Inclusive</p>
                  </div>
                  
                  {/* Favorite Icon */}
                  <button className="group flex flex-col items-center focus:outline-none">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-gray-200 bg-gray-50 text-gray-400 group-hover:text-[#E59A2F] group-hover:border-[#E59A2F] transition-all duration-300">
                      <Heart size={18} fill="none" strokeWidth={2} className="group-hover:fill-current transition-colors" />
                    </div>
                    <span className="text-[9px] text-gray-500 font-bold mt-1.5 uppercase tracking-wider">Save</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Package Type */}
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-xs text-[#1e3a8a] uppercase tracking-wider mb-3">
                      Select Package Level
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['Budget', 'Comfort', 'Standard', 'Luxury'].map((type) => (
                        <label 
                          key={type} 
                          className={`flex items-center justify-center py-2 px-3 rounded-lg cursor-pointer text-xs font-bold transition-all duration-200 border ${
                            packageType === type 
                              ? 'border-[#0F766E] bg-[#0F766E] text-white shadow-sm' 
                              : 'border-gray-200 bg-white text-[#64748B] hover:border-[#0F766E] hover:text-[#0F766E]'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="package_type" 
                            className="hidden" 
                            checked={packageType === type}
                            onChange={() => setPackageType(type)}
                          /> 
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E] transition-all">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Date</span>
                      <div className="flex items-center justify-between">
                        <input 
                          type="date" 
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full text-sm font-semibold text-[#1e3a8a] bg-transparent outline-none cursor-pointer" 
                        />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center focus-within:border-[#0F766E] focus-within:ring-1 focus-within:ring-[#0F766E] transition-all">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Travelers</span>
                      <select 
                        value={persons}
                        onChange={(e) => setPersons(Number(e.target.value))}
                        className="w-full text-sm font-semibold text-[#1e3a8a] bg-transparent outline-none cursor-pointer appearance-none"
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 Persons</option>
                        <option value={3}>3 Persons</option>
                        <option value={4}>4 Persons</option>
                        <option value={5}>5+ Persons</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3 pt-2">
                    <button onClick={handleBookPackage} className="w-full flex justify-center bg-[#1e3a8a] text-white font-bold py-3.5 rounded-xl hover:bg-[#10224b] transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm">
                      BOOK THIS PACKAGE
                    </button>
                    <button onClick={handleQuickInquiry} className="w-full flex justify-center bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] font-bold py-3.5 rounded-xl hover:bg-[#F8FAFC] transition-colors uppercase tracking-wider text-sm">
                      MAKE AN INQUIRY
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageDetail;

