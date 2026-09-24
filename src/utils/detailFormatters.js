/**
 * Utility functions to robustly extract and normalize detail page data
 * (inclusions, exclusions, add-ons, highlights) regardless of database key casing or object vs string formatting.
 */

export const defaultTourInclusions = [
  { title: "Airport Pickup & Drop-Off", description: "Private air-conditioned vehicle transfers upon arrival and departure at Tribhuvan International Airport." },
  { title: "Hotel Accommodations", description: "Verified 3-Star / Deluxe hotel stays with daily breakfast buffet included." },
  { title: "Private Ground Transportation", description: "Private air-conditioned vehicle for all sightseeing tours, intercity transfers, and excursions per itinerary." },
  { title: "Monument & Heritage Entry Permits", description: "All entry fees for UNESCO World Heritage Sites, temples, national parks, and cultural monuments." },
  { title: "Licensed English-Speaking Tour Guide", description: "Professional, knowledgeable local guide for all guided sightseeing tours." },
  { title: "Welcome / Farewell Dinner", description: "Traditional Nepalese dinner with cultural dance performance." },
  { title: "Government Taxes & Fees", description: "All applicable government taxes, VAT, and agency service charges." }
];

export const defaultTourExclusions = [
  { title: "International Airfare & Visa", description: "International flights to/from Kathmandu and Nepal tourist visa fees upon arrival." },
  { title: "Lunches & Dinners", description: "Lunches and dinners not explicitly specified in the itinerary." },
  { title: "Personal Expenses", description: "Personal laundry, phone calls, room service, bar bills, Wi-Fi, and bottled drinks." },
  { title: "Travel Insurance", description: "Comprehensive travel, medical, and flight cancellation insurance." },
  { title: "Tips & Gratuities", description: "Gratuities for tour guide, driver, and hotel bell staff." },
  { title: "Emergency Expenses", description: "Extra costs due to flight delays, weather conditions, or unforeseen emergencies." }
];

export const defaultTrekInclusions = [
  { title: "Airport Pickups & Transfers", description: "Private airport arrival and departure transfers in Kathmandu and Pokhara." },
  { title: "Hotel Accommodations", description: "Standard / 3-Star hotel stays in Kathmandu and Pokhara with breakfast." },
  { title: "Teahouse / Lodge Stays", description: "Best available mountain lodge / teahouse accommodation during the trek." },
  { title: "Full-Board Mountain Meals", description: "Breakfast, lunch, and dinner daily during the trekking days." },
  { title: "Licensed Trekking Guide & Porters", description: "Experienced, licensed English-speaking guide and porters (1 porter for 2 trekkers)." },
  { title: "Trekking Permits & TIMS", description: "All TIMS cards, National Park, and Conservation Area entry permits." },
  { title: "Medical Kit & Safety Support", description: "Comprehensive medical first aid kit and pulse oximeter monitoring." },
  { title: "Government Taxes", description: "All government taxes, VAT, and official agency service fees." }
];

export const defaultTrekExclusions = [
  { title: "International Flights & Visa", description: "International flights to Nepal and Nepal tourist visa fees." },
  { title: "Travel & Rescue Insurance", description: "Mandatory travel insurance covering high-altitude trekking and emergency helicopter evacuation." },
  { title: "Personal Trekking Gear", description: "Sleeping bags, down jackets, trekking boots, and personal gear." },
  { title: "Personal Expenses on Trek", description: "Hot showers, Wi-Fi, battery charging, laundry, bottled water, soft drinks, and alcohol." },
  { title: "City Meals", description: "Lunches and dinners in Kathmandu and Pokhara." },
  { title: "Tips & Gratuities", description: "Tips for trekking guide, porters, and drivers." }
];

export const getInclusionsList = (data) => {
  if (!data) return [];
  const raw = data.inclusions || data.costIncludes || data.includes || data.cost_includes || data.included;
  
  if (Array.isArray(raw) && raw.length > 0) {
    const list = raw.map(item => {
      if (typeof item === 'string') return { title: item, description: '' };
      if (typeof item === 'object' && item !== null) {
        return {
          title: item.title || item.name || item.text || item.label || String(item),
          description: item.description || item.desc || item.details || ''
        };
      }
      return { title: String(item), description: '' };
    }).filter(item => item.title && item.title.trim() !== '');

    if (list.length > 0) return list;
  }

  const titleText = data?.title || '';
  const isTrekPackage = data?.category === 'Treks' || 
    data?.category === 'Trek' || 
    data?.type === 'Trek' || 
    titleText.toLowerCase().includes('trek');

  return isTrekPackage ? defaultTrekInclusions : defaultTourInclusions;
};

