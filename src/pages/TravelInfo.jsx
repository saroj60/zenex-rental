import React, { useEffect, useState } from 'react';
import { ShieldCheck, CreditCard, Sun, Mountain, FileText, HeartPulse, CheckCircle2, ArrowRight, Info, AlertTriangle, PhoneCall, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustReviewBadges from '../components/TrustReviewBadges';

const TravelInfo = () => {
  const [activeTab, setActiveTab] = useState('visa');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visaInfo = [
    { duration: '15 Days Single/Multiple Entry', fee: 'US$ 30' },
    { duration: '30 Days Single/Multiple Entry', fee: 'US$ 50' },
    { duration: '90 Days Single/Multiple Entry', fee: 'US$ 125' }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 pt-28 md:pt-32">
      <SEO 
        title="Nepal Travel Information & Logistics Guide | Zenex Travel"
        description="Complete Nepal travel info guide: On-arrival visas, currency & ATMs, weather & seasons, altitude safety, permits, and travel insurance."
        canonicalUrl="https://zenextravel.com/travel-info"
      />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="bg-gradient-to-r from-slate-900 via-[#1e3a8a] to-slate-900 rounded-[2rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e53a24] text-white text-xs font-extrabold uppercase tracking-widest mb-4">
              Official Travel Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              Essential Nepal Travel Information
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium mb-6">
              Everything you need to know before visiting Nepal: On-arrival visas, money & ATMs, weather seasons, trek permits, health safety, and altitude guidance.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link 
                to="/planner" 
                className="bg-[#e53a24] hover:bg-red-600 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-red-500/25 flex items-center gap-2"
              >
                Customise Your Trip <ArrowRight size={16} />
              </Link>
              <a 
                href="https://wa.me/9779767476521?text=Hi!%20I%20have%20questions%20about%20Nepal%20travel%20requirements." 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all border border-white/20"
              >
                Ask Travel Specialist
              </a>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-12 translate-y-12">
            <Mountain size={380} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <TrustReviewBadges title="Essential Nepal Travel Information" />

        {/* Quick Category Navigation */}
        <div className="flex overflow-x-auto gap-3 py-4 mb-10 border-b border-slate-200 no-scrollbar">
          {[
            { id: 'visa', label: 'Visa & Entry', icon: FileText },
            { id: 'currency', label: 'Currency & Money', icon: CreditCard },
            { id: 'seasons', label: 'Weather & Seasons', icon: Sun },
            { id: 'permits', label: 'Permits & TIMS', icon: ShieldCheck },
            { id: 'health', label: 'Health & Altitude (AMS)', icon: HeartPulse },
            { id: 'insurance', label: 'Travel Insurance', icon: CheckCircle2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#1e3a8a] hover:text-[#1e3a8a]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="space-y-12">
          {/* Section 1: Visa & Entry */}
          {(activeTab === 'visa' || activeTab === 'all') && (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#e53a24] flex items-center justify-center font-bold">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Nepal Visa & Entry Requirements</h2>
                  <p className="text-slate-500 text-sm font-medium">Quick & hassle-free Tourist Visas on arrival</p>
                </div>
              </div>

              <div className="prose max-w-none text-slate-600 space-y-4 text-sm leading-relaxed">
                <p>
                  Most foreign travelers can conveniently obtain a Tourist Visa on Arrival at Tribhuvan International Airport (TIA) in Kathmandu or at land border checkpoints (e.g., Kakarbhitta, Birgunj, Belahiya, Jamunaha, Mohana, Gaddachauki, and Kodari/Rasuwagadhi).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                  {visaInfo.map((v, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                      <span className="text-xs font-extrabold text-[#e53a24] uppercase tracking-wider block mb-2">Duration</span>
                      <h4 className="font-extrabold text-lg text-slate-800 mb-2">{v.duration}</h4>
                      <span className="text-2xl font-extrabold text-[#1e3a8a]">{v.fee}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-3 text-blue-900 text-sm">
                  <h4 className="font-bold text-base flex items-center gap-2">
                    <Info size={18} className="text-blue-600" /> Passport & Application Rules:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-blue-800 font-medium">
                    <li>Your passport must have at least <strong>6 months validity</strong> from your arrival date.</li>
                    <li>At least 2 blank passport visa pages are required.</li>
                    <li>Indian nationals do not require a visa but must present a valid passport or Voter ID card.</li>
                    <li>We recommend pre-filling the Online Tourist Visa Application form (within 15 days of departure) on the official <a href="https://nepaliport.immigration.gov.np/" target="_blank" rel="noreferrer" className="underline font-bold text-blue-900">Nepal Department of Immigration portal</a> to skip airport kiosk queues.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Currency & Money */}
          {(activeTab === 'currency' || activeTab === 'all') && (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Currency, ATMs & Payments</h2>
                  <p className="text-slate-500 text-sm font-medium">Managing money in cities vs mountain trails</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 text-base text-[#1e3a8a]">Nepalese Rupee (NPR)</h3>
                  <p>
                    The local currency is the Nepalese Rupee (NPR). Major foreign currencies (USD, EUR, GBP, AUD, CAD) are easily exchanged at licensed money exchange counters in Kathmandu and Pokhara.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-700 font-medium">
                    <li><strong>ATMs:</strong> Widely available in Kathmandu, Pokhara, and major town centers (Nabil Bank, Himalayan Bank, Standard Chartered).</li>
                    <li><strong>ATM Limits:</strong> Usually NPR 35,000 (~US$ 260) per transaction with an international withdrawal fee of NPR 500.</li>
                  </ul>
                </div>

                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 text-base text-[#e53a24]">Trekking Trail Cash Advisory</h3>
                  <p>
                    ATMs do <strong>NOT</strong> exist in remote high-altitude trekking villages (e.g. Namche Bazaar has limited ATMs, while Annapurna Circuit teahouses take cash only).
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-700 font-medium">
                    <li>Always withdraw sufficient cash in Kathmandu/Pokhara for personal expenses during your trek (hot showers, WiFi, charging, snacks).</li>
                    <li>Credit cards (Visa/Mastercard) are accepted at city hotels and high-end restaurants with a 3.5% processing surcharge.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Seasons & Weather */}
          {(activeTab === 'seasons' || activeTab === 'all') && (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                  <Sun size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Best Seasons & Climate</h2>
                  <p className="text-slate-500 text-sm font-medium">When to trek, tour, and explore Nepal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border border-emerald-200 bg-emerald-50/50 p-6 rounded-2xl">
                  <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">Peak Season #1</span>
                  <h4 className="font-extrabold text-slate-800 text-lg mb-2">Autumn (Sep - Nov)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Crystal clear sky, excellent Himalayan views, moderate temperatures. Best season for high-pass trekking and cultural festivals (Dashain & Tihar).
                  </p>
                </div>

                <div className="border border-blue-200 bg-blue-50/50 p-6 rounded-2xl">
                  <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider block mb-1">Peak Season #2</span>
                  <h4 className="font-extrabold text-slate-800 text-lg mb-2">Spring (Mar - May)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Blooming rhododendrons covering mountain slopes, warm temperatures, clear mornings. Ideal for Everest Base Camp and Annapurna treks.
                  </p>
                </div>

                <div className="border border-sky-200 bg-sky-50/50 p-6 rounded-2xl">
                  <span className="text-xs font-extrabold text-sky-700 uppercase tracking-wider block mb-1">Low Season</span>
                  <h4 className="font-extrabold text-slate-800 text-lg mb-2">Winter (Dec - Feb)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Cold temperatures at night with heavy snow on high passes. Excellent clear skies for lower altitude treks (Poon Hill, Mardi Himal) and city tours.
                  </p>
                </div>

                <div className="border border-amber-200 bg-amber-50/50 p-6 rounded-2xl">
                  <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block mb-1">Monsoon Season</span>
                  <h4 className="font-extrabold text-slate-800 text-lg mb-2">Monsoon (Jun - Aug)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Rainy season with lush green vegetation. Perfect for rain-shadow treks like Upper Mustang and Dolpo, or city cultural tours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Permits */}
          {(activeTab === 'permits' || activeTab === 'all') && (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Trekking Permits & TIMS</h2>
                  <p className="text-slate-500 text-sm font-medium">Official park permits & registration guidelines</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  When booking your trek with <strong>Zenex Travels</strong>, all necessary TIMS cards and Conservation Area / National Park entry permits are arranged for you prior to departure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <h4 className="font-bold text-slate-800 text-base mb-2 text-[#1e3a8a]">TIMS Card</h4>
                    <p className="text-xs text-slate-600 font-medium">
                      Trekkers' Information Management System card required for tracking trekker safety across all regions.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <h4 className="font-bold text-slate-800 text-base mb-2 text-[#1e3a8a]">Conservation Permits</h4>
                    <p className="text-xs text-slate-600 font-medium">
                      ACAP (Annapurna), Sagarmatha National Park (Everest), MCAP (Manaslu), and Langtang permits.
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <h4 className="font-bold text-slate-800 text-base mb-2 text-[#e53a24]">Restricted Area Permits</h4>
                    <p className="text-xs text-slate-600 font-medium">
                      Upper Mustang, Manaslu Circuit, Tsum Valley, Nar Phu require special government permits and a mandatory licensed guide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Health & Altitude */}
          {(activeTab === 'health' || activeTab === 'all') && (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Health & Acute Mountain Sickness (AMS)</h2>
                  <p className="text-slate-500 text-sm font-medium">Staying safe above 2,500m (8,200ft)</p>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 mb-6 flex items-start gap-4">
                <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 space-y-1">
                  <h4 className="font-bold text-sm">Key Rule for Mountain Altitude:</h4>
                  <p className="font-medium">
                    Climb high, sleep low. Ascend slowly (maximum 300m–500m gain in sleeping altitude per day above 3,000m) and drink 3 to 4 liters of purified water daily.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-800 text-base text-[#1e3a8a]">Common AMS Symptoms</h4>
                  <ul className="list-disc pl-5 text-xs text-slate-700 font-medium space-y-1">
                    <li>Mild headache, dizziness, loss of appetite</li>
                    <li>Nausea, difficulty sleeping, unusual fatigue</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-800 text-base text-[#1e3a8a]">Prevention & Action</h4>
                  <ul className="list-disc pl-5 text-xs text-slate-700 font-medium space-y-1">
                    <li>Inform your Zenex mountain guide immediately if you feel unwell</li>
                    <li>If symptoms persist or worsen, <strong>descend immediately</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Insurance */}
          {(activeTab === 'insurance' || activeTab === 'all') && (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Travel & Emergency Evacuation Insurance</h2>
                  <p className="text-slate-500 text-sm font-medium">Essential coverage for peace of mind</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  Comprehensive Travel Insurance covering medical treatment and <strong>emergency helicopter evacuation up to 5,500 meters altitude</strong> is compulsory for all clients joining high-altitude treks.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
                  <h4 className="font-bold text-slate-800 text-base text-[#1e3a8a]">Recommended Insurance Providers:</h4>
                  <p className="text-xs text-slate-600 font-medium">
                    World Nomads, Allianz Global Assistance, Cover-More, or Global Rescue. Make sure your policy explicitly covers trekking up to the maximum elevation of your itinerary.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Assistance CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#1e3a8a] to-blue-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              Have Questions About Travel Logistics?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl font-medium">
              Our travel specialists in Kathmandu are available 24/7 to help you plan your itinerary, verify visa details, and arrange custom packages.
            </p>
          </div>
          <a 
            href="https://wa.me/9779767476521?text=Hi!%20I%20would%20like%20more%20information%20about%20traveling%20to%20Nepal." 
            target="_blank" 
            rel="noreferrer" 
            className="shrink-0 bg-[#25D366] hover:bg-emerald-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2"
          >
            <PhoneCall size={20} /> Chat With Travel Specialist
          </a>
        </div>

      </div>
    </div>
  );
};

export default TravelInfo;
