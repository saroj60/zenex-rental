const fs = require('fs');
let db = JSON.parse(fs.readFileSync('server/database.json', 'utf8'));

const trekIndex = db.treks.findIndex(t => t.id === 'jiri-ebc-trek');
if (trekIndex !== -1) {
  db.treks[trekIndex].flightInfo = {
    title: 'Lukla Flight Information',
    routes: [
      {
        name: 'Flight from Ramechhap (March, April, May, October & November)',
        details: 'During the peak seasons of (Spring) March to May and October to November (Autumn), due to the high volume of tourists and maximum flights to Lukla, the Government of Nepal normally decides to operate flights from Ramechhap instead of Kathmandu to avoid air traffic. If flying from Ramechhap, we will have to wake up at 1 or 2 AM and take a 5–6-hour drive from Kathmandu to Ramechhap in a private or shared vehicle. From Ramechhap, we will take a 20-minute flight to Lukla.'
      },
      {
        name: 'Flight from Kathmandu (December - September)',
        details: 'During the off-peak months from December to September (i.e Winter / Monsoon), due to fewer tourists, flights to Lukla operate directly from Kathmandu. We have to wake up at about 5 or 6 AM and then meet guide at the hotel and drive to TIA airport and take 35-minute flights to Lukla.'
      }
    ]
  };

  // Remove from extendedInfo
  db.treks[trekIndex].extendedInfo = db.treks[trekIndex].extendedInfo.filter(info => info.title !== 'Lukla Flight Information');

  fs.writeFileSync('server/database.json', JSON.stringify(db, null, 2), 'utf8');
  const treksDataContent = 'export const treksData = ' + JSON.stringify(db.treks, null, 2) + ';';
  fs.writeFileSync('src/data/treksData.js', treksDataContent, 'utf8');
  console.log('Successfully structured flight info.');
}
