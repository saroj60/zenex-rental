const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;
const dbPath = path.join(__dirname, 'database', 'db.json');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, 'zenex-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp|gif/;
        const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
        const mimeOk = allowed.test(file.mimetype);
        if (extOk && mimeOk) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (JPG, PNG, WEBP, GIF) are allowed.'));
        }
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images as static files
app.use('/api/uploads', express.static(uploadsDir));
app.use('/uploads', express.static(uploadsDir));

// Database Access helpers
function readDB() {
    try {
        if (!fs.existsSync(dbPath)) {
            // Write initial empty DB if doesn't exist
            const initDb = { vehicles: [], packages: [], treks: [], destinations: [], bookings: [], drivers: [], gallery: [], blogs: [] };
            fs.writeFileSync(dbPath, JSON.stringify(initDb, null, 2), 'utf8');
            return initDb;
        }
        const raw = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(raw);
    } catch (e) {
        console.error("Database read error:", e);
        return { vehicles: [], packages: [], treks: [], destinations: [], bookings: [], drivers: [], gallery: [], blogs: [] };
    }
}

function writeDB(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error("Database write error:", e);
    }
}

// ==============================================
// VEHICLES
// ==============================================
app.get('/api/vehicles', (req, res) => {
    const data = readDB();
    res.json(data.vehicles || []);
});

app.post('/api/vehicles', upload.array('images', 4), (req, res) => {
    const data = readDB();
    
    // Process form data
    const newVehicle = req.body;
    
    // Process uploaded images
    if (req.files && req.files.length > 0) {
        const urls = req.files.map(f => `/api/uploads/${f.filename}`);
        if (urls.length > 0) {
            newVehicle.img = urls[0]; // Primary image
            newVehicle.gallery = urls; // All images
        }
    }
    
    // Ensure numbers
    if (newVehicle.price) newVehicle.price = Number(newVehicle.price);
    if (newVehicle.seats) newVehicle.seats = Number(newVehicle.seats);
    if (newVehicle.doors) newVehicle.doors = Number(newVehicle.doors);
    if (newVehicle.rating) newVehicle.rating = Number(newVehicle.rating);
    if (newVehicle.reviews) newVehicle.reviews = Number(newVehicle.reviews);
    
    // Parse JSON features if sent as string
    if (typeof newVehicle.features === 'string') {
        try { newVehicle.features = JSON.parse(newVehicle.features); } catch(e) {}
    }

    const newId = data.vehicles && data.vehicles.length > 0 ? Math.max(...data.vehicles.map(v => v.id)) + 1 : 1;
    newVehicle.id = newId;
    
    if (!data.vehicles) data.vehicles = [];
    data.vehicles.push(newVehicle);
    writeDB(data);

    res.status(201).json(newVehicle);
});

app.put('/api/vehicles/:id', upload.array('images', 4), (req, res) => {
    const data = readDB();
    const id = parseInt(req.params.id);
    const index = (data.vehicles || []).findIndex(v => v.id === id);

    if (index !== -1) {
        const updatedVehicle = { ...data.vehicles[index], ...req.body };
        
        // Ensure numbers
        if (updatedVehicle.price) updatedVehicle.price = Number(updatedVehicle.price);
        if (updatedVehicle.seats) updatedVehicle.seats = Number(updatedVehicle.seats);
        if (updatedVehicle.doors) updatedVehicle.doors = Number(updatedVehicle.doors);
        
        // Parse JSON features if sent as string
        if (typeof updatedVehicle.features === 'string') {
            try { updatedVehicle.features = JSON.parse(updatedVehicle.features); } catch(e) {}
        }
        
        // Process uploaded images (if any new ones are added)
        if (req.files && req.files.length > 0) {
            const urls = req.files.map(f => `/api/uploads/${f.filename}`);
            if (urls.length > 0) {
                updatedVehicle.img = urls[0]; // Override primary
                updatedVehicle.gallery = urls; // Override gallery
            }
        }
        
        updatedVehicle.id = id; // Ensure ID doesn't change
        data.vehicles[index] = updatedVehicle;
        writeDB(data);
        res.json(data.vehicles[index]);
    } else {
        res.status(404).json({ error: "Vehicle not found." });
    }
});

app.delete('/api/vehicles/:id', (req, res) => {
    const data = readDB();
    const id = parseInt(req.params.id);
    const target = (data.vehicles || []).find(v => v.id === id);

    if (target) {
        data.vehicles = data.vehicles.filter(v => v.id !== id);
        writeDB(data);
        res.json({ success: true, message: "Vehicle deleted." });
    } else {
        res.status(404).json({ error: "Vehicle not found." });
    }
});

// ==============================================
// BLOGS
// ==============================================
app.get('/api/blogs', (req, res) => {
    const data = readDB();
    res.json(data.blogs || []);
});

app.post('/api/blogs', upload.single('coverImage'), (req, res) => {
    const data = readDB();
    const newBlog = req.body;
    
    if (req.file) {
        newBlog.coverImage = `/api/uploads/${req.file.filename}`;
    }
    
    const newId = data.blogs && data.blogs.length > 0 ? Math.max(...data.blogs.map(b => parseInt(b.id) || 0)) + 1 : 1;
    newBlog.id = newId.toString();
    newBlog.date = new Date().toISOString();
    
    if (!data.blogs) data.blogs = [];
    data.blogs.push(newBlog);
    writeDB(data);

    res.status(201).json(newBlog);
});

