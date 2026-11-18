import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  ShieldCheck,
  Check,
  ChevronRight,
  AlertCircle,
  Loader2,
  Compass,
  Car
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import api from '../services/api';

// Subcomponents
import VehicleGallery from '../components/vehicle-details/VehicleGallery';
import VehicleSpecsGrid from '../components/vehicle-details/VehicleSpecsGrid';
import PricingTiersCard from '../components/vehicle-details/PricingTiersCard';
import BookingPanel from '../components/vehicle-details/BookingPanel';
import VehicleTabsInfo from '../components/vehicle-details/VehicleTabsInfo';
import VehicleReviews from '../components/vehicle-details/VehicleReviews';
import SimilarVehiclesSection from '../components/vehicle-details/SimilarVehiclesSection';
import BookingProcessScreen from './BookingProcessScreen';
import AuthModal from '../components/customer/AuthModal';
import CustomerFooter from '../components/customer/CustomerFooter';

export default function VehicleDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rentalType, setRentalType, isFavorite, toggleFavorite } = useBooking();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVehicleDetails();
  }, [id]);

  const fetchVehicleDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/vehicles/${id}`);
      if (res.data?.data) {
        setVehicle(res.data.data);
      } else {
        setError('Vehicle record not found.');
      }
    } catch (err) {
      console.error('Error fetching vehicle details:', err);
      setError('Unable to load vehicle details. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-80 bg-slate-200 rounded-3xl"></div>
            <div className="h-40 bg-slate-200 rounded-3xl"></div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-96 bg-slate-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">Vehicle Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6">
          {error || 'The requested car listing could not be found or has been deactivated.'}
        </p>
        <button
          onClick={() => navigate('/cars')}
          className="px-6 py-2.5 bg-[#0755C9] hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-600/20"
        >
          Back to Available Cars
        </button>
      </div>
    );
  }

  const isFav = isFavorite(vehicle._id);

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between selection:bg-[#0755C9] selection:text-white">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full flex-1">
        
        {/* 1. Breadcrumbs & Top Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#0755C9] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/cars" className="hover:text-[#0755C9] transition-colors">
              Explore Cars
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">
              {vehicle.name}
            </span>
          </nav>

          {/* Share & Favorite Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleShare}
              className="relative px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs font-bold text-slate-700 hover:text-[#0755C9] hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
              {shareCopied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-md shadow-md whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(vehicle._id)}
              className={`p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs transition-colors flex items-center justify-center cursor-pointer ${
                isFav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
              }`}
              title={isFav ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* 2. Main 2-Column Marketplace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 Columns on Desktop): Gallery, Specs, Pricing Tiers, Tabs, Reviews */}
          <div className="lg:col-span-8 space-y-7">
            
            {/* Title & Review Summary Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-[#0755C9] border border-blue-200">
                  {vehicle.category}
                </span>
                <span className="text-xs text-slate-400 font-bold">•</span>
                <span className="text-xs text-slate-600 font-bold">{vehicle.brand}</span>
                <span className="text-xs text-slate-400 font-bold">•</span>
                <span className="text-xs text-slate-500 font-semibold">{vehicle.modelYear || 2024}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#10243A] tracking-tight">
                {vehicle.name}
              </h1>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    {vehicle.rating?.toFixed(1) || '4.8'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  ({vehicle.reviewCount || 98} verified Nepal travelers)
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Commercially Insured
                </span>
              </div>
            </div>

            {/* A. Image Gallery with Thumbnails & Fullscreen Lightbox */}
            <VehicleGallery
              images={vehicle.images}
              vehicleName={vehicle.name}
              category={vehicle.category}
            />

            {/* B. Specifications Grid */}
            <VehicleSpecsGrid vehicle={vehicle} />

            {/* C. Rental Pricing Tiers (Hourly, Daily, Weekly, Monthly) */}
            <PricingTiersCard
              vehicle={vehicle}
              activeRentalType={rentalType}
              onSelectRentalType={setRentalType}
            />

            {/* D. Additional Tabs: Overview, Features, Requirements, Policies */}
            <VehicleTabsInfo vehicle={vehicle} />

            {/* E. Verified Customer Reviews */}
            <VehicleReviews
              vehicleId={vehicle._id}
              averageRating={vehicle.rating || 4.8}
              reviewCount={vehicle.reviewCount || 0}
            />

            {/* F. Similar Vehicles Section */}
            <SimilarVehiclesSection
              vehicleId={vehicle._id}
              rentalType={rentalType}
            />

          </div>

          {/* Right Column (4 Columns on Desktop): Sticky Booking Panel */}
          <div className="lg:col-span-4">
            <BookingPanel
              vehicle={vehicle}
              rentalType={rentalType}
              setRentalType={setRentalType}
              onBookNow={() => navigate(`/checkout/${vehicle._id}`)}
              onRequireLogin={() => navigate(`/login?redirect=${encodeURIComponent(`/checkout/${vehicle._id}`)}`)}
            />
          </div>

        </div>

      </main>

      {/* Booking Process Modal */}
      {showBookingModal && (
        <BookingProcessScreen
          vehicle={vehicle}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {/* Auth Modal (if user clicks book without signing in) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />

      {/* Customer Footer */}
      <CustomerFooter />

    </div>
  );
}
