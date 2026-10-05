const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'backend', 'database', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Cultural Village & Safari Equipment (Ghalegaun & Chitwan, Ghorepani & Chitwan)
const villageSafariEquipment = [
  {
    category: "1. Clothing & Layering",
    items: [
      { name: "Moisture-wicking T-shirts (Short & Long Sleeve)", required: true, quantity: 4 },
      { name: "Lightweight Trekking Pants & Casual Convertible Trousers", required: true, quantity: 2 },
      { name: "Warm Fleece Jacket or Microfleece Pullover", required: true, quantity: 1 },
      { name: "Lightweight Insulated Down Jacket (for cool mountain evenings & sunrise viewpoints)", required: true, quantity: 1 },
      { name: "Waterproof & Windproof Outer Shell Jacket", required: true, quantity: 1 },
      { name: "Neutral-colored Safari Clothes (Khaki, Olive, Tan for Chitwan jungle safari)", required: true, quantity: 2 },
      { name: "Wide-brim Sun Hat & Lightweight Warm Beanie", required: true, quantity: 2 }
    ]
  },
  {
    category: "2. Footwear & Socks",
    items: [
      { name: "Comfortable Light Hiking Boots or Sturdy Trail Walking Shoes", required: true, quantity: 1 },
      { name: "Casual Sandals / Slip-on Camp Shoes (ideal for homestays & lodge relaxing)", required: true, quantity: 1 },
      { name: "Moisture-wicking Hiking Socks (anti-blister)", required: true, quantity: 3 },
      { name: "Breathable Cotton Casual Socks", required: true, quantity: 3 }
    ]
  },
  {
    category: "3. Bags & Packing Gear",
    items: [
      { name: "Daypack (20L–30L) with Waterproof Rain Cover (for daily village walks & safari)", required: true, quantity: 1 },
      { name: "Main Duffel Bag or Travel Suitcase (with sturdy zipper & padlock)", required: true, quantity: 1 },
      { name: "Waterproof Dry Bag / Pouch (for safeguarding electronics during canoe rides)", required: true, quantity: 1 },
      { name: "Packing Cubes / Stuff Sacks for organized luggage", required: false, quantity: 3 }
    ]
  },
  {
    category: "4. Safari & Outdoor Essentials",
    items: [
      { name: "Compact Binoculars (8x42 or 10x42 for wildlife & bird watching)", required: true, quantity: 1 },
      { name: "Polarized UV-Protection Sunglasses", required: true, quantity: 1 },
      { name: "Reusable Water Bottle (1L–1.5L) or Hydration Bladder", required: true, quantity: 1 },
      { name: "LED Headlamp or Compact Flashlight (with extra batteries for homestay evenings)", required: true, quantity: 1 },
      { name: "Lightweight Trekking Poles (helpful for village stone staircases)", required: false, quantity: 1 }
    ]
  },
  {
    category: "5. Personal Care & Insect Protection",
    items: [
      { name: "Mosquito & Insect Repellent (with DEET, essential for Chitwan jungle activities)", required: true, quantity: 1 },
      { name: "High-SPF Sunscreen (SPF 50+) & UV Lip Balm", required: true, quantity: 1 },
      { name: "Biodegradable Wet Wipes & Hand Sanitizer", required: true, quantity: 2 },
      { name: "Quick-drying Microfiber Travel Towel", required: true, quantity: 1 },
      { name: "Personal Toiletries Kit (Toothbrush, toothpaste, biodegradable soap & shampoo)", required: true, quantity: 1 }
    ]
  },
  {
    category: "6. First Aid & Health Care",
    items: [
      { name: "Personal Prescription Medications (sufficient for duration of trip)", required: true, quantity: 1 },
      { name: "Basic First Aid Kit (Band-aids, antiseptic cream, gauze, blister pads)", required: true, quantity: 1 },
      { name: "Pain Relievers (Paracetamol / Ibuprofen) & Anti-inflammatory tablets", required: true, quantity: 1 },
      { name: "Anti-Diarrheal Medication & Oral Rehydration Salts (ORS sachets)", required: true, quantity: 1 },
      { name: "Motion Sickness / Car Sickness Pills (for winding mountain roads)", required: false, quantity: 1 }
    ]
  },
  {
    category: "7. Electronics & Travel Documents",
    items: [
      { name: "Universal Travel Power Adapter (Compatible with Nepal plug types C, D, M)", required: true, quantity: 1 },
      { name: "High-Capacity Portable Power Bank (10,000–20,000 mAh for homestays)", required: true, quantity: 1 },
      { name: "Camera or Smartphone with Extra Memory Cards and Charging Cables", required: true, quantity: 1 },
      { name: "Valid Passport, Nepal Visa Copy & Travel Insurance Policy Documents", required: true, quantity: 1 },
      { name: "Cash in Nepalese Rupees (NPR) for village homestay extras, snacks & tips", required: true, quantity: 1 }
    ]
  }
];

