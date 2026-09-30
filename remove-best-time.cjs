const fs = require('fs');

const filePath = 'src/pages/PackageDetail.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const before = content.length;

// Remove ### Best Time ... sections (heading + following paragraph until next ### or end of template literal)
// Pattern: ### Best Time <anything on same line>\n<text until next ### or end of backtick string>
content = content.replace(
  /\n### Best Time[^\n]*\n[^`]*?(?=\n###|\n`)/g,
  ''
);

// Also handle cases where Best Time section is the very last section before the closing backtick
content = content.replace(
  /\n### Best Time[^\n]*\n[^`]*?(?=`)/g,
  '\n'
);

const after = content.length;
fs.writeFileSync(filePath, content, 'utf8');
console.log(`Done. Removed ${before - after} chars from PackageDetail.jsx`);

// Verify no Best Time ### headers remain
const remaining = (content.match(/### Best Time/g) || []).length;
console.log('Remaining ### Best Time occurrences:', remaining);
