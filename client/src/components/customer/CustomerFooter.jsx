import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import NepalLogo from '../common/NepalLogo';

export default function CustomerFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#10243A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <NepalLogo size="md" />
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
              Nepal Car Rental is the premier vehicle rental service provider in Nepal. We offer insured self-drive cars, licensed chauffeurs, airport shuttles, and custom overland travel solutions for Kathmandu, Pokhara, Chitwan, and beyond.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2 font-mono">
              <p>Company Reg: <b className="text-slate-300">NCR-2018-99214</b></p>
              <p>Nepal Govt PAN / VAT: <b className="text-slate-300">609821445</b></p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-[#0755C9] text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/9779841892011"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  Our Vehicles Fleet
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#0755C9] font-bold hover:underline">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  Self Drive Car Hire
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  Car Rental With Chauffeur
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  Kathmandu Airport Pickup (KTM)
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  Pokhara & Outstation Road Trips
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  Long-Term Corporate Fleet Rental
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  4x4 Off-Road Mustang Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Policies Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Support & Legal</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions (FAQs)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Booking Policy & Rules
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-white transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  24/7 Roadside Assistance
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {currentYear} Nepal Car Rental Services Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3">
            <span className="text-[11px] font-bold text-slate-400">Payment Partners:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold font-mono text-[10px]">
              eSewa
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-400 font-bold font-mono text-[10px]">
              Khalti
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-rose-400 font-bold font-mono text-[10px]">
              Fonepay
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
              Counter Cash
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

function FacebookIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}
