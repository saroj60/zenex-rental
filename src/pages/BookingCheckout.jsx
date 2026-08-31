import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Lock, Calendar, Plus, Minus, CreditCard, Mail, Info } from 'lucide-react';
import TrustSafety from '../components/TrustSafety';
import { useAppData } from '../context/AppDataContext';
import { useBooking } from '../context/BookingContext';
import SEO from '../components/SEO';

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Nepal', 'India', 'China', 'Japan', 'Singapore', 
  'Netherlands', 'New Zealand', 'Switzerland', 'Spain', 'Italy', 'Other'
];

const BookingCheckout = () => {
  const [searchParams] = useSearchParams();
  const pkgId = searchParams.get('pkg') || '';
  const carId = searchParams.get('car') || '';
  
  const { vehicles, packages, treks, tourTrips } = useAppData();
  const { addBooking } = useBooking();
  const navigate = useNavigate();

  // Find the selected item (Trek, Tour Package, TourTrip, or Vehicle)
  let selectedItem = null;
  let defaultPrice = 1200;
  let durationText = 'N/A';

  const matchedTrek = treks ? treks.find(t => t.id === pkgId) : null;
  const matchedTourTrip = tourTrips ? tourTrips.find(t => t.id === pkgId || t.slug === pkgId) : null;
  const matchedTour = packages ? packages.find(p => p.id === pkgId) : null;
  const matchedVehicle = carId ? vehicles.find(v => v.id.toString() === carId) : null;

  if (matchedTrek) {
    selectedItem = {
      title: matchedTrek.title,
      img: matchedTrek.image,
      duration: matchedTrek.quickFacts?.duration || '15 Days',
      price: matchedTrek.price ? parseInt(matchedTrek.price.replace(/\D/g, ''), 10) : 1500,
      addOns: matchedTrek.addOns || null
    };
    durationText = selectedItem.duration;
    defaultPrice = selectedItem.price;
  } else if (matchedTourTrip) {
    selectedItem = {
      title: matchedTourTrip.title,
      img: matchedTourTrip.image,
      duration: matchedTourTrip.quickFacts?.duration || '7 Days',
      price: matchedTourTrip.price ? parseInt(matchedTourTrip.price.toString().replace(/\D/g, ''), 10) : 1200,
      addOns: matchedTourTrip.addOns || null
    };
    durationText = selectedItem.duration;
    defaultPrice = selectedItem.price;
  } else if (matchedTour) {
    selectedItem = {
      title: matchedTour.title,
      img: matchedTour.img,
      duration: matchedTour.title.match(/\d+/) ? `${matchedTour.title.match(/\d+/)[0]} Days` : '7 Days',
      price: matchedTour.price ? parseInt(matchedTour.price.replace(/\D/g, ''), 10) : 1000,
      addOns: matchedTour.addOns || null
    };
    durationText = selectedItem.duration;
    defaultPrice = selectedItem.price;
  } else if (matchedVehicle) {
    selectedItem = {
      title: matchedVehicle.name,
      img: matchedVehicle.img,
      duration: 'Per Day Rental',
      price: matchedVehicle.price ? parseInt(matchedVehicle.price.toString().replace(/\D/g, ''), 10) : 150,
      addOns: null
    };
    durationText = 'Daily Rental';
    defaultPrice = selectedItem.price;
  } else {
    // Fallback if none matches
    selectedItem = {
      title: 'Mera Peak Climbing and Amphu Lapcha Pass - 19 Days',
      img: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070',
      duration: '19 Days',
      price: 2680,
      addOns: null
    };
    durationText = '19 Days';
    defaultPrice = 2680;
  }

  // Form State
  const [tripDate, setTripDate] = useState(() => {
    const urlDate = searchParams.get('date');
    if (urlDate) return urlDate;
    
    const today = new Date();
    today.setDate(today.getDate() + 14); // default to 2 weeks from now
    return today.toISOString().split('T')[0];
  });
  
  const [travelersCount, setTravelersCount] = useState(() => {
    const urlTravelers = searchParams.get('travelers');
    return urlTravelers ? parseInt(urlTravelers, 10) : 2;
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Choose Your Country');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [extraRequirements, setExtraRequirements] = useState('');
  const [additionalTravelers, setAdditionalTravelers] = useState([]);

  // Sync additional traveler details fields with travelersCount
  useEffect(() => {
    const additionalCount = Math.max(0, travelersCount - 1);
    setAdditionalTravelers(prev => {
      const next = [...prev];
      if (next.length < additionalCount) {
        while (next.length < additionalCount) {
          next.push({ firstName: '', lastName: '', email: '', passportNumber: '' });
        }
      } else if (next.length > additionalCount) {
        next.splice(additionalCount);
      }
      return next;
    });
  }, [travelersCount]);

  // Step indicator
  const [step, setStep] = useState(1); // 1 = input, 2 = success
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Accordion state
  const [discountOpen, setDiscountOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState('pay-later'); // 'pay-later' or 'deposit'

  const [addonQuantities, setAddonQuantities] = useState({});

  const parsePriceFromTitle = (title) => {
    if (!title) return 0;
    const match = title.match(/USD\s*(\d+)/i) || title.match(/US\$\s*(\d+)/i) || title.match(/\$\s*(\d+)/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  const getUnifiedAddons = () => {
    let list = [];
    if (selectedItem?.addOns) {
      if (typeof selectedItem.addOns === 'object' && !Array.isArray(selectedItem.addOns) && selectedItem.addOns.options) {
        list = selectedItem.addOns.options.map((option) => {
          const price = parsePriceFromTitle(option.title);
          return {
            name: option.title,
            description: option.description || '',
            price: price,
            pricingType: 'Fixed',
            active: true
          };
        });
      } else if (Array.isArray(selectedItem.addOns)) {
        list = [...selectedItem.addOns];
      }
    }

    // Add default hotel upgrades if not booking a vehicle
    if (!carId && selectedItem) {
      list.push({
        name: "Upgrade to 4-star accommodation in Kathmandu USD 45 per 2 person for 3 nights twin sharing basis",
        description: "Upgrade your standard accommodation to a premium 4-star hotel in Kathmandu (twin sharing, 3 nights).",
        price: 45,
        pricingType: "Per 2 Persons",
        active: true
      });
      list.push({
        name: "Upgrade to 5-star standard accommodation in Kathmandu USD 210 per 2 person for 3 nights twin sharing basis",
        description: "Upgrade your standard accommodation to a luxury 5-star hotel in Kathmandu (twin sharing, 3 nights).",
        price: 210,
        pricingType: "Per 2 Persons",
        active: true
      });
    }

    return list;
  };

  const activeAddons = getUnifiedAddons().filter(addon => addon.active !== false);

  const getAddonPrice = (addon) => {
    if (addon.price !== undefined && addon.price !== null && addon.price !== '') {
      return parseFloat(addon.price) || 0;
    }
    return parsePriceFromTitle(addon.name || '');
  };

  // Reset addons when package changes
  useEffect(() => {
    setAddonQuantities({});
  }, [pkgId]);

  const handleAddonQuantityChange = (idx, delta) => {
    setAddonQuantities(prev => {
      const current = prev[idx] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [idx]: next };
    });
  };

  // Pricing calculations
  const perPersonPrice = defaultPrice;
  const packagePrice = perPersonPrice * travelersCount;
  
  // Dynamic Group Discount
  let groupDiscountPercent = 0;
  if (travelersCount >= 3 && travelersCount < 5) groupDiscountPercent = 5;
  else if (travelersCount >= 5 && travelersCount < 10) groupDiscountPercent = 10;
  else if (travelersCount >= 10) groupDiscountPercent = 15;

  const discountAmount = Math.round(packagePrice * (groupDiscountPercent / 100));

  const addonsPrice = activeAddons.reduce((sum, addon, idx) => {
    const qty = addonQuantities[idx] || 0;
    const price = getAddonPrice(addon);
    return sum + (price * qty);
  }, 0);

  const totalPrice = (packagePrice - discountAmount) + addonsPrice;

  // Pay Deposit / Pay Later rates
  const depositPercent = 20;
  const depositPayable = Math.round(totalPrice * (depositPercent / 100));
  
  const initialPaymentNow = paymentOption === 'deposit' ? depositPayable : 0;
  const duePayLater = paymentOption === 'deposit' ? (totalPrice - depositPayable) : totalPrice;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || country === 'Choose Your Country') {
      alert('Please fill out all required fields marked with *');
      return;
    }

    setLoading(true);

    const selectedAddonsList = activeAddons
      .map((addon, idx) => ({
        name: addon.name || addon.title,
        price: getAddonPrice(addon),
        quantity: addonQuantities[idx] || 0
      }))
      .filter(item => item.quantity > 0);

    const bookingDetails = {
      itemName: selectedItem.title,
      dates: { start: tripDate, end: tripDate },
      travelersCount,
      paymentOption,
      amount: `US$${totalPrice}`,
      customer: `${firstName} ${lastName}`,
      selectedAddons: selectedAddonsList,
      customerDetails: {
        firstName,
        lastName,
        email,
        country,
        phone,
        whatsapp,
        extraRequirements
      },
      additionalTravelers
    };

    try {
      const result = await addBooking(bookingDetails);
      setConfirmedBooking(result);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('Something went wrong during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate Email Prefill Mailto Link
  const getMailtoLink = () => {
    if (!confirmedBooking) return '#';
    const subject = encodeURIComponent(`Booking Order - ${confirmedBooking.id} (${selectedItem.title})`);
    
    let travelersBody = '';
    if (additionalTravelers.length > 0) {
      travelersBody = '\nAdditional Travelers:\n' + additionalTravelers.map((t, idx) => {
        let details = `- Traveler ${idx + 2}: ${t.firstName} ${t.lastName}`;
        if (t.email) details += ` (Email: ${t.email})`;
        if (t.passportNumber) details += ` (Passport: ${t.passportNumber})`;
        return details;
      }).join('\n') + '\n';
    }

    const body = encodeURIComponent(`Dear Zenex Travel,

Please find my booking order details below:

Booking ID: ${confirmedBooking.id}
Trip / Package: ${selectedItem.title}
Trip Date: ${tripDate}
Number of Travelers: ${travelersCount}
Duration: ${durationText}

Lead Traveler Details:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Country: ${country}
- Phone: ${phone}
- WhatsApp: ${whatsapp}
${extraRequirements ? `- Special Requirements: ${extraRequirements}\n` : ''}${travelersBody}
Payment Preference: ${paymentOption === 'deposit' ? 'Pay 20% Deposit Now' : 'Book Now, Pay Later (100% on Arrival)'}
Total Price: US$${totalPrice}
Initial Payment Due Now: US$${initialPaymentNow}
Remaining Due Later: US$${duePayLater}

Please confirm my reservation as soon as possible.

Warm regards,
${firstName} ${lastName}`);
    return `mailto:info@zenextravels.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#f3f7fa] min-h-screen pb-20 pt-28 md:pt-32">
      <SEO 
        title="Secure Trip Booking | Zenex Travel"
        description="Book your adventure holiday or car rental in Nepal securely with Zenex Travel. Pay online or book now and pay on arrival."
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {step === 1 ? (
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8 font-headline uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Booking
            </h1>

            <form onSubmit={handleBookingSubmit} className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Column Fields */}
              <div className="w-full lg:w-8/12 space-y-6">
                
                {/* Date and Travelers Section */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#1b8c00] rounded-full inline-block"></span>
                    Date and Travelers
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Trip Date Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Trip Date *</label>
                      <div className="relative rounded-xl border border-slate-300 overflow-hidden flex items-center bg-slate-50">
                        <input 
                          type="date" 
                          required
                          value={tripDate}
                          onChange={(e) => setTripDate(e.target.value)}
                          className="w-full bg-transparent border-none py-3.5 px-4 text-slate-800 focus:outline-none font-medium"
                        />
                        <div className="bg-blue-500 text-white p-3.5 flex items-center justify-center">
                          <Calendar size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Number of Travelers */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Travelers</label>
                      <div className="flex items-center justify-between rounded-xl border border-slate-300 py-2.5 px-4 bg-slate-50">
                        <span className="text-slate-600 font-medium">Number of Travelers</span>
                        <div className="flex items-center gap-4">
                          <button 
                            type="button"
                            onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-lg font-bold text-slate-800 w-6 text-center">{travelersCount}</span>
                          <button 
                            type="button"
                            onClick={() => setTravelersCount(travelersCount + 1)}
                            className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add-Ons and Extra Options Section */}
                {activeAddons && activeAddons.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-bold text-[#1b8c00] mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#1b8c00] rounded-full inline-block"></span>
                      Add-Ons and Extra Options
                    </h2>

                    <div className="divide-y divide-slate-100">
                      {activeAddons.map((addon, idx) => {
                        const addonPrice = getAddonPrice(addon);
                        const qty = addonQuantities[idx] || 0;
                        
                        return (
                          <div key={idx} className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 first:pt-0 last:pb-0">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <p className="text-sm font-semibold text-slate-800 leading-snug">
                                  {addon.name || addon.title}
                                </p>
                                {addon.description && (
                                  <button 
                                    type="button"
                                    title={addon.description}
                                    className="text-slate-400 hover:text-slate-600 shrink-0 mt-0.5"
                                  >
                                    <Info size={16} />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                              <span className="text-sm font-bold text-slate-600">
                                + US${addonPrice} <span className="text-xs font-normal text-slate-400">per {addon.pricingType === 'Per Person' ? 'person' : '2'}</span>
                              </span>

                              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg p-1">
                                <button 
                                  type="button"
                                  onClick={() => handleAddonQuantityChange(idx, -1)}
                                  className="w-7 h-7 rounded bg-white text-slate-600 flex items-center justify-center border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-sm font-bold text-slate-800 w-5 text-center">{qty}</span>
                                <button 
                                  type="button"
                                  onClick={() => handleAddonQuantityChange(idx, 1)}
                                  className="w-7 h-7 rounded bg-white text-slate-600 flex items-center justify-center border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Lead Traveler Details Section */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#1b8c00] rounded-full inline-block"></span>
                    Lead Traveler Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                      />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                      />
                    </div>

                    {/* Choose Country */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Choose Your Country *</label>
                      <select 
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium cursor-pointer"
                      >
                        <option disabled value="Choose Your Country">Choose Your Country</option>
                        {countries.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Country Code + Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Country Code + Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        placeholder="WhatsApp Number"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                      />
                    </div>

                    {/* Requirements */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Extra Requirements</label>
                      <textarea 
                        rows={5}
                        placeholder="Extra Requirements"
                        value={extraRequirements}
                        onChange={(e) => setExtraRequirements(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Travelers Section */}
                {additionalTravelers.map((traveler, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#1b8c00] rounded-full inline-block"></span>
                      Traveler {idx + 2} Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="First Name"
                          value={traveler.firstName}
                          onChange={(e) => {
                            const updated = [...additionalTravelers];
                            updated[idx].firstName = e.target.value;
                            setAdditionalTravelers(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Last Name"
                          value={traveler.lastName}
                          onChange={(e) => {
                            const updated = [...additionalTravelers];
                            updated[idx].lastName = e.target.value;
                            setAdditionalTravelers(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address (Optional)</label>
                        <input 
                          type="email" 
                          placeholder="Email Address"
                          value={traveler.email}
                          onChange={(e) => {
                            const updated = [...additionalTravelers];
                            updated[idx].email = e.target.value;
                            setAdditionalTravelers(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                        />
                      </div>

                      {/* Passport Number */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Passport Number (Optional)</label>
                        <input 
                          type="text" 
                          placeholder="Passport Number"
                          value={traveler.passportNumber}
                          onChange={(e) => {
                            const updated = [...additionalTravelers];
                            updated[idx].passportNumber = e.target.value;
                            setAdditionalTravelers(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e53a24] font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Secure Payment Options */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#1b8c00] rounded-full inline-block"></span>
                    Payment Information
                  </h2>
                  <div className="p-4 border border-emerald-100 bg-emerald-50/40 rounded-2xl flex items-start gap-4">
                    <CheckCircle2 className="text-[#1b8c00] shrink-0 mt-0.5" size={20} />
                    <div>
                      <span className="block font-bold text-slate-800 text-base">Book Now, Pay Later (100% on Arrival)</span>
                      <span className="block text-sm text-slate-600 mt-1">
                        Your spot is reserved instantly without any advance payment today. You will make the full payment when you arrive in Kathmandu before your trip starts.
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column Summary */}
              <div className="w-full lg:w-4/12 sticky top-32">
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
                  {/* Summary Title */}
                  <div className="bg-[#00a8e8] text-white p-5">
                    <h3 className="font-bold text-lg font-headline">Your Trip Details</h3>
                  </div>

                  <div className="p-6">
                    {/* Selected Trip Details Card */}
                    <div className="flex gap-4 pb-6 border-b border-slate-100">
                      <img 
                        src={selectedItem.img} 
                        alt={selectedItem.title} 
                        className="w-24 h-18 object-cover rounded-xl bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800 leading-snug line-clamp-2">{selectedItem.title}</h4>
                        <p className="text-xs font-semibold text-slate-500 mt-2.5">Duration: {durationText}</p>
                      </div>
                    </div>

                    {/* Group Discount Price Accordion */}
                    <div className="border border-emerald-100 bg-emerald-50/50 rounded-2xl p-4 mt-6">
                      <button 
                        type="button"
                        onClick={() => setDiscountOpen(!discountOpen)}
                        className="w-full flex items-center justify-between font-bold text-emerald-800 text-sm focus:outline-none"
                      >
                        <span>Group Discount Price</span>
                        <span className="text-lg">{discountOpen ? '−' : '+'}</span>
                      </button>
                      
                      {discountOpen && (
                        <div className="mt-3 text-xs text-emerald-700 leading-relaxed border-t border-emerald-100/50 pt-3">
                          <p className="mb-1 font-semibold">Group Savings Table:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>3–4 Travelers: 5% Discount</li>
                            <li>5–9 Travelers: 10% Discount</li>
                            <li>10+ Travelers: 15% Discount</li>
                          </ul>
                          {groupDiscountPercent > 0 && (
                            <p className="mt-2 font-bold text-[#1b8c00]">Applied: {groupDiscountPercent}% Off Group Discount!</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dates & Travelers Stats */}
                    <div className="space-y-3.5 py-6 border-b border-slate-100 text-sm font-semibold text-slate-600">
                      <div className="flex justify-between">
                        <span>Trip Date:</span>
                        <span className="text-slate-800">{tripDate || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of Traveler:</span>
                        <span className="text-slate-800">{travelersCount} traveler(s)</span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-4 py-6 border-b border-slate-100 text-sm font-bold text-slate-800">
                      <div className="flex justify-between font-medium text-slate-600">
                        <div>
                          <span className="block">Package Price</span>
                          <span className="block text-xs text-slate-400 mt-0.5">US${perPersonPrice} x {travelersCount} traveler(s)</span>
                        </div>
                        <span>US${packagePrice}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between font-medium text-[#1b8c00]">
                          <span>Group Discount ({groupDiscountPercent}%)</span>
                          <span>-US${discountAmount}</span>
                        </div>
                      )}

                      {addonsPrice > 0 && (
                        <div className="flex justify-between font-medium text-slate-600 border-t border-slate-100/50 pt-3">
                          <div>
                            <span className="block">Add-ons & Options</span>
                            <span className="block text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">
                              {activeAddons
                                .map((addon, idx) => {
                                  const qty = addonQuantities[idx] || 0;
                                  if (qty === 0) return null;
                                  return `${addon.name || addon.title} (x${qty})`;
                                })
                                .filter(Boolean)
                                .join(', ')}
                            </span>
                          </div>
                          <span className="shrink-0 font-bold">+US${addonsPrice}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-base border-t border-slate-100 pt-4 font-bold">
                        <span>Total Price</span>
                        <span>US${totalPrice}</span>
                      </div>

                      <div className="flex justify-between text-base border-t border-slate-100 pt-4 text-[#e53a24]">
                        <span>Payable on Arrival</span>
                        <span>US${totalPrice}</span>
                      </div>
                    </div>

                    {/* Notice Box */}
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold p-4 rounded-2xl mt-6 leading-relaxed">
                      You will make the full payment after arriving in Kathmandu before the trip starts.
                    </div>

                    {/* Security Notice */}
                    <p className="text-[11px] text-slate-400 text-center mt-6 leading-normal">
                      Your booking is securely processed. No payment card details are required today!
                    </p>


                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full mt-8 bg-gradient-to-r from-orange-500 to-[#e53a24] text-white py-4 px-6 rounded-2xl font-extrabold text-center hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wide disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Complete Booking'}
                    </button>

                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Page */
          <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-8 md:p-12 text-center mt-8">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <CheckCircle2 size={44} />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight font-headline" style={{ fontFamily: "'Playfair Display', serif" }}>
              Booking Confirmed!
            </h2>
            <p className="text-slate-500 font-bold text-lg mb-2">Order ID: {confirmedBooking?.id}</p>
            <p className="text-slate-500 font-medium max-w-lg mx-auto mb-8 leading-relaxed">
              Thank you, {firstName}. Your reservation is complete. A booking confirmation mail has been simulated and saved to the backend database.
            </p>

            <div className="bg-[#f0f9ff] border border-blue-100 rounded-2xl p-6 mb-8 text-left space-y-4 max-w-xl mx-auto">
              <h4 className="font-bold text-blue-900 text-base">Booking Summary</h4>
              <ul className="text-sm font-semibold text-blue-800 space-y-2">
                <li>• Package: {selectedItem.title}</li>
                <li>• Date: {tripDate}</li>
                <li>• Travelers: {travelersCount} persons</li>
                <li>• Price Total: US${totalPrice}</li>
                <li>• Paid Now: US${initialPaymentNow}</li>
                <li>• Remaining balance: US${duePayLater} (payable on arrival)</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {/* Mail Prefill Button */}
              <a 
                href={getMailtoLink()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto justify-center"
              >
                <Mail size={16} /> Send Order on Mail
              </a>

              <Link 
                to="/"
                className="px-6 py-3.5 rounded-2xl bg-slate-100 text-slate-700 font-extrabold text-sm hover:bg-slate-200 transition-colors w-full sm:w-auto inline-block text-center"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}

      </div>
      
      {/* Trust Safety Info */}
      <div className="mt-16">
        <TrustSafety />
      </div>
    </div>
  );
};

export default BookingCheckout;
