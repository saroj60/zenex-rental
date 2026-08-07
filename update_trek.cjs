const fs = require('fs');
const path = './src/data/treksData.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/id:\s*['"]ebc-heli-return['"][\s\S]*?}/, (match) => {
    let newMatch = match;
    newMatch = newMatch.replace(/difficulty:\s*['"].*?['"]/, 'difficulty: "Moderate"');
    newMatch = newMatch.replace(/activity:\s*['"].*?['"]/, 'activity: "Walking / Hiking / Heli"');
    newMatch = newMatch.replace(/"accommodation":\s*['"].*?['"]/, '"accommodation": "Hotels / Lodges"');
    newMatch = newMatch.replace(/"bestSeason":\s*['"].*?['"]/, '"bestSeason": "Spring & Autumn"');
    newMatch = newMatch.replace(/"maxAltitude":\s*['"].*?['"]/, '"maxAltitude": "5545"');
    return newMatch;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Trek updated successfully!');
