import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Header from './components/layout/Header';
import BottomNavigation from './components/layout/BottomNavigation';

// Screens
import DesignShowcaseScreen from './pages/DesignShowcaseScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import HomeScreen from './pages/HomeScreen';
import AvailableCarsScreen from './pages/AvailableCarsScreen';
import VehicleDetailsScreen from './pages/VehicleDetailsScreen';
import BookingConfirmationScreen from './pages/BookingConfirmationScreen';
import CustomerProfileScreen from './pages/CustomerProfileScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import CheckoutScreen from './pages/CheckoutScreen';
import AdminDashboard from './pages/AdminDashboard';
import {
  AboutUsPage,
  HowItWorksPage,
  ContactPage,
  FaqPage,
  TermsPage,
  PrivacyPage,
  CancellationPolicyPage
} from './pages/PublicInfoPages';

function AppContent() {
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isShowcase = location.pathname === '/showcase';
  const isWelcomeRoute = location.pathname === '/welcome';
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const isCheckoutRoute = location.pathname.startsWith('/checkout');
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;
  const showBottomNav = !isAdminRoute && !isShowcase && !isWelcomeRoute && !isAuthRoute && !isCheckoutRoute;

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#F5F8FC]">
        <AdminDashboard />
      </div>
    );
  }

  if (isShowcase) {
    return (
      <div className="min-h-screen bg-[#F5F8FC]">
        <Header isMobileView={isMobileView} setIsMobileView={setIsMobileView} />
        <DesignShowcaseScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      <Header isMobileView={isMobileView} setIsMobileView={isInsideIframe ? null : setIsMobileView} />

      {isMobileView && !isInsideIframe ? (
        // Mobile Simulator Frame Mode
        <div className="flex-1 flex items-center justify-center py-6 px-4 bg-slate-900/10">
          <div className="relative w-full max-w-[390px] h-[820px] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-12 ring-slate-800/80 flex flex-col">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2"></div>
              <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* Inner Mobile Screen Container */}
            <div className="relative flex-1 bg-[#F5F8FC] rounded-[40px] overflow-hidden flex flex-col">
              {/* Status Bar */}
              <div className="h-10 pt-2 px-6 flex items-center justify-between text-xs font-bold text-slate-800 select-none z-30 bg-[#10243A] text-white">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-white rounded-xs p-0.5 flex items-center">
                    <div className="h-full w-full bg-white rounded-2xs"></div>
                  </div>
                </div>
              </div>

              {/* Real Mobile Viewport Iframe */}
              <iframe
                key={location.pathname}
                src={location.pathname}
                className="w-full flex-1 border-0 bg-[#F5F8FC]"
                title="Nepal Car Rental Mobile View"
              />
            </div>
          </div>
        </div>
      ) : (
        // Full Desktop View
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/cars" element={<AvailableCarsScreen />} />
              <Route path="/explore-cars" element={<AvailableCarsScreen />} />
              <Route path="/cars/:id" element={<VehicleDetailsScreen />} />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/checkout/:id" element={<CheckoutScreen />} />
              <Route path="/booking-confirmation/:id" element={<BookingConfirmationScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<CustomerProfileScreen />} />
              <Route path="/bookings" element={<CustomerProfileScreen />} />
              <Route path="/dashboard" element={<CustomerProfileScreen />} />
              <Route path="/customer" element={<CustomerProfileScreen />} />
              <Route path="/customer/dashboard" element={<CustomerProfileScreen />} />
              <Route path="/favorites" element={<CustomerProfileScreen />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
              <Route path="/refund-policy" element={<CancellationPolicyPage />} />
            </Routes>
          </div>

          {showBottomNav && (
            <div className="md:hidden sticky bottom-0 z-40">
              <BottomNavigation />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <AppContent />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}
