import React, { useState } from 'react';
import {
  Mail,
  Send,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import api from '../../services/api';

export default function NewsletterContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const businessInfo = {
    phone: '+977 1-4428900',
    mobile: '+977 9841892011',
    whatsapp: '+977 9841892011',
    email: 'support@nepalcarrental.com.np',
    address: 'Ward No. 3, Lazimpat (Opposite Radisson), Kathmandu, Nepal',
    hours: '24 Hours Fleet Service & Dispatch',
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await api.post('/newsletter/subscribe', { name, email });
      setStatusMessage({
        type: 'success',
        text: res.data?.message || 'Thank you for subscribing! Check your inbox for exclusive Nepal travel perks.',
      });
      setName('');
      setEmail('');
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Subscription failed. Please check your network connection.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact & Help Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0755C9] text-xs font-black uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24/7 Road & Booking Helpline</span>
              </div>
              <h2 className="text-3xl font-black text-[#10243A] tracking-tight">
                Need Assistance With Your Rental?
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Our Kathmandu dispatch center is ready around the clock. Contact us for custom corporate bookings, airport transfers, or roadside assistance.
              </p>
            </div>

            {/* Business Contact Cards */}
            <div className="space-y-3.5 text-xs">
              {/* Phone & Hotline */}
              <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-[#0755C9] flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Hotline</span>
                    <a href={`tel:${businessInfo.phone}`} className="font-black text-slate-900 text-sm hover:text-[#0755C9]">
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Available
                </span>
              </div>

              {/* WhatsApp Support */}
              <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">WhatsApp & Viber Support</span>
                    <a
                      href={`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-slate-900 text-sm hover:text-emerald-600"
                    >
                      {businessInfo.whatsapp}
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Chat Now
                </span>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Inquiries</span>
                  <a href={`mailto:${businessInfo.email}`} className="font-bold text-slate-900 text-xs hover:text-[#0755C9]">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              {/* Physical Office Address */}
              <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Head Office & Central Garage</span>
                  <p className="font-bold text-slate-800 text-xs">
                    {businessInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Newsletter & Member Club Box */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-[#10243A] to-[#0755C9] text-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-blue-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-black uppercase tracking-wider border border-white/15">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Travel Club Newsletter</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Get Exclusive Nepal Travel Perks & Secret Rates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    Subscribe to receive early notifications on seasonal discounts, festival rental waivers, highway road condition updates, and recommended scenic drive itineraries.
                  </p>
                </div>

                {/* Status Message */}
                {statusMessage && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                        : 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                    }`}
                  >
                    {statusMessage.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubscribe} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#0755C9] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0755C9]" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#0755C9]" />
                        <span>Subscribe to Nepal Car Rental</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    We respect your privacy. Zero spam, unsubscribe at any time.
                  </p>
                </form>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
