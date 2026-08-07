const fs = require('fs');
const path = './src/context/AppDataContext.jsx';
let content = fs.readFileSync(path, 'utf8');

const newImages = `  { id: 'G-7', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBJN1DqlFxqoaHMMIsrOf0IcCYycsT3hb0-ziYzHm3Q&s=10', title: 'Helicopter Return 1' },
  { id: 'G-8', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wlvt4a57yn0n-R9EbGDDuFH1XgVOC2P9SCPo2OdZxQ&s=10', title: 'Helicopter Return 2' },
  { id: 'G-9', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiAqV4I_xhUpiNUuIa_VM6y1pj7pC-AIgNQ_laaHfKQg&s=10', title: 'Helicopter Return 3' }`;

content = content.replace(/const initialGallery = \[([\s\S]*?)\];/, (match, group1) => {
    return `const initialGallery = [${group1},\n${newImages}\n];`;
});

content = content.replace('const [galleryImages, setGalleryImages] = useState([]);', 'const [galleryImages, setGalleryImages] = useState(initialGallery);');

fs.writeFileSync(path, content, 'utf8');
console.log('Gallery updated!');