export const getExclusionsList = (data) => {
  if (!data) return [];
  const raw = data.exclusions || data.costExcludes || data.excludes || data.cost_excludes || data.excluded;
  
  if (Array.isArray(raw) && raw.length > 0) {
    const list = raw.map(item => {
      if (typeof item === 'string') return { title: item, description: '' };
      if (typeof item === 'object' && item !== null) {
        return {
          title: item.title || item.name || item.text || item.label || String(item),
          description: item.description || item.desc || item.details || ''
        };
      }
      return { title: String(item), description: '' };
    }).filter(item => item.title && item.title.trim() !== '');

    if (list.length > 0) return list;
  }

  const titleText = data?.title || '';
  const isTrekPackage = data?.category === 'Treks' || 
    data?.category === 'Trek' || 
    data?.type === 'Trek' || 
    titleText.toLowerCase().includes('trek');

  return isTrekPackage ? defaultTrekExclusions : defaultTourExclusions;
};

export const getAddonsList = (data, isTrek = false) => {
  const custom = [];
  if (data) {
    const raw = data.addons || data.addOns || data.add_ons || data.extraOptions || data.optionalActivities || [];
    if (Array.isArray(raw)) {
      raw.forEach(item => {
        if (typeof item === 'string') {
          const priceMatch = item.match(/\(([^)]+)\)$/);
          const title = item.replace(/\s*\([^)]+\)$/, '').trim();
          const price = priceMatch ? priceMatch[1] : '';
          custom.push({ title, price, details: '' });
        } else if (typeof item === 'object' && item !== null) {
          let priceStr = '';
          if (item.price) {
            const p = String(item.price).trim();
            if (p.startsWith('$') || p.startsWith('US$') || p.startsWith('+')) {
              priceStr = p;
            } else if (/request|free|included/i.test(p)) {
              priceStr = p;
            } else if (/^\d/.test(p)) {
              priceStr = `+ US$${p}`;
            } else {
              priceStr = p;
            }
          }
          custom.push({
            title: item.title || item.name || item.text || item.label || String(item),
            price: priceStr,
            details: item.details || item.description || item.desc || ''
          });
        }
      });
    }
  }

  const titleText = data?.title || '';
  const isTrekPackage = isTrek || 
    data?.category === 'Treks' || 
    data?.category === 'Trek' || 
    data?.type === 'Trek' || 
    titleText.toLowerCase().includes('trek');

  const defaultTourUpgrades = [
    {
      title: "Upgrade to 4-Star Hotel Accommodation",
      price: "+ US$150 / person",
      details: "Upgrade all city hotel stays to verified 4-Star boutique & heritage hotels with upgraded breakfast buffet & amenities."
    },
    {
      title: "Upgrade to 5-Star Luxury Hotel Accommodation",
      price: "+ US$350 / person",
      details: "Upgrade to premium 5-Star luxury hotels (The Soaltee Kathmandu / Sarangkot Mountain Lodge / Mystic Mountain) with full spa & luxury perks."
    },
    {
      title: "Kathmandu Everest Scenic Mountain Flight",
      price: "+ US$250 / person",
      details: "1-Hour guaranteed window-seat flight over Mt. Everest, Lhotse, Makalu & Shishapangma with airport transfers."
    },
    {
      title: "Private Airport Luxury Vehicle Transfer",
      price: "+ US$35 / transfer",
      details: "Chauffeur-driven executive private air-conditioned vehicle pick-up & drop-off at Tribhuvan International Airport."
    }
  ];

  const defaultTrekUpgrades = [
    {
      title: "Upgrade to 4-Star Hotel Accommodation (Pre/Post Trek)",
      price: "+ US$150 / person",
      details: "Upgrade pre/post-trek Kathmandu & Pokhara hotel stays to 4-Star boutique hotels with buffet breakfast."
    },
    {
      title: "Upgrade to 5-Star Luxury Hotel Accommodation (Pre/Post Trek)",
      price: "+ US$350 / person",
      details: "Upgrade pre/post-trek Kathmandu & Pokhara hotel stays to 5-Star luxury hotels (The Soaltee / Mystic Mountain)."
    },
    {
      title: "Dedicated Personal Porter Service",
      price: "+ US$22 / day",
      details: "Dedicated personal porter to carry up to 15kg of your main duffel bag throughout the trekking itinerary."
    }
  ];

  const defaultUpgrades = isTrekPackage ? defaultTrekUpgrades : defaultTourUpgrades;
  // Filter out any explicit helicopter items from custom add-ons if present
  const result = custom.filter(a => !a.title.toLowerCase().includes('helicopter'));

  // Ensure 4-Star upgrade is present
  const has4Star = result.some(a => a.title.toLowerCase().includes('4-star') || a.title.toLowerCase().includes('4 star'));
  if (!has4Star) {
    result.unshift(defaultUpgrades[0]);
  }

  // Ensure 5-Star upgrade is present
  const has5Star = result.some(a => a.title.toLowerCase().includes('5-star') || a.title.toLowerCase().includes('5 star'));
  if (!has5Star) {
    const index4 = result.findIndex(a => a.title.toLowerCase().includes('4-star') || a.title.toLowerCase().includes('4 star'));
    if (index4 !== -1) {
      result.splice(index4 + 1, 0, defaultUpgrades[1]);
    } else {
      result.unshift(defaultUpgrades[1]);
    }
  }

  // Append remaining default upgrades if not already present
  defaultUpgrades.slice(2).forEach(defAdd => {
    const defTitleLower = defAdd.title.toLowerCase();
    const isAlreadyPresent = result.some(a => {
      const aTitleLower = a.title.toLowerCase();
      return aTitleLower === defTitleLower || 
             (defTitleLower.includes('helicopter return') && aTitleLower.includes('helicopter return')) ||
             (defTitleLower.includes('porter') && aTitleLower.includes('porter')) ||
             (defTitleLower.includes('mountain flight') && aTitleLower.includes('mountain flight')) ||
             (defTitleLower.includes('airport') && aTitleLower.includes('airport'));
    });
    if (!isAlreadyPresent) {
      result.push(defAdd);
    }
  });

  return result.filter(item => item.title && item.title.trim() !== '');
};

