import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import VehicleListing from './pages/VehicleListing';
import VehicleDetail from './pages/VehicleDetail';
import HiaceRoutes from './pages/HiaceRoutes';
import ScorpioRoutes from './pages/ScorpioRoutes';
import CarRoutes from './pages/CarRoutes';
import BusRoutes from './pages/BusRoutes';
import CoasterRoutes from './pages/CoasterRoutes';
import CarModels from './pages/CarModels';
import SelfDriveRates from './pages/SelfDriveRates';
import BookingCheckout from './pages/BookingCheckout';
import About from './pages/About';
import Contact from './pages/Contact';
import TripPlanner from './pages/TripPlanner';
import AirportRental from './pages/AirportRental';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import FAQPage from './pages/FAQPage';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Tours from './pages/Tours';
import RouteLanding from './pages/RouteLanding';
import SEOLanding from './pages/SEOLanding';
import SelfDrive from './pages/SelfDrive';
import WeddingCar from './pages/WeddingCar';
import FlightTicketing from './pages/FlightTicketing';
import DashboardLayout from './layouts/DashboardLayout';
import FleetManagement from './pages/dashboards/FleetManagement';
import AdminLogin from './pages/admin/AdminLogin';
import AdminOverview from './pages/dashboards/AdminOverview';
import DestinationsAdmin from './pages/dashboards/DestinationsAdmin';
import PackagesAdmin from './pages/dashboards/PackagesAdmin';
import TreksAdmin from './pages/dashboards/TreksAdmin';
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
import ManageDrivers from './pages/admin/ManageDrivers';
import AddDriver from './pages/admin/AddDriver';
import Treks from './pages/Treks';
import TrekDetail from './pages/TrekDetail';
import TrekRegion from './pages/TrekRegion';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'vehicles', element: <VehicleListing /> },
      { path: 'vehicles/hiace-routes', element: <HiaceRoutes /> },
      { path: 'vehicles/scorpio-routes', element: <ScorpioRoutes /> },
      { path: 'vehicles/car-routes', element: <CarRoutes /> },
      { path: 'vehicles/bus-routes', element: <BusRoutes /> },
      { path: 'vehicles/coaster-routes', element: <CoasterRoutes /> },
      { path: 'vehicles/car-models', element: <CarModels /> },
      { path: 'vehicles/self-drive', element: <SelfDriveRates /> },
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
      { path: 'faq', element: <FAQPage /> },
      { path: 'packages', element: <Packages /> },
      { path: 'packages/:id', element: <PackageDetail /> },
      { path: 'tours', element: <Tours /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'blogs/:id', element: <BlogDetail /> },
      { path: 'route/:slug', element: <RouteLanding /> },
      { path: 'car-rental-kathmandu', element: <SEOLanding staticSlug="car-rental-kathmandu" /> },
      { path: 'rent-jeep-nepal', element: <SEOLanding staticSlug="rent-jeep-nepal" /> },
      { path: 'luxury-car-rental-nepal', element: <SEOLanding staticSlug="luxury-car-rental-nepal" /> },
      { path: 'self-drive-car-rental-nepal', element: <SelfDrive /> },
      { path: 'wedding-car-rental-kathmandu', element: <WeddingCar /> },
      { path: 'flight-ticketing-nepal', element: <FlightTicketing /> },
      { path: 'airport-transfer-kathmandu', element: <AirportRental /> },
      { path: 'treks', element: <Treks /> },
      { path: 'treks/region/:regionId', element: <TrekRegion /> },
      { path: 'treks/:id', element: <TrekDetail /> },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { path: 'vehicles', element: <ManageVehicles /> },
      { path: 'add-vehicle', element: <AddVehicle /> },
      { path: 'drivers', element: <ManageDrivers /> },
      { path: 'add-driver', element: <AddDriver /> },
      { path: 'blogs', element: <ManageBlogs /> },
      { path: 'add-blog', element: <AddBlog /> },
      { path: 'gallery', element: <ManageGallery /> },
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
      { path: 'treks', element: <TreksAdmin /> },
      { path: 'bookings', element: <BookingsAdmin /> },
      {
          path: 'drivers',
          element: <ManageDrivers />
        },
        {
          path: 'add-driver',
          element: <AddDriver />
        },
        {
          path: 'blogs',
          element: <ManageBlogs />
        },
        { path: 'add-blog', element: <AddBlog /> },
      { path: 'gallery', element: <ManageGallery /> },
    ]
  }
]);

export default router;
