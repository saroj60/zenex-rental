const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const filesToUpdate = {
  'About.jsx': {
    title: 'About Zenex Travel | Best Tour & Travel Company in Nepal',
    desc: 'Learn about Zenex Travel, the best tour operator and car rental company in Nepal. We offer premium travel services, certified guides, and reliable vehicles.',
    url: 'https://zenextravel.com.np/about'
  },
  'Destinations.jsx': {
    title: 'Top Destinations in Nepal | Explore Kathmandu, Pokhara, Chitwan',
    desc: 'Discover the best tourist destinations in Nepal. Plan your next adventure to Kathmandu, Pokhara, Lumbini, and the Himalayas with our expert travel guides.',
    url: 'https://zenextravel.com.np/destinations'
  },
  'Packages.jsx': {
    title: 'Nepal Tour Packages | Best Holiday & Adventure Tours in Nepal',
    desc: 'Book the best Nepal tour packages, holiday packages, and adventure tours. From family tours to luxury honeymoon packages, we offer unbeatable prices.',
    url: 'https://zenextravel.com.np/packages'
  },
  'Tours.jsx': {
    title: 'Adventure Tours Nepal | Luxury & Budget Tours in Nepal',
    desc: 'Experience the thrill of adventure tours in Nepal. We offer a wide range of luxury tours, budget tours, and custom holiday packages across Nepal.',
    url: 'https://zenextravel.com.np/tours'
  },
  'Blogs.jsx': {
    title: 'Nepal Travel Blog | Car Rental Tips & Trekking Guides',
    desc: 'Read our latest travel blogs for tips on renting cars in Nepal, trekking guides, packing lists, and the best time to visit Nepal.',
    url: 'https://zenextravel.com.np/blog'
  },
  'AirportRental.jsx': {
    title: 'Kathmandu Airport Pickup | Airport Transfer Nepal',
    desc: 'Reliable Kathmandu airport pickup and airport transfer services in Nepal. Hire cars, SUVs, or tourist buses for seamless transportation from Tribhuvan International Airport.',
    url: 'https://zenextravel.com.np/airport-transfer'
  }
};

for (const [filename, seoData] of Object.entries(filesToUpdate)) {
  const filePath = path.join(pagesDir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if SEO is already imported
  if (!content.includes('import SEO from')) {
    content = content.replace(/(import React.*?;\n)/, `$1import SEO from '../components/SEO';\n`);
  }

  // Inject SEO component right after the first <div className="..."> or <> in the return statement
  if (!content.includes('<SEO')) {
    const seoComponent = `
      <SEO 
        title="${seoData.title}"
        description="${seoData.desc}"
        canonicalUrl="${seoData.url}"
      />`;
    
    // Find return ( and the first wrapper element
    content = content.replace(/(return\s*\(\s*<[^>]+>)/, `$1${seoComponent}`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filename}`);
  }
}

// Special update for Home.jsx to optimize Primary Keywords
const homePath = path.join(pagesDir, 'Home.jsx');
let homeContent = fs.readFileSync(homePath, 'utf8');
homeContent = homeContent.replace(
  /title=".*?"/, 
  `title="Best Tour Operator & Travel Company in Nepal | Car Rental"`
);
homeContent = homeContent.replace(
  /description=".*?"/, 
  `description="Zenex Travel is the best tour and travel company in Nepal. We offer premium trekking packages, holiday tours, and car rental services in Kathmandu and beyond."`
);
fs.writeFileSync(homePath, homeContent);
console.log('Updated Home.jsx');
