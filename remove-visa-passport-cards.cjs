const fs = require('fs');

const filePath = 'src/pages/PackageDetail.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Count before
const countBefore = (content.match(/title: ['"](?:Visa|Visa Requirements|Visa Fees|Passport|Passport & Visas|Passport Validity)/g) || []).length;
console.log('Visa/Passport entries before:', countBefore);

// Remove lines like:
//   { title: 'Visa', content: '...' },
//   { title: 'Visa Fees', content: '...' },
//   { title: 'Visa Requirements', details: '...' },
//   { title: 'Passport & Visas', content: '...' },
//   { title: 'Passport Validity', details: '...' },
// These are single-line entries in essentialInfo arrays

const patterns = [
  // { title: 'Visa', content/details: '...' },
  /^[ \t]*\{ title: ['"]Visa['"],.*\},?\r?\n/gm,
  // { title: 'Visa Fees', content/details: '...' },
  /^[ \t]*\{ title: ['"]Visa Fees['"],.*\},?\r?\n/gm,
  // { title: 'Visa Requirements', details: '...' },
  /^[ \t]*\{ title: ['"]Visa Requirements['"],.*\},?\r?\n/gm,
  // { title: 'Passport & Visas', ... },
  /^[ \t]*\{ title: ['"]Passport & Visas['"],.*\},?\r?\n/gm,
  // { title: 'Passport & Visas' with HTML entity
  /^[ \t]*\{ title: ['"]Passport &amp; Visas['"],.*\},?\r?\n/gm,
  // { title: 'Passport Validity', ... },
  /^[ \t]*\{ title: ['"]Passport Validity['"],.*\},?\r?\n/gm,
];

patterns.forEach(re => {
  const before = content.length;
  content = content.replace(re, '');
  const removed = before - content.length;
  if (removed > 0) console.log(`  Removed ${removed} chars matching ${re.source.substring(0, 50)}...`);
});

// Count after
const countAfter = (content.match(/title: ['"](?:Visa|Visa Requirements|Visa Fees|Passport|Passport & Visas|Passport Validity)/g) || []).length;
console.log('Visa/Passport entries after:', countAfter);

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n✅ Done. File updated.');
