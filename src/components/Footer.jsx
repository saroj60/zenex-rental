import React from 'react';
import { MessageCircle, MapPin, Phone, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#071624] via-[#091f33] to-[#040e17] w-full mt-auto pt-20 pb-28 md:pb-12 border-t border-slate-800/80 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e53a24]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1e3a8a]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Subtle border top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e53a24]/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo & Intro Section */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/logo.jpg" 
                  alt="Zenex Travels and Tours Logo" 
                  className="h-14 w-14 rounded-2xl object-cover bg-white p-0.5 border border-slate-700/50 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#071624] rounded-full"></span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight leading-none uppercase">
                  Zenex
                </h2>
                <p className="text-xs font-bold text-[#e53a24] uppercase tracking-widest mt-1">
                  Travels & Tours
                </p>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Elevating Himalayan journeys with premium vehicle rentals, curated tour packages, and custom treks across Nepal's majestic landscapes.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://m.facebook.com/p/Zenex-Travels-Tours-61573825025073/?hr=1&wtsid=rdr_0HPxhfQZfT48LWKKY#" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:bg-[#e53a24] hover:text-white hover:border-[#e53a24] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/p/DLCofUdzZ7g/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:bg-[#e53a24] hover:text-white hover:border-[#e53a24] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a 
                href="https://www.tiktok.com/@zenex.car.rental" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:bg-[#e53a24] hover:text-white hover:border-[#e53a24] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a 
                href="https://wa.me/9779767476521" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={2.2} />
              </a>
            </div>
          </div>
          
          {/* Quick Links Sections */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Services Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase relative pb-2">
                Services
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#e53a24] rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/vehicles" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Our Fleet
                  </Link>
                </li>
                <li>
                  <Link to="/self-drive-car-rental-nepal" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Self-Drive Cars
                  </Link>
                </li>
                <li>
                  <Link to="/wedding-car-rental-kathmandu" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Wedding Rental
                  </Link>
                </li>
                <li>
                  <Link to="/airport-transfer-kathmandu" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Airport Transfer
                  </Link>
                </li>
                <li>
                  <Link to="/flight-ticketing-nepal" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Flight Tickets
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Useful Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase relative pb-2">
                Quick Links
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#e53a24] rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/about" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Blogs & Guides
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Popular Routes */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase relative pb-2">
                Popular Routes
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#e53a24] rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/route/kathmandu-to-pokhara" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> KTM to Pokhara
                  </Link>
                </li>
                <li>
                  <Link to="/route/jeep-hire-mustang" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Mustang Jeep Hire
                  </Link>
                </li>
                <li>
                  <Link to="/route/kathmandu-to-chitwan" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> KTM to Chitwan
                  </Link>
                </li>
                <li>
                  <Link to="/route/pokhara-to-lumbini" className="text-slate-300 hover:text-[#e53a24] text-[13.5px] transition-colors flex items-center gap-1 group">
                    <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" /> Pokhara to Lumbini
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Details & WhatsApp */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm tracking-wider uppercase relative pb-2">
                Contact Details
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#e53a24] rounded-full"></span>
              </h3>
              <ul className="space-y-3.5">
                <li className="flex gap-2 items-start">
                  <MapPin size={16} className="text-[#e53a24] shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-xs leading-relaxed">Samakhushi, Kathmandu 44600, Nepal</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Phone size={15} className="text-[#e53a24] shrink-0" />
                  <span className="text-slate-300 text-xs">+977 976-7476521</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Mail size={15} className="text-[#e53a24] shrink-0" />
                  <a href="mailto:info@zenextravel.com.np" className="text-slate-300 hover:text-white text-xs transition-colors">
                    info@zenextravel.com.np
                  </a>
                </li>
                <li className="pt-2">
                  <a 
                    href="https://wa.me/9779767476521?text=Hi!%20I%20need%20help%20booking%20a%20trip." 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25d366] to-[#14ab4c] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold hover:brightness-105 active:scale-95 transition-all w-full justify-center shadow-lg hover:shadow-[#25D366]/20 duration-200"
                  >
                    <MessageCircle size={16} strokeWidth={2.5} /> Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        
        {/* Associations / Accreditation Banner */}
        <div className="flex flex-col items-center justify-center gap-2 mb-8 mt-4">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Associations & Partners</p>
          <div className="bg-white/95 rounded-xl p-2 md:p-2.5 inline-flex justify-center items-center border border-slate-700/50 shadow-sm max-w-[280px] sm:max-w-xs md:max-w-sm">
            <img 
              src="https://www.nepalparatrek.com/wp-content/themes/inspiry-tourpress/img/associated-logo.png" 
              alt="Associations and Partners - TAAN, NTB, KEEP, NMA" 
              className="max-h-7 sm:max-h-8 object-contain"
            />
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Zenex Travels and Tours</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
