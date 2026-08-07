const fs = require('fs');

const contextPath = 'src/context/AppDataContext.jsx';
let content = fs.readFileSync(contextPath, 'utf8');

// Replace useState blocks with useEffect fetch blocks
const useStateRegex = /const \[([a-zA-Z]+),\s*set[a-zA-Z]+\]\s*=\s*useState\(\(\)\s*=>\s*\{[\s\S]*?\}\s*\);\s*/gm;

content = content.replace(useStateRegex, '');

const initialDeclarations = `
  const [vehicles, setVehicles] = useState([]);
  const [destinations, setDestinations] = useState(initialDestinations);
  const [packages, setPackages] = useState([]);
  const [treks, setTreks] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehRes, packRes, trekRes] = await Promise.all([
          fetch('/api/vehicles').catch(() => ({ json: () => initialVehicles })),
          fetch('/api/packages').catch(() => ({ json: () => initialPackages })),
          fetch('/api/v2/treks').catch(() => ({ json: () => treksData }))
        ]);
        
        setVehicles(await vehRes.json());
        setPackages(await packRes.json());
        setTreks(await trekRes.json());
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);
`;

content = content.replace('export const AppDataProvider = ({ children }) => {', 'export const AppDataProvider = ({ children }) => {\n' + initialDeclarations);

// Remove the 6 offline localStorage useEffects
content = content.replace(/useEffect\(\(\) => \{\s*\/\/ Completely offline mode[\s\S]*?\}, \[\]\);\s*/, '');
content = content.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\('app_destinations'[\s\S]*?\}, \[destinations\]\);\s*/, '');
content = content.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\('app_bookings'[\s\S]*?\}, \[bookings\]\);\s*/, '');
content = content.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\('app_drivers'[\s\S]*?\}, \[drivers\]\);\s*/, '');
content = content.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\('app_gallery'[\s\S]*?\}, \[galleryImages\]\);\s*/, '');
content = content.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\('app_vehicles'[\s\S]*?\}, \[vehicles\]\);\s*/, '');
content = content.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\('app_packages'[\s\S]*?\}, \[packages\]\);\s*/, '');
content = content.replace(/useEffect\(\(\) => \{\s*localStorage\.setItem\('app_treks'[\s\S]*?\}, \[treks\]\);\s*/, '');

// CRUD logic
const crudReplacements = {
  // Vehicles
  '  // CRUD for Vehicles\n  const addVehicle = async (vehicle) => {\n    const newVehicle = { ...vehicle, id: Date.now() }; // Mock ID generation\n    setVehicles([...vehicles, newVehicle]);\n  };\n  const updateVehicle = async (id, updated) => {\n    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updated } : v));\n  };\n  const deleteVehicle = async (id) => {\n    setVehicles(vehicles.filter(v => v.id !== id));\n  };':
  `  // CRUD for Vehicles
  const addVehicle = async (vehicleData) => {
    let body = vehicleData;
    let headers = { 'Content-Type': 'application/json' };
    if (vehicleData instanceof FormData) {
      body = vehicleData;
      headers = {}; // browser sets multipart boundary
    } else {
      body = JSON.stringify(vehicleData);
    }
    const res = await fetch('/api/vehicles', { method: 'POST', headers, body });
    const newV = await res.json();
    setVehicles([...vehicles, newV]);
  };
  const updateVehicle = async (id, updatedData) => {
    let body = updatedData;
    let headers = { 'Content-Type': 'application/json' };
    if (updatedData instanceof FormData) {
      body = updatedData;
      headers = {}; 
    } else {
      body = JSON.stringify(updatedData);
    }
    const res = await fetch(\`/api/vehicles/\${id}\`, { method: 'PUT', headers, body });
    const updatedV = await res.json();
    setVehicles(vehicles.map(v => v.id === id ? updatedV : v));
  };
  const deleteVehicle = async (id) => {
    await fetch(\`/api/vehicles/\${id}\`, { method: 'DELETE' });
    setVehicles(vehicles.filter(v => v.id !== id));
  };`,
  
  // Packages
  '  // CRUD for Packages\n  const addPackage = async (pkg) => {\n    const newPkg = { ...pkg, id: Date.now() }; // Mock ID generation\n    setPackages([...packages, newPkg]);\n  };\n  const updatePackage = async (id, updated) => {\n    setPackages(packages.map(p => p.id === id ? { ...p, ...updated } : p));\n  };\n  const deletePackage = async (id) => {\n    setPackages(packages.filter(p => p.id !== id));\n  };':
  `  // CRUD for Packages
  const addPackage = async (pkg) => {
    const res = await fetch('/api/packages', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pkg) });
    const newPkg = await res.json();
    setPackages([...packages, newPkg]);
  };
  const updatePackage = async (id, updated) => {
    const res = await fetch(\`/api/packages/\${id}\`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updated) });
    const updatedPkg = await res.json();
    setPackages(packages.map(p => p.id === id ? updatedPkg : p));
  };
  const deletePackage = async (id) => {
    await fetch(\`/api/packages/\${id}\`, { method: 'DELETE' });
    setPackages(packages.filter(p => p.id !== id));
  };`,

  // Treks
  '  // CRUD for Treks\n  const addTrek = async (trek) => {\n    const newTrek = { ...trek, id: Date.now() };\n    setTreks([...treks, newTrek]);\n  };\n  const updateTrek = async (id, updated) => {\n    setTreks(treks.map(t => t.id === id ? { ...t, ...updated } : t));\n  };\n  const deleteTrek = async (id) => {\n    setTreks(treks.filter(t => t.id !== id));\n  };':
  `  // CRUD for Treks
  const addTrek = async (trek) => {
    const res = await fetch('/api/treks', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(trek) });
    const newTrek = await res.json();
    setTreks([...treks, newTrek]);
  };
  const updateTrek = async (id, updated) => {
    const res = await fetch(\`/api/treks/\${id}\`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updated) });
    const updatedTrek = await res.json();
    setTreks(treks.map(t => t.id === id ? updatedTrek : t));
  };
  const deleteTrek = async (id) => {
    await fetch(\`/api/treks/\${id}\`, { method: 'DELETE' });
    setTreks(treks.filter(t => t.id !== id));
  };`
};

for (const [search, replace] of Object.entries(crudReplacements)) {
  content = content.replace(search, replace);
}

fs.writeFileSync(contextPath, content, 'utf8');
console.log('done');
