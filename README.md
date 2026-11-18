# Nepal Car Rental (नेपाल कार रेन्टल)

Production-ready, full-stack vehicle rental and fleet management platform tailored specifically for Nepal. Built based on the high-fidelity UI/UX design specifications featuring royal blue styling (`#0755C9`), authentic Nepal routes (Kathmandu, Pokhara, Chitwan, Lumbini, etc.), NPR currency formatting, and integration with Nepal digital payment systems (eSewa & Khalti).

---

## 🌟 Live Features & UI/UX Screens

### 1. Customer Application
* **Welcome / Splash Screen (Screen A)**
  * Mountain backdrop & pagoda stupa silhouette.
  * Emblem logo: *Nepal Car Rental – Rent a Car Anywhere in Nepal*.
  * Modern Hyundai Creta showcase with carousel pagination dots.
  * **Get Started**, **Login**, and **Sign Up** actions.
* **Customer Homepage (Screen B)**
  * Location selector (Kathmandu, Pokhara, Chitwan, etc.).
  * Customer greeting: `Hi Saroj 👋 Find and book your ride`.
  * **With Driver** / **Self Drive** toggle.
  * Pickup and drop-off selection, date picker (`Nov 5, 2026 – Nov 7, 2026`).
  * Browse by categories: *Hatchback*, *SUV*, *Premium*, *Van/Hiace*, *Micro/Bus*, *Electric Vehicles*.
  * Promotional banners: *Kathmandu to Pokhara from NPR 7,500/day*, Airport transfers KTM.
* **Available Cars Screen (Screen C)**
  * Header with vehicle count (`Available Cars (24)`).
  * Category scroll pills: *All*, *Hatchback*, *SUV*, *Premium*, *Van/Hiace*, *Electric Vehicles*.
  * Filter modal: Passenger capacity (5, 7, 14+), Transmission, Fuel Type, Price range slider.
  * Vehicle cards with ratings, daily prices in NPR, and badges (`With Driver`, `AC`).
* **Vehicle Details Screen (Screen D)**
  * High-resolution image carousel.
  * Pricing: e.g., `NPR 8,500 per day` with driver / `NPR 7,000 per day` self drive.
  * Specifications: 5 Seater, Automatic, Petrol, AC, luggage capacity, engine specs.
  * Description & cancellation policy alert.
  * Prominent **Book Now** action.
* **Booking Process & Confirmation (Screens E & F)**
  * Multi-step booking checkout with real-time server-side price calculation.
  * Double-booking prevention during overlapping rental periods.
  * Payment gateways: **eSewa** (EPAYTEST), **Khalti** (Paisa), and **Cash on Handover**.
  * Confetti celebration on booking confirmation.
  * Summary card with vehicle snippet, dates, route (`Kathmandu → Pokhara`), and total NPR.
  * Copyable Booking ID pill: `Booking ID: NCR-10458 📋`.
* **Customer Profile (Screen G)**
  * Driving licence & citizenship KYC verification badges.
  * Booking history with status pills (`Confirmed`, `Ongoing`, `Completed`, `Cancelled`).
  * Instant tax invoice preview and printing.

### 2. Admin Dashboard
* **KPI Overview Cards**:
  * Total Vehicles: `42`
  * Total Bookings: `186`
  * Total Revenue: `NPR 14,75,000`
  * Active Customers: `1,248`
* **Analytics**:
  * Bookings Overview Area Chart with smooth gradient across months (May – Nov).
  * Recent Bookings list (`#NCR-10458`, `#NCR-10457`, `#NCR-10456`).
* **Fleet Management**:
  * Add vehicle modal, set daily with-driver and self-drive rates, upload photos, set plate numbers (`BA 18 CHA 4291`).
* **Driver Management**:
  * Nepali chauffeurs (`Ram Bahadur Thapa`, `Bikash Gurung`, `Deepak Shrestha`) with ratings and trip counts.
* **Booking & KYC Management**:
  * Approve, start trip, complete trip, or assign drivers.
  * Customer license verification approval.
* **Maintenance & Bluebook Tax Tracking**:
  * Track government vehicle tax token expiry and periodic service records.

---

## 🛠️ Technology Stack

* **Frontend**:
  * React.js (v18)
  * Vite
  * Tailwind CSS
  * React Router DOM (v7)
  * Lucide React Icons
  * Recharts
  * Canvas Confetti
  * Axios
* **Backend**:
  * Node.js & Express.js
  * MongoDB & Mongoose
  * JWT Authentication & bcryptjs
  * RESTful APIs with centralized error handling
* **Nepal Integrations**:
  * eSewa Payment Gateway (HMAC-SHA256 signature support & sandbox simulator)
  * Khalti Payment Gateway
  * NPR Currency formatting
  * Nepal Phone Validation (+977)

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+
* MongoDB running locally on port 27017

### 1. Database Seeding
To populate vehicles, users, drivers, and bookings matching the design reference:
```bash
cd server
npm run seed
```

### 2. Run Backend API
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### 3. Run Frontend
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔑 Demo Accounts & Evaluation

You can switch roles with 1 click in the top bar, or log in with these credentials:

| Persona | Name | Email | Password | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | Saroj | `customer@nepalcarrental.com` | `customerpassword123` | Customer |
| **Admin** | Saroj Bhagat | `admin@nepalcarrental.com` | `adminpassword123` | Admin |
| **Staff** | Pooja Shrestha | `staff@nepalcarrental.com` | `staffpassword123` | Staff |

---

## 📱 Mobile vs Desktop Views

Use the toggle in the top header:
* **Mobile View**: Renders the customer app inside an iPhone simulator mockup with status bar, dynamic island, and bottom navigation, matching the 5 smartphone screens in the reference image.
* **Desktop View**: Renders a wide responsive web interface.
* **Admin Panel**: Directly access the complete admin portal at `/admin`.
