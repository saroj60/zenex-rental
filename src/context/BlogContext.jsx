import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

const STATIC_FALLBACK_BLOGS = [
  {
    "id": "mustang-jeep-rental-guide",
    "title": "Ultimate Guide to Renting a 4x4 Jeep in Nepal for Mustang & Manang",
    "coverImage": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070",
    "category": "Car Rental Tips",
    "author": "Zenex Travel Experts",
    "date": "2026-08-10T12:00:00.000Z",
    "readTime": "6 min read",
    "content": "Renting a high-clearance 4x4 vehicle is essential for navigating the rugged terrain of Upper Mustang and Manang. The roads past Beni and Besisahar transitioning into raw dirt tracks, river crossings, and boulder-strewn mountain passes require durable four-wheel drive performance.\n\n## Why Hire a 4x4 Jeep in Nepal?\n- **High Ground Clearance**: Off-road tracks in Nepal feature deep ruts, river streams, and loose gravel. Standard sedans or hatchbacks cannot handle these routes.\n- **Trained Driver Options**: Off-road mountain driving requires experience with landslide mitigation, steep ascents, and high altitude engine braking. Zenex Travels provides veteran mountain drivers.\n- **Comfort & Gear Capacity**: Heavy-duty SUVs like Mahindra Scorpio and Toyota Fortuner accommodate up to 6–7 passengers along with full luggage, duffel bags, and trekking gear.\n\n## Recommended Off-Road Routes\n1. **Pokhara to Jomsom & Muktinath**: Drive through Tatopani, Marpha, and Kagbeni along the Kali Gandaki River canyon.\n2. **Kathmandu to Besisahar & Chame (Manang)**: Traverse deep valleys along the Marshyangdi River leading to the start of the Annapurna Circuit.\n3. **Upper Mustang (Kagbeni to Lo Manthang)**: A world-class overland 4x4 journey through Tibetan plateau landscapes.\n\nContact Zenex Travels today to reserve your 4x4 Jeep with options for self-drive or driver included!"
  },
  {
    "id": "ebc-packing-list",
    "title": "Everest Base Camp Trek Packing List: Essential Gear Checklist",
    "coverImage": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076",
    "category": "Trekking Guides",
    "author": "Guide Pasang Sherpa",
    "date": "2026-08-12T12:00:00.000Z",
    "readTime": "8 min read",
    "content": "Packing right for Everest Base Camp (5,364m) is critical for comfort, safety, and enjoying every footstep in the Khumbu region. Flight weight restrictions to Lukla allow a maximum of 15kg total per passenger (10kg main duffel + 5kg daypack).\n\n## Clothing Layering System\n- **Base Layer**: 2x Moisture-wicking merino wool tops and thermal bottoms.\n- **Insulating Layer**: 1x Fleece jacket or light fleece sweater.\n- **Outer Layer**: 1x Down jacket (rated -10°C to -15°C) and waterproof windbreaker jacket/pants.\n\n## Footwear & Accessories\n- Broken-in high-ankle waterproof trekking boots.\n- 4x pairs of thick merino wool socks + 2x light sock liners.\n- Thermal gloves, windproof outer gloves, and warm beanie/buff.\n- UV protection sunglasses (Category 3 or 4) for high-altitude reflection.\n\n## Electronics & Medical\n- High-capacity power bank (20,000mAh) as charging is paid in teahouses.\n- Water purification tablets or SteriPEN.\n- Personal first-aid kit including Diamox (altitude sickness medication), blister plasters, and rehydration salts."
  },
  {
    "id": "pokhara-adventure-guide",
    "title": "Top 7 Adventure Activities to Experience in Pokhara",
    "coverImage": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074",
    "category": "Activity Highlights",
    "author": "Tourism Editor Milan",
    "date": "2026-08-14T12:00:00.000Z",
    "readTime": "5 min read",
    "content": "Pokhara is widely celebrated as the adventure capital of Nepal. Nestled alongside tranquil Phewa Lake with stunning reflections of the Annapurna massif and Mt. Fishtail (Machhapuchhre), Pokhara offers thrill-seekers an incredible array of outdoor sports.\n\n## Top 7 Experiences\n1. **Tandem Paragliding from Sarangkot**: Glide high above Pokhara valley with panoramic Himalayan views.\n2. **Ultra-light Flight over the Annapurnas**: Get up close to snow-capped peaks in an open or closed two-seater aircraft.\n3. **Zip-Flyer Nepal**: Experience one of the steepest and longest zip-lines in the world with a 600-meter vertical drop.\n4. **White Water Rafting on Upper Seti**: Exciting Class III/IV rapids just 30 minutes from Lakeside Pokhara.\n5. **Mountain Biking to World Peace Pagoda**: Ride through lush forest trails and traditional hillside villages.\n6. **Boating & Kayaking on Phewa Lake**: Rent a colorful wooden boat (*Doonga*) to reach Tal Barahi Temple.\n7. **Bungee Jumping at Hemja**: A adrenaline-pumping 70-meter freefall drop over a cliff and water pool.\n\nPlan your Pokhara adventure package with Zenex Travels including private transport transfers!"
  },
  {
    "id": "ebc-trek-guide-2026",
    "title": "Everest Base Camp Trek Guide 2026: Route, Cost, Altitude & Gear Checklist",
    "coverImage": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071",
    "category": "Trekking Guides",
    "author": "Senior Guide Pemba Sherpa",
    "date": "2026-09-01T10:00:00.000Z",
    "readTime": "12 min read",
    "content": "Standing at the foot of Mount Everest (8,848.86m) is a bucket-list dream for mountain enthusiasts worldwide. The Everest Base Camp (EBC) trek takes you through ancient Sherpa villages, iconic Buddhist monasteries like Tengboche, and breathtaking glacial landscapes.\n\n## Fast Facts & Overview\n- **Duration**: 12 to 14 Days (Kathmandu to Kathmandu)\n- **Maximum Elevation**: 5,545m (Kala Patthar summit) / 5,364m (EBC)\n- **Trek Difficulty**: Challenging (Requires good cardiovascular fitness)\n- **Best Seasons**: Spring (March to May) and Autumn (September to November)\n\n## Standard Itinerary Highlights\n1. **Day 1–2**: Flight to Lukla (2,860m), trek to Phakding and ascending the steep hill to Namche Bazaar (3,440m).\n2. **Day 3**: Mandatory acclimatization day in Namche Bazaar with a hike to Everest View Hotel.\n3. **Day 4–6**: Trekking through Tengboche Monastery to Dingboche (4,410m) for a second acclimatization day.\n4. **Day 7–9**: Ascending to Lobuche (4,940m), Gorak Shep (5,164m), and reaching Everest Base Camp (5,364m).\n5. **Day 10**: Early morning sunrise climb to Kala Patthar (5,545m) for the ultimate view of Everest, Lhotse, and Nuptse before descending.\n\n## Permits Required\n1. **Khumbu Pasang Lhamu Rural Municipality Permit**: NPR 3,000 (~$23 USD) per person.\n2. **Sagarmatha National Park Entry Permit**: NPR 3,000 (~$23 USD) per person.\n\nBook your complete Everest Base Camp Trek package with Zenex Travels for expert guides, porter support, flight arrangements, and full safety backup."
  },
  {
    "id": "annapurna-circuit-vs-abc",
    "title": "Annapurna Circuit vs. Annapurna Base Camp (ABC): Which Trek is Right for You?",
    "coverImage": "https://images.unsplash.com/photo-1585409677983-0f6c41ca913b?q=80&w=2069",
    "category": "Trekking Guides",
    "author": "Zenex Trek Specialist",
    "date": "2026-09-03T10:00:00.000Z",
    "readTime": "10 min read",
    "content": "The Annapurna region is Nepal's most versatile trekking sanctuary. Trekkers often find themselves choosing between two world-renowned routes: the **Annapurna Circuit Trek** and the **Annapurna Base Camp (ABC) Trek**.\n\n## Key Comparisons\n\n### 1. Annapurna Circuit Trek\n- **Duration**: 12 to 18 Days\n- **Max Altitude**: 5,416m (Thorong La Pass)\n- **Landscape Diversity**: Transitions from sub-tropical green river valleys (Besisahar) to high alpine deserts (Muktinath & Mustang) and Tibetan culture.\n- **Highlights**: Thorong La Pass crossing, Kagbeni, Muktinath Temple, and Kali Gandaki Gorge.\n\n### 2. Annapurna Base Camp (ABC) Trek\n- **Duration**: 7 to 10 Days\n- **Max Altitude**: 4,130m (Annapurna Base Camp)\n- **Landscape Diversity**: Deep rhododendron forests, bamboo sanctuaries, natural hot springs at Jhinu Danda, and an amphitheater surrounded 360-degrees by giant peaks.\n- **Highlights**: Sunrise over Machhapuchhre (Fishtail) Base Camp and standing in the center of the Annapurna Sanctuary.\n\n## Summary: Which Should You Choose?\n- Choose **Annapurna Circuit** if you have 2+ weeks, want to cross a dramatic high pass (5,416m), and want to witness Mustang's arid desert landscape.\n- Choose **Annapurna Base Camp** if you have 7–10 days, prefer standing closely beneath colossal 8,000m ice walls, and enjoy shorter daily hiking durations."
  },
  {
    "id": "langtang-valley-trek-guide",
    "title": "Langtang Valley Trek: Nepal's Most Scenic, Accessible & Culturally Rich Himalayan Hike",
    "coverImage": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070",
    "category": "Trekking Guides",
    "author": "Trekking Lead Dorje Tamang",
    "date": "2026-09-05T10:00:00.000Z",
    "readTime": "9 min read",
    "content": "Located directly north of Kathmandu, the Langtang Valley is affectionately known as \"The Valley of Glaciers.\" It offers one of the most accessible Himalayan trekking experiences without needing costly internal mountain flights.\n\n## Why Trek Langtang Valley?\n- **No Flight Needed**: Accessible via a scenic 6 to 7 hour overland drive from Kathmandu to Syabrubesi in a private 4x4 Scorpio or bus.\n- **Rich Tamang Culture**: Discover traditional stone villages, prayer flags, chortens, and unique Tibetan-influenced Tamang heritage.\n- **Spectacular Mountain Vistas**: Views of Langtang Lirung (7,227m), Gangchenpo, and Naya Kanga.\n\n## Key Trek Highlights\n- **Kyanjin Gompa (3,870m)**: A peaceful mountain monastery village famous for its traditional Yak Cheese Factory.\n- **Tserko Ri Summit (4,984m)**: A rewarding day-climb from Kyanjin Gompa offering 360-degree views across Nepal and Tibet borders.\n- **Langtang National Park**: Home to rare wildlife including the elusive Red Panda, Himalayan Tahr, and vibrant bird species.\n\nBook your hassle-free Langtang Valley Trek package with Zenex Travels including Kathmandu to Syabrubesi private Jeep transfers!"
  },
  {
    "id": "top-10-nepal-tours-2026",
    "title": "Top 10 Best Cultural & Nature Tours in Nepal for Families & Couples (2026)",
    "coverImage": "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2070",
    "category": "Tour Guides",
    "author": "Zenex Tour Operations",
    "date": "2026-09-07T10:00:00.000Z",
    "readTime": "11 min read",
    "content": "Nepal is far more than high-altitude trekking trails. For families, couples, and leisure travelers seeking cultural immersion, wildlife safaris, and tranquil lake towns, Nepal presents world-class vacation destinations.\n\n## Top 10 Tour Destinations\n1. **Kathmandu UNESCO Heritage Tour**: Explore Kathmandu Durbar Square, Swayambhunath (Monkey Temple), Pashupatinath, and Boudhanath Stupa.\n2. **Pokhara Lake City & Sarangkot Sunrise**: Relax alongside Phewa Lake and watch golden morning sunlight illuminate the Annapurnas.\n3. **Chitwan National Park Wildlife Safari**: Jeep safaris, elephant breeding center visits, and canoe rides spotting One-horned Rhinos and Bengal Tigers.\n4. **Nagarkot Himalayan Panorama**: Located 32km east of Kathmandu, renowned for unobstructed sunrise views of Mount Everest on clear mornings.\n5. **Bandipur Heritage Hill Station**: A preserved Newari cultural hilltop town featuring traditional 18th-century architecture and pedestrian-only streets.\n6. **Lumbini Sanctuary**: The birthplace of Lord Buddha, home to Maya Devi Temple and international peace pagodas built by nations worldwide.\n7. **Bhaktapur Durbar Square**: Step back in time among 55-window palaces, clay pottery squares, and artisanal wood carvings.\n8. **Patan (Lalitpur) Art & Craft City**: Famous for metal statues, bronze craftwork, Krishna Mandir, and royal courtyards.\n9. **Janakpurdham Cultural Tour**: Discover the vibrant Maithili culture and grand Janaki Temple dedicated to Goddess Sita.\n10. **Chandragiri Hills Cable Car**: Take a modern cable car ride for 360-degree aerial views over Kathmandu valley and the central Himalayas.\n\nZenex Travels provides custom vehicle rentals and guided tour packages across all these destinations!"
  },
  {
    "id": "upper-mustang-4x4-overland",
    "title": "Upper Mustang Overland 4x4 Tour: Exploring the Walled Kingdom of Lo Manthang",
    "coverImage": "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070",
    "category": "Tour Guides",
    "author": "Mustang Specialist Karma Gurung",
    "date": "2026-09-09T10:00:00.000Z",
    "readTime": "10 min read",
    "content": "Upper Mustang is a preserved Tibetan kingdom nestled behind the Dhaulagiri and Annapurna mountain rain-shadows. Until 1992, this region was completely forbidden to foreign visitors, preserving its thousand-year-old Buddhist traditions, walled cities, and cave civilizations.\n\n## Overland 4x4 Experience\nDriving to Upper Mustang in a heavy-duty 4x4 Jeep is one of Asia's most thrilling road trips. You navigate dramatic clay canyons, wind-carved sandstone cliffs, and ancient riverbeds.\n\n## Highlights of Lo Manthang\n- **The Walled Capital of Lo Manthang**: Walk through stone gateways into the royal kingdom ruled by traditional Mustang monarchy lineages.\n- **Chhoser Sky Caves (Jhong Cave)**: Explore multi-story artificial caves carved into vertical cliffs dating back over 2,500 years.\n- **Centuries-old Monasteries**: Visit Jampa Lhakhang and Thubchen Lhakhang housing ancient silk thangkas and golden Buddha murals.\n\n## Permit Rules\nUpper Mustang is classified as a Restricted Area. Foreign travelers require:\n1. **Restricted Area Permit (RAP)**: $500 USD per person for the first 10 days.\n2. **ACAP Permit**: NPR 3,000 (~$23 USD) per person.\n3. Minimum group size of 2 travelers accompanied by a licensed guide.\n\nBook your private 4x4 Scorpio / Fortuner overland Mustang tour package with Zenex Travels today!"
  },
  {
    "id": "nepal-travel-guide-2026",
    "title": "Nepal Travel Guide 2026: Visas, Best Seasons, Local Etiquette & Car Rental",
    "coverImage": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
    "category": "Travel Tips",
    "author": "Zenex Editorial Team",
    "date": "2026-09-10T10:00:00.000Z",
    "readTime": "8 min read",
    "content": "Planning your trip to Nepal? Whether you're visiting for trekking, cultural tours, or business, having updated local knowledge ensures a seamless travel experience.\n\n## Tourist Visa Information\nNepal offers **Visa-on-Arrival** at Tribhuvan International Airport (KTM) and land borders for most nationalities:\n- **15 Days**: $30 USD\n- **30 Days**: $50 USD\n- **90 Days**: $125 USD\n*Tip: Fill out the online tourist visa pre-form at the official Nepal Immigration portal prior to arrival to skip long airport lines.*\n\n## Best Seasons to Visit\n- **Autumn (Sept to Nov)**: Crystal clear skies, mild temperatures, optimal mountain visibility, and major festivals (Dashain & Tihar).\n- **Spring (March to May)**: Blooming rhododendron forests, warm daytime weather, great conditions for high mountain trekking.\n\n## Car Rental & Local Transportation\nNavigating Nepal's mountain highways is easiest with a private car or 4x4 rental. Zenex Travels offers flexible booking:\n- **Self-Drive Rental**: Available for experienced drivers with valid international driving permits.\n- **Car with Driver**: Recommended for stress-free travel through mountain terrain and city traffic.\n\nPlan your transportation and customized Nepal tour with Zenex Travels for 24/7 travel support!"
  },
  {
    "id": "ghorepani-poonhill-ghandruk-guide",
    "title": "Ghorepani Poon Hill & Ghandruk Trek: Complete Short Annapurna Guide for Beginners",
    "coverImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070",
    "category": "Trekking Guides",
    "author": "Guide Sunita Gurung",
    "date": "2026-09-11T10:00:00.000Z",
    "readTime": "7 min read",
    "content": "If you have limited time or are trekking in the Himalayas for the first time, the Ghorepani Poon Hill and Ghandruk Circuit is the ultimate recommendation.\n\n## Why Choose Ghorepani Poon Hill?\n- **Short Duration**: Completed comfortably in 4 to 5 days starting and ending in Pokhara.\n- **Moderate Altitude**: Maximum height of 3,210m at Poon Hill minimizes risk of acute mountain sickness (AMS).\n- **World-Class Sunrise**: Poon Hill offers an iconic panoramic sunrise view over Dhaulagiri I (8,167m), Annapurna I (8,091m), Machhapuchhre (6,993m), and Nilgiri.\n\n## Trek Itinerary Breakdown\n1. **Day 1**: Drive from Pokhara to Nayapul / Birethanti (private vehicle transfer), trek to Tikhedhunga or Ulleri.\n2. **Day 2**: Climb the stone steps to Ghorepani (2,860m) through vibrant rhododendron forests.\n3. **Day 3**: Early 5:00 AM hike to Poon Hill (3,210m) for sunrise, then trek to Tadapani (2,630m).\n4. **Day 4**: Trek to Ghandruk village (1,940m), explore the traditional Gurung museum and stone paved alleys.\n5. **Day 5**: Descend to Nayapul and drive back to Pokhara.\n\nBook your family-friendly Ghorepani Poon Hill trek package with Zenex Travels!"
  },
  {
    "id": "chitwan-pokhara-7-day-tour",
    "title": "Chitwan Wildlife Safari & Pokhara Lake Tour: The Ultimate 7-Day Road Trip",
    "coverImage": "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2070",
    "category": "Tour Guides",
    "author": "Zenex Safari & Tour Team",
    "date": "2026-09-12T10:00:00.000Z",
    "readTime": "9 min read",
    "content": "Experience the best of Nepal's wildlife jungles and serene alpine mountain scenery in a classic 7-day road trip combining Chitwan National Park and Pokhara.\n\n## 7-Day Road Trip Itinerary\n\n### Day 1–3: Chitwan National Park Safari\n- Drive from Kathmandu to Sauraha, Chitwan in a comfortable private sedan or SUV.\n- **Activities**:\n  - Jeep Safari into dense jungle grasslands to spot Greater One-horned Rhinos, Sloth Bears, and Royal Bengal Tigers.\n  - Traditional dugout canoe ride along the Rapti River observing Marsh Mugger and Gharial crocodiles.\n  - Sunset view over the Rapti riverbank followed by a cultural Tharu stick dance performance.\n\n### Day 4–6: Scenic Drive to Pokhara Lake City\n- Overland drive along the Prithvi Highway to Pokhara.\n- **Activities**:\n  - Sunrise at Sarangkot with views of the Annapurna range.\n  - Boat ride to Tal Barahi Temple on Phewa Lake.\n  - Visit Davis Falls, Gupteshwor Sacred Cave, and World Peace Stupa.\n\n### Day 7: Return Drive to Kathmandu\n- Return drive back to Kathmandu or option for a quick 25-minute domestic flight from Pokhara International Airport.\n\nBook your luxury private vehicle road trip package with Zenex Travels for a hassle-free itinerary!"
  }
];

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(STATIC_FALLBACK_BLOGS);

  // Fetch blogs from backend on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setBlogs(data);
          } else {
            setBlogs(STATIC_FALLBACK_BLOGS);
          }
        } else {
          setBlogs(STATIC_FALLBACK_BLOGS);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setBlogs(STATIC_FALLBACK_BLOGS);
      }
    };
    fetchBlogs();
  }, []);

  const addBlog = async (blogData) => {
    try {
      let body = blogData;
      let headers = { 'Content-Type': 'application/json' };
      if (blogData instanceof FormData) {
        body = blogData;
        headers = {};
      } else {
        body = JSON.stringify(blogData);
      }
      const res = await fetch('/api/blogs', { method: 'POST', headers, body });
      const newB = await res.json();
      setBlogs((prev) => [newB, ...prev]);
      return newB;
    } catch (error) {
      console.error('Failed to add blog:', error);
      throw error;
    }
  };

  const updateBlog = async (id, updatedData) => {
    try {
      let body = updatedData;
      let headers = { 'Content-Type': 'application/json' };
      if (updatedData instanceof FormData) {
        body = updatedData;
        headers = {};
      } else {
        body = JSON.stringify(updatedData);
      }
      const res = await fetch(`/api/blogs/${id}`, { method: 'PUT', headers, body });
      const updatedB = await res.json();
      setBlogs((prev) => prev.map((blog) => (blog.id === id ? updatedB : blog)));
      return updatedB;
    } catch (error) {
      console.error('Failed to update blog:', error);
      throw error;
    }
  };

  const deleteBlog = async (id) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Failed to delete blog:', error);
      throw error;
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
