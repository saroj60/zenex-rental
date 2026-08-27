const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setup Multer for image uploads
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve static uploads folder
app.use('/uploads', express.static(uploadDir));

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

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
  return { vehicles: [], packages: [], treks: [], destinations: [], tourTrips: [], regions: [] };
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

// --- REGIONS (Categories) ---
app.get('/api/regions', (req, res) => {
  const db = readDb();
  res.json(db.regions || []);
});

app.post('/api/regions', (req, res) => {
  const db = readDb();
  const newRegion = { id: `REG-${Date.now()}`, ...req.body };
  if (!db.regions) db.regions = [];
  db.regions.push(newRegion);
  writeDb(db);
  res.json(newRegion);
});

app.put('/api/regions/:id', (req, res) => {
  const db = readDb();
  const index = (db.regions || []).findIndex(r => r.id === req.params.id);
  if (index !== -1) {
    db.regions[index] = { ...db.regions[index], ...req.body, id: req.params.id };
    writeDb(db);
    res.json(db.regions[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/regions/:id', (req, res) => {
  const db = readDb();
  if (db.regions) {
    db.regions = db.regions.filter(r => r.id !== req.params.id);
    writeDb(db);
  }
  res.json({ success: true });
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



// --- TOUR TRIPS (Professional Management) ---
app.get('/api/tour-trips', (req, res) => {
  const db = readDb();
  res.json(db.tourTrips || []);
});

app.get('/api/tour-trips/:id', (req, res) => {
  const db = readDb();
  const trip = (db.tourTrips || []).find(t => t.id === req.params.id);
  if (trip) {
    res.json(trip);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.post('/api/tour-trips', (req, res) => {
  const db = readDb();
  const newTrip = { id: req.body.id || `TRIP-${Date.now()}`, ...req.body };
  if (!db.tourTrips) db.tourTrips = [];
  db.tourTrips.push(newTrip);
  writeDb(db);
  res.json(newTrip);
});

app.put('/api/tour-trips/:id', (req, res) => {
  const db = readDb();
  const index = (db.tourTrips || []).findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    db.tourTrips[index] = { ...db.tourTrips[index], ...req.body, id: req.params.id };
    writeDb(db);
    res.json(db.tourTrips[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/tour-trips/:id', (req, res) => {
  const db = readDb();
  if (db.tourTrips) {
    db.tourTrips = db.tourTrips.filter(t => t.id !== req.params.id);
    writeDb(db);
  }
  res.json({ success: true });
});

// --- BOOKINGS & EMAIL SIMULATOR ---
app.get('/api/bookings', (req, res) => {
  const db = readDb();
  res.json(db.bookings || []);
});

app.post('/api/bookings', (req, res) => {
  const db = readDb();
  const booking = {
    id: `BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...req.body
  };
  if (!db.bookings) db.bookings = [];
  db.bookings.push(booking);
  writeDb(db);

  // Simulate Email Dispatch In Server Logs
  console.log(`
============================================================
[EMAIL SENDING SIMULATION]
New Booking Order Notification!
------------------------------------------------------------
From: Zenex Booking System <info@zenextravels.com>
To: Customer <${booking.customerDetails?.email}>, Admin <info@zenextravels.com>
Subject: Booking Order Confirmation - ${booking.id}

Hello ${booking.customerDetails?.firstName} ${booking.customerDetails?.lastName},

Your booking order has been successfully placed.

Trip / Package: ${booking.itemName}
Trip Date: ${booking.dates?.start}
Number of Travelers: ${booking.travelersCount || 1}
Payment Method: ${booking.paymentOption === 'deposit' ? '20% Deposit Online' : 'Book Now Pay Later (100% on Arrival)'}
Total Price: ${booking.amount}
Deposit Payable Now: ${booking.paymentOption === 'deposit' ? 'US$' + (parseFloat(booking.amount.replace(/[^0-9.]/g, '')) * 0.20).toFixed(2) : 'US$0.00'}
Due Amount (Pay Later): ${booking.paymentOption === 'deposit' ? 'US$' + (parseFloat(booking.amount.replace(/[^0-9.]/g, '')) * 0.80).toFixed(2) : booking.amount}

We look forward to welcoming you to Kathmandu!
============================================================
  `);

  res.json({ success: true, booking });
});

app.put('/api/bookings/:id', (req, res) => {
  const db = readDb();
  if (db.bookings) {
    db.bookings = db.bookings.map(b => b.id === req.params.id ? { ...b, ...req.body } : b);
    writeDb(db);
    const updated = db.bookings.find(b => b.id === req.params.id);
    res.json({ success: true, booking: updated });
  } else {
    res.status(404).json({ success: false, message: 'Booking not found' });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  const db = readDb();
  if (db.bookings) {
    db.bookings = db.bookings.filter(b => b.id !== req.params.id);
    writeDb(db);
  }
  res.json({ success: true });
});

// --- BLOGS ---
app.get('/api/blogs', (req, res) => {
  const db = readDb();
  res.json(db.blogs || []);
});

app.post('/api/blogs', (req, res) => {
  const db = readDb();
  const newBlog = {
    id: `B-${Date.now()}`,
    date: new Date().toISOString(),
    ...req.body
  };
  if (!db.blogs) db.blogs = [];
  db.blogs.unshift(newBlog);
  writeDb(db);
  res.json(newBlog);
});

app.put('/api/blogs/:id', (req, res) => {
  const db = readDb();
  const index = (db.blogs || []).findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    db.blogs[index] = { ...db.blogs[index], ...req.body, id: req.params.id };
    writeDb(db);
    res.json(db.blogs[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/blogs/:id', (req, res) => {
  const db = readDb();
  if (db.blogs) {
    db.blogs = db.blogs.filter(b => b.id !== req.params.id);
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
