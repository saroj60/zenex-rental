const fs = require('fs');
const path = require('path');

const packageFile = path.join(__dirname, 'src', 'pages', 'PackageDetail.jsx');
let content = fs.readFileSync(packageFile, 'utf8');

if (!content.includes('import SEO from')) {
  content = content.replace(/(import React.*?;\n)/, `$1import SEO from '../components/SEO';\n`);
}

if (!content.includes('<SEO')) {
  const seoInjection = `
      <SEO 
        title={\`\${pkg.title} | Nepal Tour Packages\`}
        description={\`Book the \${pkg.title} tour package with Zenex Travel. \${pkg.category || 'Adventure'} tour in Nepal starting at \${pkg.price || 'best price'}.\`}
        canonicalUrl={\`https://zenextravel.com/packages/\${id}\`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": pkg.title,
          "description": pkg.title + " Tour Package",
          "image": pkg.img,
          "provider": {
            "@type": "TravelAgency",
            "name": "Zenex Travel"
          }
        }}
      />`;
  
  content = content.replace(/(<div className="bg-\[\#F4F6F8\] min-h-screen">)/, `$1${seoInjection}`);
  fs.writeFileSync(packageFile, content);
  console.log('Updated PackageDetail.jsx with SEO and TouristTrip Schema');
}
