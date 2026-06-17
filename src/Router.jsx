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
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Tours from './pages/Tours';
import RouteLanding from './pages/RouteLanding';
import DashboardLayout from './layouts/DashboardLayout';
import FleetManagement from './pages/dashboards/FleetManagement';
import AdminLogin from './pages/admin/AdminLogin';
import AdminOverview from './pages/dashboards/AdminOverview';
import DestinationsAdmin from './pages/dashboards/DestinationsAdmin';
import PackagesAdmin from './pages/dashboards/PackagesAdmin';
import BookingsAdmin from './pages/dashboards/BookingsAdmin';
import DriversAdmin from './pages/dashboards/DriversAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import AdminLayout from './pages/admin/AdminLayout';
import ManageBlogs from './pages/admin/ManageBlogs';
import AddBlog from './pages/admin/AddBlog';
import ManageVehicles from './pages/admin/ManageVehicles';
import AddVehicle from './pages/admin/AddVehicle';
import ManageGallery from './pages/admin/ManageGallery';

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
      { path: 'blog', element: <Blogs /> },
      { path: 'destinations', element: <Destinations /> },
      { path: 'destinations/:id', element: <DestinationDetail /> },
      { path: 'terms-and-conditions', element: <TermsConditions /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'cancellation-policy', element: <CancellationPolicy /> },
      { path: 'packages', element: <Packages /> },
      { path: 'packages/:id', element: <PackageDetail /> },
      { path: 'tours', element: <Tours /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'blogs/:id', element: <BlogDetail /> },
      { path: 'route/:slug', element: <RouteLanding /> },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { path: 'vehicles', element: <ManageVehicles /> },
      { path: 'add-vehicle', element: <AddVehicle /> },
    ]
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
      { path: 'drivers', element: <DriversAdmin /> },
      { path: 'destinations', element: <DestinationsAdmin /> },
      { path: 'packages', element: <PackagesAdmin /> },
      { path: 'bookings', element: <BookingsAdmin /> },
      { path: 'blogs', element: <ManageBlogs /> },
      { path: 'add-blog', element: <AddBlog /> },
      { path: 'gallery', element: <ManageGallery /> },
    ]
  }
]);

export default router;
