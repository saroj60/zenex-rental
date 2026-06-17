import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a2f4c] w-full mt-auto py-16 border-t border-blue-900 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-16">
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">Zenex Travel</h2>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Elevating Himalayan Journeys with premium, reliable car rentals across Nepal.
            </p>
            <div className="flex flex-wrap gap-4 text-blue-300">
              <a href="https://www.facebook.com/p/Zenex-Car-Rental-61559152168312/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white cursor-pointer transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/p/DLCofUdzZ7g/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white cursor-pointer transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@zenex.car.rental" target="_blank" rel="noreferrer" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white cursor-pointer transition-colors">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
              <a href="https://wa.me/9779767476521" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <MessageCircle size={20} className="hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-[15px] mb-2">Company</h4>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/about">About Us</Link>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/vehicles">Our Fleet</Link>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/blogs">Blog</Link>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/contact">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-[15px] mb-2">Support</h4>
            <a className="text-blue-200 text-sm hover:text-white transition-colors w-fit" href="#">FAQ</a>
            <a className="text-blue-200 text-sm hover:text-white transition-colors w-fit" href="#">Travel Guides</a>
            <a className="text-blue-200 text-sm hover:text-white transition-colors w-fit" href="#">Terms & Conditions</a>
            <a className="text-blue-200 text-sm hover:text-white transition-colors w-fit" href="#">Privacy Policy</a>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-[15px] mb-2">Popular Routes</h4>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/route/kathmandu-to-pokhara">KTM to Pokhara</Link>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/route/jeep-hire-mustang">Mustang Jeep Hire</Link>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/route/kathmandu-to-chitwan">KTM to Chitwan</Link>
            <Link className="text-blue-200 text-sm hover:text-white transition-colors w-fit" to="/route/pokhara-to-lumbini">Pokhara to Lumbini</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-[15px] mb-2">Contact Details</h4>
            <p className="text-blue-200 text-sm">Q88J+R4G, Kathmandu 44600, Nepal</p>
            <p className="text-blue-200 text-sm">+977 976-7476521</p>
            <p className="text-blue-200 text-sm hover:text-white cursor-pointer transition-colors w-fit">info@zenextravel.com</p>
            <a href="https://wa.me/9779767476521?text=Hi!%20I%20need%20help%20booking%20a%20car." target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#1DA851] transition-colors w-max shadow-md hover:shadow-lg">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-center">
          <p className="text-blue-300 text-sm font-medium">
            © {new Date().getFullYear()} Zenex Travel and Car Rental.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
