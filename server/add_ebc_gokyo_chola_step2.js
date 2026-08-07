const fs = require('fs');

const databasePath = './database.json';
let data = JSON.parse(fs.readFileSync(databasePath));

const existingIndex = data.treks.findIndex(t => t.id === "ebc-gokyo-chola-pass-17-days");
if (existingIndex !== -1) {
  const trek = data.treks[existingIndex];
  
  // Paraphrasing the new sections
  const extraDescription = `

### Everything You Need to Know About Cho La Pass (5,330m)
Acting as the vital bridge between the Gokyo Valley and Everest Base Camp, the Cho La Pass is widely regarded as a formidable 'summit pass'. Conquering its steep, rocky, and often snow-covered terrain requires resilience, but with the support of our expert guides, the effort is incredibly rewarding. Reaching the top reveals jaw-dropping panoramic views of Mount Ama Dablam, Cholatse, Pumori, and Lobuche. From this vantage point, trekkers descend from the serenity of the Gokyo valley to the legendary trail leading directly to Everest Base Camp.

### Who Can Do This Trek?
This journey is achievable for anyone with a passion for adventure and walking. Here’s a quick breakdown:
- **Beginners with Great Fitness:** You don’t need mountaineering experience. If you are healthy, can walk 5 to 7 hours daily, and possess a strong mindset, you can successfully complete this trek.
- **Moderately Experienced Trekkers:** If you have prior hiking experience, this trek serves as a fantastic next-level challenge testing your endurance at higher altitudes.
- **All Group Sizes:** Whether you're traveling solo, as a couple, or in a large group, this well-traveled route offers an unforgettable shared experience in the Himalayas.

### Why Choose Asian Adventure Treks & Expedition?
With over two decades of expertise, our team knows these trails intimately. We handle all logistics—from permits and Lukla flights to tea-house accommodations—allowing you to focus entirely on the adventure. Our local Sherpa guides and porters prioritize your safety, adjusting the pace to your comfort while sharing their rich cultural heritage. By trekking with us, you are also supporting responsible tourism and local Himalayan communities.

### Alternative Treks
If you are constrained by time or prefer a less challenging route, consider these fantastic alternatives:
- Everest Base Camp Trek (15 Days)
- Everest Base Camp Trek & Return by Helicopter (12 Days)
- Everest Renjo La Pass to Gokyo Trek (13 Days)
- Everest View Trek (5 to 7 Days)`;

  // Append to existing description
  if (!trek.description.includes('Cho La Pass (5,330m)')) {
    trek.description += extraDescription;
  }

  // Update gallery
  trek.gallery = [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534122841883-8a3d6ba22b2a?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80"
  ];

  // Update itinerary (Outline)
  trek.itinerary = [
    { day: 1, title: "Arrival in Kathmandu (1350 m)", details: "Welcome to Nepal! Upon your arrival in Kathmandu, our representative will transfer you to your hotel." },
    { day: 2, title: "Kathmandu – Lukla (2840 m) – Phakding (2610 m)", details: "Take a thrilling flight to Lukla and begin the trek with a gentle walk to Phakding." },
    { day: 3, title: "Phakding - Namche Bazar (3440 m)", details: "Trek along the Dudh Koshi river, crossing suspension bridges to reach the bustling Sherpa hub of Namche Bazaar." },
    { day: 4, title: "Acclimatization & Hike to Everest View Hotel (3880 m)", details: "A vital acclimatization day featuring a hike to the Everest View Hotel for your first panoramic views of Mount Everest." },
    { day: 5, title: "Namche Bazar – Phortse Tenga (3680 m) – Dole (4200 m)", details: "Leave the main EBC trail and ascend through rhododendron forests towards the quiet settlement of Dole." },
    { day: 6, title: "Dole – Machermo (4470 m)", details: "A shorter trekking day for acclimatization, offering excellent views of Cho Oyu, Kantega, and Thamserku." },
    { day: 7, title: "Machermo – Gokyo (4790 m)", details: "Trek through the rocky landscape to reach the pristine, turquoise waters of the Gokyo Lakes." },
    { day: 8, title: "Gokyo – Gokyo Ri (5360 m) - Thagnag (4700 m)", details: "Early morning hike up Gokyo Ri for spectacular sunrise views, followed by a descent and trek to Thagnag at the base of Cho La Pass." },
    { day: 9, title: "Thagnag – Chola Pass (5330 m) – Dzonglha (4830 m)", details: "The most challenging day: crossing the steep, glaciated Cho La Pass, before descending to Dzonglha." },
    { day: 10, title: "Dzonglha – Gorakshep (5140 m)", details: "Rejoin the main EBC trail and trek alongside the Khumbu Glacier to Gorakshep, the last settlement before Base Camp." },
    { day: 11, title: "Gorakshep – Kala Patthar (5545 m) – EBC (5360 m) - Lobuche (4910 m)", details: "An epic day! Hike to Kala Patthar for iconic Everest views, visit Everest Base Camp itself, and descend to Lobuche." },
    { day: 12, title: "Lobuche - Tengboche (3860 m)", details: "Descend rapidly, enjoying the rich oxygen, to reach the spiritual center of the Khumbu region at Tengboche." },
    { day: 13, title: "Tengboche (3860 m) – Namche Bazar (3440 m)", details: "Trek down through lush alpine forests back to Namche Bazaar." },
    { day: 14, title: "Namche Bazar – Phakding – Lukla (2840 m)", details: "The final day of walking takes you back down the Dudh Koshi valley to Lukla." },
    { day: 15, title: "Lukla - Kathmandu (1350 m)", details: "Take the scenic morning flight back to Kathmandu and transfer to your hotel." },
    { day: 16, title: "Kathmandu Free Day", details: "A buffer day for relaxation, shopping, or optional sightseeing around the Kathmandu valley." },
    { day: 17, title: "Final Departure", details: "Our representative will transfer you to the airport for your onward journey." }
  ];

  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  console.log('EBC Gokyo Chola Phase 2 updated successfully!');
} else {
  console.log('Trek not found!');
}
