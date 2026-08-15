const fs = require('fs');
const databasePath = './database.json';

let rawdata = fs.readFileSync(databasePath);
let data = JSON.parse(rawdata);

const targetIds = ['jiri-ebc-trek', 'jiri-to-everest-base-camp-22-days'];

let updated = false;

data.treks = data.treks.map(trek => {
  if (targetIds.includes(trek.id)) {
    updated = true;
    return {
      ...trek,
      price: "US$975",
      originalPrice: "US$1030",
      groupDiscounts: {
        "2": 975,
        "4": 820,
        "8": 790,
        "12": 730
      }
    };
  }
  return trek;
});

if (data.packages) {
  data.packages = data.packages.map(pkg => {
    if (targetIds.includes(pkg.id)) {
      return {
        ...pkg,
        price: "US$975"
      };
    }
    return pkg;
  });
}

if (updated) {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  console.log('Pricing updated successfully!');
} else {
  console.log('Treks not found.');
}
