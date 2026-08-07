import React, { useState } from 'react';
import { Calendar, Car, Phone, Send, CheckCircle } from 'lucide-react';

const InlineEnquiryForm = ({ routeName, recommendedVehicles = [] }) => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
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
        <h3 className="text-2xl font-extrabold text-[#0f3493] mb-2">Enquiry Sent Successfully!</h3>
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
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/50 w-full max-w-5xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
        
        <div className="flex-1 w-full text-left">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1">
            <Calendar size={14} className="text-[#e53a24]" /> Pick-up Date
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="date"
              value={formData.pickupDate}
              onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-3 text-sm cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 w-full text-left">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1">
            <Calendar size={14} className="text-[#e53a24]" /> Drop-off Date
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="date"
              value={formData.dropoffDate}
              onChange={(e) => setFormData({...formData, dropoffDate: e.target.value})}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-3 text-sm cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 w-full text-left">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1">
            <Car size={14} className="text-[#e53a24]" /> Vehicle Type
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <select 
              required
              value={formData.vehicleType}
              onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-3 text-sm cursor-pointer appearance-none"
            >
              <option value="">Select a vehicle...</option>
              {recommendedVehicles.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 w-full text-left">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5 ml-1">
            <Phone size={14} className="text-[#e53a24]" /> Contact Number
          </label>
          <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1e3a8a] focus-within:ring-1 focus-within:ring-[#1e3a8a] transition-all">
            <input 
              required
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
              placeholder="+977 Mobile Number"
              className="w-full bg-transparent border-none text-gray-900 font-bold focus:ring-0 outline-none p-3 text-sm placeholder:text-gray-400 placeholder:font-medium"
            />
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="w-full md:w-auto h-[46px] bg-[#1e3a8a] text-white px-8 rounded-xl font-bold hover:bg-[#152c6e] transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {status === 'submitting' ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                <Send size={18} /> Enquire Now
              </>
            )}
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default InlineEnquiryForm;