export const defaultTrekHighlights = [
  { title: "Breathtaking Himalayan Vistas", description: "Spectacular close-up views of towering snow-capped mountain peaks, high-altitude passes, and glacial valleys." },
  { title: "Authentic Cultural Heritage", description: "Immerse in ancient traditional mountain hamlets, historic monasteries, chortens, and prayer wheel trails." },
  { title: "Pristine Wilderness & Alpine Trails", description: "Traverse lush rhododendron and pine forests, mountain streams, and untouched high-altitude landscapes." },
  { title: "Licensed Guide & Dedicated Porter Support", description: "Fully supported journey with licensed English-speaking mountain guides and dedicated local trekking crew." }
];

export const defaultTourHighlights = [
  { title: "UNESCO World Heritage Sightseeing", description: "Guided visits to historic palaces, sacred Hindu temples, and ancient Buddhist stupas." },
  { title: "Scenic Mountain & Cultural Drives", description: "Comfortable transfers through scenic river valleys, terraced hillsides, and panoramic mountain viewpoints." },
  { title: "Authentic Local Traditions & Hospitality", description: "Experience rich Nepalese cultural heritage, traditional warm hospitality, and regional dining." },
  { title: "Private Air-Conditioned Vehicle Support", description: "Seamless door-to-door transportation in clean, insured private vehicles with professional driver." }
];

