import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, Globe, MessageSquare, CheckCircle2, Send, PhoneCall, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustReviewBadges from '../components/TrustReviewBadges';
import { useAppData } from '../context/AppDataContext';
import { useBooking } from '../context/BookingContext';

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 
  'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 
  'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 
  'Macau', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 
  'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 
  'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 
  'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 
  'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 
  'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 
  'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 
  'Yemen', 'Zambia', 'Zimbabwe', 'Other'
];

const countryCallingCodes = {
  'afghanistan': '+93',
  'albania': '+355',
  'algeria': '+213',
  'american samoa': '+1684',
  'andorra': '+376',
  'angola': '+244',
  'anguilla': '+1264',
  'antarctica': '+672',
  'antigua and barbuda': '+1268',
  'antigua': '+1268',
  'barbuda': '+1268',
  'argentina': '+54',
  'armenia': '+374',
  'aruba': '+297',
  'australia': '+61',
  'austria': '+43',
  'azerbaijan': '+994',
  'bahamas': '+1242',
  'bahrain': '+973',
  'bangladesh': '+880',
  'barbados': '+1246',
  'belarus': '+375',
  'belgium': '+32',
  'belize': '+501',
  'benin': '+229',
  'bermuda': '+1441',
  'bhutan': '+975',
  'bolivia': '+591',
  'bosnia and herzegovina': '+387',
  'bosnia': '+387',
  'herzegovina': '+387',
  'botswana': '+267',
  'brazil': '+55',
  'british virgin islands': '+1284',
  'brunei': '+673',
  'bulgaria': '+359',
  'burkina faso': '+226',
  'burundi': '+257',
  'cambodia': '+855',
  'cameroon': '+237',
  'canada': '+1',
  'cape verde': '+238',
  'cayman islands': '+1345',
  'central african republic': '+236',
  'chad': '+235',
  'chile': '+56',
  'china': '+86',
  'colombia': '+57',
  'comoros': '+269',
  'congo': '+242',
  'cook islands': '+682',
  'costa rica': '+506',
  'croatia': '+385',
  'cuba': '+53',
  'curacao': '+599',
  'cyprus': '+357',
  'czech republic': '+420',
  'czechia': '+420',
  'democratic republic of the congo': '+243',
  'drc': '+243',
  'denmark': '+45',
  'djibouti': '+253',
  'dominica': '+1767',
  'dominican republic': '+1809',
  'ecuador': '+593',
  'egypt': '+20',
  'el salvador': '+503',
  'equatorial guinea': '+240',
  'eritrea': '+291',
  'estonia': '+372',
  'eswatini': '+268',
  'swaziland': '+268',
  'ethiopia': '+251',
  'falkland islands': '+500',
  'faroe islands': '+298',
  'fiji': '+679',
  'finland': '+358',
  'france': '+33',
  'french guiana': '+594',
  'french polynesia': '+689',
  'gabon': '+241',
  'gambia': '+220',
  'georgia': '+995',
  'germany': '+49',
  'ghana': '+233',
  'gibraltar': '+350',
  'greece': '+30',
  'greenland': '+299',
  'grenada': '+1473',
  'guadeloupe': '+590',
  'guam': '+1671',
  'guatemala': '+502',
  'guernsey': '+44',
  'guinea': '+224',
  'guinea-bissau': '+245',
  'guyana': '+592',
  'haiti': '+509',
  'honduras': '+504',
  'hong kong': '+852',
  'hungary': '+36',
  'iceland': '+354',
  'india': '+91',
  'indonesia': '+62',
  'iran': '+98',
  'iraq': '+964',
  'ireland': '+353',
  'isle of man': '+44',
  'israel': '+972',
  'italy': '+39',
  'ivory coast': '+225',
  'cote d\'ivoire': '+225',
  'jamaica': '+1876',
  'japan': '+81',
  'jersey': '+44',
  'jordan': '+962',
  'kazakhstan': '+7',
  'kenya': '+254',
  'kiribati': '+686',
  'kosovo': '+383',
  'kuwait': '+965',
  'kyrgyzstan': '+996',
  'laos': '+856',
  'latvia': '+371',
  'lebanon': '+961',
  'lesotho': '+266',
  'liberia': '+231',
  'libya': '+218',
  'liechtenstein': '+423',
  'lithuania': '+370',
  'luxembourg': '+352',
  'macau': '+853',
  'madagascar': '+261',
  'malawi': '+265',
  'malaysia': '+60',
  'maldives': '+960',
  'mali': '+223',
  'malta': '+356',
  'marshall islands': '+692',
  'martinique': '+596',
  'mauritania': '+222',
  'mauritius': '+230',
  'mayotte': '+262',
  'mexico': '+52',
  'micronesia': '+691',
  'moldova': '+373',
  'monaco': '+377',
  'mongolia': '+976',
  'montenegro': '+382',
  'montserrat': '+1664',
  'morocco': '+212',
  'mozambique': '+258',
  'myanmar': '+95',
  'burma': '+95',
  'namibia': '+264',
  'nauru': '+674',
  'nepal': '+977',
  'netherlands': '+31',
  'new caledonia': '+687',
  'new zealand': '+64',
  'nicaragua': '+505',
  'niger': '+227',
  'nigeria': '+234',
  'niue': '+683',
  'norfolk island': '+672',
  'north korea': '+850',
  'north macedonia': '+389',
  'macedonia': '+389',
  'northern mariana islands': '+1670',
  'norway': '+47',
  'oman': '+968',
  'pakistan': '+92',
  'palau': '+680',
  'palestine': '+970',
  'panama': '+507',
  'papua new guinea': '+675',
  'paraguay': '+595',
  'peru': '+51',
  'philippines': '+63',
  'poland': '+48',
  'portugal': '+351',
  'puerto rico': '+1787',
  'qatar': '+974',
  'reunion': '+262',
  'romania': '+40',
  'russia': '+7',
  'rwanda': '+250',
  'saint barthelemy': '+590',
  'saint helena': '+290',
  'saint kitts and nevis': '+1869',
  'saint lucia': '+1758',
  'saint martin': '+590',
  'saint pierre and miquelon': '+508',
  'saint vincent and the grenadines': '+1784',
  'samoa': '+685',
  'san marino': '+378',
  'sao tome and principe': '+239',
  'saudi arabia': '+966',
  'senegal': '+221',
  'serbia': '+381',
  'seychelles': '+248',
  'sierra leone': '+232',
  'singapore': '+65',
  'sint maarten': '+1721',
  'slovakia': '+421',
  'slovenia': '+386',
  'solomon islands': '+677',
  'somalia': '+252',
  'south africa': '+27',
  'south korea': '+82',
  'korea': '+82',
  'south sudan': '+211',
  'spain': '+34',
  'sri lanka': '+94',
  'sudan': '+249',
  'suriname': '+597',
  'svalbard and jan mayen': '+47',
  'sweden': '+46',
  'switzerland': '+41',
  'syria': '+963',
  'taiwan': '+886',
  'tajikistan': '+992',
  'tanzania': '+255',
  'thailand': '+66',
  'timor-leste': '+670',
  'east timor': '+670',
  'togo': '+228',
  'tokelau': '+690',
  'tonga': '+676',
  'trinidad and tobago': '+1868',
  'trinidad': '+1868',
  'tobago': '+1868',
  'tunisia': '+216',
  'turkey': '+90',
  'turkmenistan': '+993',
  'turks and caicos islands': '+1649',
  'tuvalu': '+688',
  'uganda': '+256',
  'ukraine': '+380',
  'united arab emirates': '+971',
  'uae': '+971',
  'dubai': '+971',
  'united kingdom': '+44',
  'uk': '+44',
  'england': '+44',
  'scotland': '+44',
  'wales': '+44',
  'northern ireland': '+44',
  'great britain': '+44',
  'united states': '+1',
  'usa': '+1',
  'us': '+1',
  'united states of america': '+1',
  'united states virgin islands': '+1340',
  'uruguay': '+598',
  'uzbekistan': '+998',
  'vanuatu': '+678',
  'vatican city': '+379',
  'vatican': '+379',
  'venezuela': '+58',
  'vietnam': '+84',
  'wallis and futuna': '+681',
  'western sahara': '+212',
  'yemen': '+967',
  'zambia': '+260',
  'zimbabwe': '+263'
};