app.put('/api/blogs/:id', upload.single('coverImage'), (req, res) => {
    const data = readDB();
    const id = req.params.id;
    const index = (data.blogs || []).findIndex(b => b.id === id);

    if (index !== -1) {
        const updatedBlog = { ...data.blogs[index], ...req.body };
        if (req.file) {
            updatedBlog.coverImage = `/api/uploads/${req.file.filename}`;
        }
        updatedBlog.id = id;
        data.blogs[index] = updatedBlog;
        writeDB(data);
        res.json(data.blogs[index]);
    } else {
        res.status(404).json({ error: "Blog not found." });
    }
});

app.delete('/api/blogs/:id', (req, res) => {
    const data = readDB();
    const id = req.params.id;
    const target = (data.blogs || []).find(b => b.id === id);

    if (target) {
        data.blogs = data.blogs.filter(b => b.id !== id);
        writeDB(data);
        res.json({ success: true, message: "Blog deleted." });
    } else {
        res.status(404).json({ error: "Blog not found." });
    }
});

// ==============================================
// DRIVERS
// ==============================================
app.get('/api/drivers', (req, res) => {
    const data = readDB();
    res.json(data.drivers || []);
});

app.post('/api/drivers', upload.single('image'), (req, res) => {
    const data = readDB();
    const newDriver = req.body;
    
    if (req.file) {
        newDriver.image = `/api/uploads/${req.file.filename}`;
    }
    
    const newId = data.drivers && data.drivers.length > 0 ? Math.max(...data.drivers.map(d => d.id)) + 1 : 1;
    newDriver.id = newId;
    
    if (!data.drivers) data.drivers = [];
    data.drivers.push(newDriver);
    writeDB(data);

    res.status(201).json(newDriver);
});

app.put('/api/drivers/:id', upload.single('image'), (req, res) => {
    const data = readDB();
    const id = parseInt(req.params.id);
    const index = (data.drivers || []).findIndex(d => d.id === id);

    if (index !== -1) {
        const updatedDriver = { ...data.drivers[index], ...req.body };
        if (req.file) {
            updatedDriver.image = `/api/uploads/${req.file.filename}`;
        }
        updatedDriver.id = id;
        data.drivers[index] = updatedDriver;
        writeDB(data);
        res.json(data.drivers[index]);
    } else {
        res.status(404).json({ error: "Driver not found." });
    }
});

app.delete('/api/drivers/:id', (req, res) => {
    const data = readDB();
    const id = parseInt(req.params.id);
    const target = (data.drivers || []).find(d => d.id === id);

    if (target) {
        data.drivers = data.drivers.filter(d => d.id !== id);
        writeDB(data);
        res.json({ success: true, message: "Driver deleted." });
    } else {
        res.status(404).json({ error: "Driver not found." });
    }
});

// ==============================================
// PACKAGES
// ==============================================
app.get('/api/packages', (req, res) => {
    const data = readDB();
    res.json(data.packages || []);
});

app.post('/api/packages', (req, res) => {
    const data = readDB();
    const newPackage = { id: req.body.id || `P-${Date.now()}`, ...req.body };
    if (!data.packages) data.packages = [];
    data.packages.push(newPackage);
    writeDB(data);
    res.status(201).json(newPackage);
});

app.put('/api/packages/:id', (req, res) => {
    const data = readDB();
    const index = (data.packages || []).findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        data.packages[index] = { ...data.packages[index], ...req.body, id: req.params.id };
        writeDB(data);
        res.json(data.packages[index]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.delete('/api/packages/:id', (req, res) => {
    const data = readDB();
    if (data.packages) {
        data.packages = data.packages.filter(p => p.id !== req.params.id);
        writeDB(data);
    }
    res.json({ success: true });
});

// ==============================================
// TREKS
// ==============================================
app.get('/api/v2/treks', (req, res) => {
    const data = readDB();
    res.json(data.treks || []);
});

app.post('/api/treks', (req, res) => {
    const data = readDB();
    const newTrek = { id: req.body.id || `T-${Date.now()}`, ...req.body };
    if (!data.treks) data.treks = [];
    data.treks.push(newTrek);
    writeDB(data);
    res.status(201).json(newTrek);
});

app.put('/api/treks/:id', (req, res) => {
    const data = readDB();
    const index = (data.treks || []).findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        data.treks[index] = { ...data.treks[index], ...req.body, id: req.params.id };
        writeDB(data);
        res.json(data.treks[index]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.delete('/api/treks/:id', (req, res) => {
    const data = readDB();
    if (data.treks) {
        data.treks = data.treks.filter(t => t.id !== req.params.id);
        writeDB(data);
    }
    res.json({ success: true });
});

// Serve static frontend files for Production
const frontendDist = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendDist));

// Catch-all route to serve React app for non-API requests
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZENEX TRAVEL API server running on port ${PORT}`);
});
