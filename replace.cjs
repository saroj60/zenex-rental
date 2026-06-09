const fs = require('fs');
const path = require('path');
const map = {
  '1583267746897-2cf415eb8fa2': '/images/destinations/kathmandu.png',
  '1544735716-392fe2489ffa': '/images/destinations/pokhara.png',
  '1629807405234-a16016142171': '/images/destinations/mustang.png',
  '1585802266611-39659b8be4db': '/images/destinations/chitwan.png',
  '1605640871171-8bc602b9e6aa': '/images/destinations/lumbini.png',
  '1522163182402-834f871fd851': '/images/destinations/everest.png',
  '1533473359331-0135ef1b58bf': '/images/destinations/annapurna.png'
};

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx')) {
      let content = fs.readFileSync(p, 'utf8');
      let modified = false;
      Object.keys(map).forEach(k => {
        const regex = new RegExp('https://images.unsplash.com/photo-' + k + '[^\'"`]*', 'g');
        if(regex.test(content)) {
          content = content.replace(regex, map[k]);
          modified = true;
        }
      });
      if(modified) {
        fs.writeFileSync(p, content);
      }
    }
  });
}
walk('src');
