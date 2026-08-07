const fs = require('fs');
const targetPath = 'src/context/AppDataContext.jsx';
let content = fs.readFileSync(targetPath, 'utf8');

// Replace updateVehicle and deleteVehicle
const vSearch = `  const updateVehicle = async (id, updated) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updated } : v));
  };
  const deleteVehicle = async (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };`;

const vReplace = `  const addVehicle = async (vehicleData) => {
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
  };`;

content = content.replace(vSearch, vReplace);

// Replace Packages
const pSearch = `  // CRUD for Packages
  const addPackage = async (pkg) => {
    const newPkg = { ...pkg, id: Date.now() }; // Mock ID generation
    setPackages([...packages, newPkg]);
  };
  const updatePackage = async (id, updated) => {
    setPackages(packages.map(p => p.id === id ? { ...p, ...updated } : p));
  };
  const deletePackage = async (id) => {
    setPackages(packages.filter(p => p.id !== id));
  };`;

const pReplace = `  // CRUD for Packages
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
  };`;

content = content.replace(pSearch, pReplace);

// Replace Treks
const tSearch = `  // CRUD for Treks
  const addTrek = async (trek) => {
    const newTrek = { ...trek, id: Date.now() };
    setTreks([...treks, newTrek]);
  };
  const updateTrek = async (id, updated) => {
    setTreks(treks.map(t => t.id === id ? { ...t, ...updated } : t));
  };
  const deleteTrek = async (id) => {
    setTreks(treks.filter(t => t.id !== id));
  };`;

const tReplace = `  // CRUD for Treks
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
  };`;

content = content.replace(tSearch, tReplace);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('done fixing crud');
