import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Compass,
  Check,
  X
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import api from '../services/api';

// Components
import ExploreSearchPanel from '../components/cars/ExploreSearchPanel';
import VehicleFilterSidebar from '../components/cars/VehicleFilterSidebar';
import VehicleCard from '../components/cars/VehicleCard';
import VehicleSkeletonCard from '../components/cars/VehicleSkeletonCard';
import BookingProcessScreen from './BookingProcessScreen';
import CustomerFooter from '../components/customer/CustomerFooter';

export default function AvailableCarsScreen() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    rentalType,
    setRentalType,
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCategory,
    setSelectedCategory,
  } = useBooking();

  // Search & Filter State
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || selectedCategory || 'all',
    occasion: searchParams.get('occasion') || 'all',
    rentalType: searchParams.get('rentalType') || rentalType || 'with_driver',
    transmission: searchParams.get('transmission') || 'all',
    fuelType: searchParams.get('fuelType') || 'all',
    seats: searchParams.get('seats') || 'all',
    minPrice: Number(searchParams.get('minPrice')) || 3000,
    maxPrice: Number(searchParams.get('maxPrice')) || 30000,
    features: searchParams.get('features') ? searchParams.get('features').split(',') : [],
    search: searchParams.get('q') || '',
  });

  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');
  const [page, setPage] = useState(1);
  const [limit] = useState(9); // 3 cards per row on desktop (3x3 grid)

  // Data State
  const [vehicles, setVehicles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [durationDays, setDurationDays] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mobile Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Booking Modal State
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState(null);

  // Fetch Vehicles from Backend API
  const fetchAvailableCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        pickupLocation,
        dropoffLocation,
        pickupDate: startDate,
        returnDate: endDate,
        rentalType: filters.rentalType,
        category: filters.category !== 'all' ? filters.category : undefined,
        occasion: filters.occasion !== 'all' ? filters.occasion : undefined,
        transmission: filters.transmission !== 'all' ? filters.transmission : undefined,
        fuelType: filters.fuelType !== 'all' ? filters.fuelType : undefined,
        seats: filters.seats !== 'all' ? filters.seats : undefined,
        minPrice: filters.minPrice > 3000 ? filters.minPrice : undefined,
        maxPrice: filters.maxPrice < 30000 ? filters.maxPrice : undefined,
        features: filters.features?.length > 0 ? filters.features.join(',') : undefined,
        search: filters.search || undefined,
        sort,
        page,
        limit,
      };

      const res = await api.get('/vehicles/available', { params });

      if (res.data?.data) {
        setVehicles(res.data.data);
        setTotalCount(res.data.total ?? res.data.count ?? res.data.data.length);
        setTotalPages(res.data.totalPages || 1);
        if (res.data.durationDays) setDurationDays(res.data.durationDays);
      }
    } catch (err) {
      console.error('Error fetching available vehicles:', err);
      // Fallback to /vehicles endpoint if /available encounters issue
      try {
        const fallbackRes = await api.get('/vehicles', {
          params: {
            category: filters.category !== 'all' ? filters.category : undefined,
            occasion: filters.occasion !== 'all' ? filters.occasion : undefined,
            rentalType: filters.rentalType,
            sortBy: sort === 'price_asc' ? 'price_asc' : sort === 'price_desc' ? 'price_desc' : 'rating',
          },
        });
        if (fallbackRes.data?.data) {
          setVehicles(fallbackRes.data.data);
          setTotalCount(fallbackRes.data.data.length);
          setTotalPages(1);
        }
      } catch (fallbackErr) {
        setError('Unable to load vehicle listings. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  }, [
    pickupLocation,
    dropoffLocation,
    startDate,
    endDate,
    filters,
    sort,
    page,
    limit,
  ]);

  // Synchronize when filters, search or sort changes
  useEffect(() => {
    fetchAvailableCars();
  }, [fetchAvailableCars]);

  // Sync searchParams occasion to filter state
  useEffect(() => {
    const occ = searchParams.get('occasion');
    if (occ && occ !== filters.occasion) {
      setFilters((prev) => ({ ...prev, occasion: occ }));
    }
  }, [searchParams]);

  // Sync state with URL search params
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.occasion && filters.occasion !== 'all') params.set('occasion', filters.occasion);
    if (filters.rentalType) params.set('rentalType', filters.rentalType);
    if (filters.transmission !== 'all') params.set('transmission', filters.transmission);
    if (filters.fuelType !== 'all') params.set('fuelType', filters.fuelType);
    if (filters.seats !== 'all') params.set('seats', filters.seats);
    if (filters.maxPrice < 30000) params.set('maxPrice', String(filters.maxPrice));
    if (filters.features?.length > 0) params.set('features', filters.features.join(','));
    if (sort !== 'recommended') params.set('sort', sort);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);

    setSearchParams(params, { replace: true });
  }, [filters, sort, startDate, endDate, setSearchParams]);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      occasion: 'all',
      rentalType: 'with_driver',
      transmission: 'all',
      fuelType: 'all',
      seats: 'all',
      minPrice: 3000,
      maxPrice: 30000,
      features: [],
      search: '',
    });
    setSort('recommended');
    setPage(1);
    setSelectedCategory('all');
  };

  const handleBookNow = (vehicle) => {
    navigate(`/checkout/${vehicle._id}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-between selection:bg-[#0755C9] selection:text-white">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full flex-1">
        
        {/* 1. Breadcrumbs & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <span onClick={() => navigate('/')} className="hover:text-[#0755C9] cursor-pointer">
              Home
            </span>
            <span>/</span>
            <span className="text-[#0755C9] font-bold">Explore Cars</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#10243A] tracking-tight">
                Explore Available Cars in Nepal
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Compare verified self-drive vehicles & chauffeur rentals across Kathmandu, Pokhara and national highway routes.
              </p>
            </div>

            {/* Quick Fleet Counter Pill */}
            <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs">
              <span className="font-black text-[#0755C9]">{totalCount}</span> Available Vehicles
            </div>
          </div>
        </div>

        {/* 2. Top Search Panel (Preserves values & supports inline modification) */}
        <ExploreSearchPanel
          onSearch={fetchAvailableCars}
          isMobileFilterOpen={isMobileFilterOpen}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
        />

        {/* 3. Main Body: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar Filter (Desktop) & Drawer (Mobile) */}
          <VehicleFilterSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetFilters}
            onApply={() => {
              setIsMobileFilterOpen(false);
              fetchAvailableCars();
            }}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Listings Column */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Sorting & Filter Summary Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Results count text */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900">
                  Showing {vehicles.length} of {totalCount} vehicles
                </span>
                {filters.category !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0755C9] text-[11px] font-black uppercase">
                    {filters.category}
                  </span>
                )}
                {filters.occasion && filters.occasion !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0755C9]/10 text-[#0755C9] border border-blue-200 text-xs font-black">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Occasion: <b>{filters.occasion.replace('-', ' ')}</b></span>
                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, occasion: 'all' }))}
                      className="p-0.5 hover:bg-blue-200 rounded-full text-blue-700 ml-0.5 cursor-pointer"
                      title="Clear occasion filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-400 whitespace-nowrap">Sort By:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="pl-3 pr-8 py-2 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0755C9]/20 focus:border-[#0755C9] outline-none cursor-pointer appearance-none"
                  >
                    <option value="recommended">Recommended (Top Rated)</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest Vehicles</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Active Filter Chips */}
            {(filters.category !== 'all' ||
              filters.transmission !== 'all' ||
              filters.fuelType !== 'all' ||
              filters.seats !== 'all' ||
              filters.features?.length > 0 ||
              filters.maxPrice < 30000) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>

                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0755C9] text-xs font-bold border border-blue-200">
                    Category: {filters.category}
                    <X
                      onClick={() => setFilters({ ...filters, category: 'all' })}
                      className="w-3 h-3 cursor-pointer hover:text-blue-800"
                    />
                  </span>
                )}

                {filters.transmission !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0755C9] text-xs font-bold border border-blue-200">
                    {filters.transmission}
                    <X
                      onClick={() => setFilters({ ...filters, transmission: 'all' })}
                      className="w-3 h-3 cursor-pointer hover:text-blue-800"
                    />
                  </span>
                )}

                {filters.fuelType !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0755C9] text-xs font-bold border border-blue-200">
                    Fuel: {filters.fuelType}
                    <X
                      onClick={() => setFilters({ ...filters, fuelType: 'all' })}
                      className="w-3 h-3 cursor-pointer hover:text-blue-800"
                    />
                  </span>
                )}

                {filters.seats !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0755C9] text-xs font-bold border border-blue-200">
                    {filters.seats} Seats
                    <X
                      onClick={() => setFilters({ ...filters, seats: 'all' })}
                      className="w-3 h-3 cursor-pointer hover:text-blue-800"
                    />
                  </span>
                )}

                {filters.features?.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0755C9] text-xs font-bold border border-blue-200"
                  >
                    {f}
                    <X
                      onClick={() =>
                        setFilters({
                          ...filters,
                          features: filters.features.filter((feat) => feat !== f),
                        })
                      }
                      className="w-3 h-3 cursor-pointer hover:text-blue-800"
                    />
                  </span>
                ))}

                {filters.maxPrice < 30000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0755C9] text-xs font-bold border border-blue-200">
                    Under NPR {filters.maxPrice.toLocaleString()}
                    <X
                      onClick={() => setFilters({ ...filters, maxPrice: 30000 })}
                      className="w-3 h-3 cursor-pointer hover:text-blue-800"
                    />
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-black text-rose-600 hover:underline ml-1 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={fetchAvailableCars}
                  className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold"
                >
                  Retry
                </button>
              </div>
            )}

            {/* 4. Vehicle Cards Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <VehicleSkeletonCard key={i} />
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              /* 5. Professional Empty State */
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-soft space-y-4 my-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0755C9] flex items-center justify-center mx-auto shadow-xs">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#10243A]">
                    No Vehicles Match Your Search
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                    We could not find any available vehicles matching your selected filters or dates. Try widening your price range, clearing some features, or checking different travel dates.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-xl bg-[#0755C9] hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20 inline-flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {vehicles.map((v) => (
                  <VehicleCard key={v._id} vehicle={v} onBookNow={handleBookNow} />
                ))}
              </div>
            )}

            {/* 6. Pagination & Results Navigation */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pNum = idx + 1;
                  const isActive = pNum === page;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => setPage(pNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                        isActive
                          ? 'bg-[#0755C9] text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Booking Process Modal */}
      {selectedVehicleForBooking && (
        <BookingProcessScreen
          vehicle={selectedVehicleForBooking}
          onClose={() => {
            setSelectedVehicleForBooking(null);
            fetchAvailableCars();
          }}
        />
      )}

      {/* Footer */}
      <CustomerFooter />

    </div>
  );
}
