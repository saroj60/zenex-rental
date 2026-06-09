import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Lock, CreditCard } from 'lucide-react';
import TrustSafety from '../components/TrustSafety';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';
import { useNavigate } from 'react-router-dom';

const BookingCheckout = () => {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const driverMode = searchParams.get('driver') || 'self';
  const carId = searchParams.get('car');
  const { formatPrice } = useCurrency();
  const { vehicles, addBooking } = useAppData();
  const navigate = useNavigate();

  const vehicle = vehicles.find(v => v.id.toString() === carId) || vehicles[1]; // default to Fortuner if not found


  const driverOptions = {
    self: { label: 'Self Drive', price: 0 },
    driver: { label: 'Car with Driver', price: 3250 },
    luxury: { label: 'Luxury Chauffeur', price: 6500 }
  };

  const availableAddons = [
    { id: 'esim', title: 'Ncell 10GB Tourist eSIM', price: 1950, desc: 'Instant activation upon arrival. High-speed 4G data.' },
    { id: 'trekking', title: 'Trekking Gear Bundle', price: 1300, desc: 'Trekking poles, sleeping bag, and water purifiers (per day).' },
    { id: 'child_seat', title: 'Child Safety Seat', price: 650, desc: 'Suitable for toddlers 1-4 years (per day).' }
  ];

  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = (id) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const vehiclePrice = vehicle.price * 3; // 3 days
  const taxes = 3250;
  const driverPriceTotal = driverOptions[driverMode].price * 3;
  
  // Assuming eSIM is flat fee, others are per day (*3)
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const addon = availableAddons.find(a => a.id === id);
    return acc + (id === 'esim' ? addon.price : addon.price * 3);
  }, 0);

  const total = vehiclePrice + taxes + driverPriceTotal + addonsTotal;

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-8 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-headline-lg text-3xl font-bold text-himalayan-blue mb-8">Secure Checkout</h1>

        {/* Wizard Steps */}
        <div className="flex items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-sky-tint overflow-x-auto">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-sunset-orange' : 'text-on-surface-variant'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-sunset-orange text-white' : 'bg-surface-container'}`}>1</div>
            <span className="font-bold text-sm whitespace-nowrap">Extras & Options</span>
          </div>
          <div className="h-px w-8 sm:w-16 bg-outline-variant/50 mx-2"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-sunset-orange' : 'text-on-surface-variant'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-sunset-orange text-white' : 'bg-surface-container'}`}>2</div>
            <span className="font-bold text-sm whitespace-nowrap">Driver Details</span>
          </div>
          <div className="h-px w-8 sm:w-16 bg-outline-variant/50 mx-2"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-sunset-orange' : 'text-on-surface-variant'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-sunset-orange text-white' : 'bg-surface-container'}`}>3</div>
            <span className="font-bold text-sm whitespace-nowrap">Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Area */}
          <div className="lg:w-2/3">
            {step === 1 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint">
                <h2 className="font-headline-md text-xl mb-6">Add-ons & Extras</h2>
                <div className="space-y-4">
                  {availableAddons.map((addon) => (
                    <label key={addon.id} className="flex items-start gap-4 p-4 border border-outline-variant/50 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
                      <input 
                        type="checkbox" 
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-1 w-5 h-5 text-sunset-orange focus:ring-sunset-orange rounded" 
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-bold text-on-surface">{addon.title}</span>
                          <span className="font-bold text-sunset-orange">+{formatPrice(addon.price)}{addon.id !== 'esim' ? '/day' : ''}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant mt-1">{addon.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-8 w-full bg-himalayan-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                  Continue to Details <ChevronRight size={20} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint">
                <h2 className="font-headline-md text-xl mb-6">Primary Driver Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">First Name</label>
                    <input type="text" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Last Name</label>
                    <input type="text" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="Doe" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Email Address</label>
                    <input type="email" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Phone Number</label>
                    <input type="tel" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="+1 234 567 890" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">License Number</label>
                    <input type="text" className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="XYZ123456" />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 bg-surface-container text-himalayan-blue py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] bg-himalayan-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                    Continue to Payment <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint">
                <h2 className="font-headline-md text-xl mb-6 flex items-center gap-2"><Lock className="text-forest-green" /> Secure Payment</h2>
                
                <div className="bg-surface-container-low p-4 rounded-xl mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-sunset-orange focus:ring-sunset-orange" />
                    <CreditCard size={24} className="text-himalayan-blue" />
                    <span className="font-bold">Credit / Debit Card</span>
                  </label>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs text-on-surface-variant uppercase">Card Number</label>
                      <input type="text" className="w-full bg-white border border-outline-variant rounded-lg p-3 text-on-surface" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-on-surface-variant uppercase">Expiry (MM/YY)</label>
                      <input type="text" className="w-full bg-white border border-outline-variant rounded-lg p-3 text-on-surface" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-on-surface-variant uppercase">CVC</label>
                      <input type="text" className="w-full bg-white border border-outline-variant rounded-lg p-3 text-on-surface" placeholder="123" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(2)} className="flex-1 bg-surface-container text-himalayan-blue py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors">Back</button>
                  <button onClick={() => {
                    addBooking({
                      customer: 'John Doe',
                      vehicle: vehicle.name,
                      dates: 'Oct 15 - Oct 18',
                      amount: formatPrice(total),
                      status: 'Confirmed'
                    });
                    navigate('/admin/bookings'); // or wherever appropriate
                  }} className="flex-[2] bg-forest-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg active:scale-95 duration-200">
                    <Lock size={18} /> Pay {formatPrice(total)}
                  </button>
                </div>
                <p className="text-center text-xs text-on-surface-variant mt-4 flex items-center justify-center gap-1"><Lock size={12}/> Payments are secured and encrypted.</p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-sky-tint p-6 sticky top-24">
              <h3 className="font-headline-md text-lg mb-4">Booking Summary</h3>
              <div className="flex gap-4 mb-6 border-b border-outline-variant/30 pb-4">
                <img src={vehicle.img} alt="Car" className="w-20 h-16 object-cover rounded-lg bg-surface-container" />
                <div>
                  <h4 className="font-bold text-on-surface">{vehicle.name}</h4>
                  <p className="text-xs text-on-surface-variant">Oct 15 - Oct 18 (3 Days)</p>
                  <p className="text-xs text-on-surface-variant">Kathmandu Airport</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Vehicle Rental (3 days)</span> <span className="font-bold">{formatPrice(vehiclePrice)}</span></div>
                {driverMode !== 'self' && (
                  <div className="flex justify-between text-sm"><span className="text-on-surface-variant">{driverOptions[driverMode].label}</span> <span className="font-bold">{formatPrice(driverPriceTotal)}</span></div>
                )}
                {selectedAddons.map(id => {
                  const addon = availableAddons.find(a => a.id === id);
                  const itemTotal = id === 'esim' ? addon.price : addon.price * 3;
                  return (
                    <div key={id} className="flex justify-between text-sm"><span className="text-on-surface-variant">{addon.title}</span> <span className="font-bold">{formatPrice(itemTotal)}</span></div>
                  );
                })}
                <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Taxes & Fees</span> <span className="font-bold">{formatPrice(taxes)}</span></div>
                <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-center mt-2">
                  <span className="font-bold text-lg">Total</span> 
                  <span className="font-bold text-2xl text-sunset-orange">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="bg-surface-container-low p-3 rounded-lg flex items-start gap-2">
                <CheckCircle2 size={16} className="text-forest-green flex-shrink-0 mt-0.5" />
                <p className="text-xs text-on-surface-variant leading-tight">Free cancellation up to 48 hours before pickup. No hidden charges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust & Safety Banner to boost conversion confidence */}
      <div className="mt-16">
        <TrustSafety />
      </div>
    </div>
  );
};

export default BookingCheckout;
