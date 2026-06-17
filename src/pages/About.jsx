import React, { useEffect } from 'react';
import { ShieldCheck, Map, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/destinations/pokhara.png" 
            alt="Nepal Mountain Road" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a2f4c]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F4F6F8]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            Elevating <span className="text-[#EA580C]">Himalayan</span> Journeys
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 font-medium max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            We are Nepal's premier travel and vehicle rental partner, providing seamless flight ticketing, unforgettable tours, and premium transportation across the Himalayas.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-2">15+</h3>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm">Years Experience</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-2">50+</h3>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm">Premium Vehicles</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-2">10k</h3>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm">Happy Travelers</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-2">24/7</h3>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm">Local Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story / Who We Are */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-[#EA580C] rounded-3xl transform -translate-x-4 translate-y-4 z-0 opacity-20"></div>
            <img 
              src="/images/destinations/annapurna.png" 
              alt="Jeep in Nepal" 
              className="relative z-10 rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-SM font-bold text-[#EA580C] uppercase tracking-widest">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] leading-tight">
              Driven by a Passion for Nepal
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Zenex Travel was founded with a simple vision: to make navigating Nepal's beautiful but challenging landscapes safe, comfortable, and accessible. 
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We recognized that a standard rental service wouldn't cut it in the Himalayas. That's why we built a fleet of highly-maintained, specialized vehicles paired with expert local drivers who know every curve of the mountain roads.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium text-[#1e3a8a]">
              Whether you're traversing the rugged trails of Mustang or cruising the highways to Pokhara, we ensure your journey is as spectacular as the destination.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-24 border-y border-gray-200/60 mb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-SM font-bold text-[#EA580C] uppercase tracking-widest mb-2">Why Choose Us</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a]">Our Core Values</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F4F6F8] p-10 rounded-3xl text-center group hover:bg-[#0a2f4c] transition-colors duration-300">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="text-[#EA580C]" size={40} />
              </div>
              <h4 className="text-xl font-extrabold text-[#1e3a8a] mb-4 group-hover:text-white transition-colors">Uncompromising Safety</h4>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors">Every vehicle undergoes a rigorous 50-point inspection before every single trip. We never compromise on your safety.</p>
            </div>
            
            <div className="bg-[#F4F6F8] p-10 rounded-3xl text-center group hover:bg-[#0a2f4c] transition-colors duration-300">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Map className="text-[#EA580C]" size={40} />
              </div>
              <h4 className="text-xl font-extrabold text-[#1e3a8a] mb-4 group-hover:text-white transition-colors">Local Expertise</h4>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors">Our drivers aren't just chauffeurs; they are local guides who know the weather, the roads, and the hidden gems.</p>
            </div>
            
            <div className="bg-[#F4F6F8] p-10 rounded-3xl text-center group hover:bg-[#0a2f4c] transition-colors duration-300">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Star className="text-[#EA580C]" size={40} />
              </div>
              <h4 className="text-xl font-extrabold text-[#1e3a8a] mb-4 group-hover:text-white transition-colors">Premium Comfort</h4>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors">From luxury SUVs to rugged 4x4s, our fleet is the newest and most comfortable in Nepal.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Comprehensive Services */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-SM font-bold text-[#EA580C] uppercase tracking-widest mb-2">What We Offer</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a]">Our Comprehensive Services</h3>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Beyond car rentals, we provide a complete suite of travel solutions to ensure your journey is absolutely flawless.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1: Flights */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
            <div className="h-48 overflow-hidden relative">
              <img src="https://plus.unsplash.com/premium_photo-1661962354730-cda54fa4f9f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Flights" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-extrabold text-[#1e3a8a] mb-2">National & Int. Flights</h4>
              <p className="text-gray-600 text-sm">We offer seamless ticketing for domestic flights across Nepal and international flights globally at the best rates.</p>
            </div>
          </div>

          {/* Service 2: Tours */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
            <div className="h-48 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1606820854416-439b3305ff39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Tours and Travel" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-extrabold text-[#1e3a8a] mb-2">Custom Tour Packages</h4>
              <p className="text-gray-600 text-sm">Experience the beauty of the Himalayas with our meticulously crafted cultural, spiritual, and adventure tours.</p>
            </div>
          </div>

          {/* Service 3: Luxury Cars */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
            <div className="h-48 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Luxury Car Rental" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-extrabold text-[#1e3a8a] mb-2">Luxury Car Rental</h4>
              <p className="text-gray-600 text-sm">Travel in absolute comfort and prestige with our premium fleet of luxury SUVs and executive sedans.</p>
            </div>
          </div>

          {/* Service 4: Marriage Fleet */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
            <div className="h-48 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1571113908007-5d6aae13d73e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Marriage Car Fleet" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-extrabold text-[#1e3a8a] mb-2">Marriage Car Fleet</h4>
              <p className="text-gray-600 text-sm">Make your special day unforgettable with our beautifully decorated luxury cars and coordinated convoy vehicles.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="bg-white py-24 border-y border-gray-200/60 mb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-SM font-bold text-[#EA580C] uppercase tracking-widest mb-2">Our People</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a]">Meet The Experts</h3>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Our drivers and travel planners are the heart of Zenex Travel. They are trained professionals dedicated to your safety and comfort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F4F6F8] rounded-3xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" alt="Sanjok Rai" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-[#1e3a8a]">Sanjok Rai</h4>
                <p className="text-[#EA580C] font-bold text-sm mb-3">Head of Operations</p>
                <p className="text-gray-600 text-sm">With 15+ years in Nepal tourism, Sanjok ensures every fleet vehicle and tour operates flawlessly.</p>
              </div>
            </div>

            <div className="bg-[#F4F6F8] rounded-3xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Anjali Sharma" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-[#1e3a8a]">Anjali Sharma</h4>
                <p className="text-[#EA580C] font-bold text-sm mb-3">Travel Consultant</p>
                <p className="text-gray-600 text-sm">Anjali specializes in crafting bespoke itineraries for our international clients seeking unique experiences.</p>
              </div>
            </div>

            <div className="bg-[#F4F6F8] rounded-3xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" alt="Pemba Sherpa" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-[#1e3a8a]">Pemba Sherpa</h4>
                <p className="text-[#EA580C] font-bold text-sm mb-3">Lead Expedition Driver</p>
                <p className="text-gray-600 text-sm">Pemba is our chief 4x4 off-road specialist, safely navigating the treacherous Mustang and Manang routes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-[#0a2f4c] to-[#1e3a8a] rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[#EA580C]/10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Book your premium vehicle today and experience Nepal like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vehicles" className="bg-[#EA580C] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#d04b08] transition-colors shadow-lg flex items-center justify-center gap-2">
                Browse Our Fleet <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