export const getHighlightsList = (data) => {
  if (!data) return [];
  const raw = data.highlights || data.keyHighlights || data.tripHighlights || data.highlightsList || [];
  let list = [];
  
  if (Array.isArray(raw) && raw.length > 0) {
    list = raw.map(item => {
      if (typeof item === 'string') return { title: item, description: '' };
      if (typeof item === 'object' && item !== null) {
        return {
          title: item.title || item.name || item.text || item.label || String(item),
          description: item.description || item.desc || item.details || ''
        };
      }
      return { title: String(item), description: '' };
    }).filter(item => item.title && item.title.trim() !== '');
  }

  const titleText = (data?.title || data?.name || '').toLowerCase();
  const overviewText = (data?.overview || data?.description || '').toLowerCase();
  const fullText = titleText + ' ' + overviewText;

  const candidatePool = [];

  // Destination specific candidate highlights
  if (fullText.includes('kathmandu')) {
    candidatePool.push({ title: "Guided UNESCO World Heritage Sightseeing", description: "Explore historic monuments across Kathmandu & Bhaktapur Durbar Squares." });
    candidatePool.push({ title: "Pashupatinath Sacred Hindu Shrine Visit", description: "Experience ancient spiritual rituals along the holy Bagmati River." });
    candidatePool.push({ title: "Swayambhunath Stupa (Monkey Temple) Vistas", description: "Panoramic 360-degree views overlooking the entire Kathmandu valley." });
    candidatePool.push({ title: "Boudhanath Stupa Circumambulation", description: "Walk around one of the world's largest spherical Buddhist stupas." });
  }

  if (fullText.includes('pokhara')) {
    candidatePool.push({ title: "Pokhara Lakeside & Phewa Lake Boating", description: "Tranquil boating on Phewa Lake with reflections of the Annapurna massifs." });
    candidatePool.push({ title: "Sarangkot Sunrise Mountain Views", description: "Golden sunrise over Annapurna South, Machhapuchhre (Fishtail) & Dhaulagiri." });
    candidatePool.push({ title: "Pokhara Natural Wonders Tour", description: "Visit Davis Falls, Gupteshwor Sacred Cave & Seti River Gorge." });
    candidatePool.push({ title: "Bindabasini Temple & World Peace Stupa", description: "Explore iconic spiritual hill stations and Tibetan artisan centers." });
  }

  if (fullText.includes('chitwan') || fullText.includes('safari')) {
    candidatePool.push({ title: "Full-Board Chitwan Jungle Safari", description: "Thrilling jeep/elephant safaris to spot one-horned rhinos, tigers & deer." });
    candidatePool.push({ title: "Rapti River Dugout Canoe Trip", description: "Peaceful river float to view marsh mugger crocodiles & exotic birds." });
    candidatePool.push({ title: "Tharu Village & Cultural Folk Dance", description: "Authentic indigenous village walk and live evening cultural dance performance." });
  }

  if (fullText.includes('nagarkot')) {
    candidatePool.push({ title: "Nagarkot Mount Everest Sunrise Vista", description: "Panoramic early morning sunrise over Mount Everest and central Himalayas." });
  }

  if (fullText.includes('dhulikhel')) {
    candidatePool.push({ title: "Dhulikhel Himalayan Ridge Sunrise", description: "Sweeping sunrise vistas over the eastern Himalayan range." });
  }

  if (fullText.includes('chandragiri')) {
    candidatePool.push({ title: "Chandragiri Cable Car Mountain Experience", description: "Scenic cable car ride to Chandragiri summit for 360-degree lookouts." });
  }

  if (fullText.includes('muktinath') || fullText.includes('jomsom') || fullText.includes('mustang')) {
    candidatePool.push({ title: "Sacred Muktinath Temple Pilgrimage (3,800m)", description: "Pay homage at 108 holy water spouts & eternal natural gas flame." });
    candidatePool.push({ title: "Mustang Trans-Himalayan Desert Landscapes", description: "Traverse dramatic rain-shadow valleys & apple orchards." });
  }

  if (fullText.includes('lumbini')) {
    candidatePool.push({ title: "Maya Devi Temple & Buddha Birthplace", description: "Visit the sacred birthplace of Lord Buddha and ancient Nativity Pond." });
    candidatePool.push({ title: "Lumbini International Monastic Zone", description: "Tour peaceful monasteries built by nations around the world." });
  }

  if (fullText.includes('bandipur')) {
    candidatePool.push({ title: "Bandipur Preserved Newari Hill Station", description: "Explore 18th-century Newari architecture & cobblestone pedestrian streets." });
  }

  // General service fallbacks
  const generalPool = [
    { title: "Private Air-Conditioned Vehicle Support", description: "Door-to-door transfers in clean, insured private vehicles with professional driver." },
    { title: "Licensed English-Speaking Local Tour Guide", description: "Expert guided tours offering deep cultural insights and historical context." },
    { title: "Complimentary Cultural Farewell Dinner", description: "Traditional Nepalese dinner featuring live authentic cultural dance show." },
    { title: "24/7 Concierge & WhatsApp Travel Desk", description: "Dedicated customer support and trip assistance throughout your journey." }
  ];

  const combinedCandidates = [...candidatePool, ...generalPool];

  // Ensure list has at least 8 items
  for (const item of combinedCandidates) {
    if (list.length >= 8) break;
    const itemTitleLower = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const alreadyExists = list.some(existing => {
      const existLower = existing.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      return existLower.includes(itemTitleLower.substring(0, 15)) || itemTitleLower.includes(existLower.substring(0, 15));
    });
    if (!alreadyExists) {
      list.push(item);
    }
  }

  return list;
};

