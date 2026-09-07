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
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center py-10 animate-fade-in">
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
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 md:p-6 shadow-2xl border border-white/60 w-full max-w-4xl mx-auto animate-fade-in text-left">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Row 1: Locations & Vehicle Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Pick-up Location */}
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ml-1">
              <MapPin size={14} className="text-[#e53a24] shrink-0" /> Pick-up Location
            </label>
            <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-2 focus-within:ring-[#1e3a8a]/20 transition-all">
              <input 
                required
                type="text"
                list="inline-pickup-locations"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                placeholder="e.g. Kathmandu"
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Drop-off Location */}
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ml-1">
              <MapPin size={14} className="text-[#e53a24] shrink-0" /> Drop-off Location
            </label>
            <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-2 focus-within:ring-[#1e3a8a]/20 transition-all">
              <input 
                required
                type="text"
                list="inline-dropoff-locations"
                value={formData.dropoffLocation}
                onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})}
                placeholder="e.g. Pokhara"
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ml-1">
              <Car size={14} className="text-[#e53a24] shrink-0" /> Vehicle Type
            </label>
            <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-2 focus-within:ring-[#1e3a8a]/20 transition-all">
              <select 
                required
                value={formData.vehicleType}
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none px-3 py-2.5 text-sm cursor-pointer appearance-none"
              >
                <option value="">Select a vehicle...</option>
                {recommendedVehicles.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
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

        {/* Row 2: Dates, Contact Number & Action Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          
          {/* Pick-up Date */}
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ml-1">
              <Calendar size={14} className="text-[#e53a24] shrink-0" /> Pick-up Date
            </label>
            <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-2 focus-within:ring-[#1e3a8a]/20 transition-all">
              <input 
                required
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none px-3 py-2 text-sm cursor-pointer"
              />
            </div>
          </div>

          {/* Drop-off Date */}
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ml-1">
              <Calendar size={14} className="text-[#e53a24] shrink-0" /> Drop-off Date
            </label>
            <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-2 focus-within:ring-[#1e3a8a]/20 transition-all">
              <input 
                required
                type="date"
                value={formData.dropoffDate}
                onChange={(e) => setFormData({...formData, dropoffDate: e.target.value})}
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none px-3 py-2 text-sm cursor-pointer"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ml-1">
              <Phone size={14} className="text-[#e53a24] shrink-0" /> Contact Number
            </label>
            <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-2 focus-within:ring-[#1e3a8a]/20 transition-all">
              <input 
                required
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                placeholder="+977 Mobile Number"
                className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none px-3 py-2 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full h-[42px] bg-[#1e3a8a] text-white px-5 rounded-xl font-bold hover:bg-[#152c6e] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send size={16} /> Enquire Now
                </>
              )}
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};

export default InlineEnquiryForm;
