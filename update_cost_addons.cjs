const fs = require('fs');
const path = './src/data/treksData.js';
let content = fs.readFileSync(path, 'utf8');

const newData = {
  "costIncludes": [
    "Transfer from Airport – Hotel - Airport including domestic transfers",
    "4 nights reservation in 4-star hotel, Kathmandu including breakfast on sharing basis",
    "Khumbu Gaupalika Tax + Sagarmatha National Park Permit fees",
    "Flight tickets from Kathmandu – Lukla (15 kilos per way per person), including of guide and airport taxes",
    "All meal (breakfast, lunch and dinner with a tea/ a coffee) during the trek",
    "Accommodation at lodge during the trek",
    "License holder English speaking Trekking Guide-s during the trek",
    "1 porter per 2-person basis during the trek",
    "Helicopter from Gorakshep to Kathmandu including airport taxes",
    "Insurance, equipment, accommodation, all meals and salary of the guide and porter(s).",
    "Duffel Bag for the trek",
    "Achievement certificates of Everest Base Camp Trek",
    "Farewell Dinner",
    "Company service charge",
    "All necessary government taxes and government fees"
  ],
  "costExcludes": [
    "International airfare & Nepal VISA fees",
    "Personal equipment",
    "Personal and medical insurance",
    "Emergency Rescue evacuation by helicopter incases needed",
    "Hot showers, electric charges and Wi-Fi during the trek",
    "Lunch and dinner in Kathmandu",
    "Visits and/or entrance fees to temples in Kathmandu",
    "Unforeseen expenses caused by uncontrollable circumstances such as flight cancellations or delays, blocked roads, weather conditions, natural disasters, altitude sickness, early termination or return of the program, etc.",
    "Tips",
    "Personal Expenses",
    "Any other expenses not mentioned in INCLUDED"
  ],
  "datesAvailability": "Once you’ve booked your trek, we’ll share the available dates and times for an online trip briefing. During this session, we’ll walk you through the gear checklist, explain what to expect on the journey, and answer any questions you may have. The briefing will be scheduled after we receive your essential documents.",
  "addOns": {
    "intro": "For our travellers interested for Everest Base Camp Trek with Helicopter Return, we would like to present a selection of exclusive add-ons to make your trekking experience comfortable and easier!",
    "options": [
      {
        "title": "Upgrade to 5-star standard accommodation in Kathmandu USD 280 per 2 person for 4 nights twin sharing basis",
        "description": "We have included 3 star hotel accommodation in Kathmandu, travellers willing to upgrade to 5-star standard hotel will have to pay extra USD 280 per 2 person."
      }
    ]
  },
  "bookingSteps": {
    "intro": "Personalizing your Everest Base Camp Trek with Helicopter Return - 12 Days —just follow these steps:",
    "steps": [
      "Select your desired departure date",
      "Specify the number of participants/ travellers",
      "Click on the ‘Book Now’ or ‘Add to Cart’ button",
      "Choose from the available add-on options to enhance your experience",
      "Proceed with the advance payment to confirm your booking"
    ]
  }
};

const str = Object.entries(newData).map(([k, v]) => `  "${k}": ${JSON.stringify(v, null, 4).replace(/\n/g, '\n  ')}`).join(',\n') + ',';

content = content.replace(/"id": "ebc-heli-return"/, `"id": "ebc-heli-return",\n${str}`);

fs.writeFileSync(path, content, 'utf8');
console.log('Cost details and add-ons added successfully!');
