const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

let nodemailer;
try {
    nodemailer = require('nodemailer');
} catch (e) {
    nodemailer = null;
}

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

const sendBookingNotificationEmail = async (booking) => {
    const adminEmail = process.env.MAIL_TO || 'info@zenextravels.com';
    const customer = booking.customerDetails || {};
    const customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Valued Traveler';
    const customerEmail = customer.email;

    console.log(`
======================= NEW BOOKING TO: info@zenextravels.com =====================
Booking ID: ${booking.id}
Package / Trek: ${booking.itemName}
Category: ${booking.itemCategory || 'Trek / Tour'}
Start Date: ${booking.dates?.start || 'N/A'}
Duration: ${booking.dates?.duration || 'N/A'}
Travelers Count: ${booking.travelersCount || 1}
Customer: ${customerName}
Email: ${customerEmail}
Phone: ${customer.phone || 'N/A'} | WhatsApp: ${customer.whatsapp || 'N/A'}
Country: ${customer.country || 'N/A'}
Passport: ${customer.passportNumber || 'N/A'}
Payment Preference: ${booking.paymentOption === 'deposit' ? '20% Deposit Online' : 'Book Now, Pay Later (100% on Arrival)'}
Total Price: ${booking.amount || 'N/A'}
Submitted To Mail: ${adminEmail}
===================================================================================
    `);

    if (!nodemailer) {
        console.log('[EMAIL] Nodemailer not loaded. Logged booking details to server console.');
        return { success: false, reason: 'nodemailer_missing' };
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    if (!host || !user || !pass) {
        console.log(`[EMAIL NOTICE] Booking received and routed to ${adminEmail}. To enable direct SMTP email delivery from the server, configure SMTP_HOST, SMTP_USER, and SMTP_PASS in backend/.env`);
        return { success: false, reason: 'smtp_not_configured' };
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
            tls: { rejectUnauthorized: false }
        });

        const addonsHtml = Array.isArray(booking.addons) && booking.addons.length > 0
            ? booking.addons.map(a => `<li>${a.name} (x${a.quantity}) - US$${a.price}</li>`).join('')
            : '<li>None</li>';

        const extraTravelersHtml = Array.isArray(booking.additionalTravelers) && booking.additionalTravelers.length > 0
            ? booking.additionalTravelers.map((t, idx) => `<li>Traveler ${idx + 2}: <strong>${t.firstName || ''} ${t.lastName || ''}</strong> ${t.email ? `(${t.email})` : ''} ${t.passportNumber ? `[Passport: ${t.passportNumber}]` : ''}</li>`).join('')
            : '<li>None</li>';

        const emailHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
                <div style="background: #1e3a8a; color: #ffffff; padding: 24px; text-align: center;">
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">ZENEX TRAVELS & TOURS</h1>
                    <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 14px;">New Tour / Trek Package Booking Received</p>
                </div>

                <div style="padding: 24px; color: #334155; line-height: 1.6;">
                    <div style="background: #f1f5f9; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 0; font-size: 15px;"><strong>Booking Reference ID:</strong> <span style="color: #e53a24; font-weight: 800;">${booking.id}</span></p>
                        <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Submitted to: <strong>${adminEmail}</strong> on ${new Date().toLocaleString()}</p>
                    </div>

                    <h3 style="color: #0f172a; margin-top: 20px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Trip & Package Details</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
                        <tr><td style="padding: 6px 0; color: #64748b; width: 140px;"><strong>Package Name:</strong></td><td style="padding: 6px 0; font-weight: bold; color: #1e3a8a;">${booking.itemName}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Category:</strong></td><td style="padding: 6px 0;">${booking.itemCategory || 'Trek / Tour'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Start Date:</strong></td><td style="padding: 6px 0;">${booking.dates?.start || 'Not specified'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Duration:</strong></td><td style="padding: 6px 0;">${booking.dates?.duration || 'N/A'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Travelers:</strong></td><td style="padding: 6px 0; font-weight: bold;">${booking.travelersCount || 1} Person(s)</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Total Price:</strong></td><td style="padding: 6px 0; font-weight: bold; color: #059669; font-size: 16px;">${booking.amount || 'N/A'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Payment Preference:</strong></td><td style="padding: 6px 0;">${booking.paymentOption === 'deposit' ? '20% Deposit Online' : 'Book Now, Pay Later (100% on Arrival in Kathmandu)'}</td></tr>
                    </table>

                    <h3 style="color: #0f172a; margin-top: 24px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Lead Traveler Information</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
                        <tr><td style="padding: 6px 0; color: #64748b; width: 140px;"><strong>Full Name:</strong></td><td style="padding: 6px 0; font-weight: bold;">${customerName}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td><td style="padding: 6px 0;"><a href="mailto:${customerEmail}" style="color: #2563eb;">${customerEmail || 'N/A'}</a></td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td><td style="padding: 6px 0;">${customer.phone || 'N/A'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>WhatsApp:</strong></td><td style="padding: 6px 0;">${customer.whatsapp || 'N/A'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Country:</strong></td><td style="padding: 6px 0;">${customer.country || 'N/A'}</td></tr>
                        <tr><td style="padding: 6px 0; color: #64748b;"><strong>Passport No:</strong></td><td style="padding: 6px 0;">${customer.passportNumber || 'N/A'}</td></tr>
                        ${customer.extraRequirements ? `<tr><td style="padding: 6px 0; color: #64748b;"><strong>Requirements:</strong></td><td style="padding: 6px 0;">${customer.extraRequirements}</td></tr>` : ''}
                    </table>

                    <h3 style="color: #0f172a; margin-top: 24px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Add-ons</h3>
                    <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                        ${addonsHtml}
                    </ul>

                    <h3 style="color: #0f172a; margin-top: 24px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Additional Travelers</h3>
                    <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                        ${extraTravelersHtml}
                    </ul>
                </div>

                <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
                    Zenex Travels & Tours | Gairidhara-02, Kathmandu, Nepal | <a href="mailto:info@zenextravels.com" style="color: #2563eb;">info@zenextravels.com</a>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Zenex Travels Booking" <${user}>`,
            to: adminEmail,
            replyTo: customerEmail || adminEmail,
            subject: `[New Booking] #${booking.id} - ${booking.itemName} (${customerName})`,
            html: emailHtml
        });
        console.log(`[EMAIL] Successfully sent booking notification email to ${adminEmail}`);

        if (customerEmail) {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || `"Zenex Travels & Tours" <${user}>`,
                to: customerEmail,
                subject: `Booking Order Received #${booking.id} - ${booking.itemName} | Zenex Travels`,
                html: emailHtml
            }).catch(e => console.log('[EMAIL] Customer copy notice:', e.message));
        }

        return { success: true };
    } catch (err) {
        console.error('[EMAIL ERROR]', err.message);
        return { success: false, error: err.message };
    }
};

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

        // Send booking email notification to info@zenextravels.com
        sendBookingNotificationEmail(booking).catch(err => {
            console.error('[BOOKING EMAIL ASYNC ERROR]', err);
        });

        res.json({ success: true, booking, submittedTo: 'info@zenextravels.com' });
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
