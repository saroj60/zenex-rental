import React from 'react';
import { 
  BookOpen, ShieldCheck, Sun, AlertTriangle, Bed, Briefcase, Check, Info, Backpack, Mountain, Car, Utensils
} from 'lucide-react';
import { formatMarkdownToHTML } from '../utils/detailFormatters';

export const defaultTrekEquipment = [
  {
    category: "Clothing & Layers",
    items: [
      "Moisture-wicking thermal base layers (top & bottom)",
      "Fleece jacket & down jacket (-10°C rated)",
      "Waterproof & windproof hard shell jacket & pants",
      "Comfortable trekking pants (2 pairs)",
      "Warm beanie, sun hat, buff & insulated gloves"
    ]
  },
  {
    category: "Footwear",
    items: [
      "Sturdy, broken-in waterproof trekking boots",
      "Camp shoes or light sandals",
      "Merino wool trekking socks (4-5 pairs)"
    ]
  },
  {
    category: "Gear & Accessories",
    items: [
      "Daypack (25-35L) with rain cover",
      "Four-season sleeping bag rated to -10°C or lower",
      "Trekking poles (pair)",
      "Headlamp with spare batteries",
      "Insulated water bottle & water purification tablets"
    ]
  },
  {
    category: "Personal & Medical",
    items: [
      "Personal first aid kit with altitude medication (Diamox)",
      "Sunscreen SPF 50+ & lip balm",
      "Quick-dry microfiber towel & biodegradable wet wipes"
    ]
  }
];

export const defaultTourEquipment = [
  {
    category: "Clothing & Layers",
    items: [
      "Comfortable walking t-shirts and breathable tops",
      "Light fleece jacket or sweater for cool evenings",
      "Casual travel pants, shorts, or jeans",
      "Wide-brim sun hat & UV-blocking sunglasses",
      "Light rain jacket or compact umbrella"
    ]
  },
  {
    category: "Footwear",
    items: [
      "Comfortable walking sneakers / light trail shoes",
      "Casual slip-on shoes or sandals for hotel & dining"
    ]
  },
  {
    category: "Travel Essentials & Electronics",
    items: [
      "Daypack (20-30L) for city tours & daily excursions",
      "Power bank (10,000mAh+) & universal travel adapter",
      "Camera or smartphone with extra storage",
      "Reusable insulated water bottle"
    ]
  },
  {
    category: "Personal & Medical",
    items: [
      "Personal toiletries, hand sanitizer & wet wipes",
      "Sunscreen SPF 30+ & moisturizing lip balm",
      "Basic first aid kit & personal prescription medications"
    ]
  }
];

