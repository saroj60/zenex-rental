const fs = require('fs');

const databasePath = './database.json';
let db = JSON.parse(fs.readFileSync(databasePath));

const ebc = db.treks.find(t => t.id === 'everest-base-camp-15-days');

if (ebc) {
  ebc.equipmentList = [
    {
      category: "Clothing",
      items: [
        "Moisture-wicking base layers (shirts & underwear)",
        "Fleece jacket or warm pullover",
        "Lightweight but extremely warm down jacket",
        "Waterproof/windproof outer shell jacket & trousers",
        "Comfortable trekking pants & t-shirts"
      ]
    },
    {
      category: "Headwear & Handwear",
      items: [
        "Warm fleece or wool hat",
        "Sun cap & UV protection sunglasses",
        "Neck gaiter (buff) for wind & dust",
        "Lightweight inner gloves & waterproof insulated mittens"
      ]
    },
    {
      category: "Footwear",
      items: [
        "Sturdy, well broken-in trekking boots",
        "Moisture-wicking trekking socks",
        "Camp shoes or sandals for evening relaxation"
      ]
    },
    {
      category: "Gear & Accessories",
      items: [
        "25-35L Daypack with rain cover",
        "Warm sleeping bag (rated to -10°C/14°F or lower)",
        "Adjustable trekking poles",
        "Water bottles or hydration bladder & purification tablets",
        "Headlamp with spare batteries"
      ]
    },
    {
      category: "Health & Hygiene",
      items: [
        "Personal First Aid kit & blister treatments",
        "Altitude sickness meds (e.g., Diamox, consult doctor)",
        "Biodegradable soap, wet wipes, and toilet paper",
        "High SPF Sunscreen & lip balm"
      ]
    }
  ];

  ebc.difficultyInfo = "The Everest Base Camp Trek is a moderate-to-challenging adventure (Grade 3). While it requires no technical climbing or ropes, it demands excellent stamina, mental resilience, and physical fitness to handle 5 to 6 hours of daily walking. You will reach a maximum altitude of 5,545m at Kala Patthar and sleep as high as 5,140m at Gorakshep. The gradual ascent through Namche Bazaar and Dingboche helps ensure proper acclimatization, allowing you to safely enjoy the stunning Himalayan terrain.";

  ebc.altitudeSickness = {
    description: "Acute Mountain Sickness (AMS) can affect anyone above 3,500m due to lower oxygen levels. Symptoms may include headaches, nausea, dizziness, fatigue, and difficulty sleeping. Since this trek sleeps above 5,000m, taking precautions is absolutely critical.",
    prevention: [
      "Ascend Gradually: Follow the itinerary carefully and avoid rushing.",
      "Hydrate Often: Drink 3-4 liters of water daily. Garlic soup and ginger tea are great natural remedies.",
      "Eat Well: Keep your energy up with carb-rich meals, even if you lose your appetite.",
      "Stay Warm: Protect your chest, head, and extremities from the biting cold."
    ]
  };

  fs.writeFileSync(databasePath, JSON.stringify(db, null, 2));
  console.log("Updated EBC with paraphrased guides and equipment!");
}
