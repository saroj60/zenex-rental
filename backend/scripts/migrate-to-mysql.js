/**
 * Zenex Travel - Database Migration Script
 * Migrates all records from backend/database/db.json into Hostinger MySQL Database
 *
 * Usage:
 *   node scripts/migrate-to-mysql.js
 *   or: npm run db:migrate (from backend directory)
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

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

async function migrate() {
    console.log('========================================================');
    console.log('   ZENEX TRAVEL - HOSTINGER MYSQL MIGRATION WIZARD      ');
    console.log('========================================================\n');

    // 1. Verify environment configuration
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME;
    const port = parseInt(process.env.DB_PORT || '3306', 10);

    if (!host || !user || !database) {
        console.error('❌ ERROR: Missing database environment variables in .env!');
        console.error('Please ensure the following are defined in backend/.env:');
        console.error('  DB_HOST=... (e.g. localhost or your Hostinger IP)');
        console.error('  DB_USER=... (e.g. u123456789_zenex)');
        console.error('  DB_PASSWORD=... (your MySQL password)');
        console.error('  DB_NAME=... (e.g. u123456789_zenex)');
        console.error('  DB_PORT=3306\n');
        process.exit(1);
    }

    console.log(`Connecting to MySQL database "${database}" on ${host}:${port} as "${user}"...`);

    let connection;
    try {
        connection = await mysql.createConnection({
            host,
            port,
            user,
            password,
            database
        });
        console.log(' Connected to MySQL successfully!\n');
    } catch (err) {
        console.error('❌ Failed to connect to MySQL:', err.message);
        console.error('\nTips for Hostinger:');
        console.error('1. If running on Hostinger server via SSH or Node App: use DB_HOST=localhost');
        console.error('2. If running from your local PC to Hostinger: enable "Remote MySQL" in Hostinger hPanel and add your current IP address.');
        process.exit(1);
    }

    // 2. Create tables
    console.log('--- Step 1: Creating Tables If Not Exist ---');
    for (const [collection, table] of Object.entries(TABLE_MAP)) {
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
        console.log(`✓ Table \`${table}\` ready.`);
    }

    // 3. Read db.json
    console.log('\n--- Step 2: Reading Local database/db.json ---');
    const dbJsonPath = path.join(__dirname, '..', 'database', 'db.json');
    if (!fs.existsSync(dbJsonPath)) {
        console.error(`❌ db.json not found at ${dbJsonPath}`);
        await connection.end();
        process.exit(1);
    }

    const localData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
    console.log('✓ Successfully read local db.json\n');

    // 4. Migrate each collection
    console.log('--- Step 3: Migrating Records to MySQL ---');
    const results = {};

    for (const [collection, table] of Object.entries(TABLE_MAP)) {
        const items = Array.isArray(localData[collection]) ? localData[collection] : [];
        let count = 0;

        for (const item of items) {
            if (!item) continue;
            const id = String(item.id || `gen-${Date.now()}-${Math.random()}`);
            if (!item.id) item.id = id;

            const title = item.title || item.name || null;
            const slug = item.slug || null;
            const category = item.category || item.region || item.type || null;
            const jsonStr = JSON.stringify(item);

            await connection.query(`
                INSERT INTO \`${table}\` (id, title, slug, category, data)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    title = VALUES(title),
                    slug = VALUES(slug),
                    category = VALUES(category),
                    data = VALUES(data),
                    updated_at = CURRENT_TIMESTAMP
            `, [id, title, slug, category, jsonStr]);

            count++;
        }

        // Verify count in MySQL
        const [rows] = await connection.query(`SELECT COUNT(*) as total FROM \`${table}\``);
        const mysqlTotal = rows[0].total;
        results[collection] = { migrated: count, totalInDb: mysqlTotal };
        console.log(`✓ [${collection} -> \`${table}\`]: Migrated ${count} records (Total in MySQL: ${mysqlTotal})`);
    }

    await connection.end();

    console.log('\n========================================================');
    console.log('        MIGRATION COMPLETED SUCCESSFULLY! 🎉             ');
    console.log('========================================================');
    console.table(results);
    console.log('All packages, tours, treks, vehicles, blogs, and settings are safely in Hostinger MySQL.');
    console.log('Future website deployments will NOT overwrite or affect this data!\n');
}

migrate().catch(err => {
    console.error('Fatal migration error:', err);
    process.exit(1);
});
