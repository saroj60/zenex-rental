const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve React static files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

const dbPath = path.join(__dirname, 'database.json');

// Read Database
const readDb = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading database:', error);
  }
  return { vehicles: [], packages: [], treks: [], destinations: [] };
};

// Write Database
const writeDb = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// --- VEHICLES ---
app.get('/api/vehicles', (req, res) => {
  const db = readDb();
  res.json(db.vehicles || []);
});

app.post('/api/vehicles', (req, res) => {
  const db = readDb();
  const newVehicle = { id: Date.now(), ...req.body };
  if (!db.vehicles) db.vehicles = [];
  db.vehicles.push(newVehicle);
  writeDb(db);
  res.json(newVehicle);
});

app.put('/api/vehicles/:id', (req, res) => {
  const db = readDb();
  const id = parseInt(req.params.id);
  const index = (db.vehicles || []).findIndex(v => v.id === id);
  if (index !== -1) {
    db.vehicles[index] = { ...db.vehicles[index], ...req.body, id };
    writeDb(db);
    res.json(db.vehicles[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/vehicles/:id', (req, res) => {
  const db = readDb();
  const id = parseInt(req.params.id);
  if (db.vehicles) {
    db.vehicles = db.vehicles.filter(v => v.id !== id);
    writeDb(db);
  }
  res.json({ success: true });
});

// --- PACKAGES ---
app.get('/api/packages', (req, res) => {
  const db = readDb();
  res.json(db.packages || []);
});

app.post('/api/packages', (req, res) => {
  const db = readDb();
  const newPackage = { id: req.body.id || `P-${Date.now()}`, ...req.body };
  if (!db.packages) db.packages = [];
  db.packages.push(newPackage);
  writeDb(db);
  res.json(newPackage);
});

app.put('/api/packages/:id', (req, res) => {
  const db = readDb();
  const index = (db.packages || []).findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.packages[index] = { ...db.packages[index], ...req.body, id: req.params.id };
    writeDb(db);
    res.json(db.packages[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/packages/:id', (req, res) => {
  const db = readDb();
  if (db.packages) {
    db.packages = db.packages.filter(p => p.id !== req.params.id);
    writeDb(db);
  }
  res.json({ success: true });
});

// --- TREKS ---
app.get('/api/v2/treks', (req, res) => {
  const db = readDb();
  res.json(db.treks || []);
});

app.post('/api/treks', (req, res) => {
  const db = readDb();
  const newTrek = { id: req.body.id || `T-${Date.now()}`, ...req.body };
  if (!db.treks) db.treks = [];
  db.treks.push(newTrek);
  writeDb(db);
  res.json(newTrek);
});

app.put('/api/treks/:id', (req, res) => {
  const db = readDb();
  const index = (db.treks || []).findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    db.treks[index] = { ...db.treks[index], ...req.body, id: req.params.id };
    writeDb(db);
    res.json(db.treks[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/treks/:id', (req, res) => {
  const db = readDb();
  if (db.treks) {
    db.treks = db.treks.filter(t => t.id !== req.params.id);
    writeDb(db);
  }
  res.json({ success: true });
});

// Catch-all route to serve index.html for React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
