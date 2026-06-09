import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import VehicleListing from './pages/VehicleListing';
import VehicleDetail from './pages/VehicleDetail';
import BookingCheckout from './pages/BookingCheckout';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import TripPlanner from './pages/TripPlanner';
import AirportRental from './pages/AirportRental';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import DashboardLayout from './layouts/DashboardLayout';
import FleetManagement from './pages/dashboards/FleetManagement';
import AdminLogin from './pages/admin/AdminLogin';
import AdminOverview from './pages/dashboards/AdminOverview';
import DestinationsAdmin from './pages/dashboards/DestinationsAdmin';
import PackagesAdmin from './pages/dashboards/PackagesAdmin';
import BookingsAdmin from './pages/dashboards/BookingsAdmin';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'vehicles', element: <VehicleListing /> },
      { path: 'vehicles/:id', element: <VehicleDetail /> },
      { path: 'checkout', element: <BookingCheckout /> },
      { path: 'planner', element: <TripPlanner /> },
      { path: 'airport/:code', element: <AirportRental /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'blog', element: <Blog /> },
      { path: 'destinations', element: <Destinations /> },
      { path: 'destinations/:id', element: <DestinationDetail /> },
      { path: 'packages', element: <Packages /> },
      { path: 'packages/:id', element: <PackageDetail /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'fleet', element: <FleetManagement /> },
      { path: 'destinations', element: <DestinationsAdmin /> },
      { path: 'packages', element: <PackagesAdmin /> },
      { path: 'bookings', element: <BookingsAdmin /> },
    ]
  }
]);

export default router;
