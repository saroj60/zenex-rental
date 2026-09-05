import React, { useState, useEffect } from 'react';
import { Compass, CheckSquare, Square, MapPin, Heart, Shield, BookOpen, UserCheck, PhoneCall, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustReviewBadges from '../components/TrustReviewBadges';

const TravelGuidePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('regions');

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState({
    boots: true,
    socks: true,
    jacket: true,
    sleepingBag: false,
    trekkingPoles: true,
    waterPurifier: false,
    sunscreen: true,
    powerBank: true,
    firstAid: false,
    cash: true,
    passportCopy: true,
    permits: true
  });

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const regionGuides = [
    {
      title: "Everest Region (Khumbu)",
      highlights: "Everest Base Camp (5,364m), Gokyo Lakes, Tengboche Monastery, Sherpa Culture",
      bestTime: "Mar-May & Sep-Nov",
      duration: "12-16 Days",
      image: "https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070",
      desc: "Home to the world's highest peak, the Everest region offers high-altitude mountain trails, iconic Sherpa villages, and ancient monasteries surrounded by giant snowcapped peaks."
    },
    {
      title: "Annapurna Region",
      highlights: "Annapurna Circuit, ABC Trek, Poon Hill Sunrise, Mardi Himal, Jhinu Hot Springs",
      bestTime: "Mar-May & Sep-Nov",
      duration: "5-14 Days",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1171",
      desc: "Nepal's most popular trekking area offering diverse ecosystems, lush rhododendron forests, terraced farmland, and panoramic views of Annapurna I, Machhapuchhre (Fishtail), and Dhaulagiri."
    },
    {
      title: "Langtang Valley",
      highlights: "Valley of Glaciers, Kyanjin Gompa, Tserko Ri Peak (5,000m), Tamang Heritage Trail",
      bestTime: "Mar-May & Sep-Nov",
      duration: "7-10 Days",
      image: "https://images.unsplash.com/photo-1620803511210-90baeb9d4db8?q=80&w=1170",
      desc: "The closest alpine trekking region north of Kathmandu, known for rich Tamang culture, yak pastures, dramatic river gorges, and stunning panoramic peak views."
    },
    {
      title: "Manaslu Circuit",
      highlights: "Larkya La Pass (5,106m), Tsum Valley, Pristine Tibetan Border Trails",
      bestTime: "Sep-Nov & Mar-May",
      duration: "14-16 Days",
      image: "https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070",
      desc: "An unspoiled off-the-beaten-path restricted trek circling Mount Manaslu (8,163m), combining Tibetan Buddhist heritage with dramatic mountain scenery."
    }
  ];

  const packingList = [
    { id: 'boots', category: 'Footwear', title: 'Sturdy Waterproof Trekking Boots' },
    { id: 'socks', category: 'Footwear', title: '3-4 Pairs Merino Wool Trekking Socks' },
    { id: 'jacket', category: 'Clothing', title: 'Down Jacket & Thermal Layers' },
    { id: 'sleepingBag', category: 'Gear', title: 'Four-Season Sleeping Bag (-10°C rated)' },
    { id: 'trekkingPoles', category: 'Gear', title: 'Adjustable Trekking Poles' },
    { id: 'waterPurifier', category: 'Health', title: 'Water Purification Tablets or UV Filter' },
    { id: 'sunscreen', category: 'Health', title: 'High SPF Sunscreen & Polarized Sunglasses' },
    { id: 'powerBank', category: 'Electronics', title: 'High Capacity Power Bank (20,000 mAh)' },
    { id: 'firstAid', category: 'Health', title: 'Personal First Aid Kit & Altitude Medication (Diamox)' },
    { id: 'cash', category: 'Logistics', title: 'Sufficient NPR Cash for Trail Expenses' },
    { id: 'passportCopy', category: 'Documents', title: 'Passport Copies & Passport Photos (4 copies)' },
    { id: 'permits', category: 'Documents', title: 'TIMS & Conservation Area Permits' }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 pt-28 md:pt-32">
      <SEO 
        title="Nepal Travel & Trekking Guide | Zenex Travel"
        description="Comprehensive Nepal travel guide: Popular trekking regions, interactive gear checklist, cultural etiquette, and transport options."
        canonicalUrl="https://zenextravel.com/travel-guide"
      />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="bg-gradient-to-r from-slate-900 via-[#1e3a8a] to-slate-900 rounded-[2rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e53a24] text-white text-xs font-extrabold uppercase tracking-widest mb-4">
              Explore & Prepare
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              Nepal Travel & Trekking Guide
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium mb-6">
              Plan your Himalayan adventure with region guides, interactive packing checklists, cultural etiquette tips, and expert recommendations.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link 
                to="/treks" 
                className="bg-[#e53a24] hover:bg-red-600 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
              >
                Browse Trek Packages <Compass size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <TrustReviewBadges title="Nepal Travel & Trekking Guide" />

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-3 py-4 mb-10 border-b border-slate-200 no-scrollbar">
          {[
            { id: 'regions', label: 'Trekking Regions Guide', icon: Compass },
            { id: 'packing', label: 'Interactive Packing List', icon: CheckSquare },
            { id: 'etiquette', label: 'Cultural Etiquette & Do\'s', icon: BookOpen }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-200 border ${
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

        {/* Tab 1: Region Guides */}
        {activeTab === 'regions' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regionGuides.map((region, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                  <div className="h-56 relative overflow-hidden">
                    <img src={region.image} alt={region.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <h3 className="absolute bottom-4 left-6 text-white font-extrabold text-xl">{region.title}</h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{region.desc}</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs font-semibold text-slate-700">
                      <div><strong className="text-[#1e3a8a]">Highlights:</strong> {region.highlights}</div>
                      <div className="flex justify-between pt-1">
                        <span><strong className="text-[#1e3a8a]">Best Time:</strong> {region.bestTime}</span>
                        <span><strong className="text-[#e53a24]">Duration:</strong> {region.duration}</span>
                      </div>
                    </div>
                    <Link to="/treks" className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-[#1e3a8a] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors">
                      View Region Treks
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Packing List */}
        {activeTab === 'packing' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">Trekking Gear & Packing Checklist</h2>
                <p className="text-slate-500 text-sm font-medium">Click items as you pack your duffel bag</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold shrink-0">
                Packed: {Object.values(checkedItems).filter(Boolean).length} / {packingList.length} Items
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packingList.map(item => {
                const isChecked = checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare size={20} className="text-emerald-600 shrink-0" />
                    ) : (
                      <Square size={20} className="text-slate-400 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">{item.category}</span>
                      <span className={`text-sm font-bold ${isChecked ? 'line-through opacity-80' : ''}`}>
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Etiquette */}
        {activeTab === 'etiquette' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Nepal Cultural Etiquette & Do's & Don'ts</h2>
              <p className="text-slate-500 text-sm font-medium">Respectful travel customs in temples, stupas, and mountain villages</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Do's */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 space-y-4">
                <h3 className="text-emerald-800 font-extrabold text-lg flex items-center gap-2">
                  <CheckSquare size={20} /> Do's (Recommended Customs)
                </h3>
                <ul className="space-y-3 text-xs md:text-sm text-emerald-950 font-semibold leading-relaxed">
                  <li>• Greet locals with hands pressed together saying <strong>"Namaste"</strong>.</li>
                  <li>• Remove shoes before entering Hindu temples, Buddhist gompas, or traditional homes.</li>
                  <li>• Walk clockwise around Buddhist stupas, chortens, and mani prayer walls.</li>
                  <li>• Dress modestly when visiting religious sites (cover shoulders and knees).</li>
                  <li>• Ask permission before photographing individuals, sadhus, or inside shrines.</li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 space-y-4">
                <h3 className="text-rose-800 font-extrabold text-lg flex items-center gap-2">
                  <Shield size={20} /> Don'ts (Things to Avoid)
                </h3>
                <ul className="space-y-3 text-xs md:text-sm text-rose-950 font-semibold leading-relaxed">
                  <li>• Do not touch sacred statues or point your feet toward elders or deities when sitting.</li>
                  <li>• Avoid public displays of affection (PDA) in rural mountain villages.</li>
                  <li>• Do not offer money or candy directly to begging children (donate to local schools instead).</li>
                  <li>• Do not buy or export illegal antiques, wildlife products, or sacred relics.</li>
                  <li>• Never trek solo without a registered guide in high-altitude restricted zones.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TravelGuidePage;