const EssentialInfoSection = ({ item, isTrek = false }) => {
  if (!item) return null;

  const titleText = item.title || '';
  const isTrekPackage = isTrek || 
    item.category === 'Treks' || 
    item.category === 'Trek' || 
    item.type === 'Trek' || 
    titleText.toLowerCase().includes('trek');

  // Determine Custom Info
  const customInfo = (item.essentialInfo && Array.isArray(item.essentialInfo) && item.essentialInfo.length > 0)
    ? item.essentialInfo
    : ((item.generalInformation && Array.isArray(item.generalInformation) && item.generalInformation.length > 0)
        ? item.generalInformation
        : null);

  // Determine Equipment Categories
  let equipmentCategories = defaultTrekEquipment;
  if (item.equipment && Array.isArray(item.equipment) && item.equipment.length > 0) {
    equipmentCategories = item.equipment.map(cat => ({
      category: cat.category || cat.name || (typeof cat === 'string' ? cat : 'Equipment'),
      items: (cat.items || []).map(it => (typeof it === 'object' ? (it.name || it.title || String(it)) : String(it)))
    }));
  } else if (item.equipmentList && Array.isArray(item.equipmentList) && item.equipmentList.length > 0) {
    equipmentCategories = item.equipmentList.map(cat => ({
      category: typeof cat === 'string' ? cat : (cat.category || cat.name || 'Equipment'),
      items: (cat.items || []).map(it => (typeof it === 'object' ? (it.name || it.title || String(it)) : String(it)))
    }));
  } else if (!isTrekPackage) {
    equipmentCategories = defaultTourEquipment;
  }

  return (
    <div className="space-y-10 md:space-y-12">
      {/* 1. ESSENTIAL INFORMATION SECTION */}
      <div id="info" className="scroll-mt-32 pt-2">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-[#e53a24] shrink-0" size={28} />
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
            Essential Information
          </h2>
        </div>

        {/* 4-Card Color Grid matching user design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Permits & Regulations */}
          <div className="bg-[#fffbeb] border border-amber-200/80 rounded-2xl p-6 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheck className="text-amber-700 shrink-0" size={22} />
              <h3 className="font-bold text-amber-950 text-base md:text-lg">
                {isTrekPackage ? 'Trekking Permits & Entry Fees' : 'Travel Permits & Sightseeing Fees'}
              </h3>
            </div>
            <p className="text-amber-900/90 text-sm leading-relaxed text-justify">
              {isTrekPackage ? (
                <>
                  All trekkers in Nepal require TIMS (Trekkers' Information Management System) cards along with localized region entry permits (such as Sagarmatha National Park Permit, Khumbu Pasang Lhamu Rural Permit, or Annapurna Conservation Area Permit). All permits are fully arranged by Zenex Travels & Tours prior to your trek.
                </>
              ) : (
                <>
                  All necessary monument entrance permits, UNESCO World Heritage site entry tickets, national park permits, and local municipality fees listed in the itinerary are fully covered and organized by Zenex Travels & Tours.
                </>
              )}
            </p>
          </div>

          {/* Card 2: Best Seasons & Weather Guide */}
          <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-6 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <Sun className="text-emerald-700 shrink-0" size={22} />
              <h3 className="font-bold text-emerald-950 text-base md:text-lg">
                Best Seasons & Weather Guide
              </h3>
            </div>
            <p className="text-emerald-900/90 text-sm leading-relaxed text-justify">
              <strong>Spring (March – May)</strong> and <strong>Autumn (September – November)</strong> offer optimal travel conditions with crystal-clear mountain sunrises, mild daytime temperatures, blooming wild rhododendrons, and dry stable trails across Nepal.
            </p>
          </div>

          {/* Card 3: Altitude Sickness & Health / Safety */}
          <div className="bg-[#fff1f2] border border-red-200/80 rounded-2xl p-6 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <AlertTriangle className="text-red-700 shrink-0" size={22} />
              <h3 className="font-bold text-red-950 text-base md:text-lg">
                {isTrekPackage ? 'Altitude Sickness & Health Safety' : 'Health & Travel Safety'}
              </h3>
            </div>
            <p className="text-red-900/90 text-sm leading-relaxed text-justify">
              {isTrekPackage ? (
                <>
                  Acclimatization days are built into high-altitude itineraries. Drink 3–4 liters of safe water daily, walk at a steady rhythm, and avoid alcohol above 3,000m. Emergency helicopter rescue travel insurance covering up to 5,500m is mandatory for high-altitude Himalayan treks.
                </>
              ) : (
                <>
                  Our tours prioritize high safety standards with private air-conditioned vehicles, experienced licensed guides, verified hygienic dining spots, and 24/7 WhatsApp emergency desk assistance throughout your stay.
                </>
              )}
            </p>
          </div>

          {/* Card 4: Accommodation & Meals */}
          <div className="bg-[#eff6ff] border border-indigo-200/80 rounded-2xl p-6 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <Bed className="text-indigo-700 shrink-0" size={22} />
              <h3 className="font-bold text-indigo-950 text-base md:text-lg">
                {isTrekPackage ? 'Accommodation & Teahouse Meals' : 'Accommodation & Dining'}
              </h3>
            </div>
            <p className="text-indigo-900/90 text-sm leading-relaxed text-justify">
              {isTrekPackage ? (
                <>
                  Teahouses provide comfortable twin-share rooms with foam mattresses and blankets. Communal dining halls are wood/stove-heated. Meals include freshly cooked Dal Bhat (lentils, rice & curry), noodle soups, momos, porridge, eggs, and hot tea/coffee.
                </>
              ) : (
                <>
                  Stay in handpicked 3-5 star luxury or comfortable boutique hotels with modern amenities and daily buffet breakfast included. High-end resort options with mountain views are provided at major destinations.
                </>
              )}
            </p>
          </div>

        </div>

        {/* Render Custom Essential Info array if present on package */}
        {customInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {customInfo.map((info, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2.5">
                  {typeof info === 'object' ? (info.title || `Essential Info ${idx + 1}`) : `Essential Info ${idx + 1}`}
                </h3>
                <div 
                  className="prose text-slate-700 leading-relaxed text-sm max-w-none text-justify"
                  dangerouslySetInnerHTML={{ __html: formatMarkdownToHTML(typeof info === 'string' ? info : (info.content || info.description || info.details || '')) }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. PACKING & EQUIPMENT LIST SECTION */}
      <div id="equipment" className="scroll-mt-32 pt-2">
        <div className="bg-[#f0f7ff] border border-blue-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-blue-700 shrink-0" size={26} />
            <h3 className="text-xl md:text-2xl font-extrabold text-blue-950 font-serif">
              Equipment List
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {equipmentCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-2.5">
                <h4 className="font-bold text-blue-950 text-base md:text-lg">
                  {cat.category}
                </h4>
                {cat.items && Array.isArray(cat.items) && cat.items.length > 0 && (
                  <ul className="space-y-2 pl-1">
                    {cat.items.map((itemStr, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                        <span>{itemStr}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssentialInfoSection;