const TripPlanner = () => {
  const { treks = [], packages = [], tourTrips = [] } = useAppData();
  const { addBooking } = useBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [selectedTrip, setSelectedTrip] = useState('');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    return today.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [groupSize, setGroupSize] = useState('');
  
  // Personal Info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  
  // Additional Info & Terms
  const [moreInfo, setMoreInfo] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Status & Confirmation state
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleCountryChange = (typedCountry) => {
    setCountry(typedCountry);
    const key = typedCountry.trim().toLowerCase();
    if (!key) return;

    let matchedCode = countryCallingCodes[key];
    if (!matchedCode) {
      const foundKey = Object.keys(countryCallingCodes).find(c => key === c || key.startsWith(c) || (c.length > 3 && key.includes(c)));
      if (foundKey) matchedCode = countryCallingCodes[foundKey];
    }

    if (matchedCode) {
      setPhone(prev => {
        if (!prev || prev.trim() === '' || prev.startsWith('+')) {
          const spaceIdx = prev.indexOf(' ');
          const existingDigits = spaceIdx !== -1 ? prev.slice(spaceIdx + 1) : '';
          return existingDigits ? `${matchedCode} ${existingDigits}` : `${matchedCode} `;
        }
        return `${matchedCode} ${prev}`;
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    if (!selectedTrip) {
      alert("Please select a trip.");
      return;
    }
    if (!groupSize) {
      alert("Please select a group size.");
      return;
    }

    setLoading(true);

    const bookingPayload = {
      itemName: `Customized Trip: ${selectedTrip}`,
      dates: { start: travelDate, end: travelDate },
      travelersCount: (Number(adults) || 1) + (Number(children) || 0),
      paymentOption: 'pay-later',
      amount: 'Custom Quote',
      customer: fullName,
      customerDetails: {
        firstName: fullName.split(' ')[0] || fullName,
        lastName: fullName.split(' ').slice(1).join(' ') || '',
        email,
        country,
        phone,
        extraRequirements: `Adults: ${adults}, Children (<10): ${children}, Group Size: ${groupSize}. More Info: ${moreInfo}`
      }
    };

    try {
      const result = await addBooking(bookingPayload);
      setConfirmedOrder(result);
    } catch (err) {
      console.error(err);
      alert('Something went wrong during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    if (!selectedTrip || !fullName || !phone) {
      alert("Please fill in your Trip, Full Name, and Phone Number before sending via WhatsApp.");
      return;
    }
    const message = `Hi Zenex Travel! I would like to customize a trip:

Trip Selected: ${selectedTrip}
Approx. Date of Travel: ${travelDate}
Adults: ${adults} | Children (<10): ${children}
Group Size: ${groupSize || 'Flexible'}

Personal Information:
- Full Name: ${fullName}
- Country: ${country}
- Phone: ${phone}
- Email: ${email}

More Information:
${moreInfo || 'N/A'}`;

    window.open(`https://wa.me/9779767476521?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Build combined list of trips for dropdown
  const allTripsList = [
    'Everest Base Camp Trek - 15 Days',
    'Annapurna Circuit Trek - 11 Days',
    'Manaslu Circuit Trek - 16 Days',
    'Mardi Himal Trek - 7 Days',
    'Poon Hill Trek & Kathmandu Pokhara Tour - 12 Days',
    'Chitwan Jungle Safari & Wildlife Tour - 4 Days',
    'Mustang Off-Road 4x4 Jeep Expedition',
    'Kathmandu Valley Cultural Heritage Tour',
    'Custom / Tailor-made Itinerary (Not Listed)'
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 pt-28 md:pt-32">
      <SEO 
        title="Customize Trip | Zenex Travel"
        description="Customize your trip to Nepal. Select your trip, travel date, group size, and personal details to request a custom itinerary and quote."
        canonicalUrl="https://zenextravel.com/planner"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Main Title & Subtitle */}
        <div className="text-center mb-10">
          <span className="text-xs font-black tracking-[0.2em] text-[#e53a24] uppercase block mb-2">
            TAILOR-MADE HIMALAYAN EXPERIENCE
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-headline mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Customize Trip
          </h1>
          <p className="text-slate-500 font-semibold text-sm">
            <span className="text-[#e53a24] font-bold">*</span> Denotes required field
          </p>
        </div>

        <TrustReviewBadges title="Customize Trip" />

        {confirmedOrder ? (
          /* Confirmation Success Card */
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-8 md:p-12 text-center my-8">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={44} />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-2 font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trip Request Received!
            </h2>
            <p className="text-[#e53a24] font-extrabold text-lg mb-4">Reference Booking ID: {confirmedOrder.id}</p>
            <p className="text-slate-600 font-medium max-w-lg mx-auto mb-8 leading-relaxed text-sm md:text-base">
              Thank you, <strong>{fullName}</strong>. Your custom trip request for <strong>{selectedTrip}</strong> has been received. Our travel specialist will prepare your custom itinerary and send it to <strong>{email}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button 
                onClick={handleWhatsAppSend}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-extrabold text-sm hover:bg-emerald-600 transition-colors shadow-md w-full sm:w-auto justify-center"
              >
                <PhoneCall size={16} /> Send via WhatsApp
              </button>

              <button 
                onClick={() => setConfirmedOrder(null)}
                className="px-6 py-3.5 rounded-2xl bg-slate-100 text-slate-700 font-extrabold text-sm hover:bg-slate-200 transition-colors w-full sm:w-auto text-center"
              >
                Submit Another Customization
              </button>
            </div>
          </div>
        ) : (
          /* Form Area */
          <form onSubmit={handleFormSubmit} className="space-y-8 mt-6">
            
            {/* Section 1: Trip Details */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4 font-headline">
                <span className="w-2 h-6 bg-[#e53a24] rounded-full inline-block"></span>
                Trip Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Select Trip */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Trip <span className="text-[#e53a24]">*</span>
                  </label>
                  <select 
                    required
                    value={selectedTrip}
                    onChange={(e) => setSelectedTrip(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  >
                    <option value="">---- Select Trip ----</option>
                    {allTripsList.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Approx. Date of Travel */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Approx. Date of Travel <span className="text-[#e53a24]">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                    />
                  </div>
                </div>

                {/* Number of Adults */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Number of Adults
                  </label>
                  <input 
                    type="number" 
                    min={1}
                    max={50}
                    placeholder="Number of Adults"
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  />
                </div>

                {/* Number of Children */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Number of Children <span className="text-slate-400 font-normal lowercase">(Age Below 10)</span>
                  </label>
                  <input 
                    type="number" 
                    min={0}
                    max={20}
                    placeholder="Number of Children"
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  />
                </div>

                {/* Group Size */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Group Size <span className="text-[#e53a24]">*</span>
                  </label>
                  <select 
                    required
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  >
                    <option value="">---- Select Group Size ----</option>
                    <option value="Solo Traveler (1 Person)">Solo Traveler (1 Person)</option>
                    <option value="Couple (2 Persons)">Couple (2 Persons)</option>
                    <option value="Small Group (3 - 5 Persons)">Small Group (3 - 5 Persons)</option>
                    <option value="Medium Group (6 - 10 Persons)">Medium Group (6 - 10 Persons)</option>
                    <option value="Large Group (10+ Persons)">Large Group (10+ Persons)</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Section 2: Personal Information */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4 font-headline">
                <span className="w-2 h-6 bg-[#1e3a8a] rounded-full inline-block"></span>
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name <span className="text-[#e53a24]">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address <span className="text-[#e53a24]">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  />
                </div>

                {/* Select Your Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Your Country <span className="text-[#e53a24]">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    list="country-suggestions-planner"
                    placeholder="---- Select Your Country ----"
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  />
                  <datalist id="country-suggestions-planner">
                    {countries.map(c => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                {/* Country Code + Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Country Code + Phone Number <span className="text-[#e53a24]">*</span>
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Country Code + Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: More Information */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4 font-headline">
                <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
                More Information
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  More Information
                </label>
                <textarea 
                  rows={5}
                  placeholder="Tell us more about your travel preferences, hotel category (3-star, 4-star, 5-star), specific places you wish to visit, or special requirements..."
                  value={moreInfo}
                  onChange={(e) => setMoreInfo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#e53a24]"
                />
              </div>
            </div>

            {/* Section 4: Terms Acceptance & Actions */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  id="terms-check"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-5 h-5 text-[#e53a24] rounded border-slate-300 focus:ring-[#e53a24] cursor-pointer"
                />
                <label htmlFor="terms-check" className="text-xs md:text-sm font-bold text-slate-700 cursor-pointer">
                  I accept <Link to="/terms-and-conditions" className="text-[#e53a24] underline hover:text-red-700">terms and conditions</Link> <span className="text-[#e53a24]">*</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#1e3a8a] hover:bg-blue-900 text-white font-extrabold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-blue-900/20 text-center uppercase tracking-wider text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={18} /> {loading ? 'Submitting...' : 'Submit Custom Trip Request'}
                </button>

                <button 
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="bg-[#25D366] hover:bg-emerald-600 text-white font-extrabold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 text-center uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                >
                  <PhoneCall size={18} /> Send via WhatsApp
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default TripPlanner;
