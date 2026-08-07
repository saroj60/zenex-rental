const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const images = fs.readdirSync(imagesDir).filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp') || file.endsWith('.jpeg'));

function extractBaseName(filename) {
    let base = filename.replace(/\.(jpg|png|webp|jpeg)$/i, '');
    base = base.toLowerCase().replace(/[^a-z0-9]/g, '');
    return base;
}

const imageMap = {};
images.forEach(img => {
    imageMap[extractBaseName(img)] = `/images/${img}`;
});

// Manual overrides
const manualMap = {
    'kathmandu-chandragiri-4d': '/images/kathmandu valley.jpg', // or similar
};

// Update Packages.jsx
const packagesFile = path.join(__dirname, 'src', 'pages', 'Packages.jsx');
let packagesContent = fs.readFileSync(packagesFile, 'utf8');

let packagesUpdated = 0;
// Use [\s\S]*? to match across newlines
packagesContent = packagesContent.replace(/(title:\s*['"])(.*?)(['"][\s\S]*?img:\s*['"])(.*?)(['"])/g, (match, p1, title, p3, oldImg, p5) => {
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    let bestMatch = null;
    let bestScore = 0;
    
    for (const [imgName, imgPath] of Object.entries(imageMap)) {
        // e.g. "jomsommuktinathtour9days" matches "jomsommuktinathtour9days"
        if (cleanTitle.includes(imgName) || imgName.includes(cleanTitle)) {
            const score = Math.max(imgName.length, cleanTitle.length);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = imgPath;
            }
        }
    }
    
    if (!bestMatch) {
        // Try loose matching
        for (const [imgName, imgPath] of Object.entries(imageMap)) {
            if (imgName.includes('annapurna') && cleanTitle.includes('annapurna')) bestMatch = imgPath;
            if (imgName.includes('muktinath') && cleanTitle.includes('muktinath')) bestMatch = imgPath;
            if (imgName.includes('tibet') && cleanTitle.includes('tibet')) bestMatch = imgPath;
            if (imgName.includes('everest') && cleanTitle.includes('everest')) bestMatch = imgPath;
            if (imgName.includes('chitwan') && cleanTitle.includes('chitwan')) bestMatch = imgPath;
        }
    }
    
    if (bestMatch && oldImg !== bestMatch) {
        packagesUpdated++;
        return `${p1}${title}${p3}${bestMatch}${p5}`;
    }
    return match;
});

fs.writeFileSync(packagesFile, packagesContent);
console.log(`Updated ${packagesUpdated} packages in Packages.jsx`);

// Update AppDataContext.jsx (Destinations)
const contextFile = path.join(__dirname, 'src', 'context', 'AppDataContext.jsx');
let contextContent = fs.readFileSync(contextFile, 'utf8');

let destUpdated = 0;
contextContent = contextContent.replace(/(name:\s*['"])(.*?)(['"][\s\S]*?img:\s*['"])(.*?)(['"])/g, (match, p1, name, p3, oldImg, p5) => {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    let bestMatch = null;
    
    if (cleanName.includes('kathmandu')) bestMatch = '/images/destinations/kathmandu valley.jpg'; // just guessing? we have /images/kathmandu valley.jpg in root maybe
    // Let's check root
    for (const [imgName, imgPath] of Object.entries(imageMap)) {
        if (imgName.includes('kathmandu') && cleanName.includes('kathmandu')) bestMatch = imgPath;
    }
    
    if (bestMatch && oldImg !== bestMatch) {
        destUpdated++;
        return `${p1}${name}${p3}${bestMatch}${p5}`;
    }
    return match;
});

fs.writeFileSync(contextFile, contextContent);
console.log(`Updated ${destUpdated} destinations in AppDataContext.jsx`);
