const fs = require('fs');

const path = 'src/pages/About.jsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

const startIdx = lines.findIndex(line => line.includes('{/* Our Comprehensive Services */}'));
const endIdx = lines.findIndex(line => line.includes('{/* Meet the Team */}')) - 1; // get the empty line above it as well

if (startIdx !== -1 && endIdx !== -1) {
  const block = lines.splice(startIdx, endIdx - startIdx + 1);
  const targetIdx = lines.findIndex(line => line.includes('{/* Our Story / Who We Are */}'));
  
  if (targetIdx !== -1) {
    lines.splice(targetIdx, 0, ...block);
    fs.writeFileSync(path, lines.join('\n'));
    console.log('Successfully moved the block.');
  } else {
    console.log('Target index not found.');
  }
} else {
  console.log('Start or end index not found.');
}
