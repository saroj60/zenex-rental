const fs = require('fs');
const targetPath = 'src/context/AppDataContext.jsx';
let content = fs.readFileSync(targetPath, 'utf8');

const regex = /  const addVehicle = async \(vehicleData\) => \{[\s\S]*?  const deleteBooking = \(id\) => setBookings\(bookings\.filter\(b => b\.id !== id\)\);/m;

const replacement = `  // CRUD for Vehicles
  const addVehicle = async (vehicleData) => {
    let body = vehicleData;
    let headers = { 'Content-Type': 'application/json' };
    if (vehicleData instanceof FormData) {
      body = vehicleData;
      headers = {}; 
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
  };

  // CRUD for Destinations
  const addDestination = (destination) => setDestinations([...destinations, destination]);
  const updateDestination = (id, updated) => setDestinations(destinations.map(d => d.id === id ? { ...d, ...updated } : d));
  const deleteDestination = (id) => setDestinations(destinations.filter(d => d.id !== id));

  // CRUD for Packages
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
  };

  // CRUD for Treks
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
  };

  // CRUD for Bookings
  const addBooking = (booking) => setBookings([...bookings, { ...booking, id: 'B-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0] }]);
  const updateBooking = (id, updated) => setBookings(bookings.map(b => b.id === id ? { ...b, ...updated } : b));
  const deleteBooking = (id) => setBookings(bookings.filter(b => b.id !== id));`;

content = content.replace(regex, replacement);
fs.writeFileSync(targetPath, content, 'utf8');
console.log('done restoring crud');
