const fs = require('fs');
const path = require('path');

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

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    return "'" + String(str).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0": return "\\0";
            case "\x08": return "\\b";
            case "\x09": return "\\t";
            case "\x1a": return "\\z";
            case "\n": return "\\n";
            case "\r": return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%": return "\\" + char;
        }
    }) + "'";
}

const dbJsonPath = path.join(__dirname, '..', 'backend', 'database', 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));

let sql = `-- ============================================================
-- Zenex Travel - Full MySQL Database Export
-- Generated: ${new Date().toISOString()}
-- Database: u786674613_zenex_user
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

`;

for (const [collection, table] of Object.entries(TABLE_MAP)) {
    sql += `-- ------------------------------------------------------------\n`;
    sql += `-- Table structure for \`${table}\`\n`;
    sql += `-- ------------------------------------------------------------\n`;
    sql += `CREATE TABLE IF NOT EXISTS \`${table}\` (
  \`id\` VARCHAR(255) NOT NULL PRIMARY KEY,
  \`title\` VARCHAR(255) NULL,
  \`slug\` VARCHAR(255) NULL,
  \`category\` VARCHAR(100) NULL,
  \`data\` LONGTEXT NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_slug\` (\`slug\`),
  INDEX \`idx_category\` (\`category\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

    const items = Array.isArray(dbData[collection]) ? dbData[collection] : [];
    if (items.length > 0) {
        sql += `-- Dumping ${items.length} records for \`${table}\`\n`;
        items.forEach(item => {
            if (!item) return;
            const id = String(item.id || `gen-${Date.now()}-${Math.random()}`);
            item.id = id;
            const title = item.title || item.name || null;
            const slug = item.slug || null;
            const category = item.category || item.region || item.type || null;
            const dataStr = JSON.stringify(item);

            sql += `INSERT INTO \`${table}\` (\`id\`, \`title\`, \`slug\`, \`category\`, \`data\`) VALUES (${escapeSql(id)}, ${escapeSql(title)}, ${escapeSql(slug)}, ${escapeSql(category)}, ${escapeSql(dataStr)}) ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`), \`slug\` = VALUES(\`slug\`), \`category\` = VALUES(\`category\`), \`data\` = VALUES(\`data\`), \`updated_at\` = CURRENT_TIMESTAMP;\n`;
        });
        sql += `\n`;
    }
}

sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;

const outPath = path.join(__dirname, '..', 'zenex_database_import.sql');
fs.writeFileSync(outPath, sql, 'utf8');

console.log(`Successfully generated SQL import file: ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
