import React, { useEffect } from 'react';
import HeroSection from '../components/customer/HeroSection';
import PopularVehiclesSection from '../components/customer/PopularVehiclesSection';
import OccasionsSection from '../components/customer/OccasionsSection';
import WhyChooseUsSection from '../components/customer/WhyChooseUsSection';
import ExploreNepalSection from '../components/customer/ExploreNepalSection';
import HowItWorksSection from '../components/customer/HowItWorksSection';
import SpecialOffersSection from '../components/customer/SpecialOffersSection';
import CustomerReviewsSection from '../components/customer/CustomerReviewsSection';
import NewsletterContactSection from '../components/customer/NewsletterContactSection';
import CustomerFooter from '../components/customer/CustomerFooter';

export default function HomeScreen() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col w-full selection:bg-[#0755C9] selection:text-white">
      {/* 1. Hero Section & Car Search Widget */}
      <HeroSection />

      {/* 2. Popular Vehicles Grid (Filtered from DB) */}
      <PopularVehiclesSection />

      {/* 3. A Car for Every Occasion */}
      <OccasionsSection />

      {/* 4. Why Choose Nepal Car Rental */}
      <WhyChooseUsSection />

      {/* 4. Explore Nepal Destinations */}
      <ExploreNepalSection />

      {/* 5. How It Works (4-Step Process) */}
      <HowItWorksSection />

      {/* 6. Special Promotional Offers */}
      <SpecialOffersSection />

      {/* 7. Verified Customer Reviews & Testimonials */}
      <CustomerReviewsSection />

      {/* 8. Newsletter Subscription & 24/7 Helpline */}
      <NewsletterContactSection />

      {/* 9. Comprehensive Directory Footer */}
      <CustomerFooter />
    </div>
  );
}
