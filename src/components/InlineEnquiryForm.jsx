import React, { useState } from 'react';
import { Calendar, Car, Phone, Send, CheckCircle, MapPin } from 'lucide-react';

const InlineEnquiryForm = ({ routeName, recommendedVehicles = [] }) => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
    pickupLocation: 'Kathmandu',
    dropoffLocation: 'Kathmandu',
    pickupDate: '',
    dropoffDate: '',
    vehicleType: '',
    contactNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const message = `Hello Zenex Travel! I am interested in a ${routeName}.
Details:
- Pick-up Location: ${formData.pickupLocation}
- Drop-off Location: ${formData.dropoffLocation}
- Pick-up Date: ${formData.pickupDate}
- Drop-off Date: ${formData.dropoffDate}
- Vehicle Type: ${formData.vehicleType || 'Not specified'}
- Contact Number: ${formData.contactNumber}

Please let me know the availability and pricing.`;

    const whatsappUrl = `https://wa.me/9779767476521?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setStatus('success');
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center py-10 animate-fade-in">
        <CheckCircle className="text-green-500 mb-4" size={48} />
        <h3 className="text-2xl font-extrabold text-[#1e3a8a] mb-2">Enquiry Sent Successfully!</h3>
        <p className="text-gray-600 font-medium">Thank you for your interest in the {routeName} route. Our team will contact you shortly to confirm the details.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-[#e53a24] font-bold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-2xl border border-white/50 w-full max-w-6xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 items-end">
        
        {/* Pick-up Location */}
        <div className="w-full text-left">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1 whitespace-nowrap">
            <MapPin size={13} className="text-[#e53a24] shrink-0" /> Pick-up Location
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="text"
              list="inline-pickup-locations"
              value={formData.pickupLocation}
              onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
              placeholder="e.g. Kathmandu"
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-2.5 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Drop-off Location */}
        <div className="w-full text-left">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1 whitespace-nowrap">
            <MapPin size={13} className="text-[#e53a24] shrink-0" /> Drop-off Location
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="text"
              list="inline-dropoff-locations"
              value={formData.dropoffLocation}
              onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})}
              placeholder="e.g. Pokhara"
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-2.5 text-xs sm:text-sm"
            />
          </div>
        </div>

        <datalist id="inline-pickup-locations">
          <option value="Kathmandu" />
          <option value="Pokhara" />
          <option value="Chitwan" />
          <option value="Lumbini" />
          <option value="Mustang" />
          <option value="Nagarkot" />
          <option value="Tribhuvan International Airport (KTM)" />
        </datalist>
        <datalist id="inline-dropoff-locations">
          <option value="Kathmandu" />
          <option value="Pokhara" />
          <option value="Chitwan" />
          <option value="Lumbini" />
          <option value="Mustang" />
          <option value="Nagarkot" />
          <option value="Tribhuvan International Airport (KTM)" />
        </datalist>

        {/* Pick-up Date */}
        <div className="w-full text-left">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1 whitespace-nowrap">
            <Calendar size={13} className="text-[#e53a24] shrink-0" /> Pick-up Date
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="date"
              value={formData.pickupDate}
              onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-2.5 text-xs sm:text-sm cursor-pointer"
            />
          </div>
        </div>

        {/* Drop-off Date */}
        <div className="w-full text-left">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1 whitespace-nowrap">
            <Calendar size={13} className="text-[#e53a24] shrink-0" /> Drop-off Date
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="date"
              value={formData.dropoffDate}
              onChange={(e) => setFormData({...formData, dropoffDate: e.target.value})}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-2.5 text-xs sm:text-sm cursor-pointer"
            />
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="w-full text-left">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1 whitespace-nowrap">
            <Car size={13} className="text-[#e53a24] shrink-0" /> Vehicle Type
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <select 
              required
              value={formData.vehicleType}
              onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-2.5 text-xs sm:text-sm cursor-pointer appearance-none"
            >
              <option value="">Select a vehicle</option>
              {recommendedVehicles.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Number */}
        <div className="w-full text-left">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1 whitespace-nowrap">
            <Phone size={13} className="text-[#e53a24] shrink-0" /> Contact Number
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
              placeholder="+977 Mobile"
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-2.5 text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full lg:col-span-1">
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="w-full h-[42px] bg-[#1e3a8a] text-white px-3 rounded-xl font-bold hover:bg-[#152c6e] transition-colors shadow-md flex items-center justify-center gap-1.5 text-xs sm:text-sm disabled:opacity-70 whitespace-nowrap"
          >
            {status === 'submitting' ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                <Send size={15} /> Enquire Now
              </>
            )}
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default InlineEnquiryForm;
