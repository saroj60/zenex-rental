const fs = require('fs');
let db = JSON.parse(fs.readFileSync('server/database.json', 'utf8'));

const trekIndex = db.treks.findIndex(t => t.id === 'pikey-peak-trek');
if (trekIndex !== -1) {
  db.treks[trekIndex].bookingSteps = {
    title: "Add-ons & Options",
    intro: "Personalizing your Pikey Peak Trek - 9 Days —just follow these steps:",
    steps: [
      "Select your desired departure date",
      "Specify the number of participants/ travellers",
      "Click on the ‘Book Now’ or ‘Add to Cart’ button",
      "Choose from the available add-on options to enhance your experience",
      "Proceed with the advance payment to confirm your booking"
    ]
  };

  fs.writeFileSync('server/database.json', JSON.stringify(db, null, 2), 'utf8');
  const treksDataContent = 'export const treksData = ' + JSON.stringify(db.treks, null, 2) + ';';
  fs.writeFileSync('src/data/treksData.js', treksDataContent, 'utf8');
  console.log('Successfully added Pikey Peak addons/booking steps.');
}
