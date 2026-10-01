# Hostinger MySQL Database Setup & Zero-Data-Loss Deployment Guide

This guide explains how to set up your persistent **MySQL Database on Hostinger** for Zenex Travel so that your packages, bookings, treks, vehicles, and blogs are safely stored in a real database and **never lost or overwritten when you update the website**.

---

## Why MySQL on Hostinger Prevents Data Loss

| Previous Local File (`db.json`) | New Persistent MySQL Database |
| :--- | :--- |
| Stored inside the code folders on the server. | Stored independently in Hostinger's MySQL server. |
| Rebuilding or uploading new website code overwrites the file. | Updating website files or git pulling **never touches** your database. |
| Risk of losing customer bookings or new packages. | 100% data retention + automatic Hostinger backups. |

---

## Step 1: Create Your MySQL Database in Hostinger hPanel

1. Log into your **Hostinger Control Panel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Navigate to **Databases** → **MySQL Databases**.
3. Under **Create a New MySQL Database and Database User**:
   * **MySQL Database name**: e.g., `zenex_db` (Hostinger will prefix it, e.g. `u123456789_zenex_db`)
   * **MySQL Username**: e.g., `zenex_user` (Hostinger will prefix it, e.g. `u123456789_zenex_user`)
   * **Password**: Create a strong password (keep this safe)
4. Click **Create**.
5. Note down the exact values:
   * **Database Name**: e.g., `u123456789_zenex_db`
   * **Database User**: e.g., `u123456789_zenex_user`
   * **Password**: `your_password`
   * **Database Host**: `localhost` (when the Node.js backend runs on Hostinger)

---

## Step 2: Configure Environment Variables (`.env`)

In your backend directory on Hostinger (or in your local project root if connecting remotely):

1. Create or edit the file `backend/.env` (or set environment variables in Hostinger's Node.js application settings).
2. Put the following configuration:

```env
# Hostinger MySQL Database Credentials
DB_HOST=localhost
DB_PORT=3306
DB_USER=u123456789_zenex_user
DB_PASSWORD=your_actual_password
DB_NAME=u123456789_zenex_db

# Server Port
PORT=5000
```

> **Note:** If `DB_HOST` is not set, the application will automatically fall back to local `database/db.json`, so local development will never break even when offline!

---

## Step 3: Run the 1-Click Migration Script

Once your database credentials are in `.env`, run the migration wizard to import all existing data into Hostinger MySQL:

### On the Server (or local terminal):
```bash
cd backend
npm run db:migrate
```

### What this script does automatically:
1. Connects to your Hostinger MySQL database.
2. Creates the necessary tables (`packages`, `tour_trips`, `treks`, `vehicles`, `blogs`, `regions`, `bookings`, `testimonials`, `drivers`).
3. Reads all records from `backend/database/db.json`.
4. Bulk-imports:
   * **69 Packages**
   * **93 Tour Trips**
   * **27 Treks**
   * **24 Regions**
   * **11 Vehicles**
   * **11 Blogs**
   * All bookings, reviews, and driver profiles.
5. Verifies and prints a report table of the imported counts.

---

## Step 4: How Future Website Updates Work (Zero Data Loss)

Now that your data is stored in Hostinger MySQL:

1. Whenever you update frontend pages, CSS, components, or itinerary texts:
   * You can build your frontend: `npm run build`
   * Upload the new files to Hostinger or run `git pull`
   * Restart your Node.js application in Hostinger hPanel
2. **Your live data remains completely untouched:**
   * Customer bookings made on the website remain safe in the `bookings` table.
   * Packages or blogs created or edited via the website admin panel remain safe in MySQL.
   * New code updates only refresh the presentation and application logic!

---

## Step 5: Managing & Backing Up Data via phpMyAdmin

1. In Hostinger hPanel, go to **Databases** → **phpMyAdmin** and click **Enter phpMyAdmin** next to your database.
2. You can view all tables (`packages`, `tour_trips`, `treks`, `vehicles`, etc.).
3. **To take a 1-Click Backup**:
   * Click **Export** at the top menu in phpMyAdmin.
   * Choose **Quick** export format and click **Export**.
   * A single `.sql` file will be downloaded to your computer containing your entire database.
