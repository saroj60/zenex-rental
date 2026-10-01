const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || origin === 'https://zenextravels.com' || origin === 'https://www.zenextravels.com') {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

// Serve uploaded images as static files
app.use('/api/uploads', express.static(uploadsDir));
app.use('/uploads', express.static(uploadsDir));

// ==============================================
// VEHICLES
// ==============================================
app.get('/api/vehicles', async (req, res) => {
    try {
        const vehicles = await db.getAll('vehicles');
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/vehicles', upload.array('images', 4), async (req, res) => {
    try {
        const vehicles = await db.getAll('vehicles');
        const newVehicle = req.body;
        
        if (req.files && req.files.length > 0) {
            const urls = req.files.map(f => `/api/uploads/${f.filename}`);
            if (urls.length > 0) {
                newVehicle.img = urls[0];
                newVehicle.gallery = urls;
            }
        }
        
        if (newVehicle.price) newVehicle.price = Number(newVehicle.price);
        if (newVehicle.seats) newVehicle.seats = Number(newVehicle.seats);
        if (newVehicle.doors) newVehicle.doors = Number(newVehicle.doors);
        if (newVehicle.rating) newVehicle.rating = Number(newVehicle.rating);
        if (newVehicle.reviews) newVehicle.reviews = Number(newVehicle.reviews);
        
        if (typeof newVehicle.features === 'string') {
            try { newVehicle.features = JSON.parse(newVehicle.features); } catch(e) {}
        }

        const newId = vehicles && vehicles.length > 0 ? Math.max(...vehicles.map(v => Number(v.id) || 0)) + 1 : 1;
        newVehicle.id = newId;
        
        await db.save('vehicles', newVehicle);
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/vehicles/:id', upload.array('images', 4), async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const existing = await db.getById('vehicles', id);

        if (existing) {
            const updatedVehicle = { ...existing, ...req.body };
            if (updatedVehicle.price) updatedVehicle.price = Number(updatedVehicle.price);
            if (updatedVehicle.seats) updatedVehicle.seats = Number(updatedVehicle.seats);
            if (updatedVehicle.doors) updatedVehicle.doors = Number(updatedVehicle.doors);
            
            if (typeof updatedVehicle.features === 'string') {
                try { updatedVehicle.features = JSON.parse(updatedVehicle.features); } catch(e) {}
            }
            
            if (req.files && req.files.length > 0) {
                const urls = req.files.map(f => `/api/uploads/${f.filename}`);
                if (urls.length > 0) {
                    updatedVehicle.img = urls[0];
                    updatedVehicle.gallery = urls;
                }
            }
            
            updatedVehicle.id = id;
            await db.save('vehicles', updatedVehicle);
            res.json(updatedVehicle);
        } else {
            res.status(404).json({ error: "Vehicle not found." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/vehicles/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await db.remove('vehicles', id);
        res.json({ success: true, message: "Vehicle deleted." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================================
// BLOGS
// ==============================================
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await db.getAll('blogs');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/blogs', upload.single('coverImage'), async (req, res) => {
    try {
        const newBlog = {
            id: req.body.id || req.body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `blog-${Date.now()}`,
            title: req.body.title || 'Untitled Blog',
            coverImage: req.file ? `/api/uploads/${req.file.filename}` : (req.body.coverImage || '/hero-kathmandu-durbar.jpg'),
            category: req.body.category || 'Travel Guide',
            content: req.body.content || '',
            author: req.body.author || 'Zenex Travel Team',
            date: req.body.date || new Date().toISOString(),
            readTime: req.body.readTime || '5 min read',
            seoTitle: req.body.seoTitle || req.body.title,
            seoDescription: req.body.seoDescription || req.body.excerpt,
            keywords: req.body.keywords || 'Nepal Travel, Zenex Travels'
        };

        await db.save('blogs', newBlog);
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/blogs/:id', upload.single('coverImage'), async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await db.getById('blogs', id);

        if (existing) {
            const updated = { ...existing, ...req.body };
            if (req.file) {
                updated.coverImage = `/api/uploads/${req.file.filename}`;
            }
            updated.id = id;
            await db.save('blogs', updated);
            res.json(updated);
        } else {
            res.status(404).json({ error: 'Blog not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        await db.remove('blogs', req.params.id);
        res.json({ success: true, message: 'Blog deleted.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================================
// DRIVERS
// ==============================================
app.get('/api/drivers', async (req, res) => {
    try {
        const drivers = await db.getAll('drivers');
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/drivers', upload.single('image'), async (req, res) => {
    try {
        const drivers = await db.getAll('drivers');
        const newDriver = req.body;
        
        if (req.file) {
            newDriver.image = `/api/uploads/${req.file.filename}`;
        }
        
        const newId = drivers && drivers.length > 0 ? Math.max(...drivers.map(d => Number(d.id) || 0)) + 1 : 1;
        newDriver.id = newId;
        
        await db.save('drivers', newDriver);
        res.status(201).json(newDriver);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/drivers/:id', upload.single('image'), async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const existing = await db.getById('drivers', id);

        if (existing) {
            const updatedDriver = { ...existing, ...req.body };
            if (req.file) {
                updatedDriver.image = `/api/uploads/${req.file.filename}`;
            }
            updatedDriver.id = id;
            await db.save('drivers', updatedDriver);
            res.json(updatedDriver);
        } else {
            res.status(404).json({ error: 'Driver not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/drivers/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await db.remove('drivers', id);
        res.json({ success: true, message: 'Driver deleted.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================================
// PACKAGES
// ==============================================
app.get('/api/packages', async (req, res) => {
    try {
        const packages = await db.getAll('packages');
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/packages', async (req, res) => {
    try {
        const newPackage = { id: req.body.id || `P-${Date.now()}`, ...req.body };
        await db.save('packages', newPackage);
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/packages/:id', async (req, res) => {
    try {
        const existing = await db.getById('packages', req.params.id);
        const updated = { ...(existing || {}), ...req.body, id: req.params.id };
        await db.save('packages', updated);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/packages/:id', async (req, res) => {
    try {
        await db.remove('packages', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================================
// TREKS
// ==============================================
app.get('/api/v2/treks', async (req, res) => {
    try {
        const treks = await db.getAll('treks');
        res.json(treks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/treks', async (req, res) => {
    try {
        const newTrek = { id: req.body.id || `T-${Date.now()}`, ...req.body };
        await db.save('treks', newTrek);
        res.status(201).json(newTrek);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/treks/:id', async (req, res) => {
    try {
        const existing = await db.getById('treks', req.params.id);
        const updated = { ...(existing || {}), ...req.body, id: req.params.id };
        await db.save('treks', updated);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/treks/:id', async (req, res) => {
    try {
        await db.remove('treks', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================================
// REGIONS
// ==============================================
app.get('/api/regions', async (req, res) => {
    try {
        const regions = await db.getAll('regions');
        res.json(regions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/regions', async (req, res) => {
    try {
        const newRegion = { id: req.body.id || `REG-${Date.now()}`, ...req.body };
        await db.save('regions', newRegion);
        res.json(newRegion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/regions/:id', async (req, res) => {
    try {
        const existing = await db.getById('regions', req.params.id);
        const updated = { ...(existing || {}), ...req.body, id: req.params.id };
        await db.save('regions', updated);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/regions/:id', async (req, res) => {
    try {
        await db.remove('regions', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================================
// TOUR TRIPS
// ==============================================
app.get('/api/tour-trips', async (req, res) => {
    try {
        const tourTrips = await db.getAll('tourTrips');
        res.json(tourTrips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/tour-trips/:id', async (req, res) => {
    try {
        const trip = await db.getById('tourTrips', req.params.id);
        if (trip) {
            res.json(trip);
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/tour-trips', async (req, res) => {
    try {
        const newTrip = { id: req.body.id || `TRIP-${Date.now()}`, ...req.body };
        await db.save('tourTrips', newTrip);
        res.json(newTrip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/tour-trips/:id', async (req, res) => {
    try {
        const existing = await db.getById('tourTrips', req.params.id);
        const updated = { ...(existing || {}), ...req.body, id: req.params.id };
        await db.save('tourTrips', updated);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/tour-trips/:id', async (req, res) => {
    try {
        await db.remove('tourTrips', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================================
// BOOKINGS
// ==============================================
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await db.getAll('bookings');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const bookings = await db.getAll('bookings');

        let maxNum = 0;
        bookings.forEach(b => {
            if (b && b.id) {
                const match = String(b.id).match(/ZNX\s*-\s*(\d+)/i) || String(b.id).match(/(\d+)/);
                if (match) {
                    const num = parseInt(match[1], 10);
                    if (num > maxNum) maxNum = num;
                }
            }
        });
        const nextNum = maxNum + 1;
        const bookingId = `ZNX - ${String(nextNum).padStart(3, '0')}`;

        const booking = {
            ...req.body,
            id: bookingId,
            status: req.body.status || 'pending',
            createdAt: req.body.createdAt || new Date().toISOString()
        };

        await db.save('bookings', booking);

        console.log(`
======================= CONFIRMATION EMAIL =====================
To: ${booking.customerDetails?.email}
Subject: Booking Confirmation - Reference ID: ${booking.id}

Dear ${booking.customerDetails?.firstName} ${booking.customerDetails?.lastName},

Thank you for choosing Zenex Travel! Your booking has been received.

Booking Reference ID: ${booking.id}
Status: Pending Confirmation
Item: ${booking.itemName}
Trip Date: ${booking.dates?.start}
Number of Travelers: ${booking.travelersCount || 1}
Payment Method: ${booking.paymentOption === 'deposit' ? '20% Deposit Online' : 'Book Now Pay Later'}
Total Price: ${booking.amount}

We look forward to welcoming you to Kathmandu!
============================================================
        `);

        res.json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/bookings/:id', async (req, res) => {
    try {
        const existing = await db.getById('bookings', req.params.id);
        if (existing) {
            const updated = { ...existing, ...req.body, id: req.params.id };
            await db.save('bookings', updated);
            res.json({ success: true, booking: updated });
        } else {
            res.status(404).json({ success: false, message: 'Booking not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        await db.remove('bookings', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Generic Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/api/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// ==============================================
// TESTIMONIALS
// ==============================================
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await db.getAll('testimonials');
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/testimonials', upload.single('image'), async (req, res) => {
    try {
        const newTestimonial = {
            id: Date.now().toString(),
            name: req.body.name || 'Anonymous',
            trip: req.body.trip || 'Tour Package',
            vehicle: req.body.vehicle || '',
            date: req.body.date || new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
            text: req.body.text || '',
            rating: req.body.rating ? parseInt(req.body.rating, 10) : 5,
            img: req.file ? `/api/uploads/${req.file.filename}` : (req.body.img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150')
        };

        await db.save('testimonials', newTestimonial);
        res.json(newTestimonial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/testimonials/:id', upload.single('image'), async (req, res) => {
    try {
        const existing = await db.getById('testimonials', req.params.id);
        if (existing) {
            const updated = { ...existing, ...req.body, id: req.params.id };
            if (req.file) {
                updated.img = `/api/uploads/${req.file.filename}`;
            }
            await db.save('testimonials', updated);
            res.json(updated);
        } else {
            res.status(404).json({ error: 'Testimonial not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/testimonials/:id', async (req, res) => {
    try {
        await db.remove('testimonials', req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve static frontend files for Production
const frontendDist = path.join(__dirname, '../dist');
app.use(express.static(frontendDist));

// Catch-all route to serve React app for non-API requests
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`ZENEX TRAVEL API server running on port ${PORT}`);
    if (db.isUsingMySQL()) {
        await db.initTables();
    }
});