// 2. High-Altitude Himalayan Trekking Equipment
const highAltitudeTrekEquipment = [
  {
    category: "1. Base & Thermal Clothing",
    items: [
      { name: "Moisture-wicking Shirts (Long & Short Sleeve)", required: true, quantity: 4 },
      { name: "Thermal Underwear / Base Layers (Top & Bottom, Merino wool or synthetic)", required: true, quantity: 2 },
      { name: "Breathable Underwear (Quick-drying)", required: true, quantity: 4 }
    ]
  },
  {
    category: "2. Insulation & Outer Layers",
    items: [
      { name: "Warm Fleece Jacket or Polartec Pullover", required: true, quantity: 1 },
      { name: "High-Loft Warm Down Jacket (-10°C to -15°C rated for high altitude)", required: true, quantity: 1 },
      { name: "Waterproof & Windproof Hooded Outer Jacket (Gore-Tex or breathable shell)", required: true, quantity: 1 },
      { name: "Waterproof & Windproof Shell Trousers", required: true, quantity: 1 }
    ]
  },
  {
    category: "3. Trekking Pants & Headwear",
    items: [
      { name: "Quick-drying Trekking Pants & Convertible Trousers", required: true, quantity: 2 },
      { name: "Warm Woolen / Fleece Beanie & Wide-Brim Sun Hat", required: true, quantity: 2 },
      { name: "Buff, Bandana or Neck Gaiter (essential for dust and cold winds)", required: true, quantity: 2 },
      { name: "UV Polarized Sunglasses (Category 3 or 4 for high-altitude snow glare)", required: true, quantity: 1 }
    ]
  },
  {
    category: "4. Gloves & Footwear",
    items: [
      { name: "Lightweight Inner Liner Gloves (fleece or touchscreen-compatible)", required: true, quantity: 1 },
      { name: "Heavyweight Insulated Waterproof Gloves / Mittens", required: true, quantity: 1 },
      { name: "Broken-in High-Ankle Trekking Boots with Good Traction", required: true, quantity: 1 },
      { name: "Cushioned Merino Wool Trekking Socks (anti-blister)", required: true, quantity: 4 },
      { name: "Lightweight Camp Shoes / Trekking Sandals (for teahouses)", required: true, quantity: 1 }
    ]
  },
  {
    category: "5. Backpacks & Sleeping Gear",
    items: [
      { name: "Daypack (25L–35L) with Integrated Rain Cover (for daily hiking)", required: true, quantity: 1 },
      { name: "Duffel Bag (60L–80L) Waterproof & Lockable (carried by porters)", required: true, quantity: 1 },
      { name: "Four-Season Sleeping Bag (-10°C / 14°F rated or lower)", required: true, quantity: 1 },
      { name: "Fleece Sleeping Bag Liner (for added warmth and hygiene)", required: false, quantity: 1 },
      { name: "Adjustable Lightweight Trekking Poles (pair)", required: true, quantity: 1 }
    ]
  },
  {
    category: "6. Hydration, Health & Hygiene",
    items: [
      { name: "Insulated Water Bottles (1L x 2) / Hydration Bladder", required: true, quantity: 2 },
      { name: "Water Purification Tablets / Aquatabs or UV Purifier", required: true, quantity: 1 },
      { name: "First Aid Kit & Altitude Medicine (Diamox / Acetazolamide)", required: true, quantity: 1 },
      { name: "High-SPF Sunscreen (SPF 50+) & Moisturizing Lip Balm with UV protection", required: true, quantity: 1 },
      { name: "Biodegradable Wet Wipes, Hand Sanitizer & Quick-dry Camp Towel", required: true, quantity: 1 },
      { name: "LED Headlamp with Extra Batteries (essential for early morning summit hikes)", required: true, quantity: 1 },
      { name: "High-Capacity Power Bank (10,000–20,000 mAh) & Universal Plug Adapter", required: true, quantity: 1 }
    ]
  }
];

let updatedCount = 0;

['tourTrips', 'packages', 'treks'].forEach(col => {
  if (!Array.isArray(db[col])) return;
  db[col].forEach(item => {
    // Specifically handle TRIP-ghalegaun-chitwan-10d and similar packages with <= 2 categories
    const isGhalegaun = item.id === 'TRIP-ghalegaun-chitwan-10d' || (item.slug && item.slug.includes('ghalegaun'));
    const isChitwanCombo = isGhalegaun || (item.title && item.title.toLowerCase().includes('chitwan') && item.title.toLowerCase().includes('trek'));
    const isTruncated = item.equipment && item.equipment.length > 0 && item.equipment.length <= 2;

    if (isGhalegaun || (isChitwanCombo && isTruncated)) {
      item.equipment = villageSafariEquipment;
      updatedCount++;
      console.log(`Updated ${col} [${item.id}]: ${item.title} -> Village & Safari Equipment (7 categories)`);
    } else if (isTruncated) {
      item.equipment = highAltitudeTrekEquipment;
      updatedCount++;
      console.log(`Updated ${col} [${item.id}]: ${item.title} -> High Altitude Trek Equipment (6 categories)`);
    }
  });
});

console.log(`Total packages updated: ${updatedCount}`);

// Save to backend/database/db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Saved to backend/database/db.json');

// Sync to other database locations
const syncDestinations = [
  path.join(__dirname, '..', 'public', 'database.json'),
  path.join(__dirname, '..', 'server', 'database.json'),
  path.join(__dirname, '..', 'zenex-deploy', 'database', 'db.json')
];

syncDestinations.forEach(dest => {
  if (fs.existsSync(path.dirname(dest))) {
    fs.writeFileSync(dest, JSON.stringify(db, null, 2), 'utf8');
    console.log(`Synced to ${dest}`);
  }
});
