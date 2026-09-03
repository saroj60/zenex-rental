import React, { createContext, useContext, useState, useEffect } from 'react';
import { featuredPackages } from '../data/packagesData';
import { treksData } from '../data/treksData';

// In production (cPanel), VITE_API_URL points to the Render.com backend.
// In local dev, it's empty so Vite proxy handles /api/* → localhost:5000.
const API_BASE = import.meta.env.VITE_API_URL || '';


const AppDataContext = createContext();

const initialVehicles = [
  { id: 1, name: 'Toyota Corolla', type: 'Sedan', price: 3500, priceWithDriver: 5000, img: '/images/economy_car.png', seats: 4, trans: 'Automatic', fuel: 'Petrol', luggage: 2, rating: 4.8, seoTitle: 'Rent Toyota Corolla Sedan in Kathmandu - Zenex Travel', seoDescription: 'Premium Toyota Corolla sedan rental in Kathmandu. Perfect for city tours, airport transfers, and business trips. Fully insured with professional drivers available.' },
  { id: 2, name: 'Hyundai Creta', type: 'SUV / 4x4', price: 5500, priceWithDriver: 7500, img: '/images/suv_car.png', seats: 5, trans: 'Manual', fuel: 'Diesel', luggage: 3, rating: 4.9, seoTitle: 'Hire Hyundai Creta SUV in Nepal - Best for Chitwan Safari', seoDescription: 'Premium Hyundai Creta SUV rental in Kathmandu. Perfect for jungle safaris, mountain drives, and family tours. Fully insured, experienced drivers.' },
  { id: 4, name: 'Toyota Hiace', type: 'Van / Micro', price: 9000, priceWithDriver: 12000, img: 'https://www.toyota.com.sg/showroom/new-models/-/media/27acd1d10dfc4ad29f13efd4415627c0.jpg', seats: 14, trans: 'Manual', fuel: 'Diesel', luggage: 6, rating: 4.7, seoTitle: 'Rent Toyota Hiace Minibus in Kathmandu - 13 Seater Zenex Travel', seoDescription: 'Spacious Toyota Hiace Minibus rental for group tours and family trips in Nepal. Comfortable seating for up to 14 passengers. Experienced drivers included.' },
  { id: 5, name: 'Mahindra Scorpio', type: 'SUV / 4x4', price: 8000, priceWithDriver: 10000, img: 'https://cdn.zeebiz.com/sites/default/files/2022/06/28/187652-mahindra-scorpio-n-6.jpg', seats: 7, trans: 'Manual', fuel: 'Diesel', luggage: 4, rating: 4.9, seoTitle: 'Rent Mahindra Scorpio in Nepal - Zenex Travels', seoDescription: 'Hire Mahindra Scorpio 4x4 SUV with driver. Perfect for offroad tours to Mustang, Muktinath, and Rara Lake.' },
  { id: 6, name: 'Standard Car', type: 'Sedan', price: 5500, priceWithDriver: 7000, img: 'https://nissan-nepal.com/assets/images/product/nissan-new-car.jpg', seats: 4, trans: 'Manual', fuel: 'Petrol', luggage: 2, rating: 4.8, seoTitle: 'Rent Standard Car in Kathmandu - Zenex Travels', seoDescription: 'Hire standard Nissan or other sedan/hatchback cars for comfortable city tours and inter-city travels in Nepal.' },
  { id: 7, name: 'Tourist Bus', type: 'Minibus', price: 15000, priceWithDriver: 18000, img: 'https://tourpokhara.com/wp-content/uploads/2023/09/Tourist-bus.jpg', seats: 35, trans: 'Manual', fuel: 'Diesel', luggage: 15, rating: 4.9, seoTitle: 'Rent Tourist Bus in Nepal - Zenex Travels', seoDescription: 'Rent comfortable 30-35 seater tourist bus for group sightseeing tours across Pokhara, Chitwan, and Lumbini.' },
  { id: 8, name: 'Toyota Coaster', type: 'Minibus', price: 12000, priceWithDriver: 15000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTmOTRvXlpRu1DFUtFy-oRCbC0EZtbBoNC490O4k9-g&s=10', seats: 22, trans: 'Manual', fuel: 'Diesel', luggage: 8, rating: 4.8, seoTitle: 'Rent Toyota Coaster in Kathmandu - Zenex Travels', seoDescription: 'Spacious 22-seater Toyota Coaster rental with professional driver. Best for medium-sized group tours in Nepal.' },
  { id: 9, name: 'Wedding Cars', type: 'Luxury', price: 8000, priceWithDriver: 12000, img: '/vehicles/wedding car.avif', seats: 4, trans: 'Automatic', fuel: 'Petrol', luggage: 2, rating: 5.0, seoTitle: 'Luxury Wedding Car Rental in Kathmandu - Zenex Travels', seoDescription: 'Premium luxury cars for wedding events. Hire decorated vintage, luxury, or modern cars for your special day in Nepal.' },
  { id: 10, name: 'Self Drive Cars', type: 'Economy', price: 5000, priceWithDriver: 5000, img: '/vehicles/self drive.jpg', seats: 5, trans: 'Manual', fuel: 'Petrol', luggage: 3, rating: 4.7, seoTitle: 'Self Drive Car Rental in Kathmandu - Zenex Travels', seoDescription: 'Rent cars for self-driving in Nepal. Flexible daily, weekly, and monthly rates. Drive your own adventure.' }
];
import kathmanduImg from '../assets/kathmandu valley.jpg';

const initialDestinations = [
  { 
    id: 'kathmandu', 
    name: 'Kathmandu Valley', 
    region: 'Valley', 
    desc: 'History, Culture & Temples', 
    img: '/images/ktm-home.jpg', 
    span: 'md:col-span-2 md:row-span-2', 
    bestTime: 'Sep - Nov, Feb - Apr', 
    terrain: 'Paved / City Roads', 
    vehicles: ['Economy', 'Compact SUV', 'Luxury Sedan'],
    extendedOverview: `
      <h3>The Cultural Heart of Nepal</h3>
      <p>Kathmandu is more than just the capital of Nepal; it is a sensory explosion of vibrant colors, ancient traditions, and breathtaking architecture. Serving as the primary gateway for almost all international travelers, the Kathmandu Valley is a UNESCO World Heritage site densely packed with historic durbar squares, intricate Hindu temples, and massive Buddhist stupas.</p>
      <p>Whether you are wandering through the bustling, narrow alleys of Thamel, spinning prayer wheels at the iconic Swayambhunath (Monkey Temple), or witnessing the sacred rituals at Pashupatinath, Kathmandu offers a deeply immersive cultural experience. The valley comprises three major ancient cities: Kathmandu, Patan (Lalitpur), and Bhaktapur, each boasting its own unique heritage and magnificent palace squares.</p>
      <p>For travelers planning their Nepal itinerary, spending at least 2 to 3 days exploring Kathmandu is essential. The city provides a perfect blend of ancient history and modern chaos, making it an unforgettable introduction to the Himalayas.</p>
    `,
    getThere: {
      flight: "Tribhuvan International Airport (KTM) is the only international airport. Numerous domestic flights connect KTM to Pokhara, Chitwan, and Everest (Lukla).",
      bus: "Tourist buses depart daily from Kantipath to Pokhara (7-8 hours) and Chitwan (6-7 hours).",
      carRental: "The most comfortable way to travel out of Kathmandu. Hiring a private SUV or Sedan with a driver from Zenex Travel allows you to stop at scenic viewpoints along the Prithvi Highway."
    },
    stayOptions: {
      luxury: "Dwarika's Hotel, Marriott Kathmandu, Hyatt Regency (Prices: $150 - $400+/night)",
      midRange: "Aloft Thamel, Hotel Shanker, Kantipur Temple House (Prices: $50 - $120/night)",
      budget: "Zostel Kathmandu, Elbrus Home, numerous Thamel guesthouses (Prices: $10 - $30/night)"
    },
    transportTips: "Inside the city, Pathao or InDrive (ride-sharing apps) are excellent for cheap scooter and taxi rides. For full-day sightseeing, renting a private car with a driver is highly recommended to avoid negotiating with local taxis.",
    safetyInfo: "Kathmandu is generally very safe. Watch out for pickpockets in crowded areas like Thamel and Durbar Square. Tap water is not safe to drink; always use bottled or purified water. Air pollution can be heavy in winter, so wearing a mask in traffic is advised.",
    budget: {
      daily: "$30 - $50 for budget travelers, $80 - $150 for mid-range, $200+ for luxury.",
      food: "A local Dal Bhat costs $3-$5, while dining at a nice tourist restaurant in Thamel will cost $10-$20."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '15°C - 30°C', condition: 'Warm, blooming flowers, dusty.' },
      { season: 'Summer/Monsoon (Jun-Aug)', temp: '20°C - 30°C', condition: 'Heavy rain, lush green, humid.' },
      { season: 'Autumn (Sep-Nov)', temp: '10°C - 25°C', condition: 'Clear skies, perfect visibility, pleasant.' },
      { season: 'Winter (Dec-Feb)', temp: '2°C - 18°C', condition: 'Cold mornings/nights, sunny days, no snow.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1529733905113-027ed85d7e33?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  },
  { 
    id: 'pokhara', 
    name: 'Pokhara', 
    region: 'Valley', 
    desc: 'Lakes & Mountains', 
    img: '/images/destinations/pokhara.png', 
    span: 'md:col-span-1 md:row-span-1', 
    bestTime: 'Sep - Nov, Feb - May', 
    terrain: 'Paved / Highways', 
    vehicles: ['SUV', 'Economy', 'Van'],
    extendedOverview: `
      <h3>The Adventure Capital of Nepal</h3>
      <p>Nestled beside the tranquil waters of Phewa Lake and shadowed by the majestic Annapurna mountain range, Pokhara is the undisputed tourist capital of Nepal. Unlike the chaotic charm of Kathmandu, Pokhara offers a laid-back, serene environment that serves as the perfect starting and ending point for famous treks like the Annapurna Base Camp and Poon Hill.</p>
      <p>Pokhara is paradise for adventure seekers. It is one of the top destinations globally for paragliding, offering tandem flights with breathtaking views of Machhapuchhre (Fishtail mountain). Visitors can also enjoy boating, zip-lining, ultra-light flights, and exploring numerous limestone caves.</p>
      <p>Lakeside Pokhara is famous for its vibrant nightlife, excellent restaurants, and relaxing spas. Whether you want to sip coffee while watching the sunrise at Sarangkot or hike to the World Peace Pagoda, Pokhara guarantees a memorable Himalayan experience.</p>
    `,
    getThere: {
      flight: "A scenic 25-minute flight from Kathmandu to Pokhara International Airport. Highly recommended during the monsoon.",
      bus: "Tourist buses take about 7-8 hours from Kathmandu. Roads are currently under expansion.",
      carRental: "A private vehicle rental gives you the flexibility to stop at the Manakamana Cable Car or go white-water rafting on the Trishuli river along the way."
    },
    stayOptions: {
      luxury: "The Pavilions Himalayas, Temple Tree Resort, Fish Tail Lodge (Prices: $120 - $350+/night)",
      midRange: "Hotel Middle Path, Mount Kailash Resort, WaterFront Resort (Prices: $40 - $100/night)",
      budget: "Zostel Pokhara, Kiwi Backpackers, numerous Lakeside guesthouses (Prices: $10 - $25/night)"
    },
    transportTips: "Lakeside is easily walkable. For visiting Sarangkot or the Peace Pagoda, renting a scooter or hiring a private taxi is best. Local buses run along the main highway but can be crowded.",
    safetyInfo: "Pokhara is extremely safe for tourists, even walking around Lakeside at night. If renting a scooter, drive carefully as mountain roads have sharp turns. Always use life jackets when boating on Phewa Lake.",
    budget: {
      daily: "$25 - $40 for budget travelers, $60 - $120 for mid-range, $180+ for luxury.",
      food: "Lakeside restaurants are slightly cheaper than Kathmandu's Thamel. A good meal costs $6-$12."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '16°C - 31°C', condition: 'Warm, occasional haze, great for paragliding.' },
      { season: 'Summer/Monsoon (Jun-Aug)', temp: '22°C - 32°C', condition: 'Heavy rain, leeches on trails, lush green.' },
      { season: 'Autumn (Sep-Nov)', temp: '15°C - 28°C', condition: 'Clear mountain views, perfect trekking weather.' },
      { season: 'Winter (Dec-Feb)', temp: '7°C - 20°C', condition: 'Chilly mornings, warm days, clear views.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1562462181-b228e3cff9ad?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1718180555560-0c5f890f8098?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1654607351830-c00fda86b329?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  },
  { 
    id: 'mustang', 
    name: 'Mustang', 
    region: 'Himalayas', 
    desc: 'Desert Landscapes & Ancient Culture', 
    img: '/images/upper mustang.jpg', 
    span: 'md:col-span-1 md:row-span-1', 
    bestTime: 'May - October', 
    terrain: 'Off-road / Unpaved', 
    vehicles: ['4x4 Off-roader', 'Heavy-Duty SUV'],
    extendedOverview: `
      <h3>The Forbidden Kingdom</h3>
      <p>Mustang is a high-altitude desert known for its stark, moon-like landscapes, deep canyons, and ancient Tibetan culture. Once an isolated and independent kingdom, Upper Mustang was heavily restricted to foreigners until 1992, preserving its unique heritage, cave dwellings, and ancient monasteries.</p>
      <p>A journey to Mustang is an adventure of a lifetime. The landscape is dramatically different from the rest of Nepal, featuring wind-carved rock formations, barren cliffs, and the stunning backdrop of the Annapurna and Dhaulagiri mountain ranges.</p>
      <p>Whether you are embarking on the famous Upper Mustang trek, riding a motorbike through the Kali Gandaki gorge (the deepest gorge in the world), or hiring a rugged 4x4 for a jeep safari to Lo Manthang, Mustang offers a raw, spiritual, and visually spectacular experience.</p>
    `,
    getThere: {
      flight: "A thrilling 20-minute morning flight from Pokhara to Jomsom. Flights are highly weather-dependent.",
      bus: "Local buses run from Pokhara to Jomsom, but the journey is long, bumpy, and exhausting on unpaved roads.",
      carRental: "Renting a heavy-duty 4x4 SUV with an experienced driver is the best way to explore Mustang safely and comfortably."
    },
    stayOptions: {
      luxury: "Moksha Mustang, Shinta Mani Mustang (Prices: $300 - $1000+/night)",
      midRange: "Om's Home Jomsom, Hotel Grand Shambala (Prices: $50 - $120/night)",
      budget: "Teahouses and local guest houses along the trail (Prices: $10 - $20/night)"
    },
    transportTips: "Roads in Mustang are predominantly off-road dirt tracks. Only 4WD vehicles and dirt bikes are suitable. If trekking, walking between villages is the standard mode of transport.",
    safetyInfo: "Altitude sickness is a real risk; acclimatize properly. The region is extremely windy in the afternoons, causing dust storms—bring a buff and sunglasses. Upper Mustang requires a special restricted area permit ($500 for 10 days).",
    budget: {
      daily: "$40 - $60 for basic teahouse trekking, $150 - $300 for jeep tours, $500+ for luxury lodges.",
      food: "Meals in remote areas are slightly more expensive due to transport costs. Expect $5-$10 per meal."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '5°C - 20°C', condition: 'Clear, windy afternoons, pleasant.' },
      { season: 'Summer (Jun-Aug)', temp: '10°C - 22°C', condition: 'Monsoon shadow area, little rain, great for travel.' },
      { season: 'Autumn (Sep-Nov)', temp: '0°C - 18°C', condition: 'Crisp, clear skies, cold nights.' },
      { season: 'Winter (Dec-Feb)', temp: '-10°C - 5°C', condition: 'Freezing, heavy snow, many locals migrate lower.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1513614835783-51537729c8ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661963741928-673ed7f7c00b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1571330177234-54304dac2beb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603540154105-16a672d14f8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  },
  { 
    id: 'chitwan', 
    name: 'Chitwan', 
    region: 'Terai', 
    desc: 'Jungle Safaris & Wildlife', 
    img: 'https://images.unsplash.com/photo-1549888668-19281758dfbe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    span: 'md:col-span-1 md:row-span-1', 
    bestTime: 'Oct - Mar', 
    terrain: 'Highway / Light Dirt', 
    vehicles: ['SUV', 'Minibus', 'Pickup'],
    extendedOverview: `
      <h3>Wildlife Paradise</h3>
      <p>Chitwan National Park, a UNESCO World Heritage site, is Nepal's premier wildlife destination. Located in the subtropical inner Terai lowlands, it offers a stark contrast to the high Himalayas and provides a sanctuary for some of the world's most endangered species, including the elusive Bengal tiger and the greater one-horned rhinoceros.</p>
      <p>A typical visit to Chitwan involves deeply immersive jungle activities. Visitors can embark on thrilling jeep safaris deep into the dense Sal forests, glide quietly along the Rapti River in traditional dugout canoes to spot gharial crocodiles, and take guided jungle walks for an up-close experience with nature.</p>
      <p>Beyond the wildlife, Chitwan is rich in the indigenous Tharu culture. You can visit traditional Tharu villages, witness their vibrant stick dance performances, and enjoy the tranquil sunsets over the riverbanks. It is an essential addition to any Nepal itinerary for nature lovers.</p>
    `,
    getThere: {
      flight: "A 20-minute flight from Kathmandu to Bharatpur Airport, followed by a 45-minute drive to Sauraha (the main tourist hub).",
      bus: "Tourist buses run daily from Kathmandu (5-6 hours) and Pokhara (5-6 hours) directly to the Chitwan bus park.",
      carRental: "A private SUV rental offers the most comfort and allows you to make scenic stops along the Trisuli River."
    },
    stayOptions: {
      luxury: "Meghauli Serai, Barahi Jungle Lodge, Taj Safaris (Prices: $250 - $600+/night)",
      midRange: "Green Park Chitwan, Landmark Forest Park, Jungle Safari Lodge (Prices: $50 - $120/night)",
      budget: "Numerous guesthouses in Sauraha like Hotel Chitwan Park (Prices: $15 - $30/night)"
    },
    transportTips: "Sauraha is easily walkable. Bicycles are widely available for rent to explore the village outskirts. For park entry, you must book a jeep safari or a guided walking tour.",
    safetyInfo: "Never enter the national park without an official guide. Be cautious around wild elephants and rhinos. Mosquitoes can be prevalent, especially in the monsoon, so bring strong insect repellent. Tap water is unsafe to drink.",
    budget: {
      daily: "$30 - $50 for backpackers, $80 - $150 for mid-range (including safaris), $300+ for luxury lodges.",
      food: "Meals in Sauraha range from $4 for local dishes to $15 at higher-end resort restaurants."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '20°C - 35°C', condition: 'Hot, dry, best time for tiger sightings.' },
      { season: 'Summer/Monsoon (Jun-Aug)', temp: '25°C - 38°C', condition: 'Very hot, humid, heavy rains, park access limited.' },
      { season: 'Autumn (Sep-Nov)', temp: '15°C - 30°C', condition: 'Pleasant, clear skies, lush green jungle.' },
      { season: 'Winter (Dec-Feb)', temp: '8°C - 24°C', condition: 'Cold misty mornings, warm sunny afternoons.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1549888668-19281758dfbe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1534215782964-d58601aa091c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1751931817996-368c9ee352ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  },
  { 
    id: 'lumbini', 
    name: 'Lumbini', 
    region: 'Terai', 
    desc: 'Birthplace of Lord Buddha & Spiritual Hub', 
    img: 'https://images.unsplash.com/photo-1616166831462-48a3e9089c20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    span: 'md:col-span-1 md:row-span-1', 
    bestTime: 'Oct - Mar', 
    terrain: 'Paved / Highway', 
    vehicles: ['Economy', 'Sedan', 'Van'],
    extendedOverview: `
      <h3>The Birthplace of Lord Buddha</h3>
      <p>Lumbini, located in the Rupandehi District of Nepal, is one of the world's most important spiritual sites and a UNESCO World Heritage property. It is the exact location where Queen Maya Devi gave birth to Siddhartha Gautama (Lord Buddha) in 563 BCE.</p>
      <p>The Sacred Garden at the heart of Lumbini contains the Maya Devi Temple, the Ashoka Pillar erected by the Mauryan Emperor in 249 BC, and the sacred Pushkarini pond. Surrounding the Sacred Garden is a massive monastic zone where nations from across the globe—such as Thailand, China, Germany, and Myanmar—have built spectacular monasteries reflecting their own unique architectural styles.</p>
      <p>Lumbini is not just for Buddhists; it is a profound destination for anyone seeking peace, meditation, and historical significance. A typical visit involves exploring the sprawling complex by bicycle or rickshaw, and meditating under the ancient Bodhi trees.</p>
    `,
    getThere: {
      flight: "A 35-minute flight from Kathmandu to Gautam Buddha International Airport (Bhairahawa), located just 30 minutes from Lumbini.",
      bus: "Tourist and local buses operate daily from Kathmandu (8-10 hours) and Pokhara (7-9 hours).",
      carRental: "Hiring a private sedan or SUV is highly recommended for a comfortable, air-conditioned journey through the hot Terai plains."
    },
    stayOptions: {
      luxury: "Lumbini Hokke Hotel, Tiger Palace Resort (Bhairahawa), Hotel Kasai (Prices: $100 - $250/night)",
      midRange: "Buddha Maya Garden, Hotel Peaceland, Lumbini Village Lodge (Prices: $40 - $80/night)",
      budget: "Various backpacker guesthouses around the Lumbini Bazaar (Prices: $10 - $25/night)"
    },
    transportTips: "The Lumbini Master Plan area is enormous (4.8km long). The absolute best way to explore the monastic zone is by renting a bicycle ($2-$3 per day) or hiring a local electric rickshaw (tuk-tuk).",
    safetyInfo: "Lumbini is very safe, though petty theft can occur in crowded bus parks. The summer heat can be extreme (up to 40°C), so stay hydrated and avoid midday sun. Mosquitos are prevalent year-round.",
    budget: {
      daily: "$20 - $35 for budget travelers, $60 - $100 for mid-range, $150+ for luxury.",
      food: "Food inside the monastic zone is limited. The nearby Lumbini Bazaar offers cheap local meals ($3-$6)."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '25°C - 40°C', condition: 'Extremely hot and dry, requires sun protection.' },
      { season: 'Summer/Monsoon (Jun-Aug)', temp: '28°C - 38°C', condition: 'Heavy rain, very humid, lush green surroundings.' },
      { season: 'Autumn (Sep-Nov)', temp: '20°C - 32°C', condition: 'Pleasant, festivals, peak pilgrimage season.' },
      { season: 'Winter (Dec-Feb)', temp: '10°C - 24°C', condition: 'Cool mornings with heavy fog, sunny afternoons.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1616166831462-48a3e9089c20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1611892370612-0ac8e4a4507a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1611325695972-d22894e3f8d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  },
  { 
    id: 'everest', 
    name: 'Everest Region', 
    region: 'Himalayas', 
    desc: 'The Top of the World & Sagarmatha National Park', 
    img: '/images/everest base.jpg', 
    span: 'md:col-span-2 md:row-span-1', 
    bestTime: 'Mar - May, Sep - Nov', 
    terrain: 'Mountain Trails / Off-road (Lower Region)', 
    vehicles: ['4x4 Off-roader', 'Heavy-Duty SUV', 'Helicopter Charter'],
    extendedOverview: `
      <h3>Sagarmatha National Park</h3>
      <p>The Everest Region, known locally as the Khumbu, is home to Mount Everest (Sagarmatha) — the highest peak on Earth. It is a UNESCO World Heritage site and the ultimate destination for trekkers, mountaineers, and adventurers seeking the thrill of the high Himalayas.</p>
      <p>Beyond the breathtaking, snow-capped peaks of Lhotse, Nuptse, and Ama Dablam, the Everest region is profoundly shaped by the culture of the Sherpa people. Villages like Namche Bazaar and Tengboche are vibrant hubs of Tibetan Buddhism, featuring ancient monasteries, prayer wheels, and colorful flags fluttering in the mountain wind.</p>
      <p>Whether you are undertaking the iconic 14-day Everest Base Camp (EBC) trek, aiming for the serene Gokyo Lakes, or booking a luxury helicopter tour from Kathmandu to catch a glimpse of the summit, the Everest region promises an awe-inspiring, life-changing journey.</p>
    `,
    getThere: {
      flight: "A scenic, thrilling 30-minute flight from Kathmandu to Tenzing-Hillary Airport in Lukla, one of the world's most extreme airports.",
      bus: "Take a 10-12 hour jeep ride from Kathmandu to Salleri or Phaplu, then trek 3-4 days up to Lukla.",
      carRental: "For overland travel to the trailheads (Salleri or Jiri), renting a heavy-duty 4x4 SUV with an experienced mountain driver is mandatory."
    },
    stayOptions: {
      luxury: "Everest View Hotel, Yeti Mountain Home lodges (Prices: $150 - $350+/night)",
      midRange: "Standard teahouses in Namche Bazaar like Hotel Namche (Prices: $30 - $60/night)",
      budget: "Basic teahouses along the EBC trekking route (Prices: $5 - $15/night)"
    },
    transportTips: "Once past Lukla, there are no roads. Transportation is entirely on foot or by hiring yaks and porters. For emergencies or luxury travel, helicopter charters are widely available.",
    safetyInfo: "Acute Mountain Sickness (AMS) is the primary danger; ascending slowly is critical. Weather can change violently in minutes, bringing snowstorms even in peak seasons. Always hike with a registered guide and comprehensive travel insurance that covers helicopter evacuation.",
    budget: {
      daily: "$30 - $45 for independent trekkers, $100 - $150 for guided luxury lodge treks, $1000+ for helicopter tours.",
      food: "Prices increase dramatically with altitude. A simple plate of Dal Bhat costs $5 in Lukla but can jump to $12+ at Gorak Shep."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '-5°C - 15°C', condition: 'Clear mornings, cloudy afternoons, peak Everest climbing season.' },
      { season: 'Summer/Monsoon (Jun-Aug)', temp: '2°C - 18°C', condition: 'Heavy rain, obscured mountain views, leeches on lower trails, flight cancellations.' },
      { season: 'Autumn (Sep-Nov)', temp: '-10°C - 12°C', condition: 'Crystal clear skies, perfect visibility, very crowded.' },
      { season: 'Winter (Dec-Feb)', temp: '-20°C - 5°C', condition: 'Bitterly cold, heavy snow blocking passes, crystal clear views but harsh conditions.' }
    ],
    gallery: [
      'https://plus.unsplash.com/premium_photo-1697730045543-aacb9455ec4d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1724341754508-f19ee59541bd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1544735716-9f30e75e84dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1609660062508-1ac4a930232d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
  },
  { 
    id: 'manang', 
    name: 'Manang', 
    region: 'Himalayas', 
    desc: 'Breathtaking High Altitude Valley', 
    img: '/images/manag3.jpg', 
    span: 'md:col-span-1 md:row-span-1', 
    bestTime: 'Sep - Nov, Mar - May', 
    terrain: 'Off-road / Mountain Trails', 
    vehicles: ['4x4 Off-roader'],
    extendedOverview: `
      <h3>The Hidden Valley of Manang</h3>
      <p>Manang is a stunning high-altitude valley situated in the Annapurna conservation area. Known for its rich Tibetan culture, barren landscapes, and majestic views of the Annapurna and Gangapurna peaks, it is a crucial acclimatization stop for trekkers on the Annapurna Circuit.</p>
    `,
    getThere: {
      flight: "No direct commercial flights. Helicopter charters are available.",
      bus: "Local jeeps operate from Besisahar to Chame and up to Manang via extremely rugged off-road tracks.",
      carRental: "A heavy-duty 4x4 rental with a highly experienced driver is required to navigate the treacherous roads to Manang."
    },
    stayOptions: {
      luxury: "Limited luxury options. High-end teahouses available.",
      midRange: "Mountain View Lodge, Hotel Yeti (Prices: $30 - $50/night)",
      budget: "Basic teahouses (Prices: $5 - $15/night)"
    },
    transportTips: "The road to Manang is one of the most dangerous and thrilling off-road experiences in Nepal. Only 4WD vehicles are permitted.",
    safetyInfo: "Altitude sickness is a major concern as Manang is at 3,519m. Drink plenty of water and acclimatize.",
    budget: {
      daily: "$30 - $50 for basic trekking, $150+ for jeep hire.",
      food: "Food is slightly more expensive due to transport costs."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '5°C - 15°C', condition: 'Clear skies, pleasant.' },
      { season: 'Summer (Jun-Aug)', temp: '10°C - 20°C', condition: 'Monsoon shadow, great for trekking.' },
      { season: 'Autumn (Sep-Nov)', temp: '0°C - 12°C', condition: 'Crisp and clear, cold nights.' },
      { season: 'Winter (Dec-Feb)', temp: '-15°C - 5°C', condition: 'Heavy snow, freezing, many lodges close.' }
    ],
    gallery: [
      '/images/manag3.jpg',
      '/images/manang2.jpg',
      '/images/manang4.jpg'
    ]
  },
  { 
    id: 'kalinchowk', 
    name: 'Kalinchowk', 
    region: 'Hilly', 
    desc: 'Snow Wonderland & Temple', 
    img: '/images/kalinchowk1.jpg', 
    span: 'md:col-span-1 md:row-span-1', 
    bestTime: 'Dec - Feb', 
    terrain: 'Off-road / Hilly', 
    vehicles: ['4x4 Off-roader', 'SUV'],
    extendedOverview: `
      <h3>The Winter Wonderland of Nepal</h3>
      <p>Kalinchowk is a popular hill station situated at an altitude of 3,842m, famous for the Kalinchowk Bhagwati Temple and spectacular panoramic views of the Himalayas. It is the premier destination for domestic tourists to experience snowfall during winter.</p>
    `,
    getThere: {
      flight: "Not applicable.",
      bus: "Buses available from Kathmandu to Charikot, then a jeep ride to Kuri village.",
      carRental: "Renting a 4x4 SUV from Kathmandu is the most convenient way to reach Kuri village."
    },
    stayOptions: {
      luxury: "Kalinchowk Country Villa (Prices: $80 - $150/night)",
      midRange: "Various resorts in Kuri Village (Prices: $30 - $60/night)",
      budget: "Basic guesthouses (Prices: $15 - $25/night)"
    },
    transportTips: "A cable car operates from Kuri village to the Kalinchowk Bhagwati temple, taking about 5 minutes.",
    safetyInfo: "Roads can be slippery and dangerous during heavy snowfall. Warm clothing is essential.",
    budget: {
      daily: "$40 - $80 per day.",
      food: "Local food and typical Nepali meals available at reasonable prices."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '10°C - 20°C', condition: 'Clear views, rhododendron blooming.' },
      { season: 'Summer (Jun-Aug)', temp: '15°C - 22°C', condition: 'Rainy, cloudy, poor visibility.' },
      { season: 'Autumn (Sep-Nov)', temp: '5°C - 15°C', condition: 'Clear and beautiful.' },
      { season: 'Winter (Dec-Feb)', temp: '-5°C - 5°C', condition: 'Heavy snowfall, very cold.' }
    ],
    gallery: [
      '/images/kalinchowk1.jpg',
      '/images/kalinchowk2.jpg',
      '/images/kalinchowk3.jpg'
    ]
  },
  { 
    id: 'langtang', 
    name: 'Langtang Valley', 
    region: 'Himalayas', 
    desc: 'The Valley of Glaciers', 
    img: '/images/langtang2.jpg', 
    span: 'md:col-span-1 md:row-span-1', 
    bestTime: 'Sep - Nov, Mar - May', 
    terrain: 'Mountain Trails', 
    vehicles: ['SUV', 'Helicopter Charter'],
    extendedOverview: `
      <h3>The Valley of Glaciers</h3>
      <p>Langtang is one of the closest trekking regions to Kathmandu. Known as the 'Valley of Glaciers', it offers incredible mountain vistas, dense pine forests, and a deep immersion into the Tamang culture. The region has beautifully recovered and rebuilt since the 2015 earthquake.</p>
    `,
    getThere: {
      flight: "Helicopter tours from Kathmandu are popular for a quick visit.",
      bus: "Local buses run from Kathmandu to Syabrubesi, taking 7-9 hours.",
      carRental: "A private jeep to Syabrubesi is much faster and more comfortable than the local bus."
    },
    stayOptions: {
      luxury: "Limited luxury options; mostly teahouses.",
      midRange: "Standard teahouses with attached bathrooms (Prices: $20 - $40/night)",
      budget: "Basic teahouses along the trek (Prices: $5 - $15/night)"
    },
    transportTips: "Beyond Syabrubesi, trekking is the only way to travel through the valley.",
    safetyInfo: "Altitude sickness is possible. Trek with a buddy or guide.",
    budget: {
      daily: "$25 - $40 for teahouse trekking.",
      food: "Dal Bhat and local Tibetan bread are staple foods."
    },
    weatherData: [
      { season: 'Spring (Mar-May)', temp: '5°C - 15°C', condition: 'Clear, rhododendron forests in full bloom.' },
      { season: 'Summer (Jun-Aug)', temp: '10°C - 20°C', condition: 'Monsoon rain, slippery trails.' },
      { season: 'Autumn (Sep-Nov)', temp: '0°C - 12°C', condition: 'Crystal clear mountain views.' },
      { season: 'Winter (Dec-Feb)', temp: '-10°C - 5°C', condition: 'Very cold, heavy snow.' }
    ],
    gallery: [
      '/images/langtang2.jpg',
      '/images/langtang1.jpg',
      '/images/langtang3.jpg'
    ]
  }
];

const initialPackages = [];

const initialBookings = [];

const initialDrivers = [
  { id: 'D-101', name: 'Rajesh Kumar', phone: '+977-9800000001', experience: '5 Years', licenseNo: 'DL-12345', status: 'Available' },
  { id: 'D-102', name: 'Suman Shrestha', phone: '+977-9800000002', experience: '8 Years', licenseNo: 'DL-67890', status: 'On Trip' },
  { id: 'D-103', name: 'Bikash Thapa', phone: '+977-9800000003', experience: '3 Years', licenseNo: 'DL-11223', status: 'Available' }
];

const initialGallery = [
  { id: 'G-1', url: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop', title: 'Himalayan Ranges' },
  { id: 'G-2', url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1171&auto=format&fit=crop', title: 'Mountain Drive' },
  { id: 'G-3', url: '/images/ktm-home.jpg', title: 'Kathmandu Valley' },
  { id: 'G-4', url: 'https://images.unsplash.com/photo-1504448252408-b32799ff32f3?q=80&w=1074&auto=format&fit=crop', title: 'Serene Lakes' },
  { id: 'G-5', url: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop', title: 'Cultural Heritage' },
  { id: 'G-6', url: 'https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop', title: 'Wildlife Encounters' }
,
  { id: 'G-7', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBJN1DqlFxqoaHMMIsrOf0IcCYycsT3hb0-ziYzHm3Q&s=10', title: 'Helicopter Return 1' },
  { id: 'G-8', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wlvt4a57yn0n-R9EbGDDuFH1XgVOC2P9SCPo2OdZxQ&s=10', title: 'Helicopter Return 2' },
  { id: 'G-9', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiAqV4I_xhUpiNUuIa_VM6y1pj7pC-AIgNQ_laaHfKQg&s=10', title: 'Helicopter Return 3' }
];

const initialTestimonials = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    trip: 'Mustang Off-Road Expedition',
    vehicle: 'Jeep Tour Package',
    date: 'March 2026',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    text: "Our Mustang jeep tour with Zenex Travel was incredible. The 4x4 they provided was immaculate for the rough terrain, and our guide was deeply knowledgeable. The entire tour package gave us total peace of mind.",
  },
  {
    id: '2',
    name: 'David Chen',
    trip: 'Annapurna Base Camp Trek',
    vehicle: 'Complete Trek Package',
    date: 'April 2026',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    text: "Booking our Annapurna trek was seamless. The team handled everything from the airport pickup to the permits and providing a highly experienced guide. Our entire trip was flawlessly organized. Highly recommend Zenex for any Nepal tour!",
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    trip: 'Chitwan Jungle Safari Tour',
    vehicle: 'Minibus & Resort Package',
    date: 'February 2026',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    text: "We booked the Chitwan Jungle Safari Tour for our family of 8, and it was unforgettable. Zenex arranged the perfect minibus, a stunning eco-resort, and all the safari activities. Having a dedicated tour operator made everything comfortable.",
  }
];

export const AppDataProvider = ({ children }) => {

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [destinations, setDestinations] = useState(initialDestinations);
  const [packages, setPackages] = useState([]);
  const [treks, setTreks] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [galleryImages, setGalleryImages] = useState(initialGallery);
  const [tourTrips, setTourTrips] = useState([]);
  const [regions, setRegions] = useState([]);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let loadedFromApi = false;
        let finalVehicles = [];
        let finalPackages = [];
        let finalTreks = [];
        let finalDrivers = [];
        let finalTourTrips = [];
        let finalRegions = [];
        let finalBookings = [];
        let finalTestimonials = [];

        const ensureArray = (data) => {
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.value)) return data.value;
          if (data && Array.isArray(data.data)) return data.data;
          return [];
        };

        try {
          const [vehRes, packRes, trekRes, drvRes, tourRes, regRes, bookRes, testRes] = await Promise.all([
            fetch(`${API_BASE}/api/vehicles`),
            fetch(`${API_BASE}/api/packages`),
            fetch(`${API_BASE}/api/v2/treks`),
            fetch(`${API_BASE}/api/drivers`),
            fetch(`${API_BASE}/api/tour-trips`),
            fetch(`${API_BASE}/api/regions`),
            fetch(`${API_BASE}/api/bookings`),
            fetch(`${API_BASE}/api/testimonials`)
          ]);

          const isJson = (res) => {
            const contentType = res.headers.get('content-type');
            return contentType && contentType.includes('application/json');
          };

          if (isJson(vehRes) && isJson(packRes) && isJson(trekRes)) {
            finalVehicles = ensureArray(await vehRes.json().catch(() => []));
            finalPackages = ensureArray(await packRes.json().catch(() => []));
            finalTreks = ensureArray(await trekRes.json().catch(() => []));
            finalDrivers = ensureArray(await drvRes.json().catch(() => []));
            finalTourTrips = ensureArray(await tourRes.json().catch(() => []));
            finalRegions = ensureArray(await regRes.json().catch(() => []));
            finalBookings = ensureArray(await bookRes.json().catch(() => []));
            finalTestimonials = ensureArray(await testRes.json().catch(() => []));
            loadedFromApi = true;
          }
        } catch (apiErr) {
          console.warn("API fetches failed, falling back to static database file", apiErr);
        }

        if (!loadedFromApi) {
          console.log("Loading data from static database.json fallback...");
          const staticRes = await fetch('/database.json');
          if (staticRes.ok) {
            const db = await staticRes.json();
            finalVehicles = ensureArray(db.vehicles);
            finalPackages = ensureArray(db.packages);
            finalTreks = ensureArray(db.treks);
            finalDrivers = ensureArray(db.drivers);
            finalTourTrips = ensureArray(db.tourTrips);
            finalRegions = ensureArray(db.regions);
            finalBookings = ensureArray(db.bookings);
            finalTestimonials = ensureArray(db.testimonials);
          } else {
            console.error("Static database.json failed to load");
          }
        }

        setVehicles(ensureArray(finalVehicles));
        setPackages(ensureArray(finalPackages));
        setTreks(ensureArray(finalTreks));
        setDrivers(ensureArray(finalDrivers));
        setTourTrips(ensureArray(finalTourTrips));
        setRegions(ensureArray(finalRegions));
        setBookings(ensureArray(finalBookings));
        setTestimonials(ensureArray(finalTestimonials && finalTestimonials.length > 0 ? finalTestimonials : initialTestimonials));
      } catch (err) {
        console.error("Error fetching data", err);
        setTreks(treksData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // CRUD for Vehicles
  const addVehicle = async (vehicleData) => {
    let body = vehicleData;
    let headers = { 'Content-Type': 'application/json' };
    if (vehicleData instanceof FormData) {
      body = vehicleData;
      headers = {}; 
    } else {
      body = JSON.stringify(vehicleData);
    }
    const res = await fetch(`${API_BASE}/api/vehicles`, { method: 'POST', headers, body });
    const newV = await res.json();
    setVehicles([...vehicles, newV]);
  };
  const updateVehicle = async (id, updatedData) => {
    let body = updatedData;
    let headers = { 'Content-Type': 'application/json' };
    if (updatedData instanceof FormData) {
      body = updatedData;
      headers = {}; 
    } else {
      body = JSON.stringify(updatedData);
    }
    const res = await fetch(`${API_BASE}/api/vehicles/${id}`, { method: 'PUT', headers, body });
    const updatedV = await res.json();
    setVehicles(vehicles.map(v => v.id === id ? updatedV : v));
  };
  const deleteVehicle = async (id) => {
    await fetch(`${API_BASE}/api/vehicles/${id}`, { method: 'DELETE' });
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  // CRUD for Destinations
  const addDestination = (destination) => setDestinations([...destinations, destination]);
  const updateDestination = (id, updated) => setDestinations(destinations.map(d => d.id === id ? { ...d, ...updated } : d));
  const deleteDestination = (id) => setDestinations(destinations.filter(d => d.id !== id));

  // CRUD for Packages
  const addPackage = async (pkg) => {
    const res = await fetch(`${API_BASE}/api/packages`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pkg) });
    const newPkg = await res.json();
    setPackages([...packages, newPkg]);
  };
  const updatePackage = async (id, updated) => {
    const res = await fetch(`${API_BASE}/api/packages/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updated) });
    const updatedPkg = await res.json();
    setPackages(packages.map(p => p.id === id ? updatedPkg : p));
  };
  const deletePackage = async (id) => {
    await fetch(`${API_BASE}/api/packages/${id}`, { method: 'DELETE' });
    setPackages(packages.filter(p => p.id !== id));
  };

  // CRUD for Treks
  const addTrek = async (trek) => {
    const res = await fetch(`${API_BASE}/api/treks`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(trek) });
    const newTrek = await res.json();
    setTreks([...treks, newTrek]);
  };
  const updateTrek = async (id, updated) => {
    const res = await fetch(`${API_BASE}/api/treks/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updated) });
    const updatedTrek = await res.json();
    setTreks(treks.map(t => t.id === id ? updatedTrek : t));
  };
  const deleteTrek = async (id) => {
    await fetch(`${API_BASE}/api/treks/${id}`, { method: 'DELETE' });
    setTreks(treks.filter(t => t.id !== id));
  };

  // CRUD for Tour Trips
  const addTourTrip = async (trip) => {
    const res = await fetch(`${API_BASE}/api/tour-trips`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(trip) });
    const newTrip = await res.json();
    setTourTrips([...tourTrips, newTrip]);
  };
  const updateTourTrip = async (id, updated) => {
    const res = await fetch(`${API_BASE}/api/tour-trips/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updated) });
    const updatedTrip = await res.json();
    setTourTrips(tourTrips.map(t => t.id === id ? updatedTrip : t));
  };
  const deleteTourTrip = async (id) => {
    await fetch(`${API_BASE}/api/tour-trips/${id}`, { method: 'DELETE' });
    setTourTrips(tourTrips.filter(t => t.id !== id));
  };

  // CRUD for Bookings
  const addBooking = async (booking) => {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: booking.customer,
        type: booking.type,
        vehicle: booking.vehicle,
        dates: booking.dates,
        amount: booking.amount,
        status: booking.status,
        date: booking.date || new Date().toISOString().split('T')[0]
      })
    });
    const data = await res.json();
    if (data.success) {
      setBookings(prev => [...prev, data.booking]);
    }
  };
  const updateBooking = async (id, updated) => {
    const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    const data = await res.json();
    if (data.success) {
      setBookings(prev => prev.map(b => b.id === id ? data.booking : b));
    }
  };
  const deleteBooking = async (id) => {
    const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data.success) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  // CRUD for Gallery
  const addGalleryImage = (image) => setGalleryImages([{ ...image, id: 'G-' + Date.now() }, ...galleryImages]);
  const deleteGalleryImage = (id) => setGalleryImages(galleryImages.filter(g => g.id !== id));

  // CRUD for Drivers
  const addDriver = async (driverData) => {
    let body = driverData;
    let headers = { 'Content-Type': 'application/json' };
    if (driverData instanceof FormData) {
      body = driverData;
      headers = {};
    } else {
      body = JSON.stringify(driverData);
    }
    const res = await fetch(`${API_BASE}/api/drivers`, { method: 'POST', headers, body });
    const newD = await res.json();
    setDrivers([...drivers, newD]);
  };
  const updateDriver = async (id, updatedData) => {
    let body = updatedData;
    let headers = { 'Content-Type': 'application/json' };
    if (updatedData instanceof FormData) {
      body = updatedData;
      headers = {};
    } else {
      body = JSON.stringify(updatedData);
    }
    const res = await fetch(`${API_BASE}/api/drivers/${id}`, { method: 'PUT', headers, body });
    const updatedD = await res.json();
    setDrivers(drivers.map(d => d.id === id ? updatedD : d));
  };
  const deleteDriver = async (id) => {
    await fetch(`${API_BASE}/api/drivers/${id}`, { method: 'DELETE' });
    setDrivers(drivers.filter(d => d.id !== id));
  };

  // Upload Image
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // --- REGIONS ---
  const addRegion = async (region) => {
    try {
      const res = await fetch(`${API_BASE}/api/regions`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(region) });
      const data = await res.json();
      setRegions([...regions, data]);
      return data;
    } catch (error) {
      console.error('Error adding region:', error);
      throw error;
    }
  };

  const updateRegion = async (id, updatedRegion) => {
    try {
      const res = await fetch(`${API_BASE}/api/regions/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updatedRegion) });
      const data = await res.json();
      setRegions(regions.map(r => r.id === id ? data : r));
      return data;
    } catch (error) {
      console.error('Error updating region:', error);
      throw error;
    }
  };

  const deleteRegion = async (id) => {
    try {
      await fetch(`${API_BASE}/api/regions/${id}`, { method: 'DELETE' });
      setRegions(regions.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting region:', error);
      throw error;
    }
  };

  return (
    <AppDataContext.Provider value={{
      vehicles, addVehicle, updateVehicle, deleteVehicle,
      destinations, addDestination, updateDestination, deleteDestination,
      packages, addPackage, updatePackage, deletePackage,
      treks, addTrek, updateTrek, deleteTrek,
      bookings, addBooking, updateBooking, deleteBooking,
      drivers, addDriver, updateDriver, deleteDriver,
      galleryImages, addGalleryImage, deleteGalleryImage,
      tourTrips, addTourTrip, updateTourTrip, deleteTourTrip,
      regions, addRegion, updateRegion, deleteRegion,
      testimonials,
      uploadImage,
      loading, error
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
