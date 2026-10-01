const fs = require('fs');
const path = require('path');

const imageMapping = {
  "mustang-jeep-rental-guide": "/vehicles/Mahindra Scorpio.jpg",
  "ebc-packing-list": "/images/Everest Base Camp & Gokyo.jpg",
  "pokhara-adventure-guide": "/hero-paragliding-mountain.jpg",
  "ebc-trek-guide-2026": "/images/everest base.jpg",
  "annapurna-circuit-vs-abc": "/images/manang2.jpg",
  "langtang-valley-trek-guide": "/images/langtang1.jpg",
  "top-10-nepal-tours-2026": "/hero-kathmandu-durbar.jpg",
  "upper-mustang-4x4-overland": "/images/upper mustang.jpg",
  "nepal-travel-guide-2026": "/images/kathmandu.jpg",
  "ghorepani-poonhill-ghandruk-guide": "/images/Ghorepani Poon Hill.jpg",
  "chitwan-pokhara-7-day-tour": "/hero-chitwan-elephant.jpg"
};

// Check that all files exist in public/
console.log("Verifying files in public/...");
let allExist = true;
for (const [id, urlPath] of Object.entries(imageMapping)) {
  const relativePath = urlPath.replace(/^\//, '');
  const filePath = path.join(__dirname, '..', 'public', relativePath);
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File does not exist: ${filePath}`);
    allExist = false;
  } else {
    console.log(`OK: ${urlPath} (${fs.statSync(filePath).size} bytes)`);
  }
}

if (!allExist) {
  console.error("Some files are missing! Aborting.");
  process.exit(1);
}

// 1. Update backend/database/db.json
const dbPath = path.join(__dirname, '..', 'backend', 'database', 'db.json');
if (fs.existsSync(dbPath)) {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  if (Array.isArray(dbData.blogs)) {
    let updatedCount = 0;
    dbData.blogs.forEach(blog => {
      if (imageMapping[blog.id]) {
        console.log(`Updating db.json blog "${blog.id}": -> ${imageMapping[blog.id]}`);
        blog.coverImage = imageMapping[blog.id];
        updatedCount++;
      }
    });
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
    console.log(`Updated ${updatedCount} blogs in backend/database/db.json`);
  }
}

// 2. Also update STATIC_FALLBACK_BLOGS in src/context/BlogContext.jsx
const blogContextPath = path.join(__dirname, '..', 'src', 'context', 'BlogContext.jsx');
if (fs.existsSync(blogContextPath)) {
  let content = fs.readFileSync(blogContextPath, 'utf8');
  for (const [id, urlPath] of Object.entries(imageMapping)) {
    // Regex to match the block for this blog id and update its coverImage
    const regex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"coverImage":\\s*")[^"]*(")`);
    content = content.replace(regex, `$1${urlPath}$2`);
  }
  fs.writeFileSync(blogContextPath, content, 'utf8');
  console.log("Updated STATIC_FALLBACK_BLOGS in BlogContext.jsx");
}

// 3. Sync to public/database.json, server/database.json, zenex-deploy
const syncDbs = [
  path.join(__dirname, '..', 'public', 'database.json'),
  path.join(__dirname, '..', 'server', 'database.json'),
  path.join(__dirname, '..', 'zenex-deploy', 'database', 'db.json')
];

syncDbs.forEach(dest => {
  if (fs.existsSync(path.dirname(dest))) {
    fs.copyFileSync(dbPath, dest);
    console.log(`Synced to ${dest}`);
  }
});

console.log("ALL BLOG IMAGES SUCCESSFULLY UPDATED!");
