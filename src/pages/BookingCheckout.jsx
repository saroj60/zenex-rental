import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Lock, CreditCard } from 'lucide-react';
import TrustSafety from '../components/TrustSafety';
import { useCurrency } from '../context/CurrencyContext';
import { useAppData } from '../context/AppDataContext';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

const BookingCheckout = () => {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const driverMode = searchParams.get('driver') || 'self';
  const carId = searchParams.get('car');
  const pkgId = searchParams.get('pkg');
  const startDate = searchParams.get('start') || 'Any Date';
  const endDate = searchParams.get('end') || 'Any Date';
  
  const { formatPrice } = useCurrency();
  const { vehicles, packages, drivers } = useAppData();
  const { addBooking } = useBooking();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    license: ''
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const pkg = pkgId ? packages.find(p => p.id === pkgId) : null;
  const vehicle = carId ? vehicles.find(v => v.id.toString() === carId) : (pkg ? null : vehicles[1]);

  const itemTitle = pkg ? pkg.title : vehicle.name;
  const itemImg = pkg ? pkg.img : vehicle.img;
  
  // Extract number from package price string like "NPR 109,200"
  const pkgPriceRaw = pkg ? parseInt(pkg.price.replace(/\D/g, '')) : 0;
  const vehiclePrice = vehicle ? vehicle.price * 3 : 0; // 3 days
  const basePrice = pkg ? pkgPriceRaw : vehiclePrice;
  const taxes = pkg ? 0 : 3250;
  
  const driverOptions = {
    self: { label: 'Self Drive', price: 0 }
  };
  if (drivers && drivers.length > 0) {
    drivers.forEach(d => {
      driverOptions[d.id] = { ...d };
    });
  } else {
    driverOptions['driver'] = { 
      label: 'With Driver', 
      price: (vehicle && vehicle.priceWithDriver && Number(vehicle.priceWithDriver) > Number(vehicle.price)) 
        ? (Number(vehicle.priceWithDriver) - Number(vehicle.price)) 
        : 1500 
    };
  }

  const driverPriceTotal = (!pkg && driverMode !== 'self') ? (driverOptions[driverMode] || driverOptions['self']).price * 3 : 0;
  
  const total = basePrice + taxes + driverPriceTotal;

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-8 bg-background min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-headline-lg text-3xl font-bold text-himalayan-blue mb-8">Secure Checkout</h1>

        {/* Wizard Steps */}
        <div className="flex items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-sky-tint overflow-x-auto">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-sunset-orange' : 'text-on-surface-variant'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-sunset-orange text-white' : 'bg-surface-container'}`}>1</div>
            <span className="font-bold text-sm whitespace-nowrap">Driver Details</span>
          </div>
          <div className="h-px w-8 sm:w-16 bg-outline-variant/50 mx-2"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-sunset-orange' : 'text-on-surface-variant'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-sunset-orange text-white' : 'bg-surface-container'}`}>2</div>
            <span className="font-bold text-sm whitespace-nowrap">Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Area */}
          <div className="lg:w-2/3">
            {step === 1 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint">
                <h2 className="font-headline-md text-xl mb-6">Primary Driver Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="Doe" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="+1 234 567 890" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">License Number</label>
                    <input type="text" name="license" value={formData.license} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-lg p-3 text-on-surface outline-none focus:ring-2 focus:ring-himalayan-blue" placeholder="XYZ123456" />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(2)} className="w-full bg-himalayan-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                    Continue to Payment <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-tint">
                <h2 className="font-headline-md text-xl mb-6 flex items-center gap-2"><Lock className="text-forest-green" /> Confirm Booking</h2>
                
                <div className="bg-surface-container-low p-4 rounded-xl mb-6">
                  <h3 className="font-bold text-lg mb-2">Pay Later / Cash on Delivery</h3>
                  <p className="text-on-surface-variant text-sm">You do not need to make any payment right now. You can pay securely when you arrive or pick up the vehicle.</p>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 bg-surface-container text-himalayan-blue py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors">Back</button>
                  <button onClick={() => {
                    addBooking({
                      customer: `${formData.firstName} ${formData.lastName}`,
                      customerDetails: formData,
                      vehicleId: vehicle ? vehicle.id : null,
                      packageId: pkg ? pkg.id : null,
                      itemName: itemTitle,
                      dates: { start: startDate, end: endDate },
                      amount: formatPrice(total),
                      status: 'pending'
                    });
                    setStep(3);
                  }} className="flex-[2] bg-forest-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg active:scale-95 duration-200">
                    <CheckCircle2 size={18} /> Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-sky-tint text-center">
                <div className="w-20 h-20 bg-green-100 text-forest-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="font-headline-lg text-3xl font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-on-surface-variant mb-8 text-lg">Thank you, {formData.firstName}. Your reservation is complete. You can pay upon arrival.</p>
                <button onClick={() => navigate('/')} className="bg-himalayan-blue text-white py-3 px-8 rounded-xl font-bold hover:bg-primary transition-colors">
                  Return to Home
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-sky-tint p-6 sticky top-24">
              <h3 className="font-headline-md text-lg mb-4">Booking Summary</h3>
              <div className="flex gap-4 mb-6 border-b border-outline-variant/30 pb-4">
                <img src={itemImg} alt="Thumbnail" className="w-20 h-16 object-cover rounded-lg bg-surface-container" />
                <div>
                  <h4 className="font-bold text-on-surface">{itemTitle}</h4>
                  <p className="text-xs text-on-surface-variant">{startDate} - {endDate}</p>
                  <p className="text-xs text-on-surface-variant">Kathmandu Airport</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-on-surface-variant">{pkg ? 'Package Price' : 'Vehicle Rental (3 days)'}</span> <span className="font-bold">{formatPrice(basePrice)}</span></div>
                {(!pkg && driverMode !== 'self') && (
                  <div className="flex justify-between text-sm"><span className="text-on-surface-variant">{(driverOptions[driverMode] || driverOptions['self']).label}</span> <span className="font-bold">{formatPrice(driverPriceTotal)}</span></div>
                )}

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
