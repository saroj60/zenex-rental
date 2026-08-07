const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Function to recursively find all files with .jsx and .css extension
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

const files = findFiles(srcDir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  if (file.endsWith('index.css')) {
    content = content.replace(/--color-himalayan-blue: #0F4C81;/gi, '--color-himalayan-blue: #0F3493;');
    content = content.replace(/--color-primary-container: #0f4c81;/gi, '--color-primary-container: #0F3493;');
    content = content.replace(/--color-primary: #00355f;/gi, '--color-primary: #0F3493;');
    content = content.replace(/--color-surface-tint: #2d6197;/gi, '--color-surface-tint: #0F3493;');
    content = content.replace(/--color-sunset-orange: #F97316;/gi, '--color-sunset-orange: #E53A24;');
    content = content.replace(/--color-everest-white: #F8FAFC;/gi, '--color-everest-white: #EBF3FA;');
  }

  if (file.endsWith('.jsx')) {
    // Case-insensitive replacement for hex codes
    content = content.replace(/#ea580c/gi, '#e53a24');
    content = content.replace(/#331a47/gi, '#0f3493');
    content = content.replace(/#fcf9ee/gi, '#ebf3fa');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}

console.log('Color replacement complete.');
