const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbJsonPath = path.join(__dirname, '..', 'database', 'db.json');

// Collection to Table name mapping
const TABLE_MAP = {
    vehicles: 'vehicles',
    packages: 'packages',
    treks: 'treks',
    tourTrips: 'tour_trips',
    regions: 'regions',
    blogs: 'blogs',
    bookings: 'bookings',
    testimonials: 'testimonials',
    drivers: 'drivers'
};

let pool = null;
let useMySQL = false;

// Initialize MySQL pool if environment credentials exist
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306', 10),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 10000
        });
        useMySQL = true;
        console.log(`[DB] MySQL pool configured for "${process.env.DB_NAME}" at ${process.env.DB_HOST}`);
    } catch (err) {
        console.error('[DB] Failed to initialize MySQL pool, falling back to db.json:', err.message);
        useMySQL = false;
    }
} else {
    console.log('[DB] No MySQL configuration found in environment variables. Using local db.json fallback.');
}

// Ensure all tables exist in MySQL
async function initTables() {
    if (!useMySQL || !pool) return;
    try {
        const connection = await pool.getConnection();
        console.log('[DB] Testing MySQL connection and ensuring tables exist...');
        
        for (const table of Object.values(TABLE_MAP)) {
            await connection.query(`
                CREATE TABLE IF NOT EXISTS \`${table}\` (
                    \`id\` VARCHAR(255) NOT NULL PRIMARY KEY,
                    \`title\` VARCHAR(255) NULL,
                    \`slug\` VARCHAR(255) NULL,
                    \`category\` VARCHAR(100) NULL,
                    \`data\` LONGTEXT NOT NULL,
                    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX \`idx_slug\` (\`slug\`),
                    INDEX \`idx_category\` (\`category\`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);
        }
        connection.release();
        console.log('[DB] All MySQL tables verified successfully.');
    } catch (err) {
        console.error('[DB] MySQL table initialization error. Will use db.json fallback for failed queries:', err.message);
    }
}

// Fallback JSON helpers
function readLocalDB() {
    try {
        if (!fs.existsSync(dbJsonPath)) {
            const initDb = { vehicles: [], packages: [], treks: [], tourTrips: [], regions: [], blogs: [], bookings: [], testimonials: [], drivers: [] };
            fs.writeFileSync(dbJsonPath, JSON.stringify(initDb, null, 2), 'utf8');
            return initDb;
        }
        const raw = fs.readFileSync(dbJsonPath, 'utf8');
        return JSON.parse(raw);
    } catch (e) {
        console.error('[DB] Local JSON read error:', e);
        return { vehicles: [], packages: [], treks: [], tourTrips: [], regions: [], blogs: [], bookings: [], testimonials: [], drivers: [] };
    }
}

function writeLocalDB(data) {
    try {
        fs.writeFileSync(dbJsonPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error('[DB] Local JSON write error:', e);
    }
}

/**
 * Get all items in a collection
 */
async function getAll(collection) {
    const table = TABLE_MAP[collection];
    if (useMySQL && pool && table) {
        try {
            const [rows] = await pool.query(`SELECT id, data FROM \`${table}\` ORDER BY id ASC`);
            return rows.map(r => {
                try {
                    const item = typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
                    if (!item.id && r.id) item.id = r.id;
                    return item;
                } catch (e) {
                    return null;
                }
            }).filter(Boolean);
        } catch (err) {
            console.error(`[DB] MySQL error in getAll(${collection}):`, err.message);
        }
    }
    // Fallback
    const local = readLocalDB();
    return local[collection] || [];
}

/**
 * Get single item by ID or Slug
 */
async function getById(collection, idOrSlug) {
    const table = TABLE_MAP[collection];
    if (useMySQL && pool && table) {
        try {
            const [rows] = await pool.query(
                `SELECT data FROM \`${table}\` WHERE id = ? OR slug = ? LIMIT 1`,
                [String(idOrSlug), String(idOrSlug)]
            );
            if (rows.length > 0) {
                const r = rows[0];
                return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
            }
            return null;
        } catch (err) {
            console.error(`[DB] MySQL error in getById(${collection}, ${idOrSlug}):`, err.message);
        }
    }
    // Fallback
    const local = readLocalDB();
    return (local[collection] || []).find(item => String(item.id) === String(idOrSlug) || item.slug === String(idOrSlug)) || null;
}

/**
 * Save or insert an item into a collection
 */
async function save(collection, item) {
    if (!item || !item.id) {
        throw new Error(`Cannot save item without an id to ${collection}`);
    }
    const table = TABLE_MAP[collection];
    const id = String(item.id);
    const title = item.title || item.name || null;
    const slug = item.slug || null;
    const category = item.category || item.region || item.type || null;
    const jsonStr = JSON.stringify(item);

    if (useMySQL && pool && table) {
        try {
            await pool.query(`
                INSERT INTO \`${table}\` (id, title, slug, category, data)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    title = VALUES(title),
                    slug = VALUES(slug),
                    category = VALUES(category),
                    data = VALUES(data),
                    updated_at = CURRENT_TIMESTAMP
            `, [id, title, slug, category, jsonStr]);
            return item;
        } catch (err) {
            console.error(`[DB] MySQL error in save(${collection}):`, err.message);
        }
    }

    // Fallback / sync local
    const local = readLocalDB();
    if (!Array.isArray(local[collection])) local[collection] = [];
    const idx = local[collection].findIndex(i => String(i.id) === id);
    if (idx !== -1) {
        local[collection][idx] = item;
    } else {
        local[collection].push(item);
    }
    writeLocalDB(local);
    return item;
}

/**
 * Delete an item from a collection by ID
 */
async function remove(collection, id) {
    const table = TABLE_MAP[collection];
    const idStr = String(id);

    if (useMySQL && pool && table) {
        try {
            await pool.query(`DELETE FROM \`${table}\` WHERE id = ?`, [idStr]);
        } catch (err) {
            console.error(`[DB] MySQL error in remove(${collection}, ${id}):`, err.message);
        }
    }

    // Fallback / sync local
    const local = readLocalDB();
    if (Array.isArray(local[collection])) {
        local[collection] = local[collection].filter(i => String(i.id) !== idStr);
        writeLocalDB(local);
    }
    return true;
}

module.exports = {
    initTables,
    getAll,
    getById,
    save,
    remove,
    TABLE_MAP,
    readLocalDB,
    writeLocalDB,
    isUsingMySQL: () => useMySQL
};