export const getCleanExcerpt = (text, maxSentences = 2) => {
  if (!text || typeof text !== 'string') return '';
  // 1. Strip all HTML tags e.g. <h3>, <p>, <strong>, <span>, <a>
  let clean = text.replace(/<[^>]*>/g, ' ');
  // 2. Remove markdown headers e.g. ### Header
  clean = clean.replace(/###\s+[^\n.]+/g, '');
  // 3. Remove markdown list bullets and bold asterisks
  clean = clean.replace(/^[*\-]\s+/gm, '');
  clean = clean.replace(/\*\*(.*?)\*\*/g, '$1');
  clean = clean.replace(/\*(.*?)\*/g, '$1');
  clean = clean.replace(/###/g, '');
  clean = clean.replace(/-\s*Key Highlight:\s*/gi, '');
  // 4. Normalize whitespace
  clean = clean.replace(/\s+/g, ' ').trim();
  // 5. Extract first maxSentences sentences
  const sentences = clean.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    return sentences.slice(0, maxSentences).join(' ').trim();
  }
  return clean.slice(0, 220).trim();
};

export const formatMarkdownToHTML = (text) => {
  if (!text) return '';
  if (typeof text !== 'string') return String(text);

  let html = text.trim();

  // 0. Remove any markdown images, <img> tags, or embedded HTML <div> card grids from overview
  html = html.replace(/!\[.*?\]\(.*?\)/gi, '');
  html = html.replace(/<img[^>]*>/gi, '');
  html = html.replace(/<div[^>]*>[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<\/?div[^>]*>/gi, '');

  // 1. Normalize line endings
  html = html.replace(/\r\n/g, '\n');

  // 2. Fix inline markdown formatting where newlines were missing before ### or - ** or -
  html = html.replace(/([^\n])\s*###\s+/g, '$1\n\n### ');
  html = html.replace(/([^\n])\s*-\s+\*\*/g, '$1\n- **');
  html = html.replace(/([^\n])\s*-\s+([A-Z0-9])/gi, '$1\n- $2');

  // 3. Headings (#, ##, ###)
  html = html.replace(/^###\s+(.*?)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>');
  html = html.replace(/^##\s+(.*?)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>');
  html = html.replace(/^#\s+(.*?)$/gm, '<h1 class="text-3xl font-extrabold text-gray-900 mt-8 mb-4">$1</h1>');

  // Catch any inline ### that didn't match start of line anchor
  html = html.replace(/\s*###\s+([^<\n]+)/g, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>');

  // 4. Bold & Italic (convert **text** to <strong>text</strong>)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 5. Bullet list items
  html = html.replace(/^[*\-]\s+(.*?)$/gm, '<li class="ml-5 list-disc my-1.5 text-gray-700">$1</li>');

  // Catch any remaining inline "- " bullet items
  html = html.replace(/\s*-\s+(<strong>.*?<\/strong>.*?)(?=(?:\s*-\s+|<h[1-6]|<p|$))/g, '<li class="ml-5 list-disc my-1.5 text-gray-700">$1</li>');

  // 6. Wrap consecutive <li> items in <ul>
  html = html.replace(/((?:<li class="ml-5 list-disc my-1.5 text-gray-700">[\s\S]*?<\/li>\s*)+)/g, '<ul class="my-4 space-y-1.5 list-disc pl-5">\n$1</ul>\n');

  // 7. Paragraph breaks
  html = html.replace(/\n\n+/g, '</p><p class="mt-4 text-gray-700 leading-relaxed text-justify">');
  html = html.replace(/\n/g, ' ');

  // 8. Safety cleanup: remove any orphan double asterisks ** or ###
  html = html.replace(/\*\*/g, '');
  html = html.replace(/###/g, '');

  html = html.trim();
  if (!html.startsWith('<')) {
    html = `<p class="text-gray-700 leading-relaxed text-justify">${html}</p>`;
  }

  return html;
};

